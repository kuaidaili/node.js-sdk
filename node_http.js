const http = require('http');  // 引入内置http模块

// 用户名密码及auth, 若已添加白名单则不需要添加
const username = 'yourusername';
const password = 'yourpassword';
const auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');

// 要请求的目标地址
let url = 'http://dev.kuaidaili.com/testproxy';  

let options = {
    host: '113.72.108.33', // 代理服务器ip
    port: '16816',         // 代理服务器端口
    path: url,
    headers: {
        "Host": 'www.baidu.com',
        "Proxy-Authorization": auth,
        "Accept-Encoding": "gzip"   // 使用gzip压缩让数据传输更快
    }
};

// 请求目标地址
http.get(options, (res) => {
    // 输出状态码
    console.log(res.statusCode);

    // 输出返回内容(使用了gzip压缩)
    if (res.headers['content-encoding'] && res.headers['content-encoding'].indexOf('gzip') != -1) {
        let zlib = require('zlib');
        let unzip = zlib.createGunzip();
        res.pipe(unzip).pipe(process.stdout);
    } else {
        // 输出返回内容(未使用gzip压缩)
        res.pipe(process.stdout);
    }
});