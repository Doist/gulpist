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

Here is a list of tasks that are currently supported. Task with `:watch` suffix means it will continuous 
watch for file change and rerun the task when changes occurred.

- `less`, `less:watch`:  Compile LESS file
- `coffee`, `coffee:watch`:  Compile LESS file
- `browserify`: Create a development bundle (with source map), and production bundle (uglified).
- `browserify:watch`:  Create __only__ the  development bundle, and watch for file change to rebuild.

Batch Tasks:

- `build`: Run "less", "coffee", "browserify" tasks
- `watch` Run "less:watch", "coffee:watch", "browserify:watch" tasks
- `sync` Same as `gulp watch`, but it will also start a BrowserSync server which will reload your browser when asset compilation is done.


# A simple configuraiton example

```json
{
    "less": {
        "watch": "**/*.less",
        "src": "css/web_app.less",
        "dest": "."
    },

    "coffee": {
        "src": "**/*.coffee",
        "dest": ".",
        "prefix": ".coffee.",
        "jshint": true
    },

    "browserify": {
        "src": "./init/.coffee.InitTodoist.js",
        "dest": "web_app_bundle.js"
    }
}
```
