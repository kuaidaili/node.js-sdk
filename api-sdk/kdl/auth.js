/**
 * @file auth模块 主要记录订单和订单的apiKey
 * @author kuaidaili.com
 */

const kdlUtils = require('./kdlUtils');
global.crypto = require('crypto');

class Auth {
    constructor(orderId,apiKey) {
        this.orderId = orderId;
        this.apiKey = apiKey;
    }

    get order_id(){
        return this.orderId;
    }
    get api_key(){
        return this.apiKey;
    }

    /**
     * 生成签名原文字符串
     *
     * @method getStringToSign
     * @for Auth
     * @param {String} method 要访问的方式
     * @param {String} ENDPOINT 地址
     * @param {Array} params 不定长参数。就是携带的参数了。
     * @return {String}  返回值原文字符串
     */
    getStringToSign(method, ENDPOINT, params){
        let s = method + ENDPOINT.split('.com')[1] + '?';
        let newParams = kdlUtils.sortDict(params);
        let queryStr = kdlUtils.getQueryStr(newParams);
        return s+queryStr;
    }

    /**
     * 进行Hmacsha1加密
     *
     * @method signStr
     * @for Auth
     * @param {String} rawStr 原字符串
     * @return {String}  Hmacsha1加密，并base64编码之后的原字符串。
     */
    signStr(rawStr, ){
        return crypto.createHmac('sha1',this.api_key).update(rawStr).digest().toString('base64');
    }
}

module.exports = Auth;
