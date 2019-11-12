// 隧道代理使用示例
// 接口鉴权说明：
//     目前支持的鉴权方式有 "simple" 和 "hmacsha1" 两种，默认使用 "simple"鉴权。
//     所有方法均可添加关键字参数sign_type修改鉴权方式。
//


const Client = require('../kdl/client');
const Auth = require('../kdl/auth');
test = new Auth('977182355475777','zwwarlh937ezf96ivnfrxl6nw8dpcva1');
//test = new Auth('977173347636224','5i9v9e8lob3fi2umij3ujn8e2hhb1aoq');

test2 = new Client(test);

//获取订单到期时间
test2.get_order_expire_time('hmacsha1').then(
    value => {
        console.log(value);
    }
);



//获取ip白名单
test2.get_ip_whitelist('hmacsha1').then(
    value => {
        //console.log('value的值为：');
        console.log(value);
    }
);



//设置白名单 参数为字符串。如下
// test2.set_ip_whitelist("171.113.244.40,171.113.244.41",'hmacsha1');


//显示当前隧道代理ip
test2.tps_current_ip('hmacsha1').then(value=>{
    console.log(value);
});


//修改当前隧道代理ip
test2.change_tps_ip('hmacsha1').then(
    value => {
        console.log(value);
    }
);
