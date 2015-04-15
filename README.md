
# Overview 
Gulpist is a static asset build tool. It automates some common front-end developerment tasks such as LESS and Coffee compilation, Browserify bundling, file concatenation, image compression…etc. 

Gulpist is built on [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md). It is just a regular Node.js program, so it is extremely flexible and easy to extend and customize. You could use all the available Node.js modules (ex: Browserify) in your task codes, or even write your own customize task.



# Get Started
### System Requirement 
- [Node.js](https://nodejs.org/)
- [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)

### Install Node Dependencies
At your doist_gulp directory, install required Node dependencies:
```
npm install


### Task Configuration
Copy `config.example.js` file to `config.js`. It contains configuration for all the tasks. There you specified things like path of your source .less .coffee. 
```


# Run Gulp
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


### Run Smaller Task.
`tasks/` directory contains tasks that could be run individually as well. For instance, if you only need to build .coffee, you could only run the “coffee” task (which is in `coffee.js`)
```
gulp coffee
``` 


# TODO
- Provide 'build-dist' task that built asset for production usage (i.e: discard source map)
- CSS CDN path replace (Look for path pattern "/static/amilib_images/images/4_bubble_left.png")
- JS CDN path replace ($static_path)

