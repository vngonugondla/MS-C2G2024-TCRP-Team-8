"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_document";
exports.ids = ["pages/_document"];
exports.modules = {

/***/ "./src/pages/_document.tsx":
/*!*********************************!*\
  !*** ./src/pages/_document.tsx ***!
  \*********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/document */ \"./node_modules/next/document.js\");\n/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_document__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var twind__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! twind */ \"twind\");\n/* harmony import */ var twind_server__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! twind/server */ \"twind/server\");\n/* harmony import */ var _twind_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../twind.config */ \"./src/twind.config.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([twind__WEBPACK_IMPORTED_MODULE_3__, twind_server__WEBPACK_IMPORTED_MODULE_4__]);\n([twind__WEBPACK_IMPORTED_MODULE_3__, twind_server__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\n\nconst sheet = (0,twind_server__WEBPACK_IMPORTED_MODULE_4__.asyncVirtualSheet)();\n(0,twind__WEBPACK_IMPORTED_MODULE_3__.setup)({\n    ..._twind_config__WEBPACK_IMPORTED_MODULE_5__[\"default\"],\n    sheet\n});\nclass MyDocument extends (next_document__WEBPACK_IMPORTED_MODULE_2___default()) {\n    static async getInitialProps(ctx) {\n        sheet.reset();\n        const initialProps = await next_document__WEBPACK_IMPORTED_MODULE_2___default().getInitialProps(ctx);\n        const { id, textContent } = (0,twind_server__WEBPACK_IMPORTED_MODULE_4__.getStyleTagProperties)(sheet);\n        const styleProps = {\n            id,\n            key: id,\n            dangerouslySetInnerHTML: {\n                __html: textContent\n            }\n        };\n        return {\n            ...initialProps,\n            styles: [\n                // eslint-disable-next-line @typescript-eslint/ban-ts-comment\n                // @ts-ignore\n                ...initialProps.styles,\n                /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.createElement(`style`, styleProps)\n            ]\n        };\n    }\n    render() {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_2__.Html, {\n            lang: \"en\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_2__.Head, {\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"script\", {\n                        async: true,\n                        src: \"https://scripts.simpleanalyticscdn.com/latest.js\"\n                    }, void 0, false, {\n                        fileName: \"/Users/Viresh/Desktop/Fall 2024/MSC4G/MS-C2G2024-TCRP-Team-8/app/frontend/src/pages/_document.tsx\",\n                        lineNumber: 39,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/Users/Viresh/Desktop/Fall 2024/MSC4G/MS-C2G2024-TCRP-Team-8/app/frontend/src/pages/_document.tsx\",\n                    lineNumber: 38,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"body\", {\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_2__.Main, {}, void 0, false, {\n                            fileName: \"/Users/Viresh/Desktop/Fall 2024/MSC4G/MS-C2G2024-TCRP-Team-8/app/frontend/src/pages/_document.tsx\",\n                            lineNumber: 42,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_2__.NextScript, {}, void 0, false, {\n                            fileName: \"/Users/Viresh/Desktop/Fall 2024/MSC4G/MS-C2G2024-TCRP-Team-8/app/frontend/src/pages/_document.tsx\",\n                            lineNumber: 43,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/Viresh/Desktop/Fall 2024/MSC4G/MS-C2G2024-TCRP-Team-8/app/frontend/src/pages/_document.tsx\",\n                    lineNumber: 41,\n                    columnNumber: 9\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/Viresh/Desktop/Fall 2024/MSC4G/MS-C2G2024-TCRP-Team-8/app/frontend/src/pages/_document.tsx\",\n            lineNumber: 37,\n            columnNumber: 7\n        }, this);\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyDocument);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvX2RvY3VtZW50LnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUErQjtBQUN5RDtBQUMxRDtBQUMwQztBQUM5QjtBQUUxQyxNQUFNVSxRQUFRSCwrREFBaUJBO0FBRS9CRCw0Q0FBS0EsQ0FBQztJQUFFLEdBQUdHLHFEQUFXO0lBQUVDO0FBQU07QUFFOUIsTUFBTUMsbUJBQW1CVixzREFBUUE7SUFDL0IsYUFBYVcsZ0JBQWdCQyxHQUFvQixFQUFFO1FBQ2pESCxNQUFNSSxLQUFLO1FBQ1gsTUFBTUMsZUFBZSxNQUFNZCxvRUFBd0IsQ0FBQ1k7UUFDcEQsTUFBTSxFQUFFRyxFQUFFLEVBQUVDLFdBQVcsRUFBRSxHQUFHVCxtRUFBcUJBLENBQUNFO1FBQ2xELE1BQU1RLGFBQWE7WUFDakJGO1lBQ0FHLEtBQUtIO1lBQ0xJLHlCQUF5QjtnQkFDdkJDLFFBQVFKO1lBQ1Y7UUFDRjtRQUVBLE9BQU87WUFDTCxHQUFHRixZQUFZO1lBQ2ZPLFFBQVE7Z0JBQ04sNkRBQTZEO2dCQUM3RCxhQUFhO21CQUNWUCxhQUFhTyxNQUFNOzhCQUN0QnRCLGdEQUFtQixDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUVrQjthQUM5QjtRQUNIO0lBQ0Y7SUFFQU0sU0FBUztRQUNQLHFCQUNFLDhEQUFDdEIsK0NBQUlBO1lBQUN1QixNQUFLOzs4QkFDVCw4REFBQ3RCLCtDQUFJQTs4QkFDSCw0RUFBQ3VCO3dCQUFPQyxLQUFLO3dCQUFDQyxLQUFJOzs7Ozs7Ozs7Ozs4QkFFcEIsOERBQUNDOztzQ0FDQyw4REFBQ3pCLCtDQUFJQTs7Ozs7c0NBQ0wsOERBQUNDLHFEQUFVQTs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFJbkI7QUFDRjtBQUVBLGlFQUFlTSxVQUFVQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3RhcnRkLXRoZW1lLy4vc3JjL3BhZ2VzL19kb2N1bWVudC50c3g/MTg4ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgRG9jdW1lbnQsIHsgRG9jdW1lbnRDb250ZXh0LCBIdG1sLCBIZWFkLCBNYWluLCBOZXh0U2NyaXB0IH0gZnJvbSAnbmV4dC9kb2N1bWVudCc7XG5pbXBvcnQgeyBzZXR1cCB9IGZyb20gJ3R3aW5kJztcbmltcG9ydCB7IGFzeW5jVmlydHVhbFNoZWV0LCBnZXRTdHlsZVRhZ1Byb3BlcnRpZXMgfSBmcm9tICd0d2luZC9zZXJ2ZXInO1xuaW1wb3J0IHR3aW5kQ29uZmlnIGZyb20gJy4uL3R3aW5kLmNvbmZpZyc7XG5cbmNvbnN0IHNoZWV0ID0gYXN5bmNWaXJ0dWFsU2hlZXQoKTtcblxuc2V0dXAoeyAuLi50d2luZENvbmZpZywgc2hlZXQgfSk7XG5cbmNsYXNzIE15RG9jdW1lbnQgZXh0ZW5kcyBEb2N1bWVudCB7XG4gIHN0YXRpYyBhc3luYyBnZXRJbml0aWFsUHJvcHMoY3R4OiBEb2N1bWVudENvbnRleHQpIHtcbiAgICBzaGVldC5yZXNldCgpO1xuICAgIGNvbnN0IGluaXRpYWxQcm9wcyA9IGF3YWl0IERvY3VtZW50LmdldEluaXRpYWxQcm9wcyhjdHgpO1xuICAgIGNvbnN0IHsgaWQsIHRleHRDb250ZW50IH0gPSBnZXRTdHlsZVRhZ1Byb3BlcnRpZXMoc2hlZXQpO1xuICAgIGNvbnN0IHN0eWxlUHJvcHMgPSB7XG4gICAgICBpZCxcbiAgICAgIGtleTogaWQsXG4gICAgICBkYW5nZXJvdXNseVNldElubmVySFRNTDoge1xuICAgICAgICBfX2h0bWw6IHRleHRDb250ZW50LFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmluaXRpYWxQcm9wcyxcbiAgICAgIHN0eWxlczogW1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10cy1jb21tZW50XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgLi4uaW5pdGlhbFByb3BzLnN0eWxlcyxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChgc3R5bGVgLCBzdHlsZVByb3BzKSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPEh0bWwgbGFuZz1cImVuXCI+XG4gICAgICAgIDxIZWFkPlxuICAgICAgICAgIDxzY3JpcHQgYXN5bmMgc3JjPVwiaHR0cHM6Ly9zY3JpcHRzLnNpbXBsZWFuYWx5dGljc2Nkbi5jb20vbGF0ZXN0LmpzXCIgLz5cbiAgICAgICAgPC9IZWFkPlxuICAgICAgICA8Ym9keT5cbiAgICAgICAgICA8TWFpbiAvPlxuICAgICAgICAgIDxOZXh0U2NyaXB0IC8+XG4gICAgICAgIDwvYm9keT5cbiAgICAgIDwvSHRtbD5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE15RG9jdW1lbnQ7XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJEb2N1bWVudCIsIkh0bWwiLCJIZWFkIiwiTWFpbiIsIk5leHRTY3JpcHQiLCJzZXR1cCIsImFzeW5jVmlydHVhbFNoZWV0IiwiZ2V0U3R5bGVUYWdQcm9wZXJ0aWVzIiwidHdpbmRDb25maWciLCJzaGVldCIsIk15RG9jdW1lbnQiLCJnZXRJbml0aWFsUHJvcHMiLCJjdHgiLCJyZXNldCIsImluaXRpYWxQcm9wcyIsImlkIiwidGV4dENvbnRlbnQiLCJzdHlsZVByb3BzIiwia2V5IiwiZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwiLCJfX2h0bWwiLCJzdHlsZXMiLCJjcmVhdGVFbGVtZW50IiwicmVuZGVyIiwibGFuZyIsInNjcmlwdCIsImFzeW5jIiwic3JjIiwiYm9keSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/pages/_document.tsx\n");

/***/ }),

/***/ "./src/twind.config.js":
/*!*****************************!*\
  !*** ./src/twind.config.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n    theme: {\n        extend: {\n            colors: {\n                lightGrey: \"rgba(234, 234, 232, 255)\",\n                maroon: \"rgba(110, 63, 99, 255)\",\n                lightPurple: \"rgb(229, 204, 255)\",\n                lunarGrey: \"rgba(183, 201, 211, 255)\"\n            },\n            fontFamily: {\n                sans: `Inter, ui-sans-serif, system-ui, -apple-system,\n            BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\",\n            sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\"`\n            }\n        }\n    }\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdHdpbmQuY29uZmlnLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQSxpRUFBZTtJQUNiQSxPQUFPO1FBQ0xDLFFBQVE7WUFDTkMsUUFBUTtnQkFDTkMsV0FBVztnQkFDWEMsUUFBUTtnQkFDUkMsYUFBYTtnQkFDYkMsV0FBVztZQUNiO1lBQ0FDLFlBQVk7Z0JBQ1ZDLE1BQU0sQ0FBQzs7b0dBRXFGLENBQUM7WUFDL0Y7UUFDRjtJQUNGO0FBQ0YsQ0FBQyxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3RhcnRkLXRoZW1lLy4vc3JjL3R3aW5kLmNvbmZpZy5qcz8wMDJmIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcbiAgdGhlbWU6IHtcbiAgICBleHRlbmQ6IHtcbiAgICAgIGNvbG9yczoge1xuICAgICAgICBsaWdodEdyZXk6ICdyZ2JhKDIzNCwgMjM0LCAyMzIsIDI1NSknLCAvLyBUYW4vTGlnaHQgR3JleVxuICAgICAgICBtYXJvb246ICdyZ2JhKDExMCwgNjMsIDk5LCAyNTUpJywgLy8gTWFyb29uXG4gICAgICAgIGxpZ2h0UHVycGxlOiAncmdiKDIyOSwgMjA0LCAyNTUpJywgLy8gTGlnaHQgUHVycGxlXG4gICAgICAgIGx1bmFyR3JleTogJ3JnYmEoMTgzLCAyMDEsIDIxMSwgMjU1KScsIC8vIEx1bmFyIEdyZXlcbiAgICAgIH0sXG4gICAgICBmb250RmFtaWx5OiB7XG4gICAgICAgIHNhbnM6IGBJbnRlciwgdWktc2Fucy1zZXJpZiwgc3lzdGVtLXVpLCAtYXBwbGUtc3lzdGVtLFxuICAgICAgICAgICAgQmxpbmtNYWNTeXN0ZW1Gb250LCBcIlNlZ29lIFVJXCIsIFJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBBcmlhbCwgXCJOb3RvIFNhbnNcIixcbiAgICAgICAgICAgIHNhbnMtc2VyaWYsIFwiQXBwbGUgQ29sb3IgRW1vamlcIiwgXCJTZWdvZSBVSSBFbW9qaVwiLCBcIlNlZ29lIFVJIFN5bWJvbFwiLCBcIk5vdG8gQ29sb3IgRW1vamlcImAsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59O1xuIl0sIm5hbWVzIjpbInRoZW1lIiwiZXh0ZW5kIiwiY29sb3JzIiwibGlnaHRHcmV5IiwibWFyb29uIiwibGlnaHRQdXJwbGUiLCJsdW5hckdyZXkiLCJmb250RmFtaWx5Iiwic2FucyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/twind.config.js\n");

/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "twind":
/*!************************!*\
  !*** external "twind" ***!
  \************************/
/***/ ((module) => {

module.exports = import("twind");;

/***/ }),

/***/ "twind/server":
/*!*******************************!*\
  !*** external "twind/server" ***!
  \*******************************/
/***/ ((module) => {

module.exports = import("twind/server");;

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("./src/pages/_document.tsx")));
module.exports = __webpack_exports__;

})();