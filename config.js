module.exports = {

  workDir: "../TeamCom",

  less: {
    src: "teamcom/apps/web/static/css/**/app.less",
    dist: "teamcom/apps/web/static/css/"
  },

  coffee: {
    src: "teamcom/apps/web/static/js/**/*.coffee",
    dist: "teamcom/apps/web/static/js/"
  },

  browserify: {
    //browserify use different cwd, so path is configured differently
    src: "./teamcom/apps/web/static/js/.coffee.app.js",
    dist: "./teamcom/apps/web/static/js/bundle.js"
  },


  //your project directory relative to doist_gulp
  workDir: "../Todoist",

  less: {
    src: "todoist/apps/app_platform/static/apps/app_platform/css/*.less",
    dist: "todoist/apps/app_platform/static/apps/app_platform/css"
  },

  coffee: {
    src: "todoist/apps/app_platform/static/apps/app_platform/js/*.coffee",
    dist: "todoist/apps/app_platform/static/apps/app_platform/js"
  },

  browserify: {
    //browserify use different cwd, so path is configured differently

    //Note: Browserify will also resolve module dependency (searching for node_modules) 
    //by tree searching for node_modules/, starting from your workDir and stopping at your src dir
    src: "./todoist/apps/app_platform/static/apps/app_platform/js/.coffee.app.js",
    dist: "./todoist/apps/app_platform/static/apps/app_platform/js/bundle.js"
  },
  






}
