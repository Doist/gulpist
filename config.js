/*
 *  Gulp build tool configuration
 *
 *  LESS config:
 *    - watch   Optional. Files to be watched. Changes in these file will trigger src compile. 
 *              If not set, "src" will be watched instead.
 *    - src     .less files to be compiled
 *    - dest    Detination direcotry for compiled .css
 *
 *  Coffee config:
 *    - src     .coffee files to be compiled.
 *    - dest    Detination direcotry for compiled .js
 *
 *
 *  Browserify config:
 *    - src     source .js file. ONE file only.
 *    - dest    destination .js file. ONE file only.
 *
 */


module.exports = {

  workDir: "../TeamCom",

  less: {
    watch: "teamcom/apps/web/static/css/**/*.less",
    src: "teamcom/apps/web/static/css/**/app.less",
    dest: "teamcom/apps/web/static/css/",
    destFilePrefix: ".less."
  },

  coffee: {
    src: "teamcom/apps/web/static/js/**/*.coffee",
    dest: "teamcom/apps/web/static/js/",
    destFilePrefix: ".coffee."
  },

  browserify: {
    //browserify use different cwd, so path is configured differently
    src: "teamcom/apps/web/static/js/.coffee.app.js",
    dest: "teamcom/apps/web/static/js/bundle.js"
  },


  //your project directory relative to doist_gulp
  workDir: "../Todoist",

  /*
  less: {
    src: "todoist/apps/static_apps/landing_pages/static/apps/landing_pages/css/*.less",
    dest: "todoist/apps/static_apps/landing_pages/static/apps/landing_pages/css/"
  },

  coffee: {
    src: "todoist/apps/static_apps/serial_promotions/static/js/*.coffee",
    dest: "todoist/apps/static_apps/serial_promotions/static/js",
  },
  */

  less: {
    src: "todoist/apps/app_platform/static/apps/app_platform/css/*.less",
    dest: "todoist/apps/app_platform/static/apps/app_platform/css",
    destFilePrefix: ".less."
  },

  coffee: {
    src: "todoist/apps/app_platform/static/apps/app_platform/js/*.coffee",
    dest: "todoist/apps/app_platform/static/apps/app_platform/js",
    destFilePrefix: ".coffee."
  },

  browserify: {
    //browserify use different cwd, so path is configured differently

    //Note: Browserify will also resolve module dependency (searching for node_modules) 
    //by tree searching for node_modules/, starting from your workDir and stopping at your src dir
    src: "./todoist/apps/app_platform/static/apps/app_platform/js/.coffee.app.js",
    dest: "./todoist/apps/app_platform/static/apps/app_platform/js/bundle.js"
  },

}
