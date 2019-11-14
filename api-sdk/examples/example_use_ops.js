/**
 * @file 开放代理使用示例
 * 接口鉴权说明：
 *   目前支持的鉴权方式有 "simple" 和 "hmacsha1" 两种，默认使用 "simple"鉴权。
 *   所有方法均可添加关键字参数signType修改鉴权方式。
 * @author www.kuaidaili.com
 */

const Client = require('../kdl/client');
const Auth = require('../kdl/auth');

test = new Auth('youOrderId','youApiKey');
test2 = new Client(test);

// 获取订单返回时间，返回时间字符串
test2.getOrderExpireTime().then(
    value => {
        console.log(value);
    }
);

test2.getOrderExpireTime('hmacsha1').then(
    value => {
        console.log(value);
    }
);

// 构造请求参数，详情请访问快代理官网API文档
// https://www.kuaidaili.com/doc/api/getproxy/
params = {
    format:'json',
    pt:2,
    area:'北京,上海,广东',
};
test2.getOpsProxy(4,'svip','hmacsha1', params)
    .then(value => {
       console.log(value);
    });

// 测试验证ip可用性接口。
params = {
    format:'json',
    pt:2,
    area:'北京,上海,广东',
};
test2.getOpsProxy(4,'svip','hmacsha1', params)
    .then(value => {
        test2.checkOpsValid(value,'hmacsha1').then(
            value => {
                console.log(value);
            }
        );
    });
