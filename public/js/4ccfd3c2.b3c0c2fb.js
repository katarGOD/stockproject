(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["4ccfd3c2"],{"1d45":function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("q-page",[i("q-table",{attrs:{"row-key":".key",selection:"single",columns:e.columns,data:e.skillTb,filter:e.filter,loading:e.loading,pagination:e.pagination,"visible-columns":e.visibleColumns,selected:e.selected},on:{"update:pagination":function(t){e.pagination=t},"update:selected":function(t){e.selected=t}},scopedSlots:e._u([{key:"top-selection",fn:function(t){return[i("div",{staticStyle:{"padding-top":"8px","padding-bottom":"8px"}},[1==e.selected.length?i("q-btn",{staticClass:"q-mr-sm",attrs:{color:"primary",icon:"edit",round:"",disable:!e.hasPermission(["personnel--employee-management--update"])},on:{click:function(t){e.openUpdateFrom(e.inputForm,e.selected[0])}}}):e._e(),i("q-btn",{staticClass:"q-mr-sm",attrs:{color:"negative",icon:"delete",round:"",disable:!e.hasPermission(["personnel--employee-management--update"])},on:{click:function(t){e.deleteRow()}}})],1)]}},{key:"top-left",fn:function(t){return[i("q-btn",{staticClass:"q-mr-sm",attrs:{color:"secondary",icon:"add_circle",round:"",disable:!e.hasPermission(["personnel--employee-management--update"])},on:{click:function(t){e.openAddForm(e.inputForm)}}}),i("q-search",{attrs:{"hide-underline":"",color:"secondary"},model:{value:e.filter,callback:function(t){e.filter=t},expression:"filter"}})]}},{key:"top-right",fn:function(t){return[i("q-table-columns",{staticClass:"q-mr-sm",attrs:{color:"secondary",columns:e.columns},model:{value:e.visibleColumns,callback:function(t){e.visibleColumns=t},expression:"visibleColumns"}})]}}])}),i("q-modal",{attrs:{maximized:"","content-css":{padding:"50px"}},model:{value:e.formModal,callback:function(t){e.formModal=t},expression:"formModal"}},[i("div",{staticClass:"row justify-center gutter-lg"},[i("div",{staticClass:"col-xl-4 col-lg-4 col-md-4 col-sm12 col-xs-12"},[i("div",{staticClass:"q-headline"},[e._v(e._s(e.$t(e.$changeCase.sentenceCase(e.$options.name))))]),i("div",{staticClass:"q-subheading"},[e._v(e._s(e.subHeading))])]),i("div",{staticClass:"col-xl-8 col-lg-8 col-md-8 col-sm12 col-xs-12"},[i("q-field",{attrs:{label:e.$t("ID"),"label-width":e.labelWidth}},[i("q-input",{attrs:{disable:""},model:{value:e.inputForm[".key"],callback:function(t){e.$set(e.inputForm,".key",t)},expression:"inputForm['.key']"}})],1),i("q-field",{attrs:{label:e.$t("Skill")+" *","label-width":e.labelWidth,error:e.$v.inputForm.skill.$error,"error-label":e.$t("Requires non-empty data")}},[i("q-input",{attrs:{disable:!e.hasPermission(["personnel--employee-management--update"])},on:{blur:function(t){e.$v.inputForm.skill.$touch()}},model:{value:e.inputForm.skill,callback:function(t){e.$set(e.inputForm,"skill",t)},expression:"inputForm.skill"}})],1),i("q-field",{attrs:{label:e.$t("Experiences"),"label-width":e.labelWidth}},[i("q-input",{attrs:{disable:!e.hasPermission(["personnel--employee-management--update"])},model:{value:e.inputForm.yearsofExperience,callback:function(t){e.$set(e.inputForm,"yearsofExperience",t)},expression:"inputForm.yearsofExperience"}})],1),i("q-field",{attrs:{label:e.$t("Competency level"),"label-width":e.labelWidth}},[i("q-select",{attrs:{disable:!e.hasPermission(["personnel--employee-management--update"]),options:e.levelOptions},model:{value:e.inputForm.level,callback:function(t){e.$set(e.inputForm,"level",t)},expression:"inputForm.level"}})],1),i("q-field",{attrs:{label:e.$t("Note"),"label-width":e.labelWidth}},[i("q-editor",{attrs:{disable:!e.hasPermission(["personnel--employee-management--update"])},model:{value:e.inputForm.note,callback:function(t){e.$set(e.inputForm,"note",t)},expression:"inputForm.note"}})],1),i("div",{staticClass:"submit"},["add"===e.formAction?i("q-btn",{staticClass:"q-mr-sm",attrs:{color:"primary",icon:"save","wait-for-ripple":"",disable:e.$v.inputForm.$invalid,label:e.$t("save")},on:{click:e.addForm}}):e._e(),"update"===e.formAction?i("q-btn",{staticClass:"q-mr-sm",attrs:{color:"primary",icon:"save","wait-for-ripple":"",disable:e.$v.inputForm.$invalid,label:e.$t("save")},on:{click:e.updateForm}}):e._e(),i("q-btn",{staticClass:"q-mr-sm",attrs:{color:"light",icon:"cancel","wait-for-ripple":"",label:e.$t("Cancel")},on:{click:function(t){e.formModal=!1}}})],1)],1)])])],1)},l=[];n._withStripped=!0;var s=i("3156"),r=i.n(s),a=i("278c"),o=i.n(a),c=(i("96cf"),i("c973")),u=i.n(c),d=i("2f62"),m=i("b5ae"),p=i("44de"),f=i("7266"),b=i("05d8"),h={name:"skill",mixins:[p["a"],f["a"],b["a"]],data:function(){return{subMenu:this.$t("Skill"),pagination:{sortBy:"skill",descending:!1},columns:[{name:"id",label:this.$t("ID"),field:".key",sortable:!0,align:"left"},{name:"skill",label:this.$t("Skill"),field:"skill",sortable:!0,align:"left"},{name:"yearsofExperience",label:this.$t("Experiences"),field:"yearsofExperience",sortable:!1,align:"left"},{name:"level",label:this.$t("Level"),field:"level",sortable:!0,align:"left"},{name:"note",label:this.$t("Note"),field:"note",sortable:!1,align:"left"}],visibleColumns:["level","skill","yearsofExperience"],inputForm:{".key":null,level:"",skill:"",yearsofExperience:"",note:"",createdBy:this.userId,createdOn:new Date,modifiedBy:this.userId,modifiedOn:new Date,authUser:this.userId},levelOptions:[{label:"Level 1",value:"Level 1"},{label:"Level 2",value:"Level 2"},{label:"Level 3",value:"Level 3"}]}},validations:{inputForm:{skill:{required:m["required"]}}},firestore:function(){return{skillTb:this.$database.collection("skill").where("authUser","==",this.$route.params.id),skill:this.$database.collection("skill")}},methods:{addForm:function(){var e=u()(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=this,t.inputForm.createdBy=t.inputForm.modifiedBy=t.userId,t.inputForm.createdOn=t.inputForm.modifiedOn=new Date,t.inputForm.authUser=t.$route.params.id,e.next=6,t.addProcess(t.$firestore.skill,t.inputForm,t.$v.inputForm);case 6:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),updateForm:function(){var e=u()(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=this,t.inputForm.modifiedBy=t.userId,t.inputForm.modifiedOn=new Date,e.next=5,t.updateProcess(t.$firestore.skill,t.inputForm,t.$v.inputForm);case 5:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),deleteRow:function(){var e=u()(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=this,e.next=3,t.deleteProcess(t.selected,t.$firestore.skill);case 3:t.selected=[];case 4:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},created:function(){var e=u()(regeneratorRuntime.mark(function e(){var t,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.loadingState(this.$firestore.skill);case 2:t=e.sent,i=o()(t,2),this.collectionSize=i[0],this.loading=i[1],this.$emit("updateSubMenu",this.subMenu),this.initialInputForm(this.inputForm);case 8:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),computed:r()({},Object(d["c"])(["userId"]))},v=h,k=i("2877"),g=Object(k["a"])(v,n,l,!1,null,null,null);g.options.__file="skill.vue";t["default"]=g.exports},7266:function(e,t,i){"use strict";var n,l,s=i("3156"),r=i.n(s),a=i("2f62"),o={methods:{hasPermission:function(e){var t=this._.uniq(this.userPermission),i=this._.intersection(t,e).length;return i}},computed:r()({},Object(a["c"])(["userPermission"]))},c=o,u=i("2877"),d=Object(u["a"])(c,n,l,!1,null,null,null);d.options.__file="hasPermission.vue";t["a"]=d.exports}}]);