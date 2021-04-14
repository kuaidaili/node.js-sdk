const http = require("http");  // 引入内置http模块
const url  = require("url");

// 要访问的目标页面
const targetUrl = "http://dev.kdlapi.com/testproxy";
const urlParsed   = url.parse(targetUrl);

// 隧道域名
const proxyIp = "tpsXXX.kdlapi.com";  // 隧道服务器域名
const proxyPort = "15818"; // 端口号

// 用户名密码, 若已添加白名单则不需要添加
const username = "username";
const password = "password";
const base64    = new Buffer.from(username + ":" + password).toString("base64");
const options = {
    host    : proxyIp,
    port    : proxyPort,
    path    : targetUrl,
    method  : "GET",
    headers : {
        "Host"                : urlParsed.hostname,
        "Proxy-Authorization" : "Basic " + base64
    }
};

http.request(options,  (res) => {
    console.log("got response: " + res.statusCode);
    // 输出返回内容(使用了gzip压缩)
    if (res.headers['content-encoding'] && res.headers['content-encoding'].indexOf('gzip') != -1) {
        let zlib = require('zlib');
        let unzip = zlib.createGunzip();
        res.pipe(unzip).pipe(process.stdout);
    } else {
        // 输出返回内容(未使用gzip压缩)
        res.pipe(process.stdout);
    }
})
    .on("error", (err) => {
        console.log(err);
    })
    .end()
;