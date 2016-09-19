var captcha = require('../index')
var fs = require('fs')
var path = require('path')
var target = __dirname + '/gen.png';

captcha.genCaptcha({},function(err,data){
    if(err){
        console.trace(err.stack);
        return
    }
    fs.writeFileSync(target,data.data);
});
