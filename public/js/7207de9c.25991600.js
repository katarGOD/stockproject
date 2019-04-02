(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["7207de9c"],{1331:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=(0,n.regex)("integer",/^-?[0-9]*$/);t.default=a},"1a62":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("q-page",[r("q-card",{staticStyle:{"margin-bottom":"5px"}},[r("q-card-title",[r("p",{staticClass:"q-headline"},[e._v(e._s(e.$t(e.$changeCase.sentenceCase(e.$options.name))))]),r("span",{attrs:{slot:"right"},slot:"right"},[r("q-field",{attrs:{"label-width":6,label:e.$t("Year (C.E.)")}},[r("q-select",{staticStyle:{width:"100px"},attrs:{options:e.yearOptions},model:{value:e.filterByYear,callback:function(t){e.filterByYear=t},expression:"filterByYear"}})],1)],1)])],1),r("q-table",{attrs:{"row-key":".key",selection:"single",data:e.overtimeRequestTB,columns:e.columns,filter:e.filter,loading:e.loading,pagination:e.pagination,selected:e.selected,"visible-columns":e.visibleColumns},on:{"update:pagination":function(t){e.pagination=t},"update:selected":function(t){e.selected=t}},scopedSlots:e._u([{key:"top-selection",fn:function(t){return[r("div",{staticStyle:{"padding-top":"8px","padding-bottom":"8px"}},[1==e.selected.length?r("q-btn",{staticClass:"q-mr-sm",attrs:{color:"primary",icon:"edit",round:""},on:{click:function(t){e.openUpdateFrom(e.inputForm,e.selected[0])}}}):e._e(),r("q-btn",{staticClass:"q-mr-sm",attrs:{color:"negative",icon:"delete",round:"",disable:e.selected[0].approval},on:{click:function(t){e.deleteRow()}}})],1)]}},{key:"top-left",fn:function(t){return[r("q-btn",{staticClass:"q-mr-sm",attrs:{color:"secondary",icon:"add_circle",round:""},on:{click:function(t){e.openAddForm(e.inputForm)}}}),r("q-search",{attrs:{color:"secondary","hide-underline":""},model:{value:e.filter,callback:function(t){e.filter=t},expression:"filter"}})]}},{key:"top-right",fn:function(t){return[r("q-table-columns",{staticClass:"q-mr-sm",attrs:{color:"secondary",columns:e.columns},model:{value:e.visibleColumns,callback:function(t){e.visibleColumns=t},expression:"visibleColumns"}})]}},{key:"body-cell-overtimeDate",fn:function(t){return r("q-td",{attrs:{props:t}},[r("q-btn",{attrs:{flat:"",label:e.FormatDate(t.value,"YYYY-MM-DD")},on:{click:function(r){e.selected=[e._.find(e.overtimeRequestTB,{".key":t.row[".key"]})],e.openUpdateFrom(e.inputForm,e.selected[0])}}})],1)}},{key:"body-cell-type",fn:function(t){return r("q-td",{attrs:{props:t}},[r("span",{attrs:{small:""}},[e._v("\n        "+e._s(e._.find(e.overtimeTypeOptions,{value:t.value})?e._.find(e.overtimeTypeOptions,{value:t.value}).label:"Overtime Type")+"\n      ")])])}},{key:"body-cell-authUser",fn:function(t){return r("q-td",{attrs:{props:t}},[r("span",{attrs:{small:""}},[e._v("\n        "+e._s(e._.find(e.authUserOptions,{value:t.value})?e._.find(e.authUserOptions,{value:t.value}).label:"Employee Name")+"\n      ")])])}},{key:"body-cell-approval",fn:function(t){return r("q-td",{attrs:{props:t}},[t.value?r("q-chip",{attrs:{icon:"check",color:"positive"}},[e._v("\n        "+e._s(e.$t("Approved"))+"\n      ")]):r("q-chip",{attrs:{icon:"clear",color:"warning"}},[e._v("\n        "+e._s(e.$t("Waiting"))+"\n      ")])],1)}}])}),r("q-modal",{attrs:{maximized:"","content-css":{padding:"50px"}},model:{value:e.formModal,callback:function(t){e.formModal=t},expression:"formModal"}},[r("div",{staticClass:"row justify-center gutter-lg"},[r("div",{staticClass:"col-xl-4 col-lg-4 col-md-4 col-sm12 col-xs-12"},[r("div",{staticClass:"q-headline"},[e._v(e._s(e.$t(e.$changeCase.sentenceCase(e.$options.name))))]),r("div",{staticClass:"q-subheading"},[e._v(e._s(e.subHeading))])]),r("div",{staticClass:"col-xl-8 col-lg-8 col-md-8 col-sm12 col-xs-12"},[r("q-field",{attrs:{label:e.$t("Employee"),"label-width":e.labelWidth}},[r("q-select",{attrs:{disable:"",options:e.authUserOptions},model:{value:e.userId,callback:function(t){e.userId=t},expression:"userId"}})],1),r("q-field",{attrs:{label:e.$t("Department"),"label-width":e.labelWidth}},[r("q-select",{attrs:{disable:"",options:e.departmentOptions},model:{value:e.userInfo.department,callback:function(t){e.$set(e.userInfo,"department",t)},expression:"userInfo.department"}})],1),r("q-field",{attrs:{label:e.$t("From")+" *","label-width":e.labelWidth}},[r("q-datetime",{attrs:{color:"primary",format:"YYYY-MM-DD HH:mm",format24h:"",type:"datetime",disable:e.inputForm.approval},on:{change:function(t){e.inputForm.from=t}},model:{value:e.inputForm.from,callback:function(t){e.$set(e.inputForm,"from",t)},expression:"inputForm.from"}})],1),r("q-field",{attrs:{label:e.$t("To")+" *","label-width":e.labelWidth}},[r("q-datetime",{attrs:{color:"secondary",format:"YYYY-MM-DD HH:mm",format24h:"",type:"datetime",disable:e.inputForm.approval},model:{value:e.inputForm.to,callback:function(t){e.$set(e.inputForm,"to",t)},expression:"inputForm.to"}})],1),e.checkDiff()?r("q-field",{attrs:{label:e.$t("Break")+" *","label-width":e.labelWidth}},[r("q-select",{attrs:{disable:e.inputForm.approval,options:[{label:""+e.$t("No break"),value:0},{label:"1 "+e.$t("Hours"),value:1}]},model:{value:e.inputForm.overtimeBreakHours,callback:function(t){e.$set(e.inputForm,"overtimeBreakHours",t)},expression:"inputForm.overtimeBreakHours"}})],1):e._e(),r("q-field",{attrs:{label:e.$t("Overtime hours"),"label-width":e.labelWidth}},[r("q-input",{attrs:{disable:"",type:"number",suffix:e.$t("Hours")},model:{value:e.inputForm.overtimeHours,callback:function(t){e.$set(e.inputForm,"overtimeHours",t)},expression:"inputForm.overtimeHours"}})],1),r("q-field",{attrs:{label:e.$t("Type"),"label-width":e.labelWidth}},[r("q-select",{attrs:{options:e.overtimeTypeOptions,disable:e.inputForm.approval},model:{value:e.inputForm.overtimeType,callback:function(t){e.$set(e.inputForm,"overtimeType",t)},expression:"inputForm.overtimeType"}})],1),r("q-field",{attrs:{label:e.$t("Overtime pay"),"label-width":e.labelWidth}},[r("q-input",{attrs:{disable:"",type:"text",suffix:e.$t("Hours")},model:{value:e.inputForm.overtimePay,callback:function(t){e.$set(e.inputForm,"overtimePay",t)},expression:"inputForm.overtimePay"}})],1),r("q-field",{attrs:{label:e.$t("Compensate"),"label-width":e.labelWidth}},[r("q-toggle",{attrs:{"checked-icon":"sentiment very satisfied","unchecked-icon":"sentiment very dissatisfied",disable:e.inputForm.approval},model:{value:e.inputForm.otCompensate,callback:function(t){e.$set(e.inputForm,"otCompensate",t)},expression:"inputForm.otCompensate"}})],1),r("q-field",{attrs:{label:e.$t("Reason")+" *","label-width":e.labelWidth}},[r("q-input",{attrs:{type:"text",disable:e.inputForm.approval},model:{value:e.inputForm.reason,callback:function(t){e.$set(e.inputForm,"reason",t)},expression:"inputForm.reason"}})],1),r("q-field",{attrs:{label:e.$t("Approve"),"label-width":e.labelWidth}},[r("q-toggle",{attrs:{disable:"","checked-icon":"sentiment very satisfied","unchecked-icon":"sentiment very dissatisfied"},model:{value:e.inputForm.approval,callback:function(t){e.$set(e.inputForm,"approval",t)},expression:"inputForm.approval"}})],1),r("div",{staticClass:"submit"},["add"===e.formAction?r("q-btn",{staticClass:"q-mr-sm",attrs:{color:"primary",icon:"save","wait-for-ripple":"",disable:e.$v.inputForm.$invalid,label:e.$t("Save")},on:{click:e.addForm}}):e._e(),"update"===e.formAction?r("q-btn",{staticClass:"q-mr-sm",attrs:{icon:"save",color:"primary","wait-for-ripple":"",disable:e.$v.inputForm.$invalid,label:e.$t("Save")},on:{click:e.updateForm}}):e._e(),r("q-btn",{staticClass:"q-mr-sm",attrs:{color:"light",icon:"cancel","wait-for-ripple":"",label:e.$t("Cancel")},on:{click:function(t){e.formModal=!1}}})],1)],1)])])],1)},a=[];n._withStripped=!0;var i=r("3156"),o=r.n(i),u=r("278c"),s=r.n(u),l=(r("ac6a"),r("551c"),r("c5f6"),r("6762"),r("2fdb"),r("7514"),r("96cf"),r("c973")),d=r.n(l),c=r("f490"),f=r("2f62"),m=r("b5ae"),p=r("fe5b"),v=r("44de"),y=r("0caf"),b=r("2508"),h=r("e135"),g=r("7266"),w=r("3daa"),O=r("05d8"),_=r("a274"),q={name:"overtimeRequest",mixins:[p["a"],v["a"],y["a"],b["a"],h["a"],g["a"],w["a"],O["a"],_["a"]],data:function(){return{subHeading:null,staffInDept:[],filterByYear:parseInt(c["d"].formatDate(Date.now(),"YYYY")),pagination:{sortBy:"overtimeDate",descending:!0},columns:[{name:"id",label:this.$t("ID"),field:".key",sortable:!0,align:"left"},{name:"overtimeDate",label:this.$t("Date"),field:"overtimeDate",sortable:!0,align:"left"},{name:"hours",label:this.$t("Hours"),field:"overtimeHours",sortable:!0,align:"left"},{name:"type",label:this.$t("Type"),field:"overtimeType",sortable:!0,align:"left"},{name:"pay",label:this.$t("Pay"),field:"overtimePay",sortable:!0,align:"left"},{name:"approval",label:this.$t("Approval"),field:"approval",sortable:!0,align:"left"}],visibleColumns:["overtimeDate","hours","pay","type","approval"],inputForm:{".key":null,authUser:"",department:"",overtimeDate:new Date,from:new Date,to:new Date,otCompensate:!0,overtimeBreakHours:0,overtimeHours:0,overtimeType:"",overtimePay:0,reason:"",approval:!1,approvedBy:null,reference:"",calendarYear:parseInt(c["d"].formatDate(Date.now(),"YYYY")),createdBy:"",createdOn:"",modifiedBy:"",modifiedOn:""},departmentId:""}},validations:{inputForm:{from:{required:m["required"]},to:{required:m["required"]},overtimeHours:{required:m["required"],minValue:Object(m["minValue"])(1),maxValue:Object(m["maxValue"])(8)},overtimeType:{required:m["required"]},reason:{required:m["required"]}}},firestore:function(){return{overtimeRequestTB:this.$database.collection("overtimeRequest").where("authUser","==",this.userId).where("calendarYear","==",this.filterByYear),overtimeRequest:this.$database.collection("overtimeRequest")}},methods:{addForm:function(){var e=d()(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=this,t.inputForm.authUser=t.userId,t.inputForm.approvedBy=t._.find(t.authUserOptions,{value:t.userId})?t._.find(t.authUserOptions,{value:t.userId}).reportTo:"",t.inputForm.department=t._.find(t.authUserOptions,{value:t.userId})?t._.find(t.authUserOptions,{value:t.userId}).department:"",t.inputForm.createdBy=t.inputForm.modifiedBy=t.userId,t.inputForm.createdOn=t.inputForm.modifiedOn=new Date,t.inputForm.overtimeDate=new Date(t.inputForm.from),e.next=9,t.addProcess(t.$firestore.overtimeRequest,t.inputForm,t.$v.inputForm);case 9:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),updateForm:function(){var e=d()(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=this,t.inputForm.modifiedBy=t.userId,t.inputForm.overtimeDate=new Date(t.inputForm.from),t.inputForm.modifiedOn=new Date,e.next=6,t.updateProcess(t.$firestore.overtimeRequest,t.inputForm,t.$v.inputForm);case 6:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),deleteRow:function(){var e=d()(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=this,e.next=3,t.deleteProcess(t.selected,t.$firestore.overtimeRequest);case 3:t.selected=[];case 4:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),checkDiff:function(){var e=!1;return c["d"].getDateDiff(this.inputForm.to,this.inputForm.from,"hours")>4&&(e=!0),e},calcOvertimeHours:function(){var e=this.inputForm.from,t=this.inputForm.to,r=this.inputForm.overtimeBreakHours,n="minutes",a=c["d"].getDateDiff(t,e,n),i=Math.floor(a/60)-r;return i>=0?(this.inputForm.overtimeHours=i,i):(this.inputForm.overtimeHours=0,0)},calcOvertimeType:function(){var e=d()(regeneratorRuntime.mark(function e(){var t,r,n,a,i,o,u,s,l,d,f,m;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=this,r=t.inputForm.from,n=t.inputForm.from,e.next=5,t.getWorkingDay();case 5:return a=e.sent,e.next=8,t.getTraditionalHolidays();case 8:i=e.sent,o=a[c["d"].formatDate(r,"d")].wh,u=!1,s=new Date("".concat(c["d"].formatDate(r,"YYYY-MM-DD"),"T").concat(c["d"].formatDate(n,"HH:mm"))),l=c["d"].addToDate(s,{minutes:1}),d=new Date("".concat(c["d"].formatDate(r,"YYYY-MM-DD"),"T").concat(c["d"].formatDate(o.from,"HH:mm"))),f=new Date("".concat(c["d"].formatDate(r,"YYYY-MM-DD"),"T").concat(c["d"].formatDate(o.to,"HH:mm"))),m=!c["d"].isBetweenDates(c["d"].formatDate(l,"YYYY-MM-DDTHH:mm"),c["d"].formatDate(d,"YYYY-MM-DDTHH:mm"),c["d"].formatDate(f,"YYYY-MM-DDTHH:mm")),t._.includes(i,c["d"].formatDate(r,"DDD"))?u=!0:a[c["d"].formatDate(r,"d")].wd?a[c["d"].formatDate(r,"d")].wd&&(u=!1):u=!0,t.inputForm.overtimeType=t._.find(t.overtimeTypeOptions,{holiday:u,overtime:m})?t._.find(t.overtimeTypeOptions,{holiday:u,overtime:m}).value:"";case 18:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),calcOvertimePay:function(){var e=this,t=e.calcOvertimeHours(),r=e.inputForm.overtimeType,n=e._.find(e.overtimeTypeOptions,{value:r})?e._.find(e.overtimeTypeOptions,{value:r}).rate:0,a=Number(t*n);a>=0&&(e.inputForm.overtimePay=a)},getWorkingDay:function(){var e=this;return new Promise(function(t){var r=[];e.$database.collection("company").limit(1).get().then(function(e){e.forEach(function(e){return r=[{wd:e.data().sunday.workingDay,wh:{from:e.data().sunday.rangeFrom,to:e.data().sunday.rangeTo},bkh:e.data().sunday.breakHour},{wd:e.data().monday.workingDay,wh:{from:e.data().monday.rangeFrom,to:e.data().monday.rangeTo},bkh:e.data().monday.breakHour},{wd:e.data().tuesday.workingDay,wh:{from:e.data().tuesday.rangeFrom,to:e.data().tuesday.rangeTo},bkh:e.data().tuesday.breakHour},{wd:e.data().wednesday.workingDay,wh:{from:e.data().wednesday.rangeFrom,to:e.data().wednesday.rangeTo},bkh:e.data().wednesday.breakHour},{wd:e.data().thursday.workingDay,wh:{from:e.data().thursday.rangeFrom,to:e.data().thursday.rangeTo},bkh:e.data().thursday.breakHour},{wd:e.data().friday.workingDay,wh:{from:e.data().friday.rangeFrom,to:e.data().friday.rangeTo},bkh:e.data().friday.breakHour},{wd:e.data().saturday.workingDay,wh:{from:e.data().saturday.rangeFrom,to:e.data().saturday.rangeTo},bkh:e.data().saturday.breakHour}],t(r)})})})},getTraditionalHolidays:function(){var e=this;return new Promise(function(t){var r=[];e.$database.collection("holidayCalendar").where("calendarYear","==",parseInt(c["d"].formatDate(e.inputForm.from,"YYYY"))).get().then(function(e){return e.forEach(function(e){r.push(c["d"].formatDate(e.data().date,"DDD"))}),t(r)})})}},created:function(){var e=d()(regeneratorRuntime.mark(function e(){var t,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.loadingState(this.$firestore.overtimeRequestTB);case 2:return t=e.sent,r=s()(t,2),this.collectionSize=r[0],this.loading=r[1],this.$q.loading.show(),e.next=9,this.getUserInfo(this.userId);case 9:this.userInfo=e.sent,this.$q.loading.hide();case 11:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),computed:o()({},Object(f["c"])(["userId"])),watch:{filterByYear:function(){this.$binding("overtimeRequest",this.$database.collection("overtimeRequest").where("authUser","==",this.userId).where("calendarYear","==",this.filterByYear))},"inputForm.from":function(){if(this.inputForm.from){var e=c["d"].getDateDiff(this.inputForm.to,this.inputForm.form,"minutes");e<0&&(this.inputForm.to=this.date.addToDate(this.inputForm.from,{hours:1})),this.calcOvertimeHours(),this.calcOvertimeType(),this.calcOvertimePay(),this.inputForm.calendarYear=parseInt(c["d"].formatDate(this.inputForm.from,"YYYY"))}},"inputForm.to":function(){this.inputForm.to&&(this.calcOvertimeType(),this.calcOvertimeHours(),this.calcOvertimePay())},"inputForm.overtimeType":function(){this.inputForm.overtimeType&&(this.calcOvertimeHours(),this.calcOvertimePay())},"inputForm.overtimeBreakHours":function(){this.calcOvertimeHours(),this.calcOvertimePay()}}},F=q,D=(r("d622"),r("2877")),P=Object(D["a"])(F,n,a,!1,null,null,null);P.options.__file="overtimeRequest.vue";t["default"]=P.exports},"2a12":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=function(e){return(0,n.withParams)({type:"maxLength",max:e},function(t){return!(0,n.req)(t)||(0,n.len)(t)<=e})};t.default=a},3360:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,n.withParams)({type:"and"},function(){for(var e=this,r=arguments.length,n=new Array(r),a=0;a<r;a++)n[a]=arguments[a];return t.length>0&&t.reduce(function(t,r){return t&&r.apply(e,n)},!0)})};t.default=a},"3a54":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=(0,n.regex)("alphaNum",/^[a-zA-Z0-9]*$/);t.default=a},"45b8":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=(0,n.regex)("numeric",/^[0-9]*$/);t.default=a},"46bc":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=function(e){return(0,n.withParams)({type:"maxValue",max:e},function(t){return!(0,n.req)(t)||(!/\s/.test(t)||t instanceof Date)&&+t<=+e})};t.default=a},"58c4":function(e,t,r){},"5d75":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=/(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/,i=(0,n.regex)("email",a);t.default=i},"5db3":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=function(e){return(0,n.withParams)({type:"minLength",min:e},function(t){return!(0,n.req)(t)||(0,n.len)(t)>=e})};t.default=a},6235:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=(0,n.regex)("alpha",/^[a-zA-Z]*$/);t.default=a},6417:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=function(e){return(0,n.withParams)({type:"not"},function(t,r){return!(0,n.req)(t)||!e.call(this,t,r)})};t.default=a},"772d":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i,i=(0,n.regex)("url",a);t.default=i},"78ef":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"withParams",{enumerable:!0,get:function(){return n.default}}),t.regex=t.ref=t.len=t.req=void 0;var n=a(r("8750"));function a(e){return e&&e.__esModule?e:{default:e}}function i(e){return i="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i(e)}var o=function(e){if(Array.isArray(e))return!!e.length;if(void 0===e||null===e)return!1;if(!1===e)return!0;if(e instanceof Date)return!isNaN(e.getTime());if("object"===i(e)){for(var t in e)return!0;return!1}return!!String(e).length};t.req=o;var u=function(e){return Array.isArray(e)?e.length:"object"===i(e)?Object.keys(e).length:String(e).length};t.len=u;var s=function(e,t,r){return"function"===typeof e?e.call(t,r):r[e]};t.ref=s;var l=function(e,t){return(0,n.default)({type:e},function(e){return!o(e)||t.test(e)})};t.regex=l},8750:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n="web"===Object({NODE_ENV:"production",CLIENT:!0,SERVER:!1,DEV:!1,PROD:!0,THEME:"mat",MODE:"spa",VUE_ROUTER_MODE:"history",VUE_ROUTER_BASE:"/",APP_URL:"undefined"}).BUILD?r("cb69").withParams:r("0234").withParams,a=n;t.default=a},"91d3":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:":";return(0,n.withParams)({type:"macAddress"},function(t){if(!(0,n.req)(t))return!0;if("string"!==typeof t)return!1;var r="string"===typeof e&&""!==e?t.split(e):12===t.length||16===t.length?t.match(/.{2}/g):null;return null!==r&&(6===r.length||8===r.length)&&r.every(i)})};t.default=a;var i=function(e){return e.toLowerCase().match(/^[0-9a-f]{2}$/)}},aa82:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=function(e){return(0,n.withParams)({type:"requiredIf",prop:e},function(t,r){return!(0,n.ref)(e,this,r)||(0,n.req)(t)})};t.default=a},b5ae:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"alpha",{enumerable:!0,get:function(){return n.default}}),Object.defineProperty(t,"alphaNum",{enumerable:!0,get:function(){return a.default}}),Object.defineProperty(t,"numeric",{enumerable:!0,get:function(){return i.default}}),Object.defineProperty(t,"between",{enumerable:!0,get:function(){return o.default}}),Object.defineProperty(t,"email",{enumerable:!0,get:function(){return u.default}}),Object.defineProperty(t,"ipAddress",{enumerable:!0,get:function(){return s.default}}),Object.defineProperty(t,"macAddress",{enumerable:!0,get:function(){return l.default}}),Object.defineProperty(t,"maxLength",{enumerable:!0,get:function(){return d.default}}),Object.defineProperty(t,"minLength",{enumerable:!0,get:function(){return c.default}}),Object.defineProperty(t,"required",{enumerable:!0,get:function(){return f.default}}),Object.defineProperty(t,"requiredIf",{enumerable:!0,get:function(){return m.default}}),Object.defineProperty(t,"requiredUnless",{enumerable:!0,get:function(){return p.default}}),Object.defineProperty(t,"sameAs",{enumerable:!0,get:function(){return v.default}}),Object.defineProperty(t,"url",{enumerable:!0,get:function(){return y.default}}),Object.defineProperty(t,"or",{enumerable:!0,get:function(){return b.default}}),Object.defineProperty(t,"and",{enumerable:!0,get:function(){return h.default}}),Object.defineProperty(t,"not",{enumerable:!0,get:function(){return g.default}}),Object.defineProperty(t,"minValue",{enumerable:!0,get:function(){return w.default}}),Object.defineProperty(t,"maxValue",{enumerable:!0,get:function(){return O.default}}),Object.defineProperty(t,"integer",{enumerable:!0,get:function(){return _.default}}),Object.defineProperty(t,"decimal",{enumerable:!0,get:function(){return q.default}}),t.helpers=void 0;var n=P(r("6235")),a=P(r("3a54")),i=P(r("45b8")),o=P(r("ec11")),u=P(r("5d75")),s=P(r("c99d")),l=P(r("91d3")),d=P(r("2a12")),c=P(r("5db3")),f=P(r("d4f4")),m=P(r("aa82")),p=P(r("e652")),v=P(r("b6cb")),y=P(r("772d")),b=P(r("d294")),h=P(r("3360")),g=P(r("6417")),w=P(r("eb66")),O=P(r("46bc")),_=P(r("1331")),q=P(r("c301")),F=D(r("78ef"));function D(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var n=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,r):{};n.get||n.set?Object.defineProperty(t,r,n):t[r]=e[r]}return t.default=e,t}function P(e){return e&&e.__esModule?e:{default:e}}t.helpers=F},b6cb:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=function(e){return(0,n.withParams)({type:"sameAs",eq:e},function(t,r){return t===(0,n.ref)(e,this,r)})};t.default=a},c301:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=(0,n.regex)("decimal",/^[-]?\d*(\.\d+)?$/);t.default=a},c99d:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=(0,n.withParams)({type:"ipAddress"},function(e){if(!(0,n.req)(e))return!0;if("string"!==typeof e)return!1;var t=e.split(".");return 4===t.length&&t.every(i)});t.default=a;var i=function(e){if(e.length>3||0===e.length)return!1;if("0"===e[0]&&"0"!==e)return!1;if(!e.match(/^\d+$/))return!1;var t=0|+e;return t>=0&&t<=255}},cb69:function(e,t,r){"use strict";(function(e){function r(e){return r="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.withParams=void 0;var n="undefined"!==typeof window?window:"undefined"!==typeof e?e:{},a=function(e,t){return"object"===r(e)&&void 0!==t?t:e(function(){})},i=n.vuelidate?n.vuelidate.withParams:a;t.withParams=i}).call(this,r("c8ba"))},d294:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,n.withParams)({type:"or"},function(){for(var e=this,r=arguments.length,n=new Array(r),a=0;a<r;a++)n[a]=arguments[a];return t.length>0&&t.reduce(function(t,r){return t||r.apply(e,n)},!1)})};t.default=a},d4f4:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=(0,n.withParams)({type:"required"},n.req);t.default=a},d622:function(e,t,r){"use strict";var n=r("58c4"),a=r.n(n);a.a},e135:function(e,t,r){"use strict";r("551c");var n,a,i={data:function(){return{userInfo:{}}},methods:{getUserInfo:function(e){var t=this;return new Promise(function(r){t.$database.collection("authUser").doc(e).get().then(function(e){return e.exists?r(e.data()):r({})})})}}},o=i,u=r("2877"),s=Object(u["a"])(o,n,a,!1,null,null,null);s.options.__file="userInfo.vue";t["a"]=s.exports},e652:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=function(e){return(0,n.withParams)({type:"requiredUnless",prop:e},function(t,r){return!!(0,n.ref)(e,this,r)||(0,n.req)(t)})};t.default=a},eb66:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=function(e){return(0,n.withParams)({type:"minValue",min:e},function(t){return!(0,n.req)(t)||(!/\s/.test(t)||t instanceof Date)&&+t>=+e})};t.default=a},ec11:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),a=function(e,t){return(0,n.withParams)({type:"between",min:e,max:t},function(r){return!(0,n.req)(r)||(!/\s/.test(r)||r instanceof Date)&&+e<=+r&&+t>=+r})};t.default=a}}]);