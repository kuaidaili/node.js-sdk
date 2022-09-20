/**
 * @file 独享代理使用示例
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
client.getOrderExpireTime('hmacsha1').then(
    value => {
        console.log(value);
    }
);

// 获取ip白名单
client.getIpWhitelist('hmacsha1').then(
    value => {
        console.log(value);
    }
);

// 设置白名单 参数为字符串。如下
client.setIpWhitelist("171.113.244.55,171.113.244.41",'hmacsha1').then(value => {});
// 提取独享代理ip
// 构造请求参数。具体看
// https://www.kuaidaili.com/doc/api/getkps/
params = {
    format:'json',
    pt:2,
    area:'北京,上海,广东',
};
client.getKpsProxy(5,'hmacsha1',params).then(
    value => {
        console.log(value);
    }
);


// 获取指定订单访问代理IP的鉴权信息。
// 鉴权信息包含用户名密码，用于请求私密代理/独享代理/隧道代理时进行身份验证。
// 参考：https://www.kuaidaili.com/doc/api/getproxyauthorization/
client.getProxyAuthorization(1,'token').then(
    value => {
        console.log(value);
    }
)