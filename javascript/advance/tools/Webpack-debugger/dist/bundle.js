
 (function(modules) {  	 	var installedModules = {};

 	 	function __webpack_require__(moduleId) {

 		 		if(installedModules[moduleId]) {
 			return installedModules[moduleId].exports;
 		}
 		 		var module = installedModules[moduleId] = {
 			i: moduleId,
 			l: false,
 			exports: {}
 		};

 		 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

 		 		module.l = true;

 		 		return module.exports;
 	}


 	 	__webpack_require__.m = modules;

 	 	__webpack_require__.c = installedModules;

 	 	__webpack_require__.d = function(exports, name, getter) {
 		if(!__webpack_require__.o(exports, name)) {
 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
 		}
 	};

 	 	__webpack_require__.r = function(exports) {
 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
 		}
 		Object.defineProperty(exports, '__esModule', { value: true });
 	};

 	 	 	 	 	 	__webpack_require__.t = function(value, mode) {
 		if(mode & 1) value = __webpack_require__(value);
 		if(mode & 8) return value;
 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
 		var ns = Object.create(null);
 		__webpack_require__.r(ns);
 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
 		return ns;
 	};

 	 	__webpack_require__.n = function(module) {
 		var getter = module && module.__esModule ?
 			function getDefault() { return module['default']; } :
 			function getModuleExports() { return module; };
 		__webpack_require__.d(getter, 'a', getter);
 		return getter;
 	};

 	 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

 	 	__webpack_require__.p = "";


 	 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
 })

 ({

 "./src/demo.js":


 (function(module, exports) {

eval("\r\n// import './index.css'\r\n// import $ from 'jquery'\r\n\r\nconst demoAdd =(a, b) => {\r\n    return a + b\r\n}\r\nmodule.exports = demoAdd\n\n//# sourceURL=webpack:///./src/demo.js?");

 }),

 "./src/index.js":


 (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _demo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./demo */ \"./src/demo.js\");\n/* harmony import */ var _demo__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_demo__WEBPACK_IMPORTED_MODULE_0__);\n\r\n// import './index.css'\r\n// import $ from 'jquery'\r\n\r\nlet a = 11;\r\nconsole.log(a)\r\nconsole.log(\"development\")\r\nconsole.log(_demo__WEBPACK_IMPORTED_MODULE_0___default()(1,2))\r\nif (false) {}\r\nconsole.log(\"5fa3b9\")\r\nif (true) {\r\n  console.log('Production log');\r\n}\r\n\r\n// console.log($)\n\n//# sourceURL=webpack:///./src/index.js?");

 })

 });