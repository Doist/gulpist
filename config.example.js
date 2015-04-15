module.exports = {

  // REQUIRED 
  // Your working directory relative to this file. All your file configuration 
  // (i.e. less.src) will be relative to this parameter
  workDir: "../TeamCom",


  /*
   * "less" / "less:watch" task configuration (Optional)
   *
   *    - watch   Optinal. Used by the "less:watch" task, it tells which file to watch for change. 
   *              Change event will trigger rebuild. If not set, "src" will be watched instead.
   *    - src     LESS files to be compiled
   *    - dest    Detination "direcotry" for compiled CSS files
   *    - prefix  File name prefix to the compiled CSS files.
   */


//  less: {
//    watch: "teamcom/apps/web/static/css/**/*.less",
//    src: "teamcom/apps/web/static/css/**/app.less",
//    dest: "teamcom/apps/web/static/css/",
//    prefix: ".less."
//  },


  /*
   * "coffee" / "coffee:watch" task configuration (Optional)
   *
   *    - src     CoffeeScript files to be compiled
   *    - dest    Detination "direcotry" for compiled JS files
   *    - prefix  File name prefix to the compiled JS files.
   */

//  coffee: {
//    src: "teamcom/apps/web/static/js/**/*.coffee",
//    dest: "teamcom/apps/web/static/js/",
//    prefix: ".coffee."
//  },


  /*
   * "browserify" task configuration (Optional)
   *
   *    - src     The "app entry point" JS file. ONE file only.
   *    - dest    Detination file path for the bundled JS file. (MUST include filename)
   */

//  browserify: {
//    src: "teamcom/apps/web/static/js/.coffee.app.js",
//    dest: "teamcom/apps/web/static/js/bundle.js"
//  },
//
  
  validateConfig: function() {
    if(!this.hasOwnProperty("workDir")) {
      throw "Configuration error. 'workDir' must be set"
    }
  }

}
