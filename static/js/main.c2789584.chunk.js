(this["webpackJsonprace-demo"]=this["webpackJsonprace-demo"]||[]).push([[0],{17:function(t,e,i){},18:function(t,e,i){},19:function(t,e,i){"use strict";i.r(e);var s=i(0),o=i(1),n=i.n(o),a=i(11),c=i.n(a),r=(i(17),i(5)),l=i(2),h=i(3),u=(i(18),i.p+"static/media/speedway.69671e8b.svg"),d=i(8),m=i(9),j=i(10);function b(t,e){return t=Math.ceil(t),e=Math.floor(e),Math.floor(Math.random()*(e-t+1))+t}var f,v=["#FF6633","#FFB399","#FF33FF","#FFFF99","#00B3E6","#E6B333","#3366E6","#999966","#99FF99","#B34D4D","#80B300","#809900","#E6B3B3","#6680B3","#66991A","#FF99E6","#CCFF1A","#FF1A66","#E6331A","#33FFCC","#66994D","#B366CC","#4D8000","#B33300","#CC80CC","#66664D","#991AFF","#E666FF","#4DB3FF","#1AB399","#E666B3","#33991A","#CC9999","#B3B31A","#00E680","#4D8066","#809980","#E6FF80","#1AFF33","#999933","#FF3380","#CCCC00","#66E64D","#4D80CC","#9900B3","#E64D66","#4DB380","#FF4D4D","#99E6E6","#6666FF"],y=function(t){var e=new Date(t),i=e.getUTCMinutes(),s=e.getUTCSeconds();return s<10&&(s="0"+s),i+":"+s+":"+e.getUTCMilliseconds()},p=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame;navigator.userAgent.indexOf("Firefox")>-1&&(f="FF");var x=function(){function t(e,i,s,o){Object(m.a)(this,t),this.id=e,this.name="",this.sprite=i,this.track=s,this.lastTrackPoint={x:null,y:null},this.trackPoint={x:null,y:null},this.position={x:null,y:null},this.rotation=0,this.viewBox=o,this.yOffset=0,this.xOffset=0,this.velocity=0,this.maxVelocity=3,this.acceleration=.05,this.collisionRadius=11,this.isDone=!1,this.isFinish=!1,this.laps=0,this.progress=0,this.isCollision=!1,this.time=0,this.callback=function(){},this.startTime=null}return Object(j.a)(t,[{key:"prepare",value:function(t,e,i,s,o){this.name=t,this.maxVelocity=i,this.acceleration=s,this.callback=o;var n=this.track.getPointAtLength(0);if(this.trackPoint={x:n.x,y:n.y},this.lastTrackPoint=Object(l.a)({},this.trackPoint),this.yOffset=e.y,this.xOffset=e.x,"FF"==f){var a=this.sprite.querySelector(".helmet");this.sprite.querySelector(".back").style.transformBox="initial",this.helmet={x:a.getAttribute("cx"),y:a.getAttribute("cy")}}this.calculatePosition(Math.PI),this.transformPosition()}},{key:"move",value:function(){this.startTime||(this.startTime=new Date);if(this.isCollision?this.velocity=this.velocity-this.acceleration:this.velocity<this.maxVelocity&&(this.velocity=this.velocity+this.acceleration),this.velocity<0&&(this.velocity=this.acceleration),this.yOffset>=2.5){var t=this.yOffset-this.velocity/15;if(this.isCollision)(t=this.yOffset+this.velocity/5)>120&&(t=this.yOffset-this.velocity/5);else if(this.rotation>-1||this.rotation<-179){var e=b(35,55);t=this.yOffset+this.velocity/e}t<2.5&&(t=2.5),t>120&&(t=120),this.yOffset=t}this.progress=this.progress+this.velocity;var i=this.track.getTotalLength();if(this.progress>i&&(this.progress=0,this.laps=this.laps-1),!this.isFinish&&0===this.laps){this.isFinish=!0;var s=new Date;this.time=s-this.startTime,this.callback(this)}if(0===this.laps&&this.progress>75&&(this.isDone=!0,this.velocity=0,this.transformPosition()),!this.isDone){var o=this.track.getPointAtLength(this.progress);this.trackPoint={x:o.x,y:o.y},this.calculatePosition(),this.lastTrackPoint=Object(l.a)({},this.trackPoint),this.transformPosition()}}},{key:"calculatePosition",value:function(t){var e=this.trackPoint.x-this.lastTrackPoint.x,i=this.trackPoint.y-this.lastTrackPoint.y,s=t||Math.atan2(i,e),o=this.yOffset*Math.sin(Math.PI-s)+this.xOffset*Math.cos(s),n=-this.yOffset*Math.cos(Math.PI-s)-this.xOffset*Math.sin(s);this.rotation=-(180-s*(180/Math.PI)),this.position={x:this.trackPoint.x-o,y:this.trackPoint.y+n}}},{key:"transformPosition",value:function(){var t=this,e=this.viewBox.width/2,i=this.viewBox.height/2,s=this.position.x-e,o=this.position.y-i;this.sprite.style.transform="translate(".concat(s,"px, ").concat(o,"px) rotate(").concat(this.rotation,"deg)");var n=this.sprite.querySelector(".back"),a=0,c=Math.abs(this.rotation+180);c>1&&c<179&&(a=c>20?20:c<-20?-20:c),"FF"==f&&(n.style.transformBox="initial",n.style.transformOrigin="".concat(this.helmet.x,"px ").concat(this.helmet.y,"px")),n.style.transform="rotate(".concat(-a,"deg)"),this.sprite.querySelectorAll(".dust").forEach((function(e){e.style.opacity=t.velocity>0?b(0,3)/10:0}))}}]),t}(),O=function(){function t(e){Object(m.a)(this,t),this.objects=e}return Object(j.a)(t,[{key:"start",value:function(t){var e,i=this,s=Object(d.a)(this.objects);try{for(s.s();!(e=s.n()).done;){var o=e.value;o.laps=t,o.progress=0,o.isDone=!1}}catch(n){s.e(n)}finally{s.f()}setTimeout((function(){p((function(){return i.run()}))}),1e3/60)}},{key:"stop",value:function(){}},{key:"run",value:function(){var t=this;if(!this.objects.map((function(t){return t.isDone})).includes(!1))this.onFinish();else{var e=Object(r.a)(this.objects);e.sort((function(t,e){return t.progress-e.progress}));for(var i=0;i<e.length-1;i++){var s=e[i],o=!1;F(s,e[i+1])&&(o=!0),s.isCollision=o}var n,a=Object(d.a)(this.objects);try{for(a.s();!(n=a.n()).done;){n.value.move()}}catch(c){a.e(c)}finally{a.f()}setTimeout((function(){p((function(){return t.run()}))}),1e3/60)}}},{key:"onFinish",value:function(){Object(r.a)(this.objects).sort((function(t,e){return t.progress-e.progress})),console.log("done")}}]),t}();function F(t,e){var i=t.position.x-e.position.x,s=t.position.y-e.position.y;return Math.sqrt(i*i+s*s)<t.collisionRadius+e.collisionRadius}var g=function(t){var e=t.disabled,i=t.handlePrepare,n=t.oldPlayer,a=t.lp,c=Object(o.useState)({name:"",helmetColor:"",motorColor:"",maxVelocity:0,acceleration:0}),r=Object(h.a)(c,2),u=r[0],d=r[1],m=function(t){var e=Object(l.a)({},u);e[t.target.name]=t.target.value,d(e)};return Object(o.useEffect)((function(){n&&!u.name?d(n):d(function(t){return{name:"Player_".concat(t),helmetColor:v[b(0,v.length-1)],motorColor:v[b(0,v.length-1)],maxVelocity:b(55,65)/10,acceleration:b(5,7)/100}}(a))}),[n]),Object(s.jsxs)("div",{className:"player-card",children:[Object(s.jsxs)("div",{children:[Object(s.jsx)("label",{htmlFor:"name",children:"Imi\u0119"}),Object(s.jsx)("input",{disabled:e,name:"name",value:null===u||void 0===u?void 0:u.name,onChange:m})]}),Object(s.jsxs)("div",{className:"row",children:[Object(s.jsxs)("div",{className:"",children:[Object(s.jsx)("label",{htmlFor:"helmetColor",children:"Kask"}),Object(s.jsx)("input",{disabled:e,type:"color",id:"helmetColor",name:"helmetColor",value:null===u||void 0===u?void 0:u.helmetColor,onChange:m})]}),Object(s.jsxs)("div",{className:"",children:[Object(s.jsx)("label",{htmlFor:"motorColor",children:"Motocykl"}),Object(s.jsx)("input",{disabled:e,type:"color",id:"motorColor",name:"motorColor",value:null===u||void 0===u?void 0:u.motorColor,onChange:m})]})]}),Object(s.jsxs)("div",{className:"row",children:[Object(s.jsxs)("div",{children:[Object(s.jsx)("label",{htmlFor:"motorColor",children:"Max pr\u0119dko\u015b\u0107"}),Object(s.jsx)("input",{disabled:e,type:"number",min:"1",max:"20",name:"maxVelocity",value:null===u||void 0===u?void 0:u.maxVelocity,onChange:m,step:"0.1"})]}),Object(s.jsxs)("div",{children:[Object(s.jsx)("label",{htmlFor:"motorColor",children:"Przyspieszenie"}),Object(s.jsx)("input",{disabled:e,type:"number",min:"0.01",max:"1",name:"acceleration",value:null===u||void 0===u?void 0:u.acceleration,onChange:m,step:"0.01"})]})]}),!e&&Object(s.jsx)("div",{children:Object(s.jsx)("button",{className:"add-btn",disabled:e,onClick:function(){return i(u)},children:"Dodaj"})})]})};var C=function(){var t=Object(o.useState)([]),e=Object(h.a)(t,2),i=e[0],n=e[1],a=Object(o.useState)(0),c=Object(h.a)(a,2),d=c[0],m=c[1],j=Object(o.useState)([]),b=Object(h.a)(j,2),f=b[0],v=b[1],p=Object(o.useState)(null),F=Object(h.a)(p,2),C=F[0],k=F[1],P=Object(o.useState)(!1),w=Object(h.a)(P,2),B=w[0],D=w[1];Object(o.useEffect)((function(){C&&v([].concat(Object(r.a)(f),[Object(l.a)({},C)]))}),[C]);var A=function(t){k(Object(l.a)({},t))},E=function t(e,i){e>0&&(m(e-1),e-1>0?setTimeout((function(){t(e-1,i)}),1e3):i())},M=B&&f.length===i.length;return Object(s.jsxs)("div",{className:"App",children:[Object(s.jsxs)("div",{className:"row",children:[Object(s.jsxs)("div",{className:"panel",children:[Object(s.jsx)("label",{htmlFor:"laps",children:"Okr\u0105\u017cenia"}),Object(s.jsx)("input",{type:"number",name:"laps",id:"laps",defaultValue:"4",min:"1",max:"10"}),M?Object(s.jsx)("button",{className:"start-btn",onClick:function(){window.location.reload()},children:"Restart"}):Object(s.jsx)("button",{disabled:i.length<1||B,className:"start-btn",onClick:function(){var t=new O(i),e=document.getElementById("laps").value;m(3),D(!0),setTimeout((function(){E(3,(function(){t.start(e)}))}),1e3)},children:"Start"}),Object(s.jsx)("div",{className:"results",children:f.map((function(t){var e=t.id,i=t.name,o=t.time;return Object(s.jsxs)("p",{children:[i," - ",y(o)]},"result-".concat(e))}))})]}),Object(s.jsxs)("div",{className:"speedway",children:[Object(s.jsx)("object",{id:"source",data:u}),d>0&&Object(s.jsx)("div",{className:"count-down",children:d})]})]}),Object(s.jsxs)("div",{className:"control",children:[Object(s.jsx)("p",{className:"title",children:"Zawodnik"}),Object(s.jsxs)("div",{className:"players-row",children:[i.map((function(t){return Object(s.jsx)(g,{oldPlayer:t,disabled:!0},"card-".concat(t.id))})),!B&&i.length<4&&Object(s.jsx)(g,{lp:i.length+1,disabled:!1,handlePrepare:function(t){var e=document.getElementById("source").contentDocument,s=e.querySelector("svg"),o=e.querySelector("#track path"),a=e.querySelector("#player"),c=s.viewBox.baseVal,l=a.cloneNode(!0);l.id="player_".concat(i.length);var h=t.name,u=t.motorColor,d=t.helmetColor,m=t.acceleration,j=t.maxVelocity;l.querySelectorAll(".motorcycle").forEach((function(t){t.style.fill=u})),l.querySelector(".helmet").style.fill=d,s.appendChild(l);var b=new x(i.length,l,o,c);b.motorColor=u,b.helmetColor=d;var f={x:25,y:10+30*i.length};b.prepare(h,f,parseFloat(j),parseFloat(m),A),n([].concat(Object(r.a)(i),[b]))}},"card-new-".concat(i.length))]})]})]})},k=function(t){t&&t instanceof Function&&i.e(3).then(i.bind(null,20)).then((function(e){var i=e.getCLS,s=e.getFID,o=e.getFCP,n=e.getLCP,a=e.getTTFB;i(t),s(t),o(t),n(t),a(t)}))};c.a.render(Object(s.jsx)(n.a.StrictMode,{children:Object(s.jsx)(C,{})}),document.getElementById("root")),k()}},[[19,1,2]]]);
//# sourceMappingURL=main.c2789584.chunk.js.map