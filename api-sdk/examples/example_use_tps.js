/**
 * @file 隧道代理使用示例
 * 接口鉴权说明：
 *   目前支持的鉴权方式有 "simple" 和 "hmacsha1" 两种，默认使用 "simple"鉴权。
 *   所有方法均可添加关键字参数signType修改鉴权方式。
 * @author www.kuaidaili.com
 */

const Client = require('../kdl/client');
const Auth = require('../kdl/auth');
test = new Auth('977182355475777','apiKey');


test2 = new Client(test);

//获取订单到期时间
test2.getOrderExpireTime('hmacsha1').then(
    value => {
        console.log(value);
    }
);



//获取ip白名单
test2.getIpWhitelist('hmacsha1').then(
    value => {
        //console.log('value的值为：');
        console.log(value);
    }
);



//设置白名单 参数为字符串。如下
test2.setIpWhitelist("171.113.244.20,171.113.244.41",'hmacsha1').then(value => {});


//显示当前隧道代理ip
test2.tpsCurrentIp('hmacsha1').then(value=>{
    console.log(value);
});


//修改当前隧道代理ip
test2.changeTpsIp('hmacsha1').then(
    value => {
        console.log(value);
    }
);
