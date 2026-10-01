var la=Object.defineProperty;var ca=(r,t,e)=>t in r?la(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var R=(r,t,e)=>ca(r,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function e(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=e(s);fetch(s.href,a)}})();var fs="1.3.26";function Hs(r,t,e){return Math.max(r,Math.min(t,e))}function da(r,t,e){return(1-e)*r+e*t}function ua(r,t,e,i){return da(r,t,1-Math.exp(-e*i))}function ha(r,t){return(r%t+t)%t}var pa=class{constructor(){R(this,"isRunning",!1);R(this,"value",0);R(this,"from",0);R(this,"to",0);R(this,"currentTime",0);R(this,"lerp");R(this,"duration");R(this,"easing");R(this,"onUpdate")}advance(r){var e;if(!this.isRunning)return;let t=!1;if(this.duration&&this.easing){this.currentTime+=r;const i=Hs(0,this.currentTime/this.duration,1);t=i>=1;const s=t?1:this.easing(i);this.value=this.from+(this.to-this.from)*s}else this.lerp?(this.value=ua(this.value,this.to,this.lerp*60,r),Math.round(this.value)===Math.round(this.to)&&(this.value=this.to,t=!0)):(this.value=this.to,t=!0);t&&this.stop(),(e=this.onUpdate)==null||e.call(this,this.value,t)}stop(){this.isRunning=!1}fromTo(r,t,{lerp:e,duration:i,easing:s,onStart:a,onUpdate:n}){this.from=this.value=r,this.to=t,this.lerp=e,this.duration=i,this.easing=s,this.currentTime=0,this.isRunning=!0,a==null||a(),this.onUpdate=n}};function fa(r,t){let e;return function(...i){clearTimeout(e),e=setTimeout(()=>{e=void 0,r.apply(this,i)},t)}}var ma=class{constructor(r,t,{autoResize:e=!0,debounce:i=250}={}){R(this,"width",0);R(this,"height",0);R(this,"scrollHeight",0);R(this,"scrollWidth",0);R(this,"debouncedResize");R(this,"wrapperResizeObserver");R(this,"contentResizeObserver");R(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});R(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});R(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=r,this.content=t,e&&(this.debouncedResize=fa(this.resize,i),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){var r,t;(r=this.wrapperResizeObserver)==null||r.disconnect(),(t=this.contentResizeObserver)==null||t.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},zs=class{constructor(){R(this,"events",{})}emit(r,...t){var i;const e=this.events[r]||[];for(let s=0,a=e.length;s<a;s++)(i=e[s])==null||i.call(e,...t)}on(r,t){return this.events[r]?this.events[r].push(t):this.events[r]=[t],()=>{var e;this.events[r]=(e=this.events[r])==null?void 0:e.filter(i=>t!==i)}}off(r,t){var e;this.events[r]=(e=this.events[r])==null?void 0:e.filter(i=>t!==i)}destroy(){this.events={}}};const va=100/6,Qt={passive:!1};function ms(r,t){return r===1?va:r===2?t:1}var ga=class{constructor(r,t={wheelMultiplier:1,touchMultiplier:1}){R(this,"touchStart",{x:0,y:0});R(this,"lastDelta",{x:0,y:0});R(this,"window",{width:0,height:0});R(this,"emitter",new zs);R(this,"onTouchStart",r=>{const{clientX:t,clientY:e}=r.targetTouches?r.targetTouches[0]:r;this.touchStart.x=t,this.touchStart.y=e,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:r})});R(this,"onTouchMove",r=>{const{clientX:t,clientY:e}=r.targetTouches?r.targetTouches[0]:r,i=-(t-this.touchStart.x)*this.options.touchMultiplier,s=-(e-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=t,this.touchStart.y=e,this.lastDelta={x:i,y:s},this.emitter.emit("scroll",{deltaX:i,deltaY:s,event:r})});R(this,"onTouchEnd",r=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:r})});R(this,"onWheel",r=>{let{deltaX:t,deltaY:e,deltaMode:i}=r;const s=ms(i,this.window.width),a=ms(i,this.window.height);t*=s,e*=a,t*=this.options.wheelMultiplier,e*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:t,deltaY:e,event:r})});R(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=r,this.options=t,window.addEventListener("resize",this.onWindowResize),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,Qt),this.element.addEventListener("touchstart",this.onTouchStart,Qt),this.element.addEventListener("touchmove",this.onTouchMove,Qt),this.element.addEventListener("touchend",this.onTouchEnd,Qt)}on(r,t){return this.emitter.on(r,t)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize),this.element.removeEventListener("wheel",this.onWheel,Qt),this.element.removeEventListener("touchstart",this.onTouchStart,Qt),this.element.removeEventListener("touchmove",this.onTouchMove,Qt),this.element.removeEventListener("touchend",this.onTouchEnd,Qt)}};const vs=r=>Math.min(1,1.001-2**(-10*r));var ba=class{constructor({wrapper:r=window,content:t=document.documentElement,eventsTarget:e=r,smoothWheel:i=!0,syncTouch:s=!1,syncTouchLerp:a=.075,touchInertiaExponent:n=1.7,duration:o,easing:c,lerp:l=.1,infinite:d=!1,orientation:u="vertical",gestureOrientation:p=u==="horizontal"?"both":"vertical",touchMultiplier:m=1,wheelMultiplier:v=1,autoResize:h=!0,prevent:g,virtualScroll:_,overscroll:S=!0,autoRaf:T=!1,anchors:x=!1,autoToggle:k=!1,allowNestedScroll:E=!1,__experimental__naiveDimensions:C=!1,naiveDimensions:w=C,stopInertiaOnNavigate:b=!1,respectReducedMotion:M=!0}={}){R(this,"_isScrolling",!1);R(this,"_isStopped",!1);R(this,"_isLocked",!1);R(this,"_preventNextNativeScrollEvent",!1);R(this,"_resetVelocityTimeout",null);R(this,"_rafId",null);R(this,"_isDraggingSelection",!1);R(this,"reducedMotionMediaQuery",window.matchMedia("(prefers-reduced-motion: reduce)"));R(this,"isTouching");R(this,"isIos");R(this,"time",0);R(this,"userData",{});R(this,"lastVelocity",0);R(this,"velocity",0);R(this,"direction",0);R(this,"options");R(this,"targetScroll");R(this,"animatedScroll");R(this,"animate",new pa);R(this,"emitter",new zs);R(this,"dimensions");R(this,"virtualScroll");R(this,"onScrollEnd",r=>{r instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&r.stopPropagation()});R(this,"dispatchScrollendEvent",()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))});R(this,"onTransitionEnd",r=>{var t;(t=r.propertyName)!=null&&t.includes("overflow")&&r.target===this.rootElement&&this.checkOverflow()});R(this,"onClick",r=>{const t=r.composedPath().filter(i=>i instanceof HTMLAnchorElement&&i.href).map(i=>new URL(i.href)),e=new URL(window.location.href);if(this.options.anchors){const i=t.find(s=>e.host===s.host&&e.pathname===s.pathname&&s.hash);if(i){const s=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0,a=decodeURIComponent(i.hash);this.scrollTo(a,s);return}}if(this.options.stopInertiaOnNavigate&&t.some(i=>e.host===i.host&&e.pathname!==i.pathname)){this.reset();return}});R(this,"onPointerDown",r=>{r.button===1&&this.reset()});R(this,"onVirtualScroll",r=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(r)===!1)return;const{deltaX:t,deltaY:e,event:i}=r;if(this.emitter.emit("virtual-scroll",{deltaX:t,deltaY:e,event:i}),i.ctrlKey||i.lenisStopPropagation)return;const s=i.type.includes("touch"),a=i.type.includes("wheel");if(s&&this.isIos&&(i.type==="touchstart"&&(this._isDraggingSelection=this.isTouchOnSelectionHandle(i)),this._isDraggingSelection)){i.type==="touchend"&&(this._isDraggingSelection=!1);return}this.isTouching=i.type==="touchstart"||i.type==="touchmove";const n=t===0&&e===0;if(this.options.syncTouch&&s&&i.type==="touchstart"&&n&&!this.isStopped&&!this.isLocked){this.reset();return}const o=this.options.gestureOrientation==="vertical"&&e===0||this.options.gestureOrientation==="horizontal"&&t===0;if(n||o)return;let c=i.composedPath();c=c.slice(0,c.indexOf(this.rootElement));const l=this.options.prevent,d=Math.abs(t)>=Math.abs(e)?"horizontal":"vertical";if(c.find(v=>{var h,g,_,S,T;return v instanceof HTMLElement&&(typeof l=="function"&&(l==null?void 0:l(v))||((h=v.hasAttribute)==null?void 0:h.call(v,"data-lenis-prevent"))||d==="vertical"&&((g=v.hasAttribute)==null?void 0:g.call(v,"data-lenis-prevent-vertical"))||d==="horizontal"&&((_=v.hasAttribute)==null?void 0:_.call(v,"data-lenis-prevent-horizontal"))||s&&((S=v.hasAttribute)==null?void 0:S.call(v,"data-lenis-prevent-touch"))||a&&((T=v.hasAttribute)==null?void 0:T.call(v,"data-lenis-prevent-wheel"))||this.options.allowNestedScroll&&this.hasNestedScroll(v,{deltaX:t,deltaY:e}))}))return;if(this.isStopped||this.isLocked){i.cancelable&&i.preventDefault();return}if(!(this.options.syncTouch&&s||this.options.smoothWheel&&a)){this.isScrolling="native",this.animate.stop(),i.lenisStopPropagation=!0;return}let u=e;this.options.gestureOrientation==="both"?u=Math.abs(e)>Math.abs(t)?e:t:this.options.gestureOrientation==="horizontal"&&(u=t),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&e>0||this.animatedScroll===this.limit&&e<0))&&(i.lenisStopPropagation=!0),i.cancelable&&i.preventDefault();const p=s&&this.options.syncTouch,m=s&&i.type==="touchend";m&&(u=Math.sign(u)*Math.abs(this.velocity)**this.options.touchInertiaExponent),this.scrollTo(this.targetScroll+u,{programmatic:!1,...p?{lerp:m?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});R(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const r=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-r,this.direction=Math.sign(this.animatedScroll-r),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});R(this,"raf",r=>{const t=r-(this.time||r);this.time=r,this.animate.advance(t*.001),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))});window.lenisVersion=fs,window.lenis||(window.lenis={}),window.lenis.version=fs,u==="horizontal"&&(window.lenis.horizontal=!0),s===!0&&(window.lenis.touch=!0),this.isIos=/(iPad|iPhone|iPod)/g.test(navigator.userAgent),(!r||r===document.documentElement)&&(r=window),typeof o=="number"&&typeof c!="function"?c=vs:typeof c=="function"&&typeof o!="number"&&(o=1),this.options={wrapper:r,content:t,eventsTarget:e,smoothWheel:i,syncTouch:s,syncTouchLerp:a,touchInertiaExponent:n,duration:o,easing:c,lerp:l,infinite:d,gestureOrientation:p,orientation:u,touchMultiplier:m,wheelMultiplier:v,autoResize:h,prevent:g,virtualScroll:_,overscroll:S,autoRaf:T,anchors:x,autoToggle:k,allowNestedScroll:E,naiveDimensions:w,stopInertiaOnNavigate:b,respectReducedMotion:M},this.dimensions=new ma(r,t,{autoResize:h}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.addEventListener("click",this.onClick),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown),this.virtualScroll=new ga(e,{touchMultiplier:m,wheelMultiplier:v}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&(this.checkOverflow(),this.rootElement.addEventListener("transitionend",this.onTransitionEnd)),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.removeEventListener("click",this.onClick),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this._rafId&&cancelAnimationFrame(this._rafId)}on(r,t){return this.emitter.on(r,t)}off(r,t){return this.emitter.off(r,t)}get overflow(){const r=this.isHorizontal?"overflow-x":"overflow-y";return getComputedStyle(this.rootElement)[r]}checkOverflow(){["hidden","clip"].includes(this.overflow)?this.internalStop():this.internalStart()}setScroll(r){this.isHorizontal?this.options.wrapper.scrollTo({left:r,behavior:"instant"}):this.options.wrapper.scrollTo({top:r,behavior:"instant"})}isTouchOnSelectionHandle(r){const t=window.getSelection();if(!t||t.isCollapsed||t.rangeCount===0)return!1;const e=r.targetTouches[0]??r.changedTouches[0];if(!e)return!1;const i=t.getRangeAt(0).getClientRects();if(i.length===0)return!1;const s=i[0],a=i[i.length-1],n=40,o=Math.hypot(e.clientX-s.left,e.clientY-s.top)<=n,c=Math.hypot(e.clientX-a.right,e.clientY-a.bottom)<=n;return o||c}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){if(this.isStopped){if(this.options.autoToggle){this.rootElement.style.removeProperty("overflow");return}this.internalStart()}}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){if(!this.isStopped){if(this.options.autoToggle){this.rootElement.style.setProperty("overflow","clip");return}this.internalStop()}}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}scrollTo(r,{offset:t=0,immediate:e=!1,lock:i=!1,programmatic:s=!0,lerp:a=s?this.options.lerp:void 0,duration:n=s?this.options.duration:void 0,easing:o=s?this.options.easing:void 0,onStart:c,onComplete:l,force:d=!1,userData:u}={}){if(this.prefersReducedMotion&&(s?e=!0:(a=1,n=void 0,o=void 0)),(this.isStopped||this.isLocked)&&!d)return;let p=r,m=t;if(typeof p=="string"&&["top","left","start","#"].includes(p))p=0;else if(typeof p=="string"&&["bottom","right","end"].includes(p))p=this.limit;else{let v=null;if(typeof p=="string"?(v=p.startsWith("#")?document.getElementById(p.slice(1)):document.querySelector(p),v||(p==="#top"?p=0:console.warn("Lenis: Target not found",p))):p instanceof HTMLElement&&(p!=null&&p.nodeType)&&(v=p),v){if(this.options.wrapper!==window){const x=this.rootElement.getBoundingClientRect();m-=this.isHorizontal?x.left:x.top}const h=v.getBoundingClientRect(),g=getComputedStyle(v),_=this.isHorizontal?Number.parseFloat(g.scrollMarginLeft):Number.parseFloat(g.scrollMarginTop),S=getComputedStyle(this.rootElement),T=this.isHorizontal?Number.parseFloat(S.scrollPaddingLeft):Number.parseFloat(S.scrollPaddingTop);p=(this.isHorizontal?h.left:h.top)+this.animatedScroll-(Number.isNaN(_)?0:_)-(Number.isNaN(T)?0:T)}}if(typeof p=="number"){if(p+=m,this.options.infinite){if(s){this.targetScroll=this.animatedScroll=this.scroll;const v=p-this.animatedScroll;v>this.limit/2?p-=this.limit:v<-this.limit/2&&(p+=this.limit)}}else p=Hs(0,p,this.limit);if(p===this.targetScroll){c==null||c(this),l==null||l(this);return}if(this.userData=u??{},e){this.animatedScroll=this.targetScroll=p,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),l==null||l(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}s||(this.targetScroll=p),typeof n=="number"&&typeof o!="function"?o=vs:typeof o=="function"&&typeof n!="number"&&(n=1),this.animate.fromTo(this.animatedScroll,p,{duration:n,easing:o,lerp:a,onStart:()=>{i&&(this.isLocked=!0),this.isScrolling="smooth",c==null||c(this)},onUpdate:(v,h)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=v-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=v,this.setScroll(this.scroll),s&&(this.targetScroll=v),h||this.emit(),h&&(this.reset(),this.emit(),l==null||l(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}hasNestedScroll(r,{deltaX:t,deltaY:e}){const i=Date.now();r._lenis||(r._lenis={});const s=r._lenis;let a,n,o,c,l,d,u,p,m,v;if(i-(s.time??0)>2e3){s.time=Date.now();const E=window.getComputedStyle(r);if(s.computedStyle=E,a=["auto","overlay","scroll"].includes(E.overflowX),n=["auto","overlay","scroll"].includes(E.overflowY),l=["auto"].includes(E.overscrollBehaviorX),d=["auto"].includes(E.overscrollBehaviorY),s.hasOverflowX=a,s.hasOverflowY=n,!(a||n))return!1;u=r.scrollWidth,p=r.scrollHeight,m=r.clientWidth,v=r.clientHeight,o=u>m,c=p>v,s.isScrollableX=o,s.isScrollableY=c,s.scrollWidth=u,s.scrollHeight=p,s.clientWidth=m,s.clientHeight=v,s.hasOverscrollBehaviorX=l,s.hasOverscrollBehaviorY=d}else o=s.isScrollableX,c=s.isScrollableY,a=s.hasOverflowX,n=s.hasOverflowY,u=s.scrollWidth,p=s.scrollHeight,m=s.clientWidth,v=s.clientHeight,l=s.hasOverscrollBehaviorX,d=s.hasOverscrollBehaviorY;if(!(a&&o||n&&c))return!1;const h=Math.abs(t)>=Math.abs(e)?"horizontal":"vertical";let g,_,S,T,x,k;if(h==="horizontal")g=Math.round(r.scrollLeft),_=u-m,S=t,T=a,x=o,k=l;else if(h==="vertical")g=Math.round(r.scrollTop),_=p-v,S=e,T=n,x=c,k=d;else return!1;return!k&&(g>=_||g<=0)?!0:(S>0?g<_:g>0)&&T&&x}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){const r=this.options.wrapper;return this.isHorizontal?r.scrollX??r.scrollLeft:r.scrollY??r.scrollTop}get scroll(){return this.options.infinite?ha(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(r){this._isScrolling!==r&&(this._isScrolling=r,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(r){this._isStopped!==r&&(this._isStopped=r,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(r){this._isLocked!==r&&(this._isLocked=r,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get prefersReducedMotion(){return this.options.respectReducedMotion&&this.reducedMotionMediaQuery.matches}get className(){let r="lenis";return this.options.autoToggle&&(r+=" lenis-autoToggle"),this.isStopped&&(r+=" lenis-stopped"),this.isLocked&&(r+=" lenis-locked"),this.isScrolling&&(r+=" lenis-scrolling"),this.isScrolling==="smooth"&&(r+=" lenis-smooth"),r}updateClassName(){this.cleanUpClassName(),this.className.split(" ").forEach(r=>{this.rootElement.classList.add(r)})}cleanUpClassName(){for(const r of Array.from(this.rootElement.classList))(r==="lenis"||r.startsWith("lenis-"))&&this.rootElement.classList.remove(r)}};const Pe=[{id:"user-customer-1",name:"Alex Commuter",email:"alex@parkora.com",role:"customer",avatar:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",roleBadge:"Customer",walletBalance:1250,vehicleNumber:"KA 01 AB 7890"},{id:"user-owner-1",name:"Sarah Jenkins",email:"sarah@parkora.com",role:"owner",avatar:"https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",roleBadge:"Parking Owner",walletBalance:1500,monthlyEarnings:14500,activeListingsCount:3},{id:"user-admin-1",name:"System Admin",email:"admin@parkora.com",role:"admin",avatar:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",roleBadge:"Administrator",walletBalance:2e3,permissions:"Full System Access"}],Fi="parkora_current_user_v3",Ws="parkora_wallets_v3",Vs="parkora_transactions_v3",He={"user-customer-1":1250,"user-owner-1":1500,"user-admin-1":2e3},Us=[{id:"tx-init-1",userId:"user-customer-1",type:"credit",amount:1370,title:"Initial Commuter Wallet Credit",timestamp:"2026-08-24 09:00",ref:"WELCOME-BONUS"},{id:"tx-init-2",userId:"user-customer-1",type:"debit",amount:120,title:"Slot Reservation — Metro Station Gate 2 Slot A",timestamp:"2026-08-24 10:15",ref:"PRK-9482"}];function Ys(){try{const r=localStorage.getItem(Ws);if(r){const t=JSON.parse(r);if(t&&typeof t=="object")return{...He,...t}}}catch{}return{...He}}function Gs(r){try{localStorage.setItem(Ws,JSON.stringify(r))}catch{}}function Xs(){try{const r=localStorage.getItem(Vs);if(r){const t=JSON.parse(r);if(Array.isArray(t))return t}}catch{}return structuredClone(Us)}function js(r){try{localStorage.setItem(Vs,JSON.stringify(r))}catch{}}function Ks(r){const t=Ys(),e=Number(t[r]);return Number.isFinite(e)?Math.max(0,e):He[r]??1e3}function ya(r){return Xs().filter(e=>e.userId===r)}function Tt(){try{const r=localStorage.getItem(Fi);if(!r)return null;const t=JSON.parse(r),e=Pe.find(s=>s.id===(t==null?void 0:t.id));if(!e)return null;const i=Ks(e.id);return{...e,walletBalance:i}}catch{return null}}function Hi(r){try{localStorage.setItem(Fi,JSON.stringify(r))}catch{}}function ki(r){const t=Pe.find(e=>e.id===r);if(t){const e=Ks(t.id),i={...t,walletBalance:e};return Hi(i),window.dispatchEvent(new CustomEvent("parkora-auth-change",{detail:i})),i}return null}function _a(r,t){const e=Pe.find(i=>i.email.toLowerCase()===r.toLowerCase());return ki(e?e.id:Pe[0].id)}function di(r,t="Wallet Adjustment",e="",i=null){const s=Tt(),a=i||(s==null?void 0:s.id)||"user-customer-1",n=Ys(),o=Number(n[a])||0,c=Math.max(0,o+r);if(n[a]=c,Gs(n),r!==0){const l=Xs(),d={id:`tx-${Date.now()}-${Math.floor(Math.random()*1e3)}`,userId:a,type:r>0?"credit":"debit",amount:Math.abs(r),title:t,timestamp:new Date().toLocaleString([],{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),ref:e||(r>0?"TOPUP-CREDIT":"DEBIT-CHARGE")};l.unshift(d),js(l)}if(s&&s.id===a){const l={...s,walletBalance:c};return Hi(l),window.dispatchEvent(new CustomEvent("parkora-auth-change",{detail:l})),c}return window.dispatchEvent(new CustomEvent("parkora-auth-change",{detail:s})),c}function wa(){Gs(He),js(structuredClone(Us));const r=Tt();r&&(r.walletBalance=He[r.id]||1e3,Hi(r),window.dispatchEvent(new CustomEvent("parkora-auth-change",{detail:r})))}function gs(){try{localStorage.removeItem(Fi)}catch{}window.dispatchEvent(new CustomEvent("parkora-auth-change",{detail:null}))}const Qs="parkora_spots_v3",Js="parkora_pending_v3",Zs="parkora_bookings_v3",tr=[{id:"spot-1",ownerId:"user-owner-1",title:"Metro Station Gate 2 Slot A",address:"Whitefield Metro, Bengaluru",city:"Bengaluru",category:"metro",vehicleType:"all",covered:!0,rateHourly:40,distanceMetro:"50m from Gate 2",evCharging:!0,availableSlots:4,totalCapacity:5,rating:4.9,reviewsCount:128,mapX:68,mapY:42,amenities:["Covered Bay","50kW EV","24/7 CCTV","Car & 2-Wheeler"],active:!0,status:"approved"},{id:"spot-2",ownerId:"user-owner-1",title:"Tech Park Driveway #14",address:"Koramangala 4th Block, Bengaluru",city:"Bengaluru",category:"work",vehicleType:"car",covered:!1,rateHourly:35,distanceMetro:"300m from Sony World",evCharging:!1,availableSlots:2,totalCapacity:4,rating:4.8,reviewsCount:84,mapX:46,mapY:66,amenities:["Gated Access","Security Guard","4-Wheeler Bay"],active:!0,status:"approved"},{id:"spot-3",ownerId:"user-owner-2",title:"Terminal 2 Premium EV Pod",address:"Airport Road, Mumbai",city:"Mumbai",category:"ev",vehicleType:"car",covered:!0,rateHourly:60,distanceMetro:"Airport Link Station",evCharging:!0,availableSlots:6,totalCapacity:8,rating:5,reviewsCount:210,mapX:28,mapY:36,amenities:["Covered Bay","DC Fast Charge","Valet Assist","EV 4-Wheeler"],active:!0,status:"approved"},{id:"spot-4",ownerId:"user-owner-1",title:"Andheri Metro Covered Bay",address:"Andheri West Metro, Mumbai",city:"Mumbai",category:"metro",vehicleType:"all",covered:!0,rateHourly:45,distanceMetro:"80m from Platform 1",evCharging:!0,availableSlots:3,totalCapacity:6,rating:4.7,reviewsCount:96,mapX:22,mapY:58,amenities:["Covered Bay","EV Ready","Direct Metro Walk","Car & Bike"],active:!0,status:"approved"},{id:"spot-5",ownerId:"user-owner-3",title:"Cyber City Private Slot",address:"DLF Phase 2, Gurugram",city:"Gurugram",category:"work",vehicleType:"car",covered:!0,rateHourly:50,distanceMetro:"150m from Rapid Metro",evCharging:!1,availableSlots:1,totalCapacity:3,rating:4.9,reviewsCount:142,mapX:54,mapY:26,amenities:["Covered Bay","ANPR Boom Barrier","4-Wheeler Only"],active:!0,status:"approved"},{id:"spot-6",ownerId:"user-owner-2",title:"Solar EV Fast Charger Spot",address:"Indiranagar 100ft Road, Bengaluru",city:"Bengaluru",category:"ev",vehicleType:"all",covered:!1,rateHourly:55,distanceMetro:"400m from Indiranagar Metro",evCharging:!0,availableSlots:5,totalCapacity:6,rating:4.85,reviewsCount:175,mapX:58,mapY:50,amenities:["Solar Canopy","60kW Dual Gun","Car & 2-Wheeler EV"],active:!0,status:"approved"}],er=[{id:"pending-spot-101",ownerId:"user-owner-1",ownerName:"Sarah Jenkins",title:"MG Road Executive Covered Slot",address:"14 MG Road, Bengaluru",city:"Bengaluru",category:"metro",covered:!0,rateHourly:45,distanceMetro:"100m from MG Road Metro",evCharging:!0,availableSlots:3,totalCapacity:4,submittedAt:"2026-08-24 14:30"},{id:"pending-spot-102",ownerId:"user-owner-4",ownerName:"Rajesh Kumar",title:"Electronic City Phase 1 Driveway",address:"Infantry Road, Bengaluru",city:"Bengaluru",category:"work",covered:!1,rateHourly:30,distanceMetro:"500m from Bus Junction",evCharging:!1,availableSlots:2,totalCapacity:3,submittedAt:"2026-08-24 16:15"}],ir=[{id:"bk-1001",userId:"user-customer-1",spotId:"spot-1",spotTitle:"Metro Station Gate 2 Slot A",spotAddress:"Whitefield Metro, Bengaluru",passCode:"PRK-9482",hours:3,startTime:"Today, 09:30 AM",totalPaid:120,vehicleNumber:"KA 01 AB 7890",bookedAt:"2026-08-24 10:15",status:"active"}];function zi(r,t){try{const e=localStorage.getItem(r);if(e){const i=JSON.parse(e);if(Array.isArray(i))return i}}catch{}return structuredClone(t)}function Sa(){try{localStorage.setItem(Qs,JSON.stringify(yt)),localStorage.setItem(Js,JSON.stringify(Ft)),localStorage.setItem(Zs,JSON.stringify(Xt))}catch{}}let yt=zi(Qs,tr),Ft=zi(Js,er),Xt=zi(Zs,ir);const ka=184500,Ta=14500;function be(){Sa(),window.dispatchEvent(new CustomEvent("parkora-data-change"))}function xa(){yt=structuredClone(tr),Ft=structuredClone(er),Xt=structuredClone(ir),wa(),be()}function Ma(){const r=Xt.filter(a=>a.status==="active").reduce((a,n)=>a+(n.totalPaid||0),0),t=ka+r,e=Xt.filter(a=>a.status==="active").length,i=yt.length,s=1240+Xt.length;return{totalRevenue:t,activeBookingsCount:e,totalSpotsCount:i,totalUsersCount:s}}function Wi(r="user-owner-1"){const t=yt.filter(l=>l.ownerId===r),i=Xt.filter(l=>{if(l.status!=="active")return!1;const d=yt.find(u=>u.id===l.spotId||u.title===l.spotTitle);return d&&d.ownerId===r}).reduce((l,d)=>l+(d.totalPaid||0),0),s=Ta+i,a=t.reduce((l,d)=>l+(d.totalCapacity||5),0),n=t.reduce((l,d)=>l+(d.active?d.availableSlots:0),0),o=Math.max(0,a-n),c=a>0?Math.round(o/a*100):0;return{monthlyIncome:s,activeListingsCount:t.filter(l=>l.active).length,occupancyRate:c,totalSpots:t}}function Ca(){const r=yt.filter(l=>l.active),t=r.length,e=r.filter(l=>l.category==="metro").length,i=r.filter(l=>l.category==="ev"||l.evCharging).length,s=r.filter(l=>l.category==="work").length,a=r.filter(l=>!!l.covered).length,n=r.filter(l=>l.vehicleType==="car"||l.vehicleType==="all").length,o=r.filter(l=>l.vehicleType==="bike"||l.vehicleType==="all").length,c=r.filter(l=>l.evCharging).reduce((l,d)=>l+d.availableSlots,0);return{all:t,metro:e,ev:i,work:s,covered:a,car:n,bike:o,liveEVSlots:c}}function Pa(r){const t=yt.find(n=>n.id===r.spotId),e=Tt(),i=Number(r.hours),s=Number(r.totalPaid);if(!t||!t.active||t.availableSlots<1)throw new Error("This spot is no longer available.");if(!e||!Number.isInteger(i)||i<1||i>12||!Number.isFinite(s)||s!==t.rateHourly*i)throw new Error("Please review your booking details.");if((e.walletBalance||0)<s)throw new Error("Your demo wallet balance is too low.");t.availableSlots-=1;const a={id:`bk-${Date.now()}`,userId:r.userId||(e==null?void 0:e.id)||"user-customer-1",spotId:r.spotId,spotTitle:r.spotTitle,spotAddress:r.spotAddress,passCode:`PRK-${Math.floor(1e3+Math.random()*9e3)}`,hours:i,startTime:r.startTime||"Today, Immediate",totalPaid:s,vehicleNumber:r.vehicleNumber||"KA 01 AB 7890",vehicleType:r.vehicleType||"4-Wheeler (Car)",bookedAt:new Date().toLocaleString([],{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),status:"active"};return Xt.unshift(a),di(-s,`Slot Reservation — ${t.title}`,a.passCode,a.userId),be(),a}function Aa(r){const t=Xt.find(e=>e.id===r&&e.status==="active");if(t){const e=yt.find(i=>i.id===t.spotId||i.title===t.spotTitle);return e&&(e.availableSlots=Math.min(e.totalCapacity||10,e.availableSlots+1)),t.status="cancelled",t.cancelledAt=new Date().toLocaleString([],{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"}),di(t.totalPaid,`Cancellation Refund — Pass ${t.passCode}`,`REFUND-${t.passCode}`,t.userId),be(),t}return null}function La(r){const t=String(r.title||"").trim(),e=String(r.address||"").trim(),i=Number(r.rateHourly);if(t.length<3||e.length<5||!Number.isFinite(i)||i<10||i>500)throw new Error("Please provide a valid title, address, and hourly rate (₹10–₹500).");const s=e.toLowerCase().includes("mumbai")?"Mumbai":e.toLowerCase().includes("gurugram")||e.toLowerCase().includes("delhi")?"Gurugram":"Bengaluru",a={id:`pending-spot-${Date.now()}`,ownerId:r.ownerId||"user-owner-1",ownerName:r.ownerName||"Sarah Jenkins",title:t,address:e,city:s,category:r.category||"metro",vehicleType:r.vehicleType||"all",covered:!!(r.covered??!0),rateHourly:i,distanceMetro:String(r.distanceMetro).trim(),evCharging:!!r.evCharging,availableSlots:Number(r.availableSlots)||3,totalCapacity:(Number(r.availableSlots)||3)+2,submittedAt:new Date().toLocaleString()};return Ft.unshift(a),be(),a}function Ea(r){const t=Ft.findIndex(e=>e.id===r);if(t!==-1){const e=Ft.splice(t,1)[0],i={id:`spot-${Date.now()}`,ownerId:e.ownerId||"user-owner-1",title:e.title,address:e.address,city:e.city||"Bengaluru",category:e.category||"metro",vehicleType:e.vehicleType||"all",covered:!!(e.covered??!0),rateHourly:Number(e.rateHourly)||40,distanceMetro:e.distanceMetro||"200m to Metro",evCharging:!!e.evCharging,availableSlots:Number(e.availableSlots)||3,totalCapacity:e.totalCapacity||5,rating:5,reviewsCount:1,mapX:Math.floor(25+Math.random()*55),mapY:Math.floor(25+Math.random()*50),amenities:[...e.covered?["Covered Bay"]:["Open Bay"],...e.evCharging?["EV Charger"]:["Verified Host"],e.vehicleType==="bike"?"2-Wheeler Bay":e.vehicleType==="car"?"4-Wheeler Bay":"Car & 2-Wheeler"],active:!0,status:"approved"};return yt.unshift(i),be(),i}return null}function Oa(r){const t=Ft.findIndex(e=>e.id===r);if(t!==-1){const e=Ft.splice(t,1)[0];return be(),e}return null}function Ra(r){const t=yt.find(e=>e.id===r);return t?(t.active=!t.active,be(),t.active):!1}function q(r=""){return String(r).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}let Ut=null;function Ba(){return(!Ut||!document.body.contains(Ut))&&(Ut=document.createElement("div"),Ut.id="parkora-toast-container",Ut.className="toast-container",Ut.setAttribute("aria-live","polite"),Ut.setAttribute("aria-atomic","false"),document.body.appendChild(Ut)),Ut}function ht(r,t="success",e=4e3){const i=Ba(),s={success:"check_circle",error:"error",warning:"warning",info:"info"},a=document.createElement("div");a.className=`toast-item toast-${t}`,a.setAttribute("role",t==="error"?"alert":"status");const n=typeof HTMLElement<"u"&&"popover"in HTMLElement.prototype;if(n&&a.setAttribute("popover","manual"),a.innerHTML=`
    <span class="material-symbols-outlined toast-icon" aria-hidden="true">${s[t]||"info"}</span>
    <span class="toast-message">${q(r)}</span>
    <button type="button" class="toast-close-btn" aria-label="Dismiss notification">&times;</button>
  `,i.appendChild(a),n)try{a.showPopover()}catch{}requestAnimationFrame(()=>{a.classList.add("toast-visible")});let o=!1;const c=()=>{o||(o=!0,a.classList.remove("toast-visible"),a.classList.add("toast-hiding"),setTimeout(()=>{if(n)try{a.hidePopover()}catch{}a.remove()},250))},l=a.querySelector(".toast-close-btn");return l&&l.addEventListener("click",c),e>0&&setTimeout(c,e),c}let $e=null,bs=!1;const $a=["a[href]","button:not([disabled])",'input:not([disabled]):not([type="hidden"])',"select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(", ");function sr(){const r=document.querySelectorAll(".modal-overlay-backdrop.active");return r.length>0?r[r.length-1]:null}function Ia(){const r=!!sr();document.body.style.overflow=r?"hidden":""}function Da(r){const t=sr();if(t){if(r.key==="Escape"){r.preventDefault(),vt(t);return}if(r.key==="Tab"){const e=Array.from(t.querySelectorAll($a)).filter(a=>a.offsetParent!==null);if(e.length===0){r.preventDefault();return}const i=e[0],s=e[e.length-1];r.shiftKey?(document.activeElement===i||!t.contains(document.activeElement))&&(r.preventDefault(),s.focus()):(document.activeElement===s||!t.contains(document.activeElement))&&(r.preventDefault(),i.focus())}}}function qa(){bs||(document.addEventListener("keydown",Da),bs=!0);const r=new MutationObserver(t=>{for(const e of t)if(e.type==="attributes"&&e.attributeName==="class"){const i=e.target;if(i.classList.contains("modal-overlay-backdrop")){const s=i.classList.contains("active");i.setAttribute("aria-hidden",s?"false":"true"),Ia(),s?requestAnimationFrame(()=>{const a=i.querySelector("input:not([disabled]), select:not([disabled]), button:not(.modal-close-icon):not([disabled]), .modal-close-icon");a&&typeof a.focus=="function"&&a.focus()}):$e&&typeof $e.focus=="function"&&($e.focus(),$e=null)}}});document.querySelectorAll(".modal-overlay-backdrop").forEach(t=>{t.setAttribute("aria-hidden",t.classList.contains("active")?"false":"true"),r.observe(t,{attributes:!0,attributeFilter:["class"]}),t.addEventListener("click",e=>{e.target===t&&vt(t)})})}function ut(r){r&&(document.activeElement instanceof HTMLElement&&($e=document.activeElement),r.classList.add("active"))}function vt(r){r&&r.classList.remove("active")}function Yt(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function rr(r,t){r.prototype=Object.create(t.prototype),r.prototype.constructor=r,r.__proto__=t}/*!
 * GSAP 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Bt={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},ze={duration:.5,overwrite:!1,delay:0},Vi,pt,tt,qt=1e8,Q=1/qt,Ti=Math.PI*2,Na=Ti/4,Fa=0,ar=Math.sqrt,Ha=Math.cos,za=Math.sin,ct=function(t){return typeof t=="string"},at=function(t){return typeof t=="function"},jt=function(t){return typeof t=="number"},Ui=function(t){return typeof t>"u"},Vt=function(t){return typeof t=="object"},xt=function(t){return t!==!1},Yi=function(){return typeof window<"u"},Je=function(t){return at(t)||ct(t)},nr=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},gt=Array.isArray,Wa=/random\([^)]+\)/g,Va=/,\s*/g,ys=/(?:-?\.?\d|\.)+/gi,or=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,we=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,mi=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,lr=/[+-]=-?[.\d]+/,Ua=/[^,'"\[\]\s]+/gi,Ya=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,st,Ht,xi,Gi,$t={},si={},cr,dr=function(t){return(si=Ae(t,$t))&&At},Xi=function(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")},We=function(t,e){return!e&&console.warn(t)},ur=function(t,e){return t&&($t[t]=e)&&si&&(si[t]=e)||$t},Ve=function(){return 0},Ga={suppressEvents:!0,isStart:!0,kill:!1},ti={suppressEvents:!0,kill:!1},Xa={suppressEvents:!0},ji={},ee=[],Mi={},hr,Lt={},vi={},_s=30,ei=[],Ki="",Qi=function(t){var e=t[0],i,s;if(Vt(e)||at(e)||(t=[t]),!(i=(e._gsap||{}).harness)){for(s=ei.length;s--&&!ei[s].targetTest(e););i=ei[s]}for(s=t.length;s--;)t[s]&&(t[s]._gsap||(t[s]._gsap=new Br(t[s],i)))||t.splice(s,1);return t},fe=function(t){return t._gsap||Qi(Nt(t))[0]._gsap},pr=function(t,e,i){return(i=t[e])&&at(i)?t[e]():Ui(i)&&t.getAttribute&&t.getAttribute(e)||i},Mt=function(t,e){return(t=t.split(",")).forEach(e)||t},nt=function(t){return Math.round(t*1e5)/1e5||0},it=function(t){return Math.round(t*1e7)/1e7||0},ke=function(t,e){var i=e.charAt(0),s=parseFloat(e.substr(2));return t=parseFloat(t),i==="+"?t+s:i==="-"?t-s:i==="*"?t*s:t/s},ja=function(t,e){for(var i=e.length,s=0;t.indexOf(e[s])<0&&++s<i;);return s<i},ri=function(){var t=ee.length,e=ee.slice(0),i,s;for(Mi={},ee.length=0,i=0;i<t;i++)s=e[i],s&&s._lazy&&(s.render(s._lazy[0],s._lazy[1],!0)._lazy=0)},Ji=function(t){return!!(t._initted||t._startAt||t.add)},fr=function(t,e,i,s){ee.length&&!pt&&ri(),t.render(e,i,!!(pt&&e<0&&Ji(t))),ee.length&&!pt&&ri()},mr=function(t){var e=parseFloat(t);return(e||e===0)&&(t+"").match(Ua).length<2?e:ct(t)?t.trim():t},vr=function(t){return t},It=function(t,e){for(var i in e)i in t||(t[i]=e[i]);return t},Ka=function(t){return function(e,i){for(var s in i)s in e||s==="duration"&&t||s==="ease"||(e[s]=i[s])}},Ae=function(t,e){for(var i in e)t[i]=e[i];return t},ws=function r(t,e){for(var i in e)i!=="__proto__"&&i!=="constructor"&&i!=="prototype"&&(t[i]=Vt(e[i])?r(t[i]||(t[i]={}),e[i]):e[i]);return t},ai=function(t,e){var i={},s;for(s in t)s in e||(i[s]=t[s]);return i},qe=function(t){var e=t.parent||st,i=t.keyframes?Ka(gt(t.keyframes)):It;if(xt(t.inherit))for(;e;)i(t,e.vars.defaults),e=e.parent||e._dp;return t},Qa=function(t,e){for(var i=t.length,s=i===e.length;s&&i--&&t[i]===e[i];);return i<0},gr=function(t,e,i,s,a){var n=t[s],o;if(a)for(o=e[a];n&&n[a]>o;)n=n._prev;return n?(e._next=n._next,n._next=e):(e._next=t[i],t[i]=e),e._next?e._next._prev=e:t[s]=e,e._prev=n,e.parent=e._dp=t,e},ui=function(t,e,i,s){i===void 0&&(i="_first"),s===void 0&&(s="_last");var a=e._prev,n=e._next;a?a._next=n:t[i]===e&&(t[i]=n),n?n._prev=a:t[s]===e&&(t[s]=a),e._next=e._prev=e.parent=null},se=function(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0},me=function(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var i=t;i;)i._dirty=1,i=i.parent;return t},Ja=function(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t},Ci=function(t,e,i,s){return t._startAt&&(pt?t._startAt.revert(ti):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,s))},Za=function r(t){return!t||t._ts&&r(t.parent)},Ss=function(t){return t._repeat?Le(t._tTime,t=t.duration()+t._rDelay)*t:0},Le=function(t,e){var i=Math.floor(t=it(t/e));return t&&i===t?i-1:i},ni=function(t,e){return(t-e._start)*e._ts+(e._ts>=0?0:e._dirty?e.totalDuration():e._tDur)},hi=function(t){return t._end=it(t._start+(t._tDur/Math.abs(t._ts||t._rts||Q)||0))},pi=function(t,e){var i=t._dp;return i&&i.smoothChildTiming&&t._ts&&(t._start=it(i._time-(t._ts>0?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),hi(t),i._dirty||me(i,t)),t},br=function(t,e){var i;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(i=ni(t.rawTime(),e),(!e._dur||Ke(0,e.totalDuration(),i)-e._tTime>Q)&&e.render(i,!0)),me(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(i=t;i._dp;)i.rawTime()>=0&&i.totalTime(i._tTime),i=i._dp;t._zTime=-Q}},zt=function(t,e,i,s){return e.parent&&se(e),e._start=it((jt(i)?i:i||t!==st?Dt(t,i,e):t._time)+e._delay),e._end=it(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),gr(t,e,"_first","_last",t._sort?"_start":0),Pi(e)||(t._recent=e),s||br(t,e),t._ts<0&&pi(t,t._tTime),t},yr=function(t,e){return($t.ScrollTrigger||Xi("scrollTrigger",e))&&$t.ScrollTrigger.create(e,t)},_r=function(t,e,i,s,a){if(ts(t,e,a),!t._initted)return 1;if(!i&&t._pt&&!pt&&(t._dur&&t.vars.lazy!==!1||!t._dur&&t.vars.lazy)&&hr!==Et.frame)return ee.push(t),t._lazy=[a,s],1},tn=function r(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||r(e))},Pi=function(t){var e=t.data;return e==="isFromStart"||e==="isStart"},en=function(t,e,i,s){var a=t.ratio,n=e<0||!e&&(!t._start&&tn(t)&&!(!t._initted&&Pi(t))||(t._ts<0||t._dp._ts<0)&&!Pi(t))?0:1,o=t._rDelay,c=0,l,d,u;if(o&&t._repeat&&(c=Ke(0,t._tDur,e),d=Le(c,o),t._yoyo&&d&1&&(n=1-n),d!==Le(t._tTime,o)&&(a=1-n,t.vars.repeatRefresh&&t._initted&&t.invalidate())),n!==a||pt||s||t._zTime===Q||!e&&t._zTime){if(!t._initted&&_r(t,e,s,i,c))return;for(u=t._zTime,t._zTime=e||(i?Q:0),i||(i=e&&!u),t.ratio=n,t._from&&(n=1-n),t._time=0,t._tTime=c,l=t._pt;l;)l.r(n,l.d),l=l._next;e<0&&Ci(t,e,i,!0),t._onUpdate&&!i&&Ot(t,"onUpdate"),c&&t._repeat&&!i&&t.parent&&Ot(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===n&&(n&&se(t,1),!i&&!pt&&(Ot(t,n?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)},sn=function(t,e,i){var s;if(i>e)for(s=t._first;s&&s._start<=i;){if(s.data==="isPause"&&s._start>e)return s;s=s._next}else for(s=t._last;s&&s._start>=i;){if(s.data==="isPause"&&s._start<e)return s;s=s._prev}},Ee=function(t,e,i,s){var a=t._repeat,n=it(e)||0,o=t._tTime/t._tDur;return o&&!s&&(t._time*=n/t._dur),t._dur=n,t._tDur=a?a<0?1e10:it(n*(a+1)+t._rDelay*a):n,o>0&&!s&&pi(t,t._tTime=t._tDur*o),t.parent&&hi(t),i||me(t.parent,t),t},ks=function(t){return t instanceof kt?me(t):Ee(t,t._dur)},rn={_start:0,endTime:Ve,totalDuration:Ve},Dt=function r(t,e,i){var s=t.labels,a=t._recent||rn,n=t.duration()>=qt?a.endTime(!1):t._dur,o,c,l;return ct(e)&&(isNaN(e)||e in s)?(c=e.charAt(0),l=e.substr(-1)==="%",o=e.indexOf("="),c==="<"||c===">"?(o>=0&&(e=e.replace(/=/,"")),(c==="<"?a._start:a.endTime(a._repeat>=0))+(parseFloat(e.substr(1))||0)*(l?(o<0?a:i).totalDuration()/100:1)):o<0?(e in s||(s[e]=n),s[e]):(c=parseFloat(e.charAt(o-1)+e.substr(o+1)),l&&i&&(c=c/100*(gt(i)?i[0]:i).totalDuration()),o>1?r(t,e.substr(0,o-1),i)+c:n+c)):e==null?n:+e},Ne=function(t,e,i){var s=jt(e[1]),a=(s?2:1)+(t<2?0:1),n=e[a],o,c;if(s&&(n.duration=e[1]),n.parent=i,t){for(o=n,c=i;c&&!("immediateRender"in o);)o=c.vars.defaults||{},c=xt(c.vars.inherit)&&c.parent;n.immediateRender=xt(o.immediateRender),t<2?n.runBackwards=1:n.startAt=e[a-1]}return new lt(e[0],n,e[a+1])},ne=function(t,e){return t||t===0?e(t):e},Ke=function(t,e,i){return i<t?t:i>e?e:i},mt=function(t,e){return!ct(t)||!(e=Ya.exec(t))?"":e[1]},an=function(t,e,i){return ne(i,function(s){return Ke(t,e,s)})},Ai=[].slice,wr=function(t,e){return t&&Vt(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&Vt(t[0]))&&!t.nodeType&&t!==Ht},nn=function(t,e,i){return i===void 0&&(i=[]),t.forEach(function(s){var a;return ct(s)&&!e||wr(s,1)?(a=i).push.apply(a,Nt(s)):i.push(s)})||i},Nt=function(t,e,i){return tt&&!e&&tt.selector?tt.selector(t):ct(t)&&!i&&(xi||!Oe())?Ai.call((e||Gi).querySelectorAll(t),0):gt(t)?nn(t,i):wr(t)?Ai.call(t,0):t?[t]:[]},Li=function(t){return t=Nt(t)[0]||We("Invalid scope")||{},function(e){var i=t.current||t.nativeElement||t;return Nt(e,i.querySelectorAll?i:i===t?We("Invalid scope")||Gi.createElement("div"):t)}},Sr=function(t){return t.sort(function(){return .5-Math.random()})},kr=function(t){if(at(t))return t;var e=Vt(t)?t:{each:t},i=ve(e.ease),s=e.from||0,a=parseFloat(e.base)||0,n={},o=s>0&&s<1,c=isNaN(s)||o,l=e.axis,d=s,u=s;return ct(s)?d=u={center:.5,edges:.5,end:1}[s]||0:!o&&c&&(d=s[0],u=s[1]),function(p,m,v){var h=(v||e).length,g=n[h],_,S,T,x,k,E,C,w,b;if(!g){if(b=e.grid==="auto"?0:(e.grid||[1,qt])[1],!b){for(C=-qt;C<(C=v[b++].getBoundingClientRect().left)&&b<h;);b<h&&b--}for(g=n[h]=[],_=c?Math.min(b,h)*d-.5:s%b,S=b===qt?0:c?h*u/b-.5:s/b|0,C=0,w=qt,E=0;E<h;E++)T=E%b-_,x=S-(E/b|0),g[E]=k=l?Math.abs(l==="y"?x:T):ar(T*T+x*x),k>C&&(C=k),k<w&&(w=k);s==="random"&&Sr(g),g.max=C-w,g.min=w,g.v=h=(parseFloat(e.amount)||parseFloat(e.each)*(b>h?h-1:l?l==="y"?h/b:b:Math.max(b,h/b))||0)*(s==="edges"?-1:1),g.b=h<0?a-h:a,g.u=mt(e.amount||e.each)||0,i=i&&h<0?yn(i):i}return h=(g[p]-g.min)/g.max||0,it(g.b+(i?i(h):h)*g.v)+g.u}},Ei=function(t){var e=Math.pow(10,((t+"").split(".")[1]||"").length);return function(i){var s=it(Math.round(parseFloat(i)/t)*t*e);return(s-s%1)/e+(jt(i)?0:mt(i))}},Tr=function(t,e){var i=gt(t),s,a;return!i&&Vt(t)&&(s=i=t.radius||qt,t.values?(t=Nt(t.values),(a=!jt(t[0]))&&(s*=s)):t=Ei(t.increment)),ne(e,i?at(t)?function(n){return a=t(n),Math.abs(a-n)<=s?a:n}:function(n){for(var o=parseFloat(a?n.x:n),c=parseFloat(a?n.y:0),l=qt,d=0,u=t.length,p,m;u--;)a?(p=t[u].x-o,m=t[u].y-c,p=p*p+m*m):p=Math.abs(t[u]-o),p<l&&(l=p,d=u);return d=!s||l<=s?t[d]:n,a||d===n||jt(n)?d:d+mt(n)}:Ei(t))},xr=function(t,e,i,s){return ne(gt(t)?!e:i===!0?!!(i=0):!s,function(){return gt(t)?t[~~(Math.random()*t.length)]:(i=i||1e-5)&&(s=i<1?Math.pow(10,(i+"").length-2):1)&&Math.floor(Math.round((t-i/2+Math.random()*(e-t+i*.99))/i)*i*s)/s})},on=function(){for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];return function(s){return e.reduce(function(a,n){return n(a)},s)}},ln=function(t,e){return function(i){return t(parseFloat(i))+(e||mt(i))}},cn=function(t,e,i){return Cr(t,e,0,1,i)},Mr=function(t,e,i){return ne(i,function(s){return t[~~e(s)]})},dn=function r(t,e,i){var s=e-t;return gt(t)?Mr(t,r(0,t.length),e):ne(i,function(a){return(s+(a-t)%s)%s+t})},un=function r(t,e,i){var s=e-t,a=s*2;return gt(t)?Mr(t,r(0,t.length-1),e):ne(i,function(n){return n=(a+(n-t)%a)%a||0,t+(n>s?a-n:n)})},Ue=function(t){return t.replace(Wa,function(e){var i=e.indexOf("[")+1,s=e.substring(i||7,i?e.indexOf("]"):e.length-1).split(Va);return xr(i?s:+s[0],i?0:+s[1],+s[2]||1e-5)})},Cr=function(t,e,i,s,a){var n=e-t,o=s-i;return ne(a,function(c){return i+((c-t)/n*o||0)})},hn=function r(t,e,i,s){var a=isNaN(t+e)?0:function(m){return(1-m)*t+m*e};if(!a){var n=ct(t),o={},c,l,d,u,p;if(i===!0&&(s=1)&&(i=null),n)t={p:t},e={p:e};else if(gt(t)&&!gt(e)){for(d=[],u=t.length,p=u-2,l=1;l<u;l++)d.push(r(t[l-1],t[l]));u--,a=function(v){v*=u;var h=Math.min(p,~~v);return d[h](v-h)},i=e}else s||(t=Ae(gt(t)?[]:{},t));if(!d){for(c in e)Zi.call(o,t,c,"get",e[c]);a=function(v){return ss(v,o)||(n?t.p:t)}}}return ne(i,a)},Ts=function(t,e,i){var s=t.labels,a=qt,n,o,c;for(n in s)o=s[n]-e,o<0==!!i&&o&&a>(o=Math.abs(o))&&(c=n,a=o);return c},Ot=function(t,e,i){var s=t.vars,a=s[e],n=tt,o=t._ctx,c,l,d;if(a)return c=s[e+"Params"],l=s.callbackScope||t,i&&ee.length&&ri(),o&&(tt=o),d=c?a.apply(l,c):a.call(l),tt=n,d},Ie=function(t){return se(t),t.scrollTrigger&&t.scrollTrigger.kill(!!pt),t.progress()<1&&Ot(t,"onInterrupt"),t},Se,Pr=[],Ar=function(t){if(t)if(t=!t.name&&t.default||t,Yi()||t.headless){var e=t.name,i=at(t),s=e&&!i&&t.init?function(){this._props=[]}:t,a={init:Ve,render:ss,add:Zi,kill:An,modifier:Pn,rawVars:0},n={targetTest:0,get:0,getSetter:is,aliases:{},register:0};if(Oe(),t!==s){if(Lt[e])return;It(s,It(ai(t,a),n)),Ae(s.prototype,Ae(a,ai(t,n))),Lt[s.prop=e]=s,t.targetTest&&(ei.push(s),ji[e]=1),e=(e==="css"?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}ur(e,s),t.register&&t.register(At,s,Ct)}else Pr.push(t)},K=255,De={aqua:[0,K,K],lime:[0,K,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,K],navy:[0,0,128],white:[K,K,K],olive:[128,128,0],yellow:[K,K,0],orange:[K,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[K,0,0],pink:[K,192,203],cyan:[0,K,K],transparent:[K,K,K,0]},gi=function(t,e,i){return t+=t<0?1:t>1?-1:0,(t*6<1?e+(i-e)*t*6:t<.5?i:t*3<2?e+(i-e)*(2/3-t)*6:e)*K+.5|0},Lr=function(t,e,i){var s=t?jt(t)?[t>>16,t>>8&K,t&K]:0:De.black,a,n,o,c,l,d,u,p,m,v;if(!s){if(t.substr(-1)===","&&(t=t.substr(0,t.length-1)),De[t])s=De[t];else if(t.charAt(0)==="#"){if(t.length<6&&(a=t.charAt(1),n=t.charAt(2),o=t.charAt(3),t="#"+a+a+n+n+o+o+(t.length===5?t.charAt(4)+t.charAt(4):"")),t.length===9)return s=parseInt(t.substr(1,6),16),[s>>16,s>>8&K,s&K,parseInt(t.substr(7),16)/255];t=parseInt(t.substr(1),16),s=[t>>16,t>>8&K,t&K]}else if(t.substr(0,3)==="hsl"){if(s=v=t.match(ys),!e)c=+s[0]%360/360,l=+s[1]/100,d=+s[2]/100,n=d<=.5?d*(l+1):d+l-d*l,a=d*2-n,s.length>3&&(s[3]*=1),s[0]=gi(c+1/3,a,n),s[1]=gi(c,a,n),s[2]=gi(c-1/3,a,n);else if(~t.indexOf("="))return s=t.match(or),i&&s.length<4&&(s[3]=1),s}else s=t.match(ys)||De.transparent;s=s.map(Number)}return e&&!v&&(a=s[0]/K,n=s[1]/K,o=s[2]/K,u=Math.max(a,n,o),p=Math.min(a,n,o),d=(u+p)/2,u===p?c=l=0:(m=u-p,l=d>.5?m/(2-u-p):m/(u+p),c=u===a?(n-o)/m+(n<o?6:0):u===n?(o-a)/m+2:(a-n)/m+4,c*=60),s[0]=~~(c+.5),s[1]=~~(l*100+.5),s[2]=~~(d*100+.5)),i&&s.length<4&&(s[3]=1),s},Er=function(t){var e=[],i=[],s=-1;return t.split(ie).forEach(function(a){var n=a.match(we)||[];e.push.apply(e,n),i.push(s+=n.length+1)}),e.c=i,e},xs=function(t,e,i){var s="",a=(t+s).match(ie),n=e?"hsla(":"rgba(",o=0,c,l,d,u;if(!a)return t;if(a=a.map(function(p){return(p=Lr(p,e,1))&&n+(e?p[0]+","+p[1]+"%,"+p[2]+"%,"+p[3]:p.join(","))+")"}),i&&(d=Er(t),c=i.c,c.join(s)!==d.c.join(s)))for(l=t.replace(ie,"1").split(we),u=l.length-1;o<u;o++)s+=l[o]+(~c.indexOf(o)?a.shift()||n+"0,0,0,0)":(d.length?d:a.length?a:i).shift());if(!l)for(l=t.split(ie),u=l.length-1;o<u;o++)s+=l[o]+a[o];return s+l[u]},ie=(function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in De)r+="|"+t+"\\b";return new RegExp(r+")","gi")})(),pn=/hsl[a]?\(/,Or=function(t){var e=t.join(" "),i;if(ie.lastIndex=0,ie.test(e))return i=pn.test(e),t[1]=xs(t[1],i),t[0]=xs(t[0],i,Er(t[1])),!0},Ye,Et=(function(){var r=Date.now,t=500,e=33,i=r(),s=i,a=1e3/240,n=a,o=[],c,l,d,u,p,m,v=function h(g){var _=r()-s,S=g===!0,T,x,k,E;if((_>t||_<0)&&(i+=_-e),s+=_,k=s-i,T=k-n,(T>0||S)&&(E=++u.frame,p=k-u.time*1e3,u.time=k=k/1e3,n+=T+(T>=a?4:a-T),x=1),S||(c=l(h)),x)for(m=0;m<o.length;m++)o[m](k,p,E,g)};return u={time:0,frame:0,tick:function(){v(!0)},deltaRatio:function(g){return p/(1e3/(g||60))},wake:function(){cr&&(!xi&&Yi()&&(Ht=xi=window,Gi=Ht.document||{},$t.gsap=At,(Ht.gsapVersions||(Ht.gsapVersions=[])).push(At.version),dr(si||Ht.GreenSockGlobals||!Ht.gsap&&Ht||{}),Pr.forEach(Ar)),d=typeof requestAnimationFrame<"u"&&requestAnimationFrame,c&&u.sleep(),l=d||function(g){return setTimeout(g,n-u.time*1e3+1|0)},Ye=1,v(2))},sleep:function(){(d?cancelAnimationFrame:clearTimeout)(c),Ye=0,l=Ve},lagSmoothing:function(g,_){t=g||1/0,e=Math.min(_||33,t)},fps:function(g){a=1e3/(g||240),n=u.time*1e3+a},add:function(g,_,S){var T=_?function(x,k,E,C){g(x,k,E,C),u.remove(T)}:g;return u.remove(g),o[S?"unshift":"push"](T),Oe(),T},remove:function(g,_){~(_=o.indexOf(g))&&o.splice(_,1)&&m>=_&&m--},_listeners:o},u})(),Oe=function(){return!Ye&&Et.wake()},V={},fn=/^[\d.\-M][\d.\-,\s]/,mn=/["']/g,vn=function(t){for(var e={},i=t.substr(1,t.length-3).split(":"),s=i[0],a=1,n=i.length,o,c,l;a<n;a++)c=i[a],o=a!==n-1?c.lastIndexOf(","):c.length,l=c.substr(0,o),e[s]=isNaN(l)?l.replace(mn,"").trim():+l,s=c.substr(o+1).trim();return e},gn=function(t){var e=t.indexOf("(")+1,i=t.indexOf(")"),s=t.indexOf("(",e);return t.substring(e,~s&&s<i?t.indexOf(")",i+1):i)},bn=function(t){var e=(t+"").split("("),i=V[e[0]];return i&&e.length>1&&i.config?i.config.apply(null,~t.indexOf("{")?[vn(e[1])]:gn(t).split(",").map(mr)):V._CE&&fn.test(t)?V._CE("",t):i},yn=function(t){return function(e){return 1-t(1-e)}},ve=function(t,e){return t&&(at(t)?t:V[t]||bn(t))||e},ye=function(t,e,i,s){i===void 0&&(i=function(c){return 1-e(1-c)}),s===void 0&&(s=function(c){return c<.5?e(c*2)/2:1-e((1-c)*2)/2});var a={easeIn:e,easeOut:i,easeInOut:s},n;return Mt(t,function(o){V[o]=$t[o]=a,V[n=o.toLowerCase()]=i;for(var c in a)V[n+(c==="easeIn"?".in":c==="easeOut"?".out":".inOut")]=V[o+"."+c]=a[c]}),a},Rr=function(t){return function(e){return e<.5?(1-t(1-e*2))/2:.5+t((e-.5)*2)/2}},bi=function r(t,e,i){var s=e>=1?e:1,a=(i||(t?.3:.45))/(e<1?e:1),n=a/Ti*(Math.asin(1/s)||0),o=function(d){return d===1?1:s*Math.pow(2,-10*d)*za((d-n)*a)+1},c=t==="out"?o:t==="in"?function(l){return 1-o(1-l)}:Rr(o);return a=Ti/a,c.config=function(l,d){return r(t,l,d)},c},yi=function r(t,e){e===void 0&&(e=1.70158);var i=function(n){return n?--n*n*((e+1)*n+e)+1:0},s=t==="out"?i:t==="in"?function(a){return 1-i(1-a)}:Rr(i);return s.config=function(a){return r(t,a)},s};Mt("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,t){var e=t<5?t+1:t;ye(r+",Power"+(e-1),t?function(i){return Math.pow(i,e)}:function(i){return i},function(i){return 1-Math.pow(1-i,e)},function(i){return i<.5?Math.pow(i*2,e)/2:1-Math.pow((1-i)*2,e)/2})});V.Linear.easeNone=V.none=V.Linear.easeIn;ye("Elastic",bi("in"),bi("out"),bi());(function(r,t){var e=1/t,i=2*e,s=2.5*e,a=function(o){return o<e?r*o*o:o<i?r*Math.pow(o-1.5/t,2)+.75:o<s?r*(o-=2.25/t)*o+.9375:r*Math.pow(o-2.625/t,2)+.984375};ye("Bounce",function(n){return 1-a(1-n)},a)})(7.5625,2.75);ye("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)});ye("Circ",function(r){return-(ar(1-r*r)-1)});ye("Sine",function(r){return r===1?1:-Ha(r*Na)+1});ye("Back",yi("in"),yi("out"),yi());V.SteppedEase=V.steps=$t.SteppedEase={config:function(t,e){t===void 0&&(t=1);var i=1/t,s=t+(e?0:1),a=e?1:0,n=1-Q;return function(o){return((s*Ke(0,n,o)|0)+a)*i}}};ze.ease=V["quad.out"];Mt("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return Ki+=r+","+r+"Params,"});var Br=function(t,e){this.id=Fa++,t._gsap=this,this.target=t,this.harness=e,this.get=e?e.get:pr,this.set=e?e.getSetter:is},Ge=(function(){function r(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,Ee(this,+e.duration,1,1),this.data=e.data,tt&&(this._ctx=tt,tt.data.push(this)),Ye||Et.wake()}var t=r.prototype;return t.delay=function(i){return i||i===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+i-this._delay),this._delay=i,this):this._delay},t.duration=function(i){return arguments.length?this.totalDuration(this._repeat>0?i+(i+this._rDelay)*this._repeat:i):this.totalDuration()&&this._dur},t.totalDuration=function(i){return arguments.length?(this._dirty=0,Ee(this,this._repeat<0?i:(i-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(i,s){if(Oe(),!arguments.length)return this._tTime;var a=this._dp;if(a&&a.smoothChildTiming&&this._ts){for(pi(this,i),!a._dp||a.parent||br(a,this);a&&a.parent;)a.parent._time!==a._start+(a._ts>=0?a._tTime/a._ts:(a.totalDuration()-a._tTime)/-a._ts)&&a.totalTime(a._tTime,!0),a=a.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&i<this._tDur||this._ts<0&&i>0||!this._tDur&&!i)&&zt(this._dp,this,this._start-this._delay)}return(this._tTime!==i||!this._dur&&!s||this._initted&&Math.abs(this._zTime)===Q||!this._initted&&this._dur&&i||!i&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=i),fr(this,i,s)),this},t.time=function(i,s){return arguments.length?this.totalTime(Math.min(this.totalDuration(),i+Ss(this))%(this._dur+this._rDelay)||(i?this._dur:0),s):this._time},t.totalProgress=function(i,s){return arguments.length?this.totalTime(this.totalDuration()*i,s):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(i,s){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-i:i)+Ss(this),s):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(i,s){var a=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(i-1)*a,s):this._repeat?Le(this._tTime,a)+1:1},t.timeScale=function(i,s){if(!arguments.length)return this._rts===-Q?0:this._rts;if(this._rts===i)return this;var a=this.parent&&this._ts?ni(this.parent._time,this):this._tTime;return this._rts=+i||0,this._ts=this._ps||i===-Q?0:this._rts,this.totalTime(Ke(-Math.abs(this._delay),this.totalDuration(),a),s!==!1),hi(this),Ja(this)},t.paused=function(i){return arguments.length?(this._ps!==i&&(this._ps=i,i?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Oe(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==Q&&(this._tTime-=Q)))),this):this._ps},t.startTime=function(i){if(arguments.length){this._start=it(i);var s=this.parent||this._dp;return s&&(s._sort||!this.parent)&&zt(s,this,this._start-this._delay),this}return this._start},t.endTime=function(i){return this._start+(xt(i)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(i){var s=this.parent||this._dp;return s?i&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?ni(s.rawTime(i),this):this._tTime:this._tTime},t.revert=function(i){i===void 0&&(i=Xa);var s=pt;return pt=i,Ji(this)&&(this.timeline&&this.timeline.revert(i),this.totalTime(-.01,i.suppressEvents)),this.data!=="nested"&&i.kill!==!1&&this.kill(),pt=s,this},t.globalTime=function(i){for(var s=this,a=arguments.length?i:s.rawTime();s;)a=s._start+a/(Math.abs(s._ts)||1),s=s._dp;return!this.parent&&this._sat?this._sat.globalTime(i):a},t.repeat=function(i){return arguments.length?(this._repeat=i===1/0?-2:i,ks(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(i){if(arguments.length){var s=this._time;return this._rDelay=i,ks(this),s?this.time(s):this}return this._rDelay},t.yoyo=function(i){return arguments.length?(this._yoyo=i,this):this._yoyo},t.seek=function(i,s){return this.totalTime(Dt(this,i),xt(s))},t.restart=function(i,s){return this.play().totalTime(i?-this._delay:0,xt(s)),this._dur||(this._zTime=-Q),this},t.play=function(i,s){return i!=null&&this.seek(i,s),this.reversed(!1).paused(!1)},t.reverse=function(i,s){return i!=null&&this.seek(i||this.totalDuration(),s),this.reversed(!0).paused(!1)},t.pause=function(i,s){return i!=null&&this.seek(i,s),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(i){return arguments.length?(!!i!==this.reversed()&&this.timeScale(-this._rts||(i?-Q:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-Q,this},t.isActive=function(){var i=this.parent||this._dp,s=this._start,a;return!!(!i||this._ts&&this._initted&&i.isActive()&&(a=i.rawTime(!0))>=s&&a<this.endTime(!0)-Q)},t.eventCallback=function(i,s,a){var n=this.vars;return arguments.length>1?(s?(n[i]=s,a&&(n[i+"Params"]=a),i==="onUpdate"&&(this._onUpdate=s)):delete n[i],this):n[i]},t.then=function(i){var s=this,a=s._prom;return new Promise(function(n){var o=at(i)?i:vr,c=function(){var d=s.then;s.then=null,a&&a(),at(o)&&(o=o(s))&&(o.then||o===s)&&(s.then=d),n(o),s.then=d};s._initted&&s.totalProgress()===1&&s._ts>=0||!s._tTime&&s._ts<0?c():s._prom=c})},t.kill=function(){Ie(this)},r})();It(Ge.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-Q,_prom:0,_ps:!1,_rts:1});var kt=(function(r){rr(t,r);function t(i,s){var a;return i===void 0&&(i={}),a=r.call(this,i)||this,a.labels={},a.smoothChildTiming=!!i.smoothChildTiming,a.autoRemoveChildren=!!i.autoRemoveChildren,a._sort=xt(i.sortChildren),st&&zt(i.parent||st,Yt(a),s),i.reversed&&a.reverse(),i.paused&&a.paused(!0),i.scrollTrigger&&yr(Yt(a),i.scrollTrigger),a}var e=t.prototype;return e.to=function(s,a,n){return Ne(0,arguments,this),this},e.from=function(s,a,n){return Ne(1,arguments,this),this},e.fromTo=function(s,a,n,o){return Ne(2,arguments,this),this},e.set=function(s,a,n){return a.duration=0,a.parent=this,qe(a).repeatDelay||(a.repeat=0),a.immediateRender=!!a.immediateRender,new lt(s,a,Dt(this,n),1),this},e.call=function(s,a,n){return zt(this,lt.delayedCall(0,s,a),n)},e.staggerTo=function(s,a,n,o,c,l,d){return n.duration=a,n.stagger=n.stagger||o,n.onComplete=l,n.onCompleteParams=d,n.parent=this,new lt(s,n,Dt(this,c)),this},e.staggerFrom=function(s,a,n,o,c,l,d){return n.runBackwards=1,qe(n).immediateRender=xt(n.immediateRender),this.staggerTo(s,a,n,o,c,l,d)},e.staggerFromTo=function(s,a,n,o,c,l,d,u){return o.startAt=n,qe(o).immediateRender=xt(o.immediateRender),this.staggerTo(s,a,o,c,l,d,u)},e.render=function(s,a,n){var o=this._time,c=this._dirty?this.totalDuration():this._tDur,l=this._dur,d=s<=0?0:it(s),u=this._zTime<0!=s<0&&(this._initted||!l),p,m,v,h,g,_,S,T,x,k,E,C;if(this!==st&&d>c&&s>=0&&(d=c),d!==this._tTime||n||u){if(o!==this._time&&l&&(d+=this._time-o,s+=this._time-o),p=d,x=this._start,T=this._ts,_=!T,u&&(l||(o=this._zTime),(s||!a)&&(this._zTime=s)),this._repeat){if(E=this._yoyo,g=l+this._rDelay,this._repeat<-1&&s<0)return this.totalTime(g*100+s,a,n);if(p=it(d%g),d===c?(h=this._repeat,p=l):(k=it(d/g),h=~~k,h&&h===k&&(p=l,h--),p>l&&(p=l)),k=Le(this._tTime,g),!o&&this._tTime&&k!==h&&this._tTime-k*g-this._dur<=0&&(k=h),E&&h&1&&(p=l-p,C=1),h!==k&&!this._lock){var w=E&&k&1,b=w===(E&&h&1);if(h<k&&(w=!w),o=w?0:d%l?l:d,this._lock=1,this.render(o||(C?0:it(h*g)),a,!l)._lock=0,this._tTime=d,!a&&this.parent&&Ot(this,"onRepeat"),this.vars.repeatRefresh&&!C&&(this.invalidate()._lock=1,k=h),o&&o!==this._time||_!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(l=this._dur,c=this._tDur,b&&(this._lock=2,o=w?l:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!C&&this.invalidate()),this._lock=0,!this._ts&&!_)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(S=sn(this,it(o),it(p)),S&&(d-=p-(p=S._start))),this._tTime=d,this._time=p,this._act=!!T,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=s,o=0),!o&&d&&l&&!a&&!k&&(Ot(this,"onStart"),this._tTime!==d))return this;if(p>=o&&s>=0)for(m=this._first;m;){if(v=m._next,(m._act||p>=m._start)&&m._ts&&S!==m){if(m.parent!==this)return this.render(s,a,n);if(m.render(m._ts>0?(p-m._start)*m._ts:(m._dirty?m.totalDuration():m._tDur)+(p-m._start)*m._ts,a,n),p!==this._time||!this._ts&&!_){S=0,v&&(d+=this._zTime=-Q);break}}m=v}else{m=this._last;for(var M=s<0?s:p;m;){if(v=m._prev,(m._act||M<=m._end)&&m._ts&&S!==m){if(m.parent!==this)return this.render(s,a,n);if(m.render(m._ts>0?(M-m._start)*m._ts:(m._dirty?m.totalDuration():m._tDur)+(M-m._start)*m._ts,a,n||pt&&Ji(m)),p!==this._time||!this._ts&&!_){S=0,v&&(d+=this._zTime=M?-Q:Q);break}}m=v}}if(S&&!a&&(this.pause(),S.render(p>=o?0:-Q)._zTime=p>=o?1:-1,this._ts))return this._start=x,hi(this),this.render(s,a,n);this._onUpdate&&!a&&Ot(this,"onUpdate",!0),(d===c&&this._tTime>=this.totalDuration()||!d&&o)&&(x===this._start||Math.abs(T)!==Math.abs(this._ts))&&(this._lock||((s||!l)&&(d===c&&this._ts>0||!d&&this._ts<0)&&se(this,1),!a&&!(s<0&&!o)&&(d||o||!c)&&(Ot(this,d===c&&s>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(d<c&&this.timeScale()>0)&&this._prom())))}return this},e.add=function(s,a){var n=this;if(jt(a)||(a=Dt(this,a,s)),!(s instanceof Ge)){if(gt(s))return s.forEach(function(o){return n.add(o,a)}),this;if(ct(s))return this.addLabel(s,a);if(at(s))s=lt.delayedCall(0,s);else return this}return this!==s?zt(this,s,a):this},e.getChildren=function(s,a,n,o){s===void 0&&(s=!0),a===void 0&&(a=!0),n===void 0&&(n=!0),o===void 0&&(o=-qt);for(var c=[],l=this._first;l;)l._start>=o&&(l instanceof lt?a&&c.push(l):(n&&c.push(l),s&&c.push.apply(c,l.getChildren(!0,a,n)))),l=l._next;return c},e.getById=function(s){for(var a=this.getChildren(1,1,1),n=a.length;n--;)if(a[n].vars.id===s)return a[n]},e.remove=function(s){return ct(s)?this.removeLabel(s):at(s)?this.killTweensOf(s):(s.parent===this&&ui(this,s),s===this._recent&&(this._recent=this._last),me(this))},e.totalTime=function(s,a){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=it(Et.time-(this._ts>0?s/this._ts:(this.totalDuration()-s)/-this._ts))),r.prototype.totalTime.call(this,s,a),this._forcing=0,this):this._tTime},e.addLabel=function(s,a){return this.labels[s]=Dt(this,a),this},e.removeLabel=function(s){return delete this.labels[s],this},e.addPause=function(s,a,n){var o=lt.delayedCall(0,a||Ve,n);return o.data="isPause",this._hasPause=1,zt(this,o,Dt(this,s))},e.removePause=function(s){var a=this._first;for(s=Dt(this,s);a;)a._start===s&&a.data==="isPause"&&se(a),a=a._next},e.killTweensOf=function(s,a,n){for(var o=this.getTweensOf(s,n),c=o.length;c--;)Jt!==o[c]&&o[c].kill(s,a);return this},e.getTweensOf=function(s,a){for(var n=[],o=Nt(s),c=this._first,l=jt(a),d;c;)c instanceof lt?ja(c._targets,o)&&(l?(!Jt||c._initted&&c._ts)&&c.globalTime(0)<=a&&c.globalTime(c.totalDuration())>a:!a||c.isActive())&&n.push(c):(d=c.getTweensOf(o,a)).length&&n.push.apply(n,d),c=c._next;return n},e.tweenTo=function(s,a){a=a||{};var n=this,o=Dt(n,s),c=a,l=c.startAt,d=c.onStart,u=c.onStartParams,p=c.immediateRender,m,v=lt.to(n,It({ease:a.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:a.duration||Math.abs((o-(l&&"time"in l?l.time:n._time))/n.timeScale())||Q,onStart:function(){if(n.pause(),!m){var g=a.duration||Math.abs((o-(l&&"time"in l?l.time:n._time))/n.timeScale());v._dur!==g&&Ee(v,g,0,1).render(v._time,!0,!0),m=1}d&&d.apply(v,u||[])}},a));return p?v.render(0):v},e.tweenFromTo=function(s,a,n){return this.tweenTo(a,It({startAt:{time:Dt(this,s)}},n))},e.recent=function(){return this._recent},e.nextLabel=function(s){return s===void 0&&(s=this._time),Ts(this,Dt(this,s))},e.previousLabel=function(s){return s===void 0&&(s=this._time),Ts(this,Dt(this,s),1)},e.currentLabel=function(s){return arguments.length?this.seek(s,!0):this.previousLabel(this._time+Q)},e.shiftChildren=function(s,a,n){n===void 0&&(n=0);var o=this._first,c=this.labels,l;for(s=it(s);o;)o._start>=n&&(o._start+=s,o._end+=s),o=o._next;if(a)for(l in c)c[l]>=n&&(c[l]+=s);return me(this)},e.invalidate=function(s){var a=this._first;for(this._lock=0;a;)a.invalidate(s),a=a._next;return r.prototype.invalidate.call(this,s)},e.clear=function(s){s===void 0&&(s=!0);for(var a=this._first,n;a;)n=a._next,this.remove(a),a=n;return this._dp&&(this._time=this._tTime=this._pTime=0),s&&(this.labels={}),me(this)},e.totalDuration=function(s){var a=0,n=this,o=n._last,c=qt,l,d,u;if(arguments.length)return n.timeScale((n._repeat<0?n.duration():n.totalDuration())/(n.reversed()?-s:s));if(n._dirty){for(u=n.parent;o;)l=o._prev,o._dirty&&o.totalDuration(),d=o._start,d>c&&n._sort&&o._ts&&!n._lock?(n._lock=1,zt(n,o,d-o._delay,1)._lock=0):c=d,d<0&&o._ts&&(a-=d,(!u&&!n._dp||u&&u.smoothChildTiming)&&(n._start+=it(d/n._ts),n._time-=d,n._tTime-=d),n.shiftChildren(-d,!1,-1/0),c=0),o._end>a&&o._ts&&(a=o._end),o=l;Ee(n,n===st&&n._time>a?n._time:a,1,1),n._dirty=0}return n._tDur},t.updateRoot=function(s){if(st._ts&&(fr(st,ni(s,st)),hr=Et.frame),Et.frame>=_s){_s+=Bt.autoSleep||120;var a=st._first;if((!a||!a._ts)&&Bt.autoSleep&&Et._listeners.length<2){for(;a&&!a._ts;)a=a._next;a||Et.sleep()}}},t})(Ge);It(kt.prototype,{_lock:0,_hasPause:0,_forcing:0});var _n=function(t,e,i,s,a,n,o){var c=new Ct(this._pt,t,e,0,1,Fr,null,a),l=0,d=0,u,p,m,v,h,g,_,S;for(c.b=i,c.e=s,i+="",s+="",(_=~s.indexOf("random("))&&(s=Ue(s)),n&&(S=[i,s],n(S,t,e),i=S[0],s=S[1]),p=i.match(mi)||[];u=mi.exec(s);)v=u[0],h=s.substring(l,u.index),m?m=(m+1)%5:h.substr(-5)==="rgba("&&(m=1),v!==p[d++]&&(g=parseFloat(p[d-1])||0,c._pt={_next:c._pt,p:h||d===1?h:",",s:g,c:v.charAt(1)==="="?ke(g,v)-g:parseFloat(v)-g,m:m&&m<4?Math.round:0},l=mi.lastIndex);return c.c=l<s.length?s.substring(l,s.length):"",c.fp=o,(lr.test(s)||_)&&(c.e=0),this._pt=c,c},Zi=function(t,e,i,s,a,n,o,c,l,d){at(s)&&(s=s(a||0,t,n));var u=t[e],p=i!=="get"?i:at(u)?l?t[e.indexOf("set")||!at(t["get"+e.substr(3)])?e:"get"+e.substr(3)](l):t[e]():u,m=at(u)?l?xn:qr:es,v;if(ct(s)&&(~s.indexOf("random(")&&(s=Ue(s)),s.charAt(1)==="="&&(v=ke(p,s)+(mt(p)||0),(v||v===0)&&(s=v))),!d||p!==s||Oi)return!isNaN(p*s)&&s!==""?(v=new Ct(this._pt,t,e,+p||0,s-(p||0),typeof u=="boolean"?Cn:Nr,0,m),l&&(v.fp=l),o&&v.modifier(o,this,t),this._pt=v):(!u&&!(e in t)&&Xi(e,s),_n.call(this,t,e,p,s,m,c||Bt.stringFilter,l))},wn=function(t,e,i,s,a){if(at(t)&&(t=Fe(t,a,e,i,s)),!Vt(t)||t.style&&t.nodeType||gt(t)||nr(t))return ct(t)?Fe(t,a,e,i,s):t;var n={},o;for(o in t)n[o]=Fe(t[o],a,e,i,s);return n},$r=function(t,e,i,s,a,n){var o,c,l,d;if(Lt[t]&&(o=new Lt[t]).init(a,o.rawVars?e[t]:wn(e[t],s,a,n,i),i,s,n)!==!1&&(i._pt=c=new Ct(i._pt,a,t,0,1,o.render,o,0,o.priority),i!==Se))for(l=i._ptLookup[i._targets.indexOf(a)],d=o._props.length;d--;)l[o._props[d]]=c;return o},Jt,Oi,ts=function r(t,e,i){var s=t.vars,a=s.ease,n=s.startAt,o=s.immediateRender,c=s.lazy,l=s.onUpdate,d=s.runBackwards,u=s.yoyoEase,p=s.keyframes,m=s.autoRevert,v=t._dur,h=t._startAt,g=t._targets,_=t.parent,S=_&&_.data==="nested"?_.vars.targets:g,T=t._overwrite==="auto"&&!Vi,x=t.timeline,k=s.easeReverse||u,E,C,w,b,M,A,P,L,H,W,U,Y,et;if(x&&(!p||!a)&&(a="none"),t._ease=ve(a,ze.ease),t._rEase=k&&(ve(k)||t._ease),t._from=!x&&!!s.runBackwards,t._from&&(t.ratio=1),!x||p&&!s.stagger){if(L=g[0]?fe(g[0]).harness:0,Y=L&&s[L.prop],E=ai(s,ji),h&&(h._zTime<0&&h.progress(1),e<0&&d&&o&&!m?h.render(-1,!0):h.revert(d&&v?ti:Ga),h._lazy=0),n){if(se(t._startAt=lt.set(g,It({data:"isStart",overwrite:!1,parent:_,immediateRender:!0,lazy:!h&&xt(c),startAt:null,delay:0,onUpdate:l&&function(){return Ot(t,"onUpdate")},stagger:0},n))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(pt||!o&&!m)&&t._startAt.revert(ti),o&&v&&e<=0&&i<=0){e&&(t._zTime=e);return}}else if(d&&v&&!h){if(e&&(o=!1),w=It({overwrite:!1,data:"isFromStart",lazy:o&&!h&&xt(c),immediateRender:o,stagger:0,parent:_},E),Y&&(w[L.prop]=Y),se(t._startAt=lt.set(g,w)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(pt?t._startAt.revert(ti):t._startAt.render(-1,!0)),t._zTime=e,!o)r(t._startAt,Q,Q);else if(!e)return}for(t._pt=t._ptCache=0,c=v&&xt(c)||c&&!v,C=0;C<g.length;C++){if(M=g[C],P=M._gsap||Qi(g)[C]._gsap,t._ptLookup[C]=W={},Mi[P.id]&&ee.length&&ri(),U=S===g?C:S.indexOf(M),L&&(H=new L).init(M,Y||E,t,U,S)!==!1&&(t._pt=b=new Ct(t._pt,M,H.name,0,1,H.render,H,0,H.priority),H._props.forEach(function(ft){W[ft]=b}),H.priority&&(A=1)),!L||Y)for(w in E)Lt[w]&&(H=$r(w,E,t,U,M,S))?H.priority&&(A=1):W[w]=b=Zi.call(t,M,w,"get",E[w],U,S,0,s.stringFilter);t._op&&t._op[C]&&t.kill(M,t._op[C]),T&&t._pt&&(Jt=t,st.killTweensOf(M,W,t.globalTime(e)),et=!t.parent,Jt=0),t._pt&&c&&(Mi[P.id]=1)}A&&Hr(t),t._onInit&&t._onInit(t)}t._onUpdate=l,t._initted=(!t._op||t._pt)&&!et,p&&e<=0&&x.render(qt,!0,!0)},Sn=function(t,e,i,s,a,n,o,c){var l=(t._pt&&t._ptCache||(t._ptCache={}))[e],d,u,p,m;if(!l)for(l=t._ptCache[e]=[],p=t._ptLookup,m=t._targets.length;m--;){if(d=p[m][e],d&&d.d&&d.d._pt)for(d=d.d._pt;d&&d.p!==e&&d.fp!==e;)d=d._next;if(!d)return Oi=1,t.vars[e]="+=0",ts(t,o),Oi=0,c?We(e+" not eligible for reset. Try splitting into individual properties"):1;l.push(d)}for(m=l.length;m--;)u=l[m],d=u._pt||u,d.s=(s||s===0)&&!a?s:d.s+(s||0)+n*d.c,d.c=i-d.s,u.e&&(u.e=nt(i)+mt(u.e)),u.b&&(u.b=d.s+mt(u.b))},kn=function(t,e){var i=t[0]?fe(t[0]).harness:0,s=i&&i.aliases,a,n,o,c;if(!s)return e;a=Ae({},e);for(n in s)if(n in a)for(c=s[n].split(","),o=c.length;o--;)a[c[o]]=a[n];return a},Tn=function(t,e,i,s){var a=e.ease||s||"power1.inOut",n,o;if(gt(e))o=i[t]||(i[t]=[]),e.forEach(function(c,l){return o.push({t:l/(e.length-1)*100,v:c,e:a})});else for(n in e)o=i[n]||(i[n]=[]),n==="ease"||o.push({t:parseFloat(t),v:e[n],e:a})},Fe=function(t,e,i,s,a){return at(t)?t.call(e,i,s,a):ct(t)&&~t.indexOf("random(")?Ue(t):t},Ir=Ki+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",Dr={};Mt(Ir+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return Dr[r]=1});var lt=(function(r){rr(t,r);function t(i,s,a,n){var o;typeof s=="number"&&(a.duration=s,s=a,a=null),o=r.call(this,n?s:qe(s))||this;var c=o.vars,l=c.duration,d=c.delay,u=c.immediateRender,p=c.stagger,m=c.overwrite,v=c.keyframes,h=c.defaults,g=c.scrollTrigger,_=s.parent||st,S=(gt(i)||nr(i)?jt(i[0]):"length"in s)?[i]:Nt(i),T,x,k,E,C,w,b,M;if(o._targets=S.length?Qi(S):We("GSAP target "+i+" not found. https://gsap.com",!Bt.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=m,v||p||Je(l)||Je(d)){s=o.vars;var A=s.easeReverse||s.yoyoEase;if(T=o.timeline=new kt({data:"nested",defaults:h||{},targets:_&&_.data==="nested"?_.vars.targets:S}),T.kill(),T.parent=T._dp=Yt(o),T._start=0,p||Je(l)||Je(d)){if(E=S.length,b=p&&kr(p),Vt(p))for(C in p)~Ir.indexOf(C)&&(M||(M={}),M[C]=p[C]);for(x=0;x<E;x++)k=ai(s,Dr),k.stagger=0,A&&(k.easeReverse=A),M&&Ae(k,M),w=S[x],k.duration=+Fe(l,Yt(o),x,w,S),k.delay=(+Fe(d,Yt(o),x,w,S)||0)-o._delay,!p&&E===1&&k.delay&&(o._delay=d=k.delay,o._start+=d,k.delay=0),T.to(w,k,b?b(x,w,S):0),T._ease=V.none;T.duration()?l=d=0:o.timeline=0}else if(v){qe(It(T.vars.defaults,{ease:"none"})),T._ease=ve(v.ease||s.ease||"none");var P=0,L,H,W;if(gt(v))v.forEach(function(U){return T.to(S,U,">")}),T.duration();else{k={};for(C in v)C==="ease"||C==="easeEach"||Tn(C,v[C],k,v.easeEach);for(C in k)for(L=k[C].sort(function(U,Y){return U.t-Y.t}),P=0,x=0;x<L.length;x++)H=L[x],W={ease:H.e,duration:(H.t-(x?L[x-1].t:0))/100*l},W[C]=H.v,T.to(S,W,P),P+=W.duration;T.duration()<l&&T.to({},{duration:l-T.duration()})}}l||o.duration(l=T.duration())}else o.timeline=0;return m===!0&&!Vi&&(Jt=Yt(o),st.killTweensOf(S),Jt=0),zt(_,Yt(o),a),s.reversed&&o.reverse(),s.paused&&o.paused(!0),(u||!l&&!v&&o._start===it(_._time)&&xt(u)&&Za(Yt(o))&&_.data!=="nested")&&(o._tTime=-Q,o.render(Math.max(0,-d)||0)),g&&yr(Yt(o),g),o}var e=t.prototype;return e.render=function(s,a,n){var o=this._time,c=this._tDur,l=this._dur,d=s<0,u=s>c-Q&&!d?c:s<Q?0:s,p,m,v,h,g,_,S,T;if(!l)en(this,s,a,n);else if(u!==this._tTime||!s||n||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==d||this._lazy){if(p=u,T=this.timeline,this._repeat){if(h=l+this._rDelay,this._repeat<-1&&d)return this.totalTime(h*100+s,a,n);if(p=it(u%h),u===c?(v=this._repeat,p=l):(g=it(u/h),v=~~g,v&&v===g?(p=l,v--):p>l&&(p=l)),_=this._yoyo&&v&1,_&&(p=l-p),g=Le(this._tTime,h),p===o&&!n&&this._initted&&v===g)return this._tTime=u,this;v!==g&&this.vars.repeatRefresh&&!_&&!this._lock&&p!==h&&this._initted&&(this._lock=n=1,this.render(it(h*v),!0).invalidate()._lock=0)}if(!this._initted){if(_r(this,d?s:p,n,a,u))return this._tTime=0,this;if(o!==this._time&&!(n&&this.vars.repeatRefresh&&v!==g))return this;if(l!==this._dur)return this.render(s,a,n)}if(this._rEase){var x=p<o;if(x!==this._inv){var k=x?o:l-o;this._inv=x,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=o,this._invRecip=k?(x?-1:1)/k:0,this._invScale=x?-this.ratio:1-this.ratio,this._invEase=x?this._rEase:this._ease}this.ratio=S=this._invRatio+this._invScale*this._invEase((p-this._invTime)*this._invRecip)}else this.ratio=S=this._ease(p/l);if(this._from&&(this.ratio=S=1-S),this._tTime=u,this._time=p,!this._act&&this._ts&&(this._act=1,this._lazy=0),!o&&u&&!a&&!g&&(Ot(this,"onStart"),this._tTime!==u))return this;for(m=this._pt;m;)m.r(S,m.d),m=m._next;T&&T.render(s<0?s:T._dur*T._ease(p/this._dur),a,n)||this._startAt&&(this._zTime=s),this._onUpdate&&!a&&(d&&Ci(this,s,a,n),Ot(this,"onUpdate")),this._repeat&&v!==g&&this.vars.onRepeat&&!a&&this.parent&&Ot(this,"onRepeat"),(u===this._tDur||!u)&&this._tTime===u&&(d&&!this._onUpdate&&Ci(this,s,!0,!0),(s||!l)&&(u===this._tDur&&this._ts>0||!u&&this._ts<0)&&se(this,1),!a&&!(d&&!o)&&(u||o||_)&&(Ot(this,u===c?"onComplete":"onReverseComplete",!0),this._prom&&!(u<c&&this.timeScale()>0)&&this._prom()))}return this},e.targets=function(){return this._targets},e.invalidate=function(s){return(!s||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(s),r.prototype.invalidate.call(this,s)},e.resetTo=function(s,a,n,o,c){Ye||Et.wake(),this._ts||this.play();var l=Math.min(this._dur,(this._dp._time-this._start)*this._ts),d;return this._initted||ts(this,l),d=this._ease(l/this._dur),Sn(this,s,a,n,o,d,l,c)?this.resetTo(s,a,n,o,1):(pi(this,0),this.parent||gr(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function(s,a){if(a===void 0&&(a="all"),!s&&(!a||a==="all"))return this._lazy=this._pt=0,this.parent?Ie(this):this.scrollTrigger&&this.scrollTrigger.kill(!!pt),this;if(this.timeline){var n=this.timeline.totalDuration();return this.timeline.killTweensOf(s,a,Jt&&Jt.vars.overwrite!==!0)._first||Ie(this),this.parent&&n!==this.timeline.totalDuration()&&Ee(this,this._dur*this.timeline._tDur/n,0,1),this}var o=this._targets,c=s?Nt(s):o,l=this._ptLookup,d=this._pt,u,p,m,v,h,g,_;if((!a||a==="all")&&Qa(o,c))return a==="all"&&(this._pt=0),Ie(this);for(u=this._op=this._op||[],a!=="all"&&(ct(a)&&(h={},Mt(a,function(S){return h[S]=1}),a=h),a=kn(o,a)),_=o.length;_--;)if(~c.indexOf(o[_])){p=l[_],a==="all"?(u[_]=a,v=p,m={}):(m=u[_]=u[_]||{},v=a);for(h in v)g=p&&p[h],g&&((!("kill"in g.d)||g.d.kill(h)===!0)&&ui(this,g,"_pt"),delete p[h]),m!=="all"&&(m[h]=1)}return this._initted&&!this._pt&&d&&Ie(this),this},t.to=function(s,a){return new t(s,a,arguments[2])},t.from=function(s,a){return Ne(1,arguments)},t.delayedCall=function(s,a,n,o){return new t(a,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:s,onComplete:a,onReverseComplete:a,onCompleteParams:n,onReverseCompleteParams:n,callbackScope:o})},t.fromTo=function(s,a,n){return Ne(2,arguments)},t.set=function(s,a){return a.duration=0,a.repeatDelay||(a.repeat=0),new t(s,a)},t.killTweensOf=function(s,a,n){return st.killTweensOf(s,a,n)},t})(Ge);It(lt.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});Mt("staggerTo,staggerFrom,staggerFromTo",function(r){lt[r]=function(){var t=new kt,e=Ai.call(arguments,0);return e.splice(r==="staggerFromTo"?5:4,0,0),t[r].apply(t,e)}});var es=function(t,e,i){return t[e]=i},qr=function(t,e,i){return t[e](i)},xn=function(t,e,i,s){return t[e](s.fp,i)},Mn=function(t,e,i){return t.setAttribute(e,i)},is=function(t,e){return at(t[e])?qr:Ui(t[e])&&t.setAttribute?Mn:es},Nr=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e6)/1e6,e)},Cn=function(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},Fr=function(t,e){var i=e._pt,s="";if(!t&&e.b)s=e.b;else if(t===1&&e.e)s=e.e;else{for(;i;)s=i.p+(i.m?i.m(i.s+i.c*t):Math.round((i.s+i.c*t)*1e4)/1e4)+s,i=i._next;s+=e.c}e.set(e.t,e.p,s,e)},ss=function(t,e){for(var i=e._pt;i;)i.r(t,i.d),i=i._next},Pn=function(t,e,i,s){for(var a=this._pt,n;a;)n=a._next,a.p===s&&a.modifier(t,e,i),a=n},An=function(t){for(var e=this._pt,i,s;e;)s=e._next,e.p===t&&!e.op||e.op===t?ui(this,e,"_pt"):e.dep||(i=1),e=s;return!i},Ln=function(t,e,i,s){s.mSet(t,e,s.m.call(s.tween,i,s.mt),s)},Hr=function(t){for(var e=t._pt,i,s,a,n;e;){for(i=e._next,s=a;s&&s.pr>e.pr;)s=s._next;(e._prev=s?s._prev:n)?e._prev._next=e:a=e,(e._next=s)?s._prev=e:n=e,e=i}t._pt=a},Ct=(function(){function r(e,i,s,a,n,o,c,l,d){this.t=i,this.s=a,this.c=n,this.p=s,this.r=o||Nr,this.d=c||this,this.set=l||es,this.pr=d||0,this._next=e,e&&(e._prev=this)}var t=r.prototype;return t.modifier=function(i,s,a){this.mSet=this.mSet||this.set,this.set=Ln,this.m=i,this.mt=a,this.tween=s},r})();Mt(Ki+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(r){return ji[r]=1});$t.TweenMax=$t.TweenLite=lt;$t.TimelineLite=$t.TimelineMax=kt;st=new kt({sortChildren:!1,defaults:ze,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Bt.stringFilter=Or;var ge=[],ii={},En=[],Ms=0,On=0,_i=function(t){return(ii[t]||En).map(function(e){return e()})},Ri=function(){var t=Date.now(),e=[];t-Ms>2&&(_i("matchMediaInit"),ge.forEach(function(i){var s=i.queries,a=i.conditions,n,o,c,l;for(o in s)n=Ht.matchMedia(s[o]).matches,n&&(c=1),n!==a[o]&&(a[o]=n,l=1);l&&(i.revert(),c&&e.push(i))}),_i("matchMediaRevert"),e.forEach(function(i){return i.onMatch(i,function(s){return i.add(null,s)})}),Ms=t,_i("matchMedia"))},zr=(function(){function r(e,i){this.selector=i&&Li(i),this.data=[],this._r=[],this.isReverted=!1,this.id=On++,e&&this.add(e)}var t=r.prototype;return t.add=function(i,s,a){at(i)&&(a=s,s=i,i=at);var n=this,o=function(){var l=tt,d=n.selector,u;return l&&l!==n&&l.data.push(n),a&&(n.selector=Li(a)),tt=n,u=s.apply(n,arguments),at(u)&&n._r.push(u),tt=l,n.selector=d,n.isReverted=!1,u};return n.last=o,i===at?o(n,function(c){return n.add(null,c)}):i?n[i]=o:o},t.ignore=function(i){var s=tt;tt=null,i(this),tt=s},t.getTweens=function(){var i=[];return this.data.forEach(function(s){return s instanceof r?i.push.apply(i,s.getTweens()):s instanceof lt&&!(s.parent&&s.parent.data==="nested")&&i.push(s)}),i},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(i,s){var a=this;if(i?(function(){for(var o=a.getTweens(),c=a.data.length,l;c--;)l=a.data[c],l.data==="isFlip"&&(l.revert(),l.getChildren(!0,!0,!1).forEach(function(d){return o.splice(o.indexOf(d),1)}));for(o.map(function(d){return{g:d._dur||d._delay||d._sat&&!d._sat.vars.immediateRender?d.globalTime(0):-1/0,t:d}}).sort(function(d,u){return u.g-d.g||-1/0}).forEach(function(d){return d.t.revert(i)}),c=a.data.length;c--;)l=a.data[c],l instanceof kt?l.data!=="nested"&&(l.scrollTrigger&&l.scrollTrigger.revert(),l.kill()):!(l instanceof lt)&&l.revert&&l.revert(i);a._r.forEach(function(d){return d(i,a)}),a.isReverted=!0})():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),s)for(var n=ge.length;n--;)ge[n].id===this.id&&ge.splice(n,1)},t.revert=function(i){this.kill(i||{})},r})(),Rn=(function(){function r(e){this.contexts=[],this.scope=e,tt&&tt.data.push(this)}var t=r.prototype;return t.add=function(i,s,a){Vt(i)||(i={matches:i});var n=new zr(0,a||this.scope),o=n.conditions={},c,l,d;tt&&!n.selector&&(n.selector=tt.selector),this.contexts.push(n),s=n.add("onMatch",s),n.queries=i;for(l in i)l==="all"?d=1:(c=Ht.matchMedia(i[l]),c&&(ge.indexOf(n)<0&&ge.push(n),(o[l]=c.matches)&&(d=1),c.addListener?c.addListener(Ri):c.addEventListener("change",Ri)));return d&&s(n,function(u){return n.add(null,u)}),this},t.revert=function(i){this.kill(i||{})},t.kill=function(i){this.contexts.forEach(function(s){return s.kill(i,!0)})},r})(),oi={registerPlugin:function(){for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];e.forEach(function(s){return Ar(s)})},timeline:function(t){return new kt(t)},getTweensOf:function(t,e){return st.getTweensOf(t,e)},getProperty:function(t,e,i,s){ct(t)&&(t=Nt(t)[0]);var a=fe(t||{}).get,n=i?vr:mr;return i==="native"&&(i=""),t&&(e?n((Lt[e]&&Lt[e].get||a)(t,e,i,s)):function(o,c,l){return n((Lt[o]&&Lt[o].get||a)(t,o,c,l))})},quickSetter:function(t,e,i){if(t=Nt(t),t.length>1){var s=t.map(function(d){return At.quickSetter(d,e,i)}),a=s.length;return function(d){for(var u=a;u--;)s[u](d)}}t=t[0]||{};var n=Lt[e],o=fe(t),c=o.harness&&(o.harness.aliases||{})[e]||e,l=n?function(d){var u=new n;Se._pt=0,u.init(t,i?d+i:d,Se,0,[t]),u.render(1,u),Se._pt&&ss(1,Se)}:o.set(t,c);return n?l:function(d){return l(t,c,i?d+i:d,o,1)}},quickTo:function(t,e,i){var s,a=At.to(t,It((s={},s[e]="+=0.1",s.paused=!0,s.stagger=0,s),i||{})),n=function(c,l,d){return a.resetTo(e,c,l,d)};return n.tween=a,n},isTweening:function(t){return st.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=ve(t.ease,ze.ease)),ws(ze,t||{})},config:function(t){return ws(Bt,t||{})},registerEffect:function(t){var e=t.name,i=t.effect,s=t.plugins,a=t.defaults,n=t.extendTimeline;(s||"").split(",").forEach(function(o){return o&&!Lt[o]&&!$t[o]&&We(e+" effect requires "+o+" plugin.")}),vi[e]=function(o,c,l){return i(Nt(o),It(c||{},a),l)},n&&(kt.prototype[e]=function(o,c,l){return this.add(vi[e](o,Vt(c)?c:(l=c)&&{},this),l)})},registerEase:function(t,e){V[t]=ve(e)},parseEase:function(t,e){return arguments.length?ve(t,e):V},getById:function(t){return st.getById(t)},exportRoot:function(t,e){t===void 0&&(t={});var i=new kt(t),s,a;for(i.smoothChildTiming=xt(t.smoothChildTiming),st.remove(i),i._dp=0,i._time=i._tTime=st._time,s=st._first;s;)a=s._next,(e||!(!s._dur&&s instanceof lt&&s.vars.onComplete===s._targets[0]))&&zt(i,s,s._start-s._delay),s=a;return zt(st,i,0),i},context:function(t,e){return t?new zr(t,e):tt},matchMedia:function(t){return new Rn(t)},matchMediaRefresh:function(){return ge.forEach(function(t){var e=t.conditions,i,s;for(s in e)e[s]&&(e[s]=!1,i=1);i&&t.revert()})||Ri()},addEventListener:function(t,e){var i=ii[t]||(ii[t]=[]);~i.indexOf(e)||i.push(e)},removeEventListener:function(t,e){var i=ii[t],s=i&&i.indexOf(e);s>=0&&i.splice(s,1)},utils:{wrap:dn,wrapYoyo:un,distribute:kr,random:xr,snap:Tr,normalize:cn,getUnit:mt,clamp:an,splitColor:Lr,toArray:Nt,selector:Li,mapRange:Cr,pipe:on,unitize:ln,interpolate:hn,shuffle:Sr},install:dr,effects:vi,ticker:Et,updateRoot:kt.updateRoot,plugins:Lt,globalTimeline:st,core:{PropTween:Ct,globals:ur,Tween:lt,Timeline:kt,Animation:Ge,getCache:fe,_removeLinkedListItem:ui,reverting:function(){return pt},context:function(t){return t&&tt&&(tt.data.push(t),t._ctx=tt),tt},suppressOverwrites:function(t){return Vi=t}}};Mt("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return oi[r]=lt[r]});Et.add(kt.updateRoot);Se=oi.to({},{duration:0});var Bn=function(t,e){for(var i=t._pt;i&&i.p!==e&&i.op!==e&&i.fp!==e;)i=i._next;return i},$n=function(t,e){var i=t._targets,s,a,n;for(s in e)for(a=i.length;a--;)n=t._ptLookup[a][s],n&&(n=n.d)&&(n._pt&&(n=Bn(n,s)),n&&n.modifier&&n.modifier(e[s],t,i[a],s))},wi=function(t,e){return{name:t,headless:1,rawVars:1,init:function(s,a,n){n._onInit=function(o){var c,l;if(ct(a)&&(c={},Mt(a,function(d){return c[d]=1}),a=c),e){c={};for(l in a)c[l]=e(a[l]);a=c}$n(o,a)}}}},At=oi.registerPlugin({name:"attr",init:function(t,e,i,s,a){var n,o,c;this.tween=i;for(n in e)c=t.getAttribute(n)||"",o=this.add(t,"setAttribute",(c||0)+"",e[n],s,a,0,0,n),o.op=n,o.b=c,this._props.push(n)},render:function(t,e){for(var i=e._pt;i;)pt?i.set(i.t,i.p,i.b,i):i.r(t,i.d),i=i._next}},{name:"endArray",headless:1,init:function(t,e){for(var i=e.length;i--;)this.add(t,i,t[i]||0,e[i],0,0,0,0,0,1)}},wi("roundProps",Ei),wi("modifiers"),wi("snap",Tr))||oi;lt.version=kt.version=At.version="3.15.0";cr=1;Yi()&&Oe();V.Power0;V.Power1;V.Power2;V.Power3;V.Power4;V.Linear;V.Quad;V.Cubic;V.Quart;V.Quint;V.Strong;V.Elastic;V.Back;V.SteppedEase;V.Bounce;V.Sine;V.Expo;V.Circ;/*!
 * CSSPlugin 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Cs,Zt,Te,rs,pe,Ps,as,In=function(){return typeof window<"u"},Kt={},ue=180/Math.PI,xe=Math.PI/180,_e=Math.atan2,As=1e8,ns=/([A-Z])/g,Dn=/(left|right|width|margin|padding|x)/i,qn=/[\s,\(]\S/,Wt={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Bi=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},Nn=function(t,e){return e.set(e.t,e.p,t===1?e.e:Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},Fn=function(t,e){return e.set(e.t,e.p,t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},Hn=function(t,e){return e.set(e.t,e.p,t===1?e.e:t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},zn=function(t,e){var i=e.s+e.c*t;e.set(e.t,e.p,~~(i+(i<0?-.5:.5))+e.u,e)},Wr=function(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)},Vr=function(t,e){return e.set(e.t,e.p,t!==1?e.b:e.e,e)},Wn=function(t,e,i){return t.style[e]=i},Vn=function(t,e,i){return t.style.setProperty(e,i)},Un=function(t,e,i){return t._gsap[e]=i},Yn=function(t,e,i){return t._gsap.scaleX=t._gsap.scaleY=i},Gn=function(t,e,i,s,a){var n=t._gsap;n.scaleX=n.scaleY=i,n.renderTransform(a,n)},Xn=function(t,e,i,s,a){var n=t._gsap;n[e]=i,n.renderTransform(a,n)},rt="transform",Pt=rt+"Origin",jn=function r(t,e){var i=this,s=this.target,a=s.style,n=s._gsap;if(t in Kt&&a){if(this.tfm=this.tfm||{},t!=="transform")t=Wt[t]||t,~t.indexOf(",")?t.split(",").forEach(function(o){return i.tfm[o]=Gt(s,o)}):this.tfm[t]=n.x?n[t]:Gt(s,t),t===Pt&&(this.tfm.zOrigin=n.zOrigin);else return Wt.transform.split(",").forEach(function(o){return r.call(i,o,e)});if(this.props.indexOf(rt)>=0)return;n.svg&&(this.svgo=s.getAttribute("data-svg-origin"),this.props.push(Pt,e,"")),t=rt}(a||e)&&this.props.push(t,e,a[t])},Ur=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},Kn=function(){var t=this.props,e=this.target,i=e.style,s=e._gsap,a,n;for(a=0;a<t.length;a+=3)t[a+1]?t[a+1]===2?e[t[a]](t[a+2]):e[t[a]]=t[a+2]:t[a+2]?i[t[a]]=t[a+2]:i.removeProperty(t[a].substr(0,2)==="--"?t[a]:t[a].replace(ns,"-$1").toLowerCase());if(this.tfm){for(n in this.tfm)s[n]=this.tfm[n];s.svg&&(s.renderTransform(),e.setAttribute("data-svg-origin",this.svgo||"")),a=as(),(!a||!a.isStart)&&!i[rt]&&(Ur(i),s.zOrigin&&i[Pt]&&(i[Pt]+=" "+s.zOrigin+"px",s.zOrigin=0,s.renderTransform()),s.uncache=1)}},Yr=function(t,e){var i={target:t,props:[],revert:Kn,save:jn};return t._gsap||At.core.getCache(t),e&&t.style&&t.nodeType&&e.split(",").forEach(function(s){return i.save(s)}),i},Gr,$i=function(t,e){var i=Zt.createElementNS?Zt.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):Zt.createElement(t);return i&&i.style?i:Zt.createElement(t)},Rt=function r(t,e,i){var s=getComputedStyle(t);return s[e]||s.getPropertyValue(e.replace(ns,"-$1").toLowerCase())||s.getPropertyValue(e)||!i&&r(t,Re(e)||e,1)||""},Ls="O,Moz,ms,Ms,Webkit".split(","),Re=function(t,e,i){var s=e||pe,a=s.style,n=5;if(t in a&&!i)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);n--&&!(Ls[n]+t in a););return n<0?null:(n===3?"ms":n>=0?Ls[n]:"")+t},Ii=function(){In()&&window.document&&(Cs=window,Zt=Cs.document,Te=Zt.documentElement,pe=$i("div")||{style:{}},$i("div"),rt=Re(rt),Pt=rt+"Origin",pe.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Gr=!!Re("perspective"),as=At.core.reverting,rs=1)},Es=function(t){var e=t.ownerSVGElement,i=$i("svg",e&&e.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),s=t.cloneNode(!0),a;s.style.display="block",i.appendChild(s),Te.appendChild(i);try{a=s.getBBox()}catch{}return i.removeChild(s),Te.removeChild(i),a},Os=function(t,e){for(var i=e.length;i--;)if(t.hasAttribute(e[i]))return t.getAttribute(e[i])},Xr=function(t){var e,i;try{e=t.getBBox()}catch{e=Es(t),i=1}return e&&(e.width||e.height)||i||(e=Es(t)),e&&!e.width&&!e.x&&!e.y?{x:+Os(t,["x","cx","x1"])||0,y:+Os(t,["y","cy","y1"])||0,width:0,height:0}:e},jr=function(t){return!!(t.getCTM&&(!t.parentNode||t.ownerSVGElement)&&Xr(t))},re=function(t,e){if(e){var i=t.style,s;e in Kt&&e!==Pt&&(e=rt),i.removeProperty?(s=e.substr(0,2),(s==="ms"||e.substr(0,6)==="webkit")&&(e="-"+e),i.removeProperty(s==="--"?e:e.replace(ns,"-$1").toLowerCase())):i.removeAttribute(e)}},te=function(t,e,i,s,a,n){var o=new Ct(t._pt,e,i,0,1,n?Vr:Wr);return t._pt=o,o.b=s,o.e=a,t._props.push(i),o},Rs={deg:1,rad:1,turn:1},Qn={grid:1,flex:1},ae=function r(t,e,i,s){var a=parseFloat(i)||0,n=(i+"").trim().substr((a+"").length)||"px",o=pe.style,c=Dn.test(e),l=t.tagName.toLowerCase()==="svg",d=(l?"client":"offset")+(c?"Width":"Height"),u=100,p=s==="px",m=s==="%",v,h,g,_;if(s===n||!a||Rs[s]||Rs[n])return a;if(n!=="px"&&!p&&(a=r(t,e,i,"px")),_=t.getCTM&&jr(t),(m||n==="%")&&(Kt[e]||~e.indexOf("adius")))return v=_?t.getBBox()[c?"width":"height"]:t[d],nt(m?a/v*u:a/100*v);if(o[c?"width":"height"]=u+(p?n:s),h=s!=="rem"&&~e.indexOf("adius")||s==="em"&&t.appendChild&&!l?t:t.parentNode,_&&(h=(t.ownerSVGElement||{}).parentNode),(!h||h===Zt||!h.appendChild)&&(h=Zt.body),g=h._gsap,g&&m&&g.width&&c&&g.time===Et.time&&!g.uncache)return nt(a/g.width*u);if(m&&(e==="height"||e==="width")){var S=t.style[e];t.style[e]=u+s,v=t[d],S?t.style[e]=S:re(t,e)}else(m||n==="%")&&!Qn[Rt(h,"display")]&&(o.position=Rt(t,"position")),h===t&&(o.position="static"),h.appendChild(pe),v=pe[d],h.removeChild(pe),o.position="absolute";return c&&m&&(g=fe(h),g.time=Et.time,g.width=h[d]),nt(p?v*a/u:v&&a?u/v*a:0)},Gt=function(t,e,i,s){var a;return rs||Ii(),e in Wt&&e!=="transform"&&(e=Wt[e],~e.indexOf(",")&&(e=e.split(",")[0])),Kt[e]&&e!=="transform"?(a=je(t,s),a=e!=="transformOrigin"?a[e]:a.svg?a.origin:ci(Rt(t,Pt))+" "+a.zOrigin+"px"):(a=t.style[e],(!a||a==="auto"||s||~(a+"").indexOf("calc("))&&(a=li[e]&&li[e](t,e,i)||Rt(t,e)||pr(t,e)||(e==="opacity"?1:0))),i&&!~(a+"").trim().indexOf(" ")?ae(t,e,a,i)+i:a},Jn=function(t,e,i,s){if(!i||i==="none"){var a=Re(e,t,1),n=a&&Rt(t,a,1);n&&n!==i?(e=a,i=n):e==="borderColor"&&(i=Rt(t,"borderTopColor"))}var o=new Ct(this._pt,t.style,e,0,1,Fr),c=0,l=0,d,u,p,m,v,h,g,_,S,T,x,k;if(o.b=i,o.e=s,i+="",s+="",s.substring(0,6)==="var(--"&&(s=Rt(t,s.substring(4,s.indexOf(")")))),s==="auto"&&(h=t.style[e],t.style[e]=s,s=Rt(t,e)||s,h?t.style[e]=h:re(t,e)),d=[i,s],Or(d),i=d[0],s=d[1],p=i.match(we)||[],k=s.match(we)||[],k.length){for(;u=we.exec(s);)g=u[0],S=s.substring(c,u.index),v?v=(v+1)%5:(S.substr(-5)==="rgba("||S.substr(-5)==="hsla(")&&(v=1),g!==(h=p[l++]||"")&&(m=parseFloat(h)||0,x=h.substr((m+"").length),g.charAt(1)==="="&&(g=ke(m,g)+x),_=parseFloat(g),T=g.substr((_+"").length),c=we.lastIndex-T.length,T||(T=T||Bt.units[e]||x,c===s.length&&(s+=T,o.e+=T)),x!==T&&(m=ae(t,e,h,T)||0),o._pt={_next:o._pt,p:S||l===1?S:",",s:m,c:_-m,m:v&&v<4||e==="zIndex"?Math.round:0});o.c=c<s.length?s.substring(c,s.length):""}else o.r=e==="display"&&s==="none"?Vr:Wr;return lr.test(s)&&(o.e=0),this._pt=o,o},Bs={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},Zn=function(t){var e=t.split(" "),i=e[0],s=e[1]||"50%";return(i==="top"||i==="bottom"||s==="left"||s==="right")&&(t=i,i=s,s=t),e[0]=Bs[i]||i,e[1]=Bs[s]||s,e.join(" ")},to=function(t,e){if(e.tween&&e.tween._time===e.tween._dur){var i=e.t,s=i.style,a=e.u,n=i._gsap,o,c,l;if(a==="all"||a===!0)s.cssText="",c=1;else for(a=a.split(","),l=a.length;--l>-1;)o=a[l],Kt[o]&&(c=1,o=o==="transformOrigin"?Pt:rt),re(i,o);c&&(re(i,rt),n&&(n.svg&&i.removeAttribute("transform"),s.scale=s.rotate=s.translate="none",je(i,1),n.uncache=1,Ur(s)))}},li={clearProps:function(t,e,i,s,a){if(a.data!=="isFromStart"){var n=t._pt=new Ct(t._pt,e,i,0,0,to);return n.u=s,n.pr=-10,n.tween=a,t._props.push(i),1}}},Xe=[1,0,0,1,0,0],Kr={},Qr=function(t){return t==="matrix(1, 0, 0, 1, 0, 0)"||t==="none"||!t},$s=function(t){var e=Rt(t,rt);return Qr(e)?Xe:e.substr(7).match(or).map(nt)},os=function(t,e){var i=t._gsap||fe(t),s=t.style,a=$s(t),n,o,c,l;return i.svg&&t.getAttribute("transform")?(c=t.transform.baseVal.consolidate().matrix,a=[c.a,c.b,c.c,c.d,c.e,c.f],a.join(",")==="1,0,0,1,0,0"?Xe:a):(a===Xe&&!t.offsetParent&&t!==Te&&!i.svg&&(c=s.display,s.display="block",n=t.parentNode,(!n||!t.offsetParent&&!t.getBoundingClientRect().width)&&(l=1,o=t.nextElementSibling,Te.appendChild(t)),a=$s(t),c?s.display=c:re(t,"display"),l&&(o?n.insertBefore(t,o):n?n.appendChild(t):Te.removeChild(t))),e&&a.length>6?[a[0],a[1],a[4],a[5],a[12],a[13]]:a)},Di=function(t,e,i,s,a,n){var o=t._gsap,c=a||os(t,!0),l=o.xOrigin||0,d=o.yOrigin||0,u=o.xOffset||0,p=o.yOffset||0,m=c[0],v=c[1],h=c[2],g=c[3],_=c[4],S=c[5],T=e.split(" "),x=parseFloat(T[0])||0,k=parseFloat(T[1])||0,E,C,w,b;i?c!==Xe&&(C=m*g-v*h)&&(w=x*(g/C)+k*(-h/C)+(h*S-g*_)/C,b=x*(-v/C)+k*(m/C)-(m*S-v*_)/C,x=w,k=b):(E=Xr(t),x=E.x+(~T[0].indexOf("%")?x/100*E.width:x),k=E.y+(~(T[1]||T[0]).indexOf("%")?k/100*E.height:k)),s||s!==!1&&o.smooth?(_=x-l,S=k-d,o.xOffset=u+(_*m+S*h)-_,o.yOffset=p+(_*v+S*g)-S):o.xOffset=o.yOffset=0,o.xOrigin=x,o.yOrigin=k,o.smooth=!!s,o.origin=e,o.originIsAbsolute=!!i,t.style[Pt]="0px 0px",n&&(te(n,o,"xOrigin",l,x),te(n,o,"yOrigin",d,k),te(n,o,"xOffset",u,o.xOffset),te(n,o,"yOffset",p,o.yOffset)),t.setAttribute("data-svg-origin",x+" "+k)},je=function(t,e){var i=t._gsap||new Br(t);if("x"in i&&!e&&!i.uncache)return i;var s=t.style,a=i.scaleX<0,n="px",o="deg",c=getComputedStyle(t),l=Rt(t,Pt)||"0",d,u,p,m,v,h,g,_,S,T,x,k,E,C,w,b,M,A,P,L,H,W,U,Y,et,ft,y,f,O,B,$,D;return d=u=p=h=g=_=S=T=x=0,m=v=1,i.svg=!!(t.getCTM&&jr(t)),c.translate&&((c.translate!=="none"||c.scale!=="none"||c.rotate!=="none")&&(s[rt]=(c.translate!=="none"?"translate3d("+(c.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(c.rotate!=="none"?"rotate("+c.rotate+") ":"")+(c.scale!=="none"?"scale("+c.scale.split(" ").join(",")+") ":"")+(c[rt]!=="none"?c[rt]:"")),s.scale=s.rotate=s.translate="none"),C=os(t,i.svg),i.svg&&(i.uncache?(et=t.getBBox(),l=i.xOrigin-et.x+"px "+(i.yOrigin-et.y)+"px",Y=""):Y=!e&&t.getAttribute("data-svg-origin"),Di(t,Y||l,!!Y||i.originIsAbsolute,i.smooth!==!1,C)),k=i.xOrigin||0,E=i.yOrigin||0,C!==Xe&&(A=C[0],P=C[1],L=C[2],H=C[3],d=W=C[4],u=U=C[5],C.length===6?(m=Math.sqrt(A*A+P*P),v=Math.sqrt(H*H+L*L),h=A||P?_e(P,A)*ue:0,S=L||H?_e(L,H)*ue+h:0,S&&(v*=Math.abs(Math.cos(S*xe))),i.svg&&(d-=k-(k*A+E*L),u-=E-(k*P+E*H))):(D=C[6],B=C[7],y=C[8],f=C[9],O=C[10],$=C[11],d=C[12],u=C[13],p=C[14],w=_e(D,O),g=w*ue,w&&(b=Math.cos(-w),M=Math.sin(-w),Y=W*b+y*M,et=U*b+f*M,ft=D*b+O*M,y=W*-M+y*b,f=U*-M+f*b,O=D*-M+O*b,$=B*-M+$*b,W=Y,U=et,D=ft),w=_e(-L,O),_=w*ue,w&&(b=Math.cos(-w),M=Math.sin(-w),Y=A*b-y*M,et=P*b-f*M,ft=L*b-O*M,$=H*M+$*b,A=Y,P=et,L=ft),w=_e(P,A),h=w*ue,w&&(b=Math.cos(w),M=Math.sin(w),Y=A*b+P*M,et=W*b+U*M,P=P*b-A*M,U=U*b-W*M,A=Y,W=et),g&&Math.abs(g)+Math.abs(h)>359.9&&(g=h=0,_=180-_),m=nt(Math.sqrt(A*A+P*P+L*L)),v=nt(Math.sqrt(U*U+D*D)),w=_e(W,U),S=Math.abs(w)>2e-4?w*ue:0,x=$?1/($<0?-$:$):0),i.svg&&(Y=t.getAttribute("transform"),i.forceCSS=t.setAttribute("transform","")||!Qr(Rt(t,rt)),Y&&t.setAttribute("transform",Y))),Math.abs(S)>90&&Math.abs(S)<270&&(a?(m*=-1,S+=h<=0?180:-180,h+=h<=0?180:-180):(v*=-1,S+=S<=0?180:-180)),e=e||i.uncache,i.x=d-((i.xPercent=d&&(!e&&i.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-d)?-50:0)))?t.offsetWidth*i.xPercent/100:0)+n,i.y=u-((i.yPercent=u&&(!e&&i.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-u)?-50:0)))?t.offsetHeight*i.yPercent/100:0)+n,i.z=p+n,i.scaleX=nt(m),i.scaleY=nt(v),i.rotation=nt(h)+o,i.rotationX=nt(g)+o,i.rotationY=nt(_)+o,i.skewX=S+o,i.skewY=T+o,i.transformPerspective=x+n,(i.zOrigin=parseFloat(l.split(" ")[2])||!e&&i.zOrigin||0)&&(s[Pt]=ci(l)),i.xOffset=i.yOffset=0,i.force3D=Bt.force3D,i.renderTransform=i.svg?io:Gr?Jr:eo,i.uncache=0,i},ci=function(t){return(t=t.split(" "))[0]+" "+t[1]},Si=function(t,e,i){var s=mt(e);return nt(parseFloat(e)+parseFloat(ae(t,"x",i+"px",s)))+s},eo=function(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,Jr(t,e)},oe="0deg",Be="0px",le=") ",Jr=function(t,e){var i=e||this,s=i.xPercent,a=i.yPercent,n=i.x,o=i.y,c=i.z,l=i.rotation,d=i.rotationY,u=i.rotationX,p=i.skewX,m=i.skewY,v=i.scaleX,h=i.scaleY,g=i.transformPerspective,_=i.force3D,S=i.target,T=i.zOrigin,x="",k=_==="auto"&&t&&t!==1||_===!0;if(T&&(u!==oe||d!==oe)){var E=parseFloat(d)*xe,C=Math.sin(E),w=Math.cos(E),b;E=parseFloat(u)*xe,b=Math.cos(E),n=Si(S,n,C*b*-T),o=Si(S,o,-Math.sin(E)*-T),c=Si(S,c,w*b*-T+T)}g!==Be&&(x+="perspective("+g+le),(s||a)&&(x+="translate("+s+"%, "+a+"%) "),(k||n!==Be||o!==Be||c!==Be)&&(x+=c!==Be||k?"translate3d("+n+", "+o+", "+c+") ":"translate("+n+", "+o+le),l!==oe&&(x+="rotate("+l+le),d!==oe&&(x+="rotateY("+d+le),u!==oe&&(x+="rotateX("+u+le),(p!==oe||m!==oe)&&(x+="skew("+p+", "+m+le),(v!==1||h!==1)&&(x+="scale("+v+", "+h+le),S.style[rt]=x||"translate(0, 0)"},io=function(t,e){var i=e||this,s=i.xPercent,a=i.yPercent,n=i.x,o=i.y,c=i.rotation,l=i.skewX,d=i.skewY,u=i.scaleX,p=i.scaleY,m=i.target,v=i.xOrigin,h=i.yOrigin,g=i.xOffset,_=i.yOffset,S=i.forceCSS,T=parseFloat(n),x=parseFloat(o),k,E,C,w,b;c=parseFloat(c),l=parseFloat(l),d=parseFloat(d),d&&(d=parseFloat(d),l+=d,c+=d),c||l?(c*=xe,l*=xe,k=Math.cos(c)*u,E=Math.sin(c)*u,C=Math.sin(c-l)*-p,w=Math.cos(c-l)*p,l&&(d*=xe,b=Math.tan(l-d),b=Math.sqrt(1+b*b),C*=b,w*=b,d&&(b=Math.tan(d),b=Math.sqrt(1+b*b),k*=b,E*=b)),k=nt(k),E=nt(E),C=nt(C),w=nt(w)):(k=u,w=p,E=C=0),(T&&!~(n+"").indexOf("px")||x&&!~(o+"").indexOf("px"))&&(T=ae(m,"x",n,"px"),x=ae(m,"y",o,"px")),(v||h||g||_)&&(T=nt(T+v-(v*k+h*C)+g),x=nt(x+h-(v*E+h*w)+_)),(s||a)&&(b=m.getBBox(),T=nt(T+s/100*b.width),x=nt(x+a/100*b.height)),b="matrix("+k+","+E+","+C+","+w+","+T+","+x+")",m.setAttribute("transform",b),S&&(m.style[rt]=b)},so=function(t,e,i,s,a){var n=360,o=ct(a),c=parseFloat(a)*(o&&~a.indexOf("rad")?ue:1),l=c-s,d=s+l+"deg",u,p;return o&&(u=a.split("_")[1],u==="short"&&(l%=n,l!==l%(n/2)&&(l+=l<0?n:-n)),u==="cw"&&l<0?l=(l+n*As)%n-~~(l/n)*n:u==="ccw"&&l>0&&(l=(l-n*As)%n-~~(l/n)*n)),t._pt=p=new Ct(t._pt,e,i,s,l,Nn),p.e=d,p.u="deg",t._props.push(i),p},Is=function(t,e){for(var i in e)t[i]=e[i];return t},ro=function(t,e,i){var s=Is({},i._gsap),a="perspective,force3D,transformOrigin,svgOrigin",n=i.style,o,c,l,d,u,p,m,v;s.svg?(l=i.getAttribute("transform"),i.setAttribute("transform",""),n[rt]=e,o=je(i,1),re(i,rt),i.setAttribute("transform",l)):(l=getComputedStyle(i)[rt],n[rt]=e,o=je(i,1),n[rt]=l);for(c in Kt)l=s[c],d=o[c],l!==d&&a.indexOf(c)<0&&(m=mt(l),v=mt(d),u=m!==v?ae(i,c,l,v):parseFloat(l),p=parseFloat(d),t._pt=new Ct(t._pt,o,c,u,p-u,Bi),t._pt.u=v||0,t._props.push(c));Is(o,s)};Mt("padding,margin,Width,Radius",function(r,t){var e="Top",i="Right",s="Bottom",a="Left",n=(t<3?[e,i,s,a]:[e+a,e+i,s+i,s+a]).map(function(o){return t<2?r+o:"border"+o+r});li[t>1?"border"+r:r]=function(o,c,l,d,u){var p,m;if(arguments.length<4)return p=n.map(function(v){return Gt(o,v,l)}),m=p.join(" "),m.split(p[0]).length===5?p[0]:m;p=(d+"").split(" "),m={},n.forEach(function(v,h){return m[v]=p[h]=p[h]||p[(h-1)/2|0]}),o.init(c,m,u)}});var Zr={name:"css",register:Ii,targetTest:function(t){return t.style&&t.nodeType},init:function(t,e,i,s,a){var n=this._props,o=t.style,c=i.vars.startAt,l,d,u,p,m,v,h,g,_,S,T,x,k,E,C,w,b;rs||Ii(),this.styles=this.styles||Yr(t),w=this.styles.props,this.tween=i;for(h in e)if(h!=="autoRound"&&(d=e[h],!(Lt[h]&&$r(h,e,i,s,t,a)))){if(m=typeof d,v=li[h],m==="function"&&(d=d.call(i,s,t,a),m=typeof d),m==="string"&&~d.indexOf("random(")&&(d=Ue(d)),v)v(this,t,h,d,i)&&(C=1);else if(h.substr(0,2)==="--")l=(getComputedStyle(t).getPropertyValue(h)+"").trim(),d+="",ie.lastIndex=0,ie.test(l)||(g=mt(l),_=mt(d),_?g!==_&&(l=ae(t,h,l,_)+_):g&&(d+=g)),this.add(o,"setProperty",l,d,s,a,0,0,h),n.push(h),w.push(h,0,o[h]);else if(m!=="undefined"){if(c&&h in c?(l=typeof c[h]=="function"?c[h].call(i,s,t,a):c[h],ct(l)&&~l.indexOf("random(")&&(l=Ue(l)),mt(l+"")||l==="auto"||(l+=Bt.units[h]||mt(Gt(t,h))||""),(l+"").charAt(1)==="="&&(l=Gt(t,h))):l=Gt(t,h),p=parseFloat(l),S=m==="string"&&d.charAt(1)==="="&&d.substr(0,2),S&&(d=d.substr(2)),u=parseFloat(d),h in Wt&&(h==="autoAlpha"&&(p===1&&Gt(t,"visibility")==="hidden"&&u&&(p=0),w.push("visibility",0,o.visibility),te(this,o,"visibility",p?"inherit":"hidden",u?"inherit":"hidden",!u)),h!=="scale"&&h!=="transform"&&(h=Wt[h],~h.indexOf(",")&&(h=h.split(",")[0]))),T=h in Kt,T){if(this.styles.save(h),b=d,m==="string"&&d.substring(0,6)==="var(--"){if(d=Rt(t,d.substring(4,d.indexOf(")"))),d.substring(0,5)==="calc("){var M=t.style.perspective;t.style.perspective=d,d=Rt(t,"perspective"),M?t.style.perspective=M:re(t,"perspective")}u=parseFloat(d)}if(x||(k=t._gsap,k.renderTransform&&!e.parseTransform||je(t,e.parseTransform),E=e.smoothOrigin!==!1&&k.smooth,x=this._pt=new Ct(this._pt,o,rt,0,1,k.renderTransform,k,0,-1),x.dep=1),h==="scale")this._pt=new Ct(this._pt,k,"scaleY",k.scaleY,(S?ke(k.scaleY,S+u):u)-k.scaleY||0,Bi),this._pt.u=0,n.push("scaleY",h),h+="X";else if(h==="transformOrigin"){w.push(Pt,0,o[Pt]),d=Zn(d),k.svg?Di(t,d,0,E,0,this):(_=parseFloat(d.split(" ")[2])||0,_!==k.zOrigin&&te(this,k,"zOrigin",k.zOrigin,_),te(this,o,h,ci(l),ci(d)));continue}else if(h==="svgOrigin"){Di(t,d,1,E,0,this);continue}else if(h in Kr){so(this,k,h,p,S?ke(p,S+d):d);continue}else if(h==="smoothOrigin"){te(this,k,"smooth",k.smooth,d);continue}else if(h==="force3D"){k[h]=d;continue}else if(h==="transform"){ro(this,d,t);continue}}else h in o||(h=Re(h)||h);if(T||(u||u===0)&&(p||p===0)&&!qn.test(d)&&h in o)g=(l+"").substr((p+"").length),u||(u=0),_=mt(d)||(h in Bt.units?Bt.units[h]:g),g!==_&&(p=ae(t,h,l,_)),this._pt=new Ct(this._pt,T?k:o,h,p,(S?ke(p,S+u):u)-p,!T&&(_==="px"||h==="zIndex")&&e.autoRound!==!1?zn:Bi),this._pt.u=_||0,T&&b!==d?(this._pt.b=l,this._pt.e=b,this._pt.r=Hn):g!==_&&_!=="%"&&(this._pt.b=l,this._pt.r=Fn);else if(h in o)Jn.call(this,t,h,l,S?S+d:d);else if(h in t)this.add(t,h,l||t[h],S?S+d:d,s,a);else if(h!=="parseTransform"){Xi(h,d);continue}T||(h in o?w.push(h,0,o[h]):typeof t[h]=="function"?w.push(h,2,t[h]()):w.push(h,1,l||t[h])),n.push(h)}}C&&Hr(this)},render:function(t,e){if(e.tween._time||!as())for(var i=e._pt;i;)i.r(t,i.d),i=i._next;else e.styles.revert()},get:Gt,aliases:Wt,getSetter:function(t,e,i){var s=Wt[e];return s&&s.indexOf(",")<0&&(e=s),e in Kt&&e!==Pt&&(t._gsap.x||Gt(t,"x"))?i&&Ps===i?e==="scale"?Yn:Un:(Ps=i||{})&&(e==="scale"?Gn:Xn):t.style&&!Ui(t.style[e])?Wn:~e.indexOf("-")?Vn:is(t,e)},core:{_removeProperty:re,_getMatrix:os}};At.utils.checkPrefix=Re;At.core.getStyleSaver=Yr;(function(r,t,e,i){var s=Mt(r+","+t+","+e,function(a){Kt[a]=1});Mt(t,function(a){Bt.units[a]="deg",Kr[a]=1}),Wt[s[13]]=r+","+t,Mt(i,function(a){var n=a.split(":");Wt[n[1]]=s[n[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");Mt("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){Bt.units[r]="px"});At.registerPlugin(Zr);var qi=At.registerPlugin(Zr)||At;qi.core.Tween;function ao(r){const e=new URLSearchParams(window.location.search).get("preloader")==="1",i=sessionStorage.getItem("parkora_preloader_shown")==="true",s=e?4:i?.65:2.4;sessionStorage.setItem("parkora_preloader_shown","true");const a=document.createElement("div");a.id="preloader",a.setAttribute("role","status"),a.setAttribute("aria-live","polite"),a.setAttribute("aria-label","Loading Parkora smart parking platform"),a.innerHTML=`
    <div class="preloader-radar-wrapper" aria-hidden="true">
      <div class="radar-ring-light"></div>
      <div class="radar-ring-light"></div>
      <div class="radar-ring-light"></div>
      <div class="radar-sweep-light"></div>
      <div class="radar-center-dot"></div>
    </div>
    
    <div class="preloader-text-status" id="preloader-text">
      Scanning nearby <span>Metro &amp; Work</span> parking spots...
    </div>

    <div class="progress-track-light" aria-hidden="true">
      <div class="progress-fill-light" id="preloader-fill"></div>
    </div>

    <div class="preloader-footer-row">
      <div class="preloader-percent-label" id="preloader-percent">0%</div>
      <button type="button" class="preloader-skip-btn" id="preloader-skip-btn">Skip Intro &rarr;</button>
    </div>
  `,document.body.appendChild(a);const n=a.querySelector("#preloader-fill"),o=a.querySelector("#preloader-percent"),c=a.querySelector("#preloader-text"),l=a.querySelector("#preloader-skip-btn"),d=["Scanning nearby <span>Metro &amp; Work</span> parking spots...","Verifying <span>EV Charging</span> &amp; Covered slots...","Calculating real-time <span>distance &amp; rates</span>...","Locking optimal <span>Parkora slot</span>..."];let u=!1;const p=()=>{u||(u=!0,v.kill(),c.innerHTML="<span>Welcome to Parkora!</span>",o.textContent="100%",n.style.width="100%",qi.to(a,{opacity:0,duration:.35,onComplete:()=>{a.classList.add("fade-out"),a.remove()}}))},m={progress:0},v=qi.timeline({onComplete:p});return l&&l.addEventListener("click",p),v.to(m,{progress:100,duration:s,ease:"power1.inOut",onUpdate:()=>{const h=Math.floor(m.progress);n.style.width=`${h}%`,o.textContent=`${h}%`,h<25?c.innerHTML=d[0]:h<50?c.innerHTML=d[1]:h<75?c.innerHTML=d[2]:c.innerHTML=d[3]}}),a}function Ds(){const r=Tt(),t=r&&r.role==="owner"?Wi(r.id):null,e=Ft.length;return`
    <header class="header-navbar">
      <div class="header-container">
        <div class="header-left-group">
          <a href="#" class="brand-logo" id="brand-logo-btn" aria-label="Parkora Home">
            <span class="material-symbols-outlined icon-filled-lg" aria-hidden="true">local_parking</span>
            Parkora
          </a>

          <nav class="nav-links" aria-label="Primary Navigation">
            <a href="#search-grid-section" class="nav-link active" id="nav-link-find">Find Parking</a>
            <a href="#solutions" class="nav-link" id="nav-link-solutions">Solutions</a>
            <a href="#locations" class="nav-link" id="nav-link-locations">Locations</a>
            <a href="#pricing" class="nav-link" id="nav-link-pricing">Pricing</a>
          </nav>
        </div>

        <div class="header-actions">
          ${r?`
            <!-- Logged-in Dynamic State -->
            <div class="header-user-bar">
              <button type="button" class="wallet-pill-btn" id="nav-wallet-topup-btn" title="Click to view wallet, history & add funds">
                <span class="material-symbols-outlined icon-sm" aria-hidden="true">account_balance_wallet</span>
                <span>₹${(r.walletBalance||0).toLocaleString()}</span>
                <span class="wallet-plus-badge" aria-hidden="true">+</span>
              </button>

              ${r.role==="customer"?`
                <button type="button" class="btn-secondary btn-sm hide-mobile-xs" id="nav-my-bookings-btn">
                  <span class="material-symbols-outlined icon-sm" aria-hidden="true">confirmation_number</span>
                  <span>My Bookings</span>
                </button>
              `:""}

              ${r.role==="owner"?`
                <div class="host-earnings-pill hide-mobile-xs">
                  <span class="material-symbols-outlined icon-sm" aria-hidden="true">payments</span>
                  <span>₹${((t==null?void 0:t.monthlyIncome)||14500).toLocaleString()}/mo</span>
                </div>

                <button type="button" class="btn-primary btn-sm hide-mobile-xs" id="nav-owner-dashboard-btn">
                  <span class="material-symbols-outlined icon-sm" aria-hidden="true">roofing</span>
                  <span>Host Portal</span>
                </button>
              `:""}

              ${r.role==="admin"?`
                <button type="button" class="btn-primary btn-sm btn-danger hide-mobile-xs" id="nav-admin-dashboard-btn">
                  <span class="material-symbols-outlined icon-sm" aria-hidden="true">admin_panel_settings</span>
                  <span>Admin Panel</span>
                  ${e>0?`<span class="admin-badge-dot">${e}</span>`:""}
                </button>
              `:""}

              <!-- User Profile Chip -->
              <div class="user-profile-chip">
                <img src="${r.avatar}" alt="${r.name}" class="user-avatar-sm" width="32" height="32" />
                <div class="user-profile-meta">
                  <span class="user-profile-name">${r.name.split(" ")[0]}</span>
                  <span class="user-profile-role">${r.roleBadge}</span>
                </div>
                <button type="button" id="nav-logout-btn" class="icon-btn-ghost" title="Logout / Switch Account" aria-label="Logout">
                  <span class="material-symbols-outlined icon-sm" aria-hidden="true">logout</span>
                </button>
              </div>
            </div>
          `:`
            <!-- Logged-out State -->
            <button type="button" class="btn-ghost hide-mobile-xs" id="nav-login-btn">Login / Sign In</button>
            <button type="button" class="btn-primary btn-sm" id="nav-host-btn">Become a Host</button>
          `}

          <!-- Mobile Hamburger Menu Button -->
          <button
            type="button"
            class="mobile-menu-btn"
            id="mobile-menu-toggle-btn"
            aria-expanded="false"
            aria-controls="mobile-nav-drawer"
            aria-label="Toggle navigation menu"
          >
            <span class="material-symbols-outlined" id="mobile-menu-icon" aria-hidden="true">menu</span>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Drawer -->
      <div class="mobile-nav-drawer" id="mobile-nav-drawer" aria-hidden="true">
        <nav class="mobile-nav-links" aria-label="Mobile Navigation">
          <a href="#search-grid-section" class="mobile-nav-link" data-mobile-nav="find">
            <span class="material-symbols-outlined icon-sm" aria-hidden="true">search</span>
            Find Parking
          </a>
          <a href="#solutions" class="mobile-nav-link" data-mobile-nav="solutions">
            <span class="material-symbols-outlined icon-sm" aria-hidden="true">lightbulb</span>
            Solutions
          </a>
          <a href="#locations" class="mobile-nav-link" data-mobile-nav="locations">
            <span class="material-symbols-outlined icon-sm" aria-hidden="true">map</span>
            Active Locations
          </a>
          <a href="#pricing" class="mobile-nav-link" data-mobile-nav="pricing">
            <span class="material-symbols-outlined icon-sm" aria-hidden="true">payments</span>
            Transparent Pricing
          </a>
        </nav>

        <div class="mobile-drawer-actions">
          ${r?`
            <div class="mobile-drawer-wallet-bar">
              <div class="drawer-wallet-info">
                <span class="material-symbols-outlined icon-emerald" aria-hidden="true">account_balance_wallet</span>
                <div>
                  <span class="drawer-wallet-label">Parkora Wallet</span>
                  <strong class="drawer-wallet-val">₹${(r.walletBalance||0).toLocaleString()}</strong>
                </div>
              </div>
              <button type="button" class="btn-secondary btn-sm" id="mobile-wallet-btn">Manage</button>
            </div>

            ${r.role==="customer"?`
              <button type="button" class="btn-secondary btn-block" id="mobile-my-bookings-btn">
                <span class="material-symbols-outlined icon-sm" aria-hidden="true">confirmation_number</span>
                My Active Bookings
              </button>
            `:""}
            ${r.role==="owner"?`
              <button type="button" class="btn-primary btn-block" id="mobile-owner-dashboard-btn">
                <span class="material-symbols-outlined icon-sm" aria-hidden="true">roofing</span>
                Open Host Portal
              </button>
            `:""}
            ${r.role==="admin"?`
              <button type="button" class="btn-primary btn-danger btn-block" id="mobile-admin-dashboard-btn">
                <span class="material-symbols-outlined icon-sm" aria-hidden="true">admin_panel_settings</span>
                Open Admin Panel (${e})
              </button>
            `:""}
            <button type="button" class="btn-ghost btn-block" id="mobile-logout-btn">
              Switch Account / Logout
            </button>
          `:`
            <button type="button" class="btn-secondary btn-block" id="mobile-login-btn">Login / Demo Accounts</button>
            <button type="button" class="btn-primary btn-block" id="mobile-host-btn">Become a Host</button>
          `}
        </div>
      </div>
    </header>
  `}const no="data:image/svg+xml;utf8,"+encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" fill="none">
  <rect width="800" height="500" fill="#f2f4f6"/>
  <path d="M0 360L800 360" stroke="#cbd5e1" stroke-width="3"/>
  <rect x="90" y="130" width="220" height="230" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
  <rect x="350" y="90" width="240" height="270" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
  <rect x="420" y="210" width="100" height="150" rx="8" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/>
  <circle cx="470" cy="155" r="24" fill="#10b981"/>
  <text x="470" y="163" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="22">P</text>
</svg>
`);function qs(){const r=Ca();return`
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-eyebrow-pill">
          <span class="badge-pulse-dot"></span>
          <span>Live Urban Transit &amp; EV Parking Network</span>
        </div>

        <h1 class="hero-title">
          Find reliable parking,<br/><span class="highlight">right where you need it.</span>
        </h1>
        <p class="hero-subtitle">
          Secure spots near metro stations, workspaces, and charging hubs. Real-time availability for modern urban mobility.
        </p>

        <!-- Search Box with Location, Date & Time -->
        <div class="search-box-card" role="search">
          <div class="search-input-wrapper">
            <span class="material-symbols-outlined search-icon" aria-hidden="true">search</span>
            <input 
              type="search" 
              id="hero-search-input"
              class="search-input input-focus-ring" 
              placeholder="Search destination, metro, city, or area..." 
              aria-label="Search parking spots by destination, metro, or area"
              autocomplete="off"
            />
          </div>

          <div class="search-datetime-group">
            <div class="search-select-field">
              <span class="material-symbols-outlined icon-xs text-muted" aria-hidden="true">calendar_today</span>
              <select id="hero-date-select" class="select-inline input-focus-ring" aria-label="Select arrival date">
                <option value="today">Today</option>
                <option value="tomorrow">Tomorrow</option>
                <option value="weekend">This Weekend</option>
              </select>
            </div>

            <div class="search-select-field">
              <span class="material-symbols-outlined icon-xs text-muted" aria-hidden="true">schedule</span>
              <select id="hero-time-select" class="select-inline input-focus-ring" aria-label="Select arrival time">
                <option value="now">Now (Immediate)</option>
                <option value="09:00">09:00 AM</option>
                <option value="14:00">02:00 PM</option>
                <option value="18:00">06:00 PM</option>
              </select>
            </div>
          </div>

          <button type="button" class="btn-primary search-submit-btn" id="search-btn">
            Find Spot
          </button>
        </div>

        <div class="hero-quick-tags">
          <span class="quick-tag-label">Popular:</span>
          <button type="button" class="quick-search-chip" data-query="Whitefield">Whitefield</button>
          <button type="button" class="quick-search-chip" data-query="Mumbai">Mumbai</button>
          <button type="button" class="quick-search-chip" data-query="Indiranagar">Indiranagar</button>
          <button type="button" class="quick-search-chip" data-query="Gurugram">Gurugram</button>
        </div>
      </div>

      <!-- Hero Visual Card with Dynamic EV Counter -->
      <div class="hero-visual">
        <img 
          class="hero-visual-img" 
          src="https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1200&q=80" 
          alt="Modern Parking Near Metro Station"
          fetchpriority="high"
          width="1200"
          height="760"
          onerror="this.onerror=null;this.src='${no}';"
        />
        <div class="glass-card-badge">
          <div class="badge-icon-bg">
            <span class="material-symbols-outlined icon-filled" aria-hidden="true">electric_car</span>
          </div>
          <div>
            <p class="glass-badge-label">Available Now</p>
            <p class="glass-badge-value">${r.liveEVSlots} EV Pods Live</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Filter Category Tabs with Dynamic Live Counts -->
    <section class="filters-scroll" role="tablist" aria-label="Filter parking spots by category and vehicle">
      <button type="button" role="tab" aria-selected="true" class="tab-pill active" data-category="all">
        All Spots (${r.all})
      </button>
      <button type="button" role="tab" aria-selected="false" class="tab-pill" data-category="metro">
        <span class="material-symbols-outlined icon-sm" aria-hidden="true">train</span> Near Metro (${r.metro})
      </button>
      <button type="button" role="tab" aria-selected="false" class="tab-pill" data-category="ev">
        <span class="material-symbols-outlined icon-sm" aria-hidden="true">ev_station</span> EV Charging (${r.ev})
      </button>
      <button type="button" role="tab" aria-selected="false" class="tab-pill" data-category="work">
        <span class="material-symbols-outlined icon-sm" aria-hidden="true">business_center</span> Office &amp; Work (${r.work})
      </button>
      <button type="button" role="tab" aria-selected="false" class="tab-pill" data-category="covered">
        <span class="material-symbols-outlined icon-sm" aria-hidden="true">roofing</span> Covered Bays (${r.covered})
      </button>
      <button type="button" role="tab" aria-selected="false" class="tab-pill" data-category="car">
        <span class="material-symbols-outlined icon-sm" aria-hidden="true">directions_car</span> 4-Wheeler (${r.car||5})
      </button>
      <button type="button" role="tab" aria-selected="false" class="tab-pill" data-category="bike">
        <span class="material-symbols-outlined icon-sm" aria-hidden="true">two_wheeler</span> 2-Wheeler (${r.bike||3})
      </button>
    </section>
  `}const Ns={"spot-1":"https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=600&q=80","spot-2":"https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=600&q=80","spot-3":"https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=600&q=80","spot-4":"https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80","spot-5":"https://images.unsplash.com/photo-1545179605-1296651e9d43?auto=format&fit=crop&w=600&q=80","spot-6":"https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80"},oo="data:image/svg+xml;utf8,"+encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 384" fill="none">
  <rect width="600" height="384" fill="#f2f4f6"/>
  <rect x="150" y="92" width="300" height="200" rx="16" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
  <circle cx="300" cy="172" r="28" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/>
  <text x="300" y="181" text-anchor="middle" fill="#006c49" font-family="sans-serif" font-weight="bold" font-size="26">P</text>
  <text x="300" y="242" text-anchor="middle" fill="#3c4a42" font-family="sans-serif" font-size="15">Verified Parkora Bay</text>
</svg>
`);function lo(r){const t=q(r.title),e=q(r.address),i=q(r.distanceMetro),s=q(r.id),a=(r.amenities||[r.covered?"Covered Bay":"Open Bay",r.evCharging?"EV Fast Charge":"24/7 CCTV"]).slice(0,3).map(q),n=Ns[r.id]||Ns["spot-1"],o=r.active&&r.availableSlots>0;return`
    <article class="urban-spot-card ${o?"":"spot-unavailable"}" data-id="${s}" tabindex="0" aria-label="${t}, ₹${r.rateHourly} per hour">
      <div class="card-img-wrapper">
        <img 
          class="card-img" 
          src="${n}" 
          alt="${t} at ${e}" 
          loading="lazy" 
          width="600" 
          height="384"
          onerror="this.onerror=null;this.src='${oo}';"
        />
        
        ${o?`
          <div class="slot-badge-pill">
            <div class="badge-pulse-dot" aria-hidden="true"></div>
            <span>${r.availableSlots} Slots Left</span>
          </div>
        `:`
          <div class="slot-badge-pill slot-badge-full">
            <span>FULL / UNAVAILABLE</span>
          </div>
        `}

        <div class="card-feature-badges">
          <div class="feature-badge-icon" title="${r.vehicleType==="bike"?"2-Wheeler Parking (Bikes & Scooters)":r.vehicleType==="car"?"4-Wheeler Bay (Cars & SUVs)":"Compatible with Cars & 2-Wheelers"}" aria-label="Vehicle compatibility">
            <span class="material-symbols-outlined icon-sm" aria-hidden="true">${r.vehicleType==="bike"?"two_wheeler":r.vehicleType==="car"?"directions_car":"commute"}</span>
          </div>
          ${r.evCharging?`
            <div class="feature-badge-icon" title="EV Charging Available" aria-label="EV Charging Available">
              <span class="material-symbols-outlined icon-sm icon-filled" aria-hidden="true">ev_station</span>
            </div>
          `:""}
          ${r.covered?`
            <div class="feature-badge-icon" title="Covered Bay" aria-label="Covered Bay">
              <span class="material-symbols-outlined icon-sm" aria-hidden="true">roofing</span>
            </div>
          `:""}
        </div>
      </div>

      <div class="card-content">
        <div class="card-header-row">
          <h3 class="card-title">${t}</h3>
          <div class="rating-badge" title="Rated ${r.rating} out of 5 (${r.reviewsCount||50} reviews)">
            <span class="material-symbols-outlined star-icon" aria-hidden="true">star</span>
            <span>${r.rating}</span>
          </div>
        </div>

        <p class="card-address">
          <span class="material-symbols-outlined icon-sm" aria-hidden="true">location_on</span>
          <span>${e}</span>
        </p>

        <div class="card-amenities-row">
          ${a.map(c=>`<span class="amenity-chip">${c}</span>`).join("")}
        </div>

        <div class="card-footer-row">
          <div class="metro-info">
            <span class="material-symbols-outlined icon-sm" aria-hidden="true">directions_walk</span>
            <span>${i}</span>
          </div>

          <div class="card-price-action-group">
            <div class="price-display">
              ₹${r.rateHourly}<span>/hr</span>
            </div>
            <button 
              type="button"
              class="btn-primary book-btn" 
              data-id="${s}" 
              ${o?"":"disabled"}
            >
              ${o?"Reserve":"Full"}
            </button>
          </div>
        </div>
      </div>
    </article>
  `}function co(r,t=null){const e=r.find(i=>i.id===t)||r[0]||null;return`
    <div class="urban-map-layout" role="region" aria-label="Interactive Parking Map">
      <div class="urban-map-canvas" id="urban-map-canvas">
        <!-- Architectural Vector Grid & Transit Lines -->
        <svg class="urban-map-svg" viewBox="0 0 800 460" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <pattern id="urban-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" stroke-width="1"/>
            </pattern>
            <pattern id="urban-subgrid" width="200" height="200" patternUnits="userSpaceOnUse">
              <rect width="200" height="200" fill="url(#urban-grid)"/>
              <path d="M 200 0 L 0 0 0 200" fill="none" stroke="#cbd5e1" stroke-width="1.5"/>
            </pattern>
          </defs>
          <rect width="800" height="460" fill="#f8fafc" />
          <rect width="800" height="460" fill="url(#urban-subgrid)" />

          <!-- Urban Green Parks & Zones -->
          <rect x="70" y="60" width="140" height="90" rx="16" fill="#ecfdf5" stroke="#a7f3d0" stroke-width="1" />
          <rect x="520" y="290" width="180" height="110" rx="20" fill="#ecfdf5" stroke="#a7f3d0" stroke-width="1" />
          <rect x="310" y="80" width="130" height="75" rx="14" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1" />

          <!-- Arterial Roads -->
          <path d="M 0 180 Q 260 180 420 230 T 800 210" fill="none" stroke="#ffffff" stroke-width="14" />
          <path d="M 0 180 Q 260 180 420 230 T 800 210" fill="none" stroke="#cbd5e1" stroke-width="2" stroke-dasharray="6 6" />
          <path d="M 260 0 L 390 460" fill="none" stroke="#ffffff" stroke-width="12" />
          <path d="M 560 0 L 480 460" fill="none" stroke="#ffffff" stroke-width="10" />

          <!-- Metro Transit Line (Emerald Corridor) -->
          <path d="M 40 360 C 190 310, 310 150, 480 170 S 670 190, 770 95" fill="none" stroke="#10b981" stroke-width="4" stroke-dasharray="10 5" />
          <circle cx="176" cy="268" r="6" fill="#ffffff" stroke="#006c49" stroke-width="3" />
          <circle cx="368" cy="192" r="6" fill="#ffffff" stroke="#006c49" stroke-width="3" />
          <circle cx="545" cy="182" r="6" fill="#ffffff" stroke="#006c49" stroke-width="3" />
        </svg>

        <div class="map-overlay-legend">
          <span class="map-legend-item">
            <span class="map-pin-mini"></span> Active Parking Hub
          </span>
          <span class="map-legend-item">
            <span class="map-transit-line-indicator"></span> Metro Transit Line
          </span>
        </div>

        <!-- Interactive Map Pins (High-contrast Charcoal drops with Emerald center dot per DESIGN.md) -->
        ${r.map(i=>{const s=e&&e.id===i.id,a=i.active&&i.availableSlots>0,n=Number(i.mapX)||50,o=Number(i.mapY)||50;return`
            <button
              type="button"
              class="urban-map-pin ${s?"selected":""} ${a?"":"pin-unavailable"}"
              style="left: ${n}%; top: ${o}%;"
              data-spot-id="${q(i.id)}"
              aria-label="${q(i.title)}, ₹${i.rateHourly} per hour, ${i.availableSlots} slots available"
              aria-pressed="${s?"true":"false"}"
            >
              <span class="pin-price-pill">₹${i.rateHourly}/hr</span>
              <span class="pin-drop-marker">
                <span class="pin-emerald-core"></span>
              </span>
            </button>
          `}).join("")}
      </div>

      <!-- Selected Spot Inspector Panel -->
      <aside class="urban-map-inspector" id="urban-map-inspector" aria-live="polite">
        ${e?uo(e):`
          <div class="empty-state-box">
            <span class="material-symbols-outlined empty-state-icon">location_off</span>
            <h3 class="empty-state-title">No spots on map</h3>
            <p class="empty-state-desc">Adjust your search or category filter to view pins.</p>
          </div>
        `}
      </aside>
    </div>
  `}function uo(r){const t=r.active&&r.availableSlots>0,e=(r.amenities||[r.covered?"Covered Bay":"Open Air",r.evCharging?"EV Fast Charger":"24/7 CCTV"]).map(q);return`
    <div class="map-inspector-card">
      <div class="map-inspector-badge-row">
        <span class="inspector-status-pill ${t?"status-open":"status-full"}">
          <span class="badge-pulse-dot"></span>
          ${t?`${r.availableSlots} of ${r.totalCapacity||5} Slots Open`:"Full / Paused"}
        </span>
        <span class="rating-badge">
          <span class="material-symbols-outlined star-icon">star</span>
          <span>${r.rating} (${r.reviewsCount||42})</span>
        </span>
      </div>

      <h3 class="map-inspector-title">${q(r.title)}</h3>
      <p class="card-address">
        <span class="material-symbols-outlined icon-sm">location_on</span>
        ${q(r.address)}
      </p>

      <div class="map-inspector-meta">
        <div class="inspector-meta-item">
          <span class="material-symbols-outlined icon-emerald">directions_walk</span>
          <div>
            <span class="meta-label">Transit Access</span>
            <strong class="meta-val">${q(r.distanceMetro)}</strong>
          </div>
        </div>
        <div class="inspector-meta-item">
          <span class="material-symbols-outlined icon-emerald">${r.evCharging?"ev_station":"verified_user"}</span>
          <div>
            <span class="meta-label">Facility Type</span>
            <strong class="meta-val">${r.evCharging?"EV Charging Pod":r.covered?"Covered Security Bay":"Verified Driveway"}</strong>
          </div>
        </div>
      </div>

      <div class="amenity-chips-row">
        ${e.map(i=>`<span class="amenity-chip">${i}</span>`).join("")}
      </div>

      <div class="map-inspector-footer">
        <div>
          <span class="meta-label">Hourly Rate</span>
          <div class="price-display">₹${r.rateHourly}<span>/hr</span></div>
        </div>
        <button
          type="button"
          class="btn-primary book-btn"
          data-id="${q(r.id)}"
          ${t?"":"disabled"}
        >
          ${t?"Reserve This Spot":"Unavailable"}
        </button>
      </div>
    </div>
  `}var ls={};(function r(t,e,i,s){var a=!!(t.Worker&&t.Blob&&t.Promise&&t.OffscreenCanvas&&t.OffscreenCanvasRenderingContext2D&&t.HTMLCanvasElement&&t.HTMLCanvasElement.prototype.transferControlToOffscreen&&t.URL&&t.URL.createObjectURL),n=typeof Path2D=="function"&&typeof DOMMatrix=="function",o=(function(){if(!t.OffscreenCanvas)return!1;try{var y=new OffscreenCanvas(1,1),f=y.getContext("2d");f.fillRect(0,0,1,1);var O=y.transferToImageBitmap();f.createPattern(O,"no-repeat")}catch{return!1}return!0})();function c(){}function l(y){var f=e.exports.Promise,O=f!==void 0?f:t.Promise;return typeof O=="function"?new O(y):(y(c,c),null)}var d=(function(y,f){return{transform:function(O){if(y)return O;if(f.has(O))return f.get(O);var B=new OffscreenCanvas(O.width,O.height),$=B.getContext("2d");return $.drawImage(O,0,0),f.set(O,B),B},clear:function(){f.clear()}}})(o,new Map),u=(function(){var y=Math.floor(16.666666666666668),f,O,B={},$=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(f=function(D){var N=Math.random();return B[N]=requestAnimationFrame(function I(F){$===F||$+y-1<F?($=F,delete B[N],D()):B[N]=requestAnimationFrame(I)}),N},O=function(D){B[D]&&cancelAnimationFrame(B[D])}):(f=function(D){return setTimeout(D,y)},O=function(D){return clearTimeout(D)}),{frame:f,cancel:O}})(),p=(function(){var y,f,O={};function B($){function D(N,I){$.postMessage({options:N||{},callback:I})}$.init=function(I){var F=I.transferControlToOffscreen();$.postMessage({canvas:F},[F])},$.fire=function(I,F,G){if(f)return D(I,null),f;var J=Math.random().toString(36).slice(2);return f=l(function(j){function Z(ot){ot.data.callback===J&&(delete O[J],$.removeEventListener("message",Z),f=null,d.clear(),G(),j())}$.addEventListener("message",Z),D(I,J),O[J]=Z.bind(null,{data:{callback:J}})}),f},$.reset=function(){$.postMessage({reset:!0});for(var I in O)O[I](),delete O[I]}}return function(){if(y)return y;if(!i&&a){var $=["var CONFETTI, SIZE = {}, module = {};","("+r.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{y=new Worker(URL.createObjectURL(new Blob([$])))}catch(D){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",D),null}B(y)}return y}})(),m={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function v(y,f){return f?f(y):y}function h(y){return y!=null}function g(y,f,O){return v(y&&h(y[f])?y[f]:m[f],O)}function _(y){return y<0?0:Math.floor(y)}function S(y,f){return Math.floor(Math.random()*(f-y))+y}function T(y){return parseInt(y,16)}function x(y){return y.map(k)}function k(y){var f=String(y).replace(/[^0-9a-f]/gi,"");return f.length<6&&(f=f[0]+f[0]+f[1]+f[1]+f[2]+f[2]),{r:T(f.substring(0,2)),g:T(f.substring(2,4)),b:T(f.substring(4,6))}}function E(y){var f=g(y,"origin",Object);return f.x=g(f,"x",Number),f.y=g(f,"y",Number),f}function C(y){y.width=document.documentElement.clientWidth,y.height=document.documentElement.clientHeight}function w(y){var f=y.getBoundingClientRect();y.width=f.width,y.height=f.height}function b(y){var f=document.createElement("canvas");return f.style.position="fixed",f.style.top="0px",f.style.left="0px",f.style.pointerEvents="none",f.style.zIndex=y,f}function M(y,f,O,B,$,D,N,I,F){y.save(),y.translate(f,O),y.rotate(D),y.scale(B,$),y.arc(0,0,1,N,I,F),y.restore()}function A(y){var f=y.angle*(Math.PI/180),O=y.spread*(Math.PI/180);return{x:y.x,y:y.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:y.startVelocity*.5+Math.random()*y.startVelocity,angle2D:-f+(.5*O-Math.random()*O),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:y.color,shape:y.shape,tick:0,totalTicks:y.ticks,decay:y.decay,drift:y.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:y.gravity*3,ovalScalar:.6,scalar:y.scalar,flat:y.flat}}function P(y,f){f.x+=Math.cos(f.angle2D)*f.velocity+f.drift,f.y+=Math.sin(f.angle2D)*f.velocity+f.gravity,f.velocity*=f.decay,f.flat?(f.wobble=0,f.wobbleX=f.x+10*f.scalar,f.wobbleY=f.y+10*f.scalar,f.tiltSin=0,f.tiltCos=0,f.random=1):(f.wobble+=f.wobbleSpeed,f.wobbleX=f.x+10*f.scalar*Math.cos(f.wobble),f.wobbleY=f.y+10*f.scalar*Math.sin(f.wobble),f.tiltAngle+=.1,f.tiltSin=Math.sin(f.tiltAngle),f.tiltCos=Math.cos(f.tiltAngle),f.random=Math.random()+2);var O=f.tick++/f.totalTicks,B=f.x+f.random*f.tiltCos,$=f.y+f.random*f.tiltSin,D=f.wobbleX+f.random*f.tiltCos,N=f.wobbleY+f.random*f.tiltSin;if(y.fillStyle="rgba("+f.color.r+", "+f.color.g+", "+f.color.b+", "+(1-O)+")",y.beginPath(),n&&f.shape.type==="path"&&typeof f.shape.path=="string"&&Array.isArray(f.shape.matrix))y.fill(Y(f.shape.path,f.shape.matrix,f.x,f.y,Math.abs(D-B)*.1,Math.abs(N-$)*.1,Math.PI/10*f.wobble));else if(f.shape.type==="bitmap"){var I=Math.PI/10*f.wobble,F=Math.abs(D-B)*.1,G=Math.abs(N-$)*.1,J=f.shape.bitmap.width*f.scalar,j=f.shape.bitmap.height*f.scalar,Z=new DOMMatrix([Math.cos(I)*F,Math.sin(I)*F,-Math.sin(I)*G,Math.cos(I)*G,f.x,f.y]);Z.multiplySelf(new DOMMatrix(f.shape.matrix));var ot=y.createPattern(d.transform(f.shape.bitmap),"no-repeat");ot.setTransform(Z),y.globalAlpha=1-O,y.fillStyle=ot,y.fillRect(f.x-J/2,f.y-j/2,J,j),y.globalAlpha=1}else if(f.shape==="circle")y.ellipse?y.ellipse(f.x,f.y,Math.abs(D-B)*f.ovalScalar,Math.abs(N-$)*f.ovalScalar,Math.PI/10*f.wobble,0,2*Math.PI):M(y,f.x,f.y,Math.abs(D-B)*f.ovalScalar,Math.abs(N-$)*f.ovalScalar,Math.PI/10*f.wobble,0,2*Math.PI);else if(f.shape==="star")for(var z=Math.PI/2*3,dt=4*f.scalar,_t=8*f.scalar,wt=f.x,X=f.y,bt=5,St=Math.PI/bt;bt--;)wt=f.x+Math.cos(z)*_t,X=f.y+Math.sin(z)*_t,y.lineTo(wt,X),z+=St,wt=f.x+Math.cos(z)*dt,X=f.y+Math.sin(z)*dt,y.lineTo(wt,X),z+=St;else y.moveTo(Math.floor(f.x),Math.floor(f.y)),y.lineTo(Math.floor(f.wobbleX),Math.floor($)),y.lineTo(Math.floor(D),Math.floor(N)),y.lineTo(Math.floor(B),Math.floor(f.wobbleY));return y.closePath(),y.fill(),f.tick<f.totalTicks}function L(y,f,O,B,$){var D=f.slice(),N=y.getContext("2d"),I,F,G=l(function(J){function j(){I=F=null,N.clearRect(0,0,B.width,B.height),d.clear(),$(),J()}function Z(){i&&!(B.width===s.width&&B.height===s.height)&&(B.width=y.width=s.width,B.height=y.height=s.height),!B.width&&!B.height&&(O(y),B.width=y.width,B.height=y.height),N.clearRect(0,0,B.width,B.height),D=D.filter(function(ot){return P(N,ot)}),D.length?I=u.frame(Z):j()}I=u.frame(Z),F=j});return{addFettis:function(J){return D=D.concat(J),G},canvas:y,promise:G,reset:function(){I&&u.cancel(I),F&&F()}}}function H(y,f){var O=!y,B=!!g(f||{},"resize"),$=!1,D=g(f,"disableForReducedMotion",Boolean),N=a&&!!g(f||{},"useWorker"),I=N?p():null,F=O?C:w,G=y&&I?!!y.__confetti_initialized:!1,J=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,j;function Z(z,dt,_t){for(var wt=g(z,"particleCount",_),X=g(z,"angle",Number),bt=g(z,"spread",Number),St=g(z,"startVelocity",Number),Qe=g(z,"decay",Number),ea=g(z,"gravity",Number),ia=g(z,"drift",Number),ds=g(z,"colors",x),sa=g(z,"ticks",Number),us=g(z,"shapes"),ra=g(z,"scalar"),aa=!!g(z,"flat"),hs=E(z),ps=wt,fi=[],na=y.width*hs.x,oa=y.height*hs.y;ps--;)fi.push(A({x:na,y:oa,angle:X,spread:bt,startVelocity:St,color:ds[ps%ds.length],shape:us[S(0,us.length)],ticks:sa,decay:Qe,gravity:ea,drift:ia,scalar:ra,flat:aa}));return j?j.addFettis(fi):(j=L(y,fi,F,dt,_t),j.promise)}function ot(z){var dt=D||g(z,"disableForReducedMotion",Boolean),_t=g(z,"zIndex",Number);if(dt&&J)return l(function(St){St()});O&&j?y=j.canvas:O&&!y&&(y=b(_t),document.body.appendChild(y)),B&&!G&&F(y);var wt={width:y.width,height:y.height};I&&!G&&I.init(y),G=!0,I&&(y.__confetti_initialized=!0);function X(){if(I){var St={getBoundingClientRect:function(){if(!O)return y.getBoundingClientRect()}};F(St),I.postMessage({resize:{width:St.width,height:St.height}});return}wt.width=wt.height=null}function bt(){j=null,B&&($=!1,t.removeEventListener("resize",X)),O&&y&&(document.body.contains(y)&&document.body.removeChild(y),y=null,G=!1)}return B&&!$&&($=!0,t.addEventListener("resize",X,!1)),I?I.fire(z,wt,bt):Z(z,wt,bt)}return ot.reset=function(){I&&I.reset(),j&&j.reset()},ot}var W;function U(){return W||(W=H(null,{useWorker:!0,resize:!0})),W}function Y(y,f,O,B,$,D,N){var I=new Path2D(y),F=new Path2D;F.addPath(I,new DOMMatrix(f));var G=new Path2D;return G.addPath(F,new DOMMatrix([Math.cos(N)*$,Math.sin(N)*$,-Math.sin(N)*D,Math.cos(N)*D,O,B])),G}function et(y){if(!n)throw new Error("path confetti are not supported in this browser");var f,O;typeof y=="string"?f=y:(f=y.path,O=y.matrix);var B=new Path2D(f),$=document.createElement("canvas"),D=$.getContext("2d");if(!O){for(var N=1e3,I=N,F=N,G=0,J=0,j,Z,ot=0;ot<N;ot+=2)for(var z=0;z<N;z+=2)D.isPointInPath(B,ot,z,"nonzero")&&(I=Math.min(I,ot),F=Math.min(F,z),G=Math.max(G,ot),J=Math.max(J,z));j=G-I,Z=J-F;var dt=10,_t=Math.min(dt/j,dt/Z);O=[_t,0,0,_t,-Math.round(j/2+I)*_t,-Math.round(Z/2+F)*_t]}return{type:"path",path:f,matrix:O}}function ft(y){var f,O=1,B="#000000",$='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof y=="string"?f=y:(f=y.text,O="scalar"in y?y.scalar:O,$="fontFamily"in y?y.fontFamily:$,B="color"in y?y.color:B);var D=10*O,N=""+D+"px "+$,I=new OffscreenCanvas(D,D),F=I.getContext("2d");F.font=N;var G=F.measureText(f),J=Math.ceil(G.actualBoundingBoxRight+G.actualBoundingBoxLeft),j=Math.ceil(G.actualBoundingBoxAscent+G.actualBoundingBoxDescent),Z=2,ot=G.actualBoundingBoxLeft+Z,z=G.actualBoundingBoxAscent+Z;J+=Z+Z,j+=Z+Z,I=new OffscreenCanvas(J,j),F=I.getContext("2d"),F.font=N,F.fillStyle=B,F.fillText(f,ot,z);var dt=1/O;return{type:"bitmap",bitmap:I.transferToImageBitmap(),matrix:[dt,0,0,dt,-J*dt/2,-j*dt/2]}}e.exports=function(){return U().apply(this,arguments)},e.exports.reset=function(){U().reset()},e.exports.create=H,e.exports.shapeFromPath=et,e.exports.shapeFromText=ft})((function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}})(),ls,!1);const ta=ls.exports;ls.exports.create;function ho(){return`
    <div class="modal-overlay-backdrop" id="wallet-modal" role="dialog" aria-modal="true" aria-labelledby="wallet-modal-title" aria-hidden="true">
      <div class="modal-container-card modal-md">
        <button type="button" class="modal-close-icon" id="wallet-modal-close-btn" aria-label="Close wallet dialog">&times;</button>
        <div id="wallet-modal-content">
          <!-- Dynamic Content Rendered in updateWalletModalContent -->
        </div>
      </div>
    </div>
  `}function cs(r){const t=r.querySelector("#wallet-modal-content");if(!t)return;const e=Tt();if(!e){t.innerHTML=`
      <div class="modal-header-centered">
        <div class="modal-icon-circle">
          <span class="material-symbols-outlined icon-filled-lg" aria-hidden="true">account_balance_wallet</span>
        </div>
        <h2 class="modal-heading" id="wallet-modal-title">Parkora Digital Wallet</h2>
        <p class="modal-subheading">Sign in to access your commuter balance and transaction history.</p>
      </div>
      <div class="modal-actions-row">
        <button type="button" class="btn-primary btn-block" id="wallet-login-prompt-btn">Sign In to View Wallet</button>
      </div>
    `;const d=t.querySelector("#wallet-login-prompt-btn");d&&(d.onclick=()=>{vt(r);const u=document.querySelector("#login-modal");u&&ut(u)});return}const i=e.walletBalance||0,s=ya(e.id);t.innerHTML=`
    <div class="modal-header-row">
      <div class="modal-header-title-group">
        <span class="material-symbols-outlined icon-emerald-lg" aria-hidden="true">account_balance_wallet</span>
        <div>
          <h2 class="modal-heading" id="wallet-modal-title">Parkora Commuter Wallet</h2>
          <p class="modal-subheading">Instant slot reservations &amp; automated 100% cancellation refunds</p>
        </div>
      </div>
      <span class="wallet-verified-badge">
        <span class="material-symbols-outlined icon-xs" aria-hidden="true">verified_user</span>
        <span>Secure Escrow</span>
      </span>
    </div>

    <!-- Balance Hero Card -->
    <div class="wallet-card-hero">
      <div class="wallet-card-hero-content">
        <span class="wallet-card-label">AVAILABLE BALANCE</span>
        <div class="wallet-card-amount">
          <span class="wallet-currency-symbol">₹</span>
          <span class="wallet-balance-num" id="wallet-hero-balance-val">${i.toLocaleString()}</span>
        </div>
        <div class="wallet-card-meta">
          <span class="wallet-user-tag">${q(e.name)} (${e.roleBadge})</span>
          <span class="wallet-active-indicator">● Active for Instant Gate Checkout</span>
        </div>
      </div>
    </div>

    <!-- Top Up Section -->
    <div class="wallet-topup-section">
      <div class="section-header-inline">
        <h3 class="section-subheading">Add Funds (Demo Simulation)</h3>
        <span class="form-hint-inline">Instant virtual top-up</span>
      </div>

      <!-- Quick Preset Chips -->
      <div class="wallet-presets-row" role="group" aria-label="Preset top-up amounts">
        <button type="button" class="wallet-preset-chip" data-amount="200">+ ₹200</button>
        <button type="button" class="wallet-preset-chip active" data-amount="500">+ ₹500</button>
        <button type="button" class="wallet-preset-chip" data-amount="1000">+ ₹1,000</button>
        <button type="button" class="wallet-preset-chip" data-amount="2000">+ ₹2,000</button>
      </div>

      <!-- Custom Input & Method -->
      <div class="wallet-input-row">
        <div class="wallet-amount-input-wrap">
          <span class="wallet-amount-prefix">₹</span>
          <input 
            type="number" 
            id="wallet-custom-amount" 
            class="search-input input-focus-ring wallet-amount-input" 
            value="500" 
            min="50" 
            max="10000" 
            step="50" 
            aria-label="Top up amount in Rupees"
          />
        </div>

        <div class="wallet-payment-method-select">
          <select id="wallet-payment-method" class="select-compact input-focus-ring" aria-label="Select payment method">
            <option value="UPI Instant (GPay / PhonePe)">⚡ UPI (GPay / PhonePe / Paytm)</option>
            <option value="Credit / Debit Card">💳 Credit / Debit Card</option>
            <option value="Net Banking">🏦 Net Banking</option>
          </select>
        </div>
      </div>

      <button type="button" class="btn-primary btn-lg btn-block" id="wallet-confirm-topup-btn">
        <span class="material-symbols-outlined icon-sm" aria-hidden="true">add_circle</span>
        <span id="wallet-topup-btn-text">Add ₹500 to Wallet</span>
      </button>
    </div>

    <!-- Transaction Ledger -->
    <div class="wallet-ledger-section">
      <div class="section-header-inline">
        <h3 class="section-subheading">Transaction History</h3>
        <span class="meta-label">${s.length} record${s.length!==1?"s":""}</span>
      </div>

      <div class="wallet-transactions-list" role="list">
        ${s.length===0?`
          <div class="empty-state-box compact">
            <p class="empty-state-desc">No transactions yet. Add funds or book a slot to see activity.</p>
          </div>
        `:s.map(d=>{const u=d.type==="credit";return`
            <div class="wallet-tx-item" role="listitem">
              <div class="wallet-tx-left">
                <div class="wallet-tx-icon ${u?"tx-credit":"tx-debit"}">
                  <span class="material-symbols-outlined icon-sm" aria-hidden="true">
                    ${u?"arrow_downward":"arrow_upward"}
                  </span>
                </div>
                <div>
                  <h4 class="wallet-tx-title">${q(d.title)}</h4>
                  <div class="wallet-tx-sub">
                    <span>${q(d.timestamp)}</span>
                    ${d.ref?`<span class="wallet-tx-ref">• ${q(d.ref)}</span>`:""}
                  </div>
                </div>
              </div>
              <div class="wallet-tx-right">
                <span class="wallet-tx-amount ${u?"text-emerald":"text-on-surface"}">
                  ${u?"+":"-"} ₹${Number(d.amount).toLocaleString()}
                </span>
                <span class="wallet-tx-status">${u?"Credited":"Settled"}</span>
              </div>
            </div>
          `}).join("")}
      </div>
    </div>
  `;const a=t.querySelector("#wallet-custom-amount"),n=t.querySelector("#wallet-topup-btn-text"),o=t.querySelectorAll(".wallet-preset-chip"),c=d=>{a&&(a.value=d),n&&(n.textContent=`Add ₹${Number(d).toLocaleString()} to Wallet`)};o.forEach(d=>{d.onclick=()=>{o.forEach(u=>u.classList.remove("active")),d.classList.add("active"),c(d.dataset.amount)}}),a&&(a.oninput=d=>{const u=Number(d.target.value)||0;o.forEach(p=>p.classList.toggle("active",p.dataset.amount===String(u))),n&&(n.textContent=`Add ₹${u.toLocaleString()} to Wallet`)});const l=t.querySelector("#wallet-confirm-topup-btn");l&&(l.onclick=()=>{var m;const d=Number(a==null?void 0:a.value);if(!Number.isFinite(d)||d<50||d>1e4){ht("Please enter a valid top-up amount between ₹50 and ₹10,000.","error");return}const u=((m=t.querySelector("#wallet-payment-method"))==null?void 0:m.value)||"UPI",p=di(d,`Wallet Top-Up via ${u}`,`TOPUP-${Date.now().toString().slice(-6)}`);ta({particleCount:90,spread:60,origin:{y:.6}}),ht(`Added ₹${d.toLocaleString()} to your Parkora Wallet! New balance: ₹${p.toLocaleString()}`,"success"),cs(r)})}function Ni(r){cs(r),ut(r)}function po(r){const t=r.querySelector("#wallet-modal-close-btn");t&&(t.onclick=()=>vt(r))}function fo(){return`
    <div class="modal-overlay-backdrop" id="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-modal-title" aria-hidden="true">
      <div class="modal-container-card">
        <button type="button" class="modal-close-icon" id="modal-close-btn" aria-label="Close reservation dialog">&times;</button>
        <div id="modal-content">
          <!-- Dynamic Content -->
        </div>
      </div>
    </div>
  `}function mo(r){const t=r.querySelector("#modal-close-btn");t&&(t.onclick=()=>vt(r))}function Ze(r,t){const e=t.querySelector("#modal-content");let i=Tt(),s=2,a=i&&i.walletBalance||0;function n(){i=Tt(),a=i&&i.walletBalance||0;const d=r.rateHourly*s,u=t.querySelector("#modal-total-price"),p=t.querySelector("#modal-wallet-balance-val");u&&(u.textContent=`₹${d}`),p&&(p.textContent=i?`₹${a.toLocaleString()}`:"Not Signed In");const m=t.querySelector("#confirm-booking-btn"),v=t.querySelector("#wallet-warning-msg");i?d>a?(m&&(m.disabled=!0,m.textContent="Insufficient Wallet Balance"),v&&(v.textContent='Insufficient wallet balance. Click "+ ₹500" above to add demo funds.',v.classList.remove("hidden"))):(m&&(m.disabled=!1,m.textContent=`Confirm Slot & Pay ₹${d}`),v&&v.classList.add("hidden")):(m&&(m.disabled=!1,m.textContent="Sign In to Reserve Slot"),v&&(v.textContent="Please sign in or select a 1-click demo account to confirm reservation.",v.classList.remove("hidden")))}e.innerHTML=`
    <div class="modal-header-centered">
      <div class="modal-icon-circle">
        <span class="material-symbols-outlined icon-filled-lg" aria-hidden="true">local_parking</span>
      </div>
      <h2 class="modal-heading" id="booking-modal-title">Reserve ${q(r.title)}</h2>
      <p class="modal-subheading">${q(r.address)} • ${q(r.distanceMetro)}</p>
    </div>

    <!-- Live Wallet Status -->
    <div class="wallet-status-bar">
      <div class="wallet-status-label">
        <span class="material-symbols-outlined icon-emerald" aria-hidden="true">account_balance_wallet</span>
        <span>Your Wallet Balance:</span>
      </div>
      <div class="wallet-status-right">
        <span class="wallet-balance-amount" id="modal-wallet-balance-val">${i?`₹${a.toLocaleString()}`:"Not Signed In"}</span>
        ${i?`
          <button type="button" class="wallet-topup-mini-btn" id="modal-wallet-topup-btn" title="Add ₹500 demo funds">+ ₹500</button>
          <button type="button" class="wallet-manage-mini-link" id="modal-wallet-manage-btn">Custom Top-Up &rarr;</button>
        `:""}
      </div>
    </div>

    <div class="booking-summary-box">
      <div class="booking-row">
        <span class="booking-row-label">Hourly Rate</span>
        <span class="booking-row-value">₹${r.rateHourly} / hr</span>
      </div>

      <div class="booking-row">
        <label for="booking-vehicle-type" class="booking-row-label">Vehicle Type</label>
        <select id="booking-vehicle-type" class="select-compact input-focus-ring">
          <option value="4-Wheeler (Car)">🚗 4-Wheeler (Car / SUV)</option>
          <option value="2-Wheeler (Bike/Scooter)">🏍️ 2-Wheeler (Bike / Scooter)</option>
        </select>
      </div>

      <div class="booking-row">
        <label for="booking-start-time" class="booking-row-label">Arrival Time</label>
        <select id="booking-start-time" class="select-compact input-focus-ring">
          <option value="Today, Immediate">Today — Immediate Check-in</option>
          <option value="Today, 10:00 AM">Today — 10:00 AM</option>
          <option value="Today, 02:00 PM">Today — 02:00 PM</option>
          <option value="Today, 06:00 PM">Today — 06:00 PM</option>
          <option value="Tomorrow, 09:00 AM">Tomorrow — 09:00 AM</option>
        </select>
      </div>

      <div class="booking-row">
        <span class="booking-row-label">Parking Duration</span>
        <div class="duration-stepper" role="group" aria-label="Select parking duration in hours">
          <button type="button" class="btn-secondary stepper-btn" id="dur-minus" aria-label="Decrease hours">&minus;</button>
          <span id="dur-val" class="duration-value" aria-live="polite">2 hrs</span>
          <button type="button" class="btn-secondary stepper-btn" id="dur-plus" aria-label="Increase hours">&plus;</button>
        </div>
      </div>

      <div class="booking-total-row">
        <span class="booking-total-label">Total Payable</span>
        <span id="modal-total-price" class="booking-total-amount">₹${r.rateHourly*2}</span>
      </div>
    </div>

    <p id="wallet-warning-msg" class="form-warning-text hidden" role="alert"></p>

    <div class="form-field-group">
      <label for="vehicle-num-input" class="form-label">Vehicle Registration Number</label>
      <input 
        type="text" 
        id="vehicle-num-input" 
        class="search-input input-focus-ring" 
        placeholder="e.g. KA 01 AB 1234" 
        value="${q((i==null?void 0:i.vehicleNumber)||"KA 01 AB 7890")}" 
        required minlength="4" maxlength="16" autocomplete="off"
      />
    </div>

    <button type="button" class="btn-primary btn-lg btn-block" id="confirm-booking-btn">
      Confirm Slot &amp; Pay ₹${r.rateHourly*2}
    </button>
  `,ut(t),n();const o=t.querySelector("#modal-wallet-topup-btn");o&&(o.onclick=()=>{const d=di(500,"Direct Top-Up from Booking",`TOPUP-${Date.now().toString().slice(-6)}`);ht(`Added ₹500 to your Parkora wallet! Balance: ₹${d.toLocaleString()}`,"success"),n()});const c=t.querySelector("#modal-wallet-manage-btn");c&&(c.onclick=()=>{vt(t);const d=document.querySelector("#wallet-modal");d&&Ni(d)});const l=t.querySelector("#dur-val");t.querySelector("#dur-minus").onclick=()=>{s>1&&(s--,l.textContent=`${s} hr${s>1?"s":""}`,n())},t.querySelector("#dur-plus").onclick=()=>{s<12&&(s++,l.textContent=`${s} hrs`,n())},t.querySelector("#confirm-booking-btn").onclick=()=>{var h,g;const d=Tt();if(!d){sessionStorage.setItem("parkora_pending_booking_spot",r.id),vt(t);const _=document.querySelector("#login-modal");_&&ut(_);return}const u=t.querySelector("#vehicle-num-input").value.trim().toUpperCase();if(!/^[A-Z0-9 -]{4,16}$/.test(u)){ht("Enter a valid vehicle registration number.","error"),t.querySelector("#vehicle-num-input").focus();return}const p=((h=t.querySelector("#booking-vehicle-type"))==null?void 0:h.value)||"4-Wheeler (Car)",m=((g=t.querySelector("#booking-start-time"))==null?void 0:g.value)||"Today, Immediate",v=r.rateHourly*s;try{createdPass=Pa({userId:d.id,spotId:r.id,spotTitle:r.title,spotAddress:r.address,hours:s,startTime:m,totalPaid:v,vehicleNumber:u.toUpperCase(),vehicleType:p})}catch(_){ht(_.message||"Could not complete this reservation.","error"),n();return}ta({particleCount:110,spread:75,origin:{y:.6}}),ht(`Spot reserved! Pass ${createdPass.passCode} is active.`,"success"),e.innerHTML=`
      <div class="booking-success-view">
        <div class="modal-icon-circle success-circle">
          <span class="material-symbols-outlined icon-filled-lg" aria-hidden="true">check</span>
        </div>
        <h2 class="modal-heading">Slot Guaranteed!</h2>
        <p class="modal-subheading">
          Your parking pass for <strong>${q(r.title)}</strong> is confirmed for <strong>${s} hour${s>1?"s":""}</strong> (${q(m)}).
        </p>

        <div class="digital-pass-ticket">
          <div class="qr-box-svg" aria-hidden="true">
            <svg viewBox="0 0 64 64" width="64" height="64" fill="#191c1e">
              <rect x="4" y="4" width="20" height="20" rx="2" fill="none" stroke="#191c1e" stroke-width="4"/>
              <rect x="10" y="10" width="8" height="8"/>
              <rect x="40" y="4" width="20" height="20" rx="2" fill="none" stroke="#191c1e" stroke-width="4"/>
              <rect x="46" y="10" width="8" height="8"/>
              <rect x="4" y="40" width="20" height="20" rx="2" fill="none" stroke="#191c1e" stroke-width="4"/>
              <rect x="10" y="46" width="8" height="8"/>
              <rect x="30" y="30" width="8" height="8" fill="#10b981"/>
              <rect x="42" y="32" width="6" height="6"/>
              <rect x="52" y="36" width="8" height="8"/>
              <rect x="32" y="46" width="12" height="6"/>
              <rect x="48" y="48" width="12" height="12" rx="2"/>
            </svg>
          </div>
          <div class="digital-pass-details">
            <span class="pass-code-label">GATE ACCESS PASS</span>
            <strong class="pass-code-mono">${createdPass.passCode}</strong>
            <span class="pass-vehicle-tag">Vehicle: ${q(createdPass.vehicleNumber)}</span>
          </div>
        </div>

        <div class="modal-actions-row">
          <button type="button" class="btn-secondary btn-block" id="done-booking-btn">
            Done
          </button>
          <button type="button" class="btn-primary btn-block" id="view-all-passes-btn">
            View My Bookings
          </button>
        </div>
      </div>
    `,t.querySelector("#done-booking-btn").onclick=()=>{vt(t)},t.querySelector("#view-all-passes-btn").onclick=()=>{vt(t);const _=document.querySelector("#nav-my-bookings-btn");_&&_.click()}}}function Fs(){const r=Tt(),t=r&&r.role==="owner"?r.id:"user-owner-1",e=Wi(t),i=e?e.monthlyIncome.toLocaleString():"14,500",s=!!(r&&r.role==="owner");return`
    <section class="host-banner-container" id="host-monetization-section">
      <div class="host-banner-flex">
        <div class="host-banner-copy">
          <span class="section-overline-label">HOST PARTNER PROGRAM</span>
          <h2 class="host-banner-title">Monetize Your Driveway</h2>
          <p class="host-banner-desc">
            Have an empty parking spot near a transit hub or office park? List it on Parkora and start earning passive income with automated digital gate passes.
          </p>
          <div class="host-banner-actions">
            <button type="button" class="btn-primary btn-lg" id="list-space-btn">
              ${s?"Manage Your Listings":"List Your Space"}
            </button>
            <button type="button" class="btn-secondary btn-lg" id="learn-host-btn">Learn More</button>
          </div>
        </div>

        <div class="host-calculator-card">
          <div class="host-calc-header">
            <span class="material-symbols-outlined icon-emerald-lg icon-filled" aria-hidden="true">payments</span>
            <div>
              <p class="host-calc-income" id="host-calc-income-display">₹${i}<small>/mo</small></p>
              <p class="host-calc-subtitle">${s?`Your Live Host Earnings (${e.activeListingsCount} active)`:"Estimated Host Earnings"}</p>
            </div>
          </div>

          <div class="host-calc-slider-wrap">
            <div class="host-calc-slider-labels">
              <label for="host-hours-slider">Booked hours / day</label>
              <strong id="host-hours-val">6 hrs/day @ ₹45/hr</strong>
            </div>
            <input
              type="range"
              id="host-hours-slider"
              class="urban-range-slider"
              min="2"
              max="14"
              step="1"
              value="6"
              aria-label="Estimate monthly host earnings by booked hours per day"
            />
          </div>
        </div>
      </div>
    </section>
  `}function vo(){return`
    <div class="modal-overlay-backdrop" id="login-modal" role="dialog" aria-modal="true" aria-labelledby="login-modal-title" aria-hidden="true">
      <div class="modal-container-card modal-sm">
        <button type="button" class="modal-close-icon" id="login-modal-close-btn" aria-label="Close sign in dialog">&times;</button>
        
        <div class="modal-header-centered">
          <div class="modal-icon-circle">
            <span class="material-symbols-outlined icon-filled-lg" aria-hidden="true">account_circle</span>
          </div>
          <h2 class="modal-heading" id="login-modal-title">Welcome to Parkora</h2>
          <p class="modal-subheading">Sign in or choose a 1-click Demo Role</p>
        </div>

        <!-- Demo Mock Login Profiles -->
        <div class="demo-roles-section">
          <span class="section-overline-label">⚡ Quick Demo Login (Select Role)</span>
          
          <div class="demo-roles-list">
            ${Pe.map(r=>`
              <button 
                type="button"
                class="mock-user-login-btn" 
                data-userid="${r.id}"
              >
                <img src="${r.avatar}" alt="${r.name}" class="user-avatar-md" width="40" height="40" />
                <div class="mock-user-info">
                  <div class="mock-user-top-row">
                    <span class="mock-user-name">${r.name}</span>
                    <span class="role-badge-pill role-${r.role}">${r.roleBadge}</span>
                  </div>
                  <span class="mock-user-email">${r.email}</span>
                </div>
              </button>
            `).join("")}
          </div>
        </div>

        <div class="modal-divider">
          <span>OR SIGN IN MANUALLY (DEMO)</span>
        </div>

        <!-- Manual Form -->
        <form id="login-manual-form" class="modal-form-stack">
          <div>
            <label for="login-email-input" class="form-label">Email Address</label>
            <input 
              type="email" 
              id="login-email-input" 
              class="search-input input-focus-ring" 
              placeholder="alex@parkora.com"
              autocomplete="email"
              required 
            />
          </div>

          <div>
            <label for="login-password-input" class="form-label">Password <span class="form-hint-inline">(any password works in demo)</span></label>
            <input 
              type="password" 
              id="login-password-input" 
              class="search-input input-focus-ring" 
              placeholder="••••••••" 
              autocomplete="current-password"
              required
            />
          </div>

          <button type="submit" class="btn-primary btn-lg btn-block">
            Sign In
          </button>
        </form>
      </div>
    </div>
  `}function go(r,t){const e=r.querySelector("#login-modal-close-btn");e&&(e.onclick=()=>vt(r));function i(a){if(vt(r),a){ht(`Signed in as ${a.name} (${a.roleBadge})`,"success");const n=sessionStorage.getItem("parkora_pending_booking_spot");n&&(sessionStorage.removeItem("parkora_pending_booking_spot"),setTimeout(()=>{window.dispatchEvent(new CustomEvent("parkora-pending-booking",{detail:{spotId:n}}))},120))}}r.querySelectorAll(".mock-user-login-btn").forEach(a=>{a.onclick=()=>{const n=a.dataset.userid,o=ki(n);i(o)}});const s=r.querySelector("#login-manual-form");s&&(s.onsubmit=a=>{a.preventDefault();const n=r.querySelector("#login-email-input").value;r.querySelector("#login-password-input").value;const o=_a(n);i(o)})}let ce="active";function bo(){return`
    <div class="modal-overlay-backdrop" id="my-bookings-modal" role="dialog" aria-modal="true" aria-labelledby="my-bookings-modal-title" aria-hidden="true">
      <div class="modal-container-card modal-md">
        <button type="button" class="modal-close-icon" id="my-bookings-close-btn" aria-label="Close active passes dialog">&times;</button>
        
        <div class="modal-header-row">
          <div class="modal-header-title-group">
            <span class="material-symbols-outlined icon-emerald-lg" aria-hidden="true">confirmation_number</span>
            <div>
              <h2 class="modal-heading" id="my-bookings-modal-title">My Passes &amp; Booking History</h2>
              <p class="modal-subheading">Track live gate access passes and review past reservations</p>
            </div>
          </div>
        </div>

        <div id="bookings-list-content">
          <!-- Dynamic Bookings -->
        </div>
      </div>
    </div>
  `}function Me(r){const t=r.querySelector("#bookings-list-content");if(!t)return;const e=Tt();if(!e){t.innerHTML=`
      <div class="empty-state-box">
        <span class="material-symbols-outlined empty-state-icon" aria-hidden="true">account_circle</span>
        <p class="empty-state-title">Please Sign In</p>
        <p class="empty-state-desc">Sign in to your Parkora account to view your active passes and booking history.</p>
      </div>
    `;return}const i=Xt.filter(c=>c.userId===e.id),s=i.filter(c=>c.status==="active"),a=i.filter(c=>c.status!=="active");t.innerHTML=`
    <!-- Modal Navigation Tabs -->
    <div class="bookings-tab-bar" role="tablist" aria-label="Booking view tabs">
      <button 
        type="button" 
        role="tab" 
        class="bookings-tab-btn ${ce==="active"?"active":""}" 
        id="tab-active-passes"
        aria-selected="${ce==="active"}"
      >
        <span>Active Passes</span>
        <span class="tab-count-badge">${s.length}</span>
      </button>

      <button 
        type="button" 
        role="tab" 
        class="bookings-tab-btn ${ce==="history"?"active":""}" 
        id="tab-history-passes"
        aria-selected="${ce==="history"}"
      >
        <span>Booking History &amp; Refunds</span>
        <span class="tab-count-badge">${a.length}</span>
      </button>
    </div>

    <!-- Live Wallet Status Bar inside My Bookings -->
    <div class="wallet-status-bar compact">
      <div class="wallet-status-label">
        <span class="material-symbols-outlined icon-emerald" aria-hidden="true">account_balance_wallet</span>
        <span>Your Wallet Balance:</span>
      </div>
      <div class="wallet-status-right">
        <strong class="wallet-balance-amount">₹${(e.walletBalance||0).toLocaleString()}</strong>
      </div>
    </div>

    <div id="bookings-tab-content" class="bookings-tab-mount">
      ${ce==="active"?yo(s):_o(a)}
    </div>
  `;const n=t.querySelector("#tab-active-passes"),o=t.querySelector("#tab-history-passes");n&&(n.onclick=()=>{ce="active",Me(r)}),o&&(o.onclick=()=>{ce="history",Me(r)}),t.querySelectorAll(".copy-pass-btn").forEach(c=>{c.onclick=()=>{const l=c.dataset.passcode;navigator.clipboard&&l&&navigator.clipboard.writeText(l).catch(()=>{}),ht(`Gate pass code ${l} copied to clipboard!`,"info")}}),t.querySelectorAll(".cancel-pass-btn").forEach(c=>{c.onclick=()=>{const l=c.dataset.bookingid,d=Aa(l);d&&(ht(`Pass ${d.passCode} cancelled! ₹${d.totalPaid} refunded to your wallet.`,"info"),Me(r))}})}function yo(r){return r.length===0?`
      <div class="empty-state-box">
        <span class="material-symbols-outlined empty-state-icon" aria-hidden="true">event_busy</span>
        <p class="empty-state-title">No active passes right now</p>
        <p class="empty-state-desc">Reserve a spot from the grid or map to get your instant gate access pass.</p>
      </div>
    `:`
    <div class="bookings-scroll-list">
      ${r.map(t=>`
        <div class="booking-pass-card">
          <div class="booking-pass-top">
            <div>
              <span class="pass-active-pill">PASS ACTIVE</span>
              <h3 class="booking-pass-title">${q(t.spotTitle)}</h3>
              <p class="booking-pass-address">${q(t.spotAddress)}</p>
            </div>
            <div class="booking-pass-code-col">
              <button type="button" class="copy-pass-btn" data-passcode="${q(t.passCode)}" title="Click to copy pass code">
                <span>${q(t.passCode)}</span>
                <span class="material-symbols-outlined icon-xs" aria-hidden="true">content_copy</span>
              </button>
              <p class="booking-pass-duration">${t.hours} Hours • ${q(t.startTime||"Today")}</p>
            </div>
          </div>

          <div class="booking-pass-ticket-strip">
            <div>
              <span class="meta-label">Vehicle</span>
              <span class="pass-mono-val">${q(t.vehicleNumber)}</span>
            </div>
            <div class="text-right">
              <span class="meta-label">Paid Amount</span>
              <span class="pass-price-val">₹${t.totalPaid}</span>
            </div>
          </div>

          <div class="booking-pass-actions">
            <button 
              type="button"
              class="btn-secondary btn-danger-outline cancel-pass-btn" 
              data-bookingid="${q(t.id)}"
            >
              Cancel Pass &amp; 100% Refund (₹${t.totalPaid})
            </button>
          </div>
        </div>
      `).join("")}
    </div>
  `}function _o(r){return r.length===0?`
      <div class="empty-state-box">
        <span class="material-symbols-outlined empty-state-icon" aria-hidden="true">history</span>
        <p class="empty-state-title">No past bookings found</p>
        <p class="empty-state-desc">When you cancel or complete a parking pass, its full audit history will show here.</p>
      </div>
    `:`
    <div class="bookings-scroll-list">
      ${r.map(t=>`
        <div class="booking-pass-card booking-card-history">
          <div class="booking-pass-top">
            <div>
              <span class="pass-status-pill ${t.status==="cancelled"?"status-cancelled":"status-completed"}">
                ${t.status==="cancelled"?"CANCELLED &amp; REFUNDED":"COMPLETED"}
              </span>
              <h3 class="booking-pass-title">${q(t.spotTitle)}</h3>
              <p class="booking-pass-address">${q(t.spotAddress)}</p>
            </div>
            <div class="booking-pass-code-col">
              <span class="pass-code-mono pass-code-muted">${q(t.passCode)}</span>
              <p class="booking-pass-duration">${t.hours} Hours • ${q(t.startTime||"Standard")}</p>
            </div>
          </div>

          <div class="booking-pass-ticket-strip">
            <div>
              <span class="meta-label">Vehicle &amp; Booked At</span>
              <span class="pass-mono-val">${q(t.vehicleNumber)} • ${q(t.bookedAt||"Earlier")}</span>
            </div>
            <div class="text-right">
              <span class="meta-label">Refund Status</span>
              <span class="pass-refund-tag">
                ${t.status==="cancelled"?`₹${t.totalPaid} Refunded to Wallet`:`₹${t.totalPaid} Settled`}
              </span>
            </div>
          </div>
        </div>
      `).join("")}
    </div>
  `}function wo(){return`
    <div class="modal-overlay-backdrop" id="owner-dashboard-modal" role="dialog" aria-modal="true" aria-labelledby="owner-dashboard-title" aria-hidden="true">
      <div class="modal-container-card modal-lg">
        <button type="button" class="modal-close-icon" id="owner-dashboard-close-btn" aria-label="Close host portal">&times;</button>

        <div class="modal-header-row">
          <div class="modal-header-title-group">
            <span class="material-symbols-outlined icon-emerald-lg" aria-hidden="true">roofing</span>
            <div>
              <h2 class="modal-heading" id="owner-dashboard-title">Parking Host Portal</h2>
              <p class="modal-subheading">Manage your listed driveway &amp; parking spaces</p>
            </div>
          </div>

          <button type="button" class="btn-primary btn-sm" id="owner-add-spot-btn">
            <span class="material-symbols-outlined icon-sm" aria-hidden="true">add</span>
            <span>Add New Spot</span>
          </button>
        </div>

        <!-- Dynamic Host Metrics -->
        <div class="metrics-grid-3">
          <div class="metric-stat-card">
            <span class="metric-stat-label">Total Monthly Income</span>
            <p class="metric-stat-value text-emerald" id="owner-income-val">--</p>
          </div>
          <div class="metric-stat-card">
            <span class="metric-stat-label">Active Listings</span>
            <p class="metric-stat-value" id="owner-spots-count-val">--</p>
          </div>
          <div class="metric-stat-card">
            <span class="metric-stat-label">Occupancy Rate</span>
            <p class="metric-stat-value" id="owner-occupancy-val">--</p>
          </div>
        </div>

        <!-- Spot Addition Sub-Form -->
        <div id="add-spot-form-card" class="add-spot-form-container hidden">
          <h3 class="section-subheading">List New Parking Spot</h3>
          
          <form id="new-spot-form" class="new-spot-grid-form">
            <div>
              <label for="new-spot-title" class="form-label">Spot Title</label>
              <input type="text" id="new-spot-title" class="search-input input-focus-ring" placeholder="e.g. Indiranagar Driveway Slot" minlength="3" maxlength="80" required />
            </div>

            <div>
              <label for="new-spot-address" class="form-label">Full Address</label>
              <input type="text" id="new-spot-address" class="search-input input-focus-ring" placeholder="e.g. 100ft Road, Bengaluru" minlength="5" maxlength="120" required />
            </div>

            <div>
              <label for="new-spot-category" class="form-label">Category</label>
              <select id="new-spot-category" class="search-input input-focus-ring">
                <option value="metro">Near Metro Station</option>
                <option value="ev">EV Charging Pod</option>
                <option value="work">Office &amp; Tech Park</option>
              </select>
            </div>

            <div>
              <label for="new-spot-rate" class="form-label">Hourly Rate (₹)</label>
              <input type="number" id="new-spot-rate" class="search-input input-focus-ring" placeholder="40" min="10" max="500" required />
            </div>

            <div>
              <label for="new-spot-vehicletype" class="form-label">Vehicle Compatibility</label>
              <select id="new-spot-vehicletype" class="search-input input-focus-ring">
                <option value="all">🚗+🏍️ Both 4-Wheeler &amp; 2-Wheeler</option>
                <option value="car">🚗 4-Wheeler Only (Cars / SUVs)</option>
                <option value="bike">🏍️ 2-Wheeler Only (Bikes / Scooters)</option>
              </select>
            </div>

            <div>
              <label for="new-spot-distance" class="form-label">Distance to Metro / Hub</label>
              <input type="text" id="new-spot-distance" class="search-input input-focus-ring" placeholder="e.g. 100m to Metro" maxlength="60" />
            </div>

            <div class="checkbox-group-row">
              <label class="checkbox-label">
                <input type="checkbox" id="new-spot-ev" />
                <span>EV Charger</span>
              </label>
              <label class="checkbox-label">
                <input type="checkbox" id="new-spot-covered" checked />
                <span>Covered Bay</span>
              </label>
            </div>

            <div class="form-full-actions">
              <button type="button" class="btn-secondary" id="cancel-add-spot-btn">Cancel</button>
              <button type="submit" class="btn-primary">Submit Listing for Verification</button>
            </div>
          </form>
        </div>

        <!-- Owner Spots Table -->
        <div>
          <h3 class="section-subheading">Your Listed Spots</h3>
          <div id="owner-spots-list" class="dashboard-scroll-list">
            <!-- Dynamic List -->
          </div>
        </div>
      </div>
    </div>
  `}function he(r,t){const e=r.querySelector("#owner-spots-list"),i=r.querySelector("#owner-income-val"),s=r.querySelector("#owner-spots-count-val"),a=r.querySelector("#owner-occupancy-val"),n=Tt(),o=n&&n.role==="owner"?n.id:"user-owner-1",c=Wi(o);i&&(i.textContent=`₹${c.monthlyIncome.toLocaleString()}`),s&&(s.textContent=c.activeListingsCount),a&&(a.textContent=`${c.occupancyRate}%`);const l=c.totalSpots;l.length===0?e.innerHTML=`
      <div class="empty-state-box">
        <p class="empty-state-desc">No spots active yet. Click "Add New Spot" to submit your driveway!</p>
      </div>
    `:e.innerHTML=`
      <div class="dashboard-list-stack">
        ${l.map(d=>`
          <div class="dashboard-list-item">
            <div>
              <div class="dashboard-item-title-row">
                <h4 class="dashboard-item-title">${q(d.title)}</h4>
                ${d.evCharging?'<span class="mini-tag-emerald">⚡ EV</span>':""}
                ${d.covered?'<span class="mini-tag-neutral">Covered</span>':""}
              </div>
              <p class="dashboard-item-sub">${q(d.address)} • Slots: ${d.availableSlots}/${d.totalCapacity||5}</p>
            </div>

            <div class="dashboard-item-actions">
              <span class="dashboard-rate-label">₹${d.rateHourly}<small>/hr</small></span>
              
              <button 
                type="button"
                class="status-toggle-pill ${d.active?"status-active":"status-paused"} toggle-spot-btn" 
                data-spotid="${q(d.id)}"
              >
                ${d.active?"● Active":"○ Paused"}
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    `,e.querySelectorAll(".toggle-spot-btn").forEach(d=>{d.onclick=()=>{const u=d.dataset.spotid,p=Ra(u);he(r),ht(`Listing is now ${p?"Active & bookable":"Paused"}.`,"info")}})}function So(r,t){const e=r.querySelector("#owner-dashboard-close-btn");e&&(e.onclick=()=>vt(r));const i=r.querySelector("#owner-add-spot-btn"),s=r.querySelector("#add-spot-form-card"),a=r.querySelector("#cancel-add-spot-btn");i&&s&&(i.onclick=()=>{var o;s.classList.remove("hidden"),(o=r.querySelector("#new-spot-title"))==null||o.focus()}),a&&s&&(a.onclick=()=>{s.classList.add("hidden")});const n=r.querySelector("#new-spot-form");n&&(n.onsubmit=o=>{var l;o.preventDefault();const c=Tt();try{const d=La({ownerId:c&&c.role==="owner"?c.id:"user-owner-1",ownerName:(c==null?void 0:c.name)||"Sarah Jenkins",title:r.querySelector("#new-spot-title").value.trim(),address:r.querySelector("#new-spot-address").value.trim(),category:r.querySelector("#new-spot-category").value,vehicleType:((l=r.querySelector("#new-spot-vehicletype"))==null?void 0:l.value)||"all",rateHourly:r.querySelector("#new-spot-rate").value,distanceMetro:r.querySelector("#new-spot-distance").value.trim()||"150m to Metro",evCharging:r.querySelector("#new-spot-ev").checked,covered:r.querySelector("#new-spot-covered").checked,availableSlots:4});n.reset(),s.classList.add("hidden"),he(r,t),ht(`Listing "${d.title}" submitted for Admin verification!`,"success")}catch(d){ht(d.message||"Please check your listing details.","error")}})}function ko(){return`
    <div class="modal-overlay-backdrop" id="admin-dashboard-modal" role="dialog" aria-modal="true" aria-labelledby="admin-dashboard-title" aria-hidden="true">
      <div class="modal-container-card modal-lg">
        <button type="button" class="modal-close-icon" id="admin-dashboard-close-btn" aria-label="Close admin panel">&times;</button>

        <div class="modal-header-row">
          <div class="modal-header-title-group">
            <span class="material-symbols-outlined icon-danger-lg" aria-hidden="true">admin_panel_settings</span>
            <div>
              <h2 class="modal-heading" id="admin-dashboard-title">Master System Admin Panel</h2>
              <p class="modal-subheading">Platform revenue metrics, pending approvals, and user governance</p>
            </div>
          </div>

          <button type="button" class="btn-secondary btn-sm" id="admin-reset-demo-btn" title="Restore initial demo listings and bookings">
            <span class="material-symbols-outlined icon-sm" aria-hidden="true">restart_alt</span>
            <span>Reset Demo Data</span>
          </button>
        </div>

        <!-- Dynamic Platform Stats Grid -->
        <div class="metrics-grid-4">
          <div class="metric-stat-card">
            <span class="metric-stat-label">Total Platform Revenue</span>
            <p class="metric-stat-value text-emerald" id="admin-revenue-val">--</p>
          </div>
          <div class="metric-stat-card">
            <span class="metric-stat-label">Active Bookings</span>
            <p class="metric-stat-value" id="admin-active-bookings-val">--</p>
          </div>
          <div class="metric-stat-card">
            <span class="metric-stat-label">Total Live Spots</span>
            <p class="metric-stat-value" id="admin-live-spots-val">--</p>
          </div>
          <div class="metric-stat-card">
            <span class="metric-stat-label">Total Platform Users</span>
            <p class="metric-stat-value" id="admin-users-count-val">--</p>
          </div>
        </div>

        <!-- Pending Approval Queue -->
        <div class="admin-section-block">
          <div class="section-header-inline">
            <h3 class="section-subheading">Pending Host Spot Approvals</h3>
            <span id="pending-count-badge" class="pending-pill-badge">--</span>
          </div>

          <div id="pending-spots-list" class="dashboard-scroll-list">
            <!-- Dynamic Pending List -->
          </div>
        </div>

        <!-- Users Governance Table -->
        <div>
          <h3 class="section-subheading">Registered Accounts &amp; Roles</h3>
          <div class="dashboard-list-stack">
            ${Pe.map(r=>`
              <div class="governance-user-row">
                <div class="governance-user-left">
                  <img src="${r.avatar}" alt="${r.name}" class="user-avatar-sm" width="32" height="32" />
                  <div>
                    <span class="governance-user-name">${r.name}</span>
                    <span class="governance-user-email">${r.email}</span>
                  </div>
                </div>
                <span class="role-badge-pill role-${r.role}">${r.roleBadge}</span>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    </div>
  `}function Ce(r,t){const e=r.querySelector("#pending-spots-list"),i=r.querySelector("#pending-count-badge"),s=r.querySelector("#admin-revenue-val"),a=r.querySelector("#admin-active-bookings-val"),n=r.querySelector("#admin-live-spots-val"),o=r.querySelector("#admin-users-count-val"),c=Ma();if(s&&(s.textContent=`₹${c.totalRevenue.toLocaleString()}`),a&&(a.textContent=c.activeBookingsCount),n&&(n.textContent=c.totalSpotsCount),o&&(o.textContent=c.totalUsersCount.toLocaleString()),i&&(i.textContent=`${Ft.length} Pending`),Ft.length===0){e.innerHTML=`
      <div class="empty-state-box compact">
        <p class="empty-state-desc">✓ All host listings have been reviewed &amp; verified. No pending approvals in queue.</p>
      </div>
    `;return}e.innerHTML=`
    <div class="dashboard-list-stack">
      ${Ft.map(l=>`
        <div class="dashboard-list-item">
          <div>
            <div class="dashboard-item-title-row">
              <h4 class="dashboard-item-title">${q(l.title)}</h4>
              <span class="dashboard-item-author">by ${q(l.ownerName)}</span>
            </div>
            <p class="dashboard-item-sub">${q(l.address)} • ₹${l.rateHourly}/hr • ${q(l.distanceMetro)}</p>
          </div>

          <div class="dashboard-item-actions">
            <button type="button" class="btn-secondary btn-danger-outline btn-sm reject-pending-btn" data-pendingid="${q(l.id)}">
              Reject
            </button>
            <button type="button" class="btn-primary btn-sm approve-pending-btn" data-pendingid="${q(l.id)}">
              Approve Listing
            </button>
          </div>
        </div>
      `).join("")}
    </div>
  `,e.querySelectorAll(".approve-pending-btn").forEach(l=>{l.onclick=()=>{const d=l.dataset.pendingid,u=Ea(d);Ce(r),u&&ht(`Approved "${u.title}" and published to live search grid!`,"success")}}),e.querySelectorAll(".reject-pending-btn").forEach(l=>{l.onclick=()=>{const d=l.dataset.pendingid,u=Oa(d);Ce(r),u&&ht(`Rejected pending listing "${u.title}".`,"warning")}})}function To(r,t){const e=r.querySelector("#admin-dashboard-close-btn");e&&(e.onclick=()=>vt(r));const i=r.querySelector("#admin-reset-demo-btn");i&&(i.onclick=()=>{xa(),Ce(r),ht("Demo spots, pending queue, and bookings restored to defaults.","info")})}function xo(){return`
    <div class="modal-overlay-backdrop" id="info-modal" role="dialog" aria-modal="true" aria-labelledby="info-modal-title" aria-hidden="true">
      <div class="modal-container-card modal-md">
        <button type="button" class="modal-close-icon" id="info-modal-close-btn" aria-label="Close information dialog">&times;</button>
        <div id="info-modal-body">
          <!-- Dynamic Content -->
        </div>
      </div>
    </div>
  `}function de(r,t,e){const i=t.querySelector("#info-modal-body");r==="solutions"?i.innerHTML=`
      <div class="modal-header-centered">
        <div class="modal-icon-circle">
          <span class="material-symbols-outlined icon-filled-lg" aria-hidden="true">lightbulb</span>
        </div>
        <h2 class="modal-heading" id="info-modal-title">Parkora Solutions</h2>
        <p class="modal-subheading">Smart urban parking infrastructure tailored for modern mobility</p>
      </div>

      <div class="info-cards-stack">
        <div class="info-feature-card">
          <h3 class="info-feature-title">
            <span class="material-symbols-outlined icon-emerald" aria-hidden="true">train</span>
            <span>Daily Metro Commuter Pass</span>
          </h3>
          <p class="info-feature-desc">Guaranteed parking spot near your daily metro station. Save 20% compared to hourly rates with instant digital QR gate check-in.</p>
        </div>

        <div class="info-feature-card">
          <h3 class="info-feature-title">
            <span class="material-symbols-outlined icon-emerald" aria-hidden="true">ev_station</span>
            <span>EV Fast Charging Infrastructure</span>
          </h3>
          <p class="info-feature-desc">Charge while you commute. 50kW DC fast-charging pods integrated directly at reserved slots with transparent per-hour billing.</p>
        </div>

        <div class="info-feature-card">
          <h3 class="info-feature-title">
            <span class="material-symbols-outlined icon-emerald" aria-hidden="true">business_center</span>
            <span>Corporate &amp; IT Park Fleet Parking</span>
          </h3>
          <p class="info-feature-desc">Custom employer parking allowances and reserved bay allocations for high-density office complexes and tech parks.</p>
        </div>
      </div>
    `:r==="locations"?(i.innerHTML=`
      <div class="modal-header-centered">
        <div class="modal-icon-circle">
          <span class="material-symbols-outlined icon-filled-lg" aria-hidden="true">map</span>
        </div>
        <h2 class="modal-heading" id="info-modal-title">Active Cities &amp; Metro Networks</h2>
        <p class="modal-subheading">Click any city below to filter live spots in that metropolitan network</p>
      </div>

      <div class="locations-grid-2">
        <button type="button" class="location-city-card" data-city="Bengaluru">
          <h4 class="location-city-name">Bengaluru</h4>
          <p class="location-city-lines">Namma Metro Purple &amp; Green Lines</p>
          <span class="location-city-count">480+ Verified Spots &rarr;</span>
        </button>
        <button type="button" class="location-city-card" data-city="Mumbai">
          <h4 class="location-city-name">Mumbai</h4>
          <p class="location-city-lines">Metro Line 1, 2A &amp; 7</p>
          <span class="location-city-count">360+ Verified Spots &rarr;</span>
        </button>
        <button type="button" class="location-city-card" data-city="Gurugram">
          <h4 class="location-city-name">Gurugram &amp; Delhi NCR</h4>
          <p class="location-city-lines">DMRC Yellow &amp; Rapid Metro</p>
          <span class="location-city-count">290+ Verified Spots &rarr;</span>
        </button>
        <button type="button" class="location-city-card" data-city="">
          <h4 class="location-city-name">All Metro Networks</h4>
          <p class="location-city-lines">View all verified hubs nationwide</p>
          <span class="location-city-count">1,280+ Total Spots &rarr;</span>
        </button>
      </div>
    `,i.querySelectorAll(".location-city-card").forEach(s=>{s.onclick=()=>{const a=s.dataset.city||"";vt(t),e&&e(a)}})):r==="pricing"?i.innerHTML=`
      <div class="modal-header-centered">
        <div class="modal-icon-circle">
          <span class="material-symbols-outlined icon-filled-lg" aria-hidden="true">payments</span>
        </div>
        <h2 class="modal-heading" id="info-modal-title">Transparent Pricing</h2>
        <p class="modal-subheading">No surge pricing or hidden reservation fees</p>
      </div>

      <div class="info-cards-stack">
        <div class="pricing-tier-row">
          <div>
            <h4 class="info-feature-title">Standard Hourly Rate</h4>
            <p class="info-feature-desc">Pay only for the hours you park. Instant refund on cancellation.</p>
          </div>
          <span class="pricing-tier-amount">₹35 - ₹60<small>/hr</small></span>
        </div>

        <div class="pricing-tier-row pricing-tier-featured">
          <div>
            <span class="popular-badge">Most Popular</span>
            <h4 class="info-feature-title">Daily Metro Commuter Pass</h4>
            <p class="info-feature-desc">12 hours guaranteed parking near metro with unlimited entry/exit.</p>
          </div>
          <span class="pricing-tier-amount text-emerald">₹250<small>/day</small></span>
        </div>

        <div class="pricing-tier-row">
          <div>
            <h4 class="info-feature-title">Monthly EV Smart Charging Pass</h4>
            <p class="info-feature-desc">Reserved charging slot + 50kW DC fast charging included.</p>
          </div>
          <span class="pricing-tier-amount">₹4,999<small>/mo</small></span>
        </div>
      </div>
    `:r==="privacy"?i.innerHTML=`
      <div class="modal-header-centered">
        <div class="modal-icon-circle">
          <span class="material-symbols-outlined icon-filled-lg" aria-hidden="true">shield_lock</span>
        </div>
        <h2 class="modal-heading" id="info-modal-title">Privacy Policy</h2>
        <p class="modal-subheading">How Parkora protects your commuter &amp; vehicle data</p>
      </div>
      <div class="legal-prose-box">
        <p><strong>1. Data Collection:</strong> We collect only your basic account profile, vehicle registration number for ANPR gate entry, and booking timestamps.</p>
        <p><strong>2. Location Privacy:</strong> Parkora never tracks background GPS location. Search queries are processed solely to match you with nearby verified parking hubs.</p>
        <p><strong>3. Third-Party Sharing:</strong> Host partners only see your vehicle license plate and booked time window for security verification. We never sell personal data.</p>
      </div>
    `:r==="terms"?i.innerHTML=`
      <div class="modal-header-centered">
        <div class="modal-icon-circle">
          <span class="material-symbols-outlined icon-filled-lg" aria-hidden="true">gavel</span>
        </div>
        <h2 class="modal-heading" id="info-modal-title">Terms of Service</h2>
        <p class="modal-subheading">Marketplace rules for drivers and parking hosts</p>
      </div>
      <div class="legal-prose-box">
        <p><strong>1. Reservation Guarantee:</strong> All parking spaces listed on Parkora are verified by physical inspection. Drivers must park strictly within the designated bay shown on their pass.</p>
        <p><strong>2. Host Payouts &amp; SLA:</strong> Parking hosts receive monthly payouts on the 1st of every month via direct bank transfer or UPI and must maintain unobstructed access during active bookings.</p>
        <p><strong>3. Cancellations &amp; Refunds:</strong> Cancellations made before pass expiration receive an instant 100% refund to your Parkora Wallet.</p>
      </div>
    `:r==="cookies"?i.innerHTML=`
      <div class="modal-header-centered">
        <div class="modal-icon-circle">
          <span class="material-symbols-outlined icon-filled-lg" aria-hidden="true">cookie</span>
        </div>
        <h2 class="modal-heading" id="info-modal-title">Cookie &amp; Storage Policy</h2>
        <p class="modal-subheading">Local storage usage for seamless experience</p>
      </div>
      <div class="legal-prose-box">
        <p><strong>1. Essential Storage Only:</strong> Parkora uses browser <code>localStorage</code> and <code>sessionStorage</code> strictly to keep you signed in, remember your active passes, and persist wallet balances.</p>
        <p><strong>2. Zero Ad Trackers:</strong> We do not load third-party advertising cookies or cross-site tracking pixels.</p>
      </div>
    `:i.innerHTML=`
      <div class="modal-header-centered">
        <div class="modal-icon-circle">
          <span class="material-symbols-outlined icon-filled-lg" aria-hidden="true">balance</span>
        </div>
        <h2 class="modal-heading" id="info-modal-title">Legal Notice</h2>
        <p class="modal-subheading">Corporate &amp; regulatory compliance disclosure</p>
      </div>
      <div class="legal-prose-box">
        <p><strong>Operator:</strong> Parkora Urban Mobility Systems Pvt. Ltd., registered in Bengaluru, Karnataka, India.</p>
        <p><strong>Support &amp; Grievance Officer:</strong> Reach our 24/7 commuter desk at <code>support@parkora.com</code> for immediate pass or gate assistance.</p>
      </div>
    `,ut(t)}function Mo(r){const t=r.querySelector("#info-modal-close-btn");t&&(t.onclick=()=>vt(r))}document.addEventListener("DOMContentLoaded",()=>{const r=document.getElementById("app");if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches){let b=function(M){w.raf(M),requestAnimationFrame(b)};var C=b;const w=new ba({duration:1.05,smoothWheel:!0});requestAnimationFrame(b)}const e=new URLSearchParams(window.location.search);let i=e.get("cat")||"all",s=e.get("q")||"",a=e.get("sort")||"recommended",n=e.get("view")==="map"?"map":"grid",o=null;function c(){const w=new URLSearchParams;i&&i!=="all"&&w.set("cat",i),s&&w.set("q",s),a&&a!=="recommended"&&w.set("sort",a),n&&n!=="grid"&&w.set("view",n);const b=w.toString(),M=`${window.location.pathname}${b?`?${b}`:""}${window.location.hash}`;window.history.replaceState(null,"",M)}function l(){r.innerHTML=`
      <div id="header-root">${Ds()}</div>
      <main class="main-wrapper" id="main-content">
        <div id="hero-root">${qs()}</div>
        
        <section class="search-grid-section" id="search-grid-section" aria-label="Parking Spot Search Results">
          <div class="results-toolbar">
            <div class="results-summary-group">
              <p class="results-summary-text" id="search-results-summary" aria-live="polite">
                Showing verified parking spots
              </p>
              <button type="button" class="clear-filters-btn hidden" id="clear-filters-btn">
                Reset Filters
              </button>
            </div>

            <div class="results-controls-group">
              <div class="sort-control-wrap">
                <label for="sort-spots-select" class="sr-only">Sort spots by</label>
                <select id="sort-spots-select" class="select-compact input-focus-ring">
                  <option value="recommended" ${a==="recommended"?"selected":""}>Sort: Recommended</option>
                  <option value="price-asc" ${a==="price-asc"?"selected":""}>Price: Low to High</option>
                  <option value="price-desc" ${a==="price-desc"?"selected":""}>Price: High to Low</option>
                  <option value="rating-desc" ${a==="rating-desc"?"selected":""}>Highest Rated</option>
                </select>
              </div>

              <div class="view-toggle-pill" role="group" aria-label="Toggle between grid and map view">
                <button type="button" class="view-toggle-btn ${n==="grid"?"active":""}" data-view="grid" aria-pressed="${n==="grid"}">
                  <span class="material-symbols-outlined icon-sm" aria-hidden="true">grid_view</span>
                  <span>Grid</span>
                </button>
                <button type="button" class="view-toggle-btn ${n==="map"?"active":""}" data-view="map" aria-pressed="${n==="map"}">
                  <span class="material-symbols-outlined icon-sm" aria-hidden="true">map</span>
                  <span>Map</span>
                </button>
              </div>
            </div>
          </div>

          <div id="spots-results-mount">
            <!-- Dynamically renders Grid or Interactive Map -->
          </div>
        </section>

        <div id="host-section-root">${Fs()}</div>
      </main>
      
      <footer class="site-footer">
        <div class="footer-brand-col">
          <div class="footer-logo">
            <span class="material-symbols-outlined icon-filled" aria-hidden="true">local_parking</span>
            <span>Parkora</span>
          </div>
          <p class="footer-tagline">Urban Utility smart parking near metro corridors &amp; workplaces.</p>
        </div>
        <div class="footer-links">
          <a href="#privacy" class="footer-link" data-info="privacy">Privacy Policy</a>
          <a href="#terms" class="footer-link" data-info="terms">Terms of Service</a>
          <a href="#cookies" class="footer-link" data-info="cookies">Cookie Policy</a>
          <a href="#legal" class="footer-link" data-info="legal">Legal Notice</a>
        </div>
        <div class="footer-copyright">© 2026 Parkora. All rights reserved.</div>
      </footer>

      <!-- Modals Layer -->
      ${vo()}
      ${ho()}
      ${fo()}
      ${bo()}
      ${wo()}
      ${ko()}
      ${xo()}
    `,qa(),v(),d()}l(),ao(),window.addEventListener("parkora-auth-change",d),window.addEventListener("parkora-data-change",d);function d(){const w=document.getElementById("header-root");w&&(w.innerHTML=Ds(),h());const b=document.getElementById("hero-root");if(b){b.innerHTML=qs(),b.querySelectorAll(".tab-pill").forEach(Y=>{const et=Y.dataset.category===i;Y.classList.toggle("active",et),Y.setAttribute("aria-selected",et?"true":"false")});const U=b.querySelector("#hero-search-input");U&&s&&(U.value=s),g()}const M=document.getElementById("host-section-root");M&&(M.innerHTML=Fs(),T()),p();const A=r.querySelector("#wallet-modal");A&&A.classList.contains("active")&&cs(A);const P=r.querySelector("#my-bookings-modal");P&&P.classList.contains("active")&&Me(P);const L=r.querySelector("#owner-dashboard-modal");L&&L.classList.contains("active")&&he(L);const H=r.querySelector("#admin-dashboard-modal");H&&H.classList.contains("active")&&Ce(H)}function u(){return yt.filter(b=>{const M=i==="all"||(i==="covered"?!!b.covered:i==="ev"?b.category==="ev"||!!b.evCharging:i==="car"?b.vehicleType==="car"||b.vehicleType==="all":i==="bike"?b.vehicleType==="bike"||b.vehicleType==="all":b.category===i),A=s.toLowerCase(),P=!A||b.title.toLowerCase().includes(A)||b.address.toLowerCase().includes(A)||b.city&&b.city.toLowerCase().includes(A)||b.distanceMetro&&b.distanceMetro.toLowerCase().includes(A);return M&&P}).sort((b,M)=>a==="price-asc"?b.rateHourly-M.rateHourly:a==="price-desc"?M.rateHourly-b.rateHourly:a==="rating-desc"?M.rating-b.rating:0)}function p(){var P;const w=r.querySelector("#spots-results-mount"),b=r.querySelector("#search-results-summary"),M=r.querySelector("#clear-filters-btn");if(!w)return;const A=u();if(c(),b&&(b.textContent=`Showing ${A.length} verified spot${A.length!==1?"s":""}${s?` for "${s}"`:""}`),M){const L=i!=="all"||!!s||a!=="recommended";M.classList.toggle("hidden",!L)}if(n==="map"){(!o||!A.some(L=>L.id===o))&&(o=((P=A[0])==null?void 0:P.id)||null),w.innerHTML=co(A,o),S(),k();return}if(A.length===0){w.innerHTML=`
        <div class="empty-state-box">
          <span class="material-symbols-outlined empty-state-icon" aria-hidden="true">search_off</span>
          <h3 class="empty-state-title">No spots found</h3>
          <p class="empty-state-desc">Try adjusting your search query or resetting category filters.</p>
          <button type="button" class="btn-secondary btn-sm" id="empty-reset-btn">Show All Spots</button>
        </div>
      `;const L=w.querySelector("#empty-reset-btn");L&&(L.onclick=m)}else w.innerHTML=`
        <div class="spots-grid-container" id="spots-grid">
          ${A.map(lo).join("")}
        </div>
      `;k()}function m(){i="all",s="",a="recommended";const w=r.querySelector("#sort-spots-select");w&&(w.value="recommended"),d()}function v(){h(),g(),_(),T(),k(),E(),x()}function h(){const w=r.querySelector("#nav-login-btn"),b=r.querySelector("#login-modal"),M=r.querySelector("#nav-my-bookings-btn"),A=r.querySelector("#my-bookings-modal"),P=r.querySelector("#nav-owner-dashboard-btn"),L=r.querySelector("#owner-dashboard-modal"),H=r.querySelector("#nav-admin-dashboard-btn"),W=r.querySelector("#admin-dashboard-modal"),U=r.querySelector("#nav-logout-btn"),Y=r.querySelector("#nav-host-btn"),et=r.querySelector("#nav-wallet-topup-btn"),ft=r.querySelector("#info-modal"),y=r.querySelector("#mobile-menu-toggle-btn"),f=r.querySelector("#mobile-nav-drawer"),O=r.querySelector("#mobile-menu-icon"),B=()=>{!f||!y||(f.classList.remove("open"),f.setAttribute("aria-hidden","true"),y.setAttribute("aria-expanded","false"),O&&(O.textContent="menu"))};y&&f&&(y.onclick=()=>{const X=f.classList.toggle("open");f.setAttribute("aria-hidden",X?"false":"true"),y.setAttribute("aria-expanded",X?"true":"false"),O&&(O.textContent=X?"close":"menu")});const $=r.querySelector("#wallet-modal");et&&$&&(et.onclick=()=>{Ni($)}),w&&b&&(w.onclick=()=>ut(b)),M&&A&&(M.onclick=()=>{Me(A),ut(A)}),P&&L&&(P.onclick=()=>{he(L),ut(L)}),H&&W&&(H.onclick=()=>{Ce(W),ut(W)});const D=()=>{const X=Tt();X&&X.role==="owner"?(he(L),ut(L)):ut(b)};Y&&(Y.onclick=D),U&&(U.onclick=()=>{gs(),ht("Signed out of your Parkora session.","info")});const N=r.querySelector("#mobile-wallet-btn"),I=r.querySelector("#mobile-login-btn"),F=r.querySelector("#mobile-host-btn"),G=r.querySelector("#mobile-my-bookings-btn"),J=r.querySelector("#mobile-owner-dashboard-btn"),j=r.querySelector("#mobile-admin-dashboard-btn"),Z=r.querySelector("#mobile-logout-btn");N&&$&&(N.onclick=()=>{B(),Ni($)}),I&&(I.onclick=()=>{B(),ut(b)}),F&&(F.onclick=()=>{B(),D()}),G&&(G.onclick=()=>{B(),Me(A),ut(A)}),J&&(J.onclick=()=>{B(),he(L),ut(L)}),j&&(j.onclick=()=>{B(),Ce(W),ut(W)}),Z&&(Z.onclick=()=>{B(),gs(),ht("Signed out of your Parkora session.","info")});const ot=X=>{var bt;s=X,d(),(bt=r.querySelector("#search-grid-section"))==null||bt.scrollIntoView({behavior:"smooth"})},z=r.querySelector("#nav-link-find"),dt=r.querySelector("#nav-link-solutions"),_t=r.querySelector("#nav-link-locations"),wt=r.querySelector("#nav-link-pricing");z&&(z.onclick=X=>{var bt;X.preventDefault(),(bt=r.querySelector("#search-grid-section"))==null||bt.scrollIntoView({behavior:"smooth"})}),dt&&(dt.onclick=X=>{X.preventDefault(),de("solutions",ft)}),_t&&(_t.onclick=X=>{X.preventDefault(),de("locations",ft,ot)}),wt&&(wt.onclick=X=>{X.preventDefault(),de("pricing",ft)}),r.querySelectorAll("[data-mobile-nav]").forEach(X=>{X.onclick=bt=>{var Qe;bt.preventDefault(),B();const St=X.dataset.mobileNav;St==="find"?(Qe=r.querySelector("#search-grid-section"))==null||Qe.scrollIntoView({behavior:"smooth"}):St==="locations"?de("locations",ft,ot):de(St,ft)}})}function g(){const w=r.querySelectorAll(".tab-pill"),b=r.querySelector("#hero-search-input"),M=r.querySelector("#search-btn"),A=r.querySelectorAll(".quick-search-chip");w.forEach(P=>{P.addEventListener("click",()=>{w.forEach(L=>{L.classList.remove("active"),L.setAttribute("aria-selected","false")}),P.classList.add("active"),P.setAttribute("aria-selected","true"),i=P.dataset.category,p()})}),b&&(b.addEventListener("input",P=>{s=P.target.value.trim(),p()}),b.addEventListener("keydown",P=>{var L;P.key==="Enter"&&(P.preventDefault(),s=b.value.trim(),p(),(L=r.querySelector("#search-grid-section"))==null||L.scrollIntoView({behavior:"smooth"}))})),M&&M.addEventListener("click",()=>{var P;b&&(s=b.value.trim()),p(),(P=r.querySelector("#search-grid-section"))==null||P.scrollIntoView({behavior:"smooth"})}),A.forEach(P=>{P.addEventListener("click",()=>{const L=P.dataset.query||"";s=s===L?"":L,b&&(b.value=s),p()})})}function _(){const w=r.querySelector("#sort-spots-select"),b=r.querySelector("#clear-filters-btn"),M=r.querySelectorAll(".view-toggle-btn");w&&(w.onchange=A=>{a=A.target.value,p()}),b&&(b.onclick=m),M.forEach(A=>{A.onclick=()=>{n=A.dataset.view==="map"?"map":"grid",M.forEach(P=>{const L=P.dataset.view===n;P.classList.toggle("active",L),P.setAttribute("aria-pressed",L?"true":"false")}),p()}})}function S(){r.querySelectorAll(".urban-map-pin").forEach(b=>{b.onclick=()=>{o=b.dataset.spotId,p()}})}function T(){const w=r.querySelector("#list-space-btn"),b=r.querySelector("#learn-host-btn"),M=r.querySelector("#login-modal"),A=r.querySelector("#owner-dashboard-modal"),P=r.querySelector("#info-modal"),L=r.querySelector("#host-hours-slider"),H=r.querySelector("#host-hours-val"),W=r.querySelector("#host-calc-income-display");w&&(w.onclick=()=>{const U=Tt();U&&U.role==="owner"?(he(A),ut(A)):ut(M)}),b&&(b.onclick=()=>{de("solutions",P)}),L&&H&&W&&(L.oninput=U=>{const Y=Number(U.target.value),et=45,ft=Y*et*26;H.textContent=`${Y} hrs/day @ ₹${et}/hr`,W.innerHTML=`₹${ft.toLocaleString()}<small>/mo</small>`})}function x(){const w=r.querySelector("#info-modal");r.querySelectorAll(".footer-link").forEach(b=>{b.onclick=M=>{M.preventDefault();const A=b.dataset.info||"legal";de(A,w)}})}function k(){const w=r.querySelector("#booking-modal");w&&(r.querySelectorAll(".book-btn").forEach(b=>{b.onclick=M=>{if(M.stopPropagation(),b.disabled)return;const A=b.dataset.id,P=yt.find(L=>L.id===A);P&&P.availableSlots>0&&P.active&&Ze(P,w)}}),r.querySelectorAll(".urban-spot-card").forEach(b=>{b.onclick=()=>{const M=b.dataset.id,A=yt.find(P=>P.id===M);A&&A.availableSlots>0&&A.active&&Ze(A,w)},b.onkeydown=M=>{if(M.key==="Enter"||M.key===" "){M.preventDefault();const A=b.dataset.id,P=yt.find(L=>L.id===A);P&&P.availableSlots>0&&P.active&&Ze(P,w)}}}))}function E(){const w=r.querySelector("#login-modal"),b=r.querySelector("#booking-modal"),M=r.querySelector("#my-bookings-modal"),A=r.querySelector("#owner-dashboard-modal"),P=r.querySelector("#admin-dashboard-modal"),L=r.querySelector("#info-modal"),H=r.querySelector("#wallet-modal");if(w&&go(w),H&&po(H),b&&mo(b),M){const W=M.querySelector("#my-bookings-close-btn");W&&(W.onclick=()=>vt(M))}A&&So(A,p),P&&To(P),L&&Mo(L)}window.addEventListener("parkora-pending-booking",w=>{var P;const b=(P=w.detail)==null?void 0:P.spotId,M=yt.find(L=>L.id===b),A=r.querySelector("#booking-modal");M&&A&&Ze(M,A)})});
