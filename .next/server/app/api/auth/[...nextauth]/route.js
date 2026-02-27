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
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=D%3A%5C1.Portafolio%5CtesteIA%5CNew-test-repo-%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5C1.Portafolio%5CtesteIA%5CNew-test-repo-&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=D%3A%5C1.Portafolio%5CtesteIA%5CNew-test-repo-%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5C1.Portafolio%5CtesteIA%5CNew-test-repo-&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var D_1_Portafolio_testeIA_New_test_repo_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/[...nextauth]/route.ts */ \"(rsc)/./app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"D:\\\\1.Portafolio\\\\testeIA\\\\New-test-repo-\\\\app\\\\api\\\\auth\\\\[...nextauth]\\\\route.ts\",\n    nextConfigOutput,\n    userland: D_1_Portafolio_testeIA_New_test_repo_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/auth/[...nextauth]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLnRzJmFwcERpcj1EJTNBJTVDMS5Qb3J0YWZvbGlvJTVDdGVzdGVJQSU1Q05ldy10ZXN0LXJlcG8tJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1EJTNBJTVDMS5Qb3J0YWZvbGlvJTVDdGVzdGVJQSU1Q05ldy10ZXN0LXJlcG8tJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUNrQztBQUMvRztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlFQUFpRTtBQUN6RTtBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ3VIOztBQUV2SCIsInNvdXJjZXMiOlsid2VicGFjazovL2ZyZWVsYW5jZS1tYXJrZXRwbGFjZS8/OTY5NiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJEOlxcXFwxLlBvcnRhZm9saW9cXFxcdGVzdGVJQVxcXFxOZXctdGVzdC1yZXBvLVxcXFxhcHBcXFxcYXBpXFxcXGF1dGhcXFxcWy4uLm5leHRhdXRoXVxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJEOlxcXFwxLlBvcnRhZm9saW9cXFxcdGVzdGVJQVxcXFxOZXctdGVzdC1yZXBvLVxcXFxhcHBcXFxcYXBpXFxcXGF1dGhcXFxcWy4uLm5leHRhdXRoXVxcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCI7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHNlcnZlckhvb2tzLFxuICAgICAgICBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=D%3A%5C1.Portafolio%5CtesteIA%5CNew-test-repo-%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5C1.Portafolio%5CtesteIA%5CNew-test-repo-&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/auth/[...nextauth]/route.ts":
/*!*********************************************!*\
  !*** ./app/api/auth/[...nextauth]/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n\n\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(_lib_auth__WEBPACK_IMPORTED_MODULE_1__.authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFpQztBQUNRO0FBRXpDLE1BQU1FLFVBQVVGLGdEQUFRQSxDQUFDQyxrREFBV0E7QUFFTyIsInNvdXJjZXMiOlsid2VicGFjazovL2ZyZWVsYW5jZS1tYXJrZXRwbGFjZS8uL2FwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlLnRzP2M4YTQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5leHRBdXRoIGZyb20gXCJuZXh0LWF1dGhcIjtcbmltcG9ydCB7IGF1dGhPcHRpb25zIH0gZnJvbSBcIkAvbGliL2F1dGhcIjtcblxuY29uc3QgaGFuZGxlciA9IE5leHRBdXRoKGF1dGhPcHRpb25zKTtcblxuZXhwb3J0IHsgaGFuZGxlciBhcyBHRVQsIGhhbmRsZXIgYXMgUE9TVCB9O1xuIl0sIm5hbWVzIjpbIk5leHRBdXRoIiwiYXV0aE9wdGlvbnMiLCJoYW5kbGVyIiwiR0VUIiwiUE9TVCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/google */ \"(rsc)/./node_modules/next-auth/providers/google.js\");\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db.ts\");\n/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/models/User */ \"(rsc)/./models/User.ts\");\n\n\n\n\n\n\nconst authOptions = {\n    session: {\n        strategy: \"jwt\",\n        maxAge: 7 * 24 * 60 * 60\n    },\n    providers: [\n        // ── Google OAuth ──────────────────────────────────────\n        (0,next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            clientId: process.env.GOOGLE_CLIENT_ID,\n            clientSecret: process.env.GOOGLE_CLIENT_SECRET\n        }),\n        // ── Email / Password ──────────────────────────────────\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_2__[\"default\"])({\n            name: \"credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) return null;\n                await (0,_lib_db__WEBPACK_IMPORTED_MODULE_4__.connectDB)();\n                const user = await _models_User__WEBPACK_IMPORTED_MODULE_5__.UserModel.findOne({\n                    email: credentials.email\n                }).select(\"+password\");\n                if (!user || !user.password) return null;\n                const isValid = await bcryptjs__WEBPACK_IMPORTED_MODULE_3___default().compare(credentials.password, user.password);\n                if (!isValid) return null;\n                return {\n                    id: user._id.toString(),\n                    email: user.email,\n                    name: user.name,\n                    role: user.role,\n                    image: user.avatar\n                };\n            }\n        })\n    ],\n    callbacks: {\n        // Persist role in JWT token\n        async jwt ({ token, user, account, profile }) {\n            if (user) {\n                token.role = user.role ?? \"buyer\";\n                token.id = user.id;\n            }\n            // Auto-create user from Google OAuth on first sign-in\n            if (account?.provider === \"google\" && profile) {\n                await (0,_lib_db__WEBPACK_IMPORTED_MODULE_4__.connectDB)();\n                const existing = await _models_User__WEBPACK_IMPORTED_MODULE_5__.UserModel.findOne({\n                    email: token.email\n                });\n                if (!existing) {\n                    const newUser = await _models_User__WEBPACK_IMPORTED_MODULE_5__.UserModel.create({\n                        name: token.name,\n                        email: token.email,\n                        avatar: token.picture,\n                        provider: \"google\",\n                        role: \"buyer\"\n                    });\n                    token.id = newUser._id.toString();\n                    token.role = \"buyer\";\n                } else {\n                    token.id = existing._id.toString();\n                    token.role = existing.role;\n                }\n            }\n            return token;\n        },\n        // Expose role to session (accessible in client components)\n        async session ({ session, token }) {\n            if (session.user) {\n                session.user.id = token.id;\n                session.user.role = token.role;\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/login\",\n        error: \"/login\"\n    },\n    secret: process.env.NEXTAUTH_SECRET\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (next_auth__WEBPACK_IMPORTED_MODULE_0___default()(authOptions));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFJLENBQVNRLElBQUksR0FBR0ssTUFBTUwsSUFBSTtZQUN6QztZQUNBLE9BQU96QjtRQUNUO0lBQ0Y7SUFFQXNDLE9BQU87UUFDTEMsUUFBUTtRQUNSQyxPQUFPO0lBQ1Q7SUFFQUMsUUFBUXBDLFFBQVFDLEdBQUcsQ0FBQ29DLGVBQWU7QUFDckMsRUFBRTtBQUVGLGlFQUFlakQsZ0RBQVFBLENBQUNNLFlBQVlBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mcmVlbGFuY2UtbWFya2V0cGxhY2UvLi9saWIvYXV0aC50cz9iZjdlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOZXh0QXV0aCwgeyB0eXBlIE5leHRBdXRoT3B0aW9ucyB9IGZyb20gXCJuZXh0LWF1dGhcIjtcbmltcG9ydCBHb29nbGVQcm92aWRlciBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVycy9nb29nbGVcIjtcbmltcG9ydCBDcmVkZW50aWFsc1Byb3ZpZGVyIGZyb20gXCJuZXh0LWF1dGgvcHJvdmlkZXJzL2NyZWRlbnRpYWxzXCI7XG5pbXBvcnQgYmNyeXB0IGZyb20gXCJiY3J5cHRqc1wiO1xuaW1wb3J0IHsgY29ubmVjdERCIH0gZnJvbSBcIkAvbGliL2RiXCI7XG5pbXBvcnQgeyBVc2VyTW9kZWwgfSBmcm9tIFwiQC9tb2RlbHMvVXNlclwiO1xuXG5leHBvcnQgY29uc3QgYXV0aE9wdGlvbnM6IE5leHRBdXRoT3B0aW9ucyA9IHtcbiAgc2Vzc2lvbjoge1xuICAgIHN0cmF0ZWd5OiBcImp3dFwiLFxuICAgIG1heEFnZTogNyAqIDI0ICogNjAgKiA2MCwgLy8gNyBkYXlzIOKAlCByZWZyZXNoIHRva2VuIHdpbmRvd1xuICB9LFxuXG4gIHByb3ZpZGVyczogW1xuICAgIC8vIOKUgOKUgCBHb29nbGUgT0F1dGgg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG4gICAgR29vZ2xlUHJvdmlkZXIoe1xuICAgICAgY2xpZW50SWQ6IHByb2Nlc3MuZW52LkdPT0dMRV9DTElFTlRfSUQgYXMgc3RyaW5nLFxuICAgICAgY2xpZW50U2VjcmV0OiBwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX1NFQ1JFVCBhcyBzdHJpbmcsXG4gICAgfSksXG5cbiAgICAvLyDilIDilIAgRW1haWwgLyBQYXNzd29yZCDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcbiAgICBDcmVkZW50aWFsc1Byb3ZpZGVyKHtcbiAgICAgIG5hbWU6IFwiY3JlZGVudGlhbHNcIixcbiAgICAgIGNyZWRlbnRpYWxzOiB7XG4gICAgICAgIGVtYWlsOiB7IGxhYmVsOiBcIkVtYWlsXCIsIHR5cGU6IFwiZW1haWxcIiB9LFxuICAgICAgICBwYXNzd29yZDogeyBsYWJlbDogXCJQYXNzd29yZFwiLCB0eXBlOiBcInBhc3N3b3JkXCIgfSxcbiAgICAgIH0sXG4gICAgICBhc3luYyBhdXRob3JpemUoY3JlZGVudGlhbHMpIHtcbiAgICAgICAgaWYgKCFjcmVkZW50aWFscz8uZW1haWwgfHwgIWNyZWRlbnRpYWxzPy5wYXNzd29yZCkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgYXdhaXQgY29ubmVjdERCKCk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUoeyBlbWFpbDogY3JlZGVudGlhbHMuZW1haWwgfSkuc2VsZWN0KFwiK3Bhc3N3b3JkXCIpO1xuICAgICAgIFxuXG4gICAgICAgIGlmICghdXNlciB8fCAhdXNlci5wYXNzd29yZCkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgY29uc3QgaXNWYWxpZCA9IGF3YWl0IGJjcnlwdC5jb21wYXJlKGNyZWRlbnRpYWxzLnBhc3N3b3JkLCB1c2VyLnBhc3N3b3JkKTtcbiAgICAgICAgXG4gICAgICAgIGlmICghaXNWYWxpZCkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBpZDogdXNlci5faWQudG9TdHJpbmcoKSxcbiAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcbiAgICAgICAgICBuYW1lOiB1c2VyLm5hbWUsXG4gICAgICAgICAgcm9sZTogdXNlci5yb2xlLFxuICAgICAgICAgIGltYWdlOiB1c2VyLmF2YXRhcixcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG5cbiAgY2FsbGJhY2tzOiB7XG4gICAgLy8gUGVyc2lzdCByb2xlIGluIEpXVCB0b2tlblxuICAgIGFzeW5jIGp3dCh7IHRva2VuLCB1c2VyLCBhY2NvdW50LCBwcm9maWxlIH0pIHtcbiAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgIHRva2VuLnJvbGUgPSAodXNlciBhcyBhbnkpLnJvbGUgPz8gXCJidXllclwiO1xuICAgICAgICB0b2tlbi5pZCA9IHVzZXIuaWQ7XG4gICAgICB9XG5cbiAgICAgIC8vIEF1dG8tY3JlYXRlIHVzZXIgZnJvbSBHb29nbGUgT0F1dGggb24gZmlyc3Qgc2lnbi1pblxuICAgICAgaWYgKGFjY291bnQ/LnByb3ZpZGVyID09PSBcImdvb2dsZVwiICYmIHByb2ZpbGUpIHtcbiAgICAgICAgYXdhaXQgY29ubmVjdERCKCk7XG4gICAgICAgIGNvbnN0IGV4aXN0aW5nID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUoeyBlbWFpbDogdG9rZW4uZW1haWwgfSk7XG5cbiAgICAgICAgaWYgKCFleGlzdGluZykge1xuICAgICAgICAgIGNvbnN0IG5ld1VzZXIgPSBhd2FpdCBVc2VyTW9kZWwuY3JlYXRlKHtcbiAgICAgICAgICAgIG5hbWU6IHRva2VuLm5hbWUsXG4gICAgICAgICAgICBlbWFpbDogdG9rZW4uZW1haWwsXG4gICAgICAgICAgICBhdmF0YXI6IHRva2VuLnBpY3R1cmUsXG4gICAgICAgICAgICBwcm92aWRlcjogXCJnb29nbGVcIixcbiAgICAgICAgICAgIHJvbGU6IFwiYnV5ZXJcIixcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0b2tlbi5pZCA9IG5ld1VzZXIuX2lkLnRvU3RyaW5nKCk7XG4gICAgICAgICAgdG9rZW4ucm9sZSA9IFwiYnV5ZXJcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0b2tlbi5pZCA9IGV4aXN0aW5nLl9pZC50b1N0cmluZygpO1xuICAgICAgICAgIHRva2VuLnJvbGUgPSBleGlzdGluZy5yb2xlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0b2tlbjtcbiAgICB9LFxuXG4gICAgLy8gRXhwb3NlIHJvbGUgdG8gc2Vzc2lvbiAoYWNjZXNzaWJsZSBpbiBjbGllbnQgY29tcG9uZW50cylcbiAgICBhc3luYyBzZXNzaW9uKHsgc2Vzc2lvbiwgdG9rZW4gfSkge1xuICAgICAgaWYgKHNlc3Npb24udXNlcikge1xuICAgICAgICAoc2Vzc2lvbi51c2VyIGFzIGFueSkuaWQgPSB0b2tlbi5pZCBhcyBzdHJpbmc7XG4gICAgICAgIChzZXNzaW9uLnVzZXIgYXMgYW55KS5yb2xlID0gdG9rZW4ucm9sZSBhcyBzdHJpbmc7XG4gICAgICB9XG4gICAgICByZXR1cm4gc2Vzc2lvbjtcbiAgICB9LFxuICB9LFxuXG4gIHBhZ2VzOiB7XG4gICAgc2lnbkluOiBcIi9sb2dpblwiLFxuICAgIGVycm9yOiBcIi9sb2dpblwiLFxuICB9LFxuXG4gIHNlY3JldDogcHJvY2Vzcy5lbnYuTkVYVEFVVEhfU0VDUkVULFxufTtcblxuZXhwb3J0IGRlZmF1bHQgTmV4dEF1dGgoYXV0aE9wdGlvbnMpO1xuIl0sIm5hbWVzIjpbIk5leHRBdXRoIiwiR29vZ2xlUHJvdmlkZXIiLCJDcmVkZW50aWFsc1Byb3ZpZGVyIiwiYmNyeXB0IiwiY29ubmVjdERCIiwiVXNlck1vZGVsIiwiYXV0aE9wdGlvbnMiLCJzZXNzaW9uIiwic3RyYXRlZ3kiLCJtYXhBZ2UiLCJwcm92aWRlcnMiLCJjbGllbnRJZCIsInByb2Nlc3MiLCJlbnYiLCJHT09HTEVfQ0xJRU5UX0lEIiwiY2xpZW50U2VjcmV0IiwiR09PR0xFX0NMSUVOVF9TRUNSRVQiLCJuYW1lIiwiY3JlZGVudGlhbHMiLCJlbWFpbCIsImxhYmVsIiwidHlwZSIsInBhc3N3b3JkIiwiYXV0aG9yaXplIiwidXNlciIsImZpbmRPbmUiLCJzZWxlY3QiLCJpc1ZhbGlkIiwiY29tcGFyZSIsImlkIiwiX2lkIiwidG9TdHJpbmciLCJyb2xlIiwiaW1hZ2UiLCJhdmF0YXIiLCJjYWxsYmFja3MiLCJqd3QiLCJ0b2tlbiIsImFjY291bnQiLCJwcm9maWxlIiwicHJvdmlkZXIiLCJleGlzdGluZyIsIm5ld1VzZXIiLCJjcmVhdGUiLCJwaWN0dXJlIiwicGFnZXMiLCJzaWduSW4iLCJlcnJvciIsInNlY3JldCIsIk5FWFRBVVRIX1NFQ1JFVCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/db.ts":
/*!*******************!*\
  !*** ./lib/db.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   connectDB: () => (/* binding */ connectDB)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst MONGODB_URI = process.env.MONGODB_URI;\nif (!MONGODB_URI) {\n    throw new Error(\"Please define MONGODB_URI in .env.local\");\n}\nif (!global.mongooseCache) {\n    global.mongooseCache = {\n        conn: null,\n        promise: null\n    };\n}\nconst cache = global.mongooseCache;\nasync function connectDB() {\n    if (cache.conn) return cache.conn;\n    if (!cache.promise) {\n        cache.promise = mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(MONGODB_URI, {\n            bufferCommands: false\n        });\n    }\n    cache.conn = await cache.promise;\n    return cache.conn;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWdDO0FBRWhDLE1BQU1DLGNBQWNDLFFBQVFDLEdBQUcsQ0FBQ0YsV0FBVztBQUUzQyxJQUFJLENBQUNBLGFBQWE7SUFDaEIsTUFBTSxJQUFJRyxNQUFNO0FBQ2xCO0FBVUEsSUFBSSxDQUFDQyxPQUFPQyxhQUFhLEVBQUU7SUFDekJELE9BQU9DLGFBQWEsR0FBRztRQUFFQyxNQUFNO1FBQU1DLFNBQVM7SUFBSztBQUNyRDtBQUVBLE1BQU1DLFFBQVFKLE9BQU9DLGFBQWE7QUFFM0IsZUFBZUk7SUFDcEIsSUFBSUQsTUFBTUYsSUFBSSxFQUFFLE9BQU9FLE1BQU1GLElBQUk7SUFFakMsSUFBSSxDQUFDRSxNQUFNRCxPQUFPLEVBQUU7UUFDbEJDLE1BQU1ELE9BQU8sR0FBR1IsdURBQWdCLENBQUNDLGFBQWE7WUFDNUNXLGdCQUFnQjtRQUNsQjtJQUNGO0lBRUFILE1BQU1GLElBQUksR0FBRyxNQUFNRSxNQUFNRCxPQUFPO0lBQ2hDLE9BQU9DLE1BQU1GLElBQUk7QUFDbkIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mcmVlbGFuY2UtbWFya2V0cGxhY2UvLi9saWIvZGIudHM/MWRmMCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UgZnJvbSBcIm1vbmdvb3NlXCI7XG5cbmNvbnN0IE1PTkdPREJfVVJJID0gcHJvY2Vzcy5lbnYuTU9OR09EQl9VUkkgYXMgc3RyaW5nO1xuXG5pZiAoIU1PTkdPREJfVVJJKSB7XG4gIHRocm93IG5ldyBFcnJvcihcIlBsZWFzZSBkZWZpbmUgTU9OR09EQl9VUkkgaW4gLmVudi5sb2NhbFwiKTtcbn1cblxuLy8gR2xvYmFsIGNhY2hlIHRvIHByZXZlbnQgbXVsdGlwbGUgY29ubmVjdGlvbnMgaW4gZGV2IChOZXh0LmpzIGhvdCByZWxvYWQpXG5kZWNsYXJlIGdsb2JhbCB7XG4gIHZhciBtb25nb29zZUNhY2hlOiB7XG4gICAgY29ubjogdHlwZW9mIG1vbmdvb3NlIHwgbnVsbDtcbiAgICBwcm9taXNlOiBQcm9taXNlPHR5cGVvZiBtb25nb29zZT4gfCBudWxsO1xuICB9O1xufVxuXG5pZiAoIWdsb2JhbC5tb25nb29zZUNhY2hlKSB7XG4gIGdsb2JhbC5tb25nb29zZUNhY2hlID0geyBjb25uOiBudWxsLCBwcm9taXNlOiBudWxsIH07XG59XG5cbmNvbnN0IGNhY2hlID0gZ2xvYmFsLm1vbmdvb3NlQ2FjaGU7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb25uZWN0REIoKTogUHJvbWlzZTx0eXBlb2YgbW9uZ29vc2U+IHtcbiAgaWYgKGNhY2hlLmNvbm4pIHJldHVybiBjYWNoZS5jb25uO1xuXG4gIGlmICghY2FjaGUucHJvbWlzZSkge1xuICAgIGNhY2hlLnByb21pc2UgPSBtb25nb29zZS5jb25uZWN0KE1PTkdPREJfVVJJLCB7XG4gICAgICBidWZmZXJDb21tYW5kczogZmFsc2UsXG4gICAgfSk7XG4gIH1cblxuICBjYWNoZS5jb25uID0gYXdhaXQgY2FjaGUucHJvbWlzZTtcbiAgcmV0dXJuIGNhY2hlLmNvbm47XG59XG4iXSwibmFtZXMiOlsibW9uZ29vc2UiLCJNT05HT0RCX1VSSSIsInByb2Nlc3MiLCJlbnYiLCJFcnJvciIsImdsb2JhbCIsIm1vbmdvb3NlQ2FjaGUiLCJjb25uIiwicHJvbWlzZSIsImNhY2hlIiwiY29ubmVjdERCIiwiY29ubmVjdCIsImJ1ZmZlckNvbW1hbmRzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/db.ts\n");

/***/ }),

/***/ "(rsc)/./models/User.ts":
/*!************************!*\
  !*** ./models/User.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   UserModel: () => (/* binding */ UserModel)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst UserSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n    name: {\n        type: String,\n        required: true,\n        trim: true\n    },\n    email: {\n        type: String,\n        required: true,\n        unique: true,\n        lowercase: true\n    },\n    password: {\n        type: String,\n        select: false\n    },\n    avatar: {\n        type: String\n    },\n    role: {\n        type: String,\n        enum: [\n            \"admin\",\n            \"vendor\",\n            \"buyer\"\n        ],\n        default: \"buyer\"\n    },\n    provider: {\n        type: String,\n        enum: [\n            \"credentials\",\n            \"google\"\n        ],\n        default: \"credentials\"\n    },\n    stripeCustomerId: {\n        type: String\n    }\n}, {\n    timestamps: true\n});\n// ── Hash password before save ───────────────────────────\nUserSchema.pre(\"save\", async function(next) {\n    if (!this.isModified(\"password\") || !this.password) return next();\n    this.password = await bcryptjs__WEBPACK_IMPORTED_MODULE_1___default().hash(this.password, 12);\n    next();\n});\n// ── Instance method: compare passwords ─────────────────\nUserSchema.methods.comparePassword = async function(candidate) {\n    return bcryptjs__WEBPACK_IMPORTED_MODULE_1___default().compare(candidate, this.password);\n};\nconst UserModel = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).User ?? mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"User\", UserSchema);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9tb2RlbHMvVXNlci50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUE2RDtBQUMvQjtBQWlCOUIsTUFBTUcsYUFBYSxJQUFJRiw0Q0FBTUEsQ0FDM0I7SUFDRUcsTUFBTTtRQUFFQyxNQUFNQztRQUFRQyxVQUFVO1FBQU1DLE1BQU07SUFBSztJQUNqREMsT0FBTztRQUFFSixNQUFNQztRQUFRQyxVQUFVO1FBQU1HLFFBQVE7UUFBTUMsV0FBVztJQUFLO0lBQ3JFQyxVQUFVO1FBQUVQLE1BQU1DO1FBQVFPLFFBQVE7SUFBTTtJQUN4Q0MsUUFBUTtRQUFFVCxNQUFNQztJQUFPO0lBQ3ZCUyxNQUFNO1FBQ0pWLE1BQU1DO1FBQ05VLE1BQU07WUFBQztZQUFTO1lBQVU7U0FBUTtRQUNsQ0MsU0FBUztJQUNYO0lBQ0FDLFVBQVU7UUFDUmIsTUFBTUM7UUFDTlUsTUFBTTtZQUFDO1lBQWU7U0FBUztRQUMvQkMsU0FBUztJQUNYO0lBQ0FFLGtCQUFrQjtRQUFFZCxNQUFNQztJQUFPO0FBQ25DLEdBQ0E7SUFBRWMsWUFBWTtBQUFLO0FBR3JCLDJEQUEyRDtBQUMzRGpCLFdBQVdrQixHQUFHLENBQUMsUUFBUSxlQUFnQkMsSUFBSTtJQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDQyxVQUFVLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQ1gsUUFBUSxFQUFFLE9BQU9VO0lBQzNELElBQUksQ0FBQ1YsUUFBUSxHQUFHLE1BQU1WLG9EQUFXLENBQUMsSUFBSSxDQUFDVSxRQUFRLEVBQUU7SUFDakRVO0FBQ0Y7QUFFQSwwREFBMEQ7QUFDMURuQixXQUFXc0IsT0FBTyxDQUFDQyxlQUFlLEdBQUcsZUFBZ0JDLFNBQWlCO0lBQ3BFLE9BQU96Qix1REFBYyxDQUFDeUIsV0FBVyxJQUFJLENBQUNmLFFBQVE7QUFDaEQ7QUFFTyxNQUFNaUIsWUFDWDdCLHdEQUFlLENBQUMrQixJQUFJLElBQUkvQixxREFBYyxDQUFRLFFBQVFHLFlBQVkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mcmVlbGFuY2UtbWFya2V0cGxhY2UvLi9tb2RlbHMvVXNlci50cz82ZGM2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSwgeyBTY2hlbWEsIERvY3VtZW50LCBNb2RlbCB9IGZyb20gXCJtb25nb29zZVwiO1xuaW1wb3J0IGJjcnlwdCBmcm9tIFwiYmNyeXB0anNcIjtcblxuZXhwb3J0IHR5cGUgVXNlclJvbGUgPSBcImFkbWluXCIgfCBcInZlbmRvclwiIHwgXCJidXllclwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElVc2VyIGV4dGVuZHMgRG9jdW1lbnQge1xuICBuYW1lOiBzdHJpbmc7XG4gIGVtYWlsOiBzdHJpbmc7XG4gIHBhc3N3b3JkPzogc3RyaW5nOyAgICAgICAgIC8vIE9wdGlvbmFsIOKAlCBHb29nbGUgT0F1dGggdXNlcnMgaGF2ZSBubyBwYXNzd29yZFxuICBhdmF0YXI/OiBzdHJpbmc7XG4gIHJvbGU6IFVzZXJSb2xlO1xuICBwcm92aWRlcjogXCJjcmVkZW50aWFsc1wiIHwgXCJnb29nbGVcIjtcbiAgc3RyaXBlQ3VzdG9tZXJJZD86IHN0cmluZztcbiAgY3JlYXRlZEF0OiBEYXRlO1xuICB1cGRhdGVkQXQ6IERhdGU7XG4gIGNvbXBhcmVQYXNzd29yZChjYW5kaWRhdGU6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj47XG59XG5cbmNvbnN0IFVzZXJTY2hlbWEgPSBuZXcgU2NoZW1hPElVc2VyPihcbiAge1xuICAgIG5hbWU6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSwgdHJpbTogdHJ1ZSB9LFxuICAgIGVtYWlsOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUsIHVuaXF1ZTogdHJ1ZSwgbG93ZXJjYXNlOiB0cnVlIH0sXG4gICAgcGFzc3dvcmQ6IHsgdHlwZTogU3RyaW5nLCBzZWxlY3Q6IGZhbHNlIH0sICAgLy8gTmV2ZXIgcmV0dXJuZWQgYnkgZGVmYXVsdFxuICAgIGF2YXRhcjogeyB0eXBlOiBTdHJpbmcgfSxcbiAgICByb2xlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBlbnVtOiBbXCJhZG1pblwiLCBcInZlbmRvclwiLCBcImJ1eWVyXCJdLFxuICAgICAgZGVmYXVsdDogXCJidXllclwiLFxuICAgIH0sXG4gICAgcHJvdmlkZXI6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGVudW06IFtcImNyZWRlbnRpYWxzXCIsIFwiZ29vZ2xlXCJdLFxuICAgICAgZGVmYXVsdDogXCJjcmVkZW50aWFsc1wiLFxuICAgIH0sXG4gICAgc3RyaXBlQ3VzdG9tZXJJZDogeyB0eXBlOiBTdHJpbmcgfSxcbiAgfSxcbiAgeyB0aW1lc3RhbXBzOiB0cnVlIH1cbik7XG5cbi8vIOKUgOKUgCBIYXNoIHBhc3N3b3JkIGJlZm9yZSBzYXZlIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuVXNlclNjaGVtYS5wcmUoXCJzYXZlXCIsIGFzeW5jIGZ1bmN0aW9uIChuZXh0KSB7XG4gIGlmICghdGhpcy5pc01vZGlmaWVkKFwicGFzc3dvcmRcIikgfHwgIXRoaXMucGFzc3dvcmQpIHJldHVybiBuZXh0KCk7XG4gIHRoaXMucGFzc3dvcmQgPSBhd2FpdCBiY3J5cHQuaGFzaCh0aGlzLnBhc3N3b3JkLCAxMik7XG4gIG5leHQoKTtcbn0pO1xuXG4vLyDilIDilIAgSW5zdGFuY2UgbWV0aG9kOiBjb21wYXJlIHBhc3N3b3JkcyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblVzZXJTY2hlbWEubWV0aG9kcy5jb21wYXJlUGFzc3dvcmQgPSBhc3luYyBmdW5jdGlvbiAoY2FuZGlkYXRlOiBzdHJpbmcpIHtcbiAgcmV0dXJuIGJjcnlwdC5jb21wYXJlKGNhbmRpZGF0ZSwgdGhpcy5wYXNzd29yZCk7XG59O1xuXG5leHBvcnQgY29uc3QgVXNlck1vZGVsOiBNb2RlbDxJVXNlcj4gPVxuICBtb25nb29zZS5tb2RlbHMuVXNlciA/PyBtb25nb29zZS5tb2RlbDxJVXNlcj4oXCJVc2VyXCIsIFVzZXJTY2hlbWEpO1xuIl0sIm5hbWVzIjpbIm1vbmdvb3NlIiwiU2NoZW1hIiwiYmNyeXB0IiwiVXNlclNjaGVtYSIsIm5hbWUiLCJ0eXBlIiwiU3RyaW5nIiwicmVxdWlyZWQiLCJ0cmltIiwiZW1haWwiLCJ1bmlxdWUiLCJsb3dlcmNhc2UiLCJwYXNzd29yZCIsInNlbGVjdCIsImF2YXRhciIsInJvbGUiLCJlbnVtIiwiZGVmYXVsdCIsInByb3ZpZGVyIiwic3RyaXBlQ3VzdG9tZXJJZCIsInRpbWVzdGFtcHMiLCJwcmUiLCJuZXh0IiwiaXNNb2RpZmllZCIsImhhc2giLCJtZXRob2RzIiwiY29tcGFyZVBhc3N3b3JkIiwiY2FuZGlkYXRlIiwiY29tcGFyZSIsIlVzZXJNb2RlbCIsIm1vZGVscyIsIlVzZXIiLCJtb2RlbCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./models/User.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/bcryptjs","vendor-chunks/next-auth","vendor-chunks/openid-client","vendor-chunks/@babel","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=D%3A%5C1.Portafolio%5CtesteIA%5CNew-test-repo-%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5C1.Portafolio%5CtesteIA%5CNew-test-repo-&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();