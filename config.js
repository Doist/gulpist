module.exports = {
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
    src: "./todoist/apps/app_platform/static/apps/app_platform/js/app.coffee",
    dest: "todoist/apps/app_platform/static/apps/app_platform/js"
  },

}
