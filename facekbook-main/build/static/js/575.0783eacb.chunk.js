"use strict";(self.webpackChunkbackbook=self.webpackChunkbackbook||[]).push([[575],{3575:function(t,e,n){n.r(e);var r=n(1413),o=n(4165),s=n(5861),i=n(885),u=n(2791),a=n(7689),c=n(5361),l=n.n(c),f=n(2388),d=n(184);e.default=function(t){var e=(0,u.useState)([]),n=(0,i.Z)(e,2),c=n[0],h=n[1],p=localStorage.getItem("userStories"),g=(0,u.useState)([]),y=(0,i.Z)(g,2),v=y[0],x=y[1],b=(0,u.useState)(null),S=(0,i.Z)(b,2),k=S[0],m=S[1],Z=(0,u.useState)([]),I=(0,i.Z)(Z,2),j=I[0],C=I[1],w=(0,u.useState)(null),E=(0,i.Z)(w,2),A=(E[0],E[1],p?JSON.parse(p):[]),N=(0,a.s0)(),R=(0,a.UO)().postId,M=function(){console.log("stories ended")};(0,u.useEffect)((function(){var t=function(){var t=(0,s.Z)((0,o.Z)().mark((function t(){var e;return(0,o.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,f.Z.get("https://mata.onrender.com/api/v1/stories/getAllStories");case 2:e=t.sent,h(e.data.stories);case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();t()}),[]),console.log("queuedStories",c),(0,u.useEffect)((function(){var t=c.reduce((function(t,e){var n=e.user._id,r=t.findIndex((function(t){return t.userId===n}));return-1===r?t.push({userId:n,stories:[e]}):t[r].stories.push(e),t}),[]);x(t)}),[c]),console.log("storiesGroupedByUser",v),(0,u.useEffect)((function(){C(Array.from({length:v.length},(function(t,e){return e})))}),[v]),console.log("currentStory",k);var F=(0,u.useState)(null),H=(0,i.Z)(F,2),O=H[0],P=H[1];(0,u.useEffect)((function(){if(k){var t=k.map((function(t){return{url:t.content,header:{heading:t.user.fullName,profileImage:t.user.photo},duration:1500,seeMore:function(t){var e=t.close;return(0,d.jsx)("div",{onClick:e,children:"Hello, click to close this."})}}}));P(t)}}),[k]),console.log("currentStory",k);var U={width:"100%",maxWidth:"100%",maxHeight:"100%",margin:"auto",height:"100%",objectFit:"cover"};return console.log("instaStory",O),(0,d.jsx)(u.Fragment,{children:(0,d.jsxs)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",position:"fixed",top:0,left:0,width:"100%",height:"100%",backgroundColor:"rgba(0, 0, 0, 0.8)"},children:[(0,d.jsx)("div",{style:{position:"absolute",top:"65px",left:"10px",backgroundColor:"#ffffff",borderRadius:"50%",width:"50px",height:"50px",display:"flex",justifyContent:"center",alignItems:"center",cursor:"pointer"},onClick:function(){N("/")},children:(0,d.jsx)("span",{children:"x"})}),(0,d.jsx)("div",{style:{position:"absolute",bottom:"50%",right:"35%",backgroundColor:"#ffffff",borderRadius:"50%",width:"50px",height:"50px",display:"flex",justifyContent:"center",alignItems:"center",cursor:"pointer"},onClick:function(){if(0===j.length)return N("/"),void C(Array.from({length:v.length},(function(t,e){return e})));var t,e;do{e=Math.floor(Math.random()*j.length);var n=j[e];t=v[n]}while(t&&t.stories.length>0&&t.userId===R);t&&t.stories.length>0&&(m(t.stories),C(j.filter((function(t,n){return n!==e}))))},children:(0,d.jsx)("span",{children:">"})}),!O&&(0,d.jsx)(l(),{stories:A.map((function(t){return(0,r.Z)((0,r.Z)({},t),{},{storyStyles:U})})),defaultInterval:1500,width:"calc(80vh * 9 / 16)",height:"80vh",style:{display:"flex",justifyContent:"center",alignItems:"center",background:"transparent",cursor:"pointer",backgroundColor:"white",borderRadius:"30px"},loop:!1,keyboardNavigation:!0,isPaused:function(){},currentIndex:function(){},onStoryStart:function(){},onStoryEnd:function(){},onAllStoriesEnd:M,storyStyles:(0,r.Z)((0,r.Z)({},U),{},{background:"cover"})}),O&&(0,d.jsx)(l(),{stories:O.map((function(t){return(0,r.Z)((0,r.Z)({},t),{},{storyStyles:U})})),defaultInterval:1500,width:"calc(80vh * 9 / 16)",height:"80vh",style:{display:"flex",justifyContent:"center",alignItems:"center",background:"transparent",cursor:"pointer",backgroundColor:"white",borderRadius:"30px"},loop:!1,keyboardNavigation:!0,isPaused:function(){},currentIndex:function(){},onStoryStart:function(){},onStoryEnd:function(){},onAllStoriesEnd:M,storyStyles:(0,r.Z)((0,r.Z)({},U),{},{background:"cover"})})]})})}}}]);
//# sourceMappingURL=575.0783eacb.chunk.js.map