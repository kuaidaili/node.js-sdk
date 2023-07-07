const https = require('https');
const { URL } = require('url');
const { chromium } = require('playwright');


// 发送https请求
function sendRequest(url, options = {}) {
    return new Promise((resolve, reject) => {
        const req = https.request(url, options, (res) => {
          let data = '';
          res.on('data', (chunk) => {
            data += chunk;
          });
          res.on('end', () => {
            resolve(data);
          });
        });

        req.on('error', (error) => {
          reject(error);
        });

        req.end();
    });
}


// 获取代理
function get_proxy() {
    return new Promise((resolve, reject) => {
        const api = 'https://dps.kdlapi.com/api/getdps/';
        const params = {
          'num': 1,
          'pt': 1,
          'sep': 1,
          'secret_id': 'your secret_id',
          'signature': 'yoru signature',
        };
        let url = new URL(api);
        url.search = new URLSearchParams(params).toString();
        sendRequest(url)
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
        });
}


// 使用playwright添加代理
async function main() {
    const proxyServer = await get_proxy();
    if(!proxyServer){
        console.log('获取代理失败');
        return;
    }
    console.log('获取代理为：', proxyServer);
    const browser = await chromium.launch({
        proxy: {
            server: `http://${proxyServer}`,
        }
    });
    const page = await browser.newPage();
    await page.goto('https://dev.kdlapi.com/testproxy');
    const content = await page.content();
    console.log(content);
    await browser.close();
}

main().catch((error) => {
    console.error(error);
});
