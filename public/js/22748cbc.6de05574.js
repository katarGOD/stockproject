(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["22748cbc"],{"0caf":function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div")},a=[];n._withStripped=!0;r("ac6a");var i={data:function(){return{departmentOptions:[]}},created:function(){var e=this;e.$database.collection("department").orderBy("code").get().then(function(t){t.forEach(function(t){e.departmentOptions.push({id:t.id,data:t.data(),value:t.id,label:"".concat(t.data().code," : ").concat(t.data().description),model:!1})})})}},u=i,o=r("2877"),c=Object(o["a"])(u,n,a,!1,null,null,null);c.options.__file="departmentOptions.vue";t["a"]=c.exports},1331:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=(0,n.regex)("integer",/^-?[0-9]*$/);t.default=a},"2a12":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=function(e){return(0,n.withParams)({type:"maxLength",max:e},function(t){return!(0,n.req)(t)||(0,n.len)(t)<=e})};t.default=a},3360:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,n.withParams)({type:"and"},function(){for(var e=this,r=arguments.length,n=new Array(r),a=0;a<r;a++)n[a]=arguments[a];return t.length>0&&t.reduce(function(t,r){return t&&r.apply(e,n)},!0)})};t.default=a},"3a54":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=(0,n.regex)("alphaNum",/^[a-zA-Z0-9]*$/);t.default=a},"45b8":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=(0,n.regex)("numeric",/^[0-9]*$/);t.default=a},"46bc":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=function(e){return(0,n.withParams)({type:"maxValue",max:e},function(t){return!(0,n.req)(t)||(!/\s/.test(t)||t instanceof Date)&&+t<=+e})};t.default=a},"5d75":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=/(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/,i=(0,n.regex)("email",a);t.default=i},"5db3":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=function(e){return(0,n.withParams)({type:"minLength",min:e},function(t){return!(0,n.req)(t)||(0,n.len)(t)>=e})};t.default=a},6235:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=(0,n.regex)("alpha",/^[a-zA-Z]*$/);t.default=a},6417:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=function(e){return(0,n.withParams)({type:"not"},function(t,r){return!(0,n.req)(t)||!e.call(this,t,r)})};t.default=a},"772d":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i,i=(0,n.regex)("url",a);t.default=i},"78ef":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"withParams",{enumerable:!0,get:function(){return n.default}}),t.regex=t.ref=t.len=t.req=void 0;var n=a(r("8750"));function a(e){return e&&e.__esModule?e:{default:e}}function i(e){return i="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i(e)}var u=function(e){if(Array.isArray(e))return!!e.length;if(void 0===e||null===e)return!1;if(!1===e)return!0;if(e instanceof Date)return!isNaN(e.getTime());if("object"===i(e)){for(var t in e)return!0;return!1}return!!String(e).length};t.req=u;var o=function(e){return Array.isArray(e)?e.length:"object"===i(e)?Object.keys(e).length:String(e).length};t.len=o;var c=function(e,t,r){return"function"===typeof e?e.call(t,r):r[e]};t.ref=c;var l=function(e,t){return(0,n.default)({type:e},function(e){return!u(e)||t.test(e)})};t.regex=l},8750:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n="web"===Object({NODE_ENV:"production",CLIENT:!0,SERVER:!1,DEV:!1,PROD:!0,THEME:"mat",MODE:"spa",VUE_ROUTER_MODE:"history",VUE_ROUTER_BASE:"/",APP_URL:"undefined"}).BUILD?r("cb69").withParams:r("0234").withParams,a=n;t.default=a},"91d3":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:":";return(0,n.withParams)({type:"macAddress"},function(t){if(!(0,n.req)(t))return!0;if("string"!==typeof t)return!1;var r="string"===typeof e&&""!==e?t.split(e):12===t.length||16===t.length?t.match(/.{2}/g):null;return null!==r&&(6===r.length||8===r.length)&&r.every(i)})};t.default=a;var i=function(e){return e.toLowerCase().match(/^[0-9a-f]{2}$/)}},"929c":function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div")},a=[];n._withStripped=!0;r("ac6a");var i={data:function(){return{branchOptions:[]}},created:function(){var e=this;e.$database.collection("branch").orderBy("code").get().then(function(t){t.forEach(function(t){e.branchOptions.push({id:t.id,data:t.data(),value:t.id,label:"".concat(t.data().code," : ").concat(t.data().description)})})})}},u=i,o=r("2877"),c=Object(o["a"])(u,n,a,!1,null,null,null);c.options.__file="branchOptions.vue";t["a"]=c.exports},aa82:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=function(e){return(0,n.withParams)({type:"requiredIf",prop:e},function(t,r){return!(0,n.ref)(e,this,r)||(0,n.req)(t)})};t.default=a},b5ae:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"alpha",{enumerable:!0,get:function(){return n.default}}),Object.defineProperty(t,"alphaNum",{enumerable:!0,get:function(){return a.default}}),Object.defineProperty(t,"numeric",{enumerable:!0,get:function(){return i.default}}),Object.defineProperty(t,"between",{enumerable:!0,get:function(){return u.default}}),Object.defineProperty(t,"email",{enumerable:!0,get:function(){return o.default}}),Object.defineProperty(t,"ipAddress",{enumerable:!0,get:function(){return c.default}}),Object.defineProperty(t,"macAddress",{enumerable:!0,get:function(){return l.default}}),Object.defineProperty(t,"maxLength",{enumerable:!0,get:function(){return f.default}}),Object.defineProperty(t,"minLength",{enumerable:!0,get:function(){return s.default}}),Object.defineProperty(t,"required",{enumerable:!0,get:function(){return d.default}}),Object.defineProperty(t,"requiredIf",{enumerable:!0,get:function(){return p.default}}),Object.defineProperty(t,"requiredUnless",{enumerable:!0,get:function(){return m.default}}),Object.defineProperty(t,"sameAs",{enumerable:!0,get:function(){return b.default}}),Object.defineProperty(t,"url",{enumerable:!0,get:function(){return h.default}}),Object.defineProperty(t,"or",{enumerable:!0,get:function(){return v.default}}),Object.defineProperty(t,"and",{enumerable:!0,get:function(){return y.default}}),Object.defineProperty(t,"not",{enumerable:!0,get:function(){return g.default}}),Object.defineProperty(t,"minValue",{enumerable:!0,get:function(){return w.default}}),Object.defineProperty(t,"maxValue",{enumerable:!0,get:function(){return _.default}}),Object.defineProperty(t,"integer",{enumerable:!0,get:function(){return O.default}}),Object.defineProperty(t,"decimal",{enumerable:!0,get:function(){return P.default}}),t.helpers=void 0;var n=q(r("6235")),a=q(r("3a54")),i=q(r("45b8")),u=q(r("ec11")),o=q(r("5d75")),c=q(r("c99d")),l=q(r("91d3")),f=q(r("2a12")),s=q(r("5db3")),d=q(r("d4f4")),p=q(r("aa82")),m=q(r("e652")),b=q(r("b6cb")),h=q(r("772d")),v=q(r("d294")),y=q(r("3360")),g=q(r("6417")),w=q(r("eb66")),_=q(r("46bc")),O=q(r("1331")),P=q(r("c301")),j=$(r("78ef"));function $(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var n=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,r):{};n.get||n.set?Object.defineProperty(t,r,n):t[r]=e[r]}return t.default=e,t}function q(e){return e&&e.__esModule?e:{default:e}}t.helpers=j},b6cb:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=function(e){return(0,n.withParams)({type:"sameAs",eq:e},function(t,r){return t===(0,n.ref)(e,this,r)})};t.default=a},c301:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=(0,n.regex)("decimal",/^[-]?\d*(\.\d+)?$/);t.default=a},c8bf:function(e,t,r){},c99d:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=(0,n.withParams)({type:"ipAddress"},function(e){if(!(0,n.req)(e))return!0;if("string"!==typeof e)return!1;var t=e.split(".");return 4===t.length&&t.every(i)});t.default=a;var i=function(e){if(e.length>3||0===e.length)return!1;if("0"===e[0]&&"0"!==e)return!1;if(!e.match(/^\d+$/))return!1;var t=0|+e;return t>=0&&t<=255}},cb69:function(e,t,r){"use strict";(function(e){function r(e){return r="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.withParams=void 0;var n="undefined"!==typeof window?window:"undefined"!==typeof e?e:{},a=function(e,t){return"object"===r(e)&&void 0!==t?t:e(function(){})},i=n.vuelidate?n.vuelidate.withParams:a;t.withParams=i}).call(this,r("c8ba"))},d11c:function(e,t,r){"use strict";var n=r("c8bf"),a=r.n(n);a.a},d294:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,n.withParams)({type:"or"},function(){for(var e=this,r=arguments.length,n=new Array(r),a=0;a<r;a++)n[a]=arguments[a];return t.length>0&&t.reduce(function(t,r){return t||r.apply(e,n)},!1)})};t.default=a},d4f4:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=(0,n.withParams)({type:"required"},n.req);t.default=a},e37c:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("q-page",[r("div",{staticClass:"row justify-between gutter-md"},[r("div",{staticClass:"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12"},[r("q-card-title",[r("q-icon",{attrs:{name:"vpn_key"}}),e._v(" "+e._s(e.$t("Login"))+"\n      "),r("span",{attrs:{slot:"right"},slot:"right"},[e._v(e._s(e.$t("Welcome back")))])],1),r("q-card-separator"),r("q-card-main",[r("q-field",{attrs:{icon:"face",error:e.$v.email.$error,"error-label":e.$t("Requires non-empty data")}},[r("q-input",{attrs:{autofocus:"true","float-label":e.$t("Mobile number"),type:"email"},on:{keyup:e.$v.email.$touch},model:{value:e.email,callback:function(t){e.email="string"===typeof t?t.trim():t},expression:"email"}})],1),r("q-field",{attrs:{icon:"fingerprint",error:e.$v.password.$error,"error-label":e.$t("Password must be at least 6 characters long")}},[r("q-input",{attrs:{disable:""===e.email,"float-label":e.$t("Password"),type:"password"},on:{keyup:e.$v.password.$touch},model:{value:e.password,callback:function(t){e.password="string"===typeof t?t.trim():t},expression:"password"}})],1)],1),r("q-card-actions",{attrs:{align:"center"}},[r("q-btn",{staticClass:"q-mr-sm",attrs:{color:"primary",label:e.$t("Login")},on:{click:e.login}})],1),r("q-card-actions",{attrs:{align:"center"}},[r("q-btn",{staticClass:"q-mr-sm",attrs:{label:e.$t("Forgot password?")},on:{click:function(t){e.$router.push("/forgot-password/otp")}}}),r("q-btn",{staticClass:"q-mr-sm",attrs:{label:e.$t("Sign up")},on:{click:function(t){e.$router.push("/auth/signup/phone")}}})],1)],1)])])},a=[];n._withStripped=!0;r("7514"),r("ac6a"),r("551c"),r("96cf");var i=r("c973"),u=r.n(i),o=r("3156"),c=r.n(o),l=r("2f62"),f=r("b5ae"),s=r("929c"),d=r("0caf"),p={name:"login",mixins:[s["a"],d["a"]],data:function(){return{signup:!0,email:this.$route.query.email,password:null,collectionSize:0,pagination:{sortBy:"firstName",descending:!1,rowsPerPage:100},filterByBranch:"",columns:[{name:"firstName",label:this.$t("First name"),field:"firstName",sortable:!0,align:"left"},{name:"lastName",label:this.$t("Last name"),field:"lastName",sortable:!0,align:"left"},{name:"branch",label:this.$t("Branch"),field:"branch",sortable:!0,align:"left"},{name:"department",label:this.$t("Department"),field:"department",sortable:!0,align:"left"}],visibleColumns:["firstName","lastName","branch","department"],selected:[],filter:"",loading:!0}},firestore:function(){return{authUser:this.$database.collection("authUser").where("active","==",!0),initialSetup:this.$database.collection("initialSetup")}},validations:{email:{required:f["required"],minLength:Object(f["minLength"])(10)},password:{required:f["required"]}},methods:c()({},Object(l["b"])(["signUserIn","checkEmailVerified"]),Object(l["d"])(["setAllDrawerClose","setLeftDrawerState"]),{checkKey:function(e){13===e.charCode&&this.login()},loadingStatus:function(){var e=this;e.$firestore.authUser.get().then(function(t){e.collectionSize=t.size,e.loading=!1})},login:function(){var e=u()(regeneratorRuntime.mark(function e(){var t,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:t=this,r=t.email,t.$v.$invalid?t.$q.notify({message:t.$t("Form validation error"),type:"nagative",icon:"error_outline"}):(t.$isEmail.validate(t.email)||(r="+66".concat(t.email.slice(1),"@email.com")),console.log(r),t.signUserIn({email:r,password:t.password,router:t.$router}));case 3:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),rowClick:function(e){this.selected=[e]},checkAllowSignup:function(){var e=this;return new Promise(function(t){var r=e,n=!1;r.$firestore.initialSetup.where("code","==","_SIGNUP").limit(1).get().then(function(e){return e.forEach(function(e){n=e.data().value}),t(n)})})},getBranchName:function(e){var t=this,r="...";return t.branchOptions&&t._.find(t.branchOptions,{id:e})&&(r=t._.find(t.branchOptions,{id:e}).data.code),r},getDeptName:function(e){var t=this,r="...";return t.departmentOptions&&t._.find(t.departmentOptions,{id:e})&&(r=t._.find(t.departmentOptions,{id:e}).data.code),r}}),created:function(){var e=u()(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=this,window.addEventListener("keypress",t.checkKey),t.setAllDrawerClose(),t.setLeftDrawerState(!0),t.loadingStatus(),e.next=7,t.checkAllowSignup();case 7:t.signup=e.sent;case 8:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),computed:c()({},Object(l["c"])(["leftDrawerState"])),watch:{filterByBranch:function(){var e=u()(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:this.filterByAccountCode="",this.$binding("authUser",this.$database.collection("authUser").where("active","==",!0).where("branch","==",this.filterByBranch));case 2:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),selected:function(){this.selected&&(this.email=this.selected[0].email,window.scrollTo(0,0))}},beforeDestroy:function(){window.removeEventListener("keypress",this.checkKey)}},m=p,b=(r("d11c"),r("2877")),h=Object(b["a"])(m,n,a,!1,null,null,null);h.options.__file="login.vue";t["default"]=h.exports},e652:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=function(e){return(0,n.withParams)({type:"requiredUnless",prop:e},function(t,r){return!!(0,n.ref)(e,this,r)||(0,n.req)(t)})};t.default=a},eb66:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=function(e){return(0,n.withParams)({type:"minValue",min:e},function(t){return!(0,n.req)(t)||(!/\s/.test(t)||t instanceof Date)&&+t>=+e})};t.default=a},ec11:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=function(e,t){return(0,n.withParams)({type:"between",min:e,max:t},function(r){return!(0,n.req)(r)||(!/\s/.test(r)||r instanceof Date)&&+e<=+r&&+t>=+r})};t.default=a}}]);