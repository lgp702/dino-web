(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-03fbc86d"],{"48eb":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-form",{ref:"signin",staticClass:"demo-ruleForm",attrs:{model:e.userInfo,rules:e.rules,"label-width":"100px","hide-required-asterisk":!0,"label-position":"left"}},[r("img",{staticStyle:{width:"474px"},attrs:{src:n("692d")}}),r("el-form-item",{attrs:{label:"用户名",prop:"name"}},[r("el-input",{model:{value:e.userInfo.name,callback:function(t){e.$set(e.userInfo,"name",t)},expression:"userInfo.name"}})],1),r("el-form-item",{attrs:{label:"密码",prop:"password"}},[r("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.userInfo.password,callback:function(t){e.$set(e.userInfo,"password",t)},expression:"userInfo.password"}})],1),r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm()}}},[e._v("登录")]),r("el-button",{on:{click:function(t){return e.resetForm()}}},[e._v("重置")]),r("el-button",{on:{click:function(t){return e.signup()}}},[e._v("注册")])],1)},o=[],s=n("cebc"),a=(n("7f7f"),n("e113")),u={data:function(){return{userInfo:{name:"",password:""},rules:{name:[{required:!0,message:"请输入用户名",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}]}}},created:function(){localStorage.clear()},methods:{submitForm:function(){var e=this;this.$refs["signin"].validate(function(t){if(!t)return console.log("error submit!!"),!1;Object(a["b"])(e.userInfo,e).then(function(t){t&&"000000"===t.code?(localStorage.username=e.userInfo.name,e.$router.push({name:"form02",query:Object(s["a"])({},e.$route.query)})):e.$confirm(t.error.exception+"<br />是否跳转到注册页面?","提示",{dangerouslyUseHTMLString:!0,confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){e.$router.push({name:"form01b",query:Object(s["a"])({},e.$route.query)})})}).catch(function(e){console.log(e.message)})})},resetForm:function(){this.$refs["signin"].resetFields()},signup:function(){this.$router.push({name:"form01b",query:Object(s["a"])({},this.$route.query)})}}},i=u,c=n("2877"),l=Object(c["a"])(i,r,o,!1,null,null,null);t["default"]=l.exports},"692d":function(e,t,n){e.exports=n.p+"img/dino.a86c6418.png"},"7f7f":function(e,t,n){var r=n("86cc").f,o=Function.prototype,s=/^\s*function ([^ (]*)/,a="name";a in o||n("9e1e")&&r(o,a,{configurable:!0,get:function(){try{return(""+this).match(s)[1]}catch(e){return""}}})},e113:function(e,t,n){"use strict";n.d(t,"a",function(){return r}),n.d(t,"b",function(){return o}),n.d(t,"c",function(){return s});n("be3b");var r=function(e,t){return axios.post("http://dinoappapp.w2tne5xck3.ap-northeast-1.elasticbeanstalk.com/form02/submit",e).then(function(e){return e.data}).catch(function(e){t.isBtnLoading=!1,console.log(e.message)})},o=function(e){return axios.post("http://dinoappapp.w2tne5xck3.ap-northeast-1.elasticbeanstalk.com/form01/login",e).then(function(e){return e.data}).catch(function(e){console.log(e.message)})},s=function(e){return axios.post("http://dinoappapp.w2tne5xck3.ap-northeast-1.elasticbeanstalk.com/form01/register",e).then(function(e){return e.data}).catch(function(e){console.log(e.message)})}}}]);