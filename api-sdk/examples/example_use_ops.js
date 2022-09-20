/**
 * @file 开放代理使用示例
 * 接口鉴权说明：
 *   目前支持的鉴权方式有 "token" 和 "hmacsha1" 两种，默认使用 "token"鉴权。
 *   所有方法均可添加关键字参数signType修改鉴权方式。
 * @author www.kuaidaili.com
 */

const Client = require('../kdl/client');
const Auth = require('../kdl/auth');
auth = new Auth('secret_id','secret_key');
client = new Client(auth);

// 获取订单返回时间，返回时间字符串
client.getOrderExpireTime().then(
    value => {
        console.log(value);
    }
);

client.getOrderExpireTime('hmacsha1').then(
    value => {
        console.log(value);
    }
);

// 构造请求参数，详情请访问快代理官网API文档
// https://www.kuaidaili.com/doc/api/getproxy/
params = {
    format:'json',
    pt:1,
    area:'北京,上海,广东',
};
client.getOpsProxy(4,'svip','hmacsha1', params)
    .then(value => {
       console.log(value);
    });

// 测试验证ip可用性接口。
params = {
    format:'json',
    pt:2,
    area:'北京,上海,广东',
};
client.getOpsProxy(4,'svip','hmacsha1', params)
    .then(value => {
        client.checkOpsValid(value,'hmacsha1').then(
            value => {
                console.log(value);
            }
        );
    });
