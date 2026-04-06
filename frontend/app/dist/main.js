var Po=Object.defineProperty;var Eo=(n,e,t)=>e in n?Po(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var Me=(n,e,t)=>Eo(n,typeof e!="symbol"?e+"":e,t);var we,N,nn,So,Z,Qe,on,tn,Ue,_e,le,an,He,Ie,Le,rn,ve={},he=[],Ao=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,Re=Array.isArray;function G(n,e){for(var t in e)n[t]=e[t];return n}function Ve(n){n&&n.parentNode&&n.parentNode.removeChild(n)}function qo(n,e,t){var r,i,a,p={};for(a in e)a=="key"?r=e[a]:a=="ref"?i=e[a]:p[a]=e[a];if(arguments.length>2&&(p.children=arguments.length>3?we.call(arguments,2):t),typeof n=="function"&&n.defaultProps!=null)for(a in n.defaultProps)p[a]===void 0&&(p[a]=n.defaultProps[a]);return fe(n,p,r,i,null)}function fe(n,e,t,r,i){var a={type:n,props:e,key:t,ref:r,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:i??++nn,__i:-1,__u:0};return i==null&&N.vnode!=null&&N.vnode(a),a}function J(n){return n.children}function ye(n,e){this.props=n,this.context=e}function re(n,e){if(e==null)return n.__?re(n.__,n.__i+1):null;for(var t;e<n.__k.length;e++)if((t=n.__k[e])!=null&&t.__e!=null)return t.__e;return typeof n.type=="function"?re(n):null}function To(n){if(n.__P&&n.__d){var e=n.__v,t=e.__e,r=[],i=[],a=G({},e);a.__v=e.__v+1,N.vnode&&N.vnode(a),Fe(n.__P,a,e,n.__n,n.__P.namespaceURI,32&e.__u?[t]:null,r,t??re(e),!!(32&e.__u),i),a.__v=e.__v,a.__.__k[a.__i]=a,cn(r,a,i),e.__e=e.__=null,a.__e!=t&&sn(a)}}function sn(n){if((n=n.__)!=null&&n.__c!=null)return n.__e=n.__c.base=null,n.__k.some(function(e){if(e!=null&&e.__e!=null)return n.__e=n.__c.base=e.__e}),sn(n)}function We(n){(!n.__d&&(n.__d=!0)&&Z.push(n)&&!be.__r++||Qe!=N.debounceRendering)&&((Qe=N.debounceRendering)||on)(be)}function be(){try{for(var n,e=1;Z.length;)Z.length>e&&Z.sort(tn),n=Z.shift(),e=Z.length,To(n)}finally{Z.length=be.__r=0}}function pn(n,e,t,r,i,a,p,c,f,l,_){var s,u,m,P,I,E,C,R=r&&r.__k||he,D=e.length;for(f=Mo(t,e,R,f,D),s=0;s<D;s++)(m=t.__k[s])!=null&&(u=m.__i!=-1&&R[m.__i]||ve,m.__i=s,E=Fe(n,m,u,i,a,p,c,f,l,_),P=m.__e,m.ref&&u.ref!=m.ref&&(u.ref&&$e(u.ref,null,m),_.push(m.ref,m.__c||P,m)),I==null&&P!=null&&(I=P),(C=!!(4&m.__u))||u.__k===m.__k?(f=ln(m,f,n,C),C&&u.__e&&(u.__e=null)):typeof m.type=="function"&&E!==void 0?f=E:P&&(f=P.nextSibling),m.__u&=-7);return t.__e=I,f}function Mo(n,e,t,r,i){var a,p,c,f,l,_=t.length,s=_,u=0;for(n.__k=new Array(i),a=0;a<i;a++)(p=e[a])!=null&&typeof p!="boolean"&&typeof p!="function"?(typeof p=="string"||typeof p=="number"||typeof p=="bigint"||p.constructor==String?p=n.__k[a]=fe(null,p,null,null,null):Re(p)?p=n.__k[a]=fe(J,{children:p},null,null,null):p.constructor===void 0&&p.__b>0?p=n.__k[a]=fe(p.type,p.props,p.key,p.ref?p.ref:null,p.__v):n.__k[a]=p,f=a+u,p.__=n,p.__b=n.__b+1,c=null,(l=p.__i=Uo(p,t,f,s))!=-1&&(s--,(c=t[l])&&(c.__u|=2)),c==null||c.__v==null?(l==-1&&(i>_?u--:i<_&&u++),typeof p.type!="function"&&(p.__u|=4)):l!=f&&(l==f-1?u--:l==f+1?u++:(l>f?u--:u++,p.__u|=4))):n.__k[a]=null;if(s)for(a=0;a<_;a++)(c=t[a])!=null&&(2&c.__u)==0&&(c.__e==r&&(r=re(c)),mn(c,c));return r}function ln(n,e,t,r){var i,a;if(typeof n.type=="function"){for(i=n.__k,a=0;i&&a<i.length;a++)i[a]&&(i[a].__=n,e=ln(i[a],e,t,r));return e}n.__e!=e&&(r&&(e&&n.type&&!e.parentNode&&(e=re(n)),t.insertBefore(n.__e,e||null)),e=n.__e);do e=e&&e.nextSibling;while(e!=null&&e.nodeType==8);return e}function Uo(n,e,t,r){var i,a,p,c=n.key,f=n.type,l=e[t],_=l!=null&&(2&l.__u)==0;if(l===null&&c==null||_&&c==l.key&&f==l.type)return t;if(r>(_?1:0)){for(i=t-1,a=t+1;i>=0||a<e.length;)if((l=e[p=i>=0?i--:a++])!=null&&(2&l.__u)==0&&c==l.key&&f==l.type)return p}return-1}function Ze(n,e,t){e[0]=="-"?n.setProperty(e,t??""):n[e]=t==null?"":typeof t!="number"||Ao.test(e)?t:t+"px"}function ge(n,e,t,r,i){var a,p;e:if(e=="style")if(typeof t=="string")n.style.cssText=t;else{if(typeof r=="string"&&(n.style.cssText=r=""),r)for(e in r)t&&e in t||Ze(n.style,e,"");if(t)for(e in t)r&&t[e]==r[e]||Ze(n.style,e,t[e])}else if(e[0]=="o"&&e[1]=="n")a=e!=(e=e.replace(an,"$1")),p=e.toLowerCase(),e=p in n||e=="onFocusOut"||e=="onFocusIn"?p.slice(2):e.slice(2),n.l||(n.l={}),n.l[e+a]=t,t?r?t[le]=r[le]:(t[le]=He,n.addEventListener(e,a?Le:Ie,a)):n.removeEventListener(e,a?Le:Ie,a);else{if(i=="http://www.w3.org/2000/svg")e=e.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(e!="width"&&e!="height"&&e!="href"&&e!="list"&&e!="form"&&e!="tabIndex"&&e!="download"&&e!="rowSpan"&&e!="colSpan"&&e!="role"&&e!="popover"&&e in n)try{n[e]=t??"";break e}catch{}typeof t=="function"||(t==null||t===!1&&e[4]!="-"?n.removeAttribute(e):n.setAttribute(e,e=="popover"&&t==1?"":t))}}function en(n){return function(e){if(this.l){var t=this.l[e.type+n];if(e[_e]==null)e[_e]=He++;else if(e[_e]<t[le])return;return t(N.event?N.event(e):e)}}}function Fe(n,e,t,r,i,a,p,c,f,l){var _,s,u,m,P,I,E,C,R,D,M,V,F,d,b,w=e.type;if(e.constructor!==void 0)return null;128&t.__u&&(f=!!(32&t.__u),a=[c=e.__e=t.__e]),(_=N.__b)&&_(e);e:if(typeof w=="function")try{if(C=e.props,R=w.prototype&&w.prototype.render,D=(_=w.contextType)&&r[_.__c],M=_?D?D.props.value:_.__:r,t.__c?E=(s=e.__c=t.__c).__=s.__E:(R?e.__c=s=new w(C,M):(e.__c=s=new ye(C,M),s.constructor=w,s.render=Lo),D&&D.sub(s),s.state||(s.state={}),s.__n=r,u=s.__d=!0,s.__h=[],s._sb=[]),R&&s.__s==null&&(s.__s=s.state),R&&w.getDerivedStateFromProps!=null&&(s.__s==s.state&&(s.__s=G({},s.__s)),G(s.__s,w.getDerivedStateFromProps(C,s.__s))),m=s.props,P=s.state,s.__v=e,u)R&&w.getDerivedStateFromProps==null&&s.componentWillMount!=null&&s.componentWillMount(),R&&s.componentDidMount!=null&&s.__h.push(s.componentDidMount);else{if(R&&w.getDerivedStateFromProps==null&&C!==m&&s.componentWillReceiveProps!=null&&s.componentWillReceiveProps(C,M),e.__v==t.__v||!s.__e&&s.shouldComponentUpdate!=null&&s.shouldComponentUpdate(C,s.__s,M)===!1){e.__v!=t.__v&&(s.props=C,s.state=s.__s,s.__d=!1),e.__e=t.__e,e.__k=t.__k,e.__k.some(function(U){U&&(U.__=e)}),he.push.apply(s.__h,s._sb),s._sb=[],s.__h.length&&p.push(s);break e}s.componentWillUpdate!=null&&s.componentWillUpdate(C,s.__s,M),R&&s.componentDidUpdate!=null&&s.__h.push(function(){s.componentDidUpdate(m,P,I)})}if(s.context=M,s.props=C,s.__P=n,s.__e=!1,V=N.__r,F=0,R)s.state=s.__s,s.__d=!1,V&&V(e),_=s.render(s.props,s.state,s.context),he.push.apply(s.__h,s._sb),s._sb=[];else do s.__d=!1,V&&V(e),_=s.render(s.props,s.state,s.context),s.state=s.__s;while(s.__d&&++F<25);s.state=s.__s,s.getChildContext!=null&&(r=G(G({},r),s.getChildContext())),R&&!u&&s.getSnapshotBeforeUpdate!=null&&(I=s.getSnapshotBeforeUpdate(m,P)),d=_!=null&&_.type===J&&_.key==null?dn(_.props.children):_,c=pn(n,Re(d)?d:[d],e,t,r,i,a,p,c,f,l),s.base=e.__e,e.__u&=-161,s.__h.length&&p.push(s),E&&(s.__E=s.__=null)}catch(U){if(e.__v=null,f||a!=null)if(U.then){for(e.__u|=f?160:128;c&&c.nodeType==8&&c.nextSibling;)c=c.nextSibling;a[a.indexOf(c)]=null,e.__e=c}else{for(b=a.length;b--;)Ve(a[b]);De(e)}else e.__e=t.__e,e.__k=t.__k,U.then||De(e);N.__e(U,e,t)}else a==null&&e.__v==t.__v?(e.__k=t.__k,e.__e=t.__e):c=e.__e=Io(t.__e,e,t,r,i,a,p,f,l);return(_=N.diffed)&&_(e),128&e.__u?void 0:c}function De(n){n&&(n.__c&&(n.__c.__e=!0),n.__k&&n.__k.some(De))}function cn(n,e,t){for(var r=0;r<t.length;r++)$e(t[r],t[++r],t[++r]);N.__c&&N.__c(e,n),n.some(function(i){try{n=i.__h,i.__h=[],n.some(function(a){a.call(i)})}catch(a){N.__e(a,i.__v)}})}function dn(n){return typeof n!="object"||n==null||n.__b>0?n:Re(n)?n.map(dn):G({},n)}function Io(n,e,t,r,i,a,p,c,f){var l,_,s,u,m,P,I,E=t.props||ve,C=e.props,R=e.type;if(R=="svg"?i="http://www.w3.org/2000/svg":R=="math"?i="http://www.w3.org/1998/Math/MathML":i||(i="http://www.w3.org/1999/xhtml"),a!=null){for(l=0;l<a.length;l++)if((m=a[l])&&"setAttribute"in m==!!R&&(R?m.localName==R:m.nodeType==3)){n=m,a[l]=null;break}}if(n==null){if(R==null)return document.createTextNode(C);n=document.createElementNS(i,R,C.is&&C),c&&(N.__m&&N.__m(e,a),c=!1),a=null}if(R==null)E===C||c&&n.data==C||(n.data=C);else{if(a=a&&we.call(n.childNodes),!c&&a!=null)for(E={},l=0;l<n.attributes.length;l++)E[(m=n.attributes[l]).name]=m.value;for(l in E)m=E[l],l=="dangerouslySetInnerHTML"?s=m:l=="children"||l in C||l=="value"&&"defaultValue"in C||l=="checked"&&"defaultChecked"in C||ge(n,l,null,m,i);for(l in C)m=C[l],l=="children"?u=m:l=="dangerouslySetInnerHTML"?_=m:l=="value"?P=m:l=="checked"?I=m:c&&typeof m!="function"||E[l]===m||ge(n,l,m,E[l],i);if(_)c||s&&(_.__html==s.__html||_.__html==n.innerHTML)||(n.innerHTML=_.__html),e.__k=[];else if(s&&(n.innerHTML=""),pn(e.type=="template"?n.content:n,Re(u)?u:[u],e,t,r,R=="foreignObject"?"http://www.w3.org/1999/xhtml":i,a,p,a?a[0]:t.__k&&re(t,0),c,f),a!=null)for(l=a.length;l--;)Ve(a[l]);c||(l="value",R=="progress"&&P==null?n.removeAttribute("value"):P!=null&&(P!==n[l]||R=="progress"&&!P||R=="option"&&P!=E[l])&&ge(n,l,P,E[l],i),l="checked",I!=null&&I!=n[l]&&ge(n,l,I,E[l],i))}return n}function $e(n,e,t){try{if(typeof n=="function"){var r=typeof n.__u=="function";r&&n.__u(),r&&e==null||(n.__u=n(e))}else n.current=e}catch(i){N.__e(i,t)}}function mn(n,e,t){var r,i;if(N.unmount&&N.unmount(n),(r=n.ref)&&(r.current&&r.current!=n.__e||$e(r,null,e)),(r=n.__c)!=null){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(a){N.__e(a,e)}r.base=r.__P=null}if(r=n.__k)for(i=0;i<r.length;i++)r[i]&&mn(r[i],e,t||typeof n.type!="function");t||Ve(n.__e),n.__c=n.__=n.__e=void 0}function Lo(n,e,t){return this.constructor(n,t)}function un(n,e,t){var r,i,a,p;e==document&&(e=document.documentElement),N.__&&N.__(n,e),i=(r=typeof t=="function")?null:t&&t.__k||e.__k,a=[],p=[],Fe(e,n=(!r&&t||e).__k=qo(J,null,[n]),i||ve,ve,e.namespaceURI,!r&&t?[t]:i?null:e.firstChild?we.call(e.childNodes):null,a,!r&&t?t:i?i.__e:e.firstChild,r,p),cn(a,n,p)}function Ce(n){function e(t){var r,i;return this.getChildContext||(r=new Set,(i={})[e.__c]=this,this.getChildContext=function(){return i},this.componentWillUnmount=function(){r=null},this.shouldComponentUpdate=function(a){this.props.value!=a.value&&r.forEach(function(p){p.__e=!0,We(p)})},this.sub=function(a){r.add(a);var p=a.componentWillUnmount;a.componentWillUnmount=function(){r&&r.delete(a),p&&p.call(a)}}),t.children}return e.__c="__cC"+rn++,e.__=n,e.Provider=e.__l=(e.Consumer=function(t,r){return t.children(r)}).contextType=e,e}we=he.slice,N={__e:function(n,e,t,r){for(var i,a,p;e=e.__;)if((i=e.__c)&&!i.__)try{if((a=i.constructor)&&a.getDerivedStateFromError!=null&&(i.setState(a.getDerivedStateFromError(n)),p=i.__d),i.componentDidCatch!=null&&(i.componentDidCatch(n,r||{}),p=i.__d),p)return i.__E=i}catch(c){n=c}throw n}},nn=0,So=function(n){return n!=null&&n.constructor===void 0},ye.prototype.setState=function(n,e){var t;t=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=G({},this.state),typeof n=="function"&&(n=n(G({},t),this.props)),n&&G(t,n),n!=null&&this.__v&&(e&&this._sb.push(e),We(this))},ye.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),We(this))},ye.prototype.render=J,Z=[],on=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,tn=function(n,e){return n.__v.__b-e.__v.__b},be.__r=0,Ue=Math.random().toString(8),_e="__d"+Ue,le="__a"+Ue,an=/(PointerCapture)$|Capture$/i,He=0,Ie=en(!1),Le=en(!0),rn=0;var ce,q,Be,gn,je=0,Rn=[],W=N,_n=W.__b,fn=W.__r,yn=W.diffed,vn=W.__c,hn=W.unmount,bn=W.__;function Oe(n,e){W.__h&&W.__h(q,n,je||e),je=0;var t=q.__H||(q.__H={__:[],__h:[]});return n>=t.__.length&&t.__.push({}),t.__[n]}function x(n){return je=1,Wo(Cn,n)}function Wo(n,e,t){var r=Oe(ce++,2);if(r.t=n,!r.__c&&(r.__=[t?t(e):Cn(void 0,e),function(c){var f=r.__N?r.__N[0]:r.__[0],l=r.t(f,c);f!==l&&(r.__N=[l,r.__[1]],r.__c.setState({}))}],r.__c=q,!q.__f)){var i=function(c,f,l){if(!r.__c.__H)return!0;var _=r.__c.__H.__.filter(function(u){return u.__c});if(_.every(function(u){return!u.__N}))return!a||a.call(this,c,f,l);var s=r.__c.props!==c;return _.some(function(u){if(u.__N){var m=u.__[0];u.__=u.__N,u.__N=void 0,m!==u.__[0]&&(s=!0)}}),a&&a.call(this,c,f,l)||s};q.__f=!0;var a=q.shouldComponentUpdate,p=q.componentWillUpdate;q.componentWillUpdate=function(c,f,l){if(this.__e){var _=a;a=void 0,i(c,f,l),a=_}p&&p.call(this,c,f,l)},q.shouldComponentUpdate=i}return r.__N||r.__}function ne(n,e){var t=Oe(ce++,3);!W.__s&&Vo(t.__H,e)&&(t.__=n,t.u=e,q.__H.__h.push(t))}function xe(n){var e=q.context[n.__c],t=Oe(ce++,9);return t.c=n,e?(t.__==null&&(t.__=!0,e.sub(q)),e.props.value):n.__}function Do(){for(var n;n=Rn.shift();){var e=n.__H;if(n.__P&&e)try{e.__h.some(ke),e.__h.some(ze),e.__h=[]}catch(t){e.__h=[],W.__e(t,n.__v)}}}W.__b=function(n){q=null,_n&&_n(n)},W.__=function(n,e){n&&e.__k&&e.__k.__m&&(n.__m=e.__k.__m),bn&&bn(n,e)},W.__r=function(n){fn&&fn(n),ce=0;var e=(q=n.__c).__H;e&&(Be===q?(e.__h=[],q.__h=[],e.__.some(function(t){t.__N&&(t.__=t.__N),t.u=t.__N=void 0})):(e.__h.some(ke),e.__h.some(ze),e.__h=[],ce=0)),Be=q},W.diffed=function(n){yn&&yn(n);var e=n.__c;e&&e.__H&&(e.__H.__h.length&&(Rn.push(e)!==1&&gn===W.requestAnimationFrame||((gn=W.requestAnimationFrame)||Ho)(Do)),e.__H.__.some(function(t){t.u&&(t.__H=t.u),t.u=void 0})),Be=q=null},W.__c=function(n,e){e.some(function(t){try{t.__h.some(ke),t.__h=t.__h.filter(function(r){return!r.__||ze(r)})}catch(r){e.some(function(i){i.__h&&(i.__h=[])}),e=[],W.__e(r,t.__v)}}),vn&&vn(n,e)},W.unmount=function(n){hn&&hn(n);var e,t=n.__c;t&&t.__H&&(t.__H.__.some(function(r){try{ke(r)}catch(i){e=i}}),t.__H=void 0,e&&W.__e(e,t.__v))};var wn=typeof requestAnimationFrame=="function";function Ho(n){var e,t=function(){clearTimeout(r),wn&&cancelAnimationFrame(e),setTimeout(n)},r=setTimeout(t,35);wn&&(e=requestAnimationFrame(t))}function ke(n){var e=q,t=n.__c;typeof t=="function"&&(n.__c=void 0,t()),q=e}function ze(n){var e=q;n.__c=n.__(),q=e}function Vo(n,e){return!n||n.length!==e.length||e.some(function(t,r){return t!==n[r]})}function Cn(n,e){return typeof e=="function"?e(n):e}var Fo=0;function o(n,e,t,r,i,a){e||(e={});var p,c,f=e;if("ref"in f)for(c in f={},e)c=="ref"?p=e[c]:f[c]=e[c];var l={type:n,props:f,key:t,ref:p,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--Fo,__i:-1,__u:0,__source:i,__self:a};if(typeof n=="function"&&(p=n.defaultProps))for(c in p)f[c]===void 0&&(f[c]=p[c]);return N.vnode&&N.vnode(l),l}function T({children:n,className:e=""}){return o("div",{className:["surface",e].filter(Boolean).join(" "),children:n})}var $o=[["Public company directory","List companies and inspect company payloads without authentication."],["Company bootstrap","Create a company and admin employee from the frontend."],["Employee auth","Sign in as an employee and unlock permission-based mutations."],["Company auth","Sign in as a company for read-only authenticated access."],["Company updates","Rename a company or rotate the company password when the actor has update permission."],["Role upsert","Create or update visible company roles and assign permission sets."],["Employee lifecycle","Create, update, reassign manager, grant roles, revoke roles, and remove employees."],["Session controls","Restore active session with `/auth/me` and terminate it with logout."]];function kn(){return o(J,{children:[o("section",{className:"about-hero",children:[o("span",{className:"eyebrow",children:"Frontend scope"}),o("h1",{children:"Backend v1 abilities are now reachable from the client without changing the API."}),o("p",{children:"The frontend still uses the existing custom router and thin architecture layers, but the landing dashboard has been replaced with real org-management workflows wired into `/api/v1`."})]}),o(T,{className:"notes-panel",children:[o("h2",{children:"Capability map"}),o("div",{className:"guide-list",children:$o.map(([n,e])=>o("div",{className:"guide-row",children:[o("strong",{children:n}),o("p",{children:e})]},n))})]}),o(T,{className:"notes-panel",children:[o("h2",{children:"Backend notes"}),o("p",{children:"Company-authenticated sessions stay intentionally read-only because the backend mutation routes require an employee principal and, for most actions, specific permissions derived from assigned roles."}),o("p",{children:"Feature packages under `backend/app/features/` remain untouched and are intentionally excluded from the UI in this pass."})]})]})}var X={apiBasePath:"/api",name:"Corp Ladder",sessionStorageKey:"corp-ladder.session-token",summary:"Frontend control plane for company auth, hierarchy management, and role-based org administration."};var de=class extends Error{constructor(t,r,i){super(t);Me(this,"data");Me(this,"status");this.name="ApiError",this.data=i,this.status=r}};function Bo(n,e){if(typeof e=="object"&&e!==null){let t="detail"in e?e.detail:void 0,r="message"in e?e.message:void 0;if(typeof t=="string")return t;if(typeof r=="string")return r}return`Request failed with status ${n}.`}async function H(n,e){let t=n.startsWith("/")?n:`/${n}`,r=new Headers(e?.headers);r.set("Accept","application/json"),e?.json!==void 0&&r.set("Content-Type","application/json"),e?.token&&r.set("Authorization",`Bearer ${e.token}`);let i=await fetch(`${X.apiBasePath}${t}`,{...e,body:e?.json===void 0?e?.body:JSON.stringify(e.json),headers:{...Object.fromEntries(r.entries())}}),p=(i.headers.get("content-type")??"").includes("application/json")?await i.json():await i.text();if(!i.ok)throw new de(Bo(i.status,p),i.status,p);return p}function Ke(n){return`/v1/company/${encodeURIComponent(n)}`}function xn(){return H("/v1/company")}function Nn(n){return H(Ke(n))}function Pn(n){return H("/v1/company",{json:n,method:"POST"})}function En(n,e,t){return H(Ke(n),{json:e,method:"PATCH",token:t})}function Sn(n,e,t){return H(`${Ke(n)}/roles`,{json:e,method:"POST",token:t})}function me(n){return`/v1/employee/${encodeURIComponent(n)}`}function An(n,e){return H("/v1/employee",{json:n,method:"POST",token:e})}function qn(n,e,t){return H(me(n),{json:e,method:"PATCH",token:t})}function Tn(n,e,t){return H(`${me(n)}/manager`,{json:e,method:"PATCH",token:t})}function Mn(n,e,t){return H(`${me(n)}/roles`,{json:e,method:"POST",token:t})}function Un(n,e,t){return H(`${me(n)}/roles/${encodeURIComponent(e)}`,{method:"DELETE",token:t})}function In(n,e){return H(me(n),{method:"DELETE",token:e})}var Ne=null,oe=null,Pe=new Map,se=new Map;function Je(n){return Pe.set(n.id,n),n}function te(n){Pe.delete(n),se.delete(n)}function ie(){Ne=null,oe=null}async function Ln(n=!1){return!n&&Ne?Ne:(!n&&oe||(oe=xn().then(e=>(Ne=e.companies,oe=null,e.companies)).catch(e=>{throw oe=null,e})),oe)}async function Q(n,e=!1){if(!e&&Pe.has(n))return Pe.get(n);if(!e&&se.has(n))return se.get(n);let t=Nn(n).then(r=>(se.delete(n),Je(r.company))).catch(r=>{throw se.delete(n),r});return se.set(n,t),t}async function Wn(n){let e=await Pn(n);return ie(),Je(e.company),e}async function Dn(n,e,t){let r=await En(n,e,t);return ie(),Je(r.company)}async function Hn(n,e,t){return await Sn(n,e,t),te(n),ie(),Q(n,!0)}async function Vn(n,e){return await An(n,e),te(n.company_id),ie(),Q(n.company_id,!0)}async function Fn(n,e,t,r){return await qn(n,t,r),te(e),Q(e,!0)}async function $n(n,e,t,r){return await Tn(n,t,r),te(e),ie(),Q(e,!0)}async function Bn(n,e,t,r){return await Mn(n,t,r),te(e),Q(e,!0)}async function jn(n,e,t,r){return await Un(n,t,r),te(e),Q(e,!0)}async function zn(n,e,t){return await In(n,t),te(e),ie(),Q(e,!0)}function On(n){return H("/v1/auth/employee/login",{json:n,method:"POST"})}function Kn(n){return H("/v1/auth/company/login",{json:n,method:"POST"})}function Jn(n){return H("/v1/auth/me",{token:n})}function Yn(n){return H("/v1/auth/logout",{method:"POST",token:n})}function Gn(n){return Jn(n).then(e=>e.session)}function Xn(n){return On(n)}function Qn(n){return Kn(n)}function Zn(n){return Yn(n).then(()=>{})}function jo(n,e){return n.name.localeCompare(e.name)||n.id.localeCompare(e.id)}function zo(n,e){let t=0,r=n,i=new Set([n.id]);for(;r.reports;){let a=e[r.reports];if(!a||i.has(a.id))break;i.add(a.id),r=a,t+=1}return t}function Oo(n){return n.reduce((e,t)=>(e[t.id]=t,e),{})}function K(n){let e=Oo(n.roles),t=n.employees.reduce((a,p)=>(a[p.id]=p,a),{}),r=n.employees.map(a=>({...a,directReportCount:a.reporting.length,isBoardMember:n.board.includes(a.id),level:zo(a,t),managerName:a.reports?t[a.reports]?.name??a.reports:null,roleLabels:a.roles.map(p=>e[p]?.id??p)})).sort((a,p)=>a.level-p.level||jo(a,p)),i=r.reduce((a,p)=>(a[p.id]=p,a),{});return{boardMembers:n.board.map(a=>i[a]).filter(Boolean),company:n,employeeIndex:i,employees:r,roleIndex:e,roles:n.roles}}var eo=Ce(null);function Ye(n){return n instanceof Error?n.message:"Unexpected request failure."}function Ge(n){return n instanceof de&&n.status===401}function no({children:n}){let[e,t]=x("loading"),[r,i]=x("idle"),[a,p]=x("idle"),[c,f]=x([]),[l,_]=x(null),[s,u]=x(null),[m,P]=x(null),[I,E]=x(null),[C,R]=x(null),[D,M]=x(null),V=s?.principal_type==="employee"?s.employee.id:null,F=s?.principal_type==="employee"?s.employee.permissions:[],d=v=>{if(P(v),v){window.localStorage.setItem(X.sessionStorageKey,v);return}window.localStorage.removeItem(X.sessionStorageKey)},b=()=>{d(null),u(null)},w=async(v=!1)=>{i("loading");try{let y=await Ln(v);return f(y),i("ready"),y}catch(y){throw i("error"),y}},U=async(v,y=!1)=>{p("loading");try{let k=await Q(v,y);_(K(k)),p("ready")}catch(k){throw p("error"),k}},L=async v=>{let y=v??c;if(y.length===0){_(null),p("idle");return}await U(y[0].id,!0)},z=async v=>{if(Ge(v)){b();let y=await w(!0);await L(y),M("Your session expired. Please sign in again.");return}M(Ye(v))},A=async(v,y)=>{E(v),M(null);try{return await y()}catch(k){throw await z(k),k}finally{E(null)}},ae=async()=>{await A("Refreshing companies",async()=>{let v=await w(!0);s||await L(v)})},h=async()=>{if(s){await A("Refreshing workspace",async()=>{await w(!0),await U(s.company_id,!0)});return}await ae()},O=async(v,y,k)=>{if(d(v),u(y),await w(!0),k){_(k),p("ready");return}await U(y.company_id,!0)};ne(()=>{(async()=>{R(null),t("loading");try{let y=window.localStorage.getItem(X.sessionStorageKey),k=await w(!1);if(y)try{let j=await Gn(y);d(y),u(j),await U(j.company_id,!1)}catch(j){b(),await L(k),M(Ge(j)?"Your previous session is no longer valid.":Ye(j))}else await L(k)}catch(y){R(Ye(y))}finally{t("ready")}})()},[]);let B=()=>{if(!m||!s)throw new Error("Authentication required.");return m},Y=async v=>{await A("Creating company",async()=>{let y=await Wn(v);await O(y.token,y.session,K(y.company))})},ue=async v=>{await A("Signing in employee",async()=>{let y=await Xn(v);await O(y.token,y.session)})},Te=async v=>{await A("Signing in company",async()=>{let y=await Qn(v);await O(y.token,y.session)})},g=async()=>{await A("Ending session",async()=>{let v=m;if(v)try{await Zn(v)}catch(k){if(!Ge(k))throw k}b();let y=await w(!0);await L(y)})},S=async v=>{s||await A("Loading company",async()=>{await U(v,!0)})},$=async v=>{await A("Updating company",async()=>{let y=B(),k=await Dn(s.company_id,v,y);_(K(k)),await w(!0)})},ho=async v=>{await A("Saving role",async()=>{let y=B(),k=await Hn(s.company_id,v,y);_(K(k)),await w(!0)})},bo=async v=>{await A("Adding employee",async()=>{let y=B(),k=await Vn(v,y);_(K(k)),await w(!0)})},wo=async(v,y)=>{await A("Updating employee",async()=>{let k=B(),j=await Fn(v,s.company_id,y,k);_(K(j)),await w(!0)})},Ro=async(v,y)=>{await A("Rewiring reporting line",async()=>{let k=B(),j=await $n(v,s.company_id,y,k);_(K(j)),await w(!0)})},Co=async(v,y)=>{await A("Assigning role",async()=>{let k=B(),j=await Bn(v,s.company_id,y,k);_(K(j)),await w(!0)})},ko=async(v,y)=>{await A("Revoking role",async()=>{let k=B(),j=await jn(v,s.company_id,y,k);_(K(j)),await w(!0)})},xo=async v=>{await A("Removing employee",async()=>{let y=B(),k=await zn(v,s.company_id,y);_(K(k)),await w(!0)})},No={actionError:D,activeCompany:l,bootstrapStatus:e,companies:c,companiesStatus:r,createCompany:Y,createEmployee:bo,createRole:ho,currentEmployeeId:V,isAuthenticated:!!s,isEmployeeSession:s?.principal_type==="employee",loginCompany:Te,loginEmployee:ue,logout:g,pageError:C,pendingAction:I,permissions:F,refreshCompanies:ae,refreshWorkspace:h,removeEmployee:xo,revokeRole:ko,selectPublicCompany:S,session:s,updateCompany:$,updateEmployee:wo,assignRole:Co,changeManager:Ro,workspaceStatus:a};return o(eo.Provider,{value:No,children:n})}function ee(){let n=xe(eo);if(!n)throw new Error("useAppModel must be used within AppProvider.");return n}var oo={admin:{id:"",name:"",password:"",role:""},id:"",name:"",password:""};function to(){let{actionError:n,activeCompany:e,companies:t,companiesStatus:r,createCompany:i,loginCompany:a,loginEmployee:p,pageError:c,pendingAction:f,refreshCompanies:l,selectPublicCompany:_,workspaceStatus:s}=ee(),[u,m]=x(oo),[P,I]=x(""),[E,C]=x(""),[R,D]=x(""),[M,V]=x(""),F=async()=>{await i({admin:{...u.admin,id:u.admin.id.trim(),name:u.admin.name.trim(),password:u.admin.password,role:u.admin.role.trim()},id:u.id.trim(),name:u.name.trim(),password:u.password}),m(oo)};return o("div",{className:"page-stack",children:[o("section",{className:"hero hero--ops",children:[o("div",{className:"hero__copy",children:[o("span",{className:"eyebrow",children:"v1 control surface"}),o("h1",{children:"Run the org chart from the frontend, against the existing API."}),o("p",{children:"Every current backend v1 ability is exposed here except modular feature packages: company signup, employee and company auth, roles, employee lifecycle, reporting lines, and read-only company browsing."}),o("div",{className:"hero__metrics",children:[o("div",{className:"metric-chip",children:[o("strong",{children:t.length}),o("span",{children:"companies"})]}),o("div",{className:"metric-chip",children:[o("strong",{children:e?.employees.length??0}),o("span",{children:"visible employees"})]}),o("div",{className:"metric-chip",children:[o("strong",{children:e?.roles.length??0}),o("span",{children:"visible roles"})]})]})]}),o(T,{className:"hero-panel hero-panel--status",children:[o("span",{className:"eyebrow",children:"Public mode"}),o("h2",{children:"Browse companies or sign in."}),o("p",{children:"Unauthenticated users can inspect companies. Mutations unlock after employee auth, while company auth stays read-only by backend design."}),o("div",{className:"status-list",children:[o("div",{className:"status-row",children:[o("span",{children:"Companies"}),o("strong",{children:r})]}),o("div",{className:"status-row",children:[o("span",{children:"Preview"}),o("strong",{children:s})]}),o("div",{className:"status-row",children:[o("span",{children:"Action"}),o("strong",{children:f??"idle"})]})]}),o("button",{className:"button button--secondary",onClick:()=>void l(),type:"button",children:"Refresh catalog"})]})]}),(c||n)&&o(T,{className:"notice-panel notice-panel--error",children:[o("strong",{children:"Request issue"}),o("p",{children:n??c})]}),o("div",{className:"content-grid",children:[o("div",{className:"content-grid__main",children:[o(T,{className:"stack-panel",children:[o("div",{className:"panel-heading",children:[o("div",{children:[o("span",{className:"eyebrow",children:"Directory"}),o("h2",{children:"Companies"})]}),o("span",{children:t.length===0?"No companies yet":`${t.length} available`})]}),o("div",{className:"company-list",children:[t.map(d=>o("button",{className:["company-card",e?.company.id===d.id?"company-card--active":""].filter(Boolean).join(" "),onClick:()=>{_(d.id)},type:"button",children:[o("strong",{children:d.name}),o("span",{children:d.id}),o("small",{children:[d.board.length," board members"]})]},d.id)),t.length===0&&o("p",{className:"muted-copy",children:"Create the first company to seed the directory and bootstrap the admin session."})]})]}),o(T,{className:"stack-panel",children:[o("div",{className:"panel-heading",children:[o("div",{children:[o("span",{className:"eyebrow",children:"Preview"}),o("h2",{children:e?.company.name??"No company selected"})]}),e&&o("span",{children:e.company.id})]}),e?o(J,{children:[o("div",{className:"stats-grid stats-grid--dense",children:[o("div",{className:"stat-block",children:[o("strong",{children:e.boardMembers.length}),o("span",{children:"board members"})]}),o("div",{className:"stat-block",children:[o("strong",{children:e.employees.length}),o("span",{children:"employees"})]}),o("div",{className:"stat-block",children:[o("strong",{children:e.roles.length}),o("span",{children:"roles"})]})]}),o("div",{className:"preview-columns",children:[o("div",{className:"preview-column",children:[o("h3",{children:"Board"}),o("div",{className:"pill-list",children:e.boardMembers.map(d=>o("span",{className:"pill",children:d.name},d.id))})]}),o("div",{className:"preview-column",children:[o("h3",{children:"Roles"}),o("div",{className:"role-grid",children:e.roles.map(d=>o("div",{className:"role-card role-card--compact",children:[o("strong",{children:d.id}),o("div",{className:"pill-list",children:d.permissions.map(b=>o("span",{className:"pill pill--accent",children:b},b))})]},d.id))})]})]}),o("div",{className:"employee-list employee-list--preview",children:e.employees.map(d=>o("div",{className:"employee-card employee-card--preview",children:[o("div",{className:"employee-card__summary",children:[o("div",{children:[o("strong",{children:d.name}),o("span",{children:d.id})]}),o("span",{children:d.role})]}),o("p",{className:"muted-copy",children:["Reports to ",d.managerName??"board"," and manages ",d.directReportCount," people."]})]},d.id))})]}):o("p",{className:"muted-copy",children:"Pick a company from the directory to inspect its public org data."})]})]}),o("div",{className:"content-grid__side",children:[o(T,{className:"stack-panel",children:[o("div",{className:"panel-heading",children:[o("div",{children:[o("span",{className:"eyebrow",children:"Bootstrap"}),o("h2",{children:"Create company"})]}),o("span",{children:"Returns an employee admin session"})]}),o("form",{className:"form-grid",onSubmit:d=>{d.preventDefault(),F()},children:[o("label",{className:"field",children:[o("span",{children:"Company id"}),o("input",{onInput:d=>m(b=>({...b,id:d.currentTarget.value})),placeholder:"acme",required:!0,value:u.id})]}),o("label",{className:"field",children:[o("span",{children:"Company name"}),o("input",{onInput:d=>m(b=>({...b,name:d.currentTarget.value})),placeholder:"Acme Corp",required:!0,value:u.name})]}),o("label",{className:"field",children:[o("span",{children:"Company password"}),o("input",{onInput:d=>m(b=>({...b,password:d.currentTarget.value})),required:!0,type:"password",value:u.password})]}),o("label",{className:"field",children:[o("span",{children:"Admin id"}),o("input",{onInput:d=>{let b=d.currentTarget.value;m(w=>({...w,admin:{...w.admin,id:b}}))},placeholder:"ceo-1",required:!0,value:u.admin.id})]}),o("label",{className:"field",children:[o("span",{children:"Admin name"}),o("input",{onInput:d=>{let b=d.currentTarget.value;m(w=>({...w,admin:{...w.admin,name:b}}))},placeholder:"Avery Stone",required:!0,value:u.admin.name})]}),o("label",{className:"field",children:[o("span",{children:"Admin role title"}),o("input",{onInput:d=>{let b=d.currentTarget.value;m(w=>({...w,admin:{...w.admin,role:b}}))},placeholder:"Chief Executive Officer",required:!0,value:u.admin.role})]}),o("label",{className:"field",children:[o("span",{children:"Admin password"}),o("input",{onInput:d=>{let b=d.currentTarget.value;m(w=>({...w,admin:{...w.admin,password:b}}))},required:!0,type:"password",value:u.admin.password})]}),o("button",{className:"button",type:"submit",children:"Create company"})]})]}),o(T,{className:"stack-panel",children:[o("div",{className:"panel-heading",children:[o("div",{children:[o("span",{className:"eyebrow",children:"Auth"}),o("h2",{children:"Employee login"})]}),o("span",{children:"Full mutation access depends on permissions"})]}),o("form",{className:"form-grid",onSubmit:d=>{d.preventDefault(),p({employee_id:P.trim(),password:E})},children:[o("label",{className:"field",children:[o("span",{children:"Employee id"}),o("input",{onInput:d=>I(d.currentTarget.value),required:!0,value:P})]}),o("label",{className:"field",children:[o("span",{children:"Password"}),o("input",{onInput:d=>C(d.currentTarget.value),required:!0,type:"password",value:E})]}),o("button",{className:"button",type:"submit",children:"Sign in as employee"})]})]}),o(T,{className:"stack-panel",children:[o("div",{className:"panel-heading",children:[o("div",{children:[o("span",{className:"eyebrow",children:"Auth"}),o("h2",{children:"Company login"})]}),o("span",{children:"Useful for read-only company sessions"})]}),o("form",{className:"form-grid",onSubmit:d=>{d.preventDefault(),a({company_id:R.trim(),password:M})},children:[o("label",{className:"field",children:[o("span",{children:"Company id"}),o("input",{onInput:d=>D(d.currentTarget.value),required:!0,value:R})]}),o("label",{className:"field",children:[o("span",{children:"Password"}),o("input",{onInput:d=>V(d.currentTarget.value),required:!0,type:"password",value:M})]}),o("button",{className:"button button--secondary",type:"submit",children:"Sign in as company"})]})]})]})]})]})}var ao=["invite","manage","assign","revoke","remove","update"];function pe(n,e){return n.includes(e)}function Ee(n){return n??""}function Ko({canAssign:n,canManage:e,canRemove:t,canUpdateOthers:r,currentEmployeeId:i,employee:a,employees:p,onAssignRole:c,onChangeManager:f,onRemove:l,onRevokeRole:_,onUpdate:s,roles:u}){let[m,P]=x(a.name),[I,E]=x(a.role),[C,R]=x(""),[D,M]=x(Ee(a.reports)),[V,F]=x(""),[d,b]=x(null);ne(()=>{P(a.name),E(a.role),R(""),M(Ee(a.reports)),F(""),b(null)},[a.id,a.name,a.reports,a.role,a.roles.join(",")]);let U=i===a.id||r,L=n&&i!==a.id,z=n&&i!==a.id,A=p.filter(h=>h.id!==a.id),ae=u.filter(h=>!a.roles.includes(h));return o("div",{className:"employee-card",children:[o("div",{className:"employee-card__summary",children:[o("div",{children:[o("strong",{children:a.name}),o("span",{children:a.id})]}),o("span",{children:a.role})]}),o("div",{className:"employee-card__meta",children:[o("span",{children:["Reports to ",a.managerName??"board"]}),o("span",{children:[a.directReportCount," direct reports"]}),o("span",{children:a.isBoardMember?"Board":`Level ${a.level+1}`})]}),o("div",{className:"pill-list",children:[a.roles.length===0&&o("span",{className:"pill",children:"no assigned roles"}),a.roles.map(h=>o("span",{className:"pill",children:[h,z&&o("button",{className:"pill__action",onClick:()=>{_(a.id,h)},type:"button",children:"remove"})]},h))]}),o("div",{className:"pill-list",children:[a.permissions.length===0&&o("span",{className:"pill pill--muted",children:"no effective permissions"}),a.permissions.map(h=>o("span",{className:"pill pill--accent",children:h},h))]}),d&&o("p",{className:"muted-copy",children:d}),o("div",{className:"employee-card__forms",children:[o("form",{className:"mini-form",onSubmit:h=>{h.preventDefault();let O={},B=m.trim(),Y=I.trim();if(B!==a.name&&(O.name=B),Y!==a.role&&(O.role=Y),C.trim()&&(O.password=C),!U){b("You cannot update this employee.");return}if(Object.keys(O).length===0){b("No employee changes to save.");return}b(null),s(a.id,O).then(()=>{R(""),b("Employee updated.")}).catch(()=>{})},children:[o("label",{className:"field",children:[o("span",{children:"Name"}),o("input",{disabled:!U,onInput:h=>P(h.currentTarget.value),value:m})]}),o("label",{className:"field",children:[o("span",{children:"Role title"}),o("input",{disabled:!U,onInput:h=>E(h.currentTarget.value),value:I})]}),o("label",{className:"field",children:[o("span",{children:"New password"}),o("input",{disabled:!U,onInput:h=>R(h.currentTarget.value),placeholder:"Leave blank to keep current",type:"password",value:C})]}),o("button",{className:"button button--secondary",disabled:!U,type:"submit",children:"Save employee"})]}),o("form",{className:"mini-form",onSubmit:h=>{if(h.preventDefault(),!e){b("You do not have manage permission.");return}if(D===Ee(a.reports)){b("Manager did not change.");return}b(null),f(a.id,D||null).then(()=>{b("Reporting line updated.")}).catch(()=>{})},children:[o("label",{className:"field",children:[o("span",{children:"Manager"}),o("select",{disabled:!e,onInput:h=>M(h.currentTarget.value),value:D,children:[o("option",{value:"",children:"Board / none"}),A.map(h=>o("option",{value:h.id,children:[h.name," (",h.id,")"]},h.id))]})]}),o("button",{className:"button button--secondary",disabled:!e,type:"submit",children:"Update manager"})]}),o("form",{className:"mini-form",onSubmit:h=>{if(h.preventDefault(),!L){b("You cannot assign roles to this employee.");return}if(!V){b("Pick a role to assign.");return}b(null),c(a.id,V).then(()=>{F(""),b("Role assigned.")}).catch(()=>{})},children:[o("label",{className:"field",children:[o("span",{children:"Assign role"}),o("select",{disabled:!L,onInput:h=>F(h.currentTarget.value),value:V,children:[o("option",{value:"",children:"Select role"}),ae.map(h=>o("option",{value:h,children:h},h))]})]}),o("button",{className:"button button--secondary",disabled:!L,type:"submit",children:"Assign role"})]})]}),o("button",{className:"button button--danger",disabled:!t||i===a.id,onClick:()=>{!t||i===a.id||window.confirm(`Remove ${a.name} from ${a.company_id}?`)&&l(a.id)},type:"button",children:"Remove employee"})]})}function ro(){let{actionError:n,activeCompany:e,currentEmployeeId:t,isEmployeeSession:r,logout:i,pageError:a,pendingAction:p,permissions:c,refreshWorkspace:f,removeEmployee:l,revokeRole:_,session:s,updateCompany:u,updateEmployee:m,assignRole:P,changeManager:I,createEmployee:E,createRole:C,workspaceStatus:R}=ee(),[D,M]=x(e?.company.name??""),[V,F]=x(""),[d,b]=x(""),[w,U]=x([]),[L,z]=x({company_id:e?.company.id??"",id:"",name:"",password:"",reports:null,role:""});if(ne(()=>{M(e?.company.name??""),F(""),z({company_id:e?.company.id??"",id:"",name:"",password:"",reports:null,role:""})},[e?.company.id,e?.company.name]),!s||!e)return o(T,{className:"notice-panel",children:[o("strong",{children:"No active session"}),o("p",{children:"Sign in to load the authenticated workspace."})]});let A=r&&pe(c,"invite"),ae=r&&pe(c,"manage"),h=r&&pe(c,"assign"),O=r&&pe(c,"remove"),B=r&&pe(c,"update"),Y=r&&pe(c,"update"),ue=e.roles.map(g=>g.id),Te=g=>{U(S=>S.includes(g)?S.filter($=>$!==g):[...S,g])};return o("div",{className:"page-stack",children:[o("section",{className:"hero hero--workspace",children:[o("div",{className:"hero__copy",children:[o("span",{className:"eyebrow",children:[s.principal_type," session"]}),o("h1",{children:e.company.name}),o("p",{children:"Manage employees, reporting lines, roles, and company settings from one place. The API remains unchanged; this UI now consumes the existing v1 routes directly."}),o("div",{className:"hero__metrics",children:[o("div",{className:"metric-chip",children:[o("strong",{children:e.employees.length}),o("span",{children:"employees"})]}),o("div",{className:"metric-chip",children:[o("strong",{children:e.boardMembers.length}),o("span",{children:"board"})]}),o("div",{className:"metric-chip",children:[o("strong",{children:e.roles.length}),o("span",{children:"roles"})]})]})]}),o(T,{className:"hero-panel hero-panel--status",children:[o("span",{className:"eyebrow",children:"Session"}),o("h2",{children:s.company_id}),o("div",{className:"status-list",children:[o("div",{className:"status-row",children:[o("span",{children:"Workspace"}),o("strong",{children:R})]}),o("div",{className:"status-row",children:[o("span",{children:"Principal"}),o("strong",{children:s.principal_type})]}),o("div",{className:"status-row",children:[o("span",{children:"Current action"}),o("strong",{children:p??"idle"})]})]}),o("div",{className:"hero-panel__actions",children:[o("button",{className:"button button--secondary",onClick:()=>void f(),type:"button",children:"Refresh"}),o("button",{className:"button",onClick:()=>void i(),type:"button",children:"Logout"})]})]})]}),(a||n)&&o(T,{className:"notice-panel notice-panel--error",children:[o("strong",{children:"Request issue"}),o("p",{children:n??a})]}),o(T,{className:"stack-panel",children:[o("div",{className:"panel-heading",children:[o("div",{children:[o("span",{className:"eyebrow",children:"Access"}),o("h2",{children:"Effective permissions"})]}),o("span",{children:t??s.company_id})]}),o("div",{className:"pill-list",children:[c.length===0&&o("span",{className:"pill pill--muted",children:"read-only session"}),c.map(g=>o("span",{className:"pill pill--accent",children:g},g))]}),!r&&o("p",{className:"muted-copy",children:"Company sessions can browse the workspace and use `/auth/me` plus logout, but mutations require an employee session with the relevant permissions."})]}),o("div",{className:"workspace-grid",children:[o(T,{className:"stack-panel",children:[o("div",{className:"panel-heading",children:[o("div",{children:[o("span",{className:"eyebrow",children:"Company"}),o("h2",{children:"Settings"})]}),o("span",{children:e.company.id})]}),o("form",{className:"form-grid",onSubmit:g=>{g.preventDefault();let S={},$=D.trim();$&&$!==e.company.name&&(S.name=$),V.trim()&&(S.password=V),Y&&Object.keys(S).length!==0&&u(S).then(()=>{F("")}).catch(()=>{})},children:[o("label",{className:"field",children:[o("span",{children:"Company name"}),o("input",{disabled:!Y,onInput:g=>M(g.currentTarget.value),value:D})]}),o("label",{className:"field",children:[o("span",{children:"Rotate company password"}),o("input",{disabled:!Y,onInput:g=>F(g.currentTarget.value),placeholder:"New company password",type:"password",value:V})]}),o("button",{className:"button button--secondary",disabled:!Y,type:"submit",children:"Save company"})]})]}),o(T,{className:"stack-panel",children:[o("div",{className:"panel-heading",children:[o("div",{children:[o("span",{className:"eyebrow",children:"Hierarchy"}),o("h2",{children:"Board"})]}),o("span",{children:[e.boardMembers.length," members"]})]}),o("div",{className:"employee-list employee-list--preview",children:e.boardMembers.map(g=>o("div",{className:"employee-card employee-card--preview",children:[o("div",{className:"employee-card__summary",children:[o("div",{children:[o("strong",{children:g.name}),o("span",{children:g.id})]}),o("span",{children:g.role})]}),o("p",{className:"muted-copy",children:[g.directReportCount," direct reports and ",g.roles.length," assigned roles."]})]},g.id))})]})]}),o("div",{className:"workspace-grid",children:[o(T,{className:"stack-panel",children:[o("div",{className:"panel-heading",children:[o("div",{children:[o("span",{className:"eyebrow",children:"Roles"}),o("h2",{children:"Role registry"})]}),o("span",{children:[e.roles.length," roles"]})]}),o("div",{className:"role-grid",children:e.roles.map(g=>o("div",{className:"role-card",children:[o("strong",{children:g.id}),o("div",{className:"pill-list",children:g.permissions.map(S=>o("span",{className:"pill pill--accent",children:S},S))})]},g.id))}),o("form",{className:"form-grid",onSubmit:g=>{g.preventDefault(),!(!h||!d.trim())&&C({id:d.trim(),permissions:w}).then(()=>{b(""),U([])}).catch(()=>{})},children:[o("label",{className:"field",children:[o("span",{children:"Role id"}),o("input",{disabled:!h,onInput:g=>b(g.currentTarget.value),placeholder:"ops-manager",value:d})]}),o("div",{className:"field field--full",children:[o("span",{children:"Permissions"}),o("div",{className:"checkbox-grid",children:ao.map(g=>o("label",{className:"checkbox",children:[o("input",{checked:w.includes(g),disabled:!h,onInput:()=>Te(g),type:"checkbox"}),o("span",{children:g})]},g))})]}),o("button",{className:"button button--secondary",disabled:!h,type:"submit",children:"Save role"})]})]}),o(T,{className:"stack-panel",children:[o("div",{className:"panel-heading",children:[o("div",{children:[o("span",{className:"eyebrow",children:"Hiring"}),o("h2",{children:"Add employee"})]}),o("span",{children:"Invite permission required"})]}),o("form",{className:"form-grid",onSubmit:g=>{g.preventDefault(),A&&E({...L,company_id:e.company.id,id:L.id.trim(),name:L.name.trim(),reports:L.reports||null,role:L.role.trim()}).then(()=>{z({company_id:e.company.id,id:"",name:"",password:"",reports:null,role:""})}).catch(()=>{})},children:[o("label",{className:"field",children:[o("span",{children:"Employee id"}),o("input",{disabled:!A,onInput:g=>z(S=>({...S,id:g.currentTarget.value})),required:!0,value:L.id})]}),o("label",{className:"field",children:[o("span",{children:"Name"}),o("input",{disabled:!A,onInput:g=>z(S=>({...S,name:g.currentTarget.value})),required:!0,value:L.name})]}),o("label",{className:"field",children:[o("span",{children:"Role title"}),o("input",{disabled:!A,onInput:g=>z(S=>({...S,role:g.currentTarget.value})),required:!0,value:L.role})]}),o("label",{className:"field",children:[o("span",{children:"Password"}),o("input",{disabled:!A,onInput:g=>z(S=>({...S,password:g.currentTarget.value})),required:!0,type:"password",value:L.password})]}),o("label",{className:"field",children:[o("span",{children:"Manager"}),o("select",{disabled:!A,onInput:g=>{let S=g.currentTarget.value;z($=>({...$,reports:S||null}))},value:Ee(L.reports),children:[o("option",{value:"",children:"Board / none"}),e.employees.map(g=>o("option",{value:g.id,children:[g.name," (",g.id,")"]},g.id))]})]}),o("button",{className:"button button--secondary",disabled:!A,type:"submit",children:"Add employee"})]})]})]}),o(T,{className:"stack-panel",children:[o("div",{className:"panel-heading",children:[o("div",{children:[o("span",{className:"eyebrow",children:"Employees"}),o("h2",{children:"Org roster"})]}),o("span",{children:[e.employees.length," people"]})]}),o("div",{className:"employee-list",children:e.employees.map(g=>o(Ko,{canAssign:h,canManage:ae,canRemove:O,canUpdateOthers:B,currentEmployeeId:t,employee:g,employees:e.employees,onAssignRole:async(S,$)=>{ue.includes($)&&await P(S,{role_id:$})},onChangeManager:async(S,$)=>{await I(S,{reports:$})},onRemove:l,onRevokeRole:_,onUpdate:m,roles:ue},g.id))})]})]})}function so(){let{bootstrapStatus:n,isAuthenticated:e}=ee();return n==="loading"?o("section",{className:"boot-panel",children:[o("span",{className:"eyebrow",children:"Booting"}),o("h1",{children:"Loading company data and restoring session."}),o("p",{children:"The frontend is hydrating the directory, current company preview, and any persisted auth state."})]}):e?o(ro,{}):o(to,{})}function io(){return o(T,{className:"notes-panel",children:[o("span",{className:"eyebrow",children:"404"}),o("h1",{children:"Page not found."}),o("p",{children:"The current path does not match a registered route."}),o("div",{className:"hero__actions",children:o(Se,{href:"/",variant:"solid",children:"Back home"})})]})}var po=[{id:"home",label:"Workspace",path:"/",title:"Corp Ladder",description:"Company directory, auth flows, and org management UI for Corp Ladder."},{id:"about",label:"Guide",path:"/about",title:"Guide | Corp Ladder",description:"Frontend capability map for the current Corp Ladder backend v1 API."}];var Yo={about:kn,home:so},Xe=po.map(n=>({...n,view:Yo[n.id]})),Go={description:"The requested page could not be found.",id:"not-found",label:"Not found",path:"/404",title:"Not Found | Corp Ladder",view:io};function lo(n){return Xe.find(e=>e.path===n)??Go}function Ae(n){if(!n||n==="/")return"/";let e=n.replace(/\/+$/,"");return e.startsWith("/")?e:`/${e}`}function co(n){return!n.defaultPrevented&&n.button===0&&!n.metaKey&&!n.ctrlKey&&!n.shiftKey&&!n.altKey}var mo=Ce(null);function uo({children:n}){let[e,t]=x(()=>Ae(window.location.pathname));ne(()=>{let a=()=>{t(Ae(window.location.pathname))};return window.addEventListener("popstate",a),()=>window.removeEventListener("popstate",a)},[]);let r=a=>{let p=Ae(a);p!==e&&(window.history.pushState({},"",p),t(p))},i={currentPath:e,currentRoute:lo(e),navigate:r,routes:Xe};return o(mo.Provider,{value:i,children:n})}function qe(){let n=xe(mo);if(!n)throw new Error("useRouter must be used within RouterProvider.");return n}function Se({children:n,className:e,href:t,onClick:r,variant:i="ghost",...a}){let{currentPath:p,navigate:c}=qe(),f=p===t;return o("a",{...a,"aria-current":f?"page":void 0,className:["app-link",`app-link--${i}`,f?"is-active":"",e??""].filter(Boolean).join(" "),href:t,onClick:l=>{r?.(l),!(!co(l)||l.defaultPrevented)&&(l.preventDefault(),c(t))},children:n})}function Xo(){let{currentRoute:n,routes:e}=qe(),{isAuthenticated:t,pendingAction:r,session:i}=ee(),a=n.view,p=i?i.principal_type==="employee"?`${i.employee.name} \xB7 ${i.company_id}`:`${i.company.name} \xB7 ${i.company_id}`:"public access";return o("div",{className:"app-shell",children:[o("header",{className:"topbar",children:[o("div",{className:"brand-block",children:[o("strong",{children:X.name}),o("span",{children:t?p:X.summary})]}),o("div",{className:"topbar__meta",children:[o("span",{className:"topbar__status",children:r??p}),o("nav",{"aria-label":"Primary",children:e.map(c=>o(Se,{href:c.path,children:c.label},c.id))})]})]}),o("main",{className:"app-content",children:o(a,{})})]})}function go(){return o(uo,{children:o(no,{children:o(Xo,{})})})}function _o(){return`
    :root {
      --bg: #f3efe8;
      --bg-soft: rgba(255, 255, 255, 0.58);
      --panel: rgba(255, 251, 246, 0.88);
      --panel-strong: rgba(16, 23, 29, 0.92);
      --ink: #102029;
      --ink-soft: #566670;
      --ink-inverse: #f7f1e7;
      --line: rgba(16, 32, 41, 0.12);
      --line-strong: rgba(16, 32, 41, 0.22);
      --accent: #bd5b2f;
      --accent-strong: #7d3312;
      --accent-soft: rgba(189, 91, 47, 0.14);
      --danger: #a7312b;
      --shadow: 0 24px 60px rgba(35, 39, 45, 0.14);
      color: var(--ink);
      font-family: "Avenir Next", "Segoe UI", sans-serif;
      line-height: 1.5;
    }

    * {
      box-sizing: border-box;
    }

    html {
      background:
        radial-gradient(circle at top left, rgba(189, 91, 47, 0.12), transparent 26%),
        radial-gradient(circle at right 30%, rgba(25, 49, 63, 0.1), transparent 22%),
        linear-gradient(180deg, #f8f3ec 0%, #ece3d7 100%);
    }

    body {
      margin: 0;
      min-height: 100vh;
      color: var(--ink);
      background: transparent;
    }

    body, button, input, select, textarea {
      font: inherit;
    }

    button, input, select, textarea {
      border-radius: 16px;
    }

    button {
      cursor: pointer;
    }

    a {
      color: inherit;
    }

    #app {
      min-height: 100vh;
    }

    .app-shell {
      width: min(1220px, calc(100% - 28px));
      margin: 0 auto;
      padding: 24px 0 48px;
    }

    .topbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 18px;
      margin-bottom: 24px;
      padding: 18px 20px;
      border: 1px solid var(--line);
      border-radius: 28px;
      background: rgba(255, 249, 241, 0.72);
      backdrop-filter: blur(18px);
      box-shadow: 0 12px 30px rgba(80, 68, 53, 0.08);
    }

    .brand-block {
      display: grid;
      gap: 4px;
    }

    .brand-block strong {
      font-size: 1rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }

    .brand-block span,
    .topbar__status,
    .muted-copy {
      color: var(--ink-soft);
    }

    .topbar__meta {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
      justify-content: flex-end;
    }

    .topbar nav,
    .hero__actions,
    .hero-panel__actions,
    .pill-list {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      align-items: center;
    }

    .app-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 42px;
      padding: 0 16px;
      border: 1px solid transparent;
      border-radius: 999px;
      text-decoration: none;
      font-size: 0.95rem;
      font-weight: 600;
      transition: transform 140ms ease, border-color 140ms ease, background-color 140ms ease;
    }

    .app-link:hover,
    .button:hover,
    .company-card:hover {
      transform: translateY(-1px);
    }

    .app-link--ghost {
      background: rgba(255, 255, 255, 0.42);
      border-color: rgba(16, 32, 41, 0.08);
    }

    .app-link--solid,
    .button {
      background: linear-gradient(135deg, var(--accent) 0%, var(--accent-strong) 100%);
      border-color: rgba(125, 51, 18, 0.4);
      color: #fff4ea;
    }

    .app-link.is-active {
      background: var(--accent-soft);
      border-color: rgba(189, 91, 47, 0.28);
    }

    .app-content,
    .page-stack,
    .content-grid__main,
    .content-grid__side,
    .stack-panel,
    .form-grid,
    .field,
    .guide-list,
    .employee-list,
    .employee-card,
    .employee-card__forms,
    .mini-form,
    .preview-column,
    .role-grid {
      display: grid;
      gap: 18px;
    }

    .surface {
      border: 1px solid var(--line);
      border-radius: 28px;
      padding: 22px;
      background: var(--panel);
      box-shadow: var(--shadow);
    }

    .boot-panel,
    .notes-panel {
      display: grid;
      gap: 14px;
      padding: 28px;
      border: 1px solid var(--line);
      border-radius: 28px;
      background: var(--panel);
      box-shadow: var(--shadow);
    }

    .hero,
    .about-hero {
      display: grid;
      gap: 20px;
    }

    .hero {
      grid-template-columns: minmax(0, 1.3fr) minmax(320px, 0.9fr);
      align-items: stretch;
    }

    .hero__copy,
    .hero-panel {
      display: grid;
      gap: 18px;
    }

    .hero__copy h1,
    .about-hero h1,
    .boot-panel h1,
    .notes-panel h1 {
      margin: 0;
      font-family: "Iowan Old Style", "Palatino Linotype", serif;
      font-size: clamp(2.4rem, 5vw, 4.8rem);
      line-height: 0.95;
      font-weight: 700;
    }

    .hero-panel h2,
    .panel-heading h2,
    .notes-panel h2 {
      margin: 0;
      font-size: clamp(1.35rem, 2vw, 2rem);
      line-height: 1.04;
    }

    .hero__copy p,
    .hero-panel p,
    .about-hero p,
    .notes-panel p,
    .employee-card p {
      margin: 0;
      color: var(--ink-soft);
    }

    .hero-panel {
      padding: 24px;
      border-radius: 30px;
      background:
        linear-gradient(160deg, rgba(255, 247, 236, 0.94) 0%, rgba(233, 219, 203, 0.9) 100%),
        linear-gradient(135deg, rgba(189, 91, 47, 0.12), transparent 55%);
      border: 1px solid rgba(16, 32, 41, 0.08);
      box-shadow: var(--shadow);
    }

    .hero-panel--status {
      align-content: space-between;
    }

    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: var(--accent-strong);
      font-size: 0.76rem;
      font-weight: 800;
      letter-spacing: 0.18em;
      text-transform: uppercase;
    }

    .hero__metrics,
    .stats-grid,
    .preview-columns,
    .workspace-grid,
    .content-grid,
    .status-list,
    .checkbox-grid {
      display: grid;
      gap: 14px;
    }

    .hero__metrics {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .metric-chip,
    .stat-block {
      display: grid;
      gap: 4px;
      padding: 16px 18px;
      border: 1px solid rgba(16, 32, 41, 0.08);
      border-radius: 20px;
      background: rgba(255, 255, 255, 0.46);
    }

    .metric-chip strong,
    .stat-block strong {
      font-size: 1.45rem;
      line-height: 1;
    }

    .metric-chip span,
    .stat-block span,
    .status-row span,
    .panel-heading span,
    .employee-card__meta span,
    .employee-card__summary span,
    .guide-row p,
    .company-card span,
    .company-card small {
      color: var(--ink-soft);
    }

    .status-list {
      border-top: 1px solid rgba(16, 32, 41, 0.08);
      padding-top: 12px;
    }

    .status-row,
    .panel-heading,
    .employee-card__summary,
    .employee-card__meta {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 12px;
      flex-wrap: wrap;
    }

    .status-row strong {
      text-transform: capitalize;
    }

    .notice-panel {
      display: grid;
      gap: 8px;
    }

    .notice-panel--error {
      border-color: rgba(167, 49, 43, 0.24);
      background: rgba(167, 49, 43, 0.06);
    }

    .content-grid {
      grid-template-columns: minmax(0, 1.3fr) minmax(320px, 0.9fr);
      align-items: start;
    }

    .workspace-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      align-items: start;
    }

    .panel-heading {
      padding-bottom: 12px;
      border-bottom: 1px solid var(--line);
    }

    .company-list {
      display: grid;
      gap: 12px;
    }

    .company-card {
      width: 100%;
      display: grid;
      gap: 4px;
      padding: 16px 18px;
      text-align: left;
      border: 1px solid var(--line);
      border-radius: 22px;
      background: rgba(255, 255, 255, 0.54);
      transition: transform 140ms ease, border-color 140ms ease, background-color 140ms ease;
    }

    .company-card--active {
      border-color: rgba(189, 91, 47, 0.34);
      background: rgba(189, 91, 47, 0.1);
    }

    .preview-columns {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .preview-column h3 {
      margin: 0;
      font-size: 1rem;
    }

    .role-grid {
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    }

    .role-card {
      display: grid;
      gap: 12px;
      padding: 16px;
      border: 1px solid var(--line);
      border-radius: 22px;
      background: rgba(255, 255, 255, 0.56);
    }

    .role-card--compact {
      padding: 14px;
    }

    .pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      min-height: 34px;
      padding: 0 12px;
      border: 1px solid rgba(16, 32, 41, 0.09);
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.7);
      font-size: 0.9rem;
    }

    .pill--accent {
      background: rgba(189, 91, 47, 0.1);
      border-color: rgba(189, 91, 47, 0.18);
    }

    .pill--muted {
      background: rgba(16, 32, 41, 0.06);
    }

    .pill__action {
      padding: 0;
      border: 0;
      background: transparent;
      color: var(--accent-strong);
      font-size: 0.82rem;
      font-weight: 700;
    }

    .field {
      gap: 8px;
    }

    .field span {
      font-size: 0.88rem;
      font-weight: 700;
    }

    .field input,
    .field select,
    .field textarea {
      width: 100%;
      min-height: 46px;
      padding: 0 14px;
      border: 1px solid var(--line-strong);
      background: rgba(255, 255, 255, 0.78);
      color: var(--ink);
      outline: none;
    }

    .field textarea {
      min-height: 110px;
      padding: 14px;
      resize: vertical;
    }

    .field input:focus,
    .field select:focus,
    .field textarea:focus {
      border-color: rgba(189, 91, 47, 0.42);
      box-shadow: 0 0 0 4px rgba(189, 91, 47, 0.12);
    }

    .field input:disabled,
    .field select:disabled,
    .button:disabled {
      cursor: not-allowed;
      opacity: 0.62;
    }

    .field--full {
      grid-column: 1 / -1;
    }

    .form-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .mini-form {
      padding: 16px;
      border: 1px solid var(--line);
      border-radius: 22px;
      background: rgba(255, 255, 255, 0.45);
    }

    .button {
      min-height: 46px;
      padding: 0 16px;
      border: 1px solid transparent;
      font-weight: 700;
      transition: transform 140ms ease, opacity 140ms ease;
    }

    .button--secondary {
      background: rgba(255, 255, 255, 0.72);
      border-color: rgba(16, 32, 41, 0.1);
      color: var(--ink);
    }

    .button--danger {
      background: rgba(167, 49, 43, 0.08);
      border-color: rgba(167, 49, 43, 0.18);
      color: var(--danger);
    }

    .employee-list {
      grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
    }

    .employee-list--preview {
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    }

    .employee-card {
      padding: 18px;
      border: 1px solid var(--line);
      border-radius: 24px;
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.65) 0%, rgba(246, 239, 229, 0.68) 100%);
    }

    .employee-card--preview {
      gap: 12px;
    }

    .employee-card__summary strong,
    .guide-row strong,
    .company-card strong,
    .role-card strong {
      font-size: 1rem;
    }

    .employee-card__forms {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .checkbox-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .checkbox {
      display: flex;
      align-items: center;
      gap: 10px;
      min-height: 44px;
      padding: 10px 12px;
      border: 1px solid var(--line);
      border-radius: 18px;
      background: rgba(255, 255, 255, 0.52);
    }

    .checkbox input {
      width: 16px;
      height: 16px;
      margin: 0;
    }

    .guide-row {
      display: grid;
      gap: 4px;
      padding-bottom: 14px;
      border-bottom: 1px solid var(--line);
    }

    .guide-row:last-child {
      padding-bottom: 0;
      border-bottom: 0;
    }

    @media (max-width: 1080px) {
      .hero,
      .content-grid,
      .workspace-grid,
      .preview-columns {
        grid-template-columns: 1fr;
      }

      .employee-card__forms {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 820px) {
      .app-shell {
        width: min(100%, calc(100% - 20px));
        padding-top: 16px;
      }

      .topbar,
      .panel-heading,
      .employee-card__summary,
      .employee-card__meta,
      .status-row {
        flex-direction: column;
        align-items: flex-start;
      }

      .form-grid,
      .hero__metrics,
      .checkbox-grid {
        grid-template-columns: 1fr;
      }

      .surface,
      .boot-panel,
      .notes-panel,
      .hero-panel {
        padding: 18px;
        border-radius: 24px;
      }
    }
  `}var fo="app-styles";function yo(){if(document.getElementById(fo))return;let n=document.createElement("style");n.id=fo,n.textContent=_o(),document.head.appendChild(n)}var vo=document.getElementById("app");if(!vo)throw new Error("Missing #app mount node.");yo();un(o(go,{}),vo);
