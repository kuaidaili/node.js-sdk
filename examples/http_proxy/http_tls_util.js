let http = require('http'); // 引入内置http模块
let tls = require('tls'); // 引入内置tls模块
let util = require('util');

// 用户名密码认证(私密代理/独享代理)
const username = 'username';
const password = 'password';
const auth = 'Basic ' + new Buffer.from(username + ':' + password).toString('base64');

// 代理服务器ip和端口
let proxy_ip = '59.38.241.25';
let proxy_port = 23916;

// 要访问的主机和路径
let remote_host = 'https://dev.kdlapi.com/testproxy';
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