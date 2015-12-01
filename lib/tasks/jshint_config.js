module.exports = {
    // JSHint Default Configuration File (as on JSHint website)
    // See http://jshint.com/docs/ for more details

    "maxerr"        : 50,       // {int} Maximum error before stopping

    // Enforcing
    "bitwise"       : true,     // true: Prohibit bitwise operators (&, |, ^, etc.)
    "camelcase"     : false,    // true: Identifiers must be in camelCase
    "curly"         : false,     // true: Require {} for every new block or scope
    "eqeqeq"        : false,     // true: Require triple equals (===) for comparison
    "forin"         : false,    // true: Require filtering for..in loops with obj.hasOwnProperty()
    "freeze"        : true,     // true: prohibits overwriting prototypes of native objects such as Array, Date etc.
    "immed"         : false,    // true: Require immediate invocations to be wrapped in parens e.g. `(function () { } ());`
    "indent"        : 4,        // {int} Number of spaces to use for indentation
    "latedef"       : false,    // true: Require variables/functions to be defined before being used
    "newcap"        : false,    // true: Require capitalization of all constructor functions e.g. `new F()`
    "noarg"         : true,     // true: Prohibit use of `arguments.caller` and `arguments.callee`
    "noempty"       : true,     // true: Prohibit use of empty blocks
    "nonbsp"        : true,     // true: Prohibit "non-breaking whitespace" characters.
    "nonew"         : false,    // true: Prohibit use of constructors for side-effects (without assignment)
    "plusplus"      : false,    // true: Prohibit use of `++` & `--`
    "quotmark"      : false,    // Quotation mark consistency:
                                //   false    : do nothing (default)
                                //   true     : ensure whatever is used is consistent
                                //   "single" : require single quotes
                                //   "double" : require double quotes
    "undef"         : true,     // true: Require all non-global variables to be declared (prevents global leaks)
    "unused"        : true,     // Unused variables:
                                //   true     : all variables, last function parameter
                                //   "vars"   : all variables only
                                //   "strict" : all variables, all function parameters
    "strict"        : false,     // true: Requires all functions run in ES5 Strict Mode
    "maxparams"     : false,    // {int} Max number of formal params allowed per function
    "maxdepth"      : false,    // {int} Max depth of nested blocks (within functions)
    "maxstatements" : false,    // {int} Max number statements per function
    "maxcomplexity" : false,    // {int} Max cyclomatic complexity per function
    "maxlen"        : false,    // {int} Max number of characters per line
    "varstmt"       : false,    // true: Disallow any var statements. Only `let` and `const` are allowed.

    // Relaxing
    "asi"           : true,     // true: Tolerate Automatic Semicolon Insertion (no semicolons)
    "boss"          : true,     // true: Tolerate assignments where comparisons would be expected
    "debug"         : false,     // true: Allow debugger statements e.g. browser breakpoints.
    "eqnull"        : true,      // true: Tolerate use of `== null`
    "es5"           : false,     // true: Allow ES5 syntax (ex: getters and setters)
    "esnext"        : false,     // true: Allow ES.next (ES6) syntax (ex: `const`)
    "moz"           : false,     // true: Allow Mozilla specific syntax (extends and overrides esnext features)
                                 // (ex: `for each`, multiple try/catch, function expression…)
    "evil"          : false,     // true: Tolerate use of `eval` and `new Function()`
    "expr"          : true,      // true: Tolerate `ExpressionStatement` as Programs
    "funcscope"     : false,     // true: Tolerate defining variables inside control statements
    "globalstrict"  : false,     // true: Allow global "use strict" (also enables 'strict')
    "iterator"      : false,     // true: Tolerate using the `__iterator__` property
    "lastsemic"     : true,     // true: Tolerate omitting a semicolon for the last statement of a 1-line block
    "laxbreak"      : false,     // true: Tolerate possibly unsafe line breakings
    "laxcomma"      : false,     // true: Tolerate comma-first style coding
    "loopfunc"      : true,     // true: Tolerate functions being defined in loops
    "multistr"      : false,     // true: Tolerate multi-line strings
    "noyield"       : false,     // true: Tolerate generator functions with no yield statement in them.
    "notypeof"      : false,     // true: Tolerate invalid typeof operator values
    "proto"         : false,     // true: Tolerate using the `__proto__` property
    "scripturl"     : false,     // true: Tolerate script-targeted URLs
    "shadow"        : true,      // true: Allows re-define variables later in code e.g. `var x=1; x=2;`
    "sub"           : false,     // true: Tolerate using `[]` notation when it can still be expressed in dot notation
    "supernew"      : false,     // true: Tolerate `new function () { ... };` and `new Object;`
    "validthis"     : false,     // true: Tolerate using this in a non-constructor function

    // Environments
    "browser"       : true,     // Web Browser (window, document, etc)
    "browserify"    : false,    // Browserify (node.js code in the browser)
    "couch"         : false,    // CouchDB
    "devel"         : true,     // Development/debugging (alert, confirm, etc)
    "dojo"          : false,    // Dojo Toolkit
    "jasmine"       : false,    // Jasmine
    "jquery"        : false,    // jQuery
    "mocha"         : true,     // Mocha
    "mootools"      : false,    // MooTools
    "node"          : false,    // Node.js
    "nonstandard"   : false,    // Widely adopted globals (escape, unescape, etc)
    "phantom"       : false,    // PhantomJS
    "prototypejs"   : false,    // Prototype and Scriptaculous
    "qunit"         : false,    // QUnit
    "rhino"         : false,    // Rhino
    "shelljs"       : false,    // ShellJS
    "typed"         : false,    // Globals for typed array constructions
    "worker"        : false,    // Web Workers
    "wsh"           : false,    // Windows Scripting Host
    "yui"           : false,    // Yahoo User Interface

    // Custom Globals
"globals"       : {
"require": false,
"_": false,
"BASE_URL": false,
"generalErrorback": false,
"generalCallback": false,
"annotateAjaxData": false,
"$isWebkit": false,
"$isIe": false,
"$isIe8": false,
"$isSafari": false,
"$isOpera": false,
"$isMozilla": false,
"$isMac": false,
"$isChrome": false,
"$queryArgument": false,
"$arrayCreate": false,
"$arrayCompare": false,
"$arrayRemove": false,
"$arrayUpdate": false,
"$arrayCopy": false,
"$arrayDiff": false,
"$arrayUnion": false,
"$arrayForce": false,
"$arrayJoin": false,
"$isIn": false,
"$index": false,
"$first": false,
"$last": false,
"$random": false,
"$arrayFlatten": false,
"$update": false,
"$map": false,
"$rmap": false,
"$filter": false,
"$partial": false,
"$get": false,
"$$": false,
"$all": false,
"$nodeName": false,
"$parent": false,
"$child": false,
"$prevSibling": false,
"$nextSibling": false,
"$body": false,
"$head": false,
"$form": false,
"$selectValue": false,
"$documentInsert": false,
"$toDOM": false,
"$add": false,
"$addToTop": false,
"$replace": false,
"$addAfter": false,
"$addBefore": false,
"$clean": false,
"$swap": false,
"$remove": false,
"$create": false,
"$setHTML": false,
"$xssStrip": false,
"$setVisibility": false,
"$setOpacity": false,
"$show": false,
"$hide": false,
"$isHidden": false,
"$isShown": false,
"$setStyle": false,
"$getStyle": false,
"$setWidth": false,
"$setHeight": false,
"$setLeft": false,
"$setRight": false,
"$setTop": false,
"$setBottom": false,
"$setClass": false,
"$addClass": false,
"$removeClass": false,
"$replaceClass": false,
"$hasClass": false,
"$mousePos": false,
"$scrollTop": false,
"$position": false,
"$docSize": false,
"$winSize": false,
"$isOverlapping": false,
"$request": false,
"$requestJSON": false,
"$httpReq": false,
"$serialize": false,
"$eval": false,
"$evalScript": false,
"$encode": false,
"$cookie": false,
"$eventElm": false,
"$addListener": false,
"$removeListener": false,
"$removeAllListeners": false,
"$preventDefault": false,
"$stopPropagation": false,
"$bind": false,
"$bindMethods": false,
"$keys": false,
"$values": false,
"$urlencode": false,
"$urldecode": false,
"$urlparse": false,
"$defined": false,
"$isArray": false,
"$isString": false,
"$isNumber": false,
"$isObject": false,
"$isFunction": false,
"$isBoolean": false,
"$isDict": false,
"$log": false,
"$strip": false,
"$trim": false,
"$escape": false,
"$preload": false,
"$": false,
"$f": false,
"$b": false,
"$p": false,
"$gp": false,
"$gc": false,
"$A": false,
"$AF": false,
"$ATT": false,
"$AEV": false,
"$REV": false,
"UL": false,
"LI": false,
"TD": false,
"TR": false,
"TH": false,
"TBODY": false,
"TABLE": false,
"INPUT": false,
"SPAN": false,
"B": false,
"A": false,
"DIV": false,
"IMG": false,
"BUTTON": false,
"H1": false,
"H2": false,
"H3": false,
"H4": false,
"H5": false,
"H6": false,
"BR": false,
"TEXTAREA": false,
"FORM": false,
"P": false,
"SELECT": false,
"OPTION": false,
"OPTGROUP": false,
"IFRAME": false,
"SCRIPT": false,
"CENTER": false,
"DL": false,
"DT": false,
"DD": false,
"SMALL": false,
"PRE": false,
"I": false,
"LABEL": false,
"THEAD": false,
"HR": false,
"TN": false,
"Class": false,
"ICE.fx": false,
"module": false,
"exports": false,
"$fx": false,
"ICE": false,
'$isTouchDeviceOnly': false
}
}
