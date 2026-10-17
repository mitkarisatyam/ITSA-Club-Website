(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,78855,e=>{"use strict";var t=e.i(43476),r=e.i(71645),i=e.i(75056),n=e.i(10729),u=e.i(71949),o=e.i(25234),a=e.i(28600),l=e.i(90072),s=e.i(89970),d=e.i(49363),c=e.i(83004);let v=`
uniform float uBarrelStrength;
uniform float uBarrelScale;
uniform float uBarrelEdgeLift;
uniform float uMeshX;
uniform float uMeshWidth;
uniform float uViewportWidth;

varying vec2 vUv;

const float M_PI = 3.14159265;

// Global viewport pincushion on Y — continuous across all visible cards.
// Uses world X (not per-card UV) so the curve is one shared mask.
vec3 globalViewportBarrelY(vec3 pos) {
  float vertexWorldX = uMeshX + pos.x * uMeshWidth;
  float normalizedX = clamp(vertexWorldX / (uViewportWidth * 0.5), -1.0, 1.0);
  float distFromCenter = abs(normalizedX);

  // 1 at viewport center → max pinch, 0 at edges → no pinch
  float pinchAtX = cos(distFromCenter * M_PI * 0.5);
  float edgeAtX = 1.0 - pinchAtX;
  float s = uBarrelStrength * uBarrelScale;

  // Inward curve: compress at center, lift at edges
  pos.y *= 1.0 - pinchAtX * s;
  pos.y *= 1.0 + edgeAtX * s * uBarrelEdgeLift;

  return pos;
}

void main() {
  vUv = uv;

  vec3 pos = globalViewportBarrelY(position);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`,f=`
uniform sampler2D uImageTexture;
uniform sampler2D uVideoTexture;
uniform sampler2D uDispTexture;
uniform sampler2D uDataTexture;
uniform vec4 uImageCover;
uniform vec4 uVideoCover;
uniform float uProgress;
uniform float uDispEffectFactor;
uniform float uGridUvDistort;
uniform float uReveal;

varying vec2 vUv;

vec2 coverUv(vec2 uv, vec4 cover) {
  return uv * cover.xy + cover.zw;
}

vec2 distortCoverUv(vec2 uv, vec4 cover) {
  vec2 baseUv = coverUv(uv, cover);
  vec4 gridOffset = texture2D(uDataTexture, uv);
  return baseUv - uGridUvDistort * gridOffset.rg;
}

void main() {
  // Reveal de entrada: las cards aparecen con displacement (UV desplazada)
  // y alpha 0 -> 1. uReveal = 0 (oculta) -> 1 (visible / estado final).
  vec4 disp = texture2D(uDispTexture, vUv);
  float dispVal = disp.r * uDispEffectFactor;
  float revealDisp = (1.0 - uReveal) * dispVal;

  vec2 imgUv = distortCoverUv(vUv, uImageCover);
  vec2 videoUv = distortCoverUv(vUv, uVideoCover);
  imgUv.x += revealDisp;
  videoUv.x += revealDisp;

  vec4 color;
  if (uProgress >= 0.999) {
    color = texture2D(uVideoTexture, videoUv);
  } else if (uProgress <= 0.001) {
    color = texture2D(uImageTexture, imgUv);
  } else {
    vec2 distortedImg = vec2(imgUv.x + uProgress * dispVal, imgUv.y);
    vec2 distortedVideo = vec2(
      videoUv.x - (1.0 - uProgress) * dispVal,
      videoUv.y
    );

    vec4 imgColor = texture2D(uImageTexture, distortedImg);
    vec4 videoColor = texture2D(uVideoTexture, distortedVideo);

    color = mix(imgColor, videoColor, uProgress);
  }

  color.a *= uReveal;
  gl_FragColor = color;
}
`;var h=e.i(57807);function m(e){return e instanceof Element&&null!==e.closest("[data-carousel-ignore]")}var E=e.i(22461);function S(e,t,r){if(e<=0||t<=0)return{scale:[1,1],offset:[0,0]};let i=e/t;if(i>r){let e=r/i;return{scale:[e,1],offset:[(1-e)*.5,0]}}let n=i/r;return{scale:[1,n],offset:[0,(1-n)*.5]}}function C({scale:e,offset:t}){return[e[0],e[1],t[0],t[1]]}var T=e.i(64051);function p(e){let t=document.createElement("video");return t.src=e,t.loop=!0,t.muted=!0,t.playsInline=!0,t.preload="metadata",t.crossOrigin="anonymous",t}function I(e,t){let r=t.image,i=S(r.width,r.height,d.CAROUSEL_CONFIG.SLIDE_ASPECT_RATIO);e.value.fromArray(C(i))}function g(e){let t=e.videoElement;if(!t)return;let r=()=>{let r;return r=S(t.videoWidth,t.videoHeight,d.CAROUSEL_CONFIG.SLIDE_ASPECT_RATIO),void e.uniforms.uVideoCover.value.fromArray(C(r))};return t.addEventListener("loadedmetadata",r),t.readyState>=HTMLMediaElement.HAVE_METADATA&&r(),()=>t.removeEventListener("loadedmetadata",r)}function L(e,t,r){if(e.unbindVideoCover?.(),e.hoverType=t.hoverType,"video"===t.hoverType){e.videoElement||(e.videoElement=p(""),e.videoTexture=new l.VideoTexture(e.videoElement),e.videoTexture.minFilter=l.LinearFilter,e.videoTexture.magFilter=l.LinearFilter,e.videoTexture.format=l.RGBAFormat,e.uniforms.uVideoTexture.value=e.videoTexture),e.videoElement.src=t.hoverTexture,e.unbindVideoCover=g(e);return}e.videoElement&&(e.videoElement.pause(),e.videoElement.src="");let i=r.get(t.id);i&&(e.uniforms.uVideoTexture.value=i,e.videoTexture=i,I(e.uniforms.uVideoCover,i))}var O=e.i(75739),R=e.i(96799);function _(e,t,r){let{width:i,height:n}=function(e,t,r){let{SLIDE_ASPECT_RATIO:i,SLIDE_MAX_VW:n,SLIDE_MAX_VH:u,BREAKPOINT_TABLET:o,BREAKPOINT_MOBILE:a,SLIDE_TABLET_VW:l,SLIDE_MOBILE_VW:s}=d.CAROUSEL_CONFIG,c=2*Math.tan(e.fov*Math.PI/180/2)*e.position.z,v=t/r*c;if(t<a){let e=v*s;return{width:e,height:e/i}}if(t<o){let e=v*l;return{width:e,height:e/i}}let f=v*n,h=c*u,m=h*i;return m>f&&(h=(m=f)/i),{width:m,height:h}}(e,t,r),u=i*d.CAROUSEL_CONFIG.SLIDE_GAP_RATIO;return{width:i,height:n,gap:u,stride:i+u}}function x(e,t){let r=t.image,i=S(r.width,r.height,d.CAROUSEL_CONFIG.SLIDE_ASPECT_RATIO);e.uniforms.uImageCover.value.fromArray(C(i))}function A(e){s.default.killTweensOf(e.uniforms.uProgress),e.uniforms.uProgress.value=0,e.isShowingHover=!1,e.videoElement?.pause()}function w({isTablet:e}){let t,i,{camera:n,size:u,scene:S,gl:C}=(0,a.useThree)(),D=(0,E.useCarouselStore)(e=>e.requestSlideSelection),U=(0,E.useCarouselStore)(e=>e.setCenteredSlideId),F=(0,E.useCarouselStore)(e=>e.currentSlideId),N=(0,E.useCarouselStore)(e=>e.pendingSlideId),G=(0,r.useRef)([]),V=(0,r.useRef)(new Map),M=(0,r.useRef)(new Map),b=(0,r.useRef)(null),y=(0,r.useRef)({width:1,height:1,gap:.04,stride:1.04}),P=(0,r.useRef)(new l.Raycaster),X=(0,r.useRef)(new l.Vector2),B=(0,r.useRef)(0),Y=(0,r.useRef)(0),H=(0,r.useRef)(0),W=(0,r.useRef)(0),k=(0,r.useRef)(null),j=(0,r.useRef)(!1),z=(0,r.useRef)(!1),K=(0,r.useRef)(null),q=(0,r.useRef)(!1),J=(0,r.useRef)(!1),Q=(0,r.useRef)(null),Z=(0,r.useRef)(F),$=(0,r.useRef)(N),ee=(0,r.useRef)(e);(0,r.useEffect)(()=>{Z.current=F},[F]),(0,r.useEffect)(()=>{$.current=N},[N]),(0,r.useEffect)(()=>{ee.current=e},[e]);let et=(0,r.useCallback)(()=>{if(J.current)return;let e=G.current;if(e.length){var t;J.current=!0,Q.current&&(clearTimeout(Q.current),Q.current=null),t=y.current.stride,e.forEach(e=>{let r=t<=0?0:Math.round(Math.abs(e.mesh.position.x)/t);s.default.killTweensOf(e.uniforms.uReveal),e.uniforms.uReveal.value=0,s.default.to(e.uniforms.uReveal,{value:1,duration:d.CAROUSEL_CONFIG.ENTRY_REVEAL_DURATION,ease:d.CAROUSEL_CONFIG.ENTRY_REVEAL_EASE,delay:d.CAROUSEL_CONFIG.ENTRY_REVEAL_DELAY+r*d.CAROUSEL_CONFIG.ENTRY_REVEAL_STAGGER})})}},[]),er=(0,r.useCallback)(()=>{if(J.current)return;let e=G.current;e.length&&b.current&&e.every(e=>V.current.has(c.SLIDES[e.dataIndex].id))&&et()},[et]),ei=(0,r.useRef)(et),en=(0,r.useRef)(er);(0,r.useEffect)(()=>{ei.current=et,en.current=er},[et,er]),(0,r.useEffect)(()=>{var e,t;let r,i=new l.TextureLoader;i.crossOrigin="anonymous",c.SLIDES.forEach(e=>{i.load(e.imageUrl,t=>{t.minFilter=l.LinearFilter,t.magFilter=l.LinearFilter,t.needsUpdate=!0,V.current.set(e.id,t),G.current.forEach(r=>{c.SLIDES[r.dataIndex].id===e.id&&(r.uniforms.uImageTexture.value=t,x(r,t))}),en.current()})}),e=c.SLIDES,t=M.current,(r=new l.TextureLoader).crossOrigin="anonymous",e.forEach(e=>{"image"===e.hoverType&&r.load(e.hoverTexture,r=>{r.minFilter=l.LinearFilter,r.magFilter=l.LinearFilter,r.needsUpdate=!0,t.set(e.id,r),((e,t)=>{G.current.forEach(r=>{c.SLIDES[r.dataIndex].id===e&&"image"===r.hoverType&&(r.uniforms.uVideoTexture.value=t,r.videoTexture=t,I(r.uniforms.uVideoCover,t))})})(e.id,r)})}),i.load(d.CAROUSEL_CONFIG.DISPLACEMENT_TEXTURE_URL,e=>{e.wrapS=l.RepeatWrapping,e.wrapT=l.RepeatWrapping,e.minFilter=l.LinearFilter,e.magFilter=l.LinearFilter,e.needsUpdate=!0,b.current=e,G.current.forEach(t=>{t.uniforms.uDispTexture.value=e}),en.current()})},[]);let eu=(0,r.useCallback)((e,t)=>{let r=_(n,e,t),i=G.current,u=y.current.stride,o=i.length&&u>0?r.stride/u:1;i.length&&1!==o&&(B.current*=o,i.forEach(e=>{e.baseOffsetX*=o})),i.forEach(e=>{e.mesh.scale.set(r.width,r.height,1),e.uniforms.uMeshWidth.value=r.width}),y.current=r},[n]);function eo(e,t){e.dataIndex=(e.dataIndex+t+c.SLIDES.length)%c.SLIDES.length;let r=c.SLIDES[e.dataIndex];e.mesh.userData.slideId=r.id;let i=V.current.get(r.id);i&&(e.uniforms.uImageTexture.value=i,x(e,i)),A(e),L(e,r,M.current)}(0,r.useEffect)(()=>{let e=_(n,u.width,u.height);y.current=e;let{width:t,height:r,stride:i}=e,o=Math.floor(d.CAROUSEL_CONFIG.VISIBLE_SLIDES/2),a=new l.PlaneGeometry(1,1,d.CAROUSEL_CONFIG.PLANE_SEGMENTS_X,d.CAROUSEL_CONFIG.PLANE_SEGMENTS_Y),h=[];for(let e=0;e<d.CAROUSEL_CONFIG.VISIBLE_SLIDES;e++){let n=((e-o)%c.SLIDES.length+c.SLIDES.length)%c.SLIDES.length,u=c.SLIDES[n],s=function(e,t){if("video"===e.hoverType){let t=p(e.hoverTexture),r=new l.VideoTexture(t);r.minFilter=l.LinearFilter,r.magFilter=l.LinearFilter,r.format=l.RGBAFormat;let i={uniforms:{uVideoTexture:{value:r},uVideoCover:{value:new l.Vector4(1,1,0,0)}},videoElement:t,videoTexture:r,hoverType:e.hoverType};return i.unbindVideoCover=g(i),i}let r=t.get(e.id)??new l.Texture,i={uniforms:{uVideoTexture:{value:r},uVideoCover:{value:new l.Vector4(1,1,0,0)}},videoElement:null,videoTexture:r,hoverType:e.hoverType};return t.has(e.id)&&I(i.uniforms.uVideoCover,r),i}(u,M.current),m=(0,O.createGridDataTexture)(),E=(0,O.createGridMouseState)(),C=new l.Texture,T=new l.Vector4(1,1,0,0),L={uImageTexture:{value:V.current.get(u.id)??C},uVideoTexture:s.uniforms.uVideoTexture,uImageCover:{value:T.clone()},uVideoCover:s.uniforms.uVideoCover,uProgress:{value:0},uBarrelStrength:{value:0},uBarrelScale:{value:d.CAROUSEL_CONFIG.BARREL_SCALE},uBarrelEdgeLift:{value:d.CAROUSEL_CONFIG.BARREL_EDGE_LIFT},uMeshX:{value:0},uMeshWidth:{value:t},uViewportWidth:{value:1},uDispTexture:{value:b.current??new l.Texture},uDispEffectFactor:{value:d.CAROUSEL_CONFIG.TRANSITION_DISPLACEMENT_EFFECT},uDataTexture:{value:m},uGridUvDistort:{value:d.CAROUSEL_CONFIG.GRID_UV_DISTORT},uReveal:{value:0}},R=new l.ShaderMaterial({vertexShader:v,fragmentShader:f,uniforms:L,side:l.FrontSide,transparent:!0}),_=new l.Mesh(a,R);_.frustumCulled=!1,_.userData.slideId=u.id;let A=(e-o)*i;_.position.x=A,_.scale.set(t,r,1),S.add(_);let w={mesh:_,material:R,uniforms:L,dataTexture:m,mouseState:E,baseOffsetX:A,dataIndex:n,videoElement:s.videoElement,videoTexture:s.videoTexture,hoverType:s.hoverType,unbindVideoCover:s.unbindVideoCover,isShowingHover:!1};h.push(w);let D=V.current.get(u.id);D&&x(w,D)}G.current=h;let m=E.useCarouselStore.getState().pendingSlideId;if(m){let e=function(e,t,r,i,n,u){let o=c.SLIDES.findIndex(e=>e.id===t);if(o<0)return -1;let a=Math.floor(d.CAROUSEL_CONFIG.VISIBLE_SLIDES/2);for(let t=0;t<e.length;t++){let l=((o+(t-a))%c.SLIDES.length+c.SLIDES.length)%c.SLIDES.length,s=e[t];s.dataIndex=l;let d=c.SLIDES[l];s.mesh.userData.slideId=d.id;let v=r.get(d.id);v&&(s.uniforms.uImageTexture.value=v,n(s,v)),u(s),L(s,d,i)}return a}(h,m,V.current,M.current,x,A);e>=0&&(B.current=0,Y.current=0,k.current=h[e],K.current=m,q.current=!0,U(m))}return h.forEach(e=>{s.default.killTweensOf(e.uniforms.uReveal),e.uniforms.uReveal.value=0}),J.current=!1,en.current(),Q.current=setTimeout(()=>{ei.current()},d.CAROUSEL_CONFIG.ENTRY_REVEAL_MAX_WAIT_MS),()=>{Q.current&&(clearTimeout(Q.current),Q.current=null),a.dispose(),h.forEach(e=>{s.default.killTweensOf(e.uniforms.uReveal),e.unbindVideoCover?.(),e.dataTexture.dispose(),S.remove(e.mesh),e.material.dispose(),"video"===e.hoverType&&(e.videoTexture.dispose(),e.videoElement&&(e.videoElement.pause(),e.videoElement.src=""))}),V.current.forEach(e=>e.dispose()),V.current.clear(),M.current.forEach(e=>e.dispose()),M.current.clear(),b.current?.dispose(),b.current=null}},[]),(0,r.useEffect)(()=>{eu(u.width,u.height)},[u.width,u.height,eu]),!function({onVelocity:e,onValidClick:t}){(0,r.useEffect)(()=>{if(navigator.maxTouchPoints>0){let r=0,i=0,n=0,u=0,o=0,a=!1,l=e=>{u=r=e.touches[0].clientX,o=e.touches[0].clientY,i=performance.now(),n=0,a=!1},s=t=>{let l=t.touches[0].clientX,s=t.touches[0].clientY,c=Math.max(performance.now()-i,1);n=(l-r)/c*d.CAROUSEL_CONFIG.TOUCH_DRAG_SPEED*16*d.CAROUSEL_CONFIG.TOUCH_DRAG_DIRECTION,r=l,i=performance.now();let v=Math.abs(s-o);(Math.abs(l-u)>d.CAROUSEL_CONFIG.CLICK_DRAG_THRESHOLD||v>d.CAROUSEL_CONFIG.CLICK_DRAG_THRESHOLD)&&(a=!0),e(n)},c=r=>{if(e(n*(d.CAROUSEL_CONFIG.TOUCH_MOMENTUM_SPEED/d.CAROUSEL_CONFIG.TOUCH_DRAG_SPEED)),!a&&r.changedTouches[0]&&!m(r.target)){let e=r.changedTouches[0];t({clientX:e.clientX,clientY:e.clientY})}};return window.addEventListener("touchstart",l,{passive:!0}),window.addEventListener("touchmove",s,{passive:!0}),window.addEventListener("touchend",c),()=>{window.removeEventListener("touchstart",l),window.removeEventListener("touchmove",s),window.removeEventListener("touchend",c)}}{let r=0,i=0,n=!1,u=e=>{r=e.clientX,i=e.clientY,n=!1},o=e=>{let t=Math.abs(e.clientX-r),u=Math.abs(e.clientY-i);(t>d.CAROUSEL_CONFIG.CLICK_DRAG_THRESHOLD||u>d.CAROUSEL_CONFIG.CLICK_DRAG_THRESHOLD)&&(n=!0)},a=e=>{n||m(e.target)||t({clientX:e.clientX,clientY:e.clientY})};window.addEventListener("pointerdown",u),window.addEventListener("pointermove",o),window.addEventListener("pointerup",a);let l=(0,h.subscribeWheel)(t=>{m(t.target)||e(-(Math.abs(t.deltaY)>Math.abs(t.deltaX)?t.deltaY:t.deltaX)*d.CAROUSEL_CONFIG.SCROLL_SPEED)});return()=>{window.removeEventListener("pointerdown",u),window.removeEventListener("pointermove",o),window.removeEventListener("pointerup",a),l()}}},[e,t])}({onVelocity:(0,r.useCallback)(e=>{Math.abs(e)>0&&(k.current=null,j.current=!1,z.current=!0),W.current+=e},[]),onValidClick:(0,r.useCallback)(e=>{let t=G.current;if(!t.length)return;let r=C.domElement.getBoundingClientRect();X.current.x=(e.clientX-r.left)/r.width*2-1,X.current.y=-(2*((e.clientY-r.top)/r.height))+1,P.current.setFromCamera(X.current,n);let i=P.current.intersectObjects(t.map(e=>e.mesh));if(!i.length)return;let u=t.find(e=>e.mesh===i[0].object);if(!u)return;let o=c.SLIDES[u.dataIndex].id;k.current=u,j.current=(void 0)??!1,U(c.SLIDES[u.dataIndex].id),D(Z.current===o&&void 0===$.current?null:o)},[C,n,D])});let ea=(t=(0,r.useRef)(new l.Raycaster),i=(0,r.useRef)(new l.Vector2),(0,r.useEffect)(()=>{let e=e=>{let r=G.current;if(!r.length)return;let u=C.domElement.getBoundingClientRect();i.current.x=(e.clientX-u.left)/u.width*2-1,i.current.y=-(2*((e.clientY-u.top)/u.height))+1,t.current.setFromCamera(i.current,n);let o=t.current.intersectObjects(r.map(e=>e.mesh));r.forEach(e=>(0,O.clearGridMouseVelocity)(e.mouseState));let a=R.useCursorStore.getState().setType;if(o.length>0&&o[0].uv){let e=r.find(e=>e.mesh===o[0].object);if(e){a("hover"),(0,O.updateGridMouseFromUv)(e.mouseState,o[0].uv.x,o[0].uv.y);return}}let l=document.elementFromPoint(e.clientX,e.clientY);l?.closest("[data-event]")||a("default")},r=()=>{R.useCursorStore.getState().setType("default")};return window.addEventListener("mousemove",e,{passive:!0}),document.documentElement.addEventListener("mouseleave",r),()=>{window.removeEventListener("mousemove",e),document.documentElement.removeEventListener("mouseleave",r)}},[G,C,n]),function(){G.current.forEach(e=>{(0,O.stepGridDistortion)(e.dataTexture,e.mouseState),e.uniforms.uDataTexture.value=e.dataTexture})});return(0,o.useFrame)((e,t)=>{var r,i;let o=G.current;if(!o.length)return;let a=Math.min(t,1/30),{width:l,stride:v}=y.current,f=d.CAROUSEL_CONFIG.VISIBLE_SLIDES*v,h=f/2,m=W.current;W.current=0;let E=Math.abs(m)>0,S=-(k.current??o.reduce((e,t)=>Math.abs(t.mesh.position.x)<Math.abs(e.mesh.position.x)?t:e)).baseOffsetX,C=function(e,{pendingVelocity:t,snapTarget:r,hadInput:i,dt:n}){var u,o;let{globalOffset:a,scrollVelocity:l}=e;if(l+=t,i)l*=Math.pow(d.CAROUSEL_CONFIG.SCROLL_DAMPING,60*n),a+=l*n*60;else{let e,t,i,s,c,v=60*l,f=(u=a,o=d.CAROUSEL_CONFIG.SNAP_SMOOTH_TIME,i=1/(1+(t=(e=2/Math.max(1e-4,o))*n)+.48*t*t+.235*t*t*t),c=(v+e*(s=u-r))*n,{value:r+(s+c)*i,velocity:(v-e*c)*i});a=f.value,l=f.velocity/60}return!i&&Math.abs(r-a)<d.CAROUSEL_CONFIG.SNAP_SETTLE_OFFSET&&Math.abs(l)<d.CAROUSEL_CONFIG.SNAP_SETTLE_VELOCITY&&(a=r,l=0),{globalOffset:a,scrollVelocity:l}}({globalOffset:B.current,scrollVelocity:Y.current},{pendingVelocity:m,snapTarget:S,hadInput:E,dt:a});if(B.current=C.globalOffset,Y.current=C.scrollVelocity,Math.abs(S-C.globalOffset)<d.CAROUSEL_CONFIG.SNAP_SETTLE_OFFSET&&Math.abs(C.scrollVelocity)<d.CAROUSEL_CONFIG.SNAP_SETTLE_VELOCITY){let e=k.current??o.reduce((e,t)=>Math.abs(t.mesh.position.x)<Math.abs(e.mesh.position.x)?t:e),t=c.SLIDES[e.dataIndex].id;j.current&&k.current&&ee.current?(D(t),j.current=!1,k.current=null):z.current&&ee.current&&(D(t),z.current=!1)}H.current=(0,T.stepCarouselBarrel)(H.current,Y.current,m,E,a);let p=2*Math.tan(n.fov*Math.PI/180/2)*n.position.z*(u.width/u.height);o.forEach(e=>{let t=e.baseOffsetX+B.current;t>h?(e.baseOffsetX-=f,t-=f,eo(e,1)):t<-h&&(e.baseOffsetX+=f,t+=f,eo(e,-1)),e.mesh.position.x=t,e.uniforms.uBarrelStrength.value=H.current,e.uniforms.uMeshX.value=t,e.uniforms.uMeshWidth.value=l,e.uniforms.uViewportWidth.value=p,e.isShowingHover&&"video"===e.hoverType&&(e.videoTexture.needsUpdate=!0)});let I=o.reduce((e,t)=>Math.abs(t.mesh.position.x)<Math.abs(e.mesh.position.x)?t:e),g=c.SLIDES[I.dataIndex].id,L=(r=Z.current,void 0!==(i=$.current)?i:r);if(o.forEach(e=>{let t=c.SLIDES[e.dataIndex].id,r=null!==L&&t===L&&e===I;!function(e,t){if(t&&!e.isShowingHover){e.isShowingHover=!0,s.default.killTweensOf(e.uniforms.uProgress),s.default.to(e.uniforms.uProgress,{value:1,duration:d.CAROUSEL_CONFIG.TRANSITION_DURATION,ease:d.CAROUSEL_CONFIG.TRANSITION_EASE,onStart:()=>{"video"===e.hoverType&&e.videoElement&&e.videoElement.play().catch(()=>{})},onComplete:()=>{e.uniforms.uProgress.value=1}});return}!t&&e.isShowingHover&&(e.isShowingHover=!1,s.default.killTweensOf(e.uniforms.uProgress),s.default.to(e.uniforms.uProgress,{value:0,duration:d.CAROUSEL_CONFIG.TRANSITION_DURATION,ease:d.CAROUSEL_CONFIG.TRANSITION_EASE,onComplete:()=>{e.uniforms.uProgress.value=0,"video"===e.hoverType&&e.videoElement&&e.videoElement.pause()}}))}(e,r)}),K.current!==g){let e=null!==k.current;!q.current||ee.current||e||null===Z.current&&void 0===$.current||D(null),K.current=g,q.current=!0,U(g)}ea()}),null}e.s(["default",0,function(){let e=(0,n.getGraphicsProfile)(),o=(0,u.default)((0,u.maxWidth)(u.bp.tabletLandscape));return(0,t.jsx)("div",{className:"fixed inset-0 w-full h-full",children:(0,t.jsx)(i.Canvas,{camera:{fov:50,near:.1,far:100,position:[0,0,5]},gl:{alpha:!0,antialias:!1,powerPreference:"high-performance"},dpr:Math.min(window.devicePixelRatio,e.dpr),frameloop:"always",style:{width:"100%",height:"100%"},children:(0,t.jsx)(r.Suspense,{fallback:null,children:(0,t.jsx)(w,{isTablet:o})})})})}],78855)},19749,e=>{e.n(e.i(78855))}]);