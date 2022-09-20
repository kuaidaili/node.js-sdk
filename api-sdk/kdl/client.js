/**
 * @file auth模块 主要记录订单和订单的secret_key
 * 需要先安装axios包：
 * npm install npm
 * @author www.kuaidaili.com
 */


const kdlUtils = require('./kdlUtils');
const axios = require('axios');
const kdlError = require('./exceptions');
const fs = require('fs');

const secretPath = './.secret'

/**
 * 客户端类
 *
 * @class Client
 * @constructor
 * @param auth auth对象
 */
class Client {
    constructor(auth) {
        this.auth = auth;
        this.res = {}
    }

    /**
     * 获取订单到期时间，强制token签名验证
     *
     * @method getOrderExpireTime
     * @for Client
     * @param  {String} signType 鉴权方式，具体可查看官网：https://www.kuaidaili.com/doc/api/auth/
     * @return {Promise} 返回Promise对象
     */
    getOrderExpireTime(signType = "token") {
        let ENDPOINT = kdlUtils.ENDPOINT.GET_ORDER_EXPIRE_TIME;
        let dic = {};
        dic['sign_type'] = signType;
        return this.returnPromise(ENDPOINT,dic,'expire_time');

    }

    /**
     * 获取开放代理，强制token签名验证
     *
     * @method getOpsProxy
     * @for Client
     * @param  {String} signType 鉴权方式，具体可查看官网：https://www.kuaidaili.com/doc/api/auth/
     * @param  {Number} num 提取数量
     * @param  {String} orderLevel 开放代理订单类型
     * @param  {{}} otherParams 其他参数字典
     * @return {Promise} 返回Promise对象
     */
    getOpsProxy(num=0, orderLevel=OPS_ORDER_LEVEL.NORMAL, signType="token", otherParams={}) {
        //console.log(otherParams);
        let ENDPOINT = kdlUtils.ENDPOINT.GET_OPS_PROXY_NORMAL_OR_VIP;
        if(orderLevel===kdlUtils.OPS_ORDER_LEVEL.SVIP)
            ENDPOINT = kdlUtils.ENDPOINT.GET_OPS_PROXY_SVIP;
        if(orderLevel===kdlUtils.OPS_ORDER_LEVEL.PRO)
            ENDPOINT = kdlUtils.ENDPOINT.GET_OPS_PROXY_ENT;
        // TODO 之所以把其他参数和num，order_level,sign_type分开是为了方便用户，可能有更好的方案
        otherParams['num'] = num;
        otherParams['order_level'] = orderLevel;
        otherParams['sign_type'] = signType;
        return this.getProxy(ENDPOINT,otherParams);
    }

    /**
     * 检验开放代理的有效性，强制token签名验证
     *
     * @method checkOpsValid
     * @for Client
     * @param  {Array} proxyList 代理ip列表
     * @param  {String} signType 鉴权方式
     * @return {Promise} 返回Promise对象
     */
    checkOpsValid(proxyList, signType='token') {
        let ENDPOINT = kdlUtils.ENDPOINT.CHECK_OPS_VALID;
        let str = kdlUtils.getProxyStr(proxyList);
        let dic = {};
        dic['sign_type'] = signType;
        dic['proxy'] = str;
        return this.checkValidOrTime(ENDPOINT,dic);
    }

    /**
     * 获取ip白名单，强制token签名验证
     *
     * @method getIpWhitelist
     * @for Client
     * @param  {String} signType 鉴权方式
     * @return {Promise} 返回Promise对象
     */
    getIpWhitelist(signType = "token") {
        let ENDPOINT = kdlUtils.ENDPOINT.GET_IP_WHITELIST;
        let dic =  {};
        dic['sign_type'] = signType;
        return this.returnPromise(ENDPOINT,dic,'ipwhitelist');
    }

    /**
     * 设置ip白名单，强制token签名验证
     *
     * @method setIpWhitelist
     * @for Client
     * @param  {String} ip_list ip列表，默认为把白名单设置为本地ip
     * @param  {String} signType 鉴权方式
     * @return {Promise} 返回Promise对象
     */
    setIpWhitelist(ip_list="localhost", signType='token') {
        console.log(ip_list);
        let ENDPOINT = kdlUtils.ENDPOINT.SET_IP_WHITELIST;
        let dic = {};
        dic['sign_type'] = signType;
        if (ip_list!=="localhost") {
            dic['iplist'] = ip_list;    //当给予了参数，才会带上这个iplist，不给予参数就不会，也就是设置为本地ip.
        } 
        let params = this.getParams(ENDPOINT,dic);
        let promise =  this.getBaseRes("POST",ENDPOINT,params);
        return promise.then(value=> {
        }).catch(error=> {
        });
    }
    /**
     * 获取代理鉴权信息，强制token签名验证
     * 
     * @method getProxyAuthorization
     * @for Client
     * @param  {Number} plainText 是否返回
     * @param  {String} signType 鉴权方式
     * @return {Promise} 返回Promise对象
     */
    getProxyAuthorization(plainText = 0,signType = "token") {
        let ENDPOINT = kdlUtils.ENDPOINT.GET_PROXY_AUTHORIZATION;
        let dic = {};
        dic['sign_type'] = signType;
        dic['plaintext'] = plainText;
        return this.returnPromise(ENDPOINT,dic,'alldata');
    }

    /**
     * 获取私密代理，强制token签名验证
     *
     * @method getDpsProxy
     * @for Client
     * @param  num 提取的数量
     * @param  {String} signType 鉴权方式
     * @param  {Array} otherParams 其他参数字典
     * @return {Promise} 返回Promise对象
     */
    getDpsProxy(num=0, signType="token", otherParams={}) {
        otherParams['num'] = num;
        otherParams['sign_type'] = signType;
        let ENDPOINT = kdlUtils.ENDPOINT.GET_DPS_PROXY;

        return this.getProxy(ENDPOINT,otherParams);
    }

    /**
     * 检验私密代理ip有效性，强制token签名验证
     *
     * @method checkDpsValid
     * @for Client
     * @param  {String} proxyList ip列表
     * @param  {String} signType 鉴权方式
     * @return {Promise} 返回Promise对象
     */
    checkDpsValid(proxyList, signType='token') {
        let ENDPOINT = kdlUtils.ENDPOINT.CHECK_DPS_VALID;
        let str = kdlUtils.getProxyStr(proxyList);
        let dic = {};
        dic['sign_type'] = signType;
        dic['proxy'] = str;
        return this.checkValidOrTime(ENDPOINT,dic);
    }

    /**
     * 检验dps_ip有效性，强制token签名验证
     *
     * @method getDpsValidTime
     * @for Client
     * @param  {String} proxyList ip列表
     * @param  {String} signType 鉴权方式
     * @return {Promise} 返回Promise对象
     */
    getDpsValidTime(proxyList, signType='token') {
        let ENDPOINT = kdlUtils.ENDPOINT.GET_DPS_VALID_TIME;
        let str = kdlUtils.getProxyStr(proxyList);
        let dic = {};
        dic['sign_type'] = signType;
        dic['proxy'] = str;
        return this.checkValidOrTime(ENDPOINT,dic);
    }

    /**
     * 此接口只对按量付费订单和包年包月的集中提取型订单有效
     * 获取计数版订单ip余额, 强制token签名验证
     *
     * @method getIpBalance
     * @for Client
     * @param  {String} signType 鉴权方式
     * @return {Promise} 返回Promise对象
     */
    getIpBalance(signType='token') {
        let ENDPOINT = kdlUtils.ENDPOINT.GET_IP_BALANCE;
        let dic = {};
        dic['sign_type'] = signType;
        return this.returnPromise(ENDPOINT,dic,'balance');
    }

    /**
     * 获取独享代理，强制token签名验证
     *
     * @method getKpsProxy
     * @for Client
     * @param  {String} signType 鉴权方式
     * @param  {Array} otherParams 其他参数字典
     * @return {Promise} 返回Promise对象
     */
    getKpsProxy(num=0, signType="token", otherParams= {}) {
        otherParams['num'] = num;
        otherParams['sign_type'] = signType;
        let ENDPOINT = kdlUtils.ENDPOINT.GET_KPS_PROXY;
        return this.getProxy(ENDPOINT,otherParams);
    }

    /**
     * 获取当前隧道代理的ip，强制token签名验证
     *
     * @method tpsCurrentIp
     * @for Client
     * @param  {String} signType 鉴权方式
     * @return {Promise} 返回Promise对象
     */
    tpsCurrentIp(signType="token") {
        let ENDPOINT = kdlUtils.ENDPOINT.TPS_CURRENT_IP;
        let dic = {};
        dic['sign_type'] = signType;
        return this.returnPromise(ENDPOINT,dic,'current_ip');
    }

    /**
     * 修改隧道代理当前ip，强制token签名验证
     *
     * @method changeTpsIp
     * @for Client
     * @param  {String} signType 鉴权方式
     * @return {Promise} 返回Promise对象
     */
    changeTpsIp(signType="token") {
        let ENDPOINT = kdlUtils.ENDPOINT.CHANGE_TPS_IP;
        let dic = {};
        dic['sign_type'] = signType;
        return this.returnPromise(ENDPOINT,dic,'new_ip');
    }

    /**
     * 获取隧道代理IP，强制token签名验证
     *
     * @method getTps
     * @for Client
     * @param  num 提取的数量
     * @param  {String} signType 鉴权方式
     * @param  {Array} otherParams 其他参数字典
     * @return {Promise} 返回Promise对象
     */
    getTps(num=0, signType="token", otherParams={}) {
        otherParams['num'] = num;
        otherParams['sign_type'] = signType;
        let ENDPOINT = kdlUtils.ENDPOINT.GET_TPS_IP;
        return this.getProxy(ENDPOINT,otherParams);
    }


    /**
     * 返回Promise对象的通用函数
     *
     * @method returnPromise
     * @for Client
     * @param  {String} ENDPOINT 地址
     * @param  {Array} otherParams 参数
     * @param  {String} key 要从response.data获取的key
     * @return {Promise} 返回Promise对象
     */
    returnPromise(ENDPOINT, otherParams, key) {
        let params = this.getParams(ENDPOINT,otherParams);
        let promise =  this.getBaseRes("GET",ENDPOINT,params);
        return promise.then(value => {
            if(value.code !== 0) {
                let err_message = 'code:'+value.code +'->'+ value.msg;
                throw new kdlError.KdlReadError(err_message);
            }
            if(key === "alldata") {
                return value.data;
            }
            else {
                return value.data[key];
            }
        }).catch(error => {
            console.log('catch error: ',error);
            return error;
        });
    }

    /**
     * 检验代理有效性通用函数
     *
     * @method check_valid
     * @for Client
     * @param  {String} ENDPOINT 地址
     * @param  otherParams
     * @return {Promise} 返回Promise对象
     */
    checkValidOrTime(ENDPOINT, otherParams) {
        let params = this.getParams(ENDPOINT, otherParams);
        //console.log(params);
        let promise = this.getBaseRes("GET",ENDPOINT,params);
        return promise.then(
            value => {
                if(value.code !== 0) {
                    let err_message = 'code:'+value.code +'->'+ value.msg;
                    throw new kdlError.KdlReadError(err_message);
                }
                return value.data;
            }).catch(error=> {
            console.log('catch error',error);
            return error;
        })
    }

    /**
     * 获取代理通用函数
     *
     * @method getProxy
     * @for Client
     * @param  {String} ENDPOINT 地址
     * @param  {{}} otherParams 参数
     * @return {Promise} 返回Promise对象
     */
    getProxy(ENDPOINT, otherParams) {
        let params =this.getParams(ENDPOINT,otherParams);
        let promise =  this.getBaseRes("GET",ENDPOINT,params);
        return promise.then(value => {
            if(value.code !== 0) {
                let err_message = 'code:'+value.code +'->'+ value.msg;
                throw new kdlError.KdlReadError(err_message);
            }
            return  value.data['proxy_list'];
        }).catch(error=> {
            console.log('catch error',error);
            return error;
        });
    }

    /**
     * 获取user agent，强制token签名验证
     *
     * @method getUA
     * @for Client
     * @param  num 提取的数量
     * @param  {String} signType 鉴权方式
     * @param  {Array} otherParams 其他参数字典
     * @return {Promise} 返回Promise对象
     */
    getUA(num=0, signType="token", otherParams={}) {
        otherParams['num'] = num;
        otherParams['sign_type'] = signType;
        let ENDPOINT = kdlUtils.ENDPOINT.GET_UA;
        let params =this.getParams(ENDPOINT,otherParams);
        let promise =  this.getBaseRes("GET",ENDPOINT,params);
        // console.log(promise)
        return promise.then(value => {
            if(value.code !== 0) {
                let err_message = 'code:'+value.code +'->'+ value.msg;
                throw new kdlError.KdlReadError(err_message);
            }
            return  value.data['ua_list'];
        }).catch(error=> {
            console.log('catch error',error);
            return error;
        });
    }

    /**
     * 获取指定地区编码
     *
     * @method getAreaCode
     * @for Client
     * @param  area 地区名称
     * @param  {String} signType 鉴权方式
     * @param  {Array} otherParams 其他参数字典
     * @return {Promise} 返回Promise对象
     */
    getAreaCode(area, signType="token", otherParams={}) {
        otherParams['area'] = area;
        otherParams['sign_type'] = signType;
        let ENDPOINT = kdlUtils.ENDPOINT.GET_AREA_CODE;
        let params =this.getParams(ENDPOINT,otherParams);
        let promise =  this.getBaseRes("GET",ENDPOINT,params);

        return promise.then(value => {
            if(value.code !== 0) {
                let err_message = 'code:'+value.code +'->'+ value.msg;
                throw new kdlError.KdlReadError(err_message);
            }
            return  value.data;
        }).catch(error=> {
            console.log('catch error',error);
            return error;
        });
    }


    /**
     * 获取账户余额
     *
     * @method getAccountBalance
     * @for Client
     * @param  {String} signType 鉴权方式
     * @param  {Array} otherParams 其他参数字典
     * @return {Promise} 返回Promise对象
     */
    getAccountBalance(signType="token", otherParams={}) {
        otherParams['sign_type'] = signType;
        let ENDPOINT = kdlUtils.ENDPOINT.GET_ACCOUNT_BALANCE;
        let params = this.getParams(ENDPOINT,otherParams);
        let promise =  this.getBaseRes("GET",ENDPOINT,params);

        return promise.then(value => {
            if(value.code !== 0) {
                let err_message = 'code:'+value.code +'->'+ value.msg;
                throw new kdlError.KdlReadError(err_message);
            }
            return  value.data;
        }).catch(error=> {
            console.log('catch error',error);
            return error;
        });
    }


    /**
     * 创建订单，自动从账户余额里结算费用
     *
     * @method createOrder
     * @for Client
     * @param  {String} product  开通的产品类型
     * @param  {String} pay_type 付费方式
     * @param  {String} signType 鉴权方式
     * @param  {Array} otherParams 其他参数字典
     * @return {Promise} 返回Promise对象
     */
    createOrder(product, pay_type, signType="hmacsha1", otherParams={}) {
        otherParams['product'] = product;
        otherParams['pay_type'] = pay_type;
        otherParams['sign_type'] = signType;
        let ENDPOINT = kdlUtils.ENDPOINT.Create_Order;
        let params =this.getParams(ENDPOINT,otherParams);
        let promise =  this.getBaseRes("GET",ENDPOINT,params);

        return promise.then(value => {
            if(value.code !== 0) {
                let err_message = 'code:'+value.code +'->'+ value.msg;
                throw new kdlError.KdlReadError(err_message);
            }
            return  value;
        }).catch(error=> {
            console.log('catch error',error);
            return error;
        });
    }


    /**
     * 获取订单的详细信息
     *
     * @method getOrderInfo
     * @for Client
     * @param  {String} signType 鉴权方式
     * @param  {Array} otherParams 其他参数字典
     * @return {Promise} 返回Promise对象
     */
    getOrderInfo(signType="hmacsha1", otherParams={}) {
        otherParams['sign_type'] = signType;
        let ENDPOINT = kdlUtils.ENDPOINT.Get_Order_Info;
        let params =this.getParams(ENDPOINT,otherParams);
        let promise =  this.getBaseRes("GET",ENDPOINT,params);

        return promise.then(value => {
            if(value.code !== 0) {
                let err_message = 'code:'+value.code +'->'+ value.msg;
                throw new kdlError.KdlReadError(err_message);
            }
            return  value;
        }).catch(error=> {
            console.log('catch error',error);
            return error;
        });
    }


    /**
     * 开启/关闭自动续费
     *
     * @method setAutoRenew
     * @for Client
     * @param  {String} autorenew 开启/关闭自动续费
     * @param  {String} signType 鉴权方式
     * @param  {Array} otherParams 其他参数字典
     * @return {Promise} 返回Promise对象
     */
    setAutoRenew(autorenew, signType="token", otherParams={}) {
        otherParams['autorenew'] = autorenew;
        otherParams['sign_type'] = signType;
        let ENDPOINT = kdlUtils.ENDPOINT.Set_Auto_Renew;
        let params =this.getParams(ENDPOINT,otherParams);
        let promise =  this.getBaseRes("GET",ENDPOINT,params);

        return promise.then(value => {
            if(value.code !== 0) {
                let err_message = 'code:'+value.code +'->'+ value.msg;
                throw new kdlError.KdlReadError(err_message);
            }
            return  value;
        }).catch(error=> {
            console.log('catch error',error);
            return error;
        });
    }


    /**
     * 关闭指定订单, 此接口只对按量付费(后付费)订单有效
     *
     * @method closeOrder
     * @for Client
     * @param  {String} signType 鉴权方式
     * @param  {Array} otherParams 其他参数字典
     * @return {Promise} 返回Promise对象
     */
    closeOrder(signType="hmacsha1", otherParams={}) {
        otherParams['sign_type'] = signType;
        let ENDPOINT = kdlUtils.ENDPOINT.Close_Order;
        let params =this.getParams(ENDPOINT,otherParams);
        let promise =  this.getBaseRes("GET",ENDPOINT,params);

        return promise.then(value => {
            if(value.code !== 0) {
                let err_message = 'code:'+value.code +'->'+ value.msg;
                throw new kdlError.KdlReadError(err_message);
            }
            return  value;
        }).catch(error=> {
            console.log('catch error',error);
            return error;
        });
    }


    /**
     * 查询独享代理有哪些城市可供开通。对于IP共享型还可查询到每个城市可开通的IP数量
     *
     * @method queryKpsCity
     * @for Client
     * @param  {String} serie 独享类型
     * @param  {String} signType 鉴权方式
     * @param  {Array} otherParams 其他参数字典
     * @return {Promise} 返回Promise对象
     */
    queryKpsCity(serie, signType="hmacsha1", otherParams={}) {
        otherParams['serie'] = serie;
        otherParams['sign_type'] = signType;
        let ENDPOINT = kdlUtils.ENDPOINT.Query_Kps_City;
        let params =this.getParams(ENDPOINT,otherParams);
        let promise =  this.getBaseRes("GET",ENDPOINT,params);

        return promise.then(value => {
            if(value.code !== 0) {
                let err_message = 'code:'+value.code +'->'+ value.msg;
                throw new kdlError.KdlReadError(err_message);
            }
            return  value;
        }).catch(error=> {
            console.log('catch error',error);
            return error;
        });
    }

    async _getSecretToken() {
        let ENDPOINT = kdlUtils.ENDPOINT.Get_Secret_Token;
        let params = this.getParams(ENDPOINT, {'sign_type': 'simple', 'secret_key': this.auth.secret_key});
        let response = await this.getBaseRes("POST", ENDPOINT, params);

        let value = response.data;
        if(value.code !== 0) {
            let err_message = 'code:'+value.code +'->'+ value.msg;
            throw new kdlError.KdlReadError(err_message);
        }
        let secretToken = value.data.secret_token;
        let expire = value.data.expire;
        let lastTime = (new Date()).getTime();
        return [secretToken, parseInt(expire)*1000, lastTime];
    }

    async _readSecretToken() {
        let buf = fs.readFileSync(secretPath, {encoding:'utf-8'});
        let tokenList = buf.split('|');
        let expire = parseInt(tokenList[1]);
        let lastTime = parseInt(tokenList[2]);
        if (lastTime + expire - 180 * 1000 < (new Date()).getTime()) {  // 过期时重新获取
            tokenList = await this._getSecretToken();
            fs.writeFileSync(secretPath, tokenList.join('|'));
        }
        let secretToken = tokenList[0];
        return secretToken;
    }

    async getSecretToken() {
        try {
            let secretToken = await this._readSecretToken();
            return secretToken;
        } catch {
            let tokenList = await this._getSecretToken();
            fs.writeFileSync(secretPath, tokenList.join('|'));
            return tokenList[0];
        }
    }


    /**
     * 构造请求参数
     *
     * @method getParams
     * @for Client
     * @param  {String} ENDPOINT 要访问的地址
     * @param  {{}} kwargs 字典。
     * @return {Array} 返回值这加工之后的参数
     */
    async getParams(ENDPOINT, kwargs) {
        kwargs["secret_id"] = this.auth.secret_id;
        let signType = kwargs['sign_type'];

        let rawStr = "";
        try  {
            if(signType === 'simple') {
                kwargs["signature"] = this.auth.secret_key;
            } else if(signType === 'hmacsha1') {
                kwargs["timestamp"] = Date.now();
                if (ENDPOINT === kdlUtils.ENDPOINT.SET_IP_WHITELIST) {
                    rawStr  = this.auth.getStringToSign("POST",ENDPOINT,kwargs);
                }
                else {
                    rawStr = this.auth.getStringToSign("GET",ENDPOINT,kwargs);
                }
                kwargs["signature"] = this.auth.signStr(rawStr);
            } else if (signType === 'token') {
                kwargs["signature"] = await this.getSecretToken();
            } else {
                //抛异常
                throw new kdlError.KdlNameError('unknown signType '+signType);
            }
        }catch (e) {
            console.log('catch error :');
            console.log(e);
        }
        return kwargs;
    }

    /**
     * 处理基础请求
     *
     * @method getBaseRes
     * @for Client
     * @param  {String} method 请求方式
     * @param  {String} endpont 结尾的域名
     * @param  {Array} params 请求的参数
     * @param  {String} method 请求方式
     * @return  {Promise} 返回promise对象
     */
    async getBaseRes(method, endpont, params) {
        let url = "https://" + endpont;
        if (params instanceof Promise) {
            params = await params
        }
        try {
            if(method==='GET') {
                return axios.get(url, {
                    params,}).then(response => {
                  
                    return response.data; //返回结果
                }).catch(error => {
                        console.log(error);
                        return 'error!!';
                    }
                );
            }
            else if(method==='POST') {
                let data = kdlUtils.getQueryStr(params);
                return axios.post(url,data, {headers: {'Content-Type':'application/x-www-form-urlencoded'}}).then(
                    response=> {
                        return response;
                    }
                ).catch(error=> {
                    console.log(error);
                    return 'error!!';
                })
            }
            else {
                throw new kdlError.KdlTypeError('method type error');
            }
        }catch (e) {
            console.log('catch error :');
            console.log(e);
        }
    }

    
}
module.exports = Client;

