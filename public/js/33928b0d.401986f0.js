(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["33928b0d"],{"16b8":function(e,t,n){},"468a":function(e,t,n){"use strict";var i=n("16b8"),r=n.n(i);r.a},da4a:function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("q-page",[n("q-card",{staticStyle:{"margin-bottom":"5px"}},[n("q-card-title",[n("p",{staticClass:"q-headline"},[e._v(e._s(e.$t(e.$changeCase.sentenceCase(e.$options.name))))])])],1),n("q-table",{attrs:{"row-key":".key",selection:"multiple",columns:e.columns,data:e.productType,filter:e.filter,loading:e.loading,pagination:e.pagination,"visible-columns":e.visibleColumns,selected:e.selected},on:{"update:pagination":function(t){e.pagination=t},"update:selected":function(t){e.selected=t}},scopedSlots:e._u([{key:"top-selection",fn:function(t){return[n("div",{staticStyle:{"padding-top":"9px","padding-bottom":"8px"}},[1==e.selected.length?n("q-btn",{staticClass:"q-mr-sm",attrs:{color:"primary",icon:"edit",round:""},on:{click:function(t){e.openUpdateFrom(e.inputForm,e.selected[0])}}}):e._e(),n("q-btn",{staticClass:"q-mr-sm",attrs:{color:"negative",delete:"",icon:"delete",round:""},on:{click:function(t){e.deleteRow()}}})],1)]}},{key:"top-left",fn:function(t){return[n("q-btn",{staticClass:"q-mr-sm",attrs:{color:"secondary",icon:"add_circle",round:""},on:{click:function(t){e.openAddForm(e.inputForm)}}}),n("q-search",{attrs:{"hide-underline":"",color:"secondary"},model:{value:e.filter,callback:function(t){e.filter=t},expression:"filter"}})]}},{key:"top-right",fn:function(t){return[n("q-table-columns",{staticClass:"q-mr-sm",attrs:{color:"secondary",columns:e.columns},model:{value:e.visibleColumns,callback:function(t){e.visibleColumns=t},expression:"visibleColumns"}})]}},{key:"body-cell-index",fn:function(t){return n("q-td",{attrs:{props:t}},[n("span",{attrs:{small:"",color:"secondary"}},[n("q-btn",{attrs:{size:"xs",small:"",flat:"",round:"",icon:"remove"},on:{click:function(n){e.decreaseIndex(t,e.$firestore.productType)}}}),e._v("\n        "+e._s(t.value)+"\n        "),n("q-btn",{attrs:{size:"xs",small:"",flat:"",round:"",icon:"add"},on:{click:function(n){e.increaseIndex(t,e.$firestore.productType)}}})],1)])}},{key:"body-cell-code",fn:function(t){return n("q-td",{attrs:{props:t}},[n("q-btn",{attrs:{flat:"",label:t.value},on:{click:function(n){e.selected=[e._.find(e.productType,{".key":t.row[".key"]})],e.openUpdateFrom(e.inputForm,e.selected[0])}}})],1)}}])}),n("q-modal",{attrs:{maximized:"","content-css":{padding:"50px"}},model:{value:e.formModal,callback:function(t){e.formModal=t},expression:"formModal"}},[n("div",{staticClass:"row justify-center gutter-lg"},[n("div",{staticClass:"col-xl-4 col-lg-4 col-md-4 col-sm12 col-xs-12"},[n("div",{staticClass:"q-headline"},[e._v(e._s(e.$t(e.$changeCase.sentenceCase(e.$options.name))))]),n("div",{staticClass:"q-subheading"},[e._v(e._s(e.subHeading))])]),n("div",{staticClass:"col-xl-8 col-lg-8 col-md-8 col-sm12 col-xs-12"},[n("q-field",{attrs:{label:e.$t("ID"),"label-width":e.labelWidth}},[n("q-input",{attrs:{disable:""},model:{value:e.inputForm[".key"],callback:function(t){e.$set(e.inputForm,".key",t)},expression:"inputForm['.key']"}})],1),n("q-field",{attrs:{label:e.$t("Index")+" *","label-width":e.labelWidth,error:e.$v.inputForm.index.$error,"error-label":(e.$v.inputForm.index.required?"":e.$t("Requires non-empty data"))+" "+(e.$v.inputForm.index.numeric?"":e.$t("onlyNumerics"))}},[n("q-input",{attrs:{type:"number"},on:{blur:function(t){e.$v.inputForm.index.$touch()}},model:{value:e.inputForm.index,callback:function(t){e.$set(e.inputForm,"index",t)},expression:"inputForm.index"}})],1),n("q-field",{attrs:{label:e.$t("Code")+" *","label-width":e.labelWidth,error:e.$v.inputForm.code.$error,"error-label":""+(e.$v.inputForm.code.required?"":e.$t("Requires non-empty data"))}},[n("q-input",{on:{blur:function(t){e.$v.inputForm.code.$touch()}},model:{value:e.inputForm.code,callback:function(t){e.$set(e.inputForm,"code",t)},expression:"inputForm.code"}})],1),n("q-field",{attrs:{label:e.$t("Description"),"label-width":e.labelWidth}},[n("q-input",{model:{value:e.inputForm.description,callback:function(t){e.$set(e.inputForm,"description",t)},expression:"inputForm.description"}})],1),n("div",{staticClass:"submit"},["add"===e.formAction?n("q-btn",{staticClass:"q-mr-sm",attrs:{color:"primary",icon:"save","wait-for-ripple":"",disable:e.$v.inputForm.$invalid,label:e.$t("Save")},on:{click:e.addForm}}):e._e(),"update"===e.formAction?n("q-btn",{staticClass:"q-mr-sm",attrs:{color:"primary",icon:"save","wait-for-ripple":"",disable:e.$v.inputForm.$invalid,label:e.$t("Save")},on:{click:e.updateForm}}):e._e(),n("q-btn",{staticClass:"q-mr-sm",attrs:{color:"light",icon:"cancel","wait-for-ripple":"",label:e.$t("Cancel")},on:{click:function(t){e.formModal=!1}}})],1)],1)])])],1)},r=[];i._withStripped=!0;var o=n("3156"),a=n.n(o),s=n("278c"),l=n.n(s),c=(n("ac6a"),n("96cf"),n("c973")),d=n.n(c),u=n("2f62"),p=n("b5ae"),m=n("44de"),f=n("05d8"),b={name:"stock",mixins:[m["a"],f["a"]],data:function(){return{pagination:{sortBy:"index",descending:!1},columns:[{name:".key",label:this.$t("ID"),field:".key",sortable:!0,align:"left"},{name:"index",label:this.$t("Index"),field:"index",sortable:!0,sort:function(e,t){return parseInt(e,10)-parseInt(t,10)},align:"left"},{name:"code",label:this.$t("Code"),field:"code",sortable:!0,align:"left"},{name:"description",label:this.$t("Description"),field:"description",sortable:!1,align:"left"},{name:"createdBy",label:this.$t("Created by"),field:"createdBy",sortable:!1,align:"left"}],visibleColumns:["index","code","description"],inputForm:{".key":null,index:null,code:null,description:null,createdBy:this.userId,createdOn:new Date,modifiedBy:this.userId,modifiedOn:new Date},json_fields:{Code:"code",Description:"description"},json_data:[],json_meta:[[{key:"charset",value:"utf-8"}]]}},validations:{inputForm:{index:{required:p["required"],numeric:p["numeric"]},code:{required:p["required"]}}},firestore:function(){return{productType:this.$database.collection("stockType")}},methods:{addForm:function(){var e=d()(regeneratorRuntime.mark(function e(){var t,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=this,n="",t.inputForm.createdBy=t.inputForm.modifiedBy=t.userId,t.inputForm.createdOn=t.inputForm.modifiedOn=new Date,e.next=6,t.addProcess(t.$firestore.productType,t.inputForm,t.$v.inputForm);case 6:n=e.sent,console.log(n);case 8:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),updateForm:function(){var e=d()(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=this,t.inputForm.modifiedBy=t.userId,t.inputForm.modifiedOn=new Date,e.next=5,t.updateProcess(t.$firestore.productType,t.inputForm,t.$v.inputForm);case 5:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),deleteRow:function(){var e=d()(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=this,e.next=3,t.deleteProcess(t.selected,t.$firestore.productType);case 3:t.selected=[];case 4:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),createExportData:function(){var e=this;e.$firestore.productType.orderBy("code").get().then(function(t){t.forEach(function(t){e.json_data.push({code:t.data().code,description:t.data().description})})})}},created:function(){var e=d()(regeneratorRuntime.mark(function e(){var t,n;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.loadingState(this.$firestore.productType);case 2:t=e.sent,n=l()(t,2),this.collectionSize=n[0],this.loading=n[1],this.initialInputForm(this.inputForm),this.createExportData();case 8:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),computed:a()({},Object(u["c"])(["userId"]))},v=b,h=(n("468a"),n("2877")),y=Object(h["a"])(v,i,r,!1,null,null,null);y.options.__file="stockType.vue";t["default"]=y.exports}}]);