﻿/**
 * @file 集合kdl使用的常量和常用的函数
 * @author www.kuaidaili.com
 */

const axios = require('axios');

const OPS_ORDER_LEVEL = {
    // 开放代理级别
    NORMAL : "dev", // 普通
    VIP : "dev", // vip
    SVIP : "svip", // svip
    PRO : "ent", // 专业
};

// 各个api的主机+路径
const ENDPOINT = {
    GET_ORDER_EXPIRE_TIME : "dev.kdlapi.com/api/getorderexpiretime",
    GET_IP_WHITELIST : "dev.kdlapi.com/api/getipwhitelist",  // 获取IP白名单
    SET_IP_WHITELIST : "dev.kdlapi.com/api/setipwhitelist", // 设置IP白名单
    GET_KPS_PROXY : "kps.kdlapi.com/api/getkps",
    GET_DPS_PROXY : "dps.kdlapi.com/api/getdps",
    GET_OPS_PROXY_NORMAL_OR_VIP : "dev.kdlapi.com/api/getproxy",
    GET_OPS_PROXY_SVIP : "svip.kdlapi.com/api/getproxy",
    GET_OPS_PROXY_ENT : "ent.kdlapi.com/api/getproxy",
    CHECK_DPS_VALID : "dps.kdlapi.com/api/checkdpsvalid",
    CHECK_OPS_VALID : "dev.kdlapi.com/api/checkopsvalid",
    GET_IP_BALANCE : "dps.kdlapi.com/api/getipbalance",
    GET_DPS_VALID_TIME : "dps.kdlapi.com/api/getdpsvalidtime",
    TPS_CURRENT_IP : "tps.kdlapi.com/api/tpscurrentip",
    CHANGE_TPS_IP : "tps.kdlapi.com/api/changetpsip",
    GET_PROXY_AUTHORIZATION: "dev.kdlapi.com/api/getproxyauthorization",  //获取代理鉴权信息
    GET_TPS_IP: "tps.kdlapi.com/api/gettps", //获取隧道代理IP
    GET_UA : "dev.kdlapi.com/api/getua",   //获取User Agent
    GET_AREA_CODE : "dev.kdlapi.com/api/getareacode",  // 获取指定地区编码
    GET_ACCOUNT_BALANCE : "dev.kdlapi.com/api/getaccountbalance",  // 获取账户余额

    Create_Order : "dev.kdlapi.com/api/createorder",   // 创建订单
    Get_Order_Info : "dev.kdlapi.com/api/getorderinfo",  // 获取订单信息
    Set_Auto_Renew : "dev.kdlapi.com/api/setautorenew",  // 开启/关闭自动续费
    Close_Order : "dev.kdlapi.com/api/closeorder",  // 关闭订单
    Query_Kps_City : "dev.kdlapi.com/api/querykpscity",  // 查询独享代理城市信息

    Get_Secret_Token : "auth.kdlapi.com/api/get_secret_token",
};


Object.freeze(OPS_ORDER_LEVEL); // 冻结
Object.freeze(ENDPOINT); // 冻结

/**
 * sortDict 根据字典的key进行字典序排序
 *
 * @param {Array} dic 字典
 * @return {Array} 新的已经排序好的字典
 */
function sortDict(dic){
    let newDic = {};
    let dickey = Object.keys(dic).sort();
    for(let i = 0;i<dickey.length;i++){
        newDic[dickey[i]] = dic[dickey[i]];
    }
    return newDic;
}

/**
 * getQueryStr 将参数字典进行&拼接，构成formData格式
 *
 * @param {Array} dic 字典
 * @return {String} 拼接好的字典
 */
function getQueryStr(dic){
    let str = "";
    let dicKey  = Object.keys(dic);
    for (let i = 0;i<dicKey.length;i++){
        str += dicKey[i] + '=' + dic[dicKey[i]];
        if(i!==dicKey.length-1){
            str += '&';
        }
    }
    return str;
}

/**
 * getProxyStr 将参数字典进行，拼接，构成xxxx.xxx.xxx.xx,xx.xx.xx.xx
 *
 * @param proxyList ip列表
 * @return {String} 拼接好的字典
 */
function getProxyStr(proxyList){
    let str = '';
    for(let i = 0;i<proxyList.length;i++){
        str += proxyList[i];
        if(i!==proxyList.length-1){
            str+=',';
        }
    }
    return str;
}

exports.OPS_ORDER_LEVEL = OPS_ORDER_LEVEL;
exports.ENDPOINT = ENDPOINT;
exports.sortDict = sortDict;
exports.getQueryStr = getQueryStr;
exports.getProxyStr = getProxyStr;

