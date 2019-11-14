/**
 * @file 独享代理使用示例
 * 接口鉴权说明：
 *   目前支持的鉴权方式有 "simple" 和 "hmacsha1" 两种，默认使用 "simple"鉴权。
 *   所有方法均可添加关键字参数signType修改鉴权方式。
 * @author www.kuaidaili.com
 */



const Client = require('../kdl/client');
const Auth = require('../kdl/auth');
test = new Auth('youOrderId','youApiKey');


test2 = new Client(test);

// 获取订单到期时间
test2.getOrderExpireTime('hmacsha1').then(
    value => {
        console.log(value);
    }
);



// 获取ip白名单
test2.getIpWhitelist('hmacsha1').then(
    value => {
        console.log(value);
    }
);



// 设置白名单 参数为字符串。如下
test2.setIpWhitelist("171.113.244.55,171.113.244.41",'hmacsha1').then(value => {});


// 提取独享代理ip
// 构造请求参数。具体看
// https://www.kuaidaili.com/doc/api/getkps/
params = {
    format:'json',
    pt:2,
    area:'北京,上海,广东',
};
test2.getKpsProxy(5,'hmacsha1',params).then(
    value => {
        console.log(value);
    }
);


