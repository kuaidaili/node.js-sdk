# 简介
快代理node - api SDK

# 依赖环境
1. axios 
   ```
   npm install axios
   ```
2. 从[快代理](https://www.kuaidaili.com)购买相应产品

3. [获取订单的`secret_id`和`secret_key`](https://www.kuaidaili.com/usercenter/api/secret/)

# 获取安装
安装 node SDK 前，请先获取订单对应的api密钥。secret_id是用于标识订单，secret_key 是用于加密签名字符串和服务器端验证签名字符串的密钥。secret_key 必须严格保管，避免泄露。

## 通过npm安装(推荐)
您可以通过`npm`将SDK安装到您的项目中：
```
npm install kdl
```
如果您的项目环境尚未安装`npm`，可参考：
* Ubuntu/Debian安装npm：`sudo apt-get install nodejs`   npm将随着node一起安装
* CentOS安装npm：`yum   install nodejs `  npm将随着node一起安装
* MacOS安装npm: `brew install node` npm将随着node一起安装

## 通过源码包安装
前往 [Github 代码托管地址](https://github.com/kuaidaili/node.js-sdk/tree/master/api-sdk) 下载最新代码，解压之后放在您工程的目录下。

## 示例
以私密代理订单使用为例
``` javascript
/**
 * @file 私密代理使用示例
 * 接口鉴权说明：
 *   目前支持的鉴权方式有 "token" 和 "hmacsha1" 两种，默认使用 "token"鉴权。
 *   所有方法均可添加关键字参数signType修改鉴权方式。
 * @author www.kuaidaili.com
 */

const Client = require('../kdl/client');
const Auth = require('../kdl/auth');
auth = new Auth('secret_id','secret_key');
client = new Client(auth);

// 获取订单到期时间
client.getOrderExpireTime('token').then(
    value => {
        console.log(value);
    }
);

/**
 * 获取User-Agent, 返回ua列表
 * 参数说明:{
 * "dt":"系统类型(pc,mobile,pad)",
 * "browser":"浏览器(chrome,ie,firefox,weixin)",
 * "platform":"系统类型(win,mac,linux,ios)"
 * }
 */
client.getUA(10,'token',otherParams={"dt":"pc","browser":"chrome","platform":"win"}).then(
    value => {
        console.log(value);
        console.log(value.length);
    }
)


// // 获取ip白名单
client.getIpWhitelist('hmacsha1').then(
    value => {
        console.log(value);
    }
);
// 设置白名单 参数为字符串。如下  ,如果为参数不加，则会设置为本地ip地址。
client.setIpWhitelist().then(value => {});
//client.setIpWhitelist("171.113.244.55,171.113.244.41",'hmacsha1').then(value => {});

// 提取私密代理ip
// 构造请求参数。具体看
// https://www.kuaidaili.com/doc/api/getdps/
params = {
    format:'json',
    pt:2,
    area:'北京,上海,广东',
};
client.getDpsProxy(5,'hmacsha1',params).then(
    value => {
        console.log(value);
    }
);

// 检测dps_proxy的有效性
params = {
    format:'json',
    pt:2,
    area:'北京,上海,广东',
};
client.getDpsProxy(5,'hmacsha1',params).then(
    value => {
        client.checkDpsValid(value,'hmacsha1').then(
            value => {
                console.log(value);
            }
        );
    }
);

// 获取私密代理ip的有效时长
params = {
    format:'json',
    pt:2,
    area:'北京,上海,广东',
};
client.getDpsProxy(5,'hmacsha1',params).then(
    value => {
        client.getDpsValidTime(value,'hmacsha1').then(
            value => {
                console.log(value);
            }
        );
    }
);

// 获取订单IP提取余额
// 此接口只对按量付费订单和包年包月的集中提取型订单有效：
// 对于按量付费订单，此接口返回的是订单的剩余IP提取额度。
// 对于包年包月的集中提取型订单，此接口返回的是今日剩余的IP提取额度。
client.getIpBalance('hmacsha1').then(value => {
    console.log(value);
});


// 获取指定订单访问代理IP的鉴权信息。
// 鉴权信息包含用户名密码，用于请求私密代理/独享代理/隧道代理时进行身份验证。
// 参考：https://www.kuaidaili.com/doc/api/getproxyauthorization/
client.getProxyAuthorization(1,'token').then(
    value => {
        console.log(value);
    }
)
```
您可以在examples目录下找到更详细的示例

## 参考资料

* [查看API列表](https://www.kuaidaili.com/doc/api/)
* [了解API鉴权](https://www.kuaidaili.com/doc/api/auth/)
