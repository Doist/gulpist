module.exports = {
  workDir: "../",

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
  
  py_server_file: [
    "todoist/*.py",
  ],

  staticPacks: [
    "runtime/generated/Col_AppPlatformCollection.js",
    "runtime/generated/Col_AppPlatformCollection.css",
  ]
}
