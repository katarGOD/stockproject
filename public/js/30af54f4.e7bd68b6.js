(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["30af54f4"],{"1e3d":function(t,e,n){},"2c5f":function(t,e,n){"use strict";var r=n("1e3d"),o=n.n(r);o.a},6246:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("q-page",[n("q-card",{staticStyle:{"margin-bottom":"5px"}},[n("q-card-title",[n("p",{staticClass:"q-headline"},[t._v(t._s(t.$t(t.$changeCase.sentenceCase(t.$options.name))))])])],1),n("q-table",{attrs:{"row-key":".key",selection:"multiple",columns:t.columns,data:t.withdraw,filter:t.filter,loading:t.loading,pagination:t.pagination,"visible-columns":t.visibleColumns,selected:t.selected},on:{"update:pagination":function(e){t.pagination=e},"update:selected":function(e){t.selected=e}},scopedSlots:t._u([{key:"top-selection",fn:function(e){return[n("div",{staticStyle:{"padding-top":"9px","padding-bottom":"8px"}},[1==t.selected.length?n("q-btn",{staticClass:"q-mr-sm",attrs:{color:"primary",icon:"edit",round:""},on:{click:function(e){t.openUpdateFrom(t.inputForm,t.selected[0])}}}):t._e(),n("q-btn",{staticClass:"q-mr-sm",attrs:{color:"negative",delete:"",icon:"delete",round:""},on:{click:function(e){t.deleteRow()}}})],1)]}},{key:"top-left",fn:function(e){return[n("q-btn",{staticClass:"q-mr-sm",attrs:{color:"secondary",icon:"add_circle",round:""},on:{click:function(e){t.openAddFormModel(t.inputForm)}}}),n("q-search",{attrs:{"hide-underline":"",color:"secondary"},model:{value:t.filter,callback:function(e){t.filter=e},expression:"filter"}})]}},{key:"top-right",fn:function(e){return[n("q-table-columns",{staticClass:"q-mr-sm",attrs:{color:"secondary",columns:t.columns},model:{value:t.visibleColumns,callback:function(e){t.visibleColumns=e},expression:"visibleColumns"}})]}},{key:"body-cell-index",fn:function(e){return n("q-td",{attrs:{props:e}},[n("span",{attrs:{small:"",color:"secondary"}},[n("q-btn",{attrs:{size:"xs",small:"",flat:"",round:"",icon:"remove"},on:{click:function(n){t.decreaseIndex(e,t.$firestore.withdraw)}}}),t._v("\n        "+t._s(e.value)+"\n        "),n("q-btn",{attrs:{size:"xs",small:"",flat:"",round:"",icon:"add"},on:{click:function(n){t.increaseIndex(e,t.$firestore.withdraw)}}})],1)])}},{key:"body-cell-code",fn:function(e){return n("q-td",{attrs:{props:e}},[n("q-btn",{attrs:{flat:"",label:e.value},on:{click:function(n){t.selected=[t._.find(t.productType,{".key":e.row[".key"]})],t.openUpdateFrom(t.inputForm,t.selected[0])}}})],1)}}])}),n("q-modal",{attrs:{maximized:"","content-css":{padding:"50px"}},model:{value:t.formModal,callback:function(e){t.formModal=e},expression:"formModal"}},[n("div",{staticClass:"row justify-center gutter-lg"},[n("div",{staticClass:"col-xl-4 col-lg-4 col-md-4 col-sm12 col-xs-12"},[n("div",{staticClass:"q-headline"},[t._v(t._s(t.$t(t.$changeCase.sentenceCase(t.$options.name))))]),n("div",{staticClass:"q-subheading"},[t._v(t._s(t.subHeading))])]),n("div",{staticClass:"col-xl-8 col-lg-8 col-md-8 col-sm12 col-xs-12"},[n("q-field",{attrs:{label:t.$t("ID"),"label-width":t.labelWidth}},[n("q-input",{attrs:{disable:""},model:{value:t.inputForm[".key"],callback:function(e){t.$set(t.inputForm,".key",e)},expression:"inputForm['.key']"}})],1),n("q-field",{attrs:{label:t.$t("Index")+" *","label-width":t.labelWidth,error:t.$v.inputForm.index.$error,"error-label":(t.$v.inputForm.index.required?"":t.$t("Requires non-empty data"))+" "+(t.$v.inputForm.index.numeric?"":t.$t("onlyNumerics"))}},[n("q-input",{attrs:{type:"number",disable:"approval"===t.inputForm.approval},on:{blur:function(e){t.$v.inputForm.index.$touch()}},model:{value:t.inputForm.index,callback:function(e){t.$set(t.inputForm,"index",e)},expression:"inputForm.index"}})],1),n("q-field",{attrs:{label:t.$t("Code")+" *","label-width":t.labelWidth,error:t.$v.inputForm.code.$error,"error-label":""+(t.$v.inputForm.code.required?"":t.$t("Requires non-empty data"))}},[n("q-input",{attrs:{disable:"approval"===t.inputForm.approval},on:{blur:function(e){t.$v.inputForm.code.$touch()}},model:{value:t.inputForm.code,callback:function(e){t.$set(t.inputForm,"code",e)},expression:"inputForm.code"}})],1),n("q-field",{attrs:{label:t.$t("Stock type")+" *","label-width":t.labelWidth,error:t.$v.inputForm.stockType.$error,"error-label":t.$t("Requires non-empty data")}},[n("q-select",{attrs:{disable:"approval"===t.inputForm.approval,options:t.stockTypeOptions},on:{blur:function(e){t.$v.inputForm.stockType.$touch()}},model:{value:t.inputForm.stockType,callback:function(e){t.$set(t.inputForm,"stockType",e)},expression:"inputForm.stockType"}})],1),n("q-field",{attrs:{label:t.$t("Product type")+" *","label-width":t.labelWidth,error:t.$v.inputForm.productType.$error,"error-label":t.$t("Requires non-empty data")}},[n("q-select",{attrs:{options:t.productTypeOptions,disable:"approval"===t.inputForm.approval},on:{blur:function(e){t.$v.inputForm.productType.$touch()}},model:{value:t.inputForm.productType,callback:function(e){t.$set(t.inputForm,"productType",e)},expression:"inputForm.productType"}})],1),n("q-field",{attrs:{label:t.$t("Product")+" *","label-width":t.labelWidth,error:t.$v.inputForm.product.$error,"error-label":t.$t("Requires non-empty data")}},[n("q-select",{attrs:{disable:"approval"===t.inputForm.approval,options:t.productOptions},on:{blur:function(e){t.$v.inputForm.product.$touch()}},model:{value:t.inputForm.product,callback:function(e){t.$set(t.inputForm,"product",e)},expression:"inputForm.product"}})],1),n("q-field",{attrs:{label:t.$t("Description"),"label-width":t.labelWidth}},[n("q-input",{attrs:{disable:"approval"===t.inputForm.approval},model:{value:t.inputForm.description,callback:function(e){t.$set(t.inputForm,"description",e)},expression:"inputForm.description"}})],1),n("q-field",{attrs:{label:t.$t("Qty All")+" *","label-width":t.labelWidth}},[n("q-input",{attrs:{type:"number",disabled:""},model:{value:t.qtyAll,callback:function(e){t.qtyAll=e},expression:"qtyAll"}})],1),n("q-field",{attrs:{label:t.$t("Qty")+" *","label-width":t.labelWidth,error:t.$v.inputForm.qty.$error,"error-label":(t.$v.inputForm.qty.required?"":t.$t("Requires non-empty data"))+" "+(t.$v.inputForm.qty.numeric?"":t.$t("onlyNumerics"))}},[n("q-input",{attrs:{type:"number",disable:"approval"===t.inputForm.approval},on:{blur:function(e){t.$v.inputForm.qty.$touch()}},model:{value:t.inputForm.qty,callback:function(e){t.$set(t.inputForm,"qty",e)},expression:"inputForm.qty"}})],1),n("q-field",{attrs:{label:t.$t("Approval status"),"label-width":t.labelWidth}},[n("q-btn-toggle",{attrs:{"toggle-color":"primary",disable:!t.hasPermission(["admin"]),options:[{label:t.$t("Approved"),value:"approval"},{label:t.$t("Waiting for approval"),value:"waiting"}]},model:{value:t.inputForm.approval,callback:function(e){t.$set(t.inputForm,"approval",e)},expression:"inputForm.approval"}})],1),n("div",{staticClass:"submit"},["add"===t.formAction?n("q-btn",{staticClass:"q-mr-sm",attrs:{color:"primary",icon:"save","wait-for-ripple":"",disable:t.$v.inputForm.$invalid,label:t.$t("Save")},on:{click:t.addForm}}):t._e(),"update"===t.formAction?n("q-btn",{staticClass:"q-mr-sm",attrs:{color:"primary",icon:"save","wait-for-ripple":"",disable:t.$v.inputForm.$invalid,label:t.$t("Save")},on:{click:t.updateForm}}):t._e(),n("q-btn",{staticClass:"q-mr-sm",attrs:{color:"light",icon:"cancel","wait-for-ripple":"",label:t.$t("Cancel")},on:{click:function(e){t.formModal=!1}}})],1)],1)])])],1)},o=[];r._withStripped=!0;var i=n("3156"),a=n.n(i),l=n("278c"),c=n.n(l),u=(n("551c"),n("ac6a"),n("7514"),n("96cf"),n("c973")),s=n.n(u),d=n("2f62"),p=n("676b"),m=n("7266"),f=n("cda9"),v=n("a62b"),b=n("b5ae"),h=n("44de"),y=n("05d8"),F={name:"Purchase Order",mixins:[h["a"],p["a"],f["a"],m["a"],v["a"],y["a"]],data:function(){return{qtyAll:0,productAll:[],pagination:{sortBy:"index",descending:!1},columns:[{name:".key",label:this.$t("ID"),field:".key",sortable:!0,align:"left"},{name:"index",label:this.$t("Index"),field:"index",sortable:!0,sort:function(t,e){return parseInt(t,10)-parseInt(e,10)},align:"left"},{name:"code",label:this.$t("Code"),field:"code",sortable:!0,align:"left"},{name:"description",label:this.$t("Description"),field:"description",sortable:!1,align:"left"},{name:"createdBy",label:this.$t("Created by"),field:"createdBy",sortable:!1,align:"left"}],visibleColumns:["index","code","description"],inputForm:{".key":null,index:null,code:null,stockType:null,product:null,productType:null,description:null,qty:null,createdBy:this.userId,approval:"waiting",createdOn:new Date,modifiedBy:this.userId,modifiedOn:new Date,totalPrice:0},json_fields:{Code:"code",Description:"description"},json_data:[],json_meta:[[{key:"charset",value:"utf-8"}]]}},validations:{inputForm:{index:{required:b["required"],numeric:b["numeric"]},code:{required:b["required"]},productType:{required:b["required"]},stockType:{required:b["required"]},product:{required:b["required"]},qty:{required:b["required"],numeric:b["numeric"]},totalPrice:{required:b["required"],numeric:b["numeric"]}}},firestore:function(){return{withdraw:this.$database.collection("withdraw")}},methods:{addForm:function(){var t=s()(regeneratorRuntime.mark(function t(){var e,n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(e=this,n="",e.inputForm.createdBy=e.inputForm.modifiedBy=e.userId,e.inputForm.createdOn=e.inputForm.modifiedOn=new Date,"approval"!==e.inputForm.approval){t.next=7;break}return t.next=7,e.updateQty(e.inputForm.product);case 7:return t.next=9,e.addProcess(e.$firestore.withdraw,e.inputForm,e.$v.inputForm);case 9:n=t.sent,console.log(n);case 11:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),openAddFormModel:function(t){var e=this;e.subHeading=e.$t("Add"),e.formAction="add",e.initialInputFormModel(),e.formModal=!0},initialInputFormModel:function(){var t=this;t.inputForm[".key"]=null,t.inputForm.index=null,t.inputForm.code=null,t.inputForm.stockType=null,t.inputForm.product=null,t.inputForm.productType=null,t.inputForm.description=null,t.inputForm.qty=null,t.inputForm.createdBy=this.userId,t.inputForm.approval="waiting",t.inputForm.createdOn=new Date,t.inputForm.modifiedBy=this.userId,t.inputForm.modifiedOn=new Date,t.inputForm.totalPrice=0},updateForm:function(){var t=s()(regeneratorRuntime.mark(function t(){var e,n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e=this,t.next=3,e.getWithdraw();case 3:if(n=t.sent,e.inputForm.modifiedBy=e.userId,e.inputForm.modifiedOn=new Date,console.log(n),console.log(e._.find(n,{id:e.inputForm[".key"]}).approval),"waiting"!==e._.find(n,{id:e.inputForm[".key"]}).approval){t.next=12;break}if("approval"!==e.inputForm.approval){t.next=12;break}return t.next=12,e.updateQty(e.inputForm.product);case 12:return t.next=14,e.updateProcess(e.$firestore.withdraw,e.inputForm,e.$v.inputForm);case 14:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),deleteRow:function(){var t=s()(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e=this,t.next=3,e.deleteProcess(e.selected,e.$firestore.withdraw);case 3:e.selected=[];case 4:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),createExportData:function(){var t=this;t.$firestore.withdraw.orderBy("code").get().then(function(e){e.forEach(function(e){t.json_data.push({code:e.data().code,description:e.data().description})})})},getWithdraw:function(){var t=this,e=[];return new Promise(function(n){t.$database.collection("withdraw").get().then(function(t){return console.log(t),t.forEach(function(t){e.push({id:t.id,approval:t.data().approval,data:t.data()})}),console.log(e),n(e)})})},getProduct:function(){var t=this,e=[];return new Promise(function(n){t.$database.collection("product").get().then(function(t){return console.log(t),t.forEach(function(t){e.push({id:t.id,price:t.data().buyIn,data:t.data(),qty:t.data().qty})}),console.log(e),n(e)})})},updateQty:function(t){var e=this;return new Promise(function(n){e.$database.collection("product").doc(t).update({qty:e.qtyAll-e.inputForm.qty}).then(function(){return n(!0)})})}},created:function(){var t=s()(regeneratorRuntime.mark(function t(){var e,n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.loadingState(this.$firestore.withdraw);case 2:return e=t.sent,n=c()(e,2),this.collectionSize=n[0],this.loading=n[1],this.initialInputForm(this.inputForm),this.createExportData(),t.next=10,this.getProduct();case 10:this.productAll=t.sent,console.log(this.productAll);case 12:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),computed:a()({},Object(d["c"])(["userId"])),watch:{"inputForm.product":function(){var t=this;if(t.inputForm.product){var e=t._.find(t.productAll,{id:t.inputForm.product}).qty;t.qtyAll=e}}}},$=F,q=(n("2c5f"),n("2877")),w=Object(q["a"])($,r,o,!1,null,null,null);w.options.__file="withdraw.vue";e["default"]=w.exports},"676b":function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div")},o=[];r._withStripped=!0;n("ac6a");var i={data:function(){return{stockTypeOptions:[]}},created:function(){var t=this;t.$database.collection("stockType").orderBy("index").get().then(function(e){e.forEach(function(e){t.stockTypeOptions.push({id:e.id,data:e.data(),code:e.data().code,value:e.id,label:"".concat(e.data().code)})})})}},a=i,l=n("2877"),c=Object(l["a"])(a,r,o,!1,null,null,null);c.options.__file="stockTypeOptions.vue";e["a"]=c.exports},7266:function(t,e,n){"use strict";var r,o,i=n("3156"),a=n.n(i),l=n("2f62"),c={methods:{hasPermission:function(t){var e=this._.uniq(this.userPermission),n=this._.intersection(e,t).length;return n}},computed:a()({},Object(l["c"])(["userPermission"]))},u=c,s=n("2877"),d=Object(s["a"])(u,r,o,!1,null,null,null);d.options.__file="hasPermission.vue";e["a"]=d.exports},a62b:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div")},o=[];r._withStripped=!0;n("ac6a");var i={data:function(){return{productTypeOptions:[]}},created:function(){var t=this;t.$database.collection("productType").orderBy("index").get().then(function(e){e.forEach(function(e){t.productTypeOptions.push({id:e.id,data:e.data(),code:e.data().code,value:e.id,label:"".concat(e.data().code)})})})}},a=i,l=n("2877"),c=Object(l["a"])(a,r,o,!1,null,null,null);c.options.__file="productTypeOptions.vue";e["a"]=c.exports},cda9:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div")},o=[];r._withStripped=!0;n("ac6a");var i={data:function(){return{productOptions:[]}},created:function(){var t=this;t.$database.collection("product").orderBy("index").get().then(function(e){e.forEach(function(e){t.productOptions.push({id:e.id,data:e.data(),code:e.data().code,value:e.id,label:"".concat(e.data().code," : ").concat(e.data().description)})})})}},a=i,l=n("2877"),c=Object(l["a"])(a,r,o,!1,null,null,null);c.options.__file="productOptions.vue";e["a"]=c.exports}}]);