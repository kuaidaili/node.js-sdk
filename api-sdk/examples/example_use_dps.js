/**
 * @file 私密代理使用示例
 * 接口鉴权说明：
 *   目前支持的鉴权方式有 "simple" 和 "hmacsha1" 两种，默认使用 "simple"鉴权。
 *   所有方法均可添加关键字参数signType修改鉴权方式。
 * @author www.kuaidaili.com
 */

const Client = require('../kdl/client');
const Auth = require('../kdl/auth');
auth = new Auth('yourOrderId','yourApiKey');
client = new Client(auth);
// 获取订单到期时间
client.getOrderExpireTime('simple').then(
    value => {
        console.log(value);
    }
);


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
client.getProxyAuthorization(1,'simple').then(
    value => {
        console.log(value);
    }
)