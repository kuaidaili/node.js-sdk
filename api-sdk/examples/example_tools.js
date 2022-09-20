/**
 * @file 工具类使用示例
 * 接口鉴权说明：
 *   目前支持的鉴权方式有 "token" 和 "hmacsha1" 两种，默认使用 "token"鉴权。
 *   所有方法均可添加关键字参数signType修改鉴权方式。
 * @author www.kuaidaili.com
 */

const Client = require('../kdl/client');
const Auth = require('../kdl/auth');
auth = new Auth('secret_id','secret_key');
client = new Client(auth);

// 获取User-Agent 参数：获取ua数量
client.getUA(3).then(
    value => {
        console.log(value);
    }
);

// 获取指定地区编码
client.getAreaCode('北京市').then(
    value => {
        console.log(value);
    }
);

// // 获取账户余额
// client.getAccountBalance().then(
//     value => {
//         console.log(value);
//     }
// );

// console.log(client._getSecretToken())
console.log(client.getSecretToken())
console.log(client.setAutoRenew('0', signType="token", otherParams={}))