var captcha = require('../index')
var fs = require('fs')
var path = require('path')
var target = __dirname + '/gen.png';
var co = require('co')

captcha.genCaptcha({},function(err,data){
    if(err){
        console.trace(err.stack);
        return
    }
    fs.writeFileSync(target,data.data);
});



co(function* (){
  return yield captcha.genCaptcha({})
}).then((data) => {
  fs.writeFileSync(target,data.data);
}).catch(console.error.bind(console));



// (async function () {
//   var data = await captcha.genCaptcha({})
//   fs.writeFileSync(target,data.data);
// })();
