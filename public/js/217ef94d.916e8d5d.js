(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["217ef94d"],{"0ae9":function(e,t,r){},"251a":function(e,t,r){"use strict";r("ac6a"),r("3b2b");var s,a,i=r("7037"),n=r.n(i),o=(r("6b54"),r("f5766"),r("551c"),{data:function(){return{collapseState:""}},methods:{convertImgToBase64:function(e,t,r){var s=new Image;s.crossOrigin="Anonymous",s.onload=function(){var e=document.createElement("CANVAS"),s=e.getContext("2d");e.height=this.height,e.width=this.width,s.drawImage(this,0,0);var a=e.toDataURL(r||"image/png");t(a),e=null},s.src=e},simulateDelay:function(e){return new Promise(function(t){setTimeout(function(){return t(!0)},e)})},toggleCollapse:function(){""===this.collapseState?this.collapseState="bg-white inset-shadow":this.collapseState=""},convertMinuite2TimeDuration:function(e){var t=e%60,r=(e-t)/60,s="".concat(r.toString().padStart(2,"0"),":").concat(t.toString().padStart(2,"0"));return s},isString:function(e){return"string"===typeof e||e instanceof String},isNumber:function(e){return"number"===typeof e&&isFinite(e)},isArray:function(e){return e&&"object"===n()(e)&&e.constructor===Array},isFunction:function(e){return"function"===typeof e},isObject:function(e){return e&&"object"===n()(e)&&e.constructor===Object},isNull:function(e){return null===e},isUndefined:function(e){return"undefined"===typeof e},isBoolean:function(e){return"boolean"===typeof e},isRegExp:function(e){return e&&"object"===n()(e)&&e.constructor===RegExp},isError:function(e){return e instanceof Error&&"undefined"!==typeof e.message},isDate:function(e){return e instanceof Date},isSymbol:function(e){return"symbol"===n()(e)},getContent:function(e,t){var r=this;return new Promise(function(s){var a=r,i=[];a.$database.collection("contents").where("group","==",e).where("locale","==",t).get().then(function(e){return e.forEach(function(e){i.push({code:e.data().code,body:e.data().body})}),s(i)})})}}}),l=o,c=r("2877"),m=Object(c["a"])(l,s,a,!1,null,null,null);m.options.__file="publicFunc.vue";t["a"]=m.exports},"2e08":function(e,t,r){var s=r("9def"),a=r("9744"),i=r("be13");e.exports=function(e,t,r,n){var o=String(i(e)),l=o.length,c=void 0===r?" ":String(r),m=s(t);if(m<=l||""==c)return o;var u=m-l,p=a.call(c,Math.ceil(u/c.length));return p.length>u&&(p=p.slice(0,u)),n?p+o:o+p}},"2e9e":function(e,t,r){},"3b2b":function(e,t,r){var s=r("7726"),a=r("5dbce"),i=r("86cc").f,n=r("9093").f,o=r("aae3"),l=r("0bfb"),c=s.RegExp,m=c,u=c.prototype,p=/a/g,d=/a/g,f=new c(p)!==p;if(r("9e1e")&&(!f||r("79e5")(function(){return d[r("2b4c")("match")]=!1,c(p)!=p||c(d)==d||"/a/i"!=c(p,"i")}))){c=function(e,t){var r=this instanceof c,s=o(e),i=void 0===t;return!r&&s&&e.constructor===c&&i?e:a(f?new m(s&&!i?e.source:e,t):m((s=e instanceof c)?e.source:e,s&&i?l.call(e):t),r?this:u,c)};for(var h=function(e){e in c||i(c,e,{configurable:!0,get:function(){return m[e]},set:function(t){m[e]=t}})},v=n(m),b=0;v.length>b;)h(v[b++]);u.constructor=c,c.prototype=u,r("2aba")(s,"RegExp",c)}r("7a56")("RegExp")},"469d":function(e,t,r){var s={"./ar":["812a","2d0dd41e"],"./ar.js":["812a","2d0dd41e"],"./bg":["4155","2d0c02d3"],"./bg.js":["4155","2d0c02d3"],"./ca":["ef23","2d230f98"],"./ca.js":["ef23","2d230f98"],"./cs":["2b42","2d0bd1e4"],"./cs.js":["2b42","2d0bd1e4"],"./da":["56d8","2d0c8fab"],"./da.js":["56d8","2d0c8fab"],"./de":["fa58","2d237194"],"./de.js":["fa58","2d237194"],"./el":["c666","2d217329"],"./el.js":["c666","2d217329"],"./en-uk":["9af1","2d0f02c9"],"./en-uk.js":["9af1","2d0f02c9"],"./en-us":["9ff4"],"./en-us.js":["9ff4"],"./es":["74f1","2d0d711e"],"./es.js":["74f1","2d0d711e"],"./fa-ir":["4bcb","2d0cc083"],"./fa-ir.js":["4bcb","2d0cc083"],"./fr":["b411","2d20f6a8"],"./fr.js":["b411","2d20f6a8"],"./gn":["359e","2d0b9e24"],"./gn.js":["359e","2d0b9e24"],"./he":["ba93","2d21a08f"],"./he.js":["ba93","2d21a08f"],"./hr":["031d","2d0a388c"],"./hr.js":["031d","2d0a388c"],"./hu":["7e5d","2d0e2353"],"./hu.js":["7e5d","2d0e2353"],"./id":["e521","2d2257a5"],"./id.js":["e521","2d2257a5"],"./it":["f17c","2d22bdcd"],"./it.js":["f17c","2d22bdcd"],"./ja":["1258","2d0aa97a"],"./ja.js":["1258","2d0aa97a"],"./ko-kr":["dd7b","2d229481"],"./ko-kr.js":["dd7b","2d229481"],"./lu":["aca7","2d21388e"],"./lu.js":["aca7","2d21388e"],"./lv":["431d","2d0c0a08"],"./lv.js":["431d","2d0c0a08"],"./ms":["876c","2d0deb22"],"./ms.js":["876c","2d0deb22"],"./nb-no":["82e2","2d0ddddd"],"./nb-no.js":["82e2","2d0ddddd"],"./nl":["7f61","2d0e2700"],"./nl.js":["7f61","2d0e2700"],"./pl":["9616","2d0e5af8"],"./pl.js":["9616","2d0e5af8"],"./pt":["8927","2d0df1fc"],"./pt-br":["b848","2d210610"],"./pt-br.js":["b848","2d210610"],"./pt.js":["8927","2d0df1fc"],"./ro":["71c9","2d0d6586"],"./ro.js":["71c9","2d0d6586"],"./rs":["3146","2d0b8e56"],"./rs.js":["3146","2d0b8e56"],"./ru":["5372","2d0c7eef"],"./ru.js":["5372","2d0c7eef"],"./sk":["5ff5","2d0d4416"],"./sk.js":["5ff5","2d0d4416"],"./sl":["cab0","2d2219e2"],"./sl.js":["cab0","2d2219e2"],"./sv":["c60d","2d21729d"],"./sv.js":["c60d","2d21729d"],"./th":["22fa","2d0b23f1"],"./th.js":["22fa","2d0b23f1"],"./tr":["8d7c","2d0e942e"],"./tr.js":["8d7c","2d0e942e"],"./uk":["d7bd","2d21f0cb"],"./uk.js":["d7bd","2d21f0cb"],"./vi":["7f06","2d0e264b"],"./vi.js":["7f06","2d0e264b"],"./zh-hans":["d1e7","2d21da75"],"./zh-hans.js":["d1e7","2d21da75"],"./zh-hant":["d472","2d21e021"],"./zh-hant.js":["d472","2d21e021"]};function a(e){var t=s[e];return t?Promise.all(t.slice(1).map(r.e)).then(function(){var e=t[0];return r(e)}):Promise.resolve().then(function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t})}a.keys=function(){return Object.keys(s)},a.id="469d",e.exports=a},5220:function(e,t,r){"use strict";var s=r("2e9e"),a=r.n(s);a.a},5323:function(e,t,r){e.exports=r.p+"img/customer-logo.6c7c30c8.png"},7231:function(e,t,r){"use strict";var s,a,i=r("3156"),n=r.n(i),o=r("2f62"),l={data:function(){return{lang:"",languageOption:[{label:"EN",value:"en-us"},{label:"TH",value:"th"}]}},methods:n()({},Object(o["d"])(["setLocale"])),computed:n()({},Object(o["c"])(["locale"])),created:function(){this.lang=this.locale},watch:{locale:function(){this.lang=this.locale,this.$i18n.locale=this.locale,this.$i18n.fallbackLocale=this.locale},lang:function(e){var t=this;r("469d")("./".concat(e)).then(function(e){t.$q.i18n.set(e.default)}),this.setLocale(e),this.$i18n.locale=e,this.$i18n.fallbackLocale=e}}},c=l,m=r("2877"),u=Object(m["a"])(c,s,a,!1,null,null,null);u.options.__file="langSwitch.vue";t["a"]=u.exports},7266:function(e,t,r){"use strict";var s,a,i=r("3156"),n=r.n(i),o=r("2f62"),l={methods:{hasPermission:function(e){var t=this._.uniq(this.userPermission),r=this._.intersection(t,e).length;return r}},computed:n()({},Object(o["c"])(["userPermission"]))},c=l,m=r("2877"),u=Object(m["a"])(c,s,a,!1,null,null,null);u.options.__file="hasPermission.vue";t["a"]=u.exports},"7b3d":function(e,t,r){"use strict";r.r(t);var s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("q-layout",{attrs:{view:"lHh Lpr lFf"}},[r("q-layout-header",[r("q-toolbar",{attrs:{color:"primary"}},[r("q-btn",{staticClass:"shadow-0",attrs:{color:"blue",icon:"menu",disable:e.leftDrawerState},on:{click:e.leftDrawerAction}}),r("q-toolbar-title",[e._v("\n        "+e._s(e.$t(e.applicationName))+"\n        "),r("div",{attrs:{slot:"subtitle"},slot:"subtitle"},[e._v("\n          "+e._s(e.$t(e.subtitle))+"\n        ")])]),[r("q-btn-toggle",{staticClass:"shadow-0",attrs:{color:"blue-7","toggle-color":"blue",options:e.languageOption},model:{value:e.lang,callback:function(t){e.lang=t},expression:"lang"}})]],2)],1),r("q-layout-drawer",{attrs:{"content-class":"bg-grey-2"},model:{value:e.leftDrawer,callback:function(t){e.leftDrawer=t},expression:"leftDrawer"}},[r("customer-logo"),r("main-menu")],1),r("q-page-container",[e.userEmailVerified?r("div",[r("router-view")],1):r("div",[r("email-address-verifier")],1)])],1)},a=[];s._withStripped=!0;r("96cf");var i=r("c973"),n=r.n(i),o=r("3156"),l=r.n(o),c=r("96a1"),m=r("2f62"),u=r("514e"),p=r("a18c"),d=r("7231"),f=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div")},h=[];f._withStripped=!0;r("ac6a");var v={watch:{notifyState:function(){var e=this;if(e.notifyState){var t={};e._.forEach(e.notifyOptions,function(r,s){t[s]="message"===s?e.$t(r):r}),e.$q.notify(t)}e.resetNotifyState()}}},b=v,g=r("2877"),_=Object(g["a"])(b,f,h,!1,null,null,null);_.options.__file="notifyActive.vue";var q=_.exports,y=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("q-list",[e.userId?[r("q-list-header",[r("q-btn",{staticStyle:{width:"100%"},attrs:{icon:"face",flat:"",label:e.email},on:{click:function(t){e.$router.push("/my-account/profile/"+e.userId+"/personal")}}})],1)]:[r("q-btn",{staticStyle:{width:"100%"},attrs:{label:e.$t("Login or Signup")},on:{click:function(t){e.$router.push("/login")}}})],r("q-item",{attrs:{to:"/",exact:""}},[r("q-item-side",{attrs:{icon:"home"}}),r("q-item-main",{attrs:{label:e.$t("Home")}})],1),e.userEmailVerified?[e.userId?[e.userId?r("my-section"):e._e(),e.hasPermission(["team-supervisor"])?r("team-supervisor"):e._e(),r("q-list-header",[e._v(e._s(e.$t("Operation")))]),e.hasPermission(["planner"])?r("planner"):e._e(),e.hasPermission(["personnel"])?r("personnel"):e._e(),e.hasPermission(["payroll"])?r("payroll"):e._e(),e.hasPermission(["system-setting"])?r("system-setting"):e._e(),e.hasPermission(["utilities"])?r("utilities"):e._e(),e.hasPermission(["access-control"])?r("access-control"):e._e()]:e._e(),e.userId?r("q-item",{attrs:{to:"/auth/logout",exact:""}},[r("q-item-side",{attrs:{icon:"exit_to_app"}}),r("q-item-main",{attrs:{label:e.$t("Logout")}})],1):e._e()]:e._e()],2)],1)},$=[];y._withStripped=!0;var w=r("7266"),P=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("q-collapsible",{class:e.collapseState,attrs:{indent:"",icon:"face",label:e.$t("My  account")},on:{show:e.toggleCollapse,hide:e.toggleCollapse}},[r("q-item-separator"),r("q-item",{attrs:{to:{path:"/my-account/profile/"+e.userId}}},[r("q-item-main",{attrs:{label:e.$t("Profile")}})],1),r("q-item",{attrs:{to:"/my-account/change-password"}},[r("q-item-main",{attrs:{label:e.$t("Change Password")}})],1)],1)},S=[];P._withStripped=!0;var j=r("251a"),O={mixins:[w["a"],j["a"]],data:function(){return{collapseState:""}},computed:l()({},Object(m["c"])(["userId"]))},x=O,E=Object(g["a"])(x,P,S,!1,null,null,null);E.options.__file="mySection.vue";var A=E.exports,C=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("q-collapsible",{class:e.collapseState,attrs:{indent:"",icon:"offline_pin",label:e.$t("Supervisor")},on:{show:function(t){e.toggleCollapse,e.getLeaveApproval(),e.getOvertimeApproval()},hide:e.toggleCollapse}},[r("q-item",{attrs:{to:"/my-account/leave-approve"}},[r("q-item-main",{attrs:{label:e.$t("Approve leave requests")}}),r("q-item-side",{attrs:{right:""}},[r("q-chip",{attrs:{small:"",square:"",color:"primary"},on:{click:e.getLeaveApproval}},[e._v(e._s(e.leaveApproval))])],1)],1),r("q-item",{attrs:{to:"/my-account/approve-overtime-approve"}},[r("q-item-main",{attrs:{label:e.$t("Approve OT requests")}}),r("q-item-side",{attrs:{right:""}},[r("q-chip",{attrs:{small:"",square:"",color:"primary"},on:{click:e.getOvertimeApproval}},[e._v(e._s(e.overtimeApproval))])],1)],1)],1)},k=[];C._withStripped=!0;var R={mixins:[j["a"]],data:function(){return{collapseState:"",leaveApproval:0,overtimeApproval:0}},firestore:function(){return{leaveRequest:this.$database.collection("leaveRequest").where("approval","==",!1),overtimeRequest:this.$database.collection("overtimeRequest").where("approval","==",!1)}},methods:{getLeaveApproval:function(){var e=this;e.$firestore.leaveRequest.get().then(function(t){e.leaveApproval=t.size})},getOvertimeApproval:function(){var e=this;e.$firestore.overtimeRequest.get().then(function(t){e.overtimeApproval=t.size})}},computed:l()({},Object(m["c"])(["userId"])),created:function(){this.getLeaveApproval(),this.getOvertimeApproval()}},D=R,L=Object(g["a"])(D,C,k,!1,null,null,null);L.options.__file="teamSupervisor.vue";var I=L.exports,z=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("q-collapsible",{class:e.collapseState,attrs:{indent:"",icon:"card_giftcard",label:e.$t("inventory")},on:{show:e.toggleCollapse,hide:e.toggleCollapse}},[e.hasPermission(["inventory--product-info"])?r("q-item",{attrs:{to:"/inventory/product-info"}},[r("q-item-main",{attrs:{label:e.$t("productInfo")}})],1):e._e(),e.hasPermission(["inventory--stock-entry"])?r("q-item",{attrs:{to:"/inventory/stock-entry"}},[r("q-item-main",{attrs:{label:e.$t("stockEntry")}})],1):e._e(),e.hasPermission(["inventory-item-adjustments"])?r("q-item",{attrs:{to:"/inventory/item-adjustments"}},[r("q-item-main",{attrs:{label:e.$t("itemAdjustments")}})],1):e._e(),e.hasPermission(["inventory--transfer-order"])?r("q-item",{attrs:{to:"/inventory/transfer-order"}},[r("q-item-main",{attrs:{label:e.$t("transferOrder")}})],1):e._e(),r("q-item-separator"),e.hasPermission(["inventory--reports"])?[r("q-list-header",[e._v(e._s(e.$t("Reports")))]),e.hasPermission(["inventory--reports--stock-movement-report"])?r("q-item",{attrs:{to:"/inventory/reports/stock-movement-report"}},[r("q-item-main",{attrs:{label:e.$t("stockMovementReport")}})],1):e._e(),e.hasPermission(["inventory--reports--product-sales-report"])?r("q-item",{attrs:{to:"/inventory/reports/product-sales-report"}},[r("q-item-main",{attrs:{label:e.$t("productSalesReport")}})],1):e._e(),e.hasPermission(["inventory--reports--active-purchase-orders-report"])?r("q-item",{attrs:{to:"/inventory/reports/active-purchase-orders-report"}},[r("q-item-main",{attrs:{label:e.$t("activePurchaseOrderReport")}})],1):e._e(),e.hasPermission(["inventory--reports--inventory-details"])?r("q-item",{attrs:{to:"/inventory/reports/inventory-details-report"}},[r("q-item-main",{attrs:{label:e.$t("inventoryDetailsReport")}})],1):e._e(),e.hasPermission(["inventory--reports--inventory-valuation-summary"])?r("q-item",{attrs:{to:"/inventory/reports/inventory-valuation-summary-report"}},[r("q-item-main",{attrs:{label:e.$t("inventoryValuationSummaryReport")}})],1):e._e(),e.hasPermission(["inventory--reports--warehouse-report"])?r("q-item",{attrs:{to:"/inventory/reports/warehouse-report"}},[r("q-item-main",{attrs:{label:e.$t("warehouseReport")}})],1):e._e(),r("q-item-separator")]:e._e(),e.hasPermission(["inventory--configure"])?[r("q-list-header",[e._v(e._s(e.$t("Configure")))]),e.hasPermission(["inventory--configure--warehouse"])?r("q-item",{attrs:{to:"/inventory/configure/warehouse"}},[r("q-item-main",{attrs:{label:e.$t("warehouse")}})],1):e._e(),e.hasPermission(["inventory--configure--items"])?r("q-item",{attrs:{to:"/inventory/configure/items"}},[r("q-item-main",{attrs:{label:e.$t("items")}})],1):e._e(),e.hasPermission(["inventory--configure--composite-item"])?r("q-item",{attrs:{to:"/inventory/configure/composite-items"}},[r("q-item-main",{attrs:{label:e.$t("compositeItems")}})],1):e._e(),e.hasPermission(["inventory--configure--price-lists"])?r("q-item",{attrs:{to:"/inventory/configure/price-lists"}},[r("q-item-main",{attrs:{label:e.$t("priceLists")}})],1):e._e()]:e._e()],2)},V=[];z._withStripped=!0;var N={mixins:[w["a"],j["a"]]},T=N,U=Object(g["a"])(T,z,V,!1,null,null,null);U.options.__file="inventory.vue";var B=U.exports,M=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("q-collapsible",{class:e.collapseState,attrs:{indent:"",icon:"add_shopping_cart",label:e.$t("purchaseOrders")},on:{show:e.toggleCollapse,hide:e.toggleCollapse}},[e.hasPermission(["purchase-order--managing-purchase-orders"])?r("q-item",{attrs:{to:"/purchase-order/managing-purchase-orders"}},[r("q-item-main",{attrs:{label:e.$t("managingPurchaseOrders")}})],1):e._e(),r("q-item-separator"),e.hasPermission(["purchase-order--reports"])?[r("q-list-header",[e._v(e._s(e.$t("Reports")))]),e.hasPermission(["purchase-order--reports--purchase-order-history-report"])?r("q-item",{attrs:{to:"/purchase-order/purchase-order-history-report"}},[r("q-item-main",{attrs:{label:e.$t("purchaseOrderHistoryReport")}})],1):e._e(),e.hasPermission(["purchase-order--reports--receive-history-report"])?r("q-item",{attrs:{to:"/purchase-order/receive-history-report"}},[r("q-item-main",{attrs:{label:e.$t("receiveHistoryReport")}})],1):e._e(),e.hasPermission(["purchase-order--reports--purchase-by-vendor-report"])?r("q-item",{attrs:{to:"/purchase-order/purchase-by-vendor-report"}},[r("q-item-main",{attrs:{label:e.$t("purchaseByVendorReport")}})],1):e._e(),e.hasPermission(["purchase-order--reports--purchases-by-item-report"])?r("q-item",{attrs:{to:"/purchase-order/purchases-by-item-report"}},[r("q-item-main",{attrs:{label:e.$t("purchasesByItemReport")}})],1):e._e(),e.hasPermission(["purchase-order--reports--bill-details-report"])?r("q-item",{attrs:{to:"/purchase-order/bill-details-report"}},[r("q-item-main",{attrs:{label:e.$t("billDetailsReport")}})],1):e._e(),e.hasPermission(["purchase-order--reports--payments-made-report"])?r("q-item",{attrs:{to:"/purchase-order/payments-made-report"}},[r("q-item-main",{attrs:{label:e.$t("paymentsMadeReport")}})],1):e._e(),e.hasPermission(["purchase-order--reports--vendor-balance-report"])?r("q-item",{attrs:{to:"/purchase-order/vendor-balance-report"}},[r("q-item-main",{attrs:{label:e.$t("vendorBalanceReport")}})],1):e._e(),r("q-item-separator")]:e._e(),e.hasPermission(["purchase-order--configure"])?[r("q-list-header",[e._v(e._s(e.$t("Configure")))]),e.hasPermission(["purchase-order--configure--vendor-type"])?r("q-item",{attrs:{to:"/purchase-order/vendor-type"}},[r("q-item-main",{attrs:{label:e.$t("vendorType")}})],1):e._e(),e.hasPermission(["purchase-order--configure--purchase-order-status"])?r("q-item",{attrs:{to:"/purchase-order/purchase-order-status"}},[r("q-item-main",{attrs:{label:e.$t("purchaseOrderStatus")}})],1):e._e(),e.hasPermission(["purchase-order--configure--purchase-amount-approval-limit"])?r("q-item",{attrs:{to:"/purchase-order/purchase-amount-approval-limit"}},[r("q-item-main",{attrs:{label:e.$t("purchaseAmountApprovalLimit")}})],1):e._e()]:e._e()],2)},F=[];M._withStripped=!0;var H={mixins:[w["a"],j["a"]]},J=H,W=Object(g["a"])(J,M,F,!1,null,null,null);W.options.__file="purchaseOrders.vue";var G=W.exports,K=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("q-collapsible",{class:e.collapseState,attrs:{indent:"",icon:"favorite_border",label:e.$t("Services")},on:{show:e.toggleCollapse,hide:e.toggleCollapse}},[e.hasPermission(["services--contacts"])?r("q-item",{attrs:{to:"/services/contacts"}},[r("q-item-main",{attrs:{label:e.$t("Contacts")}})],1):e._e(),e.hasPermission(["services--manage-sale-orders"])?r("q-item",{attrs:{to:"/services/manage-sale-orders"}},[r("q-item-main",{attrs:{label:e.$t("Manage sale orders")}})],1):e._e(),e.hasPermission(["services--invoices"])?r("q-item",{attrs:{to:"/services/invoices"}},[r("q-item-main",{attrs:{label:e.$t("Invoices")}})],1):e._e(),e.hasPermission(["services--deliveries"])?r("q-item",{attrs:{to:"/services/deliveries"}},[r("q-item-main",{attrs:{label:e.$t("deliveries")}})],1):e._e(),e.hasPermission(["no-permission"])?[r("q-item-separator"),r("q-list-header",[e._v(e._s(e.$t("Reports")))]),r("q-item",{attrs:{to:"/services/sales-order-history"}},[r("q-item-main",{attrs:{label:e.$t("Sales order history")}})],1),r("q-item",{attrs:{to:"/services/invoice-history"}},[r("q-item-main",{attrs:{label:e.$t("Invoice history")}})],1),r("q-item",{attrs:{to:"/services/payments-received"}},[r("q-item-main",{attrs:{label:e.$t("Payments received")}})],1),r("q-item",{attrs:{to:"/services/sales-by-customer"}},[r("q-item-main",{attrs:{label:e.$t("Sales by customer")}})],1),r("q-item",{attrs:{to:"/services/sales-by-item"}},[r("q-item-main",{attrs:{label:e.$t("salesByItem")}})],1),r("q-item",{attrs:{to:"/services/sales-by-salesperson"}},[r("q-item-main",{attrs:{label:e.$t("Sales by sales person")}})],1),r("q-item",{attrs:{to:"/services/customer-balance"}},[r("q-item-main",{attrs:{label:e.$t("Customer balance")}})],1),r("q-item-separator"),r("q-list-header",[e._v(e._s(e.$t("Configure")))]),r("q-item",{attrs:{to:"/services/sales-accounts"}},[r("q-item-main",{attrs:{label:e.$t("Sales accounts")}})],1)]:e._e()],2)},Q=[];K._withStripped=!0;var X={mixins:[w["a"],j["a"]]},Y=X,Z=Object(g["a"])(Y,K,Q,!1,null,null,null);Z.options.__file="services.vue";var ee=Z.exports,te=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("q-collapsible",{class:e.collapseState,attrs:{indent:"",icon:"access_time",label:e.$t("Planner")},on:{show:e.toggleCollapse,hide:e.toggleCollapse}},[e.hasPermission(["planner--team-calendars"])?r("q-item",{attrs:{to:"/planner/team-calendars"}},[r("q-item-main",{attrs:{label:e.$t("Team")}})],1):e._e(),r("q-item",{attrs:{to:"/planner/roster"}},[r("q-item-main",{attrs:{label:e.$t("Work schedule")}})],1),e.hasPermission(["planner--time-attendance-master"])?r("q-item",{attrs:{to:"/planner/time-attendance-master"}},[r("q-item-main",{attrs:{label:e.$t("Time attendance master")}})],1):e._e(),r("q-item-separator"),r("q-list-header",[e._v(e._s(e.$t("Reports")))]),r("q-item",{attrs:{to:"/planner/reports/time-attendance-report"}},[r("q-item-main",{attrs:{label:e.$t("Time attendance report")}})],1),r("q-item-separator"),r("q-list-header",[e._v(e._s(e.$t("Configure")))]),r("q-item",{attrs:{to:"/planner/configure/public-holidays"}},[r("q-item-main",{attrs:{label:e.$t("Public holidays")}})],1),r("q-item",{attrs:{to:"/planner/configure/leave-and-absence-types"}},[r("q-item-main",{attrs:{label:e.$t("Leave & absence types")}})],1),r("q-item",{attrs:{to:"/planner/configure/activity-types"}},[r("q-item-main",{attrs:{label:e.$t("Activity types")}})],1)],1)},re=[];te._withStripped=!0;var se={mixins:[w["a"],j["a"]]},ae=se,ie=Object(g["a"])(ae,te,re,!1,null,null,null);ie.options.__file="planner.vue";var ne=ie.exports,oe=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("q-collapsible",{class:e.collapseState,attrs:{indent:"",icon:"people_outline",label:e.$t("Personnel")},on:{show:e.toggleCollapse,hide:e.toggleCollapse}},[e.hasPermission(["personnel--employee-management"])?r("q-item",{attrs:{to:"/personnel/employee-management"}},[r("q-item-main",{attrs:{label:e.$t("Employee management")}})],1):e._e(),e.hasPermission(["personnel--leave-master"])?r("q-item",{attrs:{to:"/personnel/leave-master"}},[r("q-item-main",{attrs:{label:e.$t("Leave master")}})],1):e._e(),e.hasPermission(["personnel--overtime-master"])?r("q-item",{attrs:{to:"/personnel/overtime-master"}},[r("q-item-main",{attrs:{label:e.$t("Overtime master")}})],1):e._e(),r("q-item-separator"),e.hasPermission(["personnel--reports"])?[r("q-list-header",[e._v(e._s(e.$t("Reports")))]),e.hasPermission(["personnel--reports--employee-list"])?r("q-item",{attrs:{to:"/personnel/employee-list-reports"}},[r("q-item-main",{attrs:{label:e.$t("Employee list")}})],1):e._e(),e.hasPermission(["personnel--reports--employee-list"])?r("q-item",{attrs:{to:"/personnel/leave-without-pay-reports"}},[r("q-item-main",{attrs:{label:e.$t("Leave Without Pay list")}})],1):e._e(),e.hasPermission(["personnel--reports--employee-list"])?r("q-item",{attrs:{to:"/personnel/time-attendance-reports"}},[r("q-item-main",{attrs:{label:e.$t("Time Attendance")}})],1):e._e(),r("q-item-separator")]:e._e(),e.hasPermission(["personnel--configure"])?[r("q-list-header",[e._v(e._s(e.$t("Configure")))]),e.hasPermission(["personnel--configure--organization"])?r("organization"):e._e(),e.hasPermission(["personnel--configure--options"])?r("personnel-options"):e._e()]:e._e()],2)},le=[];oe._withStripped=!0;var ce=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("q-collapsible",{attrs:{label:e.$t("Organization")}},[e.hasPermission(["personnel--configure--organization--company"])?r("q-item",{attrs:{to:"/personnel/configure/organization/company"}},[r("q-item-main",{attrs:{label:e.$t("Company")}})],1):e._e(),e.hasPermission(["personnel--configure--organization--branch"])?r("q-item",{attrs:{to:"/personnel/configure/organization/branch"}},[r("q-item-main",{attrs:{label:e.$t("Branch")}})],1):e._e(),e.hasPermission(["personnel--configure--organization--department"])?r("q-item",{attrs:{to:"/personnel/configure/organization/department"}},[r("q-item-main",{attrs:{label:e.$t("Department")}})],1):e._e(),e.hasPermission(["personnel--configure--organization--position"])?r("q-item",{attrs:{to:"/personnel/configure/organization/position"}},[r("q-item-main",{attrs:{label:e.$t("Position")}})],1):e._e()],1)},me=[];ce._withStripped=!0;var ue={mixins:[w["a"]]},pe=ue,de=Object(g["a"])(pe,ce,me,!1,null,null,null);de.options.__file="organization.vue";var fe=de.exports,he=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("q-collapsible",{attrs:{label:e.$t("Options")}},[e.hasPermission(["personnel--configure--options--title"])?r("q-item",{attrs:{to:"/personnel/configure/options/title"}},[r("q-item-main",{attrs:{label:e.$t("Title")}})],1):e._e(),e.hasPermission(["personnel--configure--options--education"])?r("q-item",{attrs:{to:"/personnel/configure/options/education"}},[r("q-item-main",{attrs:{label:e.$t("Education")}})],1):e._e(),r("q-item-separator"),e.hasPermission(["personnel--configure--options--employment-status"])?r("q-item",{attrs:{to:"/personnel/configure/options/employment-status"}},[r("q-item-main",{attrs:{label:e.$t("Employment status")}})],1):e._e(),e.hasPermission(["personnel--configure--options--overtime-type"])?r("q-item",{attrs:{to:"/personnel/configure/options/overtime-type"}},[r("q-item-main",{attrs:{label:e.$t("Overtime type")}})],1):e._e()],1)},ve=[];he._withStripped=!0;var be={mixins:[w["a"]]},ge=be,_e=Object(g["a"])(ge,he,ve,!1,null,null,null);_e.options.__file="personnelOptions.vue";var qe=_e.exports,ye={mixins:[w["a"],j["a"]],components:{organization:fe,personnelOptions:qe}},$e=ye,we=Object(g["a"])($e,oe,le,!1,null,null,null);we.options.__file="personnel.vue";var Pe=we.exports,Se=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("q-collapsible",{class:e.collapseState,attrs:{indent:"",icon:"event_available",label:e.$t("Payroll")},on:{show:e.toggleCollapse,hide:e.toggleCollapse}},[e.hasPermission(["payroll--payroll-process"])?r("q-item",{attrs:{to:"/payroll/payroll-process"}},[r("q-item-main",{attrs:{label:e.$t("Payroll process")}})],1):e._e(),e.hasPermission(["payroll--transaction-posting"])?r("q-item",{attrs:{to:"/payroll/transaction-posting"}},[r("q-item-main",{attrs:{label:e.$t("Transaction posting")}})],1):e._e(),r("q-item-separator"),e.hasPermission(["payroll--reports"])?[r("q-list-header",[e._v(e._s(e.$t("Reports")))]),e.hasPermission(["payroll--reports--payroll-process-summary-report"])?r("q-item",{attrs:{to:"/payroll/reports/payroll-process-summary-report"}},[r("q-item-main",{attrs:{label:e.$t("Summary report")}})],1):e._e(),r("q-item-separator")]:e._e(),e.hasPermission(["payroll--configure"])?[r("q-list-header",[e._v(e._s(e.$t("Configure")))]),e.hasPermission(["payroll--configure--posting-category"])?r("q-item",{attrs:{to:"/payroll/configure/posting-category"}},[r("q-item-main",{attrs:{label:e.$t("Posting category")}})],1):e._e(),e.hasPermission(["payroll--configure--account-code"])?r("q-item",{attrs:{to:"/payroll/configure/account-code"}},[r("q-item-main",{attrs:{label:e.$t("Account code")}})],1):e._e(),e.hasPermission(["payroll--configure--income-tax-rate"])?r("q-item",{attrs:{to:"/payroll/configure/income-tax-rate"}},[r("q-item-main",{attrs:{label:e.$t("Income tax rate")}})],1):e._e(),e.hasPermission(["payroll--configure--provident-fund"])?r("q-item",{attrs:{to:"/payroll/configure/provident-fund"}},[r("q-item-main",{attrs:{label:e.$t("Provident fund")}})],1):e._e()]:e._e()],2)},je=[];Se._withStripped=!0;var Oe={mixins:[w["a"],j["a"]]},xe=Oe,Ee=Object(g["a"])(xe,Se,je,!1,null,null,null);Ee.options.__file="payroll.vue";var Ae=Ee.exports,Ce=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("q-collapsible",{class:e.collapseState,attrs:{indent:"",icon:"settings",label:e.$t("System setting")},on:{show:e.toggleCollapse,hide:e.toggleCollapse}},[e.hasPermission(["system-setting--initial-setup"])?r("q-item",{attrs:{to:"/system-setting/initial-setup"}},[r("q-item-main",{attrs:{label:e.$t("Initial variable")}})],1):e._e(),e.hasPermission(["system-setting--locale"])?r("q-item",{attrs:{to:"/system-setting/locale"}},[r("q-item-main",{attrs:{label:e.$t("Locale")}})],1):e._e(),e.hasPermission(["system-setting--contents"])?r("q-item",{attrs:{to:"/system-setting/contents"}},[r("q-item-main",{attrs:{label:e.$t("Contents")}})],1):e._e()],1)},ke=[];Ce._withStripped=!0;var Re={mixins:[w["a"],j["a"]]},De=Re,Le=Object(g["a"])(De,Ce,ke,!1,null,null,null);Le.options.__file="systemSetting.vue";var Ie=Le.exports,ze=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("q-collapsible",{class:e.collapseState,attrs:{indent:"",icon:"build",label:e.$t("Utilities")},on:{show:e.toggleCollapse,hide:e.toggleCollapse}},[r("q-item",{attrs:{to:"/utilities/duplicate-field"}},[r("q-item-main",{attrs:{label:e.$t("Duplicate field")}})],1)],1)},Ve=[];ze._withStripped=!0;var Ne={mixins:[w["a"],j["a"]]},Te=Ne,Ue=Object(g["a"])(Te,ze,Ve,!1,null,null,null);Ue.options.__file="utilities.vue";var Be=Ue.exports,Me=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("q-collapsible",{class:e.collapseState,attrs:{indent:"",icon:"verified_user",label:e.$t("Authentication")},on:{show:e.toggleCollapse,hide:e.toggleCollapse}},[e.hasPermission(["access-control--user-accounts"])?r("q-item",{attrs:{to:"/access-control/user-accounts"}},[r("q-item-main",{attrs:{label:e.$t("User accounts")}})],1):e._e(),e.hasPermission(["access-control--user-roles"])?r("q-item",{attrs:{to:"/access-control/roles"}},[r("q-item-main",{attrs:{label:e.$t("Roles")}})],1):e._e(),e.hasPermission(["access-control--user-permissions"])?r("q-item",{attrs:{to:"/access-control/permissions"}},[r("q-item-main",{attrs:{label:e.$t("Permissions")}})],1):e._e()],1)},Fe=[];Me._withStripped=!0;var He={mixins:[w["a"],j["a"]]},Je=He,We=Object(g["a"])(Je,Me,Fe,!1,null,null,null);We.options.__file="accessControl.vue";var Ge=We.exports,Ke={mixins:[w["a"]],components:{mySection:A,teamSupervisor:I,inventory:B,purchaseOrders:G,services:ee,planner:ne,personnel:Pe,payroll:Ae,systemSetting:Ie,utilities:Be,accessControl:Ge},computed:l()({},Object(m["c"])(["userId","userAccount","userEmailVerified"]),{email:function(){var e=this,t="";try{t=e.userAccount.phoneNumber?e.userAccount.phoneNumber:e.userAccount.email}catch(e){t=""}return t}})},Qe=Ke,Xe=Object(g["a"])(Qe,y,$,!1,null,null,null);Xe.options.__file="index.vue";var Ye=Xe.exports,Ze=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},et=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"bg-white text-center shadow-5",staticStyle:{"padding-top":"10px"}},[s("img",{staticClass:"responsive",staticStyle:{height:"80px"},attrs:{src:r("5323"),alt:""}})])}];Ze._withStripped=!0;var tt={},rt=Object(g["a"])(tt,Ze,et,!1,null,null,null);rt.options.__file="customerLogo.vue";var st=rt.exports,at=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("q-page",{staticClass:"flex flex-center"},[r("q-card",{staticStyle:{width:"385px","max-width":"90vw"}},[r("q-card-title",[r("q-icon",{attrs:{name:"verified_user"}}),e._v(" "+e._s(e.$t("Verification process"))+"\n    ")],1),r("q-card-separator"),r("q-card-main",[r("p",[e._v(e._s(e.$t("Welcome to The JOBRUN")))]),r("p",[e._v(e._s(e.$t("A validation e-mail has been sent to your e-mail address.")))]),r("p",[e._v(e._s(e.$t("Look for the verification email in your inbox and click the link in that email. A confirmation message will appear in your web browser.")))]),r("p",[e._v(e._s(e.$t("If you didn't receive your verification email, please click resend verification email button below.")))])]),r("q-card-actions",{attrs:{align:"center"}},[r("q-btn",{attrs:{color:"primary",icon:"verified_user",label:e.$t("Email verified")},on:{click:e.verified}})],1),r("q-card-actions",{attrs:{align:"center"}},[r("q-btn",{attrs:{icon:"email",label:e.$t("Resend")},on:{click:e.resendEmailVerification}}),r("q-btn",{attrs:{icon:"exit_to_app",label:e.$t("Logout")},on:{click:e.logout}})],1)],1)],1)},it=[];at._withStripped=!0;var nt=r("e135"),ot={name:"emailAddressVerifier",mixins:[nt["a"]],methods:l()({},Object(m["b"])(["signUserIn","signUserOut"]),Object(m["d"])(["setAllDrawerClose","setLeftDrawerState"]),{logout:function(){var e=this;e.signUserOut(),p["a"].push("/login")},verified:function(){this.$router.push("my-account/profile"),window.location.reload()},resendEmailVerification:function(){var e=this;e.userAccount.sendEmailVerification().then(function(){e.$q.notify({message:e.$t("Email resented"),type:"positive",icon:"info"})})}}),created:function(){var e=n()(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:t=this,t.setAllDrawerClose(),t.setLeftDrawerState(!0),t.userEmailVerified&&p["a"].push("/");case 4:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),computed:l()({},Object(m["c"])(["userId","userAccount","userEmailVerified","leftDrawerState"]))},lt=ot,ct=(r("5220"),Object(g["a"])(lt,at,it,!1,null,null,null));ct.options.__file="emailAddressVerifier.vue";var mt=ct.exports,ut={name:"LayoutDefault",mixins:[q,d["a"]],components:{customerLogo:st,mainMenu:Ye,emailAddressVerifier:mt},data:function(){return{}},methods:l()({},Object(m["b"])(["assignAuthState","getAuthPermission","checkEmailVerified"]),Object(m["d"])(["setLeftDrawerOpen","setLeftDrawerState","setNotifyState","resetNotifyState"]),{leftDrawerAction:function(){this.setLeftDrawerOpen()},openURL:c["a"]}),created:function(){var e=n()(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=this,Object(u["b"])(function(e){e&&p["a"].push("/offline")}),e.next=4,t.assignAuthState();case 4:if(!t.userId){e.next=7;break}return e.next=7,t.getAuthPermission(t.userId);case 7:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),computed:l()({},Object(m["c"])(["locale","applicationName","subtitle","leftDrawerOpen","leftDrawerState","userId","userPermission","notifyState","notifyOptions","userEmailVerified","userAccount"]),{leftDrawer:{get:function(){return this.leftDrawerOpen},set:function(e){this.setLeftDrawerOpen()}}})},pt=ut,dt=(r("f70f"),Object(g["a"])(pt,s,a,!1,null,null,null));dt.options.__file="default.vue";t["default"]=dt.exports},"96a1":function(e,t,r){"use strict";var s=r("a60d");t["a"]=function(e,t){if(s["a"].is.cordova&&navigator&&navigator.app)return navigator.app.loadUrl(e,{openExternal:!0});var r=window.open(e,"_blank");if(r)return r.focus(),r;t&&t()}},9744:function(e,t,r){"use strict";var s=r("4588"),a=r("be13");e.exports=function(e){var t=String(a(this)),r="",i=s(e);if(i<0||i==1/0)throw RangeError("Count can't be negative");for(;i>0;(i>>>=1)&&(t+=t))1&i&&(r+=t);return r}},e135:function(e,t,r){"use strict";r("551c");var s,a,i={data:function(){return{userInfo:{}}},methods:{getUserInfo:function(e){var t=this;return new Promise(function(r){t.$database.collection("authUser").doc(e).get().then(function(e){return e.exists?r(e.data()):r({})})})}}},n=i,o=r("2877"),l=Object(o["a"])(n,s,a,!1,null,null,null);l.options.__file="userInfo.vue";t["a"]=l.exports},f5766:function(e,t,r){"use strict";var s=r("5ca1"),a=r("2e08"),i=r("a25f");s(s.P+s.F*/Version\/10\.\d+(\.\d+)? Safari\//.test(i),"String",{padStart:function(e){return a(this,e,arguments.length>1?arguments[1]:void 0,!0)}})},f70f:function(e,t,r){"use strict";var s=r("0ae9"),a=r.n(s);a.a}}]);