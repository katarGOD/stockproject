(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["7740507a"],{"20d9":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div")},a=[];i._withStripped=!0;n("cadf"),n("96cf");var o=n("c973"),s=n.n(o),r=(n("7514"),n("ac6a"),n("551c"),{data:function(){return{branchs:[],departments:[],positions:[],officials:[],authUserOptions:[]}},methods:{getBranchOptions:function(){var t=this;return new Promise(function(e){var n=t,i=[];n.$database.collection("branch").get().then(function(t){t.forEach(function(t){i.push({id:t.id,code:t.data().code,description:t.data().description})}),n.branchs=i,e(i)})})},getDepartmentOptions:function(){var t=this;return new Promise(function(e){var n=t,i=[];n.$database.collection("department").get().then(function(t){t.forEach(function(t){i.push({id:t.id,code:t.data().code,description:t.data().description})}),n.departments=i,e(i)})})},getPositionOptions:function(){var t=this;return new Promise(function(e){var n=t,i=[];n.$database.collection("position").get().then(function(t){t.forEach(function(t){i.push({id:t.id,jobTitleThai:t.data().jobTitleThai,jobTitleEnglish:t.data().jobTitleEnglish})}),n.positions=i,e(i)})})},getOffical:function(){var t=this;return new Promise(function(e){var n=t,i=[];n.$database.collection("official").get().then(function(t){t.forEach(function(t){i.push({id:t.id,authUser:t.data().authUser,employeeId:t.data().employeeid,employeePayType:t.data().employeePayType})}),n.officials=i,e(i)})})},getAuthUserOptions:function(){var t=this;return new Promise(function(e){var n=t,i=[];n.$database.collection("authUser").orderBy("firstName").get().then(function(t){t.forEach(function(t){var e=n._.find(n.positions,{id:t.data().position}),a=e?e.jobTitleEnglish:"",o=n._.find(n.officials,{authUser:t.id}),s=o?o.employeeId:"",r=o?o.employeePayType:"",c=n._.find(n.departments,{id:t.data().department}),u=c?c.code:"",l=n._.find(n.branchs,{id:t.data().branch}),d=l?l.code:"";i.push({id:t.id,data:t.data(),name:"".concat(t.data().firstName," ").concat(t.data().lastName),employeeId:s,branch:d,department:u,photo:t.data().photo,jobTitle:a,employeePayType:r,value:t.id,label:"".concat(t.data().firstName," ").concat(t.data().lastName," ").concat(a?"("+a+")":""," ").concat(r)})}),n.authUserOptions=i,e(i)}).catch(function(t){console.log(t)})})}},created:function(){var t=s()(regeneratorRuntime.mark(function t(){var e,n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:e=this,n=[e.getBranchOptions(),e.getPositionOptions(),e.getOffical(),e.getDepartmentOptions()],Promise.all(n).then(function(){e.getAuthUserOptions()});case 3:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()}),c=r,u=n("2877"),l=Object(u["a"])(c,i,a,!1,null,null,null);l.options.__file="authUserWithMoreInfoOptions.vue";e["a"]=l.exports},"28be":function(t,e,n){"use strict";var i=n("b7b7f"),a=n.n(i);a.a},"40eb":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("q-page",[n("q-card",{staticStyle:{"margin-bottom":"8px"}},[n("q-card-title",[n("p",{staticClass:"q-headline"},[t._v(t._s(t.$t("Profile")))]),n("span",{attrs:{slot:"right"},slot:"right"},[n("div",{staticClass:"q-subheading",staticStyle:{"padding-bottom":"20px"}},[t._v(t._s(t.subMenu)+" : "+t._s(t.userName()))])])])],1),t.hasPermission?n("div",{staticClass:"row justify-between gutter-xs"},[n("div",{staticClass:"col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-12"},[n("sub-menu")],1),n("div",{staticClass:"col-xl-10 col-lg-10 col-md-10 col-sm-9 col-xs-12"},[n("router-view",{on:{updateSubMenu:function(e){t.subMenu=e}}})],1)]):n("div",[t._v("\n    "+t._s(t.$t("Authenticating..."))+"\n  ")])],1)},a=[];i._withStripped=!0;var o=n("3156"),s=n.n(o),r=(n("7514"),n("7f7f"),n("2f62")),c=n("20d9"),u=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("q-list",{attrs:{link:""}},[n("q-item",{attrs:{to:{path:"/my-account/profile/"+t.$route.params.id+"/personal"}}},[n("q-item-main",[n("q-item-tile",{attrs:{label:""}},[t._v(t._s(t.$t("Personal")))])],1)],1)],1)},l=[];u._withStripped=!0;var d=n("2877"),p={},f=Object(d["a"])(p,u,l,!1,null,null,null);f.options.__file="subMenu.vue";var h=f.exports,m={name:"profileIndex",mixins:[c["a"]],components:{subMenu:h},data:function(){return{subMenu:""}},methods:{userName:function(){return this._.find(this.authUserOptions,{id:this.$route.params.id})["name"]}},computed:s()({},Object(r["c"])(["userId","userPermission"]),{hasPermission:function(){var t=this,e=!1,n=t._.uniq(t.userPermission);return e=!!t._.intersection(n,["personnel--employee-management"]).length||t.$route.params.id===t.userId,e}})},b=m,v=(n("28be"),Object(d["a"])(b,i,a,!1,null,null,null));v.options.__file="index.vue";e["default"]=v.exports},b7b7f:function(t,e,n){}}]);