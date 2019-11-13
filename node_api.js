const http = require('http');  // 引入内置http模块

let url = 'http://dev.kuaidaili.com/testproxy';  // 要访问的目标网页

// 采用gzip压缩, 使速度更快
let options = {
	"headers" : {
		"Accept-Encoding": "gzip"
	}
};

http.get(url, options, (res) => {
	
	// 若有gzip压缩, 则解压缩再输出
	if (res.headers['content-encoding'] && res.headers['content-encoding'].indexOf('gzip') != -1) {
		let zlib = require('zlib');
		let gunzipStream = zlib.createGunzip();
		res.pipe(gunzipStream).pipe(process.stdout);
	} else {
		// 无gzip压缩，直接输出
		res.pipe(process.stdout);
	}

}).on("error", (err) => {
	// 错误处理
	console.log("Error: " + err.message);
})