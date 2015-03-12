

# Overview 

Gulp is a build automation system built on top of Node.js. It is used to automate building of static assets, such as compilation of LESS and Coffee, Browserify bundling, file concatenation, image compression…etc. 

Since it is just a regular Node.js program, Gulp is extremely flexible of what it could do. You are not refined to use Gulp specific plugins. You could use all the available Node.js modules (ex: Browserify) or even write your own.



# Get Started

### System Requirement 
- [Node.js](https://nodejs.org/)
- [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)

### Install Node Dependencies
At your doist_gulp directory, install required Node dependencies:
```
npm install
```


# Run Gulp
### Task Configuration
`config.js` contains configuration for all the tasks. There you specified things like path of your source .less .coffee. 

Make sure your have correct path configuration before you run Gulp.

### Start Gulp
All the Gulp tasks are run in the follow command syntax

```
gulp [task name]
```

Three major tasks have been configured in `gulpfile.js`:

- `gulp build` Compiles all the static assets (less, coffee, browserify)

- `gulp watch` Compiles all the assets and also start file watch process. File change events will trigger compilation tasks.

- `gulp sync` Same as `gulp watch`, but it will also start a BrowserSync server which will reload your browser when asset compilation is done.

Feel free to edit `gulpfile.js` to configure what tasks to be run for each of these three major tasks. You can remove the tasks that you don’t want to run.

### Running Small Individual Tasks.
`tasks/` directory contains tasks that could be run individually as well. 

For instance, if you only need to build .coffee, you could only run the “coffee” task (which is in `coffee.js`)
```
gulp coffee
``` 


# Gulp Directory Structure
- `gulpfile.js` The main entry point of Gulp. 
- `config.js` Contains the configuration for all tasks. 
- `tasks/` This directory contains codes for each individual tasks (LESS, Coffee, Browserify…etc).




# TODO
- Provide 'build-dist' task that built asset for production usage (i.e: discard source map)

