#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander');
var http = require('http');
var md5 = require('md5');
var isChinese = require('is-chinese');
var superagent = require('superagent');
var cheerio = require('cheerio');
var querystring = require('querystring');
 
program
  .version('0.1.0')
  .description('输入要翻译的单词即可使用')
  .option('-d, --description', '欢迎使用Command翻译小助手！(by wiestlee)')
  .option('-a, --an', 'Add a english word')
  .parse(process.argv);
 
console.log('-- 翻译中请稍后... --');

// 命令行请输入 --translate 
if (program.an) {
	var parmas = process.argv.slice(3).toString();
	var translateUrl = isChinese(parmas) ? "http://dict.youdao.com/w/eng/":"http://dict.youdao.com/search?q=";
	var fullUrl = translateUrl+parmas;
	if( parmas && isChinese(parmas) ){
		  var timestamp = new Date().getTime();
		  var appid = 2015063000000001;
		  var key = '12345678';
		  var sign = md5(appid +  parmas + timestamp + key);
		  var param = {
		    'q':  parmas,
		    'from':'zh',
		    'to':'en',
		    'appid': appid,
		    'salt': timestamp,
		    'sign': sign
		  };
		  var content = querystring.stringify(param);
		  var options = {
			    hostname: 'api.fanyi.baidu.com',
			    port: 80,
			    path: '/api/trans/vip/translate?' + content,
			    method: 'GET'
			  };
		 var req = http.request(options, function (res) {
		    res.setEncoding('utf8');
		    res.on('data', function (data) {
		      console.log(parmas + ' 的翻译结果为：');
		      console.log(JSON.parse(data).trans_result[0].dst);
		      console.log('-- 翻译完毕 --')
		    });
		  });
         req.end();
	} else {
		if(parmas){
           superagent.get(fullUrl)
               .end(function(err,res){
               	  if(err){
               	  	  console.log("请检查网络是否错误");
               	  }
               	  var $ = cheerio.load(res.text);
                  var resultdata = $('#phrsListTab .trans-container').text().trim();
                  console.log(parmas + ' 的翻译结果为：');
                  console.log(resultdata);
                  console.log('-- 翻译完毕 --')
               })

		}else{
			console.log("记得输入点儿东西哦...");
		}
	}
	
}
