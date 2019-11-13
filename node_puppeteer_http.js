// 引入puppeteer模块
const puppeteer = require('puppeteer');

// 要访问的目标网页
const url = 'http://dev.kuaidaili.com/testproxy';

// 添加headers
const headers = {
	'Accept-Encoding': 'gzip'
};

// 代理服务器ip和端口
let proxy_ip = '223.198.230.41'
let proxy_port = 19732

// 用户名密码 (可到会员中心查看)
const username = 'yourusername';
const password = 'yourpassword';

(async ()=> {
	// 新建一个浏览器实例
	const browser = await puppeteer.launch({
		headless: false,  // 是否不显示窗口, 默认为true, 设为false便于调试
		args: [
			`--proxy-server=${proxy_ip}:${proxy_port}`,
			'--no-sandbox',
			'--disable-setuid-sandbox'
		]
	});

	// 打开一个新页面
	const page = await browser.newPage();

	// 设置headers
	await page.setExtraHTTPHeaders(headers);
	
	// 用户名密码认证
	await page.authenticate({username: username, password: password});

	// 访问目标网页
	await page.goto(url);
})();