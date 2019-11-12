class KdlReadError extends Error{
    constructor(message,){
        super(message);
        this.name = 'KDL Error'
    }
}

class KdlStatusError extends  Error{
    constructor(message,){
        super(message);
        this.name = 'KDL Status Error'
    }
}

class KdlNameError extends Error{
    constructor(message,){
        super(message);
        this.name = 'KDL Name Error'
    }
}

class KdlTypeError extends  Error{
    constructor(message,){
        super(message);
        this.name = 'KDL Type Error'
    }
}

exports.KdlReadError = KdlReadError;
exports.KdlStatusError = KdlStatusError;
exports.KdlNameError = KdlNameError;
exports.KdlTypeError = KdlTypeError;
