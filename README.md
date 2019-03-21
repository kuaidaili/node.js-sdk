# 快代理SDK - Node.js

## API部分:

### node_api.js
使用内置模块调用api示例, http/https网页均适用

## Http部分:

### node_http.js:
使用内置模块请求Http代理服务器, http/https网页均适用

### node_puppeteer_http.js:
使用`puppeteer`模块请求Http代理服务器, http/https网页均适用
```
使用提示: 请先安装puppeteer模块: npm install puppeteer
```

## Socks部分

### node_socks.js:
使用`request-promise`和`socks-proxy-agent`模块请求Socks代理服务器, http/https网页均适用

### node_puppeteer_socks.js:
使用`puppeteer`模块请求Socks代理服务器, http/https网页均适用
```
使用提示: 请先安装puppeteer模块: npm install puppeteer
```