(this.webpackJsonpgame=this.webpackJsonpgame||[]).push([[0],{28:function(e,t,n){},29:function(e,t,n){},53:function(e,t,n){"use strict";n.r(t);var a=n(2),c=n.n(a),r=n(22),s=n.n(r),i=(n(28),n(11)),l=n(3),o=(n(29),n(55)),j=n(56),u=n(57),b=n(1),d=function(e){var t=e.win,n=Object(a.useState)([]),c=Object(l.a)(n,2),r=c[0],s=c[1];return Object(a.useEffect)((function(){fetch("https://starnavi-frontend-test-task.herokuapp.com/winners").then((function(e){return e.json()})).then((function(e){return s(e)}))}),[r,t]),Object(b.jsxs)("table",{className:"App__Game_right_table",children:[Object(b.jsx)("thead",{children:Object(b.jsxs)("tr",{children:[Object(b.jsx)("th",{children:"User Name"}),Object(b.jsx)("th",{children:"Time and Date"})]})}),Object(b.jsx)("tbody",{children:r&&r.map((function(e){return Object(b.jsxs)("tr",{children:[Object(b.jsx)("td",{children:e.winner}),Object(b.jsx)("td",{children:e.date})]},e.id)}))})]})},h=function(e){var t=e.matrix,n=e.handleClickCell,a=e.myStyle;return Object(b.jsx)("div",{className:"App__Game_left_table",children:t&&t.map((function(e,c){return Object(b.jsx)("div",{children:e.map((function(e,r){return Object(b.jsx)("p",{style:a,onClick:n,className:"color-".concat(t[c][r]),"data-i":c,"data-j":r},"".concat(c,"-").concat(r))}))},c)}))})},f=n(23),O=n.n(f);var m=function(){var e=Object(a.useState)({}),t=Object(l.a)(e,2),n=t[0],c=t[1],r=Object(a.useState)(""),s=Object(l.a)(r,2),f=s[0],m=s[1],p=Object(a.useState)(""),x=Object(l.a)(p,2),g=x[0],v=x[1],_=Object(a.useState)({}),y=Object(l.a)(_,2),A=y[0],S=y[1],N=Object(a.useState)([]),w=Object(l.a)(N,2),k=w[0],M=w[1],C=Object(a.useState)("start"),G=Object(l.a)(C,2),E=G[0],D=G[1],I=Object(a.useState)(13),J=Object(l.a)(I,2),P=J[0],L=J[1],Y=Object(a.useState)(0),B=Object(l.a)(Y,2),F=B[0],H=B[1],T=Object(a.useState)(0),U=Object(l.a)(T,2),W=U[0],q=U[1],z=Object(a.useState)(""),K=Object(l.a)(z,2),Q=K[0],R=K[1],V=Object(a.useState)(0),X=Object(l.a)(V,2),Z=X[0],$=X[1],ee={width:(5===A.field?A.field:10===A.field?"3.5":2.33)+"rem",height:(5===A.field?A.field:10===A.field?"3.5":2.33)+"rem"};Object(a.useEffect)((function(){fetch("https://starnavi-frontend-test-task.herokuapp.com/game-settings").then((function(e){return e.json()})).then((function(e){return c(e)}))}),[]),Object(a.useEffect)((function(){var e=-1,t=-1;if("current"===E){var a=setInterval((function(){var a,c;console.log(e,t),-1!==e&&-1!==t&&1===k[e][t]&&(k[e][t]=3,M(Object(i.a)(k)),q((function(e){return e+1})));do{a=Math.floor(Math.random()*n[f].field),c=Math.floor(Math.random()*n[f].field)}while(0!==k[a][c]);e=a,t=c,k[a][c]=1,M(Object(i.a)(k))}),n[f].delay);$(a),D("inProgress")}}),[E]);var te=function(){var e=new Date,t=e.getHours(),n=e.getMinutes(),a=e.getDate(),c=e.getMonth(),r=e.getFullYear();return"".concat(t,":").concat(n,"; ").concat(a," ").concat(["January","February","March","April","May","June","July","August","September","October","November","December"][c]," ").concat(r)};function ne(e){D("finish"),R(e),clearInterval(Z);var t={winner:e,date:te()};O.a.post("https://starnavi-frontend-test-task.herokuapp.com/winners",t).then((function(e){return console.log("res = ",e)})).catch((function(e){return console.error("There was an error!",e)}))}return Object(a.useEffect)((function(){console.log("greenCount = ",F,"redCount = ",W,"playerName = ",g),console.log("maxCount = ",P,"gameCurrentState = ",E),W>=P?ne("Computer"):F>=P&&ne(g)}),[W,F]),Object(b.jsx)("div",{className:"App",children:Object(b.jsxs)(o.a,{fluid:!0,children:[Object(b.jsx)(j.a,{children:Object(b.jsx)(u.a,{children:Object(b.jsx)("h1",{className:"text-center my-3",children:"Game In Dots"})})}),Object(b.jsxs)(j.a,{children:[Object(b.jsxs)(u.a,{lg:"6",md:"12",className:"App__Game_left",children:[Object(b.jsxs)("form",{onSubmit:function(e){e.preventDefault(),""===g.trim()&&v("User"),S(n[f]),M(Array(n[f].field).fill(0).map((function(e){return new Array(n[f].field).fill(0)}))),D("current"),q(0),H(0)},style:{display:"finish"===E||"start"===E?"block":"none"},children:[Object(b.jsx)("label",{children:Object(b.jsxs)("select",{value:f,onChange:function(e){m(e.target.value),L(Math.ceil(Math.pow(n[e.target.value].field,2)/2))},className:"App__Game_left_dropdown",children:[Object(b.jsx)("option",{value:"",children:"Pick game mode"}),Object.entries(n).map((function(e,t){return Object(b.jsx)("option",{value:e[0],children:"easyMode"===e[0]?"Easy":"normalMode"===e[0]?"Normal":"Hard"},t)}))]})}),Object(b.jsx)("label",{children:Object(b.jsx)("input",{type:"text",value:g,onChange:function(e){v(e.target.value.trim())},className:"App__Game_left_name",placeholder:"Enter your name"})}),Object(b.jsx)("input",{type:"submit",disabled:!f,className:"App__Game_left_btn",value:"finish"===E?"PLAY AGAIN":"PLAY"})]}),Object(b.jsx)("h3",{className:"text-center my-3",children:"finish"===E?"Winner ".concat(Q):"Welcome ".concat(g)}),Object(b.jsx)(h,{matrix:k,handleClickCell:function(e){var t=+e.target.getAttribute("data-i"),n=+e.target.getAttribute("data-j");1===k[t][n]&&(k[t][n]=2,M(Object(i.a)(k)),H((function(e){return e+1})))},myStyle:ee})]}),Object(b.jsxs)(u.a,{lg:"6",md:"12",className:"App__Game_right",children:[Object(b.jsx)("h2",{children:"Leader Board"}),Object(b.jsx)(d,{win:Q})]})]})]})})};n(52);s.a.render(Object(b.jsx)(c.a.StrictMode,{children:Object(b.jsx)(m,{})}),document.getElementById("root"))}},[[53,1,2]]]);
//# sourceMappingURL=main.fbd7ce9d.chunk.js.map