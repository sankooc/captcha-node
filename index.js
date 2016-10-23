function createPoint(width,height,count){
    var result = [];
    while(result.length < count){
        result.push([parseInt(Math.random() * width),parseInt(Math.random() * height)]);
    }
    return result;
}

var dic = "1234567890qwertyuioplkjhgfdsazxcvbnm";

function getCode(num){
    var len = dic.length;
    var str = '';
    while(str.length < num){
        str += dic.charAt(parseInt(Math.random() * len));
    }
    return str;
}

function createCaptcha(option,callback){
    var width     = option.width     || 150;//canvas width
    var height    = option.height    || 50; //canvas height
    var fontsize  = option.fontsize  || 30;
    var skech     = option.skech     || 10;
    var fontWidth = option.fontWidth || 3;
    var bgcolor   = option.bgcolor   || '#fff';
    var scolor    = option.scolor    || '#ddd';
    var fcolor    = option.fcolor    || '#ccc';
    var text      = option.text;
    var font_path = option.fontPath  || __dirname+'/font/comic.ttf';
    var engine    = option.engine    || 'ImageMagick'; //or 'GraphicsMagick'

    var gm = engine === 'ImageMagick' ? require('gm').subClass({imageMagick: true}) : require('gm');

    var g = gm(width, height, bgcolor).font(font_path, fontsize)
    var points = createPoint(width,height,skech*3);
    var cursor = 0;
    for(var i=skech;i>0;i--){
        g.stroke(scolor,fontWidth).fill(bgcolor).drawBezier(points[++cursor%skech],points[++cursor%skech],points[++cursor%skech])
    }
    g.stroke(fcolor,fontWidth).drawText(0, 0, text,'Center')
    var stream = g.stream('png');
    var bufs = [];
    stream.on('data', function(d){
        bufs.push(d);
    });
    stream.on('end', function(){
        if(bufs.length){
            var buf = Buffer.concat(bufs);
            callback(null,buf);
        }else{
            callback('no buffer');
        }
    });
}

function _genCaptcha(option,callback){
    var text = option.text || getCode(6);
    option.text = text;
    createCaptcha(option,function(err,buf){
        return callback(err,{data:buf,text:text});
    })
}

function _genBase64Captcha(option, callback){
  var text = option.text || getCode(6);
  option.text = text;
  createCaptcha(option,function(err,buf){
      var ret = buf.toString('base64');
      ret = 'data:image/png;base64,'+ ret
      return callback(err,{data:ret,text:text});
  })
}

function _rely(fn){
  return function(option,callback){
    if(callback){
      return fn(option,callback);
    }else{
      return new Promise(function(resolve,reject){
        fn(option,function(err,result){
            if(err){
                return reject(err);
            }
            return resolve(result);
        });
      });
    }
  }
}

exports.genCaptcha = _rely(_genCaptcha);

exports.genBase64Captcha = _rely(_genBase64Captcha);
