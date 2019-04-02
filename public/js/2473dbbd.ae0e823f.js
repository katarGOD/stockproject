(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["2473dbbd"],{2167:function(t,e,a){},"2bbb8":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("q-page",{staticStyle:{"text-align":"center"},attrs:{padding:""}},[t._v("\n  "+t._s(t.$t("Welcome"))+" "+t._s(t.inputForm.firstName)+"\n  "),n("div",{staticClass:"row"},[n("div",{staticClass:"col-lg-4 offset-lg-4"},[n("div",{staticClass:"p10 q-headline"},[t._v("\n        "+t._s(t.$t("Clock"))+"\n      ")]),n("div",[t._v(t._s(t.$t("Select camera")))]),n("div",{staticClass:"p10"},[n("q-select",{attrs:{options:t.cameraOptions},model:{value:t.camera,callback:function(e){t.camera=e},expression:"camera"}})],1),n("div",{directives:[{name:"show",rawName:"v-show",value:!1===t.cameraState,expression:"cameraState===false"}],staticClass:"p10"},[t.inputForm.photo?[n("img",{staticClass:"shadow-5",attrs:{src:t.inputForm.photo,width:"320",height:"240"}})]:[n("img",{staticClass:"responsive",attrs:{src:a("44ee"),alt:""}})]],2),n("div",{directives:[{name:"show",rawName:"v-show",value:!0===t.cameraState,expression:"cameraState===true"}],staticClass:"p10"},[n("video",{staticClass:"shadow-5",attrs:{id:"video",autoplay:"",muted:"",playsInline:"",width:"320",height:"240"},domProps:{muted:!0}}),n("canvas",{staticClass:"hidden",attrs:{id:"canvas"}})]),n("div",{staticClass:"p10"},[n("q-chip",{staticClass:"q-mr-sm",attrs:{detail:"",icon:"access_time"}},[t._v(t._s(t.countIn))]),n("q-chip",{staticClass:"q-mr-sm",attrs:{detail:"",icon:"person_pin_circle"}},[t._v(t._s(t.countLog))]),n("q-chip",{staticClass:"q-mr-sm",attrs:{detail:"",icon:"av_timer"}},[t._v(t._s(t.countOut))]),n("q-chip",{staticClass:"q-mr-sm",attrs:{detail:"",icon:"store"}},[t._v(t._s(t.attendanceStatus))]),n("q-chip",{staticClass:"q-mr-sm",attrs:{detail:"",icon:"autorenew"}},[t._v(t._s(t.workHours))])],1),n("div",{staticClass:"p10"},[t.inputForm.latitude?["out"===t.attendanceStatus?n("q-btn",{staticClass:"q-mr-sm",attrs:{color:"primary",loader:"",icon:"access_time",label:t.$t("in")},on:{click:function(e){t.clickClockIn()}}}):t._e(),"in"===t.attendanceStatus?n("q-btn",{staticClass:"q-mr-sm",attrs:{color:"brown",loader:"",icon:"person_pin_circle",label:t.$t("log")},on:{click:function(e){t.clickClockLog()}}}):t._e(),"in"===t.attendanceStatus?n("q-btn",{staticClass:"q-mr-sm",attrs:{color:"deep-orange",loader:"",icon:"av_timer",label:t.$t("out")},on:{click:function(e){t.clickClockOut()}}}):t._e()]:[n("span",{attrs:{slot:"loading"},slot:"loading"},[n("q-spinner",{staticClass:"on-left"}),t._v("\n            "+t._s(t.$t("GPS"))+" ...\n          ")],1)]],2),n("br"),n("br"),n("q-field",[n("q-input",{attrs:{align:"center",disable:""},model:{value:t.inputForm.email,callback:function(e){t.$set(t.inputForm,"email",e)},expression:"inputForm.email"}})],1),n("div",{staticClass:"row"},[n("div",{staticClass:"col"},[n("q-field",[n("q-input",{attrs:{"float-label":t.$t("First name"),align:"center",disable:""},model:{value:t.inputForm.firstName,callback:function(e){t.$set(t.inputForm,"firstName",e)},expression:"inputForm.firstName"}})],1)],1),n("div",{staticClass:"col"},[n("q-field",[n("q-input",{attrs:{"float-label":t.$t("Last name"),align:"center",disable:""},model:{value:t.inputForm.lastName,callback:function(e){t.$set(t.inputForm,"lastName",e)},expression:"inputForm.lastName"}})],1)],1)]),n("q-field",[n("q-input",{attrs:{align:"center",disable:""},model:{value:t.inputForm.timestamp,callback:function(e){t.$set(t.inputForm,"timestamp",e)},expression:"inputForm.timestamp"}})],1),n("div",{staticClass:"row"},[n("div",{staticClass:"col"},[n("q-field",[n("q-input",{attrs:{"float-label":t.$t("IP"),align:"center",disable:""},model:{value:t.inputForm.ipAddress,callback:function(e){t.$set(t.inputForm,"ipAddress",e)},expression:"inputForm.ipAddress"}})],1)],1),n("div",{staticClass:"col"},[n("q-field",[n("q-input",{attrs:{"float-label":t.$t("Latitude"),align:"center",disable:""},model:{value:t.inputForm.latitude,callback:function(e){t.$set(t.inputForm,"latitude",e)},expression:"inputForm.latitude"}})],1)],1),n("div",{staticClass:"col"},[n("q-field",[n("q-input",{attrs:{"float-label":t.$t("Longitude"),align:"center",disable:""},model:{value:t.inputForm.longitude,callback:function(e){t.$set(t.inputForm,"longitude",e)},expression:"inputForm.longitude"}})],1)],1)]),n("q-field",[n("q-input",{attrs:{"float-label":t.$t("Reference"),align:"center","upper-case":""},model:{value:t.inputForm.taskReferenceTitle,callback:function(e){t.$set(t.inputForm,"taskReferenceTitle",e)},expression:"inputForm.taskReferenceTitle"}},[n("q-autocomplete",{attrs:{debounce:1e3},on:{search:t.searchTasks,selected:t.selectedTask}})],1)],1),n("div",{staticStyle:{"text-align":"center"}},[n("div",{staticStyle:{padding:"20px"}},[t._v(t._s(t.$t("Current location")))]),t.inputForm.mapImage?n("img",{attrs:{src:t.inputForm.mapImage}}):t._e()]),n("div",{staticStyle:{"text-align":"center"}},[n("div",{staticStyle:{padding:"20px"}},[t._v(t._s(t.$t("Note")))]),n("q-editor",{model:{value:t.inputForm.note,callback:function(e){t.$set(t.inputForm,"note",e)},expression:"inputForm.note"}})],1)],1)])])},i=[];n._withStripped=!0;a("96cf");var r=a("c973"),o=a.n(r),s=(a("551c"),a("ac6a"),a("3156")),c=a.n(s),l=a("2f62"),u=a("b5ae"),m=a("f490"),d=a("c1d3"),p=a("05d8"),f=a("251a"),h=a("e135");a("d093");var g={name:"timeClock",mixins:[p["a"],f["a"],h["a"]],data:function(){return{platform:this.$q.platform.is,width:!0===this.$q.platform.is.mobile?240:320,height:!0===this.$q.platform.is.mobile?320:240,camera:null,cameraState:!0,cameraOptions:[],videoElement:null,canvas:null,userInfo:null,countIn:0,countLog:0,countOut:0,attandanceList:[],attendanceStatus:null,clockPeriod:[],mapWidth:320,mapHeight:240,inputForm:{authUser:null,email:null,firstName:null,lastName:null,photo:null,timestamp:null,dayOfYear:null,ipAddress:null,latitude:null,longitude:null,taskReferenceId:null,taskReferenceTitle:null,taskReferenceHelper:null,platform:null,mapImage:null,clockAction:null,note:"",notified:!1}}},validations:{inputForm:{email:{required:u["required"]},photo:{required:u["required"]},timestamp:{required:u["required"]},mapImage:{required:u["required"]},ipAddress:{required:u["required"],ipAddress:u["ipAddress"]},latitude:{required:u["required"]},longitude:{required:u["required"]},clockAction:{required:u["required"]},authUser:{required:u["required"]}}},methods:c()({},Object(l["b"])(["assignAuthState"]),Object(l["d"])(["setAllDrawerClose","setLeftDrawerState"]),{start:function(){window.stream&&window.stream.getTracks().forEach(function(t){t.stop()});var t=this.camera,e={video:{deviceId:t?{exact:t}:void 0}};navigator.mediaDevices.getUserMedia(e).then(this.getStream).then(this.getDevices).catch(function(t){console.log("navigator.getUserMedia error: ",t)})},getStream:function(t){return this.videoElement=this.$el.querySelector("video"),window.stream=t,this.videoElement.srcObject=t,navigator.mediaDevices.enumerateDevices()},getDevices:function(t){var e=this,a=1;e.cameraOptions=[],t.forEach(function(t,n){"videoinput"===t.kind&&(e.cameraOptions.push({label:"".concat(a," : ").concat(t.label),value:t.deviceId}),a++)})},handleError:function(t){console.log(t)},takePicture:function(t,e){var a=this;a.canvas=a.$el.querySelector("canvas");var n=a.canvas.getContext("2d");a.canvas.width=a.width,a.canvas.height=a.height,n.drawImage(a.videoElement,0,0,a.width,a.height);var i=a.canvas.toDataURL("image/png");a.inputForm.photo=i,a.cameraState=!1},getGeoCoords:function(){var t=this;return new Promise(function(e){var a=t;a.$getLocation().then(function(t){return e(t)})})},getGeolocation:function(t){var e=this;return new Promise(function(a){var n=e,i="".concat(t.lat,",").concat(t.lng);n.$axios.get("https://maps.googleapis.com/maps/api/staticmap?center=".concat(i,"&zoom=16&size=").concat(n.mapWidth,"x").concat(n.mapHeight,"&markers=").concat(i,"&sensor=false&key=AIzaSyCbbpeKh34_lDpQWLCbqyApFNW3MSdJbtA")).then(function(t){n.convertImgToBase64(t.config.url,function(t){return a(t)},"png")},function(t){console.log(t),n.$q.notify({message:"".concat(n.$t("error")," : ").concat(t),type:"warning",icon:"warning"})})})},searchTasks:function(t,e){var a=this,n=[];a.inputForm.taskReferenceHelper="",a.$database.collection("tasks").where("title",">","".concat(a.inputForm.taskReferenceTitle)).where("title","<","".concat(a.inputForm.taskReferenceTitle,"Z")).get().then(function(t){t.size?t.forEach(function(t){n.push({id:t.id,label:t.data().title,value:t.data().title})}):a.inputForm.taskReferenceTitleHelper=a.$t("noRecordFound"),e(Object(d["a"])(a.inputForm.taskReferenceTitle,{field:"value",list:n}))})},selectedTask:function(t){var e=this;e.inputForm.taskReferenceId=t.id},getAttendanceStatus:function(){var t=this;t.attandanceList=[],t.countIn=0,t.countOut=0,t.countLog=0,t.clockPeriod=[],t.$database.collection("timeAttendance").where("dayOfYear","==",t.dayOfYear).where("authUser","==",t.userId).orderBy("timestamp","asc").get().then(function(e){e.forEach(function(e){t.attandanceList.push(e.data()),"in"===e.data().clockAction?(t.countIn+=1,t.clockIn=e.data().timestamp):"out"===e.data().clockAction?(t.countOut+=1,t.clockPeriod.push([t.clockIn,e.data().timestamp]),t.clockIn=""):"log"===e.data().clockAction&&(t.countLog+=1)}),t.clockIn&&t.clockPeriod.push([t.clockIn]),t.countIn>t.countOut?t.attendanceStatus="in":t.attendanceStatus="out"})},getIpAddress:function(){var t=this;return new Promise(function(e){var a=t;a.$axios.get("https://api.ipify.org/").then(function(t){return e(t.data)})})},updateCurrentTime:function(){var t=this;t.currentTime=new Date,t.inputForm.timestamp=new Date},formFullfillment:function(){var t=o()(regeneratorRuntime.mark(function t(){var e,a,n,i=arguments;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e=i.length>0&&void 0!==i[0]?i[0]:"",a=this,setInterval(function(){return a.updateCurrentTime()},1e3),t.next=5,a.getIpAddress();case 5:return a.inputForm.ipAddress=t.sent,t.next=8,a.getGeoCoords();case 8:return n=t.sent,console.log(n),a.inputForm.latitude=n.lat,a.inputForm.longitude=n.lng,t.next=14,a.getGeolocation(n);case 14:a.inputForm.mapImage=t.sent,a.inputForm.authUser=a.userId,a.inputForm.email=a.userAccount.email,a.inputForm.firstName=a.userInfo.firstNameEnglish?a.userInfo.firstNameEnglish:a.userInfo.firstName,a.inputForm.lastName=a.userInfo.lastNameEnglish?a.userInfo.lastNameEnglish:a.userInfo.lastName,a.inputForm.dayOfYear=a.dayOfYear,a.inputForm.platform=a.platform,a.inputForm.clockAction=e;case 22:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),clickClockIn:function(){var t=o()(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return console.log("clockin"),e=this,e.takePicture(),e.formFullfillment("in"),e.cameraState=!1,t.next=7,e.simulateDelay(3e3);case 7:e.cameraState=!0,e.addTimeClock(e.inputForm);case 9:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),clickClockOut:function(){var t=o()(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return console.log("clockOut"),e=this,e.takePicture(),e.formFullfillment("out"),e.cameraState=!1,t.next=7,e.simulateDelay(3e3);case 7:e.cameraState=!0,e.addTimeClock(e.inputForm);case 9:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),clickClockLog:function(){var t=o()(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return console.log("clockLog"),e=this,e.takePicture(),e.formFullfillment("log"),e.cameraState=!1,t.next=7,e.simulateDelay(3e3);case 7:e.cameraState=!0,e.addTimeClock(e.inputForm);case 9:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),addTimeClock:function(){var t=this;t.$v.inputForm.$invalid?t.$q.notify({message:t.$t("Form validation error"),type:"nagative",icon:"error_outline"}):(t.$q.loading.show(),t.$database.collection("timeAttendance").add({email:t.inputForm.email,firstName:t.inputForm.firstName,lastName:t.inputForm.lastName,photo:t.inputForm.photo,timestamp:t.inputForm.timestamp,dayOfYear:t.inputForm.dayOfYear,ipAddress:t.inputForm.ipAddress,latitude:t.inputForm.latitude,longitude:t.inputForm.longitude,taskReferenceId:t.inputForm.taskReferenceId,taskReferenceTitle:t.inputForm.taskReferenceTitle,taskReferenceHelper:t.inputForm.taskReferenceHelper,mapImage:t.inputForm.mapImage,clockAction:t.inputForm.clockAction,note:t.inputForm.note,authUser:t.inputForm.authUser,platform:t.inputForm.platform,notified:!1}).then(function(e){t.$q.notify({message:t.$t("Form submitted successfully"),type:"positive",icon:"info"});var a=t.inputForm.firstName,n=t.inputForm.lastName,i=t.inputForm.timestamp,r=t.inputForm.clockAction,o="",s="",c="Clock ".concat(r," : (").concat(a," ").concat(n,") - ").concat(i);t.getAttendanceStatus();var l="TimeAttendance/".concat(m["d"].formatDate(t.inputForm.timestamp,"YYYYMMDD"),"/").concat(e.id,"/"),u=".png";t.$storage.ref().child("".concat(l,"/photo/photo").concat(u)).putString(t.inputForm.photo,"data_url").then(function(a){a.ref.getDownloadURL().then(function(a){t.$database.collection("timeAttendance").doc(e.id).update({photo:a}),o=a,t.$storage.ref().child("".concat(l,"/location/map").concat(u)).putString(t.inputForm.mapImage,"data_url").then(function(a){a.ref.getDownloadURL().then(function(a){t.$database.collection("timeAttendance").doc(e.id).update({mapImage:a}),s=a,t.$database.collection("lineNotify").add({email:t.inputForm.email,firstName:t.inputForm.firstName,lastName:t.inputForm.lastName,timestamp:t.inputForm.timestamp,clockAction:t.inputForm.clockAction,authUser:t.inputForm.authUser,platform:t.inputForm.platform,message:c,image:{fullsize:o,thumbnail:s},notified:!1}),t.$q.loading.hide(),t.$router.push("/")})},function(e){console.log(e),t.$database.collection("lineNotify").add({email:t.inputForm.email,firstName:t.inputForm.firstName,lastName:t.inputForm.lastName,timestamp:t.inputForm.timestamp,clockAction:t.inputForm.clockAction,authUser:t.inputForm.authUser,platform:t.inputForm.platform,message:c,image:{fullsize:o,thumbnail:o}})})})},function(e){console.log(e),t.$database.collection("lineNotify").add({email:t.inputForm.email,firstName:t.inputForm.firstName,lastName:t.inputForm.lastName,timestamp:t.inputForm.timestamp,clockAction:t.inputForm.clockAction,authUser:t.inputForm.authUser,platform:t.inputForm.platform,message:c,image:{}})})}).catch(function(e){console.log(e),t.$q.notify({message:"".concat(t.$t("error")," : ").concat(e),type:"warning",icon:"warning"}),t.$q.loading.hide()}))}}),created:function(){var t=o()(regeneratorRuntime.mark(function t(){var e,a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e=this,e.setAllDrawerClose(),e.setLeftDrawerState(!1),e.getAttendanceStatus(),e.start(),navigator.mediaDevices.enumerateDevices().then(e.getDevices).catch(e.handleError),t.next=8,e.assignAuthState();case 8:return a=t.sent,t.next=11,e.getUserInfo(a);case 11:e.userInfo=t.sent,e.formFullfillment();case 13:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),computed:c()({},Object(l["c"])(["userId","userAccount","leftDrawerState","rightDrawerState"]),{dayOfYear:function(){return parseInt(m["d"].formatDate(new Date,"DDD"))},currentYear:function(){return m["d"].formatDate(this.inputForm.timestamp,"YYYY")},workHours:function(){var t=this,e=0;t.attandanceList.length>0&&t.clockPeriod.length&&t._.forEach(t.clockPeriod,function(a,n){2===a.length?e+=m["d"].getDateDiff(a[1],a[0],"minutes")||0:e+=m["d"].getDateDiff(t.currentTime,a[0],"minutes")||0});var a="".concat((e-e%60)/60,":").concat(e%60);return a}}),watch:{camera:function(){this.start()}}},v=g,F=(a("38ca"),a("2877")),k=Object(F["a"])(v,n,i,!1,null,"d76f1b28",null);k.options.__file="timeClock.vue";e["default"]=k.exports},"38ca":function(t,e,a){"use strict";var n=a("2167"),i=a.n(n);i.a},e135:function(t,e,a){"use strict";a("551c");var n,i,r={data:function(){return{userInfo:{}}},methods:{getUserInfo:function(t){var e=this;return new Promise(function(a){e.$database.collection("authUser").doc(t).get().then(function(t){return t.exists?a(t.data()):a({})})})}}},o=r,s=a("2877"),c=Object(s["a"])(o,n,i,!1,null,null,null);c.options.__file="userInfo.vue";e["a"]=c.exports}}]);