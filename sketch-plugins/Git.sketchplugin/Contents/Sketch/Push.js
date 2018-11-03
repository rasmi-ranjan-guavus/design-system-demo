var onRun =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendEvent = sendEvent;
exports.sendError = sendError;

var _sketchModuleGoogleAnalytics = __webpack_require__(6);

var _sketchModuleGoogleAnalytics2 = _interopRequireDefault(_sketchModuleGoogleAnalytics);

var _preferences = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var key = 'UA-88206962-1';

function sendEvent(context, category, action, label, value) {
  var _getUserPreferences = (0, _preferences.getUserPreferences)(context),
      sendAnalytics = _getUserPreferences.sendAnalytics;

  if (!sendAnalytics) {
    return;
  }
  var payload = {};
  if (category) {
    payload.ec = category;
  }
  if (action) {
    payload.ea = action;
  }
  if (label) {
    payload.el = label;
  }
  if (value) {
    payload.ev = value;
  }

  return (0, _sketchModuleGoogleAnalytics2.default)(context, key, 'event', payload);
}

function sendError(context, error) {
  var _getUserPreferences2 = (0, _preferences.getUserPreferences)(context),
      sendAnalytics = _getUserPreferences2.sendAnalytics;

  if (!sendAnalytics) {
    return;
  }
  return (0, _sketchModuleGoogleAnalytics2.default)(context, key, 'event', { exd: error });
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(console) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; // Common library of things


exports.setIconForAlert = setIconForAlert;
exports.executeSafely = executeSafely;
exports.exec = exec;
exports.getCurrentDirectory = getCurrentDirectory;
exports.getGitDirectory = getGitDirectory;
exports.getCurrentFileName = getCurrentFileName;
exports.createFailAlert = createFailAlert;
exports.createInput = createInput;
exports.createInputWithCheckbox = createInputWithCheckbox;
exports.createSelect = createSelect;
exports.getCurrentBranch = getCurrentBranch;
exports.exportArtboards = exportArtboards;
exports.checkForFile = checkForFile;
exports.checkForGitRepository = checkForGitRepository;

var _analytics = __webpack_require__(0);

function setIconForAlert(context, alert) {
  alert.setIcon(NSImage.alloc().initWithContentsOfFile(context.plugin.urlForResourceNamed('icon.png').path()));
}

function executeSafely(context, func) {
  try {
    func(context);
  } catch (e) {
    (0, _analytics.sendError)(context, e);
    createFailAlert(context, 'Failed...', e, true);
  }
}

function exec(context, command) {
  var task = NSTask.alloc().init();
  var pipe = NSPipe.pipe();
  var errPipe = NSPipe.pipe();

  var path = getCurrentDirectory(context);
  command = 'cd "' + path + '" && ' + command;

  task.setLaunchPath_('/bin/bash');
  task.setArguments_(NSArray.arrayWithArray_(['-c', '-l', command]));
  task.standardOutput = pipe;
  task.standardError = errPipe;
  task.launch();

  var errData = errPipe.fileHandleForReading().readDataToEndOfFile();
  var data = pipe.fileHandleForReading().readDataToEndOfFile();

  if (task.terminationStatus() != 0) {
    var message = 'Unknow error';
    if (errData != null && errData.length()) {
      message = NSString.alloc().initWithData_encoding_(errData, NSUTF8StringEncoding);
    } else if (data != null && data.length()) {
      message = NSString.alloc().initWithData_encoding_(data, NSUTF8StringEncoding);
    }
    return NSException.raise_format_('failed', message);
  }

  return NSString.alloc().initWithData_encoding_(data, NSUTF8StringEncoding);
}

function getCurrentDirectory(context) {
  return context.document.fileURL().URLByDeletingLastPathComponent().path();
}

function getGitDirectory(context) {
  return exec(context, 'git rev-parse --show-toplevel').trim().replace('(B[m', '');
}

function getCurrentFileName(context) {
  return context.document.fileURL().lastPathComponent();
}

function createFailAlert(context, title, error, buttonToReport) {
  console.log(error);
  var alert = NSAlert.alloc().init();
  alert.informativeText = '' + error;
  alert.messageText = title;
  alert.addButtonWithTitle('OK');
  if (buttonToReport) {
    alert.addButtonWithTitle('Report issue');
  }
  setIconForAlert(context, alert);

  var responseCode = alert.runModal();

  if (responseCode == 1001) {
    var errorString = error;
    if ((typeof error === 'undefined' ? 'undefined' : _typeof(error)) === 'object') {
      try {
        errorString = JSON.stringify(error, null, '\t');
        if (errorString === '{}') {
          errorString = error;
        }
      } catch (e) {}
    }
    var urlString = 'https://github.com/mathieudutour/git-sketch-plugin/issues/new?body=' + encodeURIComponent('### How did it happen?\n1.\n2.\n3.\n\n\n### Error log\n\n```\n' + errorString + '\n```');
    var url = NSURL.URLWithString(urlString);
    NSWorkspace.sharedWorkspace().openURL(url);
  }

  return {
    responseCode: responseCode
  };
}

function createInput(context, msg, okLabel, cancelLabel) {
  var accessory = NSView.alloc().initWithFrame(NSMakeRect(0, 0, 300, 50));
  var input = NSTextField.alloc().initWithFrame(NSMakeRect(0, 25, 300, 25));
  input.editable = true;
  accessory.addSubview(input);

  var alert = NSAlert.alloc().init();
  alert.setMessageText(msg);
  alert.addButtonWithTitle(okLabel || 'OK');
  alert.addButtonWithTitle(cancelLabel || 'Cancel');
  setIconForAlert(context, alert);
  alert.setAccessoryView(accessory);

  var responseCode = alert.runModal();
  var message = input.stringValue();

  return {
    responseCode: responseCode,
    message: message
  };
}

function createInputWithCheckbox(context, msg, checkboxMsg, checked, okLabel, cancelLabel) {
  var accessory = NSView.alloc().initWithFrame(NSMakeRect(0, 0, 300, 100));
  var input = TextArea(0, 25, 300, 75);
  var checkbox = NSButton.alloc().initWithFrame(NSMakeRect(0, 0, 300, 25));
  checkbox.setButtonType(3);
  checkbox.title = checkboxMsg;
  checkbox.state = checked ? 1 : 0;
  accessory.addSubview(input.view);
  accessory.addSubview(checkbox);

  var alert = NSAlert.alloc().init();
  alert.setMessageText(msg);
  alert.addButtonWithTitle(okLabel || 'OK');
  alert.addButtonWithTitle(cancelLabel || 'Cancel');
  setIconForAlert(context, alert);
  alert.setAccessoryView(accessory);

  var responseCode = alert.runModal();
  var message = input.getValue();

  return {
    responseCode: responseCode,
    message: message,
    checked: checkbox.state() == 1
  };
}

function createSelect(context, msg, items, selectedItemIndex, okLabel, cancelLabel) {
  selectedItemIndex = selectedItemIndex || 0;

  var accessory = NSComboBox.alloc().initWithFrame(NSMakeRect(0, 0, 200, 25));
  accessory.addItemsWithObjectValues(items);
  accessory.selectItemAtIndex(selectedItemIndex);

  var alert = NSAlert.alloc().init();
  alert.setMessageText(msg);
  alert.addButtonWithTitle(okLabel || 'OK');
  alert.addButtonWithTitle(cancelLabel || 'Cancel');
  setIconForAlert(context, alert);
  alert.setAccessoryView(accessory);

  var responseCode = alert.runModal();
  var sel = accessory.indexOfSelectedItem();

  return {
    responseCode: responseCode,
    index: sel
  };
}

function getCurrentBranch(context) {
  var path = getCurrentDirectory(context);
  var currentBranchCommand = 'cd "' + path + '" && git rev-parse --abbrev-ref HEAD';
  var branch = void 0;
  try {
    branch = exec(context, currentBranchCommand).split('\n')[0];
  } catch (e) {
    branch = 'master';
  }
  return branch;
}

function exportArtboards(context, prefs) {
  var currentFileName = getCurrentFileName(context);
  var path = getCurrentDirectory(context);
  var currentFileNameWithoutExtension = currentFileName.replace(/\.sketch$/, '');
  var exportFolder = prefs.exportFolder,
      exportFormat = prefs.exportFormat,
      exportScale = prefs.exportScale,
      includeOverviewFile = prefs.includeOverviewFile;

  var pluginPath = context.scriptPath.replace(/\/Contents\/Sketch\/(\w*)\.js$/, '').replace(/ /g, '\\ ');
  var bundlePath = NSBundle.mainBundle().bundlePath();
  var fileFolder = exportFolder + '/' + currentFileNameWithoutExtension;
  var command = pluginPath + '/exportArtboard.sh "' + path + '" "' + exportFolder + '" "' + fileFolder + '" "' + bundlePath + '" "' + currentFileName + '" "' + (exportFormat || 'png') + '" "' + exportScale + '" "' + includeOverviewFile + '"';
  return exec(context, command);
}

function checkForFile(context) {
  try {
    getCurrentFileName(context);
    getCurrentDirectory(context);
    return true;
  } catch (e) {
    (0, _analytics.sendError)(context, 'Missing file');
    createFailAlert(context, 'Missing file', 'You need to open a sketch file before doing that');
    return false;
  }
}
function checkForGitRepository(context) {
  try {
    getGitDirectory(context);
    return true;
  } catch (e) {
    (0, _analytics.sendError)(context, 'Not a git repository');
    createFailAlert(context, 'Not a git repository', 'You need to init git repository first');
    return false;
  }
}

function TextArea(x, y, width, heigh) {
  var scrollView = NSScrollView.alloc().initWithFrame(NSMakeRect(x, y, width, heigh));
  scrollView.borderStyle = NSLineBorder;
  var contentSize = scrollView.contentSize();
  var input = NSTextView.alloc().initWithFrame(NSMakeRect(0, 0, contentSize.width, contentSize.height));
  input.minSize = NSMakeSize(0, contentSize.height);
  input.maxSize = NSMakeSize(contentSize.width, Infinity);
  scrollView.documentView = input;
  return {
    view: scrollView,
    getValue: function getValue() {
      return input.string();
    }
  };
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/* globals log */

var console = {
  log: log,
  warn: log,
  error: log,
  dump: function (obj) {
    log('###############################################')
    log('## Dumping object ' + obj)
    if (obj.className) {
      log('## obj class is: ' + obj.className())
    }
    log('###############################################')

    if (obj.class && obj.class().mocha) {
      log('obj.properties:')
      log(obj.class().mocha().properties())
      log('obj.propertiesWithAncestors:')
      log(obj.class().mocha().propertiesWithAncestors())

      log('obj.classMethods:')
      log(obj.class().mocha().classMethods())
      log('obj.classMethodsWithAncestors:')
      log(obj.class().mocha().classMethodsWithAncestors())

      log('obj.instanceMethods:')
      log(obj.class().mocha().instanceMethods())
      log('obj.instanceMethodsWithAncestors:')
      log(obj.class().mocha().instanceMethodsWithAncestors())

      log('obj.protocols:')
      log(obj.class().mocha().protocols())
      log('obj.protocolsWithAncestors:')
      log(obj.class().mocha().protocolsWithAncestors())
    }

    if (obj.treeAsDictionary) {
      log('obj.treeAsDictionary():')
      log(obj.treeAsDictionary())
    }
  }
}


// polyfill the global object
var commonjsGlobal = typeof global !== 'undefined'
  ? global
  : this

commonjsGlobal.console = commonjsGlobal.console || console

module.exports = console

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (context) {
  if (!(0, _common.checkForFile)(context)) {
    return;
  }
  (0, _common.executeSafely)(context, function () {
    (0, _analytics.sendEvent)(context, 'Push', 'Push to remote');
    (0, _common.exec)(context, 'git -c push.default=current push -q');
    context.document.showMessage('Changes pushed');
  });
};

var _analytics = __webpack_require__(0);

var _common = __webpack_require__(1);

module.exports = exports['default']; // Push (cmd alt ctrl p)

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(console) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserPreferences = getUserPreferences;
exports.setUserPreferences = setUserPreferences;

var _sketchModuleUserPreferences = __webpack_require__(7);

var _sketchModuleUserPreferences2 = _interopRequireDefault(_sketchModuleUserPreferences);

var _sketchModuleFs = __webpack_require__(5);

var _sketchModuleFs2 = _interopRequireDefault(_sketchModuleFs);

var _common = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var keyPref = 'gitSketch';
var PREFS_FILE = '.gitsketchrc';
var LOCAL_PREFS = {
  exportFolder: '.exportedArtboards',
  exportFormat: 'png',
  exportScale: '1.0',
  includeOverviewFile: true,
  autoExportOnSave: false
};
var GLOBAL_PREFS = {
  terminal: 'Terminal',
  diffByDefault: true,
  sendAnalytics: true
};

function getUserPreferences(context) {
  var localPrefs = {};
  try {
    var path = (0, _common.getGitDirectory)(context);
    localPrefs = JSON.parse(_sketchModuleFs2.default.readFile(path + '/' + PREFS_FILE));
  } catch (e) {
    console.log(e);
  }
  return Object.assign({}, LOCAL_PREFS, _sketchModuleUserPreferences2.default.getUserPreferences(keyPref, GLOBAL_PREFS), localPrefs);
}

function setUserPreferences(context, prefs) {
  var localPrefs = {};
  var globalPrefs = {};
  Object.keys(prefs).forEach(function (k) {
    if (Object.keys(LOCAL_PREFS).indexOf(k) !== -1) {
      localPrefs[k] = prefs[k];
    } else {
      globalPrefs[k] = prefs[k];
    }
  });

  try {
    var path = (0, _common.getGitDirectory)(context);
    _sketchModuleFs2.default.writeFile(path + '/' + PREFS_FILE, JSON.stringify(localPrefs, null, '  '));
    (0, _common.exec)(context, 'git add "' + path + '/' + PREFS_FILE + '"');
  } catch (e) {
    console.log(e);
  }
  return _sketchModuleUserPreferences2.default.setUserPreferences(keyPref, globalPrefs);
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = {
  mkdir: function (path) {
    var error = null
    var result = NSFileManager.defaultManager().createDirectoryAtPath_withIntermediateDirectories_attributes_error(path, true, {}, error)
    if (error != null) {
      throw new Error(error)
    }
    return result
  },

  readFile: function (path, encoding) {
    var error = null
    var result = NSString.stringWithContentsOfFile_encoding_error(path, encoding || NSUTF8StringEncoding, error)
    if (error != null) {
      throw new Error(error)
    }
    return result
  },

  writeFile: function (path, data, encoding) {
    var error = null
    var result
    if (data.TIFFRepresentation) {
      var tiffData = data.TIFFRepresentation()
      var p = NSBitmapImageRep.imageRepWithData(tiffData)
      var data = p.representationUsingType_properties(encoding || NSPNGFileType, null)
      data.writeToFile_atomically(path, true)
    } else {
      result = NSString.stringWithString(data).writeToFile_atomically_encoding_error(path, true, encoding || NSUTF8StringEncoding, error)
    }
    if (error != null) {
      throw new Error(error)
    }
    return result
  },

  rename: function (oldPath, newPath) {
    var error = null
    var result = NSFileManager.defaultManager().moveItemAtPath_toPath_error(oldPath, newPath, error)
    if (error != null) {
      throw new Error(error)
    }
    return result
  },

  rmdir: function (path) {
    var error = null
    var result = NSFileManager.defaultManager().removeItemAtPath_error(path, error)
    if (error != null) {
      throw new Error(error)
    }
    return result
  }
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {

var kUUIDKey = 'google.analytics.uuid'
var uuid = NSUserDefaults.standardUserDefaults().objectForKey(kUUIDKey)
if (!uuid) {
  uuid = NSUUID.UUID().UUIDString()
  NSUserDefaults.standardUserDefaults().setObject_forKey(uuid, kUUIDKey)
}

function jsonToQueryString(json) {
  return '?' + Object.keys(json).map(function(key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
  }).join('&')
}

module.exports = function (context, trackingId, hitType, props) {
	var payload = {
    v: 1,
		tid: trackingId,
		ds: 'Sketch%20' + NSBundle.mainBundle().objectForInfoDictionaryKey("CFBundleShortVersionString"),
		cid: uuid,
    t: hitType,
    an: context.plugin.name(),
    aid: context.plugin.identifier(),
    av: context.plugin.version()
	}
	if (props) {
		Object.keys(props).forEach(function (key) {
      payload[key] = props[key]
    })
	}

	var url = NSURL.URLWithString(
    NSString.stringWithFormat("https://www.google-analytics.com/collect%@", jsonToQueryString(payload))
  )

	if (url) {
    NSURLSession.sharedSession().dataTaskWithURL(url).resume()
  }
}


/***/ }),
/* 7 */
/***/ (function(module, exports) {

const SUITE_PREFIX = 'plugin.sketch.'

function isPresent (data) {
  return data != null
}

module.exports = {
  getUserPreferences: function (pluginName, defaultPrefs) {
    var prefs = {}
    var store = NSUserDefaults.alloc().initWithSuiteName(SUITE_PREFIX + pluginName)
    Object.keys(defaultPrefs).forEach(function (k) {
      if (typeof defaultPrefs[k] === 'boolean') {
        prefs[k] = isPresent(store.boolForKey(k)) ? Boolean(store.boolForKey(k)) : defaultPrefs[k]
      } else if (typeof defaultPrefs[k] === 'number') {
        prefs[k] = isPresent(store.doubleForKey(k)) ? store.doubleForKey(k) : defaultPrefs[k]
      } else if (typeof defaultPrefs[k] === 'string') {
        prefs[k] = isPresent(store.stringForKey(k)) ? '' + store.stringForKey(k) : defaultPrefs[k]
      } else if (Array.isArray(defaultPrefs[k])) {
        prefs[k] = store.arrayForKey(k) || defaultPrefs[k]
      } else {
        prefs[k] = store.dictionaryForKey(k) || defaultPrefs[k]
      }
    })
    return prefs
  },
  setUserPreferences: function (pluginName, prefs) {
    var store = NSUserDefaults.alloc().initWithSuiteName(SUITE_PREFIX + pluginName)
    Object.keys(prefs).forEach(function (k) {
      if (typeof prefs[k] === 'boolean') {
        store.setBool_forKey(prefs[k], k)
      } else if (typeof prefs[k] === 'number') {
        store.setDouble_forKey(prefs[k], k)
      } else {
        store.setObject_forKey(prefs[k], k)
      }
    })
    store.synchronize()
  }
}


/***/ }),
/* 8 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })
/******/ ]);