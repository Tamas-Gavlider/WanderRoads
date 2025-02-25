(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{103:function(e,a,t){"use strict";t.r(a);var n=t(0),l=t.n(n),r=t(31),s=t.n(r),c=(t(86),t(12)),o=t.n(c),m=t(14),i=t(9),u=t(109);u.a.defaults.baseURL="/api",u.a.defaults.headers.post["Content-Type"]="multipart/form-data",u.a.defaults.withCredentials=!0;const d=u.a.create(),p=u.a.create();var E=t(10),g=t(19),v=t.n(g),f=t(20),h=t.n(f),b=t(68),N=t.n(b),y=t(22),C=t(13),_=t(8),A=t(24),w=t(28),j=t(39);const x=e=>{const a=Object(i.f)();Object(n.useEffect)(()=>{(async()=>{try{await u.a.post("/dj-rest-auth/token/refresh/"),"loggedIn"===e&&a.push("/")}catch(t){"loggedOut"===e&&a.push("/")}})()},[a,e])};var O=()=>{var e,a,t,r;x("loggedIn");const[s,c]=Object(n.useState)({username:"",password1:"",password2:""}),{username:d,password1:p,password2:g}=s,[f,b]=Object(n.useState)({}),O=Object(i.f)(),k=e=>{c({...s,[e.target.name]:e.target.value})};return l.a.createElement(m.a,{className:v.a.Container,fluid:!0},l.a.createElement(y.a,{className:v.a.Row},l.a.createElement(C.a,{className:"my-auto py-2 p-md-2 d-flex align-items-center",md:6},l.a.createElement(m.a,{className:`${o.a.Content} p-4 `},l.a.createElement("h1",{className:v.a.Header},"sign up"),l.a.createElement(_.a,{onSubmit:async e=>{e.preventDefault();try{await u.a.post("/dj-rest-auth/registration/",s),O.push("/signin")}catch(t){var a;b(null===(a=t.response)||void 0===a?void 0:a.data)}}},l.a.createElement(_.a.Group,{controlId:"username",as:y.a,className:"mb-3"},l.a.createElement(_.a.Label,{className:"d-none"},"username"),l.a.createElement(_.a.Control,{className:v.a.Input,type:"text",placeholder:"Username",name:"username",value:d,onChange:k})),null===(e=f.username)||void 0===e?void 0:e.map((e,a)=>l.a.createElement(A.a,{variant:"warning",key:a},e)),l.a.createElement(_.a.Group,{controlId:"password1",as:y.a,className:"mb-3"},l.a.createElement(_.a.Label,{className:"d-none"},"Password"),l.a.createElement(_.a.Control,{className:v.a.Input,type:"password",placeholder:"Password",name:"password1",value:p,onChange:k})),null===(a=f.password1)||void 0===a?void 0:a.map((e,a)=>l.a.createElement(A.a,{key:a,variant:"warning"},e)),l.a.createElement(_.a.Group,{controlId:"password2",as:y.a,className:"mb-3"},l.a.createElement(_.a.Label,{className:"d-none"},"Confirm password"),l.a.createElement(_.a.Control,{className:v.a.Input,type:"password",placeholder:"Confirm password",name:"password2",value:g,onChange:k})),null===(t=f.password2)||void 0===t?void 0:t.map((e,a)=>l.a.createElement(A.a,{key:a,variant:"warning"},e)),l.a.createElement(w.a,{className:`${h.a.Button} ${h.a.Wide}`,type:"submit"},"Sign up"),null===(r=f.non_field_errors)||void 0===r?void 0:r.map((e,a)=>l.a.createElement(A.a,{key:a,variant:"warning",className:"mt-3"},e))))),l.a.createElement(C.a,{md:6,className:"d-none d-md-flex align-items-center justify-content-center"},l.a.createElement(j.a,{className:o.a.FillerImageRegister,src:N.a,fluid:!0})),l.a.createElement(m.a,{className:"mt-3"},l.a.createElement(E.b,{className:`${v.a.Link} ${v.a.SignInLink}`,to:"/signin"},"Already have an account? ",l.a.createElement("span",null,"Sign in")))))},k=t(71);const B=async(e,a)=>{try{const{data:n}=await d.get(e.next);a(e=>({...e,next:n.next,results:n.results.reduce((e,a)=>e.some(e=>e.id===a.id)?e:[...e,a],e.results)}))}catch(t){}},S=e=>{const a=Object(k.a)(null===e||void 0===e?void 0:e.access).exp;localStorage.setItem("refreshTokenTimestamp",a)},L=()=>{localStorage.removeItem("refreshTokenTimestamp")},I=Object(n.createContext)(),F=Object(n.createContext)(),P=()=>Object(n.useContext)(I),T=()=>Object(n.useContext)(F),U=e=>{let{children:a}=e;const[t,r]=Object(n.useState)(null),s=Object(i.f)();return Object(n.useEffect)(()=>{(async()=>{try{const{data:a}=await p.get("/dj-rest-auth/user/");r(a)}catch(e){console.log(e)}})()},[]),Object(n.useMemo)(()=>{d.interceptors.request.use(async e=>{if(localStorage.getItem("refreshTokenTimestamp"))try{await u.a.post("/dj-rest-auth/token/refresh/")}catch(a){return r(e=>(e&&s.push("/signin"),null)),L(),e}return e},e=>Promise.reject(e)),p.interceptors.response.use(e=>e,async e=>{var a;if(401===(null===(a=e.response)||void 0===a?void 0:a.status)){try{await u.a.post("/dj-rest-auth/token/refresh/")}catch(e){r(e=>(e&&s.push("/signin"),null)),L()}return Object(u.a)(e.config)}return Promise.reject(e)})},[s]),l.a.createElement(I.Provider,{value:t},l.a.createElement(F.Provider,{value:r},a))};var D=t(72),M=t.n(D);var G=function(){var e,a,t;const r=T();x("loggedIn");const[s,c]=Object(n.useState)({username:"",password:""}),{username:d,password:p}=s,[g,f]=Object(n.useState)({}),b=Object(i.f)(),N=e=>{c({...s,[e.target.name]:e.target.value})};return l.a.createElement(m.a,{fluid:!0},l.a.createElement(y.a,{className:v.a.Row},l.a.createElement(C.a,{className:"my-auto p-0 p-md-2",md:6},l.a.createElement(m.a,{className:`${o.a.Content} p-4 `},l.a.createElement("h1",{className:v.a.Header},"sign in"),l.a.createElement(_.a,{onSubmit:async e=>{e.preventDefault();try{const{data:e}=await u.a.post("/dj-rest-auth/login/",s);r(e.user),S(e),b.goBack()}catch(t){var a;f(null===(a=t.response)||void 0===a?void 0:a.data)}}},l.a.createElement(_.a.Group,{controlId:"username",className:"mt-3"},l.a.createElement(_.a.Label,{className:"d-none"},"Username"),l.a.createElement(_.a.Control,{type:"text",placeholder:"Username",name:"username",className:v.a.Input,value:d,onChange:N})),null===(e=g.username)||void 0===e?void 0:e.map((e,a)=>l.a.createElement(A.a,{key:a,variant:"warning"},e)),l.a.createElement(_.a.Group,{controlId:"password",className:"mt-3"},l.a.createElement(_.a.Label,{className:"d-none"},"Password"),l.a.createElement(_.a.Control,{type:"password",placeholder:"Password",name:"password",className:v.a.Input,value:p,onChange:N})),null===(a=g.password)||void 0===a?void 0:a.map((e,a)=>l.a.createElement(A.a,{key:a,variant:"warning"},e)),l.a.createElement(w.a,{className:`${h.a.Button} ${h.a.Wide} mt-3`,type:"submit"},"Sign in"),null===(t=g.non_field_errors)||void 0===t?void 0:t.map((e,a)=>l.a.createElement(A.a,{key:a,variant:"warning",className:"mt-3"},e)))),l.a.createElement(m.a,{className:"mt-3"},l.a.createElement(E.b,{className:v.a.Link,to:"/signup"},"Don't have an account? ",l.a.createElement("span",null,"Sign up now!")))),l.a.createElement(C.a,{md:6,className:`my-auto d-none d-md-block p-2 ${v.a.SignInCol}`},l.a.createElement(j.a,{className:`${o.a.FillerImage}`,src:M.a}))))},Q=t(80),R=t(47),q=t(73),$=t.n(q),H=t(16),X=t.n(H);var K=()=>{const[e,a]=Object(n.useState)(!1),t=Object(n.useRef)(null);return Object(n.useEffect)(()=>{const e=e=>{t.current&&!t.current.contains(e.target)&&a(!1)};return document.addEventListener("mouseup",e),()=>{document.removeEventListener("mouseup",e)}},[t]),{expanded:e,setExpanded:a,ref:t}},V=t(74),Y=t.n(V);var Z=e=>{let{src:a,height:t=45,text:n}=e;return l.a.createElement("span",null,l.a.createElement("img",{className:Y.a.Avatar,src:a,height:t,width:t,alt:"avatar"}),n)};var J=()=>{const e=P(),a=T(),{expanded:t,setExpanded:n,ref:r}=K(),s=l.a.createElement(l.a.Fragment,null,l.a.createElement(E.c,{exact:!0,to:"/map",className:X.a.NavLink,activeClassName:X.a.Active},"Map"),l.a.createElement(E.c,{to:"/posts",className:X.a.NavLink,activeClassName:X.a.Active},"Posts"),l.a.createElement(E.c,{to:"/travel-buddies",className:X.a.NavLink,activeClassName:X.a.Active},"Travel Buddies"),l.a.createElement(E.c,{to:"/",onClick:async()=>{try{await u.a.post("/dj-rest-auth/logout/"),a(null),L()}catch(e){console.log(e)}},className:X.a.NavLink},"Logout"),l.a.createElement(E.c,{className:X.a.NavLink,to:`/profiles/${null===e||void 0===e?void 0:e.profile_id}`},"Profile"),l.a.createElement("div",{className:X.a.Avatar},l.a.createElement("span",{className:X.a.NavLink},"Logged in as ",null===e||void 0===e?void 0:e.username),l.a.createElement(Z,{src:null===e||void 0===e?void 0:e.profile_image,height:45}))),c=l.a.createElement(l.a.Fragment,null,l.a.createElement(E.c,{to:"/signin",className:X.a.NavLink,activeClassName:X.a.Active},"Login"),l.a.createElement(E.c,{to:"/signup",className:X.a.NavLink,activeClassName:X.a.Active},"Register"));return l.a.createElement(R.a,{expanded:t,expand:"md",className:X.a.NavBar,fixed:"top"},l.a.createElement(m.a,{fluid:!0},l.a.createElement(E.c,{to:"/"},l.a.createElement(R.a.Brand,null,l.a.createElement("img",{src:$.a,alt:"logo",height:"70"}))),l.a.createElement(R.a.Toggle,{ref:r,onClick:()=>n(!t),"aria-controls":"basic-navbar-nav"}),l.a.createElement(R.a.Collapse,{id:"basic-navbar-nav"},l.a.createElement(Q.a,{className:"ms-auto"},e?s:c))))},W=t(59),z=t.n(W);var ee=function(){return l.a.createElement(m.a,null,l.a.createElement(y.a,null,l.a.createElement(C.a,null,l.a.createElement("p",{className:z.a.tagline},"Your Journey")),l.a.createElement(C.a,null),l.a.createElement(C.a,null,l.a.createElement("p",{className:z.a.tagline},"Your Memory"))),l.a.createElement(y.a,null,l.a.createElement(C.a,null),l.a.createElement(C.a,{xs:5},l.a.createElement("p",{className:z.a.tagline},"Your Story")),l.a.createElement(C.a,null)))},ae=t(60);const te="https://unpkg.com/world-atlas@2.0.2/countries-110m.json";function ne(){return l.a.createElement("div",null," ",l.a.createElement(ae.ComposableMap,null,l.a.createElement(ae.Geographies,{geography:te},e=>{let{geographies:a}=e;return a.map(e=>l.a.createElement(ae.Geography,{key:e.rsmKey,geography:e}))})))}var le=t(107),re=t(75),se=t.n(re);var ce=e=>{let{spinner:a,src:t,message:n}=e;return l.a.createElement("div",{className:`${se.a.Asset} p-4`},a&&l.a.createElement(le.a,{animation:"border"}),t&&l.a.createElement("img",{src:t,alt:n}),n&&l.a.createElement("p",{className:"mt-4"},n))},oe=t(76),me=t.n(oe),ie=t(56),ue=t.n(ie);var de=function(){var e,a,t;x("loggedOut");const[r,s]=Object(n.useState)({}),[c,p]=Object(n.useState)({title:"",content:"",image:"",country:""}),{title:E,content:g,image:v,country:f}=c,[b,N]=Object(n.useState)([]),O=Object(n.useRef)(null),k=Object(i.f)();Object(n.useEffect)(()=>{(async()=>{try{const{data:a}=await u.a.get("/countries/");N(a)}catch(e){console.error("Error fetching countries:",e)}})()},[]);const B=e=>{p({...c,[e.target.name]:e.target.value})},S=l.a.createElement("div",{className:"text-center"},l.a.createElement(_.a.Group,null,l.a.createElement(_.a.Label,null,"Title"),l.a.createElement(_.a.Control,{type:"text",name:"title",value:E,onChange:B})),null===r||void 0===r?void 0:null===(e=r.title)||void 0===e?void 0:e.map((e,a)=>l.a.createElement(A.a,{variant:"warning",key:a},e)),l.a.createElement(_.a.Group,null,l.a.createElement(_.a.Label,null,"Content"),l.a.createElement(_.a.Control,{as:"textarea",rows:6,name:"content",value:g,onChange:B})),null===r||void 0===r?void 0:null===(a=r.content)||void 0===a?void 0:a.map((e,a)=>l.a.createElement(A.a,{variant:"warning",key:a},e)),l.a.createElement(_.a.Group,null,l.a.createElement(_.a.Label,null,"Country"),l.a.createElement(_.a.Control,{as:"select",name:"country",value:f,onChange:B,required:!0},l.a.createElement("option",{value:""},"Select a country"),b.map(e=>l.a.createElement("option",{key:e.code,value:e.code},e.name)))),l.a.createElement(w.a,{className:h.a.Button,onClick:()=>k.goBack()},"cancel"),l.a.createElement(w.a,{className:h.a.Button,type:"submit"},"create"));return l.a.createElement(_.a,{onSubmit:async e=>{e.preventDefault();const a=new FormData;a.append("title",E),a.append("content",g),a.append("image",O.current.files[0]),a.append("country",f);try{const{data:e}=await d.post("/posts/",a);console.log({data:e}),k.push(`/posts/${e.id}`)}catch(l){var t,n;console.log(l),401!==(null===(t=l.response)||void 0===t?void 0:t.status)&&s(null===(n=l.response)||void 0===n?void 0:n.data)}}},l.a.createElement(y.a,null,l.a.createElement(C.a,{className:"py-2 p-0 p-md-2",md:7,lg:8},l.a.createElement(m.a,{className:`${o.a.Content} ${ue.a.Container} d-flex flex-column justify-content-center`},l.a.createElement(_.a.Group,{className:"text-center"},v?l.a.createElement(l.a.Fragment,null,l.a.createElement("figure",null,l.a.createElement(j.a,{className:o.a.Image,src:v,rounded:!0})),l.a.createElement("div",null,l.a.createElement(_.a.Label,{className:`${h.a.Button} btn`,htmlFor:"image-upload"},"Change the image"))):l.a.createElement(_.a.Label,{className:"d-flex justify-content-center",htmlFor:"image-upload"},l.a.createElement(ce,{src:me.a,message:"Click or tap to upload an image"})),l.a.createElement(_.a.File,{id:"image-upload",accept:"image/*",onChange:e=>{e.target.files.length&&(URL.revokeObjectURL(v),p({...c,image:URL.createObjectURL(e.target.files[0])}))},ref:O})),null===r||void 0===r?void 0:null===(t=r.image)||void 0===t?void 0:t.map((e,a)=>l.a.createElement(A.a,{variant:"warning",key:a},e)),l.a.createElement("div",{className:"d-md-none"},S))),l.a.createElement(C.a,{md:5,lg:4,className:"d-none d-md-block p-0 p-md-2"},l.a.createElement(m.a,{className:o.a.Content},S))))},pe=t(77),Ee=t.n(pe),ge=t(110),ve=t(108),fe=t(25),he=t(61),be=t.n(he);const Ne=l.a.forwardRef((e,a)=>{let{onClick:t}=e;return l.a.createElement("i",{className:"fas fa-ellipsis-v",ref:a,onClick:e=>{e.preventDefault(),t(e)}})}),ye=e=>{let{handleEdit:a,handleDelete:t}=e;return l.a.createElement(fe.a,{className:"ml-auto",drop:"left"},l.a.createElement(fe.a.Toggle,{as:Ne}),l.a.createElement(fe.a.Menu,{className:"text-center",popperConfig:{strategy:"fixed"}},l.a.createElement(fe.a.Item,{className:be.a.DropdownItem,onClick:a,"aria-label":"edit"},l.a.createElement("i",{className:"fas fa-edit"})),l.a.createElement(fe.a.Item,{className:be.a.DropdownItem,onClick:t,"aria-label":"delete"},l.a.createElement("i",{className:"fas fa-trash-alt"}))))};var Ce=e=>{const{id:a,owner:t,profile_id:n,profile_image:r,comments_count:s,country:c,title:o,content:m,image:u,updated_at:d,postPage:g}=e,v=P(),f=(null===v||void 0===v?void 0:v.username)===t,h=Object(i.f)();return l.a.createElement(ge.a,{className:Ee.a.Post},l.a.createElement(ge.a.Body,null,l.a.createElement(ve.a,{className:"align-items-center justify-content-between"},l.a.createElement(E.b,{to:`/profiles/${n}`},l.a.createElement(Z,{src:r,height:55}),t),l.a.createElement("div",{className:"d-flex align-items-center"},l.a.createElement("span",null,d),f&&g&&l.a.createElement(ye,{handleEdit:()=>{h.push(`/posts/${a}/edit`)},handleDelete:async()=>{try{await p.delete(`/posts/${a}/`),h.goBack()}catch(e){console.log(e)}}})),l.a.createElement("p",null,c))),l.a.createElement(E.b,{to:`/posts/${a}`},l.a.createElement(ge.a.Img,{src:u,alt:o})),l.a.createElement(ge.a.Body,null,o&&l.a.createElement(ge.a.Title,{className:"text-center"},o),m&&l.a.createElement(ge.a.Text,null,m),l.a.createElement(E.b,{to:`/posts/${a}`},l.a.createElement("i",{className:"far fa-comments"})),s))},_e=t(41),Ae=t.n(_e);var we=e=>{const{profile_id:a,profile_image:t,owner:r,updated_at:s,content:c,id:o,setPost:m,setComments:i}=e,[u,d]=Object(n.useState)(!1),g=P(),v=(null===g||void 0===g?void 0:g.username)===r;return l.a.createElement(l.a.Fragment,null,l.a.createElement("hr",null),l.a.createElement(ve.a,null,l.a.createElement(E.b,{to:`/profiles/${a}`},l.a.createElement(Z,{src:t})),l.a.createElement(ve.a.Body,{className:"align-self-center ml-2"},l.a.createElement("span",{className:Ae.a.Owner},r),l.a.createElement("span",{className:Ae.a.Date},s),u?l.a.createElement(we,{id:o,profile_id:a,content:c,profileImage:t,setComments:i,setShowEditForm:d}):l.a.createElement("p",null,c)),v&&!u&&l.a.createElement(ye,{handleEdit:()=>d(!0),handleDelete:async()=>{try{await p.delete(`/comments/${o}/`),m(e=>({results:[{...e.results[0],comments_count:e.results[0].comments_count-1}]})),i(e=>({...e,results:e.results.filter(e=>e.id!==o)}))}catch(e){}}})))};var je=e=>{const{profile_id:a,profile_image:t,owner:r,updated_at:s,content:c,id:o,setPost:m,setComments:i}=e,u=P(),d=(null===u||void 0===u?void 0:u.username)===r,[g,v]=Object(n.useState)(!1);return l.a.createElement(l.a.Fragment,null,l.a.createElement("hr",null),l.a.createElement(ve.a,null,l.a.createElement(E.b,{to:`/profiles/${a}`},l.a.createElement(Z,{src:t})),l.a.createElement(ve.a.Body,{className:"align-self-center ml-2"},l.a.createElement("span",{className:Ae.a.Owner},r),l.a.createElement("span",{className:Ae.a.Date},s),g?l.a.createElement(we,{id:o,profile_id:a,content:c,profileImage:t,setComments:i,setShowEditForm:v}):l.a.createElement("p",null,c)),d&&!g&&l.a.createElement(ye,{handleEdit:()=>v(!0),handleDelete:async()=>{try{await p.delete(`/comments/${o}/`),m(e=>({results:[{...e.results[0],comments_count:e.results[0].comments_count-1}]})),i(e=>({...e,results:e.results.filter(e=>e.id!==o)}))}catch(e){}}})))},xe=t(79),Oe=t(64),ke=t.n(Oe);var Be=function(e){const{post:a,setPost:t,setComments:r,profileImage:s,profile_id:c}=e,[o,m]=Object(n.useState)("");return l.a.createElement(_.a,{className:"mt-2",onSubmit:async e=>{e.preventDefault();try{const{data:e}=await p.post("/comments/",{content:o,post:a});r(a=>({...a,results:[e,...a.results]})),t(e=>({results:[{...e.results[0],comments_count:e.results[0].comments_count+1}]})),m("")}catch(n){console.log(n)}}},l.a.createElement(_.a.Group,null,l.a.createElement(xe.a,null,l.a.createElement(E.b,{to:`/profiles/${c}`},l.a.createElement(Z,{src:s})),l.a.createElement(_.a.Control,{className:ke.a.Form,placeholder:"my comment...",as:"textarea",value:o,onChange:e=>{m(e.target.value)},rows:2}))),l.a.createElement("button",{className:`${ke.a.Button} btn d-block ml-auto`,disabled:!o.trim(),type:"submit"},"post"))},Se=t(57);var Le=function(){const{id:e}=Object(i.h)(),[a,t]=Object(n.useState)({results:[]}),r=P(),s=null===r||void 0===r?void 0:r.profile_image,[c,u]=Object(n.useState)({results:[]});return Object(n.useEffect)(()=>{(async()=>{try{const[{data:n},{data:l}]=await Promise.all([d.get(`/posts/${e}`),d.get(`/comments/?post=${e}`)]);t({results:[n]}),u(l)}catch(a){console.log(a)}})()},[e]),l.a.createElement(y.a,{className:"h-100"},l.a.createElement(C.a,{className:"py-2 p-0 p-lg-2",lg:8},l.a.createElement(Ce,Object.assign({},a.results[0],{setPosts:t,postPage:!0})),l.a.createElement(m.a,{className:o.a.Content},r?l.a.createElement(Be,{profile_id:r.profile_id,profileImage:s,post:e,setPost:t,setComments:u}):c.results.length?"Comments":null,c.results.length?l.a.createElement(Se.a,{children:c.results.map(e=>l.a.createElement(je,Object.assign({key:e.id},e,{setPost:t,setComments:u}))),dataLength:c.results.length,loader:l.a.createElement(ce,{spinner:!0}),hasMore:!!c.next,next:()=>B(c,u)}):r?l.a.createElement("span",null,"No comments yet, be the first to comment!"):l.a.createElement("span",null,"No comments... yet"))))};var Ie=function(e){let{message:a,filter:t=""}=e;const[r,s]=Object(n.useState)({results:[]}),[c,u]=Object(n.useState)(!1),{pathname:p}=Object(i.g)(),[g,v]=Object(n.useState)("");return Object(n.useEffect)(()=>{u(!1);const e=setTimeout(()=>{(async()=>{try{const{data:a}=await d.get(`/posts/?${t}search=${g}`);s(a),u(!0)}catch(e){console.log(e)}})()},1e3);return()=>{clearTimeout(e)}},[t,g,p]),l.a.createElement(y.a,{className:"h-100"},l.a.createElement(C.a,{className:"py-2 p-0 p-lg-2",lg:8},l.a.createElement("span",null,"Share your journey!"),l.a.createElement(E.c,{className:X.a.NavLink,activeClassName:X.a.Active,to:"/posts/create"},"Post your trip")),l.a.createElement(C.a,{className:"py-2 p-0 p-lg-2",lg:8},l.a.createElement(_.a,{onSubmit:e=>e.preventDefault()},l.a.createElement(_.a.Control,{value:g,onChange:e=>v(e.target.value),type:"text",className:"mr-sm-2",placeholder:"Search posts"})),c?l.a.createElement(l.a.Fragment,null,r.results.length?l.a.createElement(Se.a,{children:r.results.map(e=>l.a.createElement(Ce,Object.assign({key:e.id},e,{setPosts:s}))),dataLength:r.results.length,loader:l.a.createElement(ce,{spinner:!0}),hasMore:!!r.next,next:()=>B(r,s)}):l.a.createElement(m.a,{className:o.a.Content},l.a.createElement("p",null,a," "))):l.a.createElement(m.a,{className:o.a.Content},l.a.createElement(ce,{spinner:!0}))))};var Fe=function(){var e,a,t;const[r,s]=Object(n.useState)({}),[c,p]=Object(n.useState)({title:"",content:"",image:"",country:""}),{title:E,content:g,image:v,country:f}=c,[b,N]=Object(n.useState)([]),x=Object(n.useRef)(null),O=Object(i.f)(),{id:k}=Object(i.h)();Object(n.useEffect)(()=>{(async()=>{try{const{data:a}=await d.get(`/post/${k}/`),{title:t,content:n,image:l,country:r,is_owner:s}=a;s?p({title:t,content:n,image:l,country:r}):O.push("/")}catch(e){console.log(e)}})()},[O,k]);const B=e=>{p({...c,[e.target.name]:e.target.value})};Object(n.useEffect)(()=>{(async()=>{try{const{data:a}=await u.a.get("/countries/");N(a)}catch(e){console.error("Error fetching countries:",e)}})()},[]);const S=l.a.createElement("div",{className:"text-center"},l.a.createElement(_.a.Group,null,l.a.createElement(_.a.Label,null,"Title"),l.a.createElement(_.a.Control,{type:"text",name:"title",value:E,onChange:B})),null===r||void 0===r?void 0:null===(e=r.title)||void 0===e?void 0:e.map((e,a)=>l.a.createElement(A.a,{variant:"warning",key:a},e)),l.a.createElement(_.a.Group,null,l.a.createElement(_.a.Label,null,"Content"),l.a.createElement(_.a.Control,{as:"textarea",rows:6,name:"content",value:g,onChange:B})),null===r||void 0===r?void 0:null===(a=r.content)||void 0===a?void 0:a.map((e,a)=>l.a.createElement(A.a,{variant:"warning",key:a},e)),l.a.createElement(_.a.Group,null,l.a.createElement(_.a.Label,null,"Country"),l.a.createElement(_.a.Control,{as:"select",name:"country",value:f,onChange:B,required:!0},l.a.createElement("option",{value:""},"Select a country"),b.map(e=>l.a.createElement("option",{key:e.code,value:e.code},e.name)))),l.a.createElement(w.a,{className:h.a.Button,onClick:()=>O.goBack()},"cancel"),l.a.createElement(w.a,{className:h.a.Button,type:"submit"},"save"));return l.a.createElement(_.a,{onSubmit:async e=>{var a;e.preventDefault();const t=new FormData;t.append("title",E),t.append("content",g),(null===x||void 0===x?void 0:null===(a=x.current)||void 0===a?void 0:a.files[0])&&t.append("image",x.current.files[0]),t.append("country",f);try{await d.put(`/posts/${k}/`,t),O.push(`/posts/${k}`)}catch(r){var n,l;console.log(r),401!==(null===(n=r.response)||void 0===n?void 0:n.status)&&s(null===(l=r.response)||void 0===l?void 0:l.data)}}},l.a.createElement(y.a,null,l.a.createElement(C.a,{className:"py-2 p-0 p-md-2",md:7,lg:8},l.a.createElement(m.a,{className:`${o.a.Content} ${ue.a.Container} d-flex flex-column justify-content-center`},l.a.createElement(_.a.Group,{className:"text-center"},l.a.createElement("figure",null,l.a.createElement(j.a,{className:o.a.Image,src:v,rounded:!0})),l.a.createElement("div",null,l.a.createElement(_.a.Label,{className:`${h.a.Button} ${h.a.Blue} btn`,htmlFor:"image-upload"},"Change the image")),l.a.createElement(_.a.File,{id:"image-upload",accept:"image/*",onChange:e=>{e.target.files.length&&(URL.revokeObjectURL(v),p({...c,image:URL.createObjectURL(e.target.files[0])}))},ref:x})),null===r||void 0===r?void 0:null===(t=r.image)||void 0===t?void 0:t.map((e,a)=>l.a.createElement(A.a,{variant:"warning",key:a},e)),l.a.createElement("div",{className:"d-md-none"},S))),l.a.createElement(C.a,{md:5,lg:4,className:"d-none d-md-block p-0 p-md-2"},l.a.createElement(m.a,{className:o.a.Content},S))))};var Pe=()=>{const{id:e}=Object(i.h)(),a=P(),[t,r]=Object(n.useState)(null);if(Object(n.useEffect)(()=>{u.a.get(`/profiles/${e}`).then(e=>{console.log("Profile Data:",e.data),r(e.data)}).catch(e=>console.error("Error fetching profile:",e))},[e]),!t)return l.a.createElement("p",null,"Loading profile...");const s=(null===a||void 0===a?void 0:a.username)===t.owner,c=l.a.createElement(l.a.Fragment,null,t.image&&l.a.createElement("img",{src:t.image,alt:`${t.owner}'s profile`,style:{width:"150px",borderRadius:"50%"}}),l.a.createElement("span",null,t.status||"No status set"),l.a.createElement("p",null,l.a.createElement("strong",null,"Username:")," ",t.owner),l.a.createElement("p",null,l.a.createElement("strong",null,"Name:")," ",t.name||"N/A"),l.a.createElement("p",null,l.a.createElement("strong",null,"Experience:")," ",t.experience),l.a.createElement("p",null,l.a.createElement("strong",null,"Joined:")," ",new Date(t.created_at).toLocaleDateString()),t.theme_song&&l.a.createElement("audio",{controls:!0},l.a.createElement("source",{src:t.theme_song,type:"audio/mpeg"}),"Your browser does not support the audio tag.")),o=l.a.createElement(l.a.Fragment,null,l.a.createElement("h1",null,"Profile of ",t.owner),l.a.createElement("span",null,t.status),l.a.createElement("p",null,l.a.createElement("strong",null,"Joined:")," ",new Date(t.created_at).toLocaleDateString()));return l.a.createElement("div",null,s?c:o)};var Te=function(){const e=P(),a=(null===e||void 0===e?void 0:e.profile_id)||"",t="/"===Object(i.g)().pathname;return l.a.createElement("div",{className:`${o.a.App} ${t?o.a.LandingBackground:o.a.NoBackground}`},l.a.createElement(J,null),l.a.createElement(m.a,{className:o.a.Main},l.a.createElement(i.c,null,l.a.createElement(i.a,{exact:!0,path:"/",render:()=>l.a.createElement(ee,null)}),l.a.createElement(i.a,{exact:!0,path:"/signin",render:()=>l.a.createElement(G,null)}),l.a.createElement(i.a,{exact:!0,path:"/signup",render:()=>l.a.createElement(O,null)}),l.a.createElement(i.a,{exact:!0,path:"/map",render:()=>l.a.createElement(ne,null)}),l.a.createElement(i.a,{path:"/profiles/:id",render:()=>l.a.createElement(Pe,null)}),l.a.createElement(i.a,{exact:!0,path:"/posts",render:()=>l.a.createElement(Ie,{message:"No results found.",filter:`owner__travel_buddies_initiated__owner__profile=${a}&`})}),l.a.createElement(i.a,{exact:!0,path:"/posts/create",render:()=>l.a.createElement(de,null)}),l.a.createElement(i.a,{exact:!0,path:"/posts/:id",render:()=>l.a.createElement(Le,null)}),l.a.createElement(i.a,{exact:!0,path:"/posts/:id/edit",render:()=>l.a.createElement(Fe,null)}),l.a.createElement(i.a,{exact:!0,path:"/travel-buddies",render:()=>l.a.createElement("h1",null,"Travel Buddies")}),l.a.createElement(i.a,{exact:!0,path:"/logout",render:()=>l.a.createElement("h1",null,"Logout")}),l.a.createElement(i.a,{render:()=>l.a.createElement("p",null,"Page not found!")}))))};var Ue=e=>{e&&e instanceof Function&&t.e(3).then(t.bind(null,111)).then(a=>{let{getCLS:t,getFID:n,getFCP:l,getLCP:r,getTTFB:s}=a;t(e),n(e),l(e),r(e),s(e)})};const De=Object(n.createContext)(),Me=Object(n.createContext)(),Ge=e=>{let{children:a}=e;const[t,r]=Object(n.useState)({pageProfile:{results:[]}}),s=P();return Object(n.useEffect)(()=>{(async()=>{try{const{data:a}=await d.get("/profiles/?ordering=-posts_count");r(e=>({...e,popularProfiles:a}))}catch(e){console.log(e)}})()},[s]),l.a.createElement(De.Provider,{value:t},l.a.createElement(Me.Provider,{value:{setProfileData:r}},a))};s.a.render(l.a.createElement(E.a,null,l.a.createElement(U,null,l.a.createElement(Ge,null,l.a.createElement(Te,null)))),document.getElementById("root")),Ue()},12:function(e,a,t){e.exports={App:"App_App__16ZpL",Main:"App_Main__HQkvd",LandingBackground:"App_LandingBackground__1CuGK",NoBackground:"App_NoBackground__3lGAn",Content:"App_Content__ZaMNr",FillerImage:"App_FillerImage__2ob-g",FillerImageRegister:"App_FillerImageRegister__OPjeC",Image:"App_Image__3UPXw"}},16:function(e,a,t){e.exports={NavBar:"NavBar_NavBar__1amC6",NavLink:"NavBar_NavLink__34ons",Active:"NavBar_Active__3PBZb",Avatar:"NavBar_Avatar__19PBw"}},19:function(e,a,t){e.exports={Row:"SignInUpForm_Row__3PbVy",Input:"SignInUpForm_Input__3xaLZ",Header:"SignInUpForm_Header__3joQJ",Link:"SignInUpForm_Link__1BeMm",Container:"SignInUpForm_Container__2cuBp",SignInCol:"SignInUpForm_SignInCol__3ImPK",SignUpCol:"SignInUpForm_SignUpCol__28o4y",SignInLink:"SignInUpForm_SignInLink__IbeFE"}},20:function(e,a,t){e.exports={Button:"Button_Button__27i9m"}},41:function(e,a,t){e.exports={Owner:"Comment_Owner__3sgYe",Date:"Comment_Date__10qt0"}},56:function(e,a,t){e.exports={Container:"PostCreateEditForm_Container__2WHuV"}},59:function(e,a,t){e.exports={tagline:"LandingPage_tagline__G04hq"}},61:function(e,a,t){e.exports={DropdownItem:"MoreDropdown_DropdownItem__2E4UM",Absolute:"MoreDropdown_Absolute__2RO70"}},64:function(e,a,t){e.exports={Form:"CommentCreateEditForm_Form__1Qeyz",Button:"CommentCreateEditForm_Button__sGFSX"}},68:function(e,a,t){e.exports=t.p+"static/media/reg_img.75b23e4b.jpg"},72:function(e,a,t){e.exports=t.p+"static/media/sign_in_img.ed50e9ba.jpg"},73:function(e,a,t){e.exports=t.p+"static/media/logo.d536d1c9.png"},74:function(e,a,t){e.exports={Avatar:"Avatar_Avatar__196lW"}},75:function(e,a,t){e.exports={Asset:"Asset_Asset__1dBcX"}},76:function(e,a){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAUmSURBVHgB7Z1NbxtFGMf/M7Nre3HitElRoLIlDiBFFbdIVKVCKh+AU8sXqNo7Uk+cEOJKvwEfAAV6KhfEASREoyJya0tQg1TJbqUc6qS1E6/3bZixcbp2nZdN7J3d5vlJq/V6d63o+e28O34YToiUkn0KiA3Ant8Ed1oQXQs85GC+AC+z/j5+j+1CIIP4JYTxYy94dVzyEXplBFYEubuIoAqEv6qNMSZxAhgSogNeU3/PuScoRg4KWQ1matjwQw+BY6FbrcL7gbEwye1HFnBBysLMU8yGAQog9mXHgndWYne1xjpHuf5QART441FU1de2i+1HHzLvoOsOFLD8l5zDObwF4ti0XbT/WWKt/c6PFaDr+YtPMU9P/WTY6cBbX0ITYxpsPu4GCv5kKavOytI65sede03A5XVJ9f0U0BLefywro+8PCdANrlvCDIipMGejfOGBHHq4hwSc+RdnQEyVSGA2frwn4FJdOmoEe7oHVSmgq6J4KdgTEDLqbqZFvBT0BHwupaCGNz10KVB9/d4QoCeg0aDgp021gZLe9wR0AhRBpMpiuf/Q9wSwQM3pEaniN/sPPcdXknMbFohUsXWPU7UDfPkz6nqa4opayOLPF0iAKTYasHnFIQGmWFTLtjzgyZcliclQKqgqyKHpB2O4ApyLXeoBmUJN/zAOwhheW5UAEMZQ7S/n7mn/Xo9BSh0qAcYhAYYhAYbhNo0DjKFjTyXAMCTAMCTAMCTAMCTAMLkVEESo+R7u6y3kqCKn5FKADr4M8CMkanqLXNzJq4TcCRgK/oAcS8iVgJHg12On6nmVkBsBo8HnFq4Ozqk11WvIqYRcCBgXfCHQGJy3iqjnVULmBRwW/AF5lZB5AdLHjcOCP+A1CV3cQsbJ/IK8sLASRqiopaPbBwV/gJYQdHEtAm5YEVaQcdjyE/kucorfxTO9t4s4j5xCUxGGIQGGIQGGIQGGIQGGIQGGyZSArZs/3dcbpsS0P/84ZGogJkNZS3hLPcnFx/j8qZPrr6arAdhF5BxqAwxDAgxDAgyTSQHt359VcErIlABmi3t6H9x5eBMTxFdCt7/4pbc2IAV7iAyRqV6QeG/udvC4+XH00r3VvH53Kosp/J25b5EhMlUCKl9eXrVqlevMmvxTymx+z/pg/urZbz75GRki1wsybwLUCzIMCTAMCTAMCTAMCTAM9wMkyvhATA4deyoBhiEBhiEBhuFC4kRpmIjjExQRcNtBBMIYXGxTCTAJ985TN9QUTll1Q63nVAJM0dHjgM4slQBTOD4i3vSpETbFC1X988VNBCCMoDOy8rW7VAWZ4jctAF+ziCbk0qdlw9epDXtTEfY8uiBSZdZVAvD/XNDmDjwQqbJZ6Me8n0XpOyoBadNY7QvYyx3w0d9yIXQonVUadAS6j2qsqV/vTUe3Q7RApMJL5WDwek+ATr0tOtQWTBvd42zE8s0PLchQKZg+gYvt+PGQAF0KLB87IKZCp42WjnH8vbEJfKhBnjzxhjfO2DXhP7/HFrUHk6MX/Cq2xp07MIXVlQdypjUznAGaSEapjPYfb7N929ZDc4jp7M9WCWfoZ+6ToZ96vEB7tM4f5chJ3Kp16dTUGoIXUurbgzhq4Ackz6K3IkX1EgqLnmqkS9Bzeqc6FW6kv1qyC0/P7TSqcPUMZ5L7T57GUEq2vAZLJwXtOBALHMxpQRQKr6osd6T64t1s/oe+Dmb8mEeQhQhRW+8DRKUKoo0Qka1WEfVC1tqyuj5hwEf5D7ZH39OOpDxXAAAAAElFTkSuQmCC"},77:function(e,a,t){e.exports={Post:"Post_Post__3UScv",Heart:"Post_Heart__3zMAO",HeartOutline:"Post_HeartOutline__2dqsh"}},81:function(e,a,t){e.exports=t(103)},86:function(e,a,t){}},[[81,1,2]]]);
//# sourceMappingURL=main.b6d28d02.chunk.js.map