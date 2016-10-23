# captcha-node

[![NPM](https://nodei.co/npm/captcha-node.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/captcha-node/)


 create captcha with ImageMagick or GraphicsMagick

## demo

![demo](demo/gen.png)



## prepare

* install ImageMagick

```
brew install imagemagick
```

or if you want to use GraphicsMagick

```
brew install graphicsmagick
```

Installation for other systems: [ImageMagick](http://www.imagemagick.org/script/binary-releases.php), [GraphicsMagick](http://www.graphicsmagick.org/README.html)

* install package


```
npm install captcha-node
```

## sample code

callback

```
var captcha = require('captcha-node')
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

co

```
co(function* (){
  return yield captcha.genCaptcha({})
}).then((data) => {
  fs.writeFileSync(target,data.data);
}).catch(console.error.bind(console));

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
* engine - `ImageMagick` by default. Set as `GraphicsMagick` if you use it.
