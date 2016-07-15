# Overview 

Gulpist is a static asset build tool. It automates some common front-end developerment tasks such as LESS and Coffee compilation, Browserify bundling, file concatenation, image compression, etc. 

Gulpist is built on [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md). It is just a regular Node.js program, so it is extremely flexible and easy to extend and customize. You could use all the available Node.js modules (ex: Browserify) in your task codes, or even write your own customize task.


# Get Started

System Requirement 

- [Node.js](https://nodejs.org/)
- [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)

#### 1. Install Node Dependencies

```
npm install gulpist -g
```

#### 2. Task Configuration

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


#### less

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



#### coffee

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


#### browserify

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


#### babel

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



#### sprite

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
        "lessName": "cmp_logos.less",
        "imgPath": "/static/images/cmp_images.png",
        "retinaImgPath": "/static/images/cmp_images@2x.png"
    },
    {
        "imgSrc": "images/tips/*.png",
        "retinaSrcFilter": "images/tips/*@2x.png",
        "destDir": "./images",
        "imgName": "cmp_tips.png",
        "retinaImgName": "cmp_tips@2x.png",
        "cssName": "cmp_tips.css",
        "lessName": "cmp_logos.less",
        "imgPath": "/static/images/cmp_tips.png",
        "retinaImgPath": "/static/images/cmp_tips@2x.png"
    },...
]
```


- `imgPath`: URL path of the sprite image that will be refereneced in the CSS file.

```
.cmp_activity_added_comment {
  background: url(/static/images/cmp_images.png) 0 0 no-repeat;
  ...
}
```
- `retinaImgPath`: URL path of the retina sprite image that will be refereneced in the CSS file.
- `lessName`: Optinal. If specified, the task will also output a .less file with the given name.


