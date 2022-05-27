/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/desandro-matches-selector/matches-selector.js":
/*!********************************************************************!*\
  !*** ./node_modules/desandro-matches-selector/matches-selector.js ***!
  \********************************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * matchesSelector v2.0.2
 * matchesSelector( element, '.selector' )
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true */
(function (window, factory) {
  /*global define: false, module: false */
  'use strict'; // universal module definition

  if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
		__WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(window, function factory() {
  'use strict';

  var matchesMethod = function () {
    var ElemProto = window.Element.prototype; // check for the standard method name first

    if (ElemProto.matches) {
      return 'matches';
    } // check un-prefixed


    if (ElemProto.matchesSelector) {
      return 'matchesSelector';
    } // check vendor prefixes


    var prefixes = ['webkit', 'moz', 'ms', 'o'];

    for (var i = 0; i < prefixes.length; i++) {
      var prefix = prefixes[i];
      var method = prefix + 'MatchesSelector';

      if (ElemProto[method]) {
        return method;
      }
    }
  }();

  return function matchesSelector(elem, selector) {
    return elem[matchesMethod](selector);
  };
});

/***/ }),

/***/ "./node_modules/ev-emitter/ev-emitter.js":
/*!***********************************************!*\
  !*** ./node_modules/ev-emitter/ev-emitter.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * EvEmitter v1.1.0
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */
(function (global, factory) {
  // universal module definition

  /* jshint strict: false */

  /* globals define, module, window */
  if (true) {
    // AMD - RequireJS
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
		__WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(typeof window != 'undefined' ? window : this, function () {
  "use strict";

  function EvEmitter() {}

  var proto = EvEmitter.prototype;

  proto.on = function (eventName, listener) {
    if (!eventName || !listener) {
      return;
    } // set events hash


    var events = this._events = this._events || {}; // set listeners array

    var listeners = events[eventName] = events[eventName] || []; // only add once

    if (listeners.indexOf(listener) == -1) {
      listeners.push(listener);
    }

    return this;
  };

  proto.once = function (eventName, listener) {
    if (!eventName || !listener) {
      return;
    } // add event


    this.on(eventName, listener); // set once flag
    // set onceEvents hash

    var onceEvents = this._onceEvents = this._onceEvents || {}; // set onceListeners object

    var onceListeners = onceEvents[eventName] = onceEvents[eventName] || {}; // set flag

    onceListeners[listener] = true;
    return this;
  };

  proto.off = function (eventName, listener) {
    var listeners = this._events && this._events[eventName];

    if (!listeners || !listeners.length) {
      return;
    }

    var index = listeners.indexOf(listener);

    if (index != -1) {
      listeners.splice(index, 1);
    }

    return this;
  };

  proto.emitEvent = function (eventName, args) {
    var listeners = this._events && this._events[eventName];

    if (!listeners || !listeners.length) {
      return;
    } // copy over to avoid interference if .off() in listener


    listeners = listeners.slice(0);
    args = args || []; // once stuff

    var onceListeners = this._onceEvents && this._onceEvents[eventName];

    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      var isOnce = onceListeners && onceListeners[listener];

      if (isOnce) {
        // remove listener
        // remove before trigger to prevent recursion
        this.off(eventName, listener); // unset once flag

        delete onceListeners[listener];
      } // trigger listener


      listener.apply(this, args);
    }

    return this;
  };

  proto.allOff = function () {
    delete this._events;
    delete this._onceEvents;
  };

  return EvEmitter;
});

/***/ }),

/***/ "./node_modules/fizzy-ui-utils/utils.js":
/*!**********************************************!*\
  !*** ./node_modules/fizzy-ui-utils/utils.js ***!
  \**********************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * Fizzy UI utils v2.0.7
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */
(function (window, factory) {
  // universal module definition

  /*jshint strict: false */

  /*globals define, module, require */
  if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! desandro-matches-selector/matches-selector */ "./node_modules/desandro-matches-selector/matches-selector.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (matchesSelector) {
      return factory(window, matchesSelector);
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(window, function factory(window, matchesSelector) {
  'use strict';

  var utils = {}; // ----- extend ----- //
  // extends objects

  utils.extend = function (a, b) {
    for (var prop in b) {
      a[prop] = b[prop];
    }

    return a;
  }; // ----- modulo ----- //


  utils.modulo = function (num, div) {
    return (num % div + div) % div;
  }; // ----- makeArray ----- //


  var arraySlice = Array.prototype.slice; // turn element or nodeList into an array

  utils.makeArray = function (obj) {
    if (Array.isArray(obj)) {
      // use object if already an array
      return obj;
    } // return empty array if undefined or null. #6


    if (obj === null || obj === undefined) {
      return [];
    }

    var isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';

    if (isArrayLike) {
      // convert nodeList to array
      return arraySlice.call(obj);
    } // array of single index


    return [obj];
  }; // ----- removeFrom ----- //


  utils.removeFrom = function (ary, obj) {
    var index = ary.indexOf(obj);

    if (index != -1) {
      ary.splice(index, 1);
    }
  }; // ----- getParent ----- //


  utils.getParent = function (elem, selector) {
    while (elem.parentNode && elem != document.body) {
      elem = elem.parentNode;

      if (matchesSelector(elem, selector)) {
        return elem;
      }
    }
  }; // ----- getQueryElement ----- //
  // use element as selector string


  utils.getQueryElement = function (elem) {
    if (typeof elem == 'string') {
      return document.querySelector(elem);
    }

    return elem;
  }; // ----- handleEvent ----- //
  // enable .ontype to trigger from .addEventListener( elem, 'type' )


  utils.handleEvent = function (event) {
    var method = 'on' + event.type;

    if (this[method]) {
      this[method](event);
    }
  }; // ----- filterFindElements ----- //


  utils.filterFindElements = function (elems, selector) {
    // make array of elems
    elems = utils.makeArray(elems);
    var ffElems = [];
    elems.forEach(function (elem) {
      // check that elem is an actual element
      if (!(elem instanceof HTMLElement)) {
        return;
      } // add elem if no selector


      if (!selector) {
        ffElems.push(elem);
        return;
      } // filter & find items if we have a selector
      // filter


      if (matchesSelector(elem, selector)) {
        ffElems.push(elem);
      } // find children


      var childElems = elem.querySelectorAll(selector); // concat childElems to filterFound array

      for (var i = 0; i < childElems.length; i++) {
        ffElems.push(childElems[i]);
      }
    });
    return ffElems;
  }; // ----- debounceMethod ----- //


  utils.debounceMethod = function (_class, methodName, threshold) {
    threshold = threshold || 100; // original method

    var method = _class.prototype[methodName];
    var timeoutName = methodName + 'Timeout';

    _class.prototype[methodName] = function () {
      var timeout = this[timeoutName];
      clearTimeout(timeout);
      var args = arguments;

      var _this = this;

      this[timeoutName] = setTimeout(function () {
        method.apply(_this, args);
        delete _this[timeoutName];
      }, threshold);
    };
  }; // ----- docReady ----- //


  utils.docReady = function (callback) {
    var readyState = document.readyState;

    if (readyState == 'complete' || readyState == 'interactive') {
      // do async to allow for other scripts to run. metafizzy/flickity#441
      setTimeout(callback);
    } else {
      document.addEventListener('DOMContentLoaded', callback);
    }
  }; // ----- htmlInit ----- //
  // http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/


  utils.toDashed = function (str) {
    return str.replace(/(.)([A-Z])/g, function (match, $1, $2) {
      return $1 + '-' + $2;
    }).toLowerCase();
  };

  var console = window.console;
  /**
   * allow user to initialize classes via [data-namespace] or .js-namespace class
   * htmlInit( Widget, 'widgetName' )
   * options are parsed from data-namespace-options
   */

  utils.htmlInit = function (WidgetClass, namespace) {
    utils.docReady(function () {
      var dashedNamespace = utils.toDashed(namespace);
      var dataAttr = 'data-' + dashedNamespace;
      var dataAttrElems = document.querySelectorAll('[' + dataAttr + ']');
      var jsDashElems = document.querySelectorAll('.js-' + dashedNamespace);
      var elems = utils.makeArray(dataAttrElems).concat(utils.makeArray(jsDashElems));
      var dataOptionsAttr = dataAttr + '-options';
      var jQuery = window.jQuery;
      elems.forEach(function (elem) {
        var attr = elem.getAttribute(dataAttr) || elem.getAttribute(dataOptionsAttr);
        var options;

        try {
          options = attr && JSON.parse(attr);
        } catch (error) {
          // log error, do not initialize
          if (console) {
            console.error('Error parsing ' + dataAttr + ' on ' + elem.className + ': ' + error);
          }

          return;
        } // initialize


        var instance = new WidgetClass(elem, options); // make available via $().data('namespace')

        if (jQuery) {
          jQuery.data(elem, namespace, instance);
        }
      });
    });
  }; // -----  ----- //


  return utils;
});

/***/ }),

/***/ "./node_modules/get-size/get-size.js":
/*!*******************************************!*\
  !*** ./node_modules/get-size/get-size.js ***!
  \*******************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * getSize v2.0.3
 * measure size of elements
 * MIT license
 */

/* jshint browser: true, strict: true, undef: true, unused: true */

/* globals console: false */
(function (window, factory) {
  /* jshint strict: false */

  /* globals define, module */
  if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
		__WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(window, function factory() {
  'use strict'; // -------------------------- helpers -------------------------- //
  // get a number from a string, not a percentage

  function getStyleSize(value) {
    var num = parseFloat(value); // not a percent like '100%', and a number

    var isValid = value.indexOf('%') == -1 && !isNaN(num);
    return isValid && num;
  }

  function noop() {}

  var logError = typeof console == 'undefined' ? noop : function (message) {
    console.error(message);
  }; // -------------------------- measurements -------------------------- //

  var measurements = ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom', 'marginLeft', 'marginRight', 'marginTop', 'marginBottom', 'borderLeftWidth', 'borderRightWidth', 'borderTopWidth', 'borderBottomWidth'];
  var measurementsLength = measurements.length;

  function getZeroSize() {
    var size = {
      width: 0,
      height: 0,
      innerWidth: 0,
      innerHeight: 0,
      outerWidth: 0,
      outerHeight: 0
    };

    for (var i = 0; i < measurementsLength; i++) {
      var measurement = measurements[i];
      size[measurement] = 0;
    }

    return size;
  } // -------------------------- getStyle -------------------------- //

  /**
   * getStyle, get style of element, check for Firefox bug
   * https://bugzilla.mozilla.org/show_bug.cgi?id=548397
   */


  function getStyle(elem) {
    var style = getComputedStyle(elem);

    if (!style) {
      logError('Style returned ' + style + '. Are you running this code in a hidden iframe on Firefox? ' + 'See https://bit.ly/getsizebug1');
    }

    return style;
  } // -------------------------- setup -------------------------- //


  var isSetup = false;
  var isBoxSizeOuter;
  /**
   * setup
   * check isBoxSizerOuter
   * do on first getSize() rather than on page load for Firefox bug
   */

  function setup() {
    // setup once
    if (isSetup) {
      return;
    }

    isSetup = true; // -------------------------- box sizing -------------------------- //

    /**
     * Chrome & Safari measure the outer-width on style.width on border-box elems
     * IE11 & Firefox<29 measures the inner-width
     */

    var div = document.createElement('div');
    div.style.width = '200px';
    div.style.padding = '1px 2px 3px 4px';
    div.style.borderStyle = 'solid';
    div.style.borderWidth = '1px 2px 3px 4px';
    div.style.boxSizing = 'border-box';
    var body = document.body || document.documentElement;
    body.appendChild(div);
    var style = getStyle(div); // round value for browser zoom. desandro/masonry#928

    isBoxSizeOuter = Math.round(getStyleSize(style.width)) == 200;
    getSize.isBoxSizeOuter = isBoxSizeOuter;
    body.removeChild(div);
  } // -------------------------- getSize -------------------------- //


  function getSize(elem) {
    setup(); // use querySeletor if elem is string

    if (typeof elem == 'string') {
      elem = document.querySelector(elem);
    } // do not proceed on non-objects


    if (!elem || typeof elem != 'object' || !elem.nodeType) {
      return;
    }

    var style = getStyle(elem); // if hidden, everything is 0

    if (style.display == 'none') {
      return getZeroSize();
    }

    var size = {};
    size.width = elem.offsetWidth;
    size.height = elem.offsetHeight;
    var isBorderBox = size.isBorderBox = style.boxSizing == 'border-box'; // get all measurements

    for (var i = 0; i < measurementsLength; i++) {
      var measurement = measurements[i];
      var value = style[measurement];
      var num = parseFloat(value); // any 'auto', 'medium' value will be 0

      size[measurement] = !isNaN(num) ? num : 0;
    }

    var paddingWidth = size.paddingLeft + size.paddingRight;
    var paddingHeight = size.paddingTop + size.paddingBottom;
    var marginWidth = size.marginLeft + size.marginRight;
    var marginHeight = size.marginTop + size.marginBottom;
    var borderWidth = size.borderLeftWidth + size.borderRightWidth;
    var borderHeight = size.borderTopWidth + size.borderBottomWidth;
    var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter; // overwrite width and height if we can get it from style

    var styleWidth = getStyleSize(style.width);

    if (styleWidth !== false) {
      size.width = styleWidth + ( // add padding and border unless it's already including it
      isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth);
    }

    var styleHeight = getStyleSize(style.height);

    if (styleHeight !== false) {
      size.height = styleHeight + ( // add padding and border unless it's already including it
      isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight);
    }

    size.innerWidth = size.width - (paddingWidth + borderWidth);
    size.innerHeight = size.height - (paddingHeight + borderHeight);
    size.outerWidth = size.width + marginWidth;
    size.outerHeight = size.height + marginHeight;
    return size;
  }

  return getSize;
});

/***/ }),

/***/ "./node_modules/imagesloaded/imagesloaded.js":
/*!***************************************************!*\
  !*** ./node_modules/imagesloaded/imagesloaded.js ***!
  \***************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*!
 * imagesLoaded v5.0.0
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
(function (window, factory) {
  // universal module definition
  if ( true && module.exports) {
    // CommonJS
    module.exports = factory(window, __webpack_require__(/*! ev-emitter */ "./node_modules/imagesloaded/node_modules/ev-emitter/ev-emitter.js"));
  } else {
    // browser global
    window.imagesLoaded = factory(window, window.EvEmitter);
  }
})(typeof window !== 'undefined' ? window : this, function factory(window, EvEmitter) {
  let $ = window.jQuery;
  let console = window.console; // -------------------------- helpers -------------------------- //
  // turn element or nodeList into an array

  function makeArray(obj) {
    // use object if already an array
    if (Array.isArray(obj)) return obj;
    let isArrayLike = typeof obj == 'object' && typeof obj.length == 'number'; // convert nodeList to array

    if (isArrayLike) return [...obj]; // array of single index

    return [obj];
  } // -------------------------- imagesLoaded -------------------------- //

  /**
   * @param {[Array, Element, NodeList, String]} elem
   * @param {[Object, Function]} options - if function, use as callback
   * @param {Function} onAlways - callback function
   * @returns {ImagesLoaded}
   */


  function ImagesLoaded(elem, options, onAlways) {
    // coerce ImagesLoaded() without new, to be new ImagesLoaded()
    if (!(this instanceof ImagesLoaded)) {
      return new ImagesLoaded(elem, options, onAlways);
    } // use elem as selector string


    let queryElem = elem;

    if (typeof elem == 'string') {
      queryElem = document.querySelectorAll(elem);
    } // bail if bad element


    if (!queryElem) {
      console.error(`Bad element for imagesLoaded ${queryElem || elem}`);
      return;
    }

    this.elements = makeArray(queryElem);
    this.options = {}; // shift arguments if no options set

    if (typeof options == 'function') {
      onAlways = options;
    } else {
      Object.assign(this.options, options);
    }

    if (onAlways) this.on('always', onAlways);
    this.getImages(); // add jQuery Deferred object

    if ($) this.jqDeferred = new $.Deferred(); // HACK check async to allow time to bind listeners

    setTimeout(this.check.bind(this));
  }

  ImagesLoaded.prototype = Object.create(EvEmitter.prototype);

  ImagesLoaded.prototype.getImages = function () {
    this.images = []; // filter & find items if we have an item selector

    this.elements.forEach(this.addElementImages, this);
  };

  const elementNodeTypes = [1, 9, 11];
  /**
   * @param {Node} elem
   */

  ImagesLoaded.prototype.addElementImages = function (elem) {
    // filter siblings
    if (elem.nodeName === 'IMG') {
      this.addImage(elem);
    } // get background image on element


    if (this.options.background === true) {
      this.addElementBackgroundImages(elem);
    } // find children
    // no non-element nodes, #143


    let {
      nodeType
    } = elem;
    if (!nodeType || !elementNodeTypes.includes(nodeType)) return;
    let childImgs = elem.querySelectorAll('img'); // concat childElems to filterFound array

    for (let img of childImgs) {
      this.addImage(img);
    } // get child background images


    if (typeof this.options.background == 'string') {
      let children = elem.querySelectorAll(this.options.background);

      for (let child of children) {
        this.addElementBackgroundImages(child);
      }
    }
  };

  const reURL = /url\((['"])?(.*?)\1\)/gi;

  ImagesLoaded.prototype.addElementBackgroundImages = function (elem) {
    let style = getComputedStyle(elem); // Firefox returns null if in a hidden iframe https://bugzil.la/548397

    if (!style) return; // get url inside url("...")

    let matches = reURL.exec(style.backgroundImage);

    while (matches !== null) {
      let url = matches && matches[2];

      if (url) {
        this.addBackground(url, elem);
      }

      matches = reURL.exec(style.backgroundImage);
    }
  };
  /**
   * @param {Image} img
   */


  ImagesLoaded.prototype.addImage = function (img) {
    let loadingImage = new LoadingImage(img);
    this.images.push(loadingImage);
  };

  ImagesLoaded.prototype.addBackground = function (url, elem) {
    let background = new Background(url, elem);
    this.images.push(background);
  };

  ImagesLoaded.prototype.check = function () {
    this.progressedCount = 0;
    this.hasAnyBroken = false; // complete if no images

    if (!this.images.length) {
      this.complete();
      return;
    }
    /* eslint-disable-next-line func-style */


    let onProgress = (image, elem, message) => {
      // HACK - Chrome triggers event before object properties have changed. #83
      setTimeout(() => {
        this.progress(image, elem, message);
      });
    };

    this.images.forEach(function (loadingImage) {
      loadingImage.once('progress', onProgress);
      loadingImage.check();
    });
  };

  ImagesLoaded.prototype.progress = function (image, elem, message) {
    this.progressedCount++;
    this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded; // progress event

    this.emitEvent('progress', [this, image, elem]);

    if (this.jqDeferred && this.jqDeferred.notify) {
      this.jqDeferred.notify(this, image);
    } // check if completed


    if (this.progressedCount === this.images.length) {
      this.complete();
    }

    if (this.options.debug && console) {
      console.log(`progress: ${message}`, image, elem);
    }
  };

  ImagesLoaded.prototype.complete = function () {
    let eventName = this.hasAnyBroken ? 'fail' : 'done';
    this.isComplete = true;
    this.emitEvent(eventName, [this]);
    this.emitEvent('always', [this]);

    if (this.jqDeferred) {
      let jqMethod = this.hasAnyBroken ? 'reject' : 'resolve';
      this.jqDeferred[jqMethod](this);
    }
  }; // --------------------------  -------------------------- //


  function LoadingImage(img) {
    this.img = img;
  }

  LoadingImage.prototype = Object.create(EvEmitter.prototype);

  LoadingImage.prototype.check = function () {
    // If complete is true and browser supports natural sizes,
    // try to check for image status manually.
    let isComplete = this.getIsImageComplete();

    if (isComplete) {
      // report based on naturalWidth
      this.confirm(this.img.naturalWidth !== 0, 'naturalWidth');
      return;
    } // If none of the checks above matched, simulate loading on detached element.


    this.proxyImage = new Image(); // add crossOrigin attribute. #204

    if (this.img.crossOrigin) {
      this.proxyImage.crossOrigin = this.img.crossOrigin;
    }

    this.proxyImage.addEventListener('load', this);
    this.proxyImage.addEventListener('error', this); // bind to image as well for Firefox. #191

    this.img.addEventListener('load', this);
    this.img.addEventListener('error', this);
    this.proxyImage.src = this.img.currentSrc || this.img.src;
  };

  LoadingImage.prototype.getIsImageComplete = function () {
    // check for non-zero, non-undefined naturalWidth
    // fixes Safari+InfiniteScroll+Masonry bug infinite-scroll#671
    return this.img.complete && this.img.naturalWidth;
  };

  LoadingImage.prototype.confirm = function (isLoaded, message) {
    this.isLoaded = isLoaded;
    let {
      parentNode
    } = this.img; // emit progress with parent <picture> or self <img>

    let elem = parentNode.nodeName === 'PICTURE' ? parentNode : this.img;
    this.emitEvent('progress', [this, elem, message]);
  }; // ----- events ----- //
  // trigger specified handler for event type


  LoadingImage.prototype.handleEvent = function (event) {
    let method = 'on' + event.type;

    if (this[method]) {
      this[method](event);
    }
  };

  LoadingImage.prototype.onload = function () {
    this.confirm(true, 'onload');
    this.unbindEvents();
  };

  LoadingImage.prototype.onerror = function () {
    this.confirm(false, 'onerror');
    this.unbindEvents();
  };

  LoadingImage.prototype.unbindEvents = function () {
    this.proxyImage.removeEventListener('load', this);
    this.proxyImage.removeEventListener('error', this);
    this.img.removeEventListener('load', this);
    this.img.removeEventListener('error', this);
  }; // -------------------------- Background -------------------------- //


  function Background(url, element) {
    this.url = url;
    this.element = element;
    this.img = new Image();
  } // inherit LoadingImage prototype


  Background.prototype = Object.create(LoadingImage.prototype);

  Background.prototype.check = function () {
    this.img.addEventListener('load', this);
    this.img.addEventListener('error', this);
    this.img.src = this.url; // check if image is already complete

    let isComplete = this.getIsImageComplete();

    if (isComplete) {
      this.confirm(this.img.naturalWidth !== 0, 'naturalWidth');
      this.unbindEvents();
    }
  };

  Background.prototype.unbindEvents = function () {
    this.img.removeEventListener('load', this);
    this.img.removeEventListener('error', this);
  };

  Background.prototype.confirm = function (isLoaded, message) {
    this.isLoaded = isLoaded;
    this.emitEvent('progress', [this, this.element, message]);
  }; // -------------------------- jQuery -------------------------- //


  ImagesLoaded.makeJQueryPlugin = function (jQuery) {
    jQuery = jQuery || window.jQuery;
    if (!jQuery) return; // set local variable

    $ = jQuery; // $().imagesLoaded()

    $.fn.imagesLoaded = function (options, onAlways) {
      let instance = new ImagesLoaded(this, options, onAlways);
      return instance.jqDeferred.promise($(this));
    };
  }; // try making plugin


  ImagesLoaded.makeJQueryPlugin(); // --------------------------  -------------------------- //

  return ImagesLoaded;
});

/***/ }),

/***/ "./node_modules/imagesloaded/node_modules/ev-emitter/ev-emitter.js":
/*!*************************************************************************!*\
  !*** ./node_modules/imagesloaded/node_modules/ev-emitter/ev-emitter.js ***!
  \*************************************************************************/
/***/ (function(module) {

/**
 * EvEmitter v2.1.1
 * Lil' event emitter
 * MIT License
 */
(function (global, factory) {
  // universal module definition
  if ( true && module.exports) {
    // CommonJS - Browserify, Webpack
    module.exports = factory();
  } else {
    // Browser globals
    global.EvEmitter = factory();
  }
})(typeof window != 'undefined' ? window : this, function () {
  function EvEmitter() {}

  let proto = EvEmitter.prototype;

  proto.on = function (eventName, listener) {
    if (!eventName || !listener) return this; // set events hash

    let events = this._events = this._events || {}; // set listeners array

    let listeners = events[eventName] = events[eventName] || []; // only add once

    if (!listeners.includes(listener)) {
      listeners.push(listener);
    }

    return this;
  };

  proto.once = function (eventName, listener) {
    if (!eventName || !listener) return this; // add event

    this.on(eventName, listener); // set once flag
    // set onceEvents hash

    let onceEvents = this._onceEvents = this._onceEvents || {}; // set onceListeners object

    let onceListeners = onceEvents[eventName] = onceEvents[eventName] || {}; // set flag

    onceListeners[listener] = true;
    return this;
  };

  proto.off = function (eventName, listener) {
    let listeners = this._events && this._events[eventName];
    if (!listeners || !listeners.length) return this;
    let index = listeners.indexOf(listener);

    if (index != -1) {
      listeners.splice(index, 1);
    }

    return this;
  };

  proto.emitEvent = function (eventName, args) {
    let listeners = this._events && this._events[eventName];
    if (!listeners || !listeners.length) return this; // copy over to avoid interference if .off() in listener

    listeners = listeners.slice(0);
    args = args || []; // once stuff

    let onceListeners = this._onceEvents && this._onceEvents[eventName];

    for (let listener of listeners) {
      let isOnce = onceListeners && onceListeners[listener];

      if (isOnce) {
        // remove listener
        // remove before trigger to prevent recursion
        this.off(eventName, listener); // unset once flag

        delete onceListeners[listener];
      } // trigger listener


      listener.apply(this, args);
    }

    return this;
  };

  proto.allOff = function () {
    delete this._events;
    delete this._onceEvents;
    return this;
  };

  return EvEmitter;
});

/***/ }),

/***/ "./node_modules/masonry-layout/masonry.js":
/*!************************************************!*\
  !*** ./node_modules/masonry-layout/masonry.js ***!
  \************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * Masonry v4.2.2
 * Cascading grid layout library
 * https://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */
(function (window, factory) {
  // universal module definition

  /* jshint strict: false */

  /*globals define, module, require */
  if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! outlayer/outlayer */ "./node_modules/outlayer/outlayer.js"), __webpack_require__(/*! get-size/get-size */ "./node_modules/get-size/get-size.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(window, function factory(Outlayer, getSize) {
  'use strict'; // -------------------------- masonryDefinition -------------------------- //
  // create an Outlayer layout class

  var Masonry = Outlayer.create('masonry'); // isFitWidth -> fitWidth

  Masonry.compatOptions.fitWidth = 'isFitWidth';
  var proto = Masonry.prototype;

  proto._resetLayout = function () {
    this.getSize();

    this._getMeasurement('columnWidth', 'outerWidth');

    this._getMeasurement('gutter', 'outerWidth');

    this.measureColumns(); // reset column Y

    this.colYs = [];

    for (var i = 0; i < this.cols; i++) {
      this.colYs.push(0);
    }

    this.maxY = 0;
    this.horizontalColIndex = 0;
  };

  proto.measureColumns = function () {
    this.getContainerWidth(); // if columnWidth is 0, default to outerWidth of first item

    if (!this.columnWidth) {
      var firstItem = this.items[0];
      var firstItemElem = firstItem && firstItem.element; // columnWidth fall back to item of first element

      this.columnWidth = firstItemElem && getSize(firstItemElem).outerWidth || // if first elem has no width, default to size of container
      this.containerWidth;
    }

    var columnWidth = this.columnWidth += this.gutter; // calculate columns

    var containerWidth = this.containerWidth + this.gutter;
    var cols = containerWidth / columnWidth; // fix rounding errors, typically with gutters

    var excess = columnWidth - containerWidth % columnWidth; // if overshoot is less than a pixel, round up, otherwise floor it

    var mathMethod = excess && excess < 1 ? 'round' : 'floor';
    cols = Math[mathMethod](cols);
    this.cols = Math.max(cols, 1);
  };

  proto.getContainerWidth = function () {
    // container is parent if fit width
    var isFitWidth = this._getOption('fitWidth');

    var container = isFitWidth ? this.element.parentNode : this.element; // check that this.size and size are there
    // IE8 triggers resize on body size change, so they might not be

    var size = getSize(container);
    this.containerWidth = size && size.innerWidth;
  };

  proto._getItemLayoutPosition = function (item) {
    item.getSize(); // how many columns does this brick span

    var remainder = item.size.outerWidth % this.columnWidth;
    var mathMethod = remainder && remainder < 1 ? 'round' : 'ceil'; // round if off by 1 pixel, otherwise use ceil

    var colSpan = Math[mathMethod](item.size.outerWidth / this.columnWidth);
    colSpan = Math.min(colSpan, this.cols); // use horizontal or top column position

    var colPosMethod = this.options.horizontalOrder ? '_getHorizontalColPosition' : '_getTopColPosition';
    var colPosition = this[colPosMethod](colSpan, item); // position the brick

    var position = {
      x: this.columnWidth * colPosition.col,
      y: colPosition.y
    }; // apply setHeight to necessary columns

    var setHeight = colPosition.y + item.size.outerHeight;
    var setMax = colSpan + colPosition.col;

    for (var i = colPosition.col; i < setMax; i++) {
      this.colYs[i] = setHeight;
    }

    return position;
  };

  proto._getTopColPosition = function (colSpan) {
    var colGroup = this._getTopColGroup(colSpan); // get the minimum Y value from the columns


    var minimumY = Math.min.apply(Math, colGroup);
    return {
      col: colGroup.indexOf(minimumY),
      y: minimumY
    };
  };
  /**
   * @param {Number} colSpan - number of columns the element spans
   * @returns {Array} colGroup
   */


  proto._getTopColGroup = function (colSpan) {
    if (colSpan < 2) {
      // if brick spans only one column, use all the column Ys
      return this.colYs;
    }

    var colGroup = []; // how many different places could this brick fit horizontally

    var groupCount = this.cols + 1 - colSpan; // for each group potential horizontal position

    for (var i = 0; i < groupCount; i++) {
      colGroup[i] = this._getColGroupY(i, colSpan);
    }

    return colGroup;
  };

  proto._getColGroupY = function (col, colSpan) {
    if (colSpan < 2) {
      return this.colYs[col];
    } // make an array of colY values for that one group


    var groupColYs = this.colYs.slice(col, col + colSpan); // and get the max value of the array

    return Math.max.apply(Math, groupColYs);
  }; // get column position based on horizontal index. #873


  proto._getHorizontalColPosition = function (colSpan, item) {
    var col = this.horizontalColIndex % this.cols;
    var isOver = colSpan > 1 && col + colSpan > this.cols; // shift to next row if item can't fit on current row

    col = isOver ? 0 : col; // don't let zero-size items take up space

    var hasSize = item.size.outerWidth && item.size.outerHeight;
    this.horizontalColIndex = hasSize ? col + colSpan : this.horizontalColIndex;
    return {
      col: col,
      y: this._getColGroupY(col, colSpan)
    };
  };

  proto._manageStamp = function (stamp) {
    var stampSize = getSize(stamp);

    var offset = this._getElementOffset(stamp); // get the columns that this stamp affects


    var isOriginLeft = this._getOption('originLeft');

    var firstX = isOriginLeft ? offset.left : offset.right;
    var lastX = firstX + stampSize.outerWidth;
    var firstCol = Math.floor(firstX / this.columnWidth);
    firstCol = Math.max(0, firstCol);
    var lastCol = Math.floor(lastX / this.columnWidth); // lastCol should not go over if multiple of columnWidth #425

    lastCol -= lastX % this.columnWidth ? 0 : 1;
    lastCol = Math.min(this.cols - 1, lastCol); // set colYs to bottom of the stamp

    var isOriginTop = this._getOption('originTop');

    var stampMaxY = (isOriginTop ? offset.top : offset.bottom) + stampSize.outerHeight;

    for (var i = firstCol; i <= lastCol; i++) {
      this.colYs[i] = Math.max(stampMaxY, this.colYs[i]);
    }
  };

  proto._getContainerSize = function () {
    this.maxY = Math.max.apply(Math, this.colYs);
    var size = {
      height: this.maxY
    };

    if (this._getOption('fitWidth')) {
      size.width = this._getContainerFitWidth();
    }

    return size;
  };

  proto._getContainerFitWidth = function () {
    var unusedCols = 0; // count unused columns

    var i = this.cols;

    while (--i) {
      if (this.colYs[i] !== 0) {
        break;
      }

      unusedCols++;
    } // fit container to columns that have been used


    return (this.cols - unusedCols) * this.columnWidth - this.gutter;
  };

  proto.needsResizeLayout = function () {
    var previousWidth = this.containerWidth;
    this.getContainerWidth();
    return previousWidth != this.containerWidth;
  };

  return Masonry;
});

/***/ }),

/***/ "./node_modules/outlayer/item.js":
/*!***************************************!*\
  !*** ./node_modules/outlayer/item.js ***!
  \***************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * Outlayer Item
 */
(function (window, factory) {
  // universal module definition

  /* jshint strict: false */

  /* globals define, module, require */
  if (true) {
    // AMD - RequireJS
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ev-emitter/ev-emitter */ "./node_modules/ev-emitter/ev-emitter.js"), __webpack_require__(/*! get-size/get-size */ "./node_modules/get-size/get-size.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(window, function factory(EvEmitter, getSize) {
  'use strict'; // ----- helpers ----- //

  function isEmptyObj(obj) {
    for (var prop in obj) {
      return false;
    }

    prop = null;
    return true;
  } // -------------------------- CSS3 support -------------------------- //


  var docElemStyle = document.documentElement.style;
  var transitionProperty = typeof docElemStyle.transition == 'string' ? 'transition' : 'WebkitTransition';
  var transformProperty = typeof docElemStyle.transform == 'string' ? 'transform' : 'WebkitTransform';
  var transitionEndEvent = {
    WebkitTransition: 'webkitTransitionEnd',
    transition: 'transitionend'
  }[transitionProperty]; // cache all vendor properties that could have vendor prefix

  var vendorProperties = {
    transform: transformProperty,
    transition: transitionProperty,
    transitionDuration: transitionProperty + 'Duration',
    transitionProperty: transitionProperty + 'Property',
    transitionDelay: transitionProperty + 'Delay'
  }; // -------------------------- Item -------------------------- //

  function Item(element, layout) {
    if (!element) {
      return;
    }

    this.element = element; // parent layout class, i.e. Masonry, Isotope, or Packery

    this.layout = layout;
    this.position = {
      x: 0,
      y: 0
    };

    this._create();
  } // inherit EvEmitter


  var proto = Item.prototype = Object.create(EvEmitter.prototype);
  proto.constructor = Item;

  proto._create = function () {
    // transition objects
    this._transn = {
      ingProperties: {},
      clean: {},
      onEnd: {}
    };
    this.css({
      position: 'absolute'
    });
  }; // trigger specified handler for event type


  proto.handleEvent = function (event) {
    var method = 'on' + event.type;

    if (this[method]) {
      this[method](event);
    }
  };

  proto.getSize = function () {
    this.size = getSize(this.element);
  };
  /**
   * apply CSS styles to element
   * @param {Object} style
   */


  proto.css = function (style) {
    var elemStyle = this.element.style;

    for (var prop in style) {
      // use vendor property if available
      var supportedProp = vendorProperties[prop] || prop;
      elemStyle[supportedProp] = style[prop];
    }
  }; // measure position, and sets it


  proto.getPosition = function () {
    var style = getComputedStyle(this.element);

    var isOriginLeft = this.layout._getOption('originLeft');

    var isOriginTop = this.layout._getOption('originTop');

    var xValue = style[isOriginLeft ? 'left' : 'right'];
    var yValue = style[isOriginTop ? 'top' : 'bottom'];
    var x = parseFloat(xValue);
    var y = parseFloat(yValue); // convert percent to pixels

    var layoutSize = this.layout.size;

    if (xValue.indexOf('%') != -1) {
      x = x / 100 * layoutSize.width;
    }

    if (yValue.indexOf('%') != -1) {
      y = y / 100 * layoutSize.height;
    } // clean up 'auto' or other non-integer values


    x = isNaN(x) ? 0 : x;
    y = isNaN(y) ? 0 : y; // remove padding from measurement

    x -= isOriginLeft ? layoutSize.paddingLeft : layoutSize.paddingRight;
    y -= isOriginTop ? layoutSize.paddingTop : layoutSize.paddingBottom;
    this.position.x = x;
    this.position.y = y;
  }; // set settled position, apply padding


  proto.layoutPosition = function () {
    var layoutSize = this.layout.size;
    var style = {};

    var isOriginLeft = this.layout._getOption('originLeft');

    var isOriginTop = this.layout._getOption('originTop'); // x


    var xPadding = isOriginLeft ? 'paddingLeft' : 'paddingRight';
    var xProperty = isOriginLeft ? 'left' : 'right';
    var xResetProperty = isOriginLeft ? 'right' : 'left';
    var x = this.position.x + layoutSize[xPadding]; // set in percentage or pixels

    style[xProperty] = this.getXValue(x); // reset other property

    style[xResetProperty] = ''; // y

    var yPadding = isOriginTop ? 'paddingTop' : 'paddingBottom';
    var yProperty = isOriginTop ? 'top' : 'bottom';
    var yResetProperty = isOriginTop ? 'bottom' : 'top';
    var y = this.position.y + layoutSize[yPadding]; // set in percentage or pixels

    style[yProperty] = this.getYValue(y); // reset other property

    style[yResetProperty] = '';
    this.css(style);
    this.emitEvent('layout', [this]);
  };

  proto.getXValue = function (x) {
    var isHorizontal = this.layout._getOption('horizontal');

    return this.layout.options.percentPosition && !isHorizontal ? x / this.layout.size.width * 100 + '%' : x + 'px';
  };

  proto.getYValue = function (y) {
    var isHorizontal = this.layout._getOption('horizontal');

    return this.layout.options.percentPosition && isHorizontal ? y / this.layout.size.height * 100 + '%' : y + 'px';
  };

  proto._transitionTo = function (x, y) {
    this.getPosition(); // get current x & y from top/left

    var curX = this.position.x;
    var curY = this.position.y;
    var didNotMove = x == this.position.x && y == this.position.y; // save end position

    this.setPosition(x, y); // if did not move and not transitioning, just go to layout

    if (didNotMove && !this.isTransitioning) {
      this.layoutPosition();
      return;
    }

    var transX = x - curX;
    var transY = y - curY;
    var transitionStyle = {};
    transitionStyle.transform = this.getTranslate(transX, transY);
    this.transition({
      to: transitionStyle,
      onTransitionEnd: {
        transform: this.layoutPosition
      },
      isCleaning: true
    });
  };

  proto.getTranslate = function (x, y) {
    // flip cooridinates if origin on right or bottom
    var isOriginLeft = this.layout._getOption('originLeft');

    var isOriginTop = this.layout._getOption('originTop');

    x = isOriginLeft ? x : -x;
    y = isOriginTop ? y : -y;
    return 'translate3d(' + x + 'px, ' + y + 'px, 0)';
  }; // non transition + transform support


  proto.goTo = function (x, y) {
    this.setPosition(x, y);
    this.layoutPosition();
  };

  proto.moveTo = proto._transitionTo;

  proto.setPosition = function (x, y) {
    this.position.x = parseFloat(x);
    this.position.y = parseFloat(y);
  }; // ----- transition ----- //

  /**
   * @param {Object} style - CSS
   * @param {Function} onTransitionEnd
   */
  // non transition, just trigger callback


  proto._nonTransition = function (args) {
    this.css(args.to);

    if (args.isCleaning) {
      this._removeStyles(args.to);
    }

    for (var prop in args.onTransitionEnd) {
      args.onTransitionEnd[prop].call(this);
    }
  };
  /**
   * proper transition
   * @param {Object} args - arguments
   *   @param {Object} to - style to transition to
   *   @param {Object} from - style to start transition from
   *   @param {Boolean} isCleaning - removes transition styles after transition
   *   @param {Function} onTransitionEnd - callback
   */


  proto.transition = function (args) {
    // redirect to nonTransition if no transition duration
    if (!parseFloat(this.layout.options.transitionDuration)) {
      this._nonTransition(args);

      return;
    }

    var _transition = this._transn; // keep track of onTransitionEnd callback by css property

    for (var prop in args.onTransitionEnd) {
      _transition.onEnd[prop] = args.onTransitionEnd[prop];
    } // keep track of properties that are transitioning


    for (prop in args.to) {
      _transition.ingProperties[prop] = true; // keep track of properties to clean up when transition is done

      if (args.isCleaning) {
        _transition.clean[prop] = true;
      }
    } // set from styles


    if (args.from) {
      this.css(args.from); // force redraw. http://blog.alexmaccaw.com/css-transitions

      var h = this.element.offsetHeight; // hack for JSHint to hush about unused var

      h = null;
    } // enable transition


    this.enableTransition(args.to); // set styles that are transitioning

    this.css(args.to);
    this.isTransitioning = true;
  }; // dash before all cap letters, including first for
  // WebkitTransform => -webkit-transform


  function toDashedAll(str) {
    return str.replace(/([A-Z])/g, function ($1) {
      return '-' + $1.toLowerCase();
    });
  }

  var transitionProps = 'opacity,' + toDashedAll(transformProperty);

  proto.enableTransition = function
    /* style */
  () {
    // HACK changing transitionProperty during a transition
    // will cause transition to jump
    if (this.isTransitioning) {
      return;
    } // make `transition: foo, bar, baz` from style object
    // HACK un-comment this when enableTransition can work
    // while a transition is happening
    // var transitionValues = [];
    // for ( var prop in style ) {
    //   // dash-ify camelCased properties like WebkitTransition
    //   prop = vendorProperties[ prop ] || prop;
    //   transitionValues.push( toDashedAll( prop ) );
    // }
    // munge number to millisecond, to match stagger


    var duration = this.layout.options.transitionDuration;
    duration = typeof duration == 'number' ? duration + 'ms' : duration; // enable transition styles

    this.css({
      transitionProperty: transitionProps,
      transitionDuration: duration,
      transitionDelay: this.staggerDelay || 0
    }); // listen for transition end event

    this.element.addEventListener(transitionEndEvent, this, false);
  }; // ----- events ----- //


  proto.onwebkitTransitionEnd = function (event) {
    this.ontransitionend(event);
  };

  proto.onotransitionend = function (event) {
    this.ontransitionend(event);
  }; // properties that I munge to make my life easier


  var dashedVendorProperties = {
    '-webkit-transform': 'transform'
  };

  proto.ontransitionend = function (event) {
    // disregard bubbled events from children
    if (event.target !== this.element) {
      return;
    }

    var _transition = this._transn; // get property name of transitioned property, convert to prefix-free

    var propertyName = dashedVendorProperties[event.propertyName] || event.propertyName; // remove property that has completed transitioning

    delete _transition.ingProperties[propertyName]; // check if any properties are still transitioning

    if (isEmptyObj(_transition.ingProperties)) {
      // all properties have completed transitioning
      this.disableTransition();
    } // clean style


    if (propertyName in _transition.clean) {
      // clean up style
      this.element.style[event.propertyName] = '';
      delete _transition.clean[propertyName];
    } // trigger onTransitionEnd callback


    if (propertyName in _transition.onEnd) {
      var onTransitionEnd = _transition.onEnd[propertyName];
      onTransitionEnd.call(this);
      delete _transition.onEnd[propertyName];
    }

    this.emitEvent('transitionEnd', [this]);
  };

  proto.disableTransition = function () {
    this.removeTransitionStyles();
    this.element.removeEventListener(transitionEndEvent, this, false);
    this.isTransitioning = false;
  };
  /**
   * removes style property from element
   * @param {Object} style
  **/


  proto._removeStyles = function (style) {
    // clean up transition styles
    var cleanStyle = {};

    for (var prop in style) {
      cleanStyle[prop] = '';
    }

    this.css(cleanStyle);
  };

  var cleanTransitionStyle = {
    transitionProperty: '',
    transitionDuration: '',
    transitionDelay: ''
  };

  proto.removeTransitionStyles = function () {
    // remove transition
    this.css(cleanTransitionStyle);
  }; // ----- stagger ----- //


  proto.stagger = function (delay) {
    delay = isNaN(delay) ? 0 : delay;
    this.staggerDelay = delay + 'ms';
  }; // ----- show/hide/remove ----- //
  // remove element from DOM


  proto.removeElem = function () {
    this.element.parentNode.removeChild(this.element); // remove display: none

    this.css({
      display: ''
    });
    this.emitEvent('remove', [this]);
  };

  proto.remove = function () {
    // just remove element if no transition support or no transition
    if (!transitionProperty || !parseFloat(this.layout.options.transitionDuration)) {
      this.removeElem();
      return;
    } // start transition


    this.once('transitionEnd', function () {
      this.removeElem();
    });
    this.hide();
  };

  proto.reveal = function () {
    delete this.isHidden; // remove display: none

    this.css({
      display: ''
    });
    var options = this.layout.options;
    var onTransitionEnd = {};
    var transitionEndProperty = this.getHideRevealTransitionEndProperty('visibleStyle');
    onTransitionEnd[transitionEndProperty] = this.onRevealTransitionEnd;
    this.transition({
      from: options.hiddenStyle,
      to: options.visibleStyle,
      isCleaning: true,
      onTransitionEnd: onTransitionEnd
    });
  };

  proto.onRevealTransitionEnd = function () {
    // check if still visible
    // during transition, item may have been hidden
    if (!this.isHidden) {
      this.emitEvent('reveal');
    }
  };
  /**
   * get style property use for hide/reveal transition end
   * @param {String} styleProperty - hiddenStyle/visibleStyle
   * @returns {String}
   */


  proto.getHideRevealTransitionEndProperty = function (styleProperty) {
    var optionStyle = this.layout.options[styleProperty]; // use opacity

    if (optionStyle.opacity) {
      return 'opacity';
    } // get first property


    for (var prop in optionStyle) {
      return prop;
    }
  };

  proto.hide = function () {
    // set flag
    this.isHidden = true; // remove display: none

    this.css({
      display: ''
    });
    var options = this.layout.options;
    var onTransitionEnd = {};
    var transitionEndProperty = this.getHideRevealTransitionEndProperty('hiddenStyle');
    onTransitionEnd[transitionEndProperty] = this.onHideTransitionEnd;
    this.transition({
      from: options.visibleStyle,
      to: options.hiddenStyle,
      // keep hidden stuff hidden
      isCleaning: true,
      onTransitionEnd: onTransitionEnd
    });
  };

  proto.onHideTransitionEnd = function () {
    // check if still hidden
    // during transition, item may have been un-hidden
    if (this.isHidden) {
      this.css({
        display: 'none'
      });
      this.emitEvent('hide');
    }
  };

  proto.destroy = function () {
    this.css({
      position: '',
      left: '',
      right: '',
      top: '',
      bottom: '',
      transition: '',
      transform: ''
    });
  };

  return Item;
});

/***/ }),

/***/ "./node_modules/outlayer/outlayer.js":
/*!*******************************************!*\
  !*** ./node_modules/outlayer/outlayer.js ***!
  \*******************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * Outlayer v2.1.1
 * the brains and guts of a layout library
 * MIT license
 */
(function (window, factory) {
  'use strict'; // universal module definition

  /* jshint strict: false */

  /* globals define, module, require */

  if (true) {
    // AMD - RequireJS
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ev-emitter/ev-emitter */ "./node_modules/ev-emitter/ev-emitter.js"), __webpack_require__(/*! get-size/get-size */ "./node_modules/get-size/get-size.js"), __webpack_require__(/*! fizzy-ui-utils/utils */ "./node_modules/fizzy-ui-utils/utils.js"), __webpack_require__(/*! ./item */ "./node_modules/outlayer/item.js")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (EvEmitter, getSize, utils, Item) {
      return factory(window, EvEmitter, getSize, utils, Item);
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(window, function factory(window, EvEmitter, getSize, utils, Item) {
  'use strict'; // ----- vars ----- //

  var console = window.console;
  var jQuery = window.jQuery;

  var noop = function () {}; // -------------------------- Outlayer -------------------------- //
  // globally unique identifiers


  var GUID = 0; // internal store of all Outlayer intances

  var instances = {};
  /**
   * @param {Element, String} element
   * @param {Object} options
   * @constructor
   */

  function Outlayer(element, options) {
    var queryElement = utils.getQueryElement(element);

    if (!queryElement) {
      if (console) {
        console.error('Bad element for ' + this.constructor.namespace + ': ' + (queryElement || element));
      }

      return;
    }

    this.element = queryElement; // add jQuery

    if (jQuery) {
      this.$element = jQuery(this.element);
    } // options


    this.options = utils.extend({}, this.constructor.defaults);
    this.option(options); // add id for Outlayer.getFromElement

    var id = ++GUID;
    this.element.outlayerGUID = id; // expando

    instances[id] = this; // associate via id
    // kick it off

    this._create();

    var isInitLayout = this._getOption('initLayout');

    if (isInitLayout) {
      this.layout();
    }
  } // settings are for internal use only


  Outlayer.namespace = 'outlayer';
  Outlayer.Item = Item; // default options

  Outlayer.defaults = {
    containerStyle: {
      position: 'relative'
    },
    initLayout: true,
    originLeft: true,
    originTop: true,
    resize: true,
    resizeContainer: true,
    // item options
    transitionDuration: '0.4s',
    hiddenStyle: {
      opacity: 0,
      transform: 'scale(0.001)'
    },
    visibleStyle: {
      opacity: 1,
      transform: 'scale(1)'
    }
  };
  var proto = Outlayer.prototype; // inherit EvEmitter

  utils.extend(proto, EvEmitter.prototype);
  /**
   * set options
   * @param {Object} opts
   */

  proto.option = function (opts) {
    utils.extend(this.options, opts);
  };
  /**
   * get backwards compatible option value, check old name
   */


  proto._getOption = function (option) {
    var oldOption = this.constructor.compatOptions[option];
    return oldOption && this.options[oldOption] !== undefined ? this.options[oldOption] : this.options[option];
  };

  Outlayer.compatOptions = {
    // currentName: oldName
    initLayout: 'isInitLayout',
    horizontal: 'isHorizontal',
    layoutInstant: 'isLayoutInstant',
    originLeft: 'isOriginLeft',
    originTop: 'isOriginTop',
    resize: 'isResizeBound',
    resizeContainer: 'isResizingContainer'
  };

  proto._create = function () {
    // get items from children
    this.reloadItems(); // elements that affect layout, but are not laid out

    this.stamps = [];
    this.stamp(this.options.stamp); // set container style

    utils.extend(this.element.style, this.options.containerStyle); // bind resize method

    var canBindResize = this._getOption('resize');

    if (canBindResize) {
      this.bindResize();
    }
  }; // goes through all children again and gets bricks in proper order


  proto.reloadItems = function () {
    // collection of item elements
    this.items = this._itemize(this.element.children);
  };
  /**
   * turn elements into Outlayer.Items to be used in layout
   * @param {Array or NodeList or HTMLElement} elems
   * @returns {Array} items - collection of new Outlayer Items
   */


  proto._itemize = function (elems) {
    var itemElems = this._filterFindItemElements(elems);

    var Item = this.constructor.Item; // create new Outlayer Items for collection

    var items = [];

    for (var i = 0; i < itemElems.length; i++) {
      var elem = itemElems[i];
      var item = new Item(elem, this);
      items.push(item);
    }

    return items;
  };
  /**
   * get item elements to be used in layout
   * @param {Array or NodeList or HTMLElement} elems
   * @returns {Array} items - item elements
   */


  proto._filterFindItemElements = function (elems) {
    return utils.filterFindElements(elems, this.options.itemSelector);
  };
  /**
   * getter method for getting item elements
   * @returns {Array} elems - collection of item elements
   */


  proto.getItemElements = function () {
    return this.items.map(function (item) {
      return item.element;
    });
  }; // ----- init & layout ----- //

  /**
   * lays out all items
   */


  proto.layout = function () {
    this._resetLayout();

    this._manageStamps(); // don't animate first layout


    var layoutInstant = this._getOption('layoutInstant');

    var isInstant = layoutInstant !== undefined ? layoutInstant : !this._isLayoutInited;
    this.layoutItems(this.items, isInstant); // flag for initalized

    this._isLayoutInited = true;
  }; // _init is alias for layout


  proto._init = proto.layout;
  /**
   * logic before any new layout
   */

  proto._resetLayout = function () {
    this.getSize();
  };

  proto.getSize = function () {
    this.size = getSize(this.element);
  };
  /**
   * get measurement from option, for columnWidth, rowHeight, gutter
   * if option is String -> get element from selector string, & get size of element
   * if option is Element -> get size of element
   * else use option as a number
   *
   * @param {String} measurement
   * @param {String} size - width or height
   * @private
   */


  proto._getMeasurement = function (measurement, size) {
    var option = this.options[measurement];
    var elem;

    if (!option) {
      // default to 0
      this[measurement] = 0;
    } else {
      // use option as an element
      if (typeof option == 'string') {
        elem = this.element.querySelector(option);
      } else if (option instanceof HTMLElement) {
        elem = option;
      } // use size of element, if element


      this[measurement] = elem ? getSize(elem)[size] : option;
    }
  };
  /**
   * layout a collection of item elements
   * @api public
   */


  proto.layoutItems = function (items, isInstant) {
    items = this._getItemsForLayout(items);

    this._layoutItems(items, isInstant);

    this._postLayout();
  };
  /**
   * get the items to be laid out
   * you may want to skip over some items
   * @param {Array} items
   * @returns {Array} items
   */


  proto._getItemsForLayout = function (items) {
    return items.filter(function (item) {
      return !item.isIgnored;
    });
  };
  /**
   * layout items
   * @param {Array} items
   * @param {Boolean} isInstant
   */


  proto._layoutItems = function (items, isInstant) {
    this._emitCompleteOnItems('layout', items);

    if (!items || !items.length) {
      // no items, emit event with empty array
      return;
    }

    var queue = [];
    items.forEach(function (item) {
      // get x/y object from method
      var position = this._getItemLayoutPosition(item); // enqueue


      position.item = item;
      position.isInstant = isInstant || item.isLayoutInstant;
      queue.push(position);
    }, this);

    this._processLayoutQueue(queue);
  };
  /**
   * get item layout position
   * @param {Outlayer.Item} item
   * @returns {Object} x and y position
   */


  proto._getItemLayoutPosition = function
    /* item */
  () {
    return {
      x: 0,
      y: 0
    };
  };
  /**
   * iterate over array and position each item
   * Reason being - separating this logic prevents 'layout invalidation'
   * thx @paul_irish
   * @param {Array} queue
   */


  proto._processLayoutQueue = function (queue) {
    this.updateStagger();
    queue.forEach(function (obj, i) {
      this._positionItem(obj.item, obj.x, obj.y, obj.isInstant, i);
    }, this);
  }; // set stagger from option in milliseconds number


  proto.updateStagger = function () {
    var stagger = this.options.stagger;

    if (stagger === null || stagger === undefined) {
      this.stagger = 0;
      return;
    }

    this.stagger = getMilliseconds(stagger);
    return this.stagger;
  };
  /**
   * Sets position of item in DOM
   * @param {Outlayer.Item} item
   * @param {Number} x - horizontal position
   * @param {Number} y - vertical position
   * @param {Boolean} isInstant - disables transitions
   */


  proto._positionItem = function (item, x, y, isInstant, i) {
    if (isInstant) {
      // if not transition, just set CSS
      item.goTo(x, y);
    } else {
      item.stagger(i * this.stagger);
      item.moveTo(x, y);
    }
  };
  /**
   * Any logic you want to do after each layout,
   * i.e. size the container
   */


  proto._postLayout = function () {
    this.resizeContainer();
  };

  proto.resizeContainer = function () {
    var isResizingContainer = this._getOption('resizeContainer');

    if (!isResizingContainer) {
      return;
    }

    var size = this._getContainerSize();

    if (size) {
      this._setContainerMeasure(size.width, true);

      this._setContainerMeasure(size.height, false);
    }
  };
  /**
   * Sets width or height of container if returned
   * @returns {Object} size
   *   @param {Number} width
   *   @param {Number} height
   */


  proto._getContainerSize = noop;
  /**
   * @param {Number} measure - size of width or height
   * @param {Boolean} isWidth
   */

  proto._setContainerMeasure = function (measure, isWidth) {
    if (measure === undefined) {
      return;
    }

    var elemSize = this.size; // add padding and border width if border box

    if (elemSize.isBorderBox) {
      measure += isWidth ? elemSize.paddingLeft + elemSize.paddingRight + elemSize.borderLeftWidth + elemSize.borderRightWidth : elemSize.paddingBottom + elemSize.paddingTop + elemSize.borderTopWidth + elemSize.borderBottomWidth;
    }

    measure = Math.max(measure, 0);
    this.element.style[isWidth ? 'width' : 'height'] = measure + 'px';
  };
  /**
   * emit eventComplete on a collection of items events
   * @param {String} eventName
   * @param {Array} items - Outlayer.Items
   */


  proto._emitCompleteOnItems = function (eventName, items) {
    var _this = this;

    function onComplete() {
      _this.dispatchEvent(eventName + 'Complete', null, [items]);
    }

    var count = items.length;

    if (!items || !count) {
      onComplete();
      return;
    }

    var doneCount = 0;

    function tick() {
      doneCount++;

      if (doneCount == count) {
        onComplete();
      }
    } // bind callback


    items.forEach(function (item) {
      item.once(eventName, tick);
    });
  };
  /**
   * emits events via EvEmitter and jQuery events
   * @param {String} type - name of event
   * @param {Event} event - original event
   * @param {Array} args - extra arguments
   */


  proto.dispatchEvent = function (type, event, args) {
    // add original event to arguments
    var emitArgs = event ? [event].concat(args) : args;
    this.emitEvent(type, emitArgs);

    if (jQuery) {
      // set this.$element
      this.$element = this.$element || jQuery(this.element);

      if (event) {
        // create jQuery event
        var $event = jQuery.Event(event);
        $event.type = type;
        this.$element.trigger($event, args);
      } else {
        // just trigger with type if no event available
        this.$element.trigger(type, args);
      }
    }
  }; // -------------------------- ignore & stamps -------------------------- //

  /**
   * keep item in collection, but do not lay it out
   * ignored items do not get skipped in layout
   * @param {Element} elem
   */


  proto.ignore = function (elem) {
    var item = this.getItem(elem);

    if (item) {
      item.isIgnored = true;
    }
  };
  /**
   * return item to layout collection
   * @param {Element} elem
   */


  proto.unignore = function (elem) {
    var item = this.getItem(elem);

    if (item) {
      delete item.isIgnored;
    }
  };
  /**
   * adds elements to stamps
   * @param {NodeList, Array, Element, or String} elems
   */


  proto.stamp = function (elems) {
    elems = this._find(elems);

    if (!elems) {
      return;
    }

    this.stamps = this.stamps.concat(elems); // ignore

    elems.forEach(this.ignore, this);
  };
  /**
   * removes elements to stamps
   * @param {NodeList, Array, or Element} elems
   */


  proto.unstamp = function (elems) {
    elems = this._find(elems);

    if (!elems) {
      return;
    }

    elems.forEach(function (elem) {
      // filter out removed stamp elements
      utils.removeFrom(this.stamps, elem);
      this.unignore(elem);
    }, this);
  };
  /**
   * finds child elements
   * @param {NodeList, Array, Element, or String} elems
   * @returns {Array} elems
   */


  proto._find = function (elems) {
    if (!elems) {
      return;
    } // if string, use argument as selector string


    if (typeof elems == 'string') {
      elems = this.element.querySelectorAll(elems);
    }

    elems = utils.makeArray(elems);
    return elems;
  };

  proto._manageStamps = function () {
    if (!this.stamps || !this.stamps.length) {
      return;
    }

    this._getBoundingRect();

    this.stamps.forEach(this._manageStamp, this);
  }; // update boundingLeft / Top


  proto._getBoundingRect = function () {
    // get bounding rect for container element
    var boundingRect = this.element.getBoundingClientRect();
    var size = this.size;
    this._boundingRect = {
      left: boundingRect.left + size.paddingLeft + size.borderLeftWidth,
      top: boundingRect.top + size.paddingTop + size.borderTopWidth,
      right: boundingRect.right - (size.paddingRight + size.borderRightWidth),
      bottom: boundingRect.bottom - (size.paddingBottom + size.borderBottomWidth)
    };
  };
  /**
   * @param {Element} stamp
  **/


  proto._manageStamp = noop;
  /**
   * get x/y position of element relative to container element
   * @param {Element} elem
   * @returns {Object} offset - has left, top, right, bottom
   */

  proto._getElementOffset = function (elem) {
    var boundingRect = elem.getBoundingClientRect();
    var thisRect = this._boundingRect;
    var size = getSize(elem);
    var offset = {
      left: boundingRect.left - thisRect.left - size.marginLeft,
      top: boundingRect.top - thisRect.top - size.marginTop,
      right: thisRect.right - boundingRect.right - size.marginRight,
      bottom: thisRect.bottom - boundingRect.bottom - size.marginBottom
    };
    return offset;
  }; // -------------------------- resize -------------------------- //
  // enable event handlers for listeners
  // i.e. resize -> onresize


  proto.handleEvent = utils.handleEvent;
  /**
   * Bind layout to window resizing
   */

  proto.bindResize = function () {
    window.addEventListener('resize', this);
    this.isResizeBound = true;
  };
  /**
   * Unbind layout to window resizing
   */


  proto.unbindResize = function () {
    window.removeEventListener('resize', this);
    this.isResizeBound = false;
  };

  proto.onresize = function () {
    this.resize();
  };

  utils.debounceMethod(Outlayer, 'onresize', 100);

  proto.resize = function () {
    // don't trigger if size did not change
    // or if resize was unbound. See #9
    if (!this.isResizeBound || !this.needsResizeLayout()) {
      return;
    }

    this.layout();
  };
  /**
   * check if layout is needed post layout
   * @returns Boolean
   */


  proto.needsResizeLayout = function () {
    var size = getSize(this.element); // check that this.size and size are there
    // IE8 triggers resize on body size change, so they might not be

    var hasSizes = this.size && size;
    return hasSizes && size.innerWidth !== this.size.innerWidth;
  }; // -------------------------- methods -------------------------- //

  /**
   * add items to Outlayer instance
   * @param {Array or NodeList or Element} elems
   * @returns {Array} items - Outlayer.Items
  **/


  proto.addItems = function (elems) {
    var items = this._itemize(elems); // add items to collection


    if (items.length) {
      this.items = this.items.concat(items);
    }

    return items;
  };
  /**
   * Layout newly-appended item elements
   * @param {Array or NodeList or Element} elems
   */


  proto.appended = function (elems) {
    var items = this.addItems(elems);

    if (!items.length) {
      return;
    } // layout and reveal just the new items


    this.layoutItems(items, true);
    this.reveal(items);
  };
  /**
   * Layout prepended elements
   * @param {Array or NodeList or Element} elems
   */


  proto.prepended = function (elems) {
    var items = this._itemize(elems);

    if (!items.length) {
      return;
    } // add items to beginning of collection


    var previousItems = this.items.slice(0);
    this.items = items.concat(previousItems); // start new layout

    this._resetLayout();

    this._manageStamps(); // layout new stuff without transition


    this.layoutItems(items, true);
    this.reveal(items); // layout previous items

    this.layoutItems(previousItems);
  };
  /**
   * reveal a collection of items
   * @param {Array of Outlayer.Items} items
   */


  proto.reveal = function (items) {
    this._emitCompleteOnItems('reveal', items);

    if (!items || !items.length) {
      return;
    }

    var stagger = this.updateStagger();
    items.forEach(function (item, i) {
      item.stagger(i * stagger);
      item.reveal();
    });
  };
  /**
   * hide a collection of items
   * @param {Array of Outlayer.Items} items
   */


  proto.hide = function (items) {
    this._emitCompleteOnItems('hide', items);

    if (!items || !items.length) {
      return;
    }

    var stagger = this.updateStagger();
    items.forEach(function (item, i) {
      item.stagger(i * stagger);
      item.hide();
    });
  };
  /**
   * reveal item elements
   * @param {Array}, {Element}, {NodeList} items
   */


  proto.revealItemElements = function (elems) {
    var items = this.getItems(elems);
    this.reveal(items);
  };
  /**
   * hide item elements
   * @param {Array}, {Element}, {NodeList} items
   */


  proto.hideItemElements = function (elems) {
    var items = this.getItems(elems);
    this.hide(items);
  };
  /**
   * get Outlayer.Item, given an Element
   * @param {Element} elem
   * @param {Function} callback
   * @returns {Outlayer.Item} item
   */


  proto.getItem = function (elem) {
    // loop through items to get the one that matches
    for (var i = 0; i < this.items.length; i++) {
      var item = this.items[i];

      if (item.element == elem) {
        // return item
        return item;
      }
    }
  };
  /**
   * get collection of Outlayer.Items, given Elements
   * @param {Array} elems
   * @returns {Array} items - Outlayer.Items
   */


  proto.getItems = function (elems) {
    elems = utils.makeArray(elems);
    var items = [];
    elems.forEach(function (elem) {
      var item = this.getItem(elem);

      if (item) {
        items.push(item);
      }
    }, this);
    return items;
  };
  /**
   * remove element(s) from instance and DOM
   * @param {Array or NodeList or Element} elems
   */


  proto.remove = function (elems) {
    var removeItems = this.getItems(elems);

    this._emitCompleteOnItems('remove', removeItems); // bail if no items to remove


    if (!removeItems || !removeItems.length) {
      return;
    }

    removeItems.forEach(function (item) {
      item.remove(); // remove item from collection

      utils.removeFrom(this.items, item);
    }, this);
  }; // ----- destroy ----- //
  // remove and disable Outlayer instance


  proto.destroy = function () {
    // clean up dynamic styles
    var style = this.element.style;
    style.height = '';
    style.position = '';
    style.width = ''; // destroy items

    this.items.forEach(function (item) {
      item.destroy();
    });
    this.unbindResize();
    var id = this.element.outlayerGUID;
    delete instances[id]; // remove reference to instance by id

    delete this.element.outlayerGUID; // remove data for jQuery

    if (jQuery) {
      jQuery.removeData(this.element, this.constructor.namespace);
    }
  }; // -------------------------- data -------------------------- //

  /**
   * get Outlayer instance from element
   * @param {Element} elem
   * @returns {Outlayer}
   */


  Outlayer.data = function (elem) {
    elem = utils.getQueryElement(elem);
    var id = elem && elem.outlayerGUID;
    return id && instances[id];
  }; // -------------------------- create Outlayer class -------------------------- //

  /**
   * create a layout class
   * @param {String} namespace
   */


  Outlayer.create = function (namespace, options) {
    // sub-class Outlayer
    var Layout = subclass(Outlayer); // apply new options and compatOptions

    Layout.defaults = utils.extend({}, Outlayer.defaults);
    utils.extend(Layout.defaults, options);
    Layout.compatOptions = utils.extend({}, Outlayer.compatOptions);
    Layout.namespace = namespace;
    Layout.data = Outlayer.data; // sub-class Item

    Layout.Item = subclass(Item); // -------------------------- declarative -------------------------- //

    utils.htmlInit(Layout, namespace); // -------------------------- jQuery bridge -------------------------- //
    // make into jQuery plugin

    if (jQuery && jQuery.bridget) {
      jQuery.bridget(namespace, Layout);
    }

    return Layout;
  };

  function subclass(Parent) {
    function SubClass() {
      Parent.apply(this, arguments);
    }

    SubClass.prototype = Object.create(Parent.prototype);
    SubClass.prototype.constructor = SubClass;
    return SubClass;
  } // ----- helpers ----- //
  // how many milliseconds are in each unit


  var msUnits = {
    ms: 1,
    s: 1000
  }; // munge time-like parameter into millisecond number
  // '0.4s' -> 40

  function getMilliseconds(time) {
    if (typeof time == 'number') {
      return time;
    }

    var matches = time.match(/(^\d*\.?\d*)(\w*)/);
    var num = matches && matches[1];
    var unit = matches && matches[2];

    if (!num.length) {
      return 0;
    }

    num = parseFloat(num);
    var mult = msUnits[unit] || 1;
    return num * mult;
  } // ----- fin ----- //
  // back in global


  Outlayer.Item = Item;
  return Outlayer;
});

/***/ }),

/***/ "./node_modules/slick-carousel/slick/slick.js":
/*!****************************************************!*\
  !*** ./node_modules/slick-carousel/slick/slick.js ***!
  \****************************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.8.1
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */

/* global window, document, define, jQuery, setInterval, clearInterval */
;

(function (factory) {
  'use strict';

  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(function ($) {
  'use strict';

  var Slick = window.Slick || {};

  Slick = function () {
    var instanceUid = 0;

    function Slick(element, settings) {
      var _ = this,
          dataSettings;

      _.defaults = {
        accessibility: true,
        adaptiveHeight: false,
        appendArrows: $(element),
        appendDots: $(element),
        arrows: true,
        asNavFor: null,
        prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
        nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
        autoplay: false,
        autoplaySpeed: 3000,
        centerMode: false,
        centerPadding: '50px',
        cssEase: 'ease',
        customPaging: function (slider, i) {
          return $('<button type="button" />').text(i + 1);
        },
        dots: false,
        dotsClass: 'slick-dots',
        draggable: true,
        easing: 'linear',
        edgeFriction: 0.35,
        fade: false,
        focusOnSelect: false,
        focusOnChange: false,
        infinite: true,
        initialSlide: 0,
        lazyLoad: 'ondemand',
        mobileFirst: false,
        pauseOnHover: true,
        pauseOnFocus: true,
        pauseOnDotsHover: false,
        respondTo: 'window',
        responsive: null,
        rows: 1,
        rtl: false,
        slide: '',
        slidesPerRow: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        swipe: true,
        swipeToSlide: false,
        touchMove: true,
        touchThreshold: 5,
        useCSS: true,
        useTransform: true,
        variableWidth: false,
        vertical: false,
        verticalSwiping: false,
        waitForAnimate: true,
        zIndex: 1000
      };
      _.initials = {
        animating: false,
        dragging: false,
        autoPlayTimer: null,
        currentDirection: 0,
        currentLeft: null,
        currentSlide: 0,
        direction: 1,
        $dots: null,
        listWidth: null,
        listHeight: null,
        loadIndex: 0,
        $nextArrow: null,
        $prevArrow: null,
        scrolling: false,
        slideCount: null,
        slideWidth: null,
        $slideTrack: null,
        $slides: null,
        sliding: false,
        slideOffset: 0,
        swipeLeft: null,
        swiping: false,
        $list: null,
        touchObject: {},
        transformsEnabled: false,
        unslicked: false
      };
      $.extend(_, _.initials);
      _.activeBreakpoint = null;
      _.animType = null;
      _.animProp = null;
      _.breakpoints = [];
      _.breakpointSettings = [];
      _.cssTransitions = false;
      _.focussed = false;
      _.interrupted = false;
      _.hidden = 'hidden';
      _.paused = true;
      _.positionProp = null;
      _.respondTo = null;
      _.rowCount = 1;
      _.shouldClick = true;
      _.$slider = $(element);
      _.$slidesCache = null;
      _.transformType = null;
      _.transitionType = null;
      _.visibilityChange = 'visibilitychange';
      _.windowWidth = 0;
      _.windowTimer = null;
      dataSettings = $(element).data('slick') || {};
      _.options = $.extend({}, _.defaults, settings, dataSettings);
      _.currentSlide = _.options.initialSlide;
      _.originalSettings = _.options;

      if (typeof document.mozHidden !== 'undefined') {
        _.hidden = 'mozHidden';
        _.visibilityChange = 'mozvisibilitychange';
      } else if (typeof document.webkitHidden !== 'undefined') {
        _.hidden = 'webkitHidden';
        _.visibilityChange = 'webkitvisibilitychange';
      }

      _.autoPlay = $.proxy(_.autoPlay, _);
      _.autoPlayClear = $.proxy(_.autoPlayClear, _);
      _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
      _.changeSlide = $.proxy(_.changeSlide, _);
      _.clickHandler = $.proxy(_.clickHandler, _);
      _.selectHandler = $.proxy(_.selectHandler, _);
      _.setPosition = $.proxy(_.setPosition, _);
      _.swipeHandler = $.proxy(_.swipeHandler, _);
      _.dragHandler = $.proxy(_.dragHandler, _);
      _.keyHandler = $.proxy(_.keyHandler, _);
      _.instanceUid = instanceUid++; // A simple way to check for HTML strings
      // Strict HTML recognition (must start with <)
      // Extracted from jQuery v1.11 source

      _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;

      _.registerBreakpoints();

      _.init(true);
    }

    return Slick;
  }();

  Slick.prototype.activateADA = function () {
    var _ = this;

    _.$slideTrack.find('.slick-active').attr({
      'aria-hidden': 'false'
    }).find('a, input, button, select').attr({
      'tabindex': '0'
    });
  };

  Slick.prototype.addSlide = Slick.prototype.slickAdd = function (markup, index, addBefore) {
    var _ = this;

    if (typeof index === 'boolean') {
      addBefore = index;
      index = null;
    } else if (index < 0 || index >= _.slideCount) {
      return false;
    }

    _.unload();

    if (typeof index === 'number') {
      if (index === 0 && _.$slides.length === 0) {
        $(markup).appendTo(_.$slideTrack);
      } else if (addBefore) {
        $(markup).insertBefore(_.$slides.eq(index));
      } else {
        $(markup).insertAfter(_.$slides.eq(index));
      }
    } else {
      if (addBefore === true) {
        $(markup).prependTo(_.$slideTrack);
      } else {
        $(markup).appendTo(_.$slideTrack);
      }
    }

    _.$slides = _.$slideTrack.children(this.options.slide);

    _.$slideTrack.children(this.options.slide).detach();

    _.$slideTrack.append(_.$slides);

    _.$slides.each(function (index, element) {
      $(element).attr('data-slick-index', index);
    });

    _.$slidesCache = _.$slides;

    _.reinit();
  };

  Slick.prototype.animateHeight = function () {
    var _ = this;

    if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
      var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);

      _.$list.animate({
        height: targetHeight
      }, _.options.speed);
    }
  };

  Slick.prototype.animateSlide = function (targetLeft, callback) {
    var animProps = {},
        _ = this;

    _.animateHeight();

    if (_.options.rtl === true && _.options.vertical === false) {
      targetLeft = -targetLeft;
    }

    if (_.transformsEnabled === false) {
      if (_.options.vertical === false) {
        _.$slideTrack.animate({
          left: targetLeft
        }, _.options.speed, _.options.easing, callback);
      } else {
        _.$slideTrack.animate({
          top: targetLeft
        }, _.options.speed, _.options.easing, callback);
      }
    } else {
      if (_.cssTransitions === false) {
        if (_.options.rtl === true) {
          _.currentLeft = -_.currentLeft;
        }

        $({
          animStart: _.currentLeft
        }).animate({
          animStart: targetLeft
        }, {
          duration: _.options.speed,
          easing: _.options.easing,
          step: function (now) {
            now = Math.ceil(now);

            if (_.options.vertical === false) {
              animProps[_.animType] = 'translate(' + now + 'px, 0px)';

              _.$slideTrack.css(animProps);
            } else {
              animProps[_.animType] = 'translate(0px,' + now + 'px)';

              _.$slideTrack.css(animProps);
            }
          },
          complete: function () {
            if (callback) {
              callback.call();
            }
          }
        });
      } else {
        _.applyTransition();

        targetLeft = Math.ceil(targetLeft);

        if (_.options.vertical === false) {
          animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
        } else {
          animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
        }

        _.$slideTrack.css(animProps);

        if (callback) {
          setTimeout(function () {
            _.disableTransition();

            callback.call();
          }, _.options.speed);
        }
      }
    }
  };

  Slick.prototype.getNavTarget = function () {
    var _ = this,
        asNavFor = _.options.asNavFor;

    if (asNavFor && asNavFor !== null) {
      asNavFor = $(asNavFor).not(_.$slider);
    }

    return asNavFor;
  };

  Slick.prototype.asNavFor = function (index) {
    var _ = this,
        asNavFor = _.getNavTarget();

    if (asNavFor !== null && typeof asNavFor === 'object') {
      asNavFor.each(function () {
        var target = $(this).slick('getSlick');

        if (!target.unslicked) {
          target.slideHandler(index, true);
        }
      });
    }
  };

  Slick.prototype.applyTransition = function (slide) {
    var _ = this,
        transition = {};

    if (_.options.fade === false) {
      transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
    } else {
      transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
    }

    if (_.options.fade === false) {
      _.$slideTrack.css(transition);
    } else {
      _.$slides.eq(slide).css(transition);
    }
  };

  Slick.prototype.autoPlay = function () {
    var _ = this;

    _.autoPlayClear();

    if (_.slideCount > _.options.slidesToShow) {
      _.autoPlayTimer = setInterval(_.autoPlayIterator, _.options.autoplaySpeed);
    }
  };

  Slick.prototype.autoPlayClear = function () {
    var _ = this;

    if (_.autoPlayTimer) {
      clearInterval(_.autoPlayTimer);
    }
  };

  Slick.prototype.autoPlayIterator = function () {
    var _ = this,
        slideTo = _.currentSlide + _.options.slidesToScroll;

    if (!_.paused && !_.interrupted && !_.focussed) {
      if (_.options.infinite === false) {
        if (_.direction === 1 && _.currentSlide + 1 === _.slideCount - 1) {
          _.direction = 0;
        } else if (_.direction === 0) {
          slideTo = _.currentSlide - _.options.slidesToScroll;

          if (_.currentSlide - 1 === 0) {
            _.direction = 1;
          }
        }
      }

      _.slideHandler(slideTo);
    }
  };

  Slick.prototype.buildArrows = function () {
    var _ = this;

    if (_.options.arrows === true) {
      _.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
      _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');

      if (_.slideCount > _.options.slidesToShow) {
        _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

        _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

        if (_.htmlExpr.test(_.options.prevArrow)) {
          _.$prevArrow.prependTo(_.options.appendArrows);
        }

        if (_.htmlExpr.test(_.options.nextArrow)) {
          _.$nextArrow.appendTo(_.options.appendArrows);
        }

        if (_.options.infinite !== true) {
          _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
        }
      } else {
        _.$prevArrow.add(_.$nextArrow).addClass('slick-hidden').attr({
          'aria-disabled': 'true',
          'tabindex': '-1'
        });
      }
    }
  };

  Slick.prototype.buildDots = function () {
    var _ = this,
        i,
        dot;

    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
      _.$slider.addClass('slick-dotted');

      dot = $('<ul />').addClass(_.options.dotsClass);

      for (i = 0; i <= _.getDotCount(); i += 1) {
        dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));
      }

      _.$dots = dot.appendTo(_.options.appendDots);

      _.$dots.find('li').first().addClass('slick-active');
    }
  };

  Slick.prototype.buildOut = function () {
    var _ = this;

    _.$slides = _.$slider.children(_.options.slide + ':not(.slick-cloned)').addClass('slick-slide');
    _.slideCount = _.$slides.length;

    _.$slides.each(function (index, element) {
      $(element).attr('data-slick-index', index).data('originalStyling', $(element).attr('style') || '');
    });

    _.$slider.addClass('slick-slider');

    _.$slideTrack = _.slideCount === 0 ? $('<div class="slick-track"/>').appendTo(_.$slider) : _.$slides.wrapAll('<div class="slick-track"/>').parent();
    _.$list = _.$slideTrack.wrap('<div class="slick-list"/>').parent();

    _.$slideTrack.css('opacity', 0);

    if (_.options.centerMode === true || _.options.swipeToSlide === true) {
      _.options.slidesToScroll = 1;
    }

    $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

    _.setupInfinite();

    _.buildArrows();

    _.buildDots();

    _.updateDots();

    _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

    if (_.options.draggable === true) {
      _.$list.addClass('draggable');
    }
  };

  Slick.prototype.buildRows = function () {
    var _ = this,
        a,
        b,
        c,
        newSlides,
        numOfSlides,
        originalSlides,
        slidesPerSection;

    newSlides = document.createDocumentFragment();
    originalSlides = _.$slider.children();

    if (_.options.rows > 0) {
      slidesPerSection = _.options.slidesPerRow * _.options.rows;
      numOfSlides = Math.ceil(originalSlides.length / slidesPerSection);

      for (a = 0; a < numOfSlides; a++) {
        var slide = document.createElement('div');

        for (b = 0; b < _.options.rows; b++) {
          var row = document.createElement('div');

          for (c = 0; c < _.options.slidesPerRow; c++) {
            var target = a * slidesPerSection + (b * _.options.slidesPerRow + c);

            if (originalSlides.get(target)) {
              row.appendChild(originalSlides.get(target));
            }
          }

          slide.appendChild(row);
        }

        newSlides.appendChild(slide);
      }

      _.$slider.empty().append(newSlides);

      _.$slider.children().children().children().css({
        'width': 100 / _.options.slidesPerRow + '%',
        'display': 'inline-block'
      });
    }
  };

  Slick.prototype.checkResponsive = function (initial, forceUpdate) {
    var _ = this,
        breakpoint,
        targetBreakpoint,
        respondToWidth,
        triggerBreakpoint = false;

    var sliderWidth = _.$slider.width();

    var windowWidth = window.innerWidth || $(window).width();

    if (_.respondTo === 'window') {
      respondToWidth = windowWidth;
    } else if (_.respondTo === 'slider') {
      respondToWidth = sliderWidth;
    } else if (_.respondTo === 'min') {
      respondToWidth = Math.min(windowWidth, sliderWidth);
    }

    if (_.options.responsive && _.options.responsive.length && _.options.responsive !== null) {
      targetBreakpoint = null;

      for (breakpoint in _.breakpoints) {
        if (_.breakpoints.hasOwnProperty(breakpoint)) {
          if (_.originalSettings.mobileFirst === false) {
            if (respondToWidth < _.breakpoints[breakpoint]) {
              targetBreakpoint = _.breakpoints[breakpoint];
            }
          } else {
            if (respondToWidth > _.breakpoints[breakpoint]) {
              targetBreakpoint = _.breakpoints[breakpoint];
            }
          }
        }
      }

      if (targetBreakpoint !== null) {
        if (_.activeBreakpoint !== null) {
          if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
            _.activeBreakpoint = targetBreakpoint;

            if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
              _.unslick(targetBreakpoint);
            } else {
              _.options = $.extend({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]);

              if (initial === true) {
                _.currentSlide = _.options.initialSlide;
              }

              _.refresh(initial);
            }

            triggerBreakpoint = targetBreakpoint;
          }
        } else {
          _.activeBreakpoint = targetBreakpoint;

          if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
            _.unslick(targetBreakpoint);
          } else {
            _.options = $.extend({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]);

            if (initial === true) {
              _.currentSlide = _.options.initialSlide;
            }

            _.refresh(initial);
          }

          triggerBreakpoint = targetBreakpoint;
        }
      } else {
        if (_.activeBreakpoint !== null) {
          _.activeBreakpoint = null;
          _.options = _.originalSettings;

          if (initial === true) {
            _.currentSlide = _.options.initialSlide;
          }

          _.refresh(initial);

          triggerBreakpoint = targetBreakpoint;
        }
      } // only trigger breakpoints during an actual break. not on initialize.


      if (!initial && triggerBreakpoint !== false) {
        _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
      }
    }
  };

  Slick.prototype.changeSlide = function (event, dontAnimate) {
    var _ = this,
        $target = $(event.currentTarget),
        indexOffset,
        slideOffset,
        unevenOffset; // If target is a link, prevent default action.


    if ($target.is('a')) {
      event.preventDefault();
    } // If target is not the <li> element (ie: a child), find the <li>.


    if (!$target.is('li')) {
      $target = $target.closest('li');
    }

    unevenOffset = _.slideCount % _.options.slidesToScroll !== 0;
    indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

    switch (event.data.message) {
      case 'previous':
        slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;

        if (_.slideCount > _.options.slidesToShow) {
          _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
        }

        break;

      case 'next':
        slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;

        if (_.slideCount > _.options.slidesToShow) {
          _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
        }

        break;

      case 'index':
        var index = event.data.index === 0 ? 0 : event.data.index || $target.index() * _.options.slidesToScroll;

        _.slideHandler(_.checkNavigable(index), false, dontAnimate);

        $target.children().trigger('focus');
        break;

      default:
        return;
    }
  };

  Slick.prototype.checkNavigable = function (index) {
    var _ = this,
        navigables,
        prevNavigable;

    navigables = _.getNavigableIndexes();
    prevNavigable = 0;

    if (index > navigables[navigables.length - 1]) {
      index = navigables[navigables.length - 1];
    } else {
      for (var n in navigables) {
        if (index < navigables[n]) {
          index = prevNavigable;
          break;
        }

        prevNavigable = navigables[n];
      }
    }

    return index;
  };

  Slick.prototype.cleanUpEvents = function () {
    var _ = this;

    if (_.options.dots && _.$dots !== null) {
      $('li', _.$dots).off('click.slick', _.changeSlide).off('mouseenter.slick', $.proxy(_.interrupt, _, true)).off('mouseleave.slick', $.proxy(_.interrupt, _, false));

      if (_.options.accessibility === true) {
        _.$dots.off('keydown.slick', _.keyHandler);
      }
    }

    _.$slider.off('focus.slick blur.slick');

    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
      _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
      _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);

      if (_.options.accessibility === true) {
        _.$prevArrow && _.$prevArrow.off('keydown.slick', _.keyHandler);
        _.$nextArrow && _.$nextArrow.off('keydown.slick', _.keyHandler);
      }
    }

    _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);

    _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);

    _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);

    _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);

    _.$list.off('click.slick', _.clickHandler);

    $(document).off(_.visibilityChange, _.visibility);

    _.cleanUpSlideEvents();

    if (_.options.accessibility === true) {
      _.$list.off('keydown.slick', _.keyHandler);
    }

    if (_.options.focusOnSelect === true) {
      $(_.$slideTrack).children().off('click.slick', _.selectHandler);
    }

    $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);
    $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);
    $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);
    $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);
  };

  Slick.prototype.cleanUpSlideEvents = function () {
    var _ = this;

    _.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));

    _.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));
  };

  Slick.prototype.cleanUpRows = function () {
    var _ = this,
        originalSlides;

    if (_.options.rows > 0) {
      originalSlides = _.$slides.children().children();
      originalSlides.removeAttr('style');

      _.$slider.empty().append(originalSlides);
    }
  };

  Slick.prototype.clickHandler = function (event) {
    var _ = this;

    if (_.shouldClick === false) {
      event.stopImmediatePropagation();
      event.stopPropagation();
      event.preventDefault();
    }
  };

  Slick.prototype.destroy = function (refresh) {
    var _ = this;

    _.autoPlayClear();

    _.touchObject = {};

    _.cleanUpEvents();

    $('.slick-cloned', _.$slider).detach();

    if (_.$dots) {
      _.$dots.remove();
    }

    if (_.$prevArrow && _.$prevArrow.length) {
      _.$prevArrow.removeClass('slick-disabled slick-arrow slick-hidden').removeAttr('aria-hidden aria-disabled tabindex').css('display', '');

      if (_.htmlExpr.test(_.options.prevArrow)) {
        _.$prevArrow.remove();
      }
    }

    if (_.$nextArrow && _.$nextArrow.length) {
      _.$nextArrow.removeClass('slick-disabled slick-arrow slick-hidden').removeAttr('aria-hidden aria-disabled tabindex').css('display', '');

      if (_.htmlExpr.test(_.options.nextArrow)) {
        _.$nextArrow.remove();
      }
    }

    if (_.$slides) {
      _.$slides.removeClass('slick-slide slick-active slick-center slick-visible slick-current').removeAttr('aria-hidden').removeAttr('data-slick-index').each(function () {
        $(this).attr('style', $(this).data('originalStyling'));
      });

      _.$slideTrack.children(this.options.slide).detach();

      _.$slideTrack.detach();

      _.$list.detach();

      _.$slider.append(_.$slides);
    }

    _.cleanUpRows();

    _.$slider.removeClass('slick-slider');

    _.$slider.removeClass('slick-initialized');

    _.$slider.removeClass('slick-dotted');

    _.unslicked = true;

    if (!refresh) {
      _.$slider.trigger('destroy', [_]);
    }
  };

  Slick.prototype.disableTransition = function (slide) {
    var _ = this,
        transition = {};

    transition[_.transitionType] = '';

    if (_.options.fade === false) {
      _.$slideTrack.css(transition);
    } else {
      _.$slides.eq(slide).css(transition);
    }
  };

  Slick.prototype.fadeSlide = function (slideIndex, callback) {
    var _ = this;

    if (_.cssTransitions === false) {
      _.$slides.eq(slideIndex).css({
        zIndex: _.options.zIndex
      });

      _.$slides.eq(slideIndex).animate({
        opacity: 1
      }, _.options.speed, _.options.easing, callback);
    } else {
      _.applyTransition(slideIndex);

      _.$slides.eq(slideIndex).css({
        opacity: 1,
        zIndex: _.options.zIndex
      });

      if (callback) {
        setTimeout(function () {
          _.disableTransition(slideIndex);

          callback.call();
        }, _.options.speed);
      }
    }
  };

  Slick.prototype.fadeSlideOut = function (slideIndex) {
    var _ = this;

    if (_.cssTransitions === false) {
      _.$slides.eq(slideIndex).animate({
        opacity: 0,
        zIndex: _.options.zIndex - 2
      }, _.options.speed, _.options.easing);
    } else {
      _.applyTransition(slideIndex);

      _.$slides.eq(slideIndex).css({
        opacity: 0,
        zIndex: _.options.zIndex - 2
      });
    }
  };

  Slick.prototype.filterSlides = Slick.prototype.slickFilter = function (filter) {
    var _ = this;

    if (filter !== null) {
      _.$slidesCache = _.$slides;

      _.unload();

      _.$slideTrack.children(this.options.slide).detach();

      _.$slidesCache.filter(filter).appendTo(_.$slideTrack);

      _.reinit();
    }
  };

  Slick.prototype.focusHandler = function () {
    var _ = this;

    _.$slider.off('focus.slick blur.slick').on('focus.slick blur.slick', '*', function (event) {
      event.stopImmediatePropagation();
      var $sf = $(this);
      setTimeout(function () {
        if (_.options.pauseOnFocus) {
          _.focussed = $sf.is(':focus');

          _.autoPlay();
        }
      }, 0);
    });
  };

  Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function () {
    var _ = this;

    return _.currentSlide;
  };

  Slick.prototype.getDotCount = function () {
    var _ = this;

    var breakPoint = 0;
    var counter = 0;
    var pagerQty = 0;

    if (_.options.infinite === true) {
      if (_.slideCount <= _.options.slidesToShow) {
        ++pagerQty;
      } else {
        while (breakPoint < _.slideCount) {
          ++pagerQty;
          breakPoint = counter + _.options.slidesToScroll;
          counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
        }
      }
    } else if (_.options.centerMode === true) {
      pagerQty = _.slideCount;
    } else if (!_.options.asNavFor) {
      pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
    } else {
      while (breakPoint < _.slideCount) {
        ++pagerQty;
        breakPoint = counter + _.options.slidesToScroll;
        counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
      }
    }

    return pagerQty - 1;
  };

  Slick.prototype.getLeft = function (slideIndex) {
    var _ = this,
        targetLeft,
        verticalHeight,
        verticalOffset = 0,
        targetSlide,
        coef;

    _.slideOffset = 0;
    verticalHeight = _.$slides.first().outerHeight(true);

    if (_.options.infinite === true) {
      if (_.slideCount > _.options.slidesToShow) {
        _.slideOffset = _.slideWidth * _.options.slidesToShow * -1;
        coef = -1;

        if (_.options.vertical === true && _.options.centerMode === true) {
          if (_.options.slidesToShow === 2) {
            coef = -1.5;
          } else if (_.options.slidesToShow === 1) {
            coef = -2;
          }
        }

        verticalOffset = verticalHeight * _.options.slidesToShow * coef;
      }

      if (_.slideCount % _.options.slidesToScroll !== 0) {
        if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
          if (slideIndex > _.slideCount) {
            _.slideOffset = (_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth * -1;
            verticalOffset = (_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight * -1;
          } else {
            _.slideOffset = _.slideCount % _.options.slidesToScroll * _.slideWidth * -1;
            verticalOffset = _.slideCount % _.options.slidesToScroll * verticalHeight * -1;
          }
        }
      }
    } else {
      if (slideIndex + _.options.slidesToShow > _.slideCount) {
        _.slideOffset = (slideIndex + _.options.slidesToShow - _.slideCount) * _.slideWidth;
        verticalOffset = (slideIndex + _.options.slidesToShow - _.slideCount) * verticalHeight;
      }
    }

    if (_.slideCount <= _.options.slidesToShow) {
      _.slideOffset = 0;
      verticalOffset = 0;
    }

    if (_.options.centerMode === true && _.slideCount <= _.options.slidesToShow) {
      _.slideOffset = _.slideWidth * Math.floor(_.options.slidesToShow) / 2 - _.slideWidth * _.slideCount / 2;
    } else if (_.options.centerMode === true && _.options.infinite === true) {
      _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
    } else if (_.options.centerMode === true) {
      _.slideOffset = 0;
      _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
    }

    if (_.options.vertical === false) {
      targetLeft = slideIndex * _.slideWidth * -1 + _.slideOffset;
    } else {
      targetLeft = slideIndex * verticalHeight * -1 + verticalOffset;
    }

    if (_.options.variableWidth === true) {
      if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
        targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
      } else {
        targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
      }

      if (_.options.rtl === true) {
        if (targetSlide[0]) {
          targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
        } else {
          targetLeft = 0;
        }
      } else {
        targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
      }

      if (_.options.centerMode === true) {
        if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
          targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
        } else {
          targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
        }

        if (_.options.rtl === true) {
          if (targetSlide[0]) {
            targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
          } else {
            targetLeft = 0;
          }
        } else {
          targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
        }

        targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
      }
    }

    return targetLeft;
  };

  Slick.prototype.getOption = Slick.prototype.slickGetOption = function (option) {
    var _ = this;

    return _.options[option];
  };

  Slick.prototype.getNavigableIndexes = function () {
    var _ = this,
        breakPoint = 0,
        counter = 0,
        indexes = [],
        max;

    if (_.options.infinite === false) {
      max = _.slideCount;
    } else {
      breakPoint = _.options.slidesToScroll * -1;
      counter = _.options.slidesToScroll * -1;
      max = _.slideCount * 2;
    }

    while (breakPoint < max) {
      indexes.push(breakPoint);
      breakPoint = counter + _.options.slidesToScroll;
      counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
    }

    return indexes;
  };

  Slick.prototype.getSlick = function () {
    return this;
  };

  Slick.prototype.getSlideCount = function () {
    var _ = this,
        slidesTraversed,
        swipedSlide,
        centerOffset;

    centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;

    if (_.options.swipeToSlide === true) {
      _.$slideTrack.find('.slick-slide').each(function (index, slide) {
        if (slide.offsetLeft - centerOffset + $(slide).outerWidth() / 2 > _.swipeLeft * -1) {
          swipedSlide = slide;
          return false;
        }
      });

      slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;
      return slidesTraversed;
    } else {
      return _.options.slidesToScroll;
    }
  };

  Slick.prototype.goTo = Slick.prototype.slickGoTo = function (slide, dontAnimate) {
    var _ = this;

    _.changeSlide({
      data: {
        message: 'index',
        index: parseInt(slide)
      }
    }, dontAnimate);
  };

  Slick.prototype.init = function (creation) {
    var _ = this;

    if (!$(_.$slider).hasClass('slick-initialized')) {
      $(_.$slider).addClass('slick-initialized');

      _.buildRows();

      _.buildOut();

      _.setProps();

      _.startLoad();

      _.loadSlider();

      _.initializeEvents();

      _.updateArrows();

      _.updateDots();

      _.checkResponsive(true);

      _.focusHandler();
    }

    if (creation) {
      _.$slider.trigger('init', [_]);
    }

    if (_.options.accessibility === true) {
      _.initADA();
    }

    if (_.options.autoplay) {
      _.paused = false;

      _.autoPlay();
    }
  };

  Slick.prototype.initADA = function () {
    var _ = this,
        numDotGroups = Math.ceil(_.slideCount / _.options.slidesToShow),
        tabControlIndexes = _.getNavigableIndexes().filter(function (val) {
      return val >= 0 && val < _.slideCount;
    });

    _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
      'aria-hidden': 'true',
      'tabindex': '-1'
    }).find('a, input, button, select').attr({
      'tabindex': '-1'
    });

    if (_.$dots !== null) {
      _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function (i) {
        var slideControlIndex = tabControlIndexes.indexOf(i);
        $(this).attr({
          'role': 'tabpanel',
          'id': 'slick-slide' + _.instanceUid + i,
          'tabindex': -1
        });

        if (slideControlIndex !== -1) {
          var ariaButtonControl = 'slick-slide-control' + _.instanceUid + slideControlIndex;

          if ($('#' + ariaButtonControl).length) {
            $(this).attr({
              'aria-describedby': ariaButtonControl
            });
          }
        }
      });

      _.$dots.attr('role', 'tablist').find('li').each(function (i) {
        var mappedSlideIndex = tabControlIndexes[i];
        $(this).attr({
          'role': 'presentation'
        });
        $(this).find('button').first().attr({
          'role': 'tab',
          'id': 'slick-slide-control' + _.instanceUid + i,
          'aria-controls': 'slick-slide' + _.instanceUid + mappedSlideIndex,
          'aria-label': i + 1 + ' of ' + numDotGroups,
          'aria-selected': null,
          'tabindex': '-1'
        });
      }).eq(_.currentSlide).find('button').attr({
        'aria-selected': 'true',
        'tabindex': '0'
      }).end();
    }

    for (var i = _.currentSlide, max = i + _.options.slidesToShow; i < max; i++) {
      if (_.options.focusOnChange) {
        _.$slides.eq(i).attr({
          'tabindex': '0'
        });
      } else {
        _.$slides.eq(i).removeAttr('tabindex');
      }
    }

    _.activateADA();
  };

  Slick.prototype.initArrowEvents = function () {
    var _ = this;

    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
      _.$prevArrow.off('click.slick').on('click.slick', {
        message: 'previous'
      }, _.changeSlide);

      _.$nextArrow.off('click.slick').on('click.slick', {
        message: 'next'
      }, _.changeSlide);

      if (_.options.accessibility === true) {
        _.$prevArrow.on('keydown.slick', _.keyHandler);

        _.$nextArrow.on('keydown.slick', _.keyHandler);
      }
    }
  };

  Slick.prototype.initDotEvents = function () {
    var _ = this;

    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
      $('li', _.$dots).on('click.slick', {
        message: 'index'
      }, _.changeSlide);

      if (_.options.accessibility === true) {
        _.$dots.on('keydown.slick', _.keyHandler);
      }
    }

    if (_.options.dots === true && _.options.pauseOnDotsHover === true && _.slideCount > _.options.slidesToShow) {
      $('li', _.$dots).on('mouseenter.slick', $.proxy(_.interrupt, _, true)).on('mouseleave.slick', $.proxy(_.interrupt, _, false));
    }
  };

  Slick.prototype.initSlideEvents = function () {
    var _ = this;

    if (_.options.pauseOnHover) {
      _.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));

      _.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));
    }
  };

  Slick.prototype.initializeEvents = function () {
    var _ = this;

    _.initArrowEvents();

    _.initDotEvents();

    _.initSlideEvents();

    _.$list.on('touchstart.slick mousedown.slick', {
      action: 'start'
    }, _.swipeHandler);

    _.$list.on('touchmove.slick mousemove.slick', {
      action: 'move'
    }, _.swipeHandler);

    _.$list.on('touchend.slick mouseup.slick', {
      action: 'end'
    }, _.swipeHandler);

    _.$list.on('touchcancel.slick mouseleave.slick', {
      action: 'end'
    }, _.swipeHandler);

    _.$list.on('click.slick', _.clickHandler);

    $(document).on(_.visibilityChange, $.proxy(_.visibility, _));

    if (_.options.accessibility === true) {
      _.$list.on('keydown.slick', _.keyHandler);
    }

    if (_.options.focusOnSelect === true) {
      $(_.$slideTrack).children().on('click.slick', _.selectHandler);
    }

    $(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));
    $(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));
    $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);
    $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
    $(_.setPosition);
  };

  Slick.prototype.initUI = function () {
    var _ = this;

    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
      _.$prevArrow.show();

      _.$nextArrow.show();
    }

    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
      _.$dots.show();
    }
  };

  Slick.prototype.keyHandler = function (event) {
    var _ = this; //Dont slide if the cursor is inside the form fields and arrow keys are pressed


    if (!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
      if (event.keyCode === 37 && _.options.accessibility === true) {
        _.changeSlide({
          data: {
            message: _.options.rtl === true ? 'next' : 'previous'
          }
        });
      } else if (event.keyCode === 39 && _.options.accessibility === true) {
        _.changeSlide({
          data: {
            message: _.options.rtl === true ? 'previous' : 'next'
          }
        });
      }
    }
  };

  Slick.prototype.lazyLoad = function () {
    var _ = this,
        loadRange,
        cloneRange,
        rangeStart,
        rangeEnd;

    function loadImages(imagesScope) {
      $('img[data-lazy]', imagesScope).each(function () {
        var image = $(this),
            imageSource = $(this).attr('data-lazy'),
            imageSrcSet = $(this).attr('data-srcset'),
            imageSizes = $(this).attr('data-sizes') || _.$slider.attr('data-sizes'),
            imageToLoad = document.createElement('img');

        imageToLoad.onload = function () {
          image.animate({
            opacity: 0
          }, 100, function () {
            if (imageSrcSet) {
              image.attr('srcset', imageSrcSet);

              if (imageSizes) {
                image.attr('sizes', imageSizes);
              }
            }

            image.attr('src', imageSource).animate({
              opacity: 1
            }, 200, function () {
              image.removeAttr('data-lazy data-srcset data-sizes').removeClass('slick-loading');
            });

            _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
          });
        };

        imageToLoad.onerror = function () {
          image.removeAttr('data-lazy').removeClass('slick-loading').addClass('slick-lazyload-error');

          _.$slider.trigger('lazyLoadError', [_, image, imageSource]);
        };

        imageToLoad.src = imageSource;
      });
    }

    if (_.options.centerMode === true) {
      if (_.options.infinite === true) {
        rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
        rangeEnd = rangeStart + _.options.slidesToShow + 2;
      } else {
        rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
        rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
      }
    } else {
      rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
      rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);

      if (_.options.fade === true) {
        if (rangeStart > 0) rangeStart--;
        if (rangeEnd <= _.slideCount) rangeEnd++;
      }
    }

    loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);

    if (_.options.lazyLoad === 'anticipated') {
      var prevSlide = rangeStart - 1,
          nextSlide = rangeEnd,
          $slides = _.$slider.find('.slick-slide');

      for (var i = 0; i < _.options.slidesToScroll; i++) {
        if (prevSlide < 0) prevSlide = _.slideCount - 1;
        loadRange = loadRange.add($slides.eq(prevSlide));
        loadRange = loadRange.add($slides.eq(nextSlide));
        prevSlide--;
        nextSlide++;
      }
    }

    loadImages(loadRange);

    if (_.slideCount <= _.options.slidesToShow) {
      cloneRange = _.$slider.find('.slick-slide');
      loadImages(cloneRange);
    } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
      cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
      loadImages(cloneRange);
    } else if (_.currentSlide === 0) {
      cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
      loadImages(cloneRange);
    }
  };

  Slick.prototype.loadSlider = function () {
    var _ = this;

    _.setPosition();

    _.$slideTrack.css({
      opacity: 1
    });

    _.$slider.removeClass('slick-loading');

    _.initUI();

    if (_.options.lazyLoad === 'progressive') {
      _.progressiveLazyLoad();
    }
  };

  Slick.prototype.next = Slick.prototype.slickNext = function () {
    var _ = this;

    _.changeSlide({
      data: {
        message: 'next'
      }
    });
  };

  Slick.prototype.orientationChange = function () {
    var _ = this;

    _.checkResponsive();

    _.setPosition();
  };

  Slick.prototype.pause = Slick.prototype.slickPause = function () {
    var _ = this;

    _.autoPlayClear();

    _.paused = true;
  };

  Slick.prototype.play = Slick.prototype.slickPlay = function () {
    var _ = this;

    _.autoPlay();

    _.options.autoplay = true;
    _.paused = false;
    _.focussed = false;
    _.interrupted = false;
  };

  Slick.prototype.postSlide = function (index) {
    var _ = this;

    if (!_.unslicked) {
      _.$slider.trigger('afterChange', [_, index]);

      _.animating = false;

      if (_.slideCount > _.options.slidesToShow) {
        _.setPosition();
      }

      _.swipeLeft = null;

      if (_.options.autoplay) {
        _.autoPlay();
      }

      if (_.options.accessibility === true) {
        _.initADA();

        if (_.options.focusOnChange) {
          var $currentSlide = $(_.$slides.get(_.currentSlide));
          $currentSlide.attr('tabindex', 0).focus();
        }
      }
    }
  };

  Slick.prototype.prev = Slick.prototype.slickPrev = function () {
    var _ = this;

    _.changeSlide({
      data: {
        message: 'previous'
      }
    });
  };

  Slick.prototype.preventDefault = function (event) {
    event.preventDefault();
  };

  Slick.prototype.progressiveLazyLoad = function (tryCount) {
    tryCount = tryCount || 1;

    var _ = this,
        $imgsToLoad = $('img[data-lazy]', _.$slider),
        image,
        imageSource,
        imageSrcSet,
        imageSizes,
        imageToLoad;

    if ($imgsToLoad.length) {
      image = $imgsToLoad.first();
      imageSource = image.attr('data-lazy');
      imageSrcSet = image.attr('data-srcset');
      imageSizes = image.attr('data-sizes') || _.$slider.attr('data-sizes');
      imageToLoad = document.createElement('img');

      imageToLoad.onload = function () {
        if (imageSrcSet) {
          image.attr('srcset', imageSrcSet);

          if (imageSizes) {
            image.attr('sizes', imageSizes);
          }
        }

        image.attr('src', imageSource).removeAttr('data-lazy data-srcset data-sizes').removeClass('slick-loading');

        if (_.options.adaptiveHeight === true) {
          _.setPosition();
        }

        _.$slider.trigger('lazyLoaded', [_, image, imageSource]);

        _.progressiveLazyLoad();
      };

      imageToLoad.onerror = function () {
        if (tryCount < 3) {
          /**
           * try to load the image 3 times,
           * leave a slight delay so we don't get
           * servers blocking the request.
           */
          setTimeout(function () {
            _.progressiveLazyLoad(tryCount + 1);
          }, 500);
        } else {
          image.removeAttr('data-lazy').removeClass('slick-loading').addClass('slick-lazyload-error');

          _.$slider.trigger('lazyLoadError', [_, image, imageSource]);

          _.progressiveLazyLoad();
        }
      };

      imageToLoad.src = imageSource;
    } else {
      _.$slider.trigger('allImagesLoaded', [_]);
    }
  };

  Slick.prototype.refresh = function (initializing) {
    var _ = this,
        currentSlide,
        lastVisibleIndex;

    lastVisibleIndex = _.slideCount - _.options.slidesToShow; // in non-infinite sliders, we don't want to go past the
    // last visible index.

    if (!_.options.infinite && _.currentSlide > lastVisibleIndex) {
      _.currentSlide = lastVisibleIndex;
    } // if less slides than to show, go to start.


    if (_.slideCount <= _.options.slidesToShow) {
      _.currentSlide = 0;
    }

    currentSlide = _.currentSlide;

    _.destroy(true);

    $.extend(_, _.initials, {
      currentSlide: currentSlide
    });

    _.init();

    if (!initializing) {
      _.changeSlide({
        data: {
          message: 'index',
          index: currentSlide
        }
      }, false);
    }
  };

  Slick.prototype.registerBreakpoints = function () {
    var _ = this,
        breakpoint,
        currentBreakpoint,
        l,
        responsiveSettings = _.options.responsive || null;

    if ($.type(responsiveSettings) === 'array' && responsiveSettings.length) {
      _.respondTo = _.options.respondTo || 'window';

      for (breakpoint in responsiveSettings) {
        l = _.breakpoints.length - 1;

        if (responsiveSettings.hasOwnProperty(breakpoint)) {
          currentBreakpoint = responsiveSettings[breakpoint].breakpoint; // loop through the breakpoints and cut out any existing
          // ones with the same breakpoint number, we don't want dupes.

          while (l >= 0) {
            if (_.breakpoints[l] && _.breakpoints[l] === currentBreakpoint) {
              _.breakpoints.splice(l, 1);
            }

            l--;
          }

          _.breakpoints.push(currentBreakpoint);

          _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;
        }
      }

      _.breakpoints.sort(function (a, b) {
        return _.options.mobileFirst ? a - b : b - a;
      });
    }
  };

  Slick.prototype.reinit = function () {
    var _ = this;

    _.$slides = _.$slideTrack.children(_.options.slide).addClass('slick-slide');
    _.slideCount = _.$slides.length;

    if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
      _.currentSlide = _.currentSlide - _.options.slidesToScroll;
    }

    if (_.slideCount <= _.options.slidesToShow) {
      _.currentSlide = 0;
    }

    _.registerBreakpoints();

    _.setProps();

    _.setupInfinite();

    _.buildArrows();

    _.updateArrows();

    _.initArrowEvents();

    _.buildDots();

    _.updateDots();

    _.initDotEvents();

    _.cleanUpSlideEvents();

    _.initSlideEvents();

    _.checkResponsive(false, true);

    if (_.options.focusOnSelect === true) {
      $(_.$slideTrack).children().on('click.slick', _.selectHandler);
    }

    _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

    _.setPosition();

    _.focusHandler();

    _.paused = !_.options.autoplay;

    _.autoPlay();

    _.$slider.trigger('reInit', [_]);
  };

  Slick.prototype.resize = function () {
    var _ = this;

    if ($(window).width() !== _.windowWidth) {
      clearTimeout(_.windowDelay);
      _.windowDelay = window.setTimeout(function () {
        _.windowWidth = $(window).width();

        _.checkResponsive();

        if (!_.unslicked) {
          _.setPosition();
        }
      }, 50);
    }
  };

  Slick.prototype.removeSlide = Slick.prototype.slickRemove = function (index, removeBefore, removeAll) {
    var _ = this;

    if (typeof index === 'boolean') {
      removeBefore = index;
      index = removeBefore === true ? 0 : _.slideCount - 1;
    } else {
      index = removeBefore === true ? --index : index;
    }

    if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
      return false;
    }

    _.unload();

    if (removeAll === true) {
      _.$slideTrack.children().remove();
    } else {
      _.$slideTrack.children(this.options.slide).eq(index).remove();
    }

    _.$slides = _.$slideTrack.children(this.options.slide);

    _.$slideTrack.children(this.options.slide).detach();

    _.$slideTrack.append(_.$slides);

    _.$slidesCache = _.$slides;

    _.reinit();
  };

  Slick.prototype.setCSS = function (position) {
    var _ = this,
        positionProps = {},
        x,
        y;

    if (_.options.rtl === true) {
      position = -position;
    }

    x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
    y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';
    positionProps[_.positionProp] = position;

    if (_.transformsEnabled === false) {
      _.$slideTrack.css(positionProps);
    } else {
      positionProps = {};

      if (_.cssTransitions === false) {
        positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';

        _.$slideTrack.css(positionProps);
      } else {
        positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';

        _.$slideTrack.css(positionProps);
      }
    }
  };

  Slick.prototype.setDimensions = function () {
    var _ = this;

    if (_.options.vertical === false) {
      if (_.options.centerMode === true) {
        _.$list.css({
          padding: '0px ' + _.options.centerPadding
        });
      }
    } else {
      _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);

      if (_.options.centerMode === true) {
        _.$list.css({
          padding: _.options.centerPadding + ' 0px'
        });
      }
    }

    _.listWidth = _.$list.width();
    _.listHeight = _.$list.height();

    if (_.options.vertical === false && _.options.variableWidth === false) {
      _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);

      _.$slideTrack.width(Math.ceil(_.slideWidth * _.$slideTrack.children('.slick-slide').length));
    } else if (_.options.variableWidth === true) {
      _.$slideTrack.width(5000 * _.slideCount);
    } else {
      _.slideWidth = Math.ceil(_.listWidth);

      _.$slideTrack.height(Math.ceil(_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length));
    }

    var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();

    if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);
  };

  Slick.prototype.setFade = function () {
    var _ = this,
        targetLeft;

    _.$slides.each(function (index, element) {
      targetLeft = _.slideWidth * index * -1;

      if (_.options.rtl === true) {
        $(element).css({
          position: 'relative',
          right: targetLeft,
          top: 0,
          zIndex: _.options.zIndex - 2,
          opacity: 0
        });
      } else {
        $(element).css({
          position: 'relative',
          left: targetLeft,
          top: 0,
          zIndex: _.options.zIndex - 2,
          opacity: 0
        });
      }
    });

    _.$slides.eq(_.currentSlide).css({
      zIndex: _.options.zIndex - 1,
      opacity: 1
    });
  };

  Slick.prototype.setHeight = function () {
    var _ = this;

    if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
      var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);

      _.$list.css('height', targetHeight);
    }
  };

  Slick.prototype.setOption = Slick.prototype.slickSetOption = function () {
    /**
     * accepts arguments in format of:
     *
     *  - for changing a single option's value:
     *     .slick("setOption", option, value, refresh )
     *
     *  - for changing a set of responsive options:
     *     .slick("setOption", 'responsive', [{}, ...], refresh )
     *
     *  - for updating multiple values at once (not responsive)
     *     .slick("setOption", { 'option': value, ... }, refresh )
     */
    var _ = this,
        l,
        item,
        option,
        value,
        refresh = false,
        type;

    if ($.type(arguments[0]) === 'object') {
      option = arguments[0];
      refresh = arguments[1];
      type = 'multiple';
    } else if ($.type(arguments[0]) === 'string') {
      option = arguments[0];
      value = arguments[1];
      refresh = arguments[2];

      if (arguments[0] === 'responsive' && $.type(arguments[1]) === 'array') {
        type = 'responsive';
      } else if (typeof arguments[1] !== 'undefined') {
        type = 'single';
      }
    }

    if (type === 'single') {
      _.options[option] = value;
    } else if (type === 'multiple') {
      $.each(option, function (opt, val) {
        _.options[opt] = val;
      });
    } else if (type === 'responsive') {
      for (item in value) {
        if ($.type(_.options.responsive) !== 'array') {
          _.options.responsive = [value[item]];
        } else {
          l = _.options.responsive.length - 1; // loop through the responsive object and splice out duplicates.

          while (l >= 0) {
            if (_.options.responsive[l].breakpoint === value[item].breakpoint) {
              _.options.responsive.splice(l, 1);
            }

            l--;
          }

          _.options.responsive.push(value[item]);
        }
      }
    }

    if (refresh) {
      _.unload();

      _.reinit();
    }
  };

  Slick.prototype.setPosition = function () {
    var _ = this;

    _.setDimensions();

    _.setHeight();

    if (_.options.fade === false) {
      _.setCSS(_.getLeft(_.currentSlide));
    } else {
      _.setFade();
    }

    _.$slider.trigger('setPosition', [_]);
  };

  Slick.prototype.setProps = function () {
    var _ = this,
        bodyStyle = document.body.style;

    _.positionProp = _.options.vertical === true ? 'top' : 'left';

    if (_.positionProp === 'top') {
      _.$slider.addClass('slick-vertical');
    } else {
      _.$slider.removeClass('slick-vertical');
    }

    if (bodyStyle.WebkitTransition !== undefined || bodyStyle.MozTransition !== undefined || bodyStyle.msTransition !== undefined) {
      if (_.options.useCSS === true) {
        _.cssTransitions = true;
      }
    }

    if (_.options.fade) {
      if (typeof _.options.zIndex === 'number') {
        if (_.options.zIndex < 3) {
          _.options.zIndex = 3;
        }
      } else {
        _.options.zIndex = _.defaults.zIndex;
      }
    }

    if (bodyStyle.OTransform !== undefined) {
      _.animType = 'OTransform';
      _.transformType = '-o-transform';
      _.transitionType = 'OTransition';
      if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
    }

    if (bodyStyle.MozTransform !== undefined) {
      _.animType = 'MozTransform';
      _.transformType = '-moz-transform';
      _.transitionType = 'MozTransition';
      if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
    }

    if (bodyStyle.webkitTransform !== undefined) {
      _.animType = 'webkitTransform';
      _.transformType = '-webkit-transform';
      _.transitionType = 'webkitTransition';
      if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
    }

    if (bodyStyle.msTransform !== undefined) {
      _.animType = 'msTransform';
      _.transformType = '-ms-transform';
      _.transitionType = 'msTransition';
      if (bodyStyle.msTransform === undefined) _.animType = false;
    }

    if (bodyStyle.transform !== undefined && _.animType !== false) {
      _.animType = 'transform';
      _.transformType = 'transform';
      _.transitionType = 'transition';
    }

    _.transformsEnabled = _.options.useTransform && _.animType !== null && _.animType !== false;
  };

  Slick.prototype.setSlideClasses = function (index) {
    var _ = this,
        centerOffset,
        allSlides,
        indexOffset,
        remainder;

    allSlides = _.$slider.find('.slick-slide').removeClass('slick-active slick-center slick-current').attr('aria-hidden', 'true');

    _.$slides.eq(index).addClass('slick-current');

    if (_.options.centerMode === true) {
      var evenCoef = _.options.slidesToShow % 2 === 0 ? 1 : 0;
      centerOffset = Math.floor(_.options.slidesToShow / 2);

      if (_.options.infinite === true) {
        if (index >= centerOffset && index <= _.slideCount - 1 - centerOffset) {
          _.$slides.slice(index - centerOffset + evenCoef, index + centerOffset + 1).addClass('slick-active').attr('aria-hidden', 'false');
        } else {
          indexOffset = _.options.slidesToShow + index;
          allSlides.slice(indexOffset - centerOffset + 1 + evenCoef, indexOffset + centerOffset + 2).addClass('slick-active').attr('aria-hidden', 'false');
        }

        if (index === 0) {
          allSlides.eq(allSlides.length - 1 - _.options.slidesToShow).addClass('slick-center');
        } else if (index === _.slideCount - 1) {
          allSlides.eq(_.options.slidesToShow).addClass('slick-center');
        }
      }

      _.$slides.eq(index).addClass('slick-center');
    } else {
      if (index >= 0 && index <= _.slideCount - _.options.slidesToShow) {
        _.$slides.slice(index, index + _.options.slidesToShow).addClass('slick-active').attr('aria-hidden', 'false');
      } else if (allSlides.length <= _.options.slidesToShow) {
        allSlides.addClass('slick-active').attr('aria-hidden', 'false');
      } else {
        remainder = _.slideCount % _.options.slidesToShow;
        indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;

        if (_.options.slidesToShow == _.options.slidesToScroll && _.slideCount - index < _.options.slidesToShow) {
          allSlides.slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder).addClass('slick-active').attr('aria-hidden', 'false');
        } else {
          allSlides.slice(indexOffset, indexOffset + _.options.slidesToShow).addClass('slick-active').attr('aria-hidden', 'false');
        }
      }
    }

    if (_.options.lazyLoad === 'ondemand' || _.options.lazyLoad === 'anticipated') {
      _.lazyLoad();
    }
  };

  Slick.prototype.setupInfinite = function () {
    var _ = this,
        i,
        slideIndex,
        infiniteCount;

    if (_.options.fade === true) {
      _.options.centerMode = false;
    }

    if (_.options.infinite === true && _.options.fade === false) {
      slideIndex = null;

      if (_.slideCount > _.options.slidesToShow) {
        if (_.options.centerMode === true) {
          infiniteCount = _.options.slidesToShow + 1;
        } else {
          infiniteCount = _.options.slidesToShow;
        }

        for (i = _.slideCount; i > _.slideCount - infiniteCount; i -= 1) {
          slideIndex = i - 1;
          $(_.$slides[slideIndex]).clone(true).attr('id', '').attr('data-slick-index', slideIndex - _.slideCount).prependTo(_.$slideTrack).addClass('slick-cloned');
        }

        for (i = 0; i < infiniteCount + _.slideCount; i += 1) {
          slideIndex = i;
          $(_.$slides[slideIndex]).clone(true).attr('id', '').attr('data-slick-index', slideIndex + _.slideCount).appendTo(_.$slideTrack).addClass('slick-cloned');
        }

        _.$slideTrack.find('.slick-cloned').find('[id]').each(function () {
          $(this).attr('id', '');
        });
      }
    }
  };

  Slick.prototype.interrupt = function (toggle) {
    var _ = this;

    if (!toggle) {
      _.autoPlay();
    }

    _.interrupted = toggle;
  };

  Slick.prototype.selectHandler = function (event) {
    var _ = this;

    var targetElement = $(event.target).is('.slick-slide') ? $(event.target) : $(event.target).parents('.slick-slide');
    var index = parseInt(targetElement.attr('data-slick-index'));
    if (!index) index = 0;

    if (_.slideCount <= _.options.slidesToShow) {
      _.slideHandler(index, false, true);

      return;
    }

    _.slideHandler(index);
  };

  Slick.prototype.slideHandler = function (index, sync, dontAnimate) {
    var targetSlide,
        animSlide,
        oldSlide,
        slideLeft,
        targetLeft = null,
        _ = this,
        navTarget;

    sync = sync || false;

    if (_.animating === true && _.options.waitForAnimate === true) {
      return;
    }

    if (_.options.fade === true && _.currentSlide === index) {
      return;
    }

    if (sync === false) {
      _.asNavFor(index);
    }

    targetSlide = index;
    targetLeft = _.getLeft(targetSlide);
    slideLeft = _.getLeft(_.currentSlide);
    _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

    if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
      if (_.options.fade === false) {
        targetSlide = _.currentSlide;

        if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
          _.animateSlide(slideLeft, function () {
            _.postSlide(targetSlide);
          });
        } else {
          _.postSlide(targetSlide);
        }
      }

      return;
    } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > _.slideCount - _.options.slidesToScroll)) {
      if (_.options.fade === false) {
        targetSlide = _.currentSlide;

        if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
          _.animateSlide(slideLeft, function () {
            _.postSlide(targetSlide);
          });
        } else {
          _.postSlide(targetSlide);
        }
      }

      return;
    }

    if (_.options.autoplay) {
      clearInterval(_.autoPlayTimer);
    }

    if (targetSlide < 0) {
      if (_.slideCount % _.options.slidesToScroll !== 0) {
        animSlide = _.slideCount - _.slideCount % _.options.slidesToScroll;
      } else {
        animSlide = _.slideCount + targetSlide;
      }
    } else if (targetSlide >= _.slideCount) {
      if (_.slideCount % _.options.slidesToScroll !== 0) {
        animSlide = 0;
      } else {
        animSlide = targetSlide - _.slideCount;
      }
    } else {
      animSlide = targetSlide;
    }

    _.animating = true;

    _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);

    oldSlide = _.currentSlide;
    _.currentSlide = animSlide;

    _.setSlideClasses(_.currentSlide);

    if (_.options.asNavFor) {
      navTarget = _.getNavTarget();
      navTarget = navTarget.slick('getSlick');

      if (navTarget.slideCount <= navTarget.options.slidesToShow) {
        navTarget.setSlideClasses(_.currentSlide);
      }
    }

    _.updateDots();

    _.updateArrows();

    if (_.options.fade === true) {
      if (dontAnimate !== true) {
        _.fadeSlideOut(oldSlide);

        _.fadeSlide(animSlide, function () {
          _.postSlide(animSlide);
        });
      } else {
        _.postSlide(animSlide);
      }

      _.animateHeight();

      return;
    }

    if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
      _.animateSlide(targetLeft, function () {
        _.postSlide(animSlide);
      });
    } else {
      _.postSlide(animSlide);
    }
  };

  Slick.prototype.startLoad = function () {
    var _ = this;

    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
      _.$prevArrow.hide();

      _.$nextArrow.hide();
    }

    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
      _.$dots.hide();
    }

    _.$slider.addClass('slick-loading');
  };

  Slick.prototype.swipeDirection = function () {
    var xDist,
        yDist,
        r,
        swipeAngle,
        _ = this;

    xDist = _.touchObject.startX - _.touchObject.curX;
    yDist = _.touchObject.startY - _.touchObject.curY;
    r = Math.atan2(yDist, xDist);
    swipeAngle = Math.round(r * 180 / Math.PI);

    if (swipeAngle < 0) {
      swipeAngle = 360 - Math.abs(swipeAngle);
    }

    if (swipeAngle <= 45 && swipeAngle >= 0) {
      return _.options.rtl === false ? 'left' : 'right';
    }

    if (swipeAngle <= 360 && swipeAngle >= 315) {
      return _.options.rtl === false ? 'left' : 'right';
    }

    if (swipeAngle >= 135 && swipeAngle <= 225) {
      return _.options.rtl === false ? 'right' : 'left';
    }

    if (_.options.verticalSwiping === true) {
      if (swipeAngle >= 35 && swipeAngle <= 135) {
        return 'down';
      } else {
        return 'up';
      }
    }

    return 'vertical';
  };

  Slick.prototype.swipeEnd = function (event) {
    var _ = this,
        slideCount,
        direction;

    _.dragging = false;
    _.swiping = false;

    if (_.scrolling) {
      _.scrolling = false;
      return false;
    }

    _.interrupted = false;
    _.shouldClick = _.touchObject.swipeLength > 10 ? false : true;

    if (_.touchObject.curX === undefined) {
      return false;
    }

    if (_.touchObject.edgeHit === true) {
      _.$slider.trigger('edge', [_, _.swipeDirection()]);
    }

    if (_.touchObject.swipeLength >= _.touchObject.minSwipe) {
      direction = _.swipeDirection();

      switch (direction) {
        case 'left':
        case 'down':
          slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide + _.getSlideCount()) : _.currentSlide + _.getSlideCount();
          _.currentDirection = 0;
          break;

        case 'right':
        case 'up':
          slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide - _.getSlideCount()) : _.currentSlide - _.getSlideCount();
          _.currentDirection = 1;
          break;

        default:
      }

      if (direction != 'vertical') {
        _.slideHandler(slideCount);

        _.touchObject = {};

        _.$slider.trigger('swipe', [_, direction]);
      }
    } else {
      if (_.touchObject.startX !== _.touchObject.curX) {
        _.slideHandler(_.currentSlide);

        _.touchObject = {};
      }
    }
  };

  Slick.prototype.swipeHandler = function (event) {
    var _ = this;

    if (_.options.swipe === false || 'ontouchend' in document && _.options.swipe === false) {
      return;
    } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
      return;
    }

    _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ? event.originalEvent.touches.length : 1;
    _.touchObject.minSwipe = _.listWidth / _.options.touchThreshold;

    if (_.options.verticalSwiping === true) {
      _.touchObject.minSwipe = _.listHeight / _.options.touchThreshold;
    }

    switch (event.data.action) {
      case 'start':
        _.swipeStart(event);

        break;

      case 'move':
        _.swipeMove(event);

        break;

      case 'end':
        _.swipeEnd(event);

        break;
    }
  };

  Slick.prototype.swipeMove = function (event) {
    var _ = this,
        edgeWasHit = false,
        curLeft,
        swipeDirection,
        swipeLength,
        positionOffset,
        touches,
        verticalSwipeLength;

    touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

    if (!_.dragging || _.scrolling || touches && touches.length !== 1) {
      return false;
    }

    curLeft = _.getLeft(_.currentSlide);
    _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
    _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;
    _.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));
    verticalSwipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));

    if (!_.options.verticalSwiping && !_.swiping && verticalSwipeLength > 4) {
      _.scrolling = true;
      return false;
    }

    if (_.options.verticalSwiping === true) {
      _.touchObject.swipeLength = verticalSwipeLength;
    }

    swipeDirection = _.swipeDirection();

    if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
      _.swiping = true;
      event.preventDefault();
    }

    positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);

    if (_.options.verticalSwiping === true) {
      positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
    }

    swipeLength = _.touchObject.swipeLength;
    _.touchObject.edgeHit = false;

    if (_.options.infinite === false) {
      if (_.currentSlide === 0 && swipeDirection === 'right' || _.currentSlide >= _.getDotCount() && swipeDirection === 'left') {
        swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
        _.touchObject.edgeHit = true;
      }
    }

    if (_.options.vertical === false) {
      _.swipeLeft = curLeft + swipeLength * positionOffset;
    } else {
      _.swipeLeft = curLeft + swipeLength * (_.$list.height() / _.listWidth) * positionOffset;
    }

    if (_.options.verticalSwiping === true) {
      _.swipeLeft = curLeft + swipeLength * positionOffset;
    }

    if (_.options.fade === true || _.options.touchMove === false) {
      return false;
    }

    if (_.animating === true) {
      _.swipeLeft = null;
      return false;
    }

    _.setCSS(_.swipeLeft);
  };

  Slick.prototype.swipeStart = function (event) {
    var _ = this,
        touches;

    _.interrupted = true;

    if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
      _.touchObject = {};
      return false;
    }

    if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
      touches = event.originalEvent.touches[0];
    }

    _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
    _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;
    _.dragging = true;
  };

  Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function () {
    var _ = this;

    if (_.$slidesCache !== null) {
      _.unload();

      _.$slideTrack.children(this.options.slide).detach();

      _.$slidesCache.appendTo(_.$slideTrack);

      _.reinit();
    }
  };

  Slick.prototype.unload = function () {
    var _ = this;

    $('.slick-cloned', _.$slider).remove();

    if (_.$dots) {
      _.$dots.remove();
    }

    if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
      _.$prevArrow.remove();
    }

    if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
      _.$nextArrow.remove();
    }

    _.$slides.removeClass('slick-slide slick-active slick-visible slick-current').attr('aria-hidden', 'true').css('width', '');
  };

  Slick.prototype.unslick = function (fromBreakpoint) {
    var _ = this;

    _.$slider.trigger('unslick', [_, fromBreakpoint]);

    _.destroy();
  };

  Slick.prototype.updateArrows = function () {
    var _ = this,
        centerOffset;

    centerOffset = Math.floor(_.options.slidesToShow / 2);

    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow && !_.options.infinite) {
      _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

      _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

      if (_.currentSlide === 0) {
        _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');

        _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
      } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {
        _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');

        _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
      } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {
        _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');

        _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
      }
    }
  };

  Slick.prototype.updateDots = function () {
    var _ = this;

    if (_.$dots !== null) {
      _.$dots.find('li').removeClass('slick-active').end();

      _.$dots.find('li').eq(Math.floor(_.currentSlide / _.options.slidesToScroll)).addClass('slick-active');
    }
  };

  Slick.prototype.visibility = function () {
    var _ = this;

    if (_.options.autoplay) {
      if (document[_.hidden]) {
        _.interrupted = true;
      } else {
        _.interrupted = false;
      }
    }
  };

  $.fn.slick = function () {
    var _ = this,
        opt = arguments[0],
        args = Array.prototype.slice.call(arguments, 1),
        l = _.length,
        i,
        ret;

    for (i = 0; i < l; i++) {
      if (typeof opt == 'object' || typeof opt == 'undefined') _[i].slick = new Slick(_[i], opt);else ret = _[i].slick[opt].apply(_[i].slick, args);
      if (typeof ret != 'undefined') return ret;
    }

    return _;
  };
});

/***/ }),

/***/ "./src/js/masonry.js":
/*!***************************!*\
  !*** ./src/js/masonry.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setupMasonry": () => (/* binding */ setupMasonry)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var masonry_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! masonry-layout */ "./node_modules/masonry-layout/masonry.js");
/* harmony import */ var masonry_layout__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(masonry_layout__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var imagesloaded__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! imagesloaded */ "./node_modules/imagesloaded/imagesloaded.js");
/* harmony import */ var imagesloaded__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(imagesloaded__WEBPACK_IMPORTED_MODULE_2__);





function setupMasonry(container, item, sizer, spacer) {
  if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(container).length) {
    var newMasonry = new (masonry_layout__WEBPACK_IMPORTED_MODULE_1___default())(container, {
      itemSelector: item,
      columnWidth: sizer,
      gutter: spacer,
      percentPosition: true,
      transitionDuration: 0,
      initLayout: true
    });
    imagesloaded__WEBPACK_IMPORTED_MODULE_2___default()(container).on("progress", function () {
      newMasonry.layout();
    });
  }

  return newMasonry;
}

/***/ }),

/***/ "./src/js/navigation.js":
/*!******************************!*\
  !*** ./src/js/navigation.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

let menuOpen = jquery__WEBPACK_IMPORTED_MODULE_0___default()("#header__hamburger--open");
let menuClose = jquery__WEBPACK_IMPORTED_MODULE_0___default()("#header__hamburger--close");
let menu = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".header__secondary");
let menuLogo = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".header__logo");
let pageTitle = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".header__page-title");
let showClass = "show";

function openMenu() {
  menuOpen.attr("aria-expanded", "true");
  menuOpen.removeClass(showClass);
  pageTitle.removeClass(showClass);
  menuClose.addClass(showClass);
  menuLogo.addClass(showClass);
  menu.addClass(showClass);
}

function closeMenu() {
  menuOpen.attr("aria-expanded", "false");
  menuOpen.addClass(showClass);
  pageTitle.addClass(showClass);
  menuClose.removeClass(showClass);
  menuLogo.removeClass(showClass);
  menu.removeClass(showClass);
}

menuOpen.on("click", function () {
  openMenu();
});
menuClose.on("click", function () {
  closeMenu();
});
jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on("keyup", function (e) {
  if (e.key == "Escape") {
    closeMenu();
    addClass;
  }
});
jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on("load", function () {
  closeMenu();
});
jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on("load", function () {
  closeMenu();
});

/***/ }),

/***/ "./src/js/peopleInteractions.js":
/*!**************************************!*\
  !*** ./src/js/peopleInteractions.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toggleBios": () => (/* binding */ toggleBios)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var masonry_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! masonry-layout */ "./node_modules/masonry-layout/masonry.js");
/* harmony import */ var masonry_layout__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(masonry_layout__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var imagesloaded__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! imagesloaded */ "./node_modules/imagesloaded/imagesloaded.js");
/* harmony import */ var imagesloaded__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(imagesloaded__WEBPACK_IMPORTED_MODULE_2__);





function toggleBios(person, masonryObject) {
  person.on("click", function () {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).toggleClass("person__show--open");
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).siblings(".person__secondary-information").toggleClass("person__secondary-information--open");
    masonryObject.layout();
  });
}

/***/ }),

/***/ "./src/js/projectInteractions.js":
/*!***************************************!*\
  !*** ./src/js/projectInteractions.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setupSliders": () => (/* binding */ setupSliders),
/* harmony export */   "setupTabs": () => (/* binding */ setupTabs)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var slick_carousel_slick_slick__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! slick-carousel/slick/slick */ "./node_modules/slick-carousel/slick/slick.js");
/* harmony import */ var slick_carousel_slick_slick__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(slick_carousel_slick_slick__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var imagesloaded__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! imagesloaded */ "./node_modules/imagesloaded/imagesloaded.js");
/* harmony import */ var imagesloaded__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(imagesloaded__WEBPACK_IMPORTED_MODULE_2__);





function setupSliders(carouselItem, arrowLeftId, arrowRightId, variableWidth) {
  let arrowLeftObject;
  let arrowRightObject;
  let carouselSize = jquery__WEBPACK_IMPORTED_MODULE_0___default()(carouselItem).size(); // for each carousel

  jquery__WEBPACK_IMPORTED_MODULE_0___default()(carouselItem).each(function (index) {
    // add suffix to the arrow id if there are more than one of a carousel type
    if (carouselSize > 1) {
      arrowLeftObject = jquery__WEBPACK_IMPORTED_MODULE_0___default()(arrowLeftId + "--" + (index + 1));
      arrowRightObject = jquery__WEBPACK_IMPORTED_MODULE_0___default()(arrowRightId + "--" + (index + 1));
    } else {
      arrowLeftObject = jquery__WEBPACK_IMPORTED_MODULE_0___default()(arrowLeftId);
      arrowRightObject = jquery__WEBPACK_IMPORTED_MODULE_0___default()(arrowRightId);
    } // initiate slider


    jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).slick({
      infinite: true,
      variableWidth: variableWidth,
      adaptiveHeight: false,
      dots: true,
      prevArrow: arrowLeftObject,
      nextArrow: arrowRightObject,
      centerMode: true
    });
  });
}

function setupTabs(buttons, content) {
  // get all tab buttons
  let tabButtons = jquery__WEBPACK_IMPORTED_MODULE_0___default()(buttons); // get all tab content

  let tabContent = jquery__WEBPACK_IMPORTED_MODULE_0___default()(content); // on clicking a button

  tabButtons.on("click", function () {
    // make record of the button
    let tabButton = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this); // get the data attribute

    let tabButtonData = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr("data-for-tab"); // for each tab content

    tabContent.each(function (index) {
      // make record of the content item
      let tabContent = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this); // get the data attribute

      let tabContentData = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr("data-tab"); // if the content data attribute matches the tab attribute

      if (tabContentData == tabButtonData) {
        // add active class to the button
        tabButton.addClass("active"); // remove active class to the button

        tabButton.siblings().removeClass("active"); // add active class to the content item

        tabContent.addClass("active"); // remove active class to the content item

        tabContent.siblings().removeClass("active");
      }
    });
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(".project__carousel--" + tabButtonData).slick("refresh");
  });
}

/***/ }),

/***/ "./src/js/randomizeOrder.js":
/*!**********************************!*\
  !*** ./src/js/randomizeOrder.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "randomize": () => (/* binding */ randomize)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);



function randomize(selector) {
  // if the item exists
  if (selector) {
    // find the parent
    selector.parent().each(function () {
      // for each parent
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(this) // find the children
      .children(selector) // get a random sort order
      .sort(function () {
        return Math.random() - 0.5;
      }) // remove the children from the parent
      .detach() // append the children with the new order
      .appendTo(this);
    });
  }

  return this;
}

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = jQuery;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _navigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./navigation */ "./src/js/navigation.js");
/* harmony import */ var _randomizeOrder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./randomizeOrder */ "./src/js/randomizeOrder.js");
/* harmony import */ var _masonry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./masonry */ "./src/js/masonry.js");
/* harmony import */ var _projectInteractions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./projectInteractions */ "./src/js/projectInteractions.js");
/* harmony import */ var _peopleInteractions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./peopleInteractions */ "./src/js/peopleInteractions.js");






jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on("ready", function () {
  // for project grid
  let projectGrid = ".project-grid";
  let projectItem = ".project-grid__item";
  let projectSizer = ".project-grid__item--small";
  let projectSpacer = ".project-grid__spacer";

  if (projectItem) {
    // randomize order
    (0,_randomizeOrder__WEBPACK_IMPORTED_MODULE_2__.randomize)(jquery__WEBPACK_IMPORTED_MODULE_0___default()(projectItem)); // apply masonry

    (0,_masonry__WEBPACK_IMPORTED_MODULE_3__.setupMasonry)(projectGrid, projectItem, projectSizer, projectSpacer);
  } // for teaching grid


  let opportunityGrid = ".opportunities";
  let opportunityItem = ".opportunity";
  let opportunitySpacer = ".opportunity__spacer";

  if (opportunityItem) {
    // apply masonry
    (0,_masonry__WEBPACK_IMPORTED_MODULE_3__.setupMasonry)(opportunityGrid, opportunityItem, opportunityItem, opportunitySpacer);
  } // for people grid


  let personGrid = ".people";
  let personItem = ".person";
  let personSizer = ".person--small";
  let personSpacer = ".person__spacer";
  let peopleMasonry;

  if (personItem) {
    // apply masonry
    peopleMasonry = (0,_masonry__WEBPACK_IMPORTED_MODULE_3__.setupMasonry)(personGrid, personItem, personSizer, personSpacer);
  }

  console.log(peopleMasonry); // initialize tabs
  // if the url has a hash

  if (window.location.hash) {
    // get the hash value
    let hash = window.location.hash.replace("#", ""); // get the related button

    let buttonToActivate = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".project__deliverable-button[data-hash-target='" + hash + "']"); // trigger a click on the button

    buttonToActivate.trigger("click");
  } // trigger tabs on button click


  let deliverableButtons = ".project__deliverable-button";
  let deliverableContent = ".project__deliverable-content";

  if (deliverableButtons) {
    (0,_projectInteractions__WEBPACK_IMPORTED_MODULE_4__.setupTabs)(deliverableButtons, deliverableContent);
  } // for project sliders


  let projectSlider = ".project__carousel";
  let projectLeftArrow = "#project__arrow--left";
  let projectRightArrow = "#project__arrow--right";

  if (projectSlider) {
    (0,_projectInteractions__WEBPACK_IMPORTED_MODULE_4__.setupSliders)(projectSlider, projectLeftArrow, projectRightArrow, false);
  } // for project research sliders


  let researchSlider = ".research__carousel";
  let researchLeftArrow = "#research__arrow--left";
  let researchRightArrow = "#research__arrow--right";

  if (researchSlider) {
    (0,_projectInteractions__WEBPACK_IMPORTED_MODULE_4__.setupSliders)(researchSlider, researchLeftArrow, researchRightArrow, true);
  }

  let person = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".person__show");

  if (person) {
    (0,_peopleInteractions__WEBPACK_IMPORTED_MODULE_5__.toggleBios)(person, peopleMasonry);
  } // $(".carousel__image-loader").each(function () {
  // 	let carouselImage = $(this);
  // 	carouselImage.imagesLoaded(function () {
  // 		carouselImage.addClass("show");
  // 	});
  // });

});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Qjs7QUFDQUMsSUFBQUEsZ0JBQWdCLENBQUMvYixPQUFqQixDQUF5QixPQUF6QjtBQUNBLEdBdkRrQyxDQXlEbkM7OztBQUNBLE1BQUlnYyxrQkFBa0IsR0FBRyw4QkFBekI7QUFDQSxNQUFJQyxrQkFBa0IsR0FBRywrQkFBekI7O0FBQ0EsTUFBSUQsa0JBQUosRUFBd0I7QUFDdkIvQixJQUFBQSwrREFBUyxDQUFDK0Isa0JBQUQsRUFBcUJDLGtCQUFyQixDQUFUO0FBQ0EsR0E5RGtDLENBZ0VuQzs7O0FBQ0EsTUFBSUMsYUFBYSxHQUFHLG9CQUFwQjtBQUNBLE1BQUlDLGdCQUFnQixHQUFHLHVCQUF2QjtBQUNBLE1BQUlDLGlCQUFpQixHQUFHLHdCQUF4Qjs7QUFDQSxNQUFJRixhQUFKLEVBQW1CO0FBQ2xCbEMsSUFBQUEsa0VBQVksQ0FBQ2tDLGFBQUQsRUFBZ0JDLGdCQUFoQixFQUFrQ0MsaUJBQWxDLEVBQXFELEtBQXJELENBQVo7QUFDQSxHQXRFa0MsQ0F3RW5DOzs7QUFDQSxNQUFJQyxjQUFjLEdBQUcscUJBQXJCO0FBQ0EsTUFBSUMsaUJBQWlCLEdBQUcsd0JBQXhCO0FBQ0EsTUFBSUMsa0JBQWtCLEdBQUcseUJBQXpCOztBQUNBLE1BQUlGLGNBQUosRUFBb0I7QUFDbkJyQyxJQUFBQSxrRUFBWSxDQUFDcUMsY0FBRCxFQUFpQkMsaUJBQWpCLEVBQW9DQyxrQkFBcEMsRUFBd0QsSUFBeEQsQ0FBWjtBQUNBOztBQUVELE1BQUkzQyxNQUFNLEdBQUduckIsNkNBQUMsQ0FBQyxlQUFELENBQWQ7O0FBQ0EsTUFBSW1yQixNQUFKLEVBQVk7QUFDWEQsSUFBQUEsK0RBQVUsQ0FBQ0MsTUFBRCxFQUFTZ0MsYUFBVCxDQUFWO0FBQ0EsR0FuRmtDLENBcUZuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsQ0EzRkQsRSIsInNvdXJjZXMiOlsid2VicGFjazovL3BvbHltb2RlLXRoZW1lLy4vbm9kZV9tb2R1bGVzL2Rlc2FuZHJvLW1hdGNoZXMtc2VsZWN0b3IvbWF0Y2hlcy1zZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9wb2x5bW9kZS10aGVtZS8uL25vZGVfbW9kdWxlcy9ldi1lbWl0dGVyL2V2LWVtaXR0ZXIuanMiLCJ3ZWJwYWNrOi8vcG9seW1vZGUtdGhlbWUvLi9ub2RlX21vZHVsZXMvZml6enktdWktdXRpbHMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vcG9seW1vZGUtdGhlbWUvLi9ub2RlX21vZHVsZXMvZ2V0LXNpemUvZ2V0LXNpemUuanMiLCJ3ZWJwYWNrOi8vcG9seW1vZGUtdGhlbWUvLi9ub2RlX21vZHVsZXMvaW1hZ2VzbG9hZGVkL2ltYWdlc2xvYWRlZC5qcyIsIndlYnBhY2s6Ly9wb2x5bW9kZS10aGVtZS8uL25vZGVfbW9kdWxlcy9pbWFnZXNsb2FkZWQvbm9kZV9tb2R1bGVzL2V2LWVtaXR0ZXIvZXYtZW1pdHRlci5qcyIsIndlYnBhY2s6Ly9wb2x5bW9kZS10aGVtZS8uL25vZGVfbW9kdWxlcy9tYXNvbnJ5LWxheW91dC9tYXNvbnJ5LmpzIiwid2VicGFjazovL3BvbHltb2RlLXRoZW1lLy4vbm9kZV9tb2R1bGVzL291dGxheWVyL2l0ZW0uanMiLCJ3ZWJwYWNrOi8vcG9seW1vZGUtdGhlbWUvLi9ub2RlX21vZHVsZXMvb3V0bGF5ZXIvb3V0bGF5ZXIuanMiLCJ3ZWJwYWNrOi8vcG9seW1vZGUtdGhlbWUvLi9ub2RlX21vZHVsZXMvc2xpY2stY2Fyb3VzZWwvc2xpY2svc2xpY2suanMiLCJ3ZWJwYWNrOi8vcG9seW1vZGUtdGhlbWUvLi9zcmMvanMvbWFzb25yeS5qcyIsIndlYnBhY2s6Ly9wb2x5bW9kZS10aGVtZS8uL3NyYy9qcy9uYXZpZ2F0aW9uLmpzIiwid2VicGFjazovL3BvbHltb2RlLXRoZW1lLy4vc3JjL2pzL3Blb3BsZUludGVyYWN0aW9ucy5qcyIsIndlYnBhY2s6Ly9wb2x5bW9kZS10aGVtZS8uL3NyYy9qcy9wcm9qZWN0SW50ZXJhY3Rpb25zLmpzIiwid2VicGFjazovL3BvbHltb2RlLXRoZW1lLy4vc3JjL2pzL3JhbmRvbWl6ZU9yZGVyLmpzIiwid2VicGFjazovL3BvbHltb2RlLXRoZW1lL2V4dGVybmFsIHZhciBcImpRdWVyeVwiIiwid2VicGFjazovL3BvbHltb2RlLXRoZW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3BvbHltb2RlLXRoZW1lL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3BvbHltb2RlLXRoZW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9wb2x5bW9kZS10aGVtZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3BvbHltb2RlLXRoZW1lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcG9seW1vZGUtdGhlbWUvLi9zcmMvanMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBtYXRjaGVzU2VsZWN0b3IgdjIuMC4yXG4gKiBtYXRjaGVzU2VsZWN0b3IoIGVsZW1lbnQsICcuc2VsZWN0b3InIClcbiAqIE1JVCBsaWNlbnNlXG4gKi9cblxuLypqc2hpbnQgYnJvd3NlcjogdHJ1ZSwgc3RyaWN0OiB0cnVlLCB1bmRlZjogdHJ1ZSwgdW51c2VkOiB0cnVlICovXG5cbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLypnbG9iYWwgZGVmaW5lOiBmYWxzZSwgbW9kdWxlOiBmYWxzZSAqL1xuICAndXNlIHN0cmljdCc7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggZmFjdG9yeSApO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICB3aW5kb3cubWF0Y2hlc1NlbGVjdG9yID0gZmFjdG9yeSgpO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtYXRjaGVzTWV0aG9kID0gKCBmdW5jdGlvbigpIHtcbiAgICB2YXIgRWxlbVByb3RvID0gd2luZG93LkVsZW1lbnQucHJvdG90eXBlO1xuICAgIC8vIGNoZWNrIGZvciB0aGUgc3RhbmRhcmQgbWV0aG9kIG5hbWUgZmlyc3RcbiAgICBpZiAoIEVsZW1Qcm90by5tYXRjaGVzICkge1xuICAgICAgcmV0dXJuICdtYXRjaGVzJztcbiAgICB9XG4gICAgLy8gY2hlY2sgdW4tcHJlZml4ZWRcbiAgICBpZiAoIEVsZW1Qcm90by5tYXRjaGVzU2VsZWN0b3IgKSB7XG4gICAgICByZXR1cm4gJ21hdGNoZXNTZWxlY3Rvcic7XG4gICAgfVxuICAgIC8vIGNoZWNrIHZlbmRvciBwcmVmaXhlc1xuICAgIHZhciBwcmVmaXhlcyA9IFsgJ3dlYmtpdCcsICdtb3onLCAnbXMnLCAnbycgXTtcblxuICAgIGZvciAoIHZhciBpPTA7IGkgPCBwcmVmaXhlcy5sZW5ndGg7IGkrKyApIHtcbiAgICAgIHZhciBwcmVmaXggPSBwcmVmaXhlc1tpXTtcbiAgICAgIHZhciBtZXRob2QgPSBwcmVmaXggKyAnTWF0Y2hlc1NlbGVjdG9yJztcbiAgICAgIGlmICggRWxlbVByb3RvWyBtZXRob2QgXSApIHtcbiAgICAgICAgcmV0dXJuIG1ldGhvZDtcbiAgICAgIH1cbiAgICB9XG4gIH0pKCk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIG1hdGNoZXNTZWxlY3RvciggZWxlbSwgc2VsZWN0b3IgKSB7XG4gICAgcmV0dXJuIGVsZW1bIG1hdGNoZXNNZXRob2QgXSggc2VsZWN0b3IgKTtcbiAgfTtcblxufSkpO1xuIiwiLyoqXG4gKiBFdkVtaXR0ZXIgdjEuMS4wXG4gKiBMaWwnIGV2ZW50IGVtaXR0ZXJcbiAqIE1JVCBMaWNlbnNlXG4gKi9cblxuLyoganNoaW50IHVudXNlZDogdHJ1ZSwgdW5kZWY6IHRydWUsIHN0cmljdDogdHJ1ZSAqL1xuXG4oIGZ1bmN0aW9uKCBnbG9iYWwsIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICAvKiBqc2hpbnQgc3RyaWN0OiBmYWxzZSAqLyAvKiBnbG9iYWxzIGRlZmluZSwgbW9kdWxlLCB3aW5kb3cgKi9cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTUQgLSBSZXF1aXJlSlNcbiAgICBkZWZpbmUoIGZhY3RvcnkgKTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KUyAtIEJyb3dzZXJpZnksIFdlYnBhY2tcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBCcm93c2VyIGdsb2JhbHNcbiAgICBnbG9iYWwuRXZFbWl0dGVyID0gZmFjdG9yeSgpO1xuICB9XG5cbn0oIHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiB0aGlzLCBmdW5jdGlvbigpIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIEV2RW1pdHRlcigpIHt9XG5cbnZhciBwcm90byA9IEV2RW1pdHRlci5wcm90b3R5cGU7XG5cbnByb3RvLm9uID0gZnVuY3Rpb24oIGV2ZW50TmFtZSwgbGlzdGVuZXIgKSB7XG4gIGlmICggIWV2ZW50TmFtZSB8fCAhbGlzdGVuZXIgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIHNldCBldmVudHMgaGFzaFxuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuICAvLyBzZXQgbGlzdGVuZXJzIGFycmF5XG4gIHZhciBsaXN0ZW5lcnMgPSBldmVudHNbIGV2ZW50TmFtZSBdID0gZXZlbnRzWyBldmVudE5hbWUgXSB8fCBbXTtcbiAgLy8gb25seSBhZGQgb25jZVxuICBpZiAoIGxpc3RlbmVycy5pbmRleE9mKCBsaXN0ZW5lciApID09IC0xICkge1xuICAgIGxpc3RlbmVycy5wdXNoKCBsaXN0ZW5lciApO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5wcm90by5vbmNlID0gZnVuY3Rpb24oIGV2ZW50TmFtZSwgbGlzdGVuZXIgKSB7XG4gIGlmICggIWV2ZW50TmFtZSB8fCAhbGlzdGVuZXIgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIGFkZCBldmVudFxuICB0aGlzLm9uKCBldmVudE5hbWUsIGxpc3RlbmVyICk7XG4gIC8vIHNldCBvbmNlIGZsYWdcbiAgLy8gc2V0IG9uY2VFdmVudHMgaGFzaFxuICB2YXIgb25jZUV2ZW50cyA9IHRoaXMuX29uY2VFdmVudHMgPSB0aGlzLl9vbmNlRXZlbnRzIHx8IHt9O1xuICAvLyBzZXQgb25jZUxpc3RlbmVycyBvYmplY3RcbiAgdmFyIG9uY2VMaXN0ZW5lcnMgPSBvbmNlRXZlbnRzWyBldmVudE5hbWUgXSA9IG9uY2VFdmVudHNbIGV2ZW50TmFtZSBdIHx8IHt9O1xuICAvLyBzZXQgZmxhZ1xuICBvbmNlTGlzdGVuZXJzWyBsaXN0ZW5lciBdID0gdHJ1ZTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbnByb3RvLm9mZiA9IGZ1bmN0aW9uKCBldmVudE5hbWUsIGxpc3RlbmVyICkge1xuICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzICYmIHRoaXMuX2V2ZW50c1sgZXZlbnROYW1lIF07XG4gIGlmICggIWxpc3RlbmVycyB8fCAhbGlzdGVuZXJzLmxlbmd0aCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGluZGV4ID0gbGlzdGVuZXJzLmluZGV4T2YoIGxpc3RlbmVyICk7XG4gIGlmICggaW5kZXggIT0gLTEgKSB7XG4gICAgbGlzdGVuZXJzLnNwbGljZSggaW5kZXgsIDEgKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxucHJvdG8uZW1pdEV2ZW50ID0gZnVuY3Rpb24oIGV2ZW50TmFtZSwgYXJncyApIHtcbiAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50cyAmJiB0aGlzLl9ldmVudHNbIGV2ZW50TmFtZSBdO1xuICBpZiAoICFsaXN0ZW5lcnMgfHwgIWxpc3RlbmVycy5sZW5ndGggKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIGNvcHkgb3ZlciB0byBhdm9pZCBpbnRlcmZlcmVuY2UgaWYgLm9mZigpIGluIGxpc3RlbmVyXG4gIGxpc3RlbmVycyA9IGxpc3RlbmVycy5zbGljZSgwKTtcbiAgYXJncyA9IGFyZ3MgfHwgW107XG4gIC8vIG9uY2Ugc3R1ZmZcbiAgdmFyIG9uY2VMaXN0ZW5lcnMgPSB0aGlzLl9vbmNlRXZlbnRzICYmIHRoaXMuX29uY2VFdmVudHNbIGV2ZW50TmFtZSBdO1xuXG4gIGZvciAoIHZhciBpPTA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpKysgKSB7XG4gICAgdmFyIGxpc3RlbmVyID0gbGlzdGVuZXJzW2ldXG4gICAgdmFyIGlzT25jZSA9IG9uY2VMaXN0ZW5lcnMgJiYgb25jZUxpc3RlbmVyc1sgbGlzdGVuZXIgXTtcbiAgICBpZiAoIGlzT25jZSApIHtcbiAgICAgIC8vIHJlbW92ZSBsaXN0ZW5lclxuICAgICAgLy8gcmVtb3ZlIGJlZm9yZSB0cmlnZ2VyIHRvIHByZXZlbnQgcmVjdXJzaW9uXG4gICAgICB0aGlzLm9mZiggZXZlbnROYW1lLCBsaXN0ZW5lciApO1xuICAgICAgLy8gdW5zZXQgb25jZSBmbGFnXG4gICAgICBkZWxldGUgb25jZUxpc3RlbmVyc1sgbGlzdGVuZXIgXTtcbiAgICB9XG4gICAgLy8gdHJpZ2dlciBsaXN0ZW5lclxuICAgIGxpc3RlbmVyLmFwcGx5KCB0aGlzLCBhcmdzICk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbnByb3RvLmFsbE9mZiA9IGZ1bmN0aW9uKCkge1xuICBkZWxldGUgdGhpcy5fZXZlbnRzO1xuICBkZWxldGUgdGhpcy5fb25jZUV2ZW50cztcbn07XG5cbnJldHVybiBFdkVtaXR0ZXI7XG5cbn0pKTtcbiIsIi8qKlxuICogRml6enkgVUkgdXRpbHMgdjIuMC43XG4gKiBNSVQgbGljZW5zZVxuICovXG5cbi8qanNoaW50IGJyb3dzZXI6IHRydWUsIHVuZGVmOiB0cnVlLCB1bnVzZWQ6IHRydWUsIHN0cmljdDogdHJ1ZSAqL1xuXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICAvKmpzaGludCBzdHJpY3Q6IGZhbHNlICovIC8qZ2xvYmFscyBkZWZpbmUsIG1vZHVsZSwgcmVxdWlyZSAqL1xuXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBbXG4gICAgICAnZGVzYW5kcm8tbWF0Y2hlcy1zZWxlY3Rvci9tYXRjaGVzLXNlbGVjdG9yJ1xuICAgIF0sIGZ1bmN0aW9uKCBtYXRjaGVzU2VsZWN0b3IgKSB7XG4gICAgICByZXR1cm4gZmFjdG9yeSggd2luZG93LCBtYXRjaGVzU2VsZWN0b3IgKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHJlcXVpcmUoJ2Rlc2FuZHJvLW1hdGNoZXMtc2VsZWN0b3InKVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICB3aW5kb3cuZml6enlVSVV0aWxzID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHdpbmRvdy5tYXRjaGVzU2VsZWN0b3JcbiAgICApO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggd2luZG93LCBtYXRjaGVzU2VsZWN0b3IgKSB7XG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0ge307XG5cbi8vIC0tLS0tIGV4dGVuZCAtLS0tLSAvL1xuXG4vLyBleHRlbmRzIG9iamVjdHNcbnV0aWxzLmV4dGVuZCA9IGZ1bmN0aW9uKCBhLCBiICkge1xuICBmb3IgKCB2YXIgcHJvcCBpbiBiICkge1xuICAgIGFbIHByb3AgXSA9IGJbIHByb3AgXTtcbiAgfVxuICByZXR1cm4gYTtcbn07XG5cbi8vIC0tLS0tIG1vZHVsbyAtLS0tLSAvL1xuXG51dGlscy5tb2R1bG8gPSBmdW5jdGlvbiggbnVtLCBkaXYgKSB7XG4gIHJldHVybiAoICggbnVtICUgZGl2ICkgKyBkaXYgKSAlIGRpdjtcbn07XG5cbi8vIC0tLS0tIG1ha2VBcnJheSAtLS0tLSAvL1xuXG52YXIgYXJyYXlTbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcblxuLy8gdHVybiBlbGVtZW50IG9yIG5vZGVMaXN0IGludG8gYW4gYXJyYXlcbnV0aWxzLm1ha2VBcnJheSA9IGZ1bmN0aW9uKCBvYmogKSB7XG4gIGlmICggQXJyYXkuaXNBcnJheSggb2JqICkgKSB7XG4gICAgLy8gdXNlIG9iamVjdCBpZiBhbHJlYWR5IGFuIGFycmF5XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuICAvLyByZXR1cm4gZW1wdHkgYXJyYXkgaWYgdW5kZWZpbmVkIG9yIG51bGwuICM2XG4gIGlmICggb2JqID09PSBudWxsIHx8IG9iaiA9PT0gdW5kZWZpbmVkICkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHZhciBpc0FycmF5TGlrZSA9IHR5cGVvZiBvYmogPT0gJ29iamVjdCcgJiYgdHlwZW9mIG9iai5sZW5ndGggPT0gJ251bWJlcic7XG4gIGlmICggaXNBcnJheUxpa2UgKSB7XG4gICAgLy8gY29udmVydCBub2RlTGlzdCB0byBhcnJheVxuICAgIHJldHVybiBhcnJheVNsaWNlLmNhbGwoIG9iaiApO1xuICB9XG5cbiAgLy8gYXJyYXkgb2Ygc2luZ2xlIGluZGV4XG4gIHJldHVybiBbIG9iaiBdO1xufTtcblxuLy8gLS0tLS0gcmVtb3ZlRnJvbSAtLS0tLSAvL1xuXG51dGlscy5yZW1vdmVGcm9tID0gZnVuY3Rpb24oIGFyeSwgb2JqICkge1xuICB2YXIgaW5kZXggPSBhcnkuaW5kZXhPZiggb2JqICk7XG4gIGlmICggaW5kZXggIT0gLTEgKSB7XG4gICAgYXJ5LnNwbGljZSggaW5kZXgsIDEgKTtcbiAgfVxufTtcblxuLy8gLS0tLS0gZ2V0UGFyZW50IC0tLS0tIC8vXG5cbnV0aWxzLmdldFBhcmVudCA9IGZ1bmN0aW9uKCBlbGVtLCBzZWxlY3RvciApIHtcbiAgd2hpbGUgKCBlbGVtLnBhcmVudE5vZGUgJiYgZWxlbSAhPSBkb2N1bWVudC5ib2R5ICkge1xuICAgIGVsZW0gPSBlbGVtLnBhcmVudE5vZGU7XG4gICAgaWYgKCBtYXRjaGVzU2VsZWN0b3IoIGVsZW0sIHNlbGVjdG9yICkgKSB7XG4gICAgICByZXR1cm4gZWxlbTtcbiAgICB9XG4gIH1cbn07XG5cbi8vIC0tLS0tIGdldFF1ZXJ5RWxlbWVudCAtLS0tLSAvL1xuXG4vLyB1c2UgZWxlbWVudCBhcyBzZWxlY3RvciBzdHJpbmdcbnV0aWxzLmdldFF1ZXJ5RWxlbWVudCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuICBpZiAoIHR5cGVvZiBlbGVtID09ICdzdHJpbmcnICkge1xuICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCBlbGVtICk7XG4gIH1cbiAgcmV0dXJuIGVsZW07XG59O1xuXG4vLyAtLS0tLSBoYW5kbGVFdmVudCAtLS0tLSAvL1xuXG4vLyBlbmFibGUgLm9udHlwZSB0byB0cmlnZ2VyIGZyb20gLmFkZEV2ZW50TGlzdGVuZXIoIGVsZW0sICd0eXBlJyApXG51dGlscy5oYW5kbGVFdmVudCA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgdmFyIG1ldGhvZCA9ICdvbicgKyBldmVudC50eXBlO1xuICBpZiAoIHRoaXNbIG1ldGhvZCBdICkge1xuICAgIHRoaXNbIG1ldGhvZCBdKCBldmVudCApO1xuICB9XG59O1xuXG4vLyAtLS0tLSBmaWx0ZXJGaW5kRWxlbWVudHMgLS0tLS0gLy9cblxudXRpbHMuZmlsdGVyRmluZEVsZW1lbnRzID0gZnVuY3Rpb24oIGVsZW1zLCBzZWxlY3RvciApIHtcbiAgLy8gbWFrZSBhcnJheSBvZiBlbGVtc1xuICBlbGVtcyA9IHV0aWxzLm1ha2VBcnJheSggZWxlbXMgKTtcbiAgdmFyIGZmRWxlbXMgPSBbXTtcblxuICBlbGVtcy5mb3JFYWNoKCBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAvLyBjaGVjayB0aGF0IGVsZW0gaXMgYW4gYWN0dWFsIGVsZW1lbnRcbiAgICBpZiAoICEoIGVsZW0gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCApICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBhZGQgZWxlbSBpZiBubyBzZWxlY3RvclxuICAgIGlmICggIXNlbGVjdG9yICkge1xuICAgICAgZmZFbGVtcy5wdXNoKCBlbGVtICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIGZpbHRlciAmIGZpbmQgaXRlbXMgaWYgd2UgaGF2ZSBhIHNlbGVjdG9yXG4gICAgLy8gZmlsdGVyXG4gICAgaWYgKCBtYXRjaGVzU2VsZWN0b3IoIGVsZW0sIHNlbGVjdG9yICkgKSB7XG4gICAgICBmZkVsZW1zLnB1c2goIGVsZW0gKTtcbiAgICB9XG4gICAgLy8gZmluZCBjaGlsZHJlblxuICAgIHZhciBjaGlsZEVsZW1zID0gZWxlbS5xdWVyeVNlbGVjdG9yQWxsKCBzZWxlY3RvciApO1xuICAgIC8vIGNvbmNhdCBjaGlsZEVsZW1zIHRvIGZpbHRlckZvdW5kIGFycmF5XG4gICAgZm9yICggdmFyIGk9MDsgaSA8IGNoaWxkRWxlbXMubGVuZ3RoOyBpKysgKSB7XG4gICAgICBmZkVsZW1zLnB1c2goIGNoaWxkRWxlbXNbaV0gKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBmZkVsZW1zO1xufTtcblxuLy8gLS0tLS0gZGVib3VuY2VNZXRob2QgLS0tLS0gLy9cblxudXRpbHMuZGVib3VuY2VNZXRob2QgPSBmdW5jdGlvbiggX2NsYXNzLCBtZXRob2ROYW1lLCB0aHJlc2hvbGQgKSB7XG4gIHRocmVzaG9sZCA9IHRocmVzaG9sZCB8fCAxMDA7XG4gIC8vIG9yaWdpbmFsIG1ldGhvZFxuICB2YXIgbWV0aG9kID0gX2NsYXNzLnByb3RvdHlwZVsgbWV0aG9kTmFtZSBdO1xuICB2YXIgdGltZW91dE5hbWUgPSBtZXRob2ROYW1lICsgJ1RpbWVvdXQnO1xuXG4gIF9jbGFzcy5wcm90b3R5cGVbIG1ldGhvZE5hbWUgXSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB0aW1lb3V0ID0gdGhpc1sgdGltZW91dE5hbWUgXTtcbiAgICBjbGVhclRpbWVvdXQoIHRpbWVvdXQgKTtcblxuICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgdGhpc1sgdGltZW91dE5hbWUgXSA9IHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuICAgICAgbWV0aG9kLmFwcGx5KCBfdGhpcywgYXJncyApO1xuICAgICAgZGVsZXRlIF90aGlzWyB0aW1lb3V0TmFtZSBdO1xuICAgIH0sIHRocmVzaG9sZCApO1xuICB9O1xufTtcblxuLy8gLS0tLS0gZG9jUmVhZHkgLS0tLS0gLy9cblxudXRpbHMuZG9jUmVhZHkgPSBmdW5jdGlvbiggY2FsbGJhY2sgKSB7XG4gIHZhciByZWFkeVN0YXRlID0gZG9jdW1lbnQucmVhZHlTdGF0ZTtcbiAgaWYgKCByZWFkeVN0YXRlID09ICdjb21wbGV0ZScgfHwgcmVhZHlTdGF0ZSA9PSAnaW50ZXJhY3RpdmUnICkge1xuICAgIC8vIGRvIGFzeW5jIHRvIGFsbG93IGZvciBvdGhlciBzY3JpcHRzIHRvIHJ1bi4gbWV0YWZpenp5L2ZsaWNraXR5IzQ0MVxuICAgIHNldFRpbWVvdXQoIGNhbGxiYWNrICk7XG4gIH0gZWxzZSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ0RPTUNvbnRlbnRMb2FkZWQnLCBjYWxsYmFjayApO1xuICB9XG59O1xuXG4vLyAtLS0tLSBodG1sSW5pdCAtLS0tLSAvL1xuXG4vLyBodHRwOi8vamFtZXNyb2JlcnRzLm5hbWUvYmxvZy8yMDEwLzAyLzIyL3N0cmluZy1mdW5jdGlvbnMtZm9yLWphdmFzY3JpcHQtdHJpbS10by1jYW1lbC1jYXNlLXRvLWRhc2hlZC1hbmQtdG8tdW5kZXJzY29yZS9cbnV0aWxzLnRvRGFzaGVkID0gZnVuY3Rpb24oIHN0ciApIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKCAvKC4pKFtBLVpdKS9nLCBmdW5jdGlvbiggbWF0Y2gsICQxLCAkMiApIHtcbiAgICByZXR1cm4gJDEgKyAnLScgKyAkMjtcbiAgfSkudG9Mb3dlckNhc2UoKTtcbn07XG5cbnZhciBjb25zb2xlID0gd2luZG93LmNvbnNvbGU7XG4vKipcbiAqIGFsbG93IHVzZXIgdG8gaW5pdGlhbGl6ZSBjbGFzc2VzIHZpYSBbZGF0YS1uYW1lc3BhY2VdIG9yIC5qcy1uYW1lc3BhY2UgY2xhc3NcbiAqIGh0bWxJbml0KCBXaWRnZXQsICd3aWRnZXROYW1lJyApXG4gKiBvcHRpb25zIGFyZSBwYXJzZWQgZnJvbSBkYXRhLW5hbWVzcGFjZS1vcHRpb25zXG4gKi9cbnV0aWxzLmh0bWxJbml0ID0gZnVuY3Rpb24oIFdpZGdldENsYXNzLCBuYW1lc3BhY2UgKSB7XG4gIHV0aWxzLmRvY1JlYWR5KCBmdW5jdGlvbigpIHtcbiAgICB2YXIgZGFzaGVkTmFtZXNwYWNlID0gdXRpbHMudG9EYXNoZWQoIG5hbWVzcGFjZSApO1xuICAgIHZhciBkYXRhQXR0ciA9ICdkYXRhLScgKyBkYXNoZWROYW1lc3BhY2U7XG4gICAgdmFyIGRhdGFBdHRyRWxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCAnWycgKyBkYXRhQXR0ciArICddJyApO1xuICAgIHZhciBqc0Rhc2hFbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoICcuanMtJyArIGRhc2hlZE5hbWVzcGFjZSApO1xuICAgIHZhciBlbGVtcyA9IHV0aWxzLm1ha2VBcnJheSggZGF0YUF0dHJFbGVtcyApXG4gICAgICAuY29uY2F0KCB1dGlscy5tYWtlQXJyYXkoIGpzRGFzaEVsZW1zICkgKTtcbiAgICB2YXIgZGF0YU9wdGlvbnNBdHRyID0gZGF0YUF0dHIgKyAnLW9wdGlvbnMnO1xuICAgIHZhciBqUXVlcnkgPSB3aW5kb3cualF1ZXJ5O1xuXG4gICAgZWxlbXMuZm9yRWFjaCggZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICB2YXIgYXR0ciA9IGVsZW0uZ2V0QXR0cmlidXRlKCBkYXRhQXR0ciApIHx8XG4gICAgICAgIGVsZW0uZ2V0QXR0cmlidXRlKCBkYXRhT3B0aW9uc0F0dHIgKTtcbiAgICAgIHZhciBvcHRpb25zO1xuICAgICAgdHJ5IHtcbiAgICAgICAgb3B0aW9ucyA9IGF0dHIgJiYgSlNPTi5wYXJzZSggYXR0ciApO1xuICAgICAgfSBjYXRjaCAoIGVycm9yICkge1xuICAgICAgICAvLyBsb2cgZXJyb3IsIGRvIG5vdCBpbml0aWFsaXplXG4gICAgICAgIGlmICggY29uc29sZSApIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCAnRXJyb3IgcGFyc2luZyAnICsgZGF0YUF0dHIgKyAnIG9uICcgKyBlbGVtLmNsYXNzTmFtZSArXG4gICAgICAgICAgJzogJyArIGVycm9yICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gaW5pdGlhbGl6ZVxuICAgICAgdmFyIGluc3RhbmNlID0gbmV3IFdpZGdldENsYXNzKCBlbGVtLCBvcHRpb25zICk7XG4gICAgICAvLyBtYWtlIGF2YWlsYWJsZSB2aWEgJCgpLmRhdGEoJ25hbWVzcGFjZScpXG4gICAgICBpZiAoIGpRdWVyeSApIHtcbiAgICAgICAgalF1ZXJ5LmRhdGEoIGVsZW0sIG5hbWVzcGFjZSwgaW5zdGFuY2UgKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICB9KTtcbn07XG5cbi8vIC0tLS0tICAtLS0tLSAvL1xuXG5yZXR1cm4gdXRpbHM7XG5cbn0pKTtcbiIsIi8qIVxuICogZ2V0U2l6ZSB2Mi4wLjNcbiAqIG1lYXN1cmUgc2l6ZSBvZiBlbGVtZW50c1xuICogTUlUIGxpY2Vuc2VcbiAqL1xuXG4vKiBqc2hpbnQgYnJvd3NlcjogdHJ1ZSwgc3RyaWN0OiB0cnVlLCB1bmRlZjogdHJ1ZSwgdW51c2VkOiB0cnVlICovXG4vKiBnbG9iYWxzIGNvbnNvbGU6IGZhbHNlICovXG5cbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLyoganNoaW50IHN0cmljdDogZmFsc2UgKi8gLyogZ2xvYmFscyBkZWZpbmUsIG1vZHVsZSAqL1xuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggZmFjdG9yeSApO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICB3aW5kb3cuZ2V0U2l6ZSA9IGZhY3RvcnkoKTtcbiAgfVxuXG59KSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCkge1xuJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBoZWxwZXJzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8vIGdldCBhIG51bWJlciBmcm9tIGEgc3RyaW5nLCBub3QgYSBwZXJjZW50YWdlXG5mdW5jdGlvbiBnZXRTdHlsZVNpemUoIHZhbHVlICkge1xuICB2YXIgbnVtID0gcGFyc2VGbG9hdCggdmFsdWUgKTtcbiAgLy8gbm90IGEgcGVyY2VudCBsaWtlICcxMDAlJywgYW5kIGEgbnVtYmVyXG4gIHZhciBpc1ZhbGlkID0gdmFsdWUuaW5kZXhPZignJScpID09IC0xICYmICFpc05hTiggbnVtICk7XG4gIHJldHVybiBpc1ZhbGlkICYmIG51bTtcbn1cblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnZhciBsb2dFcnJvciA9IHR5cGVvZiBjb25zb2xlID09ICd1bmRlZmluZWQnID8gbm9vcCA6XG4gIGZ1bmN0aW9uKCBtZXNzYWdlICkge1xuICAgIGNvbnNvbGUuZXJyb3IoIG1lc3NhZ2UgKTtcbiAgfTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gbWVhc3VyZW1lbnRzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnZhciBtZWFzdXJlbWVudHMgPSBbXG4gICdwYWRkaW5nTGVmdCcsXG4gICdwYWRkaW5nUmlnaHQnLFxuICAncGFkZGluZ1RvcCcsXG4gICdwYWRkaW5nQm90dG9tJyxcbiAgJ21hcmdpbkxlZnQnLFxuICAnbWFyZ2luUmlnaHQnLFxuICAnbWFyZ2luVG9wJyxcbiAgJ21hcmdpbkJvdHRvbScsXG4gICdib3JkZXJMZWZ0V2lkdGgnLFxuICAnYm9yZGVyUmlnaHRXaWR0aCcsXG4gICdib3JkZXJUb3BXaWR0aCcsXG4gICdib3JkZXJCb3R0b21XaWR0aCdcbl07XG5cbnZhciBtZWFzdXJlbWVudHNMZW5ndGggPSBtZWFzdXJlbWVudHMubGVuZ3RoO1xuXG5mdW5jdGlvbiBnZXRaZXJvU2l6ZSgpIHtcbiAgdmFyIHNpemUgPSB7XG4gICAgd2lkdGg6IDAsXG4gICAgaGVpZ2h0OiAwLFxuICAgIGlubmVyV2lkdGg6IDAsXG4gICAgaW5uZXJIZWlnaHQ6IDAsXG4gICAgb3V0ZXJXaWR0aDogMCxcbiAgICBvdXRlckhlaWdodDogMFxuICB9O1xuICBmb3IgKCB2YXIgaT0wOyBpIDwgbWVhc3VyZW1lbnRzTGVuZ3RoOyBpKysgKSB7XG4gICAgdmFyIG1lYXN1cmVtZW50ID0gbWVhc3VyZW1lbnRzW2ldO1xuICAgIHNpemVbIG1lYXN1cmVtZW50IF0gPSAwO1xuICB9XG4gIHJldHVybiBzaXplO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBnZXRTdHlsZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vKipcbiAqIGdldFN0eWxlLCBnZXQgc3R5bGUgb2YgZWxlbWVudCwgY2hlY2sgZm9yIEZpcmVmb3ggYnVnXG4gKiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD01NDgzOTdcbiAqL1xuZnVuY3Rpb24gZ2V0U3R5bGUoIGVsZW0gKSB7XG4gIHZhciBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoIGVsZW0gKTtcbiAgaWYgKCAhc3R5bGUgKSB7XG4gICAgbG9nRXJyb3IoICdTdHlsZSByZXR1cm5lZCAnICsgc3R5bGUgK1xuICAgICAgJy4gQXJlIHlvdSBydW5uaW5nIHRoaXMgY29kZSBpbiBhIGhpZGRlbiBpZnJhbWUgb24gRmlyZWZveD8gJyArXG4gICAgICAnU2VlIGh0dHBzOi8vYml0Lmx5L2dldHNpemVidWcxJyApO1xuICB9XG4gIHJldHVybiBzdHlsZTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gc2V0dXAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxudmFyIGlzU2V0dXAgPSBmYWxzZTtcblxudmFyIGlzQm94U2l6ZU91dGVyO1xuXG4vKipcbiAqIHNldHVwXG4gKiBjaGVjayBpc0JveFNpemVyT3V0ZXJcbiAqIGRvIG9uIGZpcnN0IGdldFNpemUoKSByYXRoZXIgdGhhbiBvbiBwYWdlIGxvYWQgZm9yIEZpcmVmb3ggYnVnXG4gKi9cbmZ1bmN0aW9uIHNldHVwKCkge1xuICAvLyBzZXR1cCBvbmNlXG4gIGlmICggaXNTZXR1cCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaXNTZXR1cCA9IHRydWU7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gYm94IHNpemluZyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4gIC8qKlxuICAgKiBDaHJvbWUgJiBTYWZhcmkgbWVhc3VyZSB0aGUgb3V0ZXItd2lkdGggb24gc3R5bGUud2lkdGggb24gYm9yZGVyLWJveCBlbGVtc1xuICAgKiBJRTExICYgRmlyZWZveDwyOSBtZWFzdXJlcyB0aGUgaW5uZXItd2lkdGhcbiAgICovXG4gIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZGl2LnN0eWxlLndpZHRoID0gJzIwMHB4JztcbiAgZGl2LnN0eWxlLnBhZGRpbmcgPSAnMXB4IDJweCAzcHggNHB4JztcbiAgZGl2LnN0eWxlLmJvcmRlclN0eWxlID0gJ3NvbGlkJztcbiAgZGl2LnN0eWxlLmJvcmRlcldpZHRoID0gJzFweCAycHggM3B4IDRweCc7XG4gIGRpdi5zdHlsZS5ib3hTaXppbmcgPSAnYm9yZGVyLWJveCc7XG5cbiAgdmFyIGJvZHkgPSBkb2N1bWVudC5ib2R5IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgYm9keS5hcHBlbmRDaGlsZCggZGl2ICk7XG4gIHZhciBzdHlsZSA9IGdldFN0eWxlKCBkaXYgKTtcbiAgLy8gcm91bmQgdmFsdWUgZm9yIGJyb3dzZXIgem9vbS4gZGVzYW5kcm8vbWFzb25yeSM5MjhcbiAgaXNCb3hTaXplT3V0ZXIgPSBNYXRoLnJvdW5kKCBnZXRTdHlsZVNpemUoIHN0eWxlLndpZHRoICkgKSA9PSAyMDA7XG4gIGdldFNpemUuaXNCb3hTaXplT3V0ZXIgPSBpc0JveFNpemVPdXRlcjtcblxuICBib2R5LnJlbW92ZUNoaWxkKCBkaXYgKTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZ2V0U2l6ZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5mdW5jdGlvbiBnZXRTaXplKCBlbGVtICkge1xuICBzZXR1cCgpO1xuXG4gIC8vIHVzZSBxdWVyeVNlbGV0b3IgaWYgZWxlbSBpcyBzdHJpbmdcbiAgaWYgKCB0eXBlb2YgZWxlbSA9PSAnc3RyaW5nJyApIHtcbiAgICBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciggZWxlbSApO1xuICB9XG5cbiAgLy8gZG8gbm90IHByb2NlZWQgb24gbm9uLW9iamVjdHNcbiAgaWYgKCAhZWxlbSB8fCB0eXBlb2YgZWxlbSAhPSAnb2JqZWN0JyB8fCAhZWxlbS5ub2RlVHlwZSApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgc3R5bGUgPSBnZXRTdHlsZSggZWxlbSApO1xuXG4gIC8vIGlmIGhpZGRlbiwgZXZlcnl0aGluZyBpcyAwXG4gIGlmICggc3R5bGUuZGlzcGxheSA9PSAnbm9uZScgKSB7XG4gICAgcmV0dXJuIGdldFplcm9TaXplKCk7XG4gIH1cblxuICB2YXIgc2l6ZSA9IHt9O1xuICBzaXplLndpZHRoID0gZWxlbS5vZmZzZXRXaWR0aDtcbiAgc2l6ZS5oZWlnaHQgPSBlbGVtLm9mZnNldEhlaWdodDtcblxuICB2YXIgaXNCb3JkZXJCb3ggPSBzaXplLmlzQm9yZGVyQm94ID0gc3R5bGUuYm94U2l6aW5nID09ICdib3JkZXItYm94JztcblxuICAvLyBnZXQgYWxsIG1lYXN1cmVtZW50c1xuICBmb3IgKCB2YXIgaT0wOyBpIDwgbWVhc3VyZW1lbnRzTGVuZ3RoOyBpKysgKSB7XG4gICAgdmFyIG1lYXN1cmVtZW50ID0gbWVhc3VyZW1lbnRzW2ldO1xuICAgIHZhciB2YWx1ZSA9IHN0eWxlWyBtZWFzdXJlbWVudCBdO1xuICAgIHZhciBudW0gPSBwYXJzZUZsb2F0KCB2YWx1ZSApO1xuICAgIC8vIGFueSAnYXV0bycsICdtZWRpdW0nIHZhbHVlIHdpbGwgYmUgMFxuICAgIHNpemVbIG1lYXN1cmVtZW50IF0gPSAhaXNOYU4oIG51bSApID8gbnVtIDogMDtcbiAgfVxuXG4gIHZhciBwYWRkaW5nV2lkdGggPSBzaXplLnBhZGRpbmdMZWZ0ICsgc2l6ZS5wYWRkaW5nUmlnaHQ7XG4gIHZhciBwYWRkaW5nSGVpZ2h0ID0gc2l6ZS5wYWRkaW5nVG9wICsgc2l6ZS5wYWRkaW5nQm90dG9tO1xuICB2YXIgbWFyZ2luV2lkdGggPSBzaXplLm1hcmdpbkxlZnQgKyBzaXplLm1hcmdpblJpZ2h0O1xuICB2YXIgbWFyZ2luSGVpZ2h0ID0gc2l6ZS5tYXJnaW5Ub3AgKyBzaXplLm1hcmdpbkJvdHRvbTtcbiAgdmFyIGJvcmRlcldpZHRoID0gc2l6ZS5ib3JkZXJMZWZ0V2lkdGggKyBzaXplLmJvcmRlclJpZ2h0V2lkdGg7XG4gIHZhciBib3JkZXJIZWlnaHQgPSBzaXplLmJvcmRlclRvcFdpZHRoICsgc2l6ZS5ib3JkZXJCb3R0b21XaWR0aDtcblxuICB2YXIgaXNCb3JkZXJCb3hTaXplT3V0ZXIgPSBpc0JvcmRlckJveCAmJiBpc0JveFNpemVPdXRlcjtcblxuICAvLyBvdmVyd3JpdGUgd2lkdGggYW5kIGhlaWdodCBpZiB3ZSBjYW4gZ2V0IGl0IGZyb20gc3R5bGVcbiAgdmFyIHN0eWxlV2lkdGggPSBnZXRTdHlsZVNpemUoIHN0eWxlLndpZHRoICk7XG4gIGlmICggc3R5bGVXaWR0aCAhPT0gZmFsc2UgKSB7XG4gICAgc2l6ZS53aWR0aCA9IHN0eWxlV2lkdGggK1xuICAgICAgLy8gYWRkIHBhZGRpbmcgYW5kIGJvcmRlciB1bmxlc3MgaXQncyBhbHJlYWR5IGluY2x1ZGluZyBpdFxuICAgICAgKCBpc0JvcmRlckJveFNpemVPdXRlciA/IDAgOiBwYWRkaW5nV2lkdGggKyBib3JkZXJXaWR0aCApO1xuICB9XG5cbiAgdmFyIHN0eWxlSGVpZ2h0ID0gZ2V0U3R5bGVTaXplKCBzdHlsZS5oZWlnaHQgKTtcbiAgaWYgKCBzdHlsZUhlaWdodCAhPT0gZmFsc2UgKSB7XG4gICAgc2l6ZS5oZWlnaHQgPSBzdHlsZUhlaWdodCArXG4gICAgICAvLyBhZGQgcGFkZGluZyBhbmQgYm9yZGVyIHVubGVzcyBpdCdzIGFscmVhZHkgaW5jbHVkaW5nIGl0XG4gICAgICAoIGlzQm9yZGVyQm94U2l6ZU91dGVyID8gMCA6IHBhZGRpbmdIZWlnaHQgKyBib3JkZXJIZWlnaHQgKTtcbiAgfVxuXG4gIHNpemUuaW5uZXJXaWR0aCA9IHNpemUud2lkdGggLSAoIHBhZGRpbmdXaWR0aCArIGJvcmRlcldpZHRoICk7XG4gIHNpemUuaW5uZXJIZWlnaHQgPSBzaXplLmhlaWdodCAtICggcGFkZGluZ0hlaWdodCArIGJvcmRlckhlaWdodCApO1xuXG4gIHNpemUub3V0ZXJXaWR0aCA9IHNpemUud2lkdGggKyBtYXJnaW5XaWR0aDtcbiAgc2l6ZS5vdXRlckhlaWdodCA9IHNpemUuaGVpZ2h0ICsgbWFyZ2luSGVpZ2h0O1xuXG4gIHJldHVybiBzaXplO1xufVxuXG5yZXR1cm4gZ2V0U2l6ZTtcblxufSk7XG4iLCIvKiFcbiAqIGltYWdlc0xvYWRlZCB2NS4wLjBcbiAqIEphdmFTY3JpcHQgaXMgYWxsIGxpa2UgXCJZb3UgaW1hZ2VzIGFyZSBkb25lIHlldCBvciB3aGF0P1wiXG4gKiBNSVQgTGljZW5zZVxuICovXG5cbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSggd2luZG93LCByZXF1aXJlKCdldi1lbWl0dGVyJykgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIHdpbmRvdy5pbWFnZXNMb2FkZWQgPSBmYWN0b3J5KCB3aW5kb3csIHdpbmRvdy5FdkVtaXR0ZXIgKTtcbiAgfVxuXG59ICkoIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogdGhpcyxcbiAgICBmdW5jdGlvbiBmYWN0b3J5KCB3aW5kb3csIEV2RW1pdHRlciApIHtcblxubGV0ICQgPSB3aW5kb3cualF1ZXJ5O1xubGV0IGNvbnNvbGUgPSB3aW5kb3cuY29uc29sZTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gaGVscGVycyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vLyB0dXJuIGVsZW1lbnQgb3Igbm9kZUxpc3QgaW50byBhbiBhcnJheVxuZnVuY3Rpb24gbWFrZUFycmF5KCBvYmogKSB7XG4gIC8vIHVzZSBvYmplY3QgaWYgYWxyZWFkeSBhbiBhcnJheVxuICBpZiAoIEFycmF5LmlzQXJyYXkoIG9iaiApICkgcmV0dXJuIG9iajtcblxuICBsZXQgaXNBcnJheUxpa2UgPSB0eXBlb2Ygb2JqID09ICdvYmplY3QnICYmIHR5cGVvZiBvYmoubGVuZ3RoID09ICdudW1iZXInO1xuICAvLyBjb252ZXJ0IG5vZGVMaXN0IHRvIGFycmF5XG4gIGlmICggaXNBcnJheUxpa2UgKSByZXR1cm4gWyAuLi5vYmogXTtcblxuICAvLyBhcnJheSBvZiBzaW5nbGUgaW5kZXhcbiAgcmV0dXJuIFsgb2JqIF07XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGltYWdlc0xvYWRlZCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vKipcbiAqIEBwYXJhbSB7W0FycmF5LCBFbGVtZW50LCBOb2RlTGlzdCwgU3RyaW5nXX0gZWxlbVxuICogQHBhcmFtIHtbT2JqZWN0LCBGdW5jdGlvbl19IG9wdGlvbnMgLSBpZiBmdW5jdGlvbiwgdXNlIGFzIGNhbGxiYWNrXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvbkFsd2F5cyAtIGNhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7SW1hZ2VzTG9hZGVkfVxuICovXG5mdW5jdGlvbiBJbWFnZXNMb2FkZWQoIGVsZW0sIG9wdGlvbnMsIG9uQWx3YXlzICkge1xuICAvLyBjb2VyY2UgSW1hZ2VzTG9hZGVkKCkgd2l0aG91dCBuZXcsIHRvIGJlIG5ldyBJbWFnZXNMb2FkZWQoKVxuICBpZiAoICEoIHRoaXMgaW5zdGFuY2VvZiBJbWFnZXNMb2FkZWQgKSApIHtcbiAgICByZXR1cm4gbmV3IEltYWdlc0xvYWRlZCggZWxlbSwgb3B0aW9ucywgb25BbHdheXMgKTtcbiAgfVxuICAvLyB1c2UgZWxlbSBhcyBzZWxlY3RvciBzdHJpbmdcbiAgbGV0IHF1ZXJ5RWxlbSA9IGVsZW07XG4gIGlmICggdHlwZW9mIGVsZW0gPT0gJ3N0cmluZycgKSB7XG4gICAgcXVlcnlFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCggZWxlbSApO1xuICB9XG4gIC8vIGJhaWwgaWYgYmFkIGVsZW1lbnRcbiAgaWYgKCAhcXVlcnlFbGVtICkge1xuICAgIGNvbnNvbGUuZXJyb3IoYEJhZCBlbGVtZW50IGZvciBpbWFnZXNMb2FkZWQgJHtxdWVyeUVsZW0gfHwgZWxlbX1gKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB0aGlzLmVsZW1lbnRzID0gbWFrZUFycmF5KCBxdWVyeUVsZW0gKTtcbiAgdGhpcy5vcHRpb25zID0ge307XG4gIC8vIHNoaWZ0IGFyZ3VtZW50cyBpZiBubyBvcHRpb25zIHNldFxuICBpZiAoIHR5cGVvZiBvcHRpb25zID09ICdmdW5jdGlvbicgKSB7XG4gICAgb25BbHdheXMgPSBvcHRpb25zO1xuICB9IGVsc2Uge1xuICAgIE9iamVjdC5hc3NpZ24oIHRoaXMub3B0aW9ucywgb3B0aW9ucyApO1xuICB9XG5cbiAgaWYgKCBvbkFsd2F5cyApIHRoaXMub24oICdhbHdheXMnLCBvbkFsd2F5cyApO1xuXG4gIHRoaXMuZ2V0SW1hZ2VzKCk7XG4gIC8vIGFkZCBqUXVlcnkgRGVmZXJyZWQgb2JqZWN0XG4gIGlmICggJCApIHRoaXMuanFEZWZlcnJlZCA9IG5ldyAkLkRlZmVycmVkKCk7XG5cbiAgLy8gSEFDSyBjaGVjayBhc3luYyB0byBhbGxvdyB0aW1lIHRvIGJpbmQgbGlzdGVuZXJzXG4gIHNldFRpbWVvdXQoIHRoaXMuY2hlY2suYmluZCggdGhpcyApICk7XG59XG5cbkltYWdlc0xvYWRlZC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBFdkVtaXR0ZXIucHJvdG90eXBlICk7XG5cbkltYWdlc0xvYWRlZC5wcm90b3R5cGUuZ2V0SW1hZ2VzID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuaW1hZ2VzID0gW107XG5cbiAgLy8gZmlsdGVyICYgZmluZCBpdGVtcyBpZiB3ZSBoYXZlIGFuIGl0ZW0gc2VsZWN0b3JcbiAgdGhpcy5lbGVtZW50cy5mb3JFYWNoKCB0aGlzLmFkZEVsZW1lbnRJbWFnZXMsIHRoaXMgKTtcbn07XG5cbmNvbnN0IGVsZW1lbnROb2RlVHlwZXMgPSBbIDEsIDksIDExIF07XG5cbi8qKlxuICogQHBhcmFtIHtOb2RlfSBlbGVtXG4gKi9cbkltYWdlc0xvYWRlZC5wcm90b3R5cGUuYWRkRWxlbWVudEltYWdlcyA9IGZ1bmN0aW9uKCBlbGVtICkge1xuICAvLyBmaWx0ZXIgc2libGluZ3NcbiAgaWYgKCBlbGVtLm5vZGVOYW1lID09PSAnSU1HJyApIHtcbiAgICB0aGlzLmFkZEltYWdlKCBlbGVtICk7XG4gIH1cbiAgLy8gZ2V0IGJhY2tncm91bmQgaW1hZ2Ugb24gZWxlbWVudFxuICBpZiAoIHRoaXMub3B0aW9ucy5iYWNrZ3JvdW5kID09PSB0cnVlICkge1xuICAgIHRoaXMuYWRkRWxlbWVudEJhY2tncm91bmRJbWFnZXMoIGVsZW0gKTtcbiAgfVxuXG4gIC8vIGZpbmQgY2hpbGRyZW5cbiAgLy8gbm8gbm9uLWVsZW1lbnQgbm9kZXMsICMxNDNcbiAgbGV0IHsgbm9kZVR5cGUgfSA9IGVsZW07XG4gIGlmICggIW5vZGVUeXBlIHx8ICFlbGVtZW50Tm9kZVR5cGVzLmluY2x1ZGVzKCBub2RlVHlwZSApICkgcmV0dXJuO1xuXG4gIGxldCBjaGlsZEltZ3MgPSBlbGVtLnF1ZXJ5U2VsZWN0b3JBbGwoJ2ltZycpO1xuICAvLyBjb25jYXQgY2hpbGRFbGVtcyB0byBmaWx0ZXJGb3VuZCBhcnJheVxuICBmb3IgKCBsZXQgaW1nIG9mIGNoaWxkSW1ncyApIHtcbiAgICB0aGlzLmFkZEltYWdlKCBpbWcgKTtcbiAgfVxuXG4gIC8vIGdldCBjaGlsZCBiYWNrZ3JvdW5kIGltYWdlc1xuICBpZiAoIHR5cGVvZiB0aGlzLm9wdGlvbnMuYmFja2dyb3VuZCA9PSAnc3RyaW5nJyApIHtcbiAgICBsZXQgY2hpbGRyZW4gPSBlbGVtLnF1ZXJ5U2VsZWN0b3JBbGwoIHRoaXMub3B0aW9ucy5iYWNrZ3JvdW5kICk7XG4gICAgZm9yICggbGV0IGNoaWxkIG9mIGNoaWxkcmVuICkge1xuICAgICAgdGhpcy5hZGRFbGVtZW50QmFja2dyb3VuZEltYWdlcyggY2hpbGQgKTtcbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IHJlVVJMID0gL3VybFxcKChbJ1wiXSk/KC4qPylcXDFcXCkvZ2k7XG5cbkltYWdlc0xvYWRlZC5wcm90b3R5cGUuYWRkRWxlbWVudEJhY2tncm91bmRJbWFnZXMgPSBmdW5jdGlvbiggZWxlbSApIHtcbiAgbGV0IHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZSggZWxlbSApO1xuICAvLyBGaXJlZm94IHJldHVybnMgbnVsbCBpZiBpbiBhIGhpZGRlbiBpZnJhbWUgaHR0cHM6Ly9idWd6aWwubGEvNTQ4Mzk3XG4gIGlmICggIXN0eWxlICkgcmV0dXJuO1xuXG4gIC8vIGdldCB1cmwgaW5zaWRlIHVybChcIi4uLlwiKVxuICBsZXQgbWF0Y2hlcyA9IHJlVVJMLmV4ZWMoIHN0eWxlLmJhY2tncm91bmRJbWFnZSApO1xuICB3aGlsZSAoIG1hdGNoZXMgIT09IG51bGwgKSB7XG4gICAgbGV0IHVybCA9IG1hdGNoZXMgJiYgbWF0Y2hlc1syXTtcbiAgICBpZiAoIHVybCApIHtcbiAgICAgIHRoaXMuYWRkQmFja2dyb3VuZCggdXJsLCBlbGVtICk7XG4gICAgfVxuICAgIG1hdGNoZXMgPSByZVVSTC5leGVjKCBzdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgKTtcbiAgfVxufTtcblxuLyoqXG4gKiBAcGFyYW0ge0ltYWdlfSBpbWdcbiAqL1xuSW1hZ2VzTG9hZGVkLnByb3RvdHlwZS5hZGRJbWFnZSA9IGZ1bmN0aW9uKCBpbWcgKSB7XG4gIGxldCBsb2FkaW5nSW1hZ2UgPSBuZXcgTG9hZGluZ0ltYWdlKCBpbWcgKTtcbiAgdGhpcy5pbWFnZXMucHVzaCggbG9hZGluZ0ltYWdlICk7XG59O1xuXG5JbWFnZXNMb2FkZWQucHJvdG90eXBlLmFkZEJhY2tncm91bmQgPSBmdW5jdGlvbiggdXJsLCBlbGVtICkge1xuICBsZXQgYmFja2dyb3VuZCA9IG5ldyBCYWNrZ3JvdW5kKCB1cmwsIGVsZW0gKTtcbiAgdGhpcy5pbWFnZXMucHVzaCggYmFja2dyb3VuZCApO1xufTtcblxuSW1hZ2VzTG9hZGVkLnByb3RvdHlwZS5jaGVjayA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnByb2dyZXNzZWRDb3VudCA9IDA7XG4gIHRoaXMuaGFzQW55QnJva2VuID0gZmFsc2U7XG4gIC8vIGNvbXBsZXRlIGlmIG5vIGltYWdlc1xuICBpZiAoICF0aGlzLmltYWdlcy5sZW5ndGggKSB7XG4gICAgdGhpcy5jb21wbGV0ZSgpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLXN0eWxlICovXG4gIGxldCBvblByb2dyZXNzID0gKCBpbWFnZSwgZWxlbSwgbWVzc2FnZSApID0+IHtcbiAgICAvLyBIQUNLIC0gQ2hyb21lIHRyaWdnZXJzIGV2ZW50IGJlZm9yZSBvYmplY3QgcHJvcGVydGllcyBoYXZlIGNoYW5nZWQuICM4M1xuICAgIHNldFRpbWVvdXQoICgpID0+IHtcbiAgICAgIHRoaXMucHJvZ3Jlc3MoIGltYWdlLCBlbGVtLCBtZXNzYWdlICk7XG4gICAgfSApO1xuICB9O1xuXG4gIHRoaXMuaW1hZ2VzLmZvckVhY2goIGZ1bmN0aW9uKCBsb2FkaW5nSW1hZ2UgKSB7XG4gICAgbG9hZGluZ0ltYWdlLm9uY2UoICdwcm9ncmVzcycsIG9uUHJvZ3Jlc3MgKTtcbiAgICBsb2FkaW5nSW1hZ2UuY2hlY2soKTtcbiAgfSApO1xufTtcblxuSW1hZ2VzTG9hZGVkLnByb3RvdHlwZS5wcm9ncmVzcyA9IGZ1bmN0aW9uKCBpbWFnZSwgZWxlbSwgbWVzc2FnZSApIHtcbiAgdGhpcy5wcm9ncmVzc2VkQ291bnQrKztcbiAgdGhpcy5oYXNBbnlCcm9rZW4gPSB0aGlzLmhhc0FueUJyb2tlbiB8fCAhaW1hZ2UuaXNMb2FkZWQ7XG4gIC8vIHByb2dyZXNzIGV2ZW50XG4gIHRoaXMuZW1pdEV2ZW50KCAncHJvZ3Jlc3MnLCBbIHRoaXMsIGltYWdlLCBlbGVtIF0gKTtcbiAgaWYgKCB0aGlzLmpxRGVmZXJyZWQgJiYgdGhpcy5qcURlZmVycmVkLm5vdGlmeSApIHtcbiAgICB0aGlzLmpxRGVmZXJyZWQubm90aWZ5KCB0aGlzLCBpbWFnZSApO1xuICB9XG4gIC8vIGNoZWNrIGlmIGNvbXBsZXRlZFxuICBpZiAoIHRoaXMucHJvZ3Jlc3NlZENvdW50ID09PSB0aGlzLmltYWdlcy5sZW5ndGggKSB7XG4gICAgdGhpcy5jb21wbGV0ZSgpO1xuICB9XG5cbiAgaWYgKCB0aGlzLm9wdGlvbnMuZGVidWcgJiYgY29uc29sZSApIHtcbiAgICBjb25zb2xlLmxvZyggYHByb2dyZXNzOiAke21lc3NhZ2V9YCwgaW1hZ2UsIGVsZW0gKTtcbiAgfVxufTtcblxuSW1hZ2VzTG9hZGVkLnByb3RvdHlwZS5jb21wbGV0ZSA9IGZ1bmN0aW9uKCkge1xuICBsZXQgZXZlbnROYW1lID0gdGhpcy5oYXNBbnlCcm9rZW4gPyAnZmFpbCcgOiAnZG9uZSc7XG4gIHRoaXMuaXNDb21wbGV0ZSA9IHRydWU7XG4gIHRoaXMuZW1pdEV2ZW50KCBldmVudE5hbWUsIFsgdGhpcyBdICk7XG4gIHRoaXMuZW1pdEV2ZW50KCAnYWx3YXlzJywgWyB0aGlzIF0gKTtcbiAgaWYgKCB0aGlzLmpxRGVmZXJyZWQgKSB7XG4gICAgbGV0IGpxTWV0aG9kID0gdGhpcy5oYXNBbnlCcm9rZW4gPyAncmVqZWN0JyA6ICdyZXNvbHZlJztcbiAgICB0aGlzLmpxRGVmZXJyZWRbIGpxTWV0aG9kIF0oIHRoaXMgKTtcbiAgfVxufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbmZ1bmN0aW9uIExvYWRpbmdJbWFnZSggaW1nICkge1xuICB0aGlzLmltZyA9IGltZztcbn1cblxuTG9hZGluZ0ltYWdlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIEV2RW1pdHRlci5wcm90b3R5cGUgKTtcblxuTG9hZGluZ0ltYWdlLnByb3RvdHlwZS5jaGVjayA9IGZ1bmN0aW9uKCkge1xuICAvLyBJZiBjb21wbGV0ZSBpcyB0cnVlIGFuZCBicm93c2VyIHN1cHBvcnRzIG5hdHVyYWwgc2l6ZXMsXG4gIC8vIHRyeSB0byBjaGVjayBmb3IgaW1hZ2Ugc3RhdHVzIG1hbnVhbGx5LlxuICBsZXQgaXNDb21wbGV0ZSA9IHRoaXMuZ2V0SXNJbWFnZUNvbXBsZXRlKCk7XG4gIGlmICggaXNDb21wbGV0ZSApIHtcbiAgICAvLyByZXBvcnQgYmFzZWQgb24gbmF0dXJhbFdpZHRoXG4gICAgdGhpcy5jb25maXJtKCB0aGlzLmltZy5uYXR1cmFsV2lkdGggIT09IDAsICduYXR1cmFsV2lkdGgnICk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gSWYgbm9uZSBvZiB0aGUgY2hlY2tzIGFib3ZlIG1hdGNoZWQsIHNpbXVsYXRlIGxvYWRpbmcgb24gZGV0YWNoZWQgZWxlbWVudC5cbiAgdGhpcy5wcm94eUltYWdlID0gbmV3IEltYWdlKCk7XG4gIC8vIGFkZCBjcm9zc09yaWdpbiBhdHRyaWJ1dGUuICMyMDRcbiAgaWYgKCB0aGlzLmltZy5jcm9zc09yaWdpbiApIHtcbiAgICB0aGlzLnByb3h5SW1hZ2UuY3Jvc3NPcmlnaW4gPSB0aGlzLmltZy5jcm9zc09yaWdpbjtcbiAgfVxuICB0aGlzLnByb3h5SW1hZ2UuYWRkRXZlbnRMaXN0ZW5lciggJ2xvYWQnLCB0aGlzICk7XG4gIHRoaXMucHJveHlJbWFnZS5hZGRFdmVudExpc3RlbmVyKCAnZXJyb3InLCB0aGlzICk7XG4gIC8vIGJpbmQgdG8gaW1hZ2UgYXMgd2VsbCBmb3IgRmlyZWZveC4gIzE5MVxuICB0aGlzLmltZy5hZGRFdmVudExpc3RlbmVyKCAnbG9hZCcsIHRoaXMgKTtcbiAgdGhpcy5pbWcuYWRkRXZlbnRMaXN0ZW5lciggJ2Vycm9yJywgdGhpcyApO1xuICB0aGlzLnByb3h5SW1hZ2Uuc3JjID0gdGhpcy5pbWcuY3VycmVudFNyYyB8fCB0aGlzLmltZy5zcmM7XG59O1xuXG5Mb2FkaW5nSW1hZ2UucHJvdG90eXBlLmdldElzSW1hZ2VDb21wbGV0ZSA9IGZ1bmN0aW9uKCkge1xuICAvLyBjaGVjayBmb3Igbm9uLXplcm8sIG5vbi11bmRlZmluZWQgbmF0dXJhbFdpZHRoXG4gIC8vIGZpeGVzIFNhZmFyaStJbmZpbml0ZVNjcm9sbCtNYXNvbnJ5IGJ1ZyBpbmZpbml0ZS1zY3JvbGwjNjcxXG4gIHJldHVybiB0aGlzLmltZy5jb21wbGV0ZSAmJiB0aGlzLmltZy5uYXR1cmFsV2lkdGg7XG59O1xuXG5Mb2FkaW5nSW1hZ2UucHJvdG90eXBlLmNvbmZpcm0gPSBmdW5jdGlvbiggaXNMb2FkZWQsIG1lc3NhZ2UgKSB7XG4gIHRoaXMuaXNMb2FkZWQgPSBpc0xvYWRlZDtcbiAgbGV0IHsgcGFyZW50Tm9kZSB9ID0gdGhpcy5pbWc7XG4gIC8vIGVtaXQgcHJvZ3Jlc3Mgd2l0aCBwYXJlbnQgPHBpY3R1cmU+IG9yIHNlbGYgPGltZz5cbiAgbGV0IGVsZW0gPSBwYXJlbnROb2RlLm5vZGVOYW1lID09PSAnUElDVFVSRScgPyBwYXJlbnROb2RlIDogdGhpcy5pbWc7XG4gIHRoaXMuZW1pdEV2ZW50KCAncHJvZ3Jlc3MnLCBbIHRoaXMsIGVsZW0sIG1lc3NhZ2UgXSApO1xufTtcblxuLy8gLS0tLS0gZXZlbnRzIC0tLS0tIC8vXG5cbi8vIHRyaWdnZXIgc3BlY2lmaWVkIGhhbmRsZXIgZm9yIGV2ZW50IHR5cGVcbkxvYWRpbmdJbWFnZS5wcm90b3R5cGUuaGFuZGxlRXZlbnQgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIGxldCBtZXRob2QgPSAnb24nICsgZXZlbnQudHlwZTtcbiAgaWYgKCB0aGlzWyBtZXRob2QgXSApIHtcbiAgICB0aGlzWyBtZXRob2QgXSggZXZlbnQgKTtcbiAgfVxufTtcblxuTG9hZGluZ0ltYWdlLnByb3RvdHlwZS5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5jb25maXJtKCB0cnVlLCAnb25sb2FkJyApO1xuICB0aGlzLnVuYmluZEV2ZW50cygpO1xufTtcblxuTG9hZGluZ0ltYWdlLnByb3RvdHlwZS5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuY29uZmlybSggZmFsc2UsICdvbmVycm9yJyApO1xuICB0aGlzLnVuYmluZEV2ZW50cygpO1xufTtcblxuTG9hZGluZ0ltYWdlLnByb3RvdHlwZS51bmJpbmRFdmVudHMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5wcm94eUltYWdlLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdsb2FkJywgdGhpcyApO1xuICB0aGlzLnByb3h5SW1hZ2UucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2Vycm9yJywgdGhpcyApO1xuICB0aGlzLmltZy5yZW1vdmVFdmVudExpc3RlbmVyKCAnbG9hZCcsIHRoaXMgKTtcbiAgdGhpcy5pbWcucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2Vycm9yJywgdGhpcyApO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gQmFja2dyb3VuZCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5mdW5jdGlvbiBCYWNrZ3JvdW5kKCB1cmwsIGVsZW1lbnQgKSB7XG4gIHRoaXMudXJsID0gdXJsO1xuICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICB0aGlzLmltZyA9IG5ldyBJbWFnZSgpO1xufVxuXG4vLyBpbmhlcml0IExvYWRpbmdJbWFnZSBwcm90b3R5cGVcbkJhY2tncm91bmQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggTG9hZGluZ0ltYWdlLnByb3RvdHlwZSApO1xuXG5CYWNrZ3JvdW5kLnByb3RvdHlwZS5jaGVjayA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmltZy5hZGRFdmVudExpc3RlbmVyKCAnbG9hZCcsIHRoaXMgKTtcbiAgdGhpcy5pbWcuYWRkRXZlbnRMaXN0ZW5lciggJ2Vycm9yJywgdGhpcyApO1xuICB0aGlzLmltZy5zcmMgPSB0aGlzLnVybDtcbiAgLy8gY2hlY2sgaWYgaW1hZ2UgaXMgYWxyZWFkeSBjb21wbGV0ZVxuICBsZXQgaXNDb21wbGV0ZSA9IHRoaXMuZ2V0SXNJbWFnZUNvbXBsZXRlKCk7XG4gIGlmICggaXNDb21wbGV0ZSApIHtcbiAgICB0aGlzLmNvbmZpcm0oIHRoaXMuaW1nLm5hdHVyYWxXaWR0aCAhPT0gMCwgJ25hdHVyYWxXaWR0aCcgKTtcbiAgICB0aGlzLnVuYmluZEV2ZW50cygpO1xuICB9XG59O1xuXG5CYWNrZ3JvdW5kLnByb3RvdHlwZS51bmJpbmRFdmVudHMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5pbWcucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2xvYWQnLCB0aGlzICk7XG4gIHRoaXMuaW1nLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdlcnJvcicsIHRoaXMgKTtcbn07XG5cbkJhY2tncm91bmQucHJvdG90eXBlLmNvbmZpcm0gPSBmdW5jdGlvbiggaXNMb2FkZWQsIG1lc3NhZ2UgKSB7XG4gIHRoaXMuaXNMb2FkZWQgPSBpc0xvYWRlZDtcbiAgdGhpcy5lbWl0RXZlbnQoICdwcm9ncmVzcycsIFsgdGhpcywgdGhpcy5lbGVtZW50LCBtZXNzYWdlIF0gKTtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGpRdWVyeSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5JbWFnZXNMb2FkZWQubWFrZUpRdWVyeVBsdWdpbiA9IGZ1bmN0aW9uKCBqUXVlcnkgKSB7XG4gIGpRdWVyeSA9IGpRdWVyeSB8fCB3aW5kb3cualF1ZXJ5O1xuICBpZiAoICFqUXVlcnkgKSByZXR1cm47XG5cbiAgLy8gc2V0IGxvY2FsIHZhcmlhYmxlXG4gICQgPSBqUXVlcnk7XG4gIC8vICQoKS5pbWFnZXNMb2FkZWQoKVxuICAkLmZuLmltYWdlc0xvYWRlZCA9IGZ1bmN0aW9uKCBvcHRpb25zLCBvbkFsd2F5cyApIHtcbiAgICBsZXQgaW5zdGFuY2UgPSBuZXcgSW1hZ2VzTG9hZGVkKCB0aGlzLCBvcHRpb25zLCBvbkFsd2F5cyApO1xuICAgIHJldHVybiBpbnN0YW5jZS5qcURlZmVycmVkLnByb21pc2UoICQoIHRoaXMgKSApO1xuICB9O1xufTtcbi8vIHRyeSBtYWtpbmcgcGx1Z2luXG5JbWFnZXNMb2FkZWQubWFrZUpRdWVyeVBsdWdpbigpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxucmV0dXJuIEltYWdlc0xvYWRlZDtcblxufSApO1xuIiwiLyoqXG4gKiBFdkVtaXR0ZXIgdjIuMS4xXG4gKiBMaWwnIGV2ZW50IGVtaXR0ZXJcbiAqIE1JVCBMaWNlbnNlXG4gKi9cblxuKCBmdW5jdGlvbiggZ2xvYmFsLCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTIC0gQnJvd3NlcmlmeSwgV2VicGFja1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuICB9IGVsc2Uge1xuICAgIC8vIEJyb3dzZXIgZ2xvYmFsc1xuICAgIGdsb2JhbC5FdkVtaXR0ZXIgPSBmYWN0b3J5KCk7XG4gIH1cblxufSggdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IHRoaXMsIGZ1bmN0aW9uKCkge1xuXG5mdW5jdGlvbiBFdkVtaXR0ZXIoKSB7fVxuXG5sZXQgcHJvdG8gPSBFdkVtaXR0ZXIucHJvdG90eXBlO1xuXG5wcm90by5vbiA9IGZ1bmN0aW9uKCBldmVudE5hbWUsIGxpc3RlbmVyICkge1xuICBpZiAoICFldmVudE5hbWUgfHwgIWxpc3RlbmVyICkgcmV0dXJuIHRoaXM7XG5cbiAgLy8gc2V0IGV2ZW50cyBoYXNoXG4gIGxldCBldmVudHMgPSB0aGlzLl9ldmVudHMgPSB0aGlzLl9ldmVudHMgfHwge307XG4gIC8vIHNldCBsaXN0ZW5lcnMgYXJyYXlcbiAgbGV0IGxpc3RlbmVycyA9IGV2ZW50c1sgZXZlbnROYW1lIF0gPSBldmVudHNbIGV2ZW50TmFtZSBdIHx8IFtdO1xuICAvLyBvbmx5IGFkZCBvbmNlXG4gIGlmICggIWxpc3RlbmVycy5pbmNsdWRlcyggbGlzdGVuZXIgKSApIHtcbiAgICBsaXN0ZW5lcnMucHVzaCggbGlzdGVuZXIgKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxucHJvdG8ub25jZSA9IGZ1bmN0aW9uKCBldmVudE5hbWUsIGxpc3RlbmVyICkge1xuICBpZiAoICFldmVudE5hbWUgfHwgIWxpc3RlbmVyICkgcmV0dXJuIHRoaXM7XG5cbiAgLy8gYWRkIGV2ZW50XG4gIHRoaXMub24oIGV2ZW50TmFtZSwgbGlzdGVuZXIgKTtcbiAgLy8gc2V0IG9uY2UgZmxhZ1xuICAvLyBzZXQgb25jZUV2ZW50cyBoYXNoXG4gIGxldCBvbmNlRXZlbnRzID0gdGhpcy5fb25jZUV2ZW50cyA9IHRoaXMuX29uY2VFdmVudHMgfHwge307XG4gIC8vIHNldCBvbmNlTGlzdGVuZXJzIG9iamVjdFxuICBsZXQgb25jZUxpc3RlbmVycyA9IG9uY2VFdmVudHNbIGV2ZW50TmFtZSBdID0gb25jZUV2ZW50c1sgZXZlbnROYW1lIF0gfHwge307XG4gIC8vIHNldCBmbGFnXG4gIG9uY2VMaXN0ZW5lcnNbIGxpc3RlbmVyIF0gPSB0cnVlO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxucHJvdG8ub2ZmID0gZnVuY3Rpb24oIGV2ZW50TmFtZSwgbGlzdGVuZXIgKSB7XG4gIGxldCBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHMgJiYgdGhpcy5fZXZlbnRzWyBldmVudE5hbWUgXTtcbiAgaWYgKCAhbGlzdGVuZXJzIHx8ICFsaXN0ZW5lcnMubGVuZ3RoICkgcmV0dXJuIHRoaXM7XG5cbiAgbGV0IGluZGV4ID0gbGlzdGVuZXJzLmluZGV4T2YoIGxpc3RlbmVyICk7XG4gIGlmICggaW5kZXggIT0gLTEgKSB7XG4gICAgbGlzdGVuZXJzLnNwbGljZSggaW5kZXgsIDEgKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxucHJvdG8uZW1pdEV2ZW50ID0gZnVuY3Rpb24oIGV2ZW50TmFtZSwgYXJncyApIHtcbiAgbGV0IGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50cyAmJiB0aGlzLl9ldmVudHNbIGV2ZW50TmFtZSBdO1xuICBpZiAoICFsaXN0ZW5lcnMgfHwgIWxpc3RlbmVycy5sZW5ndGggKSByZXR1cm4gdGhpcztcblxuICAvLyBjb3B5IG92ZXIgdG8gYXZvaWQgaW50ZXJmZXJlbmNlIGlmIC5vZmYoKSBpbiBsaXN0ZW5lclxuICBsaXN0ZW5lcnMgPSBsaXN0ZW5lcnMuc2xpY2UoIDAgKTtcbiAgYXJncyA9IGFyZ3MgfHwgW107XG4gIC8vIG9uY2Ugc3R1ZmZcbiAgbGV0IG9uY2VMaXN0ZW5lcnMgPSB0aGlzLl9vbmNlRXZlbnRzICYmIHRoaXMuX29uY2VFdmVudHNbIGV2ZW50TmFtZSBdO1xuXG4gIGZvciAoIGxldCBsaXN0ZW5lciBvZiBsaXN0ZW5lcnMgKSB7XG4gICAgbGV0IGlzT25jZSA9IG9uY2VMaXN0ZW5lcnMgJiYgb25jZUxpc3RlbmVyc1sgbGlzdGVuZXIgXTtcbiAgICBpZiAoIGlzT25jZSApIHtcbiAgICAgIC8vIHJlbW92ZSBsaXN0ZW5lclxuICAgICAgLy8gcmVtb3ZlIGJlZm9yZSB0cmlnZ2VyIHRvIHByZXZlbnQgcmVjdXJzaW9uXG4gICAgICB0aGlzLm9mZiggZXZlbnROYW1lLCBsaXN0ZW5lciApO1xuICAgICAgLy8gdW5zZXQgb25jZSBmbGFnXG4gICAgICBkZWxldGUgb25jZUxpc3RlbmVyc1sgbGlzdGVuZXIgXTtcbiAgICB9XG4gICAgLy8gdHJpZ2dlciBsaXN0ZW5lclxuICAgIGxpc3RlbmVyLmFwcGx5KCB0aGlzLCBhcmdzICk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbnByb3RvLmFsbE9mZiA9IGZ1bmN0aW9uKCkge1xuICBkZWxldGUgdGhpcy5fZXZlbnRzO1xuICBkZWxldGUgdGhpcy5fb25jZUV2ZW50cztcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5yZXR1cm4gRXZFbWl0dGVyO1xuXG59ICkgKTtcbiIsIi8qIVxuICogTWFzb25yeSB2NC4yLjJcbiAqIENhc2NhZGluZyBncmlkIGxheW91dCBsaWJyYXJ5XG4gKiBodHRwczovL21hc29ucnkuZGVzYW5kcm8uY29tXG4gKiBNSVQgTGljZW5zZVxuICogYnkgRGF2aWQgRGVTYW5kcm9cbiAqL1xuXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICAvKiBqc2hpbnQgc3RyaWN0OiBmYWxzZSAqLyAvKmdsb2JhbHMgZGVmaW5lLCBtb2R1bGUsIHJlcXVpcmUgKi9cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIFtcbiAgICAgICAgJ291dGxheWVyL291dGxheWVyJyxcbiAgICAgICAgJ2dldC1zaXplL2dldC1zaXplJ1xuICAgICAgXSxcbiAgICAgIGZhY3RvcnkgKTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShcbiAgICAgIHJlcXVpcmUoJ291dGxheWVyJyksXG4gICAgICByZXF1aXJlKCdnZXQtc2l6ZScpXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIHdpbmRvdy5NYXNvbnJ5ID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdy5PdXRsYXllcixcbiAgICAgIHdpbmRvdy5nZXRTaXplXG4gICAgKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoIE91dGxheWVyLCBnZXRTaXplICkge1xuXG4ndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIG1hc29ucnlEZWZpbml0aW9uIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbiAgLy8gY3JlYXRlIGFuIE91dGxheWVyIGxheW91dCBjbGFzc1xuICB2YXIgTWFzb25yeSA9IE91dGxheWVyLmNyZWF0ZSgnbWFzb25yeScpO1xuICAvLyBpc0ZpdFdpZHRoIC0+IGZpdFdpZHRoXG4gIE1hc29ucnkuY29tcGF0T3B0aW9ucy5maXRXaWR0aCA9ICdpc0ZpdFdpZHRoJztcblxuICB2YXIgcHJvdG8gPSBNYXNvbnJ5LnByb3RvdHlwZTtcblxuICBwcm90by5fcmVzZXRMYXlvdXQgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmdldFNpemUoKTtcbiAgICB0aGlzLl9nZXRNZWFzdXJlbWVudCggJ2NvbHVtbldpZHRoJywgJ291dGVyV2lkdGgnICk7XG4gICAgdGhpcy5fZ2V0TWVhc3VyZW1lbnQoICdndXR0ZXInLCAnb3V0ZXJXaWR0aCcgKTtcbiAgICB0aGlzLm1lYXN1cmVDb2x1bW5zKCk7XG5cbiAgICAvLyByZXNldCBjb2x1bW4gWVxuICAgIHRoaXMuY29sWXMgPSBbXTtcbiAgICBmb3IgKCB2YXIgaT0wOyBpIDwgdGhpcy5jb2xzOyBpKysgKSB7XG4gICAgICB0aGlzLmNvbFlzLnB1c2goIDAgKTtcbiAgICB9XG5cbiAgICB0aGlzLm1heFkgPSAwO1xuICAgIHRoaXMuaG9yaXpvbnRhbENvbEluZGV4ID0gMDtcbiAgfTtcblxuICBwcm90by5tZWFzdXJlQ29sdW1ucyA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuZ2V0Q29udGFpbmVyV2lkdGgoKTtcbiAgICAvLyBpZiBjb2x1bW5XaWR0aCBpcyAwLCBkZWZhdWx0IHRvIG91dGVyV2lkdGggb2YgZmlyc3QgaXRlbVxuICAgIGlmICggIXRoaXMuY29sdW1uV2lkdGggKSB7XG4gICAgICB2YXIgZmlyc3RJdGVtID0gdGhpcy5pdGVtc1swXTtcbiAgICAgIHZhciBmaXJzdEl0ZW1FbGVtID0gZmlyc3RJdGVtICYmIGZpcnN0SXRlbS5lbGVtZW50O1xuICAgICAgLy8gY29sdW1uV2lkdGggZmFsbCBiYWNrIHRvIGl0ZW0gb2YgZmlyc3QgZWxlbWVudFxuICAgICAgdGhpcy5jb2x1bW5XaWR0aCA9IGZpcnN0SXRlbUVsZW0gJiYgZ2V0U2l6ZSggZmlyc3RJdGVtRWxlbSApLm91dGVyV2lkdGggfHxcbiAgICAgICAgLy8gaWYgZmlyc3QgZWxlbSBoYXMgbm8gd2lkdGgsIGRlZmF1bHQgdG8gc2l6ZSBvZiBjb250YWluZXJcbiAgICAgICAgdGhpcy5jb250YWluZXJXaWR0aDtcbiAgICB9XG5cbiAgICB2YXIgY29sdW1uV2lkdGggPSB0aGlzLmNvbHVtbldpZHRoICs9IHRoaXMuZ3V0dGVyO1xuXG4gICAgLy8gY2FsY3VsYXRlIGNvbHVtbnNcbiAgICB2YXIgY29udGFpbmVyV2lkdGggPSB0aGlzLmNvbnRhaW5lcldpZHRoICsgdGhpcy5ndXR0ZXI7XG4gICAgdmFyIGNvbHMgPSBjb250YWluZXJXaWR0aCAvIGNvbHVtbldpZHRoO1xuICAgIC8vIGZpeCByb3VuZGluZyBlcnJvcnMsIHR5cGljYWxseSB3aXRoIGd1dHRlcnNcbiAgICB2YXIgZXhjZXNzID0gY29sdW1uV2lkdGggLSBjb250YWluZXJXaWR0aCAlIGNvbHVtbldpZHRoO1xuICAgIC8vIGlmIG92ZXJzaG9vdCBpcyBsZXNzIHRoYW4gYSBwaXhlbCwgcm91bmQgdXAsIG90aGVyd2lzZSBmbG9vciBpdFxuICAgIHZhciBtYXRoTWV0aG9kID0gZXhjZXNzICYmIGV4Y2VzcyA8IDEgPyAncm91bmQnIDogJ2Zsb29yJztcbiAgICBjb2xzID0gTWF0aFsgbWF0aE1ldGhvZCBdKCBjb2xzICk7XG4gICAgdGhpcy5jb2xzID0gTWF0aC5tYXgoIGNvbHMsIDEgKTtcbiAgfTtcblxuICBwcm90by5nZXRDb250YWluZXJXaWR0aCA9IGZ1bmN0aW9uKCkge1xuICAgIC8vIGNvbnRhaW5lciBpcyBwYXJlbnQgaWYgZml0IHdpZHRoXG4gICAgdmFyIGlzRml0V2lkdGggPSB0aGlzLl9nZXRPcHRpb24oJ2ZpdFdpZHRoJyk7XG4gICAgdmFyIGNvbnRhaW5lciA9IGlzRml0V2lkdGggPyB0aGlzLmVsZW1lbnQucGFyZW50Tm9kZSA6IHRoaXMuZWxlbWVudDtcbiAgICAvLyBjaGVjayB0aGF0IHRoaXMuc2l6ZSBhbmQgc2l6ZSBhcmUgdGhlcmVcbiAgICAvLyBJRTggdHJpZ2dlcnMgcmVzaXplIG9uIGJvZHkgc2l6ZSBjaGFuZ2UsIHNvIHRoZXkgbWlnaHQgbm90IGJlXG4gICAgdmFyIHNpemUgPSBnZXRTaXplKCBjb250YWluZXIgKTtcbiAgICB0aGlzLmNvbnRhaW5lcldpZHRoID0gc2l6ZSAmJiBzaXplLmlubmVyV2lkdGg7XG4gIH07XG5cbiAgcHJvdG8uX2dldEl0ZW1MYXlvdXRQb3NpdGlvbiA9IGZ1bmN0aW9uKCBpdGVtICkge1xuICAgIGl0ZW0uZ2V0U2l6ZSgpO1xuICAgIC8vIGhvdyBtYW55IGNvbHVtbnMgZG9lcyB0aGlzIGJyaWNrIHNwYW5cbiAgICB2YXIgcmVtYWluZGVyID0gaXRlbS5zaXplLm91dGVyV2lkdGggJSB0aGlzLmNvbHVtbldpZHRoO1xuICAgIHZhciBtYXRoTWV0aG9kID0gcmVtYWluZGVyICYmIHJlbWFpbmRlciA8IDEgPyAncm91bmQnIDogJ2NlaWwnO1xuICAgIC8vIHJvdW5kIGlmIG9mZiBieSAxIHBpeGVsLCBvdGhlcndpc2UgdXNlIGNlaWxcbiAgICB2YXIgY29sU3BhbiA9IE1hdGhbIG1hdGhNZXRob2QgXSggaXRlbS5zaXplLm91dGVyV2lkdGggLyB0aGlzLmNvbHVtbldpZHRoICk7XG4gICAgY29sU3BhbiA9IE1hdGgubWluKCBjb2xTcGFuLCB0aGlzLmNvbHMgKTtcbiAgICAvLyB1c2UgaG9yaXpvbnRhbCBvciB0b3AgY29sdW1uIHBvc2l0aW9uXG4gICAgdmFyIGNvbFBvc01ldGhvZCA9IHRoaXMub3B0aW9ucy5ob3Jpem9udGFsT3JkZXIgP1xuICAgICAgJ19nZXRIb3Jpem9udGFsQ29sUG9zaXRpb24nIDogJ19nZXRUb3BDb2xQb3NpdGlvbic7XG4gICAgdmFyIGNvbFBvc2l0aW9uID0gdGhpc1sgY29sUG9zTWV0aG9kIF0oIGNvbFNwYW4sIGl0ZW0gKTtcbiAgICAvLyBwb3NpdGlvbiB0aGUgYnJpY2tcbiAgICB2YXIgcG9zaXRpb24gPSB7XG4gICAgICB4OiB0aGlzLmNvbHVtbldpZHRoICogY29sUG9zaXRpb24uY29sLFxuICAgICAgeTogY29sUG9zaXRpb24ueVxuICAgIH07XG4gICAgLy8gYXBwbHkgc2V0SGVpZ2h0IHRvIG5lY2Vzc2FyeSBjb2x1bW5zXG4gICAgdmFyIHNldEhlaWdodCA9IGNvbFBvc2l0aW9uLnkgKyBpdGVtLnNpemUub3V0ZXJIZWlnaHQ7XG4gICAgdmFyIHNldE1heCA9IGNvbFNwYW4gKyBjb2xQb3NpdGlvbi5jb2w7XG4gICAgZm9yICggdmFyIGkgPSBjb2xQb3NpdGlvbi5jb2w7IGkgPCBzZXRNYXg7IGkrKyApIHtcbiAgICAgIHRoaXMuY29sWXNbaV0gPSBzZXRIZWlnaHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBvc2l0aW9uO1xuICB9O1xuXG4gIHByb3RvLl9nZXRUb3BDb2xQb3NpdGlvbiA9IGZ1bmN0aW9uKCBjb2xTcGFuICkge1xuICAgIHZhciBjb2xHcm91cCA9IHRoaXMuX2dldFRvcENvbEdyb3VwKCBjb2xTcGFuICk7XG4gICAgLy8gZ2V0IHRoZSBtaW5pbXVtIFkgdmFsdWUgZnJvbSB0aGUgY29sdW1uc1xuICAgIHZhciBtaW5pbXVtWSA9IE1hdGgubWluLmFwcGx5KCBNYXRoLCBjb2xHcm91cCApO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbDogY29sR3JvdXAuaW5kZXhPZiggbWluaW11bVkgKSxcbiAgICAgIHk6IG1pbmltdW1ZLFxuICAgIH07XG4gIH07XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBjb2xTcGFuIC0gbnVtYmVyIG9mIGNvbHVtbnMgdGhlIGVsZW1lbnQgc3BhbnNcbiAgICogQHJldHVybnMge0FycmF5fSBjb2xHcm91cFxuICAgKi9cbiAgcHJvdG8uX2dldFRvcENvbEdyb3VwID0gZnVuY3Rpb24oIGNvbFNwYW4gKSB7XG4gICAgaWYgKCBjb2xTcGFuIDwgMiApIHtcbiAgICAgIC8vIGlmIGJyaWNrIHNwYW5zIG9ubHkgb25lIGNvbHVtbiwgdXNlIGFsbCB0aGUgY29sdW1uIFlzXG4gICAgICByZXR1cm4gdGhpcy5jb2xZcztcbiAgICB9XG5cbiAgICB2YXIgY29sR3JvdXAgPSBbXTtcbiAgICAvLyBob3cgbWFueSBkaWZmZXJlbnQgcGxhY2VzIGNvdWxkIHRoaXMgYnJpY2sgZml0IGhvcml6b250YWxseVxuICAgIHZhciBncm91cENvdW50ID0gdGhpcy5jb2xzICsgMSAtIGNvbFNwYW47XG4gICAgLy8gZm9yIGVhY2ggZ3JvdXAgcG90ZW50aWFsIGhvcml6b250YWwgcG9zaXRpb25cbiAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBncm91cENvdW50OyBpKysgKSB7XG4gICAgICBjb2xHcm91cFtpXSA9IHRoaXMuX2dldENvbEdyb3VwWSggaSwgY29sU3BhbiApO1xuICAgIH1cbiAgICByZXR1cm4gY29sR3JvdXA7XG4gIH07XG5cbiAgcHJvdG8uX2dldENvbEdyb3VwWSA9IGZ1bmN0aW9uKCBjb2wsIGNvbFNwYW4gKSB7XG4gICAgaWYgKCBjb2xTcGFuIDwgMiApIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbFlzWyBjb2wgXTtcbiAgICB9XG4gICAgLy8gbWFrZSBhbiBhcnJheSBvZiBjb2xZIHZhbHVlcyBmb3IgdGhhdCBvbmUgZ3JvdXBcbiAgICB2YXIgZ3JvdXBDb2xZcyA9IHRoaXMuY29sWXMuc2xpY2UoIGNvbCwgY29sICsgY29sU3BhbiApO1xuICAgIC8vIGFuZCBnZXQgdGhlIG1heCB2YWx1ZSBvZiB0aGUgYXJyYXlcbiAgICByZXR1cm4gTWF0aC5tYXguYXBwbHkoIE1hdGgsIGdyb3VwQ29sWXMgKTtcbiAgfTtcblxuICAvLyBnZXQgY29sdW1uIHBvc2l0aW9uIGJhc2VkIG9uIGhvcml6b250YWwgaW5kZXguICM4NzNcbiAgcHJvdG8uX2dldEhvcml6b250YWxDb2xQb3NpdGlvbiA9IGZ1bmN0aW9uKCBjb2xTcGFuLCBpdGVtICkge1xuICAgIHZhciBjb2wgPSB0aGlzLmhvcml6b250YWxDb2xJbmRleCAlIHRoaXMuY29scztcbiAgICB2YXIgaXNPdmVyID0gY29sU3BhbiA+IDEgJiYgY29sICsgY29sU3BhbiA+IHRoaXMuY29scztcbiAgICAvLyBzaGlmdCB0byBuZXh0IHJvdyBpZiBpdGVtIGNhbid0IGZpdCBvbiBjdXJyZW50IHJvd1xuICAgIGNvbCA9IGlzT3ZlciA/IDAgOiBjb2w7XG4gICAgLy8gZG9uJ3QgbGV0IHplcm8tc2l6ZSBpdGVtcyB0YWtlIHVwIHNwYWNlXG4gICAgdmFyIGhhc1NpemUgPSBpdGVtLnNpemUub3V0ZXJXaWR0aCAmJiBpdGVtLnNpemUub3V0ZXJIZWlnaHQ7XG4gICAgdGhpcy5ob3Jpem9udGFsQ29sSW5kZXggPSBoYXNTaXplID8gY29sICsgY29sU3BhbiA6IHRoaXMuaG9yaXpvbnRhbENvbEluZGV4O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbDogY29sLFxuICAgICAgeTogdGhpcy5fZ2V0Q29sR3JvdXBZKCBjb2wsIGNvbFNwYW4gKSxcbiAgICB9O1xuICB9O1xuXG4gIHByb3RvLl9tYW5hZ2VTdGFtcCA9IGZ1bmN0aW9uKCBzdGFtcCApIHtcbiAgICB2YXIgc3RhbXBTaXplID0gZ2V0U2l6ZSggc3RhbXAgKTtcbiAgICB2YXIgb2Zmc2V0ID0gdGhpcy5fZ2V0RWxlbWVudE9mZnNldCggc3RhbXAgKTtcbiAgICAvLyBnZXQgdGhlIGNvbHVtbnMgdGhhdCB0aGlzIHN0YW1wIGFmZmVjdHNcbiAgICB2YXIgaXNPcmlnaW5MZWZ0ID0gdGhpcy5fZ2V0T3B0aW9uKCdvcmlnaW5MZWZ0Jyk7XG4gICAgdmFyIGZpcnN0WCA9IGlzT3JpZ2luTGVmdCA/IG9mZnNldC5sZWZ0IDogb2Zmc2V0LnJpZ2h0O1xuICAgIHZhciBsYXN0WCA9IGZpcnN0WCArIHN0YW1wU2l6ZS5vdXRlcldpZHRoO1xuICAgIHZhciBmaXJzdENvbCA9IE1hdGguZmxvb3IoIGZpcnN0WCAvIHRoaXMuY29sdW1uV2lkdGggKTtcbiAgICBmaXJzdENvbCA9IE1hdGgubWF4KCAwLCBmaXJzdENvbCApO1xuICAgIHZhciBsYXN0Q29sID0gTWF0aC5mbG9vciggbGFzdFggLyB0aGlzLmNvbHVtbldpZHRoICk7XG4gICAgLy8gbGFzdENvbCBzaG91bGQgbm90IGdvIG92ZXIgaWYgbXVsdGlwbGUgb2YgY29sdW1uV2lkdGggIzQyNVxuICAgIGxhc3RDb2wgLT0gbGFzdFggJSB0aGlzLmNvbHVtbldpZHRoID8gMCA6IDE7XG4gICAgbGFzdENvbCA9IE1hdGgubWluKCB0aGlzLmNvbHMgLSAxLCBsYXN0Q29sICk7XG4gICAgLy8gc2V0IGNvbFlzIHRvIGJvdHRvbSBvZiB0aGUgc3RhbXBcblxuICAgIHZhciBpc09yaWdpblRvcCA9IHRoaXMuX2dldE9wdGlvbignb3JpZ2luVG9wJyk7XG4gICAgdmFyIHN0YW1wTWF4WSA9ICggaXNPcmlnaW5Ub3AgPyBvZmZzZXQudG9wIDogb2Zmc2V0LmJvdHRvbSApICtcbiAgICAgIHN0YW1wU2l6ZS5vdXRlckhlaWdodDtcbiAgICBmb3IgKCB2YXIgaSA9IGZpcnN0Q29sOyBpIDw9IGxhc3RDb2w7IGkrKyApIHtcbiAgICAgIHRoaXMuY29sWXNbaV0gPSBNYXRoLm1heCggc3RhbXBNYXhZLCB0aGlzLmNvbFlzW2ldICk7XG4gICAgfVxuICB9O1xuXG4gIHByb3RvLl9nZXRDb250YWluZXJTaXplID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5tYXhZID0gTWF0aC5tYXguYXBwbHkoIE1hdGgsIHRoaXMuY29sWXMgKTtcbiAgICB2YXIgc2l6ZSA9IHtcbiAgICAgIGhlaWdodDogdGhpcy5tYXhZXG4gICAgfTtcblxuICAgIGlmICggdGhpcy5fZ2V0T3B0aW9uKCdmaXRXaWR0aCcpICkge1xuICAgICAgc2l6ZS53aWR0aCA9IHRoaXMuX2dldENvbnRhaW5lckZpdFdpZHRoKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNpemU7XG4gIH07XG5cbiAgcHJvdG8uX2dldENvbnRhaW5lckZpdFdpZHRoID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHVudXNlZENvbHMgPSAwO1xuICAgIC8vIGNvdW50IHVudXNlZCBjb2x1bW5zXG4gICAgdmFyIGkgPSB0aGlzLmNvbHM7XG4gICAgd2hpbGUgKCAtLWkgKSB7XG4gICAgICBpZiAoIHRoaXMuY29sWXNbaV0gIT09IDAgKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgdW51c2VkQ29scysrO1xuICAgIH1cbiAgICAvLyBmaXQgY29udGFpbmVyIHRvIGNvbHVtbnMgdGhhdCBoYXZlIGJlZW4gdXNlZFxuICAgIHJldHVybiAoIHRoaXMuY29scyAtIHVudXNlZENvbHMgKSAqIHRoaXMuY29sdW1uV2lkdGggLSB0aGlzLmd1dHRlcjtcbiAgfTtcblxuICBwcm90by5uZWVkc1Jlc2l6ZUxheW91dCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBwcmV2aW91c1dpZHRoID0gdGhpcy5jb250YWluZXJXaWR0aDtcbiAgICB0aGlzLmdldENvbnRhaW5lcldpZHRoKCk7XG4gICAgcmV0dXJuIHByZXZpb3VzV2lkdGggIT0gdGhpcy5jb250YWluZXJXaWR0aDtcbiAgfTtcblxuICByZXR1cm4gTWFzb25yeTtcblxufSkpO1xuIiwiLyoqXG4gKiBPdXRsYXllciBJdGVtXG4gKi9cblxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgLyoganNoaW50IHN0cmljdDogZmFsc2UgKi8gLyogZ2xvYmFscyBkZWZpbmUsIG1vZHVsZSwgcmVxdWlyZSAqL1xuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRCAtIFJlcXVpcmVKU1xuICAgIGRlZmluZSggW1xuICAgICAgICAnZXYtZW1pdHRlci9ldi1lbWl0dGVyJyxcbiAgICAgICAgJ2dldC1zaXplL2dldC1zaXplJ1xuICAgICAgXSxcbiAgICAgIGZhY3RvcnlcbiAgICApO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTIC0gQnJvd3NlcmlmeSwgV2VicGFja1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShcbiAgICAgIHJlcXVpcmUoJ2V2LWVtaXR0ZXInKSxcbiAgICAgIHJlcXVpcmUoJ2dldC1zaXplJylcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgd2luZG93Lk91dGxheWVyID0ge307XG4gICAgd2luZG93Lk91dGxheWVyLkl0ZW0gPSBmYWN0b3J5KFxuICAgICAgd2luZG93LkV2RW1pdHRlcixcbiAgICAgIHdpbmRvdy5nZXRTaXplXG4gICAgKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoIEV2RW1pdHRlciwgZ2V0U2l6ZSApIHtcbid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0gaGVscGVycyAtLS0tLSAvL1xuXG5mdW5jdGlvbiBpc0VtcHR5T2JqKCBvYmogKSB7XG4gIGZvciAoIHZhciBwcm9wIGluIG9iaiApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcHJvcCA9IG51bGw7XG4gIHJldHVybiB0cnVlO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBDU1MzIHN1cHBvcnQgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuXG52YXIgZG9jRWxlbVN0eWxlID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlO1xuXG52YXIgdHJhbnNpdGlvblByb3BlcnR5ID0gdHlwZW9mIGRvY0VsZW1TdHlsZS50cmFuc2l0aW9uID09ICdzdHJpbmcnID9cbiAgJ3RyYW5zaXRpb24nIDogJ1dlYmtpdFRyYW5zaXRpb24nO1xudmFyIHRyYW5zZm9ybVByb3BlcnR5ID0gdHlwZW9mIGRvY0VsZW1TdHlsZS50cmFuc2Zvcm0gPT0gJ3N0cmluZycgP1xuICAndHJhbnNmb3JtJyA6ICdXZWJraXRUcmFuc2Zvcm0nO1xuXG52YXIgdHJhbnNpdGlvbkVuZEV2ZW50ID0ge1xuICBXZWJraXRUcmFuc2l0aW9uOiAnd2Via2l0VHJhbnNpdGlvbkVuZCcsXG4gIHRyYW5zaXRpb246ICd0cmFuc2l0aW9uZW5kJ1xufVsgdHJhbnNpdGlvblByb3BlcnR5IF07XG5cbi8vIGNhY2hlIGFsbCB2ZW5kb3IgcHJvcGVydGllcyB0aGF0IGNvdWxkIGhhdmUgdmVuZG9yIHByZWZpeFxudmFyIHZlbmRvclByb3BlcnRpZXMgPSB7XG4gIHRyYW5zZm9ybTogdHJhbnNmb3JtUHJvcGVydHksXG4gIHRyYW5zaXRpb246IHRyYW5zaXRpb25Qcm9wZXJ0eSxcbiAgdHJhbnNpdGlvbkR1cmF0aW9uOiB0cmFuc2l0aW9uUHJvcGVydHkgKyAnRHVyYXRpb24nLFxuICB0cmFuc2l0aW9uUHJvcGVydHk6IHRyYW5zaXRpb25Qcm9wZXJ0eSArICdQcm9wZXJ0eScsXG4gIHRyYW5zaXRpb25EZWxheTogdHJhbnNpdGlvblByb3BlcnR5ICsgJ0RlbGF5J1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gSXRlbSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5mdW5jdGlvbiBJdGVtKCBlbGVtZW50LCBsYXlvdXQgKSB7XG4gIGlmICggIWVsZW1lbnQgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgLy8gcGFyZW50IGxheW91dCBjbGFzcywgaS5lLiBNYXNvbnJ5LCBJc290b3BlLCBvciBQYWNrZXJ5XG4gIHRoaXMubGF5b3V0ID0gbGF5b3V0O1xuICB0aGlzLnBvc2l0aW9uID0ge1xuICAgIHg6IDAsXG4gICAgeTogMFxuICB9O1xuXG4gIHRoaXMuX2NyZWF0ZSgpO1xufVxuXG4vLyBpbmhlcml0IEV2RW1pdHRlclxudmFyIHByb3RvID0gSXRlbS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBFdkVtaXR0ZXIucHJvdG90eXBlICk7XG5wcm90by5jb25zdHJ1Y3RvciA9IEl0ZW07XG5cbnByb3RvLl9jcmVhdGUgPSBmdW5jdGlvbigpIHtcbiAgLy8gdHJhbnNpdGlvbiBvYmplY3RzXG4gIHRoaXMuX3RyYW5zbiA9IHtcbiAgICBpbmdQcm9wZXJ0aWVzOiB7fSxcbiAgICBjbGVhbjoge30sXG4gICAgb25FbmQ6IHt9XG4gIH07XG5cbiAgdGhpcy5jc3Moe1xuICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnXG4gIH0pO1xufTtcblxuLy8gdHJpZ2dlciBzcGVjaWZpZWQgaGFuZGxlciBmb3IgZXZlbnQgdHlwZVxucHJvdG8uaGFuZGxlRXZlbnQgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIHZhciBtZXRob2QgPSAnb24nICsgZXZlbnQudHlwZTtcbiAgaWYgKCB0aGlzWyBtZXRob2QgXSApIHtcbiAgICB0aGlzWyBtZXRob2QgXSggZXZlbnQgKTtcbiAgfVxufTtcblxucHJvdG8uZ2V0U2l6ZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnNpemUgPSBnZXRTaXplKCB0aGlzLmVsZW1lbnQgKTtcbn07XG5cbi8qKlxuICogYXBwbHkgQ1NTIHN0eWxlcyB0byBlbGVtZW50XG4gKiBAcGFyYW0ge09iamVjdH0gc3R5bGVcbiAqL1xucHJvdG8uY3NzID0gZnVuY3Rpb24oIHN0eWxlICkge1xuICB2YXIgZWxlbVN0eWxlID0gdGhpcy5lbGVtZW50LnN0eWxlO1xuXG4gIGZvciAoIHZhciBwcm9wIGluIHN0eWxlICkge1xuICAgIC8vIHVzZSB2ZW5kb3IgcHJvcGVydHkgaWYgYXZhaWxhYmxlXG4gICAgdmFyIHN1cHBvcnRlZFByb3AgPSB2ZW5kb3JQcm9wZXJ0aWVzWyBwcm9wIF0gfHwgcHJvcDtcbiAgICBlbGVtU3R5bGVbIHN1cHBvcnRlZFByb3AgXSA9IHN0eWxlWyBwcm9wIF07XG4gIH1cbn07XG5cbiAvLyBtZWFzdXJlIHBvc2l0aW9uLCBhbmQgc2V0cyBpdFxucHJvdG8uZ2V0UG9zaXRpb24gPSBmdW5jdGlvbigpIHtcbiAgdmFyIHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZSggdGhpcy5lbGVtZW50ICk7XG4gIHZhciBpc09yaWdpbkxlZnQgPSB0aGlzLmxheW91dC5fZ2V0T3B0aW9uKCdvcmlnaW5MZWZ0Jyk7XG4gIHZhciBpc09yaWdpblRvcCA9IHRoaXMubGF5b3V0Ll9nZXRPcHRpb24oJ29yaWdpblRvcCcpO1xuICB2YXIgeFZhbHVlID0gc3R5bGVbIGlzT3JpZ2luTGVmdCA/ICdsZWZ0JyA6ICdyaWdodCcgXTtcbiAgdmFyIHlWYWx1ZSA9IHN0eWxlWyBpc09yaWdpblRvcCA/ICd0b3AnIDogJ2JvdHRvbScgXTtcbiAgdmFyIHggPSBwYXJzZUZsb2F0KCB4VmFsdWUgKTtcbiAgdmFyIHkgPSBwYXJzZUZsb2F0KCB5VmFsdWUgKTtcbiAgLy8gY29udmVydCBwZXJjZW50IHRvIHBpeGVsc1xuICB2YXIgbGF5b3V0U2l6ZSA9IHRoaXMubGF5b3V0LnNpemU7XG4gIGlmICggeFZhbHVlLmluZGV4T2YoJyUnKSAhPSAtMSApIHtcbiAgICB4ID0gKCB4IC8gMTAwICkgKiBsYXlvdXRTaXplLndpZHRoO1xuICB9XG4gIGlmICggeVZhbHVlLmluZGV4T2YoJyUnKSAhPSAtMSApIHtcbiAgICB5ID0gKCB5IC8gMTAwICkgKiBsYXlvdXRTaXplLmhlaWdodDtcbiAgfVxuICAvLyBjbGVhbiB1cCAnYXV0bycgb3Igb3RoZXIgbm9uLWludGVnZXIgdmFsdWVzXG4gIHggPSBpc05hTiggeCApID8gMCA6IHg7XG4gIHkgPSBpc05hTiggeSApID8gMCA6IHk7XG4gIC8vIHJlbW92ZSBwYWRkaW5nIGZyb20gbWVhc3VyZW1lbnRcbiAgeCAtPSBpc09yaWdpbkxlZnQgPyBsYXlvdXRTaXplLnBhZGRpbmdMZWZ0IDogbGF5b3V0U2l6ZS5wYWRkaW5nUmlnaHQ7XG4gIHkgLT0gaXNPcmlnaW5Ub3AgPyBsYXlvdXRTaXplLnBhZGRpbmdUb3AgOiBsYXlvdXRTaXplLnBhZGRpbmdCb3R0b207XG5cbiAgdGhpcy5wb3NpdGlvbi54ID0geDtcbiAgdGhpcy5wb3NpdGlvbi55ID0geTtcbn07XG5cbi8vIHNldCBzZXR0bGVkIHBvc2l0aW9uLCBhcHBseSBwYWRkaW5nXG5wcm90by5sYXlvdXRQb3NpdGlvbiA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbGF5b3V0U2l6ZSA9IHRoaXMubGF5b3V0LnNpemU7XG4gIHZhciBzdHlsZSA9IHt9O1xuICB2YXIgaXNPcmlnaW5MZWZ0ID0gdGhpcy5sYXlvdXQuX2dldE9wdGlvbignb3JpZ2luTGVmdCcpO1xuICB2YXIgaXNPcmlnaW5Ub3AgPSB0aGlzLmxheW91dC5fZ2V0T3B0aW9uKCdvcmlnaW5Ub3AnKTtcblxuICAvLyB4XG4gIHZhciB4UGFkZGluZyA9IGlzT3JpZ2luTGVmdCA/ICdwYWRkaW5nTGVmdCcgOiAncGFkZGluZ1JpZ2h0JztcbiAgdmFyIHhQcm9wZXJ0eSA9IGlzT3JpZ2luTGVmdCA/ICdsZWZ0JyA6ICdyaWdodCc7XG4gIHZhciB4UmVzZXRQcm9wZXJ0eSA9IGlzT3JpZ2luTGVmdCA/ICdyaWdodCcgOiAnbGVmdCc7XG5cbiAgdmFyIHggPSB0aGlzLnBvc2l0aW9uLnggKyBsYXlvdXRTaXplWyB4UGFkZGluZyBdO1xuICAvLyBzZXQgaW4gcGVyY2VudGFnZSBvciBwaXhlbHNcbiAgc3R5bGVbIHhQcm9wZXJ0eSBdID0gdGhpcy5nZXRYVmFsdWUoIHggKTtcbiAgLy8gcmVzZXQgb3RoZXIgcHJvcGVydHlcbiAgc3R5bGVbIHhSZXNldFByb3BlcnR5IF0gPSAnJztcblxuICAvLyB5XG4gIHZhciB5UGFkZGluZyA9IGlzT3JpZ2luVG9wID8gJ3BhZGRpbmdUb3AnIDogJ3BhZGRpbmdCb3R0b20nO1xuICB2YXIgeVByb3BlcnR5ID0gaXNPcmlnaW5Ub3AgPyAndG9wJyA6ICdib3R0b20nO1xuICB2YXIgeVJlc2V0UHJvcGVydHkgPSBpc09yaWdpblRvcCA/ICdib3R0b20nIDogJ3RvcCc7XG5cbiAgdmFyIHkgPSB0aGlzLnBvc2l0aW9uLnkgKyBsYXlvdXRTaXplWyB5UGFkZGluZyBdO1xuICAvLyBzZXQgaW4gcGVyY2VudGFnZSBvciBwaXhlbHNcbiAgc3R5bGVbIHlQcm9wZXJ0eSBdID0gdGhpcy5nZXRZVmFsdWUoIHkgKTtcbiAgLy8gcmVzZXQgb3RoZXIgcHJvcGVydHlcbiAgc3R5bGVbIHlSZXNldFByb3BlcnR5IF0gPSAnJztcblxuICB0aGlzLmNzcyggc3R5bGUgKTtcbiAgdGhpcy5lbWl0RXZlbnQoICdsYXlvdXQnLCBbIHRoaXMgXSApO1xufTtcblxucHJvdG8uZ2V0WFZhbHVlID0gZnVuY3Rpb24oIHggKSB7XG4gIHZhciBpc0hvcml6b250YWwgPSB0aGlzLmxheW91dC5fZ2V0T3B0aW9uKCdob3Jpem9udGFsJyk7XG4gIHJldHVybiB0aGlzLmxheW91dC5vcHRpb25zLnBlcmNlbnRQb3NpdGlvbiAmJiAhaXNIb3Jpem9udGFsID9cbiAgICAoICggeCAvIHRoaXMubGF5b3V0LnNpemUud2lkdGggKSAqIDEwMCApICsgJyUnIDogeCArICdweCc7XG59O1xuXG5wcm90by5nZXRZVmFsdWUgPSBmdW5jdGlvbiggeSApIHtcbiAgdmFyIGlzSG9yaXpvbnRhbCA9IHRoaXMubGF5b3V0Ll9nZXRPcHRpb24oJ2hvcml6b250YWwnKTtcbiAgcmV0dXJuIHRoaXMubGF5b3V0Lm9wdGlvbnMucGVyY2VudFBvc2l0aW9uICYmIGlzSG9yaXpvbnRhbCA/XG4gICAgKCAoIHkgLyB0aGlzLmxheW91dC5zaXplLmhlaWdodCApICogMTAwICkgKyAnJScgOiB5ICsgJ3B4Jztcbn07XG5cbnByb3RvLl90cmFuc2l0aW9uVG8gPSBmdW5jdGlvbiggeCwgeSApIHtcbiAgdGhpcy5nZXRQb3NpdGlvbigpO1xuICAvLyBnZXQgY3VycmVudCB4ICYgeSBmcm9tIHRvcC9sZWZ0XG4gIHZhciBjdXJYID0gdGhpcy5wb3NpdGlvbi54O1xuICB2YXIgY3VyWSA9IHRoaXMucG9zaXRpb24ueTtcblxuICB2YXIgZGlkTm90TW92ZSA9IHggPT0gdGhpcy5wb3NpdGlvbi54ICYmIHkgPT0gdGhpcy5wb3NpdGlvbi55O1xuXG4gIC8vIHNhdmUgZW5kIHBvc2l0aW9uXG4gIHRoaXMuc2V0UG9zaXRpb24oIHgsIHkgKTtcblxuICAvLyBpZiBkaWQgbm90IG1vdmUgYW5kIG5vdCB0cmFuc2l0aW9uaW5nLCBqdXN0IGdvIHRvIGxheW91dFxuICBpZiAoIGRpZE5vdE1vdmUgJiYgIXRoaXMuaXNUcmFuc2l0aW9uaW5nICkge1xuICAgIHRoaXMubGF5b3V0UG9zaXRpb24oKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgdHJhbnNYID0geCAtIGN1clg7XG4gIHZhciB0cmFuc1kgPSB5IC0gY3VyWTtcbiAgdmFyIHRyYW5zaXRpb25TdHlsZSA9IHt9O1xuICB0cmFuc2l0aW9uU3R5bGUudHJhbnNmb3JtID0gdGhpcy5nZXRUcmFuc2xhdGUoIHRyYW5zWCwgdHJhbnNZICk7XG5cbiAgdGhpcy50cmFuc2l0aW9uKHtcbiAgICB0bzogdHJhbnNpdGlvblN0eWxlLFxuICAgIG9uVHJhbnNpdGlvbkVuZDoge1xuICAgICAgdHJhbnNmb3JtOiB0aGlzLmxheW91dFBvc2l0aW9uXG4gICAgfSxcbiAgICBpc0NsZWFuaW5nOiB0cnVlXG4gIH0pO1xufTtcblxucHJvdG8uZ2V0VHJhbnNsYXRlID0gZnVuY3Rpb24oIHgsIHkgKSB7XG4gIC8vIGZsaXAgY29vcmlkaW5hdGVzIGlmIG9yaWdpbiBvbiByaWdodCBvciBib3R0b21cbiAgdmFyIGlzT3JpZ2luTGVmdCA9IHRoaXMubGF5b3V0Ll9nZXRPcHRpb24oJ29yaWdpbkxlZnQnKTtcbiAgdmFyIGlzT3JpZ2luVG9wID0gdGhpcy5sYXlvdXQuX2dldE9wdGlvbignb3JpZ2luVG9wJyk7XG4gIHggPSBpc09yaWdpbkxlZnQgPyB4IDogLXg7XG4gIHkgPSBpc09yaWdpblRvcCA/IHkgOiAteTtcbiAgcmV0dXJuICd0cmFuc2xhdGUzZCgnICsgeCArICdweCwgJyArIHkgKyAncHgsIDApJztcbn07XG5cbi8vIG5vbiB0cmFuc2l0aW9uICsgdHJhbnNmb3JtIHN1cHBvcnRcbnByb3RvLmdvVG8gPSBmdW5jdGlvbiggeCwgeSApIHtcbiAgdGhpcy5zZXRQb3NpdGlvbiggeCwgeSApO1xuICB0aGlzLmxheW91dFBvc2l0aW9uKCk7XG59O1xuXG5wcm90by5tb3ZlVG8gPSBwcm90by5fdHJhbnNpdGlvblRvO1xuXG5wcm90by5zZXRQb3NpdGlvbiA9IGZ1bmN0aW9uKCB4LCB5ICkge1xuICB0aGlzLnBvc2l0aW9uLnggPSBwYXJzZUZsb2F0KCB4ICk7XG4gIHRoaXMucG9zaXRpb24ueSA9IHBhcnNlRmxvYXQoIHkgKTtcbn07XG5cbi8vIC0tLS0tIHRyYW5zaXRpb24gLS0tLS0gLy9cblxuLyoqXG4gKiBAcGFyYW0ge09iamVjdH0gc3R5bGUgLSBDU1NcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9uVHJhbnNpdGlvbkVuZFxuICovXG5cbi8vIG5vbiB0cmFuc2l0aW9uLCBqdXN0IHRyaWdnZXIgY2FsbGJhY2tcbnByb3RvLl9ub25UcmFuc2l0aW9uID0gZnVuY3Rpb24oIGFyZ3MgKSB7XG4gIHRoaXMuY3NzKCBhcmdzLnRvICk7XG4gIGlmICggYXJncy5pc0NsZWFuaW5nICkge1xuICAgIHRoaXMuX3JlbW92ZVN0eWxlcyggYXJncy50byApO1xuICB9XG4gIGZvciAoIHZhciBwcm9wIGluIGFyZ3Mub25UcmFuc2l0aW9uRW5kICkge1xuICAgIGFyZ3Mub25UcmFuc2l0aW9uRW5kWyBwcm9wIF0uY2FsbCggdGhpcyApO1xuICB9XG59O1xuXG4vKipcbiAqIHByb3BlciB0cmFuc2l0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gYXJncyAtIGFyZ3VtZW50c1xuICogICBAcGFyYW0ge09iamVjdH0gdG8gLSBzdHlsZSB0byB0cmFuc2l0aW9uIHRvXG4gKiAgIEBwYXJhbSB7T2JqZWN0fSBmcm9tIC0gc3R5bGUgdG8gc3RhcnQgdHJhbnNpdGlvbiBmcm9tXG4gKiAgIEBwYXJhbSB7Qm9vbGVhbn0gaXNDbGVhbmluZyAtIHJlbW92ZXMgdHJhbnNpdGlvbiBzdHlsZXMgYWZ0ZXIgdHJhbnNpdGlvblxuICogICBAcGFyYW0ge0Z1bmN0aW9ufSBvblRyYW5zaXRpb25FbmQgLSBjYWxsYmFja1xuICovXG5wcm90by50cmFuc2l0aW9uID0gZnVuY3Rpb24oIGFyZ3MgKSB7XG4gIC8vIHJlZGlyZWN0IHRvIG5vblRyYW5zaXRpb24gaWYgbm8gdHJhbnNpdGlvbiBkdXJhdGlvblxuICBpZiAoICFwYXJzZUZsb2F0KCB0aGlzLmxheW91dC5vcHRpb25zLnRyYW5zaXRpb25EdXJhdGlvbiApICkge1xuICAgIHRoaXMuX25vblRyYW5zaXRpb24oIGFyZ3MgKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgX3RyYW5zaXRpb24gPSB0aGlzLl90cmFuc247XG4gIC8vIGtlZXAgdHJhY2sgb2Ygb25UcmFuc2l0aW9uRW5kIGNhbGxiYWNrIGJ5IGNzcyBwcm9wZXJ0eVxuICBmb3IgKCB2YXIgcHJvcCBpbiBhcmdzLm9uVHJhbnNpdGlvbkVuZCApIHtcbiAgICBfdHJhbnNpdGlvbi5vbkVuZFsgcHJvcCBdID0gYXJncy5vblRyYW5zaXRpb25FbmRbIHByb3AgXTtcbiAgfVxuICAvLyBrZWVwIHRyYWNrIG9mIHByb3BlcnRpZXMgdGhhdCBhcmUgdHJhbnNpdGlvbmluZ1xuICBmb3IgKCBwcm9wIGluIGFyZ3MudG8gKSB7XG4gICAgX3RyYW5zaXRpb24uaW5nUHJvcGVydGllc1sgcHJvcCBdID0gdHJ1ZTtcbiAgICAvLyBrZWVwIHRyYWNrIG9mIHByb3BlcnRpZXMgdG8gY2xlYW4gdXAgd2hlbiB0cmFuc2l0aW9uIGlzIGRvbmVcbiAgICBpZiAoIGFyZ3MuaXNDbGVhbmluZyApIHtcbiAgICAgIF90cmFuc2l0aW9uLmNsZWFuWyBwcm9wIF0gPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIC8vIHNldCBmcm9tIHN0eWxlc1xuICBpZiAoIGFyZ3MuZnJvbSApIHtcbiAgICB0aGlzLmNzcyggYXJncy5mcm9tICk7XG4gICAgLy8gZm9yY2UgcmVkcmF3LiBodHRwOi8vYmxvZy5hbGV4bWFjY2F3LmNvbS9jc3MtdHJhbnNpdGlvbnNcbiAgICB2YXIgaCA9IHRoaXMuZWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgLy8gaGFjayBmb3IgSlNIaW50IHRvIGh1c2ggYWJvdXQgdW51c2VkIHZhclxuICAgIGggPSBudWxsO1xuICB9XG4gIC8vIGVuYWJsZSB0cmFuc2l0aW9uXG4gIHRoaXMuZW5hYmxlVHJhbnNpdGlvbiggYXJncy50byApO1xuICAvLyBzZXQgc3R5bGVzIHRoYXQgYXJlIHRyYW5zaXRpb25pbmdcbiAgdGhpcy5jc3MoIGFyZ3MudG8gKTtcblxuICB0aGlzLmlzVHJhbnNpdGlvbmluZyA9IHRydWU7XG5cbn07XG5cbi8vIGRhc2ggYmVmb3JlIGFsbCBjYXAgbGV0dGVycywgaW5jbHVkaW5nIGZpcnN0IGZvclxuLy8gV2Via2l0VHJhbnNmb3JtID0+IC13ZWJraXQtdHJhbnNmb3JtXG5mdW5jdGlvbiB0b0Rhc2hlZEFsbCggc3RyICkge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoIC8oW0EtWl0pL2csIGZ1bmN0aW9uKCAkMSApIHtcbiAgICByZXR1cm4gJy0nICsgJDEudG9Mb3dlckNhc2UoKTtcbiAgfSk7XG59XG5cbnZhciB0cmFuc2l0aW9uUHJvcHMgPSAnb3BhY2l0eSwnICsgdG9EYXNoZWRBbGwoIHRyYW5zZm9ybVByb3BlcnR5ICk7XG5cbnByb3RvLmVuYWJsZVRyYW5zaXRpb24gPSBmdW5jdGlvbigvKiBzdHlsZSAqLykge1xuICAvLyBIQUNLIGNoYW5naW5nIHRyYW5zaXRpb25Qcm9wZXJ0eSBkdXJpbmcgYSB0cmFuc2l0aW9uXG4gIC8vIHdpbGwgY2F1c2UgdHJhbnNpdGlvbiB0byBqdW1wXG4gIGlmICggdGhpcy5pc1RyYW5zaXRpb25pbmcgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gbWFrZSBgdHJhbnNpdGlvbjogZm9vLCBiYXIsIGJhemAgZnJvbSBzdHlsZSBvYmplY3RcbiAgLy8gSEFDSyB1bi1jb21tZW50IHRoaXMgd2hlbiBlbmFibGVUcmFuc2l0aW9uIGNhbiB3b3JrXG4gIC8vIHdoaWxlIGEgdHJhbnNpdGlvbiBpcyBoYXBwZW5pbmdcbiAgLy8gdmFyIHRyYW5zaXRpb25WYWx1ZXMgPSBbXTtcbiAgLy8gZm9yICggdmFyIHByb3AgaW4gc3R5bGUgKSB7XG4gIC8vICAgLy8gZGFzaC1pZnkgY2FtZWxDYXNlZCBwcm9wZXJ0aWVzIGxpa2UgV2Via2l0VHJhbnNpdGlvblxuICAvLyAgIHByb3AgPSB2ZW5kb3JQcm9wZXJ0aWVzWyBwcm9wIF0gfHwgcHJvcDtcbiAgLy8gICB0cmFuc2l0aW9uVmFsdWVzLnB1c2goIHRvRGFzaGVkQWxsKCBwcm9wICkgKTtcbiAgLy8gfVxuICAvLyBtdW5nZSBudW1iZXIgdG8gbWlsbGlzZWNvbmQsIHRvIG1hdGNoIHN0YWdnZXJcbiAgdmFyIGR1cmF0aW9uID0gdGhpcy5sYXlvdXQub3B0aW9ucy50cmFuc2l0aW9uRHVyYXRpb247XG4gIGR1cmF0aW9uID0gdHlwZW9mIGR1cmF0aW9uID09ICdudW1iZXInID8gZHVyYXRpb24gKyAnbXMnIDogZHVyYXRpb247XG4gIC8vIGVuYWJsZSB0cmFuc2l0aW9uIHN0eWxlc1xuICB0aGlzLmNzcyh7XG4gICAgdHJhbnNpdGlvblByb3BlcnR5OiB0cmFuc2l0aW9uUHJvcHMsXG4gICAgdHJhbnNpdGlvbkR1cmF0aW9uOiBkdXJhdGlvbixcbiAgICB0cmFuc2l0aW9uRGVsYXk6IHRoaXMuc3RhZ2dlckRlbGF5IHx8IDBcbiAgfSk7XG4gIC8vIGxpc3RlbiBmb3IgdHJhbnNpdGlvbiBlbmQgZXZlbnRcbiAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoIHRyYW5zaXRpb25FbmRFdmVudCwgdGhpcywgZmFsc2UgKTtcbn07XG5cbi8vIC0tLS0tIGV2ZW50cyAtLS0tLSAvL1xuXG5wcm90by5vbndlYmtpdFRyYW5zaXRpb25FbmQgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIHRoaXMub250cmFuc2l0aW9uZW5kKCBldmVudCApO1xufTtcblxucHJvdG8ub25vdHJhbnNpdGlvbmVuZCA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgdGhpcy5vbnRyYW5zaXRpb25lbmQoIGV2ZW50ICk7XG59O1xuXG4vLyBwcm9wZXJ0aWVzIHRoYXQgSSBtdW5nZSB0byBtYWtlIG15IGxpZmUgZWFzaWVyXG52YXIgZGFzaGVkVmVuZG9yUHJvcGVydGllcyA9IHtcbiAgJy13ZWJraXQtdHJhbnNmb3JtJzogJ3RyYW5zZm9ybSdcbn07XG5cbnByb3RvLm9udHJhbnNpdGlvbmVuZCA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgLy8gZGlzcmVnYXJkIGJ1YmJsZWQgZXZlbnRzIGZyb20gY2hpbGRyZW5cbiAgaWYgKCBldmVudC50YXJnZXQgIT09IHRoaXMuZWxlbWVudCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIF90cmFuc2l0aW9uID0gdGhpcy5fdHJhbnNuO1xuICAvLyBnZXQgcHJvcGVydHkgbmFtZSBvZiB0cmFuc2l0aW9uZWQgcHJvcGVydHksIGNvbnZlcnQgdG8gcHJlZml4LWZyZWVcbiAgdmFyIHByb3BlcnR5TmFtZSA9IGRhc2hlZFZlbmRvclByb3BlcnRpZXNbIGV2ZW50LnByb3BlcnR5TmFtZSBdIHx8IGV2ZW50LnByb3BlcnR5TmFtZTtcblxuICAvLyByZW1vdmUgcHJvcGVydHkgdGhhdCBoYXMgY29tcGxldGVkIHRyYW5zaXRpb25pbmdcbiAgZGVsZXRlIF90cmFuc2l0aW9uLmluZ1Byb3BlcnRpZXNbIHByb3BlcnR5TmFtZSBdO1xuICAvLyBjaGVjayBpZiBhbnkgcHJvcGVydGllcyBhcmUgc3RpbGwgdHJhbnNpdGlvbmluZ1xuICBpZiAoIGlzRW1wdHlPYmooIF90cmFuc2l0aW9uLmluZ1Byb3BlcnRpZXMgKSApIHtcbiAgICAvLyBhbGwgcHJvcGVydGllcyBoYXZlIGNvbXBsZXRlZCB0cmFuc2l0aW9uaW5nXG4gICAgdGhpcy5kaXNhYmxlVHJhbnNpdGlvbigpO1xuICB9XG4gIC8vIGNsZWFuIHN0eWxlXG4gIGlmICggcHJvcGVydHlOYW1lIGluIF90cmFuc2l0aW9uLmNsZWFuICkge1xuICAgIC8vIGNsZWFuIHVwIHN0eWxlXG4gICAgdGhpcy5lbGVtZW50LnN0eWxlWyBldmVudC5wcm9wZXJ0eU5hbWUgXSA9ICcnO1xuICAgIGRlbGV0ZSBfdHJhbnNpdGlvbi5jbGVhblsgcHJvcGVydHlOYW1lIF07XG4gIH1cbiAgLy8gdHJpZ2dlciBvblRyYW5zaXRpb25FbmQgY2FsbGJhY2tcbiAgaWYgKCBwcm9wZXJ0eU5hbWUgaW4gX3RyYW5zaXRpb24ub25FbmQgKSB7XG4gICAgdmFyIG9uVHJhbnNpdGlvbkVuZCA9IF90cmFuc2l0aW9uLm9uRW5kWyBwcm9wZXJ0eU5hbWUgXTtcbiAgICBvblRyYW5zaXRpb25FbmQuY2FsbCggdGhpcyApO1xuICAgIGRlbGV0ZSBfdHJhbnNpdGlvbi5vbkVuZFsgcHJvcGVydHlOYW1lIF07XG4gIH1cblxuICB0aGlzLmVtaXRFdmVudCggJ3RyYW5zaXRpb25FbmQnLCBbIHRoaXMgXSApO1xufTtcblxucHJvdG8uZGlzYWJsZVRyYW5zaXRpb24gPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5yZW1vdmVUcmFuc2l0aW9uU3R5bGVzKCk7XG4gIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCB0cmFuc2l0aW9uRW5kRXZlbnQsIHRoaXMsIGZhbHNlICk7XG4gIHRoaXMuaXNUcmFuc2l0aW9uaW5nID0gZmFsc2U7XG59O1xuXG4vKipcbiAqIHJlbW92ZXMgc3R5bGUgcHJvcGVydHkgZnJvbSBlbGVtZW50XG4gKiBAcGFyYW0ge09iamVjdH0gc3R5bGVcbioqL1xucHJvdG8uX3JlbW92ZVN0eWxlcyA9IGZ1bmN0aW9uKCBzdHlsZSApIHtcbiAgLy8gY2xlYW4gdXAgdHJhbnNpdGlvbiBzdHlsZXNcbiAgdmFyIGNsZWFuU3R5bGUgPSB7fTtcbiAgZm9yICggdmFyIHByb3AgaW4gc3R5bGUgKSB7XG4gICAgY2xlYW5TdHlsZVsgcHJvcCBdID0gJyc7XG4gIH1cbiAgdGhpcy5jc3MoIGNsZWFuU3R5bGUgKTtcbn07XG5cbnZhciBjbGVhblRyYW5zaXRpb25TdHlsZSA9IHtcbiAgdHJhbnNpdGlvblByb3BlcnR5OiAnJyxcbiAgdHJhbnNpdGlvbkR1cmF0aW9uOiAnJyxcbiAgdHJhbnNpdGlvbkRlbGF5OiAnJ1xufTtcblxucHJvdG8ucmVtb3ZlVHJhbnNpdGlvblN0eWxlcyA9IGZ1bmN0aW9uKCkge1xuICAvLyByZW1vdmUgdHJhbnNpdGlvblxuICB0aGlzLmNzcyggY2xlYW5UcmFuc2l0aW9uU3R5bGUgKTtcbn07XG5cbi8vIC0tLS0tIHN0YWdnZXIgLS0tLS0gLy9cblxucHJvdG8uc3RhZ2dlciA9IGZ1bmN0aW9uKCBkZWxheSApIHtcbiAgZGVsYXkgPSBpc05hTiggZGVsYXkgKSA/IDAgOiBkZWxheTtcbiAgdGhpcy5zdGFnZ2VyRGVsYXkgPSBkZWxheSArICdtcyc7XG59O1xuXG4vLyAtLS0tLSBzaG93L2hpZGUvcmVtb3ZlIC0tLS0tIC8vXG5cbi8vIHJlbW92ZSBlbGVtZW50IGZyb20gRE9NXG5wcm90by5yZW1vdmVFbGVtID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCB0aGlzLmVsZW1lbnQgKTtcbiAgLy8gcmVtb3ZlIGRpc3BsYXk6IG5vbmVcbiAgdGhpcy5jc3MoeyBkaXNwbGF5OiAnJyB9KTtcbiAgdGhpcy5lbWl0RXZlbnQoICdyZW1vdmUnLCBbIHRoaXMgXSApO1xufTtcblxucHJvdG8ucmVtb3ZlID0gZnVuY3Rpb24oKSB7XG4gIC8vIGp1c3QgcmVtb3ZlIGVsZW1lbnQgaWYgbm8gdHJhbnNpdGlvbiBzdXBwb3J0IG9yIG5vIHRyYW5zaXRpb25cbiAgaWYgKCAhdHJhbnNpdGlvblByb3BlcnR5IHx8ICFwYXJzZUZsb2F0KCB0aGlzLmxheW91dC5vcHRpb25zLnRyYW5zaXRpb25EdXJhdGlvbiApICkge1xuICAgIHRoaXMucmVtb3ZlRWxlbSgpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIHN0YXJ0IHRyYW5zaXRpb25cbiAgdGhpcy5vbmNlKCAndHJhbnNpdGlvbkVuZCcsIGZ1bmN0aW9uKCkge1xuICAgIHRoaXMucmVtb3ZlRWxlbSgpO1xuICB9KTtcbiAgdGhpcy5oaWRlKCk7XG59O1xuXG5wcm90by5yZXZlYWwgPSBmdW5jdGlvbigpIHtcbiAgZGVsZXRlIHRoaXMuaXNIaWRkZW47XG4gIC8vIHJlbW92ZSBkaXNwbGF5OiBub25lXG4gIHRoaXMuY3NzKHsgZGlzcGxheTogJycgfSk7XG5cbiAgdmFyIG9wdGlvbnMgPSB0aGlzLmxheW91dC5vcHRpb25zO1xuXG4gIHZhciBvblRyYW5zaXRpb25FbmQgPSB7fTtcbiAgdmFyIHRyYW5zaXRpb25FbmRQcm9wZXJ0eSA9IHRoaXMuZ2V0SGlkZVJldmVhbFRyYW5zaXRpb25FbmRQcm9wZXJ0eSgndmlzaWJsZVN0eWxlJyk7XG4gIG9uVHJhbnNpdGlvbkVuZFsgdHJhbnNpdGlvbkVuZFByb3BlcnR5IF0gPSB0aGlzLm9uUmV2ZWFsVHJhbnNpdGlvbkVuZDtcblxuICB0aGlzLnRyYW5zaXRpb24oe1xuICAgIGZyb206IG9wdGlvbnMuaGlkZGVuU3R5bGUsXG4gICAgdG86IG9wdGlvbnMudmlzaWJsZVN0eWxlLFxuICAgIGlzQ2xlYW5pbmc6IHRydWUsXG4gICAgb25UcmFuc2l0aW9uRW5kOiBvblRyYW5zaXRpb25FbmRcbiAgfSk7XG59O1xuXG5wcm90by5vblJldmVhbFRyYW5zaXRpb25FbmQgPSBmdW5jdGlvbigpIHtcbiAgLy8gY2hlY2sgaWYgc3RpbGwgdmlzaWJsZVxuICAvLyBkdXJpbmcgdHJhbnNpdGlvbiwgaXRlbSBtYXkgaGF2ZSBiZWVuIGhpZGRlblxuICBpZiAoICF0aGlzLmlzSGlkZGVuICkge1xuICAgIHRoaXMuZW1pdEV2ZW50KCdyZXZlYWwnKTtcbiAgfVxufTtcblxuLyoqXG4gKiBnZXQgc3R5bGUgcHJvcGVydHkgdXNlIGZvciBoaWRlL3JldmVhbCB0cmFuc2l0aW9uIGVuZFxuICogQHBhcmFtIHtTdHJpbmd9IHN0eWxlUHJvcGVydHkgLSBoaWRkZW5TdHlsZS92aXNpYmxlU3R5bGVcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cbnByb3RvLmdldEhpZGVSZXZlYWxUcmFuc2l0aW9uRW5kUHJvcGVydHkgPSBmdW5jdGlvbiggc3R5bGVQcm9wZXJ0eSApIHtcbiAgdmFyIG9wdGlvblN0eWxlID0gdGhpcy5sYXlvdXQub3B0aW9uc1sgc3R5bGVQcm9wZXJ0eSBdO1xuICAvLyB1c2Ugb3BhY2l0eVxuICBpZiAoIG9wdGlvblN0eWxlLm9wYWNpdHkgKSB7XG4gICAgcmV0dXJuICdvcGFjaXR5JztcbiAgfVxuICAvLyBnZXQgZmlyc3QgcHJvcGVydHlcbiAgZm9yICggdmFyIHByb3AgaW4gb3B0aW9uU3R5bGUgKSB7XG4gICAgcmV0dXJuIHByb3A7XG4gIH1cbn07XG5cbnByb3RvLmhpZGUgPSBmdW5jdGlvbigpIHtcbiAgLy8gc2V0IGZsYWdcbiAgdGhpcy5pc0hpZGRlbiA9IHRydWU7XG4gIC8vIHJlbW92ZSBkaXNwbGF5OiBub25lXG4gIHRoaXMuY3NzKHsgZGlzcGxheTogJycgfSk7XG5cbiAgdmFyIG9wdGlvbnMgPSB0aGlzLmxheW91dC5vcHRpb25zO1xuXG4gIHZhciBvblRyYW5zaXRpb25FbmQgPSB7fTtcbiAgdmFyIHRyYW5zaXRpb25FbmRQcm9wZXJ0eSA9IHRoaXMuZ2V0SGlkZVJldmVhbFRyYW5zaXRpb25FbmRQcm9wZXJ0eSgnaGlkZGVuU3R5bGUnKTtcbiAgb25UcmFuc2l0aW9uRW5kWyB0cmFuc2l0aW9uRW5kUHJvcGVydHkgXSA9IHRoaXMub25IaWRlVHJhbnNpdGlvbkVuZDtcblxuICB0aGlzLnRyYW5zaXRpb24oe1xuICAgIGZyb206IG9wdGlvbnMudmlzaWJsZVN0eWxlLFxuICAgIHRvOiBvcHRpb25zLmhpZGRlblN0eWxlLFxuICAgIC8vIGtlZXAgaGlkZGVuIHN0dWZmIGhpZGRlblxuICAgIGlzQ2xlYW5pbmc6IHRydWUsXG4gICAgb25UcmFuc2l0aW9uRW5kOiBvblRyYW5zaXRpb25FbmRcbiAgfSk7XG59O1xuXG5wcm90by5vbkhpZGVUcmFuc2l0aW9uRW5kID0gZnVuY3Rpb24oKSB7XG4gIC8vIGNoZWNrIGlmIHN0aWxsIGhpZGRlblxuICAvLyBkdXJpbmcgdHJhbnNpdGlvbiwgaXRlbSBtYXkgaGF2ZSBiZWVuIHVuLWhpZGRlblxuICBpZiAoIHRoaXMuaXNIaWRkZW4gKSB7XG4gICAgdGhpcy5jc3MoeyBkaXNwbGF5OiAnbm9uZScgfSk7XG4gICAgdGhpcy5lbWl0RXZlbnQoJ2hpZGUnKTtcbiAgfVxufTtcblxucHJvdG8uZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmNzcyh7XG4gICAgcG9zaXRpb246ICcnLFxuICAgIGxlZnQ6ICcnLFxuICAgIHJpZ2h0OiAnJyxcbiAgICB0b3A6ICcnLFxuICAgIGJvdHRvbTogJycsXG4gICAgdHJhbnNpdGlvbjogJycsXG4gICAgdHJhbnNmb3JtOiAnJ1xuICB9KTtcbn07XG5cbnJldHVybiBJdGVtO1xuXG59KSk7XG4iLCIvKiFcbiAqIE91dGxheWVyIHYyLjEuMVxuICogdGhlIGJyYWlucyBhbmQgZ3V0cyBvZiBhIGxheW91dCBsaWJyYXJ5XG4gKiBNSVQgbGljZW5zZVxuICovXG5cbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgLyoganNoaW50IHN0cmljdDogZmFsc2UgKi8gLyogZ2xvYmFscyBkZWZpbmUsIG1vZHVsZSwgcmVxdWlyZSAqL1xuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRCAtIFJlcXVpcmVKU1xuICAgIGRlZmluZSggW1xuICAgICAgICAnZXYtZW1pdHRlci9ldi1lbWl0dGVyJyxcbiAgICAgICAgJ2dldC1zaXplL2dldC1zaXplJyxcbiAgICAgICAgJ2Zpenp5LXVpLXV0aWxzL3V0aWxzJyxcbiAgICAgICAgJy4vaXRlbSdcbiAgICAgIF0sXG4gICAgICBmdW5jdGlvbiggRXZFbWl0dGVyLCBnZXRTaXplLCB1dGlscywgSXRlbSApIHtcbiAgICAgICAgcmV0dXJuIGZhY3RvcnkoIHdpbmRvdywgRXZFbWl0dGVyLCBnZXRTaXplLCB1dGlscywgSXRlbSk7XG4gICAgICB9XG4gICAgKTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KUyAtIEJyb3dzZXJpZnksIFdlYnBhY2tcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICByZXF1aXJlKCdldi1lbWl0dGVyJyksXG4gICAgICByZXF1aXJlKCdnZXQtc2l6ZScpLFxuICAgICAgcmVxdWlyZSgnZml6enktdWktdXRpbHMnKSxcbiAgICAgIHJlcXVpcmUoJy4vaXRlbScpXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIHdpbmRvdy5PdXRsYXllciA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICB3aW5kb3cuRXZFbWl0dGVyLFxuICAgICAgd2luZG93LmdldFNpemUsXG4gICAgICB3aW5kb3cuZml6enlVSVV0aWxzLFxuICAgICAgd2luZG93Lk91dGxheWVyLkl0ZW1cbiAgICApO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggd2luZG93LCBFdkVtaXR0ZXIsIGdldFNpemUsIHV0aWxzLCBJdGVtICkge1xuJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLSB2YXJzIC0tLS0tIC8vXG5cbnZhciBjb25zb2xlID0gd2luZG93LmNvbnNvbGU7XG52YXIgalF1ZXJ5ID0gd2luZG93LmpRdWVyeTtcbnZhciBub29wID0gZnVuY3Rpb24oKSB7fTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gT3V0bGF5ZXIgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLy8gZ2xvYmFsbHkgdW5pcXVlIGlkZW50aWZpZXJzXG52YXIgR1VJRCA9IDA7XG4vLyBpbnRlcm5hbCBzdG9yZSBvZiBhbGwgT3V0bGF5ZXIgaW50YW5jZXNcbnZhciBpbnN0YW5jZXMgPSB7fTtcblxuXG4vKipcbiAqIEBwYXJhbSB7RWxlbWVudCwgU3RyaW5nfSBlbGVtZW50XG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIE91dGxheWVyKCBlbGVtZW50LCBvcHRpb25zICkge1xuICB2YXIgcXVlcnlFbGVtZW50ID0gdXRpbHMuZ2V0UXVlcnlFbGVtZW50KCBlbGVtZW50ICk7XG4gIGlmICggIXF1ZXJ5RWxlbWVudCApIHtcbiAgICBpZiAoIGNvbnNvbGUgKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCAnQmFkIGVsZW1lbnQgZm9yICcgKyB0aGlzLmNvbnN0cnVjdG9yLm5hbWVzcGFjZSArXG4gICAgICAgICc6ICcgKyAoIHF1ZXJ5RWxlbWVudCB8fCBlbGVtZW50ICkgKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMuZWxlbWVudCA9IHF1ZXJ5RWxlbWVudDtcbiAgLy8gYWRkIGpRdWVyeVxuICBpZiAoIGpRdWVyeSApIHtcbiAgICB0aGlzLiRlbGVtZW50ID0galF1ZXJ5KCB0aGlzLmVsZW1lbnQgKTtcbiAgfVxuXG4gIC8vIG9wdGlvbnNcbiAgdGhpcy5vcHRpb25zID0gdXRpbHMuZXh0ZW5kKCB7fSwgdGhpcy5jb25zdHJ1Y3Rvci5kZWZhdWx0cyApO1xuICB0aGlzLm9wdGlvbiggb3B0aW9ucyApO1xuXG4gIC8vIGFkZCBpZCBmb3IgT3V0bGF5ZXIuZ2V0RnJvbUVsZW1lbnRcbiAgdmFyIGlkID0gKytHVUlEO1xuICB0aGlzLmVsZW1lbnQub3V0bGF5ZXJHVUlEID0gaWQ7IC8vIGV4cGFuZG9cbiAgaW5zdGFuY2VzWyBpZCBdID0gdGhpczsgLy8gYXNzb2NpYXRlIHZpYSBpZFxuXG4gIC8vIGtpY2sgaXQgb2ZmXG4gIHRoaXMuX2NyZWF0ZSgpO1xuXG4gIHZhciBpc0luaXRMYXlvdXQgPSB0aGlzLl9nZXRPcHRpb24oJ2luaXRMYXlvdXQnKTtcbiAgaWYgKCBpc0luaXRMYXlvdXQgKSB7XG4gICAgdGhpcy5sYXlvdXQoKTtcbiAgfVxufVxuXG4vLyBzZXR0aW5ncyBhcmUgZm9yIGludGVybmFsIHVzZSBvbmx5XG5PdXRsYXllci5uYW1lc3BhY2UgPSAnb3V0bGF5ZXInO1xuT3V0bGF5ZXIuSXRlbSA9IEl0ZW07XG5cbi8vIGRlZmF1bHQgb3B0aW9uc1xuT3V0bGF5ZXIuZGVmYXVsdHMgPSB7XG4gIGNvbnRhaW5lclN0eWxlOiB7XG4gICAgcG9zaXRpb246ICdyZWxhdGl2ZSdcbiAgfSxcbiAgaW5pdExheW91dDogdHJ1ZSxcbiAgb3JpZ2luTGVmdDogdHJ1ZSxcbiAgb3JpZ2luVG9wOiB0cnVlLFxuICByZXNpemU6IHRydWUsXG4gIHJlc2l6ZUNvbnRhaW5lcjogdHJ1ZSxcbiAgLy8gaXRlbSBvcHRpb25zXG4gIHRyYW5zaXRpb25EdXJhdGlvbjogJzAuNHMnLFxuICBoaWRkZW5TdHlsZToge1xuICAgIG9wYWNpdHk6IDAsXG4gICAgdHJhbnNmb3JtOiAnc2NhbGUoMC4wMDEpJ1xuICB9LFxuICB2aXNpYmxlU3R5bGU6IHtcbiAgICBvcGFjaXR5OiAxLFxuICAgIHRyYW5zZm9ybTogJ3NjYWxlKDEpJ1xuICB9XG59O1xuXG52YXIgcHJvdG8gPSBPdXRsYXllci5wcm90b3R5cGU7XG4vLyBpbmhlcml0IEV2RW1pdHRlclxudXRpbHMuZXh0ZW5kKCBwcm90bywgRXZFbWl0dGVyLnByb3RvdHlwZSApO1xuXG4vKipcbiAqIHNldCBvcHRpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICovXG5wcm90by5vcHRpb24gPSBmdW5jdGlvbiggb3B0cyApIHtcbiAgdXRpbHMuZXh0ZW5kKCB0aGlzLm9wdGlvbnMsIG9wdHMgKTtcbn07XG5cbi8qKlxuICogZ2V0IGJhY2t3YXJkcyBjb21wYXRpYmxlIG9wdGlvbiB2YWx1ZSwgY2hlY2sgb2xkIG5hbWVcbiAqL1xucHJvdG8uX2dldE9wdGlvbiA9IGZ1bmN0aW9uKCBvcHRpb24gKSB7XG4gIHZhciBvbGRPcHRpb24gPSB0aGlzLmNvbnN0cnVjdG9yLmNvbXBhdE9wdGlvbnNbIG9wdGlvbiBdO1xuICByZXR1cm4gb2xkT3B0aW9uICYmIHRoaXMub3B0aW9uc1sgb2xkT3B0aW9uIF0gIT09IHVuZGVmaW5lZCA/XG4gICAgdGhpcy5vcHRpb25zWyBvbGRPcHRpb24gXSA6IHRoaXMub3B0aW9uc1sgb3B0aW9uIF07XG59O1xuXG5PdXRsYXllci5jb21wYXRPcHRpb25zID0ge1xuICAvLyBjdXJyZW50TmFtZTogb2xkTmFtZVxuICBpbml0TGF5b3V0OiAnaXNJbml0TGF5b3V0JyxcbiAgaG9yaXpvbnRhbDogJ2lzSG9yaXpvbnRhbCcsXG4gIGxheW91dEluc3RhbnQ6ICdpc0xheW91dEluc3RhbnQnLFxuICBvcmlnaW5MZWZ0OiAnaXNPcmlnaW5MZWZ0JyxcbiAgb3JpZ2luVG9wOiAnaXNPcmlnaW5Ub3AnLFxuICByZXNpemU6ICdpc1Jlc2l6ZUJvdW5kJyxcbiAgcmVzaXplQ29udGFpbmVyOiAnaXNSZXNpemluZ0NvbnRhaW5lcidcbn07XG5cbnByb3RvLl9jcmVhdGUgPSBmdW5jdGlvbigpIHtcbiAgLy8gZ2V0IGl0ZW1zIGZyb20gY2hpbGRyZW5cbiAgdGhpcy5yZWxvYWRJdGVtcygpO1xuICAvLyBlbGVtZW50cyB0aGF0IGFmZmVjdCBsYXlvdXQsIGJ1dCBhcmUgbm90IGxhaWQgb3V0XG4gIHRoaXMuc3RhbXBzID0gW107XG4gIHRoaXMuc3RhbXAoIHRoaXMub3B0aW9ucy5zdGFtcCApO1xuICAvLyBzZXQgY29udGFpbmVyIHN0eWxlXG4gIHV0aWxzLmV4dGVuZCggdGhpcy5lbGVtZW50LnN0eWxlLCB0aGlzLm9wdGlvbnMuY29udGFpbmVyU3R5bGUgKTtcblxuICAvLyBiaW5kIHJlc2l6ZSBtZXRob2RcbiAgdmFyIGNhbkJpbmRSZXNpemUgPSB0aGlzLl9nZXRPcHRpb24oJ3Jlc2l6ZScpO1xuICBpZiAoIGNhbkJpbmRSZXNpemUgKSB7XG4gICAgdGhpcy5iaW5kUmVzaXplKCk7XG4gIH1cbn07XG5cbi8vIGdvZXMgdGhyb3VnaCBhbGwgY2hpbGRyZW4gYWdhaW4gYW5kIGdldHMgYnJpY2tzIGluIHByb3BlciBvcmRlclxucHJvdG8ucmVsb2FkSXRlbXMgPSBmdW5jdGlvbigpIHtcbiAgLy8gY29sbGVjdGlvbiBvZiBpdGVtIGVsZW1lbnRzXG4gIHRoaXMuaXRlbXMgPSB0aGlzLl9pdGVtaXplKCB0aGlzLmVsZW1lbnQuY2hpbGRyZW4gKTtcbn07XG5cblxuLyoqXG4gKiB0dXJuIGVsZW1lbnRzIGludG8gT3V0bGF5ZXIuSXRlbXMgdG8gYmUgdXNlZCBpbiBsYXlvdXRcbiAqIEBwYXJhbSB7QXJyYXkgb3IgTm9kZUxpc3Qgb3IgSFRNTEVsZW1lbnR9IGVsZW1zXG4gKiBAcmV0dXJucyB7QXJyYXl9IGl0ZW1zIC0gY29sbGVjdGlvbiBvZiBuZXcgT3V0bGF5ZXIgSXRlbXNcbiAqL1xucHJvdG8uX2l0ZW1pemUgPSBmdW5jdGlvbiggZWxlbXMgKSB7XG5cbiAgdmFyIGl0ZW1FbGVtcyA9IHRoaXMuX2ZpbHRlckZpbmRJdGVtRWxlbWVudHMoIGVsZW1zICk7XG4gIHZhciBJdGVtID0gdGhpcy5jb25zdHJ1Y3Rvci5JdGVtO1xuXG4gIC8vIGNyZWF0ZSBuZXcgT3V0bGF5ZXIgSXRlbXMgZm9yIGNvbGxlY3Rpb25cbiAgdmFyIGl0ZW1zID0gW107XG4gIGZvciAoIHZhciBpPTA7IGkgPCBpdGVtRWxlbXMubGVuZ3RoOyBpKysgKSB7XG4gICAgdmFyIGVsZW0gPSBpdGVtRWxlbXNbaV07XG4gICAgdmFyIGl0ZW0gPSBuZXcgSXRlbSggZWxlbSwgdGhpcyApO1xuICAgIGl0ZW1zLnB1c2goIGl0ZW0gKTtcbiAgfVxuXG4gIHJldHVybiBpdGVtcztcbn07XG5cbi8qKlxuICogZ2V0IGl0ZW0gZWxlbWVudHMgdG8gYmUgdXNlZCBpbiBsYXlvdXRcbiAqIEBwYXJhbSB7QXJyYXkgb3IgTm9kZUxpc3Qgb3IgSFRNTEVsZW1lbnR9IGVsZW1zXG4gKiBAcmV0dXJucyB7QXJyYXl9IGl0ZW1zIC0gaXRlbSBlbGVtZW50c1xuICovXG5wcm90by5fZmlsdGVyRmluZEl0ZW1FbGVtZW50cyA9IGZ1bmN0aW9uKCBlbGVtcyApIHtcbiAgcmV0dXJuIHV0aWxzLmZpbHRlckZpbmRFbGVtZW50cyggZWxlbXMsIHRoaXMub3B0aW9ucy5pdGVtU2VsZWN0b3IgKTtcbn07XG5cbi8qKlxuICogZ2V0dGVyIG1ldGhvZCBmb3IgZ2V0dGluZyBpdGVtIGVsZW1lbnRzXG4gKiBAcmV0dXJucyB7QXJyYXl9IGVsZW1zIC0gY29sbGVjdGlvbiBvZiBpdGVtIGVsZW1lbnRzXG4gKi9cbnByb3RvLmdldEl0ZW1FbGVtZW50cyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5pdGVtcy5tYXAoIGZ1bmN0aW9uKCBpdGVtICkge1xuICAgIHJldHVybiBpdGVtLmVsZW1lbnQ7XG4gIH0pO1xufTtcblxuLy8gLS0tLS0gaW5pdCAmIGxheW91dCAtLS0tLSAvL1xuXG4vKipcbiAqIGxheXMgb3V0IGFsbCBpdGVtc1xuICovXG5wcm90by5sYXlvdXQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5fcmVzZXRMYXlvdXQoKTtcbiAgdGhpcy5fbWFuYWdlU3RhbXBzKCk7XG5cbiAgLy8gZG9uJ3QgYW5pbWF0ZSBmaXJzdCBsYXlvdXRcbiAgdmFyIGxheW91dEluc3RhbnQgPSB0aGlzLl9nZXRPcHRpb24oJ2xheW91dEluc3RhbnQnKTtcbiAgdmFyIGlzSW5zdGFudCA9IGxheW91dEluc3RhbnQgIT09IHVuZGVmaW5lZCA/XG4gICAgbGF5b3V0SW5zdGFudCA6ICF0aGlzLl9pc0xheW91dEluaXRlZDtcbiAgdGhpcy5sYXlvdXRJdGVtcyggdGhpcy5pdGVtcywgaXNJbnN0YW50ICk7XG5cbiAgLy8gZmxhZyBmb3IgaW5pdGFsaXplZFxuICB0aGlzLl9pc0xheW91dEluaXRlZCA9IHRydWU7XG59O1xuXG4vLyBfaW5pdCBpcyBhbGlhcyBmb3IgbGF5b3V0XG5wcm90by5faW5pdCA9IHByb3RvLmxheW91dDtcblxuLyoqXG4gKiBsb2dpYyBiZWZvcmUgYW55IG5ldyBsYXlvdXRcbiAqL1xucHJvdG8uX3Jlc2V0TGF5b3V0ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZ2V0U2l6ZSgpO1xufTtcblxuXG5wcm90by5nZXRTaXplID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuc2l6ZSA9IGdldFNpemUoIHRoaXMuZWxlbWVudCApO1xufTtcblxuLyoqXG4gKiBnZXQgbWVhc3VyZW1lbnQgZnJvbSBvcHRpb24sIGZvciBjb2x1bW5XaWR0aCwgcm93SGVpZ2h0LCBndXR0ZXJcbiAqIGlmIG9wdGlvbiBpcyBTdHJpbmcgLT4gZ2V0IGVsZW1lbnQgZnJvbSBzZWxlY3RvciBzdHJpbmcsICYgZ2V0IHNpemUgb2YgZWxlbWVudFxuICogaWYgb3B0aW9uIGlzIEVsZW1lbnQgLT4gZ2V0IHNpemUgb2YgZWxlbWVudFxuICogZWxzZSB1c2Ugb3B0aW9uIGFzIGEgbnVtYmVyXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1lYXN1cmVtZW50XG4gKiBAcGFyYW0ge1N0cmluZ30gc2l6ZSAtIHdpZHRoIG9yIGhlaWdodFxuICogQHByaXZhdGVcbiAqL1xucHJvdG8uX2dldE1lYXN1cmVtZW50ID0gZnVuY3Rpb24oIG1lYXN1cmVtZW50LCBzaXplICkge1xuICB2YXIgb3B0aW9uID0gdGhpcy5vcHRpb25zWyBtZWFzdXJlbWVudCBdO1xuICB2YXIgZWxlbTtcbiAgaWYgKCAhb3B0aW9uICkge1xuICAgIC8vIGRlZmF1bHQgdG8gMFxuICAgIHRoaXNbIG1lYXN1cmVtZW50IF0gPSAwO1xuICB9IGVsc2Uge1xuICAgIC8vIHVzZSBvcHRpb24gYXMgYW4gZWxlbWVudFxuICAgIGlmICggdHlwZW9mIG9wdGlvbiA9PSAnc3RyaW5nJyApIHtcbiAgICAgIGVsZW0gPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3Rvciggb3B0aW9uICk7XG4gICAgfSBlbHNlIGlmICggb3B0aW9uIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgKSB7XG4gICAgICBlbGVtID0gb3B0aW9uO1xuICAgIH1cbiAgICAvLyB1c2Ugc2l6ZSBvZiBlbGVtZW50LCBpZiBlbGVtZW50XG4gICAgdGhpc1sgbWVhc3VyZW1lbnQgXSA9IGVsZW0gPyBnZXRTaXplKCBlbGVtIClbIHNpemUgXSA6IG9wdGlvbjtcbiAgfVxufTtcblxuLyoqXG4gKiBsYXlvdXQgYSBjb2xsZWN0aW9uIG9mIGl0ZW0gZWxlbWVudHNcbiAqIEBhcGkgcHVibGljXG4gKi9cbnByb3RvLmxheW91dEl0ZW1zID0gZnVuY3Rpb24oIGl0ZW1zLCBpc0luc3RhbnQgKSB7XG4gIGl0ZW1zID0gdGhpcy5fZ2V0SXRlbXNGb3JMYXlvdXQoIGl0ZW1zICk7XG5cbiAgdGhpcy5fbGF5b3V0SXRlbXMoIGl0ZW1zLCBpc0luc3RhbnQgKTtcblxuICB0aGlzLl9wb3N0TGF5b3V0KCk7XG59O1xuXG4vKipcbiAqIGdldCB0aGUgaXRlbXMgdG8gYmUgbGFpZCBvdXRcbiAqIHlvdSBtYXkgd2FudCB0byBza2lwIG92ZXIgc29tZSBpdGVtc1xuICogQHBhcmFtIHtBcnJheX0gaXRlbXNcbiAqIEByZXR1cm5zIHtBcnJheX0gaXRlbXNcbiAqL1xucHJvdG8uX2dldEl0ZW1zRm9yTGF5b3V0ID0gZnVuY3Rpb24oIGl0ZW1zICkge1xuICByZXR1cm4gaXRlbXMuZmlsdGVyKCBmdW5jdGlvbiggaXRlbSApIHtcbiAgICByZXR1cm4gIWl0ZW0uaXNJZ25vcmVkO1xuICB9KTtcbn07XG5cbi8qKlxuICogbGF5b3V0IGl0ZW1zXG4gKiBAcGFyYW0ge0FycmF5fSBpdGVtc1xuICogQHBhcmFtIHtCb29sZWFufSBpc0luc3RhbnRcbiAqL1xucHJvdG8uX2xheW91dEl0ZW1zID0gZnVuY3Rpb24oIGl0ZW1zLCBpc0luc3RhbnQgKSB7XG4gIHRoaXMuX2VtaXRDb21wbGV0ZU9uSXRlbXMoICdsYXlvdXQnLCBpdGVtcyApO1xuXG4gIGlmICggIWl0ZW1zIHx8ICFpdGVtcy5sZW5ndGggKSB7XG4gICAgLy8gbm8gaXRlbXMsIGVtaXQgZXZlbnQgd2l0aCBlbXB0eSBhcnJheVxuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBxdWV1ZSA9IFtdO1xuXG4gIGl0ZW1zLmZvckVhY2goIGZ1bmN0aW9uKCBpdGVtICkge1xuICAgIC8vIGdldCB4L3kgb2JqZWN0IGZyb20gbWV0aG9kXG4gICAgdmFyIHBvc2l0aW9uID0gdGhpcy5fZ2V0SXRlbUxheW91dFBvc2l0aW9uKCBpdGVtICk7XG4gICAgLy8gZW5xdWV1ZVxuICAgIHBvc2l0aW9uLml0ZW0gPSBpdGVtO1xuICAgIHBvc2l0aW9uLmlzSW5zdGFudCA9IGlzSW5zdGFudCB8fCBpdGVtLmlzTGF5b3V0SW5zdGFudDtcbiAgICBxdWV1ZS5wdXNoKCBwb3NpdGlvbiApO1xuICB9LCB0aGlzICk7XG5cbiAgdGhpcy5fcHJvY2Vzc0xheW91dFF1ZXVlKCBxdWV1ZSApO1xufTtcblxuLyoqXG4gKiBnZXQgaXRlbSBsYXlvdXQgcG9zaXRpb25cbiAqIEBwYXJhbSB7T3V0bGF5ZXIuSXRlbX0gaXRlbVxuICogQHJldHVybnMge09iamVjdH0geCBhbmQgeSBwb3NpdGlvblxuICovXG5wcm90by5fZ2V0SXRlbUxheW91dFBvc2l0aW9uID0gZnVuY3Rpb24oIC8qIGl0ZW0gKi8gKSB7XG4gIHJldHVybiB7XG4gICAgeDogMCxcbiAgICB5OiAwXG4gIH07XG59O1xuXG4vKipcbiAqIGl0ZXJhdGUgb3ZlciBhcnJheSBhbmQgcG9zaXRpb24gZWFjaCBpdGVtXG4gKiBSZWFzb24gYmVpbmcgLSBzZXBhcmF0aW5nIHRoaXMgbG9naWMgcHJldmVudHMgJ2xheW91dCBpbnZhbGlkYXRpb24nXG4gKiB0aHggQHBhdWxfaXJpc2hcbiAqIEBwYXJhbSB7QXJyYXl9IHF1ZXVlXG4gKi9cbnByb3RvLl9wcm9jZXNzTGF5b3V0UXVldWUgPSBmdW5jdGlvbiggcXVldWUgKSB7XG4gIHRoaXMudXBkYXRlU3RhZ2dlcigpO1xuICBxdWV1ZS5mb3JFYWNoKCBmdW5jdGlvbiggb2JqLCBpICkge1xuICAgIHRoaXMuX3Bvc2l0aW9uSXRlbSggb2JqLml0ZW0sIG9iai54LCBvYmoueSwgb2JqLmlzSW5zdGFudCwgaSApO1xuICB9LCB0aGlzICk7XG59O1xuXG4vLyBzZXQgc3RhZ2dlciBmcm9tIG9wdGlvbiBpbiBtaWxsaXNlY29uZHMgbnVtYmVyXG5wcm90by51cGRhdGVTdGFnZ2VyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzdGFnZ2VyID0gdGhpcy5vcHRpb25zLnN0YWdnZXI7XG4gIGlmICggc3RhZ2dlciA9PT0gbnVsbCB8fCBzdGFnZ2VyID09PSB1bmRlZmluZWQgKSB7XG4gICAgdGhpcy5zdGFnZ2VyID0gMDtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5zdGFnZ2VyID0gZ2V0TWlsbGlzZWNvbmRzKCBzdGFnZ2VyICk7XG4gIHJldHVybiB0aGlzLnN0YWdnZXI7XG59O1xuXG4vKipcbiAqIFNldHMgcG9zaXRpb24gb2YgaXRlbSBpbiBET01cbiAqIEBwYXJhbSB7T3V0bGF5ZXIuSXRlbX0gaXRlbVxuICogQHBhcmFtIHtOdW1iZXJ9IHggLSBob3Jpem9udGFsIHBvc2l0aW9uXG4gKiBAcGFyYW0ge051bWJlcn0geSAtIHZlcnRpY2FsIHBvc2l0aW9uXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGlzSW5zdGFudCAtIGRpc2FibGVzIHRyYW5zaXRpb25zXG4gKi9cbnByb3RvLl9wb3NpdGlvbkl0ZW0gPSBmdW5jdGlvbiggaXRlbSwgeCwgeSwgaXNJbnN0YW50LCBpICkge1xuICBpZiAoIGlzSW5zdGFudCApIHtcbiAgICAvLyBpZiBub3QgdHJhbnNpdGlvbiwganVzdCBzZXQgQ1NTXG4gICAgaXRlbS5nb1RvKCB4LCB5ICk7XG4gIH0gZWxzZSB7XG4gICAgaXRlbS5zdGFnZ2VyKCBpICogdGhpcy5zdGFnZ2VyICk7XG4gICAgaXRlbS5tb3ZlVG8oIHgsIHkgKTtcbiAgfVxufTtcblxuLyoqXG4gKiBBbnkgbG9naWMgeW91IHdhbnQgdG8gZG8gYWZ0ZXIgZWFjaCBsYXlvdXQsXG4gKiBpLmUuIHNpemUgdGhlIGNvbnRhaW5lclxuICovXG5wcm90by5fcG9zdExheW91dCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnJlc2l6ZUNvbnRhaW5lcigpO1xufTtcblxucHJvdG8ucmVzaXplQ29udGFpbmVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBpc1Jlc2l6aW5nQ29udGFpbmVyID0gdGhpcy5fZ2V0T3B0aW9uKCdyZXNpemVDb250YWluZXInKTtcbiAgaWYgKCAhaXNSZXNpemluZ0NvbnRhaW5lciApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIHNpemUgPSB0aGlzLl9nZXRDb250YWluZXJTaXplKCk7XG4gIGlmICggc2l6ZSApIHtcbiAgICB0aGlzLl9zZXRDb250YWluZXJNZWFzdXJlKCBzaXplLndpZHRoLCB0cnVlICk7XG4gICAgdGhpcy5fc2V0Q29udGFpbmVyTWVhc3VyZSggc2l6ZS5oZWlnaHQsIGZhbHNlICk7XG4gIH1cbn07XG5cbi8qKlxuICogU2V0cyB3aWR0aCBvciBoZWlnaHQgb2YgY29udGFpbmVyIGlmIHJldHVybmVkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBzaXplXG4gKiAgIEBwYXJhbSB7TnVtYmVyfSB3aWR0aFxuICogICBAcGFyYW0ge051bWJlcn0gaGVpZ2h0XG4gKi9cbnByb3RvLl9nZXRDb250YWluZXJTaXplID0gbm9vcDtcblxuLyoqXG4gKiBAcGFyYW0ge051bWJlcn0gbWVhc3VyZSAtIHNpemUgb2Ygd2lkdGggb3IgaGVpZ2h0XG4gKiBAcGFyYW0ge0Jvb2xlYW59IGlzV2lkdGhcbiAqL1xucHJvdG8uX3NldENvbnRhaW5lck1lYXN1cmUgPSBmdW5jdGlvbiggbWVhc3VyZSwgaXNXaWR0aCApIHtcbiAgaWYgKCBtZWFzdXJlID09PSB1bmRlZmluZWQgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGVsZW1TaXplID0gdGhpcy5zaXplO1xuICAvLyBhZGQgcGFkZGluZyBhbmQgYm9yZGVyIHdpZHRoIGlmIGJvcmRlciBib3hcbiAgaWYgKCBlbGVtU2l6ZS5pc0JvcmRlckJveCApIHtcbiAgICBtZWFzdXJlICs9IGlzV2lkdGggPyBlbGVtU2l6ZS5wYWRkaW5nTGVmdCArIGVsZW1TaXplLnBhZGRpbmdSaWdodCArXG4gICAgICBlbGVtU2l6ZS5ib3JkZXJMZWZ0V2lkdGggKyBlbGVtU2l6ZS5ib3JkZXJSaWdodFdpZHRoIDpcbiAgICAgIGVsZW1TaXplLnBhZGRpbmdCb3R0b20gKyBlbGVtU2l6ZS5wYWRkaW5nVG9wICtcbiAgICAgIGVsZW1TaXplLmJvcmRlclRvcFdpZHRoICsgZWxlbVNpemUuYm9yZGVyQm90dG9tV2lkdGg7XG4gIH1cblxuICBtZWFzdXJlID0gTWF0aC5tYXgoIG1lYXN1cmUsIDAgKTtcbiAgdGhpcy5lbGVtZW50LnN0eWxlWyBpc1dpZHRoID8gJ3dpZHRoJyA6ICdoZWlnaHQnIF0gPSBtZWFzdXJlICsgJ3B4Jztcbn07XG5cbi8qKlxuICogZW1pdCBldmVudENvbXBsZXRlIG9uIGEgY29sbGVjdGlvbiBvZiBpdGVtcyBldmVudHNcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAqIEBwYXJhbSB7QXJyYXl9IGl0ZW1zIC0gT3V0bGF5ZXIuSXRlbXNcbiAqL1xucHJvdG8uX2VtaXRDb21wbGV0ZU9uSXRlbXMgPSBmdW5jdGlvbiggZXZlbnROYW1lLCBpdGVtcyApIHtcbiAgdmFyIF90aGlzID0gdGhpcztcbiAgZnVuY3Rpb24gb25Db21wbGV0ZSgpIHtcbiAgICBfdGhpcy5kaXNwYXRjaEV2ZW50KCBldmVudE5hbWUgKyAnQ29tcGxldGUnLCBudWxsLCBbIGl0ZW1zIF0gKTtcbiAgfVxuXG4gIHZhciBjb3VudCA9IGl0ZW1zLmxlbmd0aDtcbiAgaWYgKCAhaXRlbXMgfHwgIWNvdW50ICkge1xuICAgIG9uQ29tcGxldGUoKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgZG9uZUNvdW50ID0gMDtcbiAgZnVuY3Rpb24gdGljaygpIHtcbiAgICBkb25lQ291bnQrKztcbiAgICBpZiAoIGRvbmVDb3VudCA9PSBjb3VudCApIHtcbiAgICAgIG9uQ29tcGxldGUoKTtcbiAgICB9XG4gIH1cblxuICAvLyBiaW5kIGNhbGxiYWNrXG4gIGl0ZW1zLmZvckVhY2goIGZ1bmN0aW9uKCBpdGVtICkge1xuICAgIGl0ZW0ub25jZSggZXZlbnROYW1lLCB0aWNrICk7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBlbWl0cyBldmVudHMgdmlhIEV2RW1pdHRlciBhbmQgalF1ZXJ5IGV2ZW50c1xuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBuYW1lIG9mIGV2ZW50XG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIG9yaWdpbmFsIGV2ZW50XG4gKiBAcGFyYW0ge0FycmF5fSBhcmdzIC0gZXh0cmEgYXJndW1lbnRzXG4gKi9cbnByb3RvLmRpc3BhdGNoRXZlbnQgPSBmdW5jdGlvbiggdHlwZSwgZXZlbnQsIGFyZ3MgKSB7XG4gIC8vIGFkZCBvcmlnaW5hbCBldmVudCB0byBhcmd1bWVudHNcbiAgdmFyIGVtaXRBcmdzID0gZXZlbnQgPyBbIGV2ZW50IF0uY29uY2F0KCBhcmdzICkgOiBhcmdzO1xuICB0aGlzLmVtaXRFdmVudCggdHlwZSwgZW1pdEFyZ3MgKTtcblxuICBpZiAoIGpRdWVyeSApIHtcbiAgICAvLyBzZXQgdGhpcy4kZWxlbWVudFxuICAgIHRoaXMuJGVsZW1lbnQgPSB0aGlzLiRlbGVtZW50IHx8IGpRdWVyeSggdGhpcy5lbGVtZW50ICk7XG4gICAgaWYgKCBldmVudCApIHtcbiAgICAgIC8vIGNyZWF0ZSBqUXVlcnkgZXZlbnRcbiAgICAgIHZhciAkZXZlbnQgPSBqUXVlcnkuRXZlbnQoIGV2ZW50ICk7XG4gICAgICAkZXZlbnQudHlwZSA9IHR5cGU7XG4gICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoICRldmVudCwgYXJncyApO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBqdXN0IHRyaWdnZXIgd2l0aCB0eXBlIGlmIG5vIGV2ZW50IGF2YWlsYWJsZVxuICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCB0eXBlLCBhcmdzICk7XG4gICAgfVxuICB9XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBpZ25vcmUgJiBzdGFtcHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuXG4vKipcbiAqIGtlZXAgaXRlbSBpbiBjb2xsZWN0aW9uLCBidXQgZG8gbm90IGxheSBpdCBvdXRcbiAqIGlnbm9yZWQgaXRlbXMgZG8gbm90IGdldCBza2lwcGVkIGluIGxheW91dFxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtXG4gKi9cbnByb3RvLmlnbm9yZSA9IGZ1bmN0aW9uKCBlbGVtICkge1xuICB2YXIgaXRlbSA9IHRoaXMuZ2V0SXRlbSggZWxlbSApO1xuICBpZiAoIGl0ZW0gKSB7XG4gICAgaXRlbS5pc0lnbm9yZWQgPSB0cnVlO1xuICB9XG59O1xuXG4vKipcbiAqIHJldHVybiBpdGVtIHRvIGxheW91dCBjb2xsZWN0aW9uXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1cbiAqL1xucHJvdG8udW5pZ25vcmUgPSBmdW5jdGlvbiggZWxlbSApIHtcbiAgdmFyIGl0ZW0gPSB0aGlzLmdldEl0ZW0oIGVsZW0gKTtcbiAgaWYgKCBpdGVtICkge1xuICAgIGRlbGV0ZSBpdGVtLmlzSWdub3JlZDtcbiAgfVxufTtcblxuLyoqXG4gKiBhZGRzIGVsZW1lbnRzIHRvIHN0YW1wc1xuICogQHBhcmFtIHtOb2RlTGlzdCwgQXJyYXksIEVsZW1lbnQsIG9yIFN0cmluZ30gZWxlbXNcbiAqL1xucHJvdG8uc3RhbXAgPSBmdW5jdGlvbiggZWxlbXMgKSB7XG4gIGVsZW1zID0gdGhpcy5fZmluZCggZWxlbXMgKTtcbiAgaWYgKCAhZWxlbXMgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhpcy5zdGFtcHMgPSB0aGlzLnN0YW1wcy5jb25jYXQoIGVsZW1zICk7XG4gIC8vIGlnbm9yZVxuICBlbGVtcy5mb3JFYWNoKCB0aGlzLmlnbm9yZSwgdGhpcyApO1xufTtcblxuLyoqXG4gKiByZW1vdmVzIGVsZW1lbnRzIHRvIHN0YW1wc1xuICogQHBhcmFtIHtOb2RlTGlzdCwgQXJyYXksIG9yIEVsZW1lbnR9IGVsZW1zXG4gKi9cbnByb3RvLnVuc3RhbXAgPSBmdW5jdGlvbiggZWxlbXMgKSB7XG4gIGVsZW1zID0gdGhpcy5fZmluZCggZWxlbXMgKTtcbiAgaWYgKCAhZWxlbXMgKXtcbiAgICByZXR1cm47XG4gIH1cblxuICBlbGVtcy5mb3JFYWNoKCBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAvLyBmaWx0ZXIgb3V0IHJlbW92ZWQgc3RhbXAgZWxlbWVudHNcbiAgICB1dGlscy5yZW1vdmVGcm9tKCB0aGlzLnN0YW1wcywgZWxlbSApO1xuICAgIHRoaXMudW5pZ25vcmUoIGVsZW0gKTtcbiAgfSwgdGhpcyApO1xufTtcblxuLyoqXG4gKiBmaW5kcyBjaGlsZCBlbGVtZW50c1xuICogQHBhcmFtIHtOb2RlTGlzdCwgQXJyYXksIEVsZW1lbnQsIG9yIFN0cmluZ30gZWxlbXNcbiAqIEByZXR1cm5zIHtBcnJheX0gZWxlbXNcbiAqL1xucHJvdG8uX2ZpbmQgPSBmdW5jdGlvbiggZWxlbXMgKSB7XG4gIGlmICggIWVsZW1zICkge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBpZiBzdHJpbmcsIHVzZSBhcmd1bWVudCBhcyBzZWxlY3RvciBzdHJpbmdcbiAgaWYgKCB0eXBlb2YgZWxlbXMgPT0gJ3N0cmluZycgKSB7XG4gICAgZWxlbXMgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCggZWxlbXMgKTtcbiAgfVxuICBlbGVtcyA9IHV0aWxzLm1ha2VBcnJheSggZWxlbXMgKTtcbiAgcmV0dXJuIGVsZW1zO1xufTtcblxucHJvdG8uX21hbmFnZVN0YW1wcyA9IGZ1bmN0aW9uKCkge1xuICBpZiAoICF0aGlzLnN0YW1wcyB8fCAhdGhpcy5zdGFtcHMubGVuZ3RoICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRoaXMuX2dldEJvdW5kaW5nUmVjdCgpO1xuXG4gIHRoaXMuc3RhbXBzLmZvckVhY2goIHRoaXMuX21hbmFnZVN0YW1wLCB0aGlzICk7XG59O1xuXG4vLyB1cGRhdGUgYm91bmRpbmdMZWZ0IC8gVG9wXG5wcm90by5fZ2V0Qm91bmRpbmdSZWN0ID0gZnVuY3Rpb24oKSB7XG4gIC8vIGdldCBib3VuZGluZyByZWN0IGZvciBjb250YWluZXIgZWxlbWVudFxuICB2YXIgYm91bmRpbmdSZWN0ID0gdGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB2YXIgc2l6ZSA9IHRoaXMuc2l6ZTtcbiAgdGhpcy5fYm91bmRpbmdSZWN0ID0ge1xuICAgIGxlZnQ6IGJvdW5kaW5nUmVjdC5sZWZ0ICsgc2l6ZS5wYWRkaW5nTGVmdCArIHNpemUuYm9yZGVyTGVmdFdpZHRoLFxuICAgIHRvcDogYm91bmRpbmdSZWN0LnRvcCArIHNpemUucGFkZGluZ1RvcCArIHNpemUuYm9yZGVyVG9wV2lkdGgsXG4gICAgcmlnaHQ6IGJvdW5kaW5nUmVjdC5yaWdodCAtICggc2l6ZS5wYWRkaW5nUmlnaHQgKyBzaXplLmJvcmRlclJpZ2h0V2lkdGggKSxcbiAgICBib3R0b206IGJvdW5kaW5nUmVjdC5ib3R0b20gLSAoIHNpemUucGFkZGluZ0JvdHRvbSArIHNpemUuYm9yZGVyQm90dG9tV2lkdGggKVxuICB9O1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IHN0YW1wXG4qKi9cbnByb3RvLl9tYW5hZ2VTdGFtcCA9IG5vb3A7XG5cbi8qKlxuICogZ2V0IHgveSBwb3NpdGlvbiBvZiBlbGVtZW50IHJlbGF0aXZlIHRvIGNvbnRhaW5lciBlbGVtZW50XG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1cbiAqIEByZXR1cm5zIHtPYmplY3R9IG9mZnNldCAtIGhhcyBsZWZ0LCB0b3AsIHJpZ2h0LCBib3R0b21cbiAqL1xucHJvdG8uX2dldEVsZW1lbnRPZmZzZXQgPSBmdW5jdGlvbiggZWxlbSApIHtcbiAgdmFyIGJvdW5kaW5nUmVjdCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIHZhciB0aGlzUmVjdCA9IHRoaXMuX2JvdW5kaW5nUmVjdDtcbiAgdmFyIHNpemUgPSBnZXRTaXplKCBlbGVtICk7XG4gIHZhciBvZmZzZXQgPSB7XG4gICAgbGVmdDogYm91bmRpbmdSZWN0LmxlZnQgLSB0aGlzUmVjdC5sZWZ0IC0gc2l6ZS5tYXJnaW5MZWZ0LFxuICAgIHRvcDogYm91bmRpbmdSZWN0LnRvcCAtIHRoaXNSZWN0LnRvcCAtIHNpemUubWFyZ2luVG9wLFxuICAgIHJpZ2h0OiB0aGlzUmVjdC5yaWdodCAtIGJvdW5kaW5nUmVjdC5yaWdodCAtIHNpemUubWFyZ2luUmlnaHQsXG4gICAgYm90dG9tOiB0aGlzUmVjdC5ib3R0b20gLSBib3VuZGluZ1JlY3QuYm90dG9tIC0gc2l6ZS5tYXJnaW5Cb3R0b21cbiAgfTtcbiAgcmV0dXJuIG9mZnNldDtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHJlc2l6ZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vLyBlbmFibGUgZXZlbnQgaGFuZGxlcnMgZm9yIGxpc3RlbmVyc1xuLy8gaS5lLiByZXNpemUgLT4gb25yZXNpemVcbnByb3RvLmhhbmRsZUV2ZW50ID0gdXRpbHMuaGFuZGxlRXZlbnQ7XG5cbi8qKlxuICogQmluZCBsYXlvdXQgdG8gd2luZG93IHJlc2l6aW5nXG4gKi9cbnByb3RvLmJpbmRSZXNpemUgPSBmdW5jdGlvbigpIHtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdyZXNpemUnLCB0aGlzICk7XG4gIHRoaXMuaXNSZXNpemVCb3VuZCA9IHRydWU7XG59O1xuXG4vKipcbiAqIFVuYmluZCBsYXlvdXQgdG8gd2luZG93IHJlc2l6aW5nXG4gKi9cbnByb3RvLnVuYmluZFJlc2l6ZSA9IGZ1bmN0aW9uKCkge1xuICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3Jlc2l6ZScsIHRoaXMgKTtcbiAgdGhpcy5pc1Jlc2l6ZUJvdW5kID0gZmFsc2U7XG59O1xuXG5wcm90by5vbnJlc2l6ZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnJlc2l6ZSgpO1xufTtcblxudXRpbHMuZGVib3VuY2VNZXRob2QoIE91dGxheWVyLCAnb25yZXNpemUnLCAxMDAgKTtcblxucHJvdG8ucmVzaXplID0gZnVuY3Rpb24oKSB7XG4gIC8vIGRvbid0IHRyaWdnZXIgaWYgc2l6ZSBkaWQgbm90IGNoYW5nZVxuICAvLyBvciBpZiByZXNpemUgd2FzIHVuYm91bmQuIFNlZSAjOVxuICBpZiAoICF0aGlzLmlzUmVzaXplQm91bmQgfHwgIXRoaXMubmVlZHNSZXNpemVMYXlvdXQoKSApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB0aGlzLmxheW91dCgpO1xufTtcblxuLyoqXG4gKiBjaGVjayBpZiBsYXlvdXQgaXMgbmVlZGVkIHBvc3QgbGF5b3V0XG4gKiBAcmV0dXJucyBCb29sZWFuXG4gKi9cbnByb3RvLm5lZWRzUmVzaXplTGF5b3V0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzaXplID0gZ2V0U2l6ZSggdGhpcy5lbGVtZW50ICk7XG4gIC8vIGNoZWNrIHRoYXQgdGhpcy5zaXplIGFuZCBzaXplIGFyZSB0aGVyZVxuICAvLyBJRTggdHJpZ2dlcnMgcmVzaXplIG9uIGJvZHkgc2l6ZSBjaGFuZ2UsIHNvIHRoZXkgbWlnaHQgbm90IGJlXG4gIHZhciBoYXNTaXplcyA9IHRoaXMuc2l6ZSAmJiBzaXplO1xuICByZXR1cm4gaGFzU2l6ZXMgJiYgc2l6ZS5pbm5lcldpZHRoICE9PSB0aGlzLnNpemUuaW5uZXJXaWR0aDtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIG1ldGhvZHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLyoqXG4gKiBhZGQgaXRlbXMgdG8gT3V0bGF5ZXIgaW5zdGFuY2VcbiAqIEBwYXJhbSB7QXJyYXkgb3IgTm9kZUxpc3Qgb3IgRWxlbWVudH0gZWxlbXNcbiAqIEByZXR1cm5zIHtBcnJheX0gaXRlbXMgLSBPdXRsYXllci5JdGVtc1xuKiovXG5wcm90by5hZGRJdGVtcyA9IGZ1bmN0aW9uKCBlbGVtcyApIHtcbiAgdmFyIGl0ZW1zID0gdGhpcy5faXRlbWl6ZSggZWxlbXMgKTtcbiAgLy8gYWRkIGl0ZW1zIHRvIGNvbGxlY3Rpb25cbiAgaWYgKCBpdGVtcy5sZW5ndGggKSB7XG4gICAgdGhpcy5pdGVtcyA9IHRoaXMuaXRlbXMuY29uY2F0KCBpdGVtcyApO1xuICB9XG4gIHJldHVybiBpdGVtcztcbn07XG5cbi8qKlxuICogTGF5b3V0IG5ld2x5LWFwcGVuZGVkIGl0ZW0gZWxlbWVudHNcbiAqIEBwYXJhbSB7QXJyYXkgb3IgTm9kZUxpc3Qgb3IgRWxlbWVudH0gZWxlbXNcbiAqL1xucHJvdG8uYXBwZW5kZWQgPSBmdW5jdGlvbiggZWxlbXMgKSB7XG4gIHZhciBpdGVtcyA9IHRoaXMuYWRkSXRlbXMoIGVsZW1zICk7XG4gIGlmICggIWl0ZW1zLmxlbmd0aCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gbGF5b3V0IGFuZCByZXZlYWwganVzdCB0aGUgbmV3IGl0ZW1zXG4gIHRoaXMubGF5b3V0SXRlbXMoIGl0ZW1zLCB0cnVlICk7XG4gIHRoaXMucmV2ZWFsKCBpdGVtcyApO1xufTtcblxuLyoqXG4gKiBMYXlvdXQgcHJlcGVuZGVkIGVsZW1lbnRzXG4gKiBAcGFyYW0ge0FycmF5IG9yIE5vZGVMaXN0IG9yIEVsZW1lbnR9IGVsZW1zXG4gKi9cbnByb3RvLnByZXBlbmRlZCA9IGZ1bmN0aW9uKCBlbGVtcyApIHtcbiAgdmFyIGl0ZW1zID0gdGhpcy5faXRlbWl6ZSggZWxlbXMgKTtcbiAgaWYgKCAhaXRlbXMubGVuZ3RoICkge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBhZGQgaXRlbXMgdG8gYmVnaW5uaW5nIG9mIGNvbGxlY3Rpb25cbiAgdmFyIHByZXZpb3VzSXRlbXMgPSB0aGlzLml0ZW1zLnNsaWNlKDApO1xuICB0aGlzLml0ZW1zID0gaXRlbXMuY29uY2F0KCBwcmV2aW91c0l0ZW1zICk7XG4gIC8vIHN0YXJ0IG5ldyBsYXlvdXRcbiAgdGhpcy5fcmVzZXRMYXlvdXQoKTtcbiAgdGhpcy5fbWFuYWdlU3RhbXBzKCk7XG4gIC8vIGxheW91dCBuZXcgc3R1ZmYgd2l0aG91dCB0cmFuc2l0aW9uXG4gIHRoaXMubGF5b3V0SXRlbXMoIGl0ZW1zLCB0cnVlICk7XG4gIHRoaXMucmV2ZWFsKCBpdGVtcyApO1xuICAvLyBsYXlvdXQgcHJldmlvdXMgaXRlbXNcbiAgdGhpcy5sYXlvdXRJdGVtcyggcHJldmlvdXNJdGVtcyApO1xufTtcblxuLyoqXG4gKiByZXZlYWwgYSBjb2xsZWN0aW9uIG9mIGl0ZW1zXG4gKiBAcGFyYW0ge0FycmF5IG9mIE91dGxheWVyLkl0ZW1zfSBpdGVtc1xuICovXG5wcm90by5yZXZlYWwgPSBmdW5jdGlvbiggaXRlbXMgKSB7XG4gIHRoaXMuX2VtaXRDb21wbGV0ZU9uSXRlbXMoICdyZXZlYWwnLCBpdGVtcyApO1xuICBpZiAoICFpdGVtcyB8fCAhaXRlbXMubGVuZ3RoICkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgc3RhZ2dlciA9IHRoaXMudXBkYXRlU3RhZ2dlcigpO1xuICBpdGVtcy5mb3JFYWNoKCBmdW5jdGlvbiggaXRlbSwgaSApIHtcbiAgICBpdGVtLnN0YWdnZXIoIGkgKiBzdGFnZ2VyICk7XG4gICAgaXRlbS5yZXZlYWwoKTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIGhpZGUgYSBjb2xsZWN0aW9uIG9mIGl0ZW1zXG4gKiBAcGFyYW0ge0FycmF5IG9mIE91dGxheWVyLkl0ZW1zfSBpdGVtc1xuICovXG5wcm90by5oaWRlID0gZnVuY3Rpb24oIGl0ZW1zICkge1xuICB0aGlzLl9lbWl0Q29tcGxldGVPbkl0ZW1zKCAnaGlkZScsIGl0ZW1zICk7XG4gIGlmICggIWl0ZW1zIHx8ICFpdGVtcy5sZW5ndGggKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBzdGFnZ2VyID0gdGhpcy51cGRhdGVTdGFnZ2VyKCk7XG4gIGl0ZW1zLmZvckVhY2goIGZ1bmN0aW9uKCBpdGVtLCBpICkge1xuICAgIGl0ZW0uc3RhZ2dlciggaSAqIHN0YWdnZXIgKTtcbiAgICBpdGVtLmhpZGUoKTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIHJldmVhbCBpdGVtIGVsZW1lbnRzXG4gKiBAcGFyYW0ge0FycmF5fSwge0VsZW1lbnR9LCB7Tm9kZUxpc3R9IGl0ZW1zXG4gKi9cbnByb3RvLnJldmVhbEl0ZW1FbGVtZW50cyA9IGZ1bmN0aW9uKCBlbGVtcyApIHtcbiAgdmFyIGl0ZW1zID0gdGhpcy5nZXRJdGVtcyggZWxlbXMgKTtcbiAgdGhpcy5yZXZlYWwoIGl0ZW1zICk7XG59O1xuXG4vKipcbiAqIGhpZGUgaXRlbSBlbGVtZW50c1xuICogQHBhcmFtIHtBcnJheX0sIHtFbGVtZW50fSwge05vZGVMaXN0fSBpdGVtc1xuICovXG5wcm90by5oaWRlSXRlbUVsZW1lbnRzID0gZnVuY3Rpb24oIGVsZW1zICkge1xuICB2YXIgaXRlbXMgPSB0aGlzLmdldEl0ZW1zKCBlbGVtcyApO1xuICB0aGlzLmhpZGUoIGl0ZW1zICk7XG59O1xuXG4vKipcbiAqIGdldCBPdXRsYXllci5JdGVtLCBnaXZlbiBhbiBFbGVtZW50XG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7T3V0bGF5ZXIuSXRlbX0gaXRlbVxuICovXG5wcm90by5nZXRJdGVtID0gZnVuY3Rpb24oIGVsZW0gKSB7XG4gIC8vIGxvb3AgdGhyb3VnaCBpdGVtcyB0byBnZXQgdGhlIG9uZSB0aGF0IG1hdGNoZXNcbiAgZm9yICggdmFyIGk9MDsgaSA8IHRoaXMuaXRlbXMubGVuZ3RoOyBpKysgKSB7XG4gICAgdmFyIGl0ZW0gPSB0aGlzLml0ZW1zW2ldO1xuICAgIGlmICggaXRlbS5lbGVtZW50ID09IGVsZW0gKSB7XG4gICAgICAvLyByZXR1cm4gaXRlbVxuICAgICAgcmV0dXJuIGl0ZW07XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIGdldCBjb2xsZWN0aW9uIG9mIE91dGxheWVyLkl0ZW1zLCBnaXZlbiBFbGVtZW50c1xuICogQHBhcmFtIHtBcnJheX0gZWxlbXNcbiAqIEByZXR1cm5zIHtBcnJheX0gaXRlbXMgLSBPdXRsYXllci5JdGVtc1xuICovXG5wcm90by5nZXRJdGVtcyA9IGZ1bmN0aW9uKCBlbGVtcyApIHtcbiAgZWxlbXMgPSB1dGlscy5tYWtlQXJyYXkoIGVsZW1zICk7XG4gIHZhciBpdGVtcyA9IFtdO1xuICBlbGVtcy5mb3JFYWNoKCBmdW5jdGlvbiggZWxlbSApIHtcbiAgICB2YXIgaXRlbSA9IHRoaXMuZ2V0SXRlbSggZWxlbSApO1xuICAgIGlmICggaXRlbSApIHtcbiAgICAgIGl0ZW1zLnB1c2goIGl0ZW0gKTtcbiAgICB9XG4gIH0sIHRoaXMgKTtcblxuICByZXR1cm4gaXRlbXM7XG59O1xuXG4vKipcbiAqIHJlbW92ZSBlbGVtZW50KHMpIGZyb20gaW5zdGFuY2UgYW5kIERPTVxuICogQHBhcmFtIHtBcnJheSBvciBOb2RlTGlzdCBvciBFbGVtZW50fSBlbGVtc1xuICovXG5wcm90by5yZW1vdmUgPSBmdW5jdGlvbiggZWxlbXMgKSB7XG4gIHZhciByZW1vdmVJdGVtcyA9IHRoaXMuZ2V0SXRlbXMoIGVsZW1zICk7XG5cbiAgdGhpcy5fZW1pdENvbXBsZXRlT25JdGVtcyggJ3JlbW92ZScsIHJlbW92ZUl0ZW1zICk7XG5cbiAgLy8gYmFpbCBpZiBubyBpdGVtcyB0byByZW1vdmVcbiAgaWYgKCAhcmVtb3ZlSXRlbXMgfHwgIXJlbW92ZUl0ZW1zLmxlbmd0aCApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICByZW1vdmVJdGVtcy5mb3JFYWNoKCBmdW5jdGlvbiggaXRlbSApIHtcbiAgICBpdGVtLnJlbW92ZSgpO1xuICAgIC8vIHJlbW92ZSBpdGVtIGZyb20gY29sbGVjdGlvblxuICAgIHV0aWxzLnJlbW92ZUZyb20oIHRoaXMuaXRlbXMsIGl0ZW0gKTtcbiAgfSwgdGhpcyApO1xufTtcblxuLy8gLS0tLS0gZGVzdHJveSAtLS0tLSAvL1xuXG4vLyByZW1vdmUgYW5kIGRpc2FibGUgT3V0bGF5ZXIgaW5zdGFuY2VcbnByb3RvLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgLy8gY2xlYW4gdXAgZHluYW1pYyBzdHlsZXNcbiAgdmFyIHN0eWxlID0gdGhpcy5lbGVtZW50LnN0eWxlO1xuICBzdHlsZS5oZWlnaHQgPSAnJztcbiAgc3R5bGUucG9zaXRpb24gPSAnJztcbiAgc3R5bGUud2lkdGggPSAnJztcbiAgLy8gZGVzdHJveSBpdGVtc1xuICB0aGlzLml0ZW1zLmZvckVhY2goIGZ1bmN0aW9uKCBpdGVtICkge1xuICAgIGl0ZW0uZGVzdHJveSgpO1xuICB9KTtcblxuICB0aGlzLnVuYmluZFJlc2l6ZSgpO1xuXG4gIHZhciBpZCA9IHRoaXMuZWxlbWVudC5vdXRsYXllckdVSUQ7XG4gIGRlbGV0ZSBpbnN0YW5jZXNbIGlkIF07IC8vIHJlbW92ZSByZWZlcmVuY2UgdG8gaW5zdGFuY2UgYnkgaWRcbiAgZGVsZXRlIHRoaXMuZWxlbWVudC5vdXRsYXllckdVSUQ7XG4gIC8vIHJlbW92ZSBkYXRhIGZvciBqUXVlcnlcbiAgaWYgKCBqUXVlcnkgKSB7XG4gICAgalF1ZXJ5LnJlbW92ZURhdGEoIHRoaXMuZWxlbWVudCwgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lc3BhY2UgKTtcbiAgfVxuXG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBkYXRhIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8qKlxuICogZ2V0IE91dGxheWVyIGluc3RhbmNlIGZyb20gZWxlbWVudFxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtXG4gKiBAcmV0dXJucyB7T3V0bGF5ZXJ9XG4gKi9cbk91dGxheWVyLmRhdGEgPSBmdW5jdGlvbiggZWxlbSApIHtcbiAgZWxlbSA9IHV0aWxzLmdldFF1ZXJ5RWxlbWVudCggZWxlbSApO1xuICB2YXIgaWQgPSBlbGVtICYmIGVsZW0ub3V0bGF5ZXJHVUlEO1xuICByZXR1cm4gaWQgJiYgaW5zdGFuY2VzWyBpZCBdO1xufTtcblxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBjcmVhdGUgT3V0bGF5ZXIgY2xhc3MgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLyoqXG4gKiBjcmVhdGUgYSBsYXlvdXQgY2xhc3NcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VcbiAqL1xuT3V0bGF5ZXIuY3JlYXRlID0gZnVuY3Rpb24oIG5hbWVzcGFjZSwgb3B0aW9ucyApIHtcbiAgLy8gc3ViLWNsYXNzIE91dGxheWVyXG4gIHZhciBMYXlvdXQgPSBzdWJjbGFzcyggT3V0bGF5ZXIgKTtcbiAgLy8gYXBwbHkgbmV3IG9wdGlvbnMgYW5kIGNvbXBhdE9wdGlvbnNcbiAgTGF5b3V0LmRlZmF1bHRzID0gdXRpbHMuZXh0ZW5kKCB7fSwgT3V0bGF5ZXIuZGVmYXVsdHMgKTtcbiAgdXRpbHMuZXh0ZW5kKCBMYXlvdXQuZGVmYXVsdHMsIG9wdGlvbnMgKTtcbiAgTGF5b3V0LmNvbXBhdE9wdGlvbnMgPSB1dGlscy5leHRlbmQoIHt9LCBPdXRsYXllci5jb21wYXRPcHRpb25zICApO1xuXG4gIExheW91dC5uYW1lc3BhY2UgPSBuYW1lc3BhY2U7XG5cbiAgTGF5b3V0LmRhdGEgPSBPdXRsYXllci5kYXRhO1xuXG4gIC8vIHN1Yi1jbGFzcyBJdGVtXG4gIExheW91dC5JdGVtID0gc3ViY2xhc3MoIEl0ZW0gKTtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBkZWNsYXJhdGl2ZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4gIHV0aWxzLmh0bWxJbml0KCBMYXlvdXQsIG5hbWVzcGFjZSApO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGpRdWVyeSBicmlkZ2UgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuICAvLyBtYWtlIGludG8galF1ZXJ5IHBsdWdpblxuICBpZiAoIGpRdWVyeSAmJiBqUXVlcnkuYnJpZGdldCApIHtcbiAgICBqUXVlcnkuYnJpZGdldCggbmFtZXNwYWNlLCBMYXlvdXQgKTtcbiAgfVxuXG4gIHJldHVybiBMYXlvdXQ7XG59O1xuXG5mdW5jdGlvbiBzdWJjbGFzcyggUGFyZW50ICkge1xuICBmdW5jdGlvbiBTdWJDbGFzcygpIHtcbiAgICBQYXJlbnQuYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuICB9XG5cbiAgU3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggUGFyZW50LnByb3RvdHlwZSApO1xuICBTdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTdWJDbGFzcztcblxuICByZXR1cm4gU3ViQ2xhc3M7XG59XG5cbi8vIC0tLS0tIGhlbHBlcnMgLS0tLS0gLy9cblxuLy8gaG93IG1hbnkgbWlsbGlzZWNvbmRzIGFyZSBpbiBlYWNoIHVuaXRcbnZhciBtc1VuaXRzID0ge1xuICBtczogMSxcbiAgczogMTAwMFxufTtcblxuLy8gbXVuZ2UgdGltZS1saWtlIHBhcmFtZXRlciBpbnRvIG1pbGxpc2Vjb25kIG51bWJlclxuLy8gJzAuNHMnIC0+IDQwXG5mdW5jdGlvbiBnZXRNaWxsaXNlY29uZHMoIHRpbWUgKSB7XG4gIGlmICggdHlwZW9mIHRpbWUgPT0gJ251bWJlcicgKSB7XG4gICAgcmV0dXJuIHRpbWU7XG4gIH1cbiAgdmFyIG1hdGNoZXMgPSB0aW1lLm1hdGNoKCAvKF5cXGQqXFwuP1xcZCopKFxcdyopLyApO1xuICB2YXIgbnVtID0gbWF0Y2hlcyAmJiBtYXRjaGVzWzFdO1xuICB2YXIgdW5pdCA9IG1hdGNoZXMgJiYgbWF0Y2hlc1syXTtcbiAgaWYgKCAhbnVtLmxlbmd0aCApIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuICBudW0gPSBwYXJzZUZsb2F0KCBudW0gKTtcbiAgdmFyIG11bHQgPSBtc1VuaXRzWyB1bml0IF0gfHwgMTtcbiAgcmV0dXJuIG51bSAqIG11bHQ7XG59XG5cbi8vIC0tLS0tIGZpbiAtLS0tLSAvL1xuXG4vLyBiYWNrIGluIGdsb2JhbFxuT3V0bGF5ZXIuSXRlbSA9IEl0ZW07XG5cbnJldHVybiBPdXRsYXllcjtcblxufSkpO1xuIiwiLypcbiAgICAgXyBfICAgICAgXyAgICAgICBfXG4gX19ffCAoXykgX19ffCB8IF9fICAoXylfX19cbi8gX198IHwgfC8gX198IHwvIC8gIHwgLyBfX3xcblxcX18gXFwgfCB8IChfX3wgICA8IF8gfCBcXF9fIFxcXG58X19fL198X3xcXF9fX3xffFxcXyhfKS8gfF9fXy9cbiAgICAgICAgICAgICAgICAgICB8X18vXG5cbiBWZXJzaW9uOiAxLjguMVxuICBBdXRob3I6IEtlbiBXaGVlbGVyXG4gV2Vic2l0ZTogaHR0cDovL2tlbndoZWVsZXIuZ2l0aHViLmlvXG4gICAgRG9jczogaHR0cDovL2tlbndoZWVsZXIuZ2l0aHViLmlvL3NsaWNrXG4gICAgUmVwbzogaHR0cDovL2dpdGh1Yi5jb20va2Vud2hlZWxlci9zbGlja1xuICBJc3N1ZXM6IGh0dHA6Ly9naXRodWIuY29tL2tlbndoZWVsZXIvc2xpY2svaXNzdWVzXG5cbiAqL1xuLyogZ2xvYmFsIHdpbmRvdywgZG9jdW1lbnQsIGRlZmluZSwgalF1ZXJ5LCBzZXRJbnRlcnZhbCwgY2xlYXJJbnRlcnZhbCAqL1xuOyhmdW5jdGlvbihmYWN0b3J5KSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKFsnanF1ZXJ5J10sIGZhY3RvcnkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKCdqcXVlcnknKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZmFjdG9yeShqUXVlcnkpO1xuICAgIH1cblxufShmdW5jdGlvbigkKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIHZhciBTbGljayA9IHdpbmRvdy5TbGljayB8fCB7fTtcblxuICAgIFNsaWNrID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBpbnN0YW5jZVVpZCA9IDA7XG5cbiAgICAgICAgZnVuY3Rpb24gU2xpY2soZWxlbWVudCwgc2V0dGluZ3MpIHtcblxuICAgICAgICAgICAgdmFyIF8gPSB0aGlzLCBkYXRhU2V0dGluZ3M7XG5cbiAgICAgICAgICAgIF8uZGVmYXVsdHMgPSB7XG4gICAgICAgICAgICAgICAgYWNjZXNzaWJpbGl0eTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhZGFwdGl2ZUhlaWdodDogZmFsc2UsXG4gICAgICAgICAgICAgICAgYXBwZW5kQXJyb3dzOiAkKGVsZW1lbnQpLFxuICAgICAgICAgICAgICAgIGFwcGVuZERvdHM6ICQoZWxlbWVudCksXG4gICAgICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGFzTmF2Rm9yOiBudWxsLFxuICAgICAgICAgICAgICAgIHByZXZBcnJvdzogJzxidXR0b24gY2xhc3M9XCJzbGljay1wcmV2XCIgYXJpYS1sYWJlbD1cIlByZXZpb3VzXCIgdHlwZT1cImJ1dHRvblwiPlByZXZpb3VzPC9idXR0b24+JyxcbiAgICAgICAgICAgICAgICBuZXh0QXJyb3c6ICc8YnV0dG9uIGNsYXNzPVwic2xpY2stbmV4dFwiIGFyaWEtbGFiZWw9XCJOZXh0XCIgdHlwZT1cImJ1dHRvblwiPk5leHQ8L2J1dHRvbj4nLFxuICAgICAgICAgICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBhdXRvcGxheVNwZWVkOiAzMDAwLFxuICAgICAgICAgICAgICAgIGNlbnRlck1vZGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNlbnRlclBhZGRpbmc6ICc1MHB4JyxcbiAgICAgICAgICAgICAgICBjc3NFYXNlOiAnZWFzZScsXG4gICAgICAgICAgICAgICAgY3VzdG9tUGFnaW5nOiBmdW5jdGlvbihzbGlkZXIsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQoJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIC8+JykudGV4dChpICsgMSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBkb3RzQ2xhc3M6ICdzbGljay1kb3RzJyxcbiAgICAgICAgICAgICAgICBkcmFnZ2FibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgZWFzaW5nOiAnbGluZWFyJyxcbiAgICAgICAgICAgICAgICBlZGdlRnJpY3Rpb246IDAuMzUsXG4gICAgICAgICAgICAgICAgZmFkZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgZm9jdXNPblNlbGVjdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgZm9jdXNPbkNoYW5nZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgICAgICAgaW5pdGlhbFNsaWRlOiAwLFxuICAgICAgICAgICAgICAgIGxhenlMb2FkOiAnb25kZW1hbmQnLFxuICAgICAgICAgICAgICAgIG1vYmlsZUZpcnN0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBwYXVzZU9uSG92ZXI6IHRydWUsXG4gICAgICAgICAgICAgICAgcGF1c2VPbkZvY3VzOiB0cnVlLFxuICAgICAgICAgICAgICAgIHBhdXNlT25Eb3RzSG92ZXI6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHJlc3BvbmRUbzogJ3dpbmRvdycsXG4gICAgICAgICAgICAgICAgcmVzcG9uc2l2ZTogbnVsbCxcbiAgICAgICAgICAgICAgICByb3dzOiAxLFxuICAgICAgICAgICAgICAgIHJ0bDogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2xpZGU6ICcnLFxuICAgICAgICAgICAgICAgIHNsaWRlc1BlclJvdzogMSxcbiAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgICAgICAgICAgICAgc3BlZWQ6IDUwMCxcbiAgICAgICAgICAgICAgICBzd2lwZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzd2lwZVRvU2xpZGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHRvdWNoTW92ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0b3VjaFRocmVzaG9sZDogNSxcbiAgICAgICAgICAgICAgICB1c2VDU1M6IHRydWUsXG4gICAgICAgICAgICAgICAgdXNlVHJhbnNmb3JtOiB0cnVlLFxuICAgICAgICAgICAgICAgIHZhcmlhYmxlV2lkdGg6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHZlcnRpY2FsOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB2ZXJ0aWNhbFN3aXBpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHdhaXRGb3JBbmltYXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgIHpJbmRleDogMTAwMFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgXy5pbml0aWFscyA9IHtcbiAgICAgICAgICAgICAgICBhbmltYXRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGRyYWdnaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBhdXRvUGxheVRpbWVyOiBudWxsLFxuICAgICAgICAgICAgICAgIGN1cnJlbnREaXJlY3Rpb246IDAsXG4gICAgICAgICAgICAgICAgY3VycmVudExlZnQ6IG51bGwsXG4gICAgICAgICAgICAgICAgY3VycmVudFNsaWRlOiAwLFxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbjogMSxcbiAgICAgICAgICAgICAgICAkZG90czogbnVsbCxcbiAgICAgICAgICAgICAgICBsaXN0V2lkdGg6IG51bGwsXG4gICAgICAgICAgICAgICAgbGlzdEhlaWdodDogbnVsbCxcbiAgICAgICAgICAgICAgICBsb2FkSW5kZXg6IDAsXG4gICAgICAgICAgICAgICAgJG5leHRBcnJvdzogbnVsbCxcbiAgICAgICAgICAgICAgICAkcHJldkFycm93OiBudWxsLFxuICAgICAgICAgICAgICAgIHNjcm9sbGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2xpZGVDb3VudDogbnVsbCxcbiAgICAgICAgICAgICAgICBzbGlkZVdpZHRoOiBudWxsLFxuICAgICAgICAgICAgICAgICRzbGlkZVRyYWNrOiBudWxsLFxuICAgICAgICAgICAgICAgICRzbGlkZXM6IG51bGwsXG4gICAgICAgICAgICAgICAgc2xpZGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2xpZGVPZmZzZXQ6IDAsXG4gICAgICAgICAgICAgICAgc3dpcGVMZWZ0OiBudWxsLFxuICAgICAgICAgICAgICAgIHN3aXBpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgICRsaXN0OiBudWxsLFxuICAgICAgICAgICAgICAgIHRvdWNoT2JqZWN0OiB7fSxcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1zRW5hYmxlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgdW5zbGlja2VkOiBmYWxzZVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgJC5leHRlbmQoXywgXy5pbml0aWFscyk7XG5cbiAgICAgICAgICAgIF8uYWN0aXZlQnJlYWtwb2ludCA9IG51bGw7XG4gICAgICAgICAgICBfLmFuaW1UeXBlID0gbnVsbDtcbiAgICAgICAgICAgIF8uYW5pbVByb3AgPSBudWxsO1xuICAgICAgICAgICAgXy5icmVha3BvaW50cyA9IFtdO1xuICAgICAgICAgICAgXy5icmVha3BvaW50U2V0dGluZ3MgPSBbXTtcbiAgICAgICAgICAgIF8uY3NzVHJhbnNpdGlvbnMgPSBmYWxzZTtcbiAgICAgICAgICAgIF8uZm9jdXNzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIF8uaW50ZXJydXB0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIF8uaGlkZGVuID0gJ2hpZGRlbic7XG4gICAgICAgICAgICBfLnBhdXNlZCA9IHRydWU7XG4gICAgICAgICAgICBfLnBvc2l0aW9uUHJvcCA9IG51bGw7XG4gICAgICAgICAgICBfLnJlc3BvbmRUbyA9IG51bGw7XG4gICAgICAgICAgICBfLnJvd0NvdW50ID0gMTtcbiAgICAgICAgICAgIF8uc2hvdWxkQ2xpY2sgPSB0cnVlO1xuICAgICAgICAgICAgXy4kc2xpZGVyID0gJChlbGVtZW50KTtcbiAgICAgICAgICAgIF8uJHNsaWRlc0NhY2hlID0gbnVsbDtcbiAgICAgICAgICAgIF8udHJhbnNmb3JtVHlwZSA9IG51bGw7XG4gICAgICAgICAgICBfLnRyYW5zaXRpb25UeXBlID0gbnVsbDtcbiAgICAgICAgICAgIF8udmlzaWJpbGl0eUNoYW5nZSA9ICd2aXNpYmlsaXR5Y2hhbmdlJztcbiAgICAgICAgICAgIF8ud2luZG93V2lkdGggPSAwO1xuICAgICAgICAgICAgXy53aW5kb3dUaW1lciA9IG51bGw7XG5cbiAgICAgICAgICAgIGRhdGFTZXR0aW5ncyA9ICQoZWxlbWVudCkuZGF0YSgnc2xpY2snKSB8fCB7fTtcblxuICAgICAgICAgICAgXy5vcHRpb25zID0gJC5leHRlbmQoe30sIF8uZGVmYXVsdHMsIHNldHRpbmdzLCBkYXRhU2V0dGluZ3MpO1xuXG4gICAgICAgICAgICBfLmN1cnJlbnRTbGlkZSA9IF8ub3B0aW9ucy5pbml0aWFsU2xpZGU7XG5cbiAgICAgICAgICAgIF8ub3JpZ2luYWxTZXR0aW5ncyA9IF8ub3B0aW9ucztcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudC5tb3pIaWRkZW4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgXy5oaWRkZW4gPSAnbW96SGlkZGVuJztcbiAgICAgICAgICAgICAgICBfLnZpc2liaWxpdHlDaGFuZ2UgPSAnbW96dmlzaWJpbGl0eWNoYW5nZSc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBkb2N1bWVudC53ZWJraXRIaWRkZW4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgXy5oaWRkZW4gPSAnd2Via2l0SGlkZGVuJztcbiAgICAgICAgICAgICAgICBfLnZpc2liaWxpdHlDaGFuZ2UgPSAnd2Via2l0dmlzaWJpbGl0eWNoYW5nZSc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF8uYXV0b1BsYXkgPSAkLnByb3h5KF8uYXV0b1BsYXksIF8pO1xuICAgICAgICAgICAgXy5hdXRvUGxheUNsZWFyID0gJC5wcm94eShfLmF1dG9QbGF5Q2xlYXIsIF8pO1xuICAgICAgICAgICAgXy5hdXRvUGxheUl0ZXJhdG9yID0gJC5wcm94eShfLmF1dG9QbGF5SXRlcmF0b3IsIF8pO1xuICAgICAgICAgICAgXy5jaGFuZ2VTbGlkZSA9ICQucHJveHkoXy5jaGFuZ2VTbGlkZSwgXyk7XG4gICAgICAgICAgICBfLmNsaWNrSGFuZGxlciA9ICQucHJveHkoXy5jbGlja0hhbmRsZXIsIF8pO1xuICAgICAgICAgICAgXy5zZWxlY3RIYW5kbGVyID0gJC5wcm94eShfLnNlbGVjdEhhbmRsZXIsIF8pO1xuICAgICAgICAgICAgXy5zZXRQb3NpdGlvbiA9ICQucHJveHkoXy5zZXRQb3NpdGlvbiwgXyk7XG4gICAgICAgICAgICBfLnN3aXBlSGFuZGxlciA9ICQucHJveHkoXy5zd2lwZUhhbmRsZXIsIF8pO1xuICAgICAgICAgICAgXy5kcmFnSGFuZGxlciA9ICQucHJveHkoXy5kcmFnSGFuZGxlciwgXyk7XG4gICAgICAgICAgICBfLmtleUhhbmRsZXIgPSAkLnByb3h5KF8ua2V5SGFuZGxlciwgXyk7XG5cbiAgICAgICAgICAgIF8uaW5zdGFuY2VVaWQgPSBpbnN0YW5jZVVpZCsrO1xuXG4gICAgICAgICAgICAvLyBBIHNpbXBsZSB3YXkgdG8gY2hlY2sgZm9yIEhUTUwgc3RyaW5nc1xuICAgICAgICAgICAgLy8gU3RyaWN0IEhUTUwgcmVjb2duaXRpb24gKG11c3Qgc3RhcnQgd2l0aCA8KVxuICAgICAgICAgICAgLy8gRXh0cmFjdGVkIGZyb20galF1ZXJ5IHYxLjExIHNvdXJjZVxuICAgICAgICAgICAgXy5odG1sRXhwciA9IC9eKD86XFxzKig8W1xcd1xcV10rPilbXj5dKikkLztcblxuXG4gICAgICAgICAgICBfLnJlZ2lzdGVyQnJlYWtwb2ludHMoKTtcbiAgICAgICAgICAgIF8uaW5pdCh0cnVlKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFNsaWNrO1xuXG4gICAgfSgpKTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5hY3RpdmF0ZUFEQSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgXy4kc2xpZGVUcmFjay5maW5kKCcuc2xpY2stYWN0aXZlJykuYXR0cih7XG4gICAgICAgICAgICAnYXJpYS1oaWRkZW4nOiAnZmFsc2UnXG4gICAgICAgIH0pLmZpbmQoJ2EsIGlucHV0LCBidXR0b24sIHNlbGVjdCcpLmF0dHIoe1xuICAgICAgICAgICAgJ3RhYmluZGV4JzogJzAnXG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5hZGRTbGlkZSA9IFNsaWNrLnByb3RvdHlwZS5zbGlja0FkZCA9IGZ1bmN0aW9uKG1hcmt1cCwgaW5kZXgsIGFkZEJlZm9yZSkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAodHlwZW9mKGluZGV4KSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICBhZGRCZWZvcmUgPSBpbmRleDtcbiAgICAgICAgICAgIGluZGV4ID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIGlmIChpbmRleCA8IDAgfHwgKGluZGV4ID49IF8uc2xpZGVDb3VudCkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIF8udW5sb2FkKCk7XG5cbiAgICAgICAgaWYgKHR5cGVvZihpbmRleCkgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IDAgJiYgXy4kc2xpZGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICQobWFya3VwKS5hcHBlbmRUbyhfLiRzbGlkZVRyYWNrKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYWRkQmVmb3JlKSB7XG4gICAgICAgICAgICAgICAgJChtYXJrdXApLmluc2VydEJlZm9yZShfLiRzbGlkZXMuZXEoaW5kZXgpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJChtYXJrdXApLmluc2VydEFmdGVyKF8uJHNsaWRlcy5lcShpbmRleCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGFkZEJlZm9yZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICQobWFya3VwKS5wcmVwZW5kVG8oXy4kc2xpZGVUcmFjayk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQobWFya3VwKS5hcHBlbmRUbyhfLiRzbGlkZVRyYWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIF8uJHNsaWRlcyA9IF8uJHNsaWRlVHJhY2suY2hpbGRyZW4odGhpcy5vcHRpb25zLnNsaWRlKTtcblxuICAgICAgICBfLiRzbGlkZVRyYWNrLmNoaWxkcmVuKHRoaXMub3B0aW9ucy5zbGlkZSkuZGV0YWNoKCk7XG5cbiAgICAgICAgXy4kc2xpZGVUcmFjay5hcHBlbmQoXy4kc2xpZGVzKTtcblxuICAgICAgICBfLiRzbGlkZXMuZWFjaChmdW5jdGlvbihpbmRleCwgZWxlbWVudCkge1xuICAgICAgICAgICAgJChlbGVtZW50KS5hdHRyKCdkYXRhLXNsaWNrLWluZGV4JywgaW5kZXgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBfLiRzbGlkZXNDYWNoZSA9IF8uJHNsaWRlcztcblxuICAgICAgICBfLnJlaW5pdCgpO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5hbmltYXRlSGVpZ2h0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBfID0gdGhpcztcbiAgICAgICAgaWYgKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgPT09IDEgJiYgXy5vcHRpb25zLmFkYXB0aXZlSGVpZ2h0ID09PSB0cnVlICYmIF8ub3B0aW9ucy52ZXJ0aWNhbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHZhciB0YXJnZXRIZWlnaHQgPSBfLiRzbGlkZXMuZXEoXy5jdXJyZW50U2xpZGUpLm91dGVySGVpZ2h0KHRydWUpO1xuICAgICAgICAgICAgXy4kbGlzdC5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IHRhcmdldEhlaWdodFxuICAgICAgICAgICAgfSwgXy5vcHRpb25zLnNwZWVkKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuYW5pbWF0ZVNsaWRlID0gZnVuY3Rpb24odGFyZ2V0TGVmdCwgY2FsbGJhY2spIHtcblxuICAgICAgICB2YXIgYW5pbVByb3BzID0ge30sXG4gICAgICAgICAgICBfID0gdGhpcztcblxuICAgICAgICBfLmFuaW1hdGVIZWlnaHQoKTtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLnJ0bCA9PT0gdHJ1ZSAmJiBfLm9wdGlvbnMudmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0YXJnZXRMZWZ0ID0gLXRhcmdldExlZnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKF8udHJhbnNmb3Jtc0VuYWJsZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBpZiAoXy5vcHRpb25zLnZlcnRpY2FsID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIF8uJHNsaWRlVHJhY2suYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IHRhcmdldExlZnRcbiAgICAgICAgICAgICAgICB9LCBfLm9wdGlvbnMuc3BlZWQsIF8ub3B0aW9ucy5lYXNpbmcsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgdG9wOiB0YXJnZXRMZWZ0XG4gICAgICAgICAgICAgICAgfSwgXy5vcHRpb25zLnNwZWVkLCBfLm9wdGlvbnMuZWFzaW5nLCBjYWxsYmFjayk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgaWYgKF8uY3NzVHJhbnNpdGlvbnMgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5ydGwgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgXy5jdXJyZW50TGVmdCA9IC0oXy5jdXJyZW50TGVmdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICQoe1xuICAgICAgICAgICAgICAgICAgICBhbmltU3RhcnQ6IF8uY3VycmVudExlZnRcbiAgICAgICAgICAgICAgICB9KS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgYW5pbVN0YXJ0OiB0YXJnZXRMZWZ0XG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogXy5vcHRpb25zLnNwZWVkLFxuICAgICAgICAgICAgICAgICAgICBlYXNpbmc6IF8ub3B0aW9ucy5lYXNpbmcsXG4gICAgICAgICAgICAgICAgICAgIHN0ZXA6IGZ1bmN0aW9uKG5vdykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm93ID0gTWF0aC5jZWlsKG5vdyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoXy5vcHRpb25zLnZlcnRpY2FsID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1Qcm9wc1tfLmFuaW1UeXBlXSA9ICd0cmFuc2xhdGUoJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vdyArICdweCwgMHB4KSc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5jc3MoYW5pbVByb3BzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbVByb3BzW18uYW5pbVR5cGVdID0gJ3RyYW5zbGF0ZSgwcHgsJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vdyArICdweCknO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uJHNsaWRlVHJhY2suY3NzKGFuaW1Qcm9wcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgXy5hcHBseVRyYW5zaXRpb24oKTtcbiAgICAgICAgICAgICAgICB0YXJnZXRMZWZ0ID0gTWF0aC5jZWlsKHRhcmdldExlZnQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy52ZXJ0aWNhbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgYW5pbVByb3BzW18uYW5pbVR5cGVdID0gJ3RyYW5zbGF0ZTNkKCcgKyB0YXJnZXRMZWZ0ICsgJ3B4LCAwcHgsIDBweCknO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGFuaW1Qcm9wc1tfLmFuaW1UeXBlXSA9ICd0cmFuc2xhdGUzZCgwcHgsJyArIHRhcmdldExlZnQgKyAncHgsIDBweCknO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfLiRzbGlkZVRyYWNrLmNzcyhhbmltUHJvcHMpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIF8uZGlzYWJsZVRyYW5zaXRpb24oKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbCgpO1xuICAgICAgICAgICAgICAgICAgICB9LCBfLm9wdGlvbnMuc3BlZWQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuZ2V0TmF2VGFyZ2V0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgYXNOYXZGb3IgPSBfLm9wdGlvbnMuYXNOYXZGb3I7XG5cbiAgICAgICAgaWYgKCBhc05hdkZvciAmJiBhc05hdkZvciAhPT0gbnVsbCApIHtcbiAgICAgICAgICAgIGFzTmF2Rm9yID0gJChhc05hdkZvcikubm90KF8uJHNsaWRlcik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYXNOYXZGb3I7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmFzTmF2Rm9yID0gZnVuY3Rpb24oaW5kZXgpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICBhc05hdkZvciA9IF8uZ2V0TmF2VGFyZ2V0KCk7XG5cbiAgICAgICAgaWYgKCBhc05hdkZvciAhPT0gbnVsbCAmJiB0eXBlb2YgYXNOYXZGb3IgPT09ICdvYmplY3QnICkge1xuICAgICAgICAgICAgYXNOYXZGb3IuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gJCh0aGlzKS5zbGljaygnZ2V0U2xpY2snKTtcbiAgICAgICAgICAgICAgICBpZighdGFyZ2V0LnVuc2xpY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQuc2xpZGVIYW5kbGVyKGluZGV4LCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5hcHBseVRyYW5zaXRpb24gPSBmdW5jdGlvbihzbGlkZSkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIHRyYW5zaXRpb24gPSB7fTtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmZhZGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0cmFuc2l0aW9uW18udHJhbnNpdGlvblR5cGVdID0gXy50cmFuc2Zvcm1UeXBlICsgJyAnICsgXy5vcHRpb25zLnNwZWVkICsgJ21zICcgKyBfLm9wdGlvbnMuY3NzRWFzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRyYW5zaXRpb25bXy50cmFuc2l0aW9uVHlwZV0gPSAnb3BhY2l0eSAnICsgXy5vcHRpb25zLnNwZWVkICsgJ21zICcgKyBfLm9wdGlvbnMuY3NzRWFzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuZmFkZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIF8uJHNsaWRlVHJhY2suY3NzKHRyYW5zaXRpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgXy4kc2xpZGVzLmVxKHNsaWRlKS5jc3ModHJhbnNpdGlvbik7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuYXV0b1BsYXkgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgXy5hdXRvUGxheUNsZWFyKCk7XG5cbiAgICAgICAgaWYgKCBfLnNsaWRlQ291bnQgPiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93ICkge1xuICAgICAgICAgICAgXy5hdXRvUGxheVRpbWVyID0gc2V0SW50ZXJ2YWwoIF8uYXV0b1BsYXlJdGVyYXRvciwgXy5vcHRpb25zLmF1dG9wbGF5U3BlZWQgKTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5hdXRvUGxheUNsZWFyID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmIChfLmF1dG9QbGF5VGltZXIpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoXy5hdXRvUGxheVRpbWVyKTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5hdXRvUGxheUl0ZXJhdG9yID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgc2xpZGVUbyA9IF8uY3VycmVudFNsaWRlICsgXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsO1xuXG4gICAgICAgIGlmICggIV8ucGF1c2VkICYmICFfLmludGVycnVwdGVkICYmICFfLmZvY3Vzc2VkICkge1xuXG4gICAgICAgICAgICBpZiAoIF8ub3B0aW9ucy5pbmZpbml0ZSA9PT0gZmFsc2UgKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoIF8uZGlyZWN0aW9uID09PSAxICYmICggXy5jdXJyZW50U2xpZGUgKyAxICkgPT09ICggXy5zbGlkZUNvdW50IC0gMSApKSB7XG4gICAgICAgICAgICAgICAgICAgIF8uZGlyZWN0aW9uID0gMDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBlbHNlIGlmICggXy5kaXJlY3Rpb24gPT09IDAgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgc2xpZGVUbyA9IF8uY3VycmVudFNsaWRlIC0gXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICggXy5jdXJyZW50U2xpZGUgLSAxID09PSAwICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgXy5kaXJlY3Rpb24gPSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgXy5zbGlkZUhhbmRsZXIoIHNsaWRlVG8gKTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmJ1aWxkQXJyb3dzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuYXJyb3dzID09PSB0cnVlICkge1xuXG4gICAgICAgICAgICBfLiRwcmV2QXJyb3cgPSAkKF8ub3B0aW9ucy5wcmV2QXJyb3cpLmFkZENsYXNzKCdzbGljay1hcnJvdycpO1xuICAgICAgICAgICAgXy4kbmV4dEFycm93ID0gJChfLm9wdGlvbnMubmV4dEFycm93KS5hZGRDbGFzcygnc2xpY2stYXJyb3cnKTtcblxuICAgICAgICAgICAgaWYoIF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgKSB7XG5cbiAgICAgICAgICAgICAgICBfLiRwcmV2QXJyb3cucmVtb3ZlQ2xhc3MoJ3NsaWNrLWhpZGRlbicpLnJlbW92ZUF0dHIoJ2FyaWEtaGlkZGVuIHRhYmluZGV4Jyk7XG4gICAgICAgICAgICAgICAgXy4kbmV4dEFycm93LnJlbW92ZUNsYXNzKCdzbGljay1oaWRkZW4nKS5yZW1vdmVBdHRyKCdhcmlhLWhpZGRlbiB0YWJpbmRleCcpO1xuXG4gICAgICAgICAgICAgICAgaWYgKF8uaHRtbEV4cHIudGVzdChfLm9wdGlvbnMucHJldkFycm93KSkge1xuICAgICAgICAgICAgICAgICAgICBfLiRwcmV2QXJyb3cucHJlcGVuZFRvKF8ub3B0aW9ucy5hcHBlbmRBcnJvd3MpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChfLmh0bWxFeHByLnRlc3QoXy5vcHRpb25zLm5leHRBcnJvdykpIHtcbiAgICAgICAgICAgICAgICAgICAgXy4kbmV4dEFycm93LmFwcGVuZFRvKF8ub3B0aW9ucy5hcHBlbmRBcnJvd3MpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChfLm9wdGlvbnMuaW5maW5pdGUgIT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgXy4kcHJldkFycm93XG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3NsaWNrLWRpc2FibGVkJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdhcmlhLWRpc2FibGVkJywgJ3RydWUnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBfLiRwcmV2QXJyb3cuYWRkKCBfLiRuZXh0QXJyb3cgKVxuXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnc2xpY2staGlkZGVuJylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2FyaWEtZGlzYWJsZWQnOiAndHJ1ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAndGFiaW5kZXgnOiAnLTEnXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5idWlsZERvdHMgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICBpLCBkb3Q7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5kb3RzID09PSB0cnVlICYmIF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcblxuICAgICAgICAgICAgXy4kc2xpZGVyLmFkZENsYXNzKCdzbGljay1kb3R0ZWQnKTtcblxuICAgICAgICAgICAgZG90ID0gJCgnPHVsIC8+JykuYWRkQ2xhc3MoXy5vcHRpb25zLmRvdHNDbGFzcyk7XG5cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPD0gXy5nZXREb3RDb3VudCgpOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICBkb3QuYXBwZW5kKCQoJzxsaSAvPicpLmFwcGVuZChfLm9wdGlvbnMuY3VzdG9tUGFnaW5nLmNhbGwodGhpcywgXywgaSkpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgXy4kZG90cyA9IGRvdC5hcHBlbmRUbyhfLm9wdGlvbnMuYXBwZW5kRG90cyk7XG5cbiAgICAgICAgICAgIF8uJGRvdHMuZmluZCgnbGknKS5maXJzdCgpLmFkZENsYXNzKCdzbGljay1hY3RpdmUnKTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmJ1aWxkT3V0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIF8uJHNsaWRlcyA9XG4gICAgICAgICAgICBfLiRzbGlkZXJcbiAgICAgICAgICAgICAgICAuY2hpbGRyZW4oIF8ub3B0aW9ucy5zbGlkZSArICc6bm90KC5zbGljay1jbG9uZWQpJylcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3NsaWNrLXNsaWRlJyk7XG5cbiAgICAgICAgXy5zbGlkZUNvdW50ID0gXy4kc2xpZGVzLmxlbmd0aDtcblxuICAgICAgICBfLiRzbGlkZXMuZWFjaChmdW5jdGlvbihpbmRleCwgZWxlbWVudCkge1xuICAgICAgICAgICAgJChlbGVtZW50KVxuICAgICAgICAgICAgICAgIC5hdHRyKCdkYXRhLXNsaWNrLWluZGV4JywgaW5kZXgpXG4gICAgICAgICAgICAgICAgLmRhdGEoJ29yaWdpbmFsU3R5bGluZycsICQoZWxlbWVudCkuYXR0cignc3R5bGUnKSB8fCAnJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIF8uJHNsaWRlci5hZGRDbGFzcygnc2xpY2stc2xpZGVyJyk7XG5cbiAgICAgICAgXy4kc2xpZGVUcmFjayA9IChfLnNsaWRlQ291bnQgPT09IDApID9cbiAgICAgICAgICAgICQoJzxkaXYgY2xhc3M9XCJzbGljay10cmFja1wiLz4nKS5hcHBlbmRUbyhfLiRzbGlkZXIpIDpcbiAgICAgICAgICAgIF8uJHNsaWRlcy53cmFwQWxsKCc8ZGl2IGNsYXNzPVwic2xpY2stdHJhY2tcIi8+JykucGFyZW50KCk7XG5cbiAgICAgICAgXy4kbGlzdCA9IF8uJHNsaWRlVHJhY2sud3JhcChcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwic2xpY2stbGlzdFwiLz4nKS5wYXJlbnQoKTtcbiAgICAgICAgXy4kc2xpZGVUcmFjay5jc3MoJ29wYWNpdHknLCAwKTtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmNlbnRlck1vZGUgPT09IHRydWUgfHwgXy5vcHRpb25zLnN3aXBlVG9TbGlkZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgICQoJ2ltZ1tkYXRhLWxhenldJywgXy4kc2xpZGVyKS5ub3QoJ1tzcmNdJykuYWRkQ2xhc3MoJ3NsaWNrLWxvYWRpbmcnKTtcblxuICAgICAgICBfLnNldHVwSW5maW5pdGUoKTtcblxuICAgICAgICBfLmJ1aWxkQXJyb3dzKCk7XG5cbiAgICAgICAgXy5idWlsZERvdHMoKTtcblxuICAgICAgICBfLnVwZGF0ZURvdHMoKTtcblxuXG4gICAgICAgIF8uc2V0U2xpZGVDbGFzc2VzKHR5cGVvZiBfLmN1cnJlbnRTbGlkZSA9PT0gJ251bWJlcicgPyBfLmN1cnJlbnRTbGlkZSA6IDApO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuZHJhZ2dhYmxlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBfLiRsaXN0LmFkZENsYXNzKCdkcmFnZ2FibGUnKTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5idWlsZFJvd3MgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsIGEsIGIsIGMsIG5ld1NsaWRlcywgbnVtT2ZTbGlkZXMsIG9yaWdpbmFsU2xpZGVzLHNsaWRlc1BlclNlY3Rpb247XG5cbiAgICAgICAgbmV3U2xpZGVzID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICBvcmlnaW5hbFNsaWRlcyA9IF8uJHNsaWRlci5jaGlsZHJlbigpO1xuXG4gICAgICAgIGlmKF8ub3B0aW9ucy5yb3dzID4gMCkge1xuXG4gICAgICAgICAgICBzbGlkZXNQZXJTZWN0aW9uID0gXy5vcHRpb25zLnNsaWRlc1BlclJvdyAqIF8ub3B0aW9ucy5yb3dzO1xuICAgICAgICAgICAgbnVtT2ZTbGlkZXMgPSBNYXRoLmNlaWwoXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxTbGlkZXMubGVuZ3RoIC8gc2xpZGVzUGVyU2VjdGlvblxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgZm9yKGEgPSAwOyBhIDwgbnVtT2ZTbGlkZXM7IGErKyl7XG4gICAgICAgICAgICAgICAgdmFyIHNsaWRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgZm9yKGIgPSAwOyBiIDwgXy5vcHRpb25zLnJvd3M7IGIrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgICAgIGZvcihjID0gMDsgYyA8IF8ub3B0aW9ucy5zbGlkZXNQZXJSb3c7IGMrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IChhICogc2xpZGVzUGVyU2VjdGlvbiArICgoYiAqIF8ub3B0aW9ucy5zbGlkZXNQZXJSb3cpICsgYykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9yaWdpbmFsU2xpZGVzLmdldCh0YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKG9yaWdpbmFsU2xpZGVzLmdldCh0YXJnZXQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzbGlkZS5hcHBlbmRDaGlsZChyb3cpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZXdTbGlkZXMuYXBwZW5kQ2hpbGQoc2xpZGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBfLiRzbGlkZXIuZW1wdHkoKS5hcHBlbmQobmV3U2xpZGVzKTtcbiAgICAgICAgICAgIF8uJHNsaWRlci5jaGlsZHJlbigpLmNoaWxkcmVuKCkuY2hpbGRyZW4oKVxuICAgICAgICAgICAgICAgIC5jc3Moe1xuICAgICAgICAgICAgICAgICAgICAnd2lkdGgnOigxMDAgLyBfLm9wdGlvbnMuc2xpZGVzUGVyUm93KSArICclJyxcbiAgICAgICAgICAgICAgICAgICAgJ2Rpc3BsYXknOiAnaW5saW5lLWJsb2NrJ1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuY2hlY2tSZXNwb25zaXZlID0gZnVuY3Rpb24oaW5pdGlhbCwgZm9yY2VVcGRhdGUpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICBicmVha3BvaW50LCB0YXJnZXRCcmVha3BvaW50LCByZXNwb25kVG9XaWR0aCwgdHJpZ2dlckJyZWFrcG9pbnQgPSBmYWxzZTtcbiAgICAgICAgdmFyIHNsaWRlcldpZHRoID0gXy4kc2xpZGVyLndpZHRoKCk7XG4gICAgICAgIHZhciB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoIHx8ICQod2luZG93KS53aWR0aCgpO1xuXG4gICAgICAgIGlmIChfLnJlc3BvbmRUbyA9PT0gJ3dpbmRvdycpIHtcbiAgICAgICAgICAgIHJlc3BvbmRUb1dpZHRoID0gd2luZG93V2lkdGg7XG4gICAgICAgIH0gZWxzZSBpZiAoXy5yZXNwb25kVG8gPT09ICdzbGlkZXInKSB7XG4gICAgICAgICAgICByZXNwb25kVG9XaWR0aCA9IHNsaWRlcldpZHRoO1xuICAgICAgICB9IGVsc2UgaWYgKF8ucmVzcG9uZFRvID09PSAnbWluJykge1xuICAgICAgICAgICAgcmVzcG9uZFRvV2lkdGggPSBNYXRoLm1pbih3aW5kb3dXaWR0aCwgc2xpZGVyV2lkdGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBfLm9wdGlvbnMucmVzcG9uc2l2ZSAmJlxuICAgICAgICAgICAgXy5vcHRpb25zLnJlc3BvbnNpdmUubGVuZ3RoICYmXG4gICAgICAgICAgICBfLm9wdGlvbnMucmVzcG9uc2l2ZSAhPT0gbnVsbCkge1xuXG4gICAgICAgICAgICB0YXJnZXRCcmVha3BvaW50ID0gbnVsbDtcblxuICAgICAgICAgICAgZm9yIChicmVha3BvaW50IGluIF8uYnJlYWtwb2ludHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoXy5icmVha3BvaW50cy5oYXNPd25Qcm9wZXJ0eShicmVha3BvaW50KSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoXy5vcmlnaW5hbFNldHRpbmdzLm1vYmlsZUZpcnN0ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbmRUb1dpZHRoIDwgXy5icmVha3BvaW50c1ticmVha3BvaW50XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldEJyZWFrcG9pbnQgPSBfLmJyZWFrcG9pbnRzW2JyZWFrcG9pbnRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbmRUb1dpZHRoID4gXy5icmVha3BvaW50c1ticmVha3BvaW50XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldEJyZWFrcG9pbnQgPSBfLmJyZWFrcG9pbnRzW2JyZWFrcG9pbnRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGFyZ2V0QnJlYWtwb2ludCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmIChfLmFjdGl2ZUJyZWFrcG9pbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldEJyZWFrcG9pbnQgIT09IF8uYWN0aXZlQnJlYWtwb2ludCB8fCBmb3JjZVVwZGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgXy5hY3RpdmVCcmVha3BvaW50ID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRCcmVha3BvaW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF8uYnJlYWtwb2ludFNldHRpbmdzW3RhcmdldEJyZWFrcG9pbnRdID09PSAndW5zbGljaycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLnVuc2xpY2sodGFyZ2V0QnJlYWtwb2ludCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8ub3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBfLm9yaWdpbmFsU2V0dGluZ3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uYnJlYWtwb2ludFNldHRpbmdzW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0QnJlYWtwb2ludF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbml0aWFsID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uY3VycmVudFNsaWRlID0gXy5vcHRpb25zLmluaXRpYWxTbGlkZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXy5yZWZyZXNoKGluaXRpYWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdHJpZ2dlckJyZWFrcG9pbnQgPSB0YXJnZXRCcmVha3BvaW50O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgXy5hY3RpdmVCcmVha3BvaW50ID0gdGFyZ2V0QnJlYWtwb2ludDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF8uYnJlYWtwb2ludFNldHRpbmdzW3RhcmdldEJyZWFrcG9pbnRdID09PSAndW5zbGljaycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF8udW5zbGljayh0YXJnZXRCcmVha3BvaW50KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF8ub3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBfLm9yaWdpbmFsU2V0dGluZ3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXy5icmVha3BvaW50U2V0dGluZ3NbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldEJyZWFrcG9pbnRdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbml0aWFsID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXy5jdXJyZW50U2xpZGUgPSBfLm9wdGlvbnMuaW5pdGlhbFNsaWRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXy5yZWZyZXNoKGluaXRpYWwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXJCcmVha3BvaW50ID0gdGFyZ2V0QnJlYWtwb2ludDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChfLmFjdGl2ZUJyZWFrcG9pbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgXy5hY3RpdmVCcmVha3BvaW50ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgXy5vcHRpb25zID0gXy5vcmlnaW5hbFNldHRpbmdzO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5pdGlhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgXy5jdXJyZW50U2xpZGUgPSBfLm9wdGlvbnMuaW5pdGlhbFNsaWRlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF8ucmVmcmVzaChpbml0aWFsKTtcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlckJyZWFrcG9pbnQgPSB0YXJnZXRCcmVha3BvaW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gb25seSB0cmlnZ2VyIGJyZWFrcG9pbnRzIGR1cmluZyBhbiBhY3R1YWwgYnJlYWsuIG5vdCBvbiBpbml0aWFsaXplLlxuICAgICAgICAgICAgaWYoICFpbml0aWFsICYmIHRyaWdnZXJCcmVha3BvaW50ICE9PSBmYWxzZSApIHtcbiAgICAgICAgICAgICAgICBfLiRzbGlkZXIudHJpZ2dlcignYnJlYWtwb2ludCcsIFtfLCB0cmlnZ2VyQnJlYWtwb2ludF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmNoYW5nZVNsaWRlID0gZnVuY3Rpb24oZXZlbnQsIGRvbnRBbmltYXRlKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgJHRhcmdldCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCksXG4gICAgICAgICAgICBpbmRleE9mZnNldCwgc2xpZGVPZmZzZXQsIHVuZXZlbk9mZnNldDtcblxuICAgICAgICAvLyBJZiB0YXJnZXQgaXMgYSBsaW5rLCBwcmV2ZW50IGRlZmF1bHQgYWN0aW9uLlxuICAgICAgICBpZigkdGFyZ2V0LmlzKCdhJykpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiB0YXJnZXQgaXMgbm90IHRoZSA8bGk+IGVsZW1lbnQgKGllOiBhIGNoaWxkKSwgZmluZCB0aGUgPGxpPi5cbiAgICAgICAgaWYoISR0YXJnZXQuaXMoJ2xpJykpIHtcbiAgICAgICAgICAgICR0YXJnZXQgPSAkdGFyZ2V0LmNsb3Nlc3QoJ2xpJyk7XG4gICAgICAgIH1cblxuICAgICAgICB1bmV2ZW5PZmZzZXQgPSAoXy5zbGlkZUNvdW50ICUgXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsICE9PSAwKTtcbiAgICAgICAgaW5kZXhPZmZzZXQgPSB1bmV2ZW5PZmZzZXQgPyAwIDogKF8uc2xpZGVDb3VudCAtIF8uY3VycmVudFNsaWRlKSAlIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbDtcblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmRhdGEubWVzc2FnZSkge1xuXG4gICAgICAgICAgICBjYXNlICdwcmV2aW91cyc6XG4gICAgICAgICAgICAgICAgc2xpZGVPZmZzZXQgPSBpbmRleE9mZnNldCA9PT0gMCA/IF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCA6IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgLSBpbmRleE9mZnNldDtcbiAgICAgICAgICAgICAgICBpZiAoXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuICAgICAgICAgICAgICAgICAgICBfLnNsaWRlSGFuZGxlcihfLmN1cnJlbnRTbGlkZSAtIHNsaWRlT2Zmc2V0LCBmYWxzZSwgZG9udEFuaW1hdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnbmV4dCc6XG4gICAgICAgICAgICAgICAgc2xpZGVPZmZzZXQgPSBpbmRleE9mZnNldCA9PT0gMCA/IF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCA6IGluZGV4T2Zmc2V0O1xuICAgICAgICAgICAgICAgIGlmIChfLnNsaWRlQ291bnQgPiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG4gICAgICAgICAgICAgICAgICAgIF8uc2xpZGVIYW5kbGVyKF8uY3VycmVudFNsaWRlICsgc2xpZGVPZmZzZXQsIGZhbHNlLCBkb250QW5pbWF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdpbmRleCc6XG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gZXZlbnQuZGF0YS5pbmRleCA9PT0gMCA/IDAgOlxuICAgICAgICAgICAgICAgICAgICBldmVudC5kYXRhLmluZGV4IHx8ICR0YXJnZXQuaW5kZXgoKSAqIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbDtcblxuICAgICAgICAgICAgICAgIF8uc2xpZGVIYW5kbGVyKF8uY2hlY2tOYXZpZ2FibGUoaW5kZXgpLCBmYWxzZSwgZG9udEFuaW1hdGUpO1xuICAgICAgICAgICAgICAgICR0YXJnZXQuY2hpbGRyZW4oKS50cmlnZ2VyKCdmb2N1cycpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5jaGVja05hdmlnYWJsZSA9IGZ1bmN0aW9uKGluZGV4KSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgbmF2aWdhYmxlcywgcHJldk5hdmlnYWJsZTtcblxuICAgICAgICBuYXZpZ2FibGVzID0gXy5nZXROYXZpZ2FibGVJbmRleGVzKCk7XG4gICAgICAgIHByZXZOYXZpZ2FibGUgPSAwO1xuICAgICAgICBpZiAoaW5kZXggPiBuYXZpZ2FibGVzW25hdmlnYWJsZXMubGVuZ3RoIC0gMV0pIHtcbiAgICAgICAgICAgIGluZGV4ID0gbmF2aWdhYmxlc1tuYXZpZ2FibGVzLmxlbmd0aCAtIDFdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yICh2YXIgbiBpbiBuYXZpZ2FibGVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4IDwgbmF2aWdhYmxlc1tuXSkge1xuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IHByZXZOYXZpZ2FibGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwcmV2TmF2aWdhYmxlID0gbmF2aWdhYmxlc1tuXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmNsZWFuVXBFdmVudHMgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5kb3RzICYmIF8uJGRvdHMgIT09IG51bGwpIHtcblxuICAgICAgICAgICAgJCgnbGknLCBfLiRkb3RzKVxuICAgICAgICAgICAgICAgIC5vZmYoJ2NsaWNrLnNsaWNrJywgXy5jaGFuZ2VTbGlkZSlcbiAgICAgICAgICAgICAgICAub2ZmKCdtb3VzZWVudGVyLnNsaWNrJywgJC5wcm94eShfLmludGVycnVwdCwgXywgdHJ1ZSkpXG4gICAgICAgICAgICAgICAgLm9mZignbW91c2VsZWF2ZS5zbGljaycsICQucHJveHkoXy5pbnRlcnJ1cHQsIF8sIGZhbHNlKSk7XG5cbiAgICAgICAgICAgIGlmIChfLm9wdGlvbnMuYWNjZXNzaWJpbGl0eSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIF8uJGRvdHMub2ZmKCdrZXlkb3duLnNsaWNrJywgXy5rZXlIYW5kbGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIF8uJHNsaWRlci5vZmYoJ2ZvY3VzLnNsaWNrIGJsdXIuc2xpY2snKTtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmFycm93cyA9PT0gdHJ1ZSAmJiBfLnNsaWRlQ291bnQgPiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG4gICAgICAgICAgICBfLiRwcmV2QXJyb3cgJiYgXy4kcHJldkFycm93Lm9mZignY2xpY2suc2xpY2snLCBfLmNoYW5nZVNsaWRlKTtcbiAgICAgICAgICAgIF8uJG5leHRBcnJvdyAmJiBfLiRuZXh0QXJyb3cub2ZmKCdjbGljay5zbGljaycsIF8uY2hhbmdlU2xpZGUpO1xuXG4gICAgICAgICAgICBpZiAoXy5vcHRpb25zLmFjY2Vzc2liaWxpdHkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBfLiRwcmV2QXJyb3cgJiYgXy4kcHJldkFycm93Lm9mZigna2V5ZG93bi5zbGljaycsIF8ua2V5SGFuZGxlcik7XG4gICAgICAgICAgICAgICAgXy4kbmV4dEFycm93ICYmIF8uJG5leHRBcnJvdy5vZmYoJ2tleWRvd24uc2xpY2snLCBfLmtleUhhbmRsZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgXy4kbGlzdC5vZmYoJ3RvdWNoc3RhcnQuc2xpY2sgbW91c2Vkb3duLnNsaWNrJywgXy5zd2lwZUhhbmRsZXIpO1xuICAgICAgICBfLiRsaXN0Lm9mZigndG91Y2htb3ZlLnNsaWNrIG1vdXNlbW92ZS5zbGljaycsIF8uc3dpcGVIYW5kbGVyKTtcbiAgICAgICAgXy4kbGlzdC5vZmYoJ3RvdWNoZW5kLnNsaWNrIG1vdXNldXAuc2xpY2snLCBfLnN3aXBlSGFuZGxlcik7XG4gICAgICAgIF8uJGxpc3Qub2ZmKCd0b3VjaGNhbmNlbC5zbGljayBtb3VzZWxlYXZlLnNsaWNrJywgXy5zd2lwZUhhbmRsZXIpO1xuXG4gICAgICAgIF8uJGxpc3Qub2ZmKCdjbGljay5zbGljaycsIF8uY2xpY2tIYW5kbGVyKTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vZmYoXy52aXNpYmlsaXR5Q2hhbmdlLCBfLnZpc2liaWxpdHkpO1xuXG4gICAgICAgIF8uY2xlYW5VcFNsaWRlRXZlbnRzKCk7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5hY2Nlc3NpYmlsaXR5ID09PSB0cnVlKSB7XG4gICAgICAgICAgICBfLiRsaXN0Lm9mZigna2V5ZG93bi5zbGljaycsIF8ua2V5SGFuZGxlcik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5vcHRpb25zLmZvY3VzT25TZWxlY3QgPT09IHRydWUpIHtcbiAgICAgICAgICAgICQoXy4kc2xpZGVUcmFjaykuY2hpbGRyZW4oKS5vZmYoJ2NsaWNrLnNsaWNrJywgXy5zZWxlY3RIYW5kbGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgICQod2luZG93KS5vZmYoJ29yaWVudGF0aW9uY2hhbmdlLnNsaWNrLnNsaWNrLScgKyBfLmluc3RhbmNlVWlkLCBfLm9yaWVudGF0aW9uQ2hhbmdlKTtcblxuICAgICAgICAkKHdpbmRvdykub2ZmKCdyZXNpemUuc2xpY2suc2xpY2stJyArIF8uaW5zdGFuY2VVaWQsIF8ucmVzaXplKTtcblxuICAgICAgICAkKCdbZHJhZ2dhYmxlIT10cnVlXScsIF8uJHNsaWRlVHJhY2spLm9mZignZHJhZ3N0YXJ0JywgXy5wcmV2ZW50RGVmYXVsdCk7XG5cbiAgICAgICAgJCh3aW5kb3cpLm9mZignbG9hZC5zbGljay5zbGljay0nICsgXy5pbnN0YW5jZVVpZCwgXy5zZXRQb3NpdGlvbik7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmNsZWFuVXBTbGlkZUV2ZW50cyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBfLiRsaXN0Lm9mZignbW91c2VlbnRlci5zbGljaycsICQucHJveHkoXy5pbnRlcnJ1cHQsIF8sIHRydWUpKTtcbiAgICAgICAgXy4kbGlzdC5vZmYoJ21vdXNlbGVhdmUuc2xpY2snLCAkLnByb3h5KF8uaW50ZXJydXB0LCBfLCBmYWxzZSkpO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5jbGVhblVwUm93cyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcywgb3JpZ2luYWxTbGlkZXM7XG5cbiAgICAgICAgaWYoXy5vcHRpb25zLnJvd3MgPiAwKSB7XG4gICAgICAgICAgICBvcmlnaW5hbFNsaWRlcyA9IF8uJHNsaWRlcy5jaGlsZHJlbigpLmNoaWxkcmVuKCk7XG4gICAgICAgICAgICBvcmlnaW5hbFNsaWRlcy5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICAgICAgXy4kc2xpZGVyLmVtcHR5KCkuYXBwZW5kKG9yaWdpbmFsU2xpZGVzKTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5jbGlja0hhbmRsZXIgPSBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAoXy5zaG91bGRDbGljayA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbihyZWZyZXNoKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIF8uYXV0b1BsYXlDbGVhcigpO1xuXG4gICAgICAgIF8udG91Y2hPYmplY3QgPSB7fTtcblxuICAgICAgICBfLmNsZWFuVXBFdmVudHMoKTtcblxuICAgICAgICAkKCcuc2xpY2stY2xvbmVkJywgXy4kc2xpZGVyKS5kZXRhY2goKTtcblxuICAgICAgICBpZiAoXy4kZG90cykge1xuICAgICAgICAgICAgXy4kZG90cy5yZW1vdmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggXy4kcHJldkFycm93ICYmIF8uJHByZXZBcnJvdy5sZW5ndGggKSB7XG5cbiAgICAgICAgICAgIF8uJHByZXZBcnJvd1xuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnc2xpY2stZGlzYWJsZWQgc2xpY2stYXJyb3cgc2xpY2staGlkZGVuJylcbiAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignYXJpYS1oaWRkZW4gYXJpYS1kaXNhYmxlZCB0YWJpbmRleCcpXG4gICAgICAgICAgICAgICAgLmNzcygnZGlzcGxheScsJycpO1xuXG4gICAgICAgICAgICBpZiAoIF8uaHRtbEV4cHIudGVzdCggXy5vcHRpb25zLnByZXZBcnJvdyApKSB7XG4gICAgICAgICAgICAgICAgXy4kcHJldkFycm93LnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBfLiRuZXh0QXJyb3cgJiYgXy4kbmV4dEFycm93Lmxlbmd0aCApIHtcblxuICAgICAgICAgICAgXy4kbmV4dEFycm93XG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdzbGljay1kaXNhYmxlZCBzbGljay1hcnJvdyBzbGljay1oaWRkZW4nKVxuICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdhcmlhLWhpZGRlbiBhcmlhLWRpc2FibGVkIHRhYmluZGV4JylcbiAgICAgICAgICAgICAgICAuY3NzKCdkaXNwbGF5JywnJyk7XG5cbiAgICAgICAgICAgIGlmICggXy5odG1sRXhwci50ZXN0KCBfLm9wdGlvbnMubmV4dEFycm93ICkpIHtcbiAgICAgICAgICAgICAgICBfLiRuZXh0QXJyb3cucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmIChfLiRzbGlkZXMpIHtcblxuICAgICAgICAgICAgXy4kc2xpZGVzXG4gICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdzbGljay1zbGlkZSBzbGljay1hY3RpdmUgc2xpY2stY2VudGVyIHNsaWNrLXZpc2libGUgc2xpY2stY3VycmVudCcpXG4gICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ2FyaWEtaGlkZGVuJylcbiAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignZGF0YS1zbGljay1pbmRleCcpXG4gICAgICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKCdzdHlsZScsICQodGhpcykuZGF0YSgnb3JpZ2luYWxTdHlsaW5nJykpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBfLiRzbGlkZVRyYWNrLmNoaWxkcmVuKHRoaXMub3B0aW9ucy5zbGlkZSkuZGV0YWNoKCk7XG5cbiAgICAgICAgICAgIF8uJHNsaWRlVHJhY2suZGV0YWNoKCk7XG5cbiAgICAgICAgICAgIF8uJGxpc3QuZGV0YWNoKCk7XG5cbiAgICAgICAgICAgIF8uJHNsaWRlci5hcHBlbmQoXy4kc2xpZGVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF8uY2xlYW5VcFJvd3MoKTtcblxuICAgICAgICBfLiRzbGlkZXIucmVtb3ZlQ2xhc3MoJ3NsaWNrLXNsaWRlcicpO1xuICAgICAgICBfLiRzbGlkZXIucmVtb3ZlQ2xhc3MoJ3NsaWNrLWluaXRpYWxpemVkJyk7XG4gICAgICAgIF8uJHNsaWRlci5yZW1vdmVDbGFzcygnc2xpY2stZG90dGVkJyk7XG5cbiAgICAgICAgXy51bnNsaWNrZWQgPSB0cnVlO1xuXG4gICAgICAgIGlmKCFyZWZyZXNoKSB7XG4gICAgICAgICAgICBfLiRzbGlkZXIudHJpZ2dlcignZGVzdHJveScsIFtfXSk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuZGlzYWJsZVRyYW5zaXRpb24gPSBmdW5jdGlvbihzbGlkZSkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIHRyYW5zaXRpb24gPSB7fTtcblxuICAgICAgICB0cmFuc2l0aW9uW18udHJhbnNpdGlvblR5cGVdID0gJyc7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5mYWRlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5jc3ModHJhbnNpdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfLiRzbGlkZXMuZXEoc2xpZGUpLmNzcyh0cmFuc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5mYWRlU2xpZGUgPSBmdW5jdGlvbihzbGlkZUluZGV4LCBjYWxsYmFjaykge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAoXy5jc3NUcmFuc2l0aW9ucyA9PT0gZmFsc2UpIHtcblxuICAgICAgICAgICAgXy4kc2xpZGVzLmVxKHNsaWRlSW5kZXgpLmNzcyh7XG4gICAgICAgICAgICAgICAgekluZGV4OiBfLm9wdGlvbnMuekluZGV4XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgXy4kc2xpZGVzLmVxKHNsaWRlSW5kZXgpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgICAgIH0sIF8ub3B0aW9ucy5zcGVlZCwgXy5vcHRpb25zLmVhc2luZywgY2FsbGJhY2spO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIF8uYXBwbHlUcmFuc2l0aW9uKHNsaWRlSW5kZXgpO1xuXG4gICAgICAgICAgICBfLiRzbGlkZXMuZXEoc2xpZGVJbmRleCkuY3NzKHtcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgICAgIHpJbmRleDogXy5vcHRpb25zLnpJbmRleFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgXy5kaXNhYmxlVHJhbnNpdGlvbihzbGlkZUluZGV4KTtcblxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKCk7XG4gICAgICAgICAgICAgICAgfSwgXy5vcHRpb25zLnNwZWVkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmZhZGVTbGlkZU91dCA9IGZ1bmN0aW9uKHNsaWRlSW5kZXgpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKF8uY3NzVHJhbnNpdGlvbnMgPT09IGZhbHNlKSB7XG5cbiAgICAgICAgICAgIF8uJHNsaWRlcy5lcShzbGlkZUluZGV4KS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAgICAgICAgIHpJbmRleDogXy5vcHRpb25zLnpJbmRleCAtIDJcbiAgICAgICAgICAgIH0sIF8ub3B0aW9ucy5zcGVlZCwgXy5vcHRpb25zLmVhc2luZyk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgXy5hcHBseVRyYW5zaXRpb24oc2xpZGVJbmRleCk7XG5cbiAgICAgICAgICAgIF8uJHNsaWRlcy5lcShzbGlkZUluZGV4KS5jc3Moe1xuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgICAgICAgICAgekluZGV4OiBfLm9wdGlvbnMuekluZGV4IC0gMlxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5maWx0ZXJTbGlkZXMgPSBTbGljay5wcm90b3R5cGUuc2xpY2tGaWx0ZXIgPSBmdW5jdGlvbihmaWx0ZXIpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKGZpbHRlciAhPT0gbnVsbCkge1xuXG4gICAgICAgICAgICBfLiRzbGlkZXNDYWNoZSA9IF8uJHNsaWRlcztcblxuICAgICAgICAgICAgXy51bmxvYWQoKTtcblxuICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5jaGlsZHJlbih0aGlzLm9wdGlvbnMuc2xpZGUpLmRldGFjaCgpO1xuXG4gICAgICAgICAgICBfLiRzbGlkZXNDYWNoZS5maWx0ZXIoZmlsdGVyKS5hcHBlbmRUbyhfLiRzbGlkZVRyYWNrKTtcblxuICAgICAgICAgICAgXy5yZWluaXQoKTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmZvY3VzSGFuZGxlciA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBfLiRzbGlkZXJcbiAgICAgICAgICAgIC5vZmYoJ2ZvY3VzLnNsaWNrIGJsdXIuc2xpY2snKVxuICAgICAgICAgICAgLm9uKCdmb2N1cy5zbGljayBibHVyLnNsaWNrJywgJyonLCBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICAgICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIHZhciAkc2YgPSAkKHRoaXMpO1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgaWYoIF8ub3B0aW9ucy5wYXVzZU9uRm9jdXMgKSB7XG4gICAgICAgICAgICAgICAgICAgIF8uZm9jdXNzZWQgPSAkc2YuaXMoJzpmb2N1cycpO1xuICAgICAgICAgICAgICAgICAgICBfLmF1dG9QbGF5KCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LCAwKTtcblxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmdldEN1cnJlbnQgPSBTbGljay5wcm90b3R5cGUuc2xpY2tDdXJyZW50U2xpZGUgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG4gICAgICAgIHJldHVybiBfLmN1cnJlbnRTbGlkZTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuZ2V0RG90Q291bnQgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgdmFyIGJyZWFrUG9pbnQgPSAwO1xuICAgICAgICB2YXIgY291bnRlciA9IDA7XG4gICAgICAgIHZhciBwYWdlclF0eSA9IDA7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5pbmZpbml0ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgaWYgKF8uc2xpZGVDb3VudCA8PSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG4gICAgICAgICAgICAgICAgICsrcGFnZXJRdHk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdoaWxlIChicmVha1BvaW50IDwgXy5zbGlkZUNvdW50KSB7XG4gICAgICAgICAgICAgICAgICAgICsrcGFnZXJRdHk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrUG9pbnQgPSBjb3VudGVyICsgXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsO1xuICAgICAgICAgICAgICAgICAgICBjb3VudGVyICs9IF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCA8PSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93ID8gXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsIDogXy5vcHRpb25zLnNsaWRlc1RvU2hvdztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoXy5vcHRpb25zLmNlbnRlck1vZGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHBhZ2VyUXR5ID0gXy5zbGlkZUNvdW50O1xuICAgICAgICB9IGVsc2UgaWYoIV8ub3B0aW9ucy5hc05hdkZvcikge1xuICAgICAgICAgICAgcGFnZXJRdHkgPSAxICsgTWF0aC5jZWlsKChfLnNsaWRlQ291bnQgLSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSAvIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCk7XG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIHdoaWxlIChicmVha1BvaW50IDwgXy5zbGlkZUNvdW50KSB7XG4gICAgICAgICAgICAgICAgKytwYWdlclF0eTtcbiAgICAgICAgICAgICAgICBicmVha1BvaW50ID0gY291bnRlciArIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbDtcbiAgICAgICAgICAgICAgICBjb3VudGVyICs9IF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCA8PSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93ID8gXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsIDogXy5vcHRpb25zLnNsaWRlc1RvU2hvdztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwYWdlclF0eSAtIDE7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmdldExlZnQgPSBmdW5jdGlvbihzbGlkZUluZGV4KSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgdGFyZ2V0TGVmdCxcbiAgICAgICAgICAgIHZlcnRpY2FsSGVpZ2h0LFxuICAgICAgICAgICAgdmVydGljYWxPZmZzZXQgPSAwLFxuICAgICAgICAgICAgdGFyZ2V0U2xpZGUsXG4gICAgICAgICAgICBjb2VmO1xuXG4gICAgICAgIF8uc2xpZGVPZmZzZXQgPSAwO1xuICAgICAgICB2ZXJ0aWNhbEhlaWdodCA9IF8uJHNsaWRlcy5maXJzdCgpLm91dGVySGVpZ2h0KHRydWUpO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuaW5maW5pdGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGlmIChfLnNsaWRlQ291bnQgPiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG4gICAgICAgICAgICAgICAgXy5zbGlkZU9mZnNldCA9IChfLnNsaWRlV2lkdGggKiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSAqIC0xO1xuICAgICAgICAgICAgICAgIGNvZWYgPSAtMVxuXG4gICAgICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy52ZXJ0aWNhbCA9PT0gdHJ1ZSAmJiBfLm9wdGlvbnMuY2VudGVyTW9kZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoXy5vcHRpb25zLnNsaWRlc1RvU2hvdyA9PT0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29lZiA9IC0xLjU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXy5vcHRpb25zLnNsaWRlc1RvU2hvdyA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29lZiA9IC0yXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmVydGljYWxPZmZzZXQgPSAodmVydGljYWxIZWlnaHQgKiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSAqIGNvZWY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoXy5zbGlkZUNvdW50ICUgXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNsaWRlSW5kZXggKyBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwgPiBfLnNsaWRlQ291bnQgJiYgXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2xpZGVJbmRleCA+IF8uc2xpZGVDb3VudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgXy5zbGlkZU9mZnNldCA9ICgoXy5vcHRpb25zLnNsaWRlc1RvU2hvdyAtIChzbGlkZUluZGV4IC0gXy5zbGlkZUNvdW50KSkgKiBfLnNsaWRlV2lkdGgpICogLTE7XG4gICAgICAgICAgICAgICAgICAgICAgICB2ZXJ0aWNhbE9mZnNldCA9ICgoXy5vcHRpb25zLnNsaWRlc1RvU2hvdyAtIChzbGlkZUluZGV4IC0gXy5zbGlkZUNvdW50KSkgKiB2ZXJ0aWNhbEhlaWdodCkgKiAtMTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF8uc2xpZGVPZmZzZXQgPSAoKF8uc2xpZGVDb3VudCAlIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCkgKiBfLnNsaWRlV2lkdGgpICogLTE7XG4gICAgICAgICAgICAgICAgICAgICAgICB2ZXJ0aWNhbE9mZnNldCA9ICgoXy5zbGlkZUNvdW50ICUgXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsKSAqIHZlcnRpY2FsSGVpZ2h0KSAqIC0xO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHNsaWRlSW5kZXggKyBfLm9wdGlvbnMuc2xpZGVzVG9TaG93ID4gXy5zbGlkZUNvdW50KSB7XG4gICAgICAgICAgICAgICAgXy5zbGlkZU9mZnNldCA9ICgoc2xpZGVJbmRleCArIF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIC0gXy5zbGlkZUNvdW50KSAqIF8uc2xpZGVXaWR0aDtcbiAgICAgICAgICAgICAgICB2ZXJ0aWNhbE9mZnNldCA9ICgoc2xpZGVJbmRleCArIF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIC0gXy5zbGlkZUNvdW50KSAqIHZlcnRpY2FsSGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8uc2xpZGVDb3VudCA8PSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG4gICAgICAgICAgICBfLnNsaWRlT2Zmc2V0ID0gMDtcbiAgICAgICAgICAgIHZlcnRpY2FsT2Zmc2V0ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuY2VudGVyTW9kZSA9PT0gdHJ1ZSAmJiBfLnNsaWRlQ291bnQgPD0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuICAgICAgICAgICAgXy5zbGlkZU9mZnNldCA9ICgoXy5zbGlkZVdpZHRoICogTWF0aC5mbG9vcihfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSkgLyAyKSAtICgoXy5zbGlkZVdpZHRoICogXy5zbGlkZUNvdW50KSAvIDIpO1xuICAgICAgICB9IGVsc2UgaWYgKF8ub3B0aW9ucy5jZW50ZXJNb2RlID09PSB0cnVlICYmIF8ub3B0aW9ucy5pbmZpbml0ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgXy5zbGlkZU9mZnNldCArPSBfLnNsaWRlV2lkdGggKiBNYXRoLmZsb29yKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgLyAyKSAtIF8uc2xpZGVXaWR0aDtcbiAgICAgICAgfSBlbHNlIGlmIChfLm9wdGlvbnMuY2VudGVyTW9kZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgXy5zbGlkZU9mZnNldCA9IDA7XG4gICAgICAgICAgICBfLnNsaWRlT2Zmc2V0ICs9IF8uc2xpZGVXaWR0aCAqIE1hdGguZmxvb3IoXy5vcHRpb25zLnNsaWRlc1RvU2hvdyAvIDIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy52ZXJ0aWNhbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRhcmdldExlZnQgPSAoKHNsaWRlSW5kZXggKiBfLnNsaWRlV2lkdGgpICogLTEpICsgXy5zbGlkZU9mZnNldDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRhcmdldExlZnQgPSAoKHNsaWRlSW5kZXggKiB2ZXJ0aWNhbEhlaWdodCkgKiAtMSkgKyB2ZXJ0aWNhbE9mZnNldDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLm9wdGlvbnMudmFyaWFibGVXaWR0aCA9PT0gdHJ1ZSkge1xuXG4gICAgICAgICAgICBpZiAoXy5zbGlkZUNvdW50IDw9IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgfHwgXy5vcHRpb25zLmluZmluaXRlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHRhcmdldFNsaWRlID0gXy4kc2xpZGVUcmFjay5jaGlsZHJlbignLnNsaWNrLXNsaWRlJykuZXEoc2xpZGVJbmRleCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRhcmdldFNsaWRlID0gXy4kc2xpZGVUcmFjay5jaGlsZHJlbignLnNsaWNrLXNsaWRlJykuZXEoc2xpZGVJbmRleCArIF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoXy5vcHRpb25zLnJ0bCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0YXJnZXRTbGlkZVswXSkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRMZWZ0ID0gKF8uJHNsaWRlVHJhY2sud2lkdGgoKSAtIHRhcmdldFNsaWRlWzBdLm9mZnNldExlZnQgLSB0YXJnZXRTbGlkZS53aWR0aCgpKSAqIC0xO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldExlZnQgPSAgMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRhcmdldExlZnQgPSB0YXJnZXRTbGlkZVswXSA/IHRhcmdldFNsaWRlWzBdLm9mZnNldExlZnQgKiAtMSA6IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChfLm9wdGlvbnMuY2VudGVyTW9kZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChfLnNsaWRlQ291bnQgPD0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdyB8fCBfLm9wdGlvbnMuaW5maW5pdGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFNsaWRlID0gXy4kc2xpZGVUcmFjay5jaGlsZHJlbignLnNsaWNrLXNsaWRlJykuZXEoc2xpZGVJbmRleCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0U2xpZGUgPSBfLiRzbGlkZVRyYWNrLmNoaWxkcmVuKCcuc2xpY2stc2xpZGUnKS5lcShzbGlkZUluZGV4ICsgXy5vcHRpb25zLnNsaWRlc1RvU2hvdyArIDEpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChfLm9wdGlvbnMucnRsID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXRTbGlkZVswXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0TGVmdCA9IChfLiRzbGlkZVRyYWNrLndpZHRoKCkgLSB0YXJnZXRTbGlkZVswXS5vZmZzZXRMZWZ0IC0gdGFyZ2V0U2xpZGUud2lkdGgoKSkgKiAtMTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldExlZnQgPSAgMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldExlZnQgPSB0YXJnZXRTbGlkZVswXSA/IHRhcmdldFNsaWRlWzBdLm9mZnNldExlZnQgKiAtMSA6IDA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGFyZ2V0TGVmdCArPSAoXy4kbGlzdC53aWR0aCgpIC0gdGFyZ2V0U2xpZGUub3V0ZXJXaWR0aCgpKSAvIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGFyZ2V0TGVmdDtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuZ2V0T3B0aW9uID0gU2xpY2sucHJvdG90eXBlLnNsaWNrR2V0T3B0aW9uID0gZnVuY3Rpb24ob3B0aW9uKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiBfLm9wdGlvbnNbb3B0aW9uXTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuZ2V0TmF2aWdhYmxlSW5kZXhlcyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIGJyZWFrUG9pbnQgPSAwLFxuICAgICAgICAgICAgY291bnRlciA9IDAsXG4gICAgICAgICAgICBpbmRleGVzID0gW10sXG4gICAgICAgICAgICBtYXg7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5pbmZpbml0ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIG1heCA9IF8uc2xpZGVDb3VudDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJyZWFrUG9pbnQgPSBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwgKiAtMTtcbiAgICAgICAgICAgIGNvdW50ZXIgPSBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwgKiAtMTtcbiAgICAgICAgICAgIG1heCA9IF8uc2xpZGVDb3VudCAqIDI7XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZSAoYnJlYWtQb2ludCA8IG1heCkge1xuICAgICAgICAgICAgaW5kZXhlcy5wdXNoKGJyZWFrUG9pbnQpO1xuICAgICAgICAgICAgYnJlYWtQb2ludCA9IGNvdW50ZXIgKyBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGw7XG4gICAgICAgICAgICBjb3VudGVyICs9IF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCA8PSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93ID8gXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsIDogXy5vcHRpb25zLnNsaWRlc1RvU2hvdztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpbmRleGVzO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5nZXRTbGljayA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5nZXRTbGlkZUNvdW50ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgc2xpZGVzVHJhdmVyc2VkLCBzd2lwZWRTbGlkZSwgY2VudGVyT2Zmc2V0O1xuXG4gICAgICAgIGNlbnRlck9mZnNldCA9IF8ub3B0aW9ucy5jZW50ZXJNb2RlID09PSB0cnVlID8gXy5zbGlkZVdpZHRoICogTWF0aC5mbG9vcihfLm9wdGlvbnMuc2xpZGVzVG9TaG93IC8gMikgOiAwO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuc3dpcGVUb1NsaWRlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBfLiRzbGlkZVRyYWNrLmZpbmQoJy5zbGljay1zbGlkZScpLmVhY2goZnVuY3Rpb24oaW5kZXgsIHNsaWRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNsaWRlLm9mZnNldExlZnQgLSBjZW50ZXJPZmZzZXQgKyAoJChzbGlkZSkub3V0ZXJXaWR0aCgpIC8gMikgPiAoXy5zd2lwZUxlZnQgKiAtMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgc3dpcGVkU2xpZGUgPSBzbGlkZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzbGlkZXNUcmF2ZXJzZWQgPSBNYXRoLmFicygkKHN3aXBlZFNsaWRlKS5hdHRyKCdkYXRhLXNsaWNrLWluZGV4JykgLSBfLmN1cnJlbnRTbGlkZSkgfHwgMTtcblxuICAgICAgICAgICAgcmV0dXJuIHNsaWRlc1RyYXZlcnNlZDtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbDtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5nb1RvID0gU2xpY2sucHJvdG90eXBlLnNsaWNrR29UbyA9IGZ1bmN0aW9uKHNsaWRlLCBkb250QW5pbWF0ZSkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBfLmNoYW5nZVNsaWRlKHtcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnaW5kZXgnLFxuICAgICAgICAgICAgICAgIGluZGV4OiBwYXJzZUludChzbGlkZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZG9udEFuaW1hdGUpO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oY3JlYXRpb24pIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKCEkKF8uJHNsaWRlcikuaGFzQ2xhc3MoJ3NsaWNrLWluaXRpYWxpemVkJykpIHtcblxuICAgICAgICAgICAgJChfLiRzbGlkZXIpLmFkZENsYXNzKCdzbGljay1pbml0aWFsaXplZCcpO1xuXG4gICAgICAgICAgICBfLmJ1aWxkUm93cygpO1xuICAgICAgICAgICAgXy5idWlsZE91dCgpO1xuICAgICAgICAgICAgXy5zZXRQcm9wcygpO1xuICAgICAgICAgICAgXy5zdGFydExvYWQoKTtcbiAgICAgICAgICAgIF8ubG9hZFNsaWRlcigpO1xuICAgICAgICAgICAgXy5pbml0aWFsaXplRXZlbnRzKCk7XG4gICAgICAgICAgICBfLnVwZGF0ZUFycm93cygpO1xuICAgICAgICAgICAgXy51cGRhdGVEb3RzKCk7XG4gICAgICAgICAgICBfLmNoZWNrUmVzcG9uc2l2ZSh0cnVlKTtcbiAgICAgICAgICAgIF8uZm9jdXNIYW5kbGVyKCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjcmVhdGlvbikge1xuICAgICAgICAgICAgXy4kc2xpZGVyLnRyaWdnZXIoJ2luaXQnLCBbX10pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5hY2Nlc3NpYmlsaXR5ID09PSB0cnVlKSB7XG4gICAgICAgICAgICBfLmluaXRBREEoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggXy5vcHRpb25zLmF1dG9wbGF5ICkge1xuXG4gICAgICAgICAgICBfLnBhdXNlZCA9IGZhbHNlO1xuICAgICAgICAgICAgXy5hdXRvUGxheSgpO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuaW5pdEFEQSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICAgICAgbnVtRG90R3JvdXBzID0gTWF0aC5jZWlsKF8uc2xpZGVDb3VudCAvIF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpLFxuICAgICAgICAgICAgICAgIHRhYkNvbnRyb2xJbmRleGVzID0gXy5nZXROYXZpZ2FibGVJbmRleGVzKCkuZmlsdGVyKGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHZhbCA+PSAwKSAmJiAodmFsIDwgXy5zbGlkZUNvdW50KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICBfLiRzbGlkZXMuYWRkKF8uJHNsaWRlVHJhY2suZmluZCgnLnNsaWNrLWNsb25lZCcpKS5hdHRyKHtcbiAgICAgICAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJyxcbiAgICAgICAgICAgICd0YWJpbmRleCc6ICctMSdcbiAgICAgICAgfSkuZmluZCgnYSwgaW5wdXQsIGJ1dHRvbiwgc2VsZWN0JykuYXR0cih7XG4gICAgICAgICAgICAndGFiaW5kZXgnOiAnLTEnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChfLiRkb3RzICE9PSBudWxsKSB7XG4gICAgICAgICAgICBfLiRzbGlkZXMubm90KF8uJHNsaWRlVHJhY2suZmluZCgnLnNsaWNrLWNsb25lZCcpKS5lYWNoKGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2xpZGVDb250cm9sSW5kZXggPSB0YWJDb250cm9sSW5kZXhlcy5pbmRleE9mKGkpO1xuXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKHtcbiAgICAgICAgICAgICAgICAgICAgJ3JvbGUnOiAndGFicGFuZWwnLFxuICAgICAgICAgICAgICAgICAgICAnaWQnOiAnc2xpY2stc2xpZGUnICsgXy5pbnN0YW5jZVVpZCArIGksXG4gICAgICAgICAgICAgICAgICAgICd0YWJpbmRleCc6IC0xXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2xpZGVDb250cm9sSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgdmFyIGFyaWFCdXR0b25Db250cm9sID0gJ3NsaWNrLXNsaWRlLWNvbnRyb2wnICsgXy5pbnN0YW5jZVVpZCArIHNsaWRlQ29udHJvbEluZGV4XG4gICAgICAgICAgICAgICAgICAgaWYgKCQoJyMnICsgYXJpYUJ1dHRvbkNvbnRyb2wpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAnYXJpYS1kZXNjcmliZWRieSc6IGFyaWFCdXR0b25Db250cm9sXG4gICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIF8uJGRvdHMuYXR0cigncm9sZScsICd0YWJsaXN0JykuZmluZCgnbGknKS5lYWNoKGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWFwcGVkU2xpZGVJbmRleCA9IHRhYkNvbnRyb2xJbmRleGVzW2ldO1xuXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKHtcbiAgICAgICAgICAgICAgICAgICAgJ3JvbGUnOiAncHJlc2VudGF0aW9uJ1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCdidXR0b24nKS5maXJzdCgpLmF0dHIoe1xuICAgICAgICAgICAgICAgICAgICAncm9sZSc6ICd0YWInLFxuICAgICAgICAgICAgICAgICAgICAnaWQnOiAnc2xpY2stc2xpZGUtY29udHJvbCcgKyBfLmluc3RhbmNlVWlkICsgaSxcbiAgICAgICAgICAgICAgICAgICAgJ2FyaWEtY29udHJvbHMnOiAnc2xpY2stc2xpZGUnICsgXy5pbnN0YW5jZVVpZCArIG1hcHBlZFNsaWRlSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICdhcmlhLWxhYmVsJzogKGkgKyAxKSArICcgb2YgJyArIG51bURvdEdyb3VwcyxcbiAgICAgICAgICAgICAgICAgICAgJ2FyaWEtc2VsZWN0ZWQnOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAndGFiaW5kZXgnOiAnLTEnXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0pLmVxKF8uY3VycmVudFNsaWRlKS5maW5kKCdidXR0b24nKS5hdHRyKHtcbiAgICAgICAgICAgICAgICAnYXJpYS1zZWxlY3RlZCc6ICd0cnVlJyxcbiAgICAgICAgICAgICAgICAndGFiaW5kZXgnOiAnMCdcbiAgICAgICAgICAgIH0pLmVuZCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaT1fLmN1cnJlbnRTbGlkZSwgbWF4PWkrXy5vcHRpb25zLnNsaWRlc1RvU2hvdzsgaSA8IG1heDsgaSsrKSB7XG4gICAgICAgICAgaWYgKF8ub3B0aW9ucy5mb2N1c09uQ2hhbmdlKSB7XG4gICAgICAgICAgICBfLiRzbGlkZXMuZXEoaSkuYXR0cih7J3RhYmluZGV4JzogJzAnfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF8uJHNsaWRlcy5lcShpKS5yZW1vdmVBdHRyKCd0YWJpbmRleCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIF8uYWN0aXZhdGVBREEoKTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuaW5pdEFycm93RXZlbnRzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuYXJyb3dzID09PSB0cnVlICYmIF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcbiAgICAgICAgICAgIF8uJHByZXZBcnJvd1xuICAgICAgICAgICAgICAgLm9mZignY2xpY2suc2xpY2snKVxuICAgICAgICAgICAgICAgLm9uKCdjbGljay5zbGljaycsIHtcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogJ3ByZXZpb3VzJ1xuICAgICAgICAgICAgICAgfSwgXy5jaGFuZ2VTbGlkZSk7XG4gICAgICAgICAgICBfLiRuZXh0QXJyb3dcbiAgICAgICAgICAgICAgIC5vZmYoJ2NsaWNrLnNsaWNrJylcbiAgICAgICAgICAgICAgIC5vbignY2xpY2suc2xpY2snLCB7XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICduZXh0J1xuICAgICAgICAgICAgICAgfSwgXy5jaGFuZ2VTbGlkZSk7XG5cbiAgICAgICAgICAgIGlmIChfLm9wdGlvbnMuYWNjZXNzaWJpbGl0eSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIF8uJHByZXZBcnJvdy5vbigna2V5ZG93bi5zbGljaycsIF8ua2V5SGFuZGxlcik7XG4gICAgICAgICAgICAgICAgXy4kbmV4dEFycm93Lm9uKCdrZXlkb3duLnNsaWNrJywgXy5rZXlIYW5kbGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5pbml0RG90RXZlbnRzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuZG90cyA9PT0gdHJ1ZSAmJiBfLnNsaWRlQ291bnQgPiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG4gICAgICAgICAgICAkKCdsaScsIF8uJGRvdHMpLm9uKCdjbGljay5zbGljaycsIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnaW5kZXgnXG4gICAgICAgICAgICB9LCBfLmNoYW5nZVNsaWRlKTtcblxuICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5hY2Nlc3NpYmlsaXR5ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgXy4kZG90cy5vbigna2V5ZG93bi5zbGljaycsIF8ua2V5SGFuZGxlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5vcHRpb25zLmRvdHMgPT09IHRydWUgJiYgXy5vcHRpb25zLnBhdXNlT25Eb3RzSG92ZXIgPT09IHRydWUgJiYgXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuXG4gICAgICAgICAgICAkKCdsaScsIF8uJGRvdHMpXG4gICAgICAgICAgICAgICAgLm9uKCdtb3VzZWVudGVyLnNsaWNrJywgJC5wcm94eShfLmludGVycnVwdCwgXywgdHJ1ZSkpXG4gICAgICAgICAgICAgICAgLm9uKCdtb3VzZWxlYXZlLnNsaWNrJywgJC5wcm94eShfLmludGVycnVwdCwgXywgZmFsc2UpKTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmluaXRTbGlkZUV2ZW50cyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAoIF8ub3B0aW9ucy5wYXVzZU9uSG92ZXIgKSB7XG5cbiAgICAgICAgICAgIF8uJGxpc3Qub24oJ21vdXNlZW50ZXIuc2xpY2snLCAkLnByb3h5KF8uaW50ZXJydXB0LCBfLCB0cnVlKSk7XG4gICAgICAgICAgICBfLiRsaXN0Lm9uKCdtb3VzZWxlYXZlLnNsaWNrJywgJC5wcm94eShfLmludGVycnVwdCwgXywgZmFsc2UpKTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmluaXRpYWxpemVFdmVudHMgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgXy5pbml0QXJyb3dFdmVudHMoKTtcblxuICAgICAgICBfLmluaXREb3RFdmVudHMoKTtcbiAgICAgICAgXy5pbml0U2xpZGVFdmVudHMoKTtcblxuICAgICAgICBfLiRsaXN0Lm9uKCd0b3VjaHN0YXJ0LnNsaWNrIG1vdXNlZG93bi5zbGljaycsIHtcbiAgICAgICAgICAgIGFjdGlvbjogJ3N0YXJ0J1xuICAgICAgICB9LCBfLnN3aXBlSGFuZGxlcik7XG4gICAgICAgIF8uJGxpc3Qub24oJ3RvdWNobW92ZS5zbGljayBtb3VzZW1vdmUuc2xpY2snLCB7XG4gICAgICAgICAgICBhY3Rpb246ICdtb3ZlJ1xuICAgICAgICB9LCBfLnN3aXBlSGFuZGxlcik7XG4gICAgICAgIF8uJGxpc3Qub24oJ3RvdWNoZW5kLnNsaWNrIG1vdXNldXAuc2xpY2snLCB7XG4gICAgICAgICAgICBhY3Rpb246ICdlbmQnXG4gICAgICAgIH0sIF8uc3dpcGVIYW5kbGVyKTtcbiAgICAgICAgXy4kbGlzdC5vbigndG91Y2hjYW5jZWwuc2xpY2sgbW91c2VsZWF2ZS5zbGljaycsIHtcbiAgICAgICAgICAgIGFjdGlvbjogJ2VuZCdcbiAgICAgICAgfSwgXy5zd2lwZUhhbmRsZXIpO1xuXG4gICAgICAgIF8uJGxpc3Qub24oJ2NsaWNrLnNsaWNrJywgXy5jbGlja0hhbmRsZXIpO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKF8udmlzaWJpbGl0eUNoYW5nZSwgJC5wcm94eShfLnZpc2liaWxpdHksIF8pKTtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmFjY2Vzc2liaWxpdHkgPT09IHRydWUpIHtcbiAgICAgICAgICAgIF8uJGxpc3Qub24oJ2tleWRvd24uc2xpY2snLCBfLmtleUhhbmRsZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5mb2N1c09uU2VsZWN0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAkKF8uJHNsaWRlVHJhY2spLmNoaWxkcmVuKCkub24oJ2NsaWNrLnNsaWNrJywgXy5zZWxlY3RIYW5kbGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgICQod2luZG93KS5vbignb3JpZW50YXRpb25jaGFuZ2Uuc2xpY2suc2xpY2stJyArIF8uaW5zdGFuY2VVaWQsICQucHJveHkoXy5vcmllbnRhdGlvbkNoYW5nZSwgXykpO1xuXG4gICAgICAgICQod2luZG93KS5vbigncmVzaXplLnNsaWNrLnNsaWNrLScgKyBfLmluc3RhbmNlVWlkLCAkLnByb3h5KF8ucmVzaXplLCBfKSk7XG5cbiAgICAgICAgJCgnW2RyYWdnYWJsZSE9dHJ1ZV0nLCBfLiRzbGlkZVRyYWNrKS5vbignZHJhZ3N0YXJ0JywgXy5wcmV2ZW50RGVmYXVsdCk7XG5cbiAgICAgICAgJCh3aW5kb3cpLm9uKCdsb2FkLnNsaWNrLnNsaWNrLScgKyBfLmluc3RhbmNlVWlkLCBfLnNldFBvc2l0aW9uKTtcbiAgICAgICAgJChfLnNldFBvc2l0aW9uKTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuaW5pdFVJID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuYXJyb3dzID09PSB0cnVlICYmIF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcblxuICAgICAgICAgICAgXy4kcHJldkFycm93LnNob3coKTtcbiAgICAgICAgICAgIF8uJG5leHRBcnJvdy5zaG93KCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuZG90cyA9PT0gdHJ1ZSAmJiBfLnNsaWRlQ291bnQgPiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG5cbiAgICAgICAgICAgIF8uJGRvdHMuc2hvdygpO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUua2V5SGFuZGxlciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuICAgICAgICAgLy9Eb250IHNsaWRlIGlmIHRoZSBjdXJzb3IgaXMgaW5zaWRlIHRoZSBmb3JtIGZpZWxkcyBhbmQgYXJyb3cga2V5cyBhcmUgcHJlc3NlZFxuICAgICAgICBpZighZXZlbnQudGFyZ2V0LnRhZ05hbWUubWF0Y2goJ1RFWFRBUkVBfElOUFVUfFNFTEVDVCcpKSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzcgJiYgXy5vcHRpb25zLmFjY2Vzc2liaWxpdHkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBfLmNoYW5nZVNsaWRlKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXy5vcHRpb25zLnJ0bCA9PT0gdHJ1ZSA/ICduZXh0JyA6ICAncHJldmlvdXMnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzkgJiYgXy5vcHRpb25zLmFjY2Vzc2liaWxpdHkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBfLmNoYW5nZVNsaWRlKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXy5vcHRpb25zLnJ0bCA9PT0gdHJ1ZSA/ICdwcmV2aW91cycgOiAnbmV4dCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmxhenlMb2FkID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgbG9hZFJhbmdlLCBjbG9uZVJhbmdlLCByYW5nZVN0YXJ0LCByYW5nZUVuZDtcblxuICAgICAgICBmdW5jdGlvbiBsb2FkSW1hZ2VzKGltYWdlc1Njb3BlKSB7XG5cbiAgICAgICAgICAgICQoJ2ltZ1tkYXRhLWxhenldJywgaW1hZ2VzU2NvcGUpLmVhY2goZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgaW1hZ2UgPSAkKHRoaXMpLFxuICAgICAgICAgICAgICAgICAgICBpbWFnZVNvdXJjZSA9ICQodGhpcykuYXR0cignZGF0YS1sYXp5JyksXG4gICAgICAgICAgICAgICAgICAgIGltYWdlU3JjU2V0ID0gJCh0aGlzKS5hdHRyKCdkYXRhLXNyY3NldCcpLFxuICAgICAgICAgICAgICAgICAgICBpbWFnZVNpemVzICA9ICQodGhpcykuYXR0cignZGF0YS1zaXplcycpIHx8IF8uJHNsaWRlci5hdHRyKCdkYXRhLXNpemVzJyksXG4gICAgICAgICAgICAgICAgICAgIGltYWdlVG9Mb2FkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cbiAgICAgICAgICAgICAgICBpbWFnZVRvTG9hZC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgICAgICBpbWFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFuaW1hdGUoeyBvcGFjaXR5OiAwIH0sIDEwMCwgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW1hZ2VTcmNTZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdzcmNzZXQnLCBpbWFnZVNyY1NldCApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbWFnZVNpemVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdzaXplcycsIGltYWdlU2l6ZXMgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdzcmMnLCBpbWFnZVNvdXJjZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmFuaW1hdGUoeyBvcGFjaXR5OiAxIH0sIDIwMCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdkYXRhLWxhenkgZGF0YS1zcmNzZXQgZGF0YS1zaXplcycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdzbGljay1sb2FkaW5nJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uJHNsaWRlci50cmlnZ2VyKCdsYXp5TG9hZGVkJywgW18sIGltYWdlLCBpbWFnZVNvdXJjZV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgaW1hZ2VUb0xvYWQub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGltYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0ciggJ2RhdGEtbGF6eScgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCAnc2xpY2stbG9hZGluZycgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCAnc2xpY2stbGF6eWxvYWQtZXJyb3InICk7XG5cbiAgICAgICAgICAgICAgICAgICAgXy4kc2xpZGVyLnRyaWdnZXIoJ2xhenlMb2FkRXJyb3InLCBbIF8sIGltYWdlLCBpbWFnZVNvdXJjZSBdKTtcblxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBpbWFnZVRvTG9hZC5zcmMgPSBpbWFnZVNvdXJjZTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuY2VudGVyTW9kZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5pbmZpbml0ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHJhbmdlU3RhcnQgPSBfLmN1cnJlbnRTbGlkZSArIChfLm9wdGlvbnMuc2xpZGVzVG9TaG93IC8gMiArIDEpO1xuICAgICAgICAgICAgICAgIHJhbmdlRW5kID0gcmFuZ2VTdGFydCArIF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgKyAyO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByYW5nZVN0YXJ0ID0gTWF0aC5tYXgoMCwgXy5jdXJyZW50U2xpZGUgLSAoXy5vcHRpb25zLnNsaWRlc1RvU2hvdyAvIDIgKyAxKSk7XG4gICAgICAgICAgICAgICAgcmFuZ2VFbmQgPSAyICsgKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgLyAyICsgMSkgKyBfLmN1cnJlbnRTbGlkZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJhbmdlU3RhcnQgPSBfLm9wdGlvbnMuaW5maW5pdGUgPyBfLm9wdGlvbnMuc2xpZGVzVG9TaG93ICsgXy5jdXJyZW50U2xpZGUgOiBfLmN1cnJlbnRTbGlkZTtcbiAgICAgICAgICAgIHJhbmdlRW5kID0gTWF0aC5jZWlsKHJhbmdlU3RhcnQgKyBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KTtcbiAgICAgICAgICAgIGlmIChfLm9wdGlvbnMuZmFkZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChyYW5nZVN0YXJ0ID4gMCkgcmFuZ2VTdGFydC0tO1xuICAgICAgICAgICAgICAgIGlmIChyYW5nZUVuZCA8PSBfLnNsaWRlQ291bnQpIHJhbmdlRW5kKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsb2FkUmFuZ2UgPSBfLiRzbGlkZXIuZmluZCgnLnNsaWNrLXNsaWRlJykuc2xpY2UocmFuZ2VTdGFydCwgcmFuZ2VFbmQpO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMubGF6eUxvYWQgPT09ICdhbnRpY2lwYXRlZCcpIHtcbiAgICAgICAgICAgIHZhciBwcmV2U2xpZGUgPSByYW5nZVN0YXJ0IC0gMSxcbiAgICAgICAgICAgICAgICBuZXh0U2xpZGUgPSByYW5nZUVuZCxcbiAgICAgICAgICAgICAgICAkc2xpZGVzID0gXy4kc2xpZGVyLmZpbmQoJy5zbGljay1zbGlkZScpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHByZXZTbGlkZSA8IDApIHByZXZTbGlkZSA9IF8uc2xpZGVDb3VudCAtIDE7XG4gICAgICAgICAgICAgICAgbG9hZFJhbmdlID0gbG9hZFJhbmdlLmFkZCgkc2xpZGVzLmVxKHByZXZTbGlkZSkpO1xuICAgICAgICAgICAgICAgIGxvYWRSYW5nZSA9IGxvYWRSYW5nZS5hZGQoJHNsaWRlcy5lcShuZXh0U2xpZGUpKTtcbiAgICAgICAgICAgICAgICBwcmV2U2xpZGUtLTtcbiAgICAgICAgICAgICAgICBuZXh0U2xpZGUrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxvYWRJbWFnZXMobG9hZFJhbmdlKTtcblxuICAgICAgICBpZiAoXy5zbGlkZUNvdW50IDw9IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcbiAgICAgICAgICAgIGNsb25lUmFuZ2UgPSBfLiRzbGlkZXIuZmluZCgnLnNsaWNrLXNsaWRlJyk7XG4gICAgICAgICAgICBsb2FkSW1hZ2VzKGNsb25lUmFuZ2UpO1xuICAgICAgICB9IGVsc2VcbiAgICAgICAgaWYgKF8uY3VycmVudFNsaWRlID49IF8uc2xpZGVDb3VudCAtIF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcbiAgICAgICAgICAgIGNsb25lUmFuZ2UgPSBfLiRzbGlkZXIuZmluZCgnLnNsaWNrLWNsb25lZCcpLnNsaWNlKDAsIF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpO1xuICAgICAgICAgICAgbG9hZEltYWdlcyhjbG9uZVJhbmdlKTtcbiAgICAgICAgfSBlbHNlIGlmIChfLmN1cnJlbnRTbGlkZSA9PT0gMCkge1xuICAgICAgICAgICAgY2xvbmVSYW5nZSA9IF8uJHNsaWRlci5maW5kKCcuc2xpY2stY2xvbmVkJykuc2xpY2UoXy5vcHRpb25zLnNsaWRlc1RvU2hvdyAqIC0xKTtcbiAgICAgICAgICAgIGxvYWRJbWFnZXMoY2xvbmVSYW5nZSk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUubG9hZFNsaWRlciA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBfLnNldFBvc2l0aW9uKCk7XG5cbiAgICAgICAgXy4kc2xpZGVUcmFjay5jc3Moe1xuICAgICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICB9KTtcblxuICAgICAgICBfLiRzbGlkZXIucmVtb3ZlQ2xhc3MoJ3NsaWNrLWxvYWRpbmcnKTtcblxuICAgICAgICBfLmluaXRVSSgpO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMubGF6eUxvYWQgPT09ICdwcm9ncmVzc2l2ZScpIHtcbiAgICAgICAgICAgIF8ucHJvZ3Jlc3NpdmVMYXp5TG9hZCgpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLm5leHQgPSBTbGljay5wcm90b3R5cGUuc2xpY2tOZXh0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIF8uY2hhbmdlU2xpZGUoe1xuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICduZXh0J1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUub3JpZW50YXRpb25DaGFuZ2UgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgXy5jaGVja1Jlc3BvbnNpdmUoKTtcbiAgICAgICAgXy5zZXRQb3NpdGlvbigpO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5wYXVzZSA9IFNsaWNrLnByb3RvdHlwZS5zbGlja1BhdXNlID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIF8uYXV0b1BsYXlDbGVhcigpO1xuICAgICAgICBfLnBhdXNlZCA9IHRydWU7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnBsYXkgPSBTbGljay5wcm90b3R5cGUuc2xpY2tQbGF5ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIF8uYXV0b1BsYXkoKTtcbiAgICAgICAgXy5vcHRpb25zLmF1dG9wbGF5ID0gdHJ1ZTtcbiAgICAgICAgXy5wYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgXy5mb2N1c3NlZCA9IGZhbHNlO1xuICAgICAgICBfLmludGVycnVwdGVkID0gZmFsc2U7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnBvc3RTbGlkZSA9IGZ1bmN0aW9uKGluZGV4KSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmKCAhXy51bnNsaWNrZWQgKSB7XG5cbiAgICAgICAgICAgIF8uJHNsaWRlci50cmlnZ2VyKCdhZnRlckNoYW5nZScsIFtfLCBpbmRleF0pO1xuXG4gICAgICAgICAgICBfLmFuaW1hdGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICBpZiAoXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuICAgICAgICAgICAgICAgIF8uc2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgXy5zd2lwZUxlZnQgPSBudWxsO1xuXG4gICAgICAgICAgICBpZiAoIF8ub3B0aW9ucy5hdXRvcGxheSApIHtcbiAgICAgICAgICAgICAgICBfLmF1dG9QbGF5KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChfLm9wdGlvbnMuYWNjZXNzaWJpbGl0eSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIF8uaW5pdEFEQSgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5mb2N1c09uQ2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkY3VycmVudFNsaWRlID0gJChfLiRzbGlkZXMuZ2V0KF8uY3VycmVudFNsaWRlKSk7XG4gICAgICAgICAgICAgICAgICAgICRjdXJyZW50U2xpZGUuYXR0cigndGFiaW5kZXgnLCAwKS5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnByZXYgPSBTbGljay5wcm90b3R5cGUuc2xpY2tQcmV2ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIF8uY2hhbmdlU2xpZGUoe1xuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdwcmV2aW91cydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnByZXZlbnREZWZhdWx0ID0gZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5wcm9ncmVzc2l2ZUxhenlMb2FkID0gZnVuY3Rpb24oIHRyeUNvdW50ICkge1xuXG4gICAgICAgIHRyeUNvdW50ID0gdHJ5Q291bnQgfHwgMTtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICAkaW1nc1RvTG9hZCA9ICQoICdpbWdbZGF0YS1sYXp5XScsIF8uJHNsaWRlciApLFxuICAgICAgICAgICAgaW1hZ2UsXG4gICAgICAgICAgICBpbWFnZVNvdXJjZSxcbiAgICAgICAgICAgIGltYWdlU3JjU2V0LFxuICAgICAgICAgICAgaW1hZ2VTaXplcyxcbiAgICAgICAgICAgIGltYWdlVG9Mb2FkO1xuXG4gICAgICAgIGlmICggJGltZ3NUb0xvYWQubGVuZ3RoICkge1xuXG4gICAgICAgICAgICBpbWFnZSA9ICRpbWdzVG9Mb2FkLmZpcnN0KCk7XG4gICAgICAgICAgICBpbWFnZVNvdXJjZSA9IGltYWdlLmF0dHIoJ2RhdGEtbGF6eScpO1xuICAgICAgICAgICAgaW1hZ2VTcmNTZXQgPSBpbWFnZS5hdHRyKCdkYXRhLXNyY3NldCcpO1xuICAgICAgICAgICAgaW1hZ2VTaXplcyAgPSBpbWFnZS5hdHRyKCdkYXRhLXNpemVzJykgfHwgXy4kc2xpZGVyLmF0dHIoJ2RhdGEtc2l6ZXMnKTtcbiAgICAgICAgICAgIGltYWdlVG9Mb2FkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cbiAgICAgICAgICAgIGltYWdlVG9Mb2FkLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKGltYWdlU3JjU2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGltYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignc3Jjc2V0JywgaW1hZ2VTcmNTZXQgKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaW1hZ2VTaXplcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignc2l6ZXMnLCBpbWFnZVNpemVzICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpbWFnZVxuICAgICAgICAgICAgICAgICAgICAuYXR0ciggJ3NyYycsIGltYWdlU291cmNlIClcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ2RhdGEtbGF6eSBkYXRhLXNyY3NldCBkYXRhLXNpemVzJylcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdzbGljay1sb2FkaW5nJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIF8ub3B0aW9ucy5hZGFwdGl2ZUhlaWdodCA9PT0gdHJ1ZSApIHtcbiAgICAgICAgICAgICAgICAgICAgXy5zZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIF8uJHNsaWRlci50cmlnZ2VyKCdsYXp5TG9hZGVkJywgWyBfLCBpbWFnZSwgaW1hZ2VTb3VyY2UgXSk7XG4gICAgICAgICAgICAgICAgXy5wcm9ncmVzc2l2ZUxhenlMb2FkKCk7XG5cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGltYWdlVG9Mb2FkLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgIGlmICggdHJ5Q291bnQgPCAzICkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiB0cnkgdG8gbG9hZCB0aGUgaW1hZ2UgMyB0aW1lcyxcbiAgICAgICAgICAgICAgICAgICAgICogbGVhdmUgYSBzbGlnaHQgZGVsYXkgc28gd2UgZG9uJ3QgZ2V0XG4gICAgICAgICAgICAgICAgICAgICAqIHNlcnZlcnMgYmxvY2tpbmcgdGhlIHJlcXVlc3QuXG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF8ucHJvZ3Jlc3NpdmVMYXp5TG9hZCggdHJ5Q291bnQgKyAxICk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDUwMCApO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICBpbWFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoICdkYXRhLWxhenknIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcyggJ3NsaWNrLWxvYWRpbmcnIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcyggJ3NsaWNrLWxhenlsb2FkLWVycm9yJyApO1xuXG4gICAgICAgICAgICAgICAgICAgIF8uJHNsaWRlci50cmlnZ2VyKCdsYXp5TG9hZEVycm9yJywgWyBfLCBpbWFnZSwgaW1hZ2VTb3VyY2UgXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgXy5wcm9ncmVzc2l2ZUxhenlMb2FkKCk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGltYWdlVG9Mb2FkLnNyYyA9IGltYWdlU291cmNlO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIF8uJHNsaWRlci50cmlnZ2VyKCdhbGxJbWFnZXNMb2FkZWQnLCBbIF8gXSk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5yZWZyZXNoID0gZnVuY3Rpb24oIGluaXRpYWxpemluZyApIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsIGN1cnJlbnRTbGlkZSwgbGFzdFZpc2libGVJbmRleDtcblxuICAgICAgICBsYXN0VmlzaWJsZUluZGV4ID0gXy5zbGlkZUNvdW50IC0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdztcblxuICAgICAgICAvLyBpbiBub24taW5maW5pdGUgc2xpZGVycywgd2UgZG9uJ3Qgd2FudCB0byBnbyBwYXN0IHRoZVxuICAgICAgICAvLyBsYXN0IHZpc2libGUgaW5kZXguXG4gICAgICAgIGlmKCAhXy5vcHRpb25zLmluZmluaXRlICYmICggXy5jdXJyZW50U2xpZGUgPiBsYXN0VmlzaWJsZUluZGV4ICkpIHtcbiAgICAgICAgICAgIF8uY3VycmVudFNsaWRlID0gbGFzdFZpc2libGVJbmRleDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIGxlc3Mgc2xpZGVzIHRoYW4gdG8gc2hvdywgZ28gdG8gc3RhcnQuXG4gICAgICAgIGlmICggXy5zbGlkZUNvdW50IDw9IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgKSB7XG4gICAgICAgICAgICBfLmN1cnJlbnRTbGlkZSA9IDA7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGN1cnJlbnRTbGlkZSA9IF8uY3VycmVudFNsaWRlO1xuXG4gICAgICAgIF8uZGVzdHJveSh0cnVlKTtcblxuICAgICAgICAkLmV4dGVuZChfLCBfLmluaXRpYWxzLCB7IGN1cnJlbnRTbGlkZTogY3VycmVudFNsaWRlIH0pO1xuXG4gICAgICAgIF8uaW5pdCgpO1xuXG4gICAgICAgIGlmKCAhaW5pdGlhbGl6aW5nICkge1xuXG4gICAgICAgICAgICBfLmNoYW5nZVNsaWRlKHtcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdpbmRleCcsXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiBjdXJyZW50U2xpZGVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBmYWxzZSk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5yZWdpc3RlckJyZWFrcG9pbnRzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLCBicmVha3BvaW50LCBjdXJyZW50QnJlYWtwb2ludCwgbCxcbiAgICAgICAgICAgIHJlc3BvbnNpdmVTZXR0aW5ncyA9IF8ub3B0aW9ucy5yZXNwb25zaXZlIHx8IG51bGw7XG5cbiAgICAgICAgaWYgKCAkLnR5cGUocmVzcG9uc2l2ZVNldHRpbmdzKSA9PT0gJ2FycmF5JyAmJiByZXNwb25zaXZlU2V0dGluZ3MubGVuZ3RoICkge1xuXG4gICAgICAgICAgICBfLnJlc3BvbmRUbyA9IF8ub3B0aW9ucy5yZXNwb25kVG8gfHwgJ3dpbmRvdyc7XG5cbiAgICAgICAgICAgIGZvciAoIGJyZWFrcG9pbnQgaW4gcmVzcG9uc2l2ZVNldHRpbmdzICkge1xuXG4gICAgICAgICAgICAgICAgbCA9IF8uYnJlYWtwb2ludHMubGVuZ3RoLTE7XG5cbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2l2ZVNldHRpbmdzLmhhc093blByb3BlcnR5KGJyZWFrcG9pbnQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRCcmVha3BvaW50ID0gcmVzcG9uc2l2ZVNldHRpbmdzW2JyZWFrcG9pbnRdLmJyZWFrcG9pbnQ7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gbG9vcCB0aHJvdWdoIHRoZSBicmVha3BvaW50cyBhbmQgY3V0IG91dCBhbnkgZXhpc3RpbmdcbiAgICAgICAgICAgICAgICAgICAgLy8gb25lcyB3aXRoIHRoZSBzYW1lIGJyZWFrcG9pbnQgbnVtYmVyLCB3ZSBkb24ndCB3YW50IGR1cGVzLlxuICAgICAgICAgICAgICAgICAgICB3aGlsZSggbCA+PSAwICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIF8uYnJlYWtwb2ludHNbbF0gJiYgXy5icmVha3BvaW50c1tsXSA9PT0gY3VycmVudEJyZWFrcG9pbnQgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXy5icmVha3BvaW50cy5zcGxpY2UobCwxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGwtLTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIF8uYnJlYWtwb2ludHMucHVzaChjdXJyZW50QnJlYWtwb2ludCk7XG4gICAgICAgICAgICAgICAgICAgIF8uYnJlYWtwb2ludFNldHRpbmdzW2N1cnJlbnRCcmVha3BvaW50XSA9IHJlc3BvbnNpdmVTZXR0aW5nc1ticmVha3BvaW50XS5zZXR0aW5ncztcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBfLmJyZWFrcG9pbnRzLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgICAgICAgIHJldHVybiAoIF8ub3B0aW9ucy5tb2JpbGVGaXJzdCApID8gYS1iIDogYi1hO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5yZWluaXQgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgXy4kc2xpZGVzID1cbiAgICAgICAgICAgIF8uJHNsaWRlVHJhY2tcbiAgICAgICAgICAgICAgICAuY2hpbGRyZW4oXy5vcHRpb25zLnNsaWRlKVxuICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnc2xpY2stc2xpZGUnKTtcblxuICAgICAgICBfLnNsaWRlQ291bnQgPSBfLiRzbGlkZXMubGVuZ3RoO1xuXG4gICAgICAgIGlmIChfLmN1cnJlbnRTbGlkZSA+PSBfLnNsaWRlQ291bnQgJiYgXy5jdXJyZW50U2xpZGUgIT09IDApIHtcbiAgICAgICAgICAgIF8uY3VycmVudFNsaWRlID0gXy5jdXJyZW50U2xpZGUgLSBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5zbGlkZUNvdW50IDw9IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcbiAgICAgICAgICAgIF8uY3VycmVudFNsaWRlID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIF8ucmVnaXN0ZXJCcmVha3BvaW50cygpO1xuXG4gICAgICAgIF8uc2V0UHJvcHMoKTtcbiAgICAgICAgXy5zZXR1cEluZmluaXRlKCk7XG4gICAgICAgIF8uYnVpbGRBcnJvd3MoKTtcbiAgICAgICAgXy51cGRhdGVBcnJvd3MoKTtcbiAgICAgICAgXy5pbml0QXJyb3dFdmVudHMoKTtcbiAgICAgICAgXy5idWlsZERvdHMoKTtcbiAgICAgICAgXy51cGRhdGVEb3RzKCk7XG4gICAgICAgIF8uaW5pdERvdEV2ZW50cygpO1xuICAgICAgICBfLmNsZWFuVXBTbGlkZUV2ZW50cygpO1xuICAgICAgICBfLmluaXRTbGlkZUV2ZW50cygpO1xuXG4gICAgICAgIF8uY2hlY2tSZXNwb25zaXZlKGZhbHNlLCB0cnVlKTtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmZvY3VzT25TZWxlY3QgPT09IHRydWUpIHtcbiAgICAgICAgICAgICQoXy4kc2xpZGVUcmFjaykuY2hpbGRyZW4oKS5vbignY2xpY2suc2xpY2snLCBfLnNlbGVjdEhhbmRsZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgXy5zZXRTbGlkZUNsYXNzZXModHlwZW9mIF8uY3VycmVudFNsaWRlID09PSAnbnVtYmVyJyA/IF8uY3VycmVudFNsaWRlIDogMCk7XG5cbiAgICAgICAgXy5zZXRQb3NpdGlvbigpO1xuICAgICAgICBfLmZvY3VzSGFuZGxlcigpO1xuXG4gICAgICAgIF8ucGF1c2VkID0gIV8ub3B0aW9ucy5hdXRvcGxheTtcbiAgICAgICAgXy5hdXRvUGxheSgpO1xuXG4gICAgICAgIF8uJHNsaWRlci50cmlnZ2VyKCdyZUluaXQnLCBbX10pO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5yZXNpemUgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpICE9PSBfLndpbmRvd1dpZHRoKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoXy53aW5kb3dEZWxheSk7XG4gICAgICAgICAgICBfLndpbmRvd0RlbGF5ID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgXy53aW5kb3dXaWR0aCA9ICQod2luZG93KS53aWR0aCgpO1xuICAgICAgICAgICAgICAgIF8uY2hlY2tSZXNwb25zaXZlKCk7XG4gICAgICAgICAgICAgICAgaWYoICFfLnVuc2xpY2tlZCApIHsgXy5zZXRQb3NpdGlvbigpOyB9XG4gICAgICAgICAgICB9LCA1MCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnJlbW92ZVNsaWRlID0gU2xpY2sucHJvdG90eXBlLnNsaWNrUmVtb3ZlID0gZnVuY3Rpb24oaW5kZXgsIHJlbW92ZUJlZm9yZSwgcmVtb3ZlQWxsKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmICh0eXBlb2YoaW5kZXgpID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgIHJlbW92ZUJlZm9yZSA9IGluZGV4O1xuICAgICAgICAgICAgaW5kZXggPSByZW1vdmVCZWZvcmUgPT09IHRydWUgPyAwIDogXy5zbGlkZUNvdW50IC0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGluZGV4ID0gcmVtb3ZlQmVmb3JlID09PSB0cnVlID8gLS1pbmRleCA6IGluZGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8uc2xpZGVDb3VudCA8IDEgfHwgaW5kZXggPCAwIHx8IGluZGV4ID4gXy5zbGlkZUNvdW50IC0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgXy51bmxvYWQoKTtcblxuICAgICAgICBpZiAocmVtb3ZlQWxsID09PSB0cnVlKSB7XG4gICAgICAgICAgICBfLiRzbGlkZVRyYWNrLmNoaWxkcmVuKCkucmVtb3ZlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfLiRzbGlkZVRyYWNrLmNoaWxkcmVuKHRoaXMub3B0aW9ucy5zbGlkZSkuZXEoaW5kZXgpLnJlbW92ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgXy4kc2xpZGVzID0gXy4kc2xpZGVUcmFjay5jaGlsZHJlbih0aGlzLm9wdGlvbnMuc2xpZGUpO1xuXG4gICAgICAgIF8uJHNsaWRlVHJhY2suY2hpbGRyZW4odGhpcy5vcHRpb25zLnNsaWRlKS5kZXRhY2goKTtcblxuICAgICAgICBfLiRzbGlkZVRyYWNrLmFwcGVuZChfLiRzbGlkZXMpO1xuXG4gICAgICAgIF8uJHNsaWRlc0NhY2hlID0gXy4kc2xpZGVzO1xuXG4gICAgICAgIF8ucmVpbml0KCk7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnNldENTUyA9IGZ1bmN0aW9uKHBvc2l0aW9uKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgcG9zaXRpb25Qcm9wcyA9IHt9LFxuICAgICAgICAgICAgeCwgeTtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLnJ0bCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcG9zaXRpb24gPSAtcG9zaXRpb247XG4gICAgICAgIH1cbiAgICAgICAgeCA9IF8ucG9zaXRpb25Qcm9wID09ICdsZWZ0JyA/IE1hdGguY2VpbChwb3NpdGlvbikgKyAncHgnIDogJzBweCc7XG4gICAgICAgIHkgPSBfLnBvc2l0aW9uUHJvcCA9PSAndG9wJyA/IE1hdGguY2VpbChwb3NpdGlvbikgKyAncHgnIDogJzBweCc7XG5cbiAgICAgICAgcG9zaXRpb25Qcm9wc1tfLnBvc2l0aW9uUHJvcF0gPSBwb3NpdGlvbjtcblxuICAgICAgICBpZiAoXy50cmFuc2Zvcm1zRW5hYmxlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIF8uJHNsaWRlVHJhY2suY3NzKHBvc2l0aW9uUHJvcHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcG9zaXRpb25Qcm9wcyA9IHt9O1xuICAgICAgICAgICAgaWYgKF8uY3NzVHJhbnNpdGlvbnMgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb25Qcm9wc1tfLmFuaW1UeXBlXSA9ICd0cmFuc2xhdGUoJyArIHggKyAnLCAnICsgeSArICcpJztcbiAgICAgICAgICAgICAgICBfLiRzbGlkZVRyYWNrLmNzcyhwb3NpdGlvblByb3BzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb25Qcm9wc1tfLmFuaW1UeXBlXSA9ICd0cmFuc2xhdGUzZCgnICsgeCArICcsICcgKyB5ICsgJywgMHB4KSc7XG4gICAgICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5jc3MocG9zaXRpb25Qcm9wcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuc2V0RGltZW5zaW9ucyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAoXy5vcHRpb25zLnZlcnRpY2FsID09PSBmYWxzZSkge1xuICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5jZW50ZXJNb2RlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgXy4kbGlzdC5jc3Moe1xuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAoJzBweCAnICsgXy5vcHRpb25zLmNlbnRlclBhZGRpbmcpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfLiRsaXN0LmhlaWdodChfLiRzbGlkZXMuZmlyc3QoKS5vdXRlckhlaWdodCh0cnVlKSAqIF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpO1xuICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5jZW50ZXJNb2RlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgXy4kbGlzdC5jc3Moe1xuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAoXy5vcHRpb25zLmNlbnRlclBhZGRpbmcgKyAnIDBweCcpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBfLmxpc3RXaWR0aCA9IF8uJGxpc3Qud2lkdGgoKTtcbiAgICAgICAgXy5saXN0SGVpZ2h0ID0gXy4kbGlzdC5oZWlnaHQoKTtcblxuXG4gICAgICAgIGlmIChfLm9wdGlvbnMudmVydGljYWwgPT09IGZhbHNlICYmIF8ub3B0aW9ucy52YXJpYWJsZVdpZHRoID09PSBmYWxzZSkge1xuICAgICAgICAgICAgXy5zbGlkZVdpZHRoID0gTWF0aC5jZWlsKF8ubGlzdFdpZHRoIC8gXy5vcHRpb25zLnNsaWRlc1RvU2hvdyk7XG4gICAgICAgICAgICBfLiRzbGlkZVRyYWNrLndpZHRoKE1hdGguY2VpbCgoXy5zbGlkZVdpZHRoICogXy4kc2xpZGVUcmFjay5jaGlsZHJlbignLnNsaWNrLXNsaWRlJykubGVuZ3RoKSkpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoXy5vcHRpb25zLnZhcmlhYmxlV2lkdGggPT09IHRydWUpIHtcbiAgICAgICAgICAgIF8uJHNsaWRlVHJhY2sud2lkdGgoNTAwMCAqIF8uc2xpZGVDb3VudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfLnNsaWRlV2lkdGggPSBNYXRoLmNlaWwoXy5saXN0V2lkdGgpO1xuICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5oZWlnaHQoTWF0aC5jZWlsKChfLiRzbGlkZXMuZmlyc3QoKS5vdXRlckhlaWdodCh0cnVlKSAqIF8uJHNsaWRlVHJhY2suY2hpbGRyZW4oJy5zbGljay1zbGlkZScpLmxlbmd0aCkpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBvZmZzZXQgPSBfLiRzbGlkZXMuZmlyc3QoKS5vdXRlcldpZHRoKHRydWUpIC0gXy4kc2xpZGVzLmZpcnN0KCkud2lkdGgoKTtcbiAgICAgICAgaWYgKF8ub3B0aW9ucy52YXJpYWJsZVdpZHRoID09PSBmYWxzZSkgXy4kc2xpZGVUcmFjay5jaGlsZHJlbignLnNsaWNrLXNsaWRlJykud2lkdGgoXy5zbGlkZVdpZHRoIC0gb2Zmc2V0KTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuc2V0RmFkZSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIHRhcmdldExlZnQ7XG5cbiAgICAgICAgXy4kc2xpZGVzLmVhY2goZnVuY3Rpb24oaW5kZXgsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRhcmdldExlZnQgPSAoXy5zbGlkZVdpZHRoICogaW5kZXgpICogLTE7XG4gICAgICAgICAgICBpZiAoXy5vcHRpb25zLnJ0bCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICQoZWxlbWVudCkuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiB0YXJnZXRMZWZ0LFxuICAgICAgICAgICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgICAgICAgICAgIHpJbmRleDogXy5vcHRpb25zLnpJbmRleCAtIDIsXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJChlbGVtZW50KS5jc3Moe1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogdGFyZ2V0TGVmdCxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgICAgICAgICB6SW5kZXg6IF8ub3B0aW9ucy56SW5kZXggLSAyLFxuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIF8uJHNsaWRlcy5lcShfLmN1cnJlbnRTbGlkZSkuY3NzKHtcbiAgICAgICAgICAgIHpJbmRleDogXy5vcHRpb25zLnpJbmRleCAtIDEsXG4gICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5zZXRIZWlnaHQgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgPT09IDEgJiYgXy5vcHRpb25zLmFkYXB0aXZlSGVpZ2h0ID09PSB0cnVlICYmIF8ub3B0aW9ucy52ZXJ0aWNhbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHZhciB0YXJnZXRIZWlnaHQgPSBfLiRzbGlkZXMuZXEoXy5jdXJyZW50U2xpZGUpLm91dGVySGVpZ2h0KHRydWUpO1xuICAgICAgICAgICAgXy4kbGlzdC5jc3MoJ2hlaWdodCcsIHRhcmdldEhlaWdodCk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuc2V0T3B0aW9uID1cbiAgICBTbGljay5wcm90b3R5cGUuc2xpY2tTZXRPcHRpb24gPSBmdW5jdGlvbigpIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogYWNjZXB0cyBhcmd1bWVudHMgaW4gZm9ybWF0IG9mOlxuICAgICAgICAgKlxuICAgICAgICAgKiAgLSBmb3IgY2hhbmdpbmcgYSBzaW5nbGUgb3B0aW9uJ3MgdmFsdWU6XG4gICAgICAgICAqICAgICAuc2xpY2soXCJzZXRPcHRpb25cIiwgb3B0aW9uLCB2YWx1ZSwgcmVmcmVzaCApXG4gICAgICAgICAqXG4gICAgICAgICAqICAtIGZvciBjaGFuZ2luZyBhIHNldCBvZiByZXNwb25zaXZlIG9wdGlvbnM6XG4gICAgICAgICAqICAgICAuc2xpY2soXCJzZXRPcHRpb25cIiwgJ3Jlc3BvbnNpdmUnLCBbe30sIC4uLl0sIHJlZnJlc2ggKVxuICAgICAgICAgKlxuICAgICAgICAgKiAgLSBmb3IgdXBkYXRpbmcgbXVsdGlwbGUgdmFsdWVzIGF0IG9uY2UgKG5vdCByZXNwb25zaXZlKVxuICAgICAgICAgKiAgICAgLnNsaWNrKFwic2V0T3B0aW9uXCIsIHsgJ29wdGlvbic6IHZhbHVlLCAuLi4gfSwgcmVmcmVzaCApXG4gICAgICAgICAqL1xuXG4gICAgICAgIHZhciBfID0gdGhpcywgbCwgaXRlbSwgb3B0aW9uLCB2YWx1ZSwgcmVmcmVzaCA9IGZhbHNlLCB0eXBlO1xuXG4gICAgICAgIGlmKCAkLnR5cGUoIGFyZ3VtZW50c1swXSApID09PSAnb2JqZWN0JyApIHtcblxuICAgICAgICAgICAgb3B0aW9uID0gIGFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgIHJlZnJlc2ggPSBhcmd1bWVudHNbMV07XG4gICAgICAgICAgICB0eXBlID0gJ211bHRpcGxlJztcblxuICAgICAgICB9IGVsc2UgaWYgKCAkLnR5cGUoIGFyZ3VtZW50c1swXSApID09PSAnc3RyaW5nJyApIHtcblxuICAgICAgICAgICAgb3B0aW9uID0gIGFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgIHZhbHVlID0gYXJndW1lbnRzWzFdO1xuICAgICAgICAgICAgcmVmcmVzaCA9IGFyZ3VtZW50c1syXTtcblxuICAgICAgICAgICAgaWYgKCBhcmd1bWVudHNbMF0gPT09ICdyZXNwb25zaXZlJyAmJiAkLnR5cGUoIGFyZ3VtZW50c1sxXSApID09PSAnYXJyYXknICkge1xuXG4gICAgICAgICAgICAgICAgdHlwZSA9ICdyZXNwb25zaXZlJztcblxuICAgICAgICAgICAgfSBlbHNlIGlmICggdHlwZW9mIGFyZ3VtZW50c1sxXSAhPT0gJ3VuZGVmaW5lZCcgKSB7XG5cbiAgICAgICAgICAgICAgICB0eXBlID0gJ3NpbmdsZSc7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCB0eXBlID09PSAnc2luZ2xlJyApIHtcblxuICAgICAgICAgICAgXy5vcHRpb25zW29wdGlvbl0gPSB2YWx1ZTtcblxuXG4gICAgICAgIH0gZWxzZSBpZiAoIHR5cGUgPT09ICdtdWx0aXBsZScgKSB7XG5cbiAgICAgICAgICAgICQuZWFjaCggb3B0aW9uICwgZnVuY3Rpb24oIG9wdCwgdmFsICkge1xuXG4gICAgICAgICAgICAgICAgXy5vcHRpb25zW29wdF0gPSB2YWw7XG5cbiAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgfSBlbHNlIGlmICggdHlwZSA9PT0gJ3Jlc3BvbnNpdmUnICkge1xuXG4gICAgICAgICAgICBmb3IgKCBpdGVtIGluIHZhbHVlICkge1xuXG4gICAgICAgICAgICAgICAgaWYoICQudHlwZSggXy5vcHRpb25zLnJlc3BvbnNpdmUgKSAhPT0gJ2FycmF5JyApIHtcblxuICAgICAgICAgICAgICAgICAgICBfLm9wdGlvbnMucmVzcG9uc2l2ZSA9IFsgdmFsdWVbaXRlbV0gXTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgbCA9IF8ub3B0aW9ucy5yZXNwb25zaXZlLmxlbmd0aC0xO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGxvb3AgdGhyb3VnaCB0aGUgcmVzcG9uc2l2ZSBvYmplY3QgYW5kIHNwbGljZSBvdXQgZHVwbGljYXRlcy5cbiAgICAgICAgICAgICAgICAgICAgd2hpbGUoIGwgPj0gMCApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIF8ub3B0aW9ucy5yZXNwb25zaXZlW2xdLmJyZWFrcG9pbnQgPT09IHZhbHVlW2l0ZW1dLmJyZWFrcG9pbnQgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLm9wdGlvbnMucmVzcG9uc2l2ZS5zcGxpY2UobCwxKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBsLS07XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIF8ub3B0aW9ucy5yZXNwb25zaXZlLnB1c2goIHZhbHVlW2l0ZW1dICk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCByZWZyZXNoICkge1xuXG4gICAgICAgICAgICBfLnVubG9hZCgpO1xuICAgICAgICAgICAgXy5yZWluaXQoKTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnNldFBvc2l0aW9uID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIF8uc2V0RGltZW5zaW9ucygpO1xuXG4gICAgICAgIF8uc2V0SGVpZ2h0KCk7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5mYWRlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgXy5zZXRDU1MoXy5nZXRMZWZ0KF8uY3VycmVudFNsaWRlKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfLnNldEZhZGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF8uJHNsaWRlci50cmlnZ2VyKCdzZXRQb3NpdGlvbicsIFtfXSk7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnNldFByb3BzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgYm9keVN0eWxlID0gZG9jdW1lbnQuYm9keS5zdHlsZTtcblxuICAgICAgICBfLnBvc2l0aW9uUHJvcCA9IF8ub3B0aW9ucy52ZXJ0aWNhbCA9PT0gdHJ1ZSA/ICd0b3AnIDogJ2xlZnQnO1xuXG4gICAgICAgIGlmIChfLnBvc2l0aW9uUHJvcCA9PT0gJ3RvcCcpIHtcbiAgICAgICAgICAgIF8uJHNsaWRlci5hZGRDbGFzcygnc2xpY2stdmVydGljYWwnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF8uJHNsaWRlci5yZW1vdmVDbGFzcygnc2xpY2stdmVydGljYWwnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChib2R5U3R5bGUuV2Via2l0VHJhbnNpdGlvbiAhPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICBib2R5U3R5bGUuTW96VHJhbnNpdGlvbiAhPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICBib2R5U3R5bGUubXNUcmFuc2l0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChfLm9wdGlvbnMudXNlQ1NTID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgXy5jc3NUcmFuc2l0aW9ucyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIF8ub3B0aW9ucy5mYWRlICkge1xuICAgICAgICAgICAgaWYgKCB0eXBlb2YgXy5vcHRpb25zLnpJbmRleCA9PT0gJ251bWJlcicgKSB7XG4gICAgICAgICAgICAgICAgaWYoIF8ub3B0aW9ucy56SW5kZXggPCAzICkge1xuICAgICAgICAgICAgICAgICAgICBfLm9wdGlvbnMuekluZGV4ID0gMztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF8ub3B0aW9ucy56SW5kZXggPSBfLmRlZmF1bHRzLnpJbmRleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChib2R5U3R5bGUuT1RyYW5zZm9ybSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBfLmFuaW1UeXBlID0gJ09UcmFuc2Zvcm0nO1xuICAgICAgICAgICAgXy50cmFuc2Zvcm1UeXBlID0gJy1vLXRyYW5zZm9ybSc7XG4gICAgICAgICAgICBfLnRyYW5zaXRpb25UeXBlID0gJ09UcmFuc2l0aW9uJztcbiAgICAgICAgICAgIGlmIChib2R5U3R5bGUucGVyc3BlY3RpdmVQcm9wZXJ0eSA9PT0gdW5kZWZpbmVkICYmIGJvZHlTdHlsZS53ZWJraXRQZXJzcGVjdGl2ZSA9PT0gdW5kZWZpbmVkKSBfLmFuaW1UeXBlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJvZHlTdHlsZS5Nb3pUcmFuc2Zvcm0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgXy5hbmltVHlwZSA9ICdNb3pUcmFuc2Zvcm0nO1xuICAgICAgICAgICAgXy50cmFuc2Zvcm1UeXBlID0gJy1tb3otdHJhbnNmb3JtJztcbiAgICAgICAgICAgIF8udHJhbnNpdGlvblR5cGUgPSAnTW96VHJhbnNpdGlvbic7XG4gICAgICAgICAgICBpZiAoYm9keVN0eWxlLnBlcnNwZWN0aXZlUHJvcGVydHkgPT09IHVuZGVmaW5lZCAmJiBib2R5U3R5bGUuTW96UGVyc3BlY3RpdmUgPT09IHVuZGVmaW5lZCkgXy5hbmltVHlwZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChib2R5U3R5bGUud2Via2l0VHJhbnNmb3JtICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIF8uYW5pbVR5cGUgPSAnd2Via2l0VHJhbnNmb3JtJztcbiAgICAgICAgICAgIF8udHJhbnNmb3JtVHlwZSA9ICctd2Via2l0LXRyYW5zZm9ybSc7XG4gICAgICAgICAgICBfLnRyYW5zaXRpb25UeXBlID0gJ3dlYmtpdFRyYW5zaXRpb24nO1xuICAgICAgICAgICAgaWYgKGJvZHlTdHlsZS5wZXJzcGVjdGl2ZVByb3BlcnR5ID09PSB1bmRlZmluZWQgJiYgYm9keVN0eWxlLndlYmtpdFBlcnNwZWN0aXZlID09PSB1bmRlZmluZWQpIF8uYW5pbVR5cGUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYm9keVN0eWxlLm1zVHJhbnNmb3JtICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIF8uYW5pbVR5cGUgPSAnbXNUcmFuc2Zvcm0nO1xuICAgICAgICAgICAgXy50cmFuc2Zvcm1UeXBlID0gJy1tcy10cmFuc2Zvcm0nO1xuICAgICAgICAgICAgXy50cmFuc2l0aW9uVHlwZSA9ICdtc1RyYW5zaXRpb24nO1xuICAgICAgICAgICAgaWYgKGJvZHlTdHlsZS5tc1RyYW5zZm9ybSA9PT0gdW5kZWZpbmVkKSBfLmFuaW1UeXBlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJvZHlTdHlsZS50cmFuc2Zvcm0gIT09IHVuZGVmaW5lZCAmJiBfLmFuaW1UeXBlICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgXy5hbmltVHlwZSA9ICd0cmFuc2Zvcm0nO1xuICAgICAgICAgICAgXy50cmFuc2Zvcm1UeXBlID0gJ3RyYW5zZm9ybSc7XG4gICAgICAgICAgICBfLnRyYW5zaXRpb25UeXBlID0gJ3RyYW5zaXRpb24nO1xuICAgICAgICB9XG4gICAgICAgIF8udHJhbnNmb3Jtc0VuYWJsZWQgPSBfLm9wdGlvbnMudXNlVHJhbnNmb3JtICYmIChfLmFuaW1UeXBlICE9PSBudWxsICYmIF8uYW5pbVR5cGUgIT09IGZhbHNlKTtcbiAgICB9O1xuXG5cbiAgICBTbGljay5wcm90b3R5cGUuc2V0U2xpZGVDbGFzc2VzID0gZnVuY3Rpb24oaW5kZXgpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICBjZW50ZXJPZmZzZXQsIGFsbFNsaWRlcywgaW5kZXhPZmZzZXQsIHJlbWFpbmRlcjtcblxuICAgICAgICBhbGxTbGlkZXMgPSBfLiRzbGlkZXJcbiAgICAgICAgICAgIC5maW5kKCcuc2xpY2stc2xpZGUnKVxuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdzbGljay1hY3RpdmUgc2xpY2stY2VudGVyIHNsaWNrLWN1cnJlbnQnKVxuICAgICAgICAgICAgLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcblxuICAgICAgICBfLiRzbGlkZXNcbiAgICAgICAgICAgIC5lcShpbmRleClcbiAgICAgICAgICAgIC5hZGRDbGFzcygnc2xpY2stY3VycmVudCcpO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuY2VudGVyTW9kZSA9PT0gdHJ1ZSkge1xuXG4gICAgICAgICAgICB2YXIgZXZlbkNvZWYgPSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93ICUgMiA9PT0gMCA/IDEgOiAwO1xuXG4gICAgICAgICAgICBjZW50ZXJPZmZzZXQgPSBNYXRoLmZsb29yKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgLyAyKTtcblxuICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5pbmZpbml0ZSA9PT0gdHJ1ZSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID49IGNlbnRlck9mZnNldCAmJiBpbmRleCA8PSAoXy5zbGlkZUNvdW50IC0gMSkgLSBjZW50ZXJPZmZzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgXy4kc2xpZGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpY2UoaW5kZXggLSBjZW50ZXJPZmZzZXQgKyBldmVuQ29lZiwgaW5kZXggKyBjZW50ZXJPZmZzZXQgKyAxKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdzbGljay1hY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIGluZGV4T2Zmc2V0ID0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdyArIGluZGV4O1xuICAgICAgICAgICAgICAgICAgICBhbGxTbGlkZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGljZShpbmRleE9mZnNldCAtIGNlbnRlck9mZnNldCArIDEgKyBldmVuQ29lZiwgaW5kZXhPZmZzZXQgKyBjZW50ZXJPZmZzZXQgKyAyKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdzbGljay1hY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IDApIHtcblxuICAgICAgICAgICAgICAgICAgICBhbGxTbGlkZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIC5lcShhbGxTbGlkZXMubGVuZ3RoIC0gMSAtIF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3NsaWNrLWNlbnRlcicpO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpbmRleCA9PT0gXy5zbGlkZUNvdW50IC0gMSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGFsbFNsaWRlc1xuICAgICAgICAgICAgICAgICAgICAgICAgLmVxKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3NsaWNrLWNlbnRlcicpO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF8uJHNsaWRlc1xuICAgICAgICAgICAgICAgIC5lcShpbmRleClcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3NsaWNrLWNlbnRlcicpO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGlmIChpbmRleCA+PSAwICYmIGluZGV4IDw9IChfLnNsaWRlQ291bnQgLSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSkge1xuXG4gICAgICAgICAgICAgICAgXy4kc2xpZGVzXG4gICAgICAgICAgICAgICAgICAgIC5zbGljZShpbmRleCwgaW5kZXggKyBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KVxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3NsaWNrLWFjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFsbFNsaWRlcy5sZW5ndGggPD0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuXG4gICAgICAgICAgICAgICAgYWxsU2xpZGVzXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnc2xpY2stYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICByZW1haW5kZXIgPSBfLnNsaWRlQ291bnQgJSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93O1xuICAgICAgICAgICAgICAgIGluZGV4T2Zmc2V0ID0gXy5vcHRpb25zLmluZmluaXRlID09PSB0cnVlID8gXy5vcHRpb25zLnNsaWRlc1RvU2hvdyArIGluZGV4IDogaW5kZXg7XG5cbiAgICAgICAgICAgICAgICBpZiAoXy5vcHRpb25zLnNsaWRlc1RvU2hvdyA9PSBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwgJiYgKF8uc2xpZGVDb3VudCAtIGluZGV4KSA8IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcblxuICAgICAgICAgICAgICAgICAgICBhbGxTbGlkZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zbGljZShpbmRleE9mZnNldCAtIChfLm9wdGlvbnMuc2xpZGVzVG9TaG93IC0gcmVtYWluZGVyKSwgaW5kZXhPZmZzZXQgKyByZW1haW5kZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3NsaWNrLWFjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgYWxsU2xpZGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpY2UoaW5kZXhPZmZzZXQsIGluZGV4T2Zmc2V0ICsgXy5vcHRpb25zLnNsaWRlc1RvU2hvdylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnc2xpY2stYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLm9wdGlvbnMubGF6eUxvYWQgPT09ICdvbmRlbWFuZCcgfHwgXy5vcHRpb25zLmxhenlMb2FkID09PSAnYW50aWNpcGF0ZWQnKSB7XG4gICAgICAgICAgICBfLmxhenlMb2FkKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnNldHVwSW5maW5pdGUgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICBpLCBzbGlkZUluZGV4LCBpbmZpbml0ZUNvdW50O1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuZmFkZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgXy5vcHRpb25zLmNlbnRlck1vZGUgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuaW5maW5pdGUgPT09IHRydWUgJiYgXy5vcHRpb25zLmZhZGUgPT09IGZhbHNlKSB7XG5cbiAgICAgICAgICAgIHNsaWRlSW5kZXggPSBudWxsO1xuXG4gICAgICAgICAgICBpZiAoXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuXG4gICAgICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5jZW50ZXJNb2RlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGluZmluaXRlQ291bnQgPSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93ICsgMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZUNvdW50ID0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmb3IgKGkgPSBfLnNsaWRlQ291bnQ7IGkgPiAoXy5zbGlkZUNvdW50IC1cbiAgICAgICAgICAgICAgICAgICAgICAgIGluZmluaXRlQ291bnQpOyBpIC09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVJbmRleCA9IGkgLSAxO1xuICAgICAgICAgICAgICAgICAgICAkKF8uJHNsaWRlc1tzbGlkZUluZGV4XSkuY2xvbmUodHJ1ZSkuYXR0cignaWQnLCAnJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdkYXRhLXNsaWNrLWluZGV4Jywgc2xpZGVJbmRleCAtIF8uc2xpZGVDb3VudClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wcmVwZW5kVG8oXy4kc2xpZGVUcmFjaykuYWRkQ2xhc3MoJ3NsaWNrLWNsb25lZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgaW5maW5pdGVDb3VudCAgKyBfLnNsaWRlQ291bnQ7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZUluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgJChfLiRzbGlkZXNbc2xpZGVJbmRleF0pLmNsb25lKHRydWUpLmF0dHIoJ2lkJywgJycpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignZGF0YS1zbGljay1pbmRleCcsIHNsaWRlSW5kZXggKyBfLnNsaWRlQ291bnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8oXy4kc2xpZGVUcmFjaykuYWRkQ2xhc3MoJ3NsaWNrLWNsb25lZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfLiRzbGlkZVRyYWNrLmZpbmQoJy5zbGljay1jbG9uZWQnKS5maW5kKCdbaWRdJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKCdpZCcsICcnKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuaW50ZXJydXB0ID0gZnVuY3Rpb24oIHRvZ2dsZSApIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYoICF0b2dnbGUgKSB7XG4gICAgICAgICAgICBfLmF1dG9QbGF5KCk7XG4gICAgICAgIH1cbiAgICAgICAgXy5pbnRlcnJ1cHRlZCA9IHRvZ2dsZTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuc2VsZWN0SGFuZGxlciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIHZhciB0YXJnZXRFbGVtZW50ID1cbiAgICAgICAgICAgICQoZXZlbnQudGFyZ2V0KS5pcygnLnNsaWNrLXNsaWRlJykgP1xuICAgICAgICAgICAgICAgICQoZXZlbnQudGFyZ2V0KSA6XG4gICAgICAgICAgICAgICAgJChldmVudC50YXJnZXQpLnBhcmVudHMoJy5zbGljay1zbGlkZScpO1xuXG4gICAgICAgIHZhciBpbmRleCA9IHBhcnNlSW50KHRhcmdldEVsZW1lbnQuYXR0cignZGF0YS1zbGljay1pbmRleCcpKTtcblxuICAgICAgICBpZiAoIWluZGV4KSBpbmRleCA9IDA7XG5cbiAgICAgICAgaWYgKF8uc2xpZGVDb3VudCA8PSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG5cbiAgICAgICAgICAgIF8uc2xpZGVIYW5kbGVyKGluZGV4LCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgfVxuXG4gICAgICAgIF8uc2xpZGVIYW5kbGVyKGluZGV4KTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuc2xpZGVIYW5kbGVyID0gZnVuY3Rpb24oaW5kZXgsIHN5bmMsIGRvbnRBbmltYXRlKSB7XG5cbiAgICAgICAgdmFyIHRhcmdldFNsaWRlLCBhbmltU2xpZGUsIG9sZFNsaWRlLCBzbGlkZUxlZnQsIHRhcmdldExlZnQgPSBudWxsLFxuICAgICAgICAgICAgXyA9IHRoaXMsIG5hdlRhcmdldDtcblxuICAgICAgICBzeW5jID0gc3luYyB8fCBmYWxzZTtcblxuICAgICAgICBpZiAoXy5hbmltYXRpbmcgPT09IHRydWUgJiYgXy5vcHRpb25zLndhaXRGb3JBbmltYXRlID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5vcHRpb25zLmZhZGUgPT09IHRydWUgJiYgXy5jdXJyZW50U2xpZGUgPT09IGluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3luYyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIF8uYXNOYXZGb3IoaW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGFyZ2V0U2xpZGUgPSBpbmRleDtcbiAgICAgICAgdGFyZ2V0TGVmdCA9IF8uZ2V0TGVmdCh0YXJnZXRTbGlkZSk7XG4gICAgICAgIHNsaWRlTGVmdCA9IF8uZ2V0TGVmdChfLmN1cnJlbnRTbGlkZSk7XG5cbiAgICAgICAgXy5jdXJyZW50TGVmdCA9IF8uc3dpcGVMZWZ0ID09PSBudWxsID8gc2xpZGVMZWZ0IDogXy5zd2lwZUxlZnQ7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5pbmZpbml0ZSA9PT0gZmFsc2UgJiYgXy5vcHRpb25zLmNlbnRlck1vZGUgPT09IGZhbHNlICYmIChpbmRleCA8IDAgfHwgaW5kZXggPiBfLmdldERvdENvdW50KCkgKiBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwpKSB7XG4gICAgICAgICAgICBpZiAoXy5vcHRpb25zLmZhZGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0U2xpZGUgPSBfLmN1cnJlbnRTbGlkZTtcbiAgICAgICAgICAgICAgICBpZiAoZG9udEFuaW1hdGUgIT09IHRydWUgJiYgXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuICAgICAgICAgICAgICAgICAgICBfLmFuaW1hdGVTbGlkZShzbGlkZUxlZnQsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgXy5wb3N0U2xpZGUodGFyZ2V0U2xpZGUpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBfLnBvc3RTbGlkZSh0YXJnZXRTbGlkZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2UgaWYgKF8ub3B0aW9ucy5pbmZpbml0ZSA9PT0gZmFsc2UgJiYgXy5vcHRpb25zLmNlbnRlck1vZGUgPT09IHRydWUgJiYgKGluZGV4IDwgMCB8fCBpbmRleCA+IChfLnNsaWRlQ291bnQgLSBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwpKSkge1xuICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5mYWRlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHRhcmdldFNsaWRlID0gXy5jdXJyZW50U2xpZGU7XG4gICAgICAgICAgICAgICAgaWYgKGRvbnRBbmltYXRlICE9PSB0cnVlICYmIF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcbiAgICAgICAgICAgICAgICAgICAgXy5hbmltYXRlU2xpZGUoc2xpZGVMZWZ0LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF8ucG9zdFNsaWRlKHRhcmdldFNsaWRlKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgXy5wb3N0U2xpZGUodGFyZ2V0U2xpZGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggXy5vcHRpb25zLmF1dG9wbGF5ICkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChfLmF1dG9QbGF5VGltZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRhcmdldFNsaWRlIDwgMCkge1xuICAgICAgICAgICAgaWYgKF8uc2xpZGVDb3VudCAlIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCAhPT0gMCkge1xuICAgICAgICAgICAgICAgIGFuaW1TbGlkZSA9IF8uc2xpZGVDb3VudCAtIChfLnNsaWRlQ291bnQgJSBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbmltU2xpZGUgPSBfLnNsaWRlQ291bnQgKyB0YXJnZXRTbGlkZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0YXJnZXRTbGlkZSA+PSBfLnNsaWRlQ291bnQpIHtcbiAgICAgICAgICAgIGlmIChfLnNsaWRlQ291bnQgJSBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwgIT09IDApIHtcbiAgICAgICAgICAgICAgICBhbmltU2xpZGUgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbmltU2xpZGUgPSB0YXJnZXRTbGlkZSAtIF8uc2xpZGVDb3VudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFuaW1TbGlkZSA9IHRhcmdldFNsaWRlO1xuICAgICAgICB9XG5cbiAgICAgICAgXy5hbmltYXRpbmcgPSB0cnVlO1xuXG4gICAgICAgIF8uJHNsaWRlci50cmlnZ2VyKCdiZWZvcmVDaGFuZ2UnLCBbXywgXy5jdXJyZW50U2xpZGUsIGFuaW1TbGlkZV0pO1xuXG4gICAgICAgIG9sZFNsaWRlID0gXy5jdXJyZW50U2xpZGU7XG4gICAgICAgIF8uY3VycmVudFNsaWRlID0gYW5pbVNsaWRlO1xuXG4gICAgICAgIF8uc2V0U2xpZGVDbGFzc2VzKF8uY3VycmVudFNsaWRlKTtcblxuICAgICAgICBpZiAoIF8ub3B0aW9ucy5hc05hdkZvciApIHtcblxuICAgICAgICAgICAgbmF2VGFyZ2V0ID0gXy5nZXROYXZUYXJnZXQoKTtcbiAgICAgICAgICAgIG5hdlRhcmdldCA9IG5hdlRhcmdldC5zbGljaygnZ2V0U2xpY2snKTtcblxuICAgICAgICAgICAgaWYgKCBuYXZUYXJnZXQuc2xpZGVDb3VudCA8PSBuYXZUYXJnZXQub3B0aW9ucy5zbGlkZXNUb1Nob3cgKSB7XG4gICAgICAgICAgICAgICAgbmF2VGFyZ2V0LnNldFNsaWRlQ2xhc3NlcyhfLmN1cnJlbnRTbGlkZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIF8udXBkYXRlRG90cygpO1xuICAgICAgICBfLnVwZGF0ZUFycm93cygpO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuZmFkZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgaWYgKGRvbnRBbmltYXRlICE9PSB0cnVlKSB7XG5cbiAgICAgICAgICAgICAgICBfLmZhZGVTbGlkZU91dChvbGRTbGlkZSk7XG5cbiAgICAgICAgICAgICAgICBfLmZhZGVTbGlkZShhbmltU2xpZGUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBfLnBvc3RTbGlkZShhbmltU2xpZGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF8ucG9zdFNsaWRlKGFuaW1TbGlkZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfLmFuaW1hdGVIZWlnaHQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkb250QW5pbWF0ZSAhPT0gdHJ1ZSAmJiBfLnNsaWRlQ291bnQgPiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG4gICAgICAgICAgICBfLmFuaW1hdGVTbGlkZSh0YXJnZXRMZWZ0LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBfLnBvc3RTbGlkZShhbmltU2xpZGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfLnBvc3RTbGlkZShhbmltU2xpZGUpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnN0YXJ0TG9hZCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmFycm93cyA9PT0gdHJ1ZSAmJiBfLnNsaWRlQ291bnQgPiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG5cbiAgICAgICAgICAgIF8uJHByZXZBcnJvdy5oaWRlKCk7XG4gICAgICAgICAgICBfLiRuZXh0QXJyb3cuaGlkZSgpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5vcHRpb25zLmRvdHMgPT09IHRydWUgJiYgXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuXG4gICAgICAgICAgICBfLiRkb3RzLmhpZGUoKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgXy4kc2xpZGVyLmFkZENsYXNzKCdzbGljay1sb2FkaW5nJyk7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnN3aXBlRGlyZWN0aW9uID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIHhEaXN0LCB5RGlzdCwgciwgc3dpcGVBbmdsZSwgXyA9IHRoaXM7XG5cbiAgICAgICAgeERpc3QgPSBfLnRvdWNoT2JqZWN0LnN0YXJ0WCAtIF8udG91Y2hPYmplY3QuY3VyWDtcbiAgICAgICAgeURpc3QgPSBfLnRvdWNoT2JqZWN0LnN0YXJ0WSAtIF8udG91Y2hPYmplY3QuY3VyWTtcbiAgICAgICAgciA9IE1hdGguYXRhbjIoeURpc3QsIHhEaXN0KTtcblxuICAgICAgICBzd2lwZUFuZ2xlID0gTWF0aC5yb3VuZChyICogMTgwIC8gTWF0aC5QSSk7XG4gICAgICAgIGlmIChzd2lwZUFuZ2xlIDwgMCkge1xuICAgICAgICAgICAgc3dpcGVBbmdsZSA9IDM2MCAtIE1hdGguYWJzKHN3aXBlQW5nbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKChzd2lwZUFuZ2xlIDw9IDQ1KSAmJiAoc3dpcGVBbmdsZSA+PSAwKSkge1xuICAgICAgICAgICAgcmV0dXJuIChfLm9wdGlvbnMucnRsID09PSBmYWxzZSA/ICdsZWZ0JyA6ICdyaWdodCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmICgoc3dpcGVBbmdsZSA8PSAzNjApICYmIChzd2lwZUFuZ2xlID49IDMxNSkpIHtcbiAgICAgICAgICAgIHJldHVybiAoXy5vcHRpb25zLnJ0bCA9PT0gZmFsc2UgPyAnbGVmdCcgOiAncmlnaHQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKHN3aXBlQW5nbGUgPj0gMTM1KSAmJiAoc3dpcGVBbmdsZSA8PSAyMjUpKSB7XG4gICAgICAgICAgICByZXR1cm4gKF8ub3B0aW9ucy5ydGwgPT09IGZhbHNlID8gJ3JpZ2h0JyA6ICdsZWZ0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKF8ub3B0aW9ucy52ZXJ0aWNhbFN3aXBpbmcgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGlmICgoc3dpcGVBbmdsZSA+PSAzNSkgJiYgKHN3aXBlQW5nbGUgPD0gMTM1KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnZG93bic7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAndXAnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICd2ZXJ0aWNhbCc7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnN3aXBlRW5kID0gZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICBzbGlkZUNvdW50LFxuICAgICAgICAgICAgZGlyZWN0aW9uO1xuXG4gICAgICAgIF8uZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgXy5zd2lwaW5nID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKF8uc2Nyb2xsaW5nKSB7XG4gICAgICAgICAgICBfLnNjcm9sbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgXy5pbnRlcnJ1cHRlZCA9IGZhbHNlO1xuICAgICAgICBfLnNob3VsZENsaWNrID0gKCBfLnRvdWNoT2JqZWN0LnN3aXBlTGVuZ3RoID4gMTAgKSA/IGZhbHNlIDogdHJ1ZTtcblxuICAgICAgICBpZiAoIF8udG91Y2hPYmplY3QuY3VyWCA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBfLnRvdWNoT2JqZWN0LmVkZ2VIaXQgPT09IHRydWUgKSB7XG4gICAgICAgICAgICBfLiRzbGlkZXIudHJpZ2dlcignZWRnZScsIFtfLCBfLnN3aXBlRGlyZWN0aW9uKCkgXSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIF8udG91Y2hPYmplY3Quc3dpcGVMZW5ndGggPj0gXy50b3VjaE9iamVjdC5taW5Td2lwZSApIHtcblxuICAgICAgICAgICAgZGlyZWN0aW9uID0gXy5zd2lwZURpcmVjdGlvbigpO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKCBkaXJlY3Rpb24gKSB7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgICAgICBjYXNlICdkb3duJzpcblxuICAgICAgICAgICAgICAgICAgICBzbGlkZUNvdW50ID1cbiAgICAgICAgICAgICAgICAgICAgICAgIF8ub3B0aW9ucy5zd2lwZVRvU2xpZGUgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uY2hlY2tOYXZpZ2FibGUoIF8uY3VycmVudFNsaWRlICsgXy5nZXRTbGlkZUNvdW50KCkgKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXy5jdXJyZW50U2xpZGUgKyBfLmdldFNsaWRlQ291bnQoKTtcblxuICAgICAgICAgICAgICAgICAgICBfLmN1cnJlbnREaXJlY3Rpb24gPSAwO1xuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3VwJzpcblxuICAgICAgICAgICAgICAgICAgICBzbGlkZUNvdW50ID1cbiAgICAgICAgICAgICAgICAgICAgICAgIF8ub3B0aW9ucy5zd2lwZVRvU2xpZGUgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uY2hlY2tOYXZpZ2FibGUoIF8uY3VycmVudFNsaWRlIC0gXy5nZXRTbGlkZUNvdW50KCkgKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXy5jdXJyZW50U2xpZGUgLSBfLmdldFNsaWRlQ291bnQoKTtcblxuICAgICAgICAgICAgICAgICAgICBfLmN1cnJlbnREaXJlY3Rpb24gPSAxO1xuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcblxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKCBkaXJlY3Rpb24gIT0gJ3ZlcnRpY2FsJyApIHtcblxuICAgICAgICAgICAgICAgIF8uc2xpZGVIYW5kbGVyKCBzbGlkZUNvdW50ICk7XG4gICAgICAgICAgICAgICAgXy50b3VjaE9iamVjdCA9IHt9O1xuICAgICAgICAgICAgICAgIF8uJHNsaWRlci50cmlnZ2VyKCdzd2lwZScsIFtfLCBkaXJlY3Rpb24gXSk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBpZiAoIF8udG91Y2hPYmplY3Quc3RhcnRYICE9PSBfLnRvdWNoT2JqZWN0LmN1clggKSB7XG5cbiAgICAgICAgICAgICAgICBfLnNsaWRlSGFuZGxlciggXy5jdXJyZW50U2xpZGUgKTtcbiAgICAgICAgICAgICAgICBfLnRvdWNoT2JqZWN0ID0ge307XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnN3aXBlSGFuZGxlciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmICgoXy5vcHRpb25zLnN3aXBlID09PSBmYWxzZSkgfHwgKCdvbnRvdWNoZW5kJyBpbiBkb2N1bWVudCAmJiBfLm9wdGlvbnMuc3dpcGUgPT09IGZhbHNlKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2UgaWYgKF8ub3B0aW9ucy5kcmFnZ2FibGUgPT09IGZhbHNlICYmIGV2ZW50LnR5cGUuaW5kZXhPZignbW91c2UnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIF8udG91Y2hPYmplY3QuZmluZ2VyQ291bnQgPSBldmVudC5vcmlnaW5hbEV2ZW50ICYmIGV2ZW50Lm9yaWdpbmFsRXZlbnQudG91Y2hlcyAhPT0gdW5kZWZpbmVkID9cbiAgICAgICAgICAgIGV2ZW50Lm9yaWdpbmFsRXZlbnQudG91Y2hlcy5sZW5ndGggOiAxO1xuXG4gICAgICAgIF8udG91Y2hPYmplY3QubWluU3dpcGUgPSBfLmxpc3RXaWR0aCAvIF8ub3B0aW9uc1xuICAgICAgICAgICAgLnRvdWNoVGhyZXNob2xkO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMudmVydGljYWxTd2lwaW5nID09PSB0cnVlKSB7XG4gICAgICAgICAgICBfLnRvdWNoT2JqZWN0Lm1pblN3aXBlID0gXy5saXN0SGVpZ2h0IC8gXy5vcHRpb25zXG4gICAgICAgICAgICAgICAgLnRvdWNoVGhyZXNob2xkO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoIChldmVudC5kYXRhLmFjdGlvbikge1xuXG4gICAgICAgICAgICBjYXNlICdzdGFydCc6XG4gICAgICAgICAgICAgICAgXy5zd2lwZVN0YXJ0KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnbW92ZSc6XG4gICAgICAgICAgICAgICAgXy5zd2lwZU1vdmUoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdlbmQnOlxuICAgICAgICAgICAgICAgIF8uc3dpcGVFbmQoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuc3dpcGVNb3ZlID0gZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICBlZGdlV2FzSGl0ID0gZmFsc2UsXG4gICAgICAgICAgICBjdXJMZWZ0LCBzd2lwZURpcmVjdGlvbiwgc3dpcGVMZW5ndGgsIHBvc2l0aW9uT2Zmc2V0LCB0b3VjaGVzLCB2ZXJ0aWNhbFN3aXBlTGVuZ3RoO1xuXG4gICAgICAgIHRvdWNoZXMgPSBldmVudC5vcmlnaW5hbEV2ZW50ICE9PSB1bmRlZmluZWQgPyBldmVudC5vcmlnaW5hbEV2ZW50LnRvdWNoZXMgOiBudWxsO1xuXG4gICAgICAgIGlmICghXy5kcmFnZ2luZyB8fCBfLnNjcm9sbGluZyB8fCB0b3VjaGVzICYmIHRvdWNoZXMubGVuZ3RoICE9PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBjdXJMZWZ0ID0gXy5nZXRMZWZ0KF8uY3VycmVudFNsaWRlKTtcblxuICAgICAgICBfLnRvdWNoT2JqZWN0LmN1clggPSB0b3VjaGVzICE9PSB1bmRlZmluZWQgPyB0b3VjaGVzWzBdLnBhZ2VYIDogZXZlbnQuY2xpZW50WDtcbiAgICAgICAgXy50b3VjaE9iamVjdC5jdXJZID0gdG91Y2hlcyAhPT0gdW5kZWZpbmVkID8gdG91Y2hlc1swXS5wYWdlWSA6IGV2ZW50LmNsaWVudFk7XG5cbiAgICAgICAgXy50b3VjaE9iamVjdC5zd2lwZUxlbmd0aCA9IE1hdGgucm91bmQoTWF0aC5zcXJ0KFxuICAgICAgICAgICAgTWF0aC5wb3coXy50b3VjaE9iamVjdC5jdXJYIC0gXy50b3VjaE9iamVjdC5zdGFydFgsIDIpKSk7XG5cbiAgICAgICAgdmVydGljYWxTd2lwZUxlbmd0aCA9IE1hdGgucm91bmQoTWF0aC5zcXJ0KFxuICAgICAgICAgICAgTWF0aC5wb3coXy50b3VjaE9iamVjdC5jdXJZIC0gXy50b3VjaE9iamVjdC5zdGFydFksIDIpKSk7XG5cbiAgICAgICAgaWYgKCFfLm9wdGlvbnMudmVydGljYWxTd2lwaW5nICYmICFfLnN3aXBpbmcgJiYgdmVydGljYWxTd2lwZUxlbmd0aCA+IDQpIHtcbiAgICAgICAgICAgIF8uc2Nyb2xsaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLm9wdGlvbnMudmVydGljYWxTd2lwaW5nID09PSB0cnVlKSB7XG4gICAgICAgICAgICBfLnRvdWNoT2JqZWN0LnN3aXBlTGVuZ3RoID0gdmVydGljYWxTd2lwZUxlbmd0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXBlRGlyZWN0aW9uID0gXy5zd2lwZURpcmVjdGlvbigpO1xuXG4gICAgICAgIGlmIChldmVudC5vcmlnaW5hbEV2ZW50ICE9PSB1bmRlZmluZWQgJiYgXy50b3VjaE9iamVjdC5zd2lwZUxlbmd0aCA+IDQpIHtcbiAgICAgICAgICAgIF8uc3dpcGluZyA9IHRydWU7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcG9zaXRpb25PZmZzZXQgPSAoXy5vcHRpb25zLnJ0bCA9PT0gZmFsc2UgPyAxIDogLTEpICogKF8udG91Y2hPYmplY3QuY3VyWCA+IF8udG91Y2hPYmplY3Quc3RhcnRYID8gMSA6IC0xKTtcbiAgICAgICAgaWYgKF8ub3B0aW9ucy52ZXJ0aWNhbFN3aXBpbmcgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHBvc2l0aW9uT2Zmc2V0ID0gXy50b3VjaE9iamVjdC5jdXJZID4gXy50b3VjaE9iamVjdC5zdGFydFkgPyAxIDogLTE7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHN3aXBlTGVuZ3RoID0gXy50b3VjaE9iamVjdC5zd2lwZUxlbmd0aDtcblxuICAgICAgICBfLnRvdWNoT2JqZWN0LmVkZ2VIaXQgPSBmYWxzZTtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmluZmluaXRlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgaWYgKChfLmN1cnJlbnRTbGlkZSA9PT0gMCAmJiBzd2lwZURpcmVjdGlvbiA9PT0gJ3JpZ2h0JykgfHwgKF8uY3VycmVudFNsaWRlID49IF8uZ2V0RG90Q291bnQoKSAmJiBzd2lwZURpcmVjdGlvbiA9PT0gJ2xlZnQnKSkge1xuICAgICAgICAgICAgICAgIHN3aXBlTGVuZ3RoID0gXy50b3VjaE9iamVjdC5zd2lwZUxlbmd0aCAqIF8ub3B0aW9ucy5lZGdlRnJpY3Rpb247XG4gICAgICAgICAgICAgICAgXy50b3VjaE9iamVjdC5lZGdlSGl0ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLm9wdGlvbnMudmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBfLnN3aXBlTGVmdCA9IGN1ckxlZnQgKyBzd2lwZUxlbmd0aCAqIHBvc2l0aW9uT2Zmc2V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgXy5zd2lwZUxlZnQgPSBjdXJMZWZ0ICsgKHN3aXBlTGVuZ3RoICogKF8uJGxpc3QuaGVpZ2h0KCkgLyBfLmxpc3RXaWR0aCkpICogcG9zaXRpb25PZmZzZXQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKF8ub3B0aW9ucy52ZXJ0aWNhbFN3aXBpbmcgPT09IHRydWUpIHtcbiAgICAgICAgICAgIF8uc3dpcGVMZWZ0ID0gY3VyTGVmdCArIHN3aXBlTGVuZ3RoICogcG9zaXRpb25PZmZzZXQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5vcHRpb25zLmZhZGUgPT09IHRydWUgfHwgXy5vcHRpb25zLnRvdWNoTW92ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLmFuaW1hdGluZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgXy5zd2lwZUxlZnQgPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgXy5zZXRDU1MoXy5zd2lwZUxlZnQpO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5zd2lwZVN0YXJ0ID0gZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICB0b3VjaGVzO1xuXG4gICAgICAgIF8uaW50ZXJydXB0ZWQgPSB0cnVlO1xuXG4gICAgICAgIGlmIChfLnRvdWNoT2JqZWN0LmZpbmdlckNvdW50ICE9PSAxIHx8IF8uc2xpZGVDb3VudCA8PSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG4gICAgICAgICAgICBfLnRvdWNoT2JqZWN0ID0ge307XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXZlbnQub3JpZ2luYWxFdmVudCAhPT0gdW5kZWZpbmVkICYmIGV2ZW50Lm9yaWdpbmFsRXZlbnQudG91Y2hlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0b3VjaGVzID0gZXZlbnQub3JpZ2luYWxFdmVudC50b3VjaGVzWzBdO1xuICAgICAgICB9XG5cbiAgICAgICAgXy50b3VjaE9iamVjdC5zdGFydFggPSBfLnRvdWNoT2JqZWN0LmN1clggPSB0b3VjaGVzICE9PSB1bmRlZmluZWQgPyB0b3VjaGVzLnBhZ2VYIDogZXZlbnQuY2xpZW50WDtcbiAgICAgICAgXy50b3VjaE9iamVjdC5zdGFydFkgPSBfLnRvdWNoT2JqZWN0LmN1clkgPSB0b3VjaGVzICE9PSB1bmRlZmluZWQgPyB0b3VjaGVzLnBhZ2VZIDogZXZlbnQuY2xpZW50WTtcblxuICAgICAgICBfLmRyYWdnaW5nID0gdHJ1ZTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUudW5maWx0ZXJTbGlkZXMgPSBTbGljay5wcm90b3R5cGUuc2xpY2tVbmZpbHRlciA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAoXy4kc2xpZGVzQ2FjaGUgIT09IG51bGwpIHtcblxuICAgICAgICAgICAgXy51bmxvYWQoKTtcblxuICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5jaGlsZHJlbih0aGlzLm9wdGlvbnMuc2xpZGUpLmRldGFjaCgpO1xuXG4gICAgICAgICAgICBfLiRzbGlkZXNDYWNoZS5hcHBlbmRUbyhfLiRzbGlkZVRyYWNrKTtcblxuICAgICAgICAgICAgXy5yZWluaXQoKTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnVubG9hZCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICAkKCcuc2xpY2stY2xvbmVkJywgXy4kc2xpZGVyKS5yZW1vdmUoKTtcblxuICAgICAgICBpZiAoXy4kZG90cykge1xuICAgICAgICAgICAgXy4kZG90cy5yZW1vdmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLiRwcmV2QXJyb3cgJiYgXy5odG1sRXhwci50ZXN0KF8ub3B0aW9ucy5wcmV2QXJyb3cpKSB7XG4gICAgICAgICAgICBfLiRwcmV2QXJyb3cucmVtb3ZlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy4kbmV4dEFycm93ICYmIF8uaHRtbEV4cHIudGVzdChfLm9wdGlvbnMubmV4dEFycm93KSkge1xuICAgICAgICAgICAgXy4kbmV4dEFycm93LnJlbW92ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgXy4kc2xpZGVzXG4gICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3NsaWNrLXNsaWRlIHNsaWNrLWFjdGl2ZSBzbGljay12aXNpYmxlIHNsaWNrLWN1cnJlbnQnKVxuICAgICAgICAgICAgLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKVxuICAgICAgICAgICAgLmNzcygnd2lkdGgnLCAnJyk7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnVuc2xpY2sgPSBmdW5jdGlvbihmcm9tQnJlYWtwb2ludCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcbiAgICAgICAgXy4kc2xpZGVyLnRyaWdnZXIoJ3Vuc2xpY2snLCBbXywgZnJvbUJyZWFrcG9pbnRdKTtcbiAgICAgICAgXy5kZXN0cm95KCk7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnVwZGF0ZUFycm93cyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIGNlbnRlck9mZnNldDtcblxuICAgICAgICBjZW50ZXJPZmZzZXQgPSBNYXRoLmZsb29yKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgLyAyKTtcblxuICAgICAgICBpZiAoIF8ub3B0aW9ucy5hcnJvd3MgPT09IHRydWUgJiZcbiAgICAgICAgICAgIF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgJiZcbiAgICAgICAgICAgICFfLm9wdGlvbnMuaW5maW5pdGUgKSB7XG5cbiAgICAgICAgICAgIF8uJHByZXZBcnJvdy5yZW1vdmVDbGFzcygnc2xpY2stZGlzYWJsZWQnKS5hdHRyKCdhcmlhLWRpc2FibGVkJywgJ2ZhbHNlJyk7XG4gICAgICAgICAgICBfLiRuZXh0QXJyb3cucmVtb3ZlQ2xhc3MoJ3NsaWNrLWRpc2FibGVkJykuYXR0cignYXJpYS1kaXNhYmxlZCcsICdmYWxzZScpO1xuXG4gICAgICAgICAgICBpZiAoXy5jdXJyZW50U2xpZGUgPT09IDApIHtcblxuICAgICAgICAgICAgICAgIF8uJHByZXZBcnJvdy5hZGRDbGFzcygnc2xpY2stZGlzYWJsZWQnKS5hdHRyKCdhcmlhLWRpc2FibGVkJywgJ3RydWUnKTtcbiAgICAgICAgICAgICAgICBfLiRuZXh0QXJyb3cucmVtb3ZlQ2xhc3MoJ3NsaWNrLWRpc2FibGVkJykuYXR0cignYXJpYS1kaXNhYmxlZCcsICdmYWxzZScpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKF8uY3VycmVudFNsaWRlID49IF8uc2xpZGVDb3VudCAtIF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgJiYgXy5vcHRpb25zLmNlbnRlck1vZGUgPT09IGZhbHNlKSB7XG5cbiAgICAgICAgICAgICAgICBfLiRuZXh0QXJyb3cuYWRkQ2xhc3MoJ3NsaWNrLWRpc2FibGVkJykuYXR0cignYXJpYS1kaXNhYmxlZCcsICd0cnVlJyk7XG4gICAgICAgICAgICAgICAgXy4kcHJldkFycm93LnJlbW92ZUNsYXNzKCdzbGljay1kaXNhYmxlZCcpLmF0dHIoJ2FyaWEtZGlzYWJsZWQnLCAnZmFsc2UnKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChfLmN1cnJlbnRTbGlkZSA+PSBfLnNsaWRlQ291bnQgLSAxICYmIF8ub3B0aW9ucy5jZW50ZXJNb2RlID09PSB0cnVlKSB7XG5cbiAgICAgICAgICAgICAgICBfLiRuZXh0QXJyb3cuYWRkQ2xhc3MoJ3NsaWNrLWRpc2FibGVkJykuYXR0cignYXJpYS1kaXNhYmxlZCcsICd0cnVlJyk7XG4gICAgICAgICAgICAgICAgXy4kcHJldkFycm93LnJlbW92ZUNsYXNzKCdzbGljay1kaXNhYmxlZCcpLmF0dHIoJ2FyaWEtZGlzYWJsZWQnLCAnZmFsc2UnKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUudXBkYXRlRG90cyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAoXy4kZG90cyAhPT0gbnVsbCkge1xuXG4gICAgICAgICAgICBfLiRkb3RzXG4gICAgICAgICAgICAgICAgLmZpbmQoJ2xpJylcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdzbGljay1hY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICAuZW5kKCk7XG5cbiAgICAgICAgICAgIF8uJGRvdHNcbiAgICAgICAgICAgICAgICAuZmluZCgnbGknKVxuICAgICAgICAgICAgICAgIC5lcShNYXRoLmZsb29yKF8uY3VycmVudFNsaWRlIC8gXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsKSlcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3NsaWNrLWFjdGl2ZScpO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUudmlzaWJpbGl0eSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAoIF8ub3B0aW9ucy5hdXRvcGxheSApIHtcblxuICAgICAgICAgICAgaWYgKCBkb2N1bWVudFtfLmhpZGRlbl0gKSB7XG5cbiAgICAgICAgICAgICAgICBfLmludGVycnVwdGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIF8uaW50ZXJydXB0ZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICAkLmZuLnNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIG9wdCA9IGFyZ3VtZW50c1swXSxcbiAgICAgICAgICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLFxuICAgICAgICAgICAgbCA9IF8ubGVuZ3RoLFxuICAgICAgICAgICAgaSxcbiAgICAgICAgICAgIHJldDtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHQgPT0gJ29iamVjdCcgfHwgdHlwZW9mIG9wdCA9PSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgICAgICBfW2ldLnNsaWNrID0gbmV3IFNsaWNrKF9baV0sIG9wdCk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgcmV0ID0gX1tpXS5zbGlja1tvcHRdLmFwcGx5KF9baV0uc2xpY2ssIGFyZ3MpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiByZXQgIT0gJ3VuZGVmaW5lZCcpIHJldHVybiByZXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF87XG4gICAgfTtcblxufSkpO1xuIiwiaW1wb3J0ICQgZnJvbSBcImpxdWVyeVwiO1xuaW1wb3J0IE1hc29ucnkgZnJvbSBcIm1hc29ucnktbGF5b3V0XCI7XG5pbXBvcnQgaW1hZ2VzTG9hZGVkIGZyb20gXCJpbWFnZXNsb2FkZWRcIjtcblxuZXhwb3J0IHsgc2V0dXBNYXNvbnJ5IH07XG5cbmZ1bmN0aW9uIHNldHVwTWFzb25yeShjb250YWluZXIsIGl0ZW0sIHNpemVyLCBzcGFjZXIpIHtcblx0aWYgKCQoY29udGFpbmVyKS5sZW5ndGgpIHtcblx0XHR2YXIgbmV3TWFzb25yeSA9IG5ldyBNYXNvbnJ5KGNvbnRhaW5lciwge1xuXHRcdFx0aXRlbVNlbGVjdG9yOiBpdGVtLFxuXHRcdFx0Y29sdW1uV2lkdGg6IHNpemVyLFxuXHRcdFx0Z3V0dGVyOiBzcGFjZXIsXG5cdFx0XHRwZXJjZW50UG9zaXRpb246IHRydWUsXG5cdFx0XHR0cmFuc2l0aW9uRHVyYXRpb246IDAsXG5cdFx0XHRpbml0TGF5b3V0OiB0cnVlLFxuXHRcdH0pO1xuXG5cdFx0aW1hZ2VzTG9hZGVkKGNvbnRhaW5lcikub24oXCJwcm9ncmVzc1wiLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRuZXdNYXNvbnJ5LmxheW91dCgpO1xuXHRcdH0pO1xuXHR9XG5cblx0cmV0dXJuIG5ld01hc29ucnk7XG59XG4iLCJpbXBvcnQgJCBmcm9tIFwianF1ZXJ5XCI7XG5cbmxldCBtZW51T3BlbiA9ICQoXCIjaGVhZGVyX19oYW1idXJnZXItLW9wZW5cIik7XG5sZXQgbWVudUNsb3NlID0gJChcIiNoZWFkZXJfX2hhbWJ1cmdlci0tY2xvc2VcIik7XG5sZXQgbWVudSA9ICQoXCIuaGVhZGVyX19zZWNvbmRhcnlcIik7XG5sZXQgbWVudUxvZ28gPSAkKFwiLmhlYWRlcl9fbG9nb1wiKTtcbmxldCBwYWdlVGl0bGUgPSAkKFwiLmhlYWRlcl9fcGFnZS10aXRsZVwiKTtcbmxldCBzaG93Q2xhc3MgPSBcInNob3dcIjtcblxuZnVuY3Rpb24gb3Blbk1lbnUoKSB7XG5cdG1lbnVPcGVuLmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIsIFwidHJ1ZVwiKTtcblx0bWVudU9wZW4ucmVtb3ZlQ2xhc3Moc2hvd0NsYXNzKTtcblx0cGFnZVRpdGxlLnJlbW92ZUNsYXNzKHNob3dDbGFzcyk7XG5cdG1lbnVDbG9zZS5hZGRDbGFzcyhzaG93Q2xhc3MpO1xuXHRtZW51TG9nby5hZGRDbGFzcyhzaG93Q2xhc3MpO1xuXHRtZW51LmFkZENsYXNzKHNob3dDbGFzcyk7XG59XG5cbmZ1bmN0aW9uIGNsb3NlTWVudSgpIHtcblx0bWVudU9wZW4uYXR0cihcImFyaWEtZXhwYW5kZWRcIiwgXCJmYWxzZVwiKTtcblx0bWVudU9wZW4uYWRkQ2xhc3Moc2hvd0NsYXNzKTtcblx0cGFnZVRpdGxlLmFkZENsYXNzKHNob3dDbGFzcyk7XG5cdG1lbnVDbG9zZS5yZW1vdmVDbGFzcyhzaG93Q2xhc3MpO1xuXHRtZW51TG9nby5yZW1vdmVDbGFzcyhzaG93Q2xhc3MpO1xuXHRtZW51LnJlbW92ZUNsYXNzKHNob3dDbGFzcyk7XG59XG5cbm1lbnVPcGVuLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuXHRvcGVuTWVudSgpO1xufSk7XG5cbm1lbnVDbG9zZS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcblx0Y2xvc2VNZW51KCk7XG59KTtcblxuJChkb2N1bWVudCkub24oXCJrZXl1cFwiLCBmdW5jdGlvbiAoZSkge1xuXHRpZiAoZS5rZXkgPT0gXCJFc2NhcGVcIikge1xuXHRcdGNsb3NlTWVudSgpO1xuXHRcdGFkZENsYXNzO1xuXHR9XG59KTtcblxuJChkb2N1bWVudCkub24oXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcblx0Y2xvc2VNZW51KCk7XG59KTtcblxuJCh3aW5kb3cpLm9uKFwibG9hZFwiLCBmdW5jdGlvbiAoKSB7XG5cdGNsb3NlTWVudSgpO1xufSk7XG4iLCJpbXBvcnQgJCBmcm9tIFwianF1ZXJ5XCI7XG5pbXBvcnQgTWFzb25yeSBmcm9tIFwibWFzb25yeS1sYXlvdXRcIjtcbmltcG9ydCBpbWFnZXNMb2FkZWQgZnJvbSBcImltYWdlc2xvYWRlZFwiO1xuXG5leHBvcnQgeyB0b2dnbGVCaW9zIH07XG5cbmZ1bmN0aW9uIHRvZ2dsZUJpb3MocGVyc29uLCBtYXNvbnJ5T2JqZWN0KSB7XG5cdHBlcnNvbi5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcblx0XHQkKHRoaXMpLnRvZ2dsZUNsYXNzKFwicGVyc29uX19zaG93LS1vcGVuXCIpO1xuXHRcdCQodGhpcylcblx0XHRcdC5zaWJsaW5ncyhcIi5wZXJzb25fX3NlY29uZGFyeS1pbmZvcm1hdGlvblwiKVxuXHRcdFx0LnRvZ2dsZUNsYXNzKFwicGVyc29uX19zZWNvbmRhcnktaW5mb3JtYXRpb24tLW9wZW5cIik7XG5cdFx0bWFzb25yeU9iamVjdC5sYXlvdXQoKTtcblx0fSk7XG59XG4iLCJpbXBvcnQgJCBmcm9tIFwianF1ZXJ5XCI7XG5pbXBvcnQgXCJzbGljay1jYXJvdXNlbC9zbGljay9zbGlja1wiO1xuaW1wb3J0IGltYWdlc0xvYWRlZCBmcm9tIFwiaW1hZ2VzbG9hZGVkXCI7XG5cbmV4cG9ydCB7IHNldHVwU2xpZGVycywgc2V0dXBUYWJzIH07XG5cbmZ1bmN0aW9uIHNldHVwU2xpZGVycyhjYXJvdXNlbEl0ZW0sIGFycm93TGVmdElkLCBhcnJvd1JpZ2h0SWQsIHZhcmlhYmxlV2lkdGgpIHtcblx0bGV0IGFycm93TGVmdE9iamVjdDtcblx0bGV0IGFycm93UmlnaHRPYmplY3Q7XG5cdGxldCBjYXJvdXNlbFNpemUgPSAkKGNhcm91c2VsSXRlbSkuc2l6ZSgpO1xuXHQvLyBmb3IgZWFjaCBjYXJvdXNlbFxuXHQkKGNhcm91c2VsSXRlbSkuZWFjaChmdW5jdGlvbiAoaW5kZXgpIHtcblx0XHQvLyBhZGQgc3VmZml4IHRvIHRoZSBhcnJvdyBpZCBpZiB0aGVyZSBhcmUgbW9yZSB0aGFuIG9uZSBvZiBhIGNhcm91c2VsIHR5cGVcblx0XHRpZiAoY2Fyb3VzZWxTaXplID4gMSkge1xuXHRcdFx0YXJyb3dMZWZ0T2JqZWN0ID0gJChhcnJvd0xlZnRJZCArIFwiLS1cIiArIChpbmRleCArIDEpKTtcblx0XHRcdGFycm93UmlnaHRPYmplY3QgPSAkKGFycm93UmlnaHRJZCArIFwiLS1cIiArIChpbmRleCArIDEpKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0YXJyb3dMZWZ0T2JqZWN0ID0gJChhcnJvd0xlZnRJZCk7XG5cdFx0XHRhcnJvd1JpZ2h0T2JqZWN0ID0gJChhcnJvd1JpZ2h0SWQpO1xuXHRcdH1cblx0XHQvLyBpbml0aWF0ZSBzbGlkZXJcblx0XHQkKHRoaXMpLnNsaWNrKHtcblx0XHRcdGluZmluaXRlOiB0cnVlLFxuXHRcdFx0dmFyaWFibGVXaWR0aDogdmFyaWFibGVXaWR0aCxcblx0XHRcdGFkYXB0aXZlSGVpZ2h0OiBmYWxzZSxcblx0XHRcdGRvdHM6IHRydWUsXG5cdFx0XHRwcmV2QXJyb3c6IGFycm93TGVmdE9iamVjdCxcblx0XHRcdG5leHRBcnJvdzogYXJyb3dSaWdodE9iamVjdCxcblx0XHRcdGNlbnRlck1vZGU6IHRydWUsXG5cdFx0fSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBzZXR1cFRhYnMoYnV0dG9ucywgY29udGVudCkge1xuXHQvLyBnZXQgYWxsIHRhYiBidXR0b25zXG5cdGxldCB0YWJCdXR0b25zID0gJChidXR0b25zKTtcblx0Ly8gZ2V0IGFsbCB0YWIgY29udGVudFxuXHRsZXQgdGFiQ29udGVudCA9ICQoY29udGVudCk7XG5cdC8vIG9uIGNsaWNraW5nIGEgYnV0dG9uXG5cdHRhYkJ1dHRvbnMub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG5cdFx0Ly8gbWFrZSByZWNvcmQgb2YgdGhlIGJ1dHRvblxuXHRcdGxldCB0YWJCdXR0b24gPSAkKHRoaXMpO1xuXHRcdC8vIGdldCB0aGUgZGF0YSBhdHRyaWJ1dGVcblx0XHRsZXQgdGFiQnV0dG9uRGF0YSA9ICQodGhpcykuYXR0cihcImRhdGEtZm9yLXRhYlwiKTtcblx0XHQvLyBmb3IgZWFjaCB0YWIgY29udGVudFxuXHRcdHRhYkNvbnRlbnQuZWFjaChmdW5jdGlvbiAoaW5kZXgpIHtcblx0XHRcdC8vIG1ha2UgcmVjb3JkIG9mIHRoZSBjb250ZW50IGl0ZW1cblx0XHRcdGxldCB0YWJDb250ZW50ID0gJCh0aGlzKTtcblx0XHRcdC8vIGdldCB0aGUgZGF0YSBhdHRyaWJ1dGVcblx0XHRcdGxldCB0YWJDb250ZW50RGF0YSA9ICQodGhpcykuYXR0cihcImRhdGEtdGFiXCIpO1xuXHRcdFx0Ly8gaWYgdGhlIGNvbnRlbnQgZGF0YSBhdHRyaWJ1dGUgbWF0Y2hlcyB0aGUgdGFiIGF0dHJpYnV0ZVxuXHRcdFx0aWYgKHRhYkNvbnRlbnREYXRhID09IHRhYkJ1dHRvbkRhdGEpIHtcblx0XHRcdFx0Ly8gYWRkIGFjdGl2ZSBjbGFzcyB0byB0aGUgYnV0dG9uXG5cdFx0XHRcdHRhYkJ1dHRvbi5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcblx0XHRcdFx0Ly8gcmVtb3ZlIGFjdGl2ZSBjbGFzcyB0byB0aGUgYnV0dG9uXG5cdFx0XHRcdHRhYkJ1dHRvbi5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuXHRcdFx0XHQvLyBhZGQgYWN0aXZlIGNsYXNzIHRvIHRoZSBjb250ZW50IGl0ZW1cblx0XHRcdFx0dGFiQ29udGVudC5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcblx0XHRcdFx0Ly8gcmVtb3ZlIGFjdGl2ZSBjbGFzcyB0byB0aGUgY29udGVudCBpdGVtXG5cdFx0XHRcdHRhYkNvbnRlbnQuc2libGluZ3MoKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdCQoXCIucHJvamVjdF9fY2Fyb3VzZWwtLVwiICsgdGFiQnV0dG9uRGF0YSkuc2xpY2soXCJyZWZyZXNoXCIpO1xuXHR9KTtcbn1cbiIsImltcG9ydCAkIGZyb20gXCJqcXVlcnlcIjtcblxuZXhwb3J0IHsgcmFuZG9taXplIH07XG5cbmZ1bmN0aW9uIHJhbmRvbWl6ZShzZWxlY3Rvcikge1xuXHQvLyBpZiB0aGUgaXRlbSBleGlzdHNcblx0aWYgKHNlbGVjdG9yKSB7XG5cdFx0Ly8gZmluZCB0aGUgcGFyZW50XG5cdFx0c2VsZWN0b3IucGFyZW50KCkuZWFjaChmdW5jdGlvbiAoKSB7XG5cdFx0XHQvLyBmb3IgZWFjaCBwYXJlbnRcblx0XHRcdCQodGhpcylcblx0XHRcdFx0Ly8gZmluZCB0aGUgY2hpbGRyZW5cblx0XHRcdFx0LmNoaWxkcmVuKHNlbGVjdG9yKVxuXHRcdFx0XHQvLyBnZXQgYSByYW5kb20gc29ydCBvcmRlclxuXHRcdFx0XHQuc29ydChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIE1hdGgucmFuZG9tKCkgLSAwLjU7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC8vIHJlbW92ZSB0aGUgY2hpbGRyZW4gZnJvbSB0aGUgcGFyZW50XG5cdFx0XHRcdC5kZXRhY2goKVxuXHRcdFx0XHQvLyBhcHBlbmQgdGhlIGNoaWxkcmVuIHdpdGggdGhlIG5ldyBvcmRlclxuXHRcdFx0XHQuYXBwZW5kVG8odGhpcyk7XG5cdFx0fSk7XG5cdH1cblxuXHRyZXR1cm4gdGhpcztcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0galF1ZXJ5OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJCBmcm9tIFwianF1ZXJ5XCI7XG5cbmltcG9ydCBcIi4vbmF2aWdhdGlvblwiO1xuaW1wb3J0IHsgcmFuZG9taXplIH0gZnJvbSBcIi4vcmFuZG9taXplT3JkZXJcIjtcbmltcG9ydCB7IHNldHVwTWFzb25yeSB9IGZyb20gXCIuL21hc29ucnlcIjtcbmltcG9ydCB7IHNldHVwU2xpZGVycywgc2V0dXBUYWJzIH0gZnJvbSBcIi4vcHJvamVjdEludGVyYWN0aW9uc1wiO1xuaW1wb3J0IHsgdG9nZ2xlQmlvcyB9IGZyb20gXCIuL3Blb3BsZUludGVyYWN0aW9uc1wiO1xuXG4kKGRvY3VtZW50KS5vbihcInJlYWR5XCIsIGZ1bmN0aW9uICgpIHtcblx0Ly8gZm9yIHByb2plY3QgZ3JpZFxuXHRsZXQgcHJvamVjdEdyaWQgPSBcIi5wcm9qZWN0LWdyaWRcIjtcblx0bGV0IHByb2plY3RJdGVtID0gXCIucHJvamVjdC1ncmlkX19pdGVtXCI7XG5cdGxldCBwcm9qZWN0U2l6ZXIgPSBcIi5wcm9qZWN0LWdyaWRfX2l0ZW0tLXNtYWxsXCI7XG5cdGxldCBwcm9qZWN0U3BhY2VyID0gXCIucHJvamVjdC1ncmlkX19zcGFjZXJcIjtcblx0aWYgKHByb2plY3RJdGVtKSB7XG5cdFx0Ly8gcmFuZG9taXplIG9yZGVyXG5cdFx0cmFuZG9taXplKCQocHJvamVjdEl0ZW0pKTtcblx0XHQvLyBhcHBseSBtYXNvbnJ5XG5cdFx0c2V0dXBNYXNvbnJ5KHByb2plY3RHcmlkLCBwcm9qZWN0SXRlbSwgcHJvamVjdFNpemVyLCBwcm9qZWN0U3BhY2VyKTtcblx0fVxuXG5cdC8vIGZvciB0ZWFjaGluZyBncmlkXG5cdGxldCBvcHBvcnR1bml0eUdyaWQgPSBcIi5vcHBvcnR1bml0aWVzXCI7XG5cdGxldCBvcHBvcnR1bml0eUl0ZW0gPSBcIi5vcHBvcnR1bml0eVwiO1xuXHRsZXQgb3Bwb3J0dW5pdHlTcGFjZXIgPSBcIi5vcHBvcnR1bml0eV9fc3BhY2VyXCI7XG5cdGlmIChvcHBvcnR1bml0eUl0ZW0pIHtcblx0XHQvLyBhcHBseSBtYXNvbnJ5XG5cdFx0c2V0dXBNYXNvbnJ5KFxuXHRcdFx0b3Bwb3J0dW5pdHlHcmlkLFxuXHRcdFx0b3Bwb3J0dW5pdHlJdGVtLFxuXHRcdFx0b3Bwb3J0dW5pdHlJdGVtLFxuXHRcdFx0b3Bwb3J0dW5pdHlTcGFjZXJcblx0XHQpO1xuXHR9XG5cblx0Ly8gZm9yIHBlb3BsZSBncmlkXG5cdGxldCBwZXJzb25HcmlkID0gXCIucGVvcGxlXCI7XG5cdGxldCBwZXJzb25JdGVtID0gXCIucGVyc29uXCI7XG5cdGxldCBwZXJzb25TaXplciA9IFwiLnBlcnNvbi0tc21hbGxcIjtcblx0bGV0IHBlcnNvblNwYWNlciA9IFwiLnBlcnNvbl9fc3BhY2VyXCI7XG5cdGxldCBwZW9wbGVNYXNvbnJ5O1xuXHRpZiAocGVyc29uSXRlbSkge1xuXHRcdC8vIGFwcGx5IG1hc29ucnlcblx0XHRwZW9wbGVNYXNvbnJ5ID0gc2V0dXBNYXNvbnJ5KFxuXHRcdFx0cGVyc29uR3JpZCxcblx0XHRcdHBlcnNvbkl0ZW0sXG5cdFx0XHRwZXJzb25TaXplcixcblx0XHRcdHBlcnNvblNwYWNlclxuXHRcdCk7XG5cdH1cblx0Y29uc29sZS5sb2cocGVvcGxlTWFzb25yeSk7XG5cblx0Ly8gaW5pdGlhbGl6ZSB0YWJzXG5cdC8vIGlmIHRoZSB1cmwgaGFzIGEgaGFzaFxuXHRpZiAod2luZG93LmxvY2F0aW9uLmhhc2gpIHtcblx0XHQvLyBnZXQgdGhlIGhhc2ggdmFsdWVcblx0XHRsZXQgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnJlcGxhY2UoXCIjXCIsIFwiXCIpO1xuXHRcdC8vIGdldCB0aGUgcmVsYXRlZCBidXR0b25cblx0XHRsZXQgYnV0dG9uVG9BY3RpdmF0ZSA9ICQoXG5cdFx0XHRcIi5wcm9qZWN0X19kZWxpdmVyYWJsZS1idXR0b25bZGF0YS1oYXNoLXRhcmdldD0nXCIgKyBoYXNoICsgXCInXVwiXG5cdFx0KTtcblx0XHQvLyB0cmlnZ2VyIGEgY2xpY2sgb24gdGhlIGJ1dHRvblxuXHRcdGJ1dHRvblRvQWN0aXZhdGUudHJpZ2dlcihcImNsaWNrXCIpO1xuXHR9XG5cblx0Ly8gdHJpZ2dlciB0YWJzIG9uIGJ1dHRvbiBjbGlja1xuXHRsZXQgZGVsaXZlcmFibGVCdXR0b25zID0gXCIucHJvamVjdF9fZGVsaXZlcmFibGUtYnV0dG9uXCI7XG5cdGxldCBkZWxpdmVyYWJsZUNvbnRlbnQgPSBcIi5wcm9qZWN0X19kZWxpdmVyYWJsZS1jb250ZW50XCI7XG5cdGlmIChkZWxpdmVyYWJsZUJ1dHRvbnMpIHtcblx0XHRzZXR1cFRhYnMoZGVsaXZlcmFibGVCdXR0b25zLCBkZWxpdmVyYWJsZUNvbnRlbnQpO1xuXHR9XG5cblx0Ly8gZm9yIHByb2plY3Qgc2xpZGVyc1xuXHRsZXQgcHJvamVjdFNsaWRlciA9IFwiLnByb2plY3RfX2Nhcm91c2VsXCI7XG5cdGxldCBwcm9qZWN0TGVmdEFycm93ID0gXCIjcHJvamVjdF9fYXJyb3ctLWxlZnRcIjtcblx0bGV0IHByb2plY3RSaWdodEFycm93ID0gXCIjcHJvamVjdF9fYXJyb3ctLXJpZ2h0XCI7XG5cdGlmIChwcm9qZWN0U2xpZGVyKSB7XG5cdFx0c2V0dXBTbGlkZXJzKHByb2plY3RTbGlkZXIsIHByb2plY3RMZWZ0QXJyb3csIHByb2plY3RSaWdodEFycm93LCBmYWxzZSk7XG5cdH1cblxuXHQvLyBmb3IgcHJvamVjdCByZXNlYXJjaCBzbGlkZXJzXG5cdGxldCByZXNlYXJjaFNsaWRlciA9IFwiLnJlc2VhcmNoX19jYXJvdXNlbFwiO1xuXHRsZXQgcmVzZWFyY2hMZWZ0QXJyb3cgPSBcIiNyZXNlYXJjaF9fYXJyb3ctLWxlZnRcIjtcblx0bGV0IHJlc2VhcmNoUmlnaHRBcnJvdyA9IFwiI3Jlc2VhcmNoX19hcnJvdy0tcmlnaHRcIjtcblx0aWYgKHJlc2VhcmNoU2xpZGVyKSB7XG5cdFx0c2V0dXBTbGlkZXJzKHJlc2VhcmNoU2xpZGVyLCByZXNlYXJjaExlZnRBcnJvdywgcmVzZWFyY2hSaWdodEFycm93LCB0cnVlKTtcblx0fVxuXG5cdGxldCBwZXJzb24gPSAkKFwiLnBlcnNvbl9fc2hvd1wiKTtcblx0aWYgKHBlcnNvbikge1xuXHRcdHRvZ2dsZUJpb3MocGVyc29uLCBwZW9wbGVNYXNvbnJ5KTtcblx0fVxuXG5cdC8vICQoXCIuY2Fyb3VzZWxfX2ltYWdlLWxvYWRlclwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcblx0Ly8gXHRsZXQgY2Fyb3VzZWxJbWFnZSA9ICQodGhpcyk7XG5cdC8vIFx0Y2Fyb3VzZWxJbWFnZS5pbWFnZXNMb2FkZWQoZnVuY3Rpb24gKCkge1xuXHQvLyBcdFx0Y2Fyb3VzZWxJbWFnZS5hZGRDbGFzcyhcInNob3dcIik7XG5cdC8vIFx0fSk7XG5cdC8vIH0pO1xufSk7XG4iXSwibmFtZXMiOlsid2luZG93IiwiZmFjdG9yeSIsImRlZmluZSIsImFtZCIsIm1vZHVsZSIsImV4cG9ydHMiLCJtYXRjaGVzU2VsZWN0b3IiLCJtYXRjaGVzTWV0aG9kIiwiRWxlbVByb3RvIiwiRWxlbWVudCIsInByb3RvdHlwZSIsIm1hdGNoZXMiLCJwcmVmaXhlcyIsImkiLCJsZW5ndGgiLCJwcmVmaXgiLCJtZXRob2QiLCJlbGVtIiwic2VsZWN0b3IiLCJnbG9iYWwiLCJFdkVtaXR0ZXIiLCJwcm90byIsIm9uIiwiZXZlbnROYW1lIiwibGlzdGVuZXIiLCJldmVudHMiLCJfZXZlbnRzIiwibGlzdGVuZXJzIiwiaW5kZXhPZiIsInB1c2giLCJvbmNlIiwib25jZUV2ZW50cyIsIl9vbmNlRXZlbnRzIiwib25jZUxpc3RlbmVycyIsIm9mZiIsImluZGV4Iiwic3BsaWNlIiwiZW1pdEV2ZW50IiwiYXJncyIsInNsaWNlIiwiaXNPbmNlIiwiYXBwbHkiLCJhbGxPZmYiLCJyZXF1aXJlIiwiZml6enlVSVV0aWxzIiwidXRpbHMiLCJleHRlbmQiLCJhIiwiYiIsInByb3AiLCJtb2R1bG8iLCJudW0iLCJkaXYiLCJhcnJheVNsaWNlIiwiQXJyYXkiLCJtYWtlQXJyYXkiLCJvYmoiLCJpc0FycmF5IiwidW5kZWZpbmVkIiwiaXNBcnJheUxpa2UiLCJjYWxsIiwicmVtb3ZlRnJvbSIsImFyeSIsImdldFBhcmVudCIsInBhcmVudE5vZGUiLCJkb2N1bWVudCIsImJvZHkiLCJnZXRRdWVyeUVsZW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiaGFuZGxlRXZlbnQiLCJldmVudCIsInR5cGUiLCJmaWx0ZXJGaW5kRWxlbWVudHMiLCJlbGVtcyIsImZmRWxlbXMiLCJmb3JFYWNoIiwiSFRNTEVsZW1lbnQiLCJjaGlsZEVsZW1zIiwicXVlcnlTZWxlY3RvckFsbCIsImRlYm91bmNlTWV0aG9kIiwiX2NsYXNzIiwibWV0aG9kTmFtZSIsInRocmVzaG9sZCIsInRpbWVvdXROYW1lIiwidGltZW91dCIsImNsZWFyVGltZW91dCIsImFyZ3VtZW50cyIsIl90aGlzIiwic2V0VGltZW91dCIsImRvY1JlYWR5IiwiY2FsbGJhY2siLCJyZWFkeVN0YXRlIiwiYWRkRXZlbnRMaXN0ZW5lciIsInRvRGFzaGVkIiwic3RyIiwicmVwbGFjZSIsIm1hdGNoIiwiJDEiLCIkMiIsInRvTG93ZXJDYXNlIiwiY29uc29sZSIsImh0bWxJbml0IiwiV2lkZ2V0Q2xhc3MiLCJuYW1lc3BhY2UiLCJkYXNoZWROYW1lc3BhY2UiLCJkYXRhQXR0ciIsImRhdGFBdHRyRWxlbXMiLCJqc0Rhc2hFbGVtcyIsImNvbmNhdCIsImRhdGFPcHRpb25zQXR0ciIsImpRdWVyeSIsImF0dHIiLCJnZXRBdHRyaWJ1dGUiLCJvcHRpb25zIiwiSlNPTiIsInBhcnNlIiwiZXJyb3IiLCJjbGFzc05hbWUiLCJpbnN0YW5jZSIsImRhdGEiLCJnZXRTaXplIiwiZ2V0U3R5bGVTaXplIiwidmFsdWUiLCJwYXJzZUZsb2F0IiwiaXNWYWxpZCIsImlzTmFOIiwibm9vcCIsImxvZ0Vycm9yIiwibWVzc2FnZSIsIm1lYXN1cmVtZW50cyIsIm1lYXN1cmVtZW50c0xlbmd0aCIsImdldFplcm9TaXplIiwic2l6ZSIsIndpZHRoIiwiaGVpZ2h0IiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0Iiwib3V0ZXJXaWR0aCIsIm91dGVySGVpZ2h0IiwibWVhc3VyZW1lbnQiLCJnZXRTdHlsZSIsInN0eWxlIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImlzU2V0dXAiLCJpc0JveFNpemVPdXRlciIsInNldHVwIiwiY3JlYXRlRWxlbWVudCIsInBhZGRpbmciLCJib3JkZXJTdHlsZSIsImJvcmRlcldpZHRoIiwiYm94U2l6aW5nIiwiZG9jdW1lbnRFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJNYXRoIiwicm91bmQiLCJyZW1vdmVDaGlsZCIsIm5vZGVUeXBlIiwiZGlzcGxheSIsIm9mZnNldFdpZHRoIiwib2Zmc2V0SGVpZ2h0IiwiaXNCb3JkZXJCb3giLCJwYWRkaW5nV2lkdGgiLCJwYWRkaW5nTGVmdCIsInBhZGRpbmdSaWdodCIsInBhZGRpbmdIZWlnaHQiLCJwYWRkaW5nVG9wIiwicGFkZGluZ0JvdHRvbSIsIm1hcmdpbldpZHRoIiwibWFyZ2luTGVmdCIsIm1hcmdpblJpZ2h0IiwibWFyZ2luSGVpZ2h0IiwibWFyZ2luVG9wIiwibWFyZ2luQm90dG9tIiwiYm9yZGVyTGVmdFdpZHRoIiwiYm9yZGVyUmlnaHRXaWR0aCIsImJvcmRlckhlaWdodCIsImJvcmRlclRvcFdpZHRoIiwiYm9yZGVyQm90dG9tV2lkdGgiLCJpc0JvcmRlckJveFNpemVPdXRlciIsInN0eWxlV2lkdGgiLCJzdHlsZUhlaWdodCIsImltYWdlc0xvYWRlZCIsIiQiLCJJbWFnZXNMb2FkZWQiLCJvbkFsd2F5cyIsInF1ZXJ5RWxlbSIsImVsZW1lbnRzIiwiT2JqZWN0IiwiYXNzaWduIiwiZ2V0SW1hZ2VzIiwianFEZWZlcnJlZCIsIkRlZmVycmVkIiwiY2hlY2siLCJiaW5kIiwiY3JlYXRlIiwiaW1hZ2VzIiwiYWRkRWxlbWVudEltYWdlcyIsImVsZW1lbnROb2RlVHlwZXMiLCJub2RlTmFtZSIsImFkZEltYWdlIiwiYmFja2dyb3VuZCIsImFkZEVsZW1lbnRCYWNrZ3JvdW5kSW1hZ2VzIiwiaW5jbHVkZXMiLCJjaGlsZEltZ3MiLCJpbWciLCJjaGlsZHJlbiIsImNoaWxkIiwicmVVUkwiLCJleGVjIiwiYmFja2dyb3VuZEltYWdlIiwidXJsIiwiYWRkQmFja2dyb3VuZCIsImxvYWRpbmdJbWFnZSIsIkxvYWRpbmdJbWFnZSIsIkJhY2tncm91bmQiLCJwcm9ncmVzc2VkQ291bnQiLCJoYXNBbnlCcm9rZW4iLCJjb21wbGV0ZSIsIm9uUHJvZ3Jlc3MiLCJpbWFnZSIsInByb2dyZXNzIiwiaXNMb2FkZWQiLCJub3RpZnkiLCJkZWJ1ZyIsImxvZyIsImlzQ29tcGxldGUiLCJqcU1ldGhvZCIsImdldElzSW1hZ2VDb21wbGV0ZSIsImNvbmZpcm0iLCJuYXR1cmFsV2lkdGgiLCJwcm94eUltYWdlIiwiSW1hZ2UiLCJjcm9zc09yaWdpbiIsInNyYyIsImN1cnJlbnRTcmMiLCJvbmxvYWQiLCJ1bmJpbmRFdmVudHMiLCJvbmVycm9yIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImVsZW1lbnQiLCJtYWtlSlF1ZXJ5UGx1Z2luIiwiZm4iLCJwcm9taXNlIiwiTWFzb25yeSIsIk91dGxheWVyIiwiY29tcGF0T3B0aW9ucyIsImZpdFdpZHRoIiwiX3Jlc2V0TGF5b3V0IiwiX2dldE1lYXN1cmVtZW50IiwibWVhc3VyZUNvbHVtbnMiLCJjb2xZcyIsImNvbHMiLCJtYXhZIiwiaG9yaXpvbnRhbENvbEluZGV4IiwiZ2V0Q29udGFpbmVyV2lkdGgiLCJjb2x1bW5XaWR0aCIsImZpcnN0SXRlbSIsIml0ZW1zIiwiZmlyc3RJdGVtRWxlbSIsImNvbnRhaW5lcldpZHRoIiwiZ3V0dGVyIiwiZXhjZXNzIiwibWF0aE1ldGhvZCIsIm1heCIsImlzRml0V2lkdGgiLCJfZ2V0T3B0aW9uIiwiY29udGFpbmVyIiwiX2dldEl0ZW1MYXlvdXRQb3NpdGlvbiIsIml0ZW0iLCJyZW1haW5kZXIiLCJjb2xTcGFuIiwibWluIiwiY29sUG9zTWV0aG9kIiwiaG9yaXpvbnRhbE9yZGVyIiwiY29sUG9zaXRpb24iLCJwb3NpdGlvbiIsIngiLCJjb2wiLCJ5Iiwic2V0SGVpZ2h0Iiwic2V0TWF4IiwiX2dldFRvcENvbFBvc2l0aW9uIiwiY29sR3JvdXAiLCJfZ2V0VG9wQ29sR3JvdXAiLCJtaW5pbXVtWSIsImdyb3VwQ291bnQiLCJfZ2V0Q29sR3JvdXBZIiwiZ3JvdXBDb2xZcyIsIl9nZXRIb3Jpem9udGFsQ29sUG9zaXRpb24iLCJpc092ZXIiLCJoYXNTaXplIiwiX21hbmFnZVN0YW1wIiwic3RhbXAiLCJzdGFtcFNpemUiLCJvZmZzZXQiLCJfZ2V0RWxlbWVudE9mZnNldCIsImlzT3JpZ2luTGVmdCIsImZpcnN0WCIsImxlZnQiLCJyaWdodCIsImxhc3RYIiwiZmlyc3RDb2wiLCJmbG9vciIsImxhc3RDb2wiLCJpc09yaWdpblRvcCIsInN0YW1wTWF4WSIsInRvcCIsImJvdHRvbSIsIl9nZXRDb250YWluZXJTaXplIiwiX2dldENvbnRhaW5lckZpdFdpZHRoIiwidW51c2VkQ29scyIsIm5lZWRzUmVzaXplTGF5b3V0IiwicHJldmlvdXNXaWR0aCIsIkl0ZW0iLCJpc0VtcHR5T2JqIiwiZG9jRWxlbVN0eWxlIiwidHJhbnNpdGlvblByb3BlcnR5IiwidHJhbnNpdGlvbiIsInRyYW5zZm9ybVByb3BlcnR5IiwidHJhbnNmb3JtIiwidHJhbnNpdGlvbkVuZEV2ZW50IiwiV2Via2l0VHJhbnNpdGlvbiIsInZlbmRvclByb3BlcnRpZXMiLCJ0cmFuc2l0aW9uRHVyYXRpb24iLCJ0cmFuc2l0aW9uRGVsYXkiLCJsYXlvdXQiLCJfY3JlYXRlIiwiY29uc3RydWN0b3IiLCJfdHJhbnNuIiwiaW5nUHJvcGVydGllcyIsImNsZWFuIiwib25FbmQiLCJjc3MiLCJlbGVtU3R5bGUiLCJzdXBwb3J0ZWRQcm9wIiwiZ2V0UG9zaXRpb24iLCJ4VmFsdWUiLCJ5VmFsdWUiLCJsYXlvdXRTaXplIiwibGF5b3V0UG9zaXRpb24iLCJ4UGFkZGluZyIsInhQcm9wZXJ0eSIsInhSZXNldFByb3BlcnR5IiwiZ2V0WFZhbHVlIiwieVBhZGRpbmciLCJ5UHJvcGVydHkiLCJ5UmVzZXRQcm9wZXJ0eSIsImdldFlWYWx1ZSIsImlzSG9yaXpvbnRhbCIsInBlcmNlbnRQb3NpdGlvbiIsIl90cmFuc2l0aW9uVG8iLCJjdXJYIiwiY3VyWSIsImRpZE5vdE1vdmUiLCJzZXRQb3NpdGlvbiIsImlzVHJhbnNpdGlvbmluZyIsInRyYW5zWCIsInRyYW5zWSIsInRyYW5zaXRpb25TdHlsZSIsImdldFRyYW5zbGF0ZSIsInRvIiwib25UcmFuc2l0aW9uRW5kIiwiaXNDbGVhbmluZyIsImdvVG8iLCJtb3ZlVG8iLCJfbm9uVHJhbnNpdGlvbiIsIl9yZW1vdmVTdHlsZXMiLCJfdHJhbnNpdGlvbiIsImZyb20iLCJoIiwiZW5hYmxlVHJhbnNpdGlvbiIsInRvRGFzaGVkQWxsIiwidHJhbnNpdGlvblByb3BzIiwiZHVyYXRpb24iLCJzdGFnZ2VyRGVsYXkiLCJvbndlYmtpdFRyYW5zaXRpb25FbmQiLCJvbnRyYW5zaXRpb25lbmQiLCJvbm90cmFuc2l0aW9uZW5kIiwiZGFzaGVkVmVuZG9yUHJvcGVydGllcyIsInRhcmdldCIsInByb3BlcnR5TmFtZSIsImRpc2FibGVUcmFuc2l0aW9uIiwicmVtb3ZlVHJhbnNpdGlvblN0eWxlcyIsImNsZWFuU3R5bGUiLCJjbGVhblRyYW5zaXRpb25TdHlsZSIsInN0YWdnZXIiLCJkZWxheSIsInJlbW92ZUVsZW0iLCJyZW1vdmUiLCJoaWRlIiwicmV2ZWFsIiwiaXNIaWRkZW4iLCJ0cmFuc2l0aW9uRW5kUHJvcGVydHkiLCJnZXRIaWRlUmV2ZWFsVHJhbnNpdGlvbkVuZFByb3BlcnR5Iiwib25SZXZlYWxUcmFuc2l0aW9uRW5kIiwiaGlkZGVuU3R5bGUiLCJ2aXNpYmxlU3R5bGUiLCJzdHlsZVByb3BlcnR5Iiwib3B0aW9uU3R5bGUiLCJvcGFjaXR5Iiwib25IaWRlVHJhbnNpdGlvbkVuZCIsImRlc3Ryb3kiLCJHVUlEIiwiaW5zdGFuY2VzIiwicXVlcnlFbGVtZW50IiwiJGVsZW1lbnQiLCJkZWZhdWx0cyIsIm9wdGlvbiIsImlkIiwib3V0bGF5ZXJHVUlEIiwiaXNJbml0TGF5b3V0IiwiY29udGFpbmVyU3R5bGUiLCJpbml0TGF5b3V0Iiwib3JpZ2luTGVmdCIsIm9yaWdpblRvcCIsInJlc2l6ZSIsInJlc2l6ZUNvbnRhaW5lciIsIm9wdHMiLCJvbGRPcHRpb24iLCJob3Jpem9udGFsIiwibGF5b3V0SW5zdGFudCIsInJlbG9hZEl0ZW1zIiwic3RhbXBzIiwiY2FuQmluZFJlc2l6ZSIsImJpbmRSZXNpemUiLCJfaXRlbWl6ZSIsIml0ZW1FbGVtcyIsIl9maWx0ZXJGaW5kSXRlbUVsZW1lbnRzIiwiaXRlbVNlbGVjdG9yIiwiZ2V0SXRlbUVsZW1lbnRzIiwibWFwIiwiX21hbmFnZVN0YW1wcyIsImlzSW5zdGFudCIsIl9pc0xheW91dEluaXRlZCIsImxheW91dEl0ZW1zIiwiX2luaXQiLCJfZ2V0SXRlbXNGb3JMYXlvdXQiLCJfbGF5b3V0SXRlbXMiLCJfcG9zdExheW91dCIsImZpbHRlciIsImlzSWdub3JlZCIsIl9lbWl0Q29tcGxldGVPbkl0ZW1zIiwicXVldWUiLCJpc0xheW91dEluc3RhbnQiLCJfcHJvY2Vzc0xheW91dFF1ZXVlIiwidXBkYXRlU3RhZ2dlciIsIl9wb3NpdGlvbkl0ZW0iLCJnZXRNaWxsaXNlY29uZHMiLCJpc1Jlc2l6aW5nQ29udGFpbmVyIiwiX3NldENvbnRhaW5lck1lYXN1cmUiLCJtZWFzdXJlIiwiaXNXaWR0aCIsImVsZW1TaXplIiwib25Db21wbGV0ZSIsImRpc3BhdGNoRXZlbnQiLCJjb3VudCIsImRvbmVDb3VudCIsInRpY2siLCJlbWl0QXJncyIsIiRldmVudCIsIkV2ZW50IiwidHJpZ2dlciIsImlnbm9yZSIsImdldEl0ZW0iLCJ1bmlnbm9yZSIsIl9maW5kIiwidW5zdGFtcCIsIl9nZXRCb3VuZGluZ1JlY3QiLCJib3VuZGluZ1JlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJfYm91bmRpbmdSZWN0IiwidGhpc1JlY3QiLCJpc1Jlc2l6ZUJvdW5kIiwidW5iaW5kUmVzaXplIiwib25yZXNpemUiLCJoYXNTaXplcyIsImFkZEl0ZW1zIiwiYXBwZW5kZWQiLCJwcmVwZW5kZWQiLCJwcmV2aW91c0l0ZW1zIiwicmV2ZWFsSXRlbUVsZW1lbnRzIiwiZ2V0SXRlbXMiLCJoaWRlSXRlbUVsZW1lbnRzIiwicmVtb3ZlSXRlbXMiLCJyZW1vdmVEYXRhIiwiTGF5b3V0Iiwic3ViY2xhc3MiLCJicmlkZ2V0IiwiUGFyZW50IiwiU3ViQ2xhc3MiLCJtc1VuaXRzIiwibXMiLCJzIiwidGltZSIsInVuaXQiLCJtdWx0IiwiU2xpY2siLCJpbnN0YW5jZVVpZCIsInNldHRpbmdzIiwiXyIsImRhdGFTZXR0aW5ncyIsImFjY2Vzc2liaWxpdHkiLCJhZGFwdGl2ZUhlaWdodCIsImFwcGVuZEFycm93cyIsImFwcGVuZERvdHMiLCJhcnJvd3MiLCJhc05hdkZvciIsInByZXZBcnJvdyIsIm5leHRBcnJvdyIsImF1dG9wbGF5IiwiYXV0b3BsYXlTcGVlZCIsImNlbnRlck1vZGUiLCJjZW50ZXJQYWRkaW5nIiwiY3NzRWFzZSIsImN1c3RvbVBhZ2luZyIsInNsaWRlciIsInRleHQiLCJkb3RzIiwiZG90c0NsYXNzIiwiZHJhZ2dhYmxlIiwiZWFzaW5nIiwiZWRnZUZyaWN0aW9uIiwiZmFkZSIsImZvY3VzT25TZWxlY3QiLCJmb2N1c09uQ2hhbmdlIiwiaW5maW5pdGUiLCJpbml0aWFsU2xpZGUiLCJsYXp5TG9hZCIsIm1vYmlsZUZpcnN0IiwicGF1c2VPbkhvdmVyIiwicGF1c2VPbkZvY3VzIiwicGF1c2VPbkRvdHNIb3ZlciIsInJlc3BvbmRUbyIsInJlc3BvbnNpdmUiLCJyb3dzIiwicnRsIiwic2xpZGUiLCJzbGlkZXNQZXJSb3ciLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsInNwZWVkIiwic3dpcGUiLCJzd2lwZVRvU2xpZGUiLCJ0b3VjaE1vdmUiLCJ0b3VjaFRocmVzaG9sZCIsInVzZUNTUyIsInVzZVRyYW5zZm9ybSIsInZhcmlhYmxlV2lkdGgiLCJ2ZXJ0aWNhbCIsInZlcnRpY2FsU3dpcGluZyIsIndhaXRGb3JBbmltYXRlIiwiekluZGV4IiwiaW5pdGlhbHMiLCJhbmltYXRpbmciLCJkcmFnZ2luZyIsImF1dG9QbGF5VGltZXIiLCJjdXJyZW50RGlyZWN0aW9uIiwiY3VycmVudExlZnQiLCJjdXJyZW50U2xpZGUiLCJkaXJlY3Rpb24iLCIkZG90cyIsImxpc3RXaWR0aCIsImxpc3RIZWlnaHQiLCJsb2FkSW5kZXgiLCIkbmV4dEFycm93IiwiJHByZXZBcnJvdyIsInNjcm9sbGluZyIsInNsaWRlQ291bnQiLCJzbGlkZVdpZHRoIiwiJHNsaWRlVHJhY2siLCIkc2xpZGVzIiwic2xpZGluZyIsInNsaWRlT2Zmc2V0Iiwic3dpcGVMZWZ0Iiwic3dpcGluZyIsIiRsaXN0IiwidG91Y2hPYmplY3QiLCJ0cmFuc2Zvcm1zRW5hYmxlZCIsInVuc2xpY2tlZCIsImFjdGl2ZUJyZWFrcG9pbnQiLCJhbmltVHlwZSIsImFuaW1Qcm9wIiwiYnJlYWtwb2ludHMiLCJicmVha3BvaW50U2V0dGluZ3MiLCJjc3NUcmFuc2l0aW9ucyIsImZvY3Vzc2VkIiwiaW50ZXJydXB0ZWQiLCJoaWRkZW4iLCJwYXVzZWQiLCJwb3NpdGlvblByb3AiLCJyb3dDb3VudCIsInNob3VsZENsaWNrIiwiJHNsaWRlciIsIiRzbGlkZXNDYWNoZSIsInRyYW5zZm9ybVR5cGUiLCJ0cmFuc2l0aW9uVHlwZSIsInZpc2liaWxpdHlDaGFuZ2UiLCJ3aW5kb3dXaWR0aCIsIndpbmRvd1RpbWVyIiwib3JpZ2luYWxTZXR0aW5ncyIsIm1vekhpZGRlbiIsIndlYmtpdEhpZGRlbiIsImF1dG9QbGF5IiwicHJveHkiLCJhdXRvUGxheUNsZWFyIiwiYXV0b1BsYXlJdGVyYXRvciIsImNoYW5nZVNsaWRlIiwiY2xpY2tIYW5kbGVyIiwic2VsZWN0SGFuZGxlciIsInN3aXBlSGFuZGxlciIsImRyYWdIYW5kbGVyIiwia2V5SGFuZGxlciIsImh0bWxFeHByIiwicmVnaXN0ZXJCcmVha3BvaW50cyIsImluaXQiLCJhY3RpdmF0ZUFEQSIsImZpbmQiLCJhZGRTbGlkZSIsInNsaWNrQWRkIiwibWFya3VwIiwiYWRkQmVmb3JlIiwidW5sb2FkIiwiYXBwZW5kVG8iLCJpbnNlcnRCZWZvcmUiLCJlcSIsImluc2VydEFmdGVyIiwicHJlcGVuZFRvIiwiZGV0YWNoIiwiYXBwZW5kIiwiZWFjaCIsInJlaW5pdCIsImFuaW1hdGVIZWlnaHQiLCJ0YXJnZXRIZWlnaHQiLCJhbmltYXRlIiwiYW5pbWF0ZVNsaWRlIiwidGFyZ2V0TGVmdCIsImFuaW1Qcm9wcyIsImFuaW1TdGFydCIsInN0ZXAiLCJub3ciLCJjZWlsIiwiYXBwbHlUcmFuc2l0aW9uIiwiZ2V0TmF2VGFyZ2V0Iiwibm90Iiwic2xpY2siLCJzbGlkZUhhbmRsZXIiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJzbGlkZVRvIiwiYnVpbGRBcnJvd3MiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwicmVtb3ZlQXR0ciIsInRlc3QiLCJhZGQiLCJidWlsZERvdHMiLCJkb3QiLCJnZXREb3RDb3VudCIsImZpcnN0IiwiYnVpbGRPdXQiLCJ3cmFwQWxsIiwicGFyZW50Iiwid3JhcCIsInNldHVwSW5maW5pdGUiLCJ1cGRhdGVEb3RzIiwic2V0U2xpZGVDbGFzc2VzIiwiYnVpbGRSb3dzIiwiYyIsIm5ld1NsaWRlcyIsIm51bU9mU2xpZGVzIiwib3JpZ2luYWxTbGlkZXMiLCJzbGlkZXNQZXJTZWN0aW9uIiwiY3JlYXRlRG9jdW1lbnRGcmFnbWVudCIsInJvdyIsImdldCIsImVtcHR5IiwiY2hlY2tSZXNwb25zaXZlIiwiaW5pdGlhbCIsImZvcmNlVXBkYXRlIiwiYnJlYWtwb2ludCIsInRhcmdldEJyZWFrcG9pbnQiLCJyZXNwb25kVG9XaWR0aCIsInRyaWdnZXJCcmVha3BvaW50Iiwic2xpZGVyV2lkdGgiLCJoYXNPd25Qcm9wZXJ0eSIsInVuc2xpY2siLCJyZWZyZXNoIiwiZG9udEFuaW1hdGUiLCIkdGFyZ2V0IiwiY3VycmVudFRhcmdldCIsImluZGV4T2Zmc2V0IiwidW5ldmVuT2Zmc2V0IiwiaXMiLCJwcmV2ZW50RGVmYXVsdCIsImNsb3Nlc3QiLCJjaGVja05hdmlnYWJsZSIsIm5hdmlnYWJsZXMiLCJwcmV2TmF2aWdhYmxlIiwiZ2V0TmF2aWdhYmxlSW5kZXhlcyIsIm4iLCJjbGVhblVwRXZlbnRzIiwiaW50ZXJydXB0IiwidmlzaWJpbGl0eSIsImNsZWFuVXBTbGlkZUV2ZW50cyIsIm9yaWVudGF0aW9uQ2hhbmdlIiwiY2xlYW5VcFJvd3MiLCJzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24iLCJzdG9wUHJvcGFnYXRpb24iLCJmYWRlU2xpZGUiLCJzbGlkZUluZGV4IiwiZmFkZVNsaWRlT3V0IiwiZmlsdGVyU2xpZGVzIiwic2xpY2tGaWx0ZXIiLCJmb2N1c0hhbmRsZXIiLCIkc2YiLCJnZXRDdXJyZW50Iiwic2xpY2tDdXJyZW50U2xpZGUiLCJicmVha1BvaW50IiwiY291bnRlciIsInBhZ2VyUXR5IiwiZ2V0TGVmdCIsInZlcnRpY2FsSGVpZ2h0IiwidmVydGljYWxPZmZzZXQiLCJ0YXJnZXRTbGlkZSIsImNvZWYiLCJvZmZzZXRMZWZ0IiwiZ2V0T3B0aW9uIiwic2xpY2tHZXRPcHRpb24iLCJpbmRleGVzIiwiZ2V0U2xpY2siLCJnZXRTbGlkZUNvdW50Iiwic2xpZGVzVHJhdmVyc2VkIiwic3dpcGVkU2xpZGUiLCJjZW50ZXJPZmZzZXQiLCJhYnMiLCJzbGlja0dvVG8iLCJwYXJzZUludCIsImNyZWF0aW9uIiwiaGFzQ2xhc3MiLCJzZXRQcm9wcyIsInN0YXJ0TG9hZCIsImxvYWRTbGlkZXIiLCJpbml0aWFsaXplRXZlbnRzIiwidXBkYXRlQXJyb3dzIiwiaW5pdEFEQSIsIm51bURvdEdyb3VwcyIsInRhYkNvbnRyb2xJbmRleGVzIiwidmFsIiwic2xpZGVDb250cm9sSW5kZXgiLCJhcmlhQnV0dG9uQ29udHJvbCIsIm1hcHBlZFNsaWRlSW5kZXgiLCJlbmQiLCJpbml0QXJyb3dFdmVudHMiLCJpbml0RG90RXZlbnRzIiwiaW5pdFNsaWRlRXZlbnRzIiwiYWN0aW9uIiwiaW5pdFVJIiwic2hvdyIsInRhZ05hbWUiLCJrZXlDb2RlIiwibG9hZFJhbmdlIiwiY2xvbmVSYW5nZSIsInJhbmdlU3RhcnQiLCJyYW5nZUVuZCIsImxvYWRJbWFnZXMiLCJpbWFnZXNTY29wZSIsImltYWdlU291cmNlIiwiaW1hZ2VTcmNTZXQiLCJpbWFnZVNpemVzIiwiaW1hZ2VUb0xvYWQiLCJwcmV2U2xpZGUiLCJuZXh0U2xpZGUiLCJwcm9ncmVzc2l2ZUxhenlMb2FkIiwibmV4dCIsInNsaWNrTmV4dCIsInBhdXNlIiwic2xpY2tQYXVzZSIsInBsYXkiLCJzbGlja1BsYXkiLCJwb3N0U2xpZGUiLCIkY3VycmVudFNsaWRlIiwiZm9jdXMiLCJwcmV2Iiwic2xpY2tQcmV2IiwidHJ5Q291bnQiLCIkaW1nc1RvTG9hZCIsImluaXRpYWxpemluZyIsImxhc3RWaXNpYmxlSW5kZXgiLCJjdXJyZW50QnJlYWtwb2ludCIsImwiLCJyZXNwb25zaXZlU2V0dGluZ3MiLCJzb3J0Iiwid2luZG93RGVsYXkiLCJyZW1vdmVTbGlkZSIsInNsaWNrUmVtb3ZlIiwicmVtb3ZlQmVmb3JlIiwicmVtb3ZlQWxsIiwic2V0Q1NTIiwicG9zaXRpb25Qcm9wcyIsInNldERpbWVuc2lvbnMiLCJzZXRGYWRlIiwic2V0T3B0aW9uIiwic2xpY2tTZXRPcHRpb24iLCJvcHQiLCJib2R5U3R5bGUiLCJNb3pUcmFuc2l0aW9uIiwibXNUcmFuc2l0aW9uIiwiT1RyYW5zZm9ybSIsInBlcnNwZWN0aXZlUHJvcGVydHkiLCJ3ZWJraXRQZXJzcGVjdGl2ZSIsIk1velRyYW5zZm9ybSIsIk1velBlcnNwZWN0aXZlIiwid2Via2l0VHJhbnNmb3JtIiwibXNUcmFuc2Zvcm0iLCJhbGxTbGlkZXMiLCJldmVuQ29lZiIsImluZmluaXRlQ291bnQiLCJjbG9uZSIsInRvZ2dsZSIsInRhcmdldEVsZW1lbnQiLCJwYXJlbnRzIiwic3luYyIsImFuaW1TbGlkZSIsIm9sZFNsaWRlIiwic2xpZGVMZWZ0IiwibmF2VGFyZ2V0Iiwic3dpcGVEaXJlY3Rpb24iLCJ4RGlzdCIsInlEaXN0IiwiciIsInN3aXBlQW5nbGUiLCJzdGFydFgiLCJzdGFydFkiLCJhdGFuMiIsIlBJIiwic3dpcGVFbmQiLCJzd2lwZUxlbmd0aCIsImVkZ2VIaXQiLCJtaW5Td2lwZSIsImZpbmdlckNvdW50Iiwib3JpZ2luYWxFdmVudCIsInRvdWNoZXMiLCJzd2lwZVN0YXJ0Iiwic3dpcGVNb3ZlIiwiZWRnZVdhc0hpdCIsImN1ckxlZnQiLCJwb3NpdGlvbk9mZnNldCIsInZlcnRpY2FsU3dpcGVMZW5ndGgiLCJwYWdlWCIsImNsaWVudFgiLCJwYWdlWSIsImNsaWVudFkiLCJzcXJ0IiwicG93IiwidW5maWx0ZXJTbGlkZXMiLCJzbGlja1VuZmlsdGVyIiwiZnJvbUJyZWFrcG9pbnQiLCJyZXQiLCJzZXR1cE1hc29ucnkiLCJzaXplciIsInNwYWNlciIsIm5ld01hc29ucnkiLCJtZW51T3BlbiIsIm1lbnVDbG9zZSIsIm1lbnUiLCJtZW51TG9nbyIsInBhZ2VUaXRsZSIsInNob3dDbGFzcyIsIm9wZW5NZW51IiwiY2xvc2VNZW51IiwiZSIsImtleSIsInRvZ2dsZUJpb3MiLCJwZXJzb24iLCJtYXNvbnJ5T2JqZWN0IiwidG9nZ2xlQ2xhc3MiLCJzaWJsaW5ncyIsInNldHVwU2xpZGVycyIsInNldHVwVGFicyIsImNhcm91c2VsSXRlbSIsImFycm93TGVmdElkIiwiYXJyb3dSaWdodElkIiwiYXJyb3dMZWZ0T2JqZWN0IiwiYXJyb3dSaWdodE9iamVjdCIsImNhcm91c2VsU2l6ZSIsImJ1dHRvbnMiLCJjb250ZW50IiwidGFiQnV0dG9ucyIsInRhYkNvbnRlbnQiLCJ0YWJCdXR0b24iLCJ0YWJCdXR0b25EYXRhIiwidGFiQ29udGVudERhdGEiLCJyYW5kb21pemUiLCJyYW5kb20iLCJwcm9qZWN0R3JpZCIsInByb2plY3RJdGVtIiwicHJvamVjdFNpemVyIiwicHJvamVjdFNwYWNlciIsIm9wcG9ydHVuaXR5R3JpZCIsIm9wcG9ydHVuaXR5SXRlbSIsIm9wcG9ydHVuaXR5U3BhY2VyIiwicGVyc29uR3JpZCIsInBlcnNvbkl0ZW0iLCJwZXJzb25TaXplciIsInBlcnNvblNwYWNlciIsInBlb3BsZU1hc29ucnkiLCJsb2NhdGlvbiIsImhhc2giLCJidXR0b25Ub0FjdGl2YXRlIiwiZGVsaXZlcmFibGVCdXR0b25zIiwiZGVsaXZlcmFibGVDb250ZW50IiwicHJvamVjdFNsaWRlciIsInByb2plY3RMZWZ0QXJyb3ciLCJwcm9qZWN0UmlnaHRBcnJvdyIsInJlc2VhcmNoU2xpZGVyIiwicmVzZWFyY2hMZWZ0QXJyb3ciLCJyZXNlYXJjaFJpZ2h0QXJyb3ciXSwic291cmNlUm9vdCI6IiJ9