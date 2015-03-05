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
    dist: "./teamcom/apps/web/static/js/"
  },

}
