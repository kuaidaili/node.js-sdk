/*!
 * 快代理node.js API。
 */

const kdl_utils = require('./kdl_utils');
const auth = require('./auth');
const http = require('https');
const url = require('url');
const util = require('util');
const axios = require('axios');
const kdl_error = require('./exceptions');

class Client{
    /**
     * 客户端类
     * @class Client
     * @constructor
     * @param auth
     */

    constructor(auth){
        this.auth = auth;
        this.res = {}
    }

    get_order_expire_time(sign_type = "simple"){
        /**
         * 获取订单到期时间，强制simple签名验证
         * @method get_order_expire_time
         * @for Client
         * @param {String} sign_type 鉴权方式，具体可查看官网：https://www.kuaidaili.com/doc/api/auth/
         * @return {Promise} 返回Promise对象
         */
        let endpoint = kdl_utils.EndPoint.GetOrderExpireTime;
        let dic = {};
        dic['sign_type'] = sign_type;
        return this.return_promise(endpoint,dic,'expire_time');

    }

    get_ops_proxy(num=0, order_level=OpsOrderLevel.NORMAL, sign_type="simple",other_params={}){
        /**
         * 获取开放代理，强制simple签名验证
         * @method get_ops_proxy
         * @for Client
         * @param {String} sign_type 鉴权方式，具体可查看官网：https://www.kuaidaili.com/doc/api/auth/
         * @param {Number} num 提取数量
         * @param {String} order_level 开放代理订单类型
         * @param {Array} other_params 其他参数字典
         * @return {Promise} 返回Promise对象
         */
        //console.log(other_params);
        let endpoint = kdl_utils.EndPoint.GetOpsProxyNormalOrVip;
        if(order_level===kdl_utils.OpsOrderLevel.SVIP)
            endpoint = kdl_utils.EndPoint.GetOpsProxySvip;
        if(order_level===kdl_utils.OpsOrderLevel.PRO)
            endpoint = kdl_utils.EndPoint.GetOpsProxyEnt;
        //TODO 之所以把其他参数和num，order_level,sign_type分开是为了方便用户，可能有更好的方案
        other_params['num'] = num;
        other_params['order_level'] = order_level;
        other_params['sign_type'] = sign_type;
        return this.get_proxy(endpoint,other_params);
    }

    check_ops_valid(proxy_list,sign_type='simple'){
        /**
         * 获取开放代理，强制simple签名验证
         * @method check_ops_valid
         * @for Client
         * @param {Array} proxy_list 代理ip列表
         * @param {String} sign_type 鉴权
         * @return {Promise} 返回Promise对象
         */

        let endpoint = kdl_utils.EndPoint.CheckOpsValid;
        let str = kdl_utils.get_proxy_str(proxy_list);
        let dic = {};
        dic['sign_type'] = sign_type;
        dic['proxy'] = str;
        return this.check_valid_or_time(endpoint,dic);
    }

    get_ip_whitelist(sign_type = "simple"){
        /**
         * 获取ip白名单，强制simple签名验证
         * @method get_ip_whitelist
         * @for Client
         * @param {String} sign_type 鉴权
         * @return {Promise} 返回Promise对象
         */
        let endpoint = kdl_utils.EndPoint.GetIpWhitelist;
        let dic = {};
        dic['sign_type'] = sign_type;
        return this.return_promise(endpoint,dic,'ipwhitelist');
    }

    set_ip_whitelist(ip_list="",sign_type='simple'){
        /**
         * 设置ip白名单，强制simple签名验证
         * @method set_ip_whitelist
         * @for Client
         * @param {String} ip_list ip列表，默认为把白名单设置为空
         * @param {String} sign_type 鉴权
         * @return {Promise} 返回Promise对象
         */
        let endpoint = kdl_utils.EndPoint.SetIpWhitelist;
        let dic = {};
        dic['sign_type'] = sign_type;
        dic['iplist'] = ip_list;
        let params = this.get_params(endpoint,dic);
        let promise =  this.get_base_res("POST",endpoint,params);
        return promise.then(value=>{
        }).catch(error=>{
        });
    }

    get_dps_proxy(num=0, sign_type="simple", other_params={}){
        /**
         * 获取私密代理，强制simple签名验证
         * @method get_dps_proxy
         * @for Client
         * @param {String} sign_type 鉴权
         * @param {Array} other_params 其他参数字典
         * @return {Promise} 返回Promise对象
         */
        other_params['num'] = num;
        other_params['sign_type'] = sign_type;
        let endpoint = kdl_utils.EndPoint.GetDpsProxy;

        return this.get_proxy(endpoint,other_params);
    }

    check_dps_valid(proxy_list,sign_type='simple'){
        /**
         * 检验dps_ip有效性，强制simple签名验证
         * @method check_dps_valid
         * @for Client
         * @param {String} proxy_list ip列表
         * @param {String} sign_type 鉴权
         * @return {Promise} 返回Promise对象
         */
        let endpoint = kdl_utils.EndPoint.CheckDpsValid;
        let str = kdl_utils.get_proxy_str(proxy_list);
        let dic = {};
        dic['sign_type'] = sign_type;
        dic['proxy'] = str;
        return this.check_valid_or_time(endpoint,dic);
    }

    get_dps_valid_time(proxy_list,sign_type='simple'){
        /**
         * 检验dps_ip有效性，强制simple签名验证
         * @method get_dps_valid_time
         * @for Client
         * @param {String} proxy_list ip列表
         * @param {String} sign_type 鉴权
         * @return {Promise} 返回Promise对象
         */

        let endpoint = kdl_utils.EndPoint.GetDpsValidTime;
        let str = kdl_utils.get_proxy_str(proxy_list);
        let dic = {};
        dic['sign_type'] = sign_type;
        dic['proxy'] = str;
        return this.check_valid_or_time(endpoint,dic);
    }

    get_ip_balance(sign_type='simple'){
        /**
         * 此接口只对按量付费订单和包年包月的集中提取型订单有效
         *  获取计数版订单ip余额, 强制simple签名验证,
         * @method get_ip_balance
         * @for Client
         * @param {String} sign_type 鉴权
         * @return {Promise} 返回Promise对象
         */

        let endpoint = kdl_utils.EndPoint.GetIpBalance;
        let dic = {};
        dic['sign_type'] = sign_type;
        return this.return_promise(endpoint,dic,'balance');
    }

    get_kps_proxy(num=0, sign_type="simple", other_params={}){
        /**
         * 获取独享代理，强制simple签名验证
         * @method get_kps_proxy
         * @for Client
         * @param {String} sign_type 鉴权
         * @param {Array} other_params 其他参数字典
         * @return {Promise} 返回Promise对象
         */
        other_params['num'] = num;
        other_params['sign_type'] = sign_type;
        let endpoint = kdl_utils.EndPoint.GetKpsProxy;
        return this.get_proxy(endpoint,other_params);
    }

    tps_current_ip(sign_type="simple"){
        /**
         * 获取当前隧道代理的ip，强制simple签名验证
         * @method tps_current_ip
         * @for Client
         * @param {String} sign_type 鉴权
         * @return {Promise} 返回Promise对象
         */
        let endpoint = kdl_utils.EndPoint.TpsCurrentIp;
        let dic = {};
        dic['sign_type'] = sign_type;
        return this.return_promise(endpoint,dic,'current_ip');

    }

    change_tps_ip(sign_type="simple"){
        let endpoint = kdl_utils.EndPoint.ChangeTpsIp;
        let dic = {};
        dic['sign_type'] = sign_type;
        return this.return_promise(endpoint,dic,'new_ip');
    }
    return_promise(endpoint,other_params,key){
        /**
         * 返回Promise对象的通用函数
         * @method return_promise
         * @for Client
         * @param {String} endpoint 地址
         * @param {Array} other_params 参数
         * @param {String} key 要从response.data获取的key
         * @return {Promise} 返回Promise对象
         */
        let params = this.get_params(endpoint,other_params);
        // console.log('得到的参数为',params);
        let promise =  this.get_base_res("GET",endpoint,params);
        return promise.then(value => {
            //console.log('获取的value',value);

            if(value.code !== 0) {//有问题了。
                let err_message = 'code:'+value.code +'->'+ value.msg;
                throw new kdl_error.KdlReadError(err_message);
            }
            return value.data[key];
        }).catch(error =>{
            console.log('catch error: ',error);
            return error;
        });
    }
    check_valid_or_time(endpoint,other_params){
        /**
         * 检验代理有效性通用函数，
         * @method check_valid
         * @for Client
         * @param {String} endpoint 地址
         * @param {Array} dic 参数
         * @return {Promise} 返回Promise对象
         */
        let params = this.get_params(endpoint, other_params);
        //console.log(params);
        let promise = this.get_base_res("GET",endpoint,params);
        return promise.then(
            value => {
                //console.log('获取了value');
                if(value.code !== 0) {
                    let err_message = 'code:'+value.code +'->'+ value.msg;
                    throw new kdl_error.KdlReadError(err_message);
                }
                return value.data;
            }).catch(error=>{
            console.log('catch error',error);
            return error;
        })
    }

    get_proxy(endpoint,other_params){
        /**
         * 获取代理通用函数
         * @method get_proxy
         * @for Client
         * @param {String} endpoint 地址
         * @param {Array} other_params 参数
         * @return {Promise} 返回Promise对象
         */
        let params =this.get_params(endpoint,other_params);
        let promise =  this.get_base_res("GET",endpoint,params);
        return promise.then(value => {
            if(value.code !== 0) {
                let err_message = 'code:'+value.code +'->'+ value.msg;
                throw new kdl_error.KdlReadError(err_message);
            }
            return  value.data['proxy_list'];
        }).catch(error=>{
            console.log('catch error',error);
            return error;
        });
    }
    get_params(endpoint, kwargs){
        /**
         * 构造请求参数
         * @method get_params
         * @for Client
         * @param {String} endpoint 要访问的地址
         * @param {Array} kwargs 字典。
         * @return {Array} 返回值这加工之后的参数
         */
        //console.log('kwargs:',kwargs);
        kwargs["orderid"] = this.auth.order_id;
        let sign_type = kwargs['sign_type'];

        let raw_str = "";
        // console.log('这个时候的res',res);
        // console.log('sign_type：',sign_type);
        try {
            if(sign_type === 'simple'){
                kwargs["signature"] = this.auth.api_key;
            }
            else if(sign_type === 'hmacsha1'){
                kwargs["timestamp"] = Date.now();
                if (endpoint === kdl_utils.EndPoint.SetIpWhitelist){
                    raw_str  = this.auth.get_string_to_sign("POST",endpoint,kwargs);
                }
                else{
                    raw_str = this.auth.get_string_to_sign("GET",endpoint,kwargs);
                    //console.log('raw-str:',raw_str);
                }
                kwargs["signature"] = this.auth.sign_str(raw_str);
            }
            else{
                //抛异常
                throw new kdl_error.KdlNameError('unknown sign_type '+sign_type);
            }
        }catch (e) {
            console.log('catch error :');
            console.log(e);
        }
        return kwargs;
    }
    get_base_res(method, endpont, params){
        /**
         * 处理基础请求
         * @method 方法名
         * @for Client
         * @param {String} method 请求方式
         * @param {String} endpont 结尾的域名
         * @param {String} method 请求方式
         * @return {Promise} 返回promise对象
         */
        let url = "https://" + endpont;
        try{
            if(method==='GET'){
                return axios.get(url,{
                    params,}).then(response =>{
                    //console.log(response.data);
                    return response.data; //返回结果
                }).catch(error =>{
                        console.log(error);
                        return 'error!!';
                    }
                );
            }
            else if(method==='POST'){
                //console.log('post data',params);
                let data = kdl_utils.get_query_str(params);
                return axios.post(url,data,{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then(
                    response=>{
                        return response;
                    }
                ).catch(error=>{
                    console.log(error);
                    return 'error!!';
                })
            }
            else{
                throw new kdl_error.KdlTypeError('method type error');
            }
        }catch (e) {
            console.log('catch error :');
            console.log(e);
        }


    }
}
module.exports = Client;

