
# Overview 
Gulpist is a static asset build tool. It automates some common front-end developerment tasks such as LESS and Coffee compilation, Browserify bundling, file concatenation, image compression…etc. 

Gulpist is built on [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md). It is just a regular Node.js program, so it is extremely flexible and easy to extend and customize. You could use all the available Node.js modules (ex: Browserify) in your task codes, or even write your own customize task.



# Get Started

System Requirement 

- [Node.js](https://nodejs.org/)
- [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)

#### 1. Install Node Dependencies
```
npm install
```

#### 2. Task Configuration
Copy `gulpist.example.json` file into `YOUR_STATIC_PROJECT_DIR/gulpist.json`. This file contains configuration for all the tasks.


# Run Gulp
All the Gulp tasks are run in the follow command syntax

```
gulp [task name] --config YOUR_STATIC_PROJECT_DIR/gulpist.json
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

Feel free to edit `gulpfile.js` to configure what tasks to be run for each of these three major tasks. You can remove the tasks that you don’t want to run.


