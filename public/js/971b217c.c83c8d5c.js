(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["971b217c"],{2508:function(e,t,n){"use strict";var r,i,a=n("f490"),o={methods:{FormatDate:function(e,t){var n=a["d"].formatDate(e,t);return n}}},s=o,l=n("2877"),u=Object(l["a"])(s,r,i,!1,null,null,null);u.options.__file="formatDate.vue";t["a"]=u.exports},7266:function(e,t,n){"use strict";var r,i,a=n("3156"),o=n.n(a),s=n("2f62"),l={methods:{hasPermission:function(e){var t=this._.uniq(this.userPermission),n=this._.intersection(t,e).length;return n}},computed:o()({},Object(s["c"])(["userPermission"]))},u=l,c=n("2877"),d=Object(c["a"])(u,r,i,!1,null,null,null);d.options.__file="hasPermission.vue";t["a"]=d.exports},9423:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("q-page",[n("q-table",{attrs:{"row-key":".key",selection:"single",columns:e.columns,data:e.trainingTb,filter:e.filter,loading:e.loading,pagination:e.pagination,selected:e.selected,"visible-columns":e.visibleColumns},on:{"update:pagination":function(t){e.pagination=t},"update:selected":function(t){e.selected=t}},scopedSlots:e._u([{key:"top-selection",fn:function(t){return[n("div",{staticStyle:{"padding-top":"8px","padding-bottom":"8px"}},[1==e.selected.length?n("q-btn",{staticClass:"q-mr-sm",attrs:{color:"primary",icon:"edit",round:"",disable:!e.hasPermission(["personnel--employee-management--update"])},on:{click:function(t){e.openUpdateFrom(e.inputForm,e.selected[0])}}}):e._e(),n("q-btn",{staticClass:"q-mr-sm",attrs:{color:"negative",icon:"delete",round:"",disable:!e.hasPermission(["personnel--employee-management--update"])},on:{click:function(t){e.deleteRow()}}})],1)]}},{key:"top-left",fn:function(t){return[n("q-btn",{staticClass:"q-mr-sm",attrs:{color:"secondary",icon:"add_circle",round:"",disable:!e.hasPermission(["personnel--employee-management--update"])},on:{click:function(t){e.openAddForm(e.inputForm)}}}),n("q-search",{attrs:{"hide-underline":"",color:"secondary"},model:{value:e.filter,callback:function(t){e.filter=t},expression:"filter"}})]}},{key:"top-right",fn:function(t){return[n("q-table-columns",{staticClass:"q-mr-sm",attrs:{color:"secondary",columns:e.columns},model:{value:e.visibleColumns,callback:function(t){e.visibleColumns=t},expression:"visibleColumns"}})]}},{key:"body-cell-date",fn:function(t){return n("q-td",{attrs:{props:t}},[n("span",{attrs:{small:""}},[e._v("\n        "+e._s(e.FormatDate(t.value,"YYYY-MM-DD"))+"\n      ")])])}}])}),n("q-modal",{attrs:{maximized:"","content-css":{padding:"50px"}},model:{value:e.formModal,callback:function(t){e.formModal=t},expression:"formModal"}},[n("div",{staticClass:"row justify-center gutter-lg"},[n("div",{staticClass:"col-xl-4 col-lg-4 col-md-4 col-sm12 col-xs-12"},[n("div",{staticClass:"q-headline"},[e._v(e._s(e.$t(e.$changeCase.sentenceCase(e.$options.name))))]),n("div",{staticClass:"q-subheading"},[e._v(e._s(e.subHeading))])]),n("div",{staticClass:"col-xl-8 col-lg-8 col-md-8 col-sm12 col-xs-12"},[n("q-field",{attrs:{label:e.$t("ID"),"label-width":e.labelWidth}},[n("q-input",{attrs:{disable:""},model:{value:e.inputForm[".key"],callback:function(t){e.$set(e.inputForm,".key",t)},expression:"inputForm['.key']"}})],1),n("q-field",{attrs:{label:e.$t("Course")+" *","label-width":e.labelWidth,error:e.$v.inputForm.courseName.$error,"error-label":e.$t("Requires non-empty data")}},[n("q-input",{attrs:{disable:!e.hasPermission(["personnel--employee-management--update"])},on:{blur:function(t){e.$v.inputForm.courseName.$touch()}},model:{value:e.inputForm.courseName,callback:function(t){e.$set(e.inputForm,"courseName",t)},expression:"inputForm.courseName"}})],1),n("q-field",{attrs:{label:e.$t("By")+" *","label-width":e.labelWidth,error:e.$v.inputForm.courseOfferedBy.$error,"error-label":e.$t("Requires non-empty data")}},[n("q-input",{attrs:{disable:!e.hasPermission(["personnel--employee-management--update"])},on:{blur:function(t){e.$v.inputForm.courseOfferedBy.$touch()}},model:{value:e.inputForm.courseOfferedBy,callback:function(t){e.$set(e.inputForm,"courseOfferedBy",t)},expression:"inputForm.courseOfferedBy"}})],1),n("q-field",{attrs:{label:e.$t("Issued date"),"label-width":e.labelWidth,error:e.$v.inputForm.date.$error,"error-label":e.$t("Requires non-empty data")}},[n("q-datetime",{attrs:{type:"date",disable:!e.hasPermission(["personnel--employee-management--update"])},on:{blur:function(t){e.$v.inputForm.date.$touch()}},model:{value:e.inputForm.date,callback:function(t){e.$set(e.inputForm,"date",t)},expression:"inputForm.date"}})],1),n("q-field",{attrs:{label:e.$t("Note"),"label-width":e.labelWidth}},[n("q-editor",{attrs:{disable:!e.hasPermission(["personnel--employee-management--update"])},model:{value:e.inputForm.note,callback:function(t){e.$set(e.inputForm,"note",t)},expression:"inputForm.note"}})],1),n("div",{staticClass:"submit"},["add"===e.formAction?n("q-btn",{staticClass:"q-mr-sm",attrs:{color:"primary",icon:"save","wait-for-ripple":"",disable:e.$v.inputForm.$invalid,label:e.$t("save")},on:{click:e.addForm}}):e._e(),"update"===e.formAction?n("q-btn",{staticClass:"q-mr-sm",attrs:{color:"primary",icon:"save","wait-for-ripple":"",disable:e.$v.inputForm.$invalid,label:e.$t("save")},on:{click:e.updateForm}}):e._e(),n("q-btn",{staticClass:"q-mr-sm",attrs:{color:"light",icon:"cancel","wait-for-ripple":"",label:e.$t("Cancel")},on:{click:function(t){e.formModal=!1}}})],1)],1)])])],1)},i=[];r._withStripped=!0;var a=n("3156"),o=n.n(a),s=n("278c"),l=n.n(s),u=(n("96cf"),n("c973")),c=n.n(u),d=n("2f62"),m=n("b5ae"),p=n("44de"),f=n("7266"),b=n("05d8"),h=n("2508"),v={name:"training",mixins:[p["a"],f["a"],h["a"],b["a"]],data:function(){return{subHeading:null,subMenu:this.$t("Training"),pagination:{sortBy:"type",descending:!1},columns:[{name:"id",label:this.$t("ID"),field:".key",sortable:!0,align:"left"},{name:"courseName",label:this.$t("Course"),field:"courseName",sortable:!0,align:"left"},{name:"courseOfferedBy",label:this.$t("By"),field:"courseOfferedBy",sortable:!1,align:"left"},{name:"date",label:this.$t("Date"),field:"date",sortable:!1,align:"left"},{name:"note",label:this.$t("Note"),field:"note",sortable:!1,align:"left"}],visibleColumns:["courseName","courseOfferedBy","date"],selected:[],filter:"",loading:!0,formModal:!1,inputForm:{".key":null,courseName:"",courseOfferedBy:"",date:new Date,note:"",createdBy:this.userId,createdOn:new Date,modifiedBy:this.userId,modifiedOn:new Date,authUser:this.userId}}},validations:{inputForm:{courseName:{required:m["required"]},courseOfferedBy:{required:m["required"]},date:{required:m["required"]}}},firestore:function(){return{trainingTb:this.$database.collection("training").where("authUser","==",this.$route.params.id),training:this.$database.collection("training")}},methods:{addForm:function(){var e=c()(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=this,t.inputForm.createdBy=t.inputForm.modifiedBy=t.userId,t.inputForm.createdOn=t.inputForm.modifiedOn=new Date,t.inputForm.authUser=t.$route.params.id,e.next=6,t.addProcess(t.$firestore.training,t.inputForm,t.$v.inputForm);case 6:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),updateForm:function(){var e=c()(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=this,t.inputForm.modifiedBy=t.userId,t.inputForm.modifiedOn=new Date,e.next=5,t.updateProcess(t.$firestore.training,t.inputForm,t.$v.inputForm);case 5:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),deleteRow:function(){var e=c()(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=this,e.next=3,t.deleteProcess(t.selected,t.$firestore.training);case 3:t.selected=[];case 4:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},created:function(){var e=c()(regeneratorRuntime.mark(function e(){var t,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.loadingState(this.$firestore.trainingTb);case 2:t=e.sent,n=l()(t,2),this.collectionSize=n[0],this.loading=n[1],this.$emit("updateSubMenu",this.subMenu),this.initialInputForm(this.inputForm);case 8:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),computed:o()({},Object(d["c"])(["userId"]))},g=v,y=n("2877"),$=Object(y["a"])(g,r,i,!1,null,null,null);$.options.__file="training.vue";t["default"]=$.exports}}]);