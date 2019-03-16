// 引入第三方 `socks-proxy-agent` 模块
const SocksProxyAgent = require('socks-proxy-agent');
// 引入第三方 `request-promise`
const rp = require('request-promise');

// 用户名密码， 若已添加白名单则不需要添加
const username = 'yourusername';
const password = 'yourpassword';

// 代理服务器ip和端口
const proxy_ip = '113.74.108.33';
const proxy_port = 21080;

// 设置代理
let proxy = `socks5://${username}:${password}@${proxy_ip}:${proxy_port}`
let agent = new SocksProxyAgent(proxy);

// 要访问的目标网页
let url = 'http://dev.kuaidaili.com/testproxy';

let options = {
    uri: url,
    agent: agent,
    resolveWithFullResponse: true,
    gzip: true,
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
