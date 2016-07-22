# Overview

Gulpist is a static asset build tool. It automates some common front-end developerment tasks such as LESS and Coffee compilation, Browserify bundling, file concatenation, image compression, etc.

Gulpist is built on [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md). It is just a regular Node.js program, so it is extremely flexible and easy to extend and customize. You could use all the available Node.js modules (ex: Browserify) in your task codes, or even write your own customize task.


# Get Started

System Requirement

- [Node.js](https://nodejs.org/)
- [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)

### 1. Install Node Dependencies

```
npm install gulpist -g
```

### 2. Task Configuration

Copy `gulpist_config.example.json` file into `YOUR_STATIC_PROJECT_DIR/gulpist_config.json`. This file contains configuration for all the tasks.


# Run Gulpist

All the Gulp tasks are run in the follow command syntax

```
cd YOUR_STATIC_PROJECT_DIR
gulpist [task name]
```


# Gulpist Tasks

Here is a list of tasks and their required configuration. Task with `:watch` suffix means it will continuous
watch for file change and rerun the task when changes occurred.


### less

```
gulpist less
gulpist less:watch
```

Configuration

```json
"less": {
    "dest": "..",
    "src": "css/web_app.less",
    "prefix": ".less.",
    "watch": ["**/*.less", "../images/*.less"]
}
```

- `prefix`: Optional. If specified, the task will output the result file with the given prefix.



### coffee

```
gulpist coffee
gulpist coffee:watch
```

Configuration

```json
"coffee": {
    "dest": ".",
    "jshint": true,
    "prefix": ".coffee.",
    "src": "**/*.coffee"
}
```

- `prefix`: Optional. If specified, the task will output the result file with the given prefix.


### browserify

```
gulpist browserify
gulpist browserify:watch
```

Configuration

```json
"browserify": {
    "dest": "../web_app_bundle.js",
    "src": "./init/.coffee.InitTodoist.js"
}
```


### babel

```
gulpist babel
gulpist babel:watch
```

Configuration

```json
"babel": {
    "dest": ".",
    "prefix": ".es6.",
    "src": "**/*.es6.js"
}
```

- `prefix`: Optional. If specified, the task will output the result file with the given prefix.



### sprite

```
gulpist sprite
```

Configuration

```json
"sprite": [
    {
        "imgSrc": "images/icons/*.png",
        "retinaSrcFilter": "images/icons/*@2x.png",
        "destDir": "./images",
        "imgName": "cmp_images.png",
        "retinaImgName": "cmp_images@2x.png",
        "cssName": "cmp_images.css",
        "lessName": "cmp_images.less",
        "imgPath": "/static/images/cmp_images.png",
        "retinaImgPath": "/static/images/cmp_images@2x.png",
        "imgOptim": false,
        "sortImgsByHeight": true,
        "cssTemplate": "css/cmp_images.template.handlebars",
        "cssHandlebarsHelpers": "js/gulpist.sprite.cmp_images.js"
    },
    {
        "imgSrc": "images/tips/*.png",
        "retinaSrcFilter": "images/tips/*@2x.png",
        "destDir": "./images",
        "imgName": "cmp_tips.png",
        "retinaImgName": "cmp_tips@2x.png",
        "cssName": "cmp_tips.css",
        "lessName": "cmp_tips.less",
        "imgPath": "/static/images/cmp_tips.png",
        "retinaImgPath": "/static/images/cmp_tips@2x.png",
        "imgOptim": true,
        "sortImgsByHeight": false,
        "cssTemplate": "css/cmp_tips.template.handlebars",
        "cssHandlebarsHelpers": "js/gulpist.sprite.cmp_tips.js"
    },...
]
```


- `imgPath`: URL path of the sprite image that will be referenced in the CSS file.

```css
.cmp_activity_added_comment {
  background: url(/static/images/cmp_images.png) 0 0 no-repeat;
  ...
}
```
- `retinaImgPath`: Optional. URL path of the retina sprite image that will be referenced in the CSS file.

- `lessName`: Optional. If specified, the task will also output a .less file with the given name.

- `imgOptim`: Optional. Default: `false`. If set to `true` will use gifsicle for GIF, jpegtran for JPEG, optipng for PNG and svgo for SVG.

- `sortImgsByHeight`: Optional. Default: `true`. By default, images are sort by height (shorter on top, tallest on bottom). If set to `false`, images will be sort alphabetically.

- `cssTemplate`: Should point to the path of the CSS template file. Use the file `css_example.template.handlebars` as an example. If you're not including any retina properties in your gulpist settings, feel free to remove the retina styles from the example.

- `cssHandlebarsHelpers`: Optional. Should point to the path of the JS file containing the helpers. The content of this file should be an object where each key is the name of the helper and its value is the helper function itself. Example:
```js
{
    lowerCase: function(filename) {
        return filename.toLowerCase();
    },
    upperCase: function(filename) {
        return filename.toUpperCase();
    }
}
```
Which would then be used in the CSS template file as:
```css
.cmp_{{ lowerCase name }} {
}
```
Refer to the [Handlebars documentation](http://handlebarsjs.com/#helpers) if needed.

#### notes
All of the retina settings (`retinaSrcFilter`, `retinaImgName` and `retinaImgPath`) are optional. But if you add one of them, you should add all of them.

Avoid image filenames containing `-` or spaces. Make sure the retina images are in the same folder as the normal ones. For retina images just add the `@2x` suffix.

You can use the name of the file as a class name in your CSS–as shown in the `css_example.template.handlebars` file. You can further tweak this by adding a helper with the `cssHandlebarsHelpers` property.

Have in mind that the `gulpist sprite` command is generating a new CSS file. For this CSS file to be loaded by the browser you might need to `@import` it into your main CSS file.
