(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["0aaa06aa"],{"0caf":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div")},o=[];i._withStripped=!0;a("ac6a");var n={data:function(){return{departmentOptions:[]}},created:function(){var t=this;t.$database.collection("department").orderBy("code").get().then(function(e){e.forEach(function(e){t.departmentOptions.push({id:e.id,data:e.data(),value:e.id,label:"".concat(e.data().code," : ").concat(e.data().description),model:!1})})})}},r=n,l=a("2877"),s=Object(l["a"])(r,i,o,!1,null,null,null);s.options.__file="departmentOptions.vue";e["a"]=s.exports},"20d9":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div")},o=[];i._withStripped=!0;a("cadf"),a("96cf");var n=a("c973"),r=a.n(n),l=(a("7514"),a("ac6a"),a("551c"),{data:function(){return{branchs:[],departments:[],positions:[],officials:[],authUserOptions:[]}},methods:{getBranchOptions:function(){var t=this;return new Promise(function(e){var a=t,i=[];a.$database.collection("branch").get().then(function(t){t.forEach(function(t){i.push({id:t.id,code:t.data().code,description:t.data().description})}),a.branchs=i,e(i)})})},getDepartmentOptions:function(){var t=this;return new Promise(function(e){var a=t,i=[];a.$database.collection("department").get().then(function(t){t.forEach(function(t){i.push({id:t.id,code:t.data().code,description:t.data().description})}),a.departments=i,e(i)})})},getPositionOptions:function(){var t=this;return new Promise(function(e){var a=t,i=[];a.$database.collection("position").get().then(function(t){t.forEach(function(t){i.push({id:t.id,jobTitleThai:t.data().jobTitleThai,jobTitleEnglish:t.data().jobTitleEnglish})}),a.positions=i,e(i)})})},getOffical:function(){var t=this;return new Promise(function(e){var a=t,i=[];a.$database.collection("official").get().then(function(t){t.forEach(function(t){i.push({id:t.id,authUser:t.data().authUser,employeeId:t.data().employeeid,employeePayType:t.data().employeePayType})}),a.officials=i,e(i)})})},getAuthUserOptions:function(){var t=this;return new Promise(function(e){var a=t,i=[];a.$database.collection("authUser").orderBy("firstName").get().then(function(t){t.forEach(function(t){var e=a._.find(a.positions,{id:t.data().position}),o=e?e.jobTitleEnglish:"",n=a._.find(a.officials,{authUser:t.id}),r=n?n.employeeId:"",l=n?n.employeePayType:"",s=a._.find(a.departments,{id:t.data().department}),d=s?s.code:"",c=a._.find(a.branchs,{id:t.data().branch}),u=c?c.code:"";i.push({id:t.id,data:t.data(),name:"".concat(t.data().firstName," ").concat(t.data().lastName),employeeId:r,branch:u,department:d,photo:t.data().photo,jobTitle:o,employeePayType:l,value:t.id,label:"".concat(t.data().firstName," ").concat(t.data().lastName," ").concat(o?"("+o+")":""," ").concat(l)})}),a.authUserOptions=i,e(i)}).catch(function(t){console.log(t)})})}},created:function(){var t=r()(regeneratorRuntime.mark(function t(){var e,a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:e=this,a=[e.getBranchOptions(),e.getPositionOptions(),e.getOffical(),e.getDepartmentOptions()],Promise.all(a).then(function(){e.getAuthUserOptions()});case 3:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()}),s=l,d=a("2877"),c=Object(d["a"])(s,i,o,!1,null,null,null);c.options.__file="authUserWithMoreInfoOptions.vue";e["a"]=c.exports},"455b":function(t,e,a){},"49dc":function(t,e,a){"use strict";var i=a("455b"),o=a.n(i);o.a},7266:function(t,e,a){"use strict";var i,o,n=a("3156"),r=a.n(n),l=a("2f62"),s={methods:{hasPermission:function(t){var e=this._.uniq(this.userPermission),a=this._.intersection(e,t).length;return a}},computed:r()({},Object(l["c"])(["userPermission"]))},d=s,c=a("2877"),u=Object(c["a"])(d,i,o,!1,null,null,null);u.options.__file="hasPermission.vue";e["a"]=u.exports},"929c":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div")},o=[];i._withStripped=!0;a("ac6a");var n={data:function(){return{branchOptions:[]}},created:function(){var t=this;t.$database.collection("branch").orderBy("code").get().then(function(e){e.forEach(function(e){t.branchOptions.push({id:e.id,data:e.data(),value:e.id,label:"".concat(e.data().code," : ").concat(e.data().description)})})})}},r=n,l=a("2877"),s=Object(l["a"])(r,i,o,!1,null,null,null);s.options.__file="branchOptions.vue";e["a"]=s.exports},a9f3e:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("q-page",[i("q-card",[i("q-card-main",[i("q-field",{attrs:{label:t.$t("ID"),"label-width":t.labelWidth}},[i("q-input",{attrs:{disable:""},model:{value:t.inputForm.id,callback:function(e){t.$set(t.inputForm,"id",e)},expression:"inputForm.id"}})],1),i("q-field",{attrs:{label:t.$t("Email"),"label-width":t.labelWidth}},[i("q-input",{attrs:{disable:""},model:{value:t.inputForm.email,callback:function(e){t.$set(t.inputForm,"email",e)},expression:"inputForm.email"}})],1),i("q-field",{attrs:{label:t.$t("Active"),"label-width":t.labelWidth}},[i("q-toggle",{attrs:{disable:!t.hasPermission(["my-account--profile--personal--update"]),"checked-icon":"sentiment very satisfied","unchecked-icon":"sentiment very dissatisfied"},model:{value:t.inputForm.active,callback:function(e){t.$set(t.inputForm,"active",e)},expression:"inputForm.active"}})],1),i("br"),i("br"),i("q-field",{attrs:{label:" ","label-width":t.labelWidth}},[i("blockquote",[i("p",{staticClass:"text-weight-bold"},[t._v(t._s(t.$t("You can either take a selfie or upload a picture")))]),i("div",[t._v(t._s(t.$t("Selfie")))]),i("small",[t._v(t._s(t.$t("Select the camera")))]),i("small",[t._v(t._s(t.$t('Press "Take a picture" button')))]),i("div",[t._v(t._s(t.$t("Upload")))]),i("small",[t._v(t._s(t.$t("Press the Plus sign button(+)")))]),i("small",[t._v(t._s(t.$t("Choose a picture (240 x 320)")))]),i("small",[t._v(t._s(t.$t("Press the Cloud button to upload file")))])])]),i("q-field",{attrs:{label:t.$t("Select Camera"),"label-width":t.labelWidth}},[i("q-select",{attrs:{options:t.cameraOptions},model:{value:t.camera,callback:function(e){t.camera=e},expression:"camera"}})],1),i("br"),i("br"),i("q-field",{attrs:{label:t.$t("Photo"),"label-width":t.labelWidth}},[i("div",{directives:[{name:"show",rawName:"v-show",value:!1===t.cameraState,expression:"cameraState===false"}],staticStyle:{"text-align":"center"}},[t.inputForm.photo?[i("img",{staticClass:"shadow-0",attrs:{src:t.inputForm.photo,width:"320",height:"240"}})]:[i("img",{staticClass:"responsive",attrs:{src:a("44ee"),alt:""}})]],2),i("div",{directives:[{name:"show",rawName:"v-show",value:!0===t.cameraState,expression:"cameraState===true"}],staticStyle:{"text-align":"center"}},[i("video",{staticClass:"shadow-0",attrs:{id:"video",autoplay:"",muted:"",playsInline:"",width:"320",height:"240"},domProps:{muted:!0}}),i("canvas",{staticClass:"hidden",attrs:{id:"canvas"}})]),i("div",{staticStyle:{"text-align":"center"}},[!0===t.cameraState?[i("q-btn",{attrs:{color:"primary",icon:"photo_camera",label:t.$t("Take a photo")},on:{click:t.takePicture}})]:[i("q-btn",{attrs:{color:"brown",icon:"photo_camera",label:t.$t("Take a photo")},on:{click:function(e){t.cameraState=!0}}})]],2)]),i("q-field",{attrs:{label:t.$t("Upload picture"),"label-width":t.labelWidth}},[i("q-uploader",{attrs:{url:"","url-factory":t.uploadPicture}})],1),i("br"),i("br"),i("q-field",{attrs:{label:t.$t("Title"),"label-width":t.labelWidth}},[i("q-input",{attrs:{disable:!t.hasPermission(["my-account--profile--personal--update"])},model:{value:t.inputForm.title,callback:function(e){t.$set(t.inputForm,"title",e)},expression:"inputForm.title"}})],1),i("q-field",{attrs:{label:t.$t("First name")+" *","label-width":t.labelWidth,error:t.$v.inputForm.firstName.$error,"error-label":t.$t("Requires non-empty data")}},[i("q-input",{attrs:{disable:!t.hasPermission(["my-account--profile--personal--update"])},on:{blur:function(e){t.$v.inputForm.firstName.$touch()}},model:{value:t.inputForm.firstName,callback:function(e){t.$set(t.inputForm,"firstName",e)},expression:"inputForm.firstName"}})],1),i("q-field",{attrs:{label:t.$t("Last name")+" *","label-width":t.labelWidth,error:t.$v.inputForm.lastName.$error,"error-label":t.$t("Requires non-empty data")}},[i("q-input",{attrs:{disable:!t.hasPermission(["my-account--profile--personal--update"])},on:{blur:function(e){t.$v.inputForm.lastName.$touch()}},model:{value:t.inputForm.lastName,callback:function(e){t.$set(t.inputForm,"lastName",e)},expression:"inputForm.lastName"}})],1),i("q-field",{attrs:{label:t.$t("Branch")+" *","label-width":t.labelWidth,error:t.$v.inputForm.branch.$error,"error-label":t.$t("Requires non-empty data")}},[i("q-select",{attrs:{disable:!t.hasPermission(["personnel--employee-management--update"]),options:t.branchOptions},on:{blur:function(e){t.$v.inputForm.branch.$touch()}},model:{value:t.inputForm.branch,callback:function(e){t.$set(t.inputForm,"branch",e)},expression:"inputForm.branch"}})],1),i("q-field",{attrs:{label:t.$t("Department")+" *","label-width":t.labelWidth,error:t.$v.inputForm.department.$error,"error-label":t.$t("Requires non-empty data")}},[i("q-select",{attrs:{disable:!t.hasPermission(["personnel--employee-management--update"]),options:t.departmentOptions},on:{blur:function(e){t.$v.inputForm.department.$touch()}},model:{value:t.inputForm.department,callback:function(e){t.$set(t.inputForm,"department",e)},expression:"inputForm.department"}})],1),i("q-field",{attrs:{label:t.$t("Position")+" *","label-width":t.labelWidth,error:t.$v.inputForm.position.$error,"error-label":t.$t("Requires non-empty data")}},[i("q-select",{attrs:{disable:!t.hasPermission(["personnel--employee-management--update"]),options:t.positionOptions},on:{blur:function(e){t.$v.inputForm.position.$touch()}},model:{value:t.inputForm.position,callback:function(e){t.$set(t.inputForm,"position",e)},expression:"inputForm.position"}})],1),i("q-field",{attrs:{label:t.$t("Report to"),"label-width":t.labelWidth,error:t.$v.inputForm.reportTo.$error,"error-label":t.$t("Requires non-empty data")}},[i("q-select",{attrs:{options:t.authUserOptions},on:{blur:function(e){t.$v.inputForm.reportTo.$touch()}},model:{value:t.inputForm.reportTo,callback:function(e){t.$set(t.inputForm,"reportTo",e)},expression:"inputForm.reportTo"}})],1),i("q-field",{attrs:{label:t.$t("ID card")+" *","label-width":t.labelWidth,error:t.$v.inputForm.idCard.$error,"error-label":t.$t("Requires non-empty data")}},[i("q-input",{attrs:{disable:!t.hasPermission(["my-account--profile--personal--update"])},on:{blur:function(e){t.$v.inputForm.idCard.$touch()}},model:{value:t.inputForm.idCard,callback:function(e){t.$set(t.inputForm,"idCard",e)},expression:"inputForm.idCard"}})],1),i("q-field",{attrs:{label:t.$t("Gender"),"label-width":t.labelWidth}},[i("q-option-group",{attrs:{type:"radio",color:"secondary",disable:!t.hasPermission(["my-account--profile--personal--update"]),options:[{label:this.$t("Male"),value:"male"},{label:this.$t("Female"),value:"female"},{label:this.$t("Other"),value:"other"}]},model:{value:t.inputForm.gender,callback:function(e){t.$set(t.inputForm,"gender",e)},expression:"inputForm.gender"}})],1),i("q-field",{attrs:{label:t.$t("Language"),"label-width":t.labelWidth}},[i("q-option-group",{attrs:{type:"radio",color:"primary",disable:!t.hasPermission(["my-account--profile--personal--update"]),options:[{label:this.$t("Thai"),value:"th"},{label:this.$t("English"),value:"en-us"}]},model:{value:t.inputForm.language,callback:function(e){t.$set(t.inputForm,"language",e)},expression:"inputForm.language"}})],1),i("q-field",{attrs:{label:t.$t("Birthday"),"label-width":t.labelWidth}},[i("q-datetime",{attrs:{disable:!t.hasPermission(["my-account--profile--personal--update"]),type:"date"},model:{value:t.inputForm.birthday,callback:function(e){t.$set(t.inputForm,"birthday",e)},expression:"inputForm.birthday"}})],1),i("q-field",{attrs:{label:t.$t("Mobile phone"),"label-width":t.labelWidth}},[i("q-input",{attrs:{disable:!t.hasPermission(["my-account--profile--personal--update"])},model:{value:t.inputForm.mobilePhone,callback:function(e){t.$set(t.inputForm,"mobilePhone",e)},expression:"inputForm.mobilePhone"}})],1),i("q-field",{attrs:{label:t.$t("Address"),"label-width":t.labelWidth}},[i("q-editor",{attrs:{disable:!t.hasPermission(["my-account--profile--personal--update"])},model:{value:t.inputForm.address,callback:function(e){t.$set(t.inputForm,"address",e)},expression:"inputForm.address"}})],1),i("div",{staticClass:"submit"},["update"===t.formAction?i("q-btn",{attrs:{color:"primary",icon:"save","wait-for-ripple":"",disable:t.$v.inputForm.$invalid,label:t.$t("Save")},on:{click:t.updateForm}}):t._e()],1)],1)],1)],1)},o=[];i._withStripped=!0;var n=a("3156"),r=a.n(n),l=(a("ac6a"),a("7f7f"),a("2f62")),s=a("b5ae"),d=a("20d9"),c=a("929c"),u=a("0caf"),p=a("da0d"),m=a("05d8"),h=a("251a"),f=a("7266");a("d093");var b={name:"profile",mixins:[d["a"],c["a"],u["a"],f["a"],p["a"],h["a"],m["a"]],data:function(){return{formAction:null,subMenu:this.$t("Personal"),pagination:{sortBy:"index",descending:!1},columns:[{name:"id",label:this.$t("ID"),field:".key",sortable:!0,align:"left"},{name:"email",label:this.$t("Email"),field:"email",sortable:!0,align:"left"},{name:"firstName",label:this.$t("First name"),field:"firstName",sortable:!0,align:"left"},{name:"lastName",label:this.$t("Last name"),field:"lastName",sortable:!0,align:"left"},{name:"idCard",label:this.$t("Last name"),field:"idCard",sortable:!0,align:"left"},{name:"status",label:this.$t("Status"),field:"active",sortable:!1,align:"left"}],visibleColumns:["email","firstName","lastName","status"],selected:[],filter:"",platform:this.$q.platform.is,width:!0===this.$q.platform.is.mobile?240:320,height:!0===this.$q.platform.is.mobile?320:240,camera:"",cameraState:!1,cameraOptions:[],videoElement:"",canvas:"",inputForm:{".key":"",email:"",active:!1,photo:"",title:"",firstName:"",lastName:"",idCard:"",gender:"",language:"",birthday:new Date,mobilePhone:"",address:"",authGroup:[],branch:"",department:"",position:"",reportTo:""}}},validations:{inputForm:{firstName:{required:s["required"]},lastName:{required:s["required"]},branch:{required:s["required"]},department:{required:s["required"]},position:{required:s["required"]},reportTo:{required:s["required"]},idCard:{required:s["required"]}}},methods:{openUpdateFrom:function(){var t=this;t.formAction="update",t.start(),this.$q.loading.show(),t.$database.collection("authUser").doc(t.$route.params.id).get().then(function(e){t.$q.loading.hide(),t.inputForm={id:e.id,email:e.data().email,active:e.data().active,title:e.data().title,firstName:e.data().firstName,photo:e.data().photo,lastName:e.data().lastName,branch:e.data().branch,department:e.data().department,position:e.data().position,reportTo:e.data().reportTo,idCard:e.data().idCard,gender:e.data().gender,birthday:e.data().birthday||new Date,mobilePhone:e.data().mobilePhone,address:e.data().address||"",language:e.data().language,authGroup:e.data().authGroup}})},uploadPicture:function(t){var e=this,a="profiles/".concat(e.$route.params.id,"/"),i=t.name;e.$storage.ref().child("".concat(a,"/").concat(i)).put(t).then(function(t){e.$q.notify({message:"".concat(e.$t("Uploaded a photo file!")),type:"info",icon:"info"}),t.ref.getDownloadURL().then(function(t){e.inputForm.photo=t,e.$database.collection("authUser").doc(e.$route.params.id).update({photo:t})})})},updateForm:function(){var t=this;t.$database.collection("authUser").doc(t.$route.params.id).update({firstName:t.inputForm.firstName||"",lastName:t.inputForm.lastName||"",branch:t.inputForm.branch||"",department:t.inputForm.department||"",position:t.inputForm.position||"",reportTo:t.inputForm.reportTo||"",language:t.inputForm.language||"",mobilePhone:t.inputForm.mobilePhone||"",address:t.inputForm.address||"",gender:t.inputForm.gender||"",idCard:t.inputForm.idCard||"",birthday:t.inputForm.birthday||"",title:t.inputForm.title||"",modifiedBy:t.userId,modifiedOn:new Date}).then(function(){if(t.$isBase64(t.inputForm.photo)){var e="profiles/".concat(t.$route.params.id,"/"),a="photo",i=".png";t.$storage.ref().child("".concat(e,"/").concat(a).concat(i)).putString(t.inputForm.photo,"data_url").then(function(e){e.ref.getDownloadURL().then(function(e){t.$database.collection("authUser").doc(t.$route.params.id).update({photo:e})})})}t.$q.notify({message:t.$t("Form submitted successfully"),type:"positive",icon:"info"})}).catch(function(e){t.$q.notify(t.$t("Error writing document")),console.error("Error writing document: ",e)})},start:function(){window.stream&&window.stream.getTracks().forEach(function(t){t.stop()});var t=this.camera,e={video:{deviceId:t?{exact:t}:void 0}};navigator.mediaDevices.getUserMedia(e).then(this.gotStream).then(this.gotDevices).catch(function(t){console.log("navigator.getUserMedia error: ",t)})},gotStream:function(t){return this.videoElement=this.$el.querySelector("video"),window.stream=t,this.videoElement.srcObject=t,navigator.mediaDevices.enumerateDevices()},gotDevices:function(t){var e=this,a=1;e.cameraOptions=[],t.forEach(function(t,i){"videoinput"===t.kind&&(e.cameraOptions.push({label:"".concat(e.$t("camera")," ").concat(a," : ").concat(t.label),value:t.deviceId}),a++)})},handleError:function(t){console.log(t)},takePicture:function(t,e){var a=this;a.canvas=a.$el.querySelector("canvas");var i=a.canvas.getContext("2d");a.canvas.width=a.width,a.canvas.height=a.height,i.drawImage(a.videoElement,0,0,a.width,a.height);var o=a.canvas.toDataURL("image/png");a.inputForm.photo=o,a.cameraState=!1}},created:function(){this.$emit("updateSubMenu",this.subMenu),this.openUpdateFrom(),navigator.mediaDevices.enumerateDevices().then(this.gotDevices).catch(this.handleError)},computed:r()({},Object(l["c"])(["userId","userAccount"])),watch:{camera:function(){this.start()}}},v=b,$=(a("49dc"),a("2877")),g=Object($["a"])(v,i,o,!1,null,null,null);g.options.__file="personal.vue";e["default"]=g.exports},da0d:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div")},o=[];i._withStripped=!0;a("ac6a");var n={data:function(){return{positionOptions:[]}},created:function(){var t=this;t.$database.collection("position").get().then(function(e){e.forEach(function(e){t.positionOptions.push({id:e.id,data:e.data(),value:e.id,label:"".concat(e.data().code," : ").concat(e.data().jobTitleEnglish),model:!1})})})}},r=n,l=a("2877"),s=Object(l["a"])(r,i,o,!1,null,null,null);s.options.__file="positionOptions.vue";e["a"]=s.exports}}]);