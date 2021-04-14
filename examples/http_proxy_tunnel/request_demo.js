let request = require('request'); // 引入第三方request库
let util = require('util');
let zlib = require('zlib');

// 用户名密码, 若已添加白名单则不需要添加
const username = 'username';
const password = 'password';

// 要访问的目标地址
let page_url = 'https://dev.kdlapi.com/testproxy'

// 隧道服务器域名和端口
let tunnelhost = 'tpsXXX.kdlapi.com';
let tunnelport = 15818;

// 完整隧道服务器url
let proxy = util.format('http://%s:%s@%s:%d', username, password, tunnelhost, tunnelport);

// 发起请求
request({
    url: page_url,
    method: 'GET',
    proxy: proxy,
    headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3100.0 Safari/537.36",
        "Accept-Encoding": "gzip"   // 使用gzip压缩让数据传输更快
    },
    encoding: null,  // 方便解压缩返回的数据
}, function(error, res, body) {
    if (!error && res.statusCode == 200) {
        // 输出返回内容(使用了gzip压缩)
        if (res.headers['content-encoding'] && res.headers['content-encoding'].indexOf('gzip') != -1) {
            zlib.gunzip(body, function(err, dezipped) {
                console.log(dezipped.toString());
            });
        } else {
            // 输出返回内容(没有使用gzip压缩)
            console.log(body);
        }
    } else {
        console.log(error);
    }
});