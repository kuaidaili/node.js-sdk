// 引入第三方 `socks-proxy-agent` 模块
const SocksProxyAgent = require('socks-proxy-agent');
// 引入第三方 `request-promise`
const rp = require('request-promise');

// 用户名密码认证(私密代理/独享代理)
const username = 'username';
const password = 'password';

// 代理服务器ip和端口
const proxy_ip = '59.38.241.25';
const proxy_port = 23918;

// 设置代理
let proxy = `socks5://${username}:${password}@${proxy_ip}:${proxy_port}`
let agent = new SocksProxyAgent(proxy);

// 要访问的目标网页
let url = 'http://dev.kuaidaili.com/testproxy';

let options = {
    uri: url,
    agent: agent,
    resolveWithFullResponse: true,
    gzip: true, //使用gzip压缩让数据传输更快
    headers: {
        'User-Agent': 'Request-Promise'
    }
};

rp(options).then((res)=> {
    // 输出状态码
    console.log(res.statusCode);
    // 输出返回内容 (已自动进行gzip解压缩)
    console.log(res.body)

}).catch((err) => {
    console.log("error")
});