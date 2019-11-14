/**
 * @file 私密代理使用示例
 * 接口鉴权说明：
 *   目前支持的鉴权方式有 "simple" 和 "hmacsha1" 两种，默认使用 "simple"鉴权。
 *   所有方法均可添加关键字参数signType修改鉴权方式。
 * @author www.kuaidaili.com
 */



const Client = require('../kdl/client');
const Auth = require('../kdl/auth');
test = new Auth('957355049363839','apiKey');
//test = new Auth('977173347636224','xx');

test2 = new Client(test);

//获取订单到期时间
test2.getOrderExpireTime('simple').then(
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



// //设置白名单 参数为字符串。如下
test2.setIpWhitelist("171.113.244.24,171.113.244.41", 'hmacsha1').then(value => {});


//提取私密代理ip
//构造请求参数。具体看
// https://www.kuaidaili.com/doc/api/getdps/
params = {
    format:'json',
    pt:2,
    area:'北京,上海,广东',
};
test2.getDpsProxy(5,'hmacsha1',params).then(
    value => {
        console.log(value);
    }
);


// //检测dps_proxy的有效性
params = {
    format:'json',
    pt:2,
    area:'北京,上海,广东',
};
test2.getDpsProxy(5,'hmacsha1',params).then(
    value => {
        test2.checkDpsValid(value,'hmacsha1').then(
            value => {
                console.log(value);
            }
        );
    }
);


// //获取私密代理ip的有效时长
params = {
    format:'json',
    pt:2,
    area:'北京,上海,广东',
};
test2.getDpsProxy(5,'hmacsha1',params).then(
    value => {
        test2.getDpsValidTime(value,'hmacsha1').then(
            value => {
                console.log(value);
            }
        );
    }
);


//获取订单IP提取余额
// 此接口只对按量付费订单和包年包月的集中提取型订单有效：
// 对于按量付费订单，此接口返回的是订单的剩余IP提取额度。
// 对于包年|错误码 | 说明 |包月的集中提取型订单，此接口返回的是今日剩余的IP提取额度。
test2.getIpBalance('hmacsha1').then(value => {
    console.log(value);
});
