const kdl_utils = require('./kdl_utils');
global.crypto = require('crypto');

class Auth {
    constructor(order_id,api_key) {
        this.orderId = order_id;
        this.apiKey = api_key;
    }

    get order_id(){
        return this.orderId;
    }
    get api_key(){
        return this.apiKey;
    }


    get_string_to_sign(method, endpoint, params){
        /**
         * 生成签名原文字符串
         * @method get_string_to_sign
         * @for Auth
         * @param {String} method 要访问的方式
         * @param {Array} params 不定长参数。就是携带的参数了。
         * @return {String}  返回值原文字符串
         */
        let s = method + endpoint.split('.com')[1] + '?';
        let new_params = kdl_utils.sort_dict(params);
        // console.log(s);
        // console.log(new_params);
        let query_str = kdl_utils.get_query_str(new_params);
        // console.log(query_str);
        return s+query_str;
    }

    sign_str(raw_str, ){
        /**
         * 进行Hmacsha1加密
         * @method get_stringsign_str_to_sign
         * @for Auth
         * @param {String} raw_str 原字符串
         * @return {String}  Hmacsha1加密，并base64编码之后。
         */
        return crypto.createHmac('sha1',this.api_key).update(raw_str).digest().toString('base64');
    }

}

module.exports = Auth;
