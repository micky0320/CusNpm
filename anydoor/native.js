/**
 * Created by lixiaoxi on 2017/1/22.
 * @description
 */



!function(e,t,n){"use strict";function i(t,n,i,r,o){var p=t;Array.isArray(r)&&(p+="-"+r.join(""));var s=new XMLHttpRequest;s.open("GET",a.MOCK_SERVER+p,!1),s.onreadystatechange=function(){4===s.readyState&&200===s.status&&(o&&o.returnType&&"OBJECT"===o.returnType.toUpperCase()?e[n].call(e,JSON.parse(s.responseText)):e[n].call(e,s.responseText))},s.send(r)}function r(){var e=navigator.userAgent.toUpperCase(),t=this;t.IS_ANDROID=-1!==e.indexOf("ANDROID"),t.IS_IOS=-1!==e.indexOf("IPHONE OS"),t.IS_MOCK=-1!==e.indexOf("MOCK"),t.IS_ANYDOOR=-1!==e.indexOf("ANYDOOR"),t.IS_READY=t.IS_ANYDOOR&&(t.IS_IOS||t.IS_ANDROID)||t.IS_MOCK||!1,t.MOCK_SERVER="http://mock-api.com/rwpDFbk5Zm5Q5E6t.mock/",t.queueList=[]}if(n=n||"App",!e[n]){var a=new r,o=Array.prototype.slice,p=(Object.prototype.toString,0);r.prototype.call=function(n){var r=this;if(!r.IS_READY)return void r.queueList.push(o.call(arguments,0));var s=o.call(arguments,1),c=n[n.length-1];if(r.IS_ANDROID&&r.IS_ANYDOOR)if(e.HostApp){for(var u=[],d=0;d<s.length;d++)if("function"==typeof s[d]){var l=c+"Callback"+p;e[l]=s[d],u.push(l),p++}else"object"==typeof s[d]?u.push(JSON.stringify(s[d])):u.push(s[d]);try{HostApp[c].apply(e.HostApp,u)}catch(f){}}else{var v=o.call(arguments,0);setTimeout(function(){a.call.apply(a,v)},1e3)}else if(r.IS_IOS&&r.IS_ANYDOOR){for(var u="",y=[],d=0;d<s.length;d++)if("function"==typeof s[d]){var l=c+"Callback"+p;e[l]=s[d],y.push(l),p++}else y.push(s[d]);p++;var S=t.createElement("iframe"),O="callnative://"+c+"/"+encodeURIComponent(JSON.stringify(y))+"/"+p;S.src=O,S.style.display="none",t.body.appendChild(S),S.parentNode.removeChild(S),S=null}else if(r.IS_MOCK){for(var u="",y=[],d=0;d<s.length;d++)if("function"==typeof s[d]){var l=c+"Callback"+p;e[l]=s[d],y.push(l),p++}else y.push(s[d]);i(c,y[0],y[1],y[2],y[3])}else{var h=s[2];h instanceof Array&&(c+=h[0]);var I=e.anydoorSDK,g=c+"Callback"+p++;I&&I.setDirective(g,s[0]),I&&I.pushMsg(c,h,g)}},r.prototype.beReady=function(){var e=this;e.IS_READY=!0;for(var t=e.queueList,n=0;n<t.length;n++){var i=t[n];e.call.apply(e,i)}},r.prototype.goBack=function(){this.IS_ANDROID&&HostApp&&HostApp.goBackOrForward?this.call(["goBackOrForward"],function(e){try{e=JSON.parse(e);e.result;return void 0}catch(t){}},function(e){},-1):history.back()},r.prototype.getLatestVersion=function(e,t){if(e===t)return e;for(var n=e.split("."),i=t.split("."),r=n.length>i.length?n.length:i.length,a=0;r>a;a++){var o=parseInt(n[a],10),p=parseInt(i[a],10);if(o>p)return e;if(p>o)return t}return e},r.prototype.postRedirectUrl=function(e,n,i){var r=t.createElement("form"),a=['<input type="hidden" name="SHA1Value" id="SHA1Value" value="'+n.signature+'" />','<input type="hidden" name="signature" id="signature" value="'+n.signature+'" />','<input type="hidden" name="timestamp" id="timestamp" value="'+n.timestamp+'" />','<input type="hidden" name="SSOTicket" id="SSOTicket" value="'+n.SSOTicket+'" />','<input type="hidden" name="deviceId" id="deviceId" value="'+i.deviceId+'" />','<input type="hidden" name="deviceType" id="deviceType" value="'+i.deviceType+'" />','<input type="hidden" name="osVersion" id="osVersion" value="'+i.osVersion+'" />','<input type="hidden" name="anyDoorSdkVersion" id="anyDoorSdkVersion" value="'+i.anyDoorSdkVersion+'" />','<input type="hidden" name="sdkVersion" id="sdkVersion" value="'+i.anyDoorSdkVersion+'" />','<input type="hidden" name="appVersion" id="appVersion" value="'+i.appVersion+'" />','<input type="hidden" name="appId" id="appId" value="'+i.appId+'" />'];r.innerHTML=a.join(""),r.action=e,r.method="POST",r.style.display="none",t.body.appendChild(r),r.submit()},r.prototype.getSSOTicket=function(){var e=$.Deferred(),t=this;return t.call(["sendMessage"],function(t){var n;try{n=JSON.parse(t)}catch(i){n=t}n.SSOTicket?e.resolve(n):e.reject({})},function(t){e.reject(t)},["getSSOTicket"]),e},r.prototype.getDeviceInfo=function(){var e=$.Deferred(),t=this;return t.deviceInfo?(setTimeout(function(){e.resolve(t.deviceInfo)},16),e):(t.call(["sendMessage"],function(n){var i;try{i=JSON.parse(n)}catch(r){i=n}t.deviceInfo=i,e.resolve(i)},function(t){e.reject(t)},["getDeviceInfo"]),e)},r.prototype.getSSOLogin=function(e){var t=this;t.call(["getSSOLogin"],function(e){},function(e){},{redirectURL:e||""})},e[n]=e.RYMJSBRIDGE=a}}(window,document,"App");