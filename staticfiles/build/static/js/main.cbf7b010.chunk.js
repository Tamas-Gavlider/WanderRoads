(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{105:function(e,a,t){"use strict";t.r(a);var n=t(0),l=t.n(n),r=t(32),c=t.n(r),o=(t(88),t(13)),s=t.n(o),m=t(14),i=t(9),u=t(111);u.a.defaults.baseURL="/api",u.a.defaults.headers.post["Content-Type"]="multipart/form-data",u.a.defaults.withCredentials=!0;const d=u.a.create(),p=u.a.create();var E=t(10),g=t(20),v=t.n(g),f=t(17),h=t.n(f),y=t(71),b=t.n(y),N=t(21),C=t(12),A=t(6),_=t(25),w=t(24),j=t(35);const O=e=>{const a=Object(i.useHistory)();Object(n.useEffect)(()=>{(async()=>{try{await u.a.post("/dj-rest-auth/token/refresh/"),"loggedIn"===e&&a.push("/")}catch(t){"loggedOut"===e&&a.push("/")}})()},[a,e])};var k=()=>{var e,a,t,r;O("loggedIn");const[c,o]=Object(n.useState)({username:"",password1:"",password2:""}),{username:d,password1:p,password2:g}=c,[f,y]=Object(n.useState)({}),k=Object(i.useHistory)(),x=e=>{o({...c,[e.target.name]:e.target.value})};return l.a.createElement(m.a,{className:v.a.Container,fluid:!0},l.a.createElement(N.a,{className:v.a.Row},l.a.createElement(C.a,{className:"my-auto py-2 p-md-2 d-flex align-items-center",md:6},l.a.createElement(m.a,{className:`${s.a.Content} p-4 `},l.a.createElement("h1",{className:v.a.Header},"sign up"),l.a.createElement(A.a,{onSubmit:async e=>{e.preventDefault();try{await u.a.post("/dj-rest-auth/registration/",c),k.push("/signin")}catch(t){var a;y(null===(a=t.response)||void 0===a?void 0:a.data)}}},l.a.createElement(A.a.Group,{controlId:"username",as:N.a,className:"mb-3"},l.a.createElement(A.a.Label,{className:"d-none"},"username"),l.a.createElement(A.a.Control,{className:v.a.Input,type:"text",placeholder:"Username",name:"username",value:d,onChange:x})),null===(e=f.username)||void 0===e?void 0:e.map((e,a)=>l.a.createElement(_.a,{variant:"warning",key:a},e)),l.a.createElement(A.a.Group,{controlId:"password1",as:N.a,className:"mb-3"},l.a.createElement(A.a.Label,{className:"d-none"},"Password"),l.a.createElement(A.a.Control,{className:v.a.Input,type:"password",placeholder:"Password",name:"password1",value:p,onChange:x})),null===(a=f.password1)||void 0===a?void 0:a.map((e,a)=>l.a.createElement(_.a,{key:a,variant:"warning"},e)),l.a.createElement(A.a.Group,{controlId:"password2",as:N.a,className:"mb-3"},l.a.createElement(A.a.Label,{className:"d-none"},"Confirm password"),l.a.createElement(A.a.Control,{className:v.a.Input,type:"password",placeholder:"Confirm password",name:"password2",value:g,onChange:x})),null===(t=f.password2)||void 0===t?void 0:t.map((e,a)=>l.a.createElement(_.a,{key:a,variant:"warning"},e)),l.a.createElement(w.a,{className:`${h.a.Button} ${h.a.Wide}`,type:"submit"},"Sign up"),null===(r=f.non_field_errors)||void 0===r?void 0:r.map((e,a)=>l.a.createElement(_.a,{key:a,variant:"warning",className:"mt-3"},e))))),l.a.createElement(C.a,{md:6,className:"d-none d-md-flex align-items-center justify-content-center"},l.a.createElement(j.a,{className:s.a.FillerImageRegister,src:b.a,fluid:!0})),l.a.createElement(m.a,{className:"mt-3"},l.a.createElement(E.b,{className:`${v.a.Link} ${v.a.SignInLink}`,to:"/signin"},"Already have an account? ",l.a.createElement("span",null,"Sign in")))))},x=t(74);const L=async(e,a)=>{try{const{data:n}=await d.get(e.next);a(e=>({...e,next:n.next,results:n.results.reduce((e,a)=>e.some(e=>e.id===a.id)?e:[...e,a],e.results)}))}catch(t){}},S=e=>{const a=Object(x.a)(null===e||void 0===e?void 0:e.access).exp;localStorage.setItem("refreshTokenTimestamp",a)},B=()=>{localStorage.removeItem("refreshTokenTimestamp")},I=Object(n.createContext)(),P=Object(n.createContext)(),F=()=>Object(n.useContext)(I),T=()=>Object(n.useContext)(P),U=e=>{let{children:a}=e;const[t,r]=Object(n.useState)(null),c=Object(i.useHistory)();return Object(n.useEffect)(()=>{(async()=>{try{const{data:a}=await p.get("/dj-rest-auth/user/");r(a)}catch(e){console.log(e)}})()},[]),Object(n.useMemo)(()=>{d.interceptors.request.use(async e=>{if(localStorage.getItem("refreshTokenTimestamp"))try{await u.a.post("/dj-rest-auth/token/refresh/")}catch(a){return r(e=>(e&&c.push("/signin"),null)),B(),e}return e},e=>Promise.reject(e)),p.interceptors.response.use(e=>e,async e=>{var a;if(401===(null===(a=e.response)||void 0===a?void 0:a.status)){try{await u.a.post("/dj-rest-auth/token/refresh/")}catch(e){r(e=>(e&&c.push("/signin"),null)),B()}return Object(u.a)(e.config)}return Promise.reject(e)})},[c]),l.a.createElement(I.Provider,{value:t},l.a.createElement(P.Provider,{value:r},a))};var D=t(75),R=t.n(D);var M=function(){var e,a,t;const r=T();O("loggedIn");const[c,o]=Object(n.useState)({username:"",password:""}),{username:d,password:p}=c,[g,f]=Object(n.useState)({}),y=Object(i.useHistory)(),b=e=>{o({...c,[e.target.name]:e.target.value})};return l.a.createElement(m.a,{fluid:!0},l.a.createElement(N.a,{className:v.a.Row},l.a.createElement(C.a,{className:"my-auto p-0 p-md-2",md:6},l.a.createElement(m.a,{className:`${s.a.Content} p-4 `},l.a.createElement("h1",{className:v.a.Header},"sign in"),l.a.createElement(A.a,{onSubmit:async e=>{e.preventDefault();try{const{data:e}=await u.a.post("/dj-rest-auth/login/",c);r(e.user),S(e),y.goBack()}catch(t){var a;f(null===(a=t.response)||void 0===a?void 0:a.data)}}},l.a.createElement(A.a.Group,{controlId:"username",className:"mt-3"},l.a.createElement(A.a.Label,{className:"d-none"},"Username"),l.a.createElement(A.a.Control,{type:"text",placeholder:"Username",name:"username",className:v.a.Input,value:d,onChange:b})),null===(e=g.username)||void 0===e?void 0:e.map((e,a)=>l.a.createElement(_.a,{key:a,variant:"warning"},e)),l.a.createElement(A.a.Group,{controlId:"password",className:"mt-3"},l.a.createElement(A.a.Label,{className:"d-none"},"Password"),l.a.createElement(A.a.Control,{type:"password",placeholder:"Password",name:"password",className:v.a.Input,value:p,onChange:b})),null===(a=g.password)||void 0===a?void 0:a.map((e,a)=>l.a.createElement(_.a,{key:a,variant:"warning"},e)),l.a.createElement(w.a,{className:`${h.a.Button} ${h.a.Wide} mt-3`,type:"submit"},"Sign in"),null===(t=g.non_field_errors)||void 0===t?void 0:t.map((e,a)=>l.a.createElement(_.a,{key:a,variant:"warning",className:"mt-3"},e)))),l.a.createElement(m.a,{className:"mt-3"},l.a.createElement(E.b,{className:v.a.Link,to:"/signup"},"Don't have an account? ",l.a.createElement("span",null,"Sign up now!")))),l.a.createElement(C.a,{md:6,className:`my-auto d-none d-md-block p-2 ${v.a.SignInCol}`},l.a.createElement(j.a,{className:`${s.a.FillerImage}`,src:R.a}))))},G=t(82),H=t(47),Q=t(76),$=t.n(Q),q=t(16),Y=t.n(q);var K=()=>{const[e,a]=Object(n.useState)(!1),t=Object(n.useRef)(null);return Object(n.useEffect)(()=>{const e=e=>{t.current&&!t.current.contains(e.target)&&a(!1)};return document.addEventListener("mouseup",e),()=>{document.removeEventListener("mouseup",e)}},[t]),{expanded:e,setExpanded:a,ref:t}},X=t(77),V=t.n(X);var W=e=>{let{src:a,height:t=45,text:n}=e;return l.a.createElement("span",null,l.a.createElement("img",{className:V.a.Avatar,src:a,height:t,width:t,alt:"avatar"}),n)};var Z=()=>{const e=F(),a=T(),{expanded:t,setExpanded:n,ref:r}=K(),c=l.a.createElement(l.a.Fragment,null,l.a.createElement(E.c,{exact:!0,to:"/map",className:Y.a.NavLink,activeClassName:Y.a.Active},"Map"),l.a.createElement(E.c,{to:"/posts",className:Y.a.NavLink,activeClassName:Y.a.Active},"Posts"),l.a.createElement(E.c,{to:"/travel-buddies",className:Y.a.NavLink,activeClassName:Y.a.Active},"Travel Buddies"),l.a.createElement(E.c,{to:"/",onClick:async()=>{try{await u.a.post("/dj-rest-auth/logout/"),a(null),B()}catch(e){console.log(e)}},className:Y.a.NavLink},"Logout"),l.a.createElement(E.c,{className:Y.a.NavLink,to:`/profiles/${null===e||void 0===e?void 0:e.profile_id}`},"Profile"),l.a.createElement("div",{className:Y.a.Avatar},l.a.createElement("span",{className:Y.a.NavLink},"Logged in as ",null===e||void 0===e?void 0:e.username),l.a.createElement(W,{src:null===e||void 0===e?void 0:e.profile_image,height:45}))),o=l.a.createElement(l.a.Fragment,null,l.a.createElement(E.c,{to:"/signin",className:Y.a.NavLink,activeClassName:Y.a.Active},"Login"),l.a.createElement(E.c,{to:"/signup",className:Y.a.NavLink,activeClassName:Y.a.Active},"Register"));return l.a.createElement(H.a,{expanded:t,expand:"md",className:Y.a.NavBar,fixed:"top"},l.a.createElement(m.a,{fluid:!0},l.a.createElement(E.c,{to:"/"},l.a.createElement(H.a.Brand,null,l.a.createElement("img",{src:$.a,alt:"logo",height:"70"}))),l.a.createElement(H.a.Toggle,{ref:r,onClick:()=>n(!t),"aria-controls":"basic-navbar-nav"}),l.a.createElement(H.a.Collapse,{id:"basic-navbar-nav"},l.a.createElement(G.a,{className:"ms-auto"},e?c:o))))},J=t(61),z=t.n(J);var ee=function(){return l.a.createElement(m.a,null,l.a.createElement(N.a,null,l.a.createElement(C.a,null,l.a.createElement("p",{className:z.a.tagline},"Your Journey")),l.a.createElement(C.a,null),l.a.createElement(C.a,null,l.a.createElement("p",{className:z.a.tagline},"Your Memory"))),l.a.createElement(N.a,null,l.a.createElement(C.a,null),l.a.createElement(C.a,{xs:5},l.a.createElement("p",{className:z.a.tagline},"Your Story")),l.a.createElement(C.a,null)))},ae=t(62);const te="https://unpkg.com/world-atlas@2.0.2/countries-110m.json";function ne(){return l.a.createElement("div",null," ",l.a.createElement(ae.ComposableMap,null,l.a.createElement(ae.Geographies,{geography:te},e=>{let{geographies:a}=e;return a.map(e=>l.a.createElement(ae.Geography,{key:e.rsmKey,geography:e}))})))}var le=t(109),re=t(78),ce=t.n(re);var oe=e=>{let{spinner:a,src:t,message:n}=e;return l.a.createElement("div",{className:`${ce.a.Asset} p-4`},a&&l.a.createElement(le.a,{animation:"border"}),t&&l.a.createElement("img",{src:t,alt:n}),n&&l.a.createElement("p",{className:"mt-4"},n))},se=t(79),me=t.n(se),ie=t(57),ue=t.n(ie);var de=function(){var e,a,t;O("loggedOut");const[r,c]=Object(n.useState)({}),[o,p]=Object(n.useState)({title:"",content:"",image:"",country:""}),{title:E,content:g,image:v,country:f}=o,[y,b]=Object(n.useState)([]),k=Object(n.useRef)(null),x=Object(i.useHistory)();Object(n.useEffect)(()=>{(async()=>{try{const{data:a}=await u.a.get("/countries/");b(a)}catch(e){console.error("Error fetching countries:",e)}})()},[]);const L=e=>{p({...o,[e.target.name]:e.target.value})},S=l.a.createElement("div",{className:"text-center"},l.a.createElement(A.a.Group,null,l.a.createElement(A.a.Label,null,"Title"),l.a.createElement(A.a.Control,{type:"text",name:"title",value:E,onChange:L})),null===r||void 0===r?void 0:null===(e=r.title)||void 0===e?void 0:e.map((e,a)=>l.a.createElement(_.a,{variant:"warning",key:a},e)),l.a.createElement(A.a.Group,null,l.a.createElement(A.a.Label,null,"Content"),l.a.createElement(A.a.Control,{as:"textarea",rows:6,name:"content",value:g,onChange:L})),null===r||void 0===r?void 0:null===(a=r.content)||void 0===a?void 0:a.map((e,a)=>l.a.createElement(_.a,{variant:"warning",key:a},e)),l.a.createElement(A.a.Group,null,l.a.createElement(A.a.Label,null,"Country"),l.a.createElement(A.a.Control,{as:"select",name:"country",value:f,onChange:L,required:!0},l.a.createElement("option",{value:""},"Select a country"),y.map(e=>l.a.createElement("option",{key:e.code,value:e.code},e.name)))),l.a.createElement(w.a,{className:h.a.Button,onClick:()=>x.goBack()},"cancel"),l.a.createElement(w.a,{className:h.a.Button,type:"submit"},"create"));return l.a.createElement(A.a,{onSubmit:async e=>{e.preventDefault();const a=new FormData;a.append("title",E),a.append("content",g),a.append("image",k.current.files[0]),a.append("country",f);try{const{data:e}=await d.post("/posts/",a);console.log({data:e}),x.push(`/posts/${e.id}`)}catch(l){var t,n;console.log(l),401!==(null===(t=l.response)||void 0===t?void 0:t.status)&&c(null===(n=l.response)||void 0===n?void 0:n.data)}}},l.a.createElement(N.a,null,l.a.createElement(C.a,{className:"py-2 p-0 p-md-2",md:7,lg:8},l.a.createElement(m.a,{className:`${s.a.Content} ${ue.a.Container} d-flex flex-column justify-content-center`},l.a.createElement(A.a.Group,{className:"text-center"},v?l.a.createElement(l.a.Fragment,null,l.a.createElement("figure",null,l.a.createElement(j.a,{className:s.a.Image,src:v,rounded:!0})),l.a.createElement("div",null,l.a.createElement(A.a.Label,{className:`${h.a.Button} btn`,htmlFor:"image-upload"},"Change the image"))):l.a.createElement(A.a.Label,{className:"d-flex justify-content-center",htmlFor:"image-upload"},l.a.createElement(oe,{src:me.a,message:"Click or tap to upload an image"})),l.a.createElement(A.a.File,{id:"image-upload",accept:"image/*",onChange:e=>{e.target.files.length&&(URL.revokeObjectURL(v),p({...o,image:URL.createObjectURL(e.target.files[0])}))},ref:k})),null===r||void 0===r?void 0:null===(t=r.image)||void 0===t?void 0:t.map((e,a)=>l.a.createElement(_.a,{variant:"warning",key:a},e)),l.a.createElement("div",{className:"d-md-none"},S))),l.a.createElement(C.a,{md:5,lg:4,className:"d-none d-md-block p-0 p-md-2"},l.a.createElement(m.a,{className:s.a.Content},S))))},pe=t(66),Ee=t.n(pe),ge=t(112),ve=t(110),fe=t(26),he=t(63),ye=t.n(he);const be=l.a.forwardRef((e,a)=>{let{onClick:t}=e;return l.a.createElement("i",{className:"fas fa-ellipsis-v",ref:a,onClick:e=>{e.preventDefault(),t(e)}})}),Ne=e=>{let{handleEdit:a,handleDelete:t}=e;return l.a.createElement(fe.a,{className:"ml-auto",drop:"left"},l.a.createElement(fe.a.Toggle,{as:be}),l.a.createElement(fe.a.Menu,{className:"text-center",popperConfig:{strategy:"fixed"}},l.a.createElement(fe.a.Item,{className:ye.a.DropdownItem,onClick:a,"aria-label":"edit"},l.a.createElement("i",{className:"fas fa-edit"})),l.a.createElement(fe.a.Item,{className:ye.a.DropdownItem,onClick:t,"aria-label":"delete"},l.a.createElement("i",{className:"fas fa-trash-alt"}))))};var Ce=e=>{const{id:a,owner:t,profile_id:n,profile_image:r,comments_count:c,country_name:o,title:s,content:m,image:u,created_at:d}=e,g=F(),v=(null===g||void 0===g?void 0:g.username)===t,f=Object(i.useHistory)();return l.a.createElement(ge.a,{className:Ee.a.Post},l.a.createElement(ge.a.Body,null,l.a.createElement(ve.a,{className:"align-items-center justify-content-between"},l.a.createElement(E.b,{to:`/profiles/${n}`,className:Ee.a.Profile},l.a.createElement(W,{src:r,height:55}),l.a.createElement("span",null,t)),l.a.createElement("div",{className:"d-flex align-items-center"},l.a.createElement("span",null,d," - ",o),v&&l.a.createElement(Ne,{handleEdit:()=>{f.push(`/posts/${a}/edit`)},handleDelete:async()=>{try{await p.delete(`/posts/${a}`),f.goBack()}catch(e){console.log(e)}}})))),l.a.createElement(E.b,{to:`/posts/${a}`},l.a.createElement(ge.a.Img,{src:u,alt:s})),l.a.createElement(ge.a.Body,null,s&&l.a.createElement(ge.a.Title,{className:"text-center"},s),m&&l.a.createElement(ge.a.Text,null,m),l.a.createElement(E.b,{to:`/posts/${a}`},l.a.createElement("i",{className:"far fa-comments"})),c))},Ae=t(41),_e=t.n(Ae);var we=e=>{const{profile_id:a,profile_image:t,owner:r,updated_at:c,content:o,id:s,setPost:m,setComments:i}=e,[u,d]=Object(n.useState)(!1),g=F(),v=(null===g||void 0===g?void 0:g.username)===r;return l.a.createElement(l.a.Fragment,null,l.a.createElement("hr",null),l.a.createElement(ve.a,null,l.a.createElement(E.b,{to:`/profiles/${a}`},l.a.createElement(W,{src:t})),l.a.createElement(ve.a.Body,{className:"align-self-center ml-2"},l.a.createElement("span",{className:_e.a.Owner},r),l.a.createElement("span",{className:_e.a.Date},c),u?l.a.createElement(we,{id:s,profile_id:a,content:o,profileImage:t,setComments:i,setShowEditForm:d}):l.a.createElement("p",null,o)),v&&!u&&l.a.createElement(Ne,{handleEdit:()=>d(!0),handleDelete:async()=>{try{await p.delete(`/comments/${s}/`),m(e=>({results:[{...e.results[0],comments_count:e.results[0].comments_count-1}]})),i(e=>({...e,results:e.results.filter(e=>e.id!==s)}))}catch(e){}}})))};var je=e=>{const{profile_id:a,profile_image:t,owner:r,updated_at:c,content:o,id:s,setPost:m,setComments:i}=e,u=F(),d=(null===u||void 0===u?void 0:u.username)===r,[g,v]=Object(n.useState)(!1);return l.a.createElement(l.a.Fragment,null,l.a.createElement("hr",null),l.a.createElement(ve.a,null,l.a.createElement(E.b,{to:`/profiles/${a}`},l.a.createElement(W,{src:t})),l.a.createElement(ve.a.Body,{className:"align-self-center ml-2"},l.a.createElement("span",{className:_e.a.Owner},r),l.a.createElement("span",{className:_e.a.Date},c),g?l.a.createElement(we,{id:s,profile_id:a,content:o,profileImage:t,setComments:i,setShowEditForm:v}):l.a.createElement("p",null,o)),d&&!g&&l.a.createElement(Ne,{handleEdit:()=>v(!0),handleDelete:async()=>{try{await p.delete(`/comments/${s}`),m(e=>({results:[{...e.results[0],comments_count:e.results[0].comments_count-1}]})),i(e=>({...e,results:e.results.filter(e=>e.id!==s)}))}catch(e){}}})))},Oe=t(81),ke=t(67),xe=t.n(ke);var Le=function(e){const{post:a,setPost:t,setComments:r,profileImage:c,profile_id:o}=e,[s,m]=Object(n.useState)("");return console.log(a),l.a.createElement(A.a,{className:"mt-2",onSubmit:async e=>{e.preventDefault();try{const{data:e}=await p.post("/comments/",{content:s,post:a});r(a=>({...a,results:[e,...a.results]})),t(e=>({results:[{...e.results[0],comments_count:e.results[0].comments_count+1}]})),m("")}catch(n){console.log(n)}}},l.a.createElement(A.a.Group,null,l.a.createElement(Oe.a,null,l.a.createElement(E.b,{to:`/profiles/${o}`},l.a.createElement(W,{src:c})),l.a.createElement(A.a.Control,{className:xe.a.Form,placeholder:"my comment...",as:"textarea",value:s,onChange:e=>{m(e.target.value)},rows:2}))),l.a.createElement("button",{className:`${xe.a.Button} btn d-block ml-auto`,disabled:!s.trim(),type:"submit"},"post"))},Se=t(58);var Be=function(){const{id:e}=Object(i.useParams)(),[a,t]=Object(n.useState)({results:[]}),r=F(),c=null===r||void 0===r?void 0:r.profile_image,[o,u]=Object(n.useState)({results:[]});return Object(n.useEffect)(()=>{(async()=>{try{const[{data:n},{data:l}]=await Promise.all([d.get(`/posts/${e}`),d.get(`/comments/?post=${e}`)]);t({results:[n]}),u(l),console.log(n)}catch(a){console.log(a)}})()},[e]),console.log(c),l.a.createElement(N.a,{className:"h-100"},l.a.createElement(C.a,{className:"py-2 p-0 p-lg-2",lg:8},a.results.length>0?l.a.createElement(Ce,Object.assign({},a.results[0],{setPosts:t})):l.a.createElement(oe,{spinner:!0}),l.a.createElement(m.a,{className:s.a.Content},r?l.a.createElement(Le,{profile_id:r.profile_id,profileImage:c,post:e,setPost:t,setComments:u}):o.results.length?"Comments":null,o.results.length?l.a.createElement(Se.a,{children:o.results.map(e=>l.a.createElement(je,Object.assign({key:e.id},e,{setPost:t,setComments:u}))),dataLength:o.results.length,loader:l.a.createElement(oe,{spinner:!0}),hasMore:!!o.next,next:()=>L(o,u)}):r?l.a.createElement("span",null,"No comments yet, be the first to comment!"):l.a.createElement("span",null,"No comments... yet"))))};var Ie=function(e){let{message:a,filter:t=""}=e;const[r,c]=Object(n.useState)({results:[]}),[o,u]=Object(n.useState)(!1),{pathname:p}=Object(i.useLocation)(),[g,v]=Object(n.useState)("");return Object(n.useEffect)(()=>{u(!1);const e=setTimeout(()=>{(async()=>{try{const{data:a}=await d.get(`/posts/?${t}search=${g}`);c(a),u(!0)}catch(e){console.log(e)}})()},1e3);return()=>{clearTimeout(e)}},[t,g,p]),l.a.createElement(N.a,{className:"h-100"},l.a.createElement(C.a,{className:"py-2 p-0 p-lg-2",lg:8},l.a.createElement(E.b,{className:Y.a.NavLink,activeClassName:Y.a.Active,to:"/posts/create"},"Share your journey!")),l.a.createElement(C.a,{className:"py-2 p-0 p-lg-2",lg:8},l.a.createElement(A.a,{onSubmit:e=>e.preventDefault()},l.a.createElement(A.a.Control,{value:g,onChange:e=>v(e.target.value),type:"text",className:"mr-sm-2",placeholder:"Search posts"})),o?l.a.createElement(l.a.Fragment,null,r.results.length?l.a.createElement(Se.a,{children:r.results.map(e=>l.a.createElement(Ce,Object.assign({key:e.id},e,{setPosts:c}))),dataLength:r.results.length,loader:l.a.createElement(oe,{spinner:!0}),hasMore:!!r.next,next:()=>L(r,c)}):l.a.createElement(m.a,{className:s.a.Content},l.a.createElement("p",null,a," "))):l.a.createElement(m.a,{className:s.a.Content},l.a.createElement(oe,{spinner:!0}))))};var Pe=function(){var e,a,t;const[r,c]=Object(n.useState)({}),[o,p]=Object(n.useState)({title:"",content:"",image:"",country:""}),{title:E,content:g,image:v,country:f}=o,[y,b]=Object(n.useState)([]),O=Object(n.useRef)(null),k=Object(i.useHistory)(),{id:x}=Object(i.useParams)();Object(n.useEffect)(()=>{(async()=>{try{const{data:a}=await d.get(`/post/${x}/`),{title:t,content:n,image:l,country:r,is_owner:c}=a;c?p({title:t,content:n,image:l,country:r}):k.push("/")}catch(e){console.log(e)}})()},[k,x]);const L=e=>{p({...o,[e.target.name]:e.target.value})};Object(n.useEffect)(()=>{(async()=>{try{const{data:a}=await u.a.get("/countries/");b(a)}catch(e){console.error("Error fetching countries:",e)}})()},[]);const S=l.a.createElement("div",{className:"text-center"},l.a.createElement(A.a.Group,null,l.a.createElement(A.a.Label,null,"Title"),l.a.createElement(A.a.Control,{type:"text",name:"title",value:E,onChange:L})),null===r||void 0===r?void 0:null===(e=r.title)||void 0===e?void 0:e.map((e,a)=>l.a.createElement(_.a,{variant:"warning",key:a},e)),l.a.createElement(A.a.Group,null,l.a.createElement(A.a.Label,null,"Content"),l.a.createElement(A.a.Control,{as:"textarea",rows:6,name:"content",value:g,onChange:L})),null===r||void 0===r?void 0:null===(a=r.content)||void 0===a?void 0:a.map((e,a)=>l.a.createElement(_.a,{variant:"warning",key:a},e)),l.a.createElement(A.a.Group,null,l.a.createElement(A.a.Label,null,"Country"),l.a.createElement(A.a.Control,{as:"select",name:"country",value:f,onChange:L,required:!0},l.a.createElement("option",{value:""},"Select a country"),y.map(e=>l.a.createElement("option",{key:e.code,value:e.code},e.name)))),l.a.createElement(w.a,{className:h.a.Button,onClick:()=>k.goBack()},"cancel"),l.a.createElement(w.a,{className:h.a.Button,type:"submit"},"save"));return l.a.createElement(A.a,{onSubmit:async e=>{var a;e.preventDefault();const t=new FormData;t.append("title",E),t.append("content",g),(null===O||void 0===O?void 0:null===(a=O.current)||void 0===a?void 0:a.files[0])&&t.append("image",O.current.files[0]),t.append("country",f);try{await d.put(`/posts/${x}/`,t),k.push(`/posts/${x}`)}catch(r){var n,l;console.log(r),401!==(null===(n=r.response)||void 0===n?void 0:n.status)&&c(null===(l=r.response)||void 0===l?void 0:l.data)}}},l.a.createElement(N.a,null,l.a.createElement(C.a,{className:"py-2 p-0 p-md-2",md:7,lg:8},l.a.createElement(m.a,{className:`${s.a.Content} ${ue.a.Container} d-flex flex-column justify-content-center`},l.a.createElement(A.a.Group,{className:"text-center"},l.a.createElement("figure",null,l.a.createElement(j.a,{className:s.a.Image,src:v,rounded:!0})),l.a.createElement("div",null,l.a.createElement(A.a.Label,{className:`${h.a.Button} ${h.a.Blue} btn`,htmlFor:"image-upload"},"Change the image")),l.a.createElement(A.a.File,{id:"image-upload",accept:"image/*",onChange:e=>{e.target.files.length&&(URL.revokeObjectURL(v),p({...o,image:URL.createObjectURL(e.target.files[0])}))},ref:O})),null===r||void 0===r?void 0:null===(t=r.image)||void 0===t?void 0:t.map((e,a)=>l.a.createElement(_.a,{variant:"warning",key:a},e)),l.a.createElement("div",{className:"d-md-none"},S))),l.a.createElement(C.a,{md:5,lg:4,className:"d-none d-md-block p-0 p-md-2"},l.a.createElement(m.a,{className:s.a.Content},S))))},Fe=t(68),Te=t.n(Fe);function Ue(e){const[a,t]=Object(n.useState)(!0),r=Object(n.useRef)(null);return l.a.createElement("div",null,l.a.createElement("button",{onClick:()=>{r.current&&(a?r.current.play():r.current.pause(),t(!a))}},l.a.createElement("i",{className:`fa-solid ${a?"fa-volume-xmark":"fa-volume-high"}`})),l.a.createElement("audio",{ref:r,src:e.theme_song}))}var De=t(59);function Re(){const{id:e}=Object(De.useParams)(),a=F(),[t,r]=Object(n.useState)(null);null===a||void 0===a||a.username,null===t||void 0===t||t.owner;return Object(n.useEffect)(()=>{u.a.get(`/travel-preference/${e}`).then(e=>{console.log("Travel preferences:",e.data),r(e.data)}).catch(e=>console.error("Error fetching profile:",e))},[e]),l.a.createElement("div",null,t?l.a.createElement("div",null,l.a.createElement("p",null,"Travel preferences"),l.a.createElement("p",null,l.a.createElement("strong",null,"Continent:")," ",t.preferred_continent),l.a.createElement("p",null,l.a.createElement("strong",null,"Climate:")," ",t.climate),l.a.createElement("p",null,l.a.createElement("strong",null,"Activity:")," ",t.activity),l.a.createElement("p",null,l.a.createElement("strong",null,"Budget:")," ",t.budget),l.a.createElement("p",null,l.a.createElement("strong",null,"Travel Style:")," ",t.travel_style),l.a.createElement("p",null,l.a.createElement("strong",null,"Duration:")," ",t.duration),l.a.createElement(De.Link,{to:`/travel-preference/${e}/edit`},"Edit preferences")):l.a.createElement("p",null,"Loading..."))}var Me=()=>{const{id:e}=Object(i.useParams)(),a=F(),[t,r]=Object(n.useState)(null);if(Object(n.useEffect)(()=>{u.a.get(`/profiles/${e}`).then(e=>{console.log("Profile Data:",e.data),r(e.data)}).catch(e=>console.error("Error fetching profile:",e))},[e]),!t)return l.a.createElement("p",null,"Loading profile...");const c=(null===a||void 0===a?void 0:a.username)===t.owner,o=l.a.createElement(l.a.Fragment,null,t.image&&t.theme_song&&l.a.createElement(N.a,null,l.a.createElement(Ue,{theme_song:t.theme_song}),l.a.createElement(C.a,{xs:6,md:4},l.a.createElement(j.a,{src:t.image,alt:`${t.owner}'s profile`,className:Te.a.ProfileImage,thumbnail:!0}))),l.a.createElement("p",null,t.status||"No status set"),l.a.createElement("p",null,l.a.createElement("strong",null,"Username:")," ",t.owner),l.a.createElement("p",null,l.a.createElement("strong",null,"Experience:")," ",t.experience),l.a.createElement("p",null,l.a.createElement("strong",null,"Visited Countries:")," ",t.visited_countries),l.a.createElement("p",null,l.a.createElement("strong",null,"Joined:")," ",new Date(t.created_at).toLocaleDateString()),l.a.createElement(Re,null)),s=l.a.createElement(l.a.Fragment,null,l.a.createElement("h1",null,"Profile of ",t.owner),l.a.createElement("span",null,t.status),l.a.createElement("p",null,l.a.createElement("strong",null,"Joined:")," ",new Date(t.created_at).toLocaleDateString()));return l.a.createElement("div",{className:Te.a.Profile},c?o:s)};function Ge(){const[e,a]=Object(n.useState)({}),[t,r]=Object(n.useState)({preferred_continent:"",climate:"",activity:"",budget:"",travel_style:"",duration:""}),{preferred_continent:c,climate:o,activity:s,budget:m,travel_style:u,duration:p}=t,E=Object(i.useHistory)(),{id:g}=Object(i.useParams)();Object(n.useEffect)(()=>{(async()=>{try{const{data:a}=await d.get(`/travel-preference/${g}`),{preferred_continent:t,climate:n,activity:l,budget:c,travel_style:o,duration:s,owner:m}=a;m?r({preferred_continent:t,climate:n,activity:l,budget:c,travel_style:o,duration:s}):E.push("/")}catch(e){console.log(e)}})()},[E,g]);const v=e=>{r({...t,[e.target.name]:e.target.value})};return l.a.createElement(A.a,{onSubmit:async n=>{n.preventDefault();try{await d.put(`/travel-preference/${g}/`,t),E.push(`/travel-preference/${g}`)}catch(c){var l,r;console.log(c),401!==(null===(l=c.response)||void 0===l?void 0:l.status)&&(a(null===(r=c.response)||void 0===r?void 0:r.data),console.log(e))}},className:"text-center"},l.a.createElement(A.a.Group,null,l.a.createElement(A.a.Label,null,"Preferred Continent"),l.a.createElement(A.a.Control,{as:"select",name:"preferred_continent",value:c,onChange:v},[["ANY","Any Continent"],["AF","Africa"],["NA","North America"],["OC","Oceania"],["AN","Antarctica"],["AS","Asia"],["EU","Europe"],["SA","South America"]].map(e=>{let[a,t]=e;return l.a.createElement("option",{key:a,value:a},t)}))),l.a.createElement(A.a.Group,null,l.a.createElement(A.a.Label,null,"Climate"),l.a.createElement(A.a.Control,{as:"select",name:"climate",value:o,onChange:v},[["ANY","Any"],["HOT","Hot"],["COLD","Cold"],["TROPICAL","Tropical"],["MILD","Mild"]].map(e=>{let[a,t]=e;return l.a.createElement("option",{key:a,value:a},t)}))),l.a.createElement(A.a.Group,null,l.a.createElement(A.a.Label,null,"Activity"),l.a.createElement(A.a.Control,{as:"select",name:"activity",value:s,onChange:v},[["ANY","Any"],["CULTURE","Culture & History"],["NATURE","Nature & Wildlife"],["BEACH","Beaches & Islands"],["ADVENTURE","Adventure & Hiking"],["CITY","City & Nightlife"],["FOOD","Food & Culinary"]].map(e=>{let[a,t]=e;return l.a.createElement("option",{key:a,value:a},t)}))),l.a.createElement(A.a.Group,null,l.a.createElement(A.a.Label,null,"Budget"),l.a.createElement(A.a.Control,{as:"select",name:"budget",value:m,onChange:v},[["ANY","Any"],["LOW","Budget-Friendly"],["MEDIUM","Mid-Range"],["HIGH","Luxury"]].map(e=>{let[a,t]=e;return l.a.createElement("option",{key:a,value:a},t)}))),l.a.createElement(A.a.Group,null,l.a.createElement(A.a.Label,null,"Travel Style"),l.a.createElement(A.a.Control,{as:"select",name:"travel_style",value:u,onChange:v},[["ANY","Any"],["SOLO","Solo Travel"],["FAMILY","Family"],["BACKPACKING","Backpacking"],["LUXURY","Luxury Travel"]].map(e=>{let[a,t]=e;return l.a.createElement("option",{key:a,value:a},t)}))),l.a.createElement(A.a.Group,null,l.a.createElement(A.a.Label,null,"Duration"),l.a.createElement(A.a.Control,{as:"select",name:"duration",value:p,onChange:v},[["ANY","Any"],["WEEKEND","Weekend"],["ONE_WEEK","1 Week"],["TWO_WEEKS","2 Weeks"],["MONTH","1 Month"]].map(e=>{let[a,t]=e;return l.a.createElement("option",{key:a,value:a},t)}))),l.a.createElement(w.a,{className:h.a.Button,onClick:()=>E.goBack()},"Cancel"),l.a.createElement(w.a,{className:h.a.Button,type:"submit"},"Save"))}var He=function(){const e=F(),a=(null===e||void 0===e?void 0:e.profile_id)||"",t="/"===Object(i.useLocation)().pathname;return l.a.createElement("div",{className:`${s.a.App} ${t?s.a.LandingBackground:s.a.NoBackground}`},l.a.createElement(Z,null),l.a.createElement(m.a,{className:s.a.Main},l.a.createElement(i.Switch,null,l.a.createElement(i.Route,{exact:!0,path:"/",render:()=>l.a.createElement(ee,null)}),l.a.createElement(i.Route,{exact:!0,path:"/signin",render:()=>l.a.createElement(M,null)}),l.a.createElement(i.Route,{exact:!0,path:"/signup",render:()=>l.a.createElement(k,null)}),l.a.createElement(i.Route,{exact:!0,path:"/map",render:()=>l.a.createElement(ne,null)}),l.a.createElement(i.Route,{path:"/profiles/:id",render:()=>l.a.createElement(Me,null)}),l.a.createElement(i.Route,{path:"/travel-preference/:id/edit",render:()=>l.a.createElement(Ge,null)}),l.a.createElement(i.Route,{exact:!0,path:"/posts",render:()=>l.a.createElement(Ie,{message:"No results found.",filter:`owner__travel_buddies_initiated__owner__profile=${a}&`})}),l.a.createElement(i.Route,{exact:!0,path:"/posts/create",render:()=>l.a.createElement(de,null)}),l.a.createElement(i.Route,{exact:!0,path:"/posts/:id",render:()=>l.a.createElement(Be,null)}),l.a.createElement(i.Route,{exact:!0,path:"/posts/:id/edit",render:()=>l.a.createElement(Pe,null)}),l.a.createElement(i.Route,{exact:!0,path:"/travel-buddies",render:()=>l.a.createElement("h1",null,"Travel Buddies")}),l.a.createElement(i.Route,{exact:!0,path:"/logout",render:()=>l.a.createElement("h1",null,"Logout")}),l.a.createElement(i.Route,{render:()=>l.a.createElement("p",null,"Page not found!")}))))};var Qe=e=>{e&&e instanceof Function&&t.e(3).then(t.bind(null,113)).then(a=>{let{getCLS:t,getFID:n,getFCP:l,getLCP:r,getTTFB:c}=a;t(e),n(e),l(e),r(e),c(e)})};const $e=Object(n.createContext)(),qe=Object(n.createContext)(),Ye=e=>{let{children:a}=e;const[t,r]=Object(n.useState)({pageProfile:{results:[]}}),c=F();return Object(n.useEffect)(()=>{(async()=>{try{const{data:a}=await d.get("/profiles/?ordering=-posts_count");r(e=>({...e,popularProfiles:a}))}catch(e){console.log(e)}})()},[c]),l.a.createElement($e.Provider,{value:t},l.a.createElement(qe.Provider,{value:{setProfileData:r}},a))};c.a.render(l.a.createElement(E.a,null,l.a.createElement(U,null,l.a.createElement(Ye,null,l.a.createElement(He,null)))),document.getElementById("root")),Qe()},13:function(e,a,t){e.exports={App:"App_App__16ZpL",Main:"App_Main__HQkvd",LandingBackground:"App_LandingBackground__1CuGK",NoBackground:"App_NoBackground__3lGAn",Content:"App_Content__ZaMNr",FillerImage:"App_FillerImage__2ob-g",FillerImageRegister:"App_FillerImageRegister__OPjeC",Image:"App_Image__3UPXw"}},16:function(e,a,t){e.exports={NavBar:"NavBar_NavBar__1amC6",NavLink:"NavBar_NavLink__34ons",Active:"NavBar_Active__3PBZb",Avatar:"NavBar_Avatar__19PBw"}},17:function(e,a,t){e.exports={Button:"Button_Button__27i9m"}},20:function(e,a,t){e.exports={Row:"SignInUpForm_Row__3PbVy",Input:"SignInUpForm_Input__3xaLZ",Header:"SignInUpForm_Header__3joQJ",Link:"SignInUpForm_Link__1BeMm",Container:"SignInUpForm_Container__2cuBp",SignInCol:"SignInUpForm_SignInCol__3ImPK",SignUpCol:"SignInUpForm_SignUpCol__28o4y",SignInLink:"SignInUpForm_SignInLink__IbeFE"}},41:function(e,a,t){e.exports={Owner:"Comment_Owner__3sgYe",Date:"Comment_Date__10qt0"}},57:function(e,a,t){e.exports={Container:"PostCreateEditForm_Container__2WHuV"}},61:function(e,a,t){e.exports={tagline:"LandingPage_tagline__G04hq"}},63:function(e,a,t){e.exports={DropdownItem:"MoreDropdown_DropdownItem__2E4UM",Absolute:"MoreDropdown_Absolute__2RO70"}},66:function(e,a,t){e.exports={Post:"Post_Post__3UScv",Profile:"Post_Profile__3lW0v"}},67:function(e,a,t){e.exports={Form:"CommentCreateEditForm_Form__1Qeyz",Button:"CommentCreateEditForm_Button__sGFSX"}},68:function(e,a,t){e.exports={ProfileImage:"Profile_ProfileImage__33oYu",Profile:"Profile_Profile__3CZgP"}},71:function(e,a,t){e.exports=t.p+"static/media/reg_img.75b23e4b.jpg"},75:function(e,a,t){e.exports=t.p+"static/media/sign_in_img.ed50e9ba.jpg"},76:function(e,a,t){e.exports=t.p+"static/media/logo.d536d1c9.png"},77:function(e,a,t){e.exports={Avatar:"Avatar_Avatar__196lW"}},78:function(e,a,t){e.exports={Asset:"Asset_Asset__1dBcX"}},79:function(e,a){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAUmSURBVHgB7Z1NbxtFGMf/M7Nre3HitElRoLIlDiBFFbdIVKVCKh+AU8sXqNo7Uk+cEOJKvwEfAAV6KhfEASREoyJya0tQg1TJbqUc6qS1E6/3bZixcbp2nZdN7J3d5vlJq/V6d63o+e28O34YToiUkn0KiA3Ant8Ed1oQXQs85GC+AC+z/j5+j+1CIIP4JYTxYy94dVzyEXplBFYEubuIoAqEv6qNMSZxAhgSogNeU3/PuScoRg4KWQ1matjwQw+BY6FbrcL7gbEwye1HFnBBysLMU8yGAQog9mXHgndWYne1xjpHuf5QART441FU1de2i+1HHzLvoOsOFLD8l5zDObwF4ti0XbT/WWKt/c6PFaDr+YtPMU9P/WTY6cBbX0ITYxpsPu4GCv5kKavOytI65sede03A5XVJ9f0U0BLefywro+8PCdANrlvCDIipMGejfOGBHHq4hwSc+RdnQEyVSGA2frwn4FJdOmoEe7oHVSmgq6J4KdgTEDLqbqZFvBT0BHwupaCGNz10KVB9/d4QoCeg0aDgp021gZLe9wR0AhRBpMpiuf/Q9wSwQM3pEaniN/sPPcdXknMbFohUsXWPU7UDfPkz6nqa4opayOLPF0iAKTYasHnFIQGmWFTLtjzgyZcliclQKqgqyKHpB2O4ApyLXeoBmUJN/zAOwhheW5UAEMZQ7S/n7mn/Xo9BSh0qAcYhAYYhAYbhNo0DjKFjTyXAMCTAMCTAMCTAMCTAMLkVEESo+R7u6y3kqCKn5FKADr4M8CMkanqLXNzJq4TcCRgK/oAcS8iVgJHg12On6nmVkBsBo8HnFq4Ozqk11WvIqYRcCBgXfCHQGJy3iqjnVULmBRwW/AF5lZB5AdLHjcOCP+A1CV3cQsbJ/IK8sLASRqiopaPbBwV/gJYQdHEtAm5YEVaQcdjyE/kucorfxTO9t4s4j5xCUxGGIQGGIQGGIQGGIQGGIQGGyZSArZs/3dcbpsS0P/84ZGogJkNZS3hLPcnFx/j8qZPrr6arAdhF5BxqAwxDAgxDAgyTSQHt359VcErIlABmi3t6H9x5eBMTxFdCt7/4pbc2IAV7iAyRqV6QeG/udvC4+XH00r3VvH53Kosp/J25b5EhMlUCKl9eXrVqlevMmvxTymx+z/pg/urZbz75GRki1wsybwLUCzIMCTAMCTAMCTAMCTAM9wMkyvhATA4deyoBhiEBhiEBhuFC4kRpmIjjExQRcNtBBMIYXGxTCTAJ985TN9QUTll1Q63nVAJM0dHjgM4slQBTOD4i3vSpETbFC1X988VNBCCMoDOy8rW7VAWZ4jctAF+ziCbk0qdlw9epDXtTEfY8uiBSZdZVAvD/XNDmDjwQqbJZ6Me8n0XpOyoBadNY7QvYyx3w0d9yIXQonVUadAS6j2qsqV/vTUe3Q7RApMJL5WDwek+ATr0tOtQWTBvd42zE8s0PLchQKZg+gYvt+PGQAF0KLB87IKZCp42WjnH8vbEJfKhBnjzxhjfO2DXhP7/HFrUHk6MX/Cq2xp07MIXVlQdypjUznAGaSEapjPYfb7N929ZDc4jp7M9WCWfoZ+6ToZ96vEB7tM4f5chJ3Kp16dTUGoIXUurbgzhq4Ackz6K3IkX1EgqLnmqkS9Bzeqc6FW6kv1qyC0/P7TSqcPUMZ5L7T57GUEq2vAZLJwXtOBALHMxpQRQKr6osd6T64t1s/oe+Dmb8mEeQhQhRW+8DRKUKoo0Qka1WEfVC1tqyuj5hwEf5D7ZH39OOpDxXAAAAAElFTkSuQmCC"},83:function(e,a,t){e.exports=t(105)},88:function(e,a,t){}},[[83,1,2]]]);
//# sourceMappingURL=main.cbf7b010.chunk.js.map