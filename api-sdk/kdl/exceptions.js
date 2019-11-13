/**
 * @file 集合kdl包的自定义的异常类
 * @author www.kuaidaili.com
 */


/*
* 状态码异常
* @class KdlStatusError
* @extends Error
 */
class KdlStatusError extends  Error{
    constructor(message,){
        super(message);
        this.name = 'KDL Status Error'
    }
}
/*
* 参数异常
* @class KdlNameError
* @extends Error
 */
class KdlNameError extends Error{
    constructor(message,){
        super(message);
        this.name = 'KDL Name Error'
    }
}

/*
* 类型异常
* @class KdlTypeError
* @extends Error
 */
class KdlTypeError extends  Error{
    constructor(message,){
        super(message);
        this.name = 'KDL Type Error'
    }
}


/*
* 其他的异常
* @class KdlReadError
* @extends Error
 */
class KdlReadError extends Error{
    constructor(message,){
        super(message);
        this.name = 'KDL Error'
    }
}

exports.KdlReadError = KdlReadError;
exports.KdlStatusError = KdlStatusError;
exports.KdlNameError = KdlNameError;
exports.KdlTypeError = KdlTypeError;
