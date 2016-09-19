# captcha-node

[![NPM](https://nodei.co/npm/captcha-node.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/captcha-node/)


 create captcha with ImageMagick

## demo

![demo](demo/gen.png)



## prepare

* install ImageMagick

```
brew install imagemagick
```

* install package


```
npm install captcha-node
```

## sample code

```
var captcha = require('../index')
var fs = require('fs')
var target = __dirname + '/gen.png';
captcha.genCaptcha({},function(err,data){
    if(err){
        console.trace(err.stack);
        return
    }
    fs.writeFileSync(target,data.data);
});
```


## option

* width
* height
* fontsize
* skech
* fontWidth
* bgcolor
* scolor
* fcolor
* text
* font_path
