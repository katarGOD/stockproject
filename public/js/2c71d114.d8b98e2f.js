(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["2c71d114"],{"5c51":function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("q-page",[n("q-table",{attrs:{"row-key":".key",selection:"single",data:e.incomeTaxTb,columns:e.columns,filter:e.filter,loading:e.loading,pagination:e.pagination,selected:e.selected,"visible-columns":e.visibleColumns},on:{"update:pagination":function(t){e.pagination=t},"update:selected":function(t){e.selected=t}},scopedSlots:e._u([{key:"top-selection",fn:function(t){return[n("div",{staticStyle:{"padding-top":"8px","padding-bottom":"8px"}},[1==e.selected.length?n("q-btn",{staticClass:"q-mr-sm",attrs:{color:"primary",round:"",icon:"edit",disable:!e.hasPermission(["personnel--employee-management--update"])},on:{click:function(t){e.openUpdateFrom(e.inputForm,e.selected[0])}}}):e._e(),n("q-btn",{staticClass:"q-mr-sm",attrs:{color:"negative",icon:"delete",round:"",disable:!e.hasPermission(["personnel--employee-management--update"])},on:{click:function(t){e.deleteRow()}}})],1)]}},{key:"top-left",fn:function(t){return[n("q-btn",{staticClass:"q-mr-sm",attrs:{color:"secondary",icon:"add_circle",round:"",disable:!e.hasPermission(["personnel--employee-management--update"])},on:{click:function(t){e.openAddForm(e.inputForm)}}}),n("q-search",{attrs:{"hide-underline":"",color:"secondary"},model:{value:e.filter,callback:function(t){e.filter=t},expression:"filter"}})]}},{key:"top-right",fn:function(t){return[n("q-table-columns",{staticClass:"q-mr-sm",attrs:{color:"secondary",columns:e.columns},model:{value:e.visibleColumns,callback:function(t){e.visibleColumns=t},expression:"visibleColumns"}})]}},{key:"body-cell-accountCode",fn:function(t){return n("q-td",{attrs:{props:t}},[n("span",{attrs:{small:""}},[e._v("\n        "+e._s(e.accountCodeLabel(t.value))+"\n      ")])])}},{key:"body-cell-calculateTax",fn:function(t){return n("q-td",{attrs:{props:t}},[n("span",{attrs:{small:"",color:"secondary"}},[t.value?n("q-icon",{attrs:{name:"done"}}):e._e(),t.value?e._e():n("q-icon",{attrs:{name:"clear"}})],1)])}},{key:"body-cell-postingCategory",fn:function(t){return n("q-td",{attrs:{props:t}},[n("span",{attrs:{small:"",color:"secondary"}},[e._v("\n      "+e._s(e.showPostingCategoryOption(t.value))+"\n      ")])])}},{key:"body-cell-amount",fn:function(t){return n("q-td",{attrs:{props:t}},[e._v("\n      "+e._s(parseInt(t.value).toLocaleString(void 0,{minimumFractionDigits:2})+" THB")+"\n    ")])}}])}),n("q-modal",{attrs:{maximized:"","content-css":{padding:"50px"}},model:{value:e.formModal,callback:function(t){e.formModal=t},expression:"formModal"}},[n("div",{staticClass:"row justify-center gutter-lg"},[n("div",{staticClass:"col-xl-4 col-lg-4 col-md-4 col-sm12 col-xs-12"},[n("div",{staticClass:"q-headline"},[e._v(e._s(e.$t(e.$changeCase.sentenceCase(e.$options.name))))]),n("div",{staticClass:"q-subheading"},[e._v(e._s(e.subHeading))])]),n("div",{staticClass:"col-xl-8 col-lg-8 col-md-8 col-sm12 col-xs-12"},[n("q-field",{attrs:{label:e.$t("ID"),"label-width":e.labelWidth}},[n("q-input",{attrs:{disable:""},model:{value:e.inputForm[".key"],callback:function(t){e.$set(e.inputForm,".key",t)},expression:"inputForm['.key']"}})],1),n("q-field",{attrs:{label:e.$t("Account code")+" *","label-width":e.labelWidth,error:e.$v.inputForm.accountCode.$error,"error-label":e.$t("Requires non-empty data")}},[n("q-select",{attrs:{disable:!e.hasPermission(["personnel--employee-management--update"]),options:e.incomeTaxAccountCodeOptions},on:{blur:function(t){e.$v.inputForm.accountCode.$touch()}},model:{value:e.inputForm.accountCode,callback:function(t){e.$set(e.inputForm,"accountCode",t)},expression:"inputForm.accountCode"}})],1),n("q-field",{attrs:{label:e.$t("Category")+" *","label-width":e.labelWidth}},[n("q-select",{attrs:{disable:"",options:e.postingCategoryOptions},model:{value:e.postingCategory,callback:function(t){e.postingCategory=t},expression:"postingCategory"}})],1),n("q-field",{attrs:{label:e.$t("Description"),"label-width":e.labelWidth}},[n("q-input",{attrs:{disable:!e.hasPermission(["personnel--employee-management--update"])},model:{value:e.inputForm.description,callback:function(t){e.$set(e.inputForm,"description",t)},expression:"inputForm.description"}})],1),n("q-field",{attrs:{label:e.$t("Amount")+" *","label-width":e.labelWidth,error:e.$v.inputForm.amount.$error,"error-label":e.$t("Requires non-empty data")}},[n("q-input",{attrs:{type:"number",disable:!e.hasPermission(["personnel--employee-management--update"])},on:{blur:function(t){e.$v.inputForm.amount.$touch()}},model:{value:e.inputForm.amount,callback:function(t){e.$set(e.inputForm,"amount",t)},expression:"inputForm.amount"}})],1),n("div",{staticClass:"submit"},["add"===e.formAction?n("q-btn",{staticClass:"q-mr-sm",attrs:{color:"primary",icon:"save","wait-for-ripple":"",disable:e.$v.inputForm.$invalid,label:e.$t("save")},on:{click:e.addForm}}):e._e(),"update"===e.formAction?n("q-btn",{staticClass:"q-mr-sm",attrs:{color:"primary",icon:"save","wait-for-ripple":"",disable:e.$v.inputForm.$invalid,label:e.$t("save")},on:{click:e.updateForm}}):e._e(),n("q-btn",{staticClass:"q-mr-sm",attrs:{color:"light",icon:"cancel","wait-for-ripple":"",label:e.$t("Cancel")},on:{click:function(t){e.formModal=!1}}})],1)],1)])])],1)},a=[];o._withStripped=!0;var i=n("3156"),r=n.n(i),s=n("278c"),c=n.n(s),l=(n("ac6a"),n("551c"),n("7514"),n("96cf"),n("c973")),u=n.n(l),d=n("2f62"),p=n("b5ae"),m=n("7e05"),f=n("44de"),g=n("7266"),b=n("ae92"),h=n("05d8"),v=n("2ef0"),y=n.n(v),C={name:"incomeTax",mixins:[m["a"],f["a"],g["a"],b["a"],h["a"]],data:function(){return{subMenu:this.$t("Income tax"),incomeTaxAccountCodeOptions:[],pagination:{sortBy:"accountCode",descending:!1},columns:[{name:"id",label:this.$t("ID"),field:".key",sortable:!0,align:"left"},{name:"accountCode",label:this.$t("Code"),field:"accountCode",sortable:!0,align:"left"},{name:"postingCategory",label:this.$t("Category"),field:"postingCategory",sortable:!0,align:"left"},{name:"description",label:this.$t("Description"),field:"description",sortable:!0,align:"left"},{name:"amount",label:this.$t("Amount"),field:"amount",sortable:!1,align:"left"}],visibleColumns:["accountCode","postingCategory","description","amount"],inputForm:{".key":null,accountCode:"",postingCategory:"",description:"",amount:0,calculateTax:!1,createdBy:this.userId,createdOn:new Date,modifiedBy:this.userId,modifiedOn:new Date,authUser:this.userId},postingCategory:""}},firestore:function(){return{incomeTaxTb:this.$database.collection("incomeTaxDetail").where("authUser","==",this.$route.params.id),incomeTax:this.$database.collection("incomeTaxDetail")}},validations:{inputForm:{accountCode:{required:p["required"]},amount:{required:p["required"]}}},methods:{addForm:function(){var e=u()(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=this,t.inputForm.postingCategory=t.postingCategory,t.inputForm.createdBy=t.inputForm.modifiedBy=t.userId,t.inputForm.createdOn=t.inputForm.modifiedOn=new Date,t.inputForm.authUser=t.$route.params.id,e.next=7,t.addProcess(t.$firestore.incomeTax,t.inputForm,t.$v.inputForm);case 7:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),updateForm:function(){var e=u()(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=this,t.inputForm.postingCategory=t.postingCategory,t.inputForm.modifiedBy=t.userId,t.inputForm.modifiedOn=new Date,e.next=6,t.updateProcess(t.$firestore.incomeTax,t.inputForm,t.$v.inputForm);case 6:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),deleteRow:function(){var e=u()(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=this,e.next=3,t.deleteProcess(t.selected,t.$firestore.incomeTax);case 3:t.selected=[];case 4:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),showPostingCategoryOption:function(e){var t=this,n="...";return t._.isUndefined(t._.find(t.postingCategoryOptions,{value:e}))||(n=y.a.find(t.postingCategoryOptions,{value:e})["label"]),n},accountCodeLabel:function(e){var t=this,n="...";return t._.isUndefined(t._.find(t.accountCodeOptions,{value:e}))||(n=t._.find(t.accountCodeOptions,{value:e})["label"]),n},getPostingCategory:function(e){var t=this;return new Promise(function(n){var o=t,a="";o.$database.collection("postingCategory").where("code","==",e).get().then(function(e){return e.forEach(function(e){a=e.id}),n(a)})})},getDeductionAccountCodeOptions:function(){var e=this;return new Promise(function(t){var n=e,o=[];n.$database.collection("accountCode").where("postingCategory","==",n.postingCategory).orderBy("code").get().then(function(e){return e.forEach(function(e){o.push({value:e.id,label:"".concat(e.data().code," : ").concat(e.data().description)})}),t(o)})})}},created:function(){var e=u()(regeneratorRuntime.mark(function e(){var t,n,o;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.loadingState(this.$firestore.incomeTax);case 2:return t=e.sent,n=c()(t,2),this.collectionSize=n[0],this.loading=n[1],o=this,o.$emit("updateSubMenu",o.subMenu),e.next=10,o.getPostingCategory("TAX");case 10:return o.postingCategory=e.sent,e.next=13,o.getDeductionAccountCodeOptions();case 13:o.incomeTaxAccountCodeOptions=e.sent;case 14:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),computed:r()({},Object(d["c"])(["userId"]))},$=C,x=n("2877"),w=Object(x["a"])($,o,a,!1,null,null,null);w.options.__file="incomeTax.vue";t["default"]=w.exports},ae92:function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div")},a=[];o._withStripped=!0;n("ac6a");var i={data:function(){return{postingCategoryOptions:[]}},created:function(){var e=this;e.$database.collection("postingCategory").orderBy("index").get().then(function(t){t.forEach(function(t){e.postingCategoryOptions.push({id:t.id,data:t.data(),type:t.data().type,value:t.id,label:"".concat(t.data().code)})})})}},r=i,s=n("2877"),c=Object(s["a"])(r,o,a,!1,null,null,null);c.options.__file="postingCategoryOptions.vue";t["a"]=c.exports}}]);