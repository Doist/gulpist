module.exports = {

  //your project directory relative to doist_gulp
  workDir: "../Todoist",

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
    dist: "./teamcom/apps/web/static/js/"
  },

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
    src: "./todoist/apps/app_platform/static/apps/app_platform/js/.coffee.app.js",
    dist: "./todoist/apps/app_platform/static/apps/app_platform/js/bundle.js"
  },
  


}
