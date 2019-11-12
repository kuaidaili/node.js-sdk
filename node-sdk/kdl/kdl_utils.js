const axios = require('axios');

const OpsOrderLevel = {
    //开放代理级别
    NORMAL : "dev", //普通
    VIP : "dev", //vip
    SVIP : "svip", //svip
    PRO : "ent", //专业
};

const EndPoint = {
    //各个api的主机+路径 
    GetOrderExpireTime : "dev.kdlapi.com/api/getorderexpiretime",
    GetIpWhitelist : "dev.kdlapi.com/api/getipwhitelist",  // 获取IP白名单
    SetIpWhitelist : "dev.kdlapi.com/api/setipwhitelist", // 设置IP白名单
    GetKpsProxy : "kps.kdlapi.com/api/getkps",
    GetDpsProxy : "dps.kdlapi.com/api/getdps",
    GetOpsProxyNormalOrVip : "dev.kdlapi.com/api/getproxy",
    GetOpsProxySvip : "svip.kdlapi.com/api/getproxy",
    GetOpsProxyEnt : "ent.kdlapi.com/api/getproxy",
    CheckDpsValid : "dps.kdlapi.com/api/checkdpsvalid",
    CheckOpsValid : "dev.kdlapi.com/api/checkopsvalid",
    GetIpBalance : "dps.kdlapi.com/api/getipbalance",
    GetDpsValidTime : "dps.kdlapi.com/api/getdpsvalidtime",
    TpsCurrentIp : "tps.kdlapi.com/api/tpscurrentip",
    ChangeTpsIp : "tps.kdlapi.com/api/changetpsip",
};

Object.freeze(OpsOrderLevel); //冻结
Object.freeze(EndPoint); //冻结

function sort_dict(dic){
    let new_dic = {};
    let dickey = Object.keys(dic).sort();
    for(let i = 0;i<dickey.length;i++){
        new_dic[dickey[i]] = dic[dickey[i]];
    }
    return new_dic;
}

function get_query_str(dic){
    let str = "";
    let dic_key  = Object.keys(dic);
    for (let i = 0;i<dic_key.length;i++){
        str += dic_key[i] + '=' + dic[dic_key[i]];
        if(i!==dic_key.length-1){
            str += '&';
        }
    }
    return str;
}

function get_proxy_str(proxy_list){
    let str = '';
    for(let i = 0;i<proxy_list.length;i++){
        str += proxy_list[i];
        if(i!==proxy_list.length-1){
            str+=',';
        }
    }
    return str;
}

exports.OpsOrderLevel = OpsOrderLevel;
exports.EndPoint = EndPoint;
exports.sort_dict = sort_dict;
exports.get_query_str = get_query_str;
exports.get_proxy_str = get_proxy_str;

