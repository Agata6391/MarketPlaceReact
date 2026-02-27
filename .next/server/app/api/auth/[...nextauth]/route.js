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

/***/ "./action-async-storage.external?8dda":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "./request-async-storage.external?3d59":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "./static-generation-async-storage.external?16bc":
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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5Cdjvm1%5CDocuments%5CGithub%5CNew-test-repo-%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cdjvm1%5CDocuments%5CGithub%5CNew-test-repo-&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5Cdjvm1%5CDocuments%5CGithub%5CNew-test-repo-%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cdjvm1%5CDocuments%5CGithub%5CNew-test-repo-&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_djvm1_Documents_Github_New_test_repo_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/[...nextauth]/route.ts */ \"(rsc)/./app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\djvm1\\\\Documents\\\\Github\\\\New-test-repo-\\\\app\\\\api\\\\auth\\\\[...nextauth]\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_djvm1_Documents_Github_New_test_repo_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/auth/[...nextauth]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNkanZtMSU1Q0RvY3VtZW50cyU1Q0dpdGh1YiU1Q05ldy10ZXN0LXJlcG8tJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNkanZtMSU1Q0RvY3VtZW50cyU1Q0dpdGh1YiU1Q05ldy10ZXN0LXJlcG8tJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUM0QztBQUN6SDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlFQUFpRTtBQUN6RTtBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ3VIOztBQUV2SCIsInNvdXJjZXMiOlsid2VicGFjazovL2ZyZWVsYW5jZS1tYXJrZXRwbGFjZS8/ZmNlNCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxkanZtMVxcXFxEb2N1bWVudHNcXFxcR2l0aHViXFxcXE5ldy10ZXN0LXJlcG8tXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxbLi4ubmV4dGF1dGhdXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hdXRoL1suLi5uZXh0YXV0aF1cIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXGRqdm0xXFxcXERvY3VtZW50c1xcXFxHaXRodWJcXFxcTmV3LXRlc3QtcmVwby1cXFxcYXBwXFxcXGFwaVxcXFxhdXRoXFxcXFsuLi5uZXh0YXV0aF1cXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5Cdjvm1%5CDocuments%5CGithub%5CNew-test-repo-%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cdjvm1%5CDocuments%5CGithub%5CNew-test-repo-&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/auth/[...nextauth]/route.ts":
/*!*********************************************!*\
  !*** ./app/api/auth/[...nextauth]/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n\n\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(_lib_auth__WEBPACK_IMPORTED_MODULE_1__.authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFpQztBQUNRO0FBRXpDLE1BQU1FLFVBQVVGLGdEQUFRQSxDQUFDQyxrREFBV0E7QUFFTyIsInNvdXJjZXMiOlsid2VicGFjazovL2ZyZWVsYW5jZS1tYXJrZXRwbGFjZS8uL2FwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlLnRzP2M4YTQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5leHRBdXRoIGZyb20gXCJuZXh0LWF1dGhcIjtcclxuaW1wb3J0IHsgYXV0aE9wdGlvbnMgfSBmcm9tIFwiQC9saWIvYXV0aFwiO1xyXG5cclxuY29uc3QgaGFuZGxlciA9IE5leHRBdXRoKGF1dGhPcHRpb25zKTtcclxuXHJcbmV4cG9ydCB7IGhhbmRsZXIgYXMgR0VULCBoYW5kbGVyIGFzIFBPU1QgfTtcclxuIl0sIm5hbWVzIjpbIk5leHRBdXRoIiwiYXV0aE9wdGlvbnMiLCJoYW5kbGVyIiwiR0VUIiwiUE9TVCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/google */ \"(rsc)/./node_modules/next-auth/providers/google.js\");\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db.ts\");\n/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/models/User */ \"(rsc)/./models/User.ts\");\n\n\n\n\n\n\nconst authOptions = {\n    session: {\n        strategy: \"jwt\",\n        maxAge: 7 * 24 * 60 * 60\n    },\n    providers: [\n        // ── Google OAuth ──────────────────────────────────────\n        (0,next_auth_providers_google__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            clientId: process.env.GOOGLE_CLIENT_ID,\n            clientSecret: process.env.GOOGLE_CLIENT_SECRET\n        }),\n        // ── Email / Password ──────────────────────────────────\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_2__[\"default\"])({\n            name: \"credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) return null;\n                await (0,_lib_db__WEBPACK_IMPORTED_MODULE_4__.connectDB)();\n                const user = await _models_User__WEBPACK_IMPORTED_MODULE_5__.UserModel.findOne({\n                    email: credentials.email\n                }).select(\"+password\");\n                if (!user || !user.password) return null;\n                const isValid = await bcryptjs__WEBPACK_IMPORTED_MODULE_3___default().compare(credentials.password, user.password);\n                if (!isValid) return null;\n                return {\n                    id: user._id.toString(),\n                    email: user.email,\n                    name: user.name,\n                    role: user.role,\n                    image: user.avatar\n                };\n            }\n        })\n    ],\n    callbacks: {\n        // Persist role in JWT token\n        async jwt ({ token, user, account, profile }) {\n            if (user) {\n                token.role = user.role ?? \"buyer\";\n                token.id = user.id;\n            }\n            // Auto-create user from Google OAuth on first sign-in\n            if (account?.provider === \"google\" && profile) {\n                await (0,_lib_db__WEBPACK_IMPORTED_MODULE_4__.connectDB)();\n                const existing = await _models_User__WEBPACK_IMPORTED_MODULE_5__.UserModel.findOne({\n                    email: token.email\n                });\n                if (!existing) {\n                    const newUser = await _models_User__WEBPACK_IMPORTED_MODULE_5__.UserModel.create({\n                        name: token.name,\n                        email: token.email,\n                        avatar: token.picture,\n                        provider: \"google\",\n                        role: \"buyer\"\n                    });\n                    token.id = newUser._id.toString();\n                    token.role = \"buyer\";\n                } else {\n                    token.id = existing._id.toString();\n                    token.role = existing.role;\n                }\n            }\n            return token;\n        },\n        // Expose role to session (accessible in client components)\n        async session ({ session, token }) {\n            if (session.user) {\n                session.user.id = token.id;\n                session.user.role = token.role;\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/login\",\n        error: \"/login\"\n    },\n    secret: process.env.NEXTAUTH_SECRET\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (next_auth__WEBPACK_IMPORTED_MODULE_0___default()(authOptions));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFJLENBQVNRLElBQUksR0FBR0ssTUFBTUwsSUFBSTtZQUN6QztZQUNBLE9BQU96QjtRQUNUO0lBQ0Y7SUFFQXNDLE9BQU87UUFDTEMsUUFBUTtRQUNSQyxPQUFPO0lBQ1Q7SUFFQUMsUUFBUXBDLFFBQVFDLEdBQUcsQ0FBQ29DLGVBQWU7QUFDckMsRUFBRTtBQUVGLGlFQUFlakQsZ0RBQVFBLENBQUNNLFlBQVlBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mcmVlbGFuY2UtbWFya2V0cGxhY2UvLi9saWIvYXV0aC50cz9iZjdlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOZXh0QXV0aCwgeyB0eXBlIE5leHRBdXRoT3B0aW9ucyB9IGZyb20gXCJuZXh0LWF1dGhcIjtcclxuaW1wb3J0IEdvb2dsZVByb3ZpZGVyIGZyb20gXCJuZXh0LWF1dGgvcHJvdmlkZXJzL2dvb2dsZVwiO1xyXG5pbXBvcnQgQ3JlZGVudGlhbHNQcm92aWRlciBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVycy9jcmVkZW50aWFsc1wiO1xyXG5pbXBvcnQgYmNyeXB0IGZyb20gXCJiY3J5cHRqc1wiO1xyXG5pbXBvcnQgeyBjb25uZWN0REIgfSBmcm9tIFwiQC9saWIvZGJcIjtcclxuaW1wb3J0IHsgVXNlck1vZGVsIH0gZnJvbSBcIkAvbW9kZWxzL1VzZXJcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBhdXRoT3B0aW9uczogTmV4dEF1dGhPcHRpb25zID0ge1xyXG4gIHNlc3Npb246IHtcclxuICAgIHN0cmF0ZWd5OiBcImp3dFwiLFxyXG4gICAgbWF4QWdlOiA3ICogMjQgKiA2MCAqIDYwLCAvLyA3IGRheXMg4oCUIHJlZnJlc2ggdG9rZW4gd2luZG93XHJcbiAgfSxcclxuXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICAvLyDilIDilIAgR29vZ2xlIE9BdXRoIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxyXG4gICAgR29vZ2xlUHJvdmlkZXIoe1xyXG4gICAgICBjbGllbnRJZDogcHJvY2Vzcy5lbnYuR09PR0xFX0NMSUVOVF9JRCBhcyBzdHJpbmcsXHJcbiAgICAgIGNsaWVudFNlY3JldDogcHJvY2Vzcy5lbnYuR09PR0xFX0NMSUVOVF9TRUNSRVQgYXMgc3RyaW5nLFxyXG4gICAgfSksXHJcblxyXG4gICAgLy8g4pSA4pSAIEVtYWlsIC8gUGFzc3dvcmQg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXHJcbiAgICBDcmVkZW50aWFsc1Byb3ZpZGVyKHtcclxuICAgICAgbmFtZTogXCJjcmVkZW50aWFsc1wiLFxyXG4gICAgICBjcmVkZW50aWFsczoge1xyXG4gICAgICAgIGVtYWlsOiB7IGxhYmVsOiBcIkVtYWlsXCIsIHR5cGU6IFwiZW1haWxcIiB9LFxyXG4gICAgICAgIHBhc3N3b3JkOiB7IGxhYmVsOiBcIlBhc3N3b3JkXCIsIHR5cGU6IFwicGFzc3dvcmRcIiB9LFxyXG4gICAgICB9LFxyXG4gICAgICBhc3luYyBhdXRob3JpemUoY3JlZGVudGlhbHMpIHtcclxuICAgICAgICBpZiAoIWNyZWRlbnRpYWxzPy5lbWFpbCB8fCAhY3JlZGVudGlhbHM/LnBhc3N3b3JkKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgYXdhaXQgY29ubmVjdERCKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXJNb2RlbC5maW5kT25lKHsgZW1haWw6IGNyZWRlbnRpYWxzLmVtYWlsIH0pLnNlbGVjdChcIitwYXNzd29yZFwiKTtcclxuICAgICAgIFxyXG5cclxuICAgICAgICBpZiAoIXVzZXIgfHwgIXVzZXIucGFzc3dvcmQpIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICBjb25zdCBpc1ZhbGlkID0gYXdhaXQgYmNyeXB0LmNvbXBhcmUoY3JlZGVudGlhbHMucGFzc3dvcmQsIHVzZXIucGFzc3dvcmQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICghaXNWYWxpZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBpZDogdXNlci5faWQudG9TdHJpbmcoKSxcclxuICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxyXG4gICAgICAgICAgbmFtZTogdXNlci5uYW1lLFxyXG4gICAgICAgICAgcm9sZTogdXNlci5yb2xlLFxyXG4gICAgICAgICAgaW1hZ2U6IHVzZXIuYXZhdGFyLFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICB9KSxcclxuICBdLFxyXG5cclxuICBjYWxsYmFja3M6IHtcclxuICAgIC8vIFBlcnNpc3Qgcm9sZSBpbiBKV1QgdG9rZW5cclxuICAgIGFzeW5jIGp3dCh7IHRva2VuLCB1c2VyLCBhY2NvdW50LCBwcm9maWxlIH0pIHtcclxuICAgICAgaWYgKHVzZXIpIHtcclxuICAgICAgICB0b2tlbi5yb2xlID0gKHVzZXIgYXMgYW55KS5yb2xlID8/IFwiYnV5ZXJcIjtcclxuICAgICAgICB0b2tlbi5pZCA9IHVzZXIuaWQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEF1dG8tY3JlYXRlIHVzZXIgZnJvbSBHb29nbGUgT0F1dGggb24gZmlyc3Qgc2lnbi1pblxyXG4gICAgICBpZiAoYWNjb3VudD8ucHJvdmlkZXIgPT09IFwiZ29vZ2xlXCIgJiYgcHJvZmlsZSkge1xyXG4gICAgICAgIGF3YWl0IGNvbm5lY3REQigpO1xyXG4gICAgICAgIGNvbnN0IGV4aXN0aW5nID0gYXdhaXQgVXNlck1vZGVsLmZpbmRPbmUoeyBlbWFpbDogdG9rZW4uZW1haWwgfSk7XHJcblxyXG4gICAgICAgIGlmICghZXhpc3RpbmcpIHtcclxuICAgICAgICAgIGNvbnN0IG5ld1VzZXIgPSBhd2FpdCBVc2VyTW9kZWwuY3JlYXRlKHtcclxuICAgICAgICAgICAgbmFtZTogdG9rZW4ubmFtZSxcclxuICAgICAgICAgICAgZW1haWw6IHRva2VuLmVtYWlsLFxyXG4gICAgICAgICAgICBhdmF0YXI6IHRva2VuLnBpY3R1cmUsXHJcbiAgICAgICAgICAgIHByb3ZpZGVyOiBcImdvb2dsZVwiLFxyXG4gICAgICAgICAgICByb2xlOiBcImJ1eWVyXCIsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHRva2VuLmlkID0gbmV3VXNlci5faWQudG9TdHJpbmcoKTtcclxuICAgICAgICAgIHRva2VuLnJvbGUgPSBcImJ1eWVyXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRva2VuLmlkID0gZXhpc3RpbmcuX2lkLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICB0b2tlbi5yb2xlID0gZXhpc3Rpbmcucm9sZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB0b2tlbjtcclxuICAgIH0sXHJcblxyXG4gICAgLy8gRXhwb3NlIHJvbGUgdG8gc2Vzc2lvbiAoYWNjZXNzaWJsZSBpbiBjbGllbnQgY29tcG9uZW50cylcclxuICAgIGFzeW5jIHNlc3Npb24oeyBzZXNzaW9uLCB0b2tlbiB9KSB7XHJcbiAgICAgIGlmIChzZXNzaW9uLnVzZXIpIHtcclxuICAgICAgICAoc2Vzc2lvbi51c2VyIGFzIGFueSkuaWQgPSB0b2tlbi5pZCBhcyBzdHJpbmc7XHJcbiAgICAgICAgKHNlc3Npb24udXNlciBhcyBhbnkpLnJvbGUgPSB0b2tlbi5yb2xlIGFzIHN0cmluZztcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gc2Vzc2lvbjtcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgcGFnZXM6IHtcclxuICAgIHNpZ25JbjogXCIvbG9naW5cIixcclxuICAgIGVycm9yOiBcIi9sb2dpblwiLFxyXG4gIH0sXHJcblxyXG4gIHNlY3JldDogcHJvY2Vzcy5lbnYuTkVYVEFVVEhfU0VDUkVULFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTmV4dEF1dGgoYXV0aE9wdGlvbnMpO1xyXG4iXSwibmFtZXMiOlsiTmV4dEF1dGgiLCJHb29nbGVQcm92aWRlciIsIkNyZWRlbnRpYWxzUHJvdmlkZXIiLCJiY3J5cHQiLCJjb25uZWN0REIiLCJVc2VyTW9kZWwiLCJhdXRoT3B0aW9ucyIsInNlc3Npb24iLCJzdHJhdGVneSIsIm1heEFnZSIsInByb3ZpZGVycyIsImNsaWVudElkIiwicHJvY2VzcyIsImVudiIsIkdPT0dMRV9DTElFTlRfSUQiLCJjbGllbnRTZWNyZXQiLCJHT09HTEVfQ0xJRU5UX1NFQ1JFVCIsIm5hbWUiLCJjcmVkZW50aWFscyIsImVtYWlsIiwibGFiZWwiLCJ0eXBlIiwicGFzc3dvcmQiLCJhdXRob3JpemUiLCJ1c2VyIiwiZmluZE9uZSIsInNlbGVjdCIsImlzVmFsaWQiLCJjb21wYXJlIiwiaWQiLCJfaWQiLCJ0b1N0cmluZyIsInJvbGUiLCJpbWFnZSIsImF2YXRhciIsImNhbGxiYWNrcyIsImp3dCIsInRva2VuIiwiYWNjb3VudCIsInByb2ZpbGUiLCJwcm92aWRlciIsImV4aXN0aW5nIiwibmV3VXNlciIsImNyZWF0ZSIsInBpY3R1cmUiLCJwYWdlcyIsInNpZ25JbiIsImVycm9yIiwic2VjcmV0IiwiTkVYVEFVVEhfU0VDUkVUIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/db.ts":
/*!*******************!*\
  !*** ./lib/db.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   connectDB: () => (/* binding */ connectDB)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst MONGODB_URI = process.env.MONGODB_URI;\nif (!MONGODB_URI) {\n    throw new Error(\"Please define MONGODB_URI in .env.local\");\n}\nif (!global.mongooseCache) {\n    global.mongooseCache = {\n        conn: null,\n        promise: null\n    };\n}\nconst cache = global.mongooseCache;\nasync function connectDB() {\n    if (cache.conn) return cache.conn;\n    if (!cache.promise) {\n        cache.promise = mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(MONGODB_URI, {\n            bufferCommands: false\n        });\n    }\n    cache.conn = await cache.promise;\n    return cache.conn;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWdDO0FBRWhDLE1BQU1DLGNBQWNDLFFBQVFDLEdBQUcsQ0FBQ0YsV0FBVztBQUUzQyxJQUFJLENBQUNBLGFBQWE7SUFDaEIsTUFBTSxJQUFJRyxNQUFNO0FBQ2xCO0FBVUEsSUFBSSxDQUFDQyxPQUFPQyxhQUFhLEVBQUU7SUFDekJELE9BQU9DLGFBQWEsR0FBRztRQUFFQyxNQUFNO1FBQU1DLFNBQVM7SUFBSztBQUNyRDtBQUVBLE1BQU1DLFFBQVFKLE9BQU9DLGFBQWE7QUFFM0IsZUFBZUk7SUFDcEIsSUFBSUQsTUFBTUYsSUFBSSxFQUFFLE9BQU9FLE1BQU1GLElBQUk7SUFFakMsSUFBSSxDQUFDRSxNQUFNRCxPQUFPLEVBQUU7UUFDbEJDLE1BQU1ELE9BQU8sR0FBR1IsdURBQWdCLENBQUNDLGFBQWE7WUFDNUNXLGdCQUFnQjtRQUNsQjtJQUNGO0lBRUFILE1BQU1GLElBQUksR0FBRyxNQUFNRSxNQUFNRCxPQUFPO0lBQ2hDLE9BQU9DLE1BQU1GLElBQUk7QUFDbkIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mcmVlbGFuY2UtbWFya2V0cGxhY2UvLi9saWIvZGIudHM/MWRmMCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UgZnJvbSBcIm1vbmdvb3NlXCI7XHJcblxyXG5jb25zdCBNT05HT0RCX1VSSSA9IHByb2Nlc3MuZW52Lk1PTkdPREJfVVJJIGFzIHN0cmluZztcclxuXHJcbmlmICghTU9OR09EQl9VUkkpIHtcclxuICB0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2UgZGVmaW5lIE1PTkdPREJfVVJJIGluIC5lbnYubG9jYWxcIik7XHJcbn1cclxuXHJcbi8vIEdsb2JhbCBjYWNoZSB0byBwcmV2ZW50IG11bHRpcGxlIGNvbm5lY3Rpb25zIGluIGRldiAoTmV4dC5qcyBob3QgcmVsb2FkKVxyXG5kZWNsYXJlIGdsb2JhbCB7XHJcbiAgdmFyIG1vbmdvb3NlQ2FjaGU6IHtcclxuICAgIGNvbm46IHR5cGVvZiBtb25nb29zZSB8IG51bGw7XHJcbiAgICBwcm9taXNlOiBQcm9taXNlPHR5cGVvZiBtb25nb29zZT4gfCBudWxsO1xyXG4gIH07XHJcbn1cclxuXHJcbmlmICghZ2xvYmFsLm1vbmdvb3NlQ2FjaGUpIHtcclxuICBnbG9iYWwubW9uZ29vc2VDYWNoZSA9IHsgY29ubjogbnVsbCwgcHJvbWlzZTogbnVsbCB9O1xyXG59XHJcblxyXG5jb25zdCBjYWNoZSA9IGdsb2JhbC5tb25nb29zZUNhY2hlO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNvbm5lY3REQigpOiBQcm9taXNlPHR5cGVvZiBtb25nb29zZT4ge1xyXG4gIGlmIChjYWNoZS5jb25uKSByZXR1cm4gY2FjaGUuY29ubjtcclxuXHJcbiAgaWYgKCFjYWNoZS5wcm9taXNlKSB7XHJcbiAgICBjYWNoZS5wcm9taXNlID0gbW9uZ29vc2UuY29ubmVjdChNT05HT0RCX1VSSSwge1xyXG4gICAgICBidWZmZXJDb21tYW5kczogZmFsc2UsXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNhY2hlLmNvbm4gPSBhd2FpdCBjYWNoZS5wcm9taXNlO1xyXG4gIHJldHVybiBjYWNoZS5jb25uO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJtb25nb29zZSIsIk1PTkdPREJfVVJJIiwicHJvY2VzcyIsImVudiIsIkVycm9yIiwiZ2xvYmFsIiwibW9uZ29vc2VDYWNoZSIsImNvbm4iLCJwcm9taXNlIiwiY2FjaGUiLCJjb25uZWN0REIiLCJjb25uZWN0IiwiYnVmZmVyQ29tbWFuZHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/db.ts\n");

/***/ }),

/***/ "(rsc)/./models/User.ts":
/*!************************!*\
  !*** ./models/User.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   UserModel: () => (/* binding */ UserModel)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst UserSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n    name: {\n        type: String,\n        required: true,\n        trim: true\n    },\n    email: {\n        type: String,\n        required: true,\n        unique: true,\n        lowercase: true\n    },\n    password: {\n        type: String,\n        select: false\n    },\n    avatar: {\n        type: String\n    },\n    role: {\n        type: String,\n        enum: [\n            \"admin\",\n            \"vendor\",\n            \"buyer\"\n        ],\n        default: \"buyer\"\n    },\n    provider: {\n        type: String,\n        enum: [\n            \"credentials\",\n            \"google\"\n        ],\n        default: \"credentials\"\n    },\n    stripeCustomerId: {\n        type: String\n    }\n}, {\n    timestamps: true\n});\n// ── Hash password before save ───────────────────────────\nUserSchema.pre(\"save\", async function(next) {\n    if (!this.isModified(\"password\") || !this.password) return next();\n    this.password = await bcryptjs__WEBPACK_IMPORTED_MODULE_1___default().hash(this.password, 12);\n    next();\n});\n// ── Instance method: compare passwords ─────────────────\nUserSchema.methods.comparePassword = async function(candidate) {\n    return bcryptjs__WEBPACK_IMPORTED_MODULE_1___default().compare(candidate, this.password);\n};\nconst UserModel = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).User ?? mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"User\", UserSchema);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9tb2RlbHMvVXNlci50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUE2RDtBQUMvQjtBQWlCOUIsTUFBTUcsYUFBYSxJQUFJRiw0Q0FBTUEsQ0FDM0I7SUFDRUcsTUFBTTtRQUFFQyxNQUFNQztRQUFRQyxVQUFVO1FBQU1DLE1BQU07SUFBSztJQUNqREMsT0FBTztRQUFFSixNQUFNQztRQUFRQyxVQUFVO1FBQU1HLFFBQVE7UUFBTUMsV0FBVztJQUFLO0lBQ3JFQyxVQUFVO1FBQUVQLE1BQU1DO1FBQVFPLFFBQVE7SUFBTTtJQUN4Q0MsUUFBUTtRQUFFVCxNQUFNQztJQUFPO0lBQ3ZCUyxNQUFNO1FBQ0pWLE1BQU1DO1FBQ05VLE1BQU07WUFBQztZQUFTO1lBQVU7U0FBUTtRQUNsQ0MsU0FBUztJQUNYO0lBQ0FDLFVBQVU7UUFDUmIsTUFBTUM7UUFDTlUsTUFBTTtZQUFDO1lBQWU7U0FBUztRQUMvQkMsU0FBUztJQUNYO0lBQ0FFLGtCQUFrQjtRQUFFZCxNQUFNQztJQUFPO0FBQ25DLEdBQ0E7SUFBRWMsWUFBWTtBQUFLO0FBR3JCLDJEQUEyRDtBQUMzRGpCLFdBQVdrQixHQUFHLENBQUMsUUFBUSxlQUFnQkMsSUFBSTtJQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDQyxVQUFVLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQ1gsUUFBUSxFQUFFLE9BQU9VO0lBQzNELElBQUksQ0FBQ1YsUUFBUSxHQUFHLE1BQU1WLG9EQUFXLENBQUMsSUFBSSxDQUFDVSxRQUFRLEVBQUU7SUFDakRVO0FBQ0Y7QUFFQSwwREFBMEQ7QUFDMURuQixXQUFXc0IsT0FBTyxDQUFDQyxlQUFlLEdBQUcsZUFBZ0JDLFNBQWlCO0lBQ3BFLE9BQU96Qix1REFBYyxDQUFDeUIsV0FBVyxJQUFJLENBQUNmLFFBQVE7QUFDaEQ7QUFFTyxNQUFNaUIsWUFDWDdCLHdEQUFlLENBQUMrQixJQUFJLElBQUkvQixxREFBYyxDQUFRLFFBQVFHLFlBQVkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mcmVlbGFuY2UtbWFya2V0cGxhY2UvLi9tb2RlbHMvVXNlci50cz82ZGM2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSwgeyBTY2hlbWEsIERvY3VtZW50LCBNb2RlbCB9IGZyb20gXCJtb25nb29zZVwiO1xyXG5pbXBvcnQgYmNyeXB0IGZyb20gXCJiY3J5cHRqc1wiO1xyXG5cclxuZXhwb3J0IHR5cGUgVXNlclJvbGUgPSBcImFkbWluXCIgfCBcInZlbmRvclwiIHwgXCJidXllclwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVXNlciBleHRlbmRzIERvY3VtZW50IHtcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgZW1haWw6IHN0cmluZztcclxuICBwYXNzd29yZD86IHN0cmluZzsgICAgICAgICAvLyBPcHRpb25hbCDigJQgR29vZ2xlIE9BdXRoIHVzZXJzIGhhdmUgbm8gcGFzc3dvcmRcclxuICBhdmF0YXI/OiBzdHJpbmc7XHJcbiAgcm9sZTogVXNlclJvbGU7XHJcbiAgcHJvdmlkZXI6IFwiY3JlZGVudGlhbHNcIiB8IFwiZ29vZ2xlXCI7XHJcbiAgc3RyaXBlQ3VzdG9tZXJJZD86IHN0cmluZztcclxuICBjcmVhdGVkQXQ6IERhdGU7XHJcbiAgdXBkYXRlZEF0OiBEYXRlO1xyXG4gIGNvbXBhcmVQYXNzd29yZChjYW5kaWRhdGU6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj47XHJcbn1cclxuXHJcbmNvbnN0IFVzZXJTY2hlbWEgPSBuZXcgU2NoZW1hPElVc2VyPihcclxuICB7XHJcbiAgICBuYW1lOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUsIHRyaW06IHRydWUgfSxcclxuICAgIGVtYWlsOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUsIHVuaXF1ZTogdHJ1ZSwgbG93ZXJjYXNlOiB0cnVlIH0sXHJcbiAgICBwYXNzd29yZDogeyB0eXBlOiBTdHJpbmcsIHNlbGVjdDogZmFsc2UgfSwgICAvLyBOZXZlciByZXR1cm5lZCBieSBkZWZhdWx0XHJcbiAgICBhdmF0YXI6IHsgdHlwZTogU3RyaW5nIH0sXHJcbiAgICByb2xlOiB7XHJcbiAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgZW51bTogW1wiYWRtaW5cIiwgXCJ2ZW5kb3JcIiwgXCJidXllclwiXSxcclxuICAgICAgZGVmYXVsdDogXCJidXllclwiLFxyXG4gICAgfSxcclxuICAgIHByb3ZpZGVyOiB7XHJcbiAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgZW51bTogW1wiY3JlZGVudGlhbHNcIiwgXCJnb29nbGVcIl0sXHJcbiAgICAgIGRlZmF1bHQ6IFwiY3JlZGVudGlhbHNcIixcclxuICAgIH0sXHJcbiAgICBzdHJpcGVDdXN0b21lcklkOiB7IHR5cGU6IFN0cmluZyB9LFxyXG4gIH0sXHJcbiAgeyB0aW1lc3RhbXBzOiB0cnVlIH1cclxuKTtcclxuXHJcbi8vIOKUgOKUgCBIYXNoIHBhc3N3b3JkIGJlZm9yZSBzYXZlIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxyXG5Vc2VyU2NoZW1hLnByZShcInNhdmVcIiwgYXN5bmMgZnVuY3Rpb24gKG5leHQpIHtcclxuICBpZiAoIXRoaXMuaXNNb2RpZmllZChcInBhc3N3b3JkXCIpIHx8ICF0aGlzLnBhc3N3b3JkKSByZXR1cm4gbmV4dCgpO1xyXG4gIHRoaXMucGFzc3dvcmQgPSBhd2FpdCBiY3J5cHQuaGFzaCh0aGlzLnBhc3N3b3JkLCAxMik7XHJcbiAgbmV4dCgpO1xyXG59KTtcclxuXHJcbi8vIOKUgOKUgCBJbnN0YW5jZSBtZXRob2Q6IGNvbXBhcmUgcGFzc3dvcmRzIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxyXG5Vc2VyU2NoZW1hLm1ldGhvZHMuY29tcGFyZVBhc3N3b3JkID0gYXN5bmMgZnVuY3Rpb24gKGNhbmRpZGF0ZTogc3RyaW5nKSB7XHJcbiAgcmV0dXJuIGJjcnlwdC5jb21wYXJlKGNhbmRpZGF0ZSwgdGhpcy5wYXNzd29yZCk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgVXNlck1vZGVsOiBNb2RlbDxJVXNlcj4gPVxyXG4gIG1vbmdvb3NlLm1vZGVscy5Vc2VyID8/IG1vbmdvb3NlLm1vZGVsPElVc2VyPihcIlVzZXJcIiwgVXNlclNjaGVtYSk7XHJcbiJdLCJuYW1lcyI6WyJtb25nb29zZSIsIlNjaGVtYSIsImJjcnlwdCIsIlVzZXJTY2hlbWEiLCJuYW1lIiwidHlwZSIsIlN0cmluZyIsInJlcXVpcmVkIiwidHJpbSIsImVtYWlsIiwidW5pcXVlIiwibG93ZXJjYXNlIiwicGFzc3dvcmQiLCJzZWxlY3QiLCJhdmF0YXIiLCJyb2xlIiwiZW51bSIsImRlZmF1bHQiLCJwcm92aWRlciIsInN0cmlwZUN1c3RvbWVySWQiLCJ0aW1lc3RhbXBzIiwicHJlIiwibmV4dCIsImlzTW9kaWZpZWQiLCJoYXNoIiwibWV0aG9kcyIsImNvbXBhcmVQYXNzd29yZCIsImNhbmRpZGF0ZSIsImNvbXBhcmUiLCJVc2VyTW9kZWwiLCJtb2RlbHMiLCJVc2VyIiwibW9kZWwiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./models/User.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/@babel","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5Cdjvm1%5CDocuments%5CGithub%5CNew-test-repo-%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cdjvm1%5CDocuments%5CGithub%5CNew-test-repo-&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();