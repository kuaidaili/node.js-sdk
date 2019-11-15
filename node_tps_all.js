let http = require('http'); // 引入内置http模块
let tls = require('tls'); // 引入内置tls模块
let util = require('util');

// 用户名密码及auth, 若已添加白名单则不需要添加
const username = 'yourusername';
const password = 'yourpassword';
const auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');

// 隧道代理host/ip和端口
let proxy_ip = 'tps136.kdlapi.com';
let proxy_port = 15818;

// 要访问的主机和路径, 以京东首页为例
let remote_host = 'www.jd.com';
let remote_path = '/';

// 发起CONNECT请求
let req = http.request({
    host: proxy_ip,
    port: proxy_port,
    method: 'CONNECT',
    path: util.format('%s:443', remote_host),
    headers: {
        "Host": remote_host,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3100.0 Safari/537.36",
        "Proxy-Authorization": auth,
        "Accept-Encoding": "gzip"   // 使用gzip压缩让数据传输更快
    }
});


req.on('connect', function (res, socket, head) {
    // TLS握手
    let tlsConnection = tls.connect({
        host: remote_host,
        socket: socket
    }, function () {
        // 发起GET请求
        tlsConnection.write(util.format('GET %s HTTP/1.1\r\nHost: %s\r\n\r\n', remote_path, remote_host));
    });

    tlsConnection.on('data', function (data) {
        // 输出响应结果(完整的响应报文串)
        console.log(data.toString());
    });
});

req.end();