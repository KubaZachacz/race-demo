(this["webpackJsonprace-demo"]=this["webpackJsonprace-demo"]||[]).push([[0],{17:function(t,e,i){},18:function(t,e,i){},19:function(t,e,i){"use strict";i.r(e);var s=i(0),o=i(1),n=i.n(o),a=i(11),c=i.n(a),l=(i(17),i(5)),r=i(2),h=i(3),u=(i(18),i.p+"static/media/speedway.dfa8e7b3.svg"),d=i(8),j=i(9),m=i(10);function b(t,e){return t=Math.ceil(t),e=Math.floor(e),Math.floor(Math.random()*(e-t+1))+t}var f=["#FF6633","#FFB399","#FF33FF","#FFFF99","#00B3E6","#E6B333","#3366E6","#999966","#99FF99","#B34D4D","#80B300","#809900","#E6B3B3","#6680B3","#66991A","#FF99E6","#CCFF1A","#FF1A66","#E6331A","#33FFCC","#66994D","#B366CC","#4D8000","#B33300","#CC80CC","#66664D","#991AFF","#E666FF","#4DB3FF","#1AB399","#E666B3","#33991A","#CC9999","#B3B31A","#00E680","#4D8066","#809980","#E6FF80","#1AFF33","#999933","#FF3380","#CCCC00","#66E64D","#4D80CC","#9900B3","#E64D66","#4DB380","#FF4D4D","#99E6E6","#6666FF"],v=function(t){var e=new Date(t);e.getUTCHours();return e.getUTCMinutes()+":"+e.getUTCSeconds()+":"+e.getUTCMilliseconds()},y=function(){function t(e,i,s,o){Object(j.a)(this,t),this.id=e,this.name="",this.sprite=i,this.track=s,this.lastTrackPoint={x:null,y:null},this.trackPoint={x:null,y:null},this.position={x:null,y:null},this.rotation=0,this.viewBox=o,this.yOffset=0,this.xOffset=0,this.velocity=0,this.maxVelocity=3,this.acceleration=.05,this.collisionRadius=11,this.isDone=!1,this.isFinish=!1,this.laps=0,this.progress=0,this.isCollision=!1,this.time=0,this.callback=function(){},this.startTime=null}return Object(m.a)(t,[{key:"prepare",value:function(t,e,i,s,o){this.name=t,this.maxVelocity=i,this.acceleration=s,this.callback=o;var n=this.track.getPointAtLength(0);this.trackPoint={x:n.x,y:n.y},this.lastTrackPoint=Object(r.a)({},this.trackPoint),this.yOffset=e.y,this.xOffset=e.x,this.calculatePosition(Math.PI),this.transformPosition()}},{key:"move",value:function(){this.startTime||(this.startTime=new Date);if(this.isCollision?this.velocity=this.velocity-this.acceleration:this.velocity<this.maxVelocity&&(this.velocity=this.velocity+this.acceleration),this.velocity<0&&(this.velocity=0),this.yOffset>=5){var t=this.yOffset-this.velocity/15;if(this.isCollision&&(t=this.yOffset+this.velocity/5),this.rotation>-1||this.rotation<-179){var e=b(30,50);t=this.yOffset+this.velocity/e}t<5&&(t=5),t>120&&(t=120),this.yOffset=t}this.progress=this.progress+this.velocity;var i=this.track.getTotalLength();if(this.progress>i&&(this.progress=0,this.laps=this.laps-1),!this.isFinish&&0===this.laps){this.isFinish=!0;var s=new Date;this.time=s-this.startTime,this.callback(this)}if(0===this.laps&&this.progress>75&&(this.isDone=!0,this.velocity=0,this.transformPosition()),!this.isDone){var o=this.track.getPointAtLength(this.progress);this.trackPoint={x:o.x,y:o.y},this.calculatePosition(),this.lastTrackPoint=Object(r.a)({},this.trackPoint),this.transformPosition()}}},{key:"calculatePosition",value:function(t){var e=this.trackPoint.x-this.lastTrackPoint.x,i=this.trackPoint.y-this.lastTrackPoint.y,s=t||Math.atan2(i,e),o=this.yOffset*Math.sin(Math.PI-s)+this.xOffset*Math.cos(s),n=-this.yOffset*Math.cos(Math.PI-s)-this.xOffset*Math.sin(s);this.rotation=-(180-s*(180/Math.PI)),this.position={x:this.trackPoint.x-o,y:this.trackPoint.y+n}}},{key:"transformPosition",value:function(){var t=this,e=this.viewBox.width/2,i=this.viewBox.height/2,s=this.position.x-e,o=this.position.y-i;this.sprite.style.transform="translate(".concat(s,"px, ").concat(o,"px) rotate(").concat(this.rotation,"deg)");var n=this.sprite.querySelector(".back"),a=0,c=Math.abs(this.rotation+180);c>1&&c<179&&(a=c>20?20:c<-20?-20:c),n.style.transform="rotate(".concat(-a,"deg)"),this.sprite.querySelectorAll(".dust").forEach((function(e){e.style.opacity=t.velocity>0?b(0,3)/10:0}))}}]),t}(),p=function(){function t(e){Object(j.a)(this,t),this.objects=e}return Object(m.a)(t,[{key:"start",value:function(t){var e,i=this,s=Object(d.a)(this.objects);try{for(s.s();!(e=s.n()).done;){var o=e.value;o.laps=t,o.progress=0,o.isDone=!1}}catch(n){s.e(n)}finally{s.f()}setTimeout((function(){requestAnimationFrame((function(){return i.run()}))}),1e3/60)}},{key:"stop",value:function(){}},{key:"run",value:function(){var t=this;if(!this.objects.map((function(t){return t.isDone})).includes(!1))this.onFinish();else{var e=Object(l.a)(this.objects);e.sort((function(t,e){return t.progress-e.progress}));for(var i=0;i<e.length-1;i++){var s=e[i],o=!1;O(s,e[i+1])&&(o=!0),s.isCollision=o}var n,a=Object(d.a)(this.objects);try{for(a.s();!(n=a.n()).done;){n.value.move()}}catch(c){a.e(c)}finally{a.f()}setTimeout((function(){requestAnimationFrame((function(){return t.run()}))}),1e3/60)}}},{key:"onFinish",value:function(){Object(l.a)(this.objects).sort((function(t,e){return t.progress-e.progress})),console.log("done")}}]),t}();function O(t,e){var i=t.position.x-e.position.x,s=t.position.y-e.position.y;return Math.sqrt(i*i+s*s)<t.collisionRadius+e.collisionRadius}var x=function(t){var e=t.disabled,i=t.handlePrepare,n=t.oldPlayer,a=t.lp,c=Object(o.useState)({name:"",helmetColor:"",motorColor:"",maxVelocity:0,acceleration:0}),l=Object(h.a)(c,2),u=l[0],d=l[1],j=function(t){var e=Object(r.a)({},u);e[t.target.name]=t.target.value,d(e)};return Object(o.useEffect)((function(){n&&!u.name?d(n):d(function(t){return{name:"Player_".concat(t),helmetColor:f[b(0,f.length-1)],motorColor:f[b(0,f.length-1)],maxVelocity:b(55,65)/10,acceleration:b(5,7)/100}}(a))}),[n]),Object(s.jsxs)("div",{className:"player-card",children:[Object(s.jsxs)("div",{children:[Object(s.jsx)("label",{htmlFor:"name",children:"Imi\u0119"}),Object(s.jsx)("input",{disabled:e,name:"name",value:null===u||void 0===u?void 0:u.name,onChange:j})]}),Object(s.jsxs)("div",{className:"row",children:[Object(s.jsxs)("div",{className:"",children:[Object(s.jsx)("label",{htmlFor:"helmetColor",children:"Kask"}),Object(s.jsx)("input",{disabled:e,type:"color",id:"helmetColor",name:"helmetColor",value:null===u||void 0===u?void 0:u.helmetColor,onChange:j})]}),Object(s.jsxs)("div",{className:"",children:[Object(s.jsx)("label",{htmlFor:"motorColor",children:"Motocykl"}),Object(s.jsx)("input",{disabled:e,type:"color",id:"motorColor",name:"motorColor",value:null===u||void 0===u?void 0:u.motorColor,onChange:j})]})]}),Object(s.jsxs)("div",{className:"row",children:[Object(s.jsxs)("div",{children:[Object(s.jsx)("label",{htmlFor:"motorColor",children:"Max pr\u0119dko\u015b\u0107"}),Object(s.jsx)("input",{disabled:e,type:"number",min:"1",max:"20",name:"maxVelocity",value:null===u||void 0===u?void 0:u.maxVelocity,onChange:j,step:"0.1"})]}),Object(s.jsxs)("div",{children:[Object(s.jsx)("label",{htmlFor:"motorColor",children:"Przyspieszenie"}),Object(s.jsx)("input",{disabled:e,type:"number",min:"0.01",max:"1",name:"acceleration",value:null===u||void 0===u?void 0:u.acceleration,onChange:j,step:"0.01"})]})]}),!e&&Object(s.jsx)("div",{children:Object(s.jsx)("button",{className:"add-btn",disabled:e,onClick:function(){return i(u)},children:"Dodaj"})})]})};var F=function(){var t=Object(o.useState)([]),e=Object(h.a)(t,2),i=e[0],n=e[1],a=Object(o.useState)(0),c=Object(h.a)(a,2),d=c[0],j=c[1],m=Object(o.useState)([]),b=Object(h.a)(m,2),f=b[0],O=b[1],F=Object(o.useState)(null),C=Object(h.a)(F,2),g=C[0],k=C[1],P=Object(o.useState)(!1),B=Object(h.a)(P,2),D=B[0],w=B[1];Object(o.useEffect)((function(){g&&O([].concat(Object(l.a)(f),[Object(r.a)({},g)]))}),[g]);var E=function(t){k(Object(r.a)({},t))},M=function t(e,i){e>0&&(j(e-1),e-1>0?setTimeout((function(){t(e-1,i)}),1e3):i())},T=D&&f.length===i.length;return Object(s.jsxs)("div",{className:"App",children:[Object(s.jsxs)("div",{className:"row",children:[Object(s.jsxs)("div",{className:"panel",children:[Object(s.jsx)("label",{htmlFor:"laps",children:"Okr\u0105\u017cenia"}),Object(s.jsx)("input",{type:"number",name:"laps",id:"laps",defaultValue:"4",min:"1",max:"10"}),T?Object(s.jsx)("button",{className:"start-btn",onClick:function(){window.location.reload()},children:"Restart"}):Object(s.jsx)("button",{disabled:i.length<1&&D,className:"start-btn",onClick:function(){var t=new p(i),e=document.getElementById("laps").value;j(3),w(!0),setTimeout((function(){M(3,(function(){t.start(e)}))}),1e3)},children:"Start"}),Object(s.jsx)("div",{className:"results",children:f.map((function(t){var e=t.id,i=t.name,o=t.time;return Object(s.jsxs)("p",{children:[i," - ",v(o)]},"result-".concat(e))}))})]}),Object(s.jsxs)("div",{className:"speedway",children:[Object(s.jsx)("object",{id:"source",data:u}),d>0&&Object(s.jsx)("div",{className:"count-down",children:d})]})]}),Object(s.jsxs)("div",{className:"control",children:[Object(s.jsx)("p",{className:"title",children:"Zawodnik"}),Object(s.jsxs)("div",{className:"players-row",children:[i.map((function(t){return Object(s.jsx)(x,{oldPlayer:t,disabled:!0},"card-".concat(t.id))})),!D&&i.length<4&&Object(s.jsx)(x,{lp:i.length+1,disabled:!1,handlePrepare:function(t){var e=document.getElementById("source").contentDocument,s=e.querySelector("svg"),o=e.querySelector("#track path"),a=e.querySelector("#player"),c=s.viewBox.baseVal,r=a.cloneNode(!0);r.id="player_".concat(i.length);var h=t.name,u=t.motorColor,d=t.helmetColor,j=t.acceleration,m=t.maxVelocity;r.querySelectorAll(".motorcycle").forEach((function(t){t.style.fill=u})),r.querySelector(".helmet").style.fill=d,s.appendChild(r);var b=new y(i.length,r,o,c);b.motorColor=u,b.helmetColor=d;var f={x:25,y:10+30*i.length};b.prepare(h,f,parseFloat(m),parseFloat(j),E),n([].concat(Object(l.a)(i),[b]))}},"card-new-".concat(i.length))]})]})]})},C=function(t){t&&t instanceof Function&&i.e(3).then(i.bind(null,20)).then((function(e){var i=e.getCLS,s=e.getFID,o=e.getFCP,n=e.getLCP,a=e.getTTFB;i(t),s(t),o(t),n(t),a(t)}))};c.a.render(Object(s.jsx)(n.a.StrictMode,{children:Object(s.jsx)(F,{})}),document.getElementById("root")),C()}},[[19,1,2]]]);
//# sourceMappingURL=main.bcce8cba.chunk.js.map