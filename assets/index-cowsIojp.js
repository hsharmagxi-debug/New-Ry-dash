(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function t(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(n){if(n.ep)return;n.ep=!0;const a=t(n);fetch(n.href,a)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const as="169",gl=2,ei=1,jn=2,cc=0,Dr=2,hc=1,uc=2,dc=3,ss=4,pc=6,fc=7,os=303,Vt=1e3,Wn=1016,Nr="",qt="srgb",Fr="srgb-linear",ls="display-p3",ea="display-p3-linear",$n="linear",dt="srgb",Yn="rec709",Kn="p3",As="300 es";let Di=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[e]===void 0&&(r[e]=[]),r[e].indexOf(t)===-1&&r[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const r=this._listeners;return r[e]!==void 0&&r[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const n=r.indexOf(t);n!==-1&&r.splice(n,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const t=this._listeners[e.type];if(t!==void 0){e.target=this;const r=t.slice(0);for(let n=0,a=r.length;n<a;n++)r[n].call(this,e);e.target=null}}};const kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Cs=1234567;const Ki=Math.PI/180,Ci=180/Math.PI;function fr(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(kt[i&255]+kt[i>>8&255]+kt[i>>16&255]+kt[i>>24&255]+"-"+kt[e&255]+kt[e>>8&255]+"-"+kt[e>>16&15|64]+kt[e>>24&255]+"-"+kt[t&63|128]+kt[t>>8&255]+"-"+kt[t>>16&255]+kt[t>>24&255]+kt[r&255]+kt[r>>8&255]+kt[r>>16&255]+kt[r>>24&255]).toLowerCase()}function Lt(i,e,t){return Math.max(e,Math.min(t,i))}function cs(i,e){return(i%e+e)%e}function mc(i,e,t,r,n){return r+(i-e)*(n-r)/(t-e)}function gc(i,e,t){return i!==e?(t-i)/(e-i):0}function Ji(i,e,t){return(1-t)*i+t*e}function vc(i,e,t,r){return Ji(i,e,1-Math.exp(-t*r))}function _c(i,e=1){return e-Math.abs(cs(i,e*2)-e)}function xc(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function yc(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Sc(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Mc(i,e){return i+Math.random()*(e-i)}function wc(i){return i*(.5-Math.random())}function bc(i){i!==void 0&&(Cs=i);let e=Cs+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Ec(i){return i*Ki}function Tc(i){return i*Ci}function Ac(i){return(i&i-1)===0&&i!==0}function Cc(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Rc(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Pc(i,e,t,r,n){const a=Math.cos,s=Math.sin,o=a(t/2),l=s(t/2),c=a((e+r)/2),h=s((e+r)/2),f=a((e-r)/2),u=s((e-r)/2),d=a((r-e)/2),g=s((r-e)/2);switch(n){case"XYX":i.set(o*h,l*f,l*u,o*c);break;case"YZY":i.set(l*u,o*h,l*f,o*c);break;case"ZXZ":i.set(l*f,l*u,o*h,o*c);break;case"XZX":i.set(o*h,l*g,l*d,o*c);break;case"YXY":i.set(l*d,o*h,l*g,o*c);break;case"ZYZ":i.set(l*g,l*d,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+n)}}function hr(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function lt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const bt={DEG2RAD:Ki,RAD2DEG:Ci,generateUUID:fr,clamp:Lt,euclideanModulo:cs,mapLinear:mc,inverseLerp:gc,lerp:Ji,damp:vc,pingpong:_c,smoothstep:xc,smootherstep:yc,randInt:Sc,randFloat:Mc,randFloatSpread:wc,seededRandom:bc,degToRad:Ec,radToDeg:Tc,isPowerOfTwo:Ac,ceilPowerOfTwo:Cc,floorPowerOfTwo:Rc,setQuaternionFromProperEuler:Pc,normalize:lt,denormalize:hr};class se{constructor(e=0,t=0){se.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,r=this.y,n=e.elements;return this.x=n[0]*t+n[3]*r+n[6],this.y=n[1]*t+n[4]*r+n[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(t,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const r=this.dot(e)/t;return Math.acos(Lt(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,r=this.y-e.y;return t*t+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const r=Math.cos(t),n=Math.sin(t),a=this.x-e.x,s=this.y-e.y;return this.x=a*r-s*n+e.x,this.y=a*n+s*r+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Qe{constructor(e,t,r,n,a,s,o,l,c){Qe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,r,n,a,s,o,l,c)}set(e,t,r,n,a,s,o,l,c){const h=this.elements;return h[0]=e,h[1]=n,h[2]=o,h[3]=t,h[4]=a,h[5]=l,h[6]=r,h[7]=s,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],this}extractBasis(e,t,r){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const r=e.elements,n=t.elements,a=this.elements,s=r[0],o=r[3],l=r[6],c=r[1],h=r[4],f=r[7],u=r[2],d=r[5],g=r[8],v=n[0],p=n[3],m=n[6],y=n[1],_=n[4],S=n[7],P=n[2],T=n[5],R=n[8];return a[0]=s*v+o*y+l*P,a[3]=s*p+o*_+l*T,a[6]=s*m+o*S+l*R,a[1]=c*v+h*y+f*P,a[4]=c*p+h*_+f*T,a[7]=c*m+h*S+f*R,a[2]=u*v+d*y+g*P,a[5]=u*p+d*_+g*T,a[8]=u*m+d*S+g*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],r=e[1],n=e[2],a=e[3],s=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*s*h-t*o*c-r*a*h+r*o*l+n*a*c-n*s*l}invert(){const e=this.elements,t=e[0],r=e[1],n=e[2],a=e[3],s=e[4],o=e[5],l=e[6],c=e[7],h=e[8],f=h*s-o*c,u=o*l-h*a,d=c*a-s*l,g=t*f+r*u+n*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=f*v,e[1]=(n*c-h*r)*v,e[2]=(o*r-n*s)*v,e[3]=u*v,e[4]=(h*t-n*l)*v,e[5]=(n*a-o*t)*v,e[6]=d*v,e[7]=(r*l-c*t)*v,e[8]=(s*t-r*a)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,r,n,a,s,o){const l=Math.cos(a),c=Math.sin(a);return this.set(r*l,r*c,-r*(l*s+c*o)+s+e,-n*c,n*l,-n*(-c*s+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(ca.makeScale(e,t)),this}rotate(e){return this.premultiply(ca.makeRotation(-e)),this}translate(e,t){return this.premultiply(ca.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,-r,0,r,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,r=e.elements;for(let n=0;n<9;n++)if(t[n]!==r[n])return!1;return!0}fromArray(e,t=0){for(let r=0;r<9;r++)this.elements[r]=e[r+t];return this}toArray(e=[],t=0){const r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ca=new Qe;function vl(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Jn(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Ic(){const i=Jn("canvas");return i.style.display="block",i}const Rs={};function Xn(i){i in Rs||(Rs[i]=!0,console.warn(i))}function Lc(i,e,t){return new Promise(function(r,n){function a(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:n();break;case i.TIMEOUT_EXPIRED:setTimeout(a,t);break;default:r()}}setTimeout(a,t)})}function Uc(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Nc(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Ps=new Qe().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Is=new Qe().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),ki={[Fr]:{transfer:$n,primaries:Yn,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i,fromReference:i=>i},[qt]:{transfer:dt,primaries:Yn,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[ea]:{transfer:$n,primaries:Kn,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.applyMatrix3(Is),fromReference:i=>i.applyMatrix3(Ps)},[ls]:{transfer:dt,primaries:Kn,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.convertSRGBToLinear().applyMatrix3(Is),fromReference:i=>i.applyMatrix3(Ps).convertLinearToSRGB()}},Dc=new Set([Fr,ea]),nt={enabled:!0,_workingColorSpace:Fr,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!Dc.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const r=ki[e].toReference,n=ki[t].fromReference;return n(r(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return ki[i].primaries},getTransfer:function(i){return i===Nr?$n:ki[i].transfer},getLuminanceCoefficients:function(i,e=this._workingColorSpace){return i.fromArray(ki[e].luminanceCoefficients)}};function Ti(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ha(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let ai,Oc=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ai===void 0&&(ai=Jn("canvas")),ai.width=e.width,ai.height=e.height;const r=ai.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),t=ai}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Jn("canvas");t.width=e.width,t.height=e.height;const r=t.getContext("2d");r.drawImage(e,0,0,e.width,e.height);const n=r.getImageData(0,0,e.width,e.height),a=n.data;for(let s=0;s<a.length;s++)a[s]=Ti(a[s]/255)*255;return r.putImageData(n,0,0),t}else if(e.data){const t=e.data.slice(0);for(let r=0;r<t.length;r++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[r]=Math.floor(Ti(t[r]/255)*255):t[r]=Ti(t[r]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},zc=0;class _l{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:zc++}),this.uuid=fr(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const r={uuid:this.uuid,url:""},n=this.data;if(n!==null){let a;if(Array.isArray(n)){a=[];for(let s=0,o=n.length;s<o;s++)n[s].isDataTexture?a.push(ua(n[s].image)):a.push(ua(n[s]))}else a=ua(n);r.url=a}return t||(e.images[this.uuid]=r),r}}function ua(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Oc.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Fc=0;class Kt extends Di{constructor(e=Kt.DEFAULT_IMAGE,t=Kt.DEFAULT_MAPPING,r=1001,n=1001,a=1006,s=1008,o=1023,l=1009,c=Kt.DEFAULT_ANISOTROPY,h=Nr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Fc++}),this.uuid=fr(),this.name="",this.source=new _l(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=r,this.wrapT=n,this.magFilter=a,this.minFilter=s,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new se(0,0),this.repeat=new se(1,1),this.center=new se(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Qe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const r={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),t||(e.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case 1e3:e.x=e.x-Math.floor(e.x);break;case 1001:e.x=e.x<0?0:1;break;case 1002:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case 1e3:e.y=e.y-Math.floor(e.y);break;case 1001:e.y=e.y<0?0:1;break;case 1002:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Kt.DEFAULT_IMAGE=null;Kt.DEFAULT_MAPPING=300;Kt.DEFAULT_ANISOTROPY=1;class ht{constructor(e=0,t=0,r=0,n=1){ht.prototype.isVector4=!0,this.x=e,this.y=t,this.z=r,this.w=n}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,r,n){return this.x=e,this.y=t,this.z=r,this.w=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,r=this.y,n=this.z,a=this.w,s=e.elements;return this.x=s[0]*t+s[4]*r+s[8]*n+s[12]*a,this.y=s[1]*t+s[5]*r+s[9]*n+s[13]*a,this.z=s[2]*t+s[6]*r+s[10]*n+s[14]*a,this.w=s[3]*t+s[7]*r+s[11]*n+s[15]*a,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,r,n,a;const s=e.elements,o=s[0],l=s[4],c=s[8],h=s[1],f=s[5],u=s[9],d=s[2],g=s[6],v=s[10];if(Math.abs(l-h)<.01&&Math.abs(c-d)<.01&&Math.abs(u-g)<.01){if(Math.abs(l+h)<.1&&Math.abs(c+d)<.1&&Math.abs(u+g)<.1&&Math.abs(o+f+v-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const m=(o+1)/2,y=(f+1)/2,_=(v+1)/2,S=(l+h)/4,P=(c+d)/4,T=(u+g)/4;return m>y&&m>_?m<.01?(r=0,n=.707106781,a=.707106781):(r=Math.sqrt(m),n=S/r,a=P/r):y>_?y<.01?(r=.707106781,n=0,a=.707106781):(n=Math.sqrt(y),r=S/n,a=T/n):_<.01?(r=.707106781,n=.707106781,a=0):(a=Math.sqrt(_),r=P/a,n=T/a),this.set(r,n,a,t),this}let p=Math.sqrt((g-u)*(g-u)+(c-d)*(c-d)+(h-l)*(h-l));return Math.abs(p)<.001&&(p=1),this.x=(g-u)/p,this.y=(c-d)/p,this.z=(h-l)/p,this.w=Math.acos((o+f+v-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(t,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this.z=e.z+(t.z-e.z)*r,this.w=e.w+(t.w-e.w)*r,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}let Bc=class extends Di{constructor(e=1,t=1,r={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new ht(0,0,e,t),this.scissorTest=!1,this.viewport=new ht(0,0,e,t);const n={width:e,height:t,depth:1};r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},r);const a=new Kt(n,r.mapping,r.wrapS,r.wrapT,r.magFilter,r.minFilter,r.format,r.type,r.anisotropy,r.colorSpace);a.flipY=!1,a.generateMipmaps=r.generateMipmaps,a.internalFormat=r.internalFormat,this.textures=[];const s=r.count;for(let o=0;o<s;o++)this.textures[o]=a.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.resolveDepthBuffer=r.resolveDepthBuffer,this.resolveStencilBuffer=r.resolveStencilBuffer,this.depthTexture=r.depthTexture,this.samples=r.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,r=1){if(this.width!==e||this.height!==t||this.depth!==r){this.width=e,this.height=t,this.depth=r;for(let n=0,a=this.textures.length;n<a;n++)this.textures[n].image.width=e,this.textures[n].image.height=t,this.textures[n].image.depth=r;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let r=0,n=e.textures.length;r<n;r++)this.textures[r]=e.textures[r].clone(),this.textures[r].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new _l(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}};class ur extends Bc{constructor(e=1,t=1,r={}){super(e,t,r),this.isWebGLRenderTarget=!0}}class xl extends Kt{constructor(e=null,t=1,r=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:r,depth:n},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}let kc=class extends Kt{constructor(e=null,t=1,r=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:r,depth:n},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},on=class{constructor(e=0,t=0,r=0,n=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=r,this._w=n}static slerpFlat(e,t,r,n,a,s,o){let l=r[n+0],c=r[n+1],h=r[n+2],f=r[n+3];const u=a[s+0],d=a[s+1],g=a[s+2],v=a[s+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=f;return}if(o===1){e[t+0]=u,e[t+1]=d,e[t+2]=g,e[t+3]=v;return}if(f!==v||l!==u||c!==d||h!==g){let p=1-o;const m=l*u+c*d+h*g+f*v,y=m>=0?1:-1,_=1-m*m;if(_>Number.EPSILON){const P=Math.sqrt(_),T=Math.atan2(P,m*y);p=Math.sin(p*T)/P,o=Math.sin(o*T)/P}const S=o*y;if(l=l*p+u*S,c=c*p+d*S,h=h*p+g*S,f=f*p+v*S,p===1-o){const P=1/Math.sqrt(l*l+c*c+h*h+f*f);l*=P,c*=P,h*=P,f*=P}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=f}static multiplyQuaternionsFlat(e,t,r,n,a,s){const o=r[n],l=r[n+1],c=r[n+2],h=r[n+3],f=a[s],u=a[s+1],d=a[s+2],g=a[s+3];return e[t]=o*g+h*f+l*d-c*u,e[t+1]=l*g+h*u+c*f-o*d,e[t+2]=c*g+h*d+o*u-l*f,e[t+3]=h*g-o*f-l*u-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,r,n){return this._x=e,this._y=t,this._z=r,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const r=e._x,n=e._y,a=e._z,s=e._order,o=Math.cos,l=Math.sin,c=o(r/2),h=o(n/2),f=o(a/2),u=l(r/2),d=l(n/2),g=l(a/2);switch(s){case"XYZ":this._x=u*h*f+c*d*g,this._y=c*d*f-u*h*g,this._z=c*h*g+u*d*f,this._w=c*h*f-u*d*g;break;case"YXZ":this._x=u*h*f+c*d*g,this._y=c*d*f-u*h*g,this._z=c*h*g-u*d*f,this._w=c*h*f+u*d*g;break;case"ZXY":this._x=u*h*f-c*d*g,this._y=c*d*f+u*h*g,this._z=c*h*g+u*d*f,this._w=c*h*f-u*d*g;break;case"ZYX":this._x=u*h*f-c*d*g,this._y=c*d*f+u*h*g,this._z=c*h*g-u*d*f,this._w=c*h*f+u*d*g;break;case"YZX":this._x=u*h*f+c*d*g,this._y=c*d*f+u*h*g,this._z=c*h*g-u*d*f,this._w=c*h*f-u*d*g;break;case"XZY":this._x=u*h*f-c*d*g,this._y=c*d*f-u*h*g,this._z=c*h*g+u*d*f,this._w=c*h*f+u*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const r=t/2,n=Math.sin(r);return this._x=e.x*n,this._y=e.y*n,this._z=e.z*n,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,r=t[0],n=t[4],a=t[8],s=t[1],o=t[5],l=t[9],c=t[2],h=t[6],f=t[10],u=r+o+f;if(u>0){const d=.5/Math.sqrt(u+1);this._w=.25/d,this._x=(h-l)*d,this._y=(a-c)*d,this._z=(s-n)*d}else if(r>o&&r>f){const d=2*Math.sqrt(1+r-o-f);this._w=(h-l)/d,this._x=.25*d,this._y=(n+s)/d,this._z=(a+c)/d}else if(o>f){const d=2*Math.sqrt(1+o-r-f);this._w=(a-c)/d,this._x=(n+s)/d,this._y=.25*d,this._z=(l+h)/d}else{const d=2*Math.sqrt(1+f-r-o);this._w=(s-n)/d,this._x=(a+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let r=e.dot(t)+1;return r<Number.EPSILON?(r=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=r):(this._x=0,this._y=-e.z,this._z=e.y,this._w=r)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=r),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Lt(this.dot(e),-1,1)))}rotateTowards(e,t){const r=this.angleTo(e);if(r===0)return this;const n=Math.min(1,t/r);return this.slerp(e,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const r=e._x,n=e._y,a=e._z,s=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=r*h+s*o+n*c-a*l,this._y=n*h+s*l+a*o-r*c,this._z=a*h+s*c+r*l-n*o,this._w=s*h-r*o-n*l-a*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const r=this._x,n=this._y,a=this._z,s=this._w;let o=s*e._w+r*e._x+n*e._y+a*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=s,this._x=r,this._y=n,this._z=a,this;const l=1-o*o;if(l<=Number.EPSILON){const d=1-t;return this._w=d*s+t*this._w,this._x=d*r+t*this._x,this._y=d*n+t*this._y,this._z=d*a+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),f=Math.sin((1-t)*h)/c,u=Math.sin(t*h)/c;return this._w=s*f+this._w*u,this._x=r*f+this._x*u,this._y=n*f+this._y*u,this._z=a*f+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,r){return this.copy(e).slerp(t,r)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),r=Math.random(),n=Math.sqrt(1-r),a=Math.sqrt(r);return this.set(n*Math.sin(e),n*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}};class w{constructor(e=0,t=0,r=0){w.prototype.isVector3=!0,this.x=e,this.y=t,this.z=r}set(e,t,r){return r===void 0&&(r=this.z),this.x=e,this.y=t,this.z=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ls.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ls.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,r=this.y,n=this.z,a=e.elements;return this.x=a[0]*t+a[3]*r+a[6]*n,this.y=a[1]*t+a[4]*r+a[7]*n,this.z=a[2]*t+a[5]*r+a[8]*n,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,r=this.y,n=this.z,a=e.elements,s=1/(a[3]*t+a[7]*r+a[11]*n+a[15]);return this.x=(a[0]*t+a[4]*r+a[8]*n+a[12])*s,this.y=(a[1]*t+a[5]*r+a[9]*n+a[13])*s,this.z=(a[2]*t+a[6]*r+a[10]*n+a[14])*s,this}applyQuaternion(e){const t=this.x,r=this.y,n=this.z,a=e.x,s=e.y,o=e.z,l=e.w,c=2*(s*n-o*r),h=2*(o*t-a*n),f=2*(a*r-s*t);return this.x=t+l*c+s*f-o*h,this.y=r+l*h+o*c-a*f,this.z=n+l*f+a*h-s*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,r=this.y,n=this.z,a=e.elements;return this.x=a[0]*t+a[4]*r+a[8]*n,this.y=a[1]*t+a[5]*r+a[9]*n,this.z=a[2]*t+a[6]*r+a[10]*n,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(t,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this.z=e.z+(t.z-e.z)*r,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const r=e.x,n=e.y,a=e.z,s=t.x,o=t.y,l=t.z;return this.x=n*l-a*o,this.y=a*s-r*l,this.z=r*o-n*s,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const r=e.dot(this)/t;return this.copy(e).multiplyScalar(r)}projectOnPlane(e){return da.copy(this).projectOnVector(e),this.sub(da)}reflect(e){return this.sub(da.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const r=this.dot(e)/t;return Math.acos(Lt(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,r=this.y-e.y,n=this.z-e.z;return t*t+r*r+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,r){const n=Math.sin(t)*e;return this.x=n*Math.sin(r),this.y=Math.cos(t)*e,this.z=n*Math.cos(r),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,r){return this.x=e*Math.sin(t),this.y=r,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),n=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=r,this.z=n,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,r=Math.sqrt(1-t*t);return this.x=r*Math.cos(e),this.y=t,this.z=r*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const da=new w,Ls=new on;let ln=class{constructor(e=new w(1/0,1/0,1/0),t=new w(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,r=e.length;t<r;t+=3)this.expandByPoint(sr.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,r=e.count;t<r;t++)this.expandByPoint(sr.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,r=e.length;t<r;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const r=sr.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const r=e.geometry;if(r!==void 0){const a=r.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let s=0,o=a.count;s<o;s++)e.isMesh===!0?e.getVertexPosition(s,sr):sr.fromBufferAttribute(a,s),sr.applyMatrix4(e.matrixWorld),this.expandByPoint(sr);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),mn.copy(e.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),mn.copy(r.boundingBox)),mn.applyMatrix4(e.matrixWorld),this.union(mn)}const n=e.children;for(let a=0,s=n.length;a<s;a++)this.expandByObject(n[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,sr),sr.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,r;return e.normal.x>0?(t=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,r=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),t<=-e.constant&&r>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Gi),gn.subVectors(this.max,Gi),si.subVectors(e.a,Gi),oi.subVectors(e.b,Gi),li.subVectors(e.c,Gi),Cr.subVectors(oi,si),Rr.subVectors(li,oi),Vr.subVectors(si,li);let t=[0,-Cr.z,Cr.y,0,-Rr.z,Rr.y,0,-Vr.z,Vr.y,Cr.z,0,-Cr.x,Rr.z,0,-Rr.x,Vr.z,0,-Vr.x,-Cr.y,Cr.x,0,-Rr.y,Rr.x,0,-Vr.y,Vr.x,0];return!pa(t,si,oi,li,gn)||(t=[1,0,0,0,1,0,0,0,1],!pa(t,si,oi,li,gn))?!1:(vn.crossVectors(Cr,Rr),t=[vn.x,vn.y,vn.z],pa(t,si,oi,li,gn))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,sr).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(sr).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(yr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),yr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),yr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),yr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),yr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),yr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),yr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),yr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(yr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}};const yr=[new w,new w,new w,new w,new w,new w,new w,new w],sr=new w,mn=new ln,si=new w,oi=new w,li=new w,Cr=new w,Rr=new w,Vr=new w,Gi=new w,gn=new w,vn=new w,Hr=new w;function pa(i,e,t,r,n){for(let a=0,s=i.length-3;a<=s;a+=3){Hr.fromArray(i,a);const o=n.x*Math.abs(Hr.x)+n.y*Math.abs(Hr.y)+n.z*Math.abs(Hr.z),l=e.dot(Hr),c=t.dot(Hr),h=r.dot(Hr);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Gc=new ln,Vi=new w,fa=new w;class ta{constructor(e=new w,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const r=this.center;t!==void 0?r.copy(t):Gc.setFromPoints(e).getCenter(r);let n=0;for(let a=0,s=e.length;a<s;a++)n=Math.max(n,r.distanceToSquared(e[a]));return this.radius=Math.sqrt(n),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const r=this.center.distanceToSquared(e);return t.copy(e),r>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Vi.subVectors(e,this.center);const t=Vi.lengthSq();if(t>this.radius*this.radius){const r=Math.sqrt(t),n=(r-this.radius)*.5;this.center.addScaledVector(Vi,n/r),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(fa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Vi.copy(e.center).add(fa)),this.expandByPoint(Vi.copy(e.center).sub(fa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Sr=new w,ma=new w,_n=new w,Pr=new w,ga=new w,xn=new w,va=new w;class yl{constructor(e=new w,t=new w(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Sr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const r=t.dot(this.direction);return r<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Sr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Sr.copy(this.origin).addScaledVector(this.direction,t),Sr.distanceToSquared(e))}distanceSqToSegment(e,t,r,n){ma.copy(e).add(t).multiplyScalar(.5),_n.copy(t).sub(e).normalize(),Pr.copy(this.origin).sub(ma);const a=e.distanceTo(t)*.5,s=-this.direction.dot(_n),o=Pr.dot(this.direction),l=-Pr.dot(_n),c=Pr.lengthSq(),h=Math.abs(1-s*s);let f,u,d,g;if(h>0)if(f=s*l-o,u=s*o-l,g=a*h,f>=0)if(u>=-g)if(u<=g){const v=1/h;f*=v,u*=v,d=f*(f+s*u+2*o)+u*(s*f+u+2*l)+c}else u=a,f=Math.max(0,-(s*u+o)),d=-f*f+u*(u+2*l)+c;else u=-a,f=Math.max(0,-(s*u+o)),d=-f*f+u*(u+2*l)+c;else u<=-g?(f=Math.max(0,-(-s*a+o)),u=f>0?-a:Math.min(Math.max(-a,-l),a),d=-f*f+u*(u+2*l)+c):u<=g?(f=0,u=Math.min(Math.max(-a,-l),a),d=u*(u+2*l)+c):(f=Math.max(0,-(s*a+o)),u=f>0?a:Math.min(Math.max(-a,-l),a),d=-f*f+u*(u+2*l)+c);else u=s>0?-a:a,f=Math.max(0,-(s*u+o)),d=-f*f+u*(u+2*l)+c;return r&&r.copy(this.origin).addScaledVector(this.direction,f),n&&n.copy(ma).addScaledVector(_n,u),d}intersectSphere(e,t){Sr.subVectors(e.center,this.origin);const r=Sr.dot(this.direction),n=Sr.dot(Sr)-r*r,a=e.radius*e.radius;if(n>a)return null;const s=Math.sqrt(a-n),o=r-s,l=r+s;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(e.normal)+e.constant)/t;return r>=0?r:null}intersectPlane(e,t){const r=this.distanceToPlane(e);return r===null?null:this.at(r,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let r,n,a,s,o,l;const c=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,u=this.origin;return c>=0?(r=(e.min.x-u.x)*c,n=(e.max.x-u.x)*c):(r=(e.max.x-u.x)*c,n=(e.min.x-u.x)*c),h>=0?(a=(e.min.y-u.y)*h,s=(e.max.y-u.y)*h):(a=(e.max.y-u.y)*h,s=(e.min.y-u.y)*h),r>s||a>n||((a>r||isNaN(r))&&(r=a),(s<n||isNaN(n))&&(n=s),f>=0?(o=(e.min.z-u.z)*f,l=(e.max.z-u.z)*f):(o=(e.max.z-u.z)*f,l=(e.min.z-u.z)*f),r>l||o>n)||((o>r||r!==r)&&(r=o),(l<n||n!==n)&&(n=l),n<0)?null:this.at(r>=0?r:n,t)}intersectsBox(e){return this.intersectBox(e,Sr)!==null}intersectTriangle(e,t,r,n,a){ga.subVectors(t,e),xn.subVectors(r,e),va.crossVectors(ga,xn);let s=this.direction.dot(va),o;if(s>0){if(n)return null;o=1}else if(s<0)o=-1,s=-s;else return null;Pr.subVectors(this.origin,e);const l=o*this.direction.dot(xn.crossVectors(Pr,xn));if(l<0)return null;const c=o*this.direction.dot(ga.cross(Pr));if(c<0||l+c>s)return null;const h=-o*Pr.dot(va);return h<0?null:this.at(h/s,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}let Mt=class ja{constructor(e,t,r,n,a,s,o,l,c,h,f,u,d,g,v,p){ja.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,r,n,a,s,o,l,c,h,f,u,d,g,v,p)}set(e,t,r,n,a,s,o,l,c,h,f,u,d,g,v,p){const m=this.elements;return m[0]=e,m[4]=t,m[8]=r,m[12]=n,m[1]=a,m[5]=s,m[9]=o,m[13]=l,m[2]=c,m[6]=h,m[10]=f,m[14]=u,m[3]=d,m[7]=g,m[11]=v,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ja().fromArray(this.elements)}copy(e){const t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],t[9]=r[9],t[10]=r[10],t[11]=r[11],t[12]=r[12],t[13]=r[13],t[14]=r[14],t[15]=r[15],this}copyPosition(e){const t=this.elements,r=e.elements;return t[12]=r[12],t[13]=r[13],t[14]=r[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,r){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this}makeBasis(e,t,r){return this.set(e.x,t.x,r.x,0,e.y,t.y,r.y,0,e.z,t.z,r.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,r=e.elements,n=1/ci.setFromMatrixColumn(e,0).length(),a=1/ci.setFromMatrixColumn(e,1).length(),s=1/ci.setFromMatrixColumn(e,2).length();return t[0]=r[0]*n,t[1]=r[1]*n,t[2]=r[2]*n,t[3]=0,t[4]=r[4]*a,t[5]=r[5]*a,t[6]=r[6]*a,t[7]=0,t[8]=r[8]*s,t[9]=r[9]*s,t[10]=r[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,r=e.x,n=e.y,a=e.z,s=Math.cos(r),o=Math.sin(r),l=Math.cos(n),c=Math.sin(n),h=Math.cos(a),f=Math.sin(a);if(e.order==="XYZ"){const u=s*h,d=s*f,g=o*h,v=o*f;t[0]=l*h,t[4]=-l*f,t[8]=c,t[1]=d+g*c,t[5]=u-v*c,t[9]=-o*l,t[2]=v-u*c,t[6]=g+d*c,t[10]=s*l}else if(e.order==="YXZ"){const u=l*h,d=l*f,g=c*h,v=c*f;t[0]=u+v*o,t[4]=g*o-d,t[8]=s*c,t[1]=s*f,t[5]=s*h,t[9]=-o,t[2]=d*o-g,t[6]=v+u*o,t[10]=s*l}else if(e.order==="ZXY"){const u=l*h,d=l*f,g=c*h,v=c*f;t[0]=u-v*o,t[4]=-s*f,t[8]=g+d*o,t[1]=d+g*o,t[5]=s*h,t[9]=v-u*o,t[2]=-s*c,t[6]=o,t[10]=s*l}else if(e.order==="ZYX"){const u=s*h,d=s*f,g=o*h,v=o*f;t[0]=l*h,t[4]=g*c-d,t[8]=u*c+v,t[1]=l*f,t[5]=v*c+u,t[9]=d*c-g,t[2]=-c,t[6]=o*l,t[10]=s*l}else if(e.order==="YZX"){const u=s*l,d=s*c,g=o*l,v=o*c;t[0]=l*h,t[4]=v-u*f,t[8]=g*f+d,t[1]=f,t[5]=s*h,t[9]=-o*h,t[2]=-c*h,t[6]=d*f+g,t[10]=u-v*f}else if(e.order==="XZY"){const u=s*l,d=s*c,g=o*l,v=o*c;t[0]=l*h,t[4]=-f,t[8]=c*h,t[1]=u*f+v,t[5]=s*h,t[9]=d*f-g,t[2]=g*f-d,t[6]=o*h,t[10]=v*f+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Vc,e,Hc)}lookAt(e,t,r){const n=this.elements;return er.subVectors(e,t),er.lengthSq()===0&&(er.z=1),er.normalize(),Ir.crossVectors(r,er),Ir.lengthSq()===0&&(Math.abs(r.z)===1?er.x+=1e-4:er.z+=1e-4,er.normalize(),Ir.crossVectors(r,er)),Ir.normalize(),yn.crossVectors(er,Ir),n[0]=Ir.x,n[4]=yn.x,n[8]=er.x,n[1]=Ir.y,n[5]=yn.y,n[9]=er.y,n[2]=Ir.z,n[6]=yn.z,n[10]=er.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const r=e.elements,n=t.elements,a=this.elements,s=r[0],o=r[4],l=r[8],c=r[12],h=r[1],f=r[5],u=r[9],d=r[13],g=r[2],v=r[6],p=r[10],m=r[14],y=r[3],_=r[7],S=r[11],P=r[15],T=n[0],R=n[4],U=n[8],B=n[12],x=n[1],E=n[5],F=n[9],z=n[13],V=n[2],Q=n[6],D=n[10],$=n[14],G=n[3],ue=n[7],de=n[11],Ie=n[15];return a[0]=s*T+o*x+l*V+c*G,a[4]=s*R+o*E+l*Q+c*ue,a[8]=s*U+o*F+l*D+c*de,a[12]=s*B+o*z+l*$+c*Ie,a[1]=h*T+f*x+u*V+d*G,a[5]=h*R+f*E+u*Q+d*ue,a[9]=h*U+f*F+u*D+d*de,a[13]=h*B+f*z+u*$+d*Ie,a[2]=g*T+v*x+p*V+m*G,a[6]=g*R+v*E+p*Q+m*ue,a[10]=g*U+v*F+p*D+m*de,a[14]=g*B+v*z+p*$+m*Ie,a[3]=y*T+_*x+S*V+P*G,a[7]=y*R+_*E+S*Q+P*ue,a[11]=y*U+_*F+S*D+P*de,a[15]=y*B+_*z+S*$+P*Ie,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],r=e[4],n=e[8],a=e[12],s=e[1],o=e[5],l=e[9],c=e[13],h=e[2],f=e[6],u=e[10],d=e[14],g=e[3],v=e[7],p=e[11],m=e[15];return g*(+a*l*f-n*c*f-a*o*u+r*c*u+n*o*d-r*l*d)+v*(+t*l*d-t*c*u+a*s*u-n*s*d+n*c*h-a*l*h)+p*(+t*c*f-t*o*d-a*s*f+r*s*d+a*o*h-r*c*h)+m*(-n*o*h-t*l*f+t*o*u+n*s*f-r*s*u+r*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,r){const n=this.elements;return e.isVector3?(n[12]=e.x,n[13]=e.y,n[14]=e.z):(n[12]=e,n[13]=t,n[14]=r),this}invert(){const e=this.elements,t=e[0],r=e[1],n=e[2],a=e[3],s=e[4],o=e[5],l=e[6],c=e[7],h=e[8],f=e[9],u=e[10],d=e[11],g=e[12],v=e[13],p=e[14],m=e[15],y=f*p*c-v*u*c+v*l*d-o*p*d-f*l*m+o*u*m,_=g*u*c-h*p*c-g*l*d+s*p*d+h*l*m-s*u*m,S=h*v*c-g*f*c+g*o*d-s*v*d-h*o*m+s*f*m,P=g*f*l-h*v*l-g*o*u+s*v*u+h*o*p-s*f*p,T=t*y+r*_+n*S+a*P;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/T;return e[0]=y*R,e[1]=(v*u*a-f*p*a-v*n*d+r*p*d+f*n*m-r*u*m)*R,e[2]=(o*p*a-v*l*a+v*n*c-r*p*c-o*n*m+r*l*m)*R,e[3]=(f*l*a-o*u*a-f*n*c+r*u*c+o*n*d-r*l*d)*R,e[4]=_*R,e[5]=(h*p*a-g*u*a+g*n*d-t*p*d-h*n*m+t*u*m)*R,e[6]=(g*l*a-s*p*a-g*n*c+t*p*c+s*n*m-t*l*m)*R,e[7]=(s*u*a-h*l*a+h*n*c-t*u*c-s*n*d+t*l*d)*R,e[8]=S*R,e[9]=(g*f*a-h*v*a-g*r*d+t*v*d+h*r*m-t*f*m)*R,e[10]=(s*v*a-g*o*a+g*r*c-t*v*c-s*r*m+t*o*m)*R,e[11]=(h*o*a-s*f*a-h*r*c+t*f*c+s*r*d-t*o*d)*R,e[12]=P*R,e[13]=(h*v*n-g*f*n+g*r*u-t*v*u-h*r*p+t*f*p)*R,e[14]=(g*o*n-s*v*n-g*r*l+t*v*l+s*r*p-t*o*p)*R,e[15]=(s*f*n-h*o*n+h*r*l-t*f*l-s*r*u+t*o*u)*R,this}scale(e){const t=this.elements,r=e.x,n=e.y,a=e.z;return t[0]*=r,t[4]*=n,t[8]*=a,t[1]*=r,t[5]*=n,t[9]*=a,t[2]*=r,t[6]*=n,t[10]*=a,t[3]*=r,t[7]*=n,t[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],n=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,r,n))}makeTranslation(e,t,r){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,r,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),r=Math.sin(e);return this.set(1,0,0,0,0,t,-r,0,0,r,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,0,r,0,0,1,0,0,-r,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,-r,0,0,r,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const r=Math.cos(t),n=Math.sin(t),a=1-r,s=e.x,o=e.y,l=e.z,c=a*s,h=a*o;return this.set(c*s+r,c*o-n*l,c*l+n*o,0,c*o+n*l,h*o+r,h*l-n*s,0,c*l-n*o,h*l+n*s,a*l*l+r,0,0,0,0,1),this}makeScale(e,t,r){return this.set(e,0,0,0,0,t,0,0,0,0,r,0,0,0,0,1),this}makeShear(e,t,r,n,a,s){return this.set(1,r,a,0,e,1,s,0,t,n,1,0,0,0,0,1),this}compose(e,t,r){const n=this.elements,a=t._x,s=t._y,o=t._z,l=t._w,c=a+a,h=s+s,f=o+o,u=a*c,d=a*h,g=a*f,v=s*h,p=s*f,m=o*f,y=l*c,_=l*h,S=l*f,P=r.x,T=r.y,R=r.z;return n[0]=(1-(v+m))*P,n[1]=(d+S)*P,n[2]=(g-_)*P,n[3]=0,n[4]=(d-S)*T,n[5]=(1-(u+m))*T,n[6]=(p+y)*T,n[7]=0,n[8]=(g+_)*R,n[9]=(p-y)*R,n[10]=(1-(u+v))*R,n[11]=0,n[12]=e.x,n[13]=e.y,n[14]=e.z,n[15]=1,this}decompose(e,t,r){const n=this.elements;let a=ci.set(n[0],n[1],n[2]).length();const s=ci.set(n[4],n[5],n[6]).length(),o=ci.set(n[8],n[9],n[10]).length();this.determinant()<0&&(a=-a),e.x=n[12],e.y=n[13],e.z=n[14],or.copy(this);const l=1/a,c=1/s,h=1/o;return or.elements[0]*=l,or.elements[1]*=l,or.elements[2]*=l,or.elements[4]*=c,or.elements[5]*=c,or.elements[6]*=c,or.elements[8]*=h,or.elements[9]*=h,or.elements[10]*=h,t.setFromRotationMatrix(or),r.x=a,r.y=s,r.z=o,this}makePerspective(e,t,r,n,a,s,o=2e3){const l=this.elements,c=2*a/(t-e),h=2*a/(r-n),f=(t+e)/(t-e),u=(r+n)/(r-n);let d,g;if(o===2e3)d=-(s+a)/(s-a),g=-2*s*a/(s-a);else if(o===2001)d=-s/(s-a),g=-s*a/(s-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,r,n,a,s,o=2e3){const l=this.elements,c=1/(t-e),h=1/(r-n),f=1/(s-a),u=(t+e)*c,d=(r+n)*h;let g,v;if(o===2e3)g=(s+a)*f,v=-2*f;else if(o===2001)g=a*f,v=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,r=e.elements;for(let n=0;n<16;n++)if(t[n]!==r[n])return!1;return!0}fromArray(e,t=0){for(let r=0;r<16;r++)this.elements[r]=e[r+t];return this}toArray(e=[],t=0){const r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e[t+9]=r[9],e[t+10]=r[10],e[t+11]=r[11],e[t+12]=r[12],e[t+13]=r[13],e[t+14]=r[14],e[t+15]=r[15],e}};const ci=new w,or=new Mt,Vc=new w(0,0,0),Hc=new w(1,1,1),Ir=new w,yn=new w,er=new w,Us=new Mt,Ns=new on;let Or=class Sl{constructor(e=0,t=0,r=0,n=Sl.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=r,this._order=n}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,r,n=this._order){return this._x=e,this._y=t,this._z=r,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,r=!0){const n=e.elements,a=n[0],s=n[4],o=n[8],l=n[1],c=n[5],h=n[9],f=n[2],u=n[6],d=n[10];switch(t){case"XYZ":this._y=Math.asin(Lt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-s,a)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Lt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,a),this._z=0);break;case"ZXY":this._x=Math.asin(Lt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-s,c)):(this._y=0,this._z=Math.atan2(l,a));break;case"ZYX":this._y=Math.asin(-Lt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,d),this._z=Math.atan2(l,a)):(this._x=0,this._z=Math.atan2(-s,c));break;case"YZX":this._z=Math.asin(Lt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-f,a)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-Lt(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,r===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,r){return Us.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Us,t,r)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ns.setFromEuler(this),this.setFromQuaternion(Ns,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Or.DEFAULT_ORDER="XYZ";class Ml{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Wc=0;const Ds=new w,hi=new on,Mr=new Mt,Sn=new w,Hi=new w,Xc=new w,qc=new on,Os=new w(1,0,0),zs=new w(0,1,0),Fs=new w(0,0,1),Bs={type:"added"},jc={type:"removed"},ui={type:"childadded",child:null},_a={type:"childremoved",child:null};class wt extends Di{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Wc++}),this.uuid=fr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=wt.DEFAULT_UP.clone();const e=new w,t=new Or,r=new on,n=new w(1,1,1);function a(){r.setFromEuler(t,!1)}function s(){t.setFromQuaternion(r,void 0,!1)}t._onChange(a),r._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new Mt},normalMatrix:{value:new Qe}}),this.matrix=new Mt,this.matrixWorld=new Mt,this.matrixAutoUpdate=wt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=wt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ml,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return hi.setFromAxisAngle(e,t),this.quaternion.multiply(hi),this}rotateOnWorldAxis(e,t){return hi.setFromAxisAngle(e,t),this.quaternion.premultiply(hi),this}rotateX(e){return this.rotateOnAxis(Os,e)}rotateY(e){return this.rotateOnAxis(zs,e)}rotateZ(e){return this.rotateOnAxis(Fs,e)}translateOnAxis(e,t){return Ds.copy(e).applyQuaternion(this.quaternion),this.position.add(Ds.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Os,e)}translateY(e){return this.translateOnAxis(zs,e)}translateZ(e){return this.translateOnAxis(Fs,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Mr.copy(this.matrixWorld).invert())}lookAt(e,t,r){e.isVector3?Sn.copy(e):Sn.set(e,t,r);const n=this.parent;this.updateWorldMatrix(!0,!1),Hi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Mr.lookAt(Hi,Sn,this.up):Mr.lookAt(Sn,Hi,this.up),this.quaternion.setFromRotationMatrix(Mr),n&&(Mr.extractRotation(n.matrixWorld),hi.setFromRotationMatrix(Mr),this.quaternion.premultiply(hi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Bs),ui.child=e,this.dispatchEvent(ui),ui.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(jc),_a.child=e,this.dispatchEvent(_a),_a.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Mr.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Mr.multiply(e.parent.matrixWorld)),e.applyMatrix4(Mr),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Bs),ui.child=e,this.dispatchEvent(ui),ui.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let r=0,n=this.children.length;r<n;r++){const a=this.children[r].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,r=[]){this[e]===t&&r.push(this);const n=this.children;for(let a=0,s=n.length;a<s;a++)n[a].getObjectsByProperty(e,t,r);return r}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Hi,e,Xc),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Hi,qc,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let r=0,n=t.length;r<n;r++)t[r].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let r=0,n=t.length;r<n;r++)t[r].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let r=0,n=t.length;r<n;r++)t[r].updateMatrixWorld(e)}updateWorldMatrix(e,t){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const n=this.children;for(let a=0,s=n.length;a<s;a++)n[a].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",r={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const n={};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.castShadow===!0&&(n.castShadow=!0),this.receiveShadow===!0&&(n.receiveShadow=!0),this.visible===!1&&(n.visible=!1),this.frustumCulled===!1&&(n.frustumCulled=!1),this.renderOrder!==0&&(n.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(n.matrixAutoUpdate=!1),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.visibility=this._visibility,n.active=this._active,n.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),n.maxInstanceCount=this._maxInstanceCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.geometryCount=this._geometryCount,n.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(n.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(n.boundingSphere={center:n.boundingSphere.center.toArray(),radius:n.boundingSphere.radius}),this.boundingBox!==null&&(n.boundingBox={min:n.boundingBox.min.toArray(),max:n.boundingBox.max.toArray()}));function a(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=a(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const f=l[c];a(e.shapes,f)}else a(e.shapes,l)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(a(e.materials,this.material[l]));n.material=o}else n.material=a(e.materials,this.material);if(this.children.length>0){n.children=[];for(let o=0;o<this.children.length;o++)n.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){n.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];n.animations.push(a(e.animations,l))}}if(t){const o=s(e.geometries),l=s(e.materials),c=s(e.textures),h=s(e.images),f=s(e.shapes),u=s(e.skeletons),d=s(e.animations),g=s(e.nodes);o.length>0&&(r.geometries=o),l.length>0&&(r.materials=l),c.length>0&&(r.textures=c),h.length>0&&(r.images=h),f.length>0&&(r.shapes=f),u.length>0&&(r.skeletons=u),d.length>0&&(r.animations=d),g.length>0&&(r.nodes=g)}return r.object=n,r;function s(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let r=0;r<e.children.length;r++){const n=e.children[r];this.add(n.clone())}return this}}wt.DEFAULT_UP=new w(0,1,0);wt.DEFAULT_MATRIX_AUTO_UPDATE=!0;wt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const lr=new w,wr=new w,xa=new w,br=new w,di=new w,pi=new w,ks=new w,ya=new w,Sa=new w,Ma=new w,wa=new ht,ba=new ht,Ea=new ht;let Mi=class wi{constructor(e=new w,t=new w,r=new w){this.a=e,this.b=t,this.c=r}static getNormal(e,t,r,n){n.subVectors(r,t),lr.subVectors(e,t),n.cross(lr);const a=n.lengthSq();return a>0?n.multiplyScalar(1/Math.sqrt(a)):n.set(0,0,0)}static getBarycoord(e,t,r,n,a){lr.subVectors(n,t),wr.subVectors(r,t),xa.subVectors(e,t);const s=lr.dot(lr),o=lr.dot(wr),l=lr.dot(xa),c=wr.dot(wr),h=wr.dot(xa),f=s*c-o*o;if(f===0)return a.set(0,0,0),null;const u=1/f,d=(c*l-o*h)*u,g=(s*h-o*l)*u;return a.set(1-d-g,g,d)}static containsPoint(e,t,r,n){return this.getBarycoord(e,t,r,n,br)===null?!1:br.x>=0&&br.y>=0&&br.x+br.y<=1}static getInterpolation(e,t,r,n,a,s,o,l){return this.getBarycoord(e,t,r,n,br)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(a,br.x),l.addScaledVector(s,br.y),l.addScaledVector(o,br.z),l)}static getInterpolatedAttribute(e,t,r,n,a,s){return wa.setScalar(0),ba.setScalar(0),Ea.setScalar(0),wa.fromBufferAttribute(e,t),ba.fromBufferAttribute(e,r),Ea.fromBufferAttribute(e,n),s.setScalar(0),s.addScaledVector(wa,a.x),s.addScaledVector(ba,a.y),s.addScaledVector(Ea,a.z),s}static isFrontFacing(e,t,r,n){return lr.subVectors(r,t),wr.subVectors(e,t),lr.cross(wr).dot(n)<0}set(e,t,r){return this.a.copy(e),this.b.copy(t),this.c.copy(r),this}setFromPointsAndIndices(e,t,r,n){return this.a.copy(e[t]),this.b.copy(e[r]),this.c.copy(e[n]),this}setFromAttributeAndIndices(e,t,r,n){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,r),this.c.fromBufferAttribute(e,n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return lr.subVectors(this.c,this.b),wr.subVectors(this.a,this.b),lr.cross(wr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return wi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return wi.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,r,n,a){return wi.getInterpolation(e,this.a,this.b,this.c,t,r,n,a)}containsPoint(e){return wi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return wi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const r=this.a,n=this.b,a=this.c;let s,o;di.subVectors(n,r),pi.subVectors(a,r),ya.subVectors(e,r);const l=di.dot(ya),c=pi.dot(ya);if(l<=0&&c<=0)return t.copy(r);Sa.subVectors(e,n);const h=di.dot(Sa),f=pi.dot(Sa);if(h>=0&&f<=h)return t.copy(n);const u=l*f-h*c;if(u<=0&&l>=0&&h<=0)return s=l/(l-h),t.copy(r).addScaledVector(di,s);Ma.subVectors(e,a);const d=di.dot(Ma),g=pi.dot(Ma);if(g>=0&&d<=g)return t.copy(a);const v=d*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(r).addScaledVector(pi,o);const p=h*g-d*f;if(p<=0&&f-h>=0&&d-g>=0)return ks.subVectors(a,n),o=(f-h)/(f-h+(d-g)),t.copy(n).addScaledVector(ks,o);const m=1/(p+v+u);return s=v*m,o=u*m,t.copy(r).addScaledVector(di,s).addScaledVector(pi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}};const wl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Lr={h:0,s:0,l:0},Mn={h:0,s:0,l:0};function Ta(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class ve{constructor(e,t,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,r)}set(e,t,r){if(t===void 0&&r===void 0){const n=e;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(e,t,r);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=qt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,nt.toWorkingColorSpace(this,t),this}setRGB(e,t,r,n=nt.workingColorSpace){return this.r=e,this.g=t,this.b=r,nt.toWorkingColorSpace(this,n),this}setHSL(e,t,r,n=nt.workingColorSpace){if(e=cs(e,1),t=Lt(t,0,1),r=Lt(r,0,1),t===0)this.r=this.g=this.b=r;else{const a=r<=.5?r*(1+t):r+t-r*t,s=2*r-a;this.r=Ta(s,a,e+1/3),this.g=Ta(s,a,e),this.b=Ta(s,a,e-1/3)}return nt.toWorkingColorSpace(this,n),this}setStyle(e,t=qt){function r(a){a!==void 0&&parseFloat(a)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const s=n[1],o=n[2];switch(s){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return r(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return r(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return r(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=n[1],s=a.length;if(s===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(s===6)return this.setHex(parseInt(a,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=qt){const r=wl[e.toLowerCase()];return r!==void 0?this.setHex(r,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ti(e.r),this.g=Ti(e.g),this.b=Ti(e.b),this}copyLinearToSRGB(e){return this.r=ha(e.r),this.g=ha(e.g),this.b=ha(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=qt){return nt.fromWorkingColorSpace(Gt.copy(this),e),Math.round(Lt(Gt.r*255,0,255))*65536+Math.round(Lt(Gt.g*255,0,255))*256+Math.round(Lt(Gt.b*255,0,255))}getHexString(e=qt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=nt.workingColorSpace){nt.fromWorkingColorSpace(Gt.copy(this),t);const r=Gt.r,n=Gt.g,a=Gt.b,s=Math.max(r,n,a),o=Math.min(r,n,a);let l,c;const h=(o+s)/2;if(o===s)l=0,c=0;else{const f=s-o;switch(c=h<=.5?f/(s+o):f/(2-s-o),s){case r:l=(n-a)/f+(n<a?6:0);break;case n:l=(a-r)/f+2;break;case a:l=(r-n)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=nt.workingColorSpace){return nt.fromWorkingColorSpace(Gt.copy(this),t),e.r=Gt.r,e.g=Gt.g,e.b=Gt.b,e}getStyle(e=qt){nt.fromWorkingColorSpace(Gt.copy(this),e);const t=Gt.r,r=Gt.g,n=Gt.b;return e!==qt?`color(${e} ${t.toFixed(3)} ${r.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(r*255)},${Math.round(n*255)})`}offsetHSL(e,t,r){return this.getHSL(Lr),this.setHSL(Lr.h+e,Lr.s+t,Lr.l+r)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,r){return this.r=e.r+(t.r-e.r)*r,this.g=e.g+(t.g-e.g)*r,this.b=e.b+(t.b-e.b)*r,this}lerpHSL(e,t){this.getHSL(Lr),e.getHSL(Mn);const r=Ji(Lr.h,Mn.h,t),n=Ji(Lr.s,Mn.s,t),a=Ji(Lr.l,Mn.l,t);return this.setHSL(r,n,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,r=this.g,n=this.b,a=e.elements;return this.r=a[0]*t+a[3]*r+a[6]*n,this.g=a[1]*t+a[4]*r+a[7]*n,this.b=a[2]*t+a[5]*r+a[8]*n,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Gt=new ve;ve.NAMES=wl;let $c=0;class ti extends Di{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:$c++}),this.uuid=fr(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ve(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const r=e[t];if(r===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const n=this[t];if(n===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(r):n&&n.isVector3&&r&&r.isVector3?n.copy(r):this[t]=r}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const r={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(r.dispersion=this.dispersion),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(e).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(e).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(e).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(e).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(e).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapRotation!==void 0&&(r.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(r.blending=this.blending),this.side!==0&&(r.side=this.side),this.vertexColors===!0&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=!0),this.blendSrc!==204&&(r.blendSrc=this.blendSrc),this.blendDst!==205&&(r.blendDst=this.blendDst),this.blendEquation!==100&&(r.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(r.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(r.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(r.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(r.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(r.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(r.depthFunc=this.depthFunc),this.depthTest===!1&&(r.depthTest=this.depthTest),this.depthWrite===!1&&(r.depthWrite=this.depthWrite),this.colorWrite===!1&&(r.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(r.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(r.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(r.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(r.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==7680&&(r.stencilFail=this.stencilFail),this.stencilZFail!==7680&&(r.stencilZFail=this.stencilZFail),this.stencilZPass!==7680&&(r.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(r.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaHash===!0&&(r.alphaHash=!0),this.alphaToCoverage===!0&&(r.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=!0),this.forceSinglePass===!0&&(r.forceSinglePass=!0),this.wireframe===!0&&(r.wireframe=!0),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=!0),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),Object.keys(this.userData).length>0&&(r.userData=this.userData);function n(a){const s=[];for(const o in a){const l=a[o];delete l.metadata,s.push(l)}return s}if(t){const a=n(e.textures),s=n(e.images);a.length>0&&(r.textures=a),s.length>0&&(r.images=s)}return r}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let r=null;if(t!==null){const n=t.length;r=new Array(n);for(let a=0;a!==n;++a)r[a]=t[a].clone()}return this.clippingPlanes=r,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class ut extends ti{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ve(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Or,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const At=new w,wn=new se;let Zt=class{constructor(e,t,r=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=r,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,r){e*=this.itemSize,r*=t.itemSize;for(let n=0,a=this.itemSize;n<a;n++)this.array[e+n]=t.array[r+n];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,r=this.count;t<r;t++)wn.fromBufferAttribute(this,t),wn.applyMatrix3(e),this.setXY(t,wn.x,wn.y);else if(this.itemSize===3)for(let t=0,r=this.count;t<r;t++)At.fromBufferAttribute(this,t),At.applyMatrix3(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyMatrix4(e){for(let t=0,r=this.count;t<r;t++)At.fromBufferAttribute(this,t),At.applyMatrix4(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyNormalMatrix(e){for(let t=0,r=this.count;t<r;t++)At.fromBufferAttribute(this,t),At.applyNormalMatrix(e),this.setXYZ(t,At.x,At.y,At.z);return this}transformDirection(e){for(let t=0,r=this.count;t<r;t++)At.fromBufferAttribute(this,t),At.transformDirection(e),this.setXYZ(t,At.x,At.y,At.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let r=this.array[e*this.itemSize+t];return this.normalized&&(r=hr(r,this.array)),r}setComponent(e,t,r){return this.normalized&&(r=lt(r,this.array)),this.array[e*this.itemSize+t]=r,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=hr(t,this.array)),t}setX(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=hr(t,this.array)),t}setY(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=hr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=hr(t,this.array)),t}setW(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,r){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),r=lt(r,this.array)),this.array[e+0]=t,this.array[e+1]=r,this}setXYZ(e,t,r,n){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),r=lt(r,this.array),n=lt(n,this.array)),this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=n,this}setXYZW(e,t,r,n,a){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),r=lt(r,this.array),n=lt(n,this.array),a=lt(a,this.array)),this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=n,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==35044&&(e.usage=this.usage),e}};class bl extends Zt{constructor(e,t,r){super(new Uint16Array(e),t,r)}}class El extends Zt{constructor(e,t,r){super(new Uint32Array(e),t,r)}}let Ke=class extends Zt{constructor(e,t,r){super(new Float32Array(e),t,r)}},Yc=0;const nr=new Mt,Aa=new wt,fi=new w,tr=new ln,Wi=new ln,zt=new w;let pt=class Tl extends Di{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Yc++}),this.uuid=fr(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(vl(e)?El:bl)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,r=0){this.groups.push({start:e,count:t,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const a=new Qe().getNormalMatrix(e);r.applyNormalMatrix(a),r.needsUpdate=!0}const n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(e),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return nr.makeRotationFromQuaternion(e),this.applyMatrix4(nr),this}rotateX(e){return nr.makeRotationX(e),this.applyMatrix4(nr),this}rotateY(e){return nr.makeRotationY(e),this.applyMatrix4(nr),this}rotateZ(e){return nr.makeRotationZ(e),this.applyMatrix4(nr),this}translate(e,t,r){return nr.makeTranslation(e,t,r),this.applyMatrix4(nr),this}scale(e,t,r){return nr.makeScale(e,t,r),this.applyMatrix4(nr),this}lookAt(e){return Aa.lookAt(e),Aa.updateMatrix(),this.applyMatrix4(Aa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(fi).negate(),this.translate(fi.x,fi.y,fi.z),this}setFromPoints(e){const t=[];for(let r=0,n=e.length;r<n;r++){const a=e[r];t.push(a.x,a.y,a.z||0)}return this.setAttribute("position",new Ke(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ln);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new w(-1/0,-1/0,-1/0),new w(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let r=0,n=t.length;r<n;r++){const a=t[r];tr.setFromBufferAttribute(a),this.morphTargetsRelative?(zt.addVectors(this.boundingBox.min,tr.min),this.boundingBox.expandByPoint(zt),zt.addVectors(this.boundingBox.max,tr.max),this.boundingBox.expandByPoint(zt)):(this.boundingBox.expandByPoint(tr.min),this.boundingBox.expandByPoint(tr.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ta);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new w,1/0);return}if(e){const r=this.boundingSphere.center;if(tr.setFromBufferAttribute(e),t)for(let a=0,s=t.length;a<s;a++){const o=t[a];Wi.setFromBufferAttribute(o),this.morphTargetsRelative?(zt.addVectors(tr.min,Wi.min),tr.expandByPoint(zt),zt.addVectors(tr.max,Wi.max),tr.expandByPoint(zt)):(tr.expandByPoint(Wi.min),tr.expandByPoint(Wi.max))}tr.getCenter(r);let n=0;for(let a=0,s=e.count;a<s;a++)zt.fromBufferAttribute(e,a),n=Math.max(n,r.distanceToSquared(zt));if(t)for(let a=0,s=t.length;a<s;a++){const o=t[a],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)zt.fromBufferAttribute(o,c),l&&(fi.fromBufferAttribute(e,c),zt.add(fi)),n=Math.max(n,r.distanceToSquared(zt))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=t.position,n=t.normal,a=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Zt(new Float32Array(4*r.count),4));const s=this.getAttribute("tangent"),o=[],l=[];for(let U=0;U<r.count;U++)o[U]=new w,l[U]=new w;const c=new w,h=new w,f=new w,u=new se,d=new se,g=new se,v=new w,p=new w;function m(U,B,x){c.fromBufferAttribute(r,U),h.fromBufferAttribute(r,B),f.fromBufferAttribute(r,x),u.fromBufferAttribute(a,U),d.fromBufferAttribute(a,B),g.fromBufferAttribute(a,x),h.sub(c),f.sub(c),d.sub(u),g.sub(u);const E=1/(d.x*g.y-g.x*d.y);isFinite(E)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(f,-d.y).multiplyScalar(E),p.copy(f).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(E),o[U].add(v),o[B].add(v),o[x].add(v),l[U].add(p),l[B].add(p),l[x].add(p))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let U=0,B=y.length;U<B;++U){const x=y[U],E=x.start,F=x.count;for(let z=E,V=E+F;z<V;z+=3)m(e.getX(z+0),e.getX(z+1),e.getX(z+2))}const _=new w,S=new w,P=new w,T=new w;function R(U){P.fromBufferAttribute(n,U),T.copy(P);const B=o[U];_.copy(B),_.sub(P.multiplyScalar(P.dot(B))).normalize(),S.crossVectors(T,B);const x=S.dot(l[U])<0?-1:1;s.setXYZW(U,_.x,_.y,_.z,x)}for(let U=0,B=y.length;U<B;++U){const x=y[U],E=x.start,F=x.count;for(let z=E,V=E+F;z<V;z+=3)R(e.getX(z+0)),R(e.getX(z+1)),R(e.getX(z+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let r=this.getAttribute("normal");if(r===void 0)r=new Zt(new Float32Array(t.count*3),3),this.setAttribute("normal",r);else for(let u=0,d=r.count;u<d;u++)r.setXYZ(u,0,0,0);const n=new w,a=new w,s=new w,o=new w,l=new w,c=new w,h=new w,f=new w;if(e)for(let u=0,d=e.count;u<d;u+=3){const g=e.getX(u+0),v=e.getX(u+1),p=e.getX(u+2);n.fromBufferAttribute(t,g),a.fromBufferAttribute(t,v),s.fromBufferAttribute(t,p),h.subVectors(s,a),f.subVectors(n,a),h.cross(f),o.fromBufferAttribute(r,g),l.fromBufferAttribute(r,v),c.fromBufferAttribute(r,p),o.add(h),l.add(h),c.add(h),r.setXYZ(g,o.x,o.y,o.z),r.setXYZ(v,l.x,l.y,l.z),r.setXYZ(p,c.x,c.y,c.z)}else for(let u=0,d=t.count;u<d;u+=3)n.fromBufferAttribute(t,u+0),a.fromBufferAttribute(t,u+1),s.fromBufferAttribute(t,u+2),h.subVectors(s,a),f.subVectors(n,a),h.cross(f),r.setXYZ(u+0,h.x,h.y,h.z),r.setXYZ(u+1,h.x,h.y,h.z),r.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,r=e.count;t<r;t++)zt.fromBufferAttribute(e,t),zt.normalize(),e.setXYZ(t,zt.x,zt.y,zt.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,f=o.normalized,u=new c.constructor(l.length*h);let d=0,g=0;for(let v=0,p=l.length;v<p;v++){o.isInterleavedBufferAttribute?d=l[v]*o.data.stride+o.offset:d=l[v]*h;for(let m=0;m<h;m++)u[g++]=c[d++]}return new Zt(u,h,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Tl,r=this.index.array,n=this.attributes;for(const o in n){const l=n[o],c=e(l,r);t.setAttribute(o,c)}const a=this.morphAttributes;for(const o in a){const l=[],c=a[o];for(let h=0,f=c.length;h<f;h++){const u=c[h],d=e(u,r);l.push(d)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const s=this.groups;for(let o=0,l=s.length;o<l;o++){const c=s[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const r=this.attributes;for(const l in r){const c=r[l];e.data.attributes[l]=c.toJSON(e.data)}const n={};let a=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let f=0,u=c.length;f<u;f++){const d=c[f];h.push(d.toJSON(e.data))}h.length>0&&(n[l]=h,a=!0)}a&&(e.data.morphAttributes=n,e.data.morphTargetsRelative=this.morphTargetsRelative);const s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const r=e.index;r!==null&&this.setIndex(r.clone(t));const n=e.attributes;for(const c in n){const h=n[c];this.setAttribute(c,h.clone(t))}const a=e.morphAttributes;for(const c in a){const h=[],f=a[c];for(let u=0,d=f.length;u<d;u++)h.push(f[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const s=e.groups;for(let c=0,h=s.length;c<h;c++){const f=s[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}};const Gs=new Mt,Wr=new yl,bn=new ta,Vs=new w,En=new w,Tn=new w,An=new w,Ca=new w,Cn=new w,Hs=new w,Rn=new w;class W extends wt{constructor(e=new pt,t=new ut){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){const r=e[t[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let n=0,a=r.length;n<a;n++){const s=r[n].name||String(n);this.morphTargetInfluences.push(0),this.morphTargetDictionary[s]=n}}}}getVertexPosition(e,t){const r=this.geometry,n=r.attributes.position,a=r.morphAttributes.position,s=r.morphTargetsRelative;t.fromBufferAttribute(n,e);const o=this.morphTargetInfluences;if(a&&o){Cn.set(0,0,0);for(let l=0,c=a.length;l<c;l++){const h=o[l],f=a[l];h!==0&&(Ca.fromBufferAttribute(f,e),s?Cn.addScaledVector(Ca,h):Cn.addScaledVector(Ca.sub(t),h))}t.add(Cn)}return t}raycast(e,t){const r=this.geometry,n=this.material,a=this.matrixWorld;n!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),bn.copy(r.boundingSphere),bn.applyMatrix4(a),Wr.copy(e.ray).recast(e.near),!(bn.containsPoint(Wr.origin)===!1&&(Wr.intersectSphere(bn,Vs)===null||Wr.origin.distanceToSquared(Vs)>(e.far-e.near)**2))&&(Gs.copy(a).invert(),Wr.copy(e.ray).applyMatrix4(Gs),!(r.boundingBox!==null&&Wr.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(e,t,Wr)))}_computeIntersections(e,t,r){let n;const a=this.geometry,s=this.material,o=a.index,l=a.attributes.position,c=a.attributes.uv,h=a.attributes.uv1,f=a.attributes.normal,u=a.groups,d=a.drawRange;if(o!==null)if(Array.isArray(s))for(let g=0,v=u.length;g<v;g++){const p=u[g],m=s[p.materialIndex],y=Math.max(p.start,d.start),_=Math.min(o.count,Math.min(p.start+p.count,d.start+d.count));for(let S=y,P=_;S<P;S+=3){const T=o.getX(S),R=o.getX(S+1),U=o.getX(S+2);n=Pn(this,m,e,r,c,h,f,T,R,U),n&&(n.faceIndex=Math.floor(S/3),n.face.materialIndex=p.materialIndex,t.push(n))}}else{const g=Math.max(0,d.start),v=Math.min(o.count,d.start+d.count);for(let p=g,m=v;p<m;p+=3){const y=o.getX(p),_=o.getX(p+1),S=o.getX(p+2);n=Pn(this,s,e,r,c,h,f,y,_,S),n&&(n.faceIndex=Math.floor(p/3),t.push(n))}}else if(l!==void 0)if(Array.isArray(s))for(let g=0,v=u.length;g<v;g++){const p=u[g],m=s[p.materialIndex],y=Math.max(p.start,d.start),_=Math.min(l.count,Math.min(p.start+p.count,d.start+d.count));for(let S=y,P=_;S<P;S+=3){const T=S,R=S+1,U=S+2;n=Pn(this,m,e,r,c,h,f,T,R,U),n&&(n.faceIndex=Math.floor(S/3),n.face.materialIndex=p.materialIndex,t.push(n))}}else{const g=Math.max(0,d.start),v=Math.min(l.count,d.start+d.count);for(let p=g,m=v;p<m;p+=3){const y=p,_=p+1,S=p+2;n=Pn(this,s,e,r,c,h,f,y,_,S),n&&(n.faceIndex=Math.floor(p/3),t.push(n))}}}}function Kc(i,e,t,r,n,a,s,o){let l;if(e.side===1?l=r.intersectTriangle(s,a,n,!0,o):l=r.intersectTriangle(n,a,s,e.side===0,o),l===null)return null;Rn.copy(o),Rn.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Rn);return c<t.near||c>t.far?null:{distance:c,point:Rn.clone(),object:i}}function Pn(i,e,t,r,n,a,s,o,l,c){i.getVertexPosition(o,En),i.getVertexPosition(l,Tn),i.getVertexPosition(c,An);const h=Kc(i,e,t,r,En,Tn,An,Hs);if(h){const f=new w;Mi.getBarycoord(Hs,En,Tn,An,f),n&&(h.uv=Mi.getInterpolatedAttribute(n,o,l,c,f,new se)),a&&(h.uv1=Mi.getInterpolatedAttribute(a,o,l,c,f,new se)),s&&(h.normal=Mi.getInterpolatedAttribute(s,o,l,c,f,new w),h.normal.dot(r.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new w,materialIndex:0};Mi.getNormal(En,Tn,An,u.normal),h.face=u,h.barycoord=f}return h}let Ge=class Al extends pt{constructor(e=1,t=1,r=1,n=1,a=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:r,widthSegments:n,heightSegments:a,depthSegments:s};const o=this;n=Math.floor(n),a=Math.floor(a),s=Math.floor(s);const l=[],c=[],h=[],f=[];let u=0,d=0;g("z","y","x",-1,-1,r,t,e,s,a,0),g("z","y","x",1,-1,r,t,-e,s,a,1),g("x","z","y",1,1,e,r,t,n,s,2),g("x","z","y",1,-1,e,r,-t,n,s,3),g("x","y","z",1,-1,e,t,r,n,a,4),g("x","y","z",-1,-1,e,t,-r,n,a,5),this.setIndex(l),this.setAttribute("position",new Ke(c,3)),this.setAttribute("normal",new Ke(h,3)),this.setAttribute("uv",new Ke(f,2));function g(v,p,m,y,_,S,P,T,R,U,B){const x=S/R,E=P/U,F=S/2,z=P/2,V=T/2,Q=R+1,D=U+1;let $=0,G=0;const ue=new w;for(let de=0;de<D;de++){const Ie=de*E-z;for(let ke=0;ke<Q;ke++){const rt=ke*x-F;ue[v]=rt*y,ue[p]=Ie*_,ue[m]=V,c.push(ue.x,ue.y,ue.z),ue[v]=0,ue[p]=0,ue[m]=T>0?1:-1,h.push(ue.x,ue.y,ue.z),f.push(ke/R),f.push(1-de/U),$+=1}}for(let de=0;de<U;de++)for(let Ie=0;Ie<R;Ie++){const ke=u+Ie+Q*de,rt=u+Ie+Q*(de+1),K=u+(Ie+1)+Q*(de+1),ce=u+(Ie+1)+Q*de;l.push(ke,rt,ce),l.push(rt,K,ce),G+=6}o.addGroup(d,G,B),d+=G,u+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Al(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Ri(i){const e={};for(const t in i){e[t]={};for(const r in i[t]){const n=i[t][r];n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)?n.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][r]=null):e[t][r]=n.clone():Array.isArray(n)?e[t][r]=n.slice():e[t][r]=n}}return e}function Xt(i){const e={};for(let t=0;t<i.length;t++){const r=Ri(i[t]);for(const n in r)e[n]=r[n]}return e}function Jc(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Cl(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:nt.workingColorSpace}const en={clone:Ri,merge:Xt};var Zc=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Qc=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;let St=class extends ti{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Zc,this.fragmentShader=Qc,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ri(e.uniforms),this.uniformsGroups=Jc(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const n in this.uniforms){const a=this.uniforms[n].value;a&&a.isTexture?t.uniforms[n]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[n]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[n]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[n]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[n]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[n]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[n]={type:"m4",value:a.toArray()}:t.uniforms[n]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const r={};for(const n in this.extensions)this.extensions[n]===!0&&(r[n]=!0);return Object.keys(r).length>0&&(t.extensions=r),t}};class Rl extends wt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Mt,this.projectionMatrix=new Mt,this.projectionMatrixInverse=new Mt,this.coordinateSystem=2e3}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ur=new w,Ws=new se,Xs=new se;class Yt extends Rl{constructor(e=50,t=1,r=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=r,this.far=n,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ci*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ki*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ci*2*Math.atan(Math.tan(Ki*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,r){Ur.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ur.x,Ur.y).multiplyScalar(-e/Ur.z),Ur.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),r.set(Ur.x,Ur.y).multiplyScalar(-e/Ur.z)}getViewSize(e,t){return this.getViewBounds(e,Ws,Xs),t.subVectors(Xs,Ws)}setViewOffset(e,t,r,n,a,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=n,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ki*.5*this.fov)/this.zoom,r=2*t,n=this.aspect*r,a=-.5*n;const s=this.view;if(this.view!==null&&this.view.enabled){const l=s.fullWidth,c=s.fullHeight;a+=s.offsetX*n/l,t-=s.offsetY*r/c,n*=s.width/l,r*=s.height/c}const o=this.filmOffset;o!==0&&(a+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+n,t,t-r,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const mi=-90,gi=1;let eh=class extends wt{constructor(e,t,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const n=new Yt(mi,gi,e,t);n.layers=this.layers,this.add(n);const a=new Yt(mi,gi,e,t);a.layers=this.layers,this.add(a);const s=new Yt(mi,gi,e,t);s.layers=this.layers,this.add(s);const o=new Yt(mi,gi,e,t);o.layers=this.layers,this.add(o);const l=new Yt(mi,gi,e,t);l.layers=this.layers,this.add(l);const c=new Yt(mi,gi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[r,n,a,s,o,l]=t;for(const c of t)this.remove(c);if(e===2e3)r.up.set(0,1,0),r.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===2001)r.up.set(0,-1,0),r.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:n}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,s,o,l,c,h]=this.children,f=e.getRenderTarget(),u=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=r.texture.generateMipmaps;r.texture.generateMipmaps=!1,e.setRenderTarget(r,0,n),e.render(t,a),e.setRenderTarget(r,1,n),e.render(t,s),e.setRenderTarget(r,2,n),e.render(t,o),e.setRenderTarget(r,3,n),e.render(t,l),e.setRenderTarget(r,4,n),e.render(t,c),r.texture.generateMipmaps=v,e.setRenderTarget(r,5,n),e.render(t,h),e.setRenderTarget(f,u,d),e.xr.enabled=g,r.texture.needsPMREMUpdate=!0}};class Pl extends Kt{constructor(e,t,r,n,a,s,o,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:301,super(e,t,r,n,a,s,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}let th=class extends ur{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const r={width:e,height:e,depth:1},n=[r,r,r,r,r,r];this.texture=new Pl(n,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:1006}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},n=new Ge(5,5,5),a=new St({name:"CubemapFromEquirect",uniforms:Ri(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:1,blending:0});a.uniforms.tEquirect.value=t;const s=new W(n,a),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=1006),new eh(1,10,this).update(e,s),t.minFilter=o,s.geometry.dispose(),s.material.dispose(),this}clear(e,t,r,n){const a=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,r,n);e.setRenderTarget(a)}};const Ra=new w,rh=new w,ih=new Qe;class Yr{constructor(e=new w(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,r,n){return this.normal.set(e,t,r),this.constant=n,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,r){const n=Ra.subVectors(r,t).cross(rh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(n,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const r=e.delta(Ra),n=this.normal.dot(r);if(n===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/n;return a<0||a>1?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return t<0&&r>0||r<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const r=t||ih.getNormalMatrix(e),n=this.coplanarPoint(Ra).applyMatrix4(e),a=this.normal.applyMatrix3(r).normalize();return this.constant=-n.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Xr=new ta,In=new w;class hs{constructor(e=new Yr,t=new Yr,r=new Yr,n=new Yr,a=new Yr,s=new Yr){this.planes=[e,t,r,n,a,s]}set(e,t,r,n,a,s){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(r),o[3].copy(n),o[4].copy(a),o[5].copy(s),this}copy(e){const t=this.planes;for(let r=0;r<6;r++)t[r].copy(e.planes[r]);return this}setFromProjectionMatrix(e,t=2e3){const r=this.planes,n=e.elements,a=n[0],s=n[1],o=n[2],l=n[3],c=n[4],h=n[5],f=n[6],u=n[7],d=n[8],g=n[9],v=n[10],p=n[11],m=n[12],y=n[13],_=n[14],S=n[15];if(r[0].setComponents(l-a,u-c,p-d,S-m).normalize(),r[1].setComponents(l+a,u+c,p+d,S+m).normalize(),r[2].setComponents(l+s,u+h,p+g,S+y).normalize(),r[3].setComponents(l-s,u-h,p-g,S-y).normalize(),r[4].setComponents(l-o,u-f,p-v,S-_).normalize(),t===2e3)r[5].setComponents(l+o,u+f,p+v,S+_).normalize();else if(t===2001)r[5].setComponents(o,f,v,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Xr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Xr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Xr)}intersectsSprite(e){return Xr.center.set(0,0,0),Xr.radius=.7071067811865476,Xr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Xr)}intersectsSphere(e){const t=this.planes,r=e.center,n=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(r)<n)return!1;return!0}intersectsBox(e){const t=this.planes;for(let r=0;r<6;r++){const n=t[r];if(In.x=n.normal.x>0?e.max.x:e.min.x,In.y=n.normal.y>0?e.max.y:e.min.y,In.z=n.normal.z>0?e.max.z:e.min.z,n.distanceToPoint(In)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let r=0;r<6;r++)if(t[r].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Il(){let i=null,e=!1,t=null,r=null;function n(a,s){t(a,s),r=i.requestAnimationFrame(n)}return{start:function(){e!==!0&&t!==null&&(r=i.requestAnimationFrame(n),e=!0)},stop:function(){i.cancelAnimationFrame(r),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){i=a}}}function nh(i){const e=new WeakMap;function t(o,l){const c=o.array,h=o.usage,f=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),o.onUploadCallback();let d;if(c instanceof Float32Array)d=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=i.SHORT;else if(c instanceof Uint32Array)d=i.UNSIGNED_INT;else if(c instanceof Int32Array)d=i.INT;else if(c instanceof Int8Array)d=i.BYTE;else if(c instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function r(o,l,c){const h=l.array,f=l.updateRanges;if(i.bindBuffer(c,o),f.length===0)i.bufferSubData(c,0,h);else{f.sort((d,g)=>d.start-g.start);let u=0;for(let d=1;d<f.length;d++){const g=f[u],v=f[d];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++u,f[u]=v)}f.length=u+1;for(let d=0,g=f.length;d<g;d++){const v=f[d];i.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function n(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function s(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(c.buffer,o,l),c.version=o.version}}return{get:n,remove:a,update:s}}let mt=class Ll extends pt{constructor(e=1,t=1,r=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:r,heightSegments:n};const a=e/2,s=t/2,o=Math.floor(r),l=Math.floor(n),c=o+1,h=l+1,f=e/o,u=t/l,d=[],g=[],v=[],p=[];for(let m=0;m<h;m++){const y=m*u-s;for(let _=0;_<c;_++){const S=_*f-a;g.push(S,-y,0),v.push(0,0,1),p.push(_/o),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let y=0;y<o;y++){const _=y+c*m,S=y+c*(m+1),P=y+1+c*(m+1),T=y+1+c*m;d.push(_,S,T),d.push(S,P,T)}this.setIndex(d),this.setAttribute("position",new Ke(g,3)),this.setAttribute("normal",new Ke(v,3)),this.setAttribute("uv",new Ke(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ll(e.width,e.height,e.widthSegments,e.heightSegments)}};var ah=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,sh=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,oh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,lh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ch=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,hh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,uh=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,dh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ph=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,fh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,mh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,gh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,vh=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,_h=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,xh=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,yh=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Sh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Mh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,wh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,bh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Eh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Th=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Ah=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Ch=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Rh=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Ph=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Ih=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Lh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Uh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Nh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Dh="gl_FragColor = linearToOutputTexel( gl_FragColor );",Oh=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,zh=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Fh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Bh=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,kh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Gh=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Vh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Hh=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Wh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Xh=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,qh=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,jh=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,$h=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Yh=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Kh=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Jh=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Zh=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Qh=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,eu=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,tu=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ru=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,iu=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,nu=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,au=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,su=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ou=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,lu=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,cu=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,hu=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,uu=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,du=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,pu=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,fu=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,mu=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,gu=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,vu=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,_u=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,xu=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,yu=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Su=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Mu=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,wu=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,bu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Eu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Tu=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Au=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Cu=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ru=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Pu=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Iu=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Lu=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Uu=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Nu=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Du=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ou=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,zu=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Fu=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Bu=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ku=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Gu=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Vu=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Hu=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Wu=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Xu=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,qu=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ju=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,$u=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Yu=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ku=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ju=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Zu=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Qu=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,ed=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,td=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,rd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,id=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const nd=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ad=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,od=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ld=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cd=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hd=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,ud=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,dd=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,pd=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,fd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,md=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gd=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,vd=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,_d=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,xd=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yd=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Sd=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Md=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,wd=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bd=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Ed=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Td=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ad=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cd=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Rd=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pd=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Id=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ld=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Ud=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Nd=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Dd=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Od=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,zd=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ze={alphahash_fragment:ah,alphahash_pars_fragment:sh,alphamap_fragment:oh,alphamap_pars_fragment:lh,alphatest_fragment:ch,alphatest_pars_fragment:hh,aomap_fragment:uh,aomap_pars_fragment:dh,batching_pars_vertex:ph,batching_vertex:fh,begin_vertex:mh,beginnormal_vertex:gh,bsdfs:vh,iridescence_fragment:_h,bumpmap_pars_fragment:xh,clipping_planes_fragment:yh,clipping_planes_pars_fragment:Sh,clipping_planes_pars_vertex:Mh,clipping_planes_vertex:wh,color_fragment:bh,color_pars_fragment:Eh,color_pars_vertex:Th,color_vertex:Ah,common:Ch,cube_uv_reflection_fragment:Rh,defaultnormal_vertex:Ph,displacementmap_pars_vertex:Ih,displacementmap_vertex:Lh,emissivemap_fragment:Uh,emissivemap_pars_fragment:Nh,colorspace_fragment:Dh,colorspace_pars_fragment:Oh,envmap_fragment:zh,envmap_common_pars_fragment:Fh,envmap_pars_fragment:Bh,envmap_pars_vertex:kh,envmap_physical_pars_fragment:Jh,envmap_vertex:Gh,fog_vertex:Vh,fog_pars_vertex:Hh,fog_fragment:Wh,fog_pars_fragment:Xh,gradientmap_pars_fragment:qh,lightmap_pars_fragment:jh,lights_lambert_fragment:$h,lights_lambert_pars_fragment:Yh,lights_pars_begin:Kh,lights_toon_fragment:Zh,lights_toon_pars_fragment:Qh,lights_phong_fragment:eu,lights_phong_pars_fragment:tu,lights_physical_fragment:ru,lights_physical_pars_fragment:iu,lights_fragment_begin:nu,lights_fragment_maps:au,lights_fragment_end:su,logdepthbuf_fragment:ou,logdepthbuf_pars_fragment:lu,logdepthbuf_pars_vertex:cu,logdepthbuf_vertex:hu,map_fragment:uu,map_pars_fragment:du,map_particle_fragment:pu,map_particle_pars_fragment:fu,metalnessmap_fragment:mu,metalnessmap_pars_fragment:gu,morphinstance_vertex:vu,morphcolor_vertex:_u,morphnormal_vertex:xu,morphtarget_pars_vertex:yu,morphtarget_vertex:Su,normal_fragment_begin:Mu,normal_fragment_maps:wu,normal_pars_fragment:bu,normal_pars_vertex:Eu,normal_vertex:Tu,normalmap_pars_fragment:Au,clearcoat_normal_fragment_begin:Cu,clearcoat_normal_fragment_maps:Ru,clearcoat_pars_fragment:Pu,iridescence_pars_fragment:Iu,opaque_fragment:Lu,packing:Uu,premultiplied_alpha_fragment:Nu,project_vertex:Du,dithering_fragment:Ou,dithering_pars_fragment:zu,roughnessmap_fragment:Fu,roughnessmap_pars_fragment:Bu,shadowmap_pars_fragment:ku,shadowmap_pars_vertex:Gu,shadowmap_vertex:Vu,shadowmask_pars_fragment:Hu,skinbase_vertex:Wu,skinning_pars_vertex:Xu,skinning_vertex:qu,skinnormal_vertex:ju,specularmap_fragment:$u,specularmap_pars_fragment:Yu,tonemapping_fragment:Ku,tonemapping_pars_fragment:Ju,transmission_fragment:Zu,transmission_pars_fragment:Qu,uv_pars_fragment:ed,uv_pars_vertex:td,uv_vertex:rd,worldpos_vertex:id,background_vert:nd,background_frag:ad,backgroundCube_vert:sd,backgroundCube_frag:od,cube_vert:ld,cube_frag:cd,depth_vert:hd,depth_frag:ud,distanceRGBA_vert:dd,distanceRGBA_frag:pd,equirect_vert:fd,equirect_frag:md,linedashed_vert:gd,linedashed_frag:vd,meshbasic_vert:_d,meshbasic_frag:xd,meshlambert_vert:yd,meshlambert_frag:Sd,meshmatcap_vert:Md,meshmatcap_frag:wd,meshnormal_vert:bd,meshnormal_frag:Ed,meshphong_vert:Td,meshphong_frag:Ad,meshphysical_vert:Cd,meshphysical_frag:Rd,meshtoon_vert:Pd,meshtoon_frag:Id,points_vert:Ld,points_frag:Ud,shadow_vert:Nd,shadow_frag:Dd,sprite_vert:Od,sprite_frag:zd},_e={common:{diffuse:{value:new ve(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Qe},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Qe}},envmap:{envMap:{value:null},envMapRotation:{value:new Qe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Qe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Qe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Qe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Qe},normalScale:{value:new se(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Qe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Qe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Qe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Qe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ve(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ve(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0},uvTransform:{value:new Qe}},sprite:{diffuse:{value:new ve(16777215)},opacity:{value:1},center:{value:new se(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Qe},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0}}},dr={basic:{uniforms:Xt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.fog]),vertexShader:Ze.meshbasic_vert,fragmentShader:Ze.meshbasic_frag},lambert:{uniforms:Xt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new ve(0)}}]),vertexShader:Ze.meshlambert_vert,fragmentShader:Ze.meshlambert_frag},phong:{uniforms:Xt([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new ve(0)},specular:{value:new ve(1118481)},shininess:{value:30}}]),vertexShader:Ze.meshphong_vert,fragmentShader:Ze.meshphong_frag},standard:{uniforms:Xt([_e.common,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.roughnessmap,_e.metalnessmap,_e.fog,_e.lights,{emissive:{value:new ve(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag},toon:{uniforms:Xt([_e.common,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.gradientmap,_e.fog,_e.lights,{emissive:{value:new ve(0)}}]),vertexShader:Ze.meshtoon_vert,fragmentShader:Ze.meshtoon_frag},matcap:{uniforms:Xt([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,{matcap:{value:null}}]),vertexShader:Ze.meshmatcap_vert,fragmentShader:Ze.meshmatcap_frag},points:{uniforms:Xt([_e.points,_e.fog]),vertexShader:Ze.points_vert,fragmentShader:Ze.points_frag},dashed:{uniforms:Xt([_e.common,_e.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ze.linedashed_vert,fragmentShader:Ze.linedashed_frag},depth:{uniforms:Xt([_e.common,_e.displacementmap]),vertexShader:Ze.depth_vert,fragmentShader:Ze.depth_frag},normal:{uniforms:Xt([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,{opacity:{value:1}}]),vertexShader:Ze.meshnormal_vert,fragmentShader:Ze.meshnormal_frag},sprite:{uniforms:Xt([_e.sprite,_e.fog]),vertexShader:Ze.sprite_vert,fragmentShader:Ze.sprite_frag},background:{uniforms:{uvTransform:{value:new Qe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ze.background_vert,fragmentShader:Ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Qe}},vertexShader:Ze.backgroundCube_vert,fragmentShader:Ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ze.cube_vert,fragmentShader:Ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ze.equirect_vert,fragmentShader:Ze.equirect_frag},distanceRGBA:{uniforms:Xt([_e.common,_e.displacementmap,{referencePosition:{value:new w},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ze.distanceRGBA_vert,fragmentShader:Ze.distanceRGBA_frag},shadow:{uniforms:Xt([_e.lights,_e.fog,{color:{value:new ve(0)},opacity:{value:1}}]),vertexShader:Ze.shadow_vert,fragmentShader:Ze.shadow_frag}};dr.physical={uniforms:Xt([dr.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Qe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Qe},clearcoatNormalScale:{value:new se(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Qe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Qe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Qe},sheen:{value:0},sheenColor:{value:new ve(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Qe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Qe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Qe},transmissionSamplerSize:{value:new se},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Qe},attenuationDistance:{value:0},attenuationColor:{value:new ve(0)},specularColor:{value:new ve(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Qe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Qe},anisotropyVector:{value:new se},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Qe}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag};const Ln={r:0,b:0,g:0},qr=new Or,Fd=new Mt;function Bd(i,e,t,r,n,a,s){const o=new ve(0);let l=a===!0?0:1,c,h,f=null,u=0,d=null;function g(y){let _=y.isScene===!0?y.background:null;return _&&_.isTexture&&(_=(y.backgroundBlurriness>0?t:e).get(_)),_}function v(y){let _=!1;const S=g(y);S===null?m(o,l):S&&S.isColor&&(m(S,1),_=!0);const P=i.xr.getEnvironmentBlendMode();P==="additive"?r.buffers.color.setClear(0,0,0,1,s):P==="alpha-blend"&&r.buffers.color.setClear(0,0,0,0,s),(i.autoClear||_)&&(r.buffers.depth.setTest(!0),r.buffers.depth.setMask(!0),r.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function p(y,_){const S=g(_);S&&(S.isCubeTexture||S.mapping===306)?(h===void 0&&(h=new W(new Ge(1,1,1),new St({name:"BackgroundCubeMaterial",uniforms:Ri(dr.backgroundCube.uniforms),vertexShader:dr.backgroundCube.vertexShader,fragmentShader:dr.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(P,T,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(h)),qr.copy(_.backgroundRotation),qr.x*=-1,qr.y*=-1,qr.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(qr.y*=-1,qr.z*=-1),h.material.uniforms.envMap.value=S,h.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Fd.makeRotationFromEuler(qr)),h.material.toneMapped=nt.getTransfer(S.colorSpace)!==dt,(f!==S||u!==S.version||d!==i.toneMapping)&&(h.material.needsUpdate=!0,f=S,u=S.version,d=i.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new W(new mt(2,2),new St({name:"BackgroundMaterial",uniforms:Ri(dr.background.uniforms),vertexShader:dr.background.vertexShader,fragmentShader:dr.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=nt.getTransfer(S.colorSpace)!==dt,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(f!==S||u!==S.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,f=S,u=S.version,d=i.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function m(y,_){y.getRGB(Ln,Cl(i)),r.buffers.color.setClear(Ln.r,Ln.g,Ln.b,_,s)}return{getClearColor:function(){return o},setClearColor:function(y,_=1){o.set(y),l=_,m(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,m(o,l)},render:v,addToRenderList:p}}function kd(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),r={},n=u(null);let a=n,s=!1;function o(x,E,F,z,V){let Q=!1;const D=f(z,F,E);a!==D&&(a=D,c(a.object)),Q=d(x,z,F,V),Q&&g(x,z,F,V),V!==null&&e.update(V,i.ELEMENT_ARRAY_BUFFER),(Q||s)&&(s=!1,S(x,E,F,z),V!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(V).buffer))}function l(){return i.createVertexArray()}function c(x){return i.bindVertexArray(x)}function h(x){return i.deleteVertexArray(x)}function f(x,E,F){const z=F.wireframe===!0;let V=r[x.id];V===void 0&&(V={},r[x.id]=V);let Q=V[E.id];Q===void 0&&(Q={},V[E.id]=Q);let D=Q[z];return D===void 0&&(D=u(l()),Q[z]=D),D}function u(x){const E=[],F=[],z=[];for(let V=0;V<t;V++)E[V]=0,F[V]=0,z[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:E,enabledAttributes:F,attributeDivisors:z,object:x,attributes:{},index:null}}function d(x,E,F,z){const V=a.attributes,Q=E.attributes;let D=0;const $=F.getAttributes();for(const G in $)if($[G].location>=0){const ue=V[G];let de=Q[G];if(de===void 0&&(G==="instanceMatrix"&&x.instanceMatrix&&(de=x.instanceMatrix),G==="instanceColor"&&x.instanceColor&&(de=x.instanceColor)),ue===void 0||ue.attribute!==de||de&&ue.data!==de.data)return!0;D++}return a.attributesNum!==D||a.index!==z}function g(x,E,F,z){const V={},Q=E.attributes;let D=0;const $=F.getAttributes();for(const G in $)if($[G].location>=0){let ue=Q[G];ue===void 0&&(G==="instanceMatrix"&&x.instanceMatrix&&(ue=x.instanceMatrix),G==="instanceColor"&&x.instanceColor&&(ue=x.instanceColor));const de={};de.attribute=ue,ue&&ue.data&&(de.data=ue.data),V[G]=de,D++}a.attributes=V,a.attributesNum=D,a.index=z}function v(){const x=a.newAttributes;for(let E=0,F=x.length;E<F;E++)x[E]=0}function p(x){m(x,0)}function m(x,E){const F=a.newAttributes,z=a.enabledAttributes,V=a.attributeDivisors;F[x]=1,z[x]===0&&(i.enableVertexAttribArray(x),z[x]=1),V[x]!==E&&(i.vertexAttribDivisor(x,E),V[x]=E)}function y(){const x=a.newAttributes,E=a.enabledAttributes;for(let F=0,z=E.length;F<z;F++)E[F]!==x[F]&&(i.disableVertexAttribArray(F),E[F]=0)}function _(x,E,F,z,V,Q,D){D===!0?i.vertexAttribIPointer(x,E,F,V,Q):i.vertexAttribPointer(x,E,F,z,V,Q)}function S(x,E,F,z){v();const V=z.attributes,Q=F.getAttributes(),D=E.defaultAttributeValues;for(const $ in Q){const G=Q[$];if(G.location>=0){let ue=V[$];if(ue===void 0&&($==="instanceMatrix"&&x.instanceMatrix&&(ue=x.instanceMatrix),$==="instanceColor"&&x.instanceColor&&(ue=x.instanceColor)),ue!==void 0){const de=ue.normalized,Ie=ue.itemSize,ke=e.get(ue);if(ke===void 0)continue;const rt=ke.buffer,K=ke.type,ce=ke.bytesPerElement,xe=K===i.INT||K===i.UNSIGNED_INT||ue.gpuType===1013;if(ue.isInterleavedBufferAttribute){const pe=ue.data,Fe=pe.stride,Ne=ue.offset;if(pe.isInstancedInterleavedBuffer){for(let Be=0;Be<G.locationSize;Be++)m(G.location+Be,pe.meshPerAttribute);x.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=pe.meshPerAttribute*pe.count)}else for(let Be=0;Be<G.locationSize;Be++)p(G.location+Be);i.bindBuffer(i.ARRAY_BUFFER,rt);for(let Be=0;Be<G.locationSize;Be++)_(G.location+Be,Ie/G.locationSize,K,de,Fe*ce,(Ne+Ie/G.locationSize*Be)*ce,xe)}else{if(ue.isInstancedBufferAttribute){for(let pe=0;pe<G.locationSize;pe++)m(G.location+pe,ue.meshPerAttribute);x.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let pe=0;pe<G.locationSize;pe++)p(G.location+pe);i.bindBuffer(i.ARRAY_BUFFER,rt);for(let pe=0;pe<G.locationSize;pe++)_(G.location+pe,Ie/G.locationSize,K,de,Ie*ce,Ie/G.locationSize*pe*ce,xe)}}else if(D!==void 0){const de=D[$];if(de!==void 0)switch(de.length){case 2:i.vertexAttrib2fv(G.location,de);break;case 3:i.vertexAttrib3fv(G.location,de);break;case 4:i.vertexAttrib4fv(G.location,de);break;default:i.vertexAttrib1fv(G.location,de)}}}}y()}function P(){U();for(const x in r){const E=r[x];for(const F in E){const z=E[F];for(const V in z)h(z[V].object),delete z[V];delete E[F]}delete r[x]}}function T(x){if(r[x.id]===void 0)return;const E=r[x.id];for(const F in E){const z=E[F];for(const V in z)h(z[V].object),delete z[V];delete E[F]}delete r[x.id]}function R(x){for(const E in r){const F=r[E];if(F[x.id]===void 0)continue;const z=F[x.id];for(const V in z)h(z[V].object),delete z[V];delete F[x.id]}}function U(){B(),s=!0,a!==n&&(a=n,c(a.object))}function B(){n.geometry=null,n.program=null,n.wireframe=!1}return{setup:o,reset:U,resetDefaultState:B,dispose:P,releaseStatesOfGeometry:T,releaseStatesOfProgram:R,initAttributes:v,enableAttribute:p,disableUnusedAttributes:y}}function Gd(i,e,t){let r;function n(c){r=c}function a(c,h){i.drawArrays(r,c,h),t.update(h,r,1)}function s(c,h,f){f!==0&&(i.drawArraysInstanced(r,c,h,f),t.update(h,r,f))}function o(c,h,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,c,0,h,0,f);let u=0;for(let d=0;d<f;d++)u+=h[d];t.update(u,r,1)}function l(c,h,f,u){if(f===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<c.length;g++)s(c[g],h[g],u[g]);else{d.multiDrawArraysInstancedWEBGL(r,c,0,h,0,u,0,f);let g=0;for(let v=0;v<f;v++)g+=h[v];for(let v=0;v<u.length;v++)t.update(g,r,u[v])}}this.setMode=n,this.render=a,this.renderInstances=s,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Vd(i,e,t,r){let n;function a(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(R){return!(R!==1023&&r.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const U=R===1016&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==1009&&r.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==1015&&!U)}function l(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const f=t.logarithmicDepthBuffer===!0,u=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control");if(u===!0){const R=e.get("EXT_clip_control");R.clipControlEXT(R.LOWER_LEFT_EXT,R.ZERO_TO_ONE_EXT)}const d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),_=i.getParameter(i.MAX_VARYING_VECTORS),S=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),P=g>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:l,textureFormatReadable:s,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reverseDepthBuffer:u,maxTextures:d,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:y,maxVaryings:_,maxFragmentUniforms:S,vertexTextures:P,maxSamples:T}}function Hd(i){const e=this;let t=null,r=0,n=!1,a=!1;const s=new Yr,o=new Qe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){const d=f.length!==0||u||r!==0||n;return n=u,r=f.length,d},this.beginShadows=function(){a=!0,h(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(f,u){t=h(f,u,0)},this.setState=function(f,u,d){const g=f.clippingPlanes,v=f.clipIntersection,p=f.clipShadows,m=i.get(f);if(!n||g===null||g.length===0||a&&!p)a?h(null):c();else{const y=a?0:r,_=y*4;let S=m.clippingState||null;l.value=S,S=h(g,u,_,d);for(let P=0;P!==_;++P)S[P]=t[P];m.clippingState=S,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=r>0),e.numPlanes=r,e.numIntersection=0}function h(f,u,d,g){const v=f!==null?f.length:0;let p=null;if(v!==0){if(p=l.value,g!==!0||p===null){const m=d+v*4,y=u.matrixWorldInverse;o.getNormalMatrix(y),(p===null||p.length<m)&&(p=new Float32Array(m));for(let _=0,S=d;_!==v;++_,S+=4)s.copy(f[_]).applyMatrix4(y,o),s.normal.toArray(p,S),p[S+3]=s.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,p}}function Wd(i){let e=new WeakMap;function t(s,o){return o===303?s.mapping=301:o===304&&(s.mapping=302),s}function r(s){if(s&&s.isTexture){const o=s.mapping;if(o===303||o===304)if(e.has(s)){const l=e.get(s).texture;return t(l,s.mapping)}else{const l=s.image;if(l&&l.height>0){const c=new th(l.height);return c.fromEquirectangularTexture(i,s),e.set(s,c),s.addEventListener("dispose",n),t(c.texture,s.mapping)}else return null}}return s}function n(s){const o=s.target;o.removeEventListener("dispose",n);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function a(){e=new WeakMap}return{get:r,dispose:a}}class us extends Rl{constructor(e=-1,t=1,r=1,n=-1,a=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=r,this.bottom=n,this.near=a,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,r,n,a,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=n,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,n=(this.top+this.bottom)/2;let a=r-e,s=r+e,o=n+t,l=n-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=c*this.view.offsetX,s=a+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(a,s,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const bi=4,qs=[.125,.215,.35,.446,.526,.582],Jr=20,Pa=new us,js=new ve;let Ia=null,La=0,Ua=0,Na=!1;const Kr=(1+Math.sqrt(5))/2,vi=1/Kr,$s=[new w(-Kr,vi,0),new w(Kr,vi,0),new w(-vi,0,Kr),new w(vi,0,Kr),new w(0,Kr,-vi),new w(0,Kr,vi),new w(-1,1,-1),new w(1,1,-1),new w(-1,1,1),new w(1,1,1)];let Ys=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,r=.1,n=100){Ia=this._renderer.getRenderTarget(),La=this._renderer.getActiveCubeFace(),Ua=this._renderer.getActiveMipmapLevel(),Na=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const a=this._allocateTargets();return a.depthBuffer=!0,this._sceneToCubeUV(e,r,n,a),t>0&&this._blur(a,0,0,t),this._applyPMREM(a),this._cleanup(a),a}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Zs(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Js(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ia,La,Ua),this._renderer.xr.enabled=Na,e.scissorTest=!1,Un(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ia=this._renderer.getRenderTarget(),La=this._renderer.getActiveCubeFace(),Ua=this._renderer.getActiveMipmapLevel(),Na=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const r=t||this._allocateTargets();return this._textureToCubeUV(e,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,r={magFilter:1006,minFilter:1006,generateMipmaps:!1,type:1016,format:1023,colorSpace:Fr,depthBuffer:!1},n=Ks(e,t,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ks(e,t,r);const{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Xd(a)),this._blurMaterial=qd(a,e,t)}return n}_compileMaterial(e){const t=new W(this._lodPlanes[0],e);this._renderer.compile(t,Pa)}_sceneToCubeUV(e,t,r,n){const a=new Yt(90,1,t,r),s=[1,-1,1,1,1,1],o=[1,1,1,-1,-1,-1],l=this._renderer,c=l.autoClear,h=l.toneMapping;l.getClearColor(js),l.toneMapping=0,l.autoClear=!1;const f=new ut({name:"PMREM.Background",side:1,depthWrite:!1,depthTest:!1}),u=new W(new Ge,f);let d=!1;const g=e.background;g?g.isColor&&(f.color.copy(g),e.background=null,d=!0):(f.color.copy(js),d=!0);for(let v=0;v<6;v++){const p=v%3;p===0?(a.up.set(0,s[v],0),a.lookAt(o[v],0,0)):p===1?(a.up.set(0,0,s[v]),a.lookAt(0,o[v],0)):(a.up.set(0,s[v],0),a.lookAt(0,0,o[v]));const m=this._cubeSize;Un(n,p*m,v>2?m:0,m,m),l.setRenderTarget(n),d&&l.render(u,a),l.render(e,a)}u.geometry.dispose(),u.material.dispose(),l.toneMapping=h,l.autoClear=c,e.background=g}_textureToCubeUV(e,t){const r=this._renderer,n=e.mapping===301||e.mapping===302;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=Zs()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Js());const a=n?this._cubemapMaterial:this._equirectMaterial,s=new W(this._lodPlanes[0],a),o=a.uniforms;o.envMap.value=e;const l=this._cubeSize;Un(t,0,0,3*l,2*l),r.setRenderTarget(t),r.render(s,Pa)}_applyPMREM(e){const t=this._renderer,r=t.autoClear;t.autoClear=!1;const n=this._lodPlanes.length;for(let a=1;a<n;a++){const s=Math.sqrt(this._sigmas[a]*this._sigmas[a]-this._sigmas[a-1]*this._sigmas[a-1]),o=$s[(n-a-1)%$s.length];this._blur(e,a-1,a,s,o)}t.autoClear=r}_blur(e,t,r,n,a){const s=this._pingPongRenderTarget;this._halfBlur(e,s,t,r,n,"latitudinal",a),this._halfBlur(s,e,r,r,n,"longitudinal",a)}_halfBlur(e,t,r,n,a,s,o){const l=this._renderer,c=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,f=new W(this._lodPlanes[n],c),u=c.uniforms,d=this._sizeLods[r]-1,g=isFinite(a)?Math.PI/(2*d):2*Math.PI/(2*Jr-1),v=a/g,p=isFinite(a)?1+Math.floor(h*v):Jr;p>Jr&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Jr}`);const m=[];let y=0;for(let R=0;R<Jr;++R){const U=R/v,B=Math.exp(-U*U/2);m.push(B),R===0?y+=B:R<p&&(y+=2*B)}for(let R=0;R<m.length;R++)m[R]=m[R]/y;u.envMap.value=e.texture,u.samples.value=p,u.weights.value=m,u.latitudinal.value=s==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:_}=this;u.dTheta.value=g,u.mipInt.value=_-r;const S=this._sizeLods[n],P=3*S*(n>_-bi?n-_+bi:0),T=4*(this._cubeSize-S);Un(t,P,T,3*S,2*S),l.setRenderTarget(t),l.render(f,Pa)}};function Xd(i){const e=[],t=[],r=[];let n=i;const a=i-bi+1+qs.length;for(let s=0;s<a;s++){const o=Math.pow(2,n);t.push(o);let l=1/o;s>i-bi?l=qs[s-i+bi-1]:s===0&&(l=0),r.push(l);const c=1/(o-2),h=-c,f=1+c,u=[h,h,f,h,f,f,h,h,f,f,h,f],d=6,g=6,v=3,p=2,m=1,y=new Float32Array(v*g*d),_=new Float32Array(p*g*d),S=new Float32Array(m*g*d);for(let T=0;T<d;T++){const R=T%3*2/3-1,U=T>2?0:-1,B=[R,U,0,R+2/3,U,0,R+2/3,U+1,0,R,U,0,R+2/3,U+1,0,R,U+1,0];y.set(B,v*g*T),_.set(u,p*g*T);const x=[T,T,T,T,T,T];S.set(x,m*g*T)}const P=new pt;P.setAttribute("position",new Zt(y,v)),P.setAttribute("uv",new Zt(_,p)),P.setAttribute("faceIndex",new Zt(S,m)),e.push(P),n>bi&&n--}return{lodPlanes:e,sizeLods:t,sigmas:r}}function Ks(i,e,t){const r=new ur(i,e,t);return r.texture.mapping=306,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function Un(i,e,t,r,n){i.viewport.set(e,t,r,n),i.scissor.set(e,t,r,n)}function qd(i,e,t){const r=new Float32Array(Jr),n=new w(0,1,0);return new St({name:"SphericalGaussianBlur",defines:{n:Jr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:n}},vertexShader:ds(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Js(){return new St({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ds(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Zs(){return new St({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ds(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function ds(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function jd(i){let e=new WeakMap,t=null;function r(o){if(o&&o.isTexture){const l=o.mapping,c=l===303||l===304,h=l===301||l===302;if(c||h){let f=e.get(o);const u=f!==void 0?f.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==u)return t===null&&(t=new Ys(i)),f=c?t.fromEquirectangular(o,f):t.fromCubemap(o,f),f.texture.pmremVersion=o.pmremVersion,e.set(o,f),f.texture;if(f!==void 0)return f.texture;{const d=o.image;return c&&d&&d.height>0||h&&d&&n(d)?(t===null&&(t=new Ys(i)),f=c?t.fromEquirectangular(o):t.fromCubemap(o),f.texture.pmremVersion=o.pmremVersion,e.set(o,f),o.addEventListener("dispose",a),f.texture):null}}}return o}function n(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function a(o){const l=o.target;l.removeEventListener("dispose",a);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function s(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:r,dispose:s}}function $d(i){const e={};function t(r){if(e[r]!==void 0)return e[r];let n;switch(r){case"WEBGL_depth_texture":n=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":n=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":n=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":n=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:n=i.getExtension(r)}return e[r]=n,n}return{has:function(r){return t(r)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(r){const n=t(r);return n===null&&Xn("THREE.WebGLRenderer: "+r+" extension not supported."),n}}}function Yd(i,e,t,r){const n={},a=new WeakMap;function s(f){const u=f.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);for(const g in u.morphAttributes){const v=u.morphAttributes[g];for(let p=0,m=v.length;p<m;p++)e.remove(v[p])}u.removeEventListener("dispose",s),delete n[u.id];const d=a.get(u);d&&(e.remove(d),a.delete(u)),r.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(f,u){return n[u.id]===!0||(u.addEventListener("dispose",s),n[u.id]=!0,t.memory.geometries++),u}function l(f){const u=f.attributes;for(const g in u)e.update(u[g],i.ARRAY_BUFFER);const d=f.morphAttributes;for(const g in d){const v=d[g];for(let p=0,m=v.length;p<m;p++)e.update(v[p],i.ARRAY_BUFFER)}}function c(f){const u=[],d=f.index,g=f.attributes.position;let v=0;if(d!==null){const y=d.array;v=d.version;for(let _=0,S=y.length;_<S;_+=3){const P=y[_+0],T=y[_+1],R=y[_+2];u.push(P,T,T,R,R,P)}}else if(g!==void 0){const y=g.array;v=g.version;for(let _=0,S=y.length/3-1;_<S;_+=3){const P=_+0,T=_+1,R=_+2;u.push(P,T,T,R,R,P)}}else return;const p=new(vl(u)?El:bl)(u,1);p.version=v;const m=a.get(f);m&&e.remove(m),a.set(f,p)}function h(f){const u=a.get(f);if(u){const d=f.index;d!==null&&u.version<d.version&&c(f)}else c(f);return a.get(f)}return{get:o,update:l,getWireframeAttribute:h}}function Kd(i,e,t){let r;function n(u){r=u}let a,s;function o(u){a=u.type,s=u.bytesPerElement}function l(u,d){i.drawElements(r,d,a,u*s),t.update(d,r,1)}function c(u,d,g){g!==0&&(i.drawElementsInstanced(r,d,a,u*s,g),t.update(d,r,g))}function h(u,d,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,d,0,a,u,0,g);let v=0;for(let p=0;p<g;p++)v+=d[p];t.update(v,r,1)}function f(u,d,g,v){if(g===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<u.length;m++)c(u[m]/s,d[m],v[m]);else{p.multiDrawElementsInstancedWEBGL(r,d,0,a,u,0,v,0,g);let m=0;for(let y=0;y<g;y++)m+=d[y];for(let y=0;y<v.length;y++)t.update(m,r,v[y])}}this.setMode=n,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=f}function Jd(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function r(a,s,o){switch(t.calls++,s){case i.TRIANGLES:t.triangles+=o*(a/3);break;case i.LINES:t.lines+=o*(a/2);break;case i.LINE_STRIP:t.lines+=o*(a-1);break;case i.LINE_LOOP:t.lines+=o*a;break;case i.POINTS:t.points+=o*a;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",s);break}}function n(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:n,update:r}}function Zd(i,e,t){const r=new WeakMap,n=new ht;function a(s,o,l){const c=s.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=h!==void 0?h.length:0;let u=r.get(o);if(u===void 0||u.count!==f){let d=function(){U.dispose(),r.delete(o),o.removeEventListener("dispose",d)};u!==void 0&&u.texture.dispose();const g=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],y=o.morphAttributes.normal||[],_=o.morphAttributes.color||[];let S=0;g===!0&&(S=1),v===!0&&(S=2),p===!0&&(S=3);let P=o.attributes.position.count*S,T=1;P>e.maxTextureSize&&(T=Math.ceil(P/e.maxTextureSize),P=e.maxTextureSize);const R=new Float32Array(P*T*4*f),U=new xl(R,P,T,f);U.type=1015,U.needsUpdate=!0;const B=S*4;for(let x=0;x<f;x++){const E=m[x],F=y[x],z=_[x],V=P*T*4*x;for(let Q=0;Q<E.count;Q++){const D=Q*B;g===!0&&(n.fromBufferAttribute(E,Q),R[V+D+0]=n.x,R[V+D+1]=n.y,R[V+D+2]=n.z,R[V+D+3]=0),v===!0&&(n.fromBufferAttribute(F,Q),R[V+D+4]=n.x,R[V+D+5]=n.y,R[V+D+6]=n.z,R[V+D+7]=0),p===!0&&(n.fromBufferAttribute(z,Q),R[V+D+8]=n.x,R[V+D+9]=n.y,R[V+D+10]=n.z,R[V+D+11]=z.itemSize===4?n.w:1)}}u={count:f,texture:U,size:new se(P,T)},r.set(o,u),o.addEventListener("dispose",d)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",s.morphTexture,t);else{let d=0;for(let v=0;v<c.length;v++)d+=c[v];const g=o.morphTargetsRelative?1:1-d;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:a}}function Qd(i,e,t,r){let n=new WeakMap;function a(l){const c=r.render.frame,h=l.geometry,f=e.get(l,h);if(n.get(f)!==c&&(e.update(f),n.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),n.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),n.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;n.get(u)!==c&&(u.update(),n.set(u,c))}return f}function s(){n=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:a,dispose:s}}class Ul extends Kt{constructor(e,t,r,n,a,s,o,l,c,h=1026){if(h!==1026&&h!==1027)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");r===void 0&&h===1026&&(r=1014),r===void 0&&h===1027&&(r=1020),super(null,n,a,s,o,l,h,r,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:1003,this.minFilter=l!==void 0?l:1003,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Nl=new Kt,Qs=new Ul(1,1),Dl=new xl,Ol=new kc,zl=new Pl,eo=[],to=[],ro=new Float32Array(16),io=new Float32Array(9),no=new Float32Array(4);function Oi(i,e,t){const r=i[0];if(r<=0||r>0)return i;const n=e*t;let a=eo[n];if(a===void 0&&(a=new Float32Array(n),eo[n]=a),e!==0){r.toArray(a,0);for(let s=1,o=0;s!==e;++s)o+=t,i[s].toArray(a,o)}return a}function Nt(i,e){if(i.length!==e.length)return!1;for(let t=0,r=i.length;t<r;t++)if(i[t]!==e[t])return!1;return!0}function Dt(i,e){for(let t=0,r=e.length;t<r;t++)i[t]=e[t]}function ra(i,e){let t=to[e];t===void 0&&(t=new Int32Array(e),to[e]=t);for(let r=0;r!==e;++r)t[r]=i.allocateTextureUnit();return t}function ep(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function tp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;i.uniform2fv(this.addr,e),Dt(t,e)}}function rp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Nt(t,e))return;i.uniform3fv(this.addr,e),Dt(t,e)}}function ip(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;i.uniform4fv(this.addr,e),Dt(t,e)}}function np(i,e){const t=this.cache,r=e.elements;if(r===void 0){if(Nt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Dt(t,e)}else{if(Nt(t,r))return;no.set(r),i.uniformMatrix2fv(this.addr,!1,no),Dt(t,r)}}function ap(i,e){const t=this.cache,r=e.elements;if(r===void 0){if(Nt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Dt(t,e)}else{if(Nt(t,r))return;io.set(r),i.uniformMatrix3fv(this.addr,!1,io),Dt(t,r)}}function sp(i,e){const t=this.cache,r=e.elements;if(r===void 0){if(Nt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Dt(t,e)}else{if(Nt(t,r))return;ro.set(r),i.uniformMatrix4fv(this.addr,!1,ro),Dt(t,r)}}function op(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function lp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;i.uniform2iv(this.addr,e),Dt(t,e)}}function cp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;i.uniform3iv(this.addr,e),Dt(t,e)}}function hp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;i.uniform4iv(this.addr,e),Dt(t,e)}}function up(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function dp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;i.uniform2uiv(this.addr,e),Dt(t,e)}}function pp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;i.uniform3uiv(this.addr,e),Dt(t,e)}}function fp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;i.uniform4uiv(this.addr,e),Dt(t,e)}}function mp(i,e,t){const r=this.cache,n=t.allocateTextureUnit();r[0]!==n&&(i.uniform1i(this.addr,n),r[0]=n);let a;this.type===i.SAMPLER_2D_SHADOW?(Qs.compareFunction=515,a=Qs):a=Nl,t.setTexture2D(e||a,n)}function gp(i,e,t){const r=this.cache,n=t.allocateTextureUnit();r[0]!==n&&(i.uniform1i(this.addr,n),r[0]=n),t.setTexture3D(e||Ol,n)}function vp(i,e,t){const r=this.cache,n=t.allocateTextureUnit();r[0]!==n&&(i.uniform1i(this.addr,n),r[0]=n),t.setTextureCube(e||zl,n)}function _p(i,e,t){const r=this.cache,n=t.allocateTextureUnit();r[0]!==n&&(i.uniform1i(this.addr,n),r[0]=n),t.setTexture2DArray(e||Dl,n)}function xp(i){switch(i){case 5126:return ep;case 35664:return tp;case 35665:return rp;case 35666:return ip;case 35674:return np;case 35675:return ap;case 35676:return sp;case 5124:case 35670:return op;case 35667:case 35671:return lp;case 35668:case 35672:return cp;case 35669:case 35673:return hp;case 5125:return up;case 36294:return dp;case 36295:return pp;case 36296:return fp;case 35678:case 36198:case 36298:case 36306:case 35682:return mp;case 35679:case 36299:case 36307:return gp;case 35680:case 36300:case 36308:case 36293:return vp;case 36289:case 36303:case 36311:case 36292:return _p}}function yp(i,e){i.uniform1fv(this.addr,e)}function Sp(i,e){const t=Oi(e,this.size,2);i.uniform2fv(this.addr,t)}function Mp(i,e){const t=Oi(e,this.size,3);i.uniform3fv(this.addr,t)}function wp(i,e){const t=Oi(e,this.size,4);i.uniform4fv(this.addr,t)}function bp(i,e){const t=Oi(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Ep(i,e){const t=Oi(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Tp(i,e){const t=Oi(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Ap(i,e){i.uniform1iv(this.addr,e)}function Cp(i,e){i.uniform2iv(this.addr,e)}function Rp(i,e){i.uniform3iv(this.addr,e)}function Pp(i,e){i.uniform4iv(this.addr,e)}function Ip(i,e){i.uniform1uiv(this.addr,e)}function Lp(i,e){i.uniform2uiv(this.addr,e)}function Up(i,e){i.uniform3uiv(this.addr,e)}function Np(i,e){i.uniform4uiv(this.addr,e)}function Dp(i,e,t){const r=this.cache,n=e.length,a=ra(t,n);Nt(r,a)||(i.uniform1iv(this.addr,a),Dt(r,a));for(let s=0;s!==n;++s)t.setTexture2D(e[s]||Nl,a[s])}function Op(i,e,t){const r=this.cache,n=e.length,a=ra(t,n);Nt(r,a)||(i.uniform1iv(this.addr,a),Dt(r,a));for(let s=0;s!==n;++s)t.setTexture3D(e[s]||Ol,a[s])}function zp(i,e,t){const r=this.cache,n=e.length,a=ra(t,n);Nt(r,a)||(i.uniform1iv(this.addr,a),Dt(r,a));for(let s=0;s!==n;++s)t.setTextureCube(e[s]||zl,a[s])}function Fp(i,e,t){const r=this.cache,n=e.length,a=ra(t,n);Nt(r,a)||(i.uniform1iv(this.addr,a),Dt(r,a));for(let s=0;s!==n;++s)t.setTexture2DArray(e[s]||Dl,a[s])}function Bp(i){switch(i){case 5126:return yp;case 35664:return Sp;case 35665:return Mp;case 35666:return wp;case 35674:return bp;case 35675:return Ep;case 35676:return Tp;case 5124:case 35670:return Ap;case 35667:case 35671:return Cp;case 35668:case 35672:return Rp;case 35669:case 35673:return Pp;case 5125:return Ip;case 36294:return Lp;case 36295:return Up;case 36296:return Np;case 35678:case 36198:case 36298:case 36306:case 35682:return Dp;case 35679:case 36299:case 36307:return Op;case 35680:case 36300:case 36308:case 36293:return zp;case 36289:case 36303:case 36311:case 36292:return Fp}}class kp{constructor(e,t,r){this.id=e,this.addr=r,this.cache=[],this.type=t.type,this.setValue=xp(t.type)}}class Gp{constructor(e,t,r){this.id=e,this.addr=r,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Bp(t.type)}}class Vp{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,r){const n=this.seq;for(let a=0,s=n.length;a!==s;++a){const o=n[a];o.setValue(e,t[o.id],r)}}}const Da=/(\w+)(\])?(\[|\.)?/g;function ao(i,e){i.seq.push(e),i.map[e.id]=e}function Hp(i,e,t){const r=i.name,n=r.length;for(Da.lastIndex=0;;){const a=Da.exec(r),s=Da.lastIndex;let o=a[1];const l=a[2]==="]",c=a[3];if(l&&(o=o|0),c===void 0||c==="["&&s+2===n){ao(t,c===void 0?new kp(o,i,e):new Gp(o,i,e));break}else{let h=t.map[o];h===void 0&&(h=new Vp(o),ao(t,h)),t=h}}}let qn=class{constructor(e,t){this.seq=[],this.map={};const r=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let n=0;n<r;++n){const a=e.getActiveUniform(t,n),s=e.getUniformLocation(t,a.name);Hp(a,s,this)}}setValue(e,t,r,n){const a=this.map[t];a!==void 0&&a.setValue(e,r,n)}setOptional(e,t,r){const n=t[r];n!==void 0&&this.setValue(e,r,n)}static upload(e,t,r,n){for(let a=0,s=t.length;a!==s;++a){const o=t[a],l=r[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,n)}}static seqWithValue(e,t){const r=[];for(let n=0,a=e.length;n!==a;++n){const s=e[n];s.id in t&&r.push(s)}return r}};function so(i,e,t){const r=i.createShader(e);return i.shaderSource(r,t),i.compileShader(r),r}const Wp=37297;let Xp=0;function qp(i,e){const t=i.split(`
`),r=[],n=Math.max(e-6,0),a=Math.min(e+6,t.length);for(let s=n;s<a;s++){const o=s+1;r.push(`${o===e?">":" "} ${o}: ${t[s]}`)}return r.join(`
`)}function jp(i){const e=nt.getPrimaries(nt.workingColorSpace),t=nt.getPrimaries(i);let r;switch(e===t?r="":e===Kn&&t===Yn?r="LinearDisplayP3ToLinearSRGB":e===Yn&&t===Kn&&(r="LinearSRGBToLinearDisplayP3"),i){case Fr:case ea:return[r,"LinearTransferOETF"];case qt:case ls:return[r,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[r,"LinearTransferOETF"]}}function oo(i,e,t){const r=i.getShaderParameter(e,i.COMPILE_STATUS),n=i.getShaderInfoLog(e).trim();if(r&&n==="")return"";const a=/ERROR: 0:(\d+)/.exec(n);if(a){const s=parseInt(a[1]);return t.toUpperCase()+`

`+n+`

`+qp(i.getShaderSource(e),s)}else return n}function $p(i,e){const t=jp(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Yp(i,e){let t;switch(e){case 1:t="Linear";break;case 2:t="Reinhard";break;case 3:t="Cineon";break;case 4:t="ACESFilmic";break;case 6:t="AgX";break;case 7:t="Neutral";break;case 5:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Nn=new w;function Kp(){nt.getLuminanceCoefficients(Nn);const i=Nn.x.toFixed(4),e=Nn.y.toFixed(4),t=Nn.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Jp(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Yi).join(`
`)}function Zp(i){const e=[];for(const t in i){const r=i[t];r!==!1&&e.push("#define "+t+" "+r)}return e.join(`
`)}function Qp(i,e){const t={},r=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let n=0;n<r;n++){const a=i.getActiveAttrib(e,n),s=a.name;let o=1;a.type===i.FLOAT_MAT2&&(o=2),a.type===i.FLOAT_MAT3&&(o=3),a.type===i.FLOAT_MAT4&&(o=4),t[s]={type:a.type,location:i.getAttribLocation(e,s),locationSize:o}}return t}function Yi(i){return i!==""}function lo(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function co(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const ef=/^[ \t]*#include +<([\w\d./]+)>/gm;function $a(i){return i.replace(ef,rf)}const tf=new Map;function rf(i,e){let t=Ze[e];if(t===void 0){const r=tf.get(e);if(r!==void 0)t=Ze[r],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,r);else throw new Error("Can not resolve #include <"+e+">")}return $a(t)}const nf=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ho(i){return i.replace(nf,af)}function af(i,e,t,r){let n="";for(let a=parseInt(e);a<parseInt(t);a++)n+=r.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return n}function uo(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function sf(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===1?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===2?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===3&&(e="SHADOWMAP_TYPE_VSM"),e}function of(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case 301:case 302:e="ENVMAP_TYPE_CUBE";break;case 306:e="ENVMAP_TYPE_CUBE_UV";break}return e}function lf(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case 302:e="ENVMAP_MODE_REFRACTION";break}return e}function cf(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case 0:e="ENVMAP_BLENDING_MULTIPLY";break;case 1:e="ENVMAP_BLENDING_MIX";break;case 2:e="ENVMAP_BLENDING_ADD";break}return e}function hf(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,r=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:r,maxMip:t}}function uf(i,e,t,r){const n=i.getContext(),a=t.defines;let s=t.vertexShader,o=t.fragmentShader;const l=sf(t),c=of(t),h=lf(t),f=cf(t),u=hf(t),d=Jp(t),g=Zp(a),v=n.createProgram();let p,m,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Yi).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Yi).join(`
`),m.length>0&&(m+=`
`)):(p=[uo(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Yi).join(`
`),m=[uo(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==0?"#define TONE_MAPPING":"",t.toneMapping!==0?Ze.tonemapping_pars_fragment:"",t.toneMapping!==0?Yp("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ze.colorspace_pars_fragment,$p("linearToOutputTexel",t.outputColorSpace),Kp(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Yi).join(`
`)),s=$a(s),s=lo(s,t),s=co(s,t),o=$a(o),o=lo(o,t),o=co(o,t),s=ho(s),o=ho(o),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,p=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",t.glslVersion===As?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===As?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const _=y+p+s,S=y+m+o,P=so(n,n.VERTEX_SHADER,_),T=so(n,n.FRAGMENT_SHADER,S);n.attachShader(v,P),n.attachShader(v,T),t.index0AttributeName!==void 0?n.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&n.bindAttribLocation(v,0,"position"),n.linkProgram(v);function R(E){if(i.debug.checkShaderErrors){const F=n.getProgramInfoLog(v).trim(),z=n.getShaderInfoLog(P).trim(),V=n.getShaderInfoLog(T).trim();let Q=!0,D=!0;if(n.getProgramParameter(v,n.LINK_STATUS)===!1)if(Q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(n,v,P,T);else{const $=oo(n,P,"vertex"),G=oo(n,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(v,n.VALIDATE_STATUS)+`

Material Name: `+E.name+`
Material Type: `+E.type+`

Program Info Log: `+F+`
`+$+`
`+G)}else F!==""?console.warn("THREE.WebGLProgram: Program Info Log:",F):(z===""||V==="")&&(D=!1);D&&(E.diagnostics={runnable:Q,programLog:F,vertexShader:{log:z,prefix:p},fragmentShader:{log:V,prefix:m}})}n.deleteShader(P),n.deleteShader(T),U=new qn(n,v),B=Qp(n,v)}let U;this.getUniforms=function(){return U===void 0&&R(this),U};let B;this.getAttributes=function(){return B===void 0&&R(this),B};let x=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=n.getProgramParameter(v,Wp)),x},this.destroy=function(){r.releaseStatesOfProgram(this),n.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Xp++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=P,this.fragmentShader=T,this}let df=0;class pf{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,r=e.fragmentShader,n=this._getShaderStage(t),a=this._getShaderStage(r),s=this._getShaderCacheForMaterial(e);return s.has(n)===!1&&(s.add(n),n.usedTimes++),s.has(a)===!1&&(s.add(a),a.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const r of t)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let r=t.get(e);return r===void 0&&(r=new Set,t.set(e,r)),r}_getShaderStage(e){const t=this.shaderCache;let r=t.get(e);return r===void 0&&(r=new ff(e),t.set(e,r)),r}}class ff{constructor(e){this.id=df++,this.code=e,this.usedTimes=0}}function mf(i,e,t,r,n,a,s){const o=new Ml,l=new pf,c=new Set,h=[],f=n.logarithmicDepthBuffer,u=n.reverseDepthBuffer,d=n.vertexTextures;let g=n.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(x){return c.add(x),x===0?"uv":`uv${x}`}function m(x,E,F,z,V){const Q=z.fog,D=V.geometry,$=x.isMeshStandardMaterial?z.environment:null,G=(x.isMeshStandardMaterial?t:e).get(x.envMap||$),ue=G&&G.mapping===306?G.image.height:null,de=v[x.type];x.precision!==null&&(g=n.getMaxPrecision(x.precision),g!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",g,"instead."));const Ie=D.morphAttributes.position||D.morphAttributes.normal||D.morphAttributes.color,ke=Ie!==void 0?Ie.length:0;let rt=0;D.morphAttributes.position!==void 0&&(rt=1),D.morphAttributes.normal!==void 0&&(rt=2),D.morphAttributes.color!==void 0&&(rt=3);let K,ce,xe,pe;if(de){const ye=dr[de];K=ye.vertexShader,ce=ye.fragmentShader}else K=x.vertexShader,ce=x.fragmentShader,l.update(x),xe=l.getVertexShaderID(x),pe=l.getFragmentShaderID(x);const Fe=i.getRenderTarget(),Ne=V.isInstancedMesh===!0,Be=V.isBatchedMesh===!0,re=!!x.map,ie=!!x.matcap,C=!!G,Le=!!x.aoMap,ae=!!x.lightMap,be=!!x.bumpMap,fe=!!x.normalMap,ze=!!x.displacementMap,Ce=!!x.emissiveMap,A=!!x.metalnessMap,M=!!x.roughnessMap,O=x.anisotropy>0,j=x.clearcoat>0,oe=x.dispersion>0,J=x.iridescence>0,Pe=x.sheen>0,me=x.transmission>0,Ee=O&&!!x.anisotropyMap,Je=j&&!!x.clearcoatMap,le=j&&!!x.clearcoatNormalMap,Re=j&&!!x.clearcoatRoughnessMap,Ve=J&&!!x.iridescenceMap,We=J&&!!x.iridescenceThicknessMap,Te=Pe&&!!x.sheenColorMap,et=Pe&&!!x.sheenRoughnessMap,Ye=!!x.specularMap,at=!!x.specularColorMap,I=!!x.specularIntensityMap,Me=me&&!!x.transmissionMap,X=me&&!!x.thicknessMap,te=!!x.gradientMap,Se=!!x.alphaMap,ge=x.alphaTest>0,st=!!x.alphaHash,Y=!!x.extensions;let ee=0;x.toneMapped&&(Fe===null||Fe.isXRRenderTarget===!0)&&(ee=i.toneMapping);const Z={shaderID:de,shaderType:x.type,shaderName:x.name,vertexShader:K,fragmentShader:ce,defines:x.defines,customVertexShaderID:xe,customFragmentShaderID:pe,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:g,batching:Be,batchingColor:Be&&V._colorsTexture!==null,instancing:Ne,instancingColor:Ne&&V.instanceColor!==null,instancingMorph:Ne&&V.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:Fe===null?i.outputColorSpace:Fe.isXRRenderTarget===!0?Fe.texture.colorSpace:Fr,alphaToCoverage:!!x.alphaToCoverage,map:re,matcap:ie,envMap:C,envMapMode:C&&G.mapping,envMapCubeUVHeight:ue,aoMap:Le,lightMap:ae,bumpMap:be,normalMap:fe,displacementMap:d&&ze,emissiveMap:Ce,normalMapObjectSpace:fe&&x.normalMapType===1,normalMapTangentSpace:fe&&x.normalMapType===0,metalnessMap:A,roughnessMap:M,anisotropy:O,anisotropyMap:Ee,clearcoat:j,clearcoatMap:Je,clearcoatNormalMap:le,clearcoatRoughnessMap:Re,dispersion:oe,iridescence:J,iridescenceMap:Ve,iridescenceThicknessMap:We,sheen:Pe,sheenColorMap:Te,sheenRoughnessMap:et,specularMap:Ye,specularColorMap:at,specularIntensityMap:I,transmission:me,transmissionMap:Me,thicknessMap:X,gradientMap:te,opaque:x.transparent===!1&&x.blending===1&&x.alphaToCoverage===!1,alphaMap:Se,alphaTest:ge,alphaHash:st,combine:x.combine,mapUv:re&&p(x.map.channel),aoMapUv:Le&&p(x.aoMap.channel),lightMapUv:ae&&p(x.lightMap.channel),bumpMapUv:be&&p(x.bumpMap.channel),normalMapUv:fe&&p(x.normalMap.channel),displacementMapUv:ze&&p(x.displacementMap.channel),emissiveMapUv:Ce&&p(x.emissiveMap.channel),metalnessMapUv:A&&p(x.metalnessMap.channel),roughnessMapUv:M&&p(x.roughnessMap.channel),anisotropyMapUv:Ee&&p(x.anisotropyMap.channel),clearcoatMapUv:Je&&p(x.clearcoatMap.channel),clearcoatNormalMapUv:le&&p(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Re&&p(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Ve&&p(x.iridescenceMap.channel),iridescenceThicknessMapUv:We&&p(x.iridescenceThicknessMap.channel),sheenColorMapUv:Te&&p(x.sheenColorMap.channel),sheenRoughnessMapUv:et&&p(x.sheenRoughnessMap.channel),specularMapUv:Ye&&p(x.specularMap.channel),specularColorMapUv:at&&p(x.specularColorMap.channel),specularIntensityMapUv:I&&p(x.specularIntensityMap.channel),transmissionMapUv:Me&&p(x.transmissionMap.channel),thicknessMapUv:X&&p(x.thicknessMap.channel),alphaMapUv:Se&&p(x.alphaMap.channel),vertexTangents:!!D.attributes.tangent&&(fe||O),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!D.attributes.color&&D.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!D.attributes.uv&&(re||Se),fog:!!Q,useFog:x.fog===!0,fogExp2:!!Q&&Q.isFogExp2,flatShading:x.flatShading===!0,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:u,skinning:V.isSkinnedMesh===!0,morphTargets:D.morphAttributes.position!==void 0,morphNormals:D.morphAttributes.normal!==void 0,morphColors:D.morphAttributes.color!==void 0,morphTargetsCount:ke,morphTextureStride:rt,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&F.length>0,shadowMapType:i.shadowMap.type,toneMapping:ee,decodeVideoTexture:re&&x.map.isVideoTexture===!0&&nt.getTransfer(x.map.colorSpace)===dt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===2,flipSided:x.side===1,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:Y&&x.extensions.clipCullDistance===!0&&r.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Y&&x.extensions.multiDraw===!0||Be)&&r.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:r.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Z.vertexUv1s=c.has(1),Z.vertexUv2s=c.has(2),Z.vertexUv3s=c.has(3),c.clear(),Z}function y(x){const E=[];if(x.shaderID?E.push(x.shaderID):(E.push(x.customVertexShaderID),E.push(x.customFragmentShaderID)),x.defines!==void 0)for(const F in x.defines)E.push(F),E.push(x.defines[F]);return x.isRawShaderMaterial===!1&&(_(E,x),S(E,x),E.push(i.outputColorSpace)),E.push(x.customProgramCacheKey),E.join()}function _(x,E){x.push(E.precision),x.push(E.outputColorSpace),x.push(E.envMapMode),x.push(E.envMapCubeUVHeight),x.push(E.mapUv),x.push(E.alphaMapUv),x.push(E.lightMapUv),x.push(E.aoMapUv),x.push(E.bumpMapUv),x.push(E.normalMapUv),x.push(E.displacementMapUv),x.push(E.emissiveMapUv),x.push(E.metalnessMapUv),x.push(E.roughnessMapUv),x.push(E.anisotropyMapUv),x.push(E.clearcoatMapUv),x.push(E.clearcoatNormalMapUv),x.push(E.clearcoatRoughnessMapUv),x.push(E.iridescenceMapUv),x.push(E.iridescenceThicknessMapUv),x.push(E.sheenColorMapUv),x.push(E.sheenRoughnessMapUv),x.push(E.specularMapUv),x.push(E.specularColorMapUv),x.push(E.specularIntensityMapUv),x.push(E.transmissionMapUv),x.push(E.thicknessMapUv),x.push(E.combine),x.push(E.fogExp2),x.push(E.sizeAttenuation),x.push(E.morphTargetsCount),x.push(E.morphAttributeCount),x.push(E.numDirLights),x.push(E.numPointLights),x.push(E.numSpotLights),x.push(E.numSpotLightMaps),x.push(E.numHemiLights),x.push(E.numRectAreaLights),x.push(E.numDirLightShadows),x.push(E.numPointLightShadows),x.push(E.numSpotLightShadows),x.push(E.numSpotLightShadowsWithMaps),x.push(E.numLightProbes),x.push(E.shadowMapType),x.push(E.toneMapping),x.push(E.numClippingPlanes),x.push(E.numClipIntersection),x.push(E.depthPacking)}function S(x,E){o.disableAll(),E.supportsVertexTextures&&o.enable(0),E.instancing&&o.enable(1),E.instancingColor&&o.enable(2),E.instancingMorph&&o.enable(3),E.matcap&&o.enable(4),E.envMap&&o.enable(5),E.normalMapObjectSpace&&o.enable(6),E.normalMapTangentSpace&&o.enable(7),E.clearcoat&&o.enable(8),E.iridescence&&o.enable(9),E.alphaTest&&o.enable(10),E.vertexColors&&o.enable(11),E.vertexAlphas&&o.enable(12),E.vertexUv1s&&o.enable(13),E.vertexUv2s&&o.enable(14),E.vertexUv3s&&o.enable(15),E.vertexTangents&&o.enable(16),E.anisotropy&&o.enable(17),E.alphaHash&&o.enable(18),E.batching&&o.enable(19),E.dispersion&&o.enable(20),E.batchingColor&&o.enable(21),x.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.reverseDepthBuffer&&o.enable(4),E.skinning&&o.enable(5),E.morphTargets&&o.enable(6),E.morphNormals&&o.enable(7),E.morphColors&&o.enable(8),E.premultipliedAlpha&&o.enable(9),E.shadowMapEnabled&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),E.decodeVideoTexture&&o.enable(19),E.alphaToCoverage&&o.enable(20),x.push(o.mask)}function P(x){const E=v[x.type];let F;if(E){const z=dr[E];F=en.clone(z.uniforms)}else F=x.uniforms;return F}function T(x,E){let F;for(let z=0,V=h.length;z<V;z++){const Q=h[z];if(Q.cacheKey===E){F=Q,++F.usedTimes;break}}return F===void 0&&(F=new uf(i,E,x,a),h.push(F)),F}function R(x){if(--x.usedTimes===0){const E=h.indexOf(x);h[E]=h[h.length-1],h.pop(),x.destroy()}}function U(x){l.remove(x)}function B(){l.dispose()}return{getParameters:m,getProgramCacheKey:y,getUniforms:P,acquireProgram:T,releaseProgram:R,releaseShaderCache:U,programs:h,dispose:B}}function gf(){let i=new WeakMap;function e(s){return i.has(s)}function t(s){let o=i.get(s);return o===void 0&&(o={},i.set(s,o)),o}function r(s){i.delete(s)}function n(s,o,l){i.get(s)[o]=l}function a(){i=new WeakMap}return{has:e,get:t,remove:r,update:n,dispose:a}}function vf(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function po(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function fo(){const i=[];let e=0;const t=[],r=[],n=[];function a(){e=0,t.length=0,r.length=0,n.length=0}function s(f,u,d,g,v,p){let m=i[e];return m===void 0?(m={id:f.id,object:f,geometry:u,material:d,groupOrder:g,renderOrder:f.renderOrder,z:v,group:p},i[e]=m):(m.id=f.id,m.object=f,m.geometry=u,m.material=d,m.groupOrder=g,m.renderOrder=f.renderOrder,m.z=v,m.group=p),e++,m}function o(f,u,d,g,v,p){const m=s(f,u,d,g,v,p);d.transmission>0?r.push(m):d.transparent===!0?n.push(m):t.push(m)}function l(f,u,d,g,v,p){const m=s(f,u,d,g,v,p);d.transmission>0?r.unshift(m):d.transparent===!0?n.unshift(m):t.unshift(m)}function c(f,u){t.length>1&&t.sort(f||vf),r.length>1&&r.sort(u||po),n.length>1&&n.sort(u||po)}function h(){for(let f=e,u=i.length;f<u;f++){const d=i[f];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:r,transparent:n,init:a,push:o,unshift:l,finish:h,sort:c}}function _f(){let i=new WeakMap;function e(r,n){const a=i.get(r);let s;return a===void 0?(s=new fo,i.set(r,[s])):n>=a.length?(s=new fo,a.push(s)):s=a[n],s}function t(){i=new WeakMap}return{get:e,dispose:t}}function xf(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new w,color:new ve};break;case"SpotLight":t={position:new w,direction:new w,color:new ve,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new w,color:new ve,distance:0,decay:0};break;case"HemisphereLight":t={direction:new w,skyColor:new ve,groundColor:new ve};break;case"RectAreaLight":t={color:new ve,position:new w,halfWidth:new w,halfHeight:new w};break}return i[e.id]=t,t}}}function yf(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new se};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new se};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new se,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Sf=0;function Mf(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function wf(i){const e=new xf,t=yf(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)r.probe.push(new w);const n=new w,a=new Mt,s=new Mt;function o(c){let h=0,f=0,u=0;for(let B=0;B<9;B++)r.probe[B].set(0,0,0);let d=0,g=0,v=0,p=0,m=0,y=0,_=0,S=0,P=0,T=0,R=0;c.sort(Mf);for(let B=0,x=c.length;B<x;B++){const E=c[B],F=E.color,z=E.intensity,V=E.distance,Q=E.shadow&&E.shadow.map?E.shadow.map.texture:null;if(E.isAmbientLight)h+=F.r*z,f+=F.g*z,u+=F.b*z;else if(E.isLightProbe){for(let D=0;D<9;D++)r.probe[D].addScaledVector(E.sh.coefficients[D],z);R++}else if(E.isDirectionalLight){const D=e.get(E);if(D.color.copy(E.color).multiplyScalar(E.intensity),E.castShadow){const $=E.shadow,G=t.get(E);G.shadowIntensity=$.intensity,G.shadowBias=$.bias,G.shadowNormalBias=$.normalBias,G.shadowRadius=$.radius,G.shadowMapSize=$.mapSize,r.directionalShadow[d]=G,r.directionalShadowMap[d]=Q,r.directionalShadowMatrix[d]=E.shadow.matrix,y++}r.directional[d]=D,d++}else if(E.isSpotLight){const D=e.get(E);D.position.setFromMatrixPosition(E.matrixWorld),D.color.copy(F).multiplyScalar(z),D.distance=V,D.coneCos=Math.cos(E.angle),D.penumbraCos=Math.cos(E.angle*(1-E.penumbra)),D.decay=E.decay,r.spot[v]=D;const $=E.shadow;if(E.map&&(r.spotLightMap[P]=E.map,P++,$.updateMatrices(E),E.castShadow&&T++),r.spotLightMatrix[v]=$.matrix,E.castShadow){const G=t.get(E);G.shadowIntensity=$.intensity,G.shadowBias=$.bias,G.shadowNormalBias=$.normalBias,G.shadowRadius=$.radius,G.shadowMapSize=$.mapSize,r.spotShadow[v]=G,r.spotShadowMap[v]=Q,S++}v++}else if(E.isRectAreaLight){const D=e.get(E);D.color.copy(F).multiplyScalar(z),D.halfWidth.set(E.width*.5,0,0),D.halfHeight.set(0,E.height*.5,0),r.rectArea[p]=D,p++}else if(E.isPointLight){const D=e.get(E);if(D.color.copy(E.color).multiplyScalar(E.intensity),D.distance=E.distance,D.decay=E.decay,E.castShadow){const $=E.shadow,G=t.get(E);G.shadowIntensity=$.intensity,G.shadowBias=$.bias,G.shadowNormalBias=$.normalBias,G.shadowRadius=$.radius,G.shadowMapSize=$.mapSize,G.shadowCameraNear=$.camera.near,G.shadowCameraFar=$.camera.far,r.pointShadow[g]=G,r.pointShadowMap[g]=Q,r.pointShadowMatrix[g]=E.shadow.matrix,_++}r.point[g]=D,g++}else if(E.isHemisphereLight){const D=e.get(E);D.skyColor.copy(E.color).multiplyScalar(z),D.groundColor.copy(E.groundColor).multiplyScalar(z),r.hemi[m]=D,m++}}p>0&&(i.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=_e.LTC_FLOAT_1,r.rectAreaLTC2=_e.LTC_FLOAT_2):(r.rectAreaLTC1=_e.LTC_HALF_1,r.rectAreaLTC2=_e.LTC_HALF_2)),r.ambient[0]=h,r.ambient[1]=f,r.ambient[2]=u;const U=r.hash;(U.directionalLength!==d||U.pointLength!==g||U.spotLength!==v||U.rectAreaLength!==p||U.hemiLength!==m||U.numDirectionalShadows!==y||U.numPointShadows!==_||U.numSpotShadows!==S||U.numSpotMaps!==P||U.numLightProbes!==R)&&(r.directional.length=d,r.spot.length=v,r.rectArea.length=p,r.point.length=g,r.hemi.length=m,r.directionalShadow.length=y,r.directionalShadowMap.length=y,r.pointShadow.length=_,r.pointShadowMap.length=_,r.spotShadow.length=S,r.spotShadowMap.length=S,r.directionalShadowMatrix.length=y,r.pointShadowMatrix.length=_,r.spotLightMatrix.length=S+P-T,r.spotLightMap.length=P,r.numSpotLightShadowsWithMaps=T,r.numLightProbes=R,U.directionalLength=d,U.pointLength=g,U.spotLength=v,U.rectAreaLength=p,U.hemiLength=m,U.numDirectionalShadows=y,U.numPointShadows=_,U.numSpotShadows=S,U.numSpotMaps=P,U.numLightProbes=R,r.version=Sf++)}function l(c,h){let f=0,u=0,d=0,g=0,v=0;const p=h.matrixWorldInverse;for(let m=0,y=c.length;m<y;m++){const _=c[m];if(_.isDirectionalLight){const S=r.directional[f];S.direction.setFromMatrixPosition(_.matrixWorld),n.setFromMatrixPosition(_.target.matrixWorld),S.direction.sub(n),S.direction.transformDirection(p),f++}else if(_.isSpotLight){const S=r.spot[d];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(p),S.direction.setFromMatrixPosition(_.matrixWorld),n.setFromMatrixPosition(_.target.matrixWorld),S.direction.sub(n),S.direction.transformDirection(p),d++}else if(_.isRectAreaLight){const S=r.rectArea[g];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(p),s.identity(),a.copy(_.matrixWorld),a.premultiply(p),s.extractRotation(a),S.halfWidth.set(_.width*.5,0,0),S.halfHeight.set(0,_.height*.5,0),S.halfWidth.applyMatrix4(s),S.halfHeight.applyMatrix4(s),g++}else if(_.isPointLight){const S=r.point[u];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(p),u++}else if(_.isHemisphereLight){const S=r.hemi[v];S.direction.setFromMatrixPosition(_.matrixWorld),S.direction.transformDirection(p),v++}}}return{setup:o,setupView:l,state:r}}function mo(i){const e=new wf(i),t=[],r=[];function n(h){c.camera=h,t.length=0,r.length=0}function a(h){t.push(h)}function s(h){r.push(h)}function o(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:r,camera:null,lights:e,transmissionRenderTarget:{}};return{init:n,state:c,setupLights:o,setupLightsView:l,pushLight:a,pushShadow:s}}function bf(i){let e=new WeakMap;function t(n,a=0){const s=e.get(n);let o;return s===void 0?(o=new mo(i),e.set(n,[o])):a>=s.length?(o=new mo(i),s.push(o)):o=s[a],o}function r(){e=new WeakMap}return{get:t,dispose:r}}class Ef extends ti{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Tf extends ti{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Af=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Cf=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Rf(i,e,t){let r=new hs;const n=new se,a=new se,s=new ht,o=new Ef({depthPacking:3201}),l=new Tf,c={},h=t.maxTextureSize,f={0:1,1:0,2:2},u=new St({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new se},radius:{value:4}},vertexShader:Af,fragmentShader:Cf}),d=u.clone();d.defines.HORIZONTAL_PASS=1;const g=new pt;g.setAttribute("position",new Zt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new W(g,u),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let m=this.type;this.render=function(T,R,U){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;const B=i.getRenderTarget(),x=i.getActiveCubeFace(),E=i.getActiveMipmapLevel(),F=i.state;F.setBlending(0),F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const z=m!==3&&this.type===3,V=m===3&&this.type!==3;for(let Q=0,D=T.length;Q<D;Q++){const $=T[Q],G=$.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;n.copy(G.mapSize);const ue=G.getFrameExtents();if(n.multiply(ue),a.copy(G.mapSize),(n.x>h||n.y>h)&&(n.x>h&&(a.x=Math.floor(h/ue.x),n.x=a.x*ue.x,G.mapSize.x=a.x),n.y>h&&(a.y=Math.floor(h/ue.y),n.y=a.y*ue.y,G.mapSize.y=a.y)),G.map===null||z===!0||V===!0){const Ie=this.type!==3?{minFilter:1003,magFilter:1003}:{};G.map!==null&&G.map.dispose(),G.map=new ur(n.x,n.y,Ie),G.map.texture.name=$.name+".shadowMap",G.camera.updateProjectionMatrix()}i.setRenderTarget(G.map),i.clear();const de=G.getViewportCount();for(let Ie=0;Ie<de;Ie++){const ke=G.getViewport(Ie);s.set(a.x*ke.x,a.y*ke.y,a.x*ke.z,a.y*ke.w),F.viewport(s),G.updateMatrices($,Ie),r=G.getFrustum(),S(R,U,G.camera,$,this.type)}G.isPointLightShadow!==!0&&this.type===3&&y(G,U),G.needsUpdate=!1}m=this.type,p.needsUpdate=!1,i.setRenderTarget(B,x,E)};function y(T,R){const U=e.update(v);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,d.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,d.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new ur(n.x,n.y)),u.uniforms.shadow_pass.value=T.map.texture,u.uniforms.resolution.value=T.mapSize,u.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(R,null,U,u,v,null),d.uniforms.shadow_pass.value=T.mapPass.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(R,null,U,d,v,null)}function _(T,R,U,B){let x=null;const E=U.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(E!==void 0)x=E;else if(x=U.isPointLight===!0?l:o,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const F=x.uuid,z=R.uuid;let V=c[F];V===void 0&&(V={},c[F]=V);let Q=V[z];Q===void 0&&(Q=x.clone(),V[z]=Q,R.addEventListener("dispose",P)),x=Q}if(x.visible=R.visible,x.wireframe=R.wireframe,B===3?x.side=R.shadowSide!==null?R.shadowSide:R.side:x.side=R.shadowSide!==null?R.shadowSide:f[R.side],x.alphaMap=R.alphaMap,x.alphaTest=R.alphaTest,x.map=R.map,x.clipShadows=R.clipShadows,x.clippingPlanes=R.clippingPlanes,x.clipIntersection=R.clipIntersection,x.displacementMap=R.displacementMap,x.displacementScale=R.displacementScale,x.displacementBias=R.displacementBias,x.wireframeLinewidth=R.wireframeLinewidth,x.linewidth=R.linewidth,U.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const F=i.properties.get(x);F.light=U}return x}function S(T,R,U,B,x){if(T.visible===!1)return;if(T.layers.test(R.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&x===3)&&(!T.frustumCulled||r.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,T.matrixWorld);const F=e.update(T),z=T.material;if(Array.isArray(z)){const V=F.groups;for(let Q=0,D=V.length;Q<D;Q++){const $=V[Q],G=z[$.materialIndex];if(G&&G.visible){const ue=_(T,G,B,x);T.onBeforeShadow(i,T,R,U,F,ue,$),i.renderBufferDirect(U,null,F,ue,T,$),T.onAfterShadow(i,T,R,U,F,ue,$)}}}else if(z.visible){const V=_(T,z,B,x);T.onBeforeShadow(i,T,R,U,F,V,null),i.renderBufferDirect(U,null,F,V,T,null),T.onAfterShadow(i,T,R,U,F,V,null)}}const E=T.children;for(let F=0,z=E.length;F<z;F++)S(E[F],R,U,B,x)}function P(T){T.target.removeEventListener("dispose",P);for(const R in c){const U=c[R],B=T.target.uuid;B in U&&(U[B].dispose(),delete U[B])}}}const Pf={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3};function If(i){function e(){let I=!1;const Me=new ht;let X=null;const te=new ht(0,0,0,0);return{setMask:function(Se){X!==Se&&!I&&(i.colorMask(Se,Se,Se,Se),X=Se)},setLocked:function(Se){I=Se},setClear:function(Se,ge,st,Y,ee){ee===!0&&(Se*=Y,ge*=Y,st*=Y),Me.set(Se,ge,st,Y),te.equals(Me)===!1&&(i.clearColor(Se,ge,st,Y),te.copy(Me))},reset:function(){I=!1,X=null,te.set(-1,0,0,0)}}}function t(){let I=!1,Me=!1,X=null,te=null,Se=null;return{setReversed:function(ge){Me=ge},setTest:function(ge){ge?xe(i.DEPTH_TEST):pe(i.DEPTH_TEST)},setMask:function(ge){X!==ge&&!I&&(i.depthMask(ge),X=ge)},setFunc:function(ge){if(Me&&(ge=Pf[ge]),te!==ge){switch(ge){case 0:i.depthFunc(i.NEVER);break;case 1:i.depthFunc(i.ALWAYS);break;case 2:i.depthFunc(i.LESS);break;case 3:i.depthFunc(i.LEQUAL);break;case 4:i.depthFunc(i.EQUAL);break;case 5:i.depthFunc(i.GEQUAL);break;case 6:i.depthFunc(i.GREATER);break;case 7:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}te=ge}},setLocked:function(ge){I=ge},setClear:function(ge){Se!==ge&&(i.clearDepth(ge),Se=ge)},reset:function(){I=!1,X=null,te=null,Se=null}}}function r(){let I=!1,Me=null,X=null,te=null,Se=null,ge=null,st=null,Y=null,ee=null;return{setTest:function(Z){I||(Z?xe(i.STENCIL_TEST):pe(i.STENCIL_TEST))},setMask:function(Z){Me!==Z&&!I&&(i.stencilMask(Z),Me=Z)},setFunc:function(Z,ye,je){(X!==Z||te!==ye||Se!==je)&&(i.stencilFunc(Z,ye,je),X=Z,te=ye,Se=je)},setOp:function(Z,ye,je){(ge!==Z||st!==ye||Y!==je)&&(i.stencilOp(Z,ye,je),ge=Z,st=ye,Y=je)},setLocked:function(Z){I=Z},setClear:function(Z){ee!==Z&&(i.clearStencil(Z),ee=Z)},reset:function(){I=!1,Me=null,X=null,te=null,Se=null,ge=null,st=null,Y=null,ee=null}}}const n=new e,a=new t,s=new r,o=new WeakMap,l=new WeakMap;let c={},h={},f=new WeakMap,u=[],d=null,g=!1,v=null,p=null,m=null,y=null,_=null,S=null,P=null,T=new ve(0,0,0),R=0,U=!1,B=null,x=null,E=null,F=null,z=null;const V=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Q=!1,D=0;const $=i.getParameter(i.VERSION);$.indexOf("WebGL")!==-1?(D=parseFloat(/^WebGL (\d)/.exec($)[1]),Q=D>=1):$.indexOf("OpenGL ES")!==-1&&(D=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),Q=D>=2);let G=null,ue={};const de=i.getParameter(i.SCISSOR_BOX),Ie=i.getParameter(i.VIEWPORT),ke=new ht().fromArray(de),rt=new ht().fromArray(Ie);function K(I,Me,X,te){const Se=new Uint8Array(4),ge=i.createTexture();i.bindTexture(I,ge),i.texParameteri(I,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(I,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let st=0;st<X;st++)I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY?i.texImage3D(Me,0,i.RGBA,1,1,te,0,i.RGBA,i.UNSIGNED_BYTE,Se):i.texImage2D(Me+st,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Se);return ge}const ce={};ce[i.TEXTURE_2D]=K(i.TEXTURE_2D,i.TEXTURE_2D,1),ce[i.TEXTURE_CUBE_MAP]=K(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ce[i.TEXTURE_2D_ARRAY]=K(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ce[i.TEXTURE_3D]=K(i.TEXTURE_3D,i.TEXTURE_3D,1,1),n.setClear(0,0,0,1),a.setClear(1),s.setClear(0),xe(i.DEPTH_TEST),a.setFunc(3),ae(!1),be(1),xe(i.CULL_FACE),C(0);function xe(I){c[I]!==!0&&(i.enable(I),c[I]=!0)}function pe(I){c[I]!==!1&&(i.disable(I),c[I]=!1)}function Fe(I,Me){return h[I]!==Me?(i.bindFramebuffer(I,Me),h[I]=Me,I===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=Me),I===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=Me),!0):!1}function Ne(I,Me){let X=u,te=!1;if(I){X=f.get(Me),X===void 0&&(X=[],f.set(Me,X));const Se=I.textures;if(X.length!==Se.length||X[0]!==i.COLOR_ATTACHMENT0){for(let ge=0,st=Se.length;ge<st;ge++)X[ge]=i.COLOR_ATTACHMENT0+ge;X.length=Se.length,te=!0}}else X[0]!==i.BACK&&(X[0]=i.BACK,te=!0);te&&i.drawBuffers(X)}function Be(I){return d!==I?(i.useProgram(I),d=I,!0):!1}const re={100:i.FUNC_ADD,101:i.FUNC_SUBTRACT,102:i.FUNC_REVERSE_SUBTRACT};re[103]=i.MIN,re[104]=i.MAX;const ie={200:i.ZERO,201:i.ONE,202:i.SRC_COLOR,204:i.SRC_ALPHA,210:i.SRC_ALPHA_SATURATE,208:i.DST_COLOR,206:i.DST_ALPHA,203:i.ONE_MINUS_SRC_COLOR,205:i.ONE_MINUS_SRC_ALPHA,209:i.ONE_MINUS_DST_COLOR,207:i.ONE_MINUS_DST_ALPHA,211:i.CONSTANT_COLOR,212:i.ONE_MINUS_CONSTANT_COLOR,213:i.CONSTANT_ALPHA,214:i.ONE_MINUS_CONSTANT_ALPHA};function C(I,Me,X,te,Se,ge,st,Y,ee,Z){if(I===0){g===!0&&(pe(i.BLEND),g=!1);return}if(g===!1&&(xe(i.BLEND),g=!0),I!==5){if(I!==v||Z!==U){if((p!==100||_!==100)&&(i.blendEquation(i.FUNC_ADD),p=100,_=100),Z)switch(I){case 1:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case 2:i.blendFunc(i.ONE,i.ONE);break;case 3:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case 4:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case 1:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case 2:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case 3:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case 4:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}m=null,y=null,S=null,P=null,T.set(0,0,0),R=0,v=I,U=Z}return}Se=Se||Me,ge=ge||X,st=st||te,(Me!==p||Se!==_)&&(i.blendEquationSeparate(re[Me],re[Se]),p=Me,_=Se),(X!==m||te!==y||ge!==S||st!==P)&&(i.blendFuncSeparate(ie[X],ie[te],ie[ge],ie[st]),m=X,y=te,S=ge,P=st),(Y.equals(T)===!1||ee!==R)&&(i.blendColor(Y.r,Y.g,Y.b,ee),T.copy(Y),R=ee),v=I,U=!1}function Le(I,Me){I.side===2?pe(i.CULL_FACE):xe(i.CULL_FACE);let X=I.side===1;Me&&(X=!X),ae(X),I.blending===1&&I.transparent===!1?C(0):C(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),a.setFunc(I.depthFunc),a.setTest(I.depthTest),a.setMask(I.depthWrite),n.setMask(I.colorWrite);const te=I.stencilWrite;s.setTest(te),te&&(s.setMask(I.stencilWriteMask),s.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),s.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),ze(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?xe(i.SAMPLE_ALPHA_TO_COVERAGE):pe(i.SAMPLE_ALPHA_TO_COVERAGE)}function ae(I){B!==I&&(I?i.frontFace(i.CW):i.frontFace(i.CCW),B=I)}function be(I){I!==0?(xe(i.CULL_FACE),I!==x&&(I===1?i.cullFace(i.BACK):I===2?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):pe(i.CULL_FACE),x=I}function fe(I){I!==E&&(Q&&i.lineWidth(I),E=I)}function ze(I,Me,X){I?(xe(i.POLYGON_OFFSET_FILL),(F!==Me||z!==X)&&(i.polygonOffset(Me,X),F=Me,z=X)):pe(i.POLYGON_OFFSET_FILL)}function Ce(I){I?xe(i.SCISSOR_TEST):pe(i.SCISSOR_TEST)}function A(I){I===void 0&&(I=i.TEXTURE0+V-1),G!==I&&(i.activeTexture(I),G=I)}function M(I,Me,X){X===void 0&&(G===null?X=i.TEXTURE0+V-1:X=G);let te=ue[X];te===void 0&&(te={type:void 0,texture:void 0},ue[X]=te),(te.type!==I||te.texture!==Me)&&(G!==X&&(i.activeTexture(X),G=X),i.bindTexture(I,Me||ce[I]),te.type=I,te.texture=Me)}function O(){const I=ue[G];I!==void 0&&I.type!==void 0&&(i.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function j(){try{i.compressedTexImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function oe(){try{i.compressedTexImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function J(){try{i.texSubImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Pe(){try{i.texSubImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function me(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ee(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Je(){try{i.texStorage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function le(){try{i.texStorage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Re(){try{i.texImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ve(){try{i.texImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function We(I){ke.equals(I)===!1&&(i.scissor(I.x,I.y,I.z,I.w),ke.copy(I))}function Te(I){rt.equals(I)===!1&&(i.viewport(I.x,I.y,I.z,I.w),rt.copy(I))}function et(I,Me){let X=l.get(Me);X===void 0&&(X=new WeakMap,l.set(Me,X));let te=X.get(I);te===void 0&&(te=i.getUniformBlockIndex(Me,I.name),X.set(I,te))}function Ye(I,Me){const X=l.get(Me).get(I);o.get(Me)!==X&&(i.uniformBlockBinding(Me,X,I.__bindingPointIndex),o.set(Me,X))}function at(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),c={},G=null,ue={},h={},f=new WeakMap,u=[],d=null,g=!1,v=null,p=null,m=null,y=null,_=null,S=null,P=null,T=new ve(0,0,0),R=0,U=!1,B=null,x=null,E=null,F=null,z=null,ke.set(0,0,i.canvas.width,i.canvas.height),rt.set(0,0,i.canvas.width,i.canvas.height),n.reset(),a.reset(),s.reset()}return{buffers:{color:n,depth:a,stencil:s},enable:xe,disable:pe,bindFramebuffer:Fe,drawBuffers:Ne,useProgram:Be,setBlending:C,setMaterial:Le,setFlipSided:ae,setCullFace:be,setLineWidth:fe,setPolygonOffset:ze,setScissorTest:Ce,activeTexture:A,bindTexture:M,unbindTexture:O,compressedTexImage2D:j,compressedTexImage3D:oe,texImage2D:Re,texImage3D:Ve,updateUBOMapping:et,uniformBlockBinding:Ye,texStorage2D:Je,texStorage3D:le,texSubImage2D:J,texSubImage3D:Pe,compressedTexSubImage2D:me,compressedTexSubImage3D:Ee,scissor:We,viewport:Te,reset:at}}function go(i,e,t,r){const n=Lf(r);switch(t){case 1021:return i*e;case 1024:return i*e;case 1025:return i*e*2;case 1028:return i*e/n.components*n.byteLength;case 1029:return i*e/n.components*n.byteLength;case 1030:return i*e*2/n.components*n.byteLength;case 1031:return i*e*2/n.components*n.byteLength;case 1022:return i*e*3/n.components*n.byteLength;case 1023:return i*e*4/n.components*n.byteLength;case 1033:return i*e*4/n.components*n.byteLength;case 33776:case 33777:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(i,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(i,8)*Math.max(e,8)/2;case 36196:case 37492:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case 37496:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case 37808:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case 37809:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(i/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(i/4)*Math.ceil(e/4)*8;case 36285:case 36286:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Lf(i){switch(i){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function Uf(i,e,t,r,n,a,s){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new se,h=new WeakMap;let f;const u=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,M){return d?new OffscreenCanvas(A,M):Jn("canvas")}function v(A,M,O){let j=1;const oe=Ce(A);if((oe.width>O||oe.height>O)&&(j=O/Math.max(oe.width,oe.height)),j<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const J=Math.floor(j*oe.width),Pe=Math.floor(j*oe.height);f===void 0&&(f=g(J,Pe));const me=M?g(J,Pe):f;return me.width=J,me.height=Pe,me.getContext("2d").drawImage(A,0,0,J,Pe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+oe.width+"x"+oe.height+") to ("+J+"x"+Pe+")."),me}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+oe.width+"x"+oe.height+")."),A;return A}function p(A){return A.generateMipmaps&&A.minFilter!==1003&&A.minFilter!==1006}function m(A){i.generateMipmap(A)}function y(A,M,O,j,oe=!1){if(A!==null){if(i[A]!==void 0)return i[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let J=M;if(M===i.RED&&(O===i.FLOAT&&(J=i.R32F),O===i.HALF_FLOAT&&(J=i.R16F),O===i.UNSIGNED_BYTE&&(J=i.R8)),M===i.RED_INTEGER&&(O===i.UNSIGNED_BYTE&&(J=i.R8UI),O===i.UNSIGNED_SHORT&&(J=i.R16UI),O===i.UNSIGNED_INT&&(J=i.R32UI),O===i.BYTE&&(J=i.R8I),O===i.SHORT&&(J=i.R16I),O===i.INT&&(J=i.R32I)),M===i.RG&&(O===i.FLOAT&&(J=i.RG32F),O===i.HALF_FLOAT&&(J=i.RG16F),O===i.UNSIGNED_BYTE&&(J=i.RG8)),M===i.RG_INTEGER&&(O===i.UNSIGNED_BYTE&&(J=i.RG8UI),O===i.UNSIGNED_SHORT&&(J=i.RG16UI),O===i.UNSIGNED_INT&&(J=i.RG32UI),O===i.BYTE&&(J=i.RG8I),O===i.SHORT&&(J=i.RG16I),O===i.INT&&(J=i.RG32I)),M===i.RGB_INTEGER&&(O===i.UNSIGNED_BYTE&&(J=i.RGB8UI),O===i.UNSIGNED_SHORT&&(J=i.RGB16UI),O===i.UNSIGNED_INT&&(J=i.RGB32UI),O===i.BYTE&&(J=i.RGB8I),O===i.SHORT&&(J=i.RGB16I),O===i.INT&&(J=i.RGB32I)),M===i.RGBA_INTEGER&&(O===i.UNSIGNED_BYTE&&(J=i.RGBA8UI),O===i.UNSIGNED_SHORT&&(J=i.RGBA16UI),O===i.UNSIGNED_INT&&(J=i.RGBA32UI),O===i.BYTE&&(J=i.RGBA8I),O===i.SHORT&&(J=i.RGBA16I),O===i.INT&&(J=i.RGBA32I)),M===i.RGB&&O===i.UNSIGNED_INT_5_9_9_9_REV&&(J=i.RGB9_E5),M===i.RGBA){const Pe=oe?$n:nt.getTransfer(j);O===i.FLOAT&&(J=i.RGBA32F),O===i.HALF_FLOAT&&(J=i.RGBA16F),O===i.UNSIGNED_BYTE&&(J=Pe===dt?i.SRGB8_ALPHA8:i.RGBA8),O===i.UNSIGNED_SHORT_4_4_4_4&&(J=i.RGBA4),O===i.UNSIGNED_SHORT_5_5_5_1&&(J=i.RGB5_A1)}return(J===i.R16F||J===i.R32F||J===i.RG16F||J===i.RG32F||J===i.RGBA16F||J===i.RGBA32F)&&e.get("EXT_color_buffer_float"),J}function _(A,M){let O;return A?M===null||M===1014||M===1020?O=i.DEPTH24_STENCIL8:M===1015?O=i.DEPTH32F_STENCIL8:M===1012&&(O=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===1014||M===1020?O=i.DEPTH_COMPONENT24:M===1015?O=i.DEPTH_COMPONENT32F:M===1012&&(O=i.DEPTH_COMPONENT16),O}function S(A,M){return p(A)===!0||A.isFramebufferTexture&&A.minFilter!==1003&&A.minFilter!==1006?Math.log2(Math.max(M.width,M.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?M.mipmaps.length:1}function P(A){const M=A.target;M.removeEventListener("dispose",P),R(M),M.isVideoTexture&&h.delete(M)}function T(A){const M=A.target;M.removeEventListener("dispose",T),B(M)}function R(A){const M=r.get(A);if(M.__webglInit===void 0)return;const O=A.source,j=u.get(O);if(j){const oe=j[M.__cacheKey];oe.usedTimes--,oe.usedTimes===0&&U(A),Object.keys(j).length===0&&u.delete(O)}r.remove(A)}function U(A){const M=r.get(A);i.deleteTexture(M.__webglTexture);const O=A.source,j=u.get(O);delete j[M.__cacheKey],s.memory.textures--}function B(A){const M=r.get(A);if(A.depthTexture&&A.depthTexture.dispose(),A.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(M.__webglFramebuffer[j]))for(let oe=0;oe<M.__webglFramebuffer[j].length;oe++)i.deleteFramebuffer(M.__webglFramebuffer[j][oe]);else i.deleteFramebuffer(M.__webglFramebuffer[j]);M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer[j])}else{if(Array.isArray(M.__webglFramebuffer))for(let j=0;j<M.__webglFramebuffer.length;j++)i.deleteFramebuffer(M.__webglFramebuffer[j]);else i.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&i.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let j=0;j<M.__webglColorRenderbuffer.length;j++)M.__webglColorRenderbuffer[j]&&i.deleteRenderbuffer(M.__webglColorRenderbuffer[j]);M.__webglDepthRenderbuffer&&i.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const O=A.textures;for(let j=0,oe=O.length;j<oe;j++){const J=r.get(O[j]);J.__webglTexture&&(i.deleteTexture(J.__webglTexture),s.memory.textures--),r.remove(O[j])}r.remove(A)}let x=0;function E(){x=0}function F(){const A=x;return A>=n.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+n.maxTextures),x+=1,A}function z(A){const M=[];return M.push(A.wrapS),M.push(A.wrapT),M.push(A.wrapR||0),M.push(A.magFilter),M.push(A.minFilter),M.push(A.anisotropy),M.push(A.internalFormat),M.push(A.format),M.push(A.type),M.push(A.generateMipmaps),M.push(A.premultiplyAlpha),M.push(A.flipY),M.push(A.unpackAlignment),M.push(A.colorSpace),M.join()}function V(A,M){const O=r.get(A);if(A.isVideoTexture&&fe(A),A.isRenderTargetTexture===!1&&A.version>0&&O.__version!==A.version){const j=A.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{rt(O,A,M);return}}t.bindTexture(i.TEXTURE_2D,O.__webglTexture,i.TEXTURE0+M)}function Q(A,M){const O=r.get(A);if(A.version>0&&O.__version!==A.version){rt(O,A,M);return}t.bindTexture(i.TEXTURE_2D_ARRAY,O.__webglTexture,i.TEXTURE0+M)}function D(A,M){const O=r.get(A);if(A.version>0&&O.__version!==A.version){rt(O,A,M);return}t.bindTexture(i.TEXTURE_3D,O.__webglTexture,i.TEXTURE0+M)}function $(A,M){const O=r.get(A);if(A.version>0&&O.__version!==A.version){K(O,A,M);return}t.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture,i.TEXTURE0+M)}const G={1e3:i.REPEAT,1001:i.CLAMP_TO_EDGE,1002:i.MIRRORED_REPEAT},ue={1003:i.NEAREST,1004:i.NEAREST_MIPMAP_NEAREST,1005:i.NEAREST_MIPMAP_LINEAR,1006:i.LINEAR,1007:i.LINEAR_MIPMAP_NEAREST,1008:i.LINEAR_MIPMAP_LINEAR},de={512:i.NEVER,519:i.ALWAYS,513:i.LESS,515:i.LEQUAL,514:i.EQUAL,518:i.GEQUAL,516:i.GREATER,517:i.NOTEQUAL};function Ie(A,M){if(M.type===1015&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===1006||M.magFilter===1007||M.magFilter===1005||M.magFilter===1008||M.minFilter===1006||M.minFilter===1007||M.minFilter===1005||M.minFilter===1008)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,G[M.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,G[M.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,G[M.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,ue[M.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,ue[M.minFilter]),M.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,de[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===1003||M.minFilter!==1005&&M.minFilter!==1008||M.type===1015&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||r.get(M).__currentAnisotropy){const O=e.get("EXT_texture_filter_anisotropic");i.texParameterf(A,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,n.getMaxAnisotropy())),r.get(M).__currentAnisotropy=M.anisotropy}}}function ke(A,M){let O=!1;A.__webglInit===void 0&&(A.__webglInit=!0,M.addEventListener("dispose",P));const j=M.source;let oe=u.get(j);oe===void 0&&(oe={},u.set(j,oe));const J=z(M);if(J!==A.__cacheKey){oe[J]===void 0&&(oe[J]={texture:i.createTexture(),usedTimes:0},s.memory.textures++,O=!0),oe[J].usedTimes++;const Pe=oe[A.__cacheKey];Pe!==void 0&&(oe[A.__cacheKey].usedTimes--,Pe.usedTimes===0&&U(M)),A.__cacheKey=J,A.__webglTexture=oe[J].texture}return O}function rt(A,M,O){let j=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(j=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(j=i.TEXTURE_3D);const oe=ke(A,M),J=M.source;t.bindTexture(j,A.__webglTexture,i.TEXTURE0+O);const Pe=r.get(J);if(J.version!==Pe.__version||oe===!0){t.activeTexture(i.TEXTURE0+O);const me=nt.getPrimaries(nt.workingColorSpace),Ee=M.colorSpace===Nr?null:nt.getPrimaries(M.colorSpace),Je=M.colorSpace===Nr||me===Ee?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Je);let le=v(M.image,!1,n.maxTextureSize);le=ze(M,le);const Re=a.convert(M.format,M.colorSpace),Ve=a.convert(M.type);let We=y(M.internalFormat,Re,Ve,M.colorSpace,M.isVideoTexture);Ie(j,M);let Te;const et=M.mipmaps,Ye=M.isVideoTexture!==!0,at=Pe.__version===void 0||oe===!0,I=J.dataReady,Me=S(M,le);if(M.isDepthTexture)We=_(M.format===1027,M.type),at&&(Ye?t.texStorage2D(i.TEXTURE_2D,1,We,le.width,le.height):t.texImage2D(i.TEXTURE_2D,0,We,le.width,le.height,0,Re,Ve,null));else if(M.isDataTexture)if(et.length>0){Ye&&at&&t.texStorage2D(i.TEXTURE_2D,Me,We,et[0].width,et[0].height);for(let X=0,te=et.length;X<te;X++)Te=et[X],Ye?I&&t.texSubImage2D(i.TEXTURE_2D,X,0,0,Te.width,Te.height,Re,Ve,Te.data):t.texImage2D(i.TEXTURE_2D,X,We,Te.width,Te.height,0,Re,Ve,Te.data);M.generateMipmaps=!1}else Ye?(at&&t.texStorage2D(i.TEXTURE_2D,Me,We,le.width,le.height),I&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,le.width,le.height,Re,Ve,le.data)):t.texImage2D(i.TEXTURE_2D,0,We,le.width,le.height,0,Re,Ve,le.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Ye&&at&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Me,We,et[0].width,et[0].height,le.depth);for(let X=0,te=et.length;X<te;X++)if(Te=et[X],M.format!==1023)if(Re!==null)if(Ye){if(I)if(M.layerUpdates.size>0){const Se=go(Te.width,Te.height,M.format,M.type);for(const ge of M.layerUpdates){const st=Te.data.subarray(ge*Se/Te.data.BYTES_PER_ELEMENT,(ge+1)*Se/Te.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,X,0,0,ge,Te.width,Te.height,1,Re,st,0,0)}M.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,X,0,0,0,Te.width,Te.height,le.depth,Re,Te.data,0,0)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,X,We,Te.width,Te.height,le.depth,0,Te.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ye?I&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,X,0,0,0,Te.width,Te.height,le.depth,Re,Ve,Te.data):t.texImage3D(i.TEXTURE_2D_ARRAY,X,We,Te.width,Te.height,le.depth,0,Re,Ve,Te.data)}else{Ye&&at&&t.texStorage2D(i.TEXTURE_2D,Me,We,et[0].width,et[0].height);for(let X=0,te=et.length;X<te;X++)Te=et[X],M.format!==1023?Re!==null?Ye?I&&t.compressedTexSubImage2D(i.TEXTURE_2D,X,0,0,Te.width,Te.height,Re,Te.data):t.compressedTexImage2D(i.TEXTURE_2D,X,We,Te.width,Te.height,0,Te.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ye?I&&t.texSubImage2D(i.TEXTURE_2D,X,0,0,Te.width,Te.height,Re,Ve,Te.data):t.texImage2D(i.TEXTURE_2D,X,We,Te.width,Te.height,0,Re,Ve,Te.data)}else if(M.isDataArrayTexture)if(Ye){if(at&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Me,We,le.width,le.height,le.depth),I)if(M.layerUpdates.size>0){const X=go(le.width,le.height,M.format,M.type);for(const te of M.layerUpdates){const Se=le.data.subarray(te*X/le.data.BYTES_PER_ELEMENT,(te+1)*X/le.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,te,le.width,le.height,1,Re,Ve,Se)}M.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,Re,Ve,le.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,We,le.width,le.height,le.depth,0,Re,Ve,le.data);else if(M.isData3DTexture)Ye?(at&&t.texStorage3D(i.TEXTURE_3D,Me,We,le.width,le.height,le.depth),I&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,Re,Ve,le.data)):t.texImage3D(i.TEXTURE_3D,0,We,le.width,le.height,le.depth,0,Re,Ve,le.data);else if(M.isFramebufferTexture){if(at)if(Ye)t.texStorage2D(i.TEXTURE_2D,Me,We,le.width,le.height);else{let X=le.width,te=le.height;for(let Se=0;Se<Me;Se++)t.texImage2D(i.TEXTURE_2D,Se,We,X,te,0,Re,Ve,null),X>>=1,te>>=1}}else if(et.length>0){if(Ye&&at){const X=Ce(et[0]);t.texStorage2D(i.TEXTURE_2D,Me,We,X.width,X.height)}for(let X=0,te=et.length;X<te;X++)Te=et[X],Ye?I&&t.texSubImage2D(i.TEXTURE_2D,X,0,0,Re,Ve,Te):t.texImage2D(i.TEXTURE_2D,X,We,Re,Ve,Te);M.generateMipmaps=!1}else if(Ye){if(at){const X=Ce(le);t.texStorage2D(i.TEXTURE_2D,Me,We,X.width,X.height)}I&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Re,Ve,le)}else t.texImage2D(i.TEXTURE_2D,0,We,Re,Ve,le);p(M)&&m(j),Pe.__version=J.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function K(A,M,O){if(M.image.length!==6)return;const j=ke(A,M),oe=M.source;t.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+O);const J=r.get(oe);if(oe.version!==J.__version||j===!0){t.activeTexture(i.TEXTURE0+O);const Pe=nt.getPrimaries(nt.workingColorSpace),me=M.colorSpace===Nr?null:nt.getPrimaries(M.colorSpace),Ee=M.colorSpace===Nr||Pe===me?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee);const Je=M.isCompressedTexture||M.image[0].isCompressedTexture,le=M.image[0]&&M.image[0].isDataTexture,Re=[];for(let te=0;te<6;te++)!Je&&!le?Re[te]=v(M.image[te],!0,n.maxCubemapSize):Re[te]=le?M.image[te].image:M.image[te],Re[te]=ze(M,Re[te]);const Ve=Re[0],We=a.convert(M.format,M.colorSpace),Te=a.convert(M.type),et=y(M.internalFormat,We,Te,M.colorSpace),Ye=M.isVideoTexture!==!0,at=J.__version===void 0||j===!0,I=oe.dataReady;let Me=S(M,Ve);Ie(i.TEXTURE_CUBE_MAP,M);let X;if(Je){Ye&&at&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Me,et,Ve.width,Ve.height);for(let te=0;te<6;te++){X=Re[te].mipmaps;for(let Se=0;Se<X.length;Se++){const ge=X[Se];M.format!==1023?We!==null?Ye?I&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,Se,0,0,ge.width,ge.height,We,ge.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,Se,et,ge.width,ge.height,0,ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ye?I&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,Se,0,0,ge.width,ge.height,We,Te,ge.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,Se,et,ge.width,ge.height,0,We,Te,ge.data)}}}else{if(X=M.mipmaps,Ye&&at){X.length>0&&Me++;const te=Ce(Re[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Me,et,te.width,te.height)}for(let te=0;te<6;te++)if(le){Ye?I&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Re[te].width,Re[te].height,We,Te,Re[te].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,et,Re[te].width,Re[te].height,0,We,Te,Re[te].data);for(let Se=0;Se<X.length;Se++){const ge=X[Se].image[te].image;Ye?I&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,Se+1,0,0,ge.width,ge.height,We,Te,ge.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,Se+1,et,ge.width,ge.height,0,We,Te,ge.data)}}else{Ye?I&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,We,Te,Re[te]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,et,We,Te,Re[te]);for(let Se=0;Se<X.length;Se++){const ge=X[Se];Ye?I&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,Se+1,0,0,We,Te,ge.image[te]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+te,Se+1,et,We,Te,ge.image[te])}}}p(M)&&m(i.TEXTURE_CUBE_MAP),J.__version=oe.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function ce(A,M,O,j,oe,J){const Pe=a.convert(O.format,O.colorSpace),me=a.convert(O.type),Ee=y(O.internalFormat,Pe,me,O.colorSpace);if(!r.get(M).__hasExternalTextures){const Je=Math.max(1,M.width>>J),le=Math.max(1,M.height>>J);oe===i.TEXTURE_3D||oe===i.TEXTURE_2D_ARRAY?t.texImage3D(oe,J,Ee,Je,le,M.depth,0,Pe,me,null):t.texImage2D(oe,J,Ee,Je,le,0,Pe,me,null)}t.bindFramebuffer(i.FRAMEBUFFER,A),be(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,oe,r.get(O).__webglTexture,0,ae(M)):(oe===i.TEXTURE_2D||oe>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&oe<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,j,oe,r.get(O).__webglTexture,J),t.bindFramebuffer(i.FRAMEBUFFER,null)}function xe(A,M,O){if(i.bindRenderbuffer(i.RENDERBUFFER,A),M.depthBuffer){const j=M.depthTexture,oe=j&&j.isDepthTexture?j.type:null,J=_(M.stencilBuffer,oe),Pe=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,me=ae(M);be(M)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,me,J,M.width,M.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,me,J,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,J,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Pe,i.RENDERBUFFER,A)}else{const j=M.textures;for(let oe=0;oe<j.length;oe++){const J=j[oe],Pe=a.convert(J.format,J.colorSpace),me=a.convert(J.type),Ee=y(J.internalFormat,Pe,me,J.colorSpace),Je=ae(M);O&&be(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Je,Ee,M.width,M.height):be(M)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Je,Ee,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,Ee,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function pe(A,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,A),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!r.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),V(M.depthTexture,0);const O=r.get(M.depthTexture).__webglTexture,j=ae(M);if(M.depthTexture.format===1026)be(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,O,0,j):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,O,0);else if(M.depthTexture.format===1027)be(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,O,0,j):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,O,0);else throw new Error("Unknown depthTexture format")}function Fe(A){const M=r.get(A),O=A.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==A.depthTexture){const j=A.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),j){const oe=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,j.removeEventListener("dispose",oe)};j.addEventListener("dispose",oe),M.__depthDisposeCallback=oe}M.__boundDepthTexture=j}if(A.depthTexture&&!M.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");pe(M.__webglFramebuffer,A)}else if(O){M.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[j]),M.__webglDepthbuffer[j]===void 0)M.__webglDepthbuffer[j]=i.createRenderbuffer(),xe(M.__webglDepthbuffer[j],A,!1);else{const oe=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,J=M.__webglDepthbuffer[j];i.bindRenderbuffer(i.RENDERBUFFER,J),i.framebufferRenderbuffer(i.FRAMEBUFFER,oe,i.RENDERBUFFER,J)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=i.createRenderbuffer(),xe(M.__webglDepthbuffer,A,!1);else{const j=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,oe=M.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,oe),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,oe)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ne(A,M,O){const j=r.get(A);M!==void 0&&ce(j.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),O!==void 0&&Fe(A)}function Be(A){const M=A.texture,O=r.get(A),j=r.get(M);A.addEventListener("dispose",T);const oe=A.textures,J=A.isWebGLCubeRenderTarget===!0,Pe=oe.length>1;if(Pe||(j.__webglTexture===void 0&&(j.__webglTexture=i.createTexture()),j.__version=M.version,s.memory.textures++),J){O.__webglFramebuffer=[];for(let me=0;me<6;me++)if(M.mipmaps&&M.mipmaps.length>0){O.__webglFramebuffer[me]=[];for(let Ee=0;Ee<M.mipmaps.length;Ee++)O.__webglFramebuffer[me][Ee]=i.createFramebuffer()}else O.__webglFramebuffer[me]=i.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){O.__webglFramebuffer=[];for(let me=0;me<M.mipmaps.length;me++)O.__webglFramebuffer[me]=i.createFramebuffer()}else O.__webglFramebuffer=i.createFramebuffer();if(Pe)for(let me=0,Ee=oe.length;me<Ee;me++){const Je=r.get(oe[me]);Je.__webglTexture===void 0&&(Je.__webglTexture=i.createTexture(),s.memory.textures++)}if(A.samples>0&&be(A)===!1){O.__webglMultisampledFramebuffer=i.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let me=0;me<oe.length;me++){const Ee=oe[me];O.__webglColorRenderbuffer[me]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,O.__webglColorRenderbuffer[me]);const Je=a.convert(Ee.format,Ee.colorSpace),le=a.convert(Ee.type),Re=y(Ee.internalFormat,Je,le,Ee.colorSpace,A.isXRRenderTarget===!0),Ve=ae(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ve,Re,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.RENDERBUFFER,O.__webglColorRenderbuffer[me])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(O.__webglDepthRenderbuffer=i.createRenderbuffer(),xe(O.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(J){t.bindTexture(i.TEXTURE_CUBE_MAP,j.__webglTexture),Ie(i.TEXTURE_CUBE_MAP,M);for(let me=0;me<6;me++)if(M.mipmaps&&M.mipmaps.length>0)for(let Ee=0;Ee<M.mipmaps.length;Ee++)ce(O.__webglFramebuffer[me][Ee],A,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ee);else ce(O.__webglFramebuffer[me],A,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+me,0);p(M)&&m(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Pe){for(let me=0,Ee=oe.length;me<Ee;me++){const Je=oe[me],le=r.get(Je);t.bindTexture(i.TEXTURE_2D,le.__webglTexture),Ie(i.TEXTURE_2D,Je),ce(O.__webglFramebuffer,A,Je,i.COLOR_ATTACHMENT0+me,i.TEXTURE_2D,0),p(Je)&&m(i.TEXTURE_2D)}t.unbindTexture()}else{let me=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(me=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(me,j.__webglTexture),Ie(me,M),M.mipmaps&&M.mipmaps.length>0)for(let Ee=0;Ee<M.mipmaps.length;Ee++)ce(O.__webglFramebuffer[Ee],A,M,i.COLOR_ATTACHMENT0,me,Ee);else ce(O.__webglFramebuffer,A,M,i.COLOR_ATTACHMENT0,me,0);p(M)&&m(me),t.unbindTexture()}A.depthBuffer&&Fe(A)}function re(A){const M=A.textures;for(let O=0,j=M.length;O<j;O++){const oe=M[O];if(p(oe)){const J=A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,Pe=r.get(oe).__webglTexture;t.bindTexture(J,Pe),m(J),t.unbindTexture()}}}const ie=[],C=[];function Le(A){if(A.samples>0){if(be(A)===!1){const M=A.textures,O=A.width,j=A.height;let oe=i.COLOR_BUFFER_BIT;const J=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Pe=r.get(A),me=M.length>1;if(me)for(let Ee=0;Ee<M.length;Ee++)t.bindFramebuffer(i.FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Pe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Pe.__webglFramebuffer);for(let Ee=0;Ee<M.length;Ee++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(oe|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(oe|=i.STENCIL_BUFFER_BIT)),me){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Pe.__webglColorRenderbuffer[Ee]);const Je=r.get(M[Ee]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Je,0)}i.blitFramebuffer(0,0,O,j,0,0,O,j,oe,i.NEAREST),l===!0&&(ie.length=0,C.length=0,ie.push(i.COLOR_ATTACHMENT0+Ee),A.depthBuffer&&A.resolveDepthBuffer===!1&&(ie.push(J),C.push(J),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,C)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ie))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),me)for(let Ee=0;Ee<M.length;Ee++){t.bindFramebuffer(i.FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.RENDERBUFFER,Pe.__webglColorRenderbuffer[Ee]);const Je=r.get(M[Ee]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Pe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.TEXTURE_2D,Je,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Pe.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const M=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[M])}}}function ae(A){return Math.min(n.maxSamples,A.samples)}function be(A){const M=r.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function fe(A){const M=s.render.frame;h.get(A)!==M&&(h.set(A,M),A.update())}function ze(A,M){const O=A.colorSpace,j=A.format,oe=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||O!==Fr&&O!==Nr&&(nt.getTransfer(O)===dt?(j!==1023||oe!==1009)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),M}function Ce(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=F,this.resetTextureUnits=E,this.setTexture2D=V,this.setTexture2DArray=Q,this.setTexture3D=D,this.setTextureCube=$,this.rebindTextures=Ne,this.setupRenderTarget=Be,this.updateRenderTargetMipmap=re,this.updateMultisampleRenderTarget=Le,this.setupDepthRenderbuffer=Fe,this.setupFrameBufferTexture=ce,this.useMultisampledRTT=be}function Nf(i,e){function t(r,n=Nr){let a;const s=nt.getTransfer(n);if(r===1009)return i.UNSIGNED_BYTE;if(r===1017)return i.UNSIGNED_SHORT_4_4_4_4;if(r===1018)return i.UNSIGNED_SHORT_5_5_5_1;if(r===35902)return i.UNSIGNED_INT_5_9_9_9_REV;if(r===1010)return i.BYTE;if(r===1011)return i.SHORT;if(r===1012)return i.UNSIGNED_SHORT;if(r===1013)return i.INT;if(r===1014)return i.UNSIGNED_INT;if(r===1015)return i.FLOAT;if(r===1016)return i.HALF_FLOAT;if(r===1021)return i.ALPHA;if(r===1022)return i.RGB;if(r===1023)return i.RGBA;if(r===1024)return i.LUMINANCE;if(r===1025)return i.LUMINANCE_ALPHA;if(r===1026)return i.DEPTH_COMPONENT;if(r===1027)return i.DEPTH_STENCIL;if(r===1028)return i.RED;if(r===1029)return i.RED_INTEGER;if(r===1030)return i.RG;if(r===1031)return i.RG_INTEGER;if(r===1033)return i.RGBA_INTEGER;if(r===33776||r===33777||r===33778||r===33779)if(s===dt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===33776)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===33777)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===33778)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===33779)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===33776)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===33777)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===33778)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===33779)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===35840||r===35841||r===35842||r===35843)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===35840)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===35841)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===35842)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===35843)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===36196||r===37492||r===37496)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(r===36196||r===37492)return s===dt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===37496)return s===dt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===37808||r===37809||r===37810||r===37811||r===37812||r===37813||r===37814||r===37815||r===37816||r===37817||r===37818||r===37819||r===37820||r===37821)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(r===37808)return s===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===37809)return s===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===37810)return s===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===37811)return s===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===37812)return s===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===37813)return s===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===37814)return s===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===37815)return s===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===37816)return s===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===37817)return s===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===37818)return s===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===37819)return s===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===37820)return s===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===37821)return s===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===36492||r===36494||r===36495)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(r===36492)return s===dt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===36494)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===36495)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===36283||r===36284||r===36285||r===36286)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(r===36492)return a.COMPRESSED_RED_RGTC1_EXT;if(r===36284)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===36285)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===36286)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===1020?i.UNSIGNED_INT_24_8:i[r]!==void 0?i[r]:null}return{convert:t}}class Df extends Yt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class qe extends wt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Of={type:"move"};class Oa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new qe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new qe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new w,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new w),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new qe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new w,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new w),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const r of e.hand.values())this._getHandJoint(t,r)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,r){let n=null,a=null,s=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){s=!0;for(const v of e.hand.values()){const p=t.getJointPose(v,r),m=this._getHandJoint(c,v);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const h=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],u=h.position.distanceTo(f.position),d=.02,g=.005;c.inputState.pinching&&u>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,r),a!==null&&(l.matrix.fromArray(a.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,a.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(a.linearVelocity)):l.hasLinearVelocity=!1,a.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(a.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(n=t.getPose(e.targetRaySpace,r),n===null&&a!==null&&(n=a),n!==null&&(o.matrix.fromArray(n.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,n.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(n.linearVelocity)):o.hasLinearVelocity=!1,n.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(n.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Of)))}return o!==null&&(o.visible=n!==null),l!==null&&(l.visible=a!==null),c!==null&&(c.visible=s!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const r=new qe;r.matrixAutoUpdate=!1,r.visible=!1,e.joints[t.jointName]=r,e.add(r)}return e.joints[t.jointName]}}const zf=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ff=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Bf{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,r){if(this.texture===null){const n=new Kt,a=e.properties.get(n);a.__webglTexture=t.texture,(t.depthNear!=r.depthNear||t.depthFar!=r.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,r=new St({vertexShader:zf,fragmentShader:Ff,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new W(new mt(20,20),r)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class kf extends Di{constructor(e,t){super();const r=this;let n=null,a=1,s=null,o="local-floor",l=1,c=null,h=null,f=null,u=null,d=null,g=null;const v=new Bf,p=t.getContextAttributes();let m=null,y=null;const _=[],S=[],P=new se;let T=null;const R=new Yt;R.layers.enable(1),R.viewport=new ht;const U=new Yt;U.layers.enable(2),U.viewport=new ht;const B=[R,U],x=new Df;x.layers.enable(1),x.layers.enable(2);let E=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let ce=_[K];return ce===void 0&&(ce=new Oa,_[K]=ce),ce.getTargetRaySpace()},this.getControllerGrip=function(K){let ce=_[K];return ce===void 0&&(ce=new Oa,_[K]=ce),ce.getGripSpace()},this.getHand=function(K){let ce=_[K];return ce===void 0&&(ce=new Oa,_[K]=ce),ce.getHandSpace()};function z(K){const ce=S.indexOf(K.inputSource);if(ce===-1)return;const xe=_[ce];xe!==void 0&&(xe.update(K.inputSource,K.frame,c||s),xe.dispatchEvent({type:K.type,data:K.inputSource}))}function V(){n.removeEventListener("select",z),n.removeEventListener("selectstart",z),n.removeEventListener("selectend",z),n.removeEventListener("squeeze",z),n.removeEventListener("squeezestart",z),n.removeEventListener("squeezeend",z),n.removeEventListener("end",V),n.removeEventListener("inputsourceschange",Q);for(let K=0;K<_.length;K++){const ce=S[K];ce!==null&&(S[K]=null,_[K].disconnect(ce))}E=null,F=null,v.reset(),e.setRenderTarget(m),d=null,u=null,f=null,n=null,y=null,rt.stop(),r.isPresenting=!1,e.setPixelRatio(T),e.setSize(P.width,P.height,!1),r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){a=K,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||s},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return u!==null?u:d},this.getBinding=function(){return f},this.getFrame=function(){return g},this.getSession=function(){return n},this.setSession=async function(K){if(n=K,n!==null){if(m=e.getRenderTarget(),n.addEventListener("select",z),n.addEventListener("selectstart",z),n.addEventListener("selectend",z),n.addEventListener("squeeze",z),n.addEventListener("squeezestart",z),n.addEventListener("squeezeend",z),n.addEventListener("end",V),n.addEventListener("inputsourceschange",Q),p.xrCompatible!==!0&&await t.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(P),n.renderState.layers===void 0){const ce={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:a};d=new XRWebGLLayer(n,t,ce),n.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),y=new ur(d.framebufferWidth,d.framebufferHeight,{format:1023,type:1009,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}else{let ce=null,xe=null,pe=null;p.depth&&(pe=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ce=p.stencil?1027:1026,xe=p.stencil?1020:1014);const Fe={colorFormat:t.RGBA8,depthFormat:pe,scaleFactor:a};f=new XRWebGLBinding(n,t),u=f.createProjectionLayer(Fe),n.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),y=new ur(u.textureWidth,u.textureHeight,{format:1023,type:1009,depthTexture:new Ul(u.textureWidth,u.textureHeight,xe,void 0,void 0,void 0,void 0,void 0,void 0,ce),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,s=await n.requestReferenceSpace(o),rt.setContext(n),rt.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function Q(K){for(let ce=0;ce<K.removed.length;ce++){const xe=K.removed[ce],pe=S.indexOf(xe);pe>=0&&(S[pe]=null,_[pe].disconnect(xe))}for(let ce=0;ce<K.added.length;ce++){const xe=K.added[ce];let pe=S.indexOf(xe);if(pe===-1){for(let Ne=0;Ne<_.length;Ne++)if(Ne>=S.length){S.push(xe),pe=Ne;break}else if(S[Ne]===null){S[Ne]=xe,pe=Ne;break}if(pe===-1)break}const Fe=_[pe];Fe&&Fe.connect(xe)}}const D=new w,$=new w;function G(K,ce,xe){D.setFromMatrixPosition(ce.matrixWorld),$.setFromMatrixPosition(xe.matrixWorld);const pe=D.distanceTo($),Fe=ce.projectionMatrix.elements,Ne=xe.projectionMatrix.elements,Be=Fe[14]/(Fe[10]-1),re=Fe[14]/(Fe[10]+1),ie=(Fe[9]+1)/Fe[5],C=(Fe[9]-1)/Fe[5],Le=(Fe[8]-1)/Fe[0],ae=(Ne[8]+1)/Ne[0],be=Be*Le,fe=Be*ae,ze=pe/(-Le+ae),Ce=ze*-Le;if(ce.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(Ce),K.translateZ(ze),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),Fe[10]===-1)K.projectionMatrix.copy(ce.projectionMatrix),K.projectionMatrixInverse.copy(ce.projectionMatrixInverse);else{const A=Be+ze,M=re+ze,O=be-Ce,j=fe+(pe-Ce),oe=ie*re/M*A,J=C*re/M*A;K.projectionMatrix.makePerspective(O,j,oe,J,A,M),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function ue(K,ce){ce===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(ce.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(n===null)return;let ce=K.near,xe=K.far;v.texture!==null&&(v.depthNear>0&&(ce=v.depthNear),v.depthFar>0&&(xe=v.depthFar)),x.near=U.near=R.near=ce,x.far=U.far=R.far=xe,(E!==x.near||F!==x.far)&&(n.updateRenderState({depthNear:x.near,depthFar:x.far}),E=x.near,F=x.far);const pe=K.parent,Fe=x.cameras;ue(x,pe);for(let Ne=0;Ne<Fe.length;Ne++)ue(Fe[Ne],pe);Fe.length===2?G(x,R,U):x.projectionMatrix.copy(R.projectionMatrix),de(K,x,pe)};function de(K,ce,xe){xe===null?K.matrix.copy(ce.matrixWorld):(K.matrix.copy(xe.matrixWorld),K.matrix.invert(),K.matrix.multiply(ce.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(ce.projectionMatrix),K.projectionMatrixInverse.copy(ce.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=Ci*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(u===null&&d===null))return l},this.setFoveation=function(K){l=K,u!==null&&(u.fixedFoveation=K),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=K)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(x)};let Ie=null;function ke(K,ce){if(h=ce.getViewerPose(c||s),g=ce,h!==null){const xe=h.views;d!==null&&(e.setRenderTargetFramebuffer(y,d.framebuffer),e.setRenderTarget(y));let pe=!1;xe.length!==x.cameras.length&&(x.cameras.length=0,pe=!0);for(let Ne=0;Ne<xe.length;Ne++){const Be=xe[Ne];let re=null;if(d!==null)re=d.getViewport(Be);else{const C=f.getViewSubImage(u,Be);re=C.viewport,Ne===0&&(e.setRenderTargetTextures(y,C.colorTexture,u.ignoreDepthValues?void 0:C.depthStencilTexture),e.setRenderTarget(y))}let ie=B[Ne];ie===void 0&&(ie=new Yt,ie.layers.enable(Ne),ie.viewport=new ht,B[Ne]=ie),ie.matrix.fromArray(Be.transform.matrix),ie.matrix.decompose(ie.position,ie.quaternion,ie.scale),ie.projectionMatrix.fromArray(Be.projectionMatrix),ie.projectionMatrixInverse.copy(ie.projectionMatrix).invert(),ie.viewport.set(re.x,re.y,re.width,re.height),Ne===0&&(x.matrix.copy(ie.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),pe===!0&&x.cameras.push(ie)}const Fe=n.enabledFeatures;if(Fe&&Fe.includes("depth-sensing")){const Ne=f.getDepthInformation(xe[0]);Ne&&Ne.isValid&&Ne.texture&&v.init(e,Ne,n.renderState)}}for(let xe=0;xe<_.length;xe++){const pe=S[xe],Fe=_[xe];pe!==null&&Fe!==void 0&&Fe.update(pe,ce,c||s)}Ie&&Ie(K,ce),ce.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:ce}),g=null}const rt=new Il;rt.setAnimationLoop(ke),this.setAnimationLoop=function(K){Ie=K},this.dispose=function(){}}}const jr=new Or,Gf=new Mt;function Vf(i,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function r(p,m){m.color.getRGB(p.fogColor.value,Cl(i)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function n(p,m,y,_,S){m.isMeshBasicMaterial||m.isMeshLambertMaterial?a(p,m):m.isMeshToonMaterial?(a(p,m),f(p,m)):m.isMeshPhongMaterial?(a(p,m),h(p,m)):m.isMeshStandardMaterial?(a(p,m),u(p,m),m.isMeshPhysicalMaterial&&d(p,m,S)):m.isMeshMatcapMaterial?(a(p,m),g(p,m)):m.isMeshDepthMaterial?a(p,m):m.isMeshDistanceMaterial?(a(p,m),v(p,m)):m.isMeshNormalMaterial?a(p,m):m.isLineBasicMaterial?(s(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?l(p,m,y,_):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function a(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===1&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===1&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const y=e.get(m),_=y.envMap,S=y.envMapRotation;_&&(p.envMap.value=_,jr.copy(S),jr.x*=-1,jr.y*=-1,jr.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(jr.y*=-1,jr.z*=-1),p.envMapRotation.value.setFromMatrix4(Gf.makeRotationFromEuler(jr)),p.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function s(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,y,_){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*y,p.scale.value=_*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function f(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function u(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function d(p,m,y){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===1&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=y.texture,p.transmissionSamplerSize.value.set(y.width,y.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function v(p,m){const y=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(y.matrixWorld),p.nearDistance.value=y.shadow.camera.near,p.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:n}}function Hf(i,e,t,r){let n={},a={},s=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,_){const S=_.program;r.uniformBlockBinding(y,S)}function c(y,_){let S=n[y.id];S===void 0&&(g(y),S=h(y),n[y.id]=S,y.addEventListener("dispose",p));const P=_.program;r.updateUBOMapping(y,P);const T=e.render.frame;a[y.id]!==T&&(u(y),a[y.id]=T)}function h(y){const _=f();y.__bindingPointIndex=_;const S=i.createBuffer(),P=y.__size,T=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,P,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,_,S),S}function f(){for(let y=0;y<o;y++)if(s.indexOf(y)===-1)return s.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){const _=n[y.id],S=y.uniforms,P=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,_);for(let T=0,R=S.length;T<R;T++){const U=Array.isArray(S[T])?S[T]:[S[T]];for(let B=0,x=U.length;B<x;B++){const E=U[B];if(d(E,T,B,P)===!0){const F=E.__offset,z=Array.isArray(E.value)?E.value:[E.value];let V=0;for(let Q=0;Q<z.length;Q++){const D=z[Q],$=v(D);typeof D=="number"||typeof D=="boolean"?(E.__data[0]=D,i.bufferSubData(i.UNIFORM_BUFFER,F+V,E.__data)):D.isMatrix3?(E.__data[0]=D.elements[0],E.__data[1]=D.elements[1],E.__data[2]=D.elements[2],E.__data[3]=0,E.__data[4]=D.elements[3],E.__data[5]=D.elements[4],E.__data[6]=D.elements[5],E.__data[7]=0,E.__data[8]=D.elements[6],E.__data[9]=D.elements[7],E.__data[10]=D.elements[8],E.__data[11]=0):(D.toArray(E.__data,V),V+=$.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,F,E.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(y,_,S,P){const T=y.value,R=_+"_"+S;if(P[R]===void 0)return typeof T=="number"||typeof T=="boolean"?P[R]=T:P[R]=T.clone(),!0;{const U=P[R];if(typeof T=="number"||typeof T=="boolean"){if(U!==T)return P[R]=T,!0}else if(U.equals(T)===!1)return U.copy(T),!0}return!1}function g(y){const _=y.uniforms;let S=0;const P=16;for(let R=0,U=_.length;R<U;R++){const B=Array.isArray(_[R])?_[R]:[_[R]];for(let x=0,E=B.length;x<E;x++){const F=B[x],z=Array.isArray(F.value)?F.value:[F.value];for(let V=0,Q=z.length;V<Q;V++){const D=z[V],$=v(D),G=S%P,ue=G%$.boundary,de=G+ue;S+=ue,de!==0&&P-de<$.storage&&(S+=P-de),F.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=S,S+=$.storage}}}const T=S%P;return T>0&&(S+=P-T),y.__size=S,y.__cache={},this}function v(y){const _={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(_.boundary=4,_.storage=4):y.isVector2?(_.boundary=8,_.storage=8):y.isVector3||y.isColor?(_.boundary=16,_.storage=12):y.isVector4?(_.boundary=16,_.storage=16):y.isMatrix3?(_.boundary=48,_.storage=48):y.isMatrix4?(_.boundary=64,_.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),_}function p(y){const _=y.target;_.removeEventListener("dispose",p);const S=s.indexOf(_.__bindingPointIndex);s.splice(S,1),i.deleteBuffer(n[_.id]),delete n[_.id],delete a[_.id]}function m(){for(const y in n)i.deleteBuffer(n[y]);s=[],n={},a={}}return{bind:l,update:c,dispose:m}}class Fl{constructor(e={}){const{canvas:t=Ic(),context:r=null,depth:n=!0,stencil:a=!1,alpha:s=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1}=e;this.isWebGLRenderer=!0;let u;if(r!==null){if(typeof WebGLRenderingContext<"u"&&r instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");u=r.getContextAttributes().alpha}else u=s;const d=new Uint32Array(4),g=new Int32Array(4);let v=null,p=null;const m=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=qt,this.toneMapping=0,this.toneMappingExposure=1;const _=this;let S=!1,P=0,T=0,R=null,U=-1,B=null;const x=new ht,E=new ht;let F=null;const z=new ve(0);let V=0,Q=t.width,D=t.height,$=1,G=null,ue=null;const de=new ht(0,0,Q,D),Ie=new ht(0,0,Q,D);let ke=!1;const rt=new hs;let K=!1,ce=!1;const xe=new Mt,pe=new Mt,Fe=new w,Ne=new ht,Be={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let re=!1;function ie(){return R===null?$:1}let C=r;function Le(b,N){return t.getContext(b,N)}try{const b={alpha:!0,depth:n,stencil:a,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${as}`),t.addEventListener("webglcontextlost",te,!1),t.addEventListener("webglcontextrestored",Se,!1),t.addEventListener("webglcontextcreationerror",ge,!1),C===null){const N="webgl2";if(C=Le(N,b),C===null)throw Le(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let ae,be,fe,ze,Ce,A,M,O,j,oe,J,Pe,me,Ee,Je,le,Re,Ve,We,Te,et,Ye,at,I;function Me(){ae=new $d(C),ae.init(),Ye=new Nf(C,ae),be=new Vd(C,ae,e,Ye),fe=new If(C),be.reverseDepthBuffer&&fe.buffers.depth.setReversed(!0),ze=new Jd(C),Ce=new gf,A=new Uf(C,ae,fe,Ce,be,Ye,ze),M=new Wd(_),O=new jd(_),j=new nh(C),at=new kd(C,j),oe=new Yd(C,j,ze,at),J=new Qd(C,oe,j,ze),We=new Zd(C,be,A),le=new Hd(Ce),Pe=new mf(_,M,O,ae,be,at,le),me=new Vf(_,Ce),Ee=new _f,Je=new bf(ae),Ve=new Bd(_,M,O,fe,J,u,l),Re=new Rf(_,J,be),I=new Hf(C,ze,be,fe),Te=new Gd(C,ae,ze),et=new Kd(C,ae,ze),ze.programs=Pe.programs,_.capabilities=be,_.extensions=ae,_.properties=Ce,_.renderLists=Ee,_.shadowMap=Re,_.state=fe,_.info=ze}Me();const X=new kf(_,C);this.xr=X,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){const b=ae.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=ae.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(b){b!==void 0&&($=b,this.setSize(Q,D,!1))},this.getSize=function(b){return b.set(Q,D)},this.setSize=function(b,N,k=!0){if(X.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Q=b,D=N,t.width=Math.floor(b*$),t.height=Math.floor(N*$),k===!0&&(t.style.width=b+"px",t.style.height=N+"px"),this.setViewport(0,0,b,N)},this.getDrawingBufferSize=function(b){return b.set(Q*$,D*$).floor()},this.setDrawingBufferSize=function(b,N,k){Q=b,D=N,$=k,t.width=Math.floor(b*k),t.height=Math.floor(N*k),this.setViewport(0,0,b,N)},this.getCurrentViewport=function(b){return b.copy(x)},this.getViewport=function(b){return b.copy(de)},this.setViewport=function(b,N,k,H){b.isVector4?de.set(b.x,b.y,b.z,b.w):de.set(b,N,k,H),fe.viewport(x.copy(de).multiplyScalar($).round())},this.getScissor=function(b){return b.copy(Ie)},this.setScissor=function(b,N,k,H){b.isVector4?Ie.set(b.x,b.y,b.z,b.w):Ie.set(b,N,k,H),fe.scissor(E.copy(Ie).multiplyScalar($).round())},this.getScissorTest=function(){return ke},this.setScissorTest=function(b){fe.setScissorTest(ke=b)},this.setOpaqueSort=function(b){G=b},this.setTransparentSort=function(b){ue=b},this.getClearColor=function(b){return b.copy(Ve.getClearColor())},this.setClearColor=function(){Ve.setClearColor.apply(Ve,arguments)},this.getClearAlpha=function(){return Ve.getClearAlpha()},this.setClearAlpha=function(){Ve.setClearAlpha.apply(Ve,arguments)},this.clear=function(b=!0,N=!0,k=!0){let H=0;if(b){let L=!1;if(R!==null){const he=R.texture.format;L=he===1033||he===1031||he===1029}if(L){const he=R.texture.type,Ae=he===1009||he===1014||he===1012||he===1020||he===1017||he===1018,Ue=Ve.getClearColor(),De=Ve.getClearAlpha(),$e=Ue.r,Xe=Ue.g,He=Ue.b;Ae?(d[0]=$e,d[1]=Xe,d[2]=He,d[3]=De,C.clearBufferuiv(C.COLOR,0,d)):(g[0]=$e,g[1]=Xe,g[2]=He,g[3]=De,C.clearBufferiv(C.COLOR,0,g))}else H|=C.COLOR_BUFFER_BIT}N&&(H|=C.DEPTH_BUFFER_BIT,C.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),k&&(H|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),C.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",te,!1),t.removeEventListener("webglcontextrestored",Se,!1),t.removeEventListener("webglcontextcreationerror",ge,!1),Ee.dispose(),Je.dispose(),Ce.dispose(),M.dispose(),O.dispose(),J.dispose(),at.dispose(),I.dispose(),Pe.dispose(),X.dispose(),X.removeEventListener("sessionstart",ot),X.removeEventListener("sessionend",tt),ft.stop()};function te(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function Se(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const b=ze.autoReset,N=Re.enabled,k=Re.autoUpdate,H=Re.needsUpdate,L=Re.type;Me(),ze.autoReset=b,Re.enabled=N,Re.autoUpdate=k,Re.needsUpdate=H,Re.type=L}function ge(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function st(b){const N=b.target;N.removeEventListener("dispose",st),Y(N)}function Y(b){ee(b),Ce.remove(b)}function ee(b){const N=Ce.get(b).programs;N!==void 0&&(N.forEach(function(k){Pe.releaseProgram(k)}),b.isShaderMaterial&&Pe.releaseShaderCache(b))}this.renderBufferDirect=function(b,N,k,H,L,he){N===null&&(N=Be);const Ae=L.isMesh&&L.matrixWorld.determinant()<0,Ue=pn(b,N,k,H,L);fe.setMaterial(H,Ae);let De=k.index,$e=1;if(H.wireframe===!0){if(De=oe.getWireframeAttribute(k),De===void 0)return;$e=2}const Xe=k.drawRange,He=k.attributes.position;let ct=Xe.start*$e,xt=(Xe.start+Xe.count)*$e;he!==null&&(ct=Math.max(ct,he.start*$e),xt=Math.min(xt,(he.start+he.count)*$e)),De!==null?(ct=Math.max(ct,0),xt=Math.min(xt,De.count)):He!=null&&(ct=Math.max(ct,0),xt=Math.min(xt,He.count));const Et=xt-ct;if(Et<0||Et===1/0)return;at.setup(L,H,Ue,k,De);let It,vt=Te;if(De!==null&&(It=j.get(De),vt=et,vt.setIndex(It)),L.isMesh)H.wireframe===!0?(fe.setLineWidth(H.wireframeLinewidth*ie()),vt.setMode(C.LINES)):vt.setMode(C.TRIANGLES);else if(L.isLine){let Oe=H.linewidth;Oe===void 0&&(Oe=1),fe.setLineWidth(Oe*ie()),L.isLineSegments?vt.setMode(C.LINES):L.isLineLoop?vt.setMode(C.LINE_LOOP):vt.setMode(C.LINE_STRIP)}else L.isPoints?vt.setMode(C.POINTS):L.isSprite&&vt.setMode(C.TRIANGLES);if(L.isBatchedMesh)if(L._multiDrawInstances!==null)vt.renderMultiDrawInstances(L._multiDrawStarts,L._multiDrawCounts,L._multiDrawCount,L._multiDrawInstances);else if(ae.get("WEBGL_multi_draw"))vt.renderMultiDraw(L._multiDrawStarts,L._multiDrawCounts,L._multiDrawCount);else{const Oe=L._multiDrawStarts,Ht=L._multiDrawCounts,Gr=L._multiDrawCount,ar=De?j.get(De).bytesPerElement:1,ni=Ce.get(H).currentProgram.getUniforms();for(let Qt=0;Qt<Gr;Qt++)ni.setValue(C,"_gl_DrawID",Qt),vt.render(Oe[Qt]/ar,Ht[Qt])}else if(L.isInstancedMesh)vt.renderInstances(ct,Et,L.count);else if(k.isInstancedBufferGeometry){const Oe=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,Ht=Math.min(k.instanceCount,Oe);vt.renderInstances(ct,Et,Ht)}else vt.render(ct,Et)};function Z(b,N,k){b.transparent===!0&&b.side===2&&b.forceSinglePass===!1?(b.side=1,b.needsUpdate=!0,gt(b,N,k),b.side=0,b.needsUpdate=!0,gt(b,N,k),b.side=2):gt(b,N,k)}this.compile=function(b,N,k=null){k===null&&(k=b),p=Je.get(k),p.init(N),y.push(p),k.traverseVisible(function(L){L.isLight&&L.layers.test(N.layers)&&(p.pushLight(L),L.castShadow&&p.pushShadow(L))}),b!==k&&b.traverseVisible(function(L){L.isLight&&L.layers.test(N.layers)&&(p.pushLight(L),L.castShadow&&p.pushShadow(L))}),p.setupLights();const H=new Set;return b.traverse(function(L){if(!(L.isMesh||L.isPoints||L.isLine||L.isSprite))return;const he=L.material;if(he)if(Array.isArray(he))for(let Ae=0;Ae<he.length;Ae++){const Ue=he[Ae];Z(Ue,k,L),H.add(Ue)}else Z(he,k,L),H.add(he)}),y.pop(),p=null,H},this.compileAsync=function(b,N,k=null){const H=this.compile(b,N,k);return new Promise(L=>{function he(){if(H.forEach(function(Ae){Ce.get(Ae).currentProgram.isReady()&&H.delete(Ae)}),H.size===0){L(b);return}setTimeout(he,10)}ae.get("KHR_parallel_shader_compile")!==null?he():setTimeout(he,10)})};let ye=null;function je(b){ye&&ye(b)}function ot(){ft.stop()}function tt(){ft.start()}const ft=new Il;ft.setAnimationLoop(je),typeof self<"u"&&ft.setContext(self),this.setAnimationLoop=function(b){ye=b,X.setAnimationLoop(b),b===null?ft.stop():ft.start()},X.addEventListener("sessionstart",ot),X.addEventListener("sessionend",tt),this.render=function(b,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),X.enabled===!0&&X.isPresenting===!0&&(X.cameraAutoUpdate===!0&&X.updateCamera(N),N=X.getCamera()),b.isScene===!0&&b.onBeforeRender(_,b,N,R),p=Je.get(b,y.length),p.init(N),y.push(p),pe.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),rt.setFromProjectionMatrix(pe),ce=this.localClippingEnabled,K=le.init(this.clippingPlanes,ce),v=Ee.get(b,m.length),v.init(),m.push(v),X.enabled===!0&&X.isPresenting===!0){const he=_.xr.getDepthSensingMesh();he!==null&&Bt(he,N,-1/0,_.sortObjects)}Bt(b,N,0,_.sortObjects),v.finish(),_.sortObjects===!0&&v.sort(G,ue),re=X.enabled===!1||X.isPresenting===!1||X.hasDepthSensing()===!1,re&&Ve.addToRenderList(v,b),this.info.render.frame++,K===!0&&le.beginShadows();const k=p.state.shadowsArray;Re.render(k,b,N),K===!0&&le.endShadows(),this.info.autoReset===!0&&this.info.reset();const H=v.opaque,L=v.transmissive;if(p.setupLights(),N.isArrayCamera){const he=N.cameras;if(L.length>0)for(let Ae=0,Ue=he.length;Ae<Ue;Ae++){const De=he[Ae];Jt(H,L,b,De)}re&&Ve.render(b);for(let Ae=0,Ue=he.length;Ae<Ue;Ae++){const De=he[Ae];Pt(v,b,De,De.viewport)}}else L.length>0&&Jt(H,L,b,N),re&&Ve.render(b),Pt(v,b,N);R!==null&&(A.updateMultisampleRenderTarget(R),A.updateRenderTargetMipmap(R)),b.isScene===!0&&b.onAfterRender(_,b,N),at.resetDefaultState(),U=-1,B=null,y.pop(),y.length>0?(p=y[y.length-1],K===!0&&le.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,m.pop(),m.length>0?v=m[m.length-1]:v=null};function Bt(b,N,k,H){if(b.visible===!1)return;if(b.layers.test(N.layers)){if(b.isGroup)k=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(N);else if(b.isLight)p.pushLight(b),b.castShadow&&p.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||rt.intersectsSprite(b)){H&&Ne.setFromMatrixPosition(b.matrixWorld).applyMatrix4(pe);const he=J.update(b),Ae=b.material;Ae.visible&&v.push(b,he,Ae,k,Ne.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||rt.intersectsObject(b))){const he=J.update(b),Ae=b.material;if(H&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Ne.copy(b.boundingSphere.center)):(he.boundingSphere===null&&he.computeBoundingSphere(),Ne.copy(he.boundingSphere.center)),Ne.applyMatrix4(b.matrixWorld).applyMatrix4(pe)),Array.isArray(Ae)){const Ue=he.groups;for(let De=0,$e=Ue.length;De<$e;De++){const Xe=Ue[De],He=Ae[Xe.materialIndex];He&&He.visible&&v.push(b,he,He,k,Ne.z,Xe)}}else Ae.visible&&v.push(b,he,Ae,k,Ne.z,null)}}const L=b.children;for(let he=0,Ae=L.length;he<Ae;he++)Bt(L[he],N,k,H)}function Pt(b,N,k,H){const L=b.opaque,he=b.transmissive,Ae=b.transparent;p.setupLightsView(k),K===!0&&le.setGlobalState(_.clippingPlanes,k),H&&fe.viewport(x.copy(H)),L.length>0&&Ot(L,N,k),he.length>0&&Ot(he,N,k),Ae.length>0&&Ot(Ae,N,k),fe.buffers.depth.setTest(!0),fe.buffers.depth.setMask(!0),fe.buffers.color.setMask(!0),fe.setPolygonOffset(!1)}function Jt(b,N,k,H){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[H.id]===void 0&&(p.state.transmissionRenderTarget[H.id]=new ur(1,1,{generateMipmaps:!0,type:ae.has("EXT_color_buffer_half_float")||ae.has("EXT_color_buffer_float")?1016:1009,minFilter:1008,samples:4,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:nt.workingColorSpace}));const L=p.state.transmissionRenderTarget[H.id],he=H.viewport||x;L.setSize(he.z,he.w);const Ae=_.getRenderTarget();_.setRenderTarget(L),_.getClearColor(z),V=_.getClearAlpha(),V<1&&_.setClearColor(16777215,.5),_.clear(),re&&Ve.render(k);const Ue=_.toneMapping;_.toneMapping=0;const De=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),p.setupLightsView(H),K===!0&&le.setGlobalState(_.clippingPlanes,H),Ot(b,k,H),A.updateMultisampleRenderTarget(L),A.updateRenderTargetMipmap(L),ae.has("WEBGL_multisampled_render_to_texture")===!1){let $e=!1;for(let Xe=0,He=N.length;Xe<He;Xe++){const ct=N[Xe],xt=ct.object,Et=ct.geometry,It=ct.material,vt=ct.group;if(It.side===2&&xt.layers.test(H.layers)){const Oe=It.side;It.side=1,It.needsUpdate=!0,rr(xt,k,H,Et,It,vt),It.side=Oe,It.needsUpdate=!0,$e=!0}}$e===!0&&(A.updateMultisampleRenderTarget(L),A.updateRenderTargetMipmap(L))}_.setRenderTarget(Ae),_.setClearColor(z,V),De!==void 0&&(H.viewport=De),_.toneMapping=Ue}function Ot(b,N,k){const H=N.isScene===!0?N.overrideMaterial:null;for(let L=0,he=b.length;L<he;L++){const Ae=b[L],Ue=Ae.object,De=Ae.geometry,$e=H===null?Ae.material:H,Xe=Ae.group;Ue.layers.test(k.layers)&&rr(Ue,N,k,De,$e,Xe)}}function rr(b,N,k,H,L,he){b.onBeforeRender(_,N,k,H,L,he),b.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),L.onBeforeRender(_,N,k,H,b,he),L.transparent===!0&&L.side===2&&L.forceSinglePass===!1?(L.side=1,L.needsUpdate=!0,_.renderBufferDirect(k,N,H,L,b,he),L.side=0,L.needsUpdate=!0,_.renderBufferDirect(k,N,H,L,b,he),L.side=2):_.renderBufferDirect(k,N,H,L,b,he),b.onAfterRender(_,N,k,H,L,he)}function gt(b,N,k){N.isScene!==!0&&(N=Be);const H=Ce.get(b),L=p.state.lights,he=p.state.shadowsArray,Ae=L.state.version,Ue=Pe.getParameters(b,L.state,he,N,k),De=Pe.getProgramCacheKey(Ue);let $e=H.programs;H.environment=b.isMeshStandardMaterial?N.environment:null,H.fog=N.fog,H.envMap=(b.isMeshStandardMaterial?O:M).get(b.envMap||H.environment),H.envMapRotation=H.environment!==null&&b.envMap===null?N.environmentRotation:b.envMapRotation,$e===void 0&&(b.addEventListener("dispose",st),$e=new Map,H.programs=$e);let Xe=$e.get(De);if(Xe!==void 0){if(H.currentProgram===Xe&&H.lightsStateVersion===Ae)return ii(b,Ue),Xe}else Ue.uniforms=Pe.getUniforms(b),b.onBeforeCompile(Ue,_),Xe=Pe.acquireProgram(Ue,De),$e.set(De,Xe),H.uniforms=Ue.uniforms;const He=H.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(He.clippingPlanes=le.uniform),ii(b,Ue),H.needsLights=oc(b),H.lightsStateVersion=Ae,H.needsLights&&(He.ambientLightColor.value=L.state.ambient,He.lightProbe.value=L.state.probe,He.directionalLights.value=L.state.directional,He.directionalLightShadows.value=L.state.directionalShadow,He.spotLights.value=L.state.spot,He.spotLightShadows.value=L.state.spotShadow,He.rectAreaLights.value=L.state.rectArea,He.ltc_1.value=L.state.rectAreaLTC1,He.ltc_2.value=L.state.rectAreaLTC2,He.pointLights.value=L.state.point,He.pointLightShadows.value=L.state.pointShadow,He.hemisphereLights.value=L.state.hemi,He.directionalShadowMap.value=L.state.directionalShadowMap,He.directionalShadowMatrix.value=L.state.directionalShadowMatrix,He.spotShadowMap.value=L.state.spotShadowMap,He.spotLightMatrix.value=L.state.spotLightMatrix,He.spotLightMap.value=L.state.spotLightMap,He.pointShadowMap.value=L.state.pointShadowMap,He.pointShadowMatrix.value=L.state.pointShadowMatrix),H.currentProgram=Xe,H.uniformsList=null,Xe}function xr(b){if(b.uniformsList===null){const N=b.currentProgram.getUniforms();b.uniformsList=qn.seqWithValue(N.seq,b.uniforms)}return b.uniformsList}function ii(b,N){const k=Ce.get(b);k.outputColorSpace=N.outputColorSpace,k.batching=N.batching,k.batchingColor=N.batchingColor,k.instancing=N.instancing,k.instancingColor=N.instancingColor,k.instancingMorph=N.instancingMorph,k.skinning=N.skinning,k.morphTargets=N.morphTargets,k.morphNormals=N.morphNormals,k.morphColors=N.morphColors,k.morphTargetsCount=N.morphTargetsCount,k.numClippingPlanes=N.numClippingPlanes,k.numIntersection=N.numClipIntersection,k.vertexAlphas=N.vertexAlphas,k.vertexTangents=N.vertexTangents,k.toneMapping=N.toneMapping}function pn(b,N,k,H,L){N.isScene!==!0&&(N=Be),A.resetTextureUnits();const he=N.fog,Ae=H.isMeshStandardMaterial?N.environment:null,Ue=R===null?_.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Fr,De=(H.isMeshStandardMaterial?O:M).get(H.envMap||Ae),$e=H.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,Xe=!!k.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),He=!!k.morphAttributes.position,ct=!!k.morphAttributes.normal,xt=!!k.morphAttributes.color;let Et=0;H.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(Et=_.toneMapping);const It=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,vt=It!==void 0?It.length:0,Oe=Ce.get(H),Ht=p.state.lights;if(K===!0&&(ce===!0||b!==B)){const ir=b===B&&H.id===U;le.setState(H,b,ir)}let Gr=!1;H.version===Oe.__version?(Oe.needsLights&&Oe.lightsStateVersion!==Ht.state.version||Oe.outputColorSpace!==Ue||L.isBatchedMesh&&Oe.batching===!1||!L.isBatchedMesh&&Oe.batching===!0||L.isBatchedMesh&&Oe.batchingColor===!0&&L.colorTexture===null||L.isBatchedMesh&&Oe.batchingColor===!1&&L.colorTexture!==null||L.isInstancedMesh&&Oe.instancing===!1||!L.isInstancedMesh&&Oe.instancing===!0||L.isSkinnedMesh&&Oe.skinning===!1||!L.isSkinnedMesh&&Oe.skinning===!0||L.isInstancedMesh&&Oe.instancingColor===!0&&L.instanceColor===null||L.isInstancedMesh&&Oe.instancingColor===!1&&L.instanceColor!==null||L.isInstancedMesh&&Oe.instancingMorph===!0&&L.morphTexture===null||L.isInstancedMesh&&Oe.instancingMorph===!1&&L.morphTexture!==null||Oe.envMap!==De||H.fog===!0&&Oe.fog!==he||Oe.numClippingPlanes!==void 0&&(Oe.numClippingPlanes!==le.numPlanes||Oe.numIntersection!==le.numIntersection)||Oe.vertexAlphas!==$e||Oe.vertexTangents!==Xe||Oe.morphTargets!==He||Oe.morphNormals!==ct||Oe.morphColors!==xt||Oe.toneMapping!==Et||Oe.morphTargetsCount!==vt)&&(Gr=!0):(Gr=!0,Oe.__version=H.version);let ar=Oe.currentProgram;Gr===!0&&(ar=gt(H,N,L));let ni=!1,Qt=!1,sa=!1;const Tt=ar.getUniforms(),Ar=Oe.uniforms;if(fe.useProgram(ar.program)&&(ni=!0,Qt=!0,sa=!0),H.id!==U&&(U=H.id,Qt=!0),ni||B!==b){be.reverseDepthBuffer?(xe.copy(b.projectionMatrix),Uc(xe),Nc(xe),Tt.setValue(C,"projectionMatrix",xe)):Tt.setValue(C,"projectionMatrix",b.projectionMatrix),Tt.setValue(C,"viewMatrix",b.matrixWorldInverse);const ir=Tt.map.cameraPosition;ir!==void 0&&ir.setValue(C,Fe.setFromMatrixPosition(b.matrixWorld)),be.logarithmicDepthBuffer&&Tt.setValue(C,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&Tt.setValue(C,"isOrthographic",b.isOrthographicCamera===!0),B!==b&&(B=b,Qt=!0,sa=!0)}if(L.isSkinnedMesh){Tt.setOptional(C,L,"bindMatrix"),Tt.setOptional(C,L,"bindMatrixInverse");const ir=L.skeleton;ir&&(ir.boneTexture===null&&ir.computeBoneTexture(),Tt.setValue(C,"boneTexture",ir.boneTexture,A))}L.isBatchedMesh&&(Tt.setOptional(C,L,"batchingTexture"),Tt.setValue(C,"batchingTexture",L._matricesTexture,A),Tt.setOptional(C,L,"batchingIdTexture"),Tt.setValue(C,"batchingIdTexture",L._indirectTexture,A),Tt.setOptional(C,L,"batchingColorTexture"),L._colorsTexture!==null&&Tt.setValue(C,"batchingColorTexture",L._colorsTexture,A));const oa=k.morphAttributes;if((oa.position!==void 0||oa.normal!==void 0||oa.color!==void 0)&&We.update(L,k,ar),(Qt||Oe.receiveShadow!==L.receiveShadow)&&(Oe.receiveShadow=L.receiveShadow,Tt.setValue(C,"receiveShadow",L.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(Ar.envMap.value=De,Ar.flipEnvMap.value=De.isCubeTexture&&De.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&N.environment!==null&&(Ar.envMapIntensity.value=N.environmentIntensity),Qt&&(Tt.setValue(C,"toneMappingExposure",_.toneMappingExposure),Oe.needsLights&&fn(Ar,sa),he&&H.fog===!0&&me.refreshFogUniforms(Ar,he),me.refreshMaterialUniforms(Ar,H,$,D,p.state.transmissionRenderTarget[b.id]),qn.upload(C,xr(Oe),Ar,A)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(qn.upload(C,xr(Oe),Ar,A),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&Tt.setValue(C,"center",L.center),Tt.setValue(C,"modelViewMatrix",L.modelViewMatrix),Tt.setValue(C,"normalMatrix",L.normalMatrix),Tt.setValue(C,"modelMatrix",L.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const ir=H.uniformsGroups;for(let la=0,lc=ir.length;la<lc;la++){const Ts=ir[la];I.update(Ts,ar),I.bind(Ts,ar)}}return ar}function fn(b,N){b.ambientLightColor.needsUpdate=N,b.lightProbe.needsUpdate=N,b.directionalLights.needsUpdate=N,b.directionalLightShadows.needsUpdate=N,b.pointLights.needsUpdate=N,b.pointLightShadows.needsUpdate=N,b.spotLights.needsUpdate=N,b.spotLightShadows.needsUpdate=N,b.rectAreaLights.needsUpdate=N,b.hemisphereLights.needsUpdate=N}function oc(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(b,N,k){Ce.get(b.texture).__webglTexture=N,Ce.get(b.depthTexture).__webglTexture=k;const H=Ce.get(b);H.__hasExternalTextures=!0,H.__autoAllocateDepthBuffer=k===void 0,H.__autoAllocateDepthBuffer||ae.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,N){const k=Ce.get(b);k.__webglFramebuffer=N,k.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(b,N=0,k=0){R=b,P=N,T=k;let H=!0,L=null,he=!1,Ae=!1;if(b){const Ue=Ce.get(b);if(Ue.__useDefaultFramebuffer!==void 0)fe.bindFramebuffer(C.FRAMEBUFFER,null),H=!1;else if(Ue.__webglFramebuffer===void 0)A.setupRenderTarget(b);else if(Ue.__hasExternalTextures)A.rebindTextures(b,Ce.get(b.texture).__webglTexture,Ce.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const Xe=b.depthTexture;if(Ue.__boundDepthTexture!==Xe){if(Xe!==null&&Ce.has(Xe)&&(b.width!==Xe.image.width||b.height!==Xe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");A.setupDepthRenderbuffer(b)}}const De=b.texture;(De.isData3DTexture||De.isDataArrayTexture||De.isCompressedArrayTexture)&&(Ae=!0);const $e=Ce.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray($e[N])?L=$e[N][k]:L=$e[N],he=!0):b.samples>0&&A.useMultisampledRTT(b)===!1?L=Ce.get(b).__webglMultisampledFramebuffer:Array.isArray($e)?L=$e[k]:L=$e,x.copy(b.viewport),E.copy(b.scissor),F=b.scissorTest}else x.copy(de).multiplyScalar($).floor(),E.copy(Ie).multiplyScalar($).floor(),F=ke;if(fe.bindFramebuffer(C.FRAMEBUFFER,L)&&H&&fe.drawBuffers(b,L),fe.viewport(x),fe.scissor(E),fe.setScissorTest(F),he){const Ue=Ce.get(b.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+N,Ue.__webglTexture,k)}else if(Ae){const Ue=Ce.get(b.texture),De=N||0;C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,Ue.__webglTexture,k||0,De)}U=-1},this.readRenderTargetPixels=function(b,N,k,H,L,he,Ae){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ue=Ce.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Ae!==void 0&&(Ue=Ue[Ae]),Ue){fe.bindFramebuffer(C.FRAMEBUFFER,Ue);try{const De=b.texture,$e=De.format,Xe=De.type;if(!be.textureFormatReadable($e)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!be.textureTypeReadable(Xe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=b.width-H&&k>=0&&k<=b.height-L&&C.readPixels(N,k,H,L,Ye.convert($e),Ye.convert(Xe),he)}finally{const De=R!==null?Ce.get(R).__webglFramebuffer:null;fe.bindFramebuffer(C.FRAMEBUFFER,De)}}},this.readRenderTargetPixelsAsync=async function(b,N,k,H,L,he,Ae){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ue=Ce.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Ae!==void 0&&(Ue=Ue[Ae]),Ue){const De=b.texture,$e=De.format,Xe=De.type;if(!be.textureFormatReadable($e))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!be.textureTypeReadable(Xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(N>=0&&N<=b.width-H&&k>=0&&k<=b.height-L){fe.bindFramebuffer(C.FRAMEBUFFER,Ue);const He=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,He),C.bufferData(C.PIXEL_PACK_BUFFER,he.byteLength,C.STREAM_READ),C.readPixels(N,k,H,L,Ye.convert($e),Ye.convert(Xe),0);const ct=R!==null?Ce.get(R).__webglFramebuffer:null;fe.bindFramebuffer(C.FRAMEBUFFER,ct);const xt=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await Lc(C,xt,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,He),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,he),C.deleteBuffer(He),C.deleteSync(xt),he}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(b,N=null,k=0){b.isTexture!==!0&&(Xn("WebGLRenderer: copyFramebufferToTexture function signature has changed."),N=arguments[0]||null,b=arguments[1]);const H=Math.pow(2,-k),L=Math.floor(b.image.width*H),he=Math.floor(b.image.height*H),Ae=N!==null?N.x:0,Ue=N!==null?N.y:0;A.setTexture2D(b,0),C.copyTexSubImage2D(C.TEXTURE_2D,k,0,0,Ae,Ue,L,he),fe.unbindTexture()},this.copyTextureToTexture=function(b,N,k=null,H=null,L=0){b.isTexture!==!0&&(Xn("WebGLRenderer: copyTextureToTexture function signature has changed."),H=arguments[0]||null,b=arguments[1],N=arguments[2],L=arguments[3]||0,k=null);let he,Ae,Ue,De,$e,Xe;k!==null?(he=k.max.x-k.min.x,Ae=k.max.y-k.min.y,Ue=k.min.x,De=k.min.y):(he=b.image.width,Ae=b.image.height,Ue=0,De=0),H!==null?($e=H.x,Xe=H.y):($e=0,Xe=0);const He=Ye.convert(N.format),ct=Ye.convert(N.type);A.setTexture2D(N,0),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,N.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,N.unpackAlignment);const xt=C.getParameter(C.UNPACK_ROW_LENGTH),Et=C.getParameter(C.UNPACK_IMAGE_HEIGHT),It=C.getParameter(C.UNPACK_SKIP_PIXELS),vt=C.getParameter(C.UNPACK_SKIP_ROWS),Oe=C.getParameter(C.UNPACK_SKIP_IMAGES),Ht=b.isCompressedTexture?b.mipmaps[L]:b.image;C.pixelStorei(C.UNPACK_ROW_LENGTH,Ht.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,Ht.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Ue),C.pixelStorei(C.UNPACK_SKIP_ROWS,De),b.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,L,$e,Xe,he,Ae,He,ct,Ht.data):b.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,L,$e,Xe,Ht.width,Ht.height,He,Ht.data):C.texSubImage2D(C.TEXTURE_2D,L,$e,Xe,he,Ae,He,ct,Ht),C.pixelStorei(C.UNPACK_ROW_LENGTH,xt),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,Et),C.pixelStorei(C.UNPACK_SKIP_PIXELS,It),C.pixelStorei(C.UNPACK_SKIP_ROWS,vt),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Oe),L===0&&N.generateMipmaps&&C.generateMipmap(C.TEXTURE_2D),fe.unbindTexture()},this.copyTextureToTexture3D=function(b,N,k=null,H=null,L=0){b.isTexture!==!0&&(Xn("WebGLRenderer: copyTextureToTexture3D function signature has changed."),k=arguments[0]||null,H=arguments[1]||null,b=arguments[2],N=arguments[3],L=arguments[4]||0);let he,Ae,Ue,De,$e,Xe,He,ct,xt;const Et=b.isCompressedTexture?b.mipmaps[L]:b.image;k!==null?(he=k.max.x-k.min.x,Ae=k.max.y-k.min.y,Ue=k.max.z-k.min.z,De=k.min.x,$e=k.min.y,Xe=k.min.z):(he=Et.width,Ae=Et.height,Ue=Et.depth,De=0,$e=0,Xe=0),H!==null?(He=H.x,ct=H.y,xt=H.z):(He=0,ct=0,xt=0);const It=Ye.convert(N.format),vt=Ye.convert(N.type);let Oe;if(N.isData3DTexture)A.setTexture3D(N,0),Oe=C.TEXTURE_3D;else if(N.isDataArrayTexture||N.isCompressedArrayTexture)A.setTexture2DArray(N,0),Oe=C.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,N.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,N.unpackAlignment);const Ht=C.getParameter(C.UNPACK_ROW_LENGTH),Gr=C.getParameter(C.UNPACK_IMAGE_HEIGHT),ar=C.getParameter(C.UNPACK_SKIP_PIXELS),ni=C.getParameter(C.UNPACK_SKIP_ROWS),Qt=C.getParameter(C.UNPACK_SKIP_IMAGES);C.pixelStorei(C.UNPACK_ROW_LENGTH,Et.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,Et.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,De),C.pixelStorei(C.UNPACK_SKIP_ROWS,$e),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Xe),b.isDataTexture||b.isData3DTexture?C.texSubImage3D(Oe,L,He,ct,xt,he,Ae,Ue,It,vt,Et.data):N.isCompressedArrayTexture?C.compressedTexSubImage3D(Oe,L,He,ct,xt,he,Ae,Ue,It,Et.data):C.texSubImage3D(Oe,L,He,ct,xt,he,Ae,Ue,It,vt,Et),C.pixelStorei(C.UNPACK_ROW_LENGTH,Ht),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,Gr),C.pixelStorei(C.UNPACK_SKIP_PIXELS,ar),C.pixelStorei(C.UNPACK_SKIP_ROWS,ni),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Qt),L===0&&N.generateMipmaps&&C.generateMipmap(Oe),fe.unbindTexture()},this.initRenderTarget=function(b){Ce.get(b).__webglFramebuffer===void 0&&A.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?A.setTextureCube(b,0):b.isData3DTexture?A.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?A.setTexture2DArray(b,0):A.setTexture2D(b,0),fe.unbindTexture()},this.resetState=function(){P=0,T=0,R=null,fe.reset(),at.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return 2e3}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===ls?"display-p3":"srgb",t.unpackColorSpace=nt.workingColorSpace===ea?"display-p3":"srgb"}}class vr{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new ve(e),this.density=t}clone(){return new vr(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Bl extends wt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Or,this.environmentIntensity=1,this.environmentRotation=new Or,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Wf{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=35044,this.updateRanges=[],this.version=0,this.uuid=fr()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,r){e*=this.stride,r*=t.stride;for(let n=0,a=this.stride;n<a;n++)this.array[e+n]=t.array[r+n];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=fr()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),r=new this.constructor(t,this.stride);return r.setUsage(this.usage),r}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=fr()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Wt=new w;class Zn{constructor(e,t,r,n=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=r,this.normalized=n}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,r=this.data.count;t<r;t++)Wt.fromBufferAttribute(this,t),Wt.applyMatrix4(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}applyNormalMatrix(e){for(let t=0,r=this.count;t<r;t++)Wt.fromBufferAttribute(this,t),Wt.applyNormalMatrix(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}transformDirection(e){for(let t=0,r=this.count;t<r;t++)Wt.fromBufferAttribute(this,t),Wt.transformDirection(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}getComponent(e,t){let r=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(r=hr(r,this.array)),r}setComponent(e,t,r){return this.normalized&&(r=lt(r,this.array)),this.data.array[e*this.data.stride+this.offset+t]=r,this}setX(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=hr(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=hr(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=hr(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=hr(t,this.array)),t}setXY(e,t,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),r=lt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=r,this}setXYZ(e,t,r,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),r=lt(r,this.array),n=lt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=r,this.data.array[e+2]=n,this}setXYZW(e,t,r,n,a){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),r=lt(r,this.array),n=lt(n,this.array),a=lt(a,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=r,this.data.array[e+2]=n,this.data.array[e+3]=a,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let r=0;r<this.count;r++){const n=r*this.data.stride+this.offset;for(let a=0;a<this.itemSize;a++)t.push(this.data.array[n+a])}return new Zt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Zn(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let r=0;r<this.count;r++){const n=r*this.data.stride+this.offset;for(let a=0;a<this.itemSize;a++)t.push(this.data.array[n+a])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class zi extends ti{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ve(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let _i;const Xi=new w,xi=new w,yi=new w,Si=new se,qi=new se,kl=new Mt,Dn=new w,ji=new w,On=new w,vo=new se,za=new se,_o=new se;class cn extends wt{constructor(e=new zi){if(super(),this.isSprite=!0,this.type="Sprite",_i===void 0){_i=new pt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),r=new Wf(t,5);_i.setIndex([0,1,2,0,2,3]),_i.setAttribute("position",new Zn(r,3,0,!1)),_i.setAttribute("uv",new Zn(r,2,3,!1))}this.geometry=_i,this.material=e,this.center=new se(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),xi.setFromMatrixScale(this.matrixWorld),kl.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),yi.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&xi.multiplyScalar(-yi.z);const r=this.material.rotation;let n,a;r!==0&&(a=Math.cos(r),n=Math.sin(r));const s=this.center;zn(Dn.set(-.5,-.5,0),yi,s,xi,n,a),zn(ji.set(.5,-.5,0),yi,s,xi,n,a),zn(On.set(.5,.5,0),yi,s,xi,n,a),vo.set(0,0),za.set(1,0),_o.set(1,1);let o=e.ray.intersectTriangle(Dn,ji,On,!1,Xi);if(o===null&&(zn(ji.set(-.5,.5,0),yi,s,xi,n,a),za.set(0,1),o=e.ray.intersectTriangle(Dn,On,ji,!1,Xi),o===null))return;const l=e.ray.origin.distanceTo(Xi);l<e.near||l>e.far||t.push({distance:l,point:Xi.clone(),uv:Mi.getInterpolation(Xi,Dn,ji,On,vo,za,_o,new se),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function zn(i,e,t,r,n,a){Si.subVectors(i,t).addScalar(.5).multiply(r),n!==void 0?(qi.x=a*Si.x-n*Si.y,qi.y=n*Si.x+a*Si.y):qi.copy(Si),i.copy(e),i.x+=qi.x,i.y+=qi.y,i.applyMatrix4(kl)}class ia extends ti{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ve(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const xo=new Mt,Ya=new yl,Fn=new ta,Bn=new w;class ps extends wt{constructor(e=new pt,t=new ia){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const r=this.geometry,n=this.matrixWorld,a=e.params.Points.threshold,s=r.drawRange;if(r.boundingSphere===null&&r.computeBoundingSphere(),Fn.copy(r.boundingSphere),Fn.applyMatrix4(n),Fn.radius+=a,e.ray.intersectsSphere(Fn)===!1)return;xo.copy(n).invert(),Ya.copy(e.ray).applyMatrix4(xo);const o=a/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=r.index,h=r.attributes.position;if(c!==null){const f=Math.max(0,s.start),u=Math.min(c.count,s.start+s.count);for(let d=f,g=u;d<g;d++){const v=c.getX(d);Bn.fromBufferAttribute(h,v),yo(Bn,v,l,n,e,t,this)}}else{const f=Math.max(0,s.start),u=Math.min(h.count,s.start+s.count);for(let d=f,g=u;d<g;d++)Bn.fromBufferAttribute(h,d),yo(Bn,d,l,n,e,t,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){const r=e[t[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let n=0,a=r.length;n<a;n++){const s=r[n].name||String(n);this.morphTargetInfluences.push(0),this.morphTargetDictionary[s]=n}}}}}function yo(i,e,t,r,n,a,s){const o=Ya.distanceSqToPoint(i);if(o<t){const l=new w;Ya.closestPointToPoint(i,l),l.applyMatrix4(r);const c=n.ray.origin.distanceTo(l);if(c<n.near||c>n.far)return;a.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:s})}}class Rt extends Kt{constructor(e,t,r,n,a,s,o,l,c){super(e,t,r,n,a,s,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class _r{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const r=this.getUtoTmapping(e);return this.getPoint(r,t)}getPoints(e=5){const t=[];for(let r=0;r<=e;r++)t.push(this.getPoint(r/e));return t}getSpacedPoints(e=5){const t=[];for(let r=0;r<=e;r++)t.push(this.getPointAt(r/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let r,n=this.getPoint(0),a=0;t.push(0);for(let s=1;s<=e;s++)r=this.getPoint(s/e),a+=r.distanceTo(n),t.push(a),n=r;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const r=this.getLengths();let n=0;const a=r.length;let s;t?s=t:s=e*r[a-1];let o=0,l=a-1,c;for(;o<=l;)if(n=Math.floor(o+(l-o)/2),c=r[n]-s,c<0)o=n+1;else if(c>0)l=n-1;else{l=n;break}if(n=l,r[n]===s)return n/(a-1);const h=r[n],f=r[n+1]-h,u=(s-h)/f;return(n+u)/(a-1)}getTangent(e,t){let r=e-1e-4,n=e+1e-4;r<0&&(r=0),n>1&&(n=1);const a=this.getPoint(r),s=this.getPoint(n),o=t||(a.isVector2?new se:new w);return o.copy(s).sub(a).normalize(),o}getTangentAt(e,t){const r=this.getUtoTmapping(e);return this.getTangent(r,t)}computeFrenetFrames(e,t){const r=new w,n=[],a=[],s=[],o=new w,l=new Mt;for(let d=0;d<=e;d++){const g=d/e;n[d]=this.getTangentAt(g,new w)}a[0]=new w,s[0]=new w;let c=Number.MAX_VALUE;const h=Math.abs(n[0].x),f=Math.abs(n[0].y),u=Math.abs(n[0].z);h<=c&&(c=h,r.set(1,0,0)),f<=c&&(c=f,r.set(0,1,0)),u<=c&&r.set(0,0,1),o.crossVectors(n[0],r).normalize(),a[0].crossVectors(n[0],o),s[0].crossVectors(n[0],a[0]);for(let d=1;d<=e;d++){if(a[d]=a[d-1].clone(),s[d]=s[d-1].clone(),o.crossVectors(n[d-1],n[d]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Lt(n[d-1].dot(n[d]),-1,1));a[d].applyMatrix4(l.makeRotationAxis(o,g))}s[d].crossVectors(n[d],a[d])}if(t===!0){let d=Math.acos(Lt(a[0].dot(a[e]),-1,1));d/=e,n[0].dot(o.crossVectors(a[0],a[e]))>0&&(d=-d);for(let g=1;g<=e;g++)a[g].applyMatrix4(l.makeRotationAxis(n[g],d*g)),s[g].crossVectors(n[g],a[g])}return{tangents:n,normals:a,binormals:s}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class fs extends _r{constructor(e=0,t=0,r=1,n=1,a=0,s=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=r,this.yRadius=n,this.aStartAngle=a,this.aEndAngle=s,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new se){const r=t,n=Math.PI*2;let a=this.aEndAngle-this.aStartAngle;const s=Math.abs(a)<Number.EPSILON;for(;a<0;)a+=n;for(;a>n;)a-=n;a<Number.EPSILON&&(s?a=0:a=n),this.aClockwise===!0&&!s&&(a===n?a=-n:a=a-n);const o=this.aStartAngle+e*a;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),f=Math.sin(this.aRotation),u=l-this.aX,d=c-this.aY;l=u*h-d*f+this.aX,c=u*f+d*h+this.aY}return r.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Xf extends fs{constructor(e,t,r,n,a,s){super(e,t,r,r,n,a,s),this.isArcCurve=!0,this.type="ArcCurve"}}function ms(){let i=0,e=0,t=0,r=0;function n(a,s,o,l){i=a,e=o,t=-3*a+3*s-2*o-l,r=2*a-2*s+o+l}return{initCatmullRom:function(a,s,o,l,c){n(s,o,c*(o-a),c*(l-s))},initNonuniformCatmullRom:function(a,s,o,l,c,h,f){let u=(s-a)/c-(o-a)/(c+h)+(o-s)/h,d=(o-s)/h-(l-s)/(h+f)+(l-o)/f;u*=h,d*=h,n(s,o,u,d)},calc:function(a){const s=a*a,o=s*a;return i+e*a+t*s+r*o}}}const kn=new w,Fa=new ms,Ba=new ms,ka=new ms;class Er extends _r{constructor(e=[],t=!1,r="centripetal",n=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=r,this.tension=n}getPoint(e,t=new w){const r=t,n=this.points,a=n.length,s=(a-(this.closed?0:1))*e;let o=Math.floor(s),l=s-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/a)+1)*a:l===0&&o===a-1&&(o=a-2,l=1);let c,h;this.closed||o>0?c=n[(o-1)%a]:(kn.subVectors(n[0],n[1]).add(n[0]),c=kn);const f=n[o%a],u=n[(o+1)%a];if(this.closed||o+2<a?h=n[(o+2)%a]:(kn.subVectors(n[a-1],n[a-2]).add(n[a-1]),h=kn),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(f),d),v=Math.pow(f.distanceToSquared(u),d),p=Math.pow(u.distanceToSquared(h),d);v<1e-4&&(v=1),g<1e-4&&(g=v),p<1e-4&&(p=v),Fa.initNonuniformCatmullRom(c.x,f.x,u.x,h.x,g,v,p),Ba.initNonuniformCatmullRom(c.y,f.y,u.y,h.y,g,v,p),ka.initNonuniformCatmullRom(c.z,f.z,u.z,h.z,g,v,p)}else this.curveType==="catmullrom"&&(Fa.initCatmullRom(c.x,f.x,u.x,h.x,this.tension),Ba.initCatmullRom(c.y,f.y,u.y,h.y,this.tension),ka.initCatmullRom(c.z,f.z,u.z,h.z,this.tension));return r.set(Fa.calc(l),Ba.calc(l),ka.calc(l)),r}copy(e){super.copy(e),this.points=[];for(let t=0,r=e.points.length;t<r;t++){const n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,r=this.points.length;t<r;t++){const n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,r=e.points.length;t<r;t++){const n=e.points[t];this.points.push(new w().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function So(i,e,t,r,n){const a=(r-e)*.5,s=(n-t)*.5,o=i*i,l=i*o;return(2*t-2*r+a+s)*l+(-3*t+3*r-2*a-s)*o+a*i+t}function qf(i,e){const t=1-i;return t*t*e}function jf(i,e){return 2*(1-i)*i*e}function $f(i,e){return i*i*e}function Zi(i,e,t,r){return qf(i,e)+jf(i,t)+$f(i,r)}function Yf(i,e){const t=1-i;return t*t*t*e}function Kf(i,e){const t=1-i;return 3*t*t*i*e}function Jf(i,e){return 3*(1-i)*i*i*e}function Zf(i,e){return i*i*i*e}function Qi(i,e,t,r,n){return Yf(i,e)+Kf(i,t)+Jf(i,r)+Zf(i,n)}class Gl extends _r{constructor(e=new se,t=new se,r=new se,n=new se){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=r,this.v3=n}getPoint(e,t=new se){const r=t,n=this.v0,a=this.v1,s=this.v2,o=this.v3;return r.set(Qi(e,n.x,a.x,s.x,o.x),Qi(e,n.y,a.y,s.y,o.y)),r}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Qf extends _r{constructor(e=new w,t=new w,r=new w,n=new w){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=r,this.v3=n}getPoint(e,t=new w){const r=t,n=this.v0,a=this.v1,s=this.v2,o=this.v3;return r.set(Qi(e,n.x,a.x,s.x,o.x),Qi(e,n.y,a.y,s.y,o.y),Qi(e,n.z,a.z,s.z,o.z)),r}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Vl extends _r{constructor(e=new se,t=new se){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new se){const r=t;return e===1?r.copy(this.v2):(r.copy(this.v2).sub(this.v1),r.multiplyScalar(e).add(this.v1)),r}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new se){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class em extends _r{constructor(e=new w,t=new w){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new w){const r=t;return e===1?r.copy(this.v2):(r.copy(this.v2).sub(this.v1),r.multiplyScalar(e).add(this.v1)),r}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new w){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Hl extends _r{constructor(e=new se,t=new se,r=new se){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=r}getPoint(e,t=new se){const r=t,n=this.v0,a=this.v1,s=this.v2;return r.set(Zi(e,n.x,a.x,s.x),Zi(e,n.y,a.y,s.y)),r}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class tm extends _r{constructor(e=new w,t=new w,r=new w){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=r}getPoint(e,t=new w){const r=t,n=this.v0,a=this.v1,s=this.v2;return r.set(Zi(e,n.x,a.x,s.x),Zi(e,n.y,a.y,s.y),Zi(e,n.z,a.z,s.z)),r}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Wl extends _r{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new se){const r=t,n=this.points,a=(n.length-1)*e,s=Math.floor(a),o=a-s,l=n[s===0?s:s-1],c=n[s],h=n[s>n.length-2?n.length-1:s+1],f=n[s>n.length-3?n.length-1:s+2];return r.set(So(o,l.x,c.x,h.x,f.x),So(o,l.y,c.y,h.y,f.y)),r}copy(e){super.copy(e),this.points=[];for(let t=0,r=e.points.length;t<r;t++){const n=e.points[t];this.points.push(n.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,r=this.points.length;t<r;t++){const n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,r=e.points.length;t<r;t++){const n=e.points[t];this.points.push(new se().fromArray(n))}return this}}var Ka=Object.freeze({__proto__:null,ArcCurve:Xf,CatmullRomCurve3:Er,CubicBezierCurve:Gl,CubicBezierCurve3:Qf,EllipseCurve:fs,LineCurve:Vl,LineCurve3:em,QuadraticBezierCurve:Hl,QuadraticBezierCurve3:tm,SplineCurve:Wl});class rm extends _r{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const r=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ka[r](t,e))}return this}getPoint(e,t){const r=e*this.getLength(),n=this.getCurveLengths();let a=0;for(;a<n.length;){if(n[a]>=r){const s=n[a]-r,o=this.curves[a],l=o.getLength(),c=l===0?0:1-s/l;return o.getPointAt(c,t)}a++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let r=0,n=this.curves.length;r<n;r++)t+=this.curves[r].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let r=0;r<=e;r++)t.push(this.getPoint(r/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let r;for(let n=0,a=this.curves;n<a.length;n++){const s=a[n],o=s.isEllipseCurve?e*2:s.isLineCurve||s.isLineCurve3?1:s.isSplineCurve?e*s.points.length:e,l=s.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];r&&r.equals(h)||(t.push(h),r=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,r=e.curves.length;t<r;t++){const n=e.curves[t];this.curves.push(n.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,r=this.curves.length;t<r;t++){const n=this.curves[t];e.curves.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,r=e.curves.length;t<r;t++){const n=e.curves[t];this.curves.push(new Ka[n.type]().fromJSON(n))}return this}}class Ja extends rm{constructor(e){super(),this.type="Path",this.currentPoint=new se,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,r=e.length;t<r;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const r=new Vl(this.currentPoint.clone(),new se(e,t));return this.curves.push(r),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,r,n){const a=new Hl(this.currentPoint.clone(),new se(e,t),new se(r,n));return this.curves.push(a),this.currentPoint.set(r,n),this}bezierCurveTo(e,t,r,n,a,s){const o=new Gl(this.currentPoint.clone(),new se(e,t),new se(r,n),new se(a,s));return this.curves.push(o),this.currentPoint.set(a,s),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),r=new Wl(t);return this.curves.push(r),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,r,n,a,s){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,r,n,a,s),this}absarc(e,t,r,n,a,s){return this.absellipse(e,t,r,r,n,a,s),this}ellipse(e,t,r,n,a,s,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,r,n,a,s,o,l),this}absellipse(e,t,r,n,a,s,o,l){const c=new fs(e,t,r,n,a,s,o,l);if(this.curves.length>0){const f=c.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class gs extends pt{constructor(e=[new se(0,-.5),new se(.5,0),new se(0,.5)],t=12,r=0,n=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:r,phiLength:n},t=Math.floor(t),n=Lt(n,0,Math.PI*2);const a=[],s=[],o=[],l=[],c=[],h=1/t,f=new w,u=new se,d=new w,g=new w,v=new w;let p=0,m=0;for(let y=0;y<=e.length-1;y++)switch(y){case 0:p=e[y+1].x-e[y].x,m=e[y+1].y-e[y].y,d.x=m*1,d.y=-p,d.z=m*0,v.copy(d),d.normalize(),l.push(d.x,d.y,d.z);break;case e.length-1:l.push(v.x,v.y,v.z);break;default:p=e[y+1].x-e[y].x,m=e[y+1].y-e[y].y,d.x=m*1,d.y=-p,d.z=m*0,g.copy(d),d.x+=v.x,d.y+=v.y,d.z+=v.z,d.normalize(),l.push(d.x,d.y,d.z),v.copy(g)}for(let y=0;y<=t;y++){const _=r+y*h*n,S=Math.sin(_),P=Math.cos(_);for(let T=0;T<=e.length-1;T++){f.x=e[T].x*S,f.y=e[T].y,f.z=e[T].x*P,s.push(f.x,f.y,f.z),u.x=y/t,u.y=T/(e.length-1),o.push(u.x,u.y);const R=l[3*T+0]*S,U=l[3*T+1],B=l[3*T+0]*P;c.push(R,U,B)}}for(let y=0;y<t;y++)for(let _=0;_<e.length-1;_++){const S=_+y*e.length,P=S,T=S+e.length,R=S+e.length+1,U=S+1;a.push(P,T,U),a.push(R,U,T)}this.setIndex(a),this.setAttribute("position",new Ke(s,3)),this.setAttribute("uv",new Ke(o,2)),this.setAttribute("normal",new Ke(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gs(e.points,e.segments,e.phiStart,e.phiLength)}}class vs extends gs{constructor(e=1,t=1,r=4,n=8){const a=new Ja;a.absarc(0,-t/2,e,Math.PI*1.5,0),a.absarc(0,t/2,e,0,Math.PI*.5),super(a.getPoints(r),n),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:r,radialSegments:n}}static fromJSON(e){return new vs(e.radius,e.length,e.capSegments,e.radialSegments)}}class Fi extends pt{constructor(e=1,t=32,r=0,n=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:r,thetaLength:n},t=Math.max(3,t);const a=[],s=[],o=[],l=[],c=new w,h=new se;s.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let f=0,u=3;f<=t;f++,u+=3){const d=r+f/t*n;c.x=e*Math.cos(d),c.y=e*Math.sin(d),s.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(s[u]/e+1)/2,h.y=(s[u+1]/e+1)/2,l.push(h.x,h.y)}for(let f=1;f<=t;f++)a.push(f,f+1,0);this.setIndex(a),this.setAttribute("position",new Ke(s,3)),this.setAttribute("normal",new Ke(o,3)),this.setAttribute("uv",new Ke(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Fi(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Ft extends pt{constructor(e=1,t=1,r=1,n=32,a=1,s=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:r,radialSegments:n,heightSegments:a,openEnded:s,thetaStart:o,thetaLength:l};const c=this;n=Math.floor(n),a=Math.floor(a);const h=[],f=[],u=[],d=[];let g=0;const v=[],p=r/2;let m=0;y(),s===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new Ke(f,3)),this.setAttribute("normal",new Ke(u,3)),this.setAttribute("uv",new Ke(d,2));function y(){const S=new w,P=new w;let T=0;const R=(t-e)/r;for(let U=0;U<=a;U++){const B=[],x=U/a,E=x*(t-e)+e;for(let F=0;F<=n;F++){const z=F/n,V=z*l+o,Q=Math.sin(V),D=Math.cos(V);P.x=E*Q,P.y=-x*r+p,P.z=E*D,f.push(P.x,P.y,P.z),S.set(Q,R,D).normalize(),u.push(S.x,S.y,S.z),d.push(z,1-x),B.push(g++)}v.push(B)}for(let U=0;U<n;U++)for(let B=0;B<a;B++){const x=v[B][U],E=v[B+1][U],F=v[B+1][U+1],z=v[B][U+1];e>0&&(h.push(x,E,z),T+=3),t>0&&(h.push(E,F,z),T+=3)}c.addGroup(m,T,0),m+=T}function _(S){const P=g,T=new se,R=new w;let U=0;const B=S===!0?e:t,x=S===!0?1:-1;for(let F=1;F<=n;F++)f.push(0,p*x,0),u.push(0,x,0),d.push(.5,.5),g++;const E=g;for(let F=0;F<=n;F++){const z=F/n*l+o,V=Math.cos(z),Q=Math.sin(z);R.x=B*Q,R.y=p*x,R.z=B*V,f.push(R.x,R.y,R.z),u.push(0,x,0),T.x=V*.5+.5,T.y=Q*.5*x+.5,d.push(T.x,T.y),g++}for(let F=0;F<n;F++){const z=P+F,V=E+F;S===!0?h.push(V,V+1,z):h.push(V+1,V,z),U+=3}c.addGroup(m,U,S===!0?1:2),m+=U}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ft(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Pi extends Ft{constructor(e=1,t=1,r=32,n=1,a=!1,s=0,o=Math.PI*2){super(0,e,t,r,n,a,s,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:r,heightSegments:n,openEnded:a,thetaStart:s,thetaLength:o}}static fromJSON(e){return new Pi(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class na extends Ja{constructor(e){super(e),this.uuid=fr(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let r=0,n=this.holes.length;r<n;r++)t[r]=this.holes[r].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,r=e.holes.length;t<r;t++){const n=e.holes[t];this.holes.push(n.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,r=this.holes.length;t<r;t++){const n=this.holes[t];e.holes.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,r=e.holes.length;t<r;t++){const n=e.holes[t];this.holes.push(new Ja().fromJSON(n))}return this}}const im={triangulate:function(i,e,t=2){const r=e&&e.length,n=r?e[0]*t:i.length;let a=Xl(i,0,n,t,!0);const s=[];if(!a||a.next===a.prev)return s;let o,l,c,h,f,u,d;if(r&&(a=lm(i,e,a,t)),i.length>80*t){o=c=i[0],l=h=i[1];for(let g=t;g<n;g+=t)f=i[g],u=i[g+1],f<o&&(o=f),u<l&&(l=u),f>c&&(c=f),u>h&&(h=u);d=Math.max(c-o,h-l),d=d!==0?32767/d:0}return tn(a,s,t,o,l,d,0),s}};function Xl(i,e,t,r,n){let a,s;if(n===xm(i,e,t,r)>0)for(a=e;a<t;a+=r)s=Mo(a,i[a],i[a+1],s);else for(a=t-r;a>=e;a-=r)s=Mo(a,i[a],i[a+1],s);return s&&aa(s,s.next)&&(nn(s),s=s.next),s}function Qr(i,e){if(!i)return i;e||(e=i);let t=i,r;do if(r=!1,!t.steiner&&(aa(t,t.next)||yt(t.prev,t,t.next)===0)){if(nn(t),t=e=t.prev,t===t.next)break;r=!0}else t=t.next;while(r||t!==e);return e}function tn(i,e,t,r,n,a,s){if(!i)return;!s&&a&&pm(i,r,n,a);let o=i,l,c;for(;i.prev!==i.next;){if(l=i.prev,c=i.next,a?am(i,r,n,a):nm(i)){e.push(l.i/t|0),e.push(i.i/t|0),e.push(c.i/t|0),nn(i),i=c.next,o=c.next;continue}if(i=c,i===o){s?s===1?(i=sm(Qr(i),e,t),tn(i,e,t,r,n,a,2)):s===2&&om(i,e,t,r,n,a):tn(Qr(i),e,t,r,n,a,1);break}}}function nm(i){const e=i.prev,t=i,r=i.next;if(yt(e,t,r)>=0)return!1;const n=e.x,a=t.x,s=r.x,o=e.y,l=t.y,c=r.y,h=n<a?n<s?n:s:a<s?a:s,f=o<l?o<c?o:c:l<c?l:c,u=n>a?n>s?n:s:a>s?a:s,d=o>l?o>c?o:c:l>c?l:c;let g=r.next;for(;g!==e;){if(g.x>=h&&g.x<=u&&g.y>=f&&g.y<=d&&Ei(n,o,a,l,s,c,g.x,g.y)&&yt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function am(i,e,t,r){const n=i.prev,a=i,s=i.next;if(yt(n,a,s)>=0)return!1;const o=n.x,l=a.x,c=s.x,h=n.y,f=a.y,u=s.y,d=o<l?o<c?o:c:l<c?l:c,g=h<f?h<u?h:u:f<u?f:u,v=o>l?o>c?o:c:l>c?l:c,p=h>f?h>u?h:u:f>u?f:u,m=Za(d,g,e,t,r),y=Za(v,p,e,t,r);let _=i.prevZ,S=i.nextZ;for(;_&&_.z>=m&&S&&S.z<=y;){if(_.x>=d&&_.x<=v&&_.y>=g&&_.y<=p&&_!==n&&_!==s&&Ei(o,h,l,f,c,u,_.x,_.y)&&yt(_.prev,_,_.next)>=0||(_=_.prevZ,S.x>=d&&S.x<=v&&S.y>=g&&S.y<=p&&S!==n&&S!==s&&Ei(o,h,l,f,c,u,S.x,S.y)&&yt(S.prev,S,S.next)>=0))return!1;S=S.nextZ}for(;_&&_.z>=m;){if(_.x>=d&&_.x<=v&&_.y>=g&&_.y<=p&&_!==n&&_!==s&&Ei(o,h,l,f,c,u,_.x,_.y)&&yt(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;S&&S.z<=y;){if(S.x>=d&&S.x<=v&&S.y>=g&&S.y<=p&&S!==n&&S!==s&&Ei(o,h,l,f,c,u,S.x,S.y)&&yt(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function sm(i,e,t){let r=i;do{const n=r.prev,a=r.next.next;!aa(n,a)&&ql(n,r,r.next,a)&&rn(n,a)&&rn(a,n)&&(e.push(n.i/t|0),e.push(r.i/t|0),e.push(a.i/t|0),nn(r),nn(r.next),r=i=a),r=r.next}while(r!==i);return Qr(r)}function om(i,e,t,r,n,a){let s=i;do{let o=s.next.next;for(;o!==s.prev;){if(s.i!==o.i&&gm(s,o)){let l=jl(s,o);s=Qr(s,s.next),l=Qr(l,l.next),tn(s,e,t,r,n,a,0),tn(l,e,t,r,n,a,0);return}o=o.next}s=s.next}while(s!==i)}function lm(i,e,t,r){const n=[];let a,s,o,l,c;for(a=0,s=e.length;a<s;a++)o=e[a]*r,l=a<s-1?e[a+1]*r:i.length,c=Xl(i,o,l,r,!1),c===c.next&&(c.steiner=!0),n.push(mm(c));for(n.sort(cm),a=0;a<n.length;a++)t=hm(n[a],t);return t}function cm(i,e){return i.x-e.x}function hm(i,e){const t=um(i,e);if(!t)return e;const r=jl(t,i);return Qr(r,r.next),Qr(t,t.next)}function um(i,e){let t=e,r=-1/0,n;const a=i.x,s=i.y;do{if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){const u=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=a&&u>r&&(r=u,n=t.x<t.next.x?t:t.next,u===a))return n}t=t.next}while(t!==e);if(!n)return null;const o=n,l=n.x,c=n.y;let h=1/0,f;t=n;do a>=t.x&&t.x>=l&&a!==t.x&&Ei(s<c?a:r,s,l,c,s<c?r:a,s,t.x,t.y)&&(f=Math.abs(s-t.y)/(a-t.x),rn(t,i)&&(f<h||f===h&&(t.x>n.x||t.x===n.x&&dm(n,t)))&&(n=t,h=f)),t=t.next;while(t!==o);return n}function dm(i,e){return yt(i.prev,i,e.prev)<0&&yt(e.next,i,i.next)<0}function pm(i,e,t,r){let n=i;do n.z===0&&(n.z=Za(n.x,n.y,e,t,r)),n.prevZ=n.prev,n.nextZ=n.next,n=n.next;while(n!==i);n.prevZ.nextZ=null,n.prevZ=null,fm(n)}function fm(i){let e,t,r,n,a,s,o,l,c=1;do{for(t=i,i=null,a=null,s=0;t;){for(s++,r=t,o=0,e=0;e<c&&(o++,r=r.nextZ,!!r);e++);for(l=c;o>0||l>0&&r;)o!==0&&(l===0||!r||t.z<=r.z)?(n=t,t=t.nextZ,o--):(n=r,r=r.nextZ,l--),a?a.nextZ=n:i=n,n.prevZ=a,a=n;t=r}a.nextZ=null,c*=2}while(s>1);return i}function Za(i,e,t,r,n){return i=(i-t)*n|0,e=(e-r)*n|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function mm(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Ei(i,e,t,r,n,a,s,o){return(n-s)*(e-o)>=(i-s)*(a-o)&&(i-s)*(r-o)>=(t-s)*(e-o)&&(t-s)*(a-o)>=(n-s)*(r-o)}function gm(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!vm(i,e)&&(rn(i,e)&&rn(e,i)&&_m(i,e)&&(yt(i.prev,i,e.prev)||yt(i,e.prev,e))||aa(i,e)&&yt(i.prev,i,i.next)>0&&yt(e.prev,e,e.next)>0)}function yt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function aa(i,e){return i.x===e.x&&i.y===e.y}function ql(i,e,t,r){const n=Vn(yt(i,e,t)),a=Vn(yt(i,e,r)),s=Vn(yt(t,r,i)),o=Vn(yt(t,r,e));return!!(n!==a&&s!==o||n===0&&Gn(i,t,e)||a===0&&Gn(i,r,e)||s===0&&Gn(t,i,r)||o===0&&Gn(t,e,r))}function Gn(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Vn(i){return i>0?1:i<0?-1:0}function vm(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&ql(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function rn(i,e){return yt(i.prev,i,i.next)<0?yt(i,e,i.next)>=0&&yt(i,i.prev,e)>=0:yt(i,e,i.prev)<0||yt(i,i.next,e)<0}function _m(i,e){let t=i,r=!1;const n=(i.x+e.x)/2,a=(i.y+e.y)/2;do t.y>a!=t.next.y>a&&t.next.y!==t.y&&n<(t.next.x-t.x)*(a-t.y)/(t.next.y-t.y)+t.x&&(r=!r),t=t.next;while(t!==i);return r}function jl(i,e){const t=new Qa(i.i,i.x,i.y),r=new Qa(e.i,e.x,e.y),n=i.next,a=e.prev;return i.next=e,e.prev=i,t.next=n,n.prev=t,r.next=t,t.prev=r,a.next=r,r.prev=a,r}function Mo(i,e,t,r){const n=new Qa(i,e,t);return r?(n.next=r.next,n.prev=r,r.next.prev=n,r.next=n):(n.prev=n,n.next=n),n}function nn(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Qa(i,e,t){this.i=i,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function xm(i,e,t,r){let n=0;for(let a=e,s=t-r;a<t;a+=r)n+=(i[s]-i[a])*(i[a+1]+i[s+1]),s=a;return n}let Ga=class $l{static area(e){const t=e.length;let r=0;for(let n=t-1,a=0;a<t;n=a++)r+=e[n].x*e[a].y-e[a].x*e[n].y;return r*.5}static isClockWise(e){return $l.area(e)<0}static triangulateShape(e,t){const r=[],n=[],a=[];wo(e),bo(r,e);let s=e.length;t.forEach(wo);for(let l=0;l<t.length;l++)n.push(s),s+=t[l].length,bo(r,t[l]);const o=im.triangulate(r,n);for(let l=0;l<o.length;l+=3)a.push(o.slice(l,l+3));return a}};function wo(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function bo(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class hn extends pt{constructor(e=new na([new se(.5,.5),new se(-.5,.5),new se(-.5,-.5),new se(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const r=this,n=[],a=[];for(let o=0,l=e.length;o<l;o++){const c=e[o];s(c)}this.setAttribute("position",new Ke(n,3)),this.setAttribute("uv",new Ke(a,2)),this.computeVertexNormals();function s(o){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,f=t.depth!==void 0?t.depth:1;let u=t.bevelEnabled!==void 0?t.bevelEnabled:!0,d=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:d-.1,v=t.bevelOffset!==void 0?t.bevelOffset:0,p=t.bevelSegments!==void 0?t.bevelSegments:3;const m=t.extrudePath,y=t.UVGenerator!==void 0?t.UVGenerator:ym;let _,S=!1,P,T,R,U;m&&(_=m.getSpacedPoints(h),S=!0,u=!1,P=m.computeFrenetFrames(h,!1),T=new w,R=new w,U=new w),u||(p=0,d=0,g=0,v=0);const B=o.extractPoints(c);let x=B.shape;const E=B.holes;if(!Ga.isClockWise(x)){x=x.reverse();for(let re=0,ie=E.length;re<ie;re++){const C=E[re];Ga.isClockWise(C)&&(E[re]=C.reverse())}}const F=Ga.triangulateShape(x,E),z=x;for(let re=0,ie=E.length;re<ie;re++){const C=E[re];x=x.concat(C)}function V(re,ie,C){return ie||console.error("THREE.ExtrudeGeometry: vec does not exist"),re.clone().addScaledVector(ie,C)}const Q=x.length,D=F.length;function $(re,ie,C){let Le,ae,be;const fe=re.x-ie.x,ze=re.y-ie.y,Ce=C.x-re.x,A=C.y-re.y,M=fe*fe+ze*ze,O=fe*A-ze*Ce;if(Math.abs(O)>Number.EPSILON){const j=Math.sqrt(M),oe=Math.sqrt(Ce*Ce+A*A),J=ie.x-ze/j,Pe=ie.y+fe/j,me=C.x-A/oe,Ee=C.y+Ce/oe,Je=((me-J)*A-(Ee-Pe)*Ce)/(fe*A-ze*Ce);Le=J+fe*Je-re.x,ae=Pe+ze*Je-re.y;const le=Le*Le+ae*ae;if(le<=2)return new se(Le,ae);be=Math.sqrt(le/2)}else{let j=!1;fe>Number.EPSILON?Ce>Number.EPSILON&&(j=!0):fe<-Number.EPSILON?Ce<-Number.EPSILON&&(j=!0):Math.sign(ze)===Math.sign(A)&&(j=!0),j?(Le=-ze,ae=fe,be=Math.sqrt(M)):(Le=fe,ae=ze,be=Math.sqrt(M/2))}return new se(Le/be,ae/be)}const G=[];for(let re=0,ie=z.length,C=ie-1,Le=re+1;re<ie;re++,C++,Le++)C===ie&&(C=0),Le===ie&&(Le=0),G[re]=$(z[re],z[C],z[Le]);const ue=[];let de,Ie=G.concat();for(let re=0,ie=E.length;re<ie;re++){const C=E[re];de=[];for(let Le=0,ae=C.length,be=ae-1,fe=Le+1;Le<ae;Le++,be++,fe++)be===ae&&(be=0),fe===ae&&(fe=0),de[Le]=$(C[Le],C[be],C[fe]);ue.push(de),Ie=Ie.concat(de)}for(let re=0;re<p;re++){const ie=re/p,C=d*Math.cos(ie*Math.PI/2),Le=g*Math.sin(ie*Math.PI/2)+v;for(let ae=0,be=z.length;ae<be;ae++){const fe=V(z[ae],G[ae],Le);xe(fe.x,fe.y,-C)}for(let ae=0,be=E.length;ae<be;ae++){const fe=E[ae];de=ue[ae];for(let ze=0,Ce=fe.length;ze<Ce;ze++){const A=V(fe[ze],de[ze],Le);xe(A.x,A.y,-C)}}}const ke=g+v;for(let re=0;re<Q;re++){const ie=u?V(x[re],Ie[re],ke):x[re];S?(R.copy(P.normals[0]).multiplyScalar(ie.x),T.copy(P.binormals[0]).multiplyScalar(ie.y),U.copy(_[0]).add(R).add(T),xe(U.x,U.y,U.z)):xe(ie.x,ie.y,0)}for(let re=1;re<=h;re++)for(let ie=0;ie<Q;ie++){const C=u?V(x[ie],Ie[ie],ke):x[ie];S?(R.copy(P.normals[re]).multiplyScalar(C.x),T.copy(P.binormals[re]).multiplyScalar(C.y),U.copy(_[re]).add(R).add(T),xe(U.x,U.y,U.z)):xe(C.x,C.y,f/h*re)}for(let re=p-1;re>=0;re--){const ie=re/p,C=d*Math.cos(ie*Math.PI/2),Le=g*Math.sin(ie*Math.PI/2)+v;for(let ae=0,be=z.length;ae<be;ae++){const fe=V(z[ae],G[ae],Le);xe(fe.x,fe.y,f+C)}for(let ae=0,be=E.length;ae<be;ae++){const fe=E[ae];de=ue[ae];for(let ze=0,Ce=fe.length;ze<Ce;ze++){const A=V(fe[ze],de[ze],Le);S?xe(A.x,A.y+_[h-1].y,_[h-1].x+C):xe(A.x,A.y,f+C)}}}rt(),K();function rt(){const re=n.length/3;if(u){let ie=0,C=Q*ie;for(let Le=0;Le<D;Le++){const ae=F[Le];pe(ae[2]+C,ae[1]+C,ae[0]+C)}ie=h+p*2,C=Q*ie;for(let Le=0;Le<D;Le++){const ae=F[Le];pe(ae[0]+C,ae[1]+C,ae[2]+C)}}else{for(let ie=0;ie<D;ie++){const C=F[ie];pe(C[2],C[1],C[0])}for(let ie=0;ie<D;ie++){const C=F[ie];pe(C[0]+Q*h,C[1]+Q*h,C[2]+Q*h)}}r.addGroup(re,n.length/3-re,0)}function K(){const re=n.length/3;let ie=0;ce(z,ie),ie+=z.length;for(let C=0,Le=E.length;C<Le;C++){const ae=E[C];ce(ae,ie),ie+=ae.length}r.addGroup(re,n.length/3-re,1)}function ce(re,ie){let C=re.length;for(;--C>=0;){const Le=C;let ae=C-1;ae<0&&(ae=re.length-1);for(let be=0,fe=h+p*2;be<fe;be++){const ze=Q*be,Ce=Q*(be+1),A=ie+Le+ze,M=ie+ae+ze,O=ie+ae+Ce,j=ie+Le+Ce;Fe(A,M,O,j)}}}function xe(re,ie,C){l.push(re),l.push(ie),l.push(C)}function pe(re,ie,C){Ne(re),Ne(ie),Ne(C);const Le=n.length/3,ae=y.generateTopUV(r,n,Le-3,Le-2,Le-1);Be(ae[0]),Be(ae[1]),Be(ae[2])}function Fe(re,ie,C,Le){Ne(re),Ne(ie),Ne(Le),Ne(ie),Ne(C),Ne(Le);const ae=n.length/3,be=y.generateSideWallUV(r,n,ae-6,ae-3,ae-2,ae-1);Be(be[0]),Be(be[1]),Be(be[3]),Be(be[1]),Be(be[2]),Be(be[3])}function Ne(re){n.push(l[re*3+0]),n.push(l[re*3+1]),n.push(l[re*3+2])}function Be(re){a.push(re.x),a.push(re.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,r=this.parameters.options;return Sm(t,r,e)}static fromJSON(e,t){const r=[];for(let a=0,s=e.shapes.length;a<s;a++){const o=t[e.shapes[a]];r.push(o)}const n=e.options.extrudePath;return n!==void 0&&(e.options.extrudePath=new Ka[n.type]().fromJSON(n)),new hn(r,e.options)}}const ym={generateTopUV:function(i,e,t,r,n){const a=e[t*3],s=e[t*3+1],o=e[r*3],l=e[r*3+1],c=e[n*3],h=e[n*3+1];return[new se(a,s),new se(o,l),new se(c,h)]},generateSideWallUV:function(i,e,t,r,n,a){const s=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[r*3],h=e[r*3+1],f=e[r*3+2],u=e[n*3],d=e[n*3+1],g=e[n*3+2],v=e[a*3],p=e[a*3+1],m=e[a*3+2];return Math.abs(o-h)<Math.abs(s-c)?[new se(s,1-l),new se(c,1-f),new se(u,1-g),new se(v,1-m)]:[new se(o,1-l),new se(h,1-f),new se(d,1-g),new se(p,1-m)]}};function Sm(i,e,t){if(t.shapes=[],Array.isArray(i))for(let r=0,n=i.length;r<n;r++){const a=i[r];t.shapes.push(a.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class an extends pt{constructor(e=.5,t=1,r=32,n=1,a=0,s=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:r,phiSegments:n,thetaStart:a,thetaLength:s},r=Math.max(3,r),n=Math.max(1,n);const o=[],l=[],c=[],h=[];let f=e;const u=(t-e)/n,d=new w,g=new se;for(let v=0;v<=n;v++){for(let p=0;p<=r;p++){const m=a+p/r*s;d.x=f*Math.cos(m),d.y=f*Math.sin(m),l.push(d.x,d.y,d.z),c.push(0,0,1),g.x=(d.x/t+1)/2,g.y=(d.y/t+1)/2,h.push(g.x,g.y)}f+=u}for(let v=0;v<n;v++){const p=v*(r+1);for(let m=0;m<r;m++){const y=m+p,_=y,S=y+r+1,P=y+r+2,T=y+1;o.push(_,S,T),o.push(S,P,T)}}this.setIndex(o),this.setAttribute("position",new Ke(l,3)),this.setAttribute("normal",new Ke(c,3)),this.setAttribute("uv",new Ke(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new an(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Ct extends pt{constructor(e=1,t=32,r=16,n=0,a=Math.PI*2,s=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:r,phiStart:n,phiLength:a,thetaStart:s,thetaLength:o},t=Math.max(3,Math.floor(t)),r=Math.max(2,Math.floor(r));const l=Math.min(s+o,Math.PI);let c=0;const h=[],f=new w,u=new w,d=[],g=[],v=[],p=[];for(let m=0;m<=r;m++){const y=[],_=m/r;let S=0;m===0&&s===0?S=.5/t:m===r&&l===Math.PI&&(S=-.5/t);for(let P=0;P<=t;P++){const T=P/t;f.x=-e*Math.cos(n+T*a)*Math.sin(s+_*o),f.y=e*Math.cos(s+_*o),f.z=e*Math.sin(n+T*a)*Math.sin(s+_*o),g.push(f.x,f.y,f.z),u.copy(f).normalize(),v.push(u.x,u.y,u.z),p.push(T+S,1-_),y.push(c++)}h.push(y)}for(let m=0;m<r;m++)for(let y=0;y<t;y++){const _=h[m][y+1],S=h[m][y],P=h[m+1][y],T=h[m+1][y+1];(m!==0||s>0)&&d.push(_,S,T),(m!==r-1||l<Math.PI)&&d.push(S,P,T)}this.setIndex(d),this.setAttribute("position",new Ke(g,3)),this.setAttribute("normal",new Ke(v,3)),this.setAttribute("uv",new Ke(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ct(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class _s extends pt{constructor(e=1,t=.4,r=12,n=48,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:r,tubularSegments:n,arc:a},r=Math.floor(r),n=Math.floor(n);const s=[],o=[],l=[],c=[],h=new w,f=new w,u=new w;for(let d=0;d<=r;d++)for(let g=0;g<=n;g++){const v=g/n*a,p=d/r*Math.PI*2;f.x=(e+t*Math.cos(p))*Math.cos(v),f.y=(e+t*Math.cos(p))*Math.sin(v),f.z=t*Math.sin(p),o.push(f.x,f.y,f.z),h.x=e*Math.cos(v),h.y=e*Math.sin(v),u.subVectors(f,h).normalize(),l.push(u.x,u.y,u.z),c.push(g/n),c.push(d/r)}for(let d=1;d<=r;d++)for(let g=1;g<=n;g++){const v=(n+1)*d+g-1,p=(n+1)*(d-1)+g-1,m=(n+1)*(d-1)+g,y=(n+1)*d+g;s.push(v,p,y),s.push(p,m,y)}this.setIndex(s),this.setAttribute("position",new Ke(o,3)),this.setAttribute("normal",new Ke(l,3)),this.setAttribute("uv",new Ke(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _s(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Mm extends St{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class we extends ti{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new ve(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ve(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new se(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Or,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Yl extends we{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new se(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Lt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ve(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ve(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ve(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}let un=class extends wt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ve(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}};class Br extends un{constructor(e,t,r){super(e,r),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(wt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ve(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Va=new Mt,Eo=new w,To=new w;class xs{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new se(512,512),this.map=null,this.mapPass=null,this.matrix=new Mt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new hs,this._frameExtents=new se(1,1),this._viewportCount=1,this._viewports=[new ht(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,r=this.matrix;Eo.setFromMatrixPosition(e.matrixWorld),t.position.copy(Eo),To.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(To),t.updateMatrixWorld(),Va.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Va),r.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),r.multiply(Va)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class wm extends xs{constructor(){super(new Yt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,r=Ci*2*e.angle*this.focus,n=this.mapSize.width/this.mapSize.height,a=e.distance||t.far;(r!==t.fov||n!==t.aspect||a!==t.far)&&(t.fov=r,t.aspect=n,t.far=a,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Kl extends un{constructor(e,t,r=0,n=Math.PI/3,a=0,s=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(wt.DEFAULT_UP),this.updateMatrix(),this.target=new wt,this.distance=r,this.angle=n,this.penumbra=a,this.decay=s,this.map=null,this.shadow=new wm}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Ao=new Mt,$i=new w,Ha=new w;class bm extends xs{constructor(){super(new Yt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new se(4,2),this._viewportCount=6,this._viewports=[new ht(2,1,1,1),new ht(0,1,1,1),new ht(3,1,1,1),new ht(1,1,1,1),new ht(3,0,1,1),new ht(1,0,1,1)],this._cubeDirections=[new w(1,0,0),new w(-1,0,0),new w(0,0,1),new w(0,0,-1),new w(0,1,0),new w(0,-1,0)],this._cubeUps=[new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,0,1),new w(0,0,-1)]}updateMatrices(e,t=0){const r=this.camera,n=this.matrix,a=e.distance||r.far;a!==r.far&&(r.far=a,r.updateProjectionMatrix()),$i.setFromMatrixPosition(e.matrixWorld),r.position.copy($i),Ha.copy(r.position),Ha.add(this._cubeDirections[t]),r.up.copy(this._cubeUps[t]),r.lookAt(Ha),r.updateMatrixWorld(),n.makeTranslation(-$i.x,-$i.y,-$i.z),Ao.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ao)}}class Ut extends un{constructor(e,t,r=0,n=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=r,this.decay=n,this.shadow=new bm}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Em extends xs{constructor(){super(new us(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class kr extends un{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(wt.DEFAULT_UP),this.updateMatrix(),this.target=new wt,this.shadow=new Em}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Tr extends un{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Tm{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Co(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=Co();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function Co(){return performance.now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:as}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=as);var Ro;(function(i){i.Any="any",i.ApNortheast1="ap-northeast-1",i.ApNortheast2="ap-northeast-2",i.ApSouth1="ap-south-1",i.ApSoutheast1="ap-southeast-1",i.ApSoutheast2="ap-southeast-2",i.CaCentral1="ca-central-1",i.EuCentral1="eu-central-1",i.EuWest1="eu-west-1",i.EuWest2="eu-west-2",i.EuWest3="eu-west-3",i.SaEast1="sa-east-1",i.UsEast1="us-east-1",i.UsWest1="us-west-1",i.UsWest2="us-west-2"})(Ro||(Ro={}));var Po;(function(i){i.abstime="abstime",i.bool="bool",i.date="date",i.daterange="daterange",i.float4="float4",i.float8="float8",i.int2="int2",i.int4="int4",i.int4range="int4range",i.int8="int8",i.int8range="int8range",i.json="json",i.jsonb="jsonb",i.money="money",i.numeric="numeric",i.oid="oid",i.reltime="reltime",i.text="text",i.time="time",i.timestamp="timestamp",i.timestamptz="timestamptz",i.timetz="timetz",i.tsrange="tsrange",i.tstzrange="tstzrange"})(Po||(Po={}));var Io;(function(i){i.SYNC="sync",i.JOIN="join",i.LEAVE="leave"})(Io||(Io={}));var Lo;(function(i){i.ALL="*",i.INSERT="INSERT",i.UPDATE="UPDATE",i.DELETE="DELETE"})(Lo||(Lo={}));var Uo;(function(i){i.BROADCAST="broadcast",i.PRESENCE="presence",i.POSTGRES_CHANGES="postgres_changes",i.SYSTEM="system"})(Uo||(Uo={}));var No;(function(i){i.SUBSCRIBED="SUBSCRIBED",i.TIMED_OUT="TIMED_OUT",i.CLOSED="CLOSED",i.CHANNEL_ERROR="CHANNEL_ERROR"})(No||(No={}));const Do="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""),Oo=` 	
\r=`.split("");(()=>{const i=new Array(128);for(let e=0;e<i.length;e+=1)i[e]=-1;for(let e=0;e<Oo.length;e+=1)i[Oo[e].charCodeAt(0)]=-2;for(let e=0;e<Do.length;e+=1)i[Do[e].charCodeAt(0)]=e;return i})();const Am=()=>typeof window<"u"&&typeof document<"u",$r={tested:!1,writable:!1},Cm=()=>{if(!Am())return!1;try{if(typeof globalThis.localStorage!="object")return!1}catch{return!1}if($r.tested)return $r.writable;const i=`lswt-${Math.random()}${Math.random()}`;try{globalThis.localStorage.setItem(i,i),globalThis.localStorage.removeItem(i),$r.tested=!0,$r.writable=!0}catch{$r.tested=!0,$r.writable=!1}return $r.writable};globalThis&&Cm()&&globalThis.localStorage&&globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug");function Rm(){if(typeof globalThis!="object")try{Object.defineProperty(Object.prototype,"__magic__",{get:function(){return this},configurable:!0}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__}catch{typeof self<"u"&&(self.globalThis=self)}}Rm();if(typeof Deno<"u"){var Wa;(Wa=Deno.version)===null||Wa===void 0||Wa.deno}else if(!(typeof document<"u")){if(!(typeof navigator<"u"&&navigator.product==="ReactNative")){var Xa;const i=globalThis.process;i==null||(Xa=i.version)===null||Xa===void 0||Xa.replace(/^v/,"")}}function Pm(){if(typeof window<"u"||globalThis.Deno!==void 0)return!1;const i=globalThis.process;if(!i)return!1;const e=i.version;if(e==null)return!1;const t=e.match(/^v(\d+)\./);return t?parseInt(t[1],10)<=20:!1}Pm()&&console.warn("⚠️  Node.js 20 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 22 or later. For more information, visit: https://github.com/orgs/supabase/discussions/45715");(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))t(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&t(a)}).observe(document,{childList:!0,subtree:!0});function e(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function t(r){if(r.ep)return;r.ep=!0;const n=e(r);fetch(r.href,n)}})();const Zr=[{id:"plasma",name:"Plasma Cyan",color:58879,metalness:.9,clearcoat:1,sheen:9371903},{id:"inferno",name:"Inferno Magenta",color:16718443,metalness:.85,clearcoat:1,sheen:16756224},{id:"volt",name:"Volt Lime",color:10354458,metalness:.8,clearcoat:1,sheen:58879},{id:"sunset",name:"Sunset Orange",color:16742938,metalness:.85,clearcoat:1,sheen:16718443},{id:"void",name:"Void Purple",color:8002303,metalness:.9,clearcoat:1,sheen:58879},{id:"chrome",name:"Chrome Silver",color:14147302,metalness:1,clearcoat:1,sheen:58879},{id:"emerald",name:"Emerald Racing",color:720780,metalness:.85,clearcoat:1,sheen:16777215},{id:"rosegold",name:"Rose Gold",color:16757667,metalness:.95,clearcoat:1,sheen:16723592},{id:"stealth",name:"Stealth Matte",color:2303534,metalness:.4,clearcoat:.6,sheen:58879}],mr=[{id:"shadow-gt",name:"SHADOW GT",class:"Exotic GT",rarity:"legendary",topSpeed:.92,handling:.88,accel:.9,nitro:.9,drift:.8,scale:1,lowSlung:1.15,wide:1.08,wing:!0,quadLights:!1,hoodScoop:!0,arches:!0},{id:"inferno-x",name:"INFERNO X",class:"Super Coupe",rarity:"legendary",topSpeed:.94,handling:.86,accel:.91,nitro:.93,drift:.78,scale:.98,lowSlung:1.18,wide:1.06,wing:!0,quadLights:!1,hoodScoop:!0,arches:!0},{id:"cyber-veloce",name:"CYBER VELOCE",class:"Electric Hypercar",rarity:"epic",topSpeed:.95,handling:.91,accel:.96,nitro:.92,drift:.7,scale:.99,lowSlung:1.12,wide:1.04,wing:!0,quadLights:!0,hoodScoop:!1,arches:!0},{id:"nighthawk",name:"NIGHTHAWK",class:"Luxury GT",rarity:"epic",topSpeed:.9,handling:.87,accel:.88,nitro:.84,drift:.72,scale:1.02,lowSlung:1.02,wide:1.02,wing:!1,quadLights:!0,hoodScoop:!1,arches:!0},{id:"vortex-rs",name:"VORTEX RS",class:"Track Coupe",rarity:"epic",topSpeed:.93,handling:.94,accel:.95,nitro:.9,drift:.8,scale:.97,lowSlung:1.2,wide:1.1,wing:!0,quadLights:!1,hoodScoop:!0,arches:!0},{id:"apex-r9",name:"APEX R9",class:"Hypercar",rarity:"legendary",topSpeed:.96,handling:.92,accel:.97,nitro:.94,drift:.68,scale:1.04,lowSlung:1,wide:1.04,wing:!1,quadLights:!0,hoodScoop:!1,arches:!0},{id:"titan-s",name:"TITAN S",class:"Performance Sedan",rarity:"rare",topSpeed:.86,handling:.82,accel:.83,nitro:.8,drift:.94,scale:1.1,lowSlung:.9,wide:1.14,wing:!1,quadLights:!0,hoodScoop:!0,arches:!0},{id:"phantom-lx",name:"PHANTOM LX",class:"Ultra GT",rarity:"rare",topSpeed:.87,handling:.88,accel:.85,nitro:.78,drift:.62,scale:1.06,lowSlung:.94,wide:1.05,wing:!1,quadLights:!0,hoodScoop:!1,arches:!0},{id:"storm-xr",name:"STORM XR",class:"AWD Performance",rarity:"rare",topSpeed:.84,handling:.9,accel:.85,nitro:.82,drift:.9,scale:1.05,lowSlung:.86,wide:1.08,wing:!0,quadLights:!0,hoodScoop:!0,arches:!0},{id:"raptor-zx",name:"RAPTOR ZX",class:"Muscle Coupe",rarity:"rare",topSpeed:.88,handling:.75,accel:.89,nitro:.87,drift:.86,scale:1.02,lowSlung:1.04,wide:1.07,wing:!0,quadLights:!0,hoodScoop:!0,arches:!0}];function Im(i){return new Yl({color:i,metalness:.6,roughness:.2,clearcoat:1,clearcoatRoughness:.06,reflectivity:.7,envMapIntensity:1.6})}const zo=new Yl({color:660512,metalness:.2,roughness:.05,transmission:.6,transparent:!0,opacity:.85,envMapIntensity:1}),cr=new we({color:789776,metalness:.7,roughness:.35}),Fo=new we({color:15265266,metalness:1,roughness:.1}),Lm=new we({color:1118740,roughness:.9,metalness:.05}),Bo=new we({color:16777215,emissive:12577279,emissiveIntensity:3}),Um=new we({color:16722474,emissive:16711731,emissiveIntensity:2.6}),Nm=new we({color:16723502,metalness:.3,roughness:.4}),Dm=new we({color:13620957,metalness:1,roughness:.2});function Hn(i=.36,e=.28){const t=new qe,r=new W(new Ft(i,i,e,22),Lm);r.rotation.z=Math.PI/2,r.castShadow=!0,t.add(r);const n=new W(new Ft(i*.66,i*.66,e*1.04,7),Fo);n.rotation.z=Math.PI/2,t.add(n);const a=new W(new Ft(i*.68,i*.68,e*1.06,7,1,!1),Fo);a.rotation.z=Math.PI/2,a.rotation.x=Math.PI/7,t.add(a);const s=new W(new Ft(i*.16,i*.16,e*1.14,12),cr);s.rotation.z=Math.PI/2,t.add(s);const o=new W(new Ge(i*.5,i*.34,i*.34),Nm);return o.position.set(0,i*.35,i*.1),t.add(o),t}function es(i,e){const t=new qe,r=i.scale,n=i.lowSlung,a=i.wide,s=Im(e),o=new W(new Ge(1.92*a,.26,4.25),cr);o.position.y=.32*n,t.add(o);const l=new W(new Ge(1.88*a,.5,2.6),s);l.position.set(0,.6*n,-.3),l.castShadow=!0,t.add(l);const c=new W(new Ge(1.66*a,.36,1.15),s);c.position.set(0,.52*n,1.75),c.castShadow=!0,t.add(c);const h=new W(new Ge(1.4*a,.24,.55),s);h.position.set(0,.42*n,2.35),h.castShadow=!0,t.add(h);const f=new W(new Ge(1.78*a,.06,.42),cr);if(f.position.set(0,.2*n,2.5),t.add(f),[-1,1].forEach(D=>{const $=new W(new Ge(.3,.04,.22),cr);$.position.set(D*.85*a,.26*n,2.35),$.rotation.y=D*.3,t.add($)}),i.hoodScoop){const D=new W(new Ge(.5,.09,.55),cr);D.position.set(0,.86*n,1.35),t.add(D)}i.arches&&[[-1.02*a,.4*n,1.35],[1.02*a,.4*n,1.35],[-1.04*a,.4*n,-1.3],[1.04*a,.4*n,-1.3]].forEach(([D,$,G])=>{const ue=new W(new Ge(.16,.42,.85),s);ue.position.set(D,$,G),ue.castShadow=!0,t.add(ue)});const u=new W(new Ge(1.32*a,.4,1.55),zo);u.position.set(0,.98*n,-.4),t.add(u);const d=new W(new Ge(1.2*a,.32,.7),zo);d.position.set(0,.9*n,-1.25),t.add(d);const g=new W(new Ge(1.86*a,.48,.95),s);g.position.set(0,.64*n,-1.9),g.castShadow=!0,t.add(g);const v=new W(new Ge(1.74*a,.16,.32),cr);v.position.set(0,.26*n,-2.36),t.add(v);for(let D=-2;D<=2;D++){const $=new W(new Ge(.05,.14,.3),cr);$.position.set(D*.32*a,.26*n,-2.36),t.add($)}const p=i.class==="Muscle"?4:2,m=.32,y=[];for(let D=0;D<p;D++){const $=(D-(p-1)/2)*m,G=new W(new Ft(.07,.08,.22,10),Dm);G.rotation.x=Math.PI/2,G.position.set($*a,.22*n,-2.42),t.add(G),y.push(G.position)}if([-1,1].forEach(D=>{const $=new W(new Ge(.12,.14,3.5),cr);$.position.set(D*.97*a,.32*n,-.1),t.add($)}),i.wing){const D=new qe,$=new W(new Ge(1.55*a,.06,.4),cr);$.position.set(0,1.08*n,-2.2),D.add($),[-.62,.62].forEach(G=>{const ue=new W(new Ge(.08,.42,.12),cr);ue.position.set(G*a,.84*n,-2.2),D.add(ue);const de=new W(new Ge(.04,.24,.42),cr);de.position.set(G*a,1.08*n,-2.2),D.add(de)}),t.add(D)}const _=[];i.quadLights?[-.68,-.42,.42,.68].forEach(D=>{const $=new W(new Ct(.09,12,12),Bo);$.position.set(D*a,.56*n,2.55),t.add($),_.push($)}):[-.62,.62].forEach(D=>{const $=new W(new Ge(.4,.1,.08),Bo);$.position.set(D*a,.56*n,2.55),t.add($),_.push($)});const S=[];_.forEach(D=>{const $=new Kl(14675967,0,26,Math.PI/6.5,.4,1.4);$.position.copy(D.position);const G=new wt;G.position.set(D.position.x*.3,D.position.y-.3,D.position.z+20),t.add(G),$.target=G,t.add($),S.push($)});const P=[],T=new W(new Ge(1.7*a,.1,.05),Um.clone());T.position.set(0,.74*n,-2.38),t.add(T),P.push(T);const R=.37*r,U=1.35,B=-1.3,x=1*a,E=Hn(R);E.position.set(-x,R,U);const F=Hn(R);F.position.set(x,R,U);const z=Hn(R);z.position.set(-x,R,B);const V=Hn(R);V.position.set(x,R,B),[E,F,z,V].forEach(D=>t.add(D));const Q=new Ut(e,.6,3.4,2);return Q.position.set(0,.05,0),t.add(Q),t.scale.setScalar(r),t.traverse(D=>{D.isMesh&&(D.castShadow=!0,D.receiveShadow=!0)}),{group:t,wheels:{fl:E,fr:F,rl:z,rr:V},headlights:_,headlightSpots:S,taillights:P,exhaustPositions:y,underGlow:Q}}function Om(){const i=document.createElement("canvas");i.width=512,i.height=256;const e=i.getContext("2d"),t=e.createLinearGradient(0,0,0,256);t.addColorStop(0,"#05030c"),t.addColorStop(.55,"#0a0620"),t.addColorStop(1,"#160a1a"),e.fillStyle=t,e.fillRect(0,0,512,256);const r=["#00e5ff","#ff2e88","#9b30ff","#ffb347","#39ff9d"];for(let a=0;a<60;a++){const s=Math.random()*512,o=256*.35+Math.random()*256*.6,l=6+Math.random()*26,c=r[Math.floor(Math.random()*r.length)],h=e.createRadialGradient(s,o,0,s,o,l);h.addColorStop(0,c),h.addColorStop(1,"rgba(0,0,0,0)"),e.globalAlpha=.5,e.fillStyle=h,e.beginPath(),e.arc(s,o,l,0,Math.PI*2),e.fill()}e.globalAlpha=1;const n=new Rt(i);return n.mapping=os,n.colorSpace=qt,n}function zm(){const i={topColor:{value:new ve(328724)},midColor:{value:new ve(1444398)},horizonColor:{value:new ve(2756154)},bottomColor:{value:new ve(197128)},offset:{value:20},exponent:{value:.65}},e=new Ct(900,32,16),t=new St({uniforms:i,side:ei,depthWrite:!1,vertexShader:`
      varying vec3 vWorldPosition;
      void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform vec3 topColor; uniform vec3 midColor; uniform vec3 horizonColor; uniform vec3 bottomColor;
      uniform float offset; uniform float exponent;
      varying vec3 vWorldPosition;
      void main() {
        float h = normalize(vWorldPosition + vec3(0.0, offset, 0.0)).y;
        vec3 col;
        if (h > 0.1) {
          col = mix(horizonColor, midColor, clamp(pow(h, exponent) * 1.7, 0.0, 1.0));
          col = mix(col, topColor, clamp(pow(h, exponent * 2.2), 0.0, 1.0));
        } else {
          col = mix(bottomColor, horizonColor, clamp((h + 0.3) / 0.45, 0.0, 1.0));
        }
        gl_FragColor = vec4(col, 1.0);
      }
    `}),r=new W(e,t);return r.userData.isSky=!0,r}function Fm(i){const e=document.createElement("canvas");e.width=128,e.height=192;const t=e.getContext("2d");t.fillStyle="#050608",t.fillRect(0,0,128,192);const r=6+Math.floor(Math.random()*6),n=3+Math.floor(Math.random()*3),a=128/n,s=192/r;for(let o=0;o<r;o++)for(let l=0;l<n;l++)Math.random()>.4&&(t.fillStyle=Math.random()>.5?i:"rgba(255,255,255,0.75)",t.globalAlpha=.35+Math.random()*.5,t.fillRect(l*a+1,o*s+1,a-2,s-2));return t.globalAlpha=1,new Rt(e)}const ko=["#00e5ff","#ff2e88","#9b30ff","#ffb347","#39ff9d"];function Bm(i){const e=new qe;for(let t=0;t<55;t++){const r=8+Math.random()*16,n=40+Math.random()*190,a=8+Math.random()*16,s=(Math.random()-.5)*1500,o=-380-Math.random()*260,l=new W(new Ge(r,n,a),new we({color:460815,roughness:.5,metalness:.5,emissive:197385,emissiveIntensity:.3}));l.position.set(s,n/2,o),e.add(l);const c=ko[Math.floor(Math.random()*ko.length)],h=Fm(c),f=new W(new mt(r*.92,n*.92),new ut({map:h,transparent:!0,opacity:.9}));if(f.position.set(s,n/2,o+a/2+.05),e.add(f),Math.random()>.65){const u=new ve(c),d=new ut({color:u,transparent:!0,opacity:.95}),g=new W(new mt(r*.7,n*.14),d);g.position.set(s,n*.75,o+a/2+.3),e.add(g),i.push({mesh:g,mat:d,baseOpacity:.95,phase:Math.random()*10})}}return e}function km(){const i=new mt(3e3,3e3,1,1),e=new we({color:197642,roughness:.9,metalness:.1}),t=new W(i,e);return t.rotation.x=-Math.PI/2,t.position.y=-.03,t.receiveShadow=!0,t}function Gm(i){const e=new qe,t=new we({color:1316380,metalness:.8,roughness:.3}),r=new W(new Ft(.09,.09,6,8),t);r.position.y=3,e.add(r);const n=new W(new Ge(1.6,.1,.1),t);n.position.set(.75,5.9,0),e.add(n);const a=new W(new Ct(.22,12,12),new we({color:i,emissive:i,emissiveIntensity:3.2}));a.position.set(1.5,5.75,0),e.add(a);const s=new Ut(i,1.6,15,2);return s.position.copy(a.position),e.add(s),e}function Vm(){const i=[new w(0,0,0),new w(60,0,-40),new w(90,0,-140),new w(60,0,-230),new w(-20,0,-260),new w(-110,0,-220),new w(-140,0,-120),new w(-100,0,-30),new w(-40,0,40),new w(30,0,60)],e=new Er(i,!0,"catmullrom",.5),t=14,r=400,n=new qe,a=[],s=[],o=[],l=[],c=[];for(let g=0;g<=r;g++){const v=g/r,p=e.getPointAt(v),m=e.getTangentAt(v).normalize(),y=new w(-m.z,0,m.x).normalize(),_=p.clone().addScaledVector(y,t/2),S=p.clone().addScaledVector(y,-t/2);if(a.push(_.x,.01,_.z,S.x,.01,S.z),s.push(0,v*60,1,v*60),l.push({pos:_,normal:y}),c.push({pos:S,normal:y}),g<r){const P=g*2,T=g*2+1,R=g*2+2,U=g*2+3;o.push(P,T,R,T,U,R)}}const h=new pt;h.setAttribute("position",new Ke(a,3)),h.setAttribute("uv",new Ke(s,2)),h.setIndex(o),h.computeVertexNormals();const f=Hm(),u=new we({map:f,roughness:.22,metalness:.35,envMapIntensity:1.6}),d=new W(h,u);d.receiveShadow=!0,n.add(d),[l,c].forEach((g,v)=>{for(let p=0;p<g.length-1;p+=4){const m=g[p],y=g[Math.min(p+4,g.length-1)],_=y.pos.clone().sub(m.pos).length()||.01,S=m.normal.clone().multiplyScalar(v===0?1:-1),P=new W(new Ge(.9,.12,_),new we({color:p/4%2===0?14029866:15921906,roughness:.5,metalness:.1})),T=m.pos.clone().lerp(y.pos,.5).addScaledVector(S,.55);if(P.position.set(T.x,.06,T.z),P.lookAt(y.pos.x,.06,y.pos.z),n.add(P),p/4%3===0){const R=new W(new Ge(.12,.7,_*1.05),new we({color:10134704,metalness:.9,roughness:.25})),U=m.pos.clone().lerp(y.pos,.5).addScaledVector(S,1.4);R.position.set(U.x,.55,U.z),R.lookAt(y.pos.x,.55,y.pos.z),n.add(R)}}});for(let g=0;g<r;g+=18){const v=g/r,p=e.getPointAt(v),m=e.getTangentAt(v).normalize(),y=new w(-m.z,0,m.x).normalize(),_=g%36===0?1:-1,S=p.clone().addScaledVector(y,_*(t/2+4)),P=Gm(_>0?58879:16723592);P.position.copy(S),P.lookAt(p.x,0,p.z),n.add(P)}return{curve:e,roadGroup:n,trackWidth:t}}function Hm(){const i=document.createElement("canvas");i.width=i.height=256;const e=i.getContext("2d");e.fillStyle="#191a20",e.fillRect(0,0,256,256);for(let r=0;r<700;r++)e.fillStyle=`rgba(${30+Math.random()*25},${30+Math.random()*25},${36+Math.random()*25},${Math.random()*.4})`,e.fillRect(Math.random()*256,Math.random()*256,1.6,1.6);e.fillStyle="rgba(255,255,255,0.85)";for(let r=0;r<256;r+=32)e.fillRect(256/2-3,r,6,16);const t=new Rt(i);return t.wrapS=Vt,t.wrapT=Vt,t.repeat.set(1,60),t.anisotropy=4,t}function Wm(i=2200){const e=new Float32Array(i*3),t=new Float32Array(i),r=220;for(let o=0;o<i;o++)e[o*3]=(Math.random()-.5)*r,e[o*3+1]=Math.random()*80,e[o*3+2]=(Math.random()-.5)*r,t[o]=55+Math.random()*35;const n=new pt;n.setAttribute("position",new Zt(e,3));const a=new ia({color:11195647,size:.22,transparent:!0,opacity:.55,depthWrite:!1}),s=new ps(n,a);return s.frustumCulled=!1,{points:s,positions:e,speeds:t,spread:r,count:i}}function Xm(i=14){const e=new qe,t=[];for(let r=0;r<i;r++){const n=Math.random()>.5,a=new ut({color:n?16720435:12577279,transparent:!0,opacity:.9}),s=new W(new Ge(.22,.16,3.2),a),o=(Math.random()-.5)*220,l=40+Math.random()*50;s.position.set(o,.4+Math.random()*1.2,-300+Math.random()*600),e.add(s),t.push({mesh:s,speed:n?-l:l,laneX:o})}return{group:e,streaks:t}}function qm(i){const e=[],t=Om();i.environment=t,i.add(zm()),i.add(Bm(e)),i.add(km());const{curve:r,roadGroup:n,trackWidth:a}=Vm();n.children[0].material.envMap=t,i.add(n);const s=Wm();i.add(s.points);const{group:o,streaks:l}=Xm();i.add(o);const c=new kr(8370431,.55);c.position.set(-100,160,-160),c.castShadow=!0,c.shadow.mapSize.set(2048,2048),c.shadow.camera.left=-160,c.shadow.camera.right=160,c.shadow.camera.top=160,c.shadow.camera.bottom=-160,c.shadow.camera.far=600,c.shadow.bias=-.0015,i.add(c);const h=new Br(58879,656918,.55);i.add(h);const f=new Tr(1708080,.55);i.add(f),i.fog=new vr(656920,.0022);let u=4+Math.random()*6;const d=new Ut(14674175,0,500,1.5);d.position.set(0,200,-150),i.add(d);function g(v){const p=s.points.geometry.attributes.position.array;for(let y=0;y<s.count;y++)p[y*3+1]-=s.speeds[y]*v,p[y*3+1]<0&&(p[y*3+1]=60+Math.random()*20);s.points.geometry.attributes.position.needsUpdate=!0;const m=performance.now()*.001;e.forEach(y=>{const _=.75+.25*Math.sin(m*6+y.phase)*(Math.random()>.02?1:.2);y.mat.opacity=y.baseOpacity*_}),l.forEach(y=>{y.mesh.position.z+=y.speed*v,y.mesh.position.z>320&&(y.mesh.position.z=-320),y.mesh.position.z<-320&&(y.mesh.position.z=320)}),u-=v,u<=0&&(d.intensity=6+Math.random()*4,u=5+Math.random()*9,setTimeout(()=>{d.intensity=0},90))}return{curve:r,trackWidth:a,update:g}}function ri(i){const e=i||["#00e5ff","#ff2e88","#9b30ff","#ffb347","#39ff9d"],t=512,r=256,n=document.createElement("canvas");n.width=t,n.height=r;const a=n.getContext("2d"),s=a.createLinearGradient(0,0,0,r);s.addColorStop(0,"#05030c"),s.addColorStop(.55,"#0a0620"),s.addColorStop(1,"#160a1a"),a.fillStyle=s,a.fillRect(0,0,t,r);for(let l=0;l<60;l++){const c=Math.random()*t,h=r*.35+Math.random()*r*.6,f=6+Math.random()*26,u=e[Math.floor(Math.random()*e.length)],d=a.createRadialGradient(c,h,0,c,h,f);d.addColorStop(0,u),d.addColorStop(1,"rgba(0,0,0,0)"),a.globalAlpha=.5,a.fillStyle=d,a.beginPath(),a.arc(c,h,f,0,Math.PI*2),a.fill()}a.globalAlpha=1;const o=new Rt(n);return o.mapping=os,o.colorSpace=qt,o}function jm(){const i={topColor:{value:new ve(1706813)},midColor:{value:new ve(16731514)},horizonColor:{value:new ve(16757575)},bottomColor:{value:new ve(657944)},offset:{value:20},exponent:{value:.7}},e=new Ct(900,32,16),t=new St({uniforms:i,side:ei,depthWrite:!1,vertexShader:`
      varying vec3 vWorldPosition;
      void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform vec3 topColor; uniform vec3 midColor; uniform vec3 horizonColor; uniform vec3 bottomColor;
      uniform float offset; uniform float exponent;
      varying vec3 vWorldPosition;
      void main() {
        float h = normalize(vWorldPosition + vec3(0.0, offset, 0.0)).y;
        vec3 col;
        if (h > 0.15) {
          col = mix(horizonColor, midColor, clamp(pow(h, exponent) * 1.6, 0.0, 1.0));
          col = mix(col, topColor, clamp(pow(h, exponent * 2.0), 0.0, 1.0));
        } else {
          col = mix(bottomColor, horizonColor, clamp((h + 0.35) / 0.5, 0.0, 1.0));
        }
        gl_FragColor = vec4(col, 1.0);
      }
    `});return new W(e,t)}function $m(){const i=document.createElement("canvas");i.width=i.height=256;const e=i.getContext("2d"),t=e.createRadialGradient(256/2,256/2,0,256/2,256/2,256/2);return t.addColorStop(0,"rgba(255,220,160,0.9)"),t.addColorStop(.4,"rgba(255,150,120,0.35)"),t.addColorStop(1,"rgba(255,80,120,0)"),e.fillStyle=t,e.fillRect(0,0,256,256),new Rt(i)}function Ym(){const i=new qe,e=new W(new Fi(46,48),new ut({color:16773577}));i.add(e);const t=new cn(new zi({map:$m(),color:16764810,transparent:!0,opacity:.9,blending:Dr,depthWrite:!1}));return t.scale.set(420,420,1),i.add(t),i.position.set(0,90,-760),i.userData.glow=t,i}function Km(){const i=new qe;return[{z:-700,h:140,color:2759242},{z:-600,h:110,color:3809880},{z:-500,h:80,color:5255278}].forEach(e=>{const t=new na,r=2200;t.moveTo(-r/2,-5);let n=-r/2;const a=r/15;for(;n<=r/2;){const c=e.h*.4+Math.random()*e.h;t.lineTo(n,c),n+=a}t.lineTo(r/2,-5),t.closePath();const s=new hn(t,{depth:40,bevelEnabled:!1}),o=new we({color:e.color,roughness:1,emissive:e.color,emissiveIntensity:.12}),l=new W(s,o);l.position.set(0,0,e.z),i.add(l)}),i}function Jm(){const i=new qe,e=[16757575,16723592,58879,10354458];for(let t=0;t<40;t++){const r=8+Math.random()*14,n=30+Math.random()*140,a=8+Math.random()*14,s=(Math.random()-.5)*1400,o=-420-Math.random()*180,l=new W(new Ge(r,n,a),new we({color:790302,roughness:.6,metalness:.3,emissive:395282,emissiveIntensity:.4}));if(l.position.set(s,n/2,o),i.add(l),Math.random()>.4){const c=e[Math.floor(Math.random()*e.length)],h=new W(new mt(r*.85,n*.85),new ut({color:c,transparent:!0,opacity:.16}));h.position.set(s,n/2,o+a/2+.1),i.add(h)}}return i}function Zm(){const i=new qe,e=new we({color:2760472,roughness:1}),t=new W(new Ft(.14,.22,5.5,6),e);t.position.y=2.75,t.rotation.z=(Math.random()-.5)*.15,i.add(t);const r=new we({color:802094,roughness:.8,emissive:802094,emissiveIntensity:.15});for(let n=0;n<6;n++){const a=new W(new Pi(.35,2.6,4),r);a.position.y=5.4,a.rotation.z=Math.PI/2.4,a.rotation.y=n/6*Math.PI*2,a.rotation.x=.5,i.add(a)}return i}function Qm(i){const e=new qe,t=new we({color:1711138,metalness:.7,roughness:.4}),r=new W(new Ft(.09,.09,6,8),t);r.position.y=3,e.add(r);const n=new W(new Ge(1.6,.1,.1),t);n.position.set(.75,5.9,0),e.add(n);const a=new W(new Ct(.22,12,12),new we({color:i,emissive:i,emissiveIntensity:3}));a.position.set(1.5,5.75,0),e.add(a);const s=new Ut(i,1.4,14,2);return s.position.copy(a.position),e.add(s),e}function eg(){const i=document.createElement("canvas");i.width=i.height=256;const e=i.getContext("2d");e.fillStyle="#2a2c33",e.fillRect(0,0,256,256);for(let r=0;r<900;r++)e.fillStyle=`rgba(${20+Math.random()*30},${20+Math.random()*30},${24+Math.random()*30},${Math.random()*.5})`,e.fillRect(Math.random()*256,Math.random()*256,1.6,1.6);e.fillStyle="rgba(255,255,255,0.85)";for(let r=0;r<256;r+=32)e.fillRect(256/2-3,r,6,16);const t=new Rt(i);return t.wrapS=Vt,t.wrapT=Vt,t.repeat.set(1,60),t.anisotropy=4,t}function tg(){const i=[new w(0,0,0),new w(60,0,-40),new w(90,0,-140),new w(60,0,-230),new w(-20,0,-260),new w(-110,0,-220),new w(-140,0,-120),new w(-100,0,-30),new w(-40,0,40),new w(30,0,60)],e=new Er(i,!0,"catmullrom",.5),t=14,r=400,n=new qe,a=[],s=[],o=[],l=[],c=[];for(let u=0;u<=r;u++){const d=u/r,g=e.getPointAt(d),v=e.getTangentAt(d).normalize(),p=new w(-v.z,0,v.x).normalize(),m=g.clone().addScaledVector(p,t/2),y=g.clone().addScaledVector(p,-t/2);if(a.push(m.x,.01,m.z,y.x,.01,y.z),s.push(0,d*60,1,d*60),l.push({pos:m,normal:p}),c.push({pos:y,normal:p}),u<r){const _=u*2,S=u*2+1,P=u*2+2,T=u*2+3;o.push(_,S,P,S,T,P)}}const h=new pt;h.setAttribute("position",new Ke(a,3)),h.setAttribute("uv",new Ke(s,2)),h.setIndex(o),h.computeVertexNormals();const f=new W(h,new we({map:eg(),roughness:.95,metalness:.05}));f.receiveShadow=!0,n.add(f),[l,c].forEach((u,d)=>{for(let g=0;g<u.length-1;g+=4){const v=u[g],p=u[Math.min(g+4,u.length-1)],m=p.pos.clone().sub(v.pos).length()||.01,y=v.normal.clone().multiplyScalar(d===0?1:-1),_=new W(new Ge(.9,.12,m),new we({color:g/4%2===0?14029866:15921906,roughness:.6})),S=v.pos.clone().lerp(p.pos,.5).addScaledVector(y,.55);if(_.position.set(S.x,.06,S.z),_.lookAt(p.pos.x,.06,p.pos.z),n.add(_),g/4%3===0){const P=new W(new Ge(.12,.7,m*1.05),new we({color:12174028,metalness:.8,roughness:.35})),T=v.pos.clone().lerp(p.pos,.5).addScaledVector(y,1.4);P.position.set(T.x,.55,T.z),P.lookAt(p.pos.x,.55,p.pos.z),n.add(P)}}});for(let u=0;u<r;u+=18){const d=u/r,g=e.getPointAt(d),v=e.getTangentAt(d).normalize(),p=new w(-v.z,0,v.x).normalize(),m=u%36===0?1:-1,y=g.clone().addScaledVector(p,m*(t/2+4));if(u%36===0){const _=Qm(m>0?16757575:16723592);_.position.copy(y),_.lookAt(g.x,0,g.z),n.add(_)}else{const _=Zm();_.position.copy(y),n.add(_)}}return{curve:e,roadGroup:n,trackWidth:t}}function rg(){const i=new W(new mt(3e3,3e3),new we({color:989716,roughness:1}));return i.rotation.x=-Math.PI/2,i.position.y=-.02,i.receiveShadow=!0,i}function ig(i){i.environment=ri(["#ffb347","#ff7a1a","#7c4dff","#ffe08a","#ff2e88"]),i.add(jm());const e=Ym();i.add(e),i.add(Km()),i.add(Jm()),i.add(rg());const{curve:t,roadGroup:r,trackWidth:n}=tg();i.add(r);const a=new kr(16767400,1.4);a.position.set(-120,140,-200),a.castShadow=!0,a.shadow.mapSize.set(2048,2048),a.shadow.camera.left=-160,a.shadow.camera.right=160,a.shadow.camera.top=160,a.shadow.camera.bottom=-160,a.shadow.camera.far=600,a.shadow.bias=-.0015,i.add(a),i.add(new Br(8023039,1707822,.65)),i.add(new Tr(4205141,.5)),i.fog=new vr(1707566,.0016);function s(o){const l=performance.now()*.001;e.userData.glow.material.opacity=.8+Math.sin(l*.4)*.1}return{curve:t,trackWidth:n,update:s}}function ng(){const i={topColor:{value:new ve(1050662)},midColor:{value:new ve(6954606)},horizonColor:{value:new ve(16742973)},bottomColor:{value:new ve(1707536)},offset:{value:20},exponent:{value:.65}},e=new Ct(900,32,16),t=new St({uniforms:i,side:ei,depthWrite:!1,vertexShader:`
      varying vec3 vWorldPosition;
      void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform vec3 topColor; uniform vec3 midColor; uniform vec3 horizonColor; uniform vec3 bottomColor;
      uniform float offset; uniform float exponent;
      varying vec3 vWorldPosition;
      void main() {
        float h = normalize(vWorldPosition + vec3(0.0, offset, 0.0)).y;
        vec3 col;
        if (h > 0.1) {
          col = mix(horizonColor, midColor, clamp(pow(h, exponent) * 1.7, 0.0, 1.0));
          col = mix(col, topColor, clamp(pow(h, exponent * 2.2), 0.0, 1.0));
        } else {
          col = mix(bottomColor, horizonColor, clamp((h + 0.3) / 0.45, 0.0, 1.0));
        }
        gl_FragColor = vec4(col, 1.0);
      }
    `});return new W(e,t)}function ag(){const i=document.createElement("canvas");i.width=i.height=256;const e=i.getContext("2d");e.fillStyle="#3a2c22",e.fillRect(0,0,256,256);for(let r=0;r<1400;r++)e.fillStyle=`rgba(${90+Math.random()*60},${65+Math.random()*40},${40+Math.random()*25},${Math.random()*.5})`,e.fillRect(Math.random()*256,Math.random()*256,1.4,1.4);e.fillStyle="rgba(255,255,255,0.85)";for(let r=0;r<256;r+=32)e.fillRect(256/2-3,r,6,16);const t=new Rt(i);return t.wrapS=Vt,t.wrapT=Vt,t.repeat.set(1,60),t.anisotropy=4,t}function sg(){const i=new W(new mt(3e3,3e3),new we({color:2760472,roughness:1}));return i.rotation.x=-Math.PI/2,i.position.y=-.02,i.receiveShadow=!0,i}function og(){const i=new qe,e=[16742973,16723592,58879,16765286];for(let t=0;t<45;t++){const r=7+Math.random()*15,n=35+Math.random()*200,a=7+Math.random()*15,s=(Math.random()-.5)*1500,o=-400-Math.random()*260,l=new W(new Ge(r,n,a),new we({color:1313296,roughness:.5,metalness:.4,emissive:1706514,emissiveIntensity:.35}));l.position.set(s,n/2,o),i.add(l);const c=e[Math.floor(Math.random()*e.length)],h=new W(new mt(r*.5,n*.96),new ut({color:c,transparent:!0,opacity:.5}));h.position.set(s,n/2,o+a/2+.08),i.add(h)}return i}function lg(){const i=new qe,e=new we({color:1989695,roughness:.9,emissive:664853,emissiveIntensity:.2}),t=new W(new Ft(.22,.28,2.4,8),e);return t.position.y=1.2,i.add(t),[-1,1].forEach(r=>{const n=new W(new Ft(.14,.18,1.1,8),e);n.position.set(r*.32,1.6,0),n.rotation.z=r*.5,i.add(n)}),i}function cg(i){const e=new qe,t=new W(new Ct(.18,10,10),new we({color:1119e3,metalness:.8,roughness:.3}));e.add(t);const r=new Ut(i,1.8,12,2);e.add(r);const n=new W(new Ct(.07,8,8),new ut({color:i}));return n.position.y=-.15,e.add(n),e}function hg(i){const e=new qe,t=new we({color:1711138,metalness:.7,roughness:.4}),r=new W(new Ft(.09,.09,6,8),t);r.position.y=3,e.add(r);const n=new W(new Ge(1.6,.1,.1),t);n.position.set(.75,5.9,0),e.add(n);const a=new W(new Ct(.22,12,12),new we({color:i,emissive:i,emissiveIntensity:3.2}));a.position.set(1.5,5.75,0),e.add(a);const s=new Ut(i,1.6,15,2);return s.position.copy(a.position),e.add(s),e}function ug(){const i=[new w(0,0,0),new w(60,0,-40),new w(90,0,-140),new w(60,0,-230),new w(-20,0,-260),new w(-110,0,-220),new w(-140,0,-120),new w(-100,0,-30),new w(-40,0,40),new w(30,0,60)],e=new Er(i,!0,"catmullrom",.5),t=14,r=400,n=new qe,a=[],s=[],o=[],l=[],c=[];for(let u=0;u<=r;u++){const d=u/r,g=e.getPointAt(d),v=e.getTangentAt(d).normalize(),p=new w(-v.z,0,v.x).normalize(),m=g.clone().addScaledVector(p,t/2),y=g.clone().addScaledVector(p,-t/2);if(a.push(m.x,.01,m.z,y.x,.01,y.z),s.push(0,d*60,1,d*60),l.push({pos:m,normal:p}),c.push({pos:y,normal:p}),u<r){const _=u*2,S=u*2+1,P=u*2+2,T=u*2+3;o.push(_,S,P,S,T,P)}}const h=new pt;h.setAttribute("position",new Ke(a,3)),h.setAttribute("uv",new Ke(s,2)),h.setIndex(o),h.computeVertexNormals();const f=new W(h,new we({map:ag(),roughness:.85,metalness:.1}));f.receiveShadow=!0,n.add(f),[l,c].forEach((u,d)=>{for(let g=0;g<u.length-1;g+=4){const v=u[g],p=u[Math.min(g+4,u.length-1)],m=p.pos.clone().sub(v.pos).length()||.01,y=v.normal.clone().multiplyScalar(d===0?1:-1),_=new W(new Ge(.9,.12,m),new we({color:g/4%2===0?14029866:15921906,roughness:.6})),S=v.pos.clone().lerp(p.pos,.5).addScaledVector(y,.55);if(_.position.set(S.x,.06,S.z),_.lookAt(p.pos.x,.06,p.pos.z),n.add(_),g/4%3===0){const P=new W(new Ge(.12,.7,m*1.05),new we({color:11569754,metalness:.7,roughness:.4})),T=v.pos.clone().lerp(p.pos,.5).addScaledVector(y,1.4);P.position.set(T.x,.55,T.z),P.lookAt(p.pos.x,.55,p.pos.z),n.add(P)}}});for(let u=0;u<r;u+=18){const d=u/r,g=e.getPointAt(d),v=e.getTangentAt(d).normalize(),p=new w(-v.z,0,v.x).normalize(),m=u%36===0?1:-1,y=g.clone().addScaledVector(p,m*(t/2+4));if(u%36===0){const _=hg(m>0?16742973:58879);_.position.copy(y),_.lookAt(g.x,0,g.z),n.add(_)}else{const _=lg();_.position.copy(y),n.add(_)}}return{curve:e,roadGroup:n,trackWidth:t}}function dg(i){i.environment=ri(["#ff7a3d","#ff2e88","#00e5ff","#ffd166","#ffb347"]),i.add(ng()),i.add(og()),i.add(sg());const{curve:e,roadGroup:t,trackWidth:r}=ug();i.add(t);const n=new kr(16757626,1.3);n.position.set(-100,130,-180),n.castShadow=!0,n.shadow.mapSize.set(2048,2048),n.shadow.camera.left=-160,n.shadow.camera.right=160,n.shadow.camera.top=160,n.shadow.camera.bottom=-160,n.shadow.camera.far=600,n.shadow.bias=-.0015,i.add(n),i.add(new Br(16742973,2756112,.6)),i.add(new Tr(4860448,.55)),i.fog=new vr(2757656,.0019);const a=[],s=[58879,16723592,16765286];for(let l=0;l<5;l++){const c=cg(s[l%s.length]),h=60+Math.random()*120,f=30+Math.random()*40,u=.05+Math.random()*.05,d=Math.random()*Math.PI*2,g=(Math.random()-.5)*200,v=-100-Math.random()*200;i.add(c),a.push({mesh:c,radius:h,height:f,speed:u,phase:d,cx:g,cz:v})}function o(l){const c=performance.now()*.001;a.forEach(h=>{const f=c*h.speed+h.phase;h.mesh.position.set(h.cx+Math.cos(f)*h.radius,h.height+Math.sin(f*2)*4,h.cz+Math.sin(f)*h.radius)})}return{curve:e,trackWidth:r,update:o}}function pg(){const i=document.createElement("canvas");i.width=i.height=256;const e=i.getContext("2d");e.fillStyle="#1c1d22",e.fillRect(0,0,256,256);for(let r=0;r<800;r++)e.fillStyle=`rgba(${15+Math.random()*20},${15+Math.random()*20},${20+Math.random()*22},${Math.random()*.5})`,e.fillRect(Math.random()*256,Math.random()*256,1.6,1.6);e.fillStyle="rgba(255,255,255,0.85)";for(let r=0;r<256;r+=32)e.fillRect(256/2-3,r,6,16);const t=new Rt(i);return t.wrapS=Vt,t.wrapT=Vt,t.repeat.set(1,60),t.anisotropy=4,t}function fg(){const i=new W(new mt(3e3,3e3),new we({color:526604,roughness:.95}));return i.rotation.x=-Math.PI/2,i.position.y=-.02,i.receiveShadow=!0,i}function mg(){const i=new W(new mt(3e3,3e3),new we({color:658192,roughness:1,side:jn}));return i.rotation.x=Math.PI/2,i.position.y=42,i}function gg(i){const e=new qe,t=new we({color:1711138,metalness:.6,roughness:.5}),r=new W(new Ge(.5,40,.5),t);r.position.y=20,e.add(r);const n=new W(new Ge(24,.4,.4),t);n.position.y=38,e.add(n);const a=new W(new Ge(.08,38,.08),new we({color:i,emissive:i,emissiveIntensity:3}));a.position.set(.3,20,0),e.add(a);const s=new Ut(i,1.2,16,2);return s.position.set(.3,20,0),e.add(s),e}function vg(){const i=new qe,e=new W(new Fi(1.2,16),new ut({color:16774345}));i.add(e);const t=new Ut(16774345,4,40,2);return i.add(t),i}function _g(){const i=[new w(0,0,0),new w(60,0,-40),new w(90,0,-140),new w(60,0,-230),new w(-20,0,-260),new w(-110,0,-220),new w(-140,0,-120),new w(-100,0,-30),new w(-40,0,40),new w(30,0,60)],e=new Er(i,!0,"catmullrom",.5),t=14,r=400,n=new qe,a=[],s=[],o=[],l=[],c=[];for(let u=0;u<=r;u++){const d=u/r,g=e.getPointAt(d),v=e.getTangentAt(d).normalize(),p=new w(-v.z,0,v.x).normalize(),m=g.clone().addScaledVector(p,t/2),y=g.clone().addScaledVector(p,-t/2);if(a.push(m.x,.01,m.z,y.x,.01,y.z),s.push(0,d*60,1,d*60),l.push({pos:m,normal:p}),c.push({pos:y,normal:p}),u<r){const _=u*2,S=u*2+1,P=u*2+2,T=u*2+3;o.push(_,S,P,S,T,P)}}const h=new pt;h.setAttribute("position",new Ke(a,3)),h.setAttribute("uv",new Ke(s,2)),h.setIndex(o),h.computeVertexNormals();const f=new W(h,new we({map:pg(),roughness:.4,metalness:.3,envMapIntensity:1.2}));f.receiveShadow=!0,n.add(f),[l,c].forEach((u,d)=>{for(let g=0;g<u.length-1;g+=4){const v=u[g],p=u[Math.min(g+4,u.length-1)],m=p.pos.clone().sub(v.pos).length()||.01,y=v.normal.clone().multiplyScalar(d===0?1:-1),_=new W(new Ge(.9,.12,m),new we({color:g/4%2===0?14029866:15921906,roughness:.6})),S=v.pos.clone().lerp(p.pos,.5).addScaledVector(y,.55);_.position.set(S.x,.06,S.z),_.lookAt(p.pos.x,.06,p.pos.z),n.add(_)}});for(let u=0;u<r;u+=14){const d=u/r,g=e.getPointAt(d),v=e.getTangentAt(d).normalize(),p=new w(-v.z,0,v.x).normalize(),m=u%28===0?1:-1,y=g.clone().addScaledVector(p,m*(t/2+3)),_=gg(m>0?58879:16723592);_.position.copy(y),n.add(_)}return{curve:e,roadGroup:n,trackWidth:t}}function xg(i){i.environment=ri(["#00e5ff","#ff2e88","#fff4c9","#39ff9d"]),i.background=new ve(197380),i.add(fg()),i.add(mg());const{curve:e,roadGroup:t,trackWidth:r}=_g();i.add(t);const n=new Br(2767445,657933,.5);i.add(n),i.add(new Tr(1381922,.6)),i.fog=new vr(263174,.006);const a=vg();i.add(a);let s=-.4,o=!1,l=3+Math.random()*5;function c(h){if(!o)l-=h,l<=0&&(o=!0,s=-.15),a.visible=!1;else{a.visible=!0,s+=h*.35;const f=e.getPointAt((s%1+1)%1),u=e.getTangentAt((s%1+1)%1).normalize(),d=new w(-u.z,0,u.x).normalize(),g=f.clone().addScaledVector(d,r/2+8);a.position.set(g.x,3,g.z),s>.5&&(o=!1,l=6+Math.random()*8)}}return{curve:e,trackWidth:r,update:c}}function yg(){const i={topColor:{value:new ve(132111)},midColor:{value:new ve(1182254)},horizonColor:{value:new ve(2756688)},bottomColor:{value:new ve(66058)},offset:{value:20},exponent:{value:.7}},e=new Ct(900,32,16),t=new St({uniforms:i,side:ei,depthWrite:!1,vertexShader:`
      varying vec3 vWorldPosition;
      void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform vec3 topColor; uniform vec3 midColor; uniform vec3 horizonColor; uniform vec3 bottomColor;
      uniform float offset; uniform float exponent;
      varying vec3 vWorldPosition;
      void main() {
        float h = normalize(vWorldPosition + vec3(0.0, offset, 0.0)).y;
        vec3 col;
        if (h > 0.1) {
          col = mix(horizonColor, midColor, clamp(pow(h, exponent) * 1.7, 0.0, 1.0));
          col = mix(col, topColor, clamp(pow(h, exponent * 2.2), 0.0, 1.0));
        } else {
          col = mix(bottomColor, horizonColor, clamp((h + 0.3) / 0.45, 0.0, 1.0));
        }
        gl_FragColor = vec4(col, 1.0);
      }
    `});return new W(e,t)}function Sg(i){const e=document.createElement("canvas");e.width=128,e.height=192;const t=e.getContext("2d");t.fillStyle="#050608",t.fillRect(0,0,128,192);const r=6+Math.floor(Math.random()*6),n=3+Math.floor(Math.random()*3),a=128/n,s=192/r;for(let o=0;o<r;o++)for(let l=0;l<n;l++)Math.random()>.35&&(t.fillStyle=Math.random()>.5?i:"rgba(255,255,255,0.75)",t.globalAlpha=.4+Math.random()*.5,t.fillRect(l*a+1,o*s+1,a-2,s-2));return t.globalAlpha=1,new Rt(e)}const Go=["#00e5ff","#ff2e88","#9b30ff","#ffb347","#39ff9d"];function Mg(){const i=new qe;for(let e=0;e<70;e++){const t=10+Math.random()*20,r=10+Math.random()*20,n=60+Math.random()*260,a=(Math.random()-.5)*900,s=(Math.random()-.5)*900;if(Math.hypot(a,s)<45)continue;const o=new W(new Ge(t,n,r),new we({color:395021,roughness:.45,metalness:.55,emissive:197642,emissiveIntensity:.35}));o.position.set(a,n/2-90,s),i.add(o);const l=Go[Math.floor(Math.random()*Go.length)],c=Sg(l);if([0,Math.PI/2,Math.PI,-Math.PI/2].forEach(h=>{if(Math.random()>.5)return;const f=new W(new mt(t*.9,n*.94),new ut({map:c,transparent:!0,opacity:.85}));f.position.set(0,0,Math.max(t,r)/2+.05),f.rotation.y=h;const u=new qe;u.add(f),u.position.copy(o.position),i.add(u)}),Math.random()>.7){const h=new ve(l),f=new W(new mt(t*.8,n*.1),new ut({color:h,transparent:!0,opacity:.95}));f.position.set(a,n*.4-90,s+r/2+.3),i.add(f)}}return i}function wg(){const i=new qe;for(let e=0;e<10;e++){const t=new W(new an(3,3.6,24),new ut({color:16765286,transparent:!0,opacity:.5,side:jn}));t.rotation.x=-Math.PI/2,t.position.set((Math.random()-.5)*500,-2+Math.random()*4,(Math.random()-.5)*500),i.add(t)}return i}function bg(){const i=new W(new mt(3e3,3e3),new we({color:328970,roughness:.6,metalness:.4}));return i.rotation.x=-Math.PI/2,i.position.y=-.02,i.receiveShadow=!0,i}function Eg(){const i=document.createElement("canvas");i.width=i.height=256;const e=i.getContext("2d");e.fillStyle="#26272e",e.fillRect(0,0,256,256);for(let r=0;r<800;r++)e.fillStyle=`rgba(${25+Math.random()*25},${25+Math.random()*25},${30+Math.random()*28},${Math.random()*.5})`,e.fillRect(Math.random()*256,Math.random()*256,1.6,1.6);e.fillStyle="rgba(255,255,255,0.85)";for(let r=0;r<256;r+=32)e.fillRect(256/2-3,r,6,16);const t=new Rt(i);return t.wrapS=Vt,t.wrapT=Vt,t.repeat.set(1,60),t.anisotropy=4,t}function Tg(i){const e=new na,t=7;e.moveTo(-t/2,0),e.lineTo(t/2,2.6),e.lineTo(t/2,0),e.closePath();const n=new hn(e,{depth:i,bevelEnabled:!1});n.rotateY(Math.PI/2),n.translate(-i/2,0,0);const a=new we({color:2764086,metalness:.6,roughness:.4,emissive:16742938,emissiveIntensity:.25}),s=new W(n,a);s.castShadow=!0,s.receiveShadow=!0;const o=new W(new mt(i*.9,.6),new ut({color:16742938}));return o.rotation.x=-Math.PI/2,o.position.set(0,.02,-t/2+.3),s.add(o),s}function Ag(i){const e=new qe,t=new we({color:1711138,metalness:.7,roughness:.4}),r=new W(new Ft(.09,.09,5,8),t);r.position.y=2.5,e.add(r);const n=new W(new Ct(.2,12,12),new we({color:i,emissive:i,emissiveIntensity:3.2}));n.position.set(0,5,0),e.add(n);const a=new Ut(i,1.6,14,2);return a.position.copy(n.position),e.add(a),e}function Cg(){const i=[new w(0,0,0),new w(60,0,-40),new w(90,0,-140),new w(60,0,-230),new w(-20,0,-260),new w(-110,0,-220),new w(-140,0,-120),new w(-100,0,-30),new w(-40,0,40),new w(30,0,60)],e=new Er(i,!0,"catmullrom",.5),t=14,r=400,n=new qe,a=[],s=[],o=[],l=[],c=[];for(let d=0;d<=r;d++){const g=d/r,v=e.getPointAt(g),p=e.getTangentAt(g).normalize(),m=new w(-p.z,0,p.x).normalize(),y=v.clone().addScaledVector(m,t/2),_=v.clone().addScaledVector(m,-t/2);if(a.push(y.x,.01,y.z,_.x,.01,_.z),s.push(0,g*60,1,g*60),l.push({pos:y,normal:m}),c.push({pos:_,normal:m}),d<r){const S=d*2,P=d*2+1,T=d*2+2,R=d*2+3;o.push(S,P,T,P,R,T)}}const h=new pt;h.setAttribute("position",new Ke(a,3)),h.setAttribute("uv",new Ke(s,2)),h.setIndex(o),h.computeVertexNormals();const f=new W(h,new we({map:Eg(),roughness:.5,metalness:.25,envMapIntensity:1.3}));f.receiveShadow=!0,n.add(f),[l,c].forEach((d,g)=>{for(let v=0;v<d.length-1;v+=4){const p=d[v],m=d[Math.min(v+4,d.length-1)],y=m.pos.clone().sub(p.pos).length()||.01,_=p.normal.clone().multiplyScalar(g===0?1:-1),S=new W(new Ge(.9,.12,y),new we({color:v/4%2===0?14029866:15921906,roughness:.6})),P=p.pos.clone().lerp(m.pos,.5).addScaledVector(_,.55);S.position.set(P.x,.06,P.z),S.lookAt(m.pos.x,.06,m.pos.z),n.add(S);const T=new W(new Ge(.1,1.1,y*1.05),new we({color:2764086,metalness:.7,roughness:.35,emissive:58879,emissiveIntensity:.15})),R=p.pos.clone().lerp(m.pos,.5).addScaledVector(_,1.4);T.position.set(R.x,.7,R.z),T.lookAt(m.pos.x,.7,m.pos.z),n.add(T)}});for(let d=0;d<r;d+=16){const g=d/r,v=e.getPointAt(g),p=e.getTangentAt(g).normalize(),m=new w(-p.z,0,p.x).normalize(),y=d%32===0?1:-1,_=v.clone().addScaledVector(m,y*(t/2+3)),S=Ag(y>0?58879:16723592);S.position.copy(_),n.add(S)}const u=[];return[.22,.62].forEach(d=>{const g=e.getPointAt(d),v=e.getTangentAt(d).normalize(),p=Math.atan2(v.x,v.z),m=Tg(t*.8);m.position.set(g.x,0,g.z),m.rotation.y=p,n.add(m),u.push({position:new w(g.x,0,g.z),radius:4,minSpeed:14,launchVy:17,forwardBoost:4})}),{curve:e,roadGroup:n,trackWidth:t,ramps:u}}function Rg(i){i.environment=ri(["#00e5ff","#ff2e88","#9b30ff","#ffb347"]),i.add(yg()),i.add(Mg()),i.add(wg()),i.add(bg());const{curve:e,roadGroup:t,trackWidth:r,ramps:n}=Cg();i.add(t);const a=new kr(10469375,.9);a.position.set(-100,140,-160),a.castShadow=!0,a.shadow.mapSize.set(2048,2048),a.shadow.camera.left=-160,a.shadow.camera.right=160,a.shadow.camera.top=160,a.shadow.camera.bottom=-160,a.shadow.camera.far=600,a.shadow.bias=-.0015,i.add(a),i.add(new Br(58879,656928,.55)),i.add(new Tr(1708080,.5)),i.fog=new vr(328975,.0017);function s(){}return{curve:e,trackWidth:r,update:s,ramps:n}}function Pg(){const i={topColor:{value:new ve(656918)},midColor:{value:new ve(2756688)},horizonColor:{value:new ve(3807834)},bottomColor:{value:new ve(197128)},offset:{value:20},exponent:{value:.6}},e=new Ct(900,32,16),t=new St({uniforms:i,side:ei,depthWrite:!1,vertexShader:"varying vec3 vWorldPosition; void main() { vec4 wp = modelMatrix * vec4(position,1.0); vWorldPosition = wp.xyz; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`
      uniform vec3 topColor; uniform vec3 midColor; uniform vec3 horizonColor; uniform vec3 bottomColor;
      uniform float offset; uniform float exponent;
      varying vec3 vWorldPosition;
      void main() {
        float h = normalize(vWorldPosition + vec3(0.0, offset, 0.0)).y;
        vec3 col;
        if (h > 0.1) { col = mix(horizonColor, midColor, clamp(pow(h, exponent) * 1.7, 0.0, 1.0)); col = mix(col, topColor, clamp(pow(h, exponent * 2.2), 0.0, 1.0)); }
        else { col = mix(bottomColor, horizonColor, clamp((h + 0.3) / 0.45, 0.0, 1.0)); }
        gl_FragColor = vec4(col, 1.0);
      }`});return new W(e,t)}function Ig(){const i=new qe,e=new ut({color:3809376,transparent:!0,opacity:.35}),t=[];for(let r=0;r<12;r++){const n=new W(new mt(120+Math.random()*180,40+Math.random()*40),e.clone());n.position.set((Math.random()-.5)*900,140+Math.random()*60,(Math.random()-.5)*900),n.rotation.x=Math.PI/2,i.add(n),t.push(n)}return{group:i,clouds:t}}function Lg(i){const e=document.createElement("canvas");e.width=128,e.height=192;const t=e.getContext("2d");t.fillStyle="#04050a",t.fillRect(0,0,128,192);const r=6+Math.floor(Math.random()*6),n=3+Math.floor(Math.random()*3),a=128/n,s=192/r;for(let o=0;o<r;o++)for(let l=0;l<n;l++)Math.random()>.45&&(t.fillStyle=Math.random()>.5?i:"rgba(220,200,255,0.7)",t.globalAlpha=.3+Math.random()*.4,t.fillRect(l*a+1,o*s+1,a-2,s-2));return t.globalAlpha=1,new Rt(e)}function Ug(){const i=new qe,e=["#8b30ff","#6a1eb0","#3a5cff","#c0a0ff"];for(let t=0;t<55;t++){const r=8+Math.random()*16,n=40+Math.random()*190,a=8+Math.random()*16,s=(Math.random()-.5)*1500,o=-380-Math.random()*260,l=new W(new Ge(r,n,a),new we({color:525839,roughness:.4,metalness:.6,emissive:656920,emissiveIntensity:.3}));l.position.set(s,n/2,o),i.add(l);const c=new W(new mt(r*.92,n*.92),new ut({map:Lg(e[Math.floor(Math.random()*e.length)]),transparent:!0,opacity:.85}));c.position.set(s,n/2,o+a/2+.05),i.add(c)}return i}function Ng(){const i=new W(new mt(3e3,3e3),new we({color:197642,roughness:.15,metalness:.5}));return i.rotation.x=-Math.PI/2,i.position.y=-.03,i.receiveShadow=!0,i}function Dg(){const i=document.createElement("canvas");i.width=i.height=256;const e=i.getContext("2d");e.fillStyle="#16151f",e.fillRect(0,0,256,256);for(let r=0;r<700;r++)e.fillStyle=`rgba(${25+Math.random()*25},${20+Math.random()*22},${40+Math.random()*30},${Math.random()*.4})`,e.fillRect(Math.random()*256,Math.random()*256,1.6,1.6);e.fillStyle="rgba(255,255,255,0.85)";for(let r=0;r<256;r+=32)e.fillRect(256/2-3,r,6,16);const t=new Rt(i);return t.wrapS=Vt,t.wrapT=Vt,t.repeat.set(1,60),t.anisotropy=4,t}function Og(i){const e=new qe,t=new we({color:1315868,metalness:.8,roughness:.25}),r=new W(new Ft(.09,.09,6,8),t);r.position.y=3,e.add(r);const n=new W(new Ct(.2,12,12),new we({color:i,emissive:i,emissiveIntensity:3.2}));n.position.set(0,5.9,0),e.add(n);const a=new Ut(i,1.6,14,2);return a.position.copy(n.position),e.add(a),e}function zg(){const i=[new w(0,0,0),new w(60,0,-40),new w(90,0,-140),new w(60,0,-230),new w(-20,0,-260),new w(-110,0,-220),new w(-140,0,-120),new w(-100,0,-30),new w(-40,0,40),new w(30,0,60)],e=new Er(i,!0,"catmullrom",.5),t=14,r=400,n=new qe,a=[],s=[],o=[],l=[],c=[];for(let u=0;u<=r;u++){const d=u/r,g=e.getPointAt(d),v=e.getTangentAt(d).normalize(),p=new w(-v.z,0,v.x).normalize(),m=g.clone().addScaledVector(p,t/2),y=g.clone().addScaledVector(p,-t/2);if(a.push(m.x,.01,m.z,y.x,.01,y.z),s.push(0,d*60,1,d*60),l.push({pos:m,normal:p}),c.push({pos:y,normal:p}),u<r){const _=u*2,S=u*2+1,P=u*2+2,T=u*2+3;o.push(_,S,P,S,T,P)}}const h=new pt;h.setAttribute("position",new Ke(a,3)),h.setAttribute("uv",new Ke(s,2)),h.setIndex(o),h.computeVertexNormals();const f=new W(h,new we({map:Dg(),roughness:.15,metalness:.45,envMapIntensity:1.8}));f.receiveShadow=!0,n.add(f),[l,c].forEach((u,d)=>{for(let g=0;g<u.length-1;g+=4){const v=u[g],p=u[Math.min(g+4,u.length-1)],m=p.pos.clone().sub(v.pos).length()||.01,y=v.normal.clone().multiplyScalar(d===0?1:-1),_=new W(new Ge(.9,.12,m),new we({color:g/4%2===0?14029866:15921906,roughness:.5})),S=v.pos.clone().lerp(p.pos,.5).addScaledVector(y,.55);_.position.set(S.x,.06,S.z),_.lookAt(p.pos.x,.06,p.pos.z),n.add(_)}});for(let u=0;u<r;u+=18){const d=u/r,g=e.getPointAt(d),v=e.getTangentAt(d).normalize(),p=new w(-v.z,0,v.x).normalize(),m=u%36===0?1:-1,y=g.clone().addScaledVector(p,m*(t/2+4)),_=Og(m>0?9122047:3824895);_.position.copy(y),_.lookAt(g.x,0,g.z),n.add(_)}return{curve:e,roadGroup:n,trackWidth:t}}function Fg(i=2600){const e=new Float32Array(i*3),t=new Float32Array(i),r=220;for(let o=0;o<i;o++)e[o*3]=(Math.random()-.5)*r,e[o*3+1]=Math.random()*80,e[o*3+2]=(Math.random()-.5)*r,t[o]=65+Math.random()*40;const n=new pt;n.setAttribute("position",new Zt(e,3));const a=new ia({color:12892415,size:.24,transparent:!0,opacity:.6,depthWrite:!1}),s=new ps(n,a);return s.frustumCulled=!1,{points:s,positions:e,speeds:t,spread:r,count:i,mat:a}}function Bg(){const i=new qe,e=new ut({color:4864618,transparent:!0,opacity:.14,depthWrite:!1}),t=[];for(let r=0;r<8;r++){const n=new W(new mt(80+Math.random()*60,30+Math.random()*20),e.clone());n.rotation.x=-Math.PI/2,n.position.set((Math.random()-.5)*300,1+Math.random()*3,(Math.random()-.5)*300),i.add(n),t.push({mesh:n,dir:Math.random()*Math.PI*2,speed:2+Math.random()*3})}return{group:i,volumes:t}}function kg(i){i.environment=ri(["#8b30ff","#6a1eb0","#3a5cff","#c0a0ff","#e8e0ff"]),i.add(Pg()),i.add(Ug()),i.add(Ng());const{group:e,clouds:t}=Ig();i.add(e);const{curve:r,roadGroup:n,trackWidth:a}=zg();i.add(n);const s=Fg();i.add(s.points);const{group:o,volumes:l}=Bg();i.add(o);const c=new kr(9142271,.45);c.position.set(-100,160,-160),c.castShadow=!0,c.shadow.mapSize.set(2048,2048),c.shadow.camera.left=-160,c.shadow.camera.right=160,c.shadow.camera.top=160,c.shadow.camera.bottom=-160,c.shadow.camera.far=600,c.shadow.bias=-.0015,i.add(c),i.add(new Br(9122047,656918,.5)),i.add(new Tr(1708080,.5)),i.fog=new vr(656920,.0026);let h=1.5+Math.random()*2;const f=new Ut(15261951,0,600,1.4);f.position.set(0,220,-100),i.add(f);const u=new Kl(14675967,0,300,Math.PI/5,.6,1);u.position.set(-200,40,0);const d=new wt;d.position.set(0,0,0),i.add(d),u.target=d,i.add(u);let g=!1,v=0,p=0;function m(y){const _=performance.now()*.001;p+=y;const S=.55+.35*(.5+.5*Math.sin(p*.18));s.mat.opacity=S;const P=s.points.geometry.attributes.position.array;for(let T=0;T<s.count;T++)P[T*3+1]-=s.speeds[T]*y*(.7+S*.6),P[T*3+1]<0&&(P[T*3+1]=60+Math.random()*20);if(s.points.geometry.attributes.position.needsUpdate=!0,t.forEach((T,R)=>{T.position.x+=Math.sin(_*.05+R)*y*2}),l.forEach(T=>{T.mesh.position.x+=Math.cos(T.dir)*T.speed*y,T.mesh.position.z+=Math.sin(T.dir)*T.speed*y,Math.abs(T.mesh.position.x)>200&&(T.dir=Math.PI-T.dir),Math.abs(T.mesh.position.z)>200&&(T.dir=-T.dir)}),h-=y,h<=0&&(f.intensity=8+Math.random()*5,h=2+Math.random()*2.5,t.forEach(T=>{T.material.opacity=.7}),setTimeout(()=>{f.intensity=0,t.forEach(T=>{T.material.opacity=.35})},100),g=!0,v=0,u.intensity=4),g){v+=y;const T=-220+v*180;u.position.set(T,35,-30+Math.sin(v*2)*40),d.position.set(T+20,0,-30),v>2.2&&(g=!1,u.intensity=0)}}return{curve:r,trackWidth:a,update:m}}function Gg(){const i={topColor:{value:new ve(198159)},midColor:{value:new ve(661048)},horizonColor:{value:new ve(1718874)},bottomColor:{value:new ve(131848)},offset:{value:20},exponent:{value:.7}},e=new Ct(900,32,16),t=new St({uniforms:i,side:ei,depthWrite:!1,vertexShader:"varying vec3 vWorldPosition; void main() { vec4 wp = modelMatrix * vec4(position,1.0); vWorldPosition = wp.xyz; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`
      uniform vec3 topColor; uniform vec3 midColor; uniform vec3 horizonColor; uniform vec3 bottomColor;
      uniform float offset; uniform float exponent;
      varying vec3 vWorldPosition;
      void main() {
        float h = normalize(vWorldPosition + vec3(0.0, offset, 0.0)).y;
        vec3 col;
        if (h > 0.1) { col = mix(horizonColor, midColor, clamp(pow(h, exponent) * 1.6, 0.0, 1.0)); col = mix(col, topColor, clamp(pow(h, exponent * 2.0), 0.0, 1.0)); }
        else { col = mix(bottomColor, horizonColor, clamp((h + 0.3) / 0.45, 0.0, 1.0)); }
        gl_FragColor = vec4(col, 1.0);
      }`});return new W(e,t)}function Vg(i,e){const t=document.createElement("canvas");t.width=t.height=256;const r=t.getContext("2d"),n=r.createRadialGradient(256/2,256/2,0,256/2,256/2,256/2);return n.addColorStop(0,i),n.addColorStop(.5,e),n.addColorStop(1,"rgba(200,220,255,0)"),r.fillStyle=n,r.fillRect(0,0,256,256),new Rt(t)}function Hg(){const i=new qe,e=new W(new Fi(30,40),new ut({color:16054015}));i.add(e);const t=new cn(new zi({map:Vg("rgba(230,240,255,0.9)","rgba(150,180,255,0.25)"),transparent:!0,blending:Dr,depthWrite:!1}));return t.scale.set(280,280,1),i.add(t),i.position.set(150,130,-700),i}function Wg(){const i=new mt(900,900,90,90),e=new St({uniforms:{uTime:{value:0},uColorDeep:{value:new ve(199966)},uColorShallow:{value:new ve(932438)},uMoon:{value:new ve(13623551)}},vertexShader:`
      uniform float uTime;
      varying float vHeight;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec3 p = position;
        float h = sin(p.x * 0.06 + uTime * 0.9) * 0.6 + sin(p.y * 0.09 - uTime * 0.6) * 0.4 + sin((p.x + p.y) * 0.03 + uTime * 1.3) * 0.5;
        p.z += h;
        vHeight = h;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }
    `,fragmentShader:`
      uniform vec3 uColorDeep; uniform vec3 uColorShallow; uniform vec3 uMoon;
      varying float vHeight; varying vec2 vUv;
      void main() {
        vec3 col = mix(uColorDeep, uColorShallow, smoothstep(-0.6, 1.0, vHeight));
        float sparkle = pow(max(0.0, vHeight), 3.0) * 0.6;
        col += uMoon * sparkle;
        gl_FragColor = vec4(col, 1.0);
      }
    `}),t=new W(i,e);return t.rotation.x=-Math.PI/2,t.position.set(220,-.5,-100),t}function Xg(){const i=new qe;[{z:-650,h:130,color:660516},{z:-560,h:100,color:924720},{z:-470,h:75,color:1320510}].forEach(e=>{const t=new na,r=1800;t.moveTo(-r/2,-5);let n=-r/2;for(;n<=r/2;)t.lineTo(n,e.h*.4+Math.random()*e.h),n+=r/14;t.lineTo(r/2,-5),t.closePath();const a=new W(new hn(t,{depth:40,bevelEnabled:!1}),new we({color:e.color,roughness:1,emissive:e.color,emissiveIntensity:.15}));a.position.set(-260,0,e.z),i.add(a)});for(let e=0;e<30;e++){const t=new W(new mt(2,2),new ut({color:16767392,transparent:!0,opacity:.7}));t.position.set(-260+(Math.random()-.5)*700,10+Math.random()*40,-470+Math.random()*10),i.add(t)}return i}function qg(){const i=document.createElement("canvas");i.width=i.height=256;const e=i.getContext("2d");e.fillStyle="#1c1f24",e.fillRect(0,0,256,256);for(let r=0;r<700;r++)e.fillStyle=`rgba(${30+Math.random()*20},${34+Math.random()*22},${38+Math.random()*24},${Math.random()*.4})`,e.fillRect(Math.random()*256,Math.random()*256,1.6,1.6);e.fillStyle="rgba(255,255,255,0.85)";for(let r=0;r<256;r+=32)e.fillRect(256/2-3,r,6,16);const t=new Rt(i);return t.wrapS=Vt,t.wrapT=Vt,t.repeat.set(1,60),t.anisotropy=4,t}function jg(i){const e=new qe,t=new we({color:1711138,metalness:.7,roughness:.35}),r=new W(new Ft(.09,.09,5.5,8),t);r.position.y=2.75,e.add(r);const n=new W(new Ct(.2,12,12),new we({color:i,emissive:i,emissiveIntensity:3}));n.position.set(0,5.4,0),e.add(n);const a=new Ut(i,1.4,13,2);return a.position.copy(n.position),e.add(a),e}function $g(){const i=[new w(0,0,0),new w(60,0,-40),new w(90,0,-140),new w(60,0,-230),new w(-20,0,-260),new w(-110,0,-220),new w(-140,0,-120),new w(-100,0,-30),new w(-40,0,40),new w(30,0,60)],e=new Er(i,!0,"catmullrom",.5),t=14,r=400,n=new qe,a=[],s=[],o=[],l=[],c=[];for(let u=0;u<=r;u++){const d=u/r,g=e.getPointAt(d),v=e.getTangentAt(d).normalize(),p=new w(-v.z,0,v.x).normalize(),m=g.clone().addScaledVector(p,t/2),y=g.clone().addScaledVector(p,-t/2);if(a.push(m.x,.01,m.z,y.x,.01,y.z),s.push(0,d*60,1,d*60),l.push({pos:m,normal:p}),c.push({pos:y,normal:p}),u<r){const _=u*2,S=u*2+1,P=u*2+2,T=u*2+3;o.push(_,S,P,S,T,P)}}const h=new pt;h.setAttribute("position",new Ke(a,3)),h.setAttribute("uv",new Ke(s,2)),h.setIndex(o),h.computeVertexNormals();const f=new W(h,new we({map:qg(),roughness:.55,metalness:.15}));f.receiveShadow=!0,n.add(f),[l,c].forEach((u,d)=>{for(let g=0;g<u.length-1;g+=4){const v=u[g],p=u[Math.min(g+4,u.length-1)],m=p.pos.clone().sub(v.pos).length()||.01,y=v.normal.clone().multiplyScalar(d===0?1:-1),_=new W(new Ge(.9,.12,m),new we({color:g/4%2===0?14029866:15921906,roughness:.6})),S=v.pos.clone().lerp(p.pos,.5).addScaledVector(y,.55);_.position.set(S.x,.06,S.z),_.lookAt(p.pos.x,.06,p.pos.z),n.add(_)}});for(let u=0;u<r;u+=18){const d=u/r,g=e.getPointAt(d),v=e.getTangentAt(d).normalize(),p=new w(-v.z,0,v.x).normalize(),m=u%36===0?1:-1,y=g.clone().addScaledVector(p,m*(t/2+4)),_=jg(m>0?13623551:3800989);_.position.copy(y),_.lookAt(g.x,0,g.z),n.add(_)}return{curve:e,roadGroup:n,trackWidth:t}}function Yg(){const i=new W(new mt(3e3,3e3),new we({color:658964,roughness:1}));return i.rotation.x=-Math.PI/2,i.position.y=-.05,i.receiveShadow=!0,i}function Kg(i=400){const e=new Float32Array(i*3),t=new Float32Array(i);for(let s=0;s<i;s++)e[s*3]=(Math.random()-.5)*300,e[s*3+1]=Math.random()*30,e[s*3+2]=(Math.random()-.5)*300,t[s]=.4+Math.random()*.6;const r=new pt;r.setAttribute("position",new Zt(e,3));const n=new ia({color:13623551,size:.3,transparent:!0,opacity:.5,depthWrite:!1,blending:Dr}),a=new ps(r,n);return a.frustumCulled=!1,{points:a,positions:e,speeds:t,count:i}}function Jg(i){i.environment=ri(["#cfe0ff","#39ff9d","#0e3a56","#8fa8ff","#ffd9a0"]),i.add(Gg()),i.add(Hg()),i.add(Xg()),i.add(Yg());const e=Wg();i.add(e);const{curve:t,roadGroup:r,trackWidth:n}=$g();i.add(r);const a=Kg();i.add(a.points);const s=new kr(13623551,.9);s.position.set(150,160,-200),s.castShadow=!0,s.shadow.mapSize.set(2048,2048),s.shadow.camera.left=-160,s.shadow.camera.right=160,s.shadow.camera.top=160,s.shadow.camera.bottom=-160,s.shadow.camera.far=600,s.shadow.bias=-.0015,i.add(s),i.add(new Br(2771578,330256,.6)),i.add(new Tr(1384496,.55)),i.fog=new vr(264208,.0015);function o(l){e.material.uniforms.uTime.value+=l;const c=a.points.geometry.attributes.position.array;for(let h=0;h<a.count;h++)c[h*3+1]+=a.speeds[h]*l,c[h*3]+=Math.sin(performance.now()*3e-4+h)*l*.3,c[h*3+1]>30&&(c[h*3+1]=0);a.points.geometry.attributes.position.needsUpdate=!0}return{curve:t,trackWidth:n,update:o}}function Zg(){const i={topColor:{value:new ve(131850)},midColor:{value:new ve(658984)},horizonColor:{value:new ve(1317434)},bottomColor:{value:new ve(65796)},offset:{value:20},exponent:{value:.7}},e=new Ct(900,32,16),t=new St({uniforms:i,side:ei,depthWrite:!1,vertexShader:"varying vec3 vWorldPosition; void main() { vec4 wp = modelMatrix * vec4(position,1.0); vWorldPosition = wp.xyz; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`
      uniform vec3 topColor; uniform vec3 midColor; uniform vec3 horizonColor; uniform vec3 bottomColor;
      uniform float offset; uniform float exponent;
      varying vec3 vWorldPosition;
      void main() {
        float h = normalize(vWorldPosition + vec3(0.0, offset, 0.0)).y;
        vec3 col;
        if (h > 0.1) { col = mix(horizonColor, midColor, clamp(pow(h, exponent) * 1.7, 0.0, 1.0)); col = mix(col, topColor, clamp(pow(h, exponent * 2.2), 0.0, 1.0)); }
        else { col = mix(bottomColor, horizonColor, clamp((h + 0.3) / 0.45, 0.0, 1.0)); }
        gl_FragColor = vec4(col, 1.0);
      }`});return new W(e,t)}function Qg(i,e){const t=e?300:192,r=document.createElement("canvas");r.width=160,r.height=t;const n=r.getContext("2d");n.fillStyle="#050609",n.fillRect(0,0,160,t);const a=8+Math.floor(Math.random()*8),s=4+Math.floor(Math.random()*3),o=160/s,l=t/a;for(let c=0;c<a;c++)for(let h=0;h<s;h++)Math.random()>.35&&(n.fillStyle=Math.random()>.5?i:"rgba(255,255,255,0.75)",n.globalAlpha=.35+Math.random()*.55,n.fillRect(h*o+1,c*l+1,o-2,l-2));return n.globalAlpha=1,new Rt(r)}const Qn=["#00e5ff","#ff2e88","#ffb347","#9b30ff"];function e0(i){const e=new qe;for(let t=0;t<90;t++){const r=10+Math.random()*16,n=100+Math.random()*340,a=10+Math.random()*16;let s=(Math.random()-.5)*600;Math.abs(s)<40&&(s+=Math.sign(s||1)*40);const o=(Math.random()-.5)*900,l=new W(new Ge(r,n,a),new we({color:395021,roughness:.4,metalness:.6,emissive:263697,emissiveIntensity:.35}));l.position.set(s,n/2,o),e.add(l);const c=Qn[Math.floor(Math.random()*Qn.length)],h=Math.random()>.85,f=new W(new mt(r*.9,n*(h?.5:.92)),new ut({map:Qg(c,h),transparent:!0,opacity:h?.97:.85}));f.position.set(s,h?n*.55:n/2,o+(s>0?-a/2-.05:a/2+.05)),f.rotation.y=s>0?Math.PI:0,e.add(f),h&&i.push({mesh:f,mat:f.material,phase:Math.random()*10})}return e}function t0(i=6){const e=[];for(let t=0;t<i;t++){const r=new qe,n=new W(new Pi(.5,2.2,6),new we({color:1711140,metalness:.8,roughness:.3}));n.rotation.x=Math.PI/2,r.add(n);const a=Qn[t%Qn.length],s=new Ut(a,1.6,20,2);s.position.z=-1.2,r.add(s);const o=new W(new Ct(.15,8,8),new ut({color:a}));o.position.z=-1.2,r.add(o),e.push({group:r,radius:40+Math.random()*120,height:30+Math.random()*200,speed:.06+Math.random()*.08,phase:Math.random()*Math.PI*2,cx:(Math.random()-.5)*200,cz:(Math.random()-.5)*300})}return e}function r0(){const i=new qe;for(let t=0;t<4;t++){const r=new W(new Ge(3,3,8),new we({color:1711656,metalness:.6,roughness:.35,emissive:658968,emissiveIntensity:.3}));r.position.z=-t*8.4,i.add(r);const n=new W(new mt(2.6,.5),new ut({color:58879}));n.position.set(0,.3,-t*8.4+4.01),i.add(n)}const e=new Ut(16777215,3,30,2);return e.position.z=4.5,i.add(e),i}function i0(i,e){const t=new qe,r=new ut({color:657934});for(let n=0;n<60;n++){const a=Math.random(),s=i.getPointAt(a),o=i.getTangentAt(a).normalize(),l=new w(-o.z,0,o.x).normalize(),c=Math.random()>.5?1:-1,h=s.clone().addScaledVector(l,c*(e/2+2.5+Math.random()*3)),f=1.6+Math.random()*.3,u=new W(new vs(.22,f*.6,2,6),r);u.position.set(h.x,f/2,h.z),t.add(u)}return t}function n0(){const i=document.createElement("canvas");i.width=i.height=256;const e=i.getContext("2d");e.fillStyle="#1a1b20",e.fillRect(0,0,256,256);for(let r=0;r<700;r++)e.fillStyle=`rgba(${28+Math.random()*22},${28+Math.random()*22},${34+Math.random()*24},${Math.random()*.4})`,e.fillRect(Math.random()*256,Math.random()*256,1.6,1.6);e.fillStyle="rgba(255,255,255,0.85)";for(let r=0;r<256;r+=32)e.fillRect(256/2-3,r,6,16);const t=new Rt(i);return t.wrapS=Vt,t.wrapT=Vt,t.repeat.set(1,60),t.anisotropy=4,t}function a0(i){const e=new qe,t=new we({color:1315868,metalness:.8,roughness:.3}),r=new W(new Ft(.09,.09,6,8),t);r.position.y=3,e.add(r);const n=new W(new Ct(.2,12,12),new we({color:i,emissive:i,emissiveIntensity:3.2}));n.position.set(0,5.9,0),e.add(n);const a=new Ut(i,1.5,14,2);return a.position.copy(n.position),e.add(a),e}function s0(){const i=[new w(0,0,0),new w(60,0,-40),new w(90,0,-140),new w(60,0,-230),new w(-20,0,-260),new w(-110,0,-220),new w(-140,0,-120),new w(-100,0,-30),new w(-40,0,40),new w(30,0,60)],e=new Er(i,!0,"catmullrom",.5),t=14,r=400,n=new qe,a=[],s=[],o=[],l=[],c=[];for(let u=0;u<=r;u++){const d=u/r,g=e.getPointAt(d),v=e.getTangentAt(d).normalize(),p=new w(-v.z,0,v.x).normalize(),m=g.clone().addScaledVector(p,t/2),y=g.clone().addScaledVector(p,-t/2);if(a.push(m.x,.01,m.z,y.x,.01,y.z),s.push(0,d*60,1,d*60),l.push({pos:m,normal:p}),c.push({pos:y,normal:p}),u<r){const _=u*2,S=u*2+1,P=u*2+2,T=u*2+3;o.push(_,S,P,S,T,P)}}const h=new pt;h.setAttribute("position",new Ke(a,3)),h.setAttribute("uv",new Ke(s,2)),h.setIndex(o),h.computeVertexNormals();const f=new W(h,new we({map:n0(),roughness:.4,metalness:.3,envMapIntensity:1.2}));f.receiveShadow=!0,n.add(f),[l,c].forEach((u,d)=>{for(let g=0;g<u.length-1;g+=4){const v=u[g],p=u[Math.min(g+4,u.length-1)],m=p.pos.clone().sub(v.pos).length()||.01,y=v.normal.clone().multiplyScalar(d===0?1:-1),_=new W(new Ge(.9,.12,m),new we({color:g/4%2===0?14029866:15921906,roughness:.6})),S=v.pos.clone().lerp(p.pos,.5).addScaledVector(y,.55);_.position.set(S.x,.06,S.z),_.lookAt(p.pos.x,.06,p.pos.z),n.add(_)}});for(let u=0;u<r;u+=18){const d=u/r,g=e.getPointAt(d),v=e.getTangentAt(d).normalize(),p=new w(-v.z,0,v.x).normalize(),m=u%36===0?1:-1,y=g.clone().addScaledVector(p,m*(t/2+4)),_=a0(m>0?58879:16723592);_.position.copy(y),_.lookAt(g.x,0,g.z),n.add(_)}return{curve:e,roadGroup:n,trackWidth:t}}function o0(){const i=new W(new mt(3e3,3e3),new we({color:263434,roughness:.85}));return i.rotation.x=-Math.PI/2,i.position.y=-.03,i.receiveShadow=!0,i}function l0(i){i.environment=ri(["#00e5ff","#ff2e88","#ffb347","#9b30ff"]),i.add(Zg()),i.add(o0());const e=[];i.add(e0(e));const{curve:t,roadGroup:r,trackWidth:n}=s0();i.add(r),i.add(i0(t,n));const a=t0();a.forEach(u=>i.add(u.group));const s=r0();i.add(s);let o=!1,l=0,c=4+Math.random()*4;const h=new kr(9414911,.7);h.position.set(-120,200,-160),h.castShadow=!0,h.shadow.mapSize.set(2048,2048),h.shadow.camera.left=-160,h.shadow.camera.right=160,h.shadow.camera.top=160,h.shadow.camera.bottom=-160,h.shadow.camera.far=600,h.shadow.bias=-.0015,i.add(h),i.add(new Br(58879,328975,.5)),i.add(new Tr(987696,.55)),i.fog=new vr(197642,.0021);function f(u){const d=performance.now()*.001;a.forEach(g=>{const v=d*g.speed+g.phase;g.group.position.set(g.cx+Math.cos(v)*g.radius,g.height+Math.sin(v*1.7)*6,g.cz+Math.sin(v)*g.radius),g.group.rotation.y=-v-Math.PI/2}),e.forEach(g=>{const v=.8+.2*Math.sin(d*3+g.phase);g.mat.opacity=.9*v}),o?(s.visible=!0,l+=u*40,s.position.set(-160+l,90,-60),s.rotation.y=Math.PI/2,l>320&&(o=!1,c=6+Math.random()*6)):(c-=u,s.visible=!1,c<=0&&(o=!0,l=0))}return{curve:t,trackWidth:n,update:f}}class c0{constructor(e){this.canvas=e,this.ctx=e.getContext("2d"),this.worldId="neon",this.running=!1,this.animId=null,this.width=0,this.height=0,this.time=0,this.lastTime=performance.now(),this.rainDrops=[],this.trafficCars=[],this.clouds=[],this.particles=[],this.flyingVehicles=[],this.lightningTimer=4,this.lightningAlpha=0,this.lightningBolts=[],this.sparks=[],this.steamPlumes=[],this.searchlights=[],this._initParticles(),this._onResize=this._onResize.bind(this),window.addEventListener("resize",this._onResize),this._onResize()}_onResize(){if(!this.canvas)return;const e=this.canvas.parentElement?this.canvas.parentElement.getBoundingClientRect():{width:window.innerWidth,height:window.innerHeight};this.width=this.canvas.width=Math.max(e.width,320),this.height=this.canvas.height=Math.max(e.height,320),this._initParticles()}setWorld(e){this.worldId=e||"neon",this.time=0,this.lightningAlpha=0,this._initParticles()}_initParticles(){const e=this.width||1200,t=this.height||800;this.rainDrops=[];for(let r=0;r<180;r++)this.rainDrops.push({x:Math.random()*e,y:Math.random()*t,len:15+Math.random()*25,speed:18+Math.random()*14,alpha:.2+Math.random()*.5,thick:1+Math.random()*1.2});this.trafficCars=[];for(let r=0;r<7;r++)this.trafficCars.push({x:Math.random()*e,y:t*.72+(Math.random()*60-30),speed:(Math.random()>.5?1:-1)*(1.5+Math.random()*3.5),color:Math.random()>.4?"#ff2a6d":"#00e5ff",len:20+Math.random()*25});this.clouds=[];for(let r=0;r<6;r++)this.clouds.push({x:Math.random()*e,y:40+Math.random()*(t*.35),radius:80+Math.random()*140,speed:.15+Math.random()*.25,alpha:.15+Math.random()*.25});this.flyingVehicles=[];for(let r=0;r<8;r++)this.flyingVehicles.push({x:Math.random()*e,y:60+Math.random()*(t*.5),speed:(Math.random()>.5?1:-1)*(2+Math.random()*4),color:Math.random()>.5?"#00e5ff":"#ffb02e",trailLen:40+Math.random()*60});this.particles=[];for(let r=0;r<70;r++)this.particles.push({x:Math.random()*e,y:Math.random()*t,vx:(Math.random()-.5)*1.5,vy:(Math.random()-.5)*1.2,size:1+Math.random()*2.5,alpha:.2+Math.random()*.6});this.searchlights=[{x:e*.2,angle:-.3,speed:.008,color:"rgba(0, 229, 255, 0.15)"},{x:e*.5,angle:.2,speed:-.006,color:"rgba(255, 46, 136, 0.12)"},{x:e*.8,angle:-.1,speed:.007,color:"rgba(184, 75, 255, 0.15)"}]}start(){if(this.running)return;this.running=!0,this.lastTime=performance.now();const e=t=>{if(!this.running)return;const r=Math.min((t-this.lastTime)/1e3,.1);this.lastTime=t,this.time+=r,this.update(r),this.render(),this.animId=requestAnimationFrame(e)};this.animId=requestAnimationFrame(e)}stop(){this.running=!1,this.animId&&(cancelAnimationFrame(this.animId),this.animId=null)}destroy(){this.stop(),window.removeEventListener("resize",this._onResize)}update(e){const t=this.width,r=this.height;if(this.worldId==="neon"||this.worldId==="storm"){const n=this.worldId==="storm"?.35:.12;for(const a of this.rainDrops)a.y+=a.speed*(this.worldId==="storm"?1.4:1),a.x+=a.speed*n,a.y>r&&(a.y=-a.len,a.x=Math.random()*t),a.x>t&&(a.x=0)}(this.worldId==="neon"||this.worldId==="storm")&&(this.lightningTimer-=e,this.lightningTimer<=0&&(this.lightningAlpha=.85,this.lightningTimer=this.worldId==="storm"?1.5+Math.random()*3.5:4+Math.random()*6,this._generateLightningBolts()),this.lightningAlpha>0&&(this.lightningAlpha-=e*3.5,this.lightningAlpha<0&&(this.lightningAlpha=0)));for(const n of this.trafficCars)n.x+=n.speed,n.speed>0&&n.x>t+60&&(n.x=-60),n.speed<0&&n.x<-60&&(n.x=t+60);for(const n of this.flyingVehicles)n.x+=n.speed,n.speed>0&&n.x>t+100&&(n.x=-100),n.speed<0&&n.x<-100&&(n.x=t+100);for(const n of this.clouds)n.x+=n.speed,n.x-n.radius>t&&(n.x=-n.radius);for(const n of this.particles)n.x+=n.vx,n.y+=n.vy,n.x<0&&(n.x=t),n.x>t&&(n.x=0),n.y<0&&(n.y=r),n.y>r&&(n.y=0);for(const n of this.searchlights)n.angle+=n.speed,Math.abs(n.angle)>.45&&(n.speed*=-1)}_generateLightningBolts(){const e=this.width,t=this.height;this.lightningBolts=[];const r=1+Math.floor(Math.random()*2);for(let n=0;n<r;n++){let a=e*(.2+Math.random()*.6),s=0;const o=[{x:a,y:s}];for(;s<t*.65;)s+=20+Math.random()*30,a+=(Math.random()-.5)*60,o.push({x:a,y:s});this.lightningBolts.push(o)}}render(){const e=this.ctx,t=this.width,r=this.height;if(!(!e||t===0||r===0))switch(e.clearRect(0,0,t,r),this.worldId){case"sunset":this._renderSunset(e,t,r);break;case"desert":this._renderDesert(e,t,r);break;case"vertical":this._renderVertical(e,t,r);break;case"coastal":this._renderCoastal(e,t,r);break;case"underground":this._renderUnderground(e,t,r);break;case"rooftop":this._renderRooftop(e,t,r);break;case"storm":this._renderStorm(e,t,r);break;case"neon":default:this._renderNeonCity(e,t,r);break}}_renderNeonCity(e,t,r){const n=e.createLinearGradient(0,0,0,r);if(n.addColorStop(0,"#020308"),n.addColorStop(.55,"#070b1e"),n.addColorStop(.85,"#120a28"),n.addColorStop(1,"#050711"),e.fillStyle=n,e.fillRect(0,0,t,r),this.lightningAlpha>0){e.fillStyle=`rgba(180, 220, 255, ${this.lightningAlpha*.4})`,e.fillRect(0,0,t,r),e.strokeStyle=`rgba(255, 255, 255, ${this.lightningAlpha})`,e.lineWidth=2.5;for(const a of this.lightningBolts){e.beginPath();for(let s=0;s<a.length;s++)s===0?e.moveTo(a[s].x,a[s].y):e.lineTo(a[s].x,a[s].y);e.stroke()}}this._drawSkyscrapers(e,t,r,.45,"#060a18","#00e5ff",.25),this._drawSkyscrapers(e,t,r,.6,"#090f26","#ff2e88",.45),this._drawNeonBillboards(e,t,r),this._drawWetRoad(e,t,r,"#060a1a"),this._drawTraffic(e,t,r),this._drawRain(e,t,r,"rgba(140, 210, 255, 0.45)")}_renderSunset(e,t,r){const n=e.createLinearGradient(0,0,0,r*.75);n.addColorStop(0,"#1a0826"),n.addColorStop(.3,"#5c1042"),n.addColorStop(.6,"#b53326"),n.addColorStop(.85,"#e06616"),n.addColorStop(1,"#ffab2e"),e.fillStyle=n,e.fillRect(0,0,t,r);const a=t*.68,s=r*.42,o=e.createRadialGradient(a,s,10,a,s,200);o.addColorStop(0,"rgba(255, 245, 200, 0.9)"),o.addColorStop(.3,"rgba(255, 140, 40, 0.6)"),o.addColorStop(.7,"rgba(220, 50, 80, 0.25)"),o.addColorStop(1,"transparent"),e.fillStyle=o,e.beginPath(),e.arc(a,s,200,0,Math.PI*2),e.fill();for(const l of this.clouds){const c=e.createRadialGradient(l.x,l.y,10,l.x,l.y,l.radius);c.addColorStop(0,`rgba(255, 120, 80, ${l.alpha})`),c.addColorStop(.6,`rgba(140, 30, 80, ${l.alpha*.5})`),c.addColorStop(1,"transparent"),e.fillStyle=c,e.beginPath(),e.arc(l.x,l.y,l.radius,0,Math.PI*2),e.fill()}this._drawMountains(e,t,r,.52,"#2b0c2a"),this._drawMountains(e,t,r,.62,"#14061a"),this._drawHighway(e,t,r,"#180a1c","#ffb02e"),this._drawTraffic(e,t,r),this._drawParticles(e,"rgba(255, 180, 80, 0.6)")}_renderVertical(e,t,r){const n=e.createLinearGradient(0,0,0,r);n.addColorStop(0,"#020309"),n.addColorStop(.6,"#060c22"),n.addColorStop(1,"#02040c"),e.fillStyle=n,e.fillRect(0,0,t,r),this._drawSkyscrapers(e,t,r,.35,"#050918","#00e5ff",.4),this._drawSkyscrapers(e,t,r,.55,"#08102b","#b84bff",.6),e.strokeStyle="rgba(0, 229, 255, 0.35)",e.lineWidth=4,e.beginPath(),e.moveTo(t*.1,r*.3),e.lineTo(t*.45,r*.35),e.moveTo(t*.55,r*.22),e.lineTo(t*.9,r*.26),e.stroke();for(const a of this.flyingVehicles){const s=e.createLinearGradient(a.x,a.y,a.x-a.trailLen*(a.speed>0?1:-1),a.y);s.addColorStop(0,a.color),s.addColorStop(1,"transparent"),e.fillStyle=s,e.fillRect(a.x-(a.speed>0?a.trailLen:0),a.y-1.5,a.trailLen,3),e.fillStyle="#fff",e.beginPath(),e.arc(a.x,a.y,2.5,0,Math.PI*2),e.fill()}this._drawWetRoad(e,t,r,"#070d24"),this._drawTraffic(e,t,r)}_renderDesert(e,t,r){const n=e.createLinearGradient(0,0,0,r*.7);n.addColorStop(0,"#04030a"),n.addColorStop(.5,"#120822"),n.addColorStop(.9,"#301438"),n.addColorStop(1,"#4a1e3e"),e.fillStyle=n,e.fillRect(0,0,t,r),e.fillStyle="#fff";for(let a=0;a<40;a++){const s=a*137.5%t,o=a*89.3%(r*.45);e.fillRect(s,o,1.2,1.2)}this._drawPyramid(e,t*.75,r*.55,140,110,"#b84bff","#00e5ff"),this._drawSkyscrapers(e,t,r,.58,"#1e0a2b","#ffb02e",.5),this._drawDunes(e,t,r),this._drawHighway(e,t,r,"#1a0d1e","#ffb02e"),this._drawTraffic(e,t,r),this._drawParticles(e,"rgba(255, 190, 100, 0.55)")}_renderCoastal(e,t,r){const n=e.createLinearGradient(0,0,0,r*.65);n.addColorStop(0,"#01040d"),n.addColorStop(.5,"#051329"),n.addColorStop(1,"#0a2342"),e.fillStyle=n,e.fillRect(0,0,t,r);const a=t*.35,s=r*.22,o=e.createRadialGradient(a,s,8,a,s,90);o.addColorStop(0,"#ffffff"),o.addColorStop(.3,"rgba(200, 235, 255, 0.7)"),o.addColorStop(1,"transparent"),e.fillStyle=o,e.beginPath(),e.arc(a,s,90,0,Math.PI*2),e.fill();const l=r*.52,c=e.createLinearGradient(0,l,0,r);c.addColorStop(0,"#04162e"),c.addColorStop(1,"#010814"),e.fillStyle=c,e.fillRect(0,l,t*.55,r-l);const h=e.createLinearGradient(a-40,l,a+40,r);h.addColorStop(0,"rgba(180, 230, 255, 0.5)"),h.addColorStop(1,"transparent"),e.fillStyle=h,e.fillRect(a-45,l,90,r-l),this._drawSuspensionBridge(e,t*.15,l-15,t*.45,50),this._drawMountains(e,t,r,.58,"#08101f"),this._drawHighway(e,t,r,"#060e1c","#00e5ff"),this._drawTraffic(e,t,r),this._drawParticles(e,"rgba(180, 240, 255, 0.4)")}_renderUnderground(e,t,r){const n=e.createLinearGradient(0,0,0,r);n.addColorStop(0,"#0d0d12"),n.addColorStop(.5,"#16121a"),n.addColorStop(1,"#07070a"),e.fillStyle=n,e.fillRect(0,0,t,r),e.strokeStyle="rgba(255, 176, 46, 0.3)",e.lineWidth=3;for(let s=0;s<7;s++){const o=s*45;e.beginPath(),e.arc(t*.5,o+r*.4,t*.55,Math.PI,Math.PI*2,!1),e.stroke()}e.fillStyle="#222530",e.fillRect(0,r*.28,t,18),e.fillRect(0,r*.34,t,12);const a=Math.sin(this.time*6)>0;e.fillStyle=a?"#ff9900":"#442200",e.beginPath(),e.arc(t*.2,r*.37,6,0,Math.PI*2),e.arc(t*.8,r*.37,6,0,Math.PI*2),e.fill(),this._drawWetRoad(e,t,r,"#14141c"),this._drawTraffic(e,t,r),this._drawParticles(e,"rgba(255, 150, 50, 0.45)")}_renderRooftop(e,t,r){const n=e.createLinearGradient(0,0,0,r);n.addColorStop(0,"#030511"),n.addColorStop(.6,"#08112e"),n.addColorStop(1,"#02040b"),e.fillStyle=n,e.fillRect(0,0,t,r);for(const a of this.searchlights){e.save(),e.translate(a.x,r*.65),e.rotate(a.angle);const s=e.createLinearGradient(0,0,0,-r*.7);s.addColorStop(0,a.color),s.addColorStop(1,"transparent"),e.fillStyle=s,e.beginPath(),e.moveTo(-15,0),e.lineTo(15,0),e.lineTo(90,-r*.75),e.lineTo(-90,-r*.75),e.closePath(),e.fill(),e.restore()}this._drawSkyscrapers(e,t,r,.52,"#060a1c","#00e5ff",.35),e.fillStyle="#0a1024",e.fillRect(0,r*.68,t,r*.32),e.strokeStyle="#00e5ff",e.lineWidth=3,e.shadowColor="#00e5ff",e.shadowBlur=15,e.beginPath(),e.moveTo(0,r*.68),e.lineTo(t,r*.68),e.stroke(),e.shadowBlur=0,this._drawTraffic(e,t,r)}_renderStorm(e,t,r){const n=e.createLinearGradient(0,0,0,r);if(n.addColorStop(0,"#0a0518"),n.addColorStop(.5,"#190a36"),n.addColorStop(1,"#06030e"),e.fillStyle=n,e.fillRect(0,0,t,r),this.lightningAlpha>0){e.fillStyle=`rgba(210, 160, 255, ${this.lightningAlpha*.55})`,e.fillRect(0,0,t,r),e.strokeStyle=`rgba(255, 255, 255, ${this.lightningAlpha})`,e.lineWidth=3.5;for(const a of this.lightningBolts){e.beginPath();for(let s=0;s<a.length;s++)s===0?e.moveTo(a[s].x,a[s].y):e.lineTo(a[s].x,a[s].y);e.stroke()}}this._drawSkyscrapers(e,t,r,.55,"#0e0720","#b84bff",.4),this._drawWetRoad(e,t,r,"#0d061c"),this._drawTraffic(e,t,r),this._drawRain(e,t,r,"rgba(200, 160, 255, 0.6)")}_drawSkyscrapers(e,t,r,n,a,s,o){const l=r*n;e.fillStyle=a;const c=18,h=t/c;for(let f=0;f<c;f++){const u=120+f*47%(r*.4),d=f*h,g=l-u+40;e.fillRect(d,g,h+2,u),e.fillStyle=s;for(let v=g+12;v<l;v+=14)for(let p=d+6;p<d+h-6;p+=10)(p*17+v*31)%100<o*100&&(e.globalAlpha=.65,e.fillRect(p,v,4,6));e.globalAlpha=1,e.fillStyle=a}}_drawNeonBillboards(e,t,r){const n=[{x:t*.18,y:r*.38,text:"RYDASH",color:"#00e5ff"},{x:t*.52,y:r*.32,text:"NITRO",color:"#ff2e88"},{x:t*.82,y:r*.4,text:"CYBER",color:"#ffb02e"}];for(const a of n)e.save(),e.font='bold 16px "Orbitron", sans-serif',e.fillStyle=a.color,e.shadowColor=a.color,e.shadowBlur=18,e.fillText(a.text,a.x,a.y),e.restore()}_drawWetRoad(e,t,r,n){const a=r*.68,s=e.createLinearGradient(0,a,0,r);s.addColorStop(0,n),s.addColorStop(1,"#02040a"),e.fillStyle=s,e.fillRect(0,a,t,r-a),e.strokeStyle="rgba(0, 229, 255, 0.4)",e.lineWidth=1.5,e.beginPath(),e.moveTo(0,a),e.lineTo(t,a),e.stroke();const o=this.time*120%60;e.strokeStyle="rgba(255, 255, 255, 0.25)",e.lineWidth=2,e.setLineDash([20,20]),e.lineDashOffset=-o,e.beginPath(),e.moveTo(0,a+(r-a)*.45),e.lineTo(t,a+(r-a)*.45),e.stroke(),e.setLineDash([])}_drawHighway(e,t,r,n,a){const s=r*.65;e.fillStyle=n,e.fillRect(0,s,t,r-s),e.strokeStyle=a,e.lineWidth=2,e.beginPath(),e.moveTo(0,s),e.lineTo(t,s),e.stroke();const o=this.time*90%50;e.strokeStyle="rgba(255, 255, 255, 0.3)",e.setLineDash([25,25]),e.lineDashOffset=-o,e.beginPath(),e.moveTo(0,s+(r-s)*.5),e.lineTo(t,s+(r-s)*.5),e.stroke(),e.setLineDash([])}_drawTraffic(e,t,r){for(const n of this.trafficCars){if(e.fillStyle=n.color,e.shadowColor=n.color,e.shadowBlur=10,e.fillRect(n.x,n.y,n.len,4),n.speed>0){const a=e.createLinearGradient(n.x+n.len,n.y,n.x+n.len+40,n.y);a.addColorStop(0,"rgba(255, 255, 255, 0.6)"),a.addColorStop(1,"transparent"),e.fillStyle=a,e.fillRect(n.x+n.len,n.y-2,40,8)}e.shadowBlur=0}}_drawRain(e,t,r,n){e.strokeStyle=n;for(const a of this.rainDrops)e.lineWidth=a.thick,e.beginPath(),e.moveTo(a.x,a.y),e.lineTo(a.x+a.len*.2,a.y+a.len),e.stroke()}_drawParticles(e,t){e.fillStyle=t;for(const r of this.particles)e.globalAlpha=r.alpha,e.beginPath(),e.arc(r.x,r.y,r.size,0,Math.PI*2),e.fill();e.globalAlpha=1}_drawMountains(e,t,r,n,a){const s=r*n;e.fillStyle=a,e.beginPath(),e.moveTo(0,r),e.lineTo(0,s);for(let o=0;o<=t;o+=60){const l=s-30-Math.sin(o*.008)*45-Math.cos(o*.02)*25;e.lineTo(o,l)}e.lineTo(t,r),e.closePath(),e.fill()}_drawDunes(e,t,r){const n=r*.58;e.fillStyle="#220b24",e.beginPath(),e.moveTo(0,r),e.lineTo(0,n);for(let a=0;a<=t;a+=40){const s=n+Math.sin(a*.005)*35;e.lineTo(a,s)}e.lineTo(t,r),e.closePath(),e.fill(),e.strokeStyle="#ff2e88",e.lineWidth=2,e.shadowColor="#ff2e88",e.shadowBlur=12,e.beginPath();for(let a=0;a<=t;a+=40){const s=n+Math.sin(a*.005)*35;a===0?e.moveTo(a,s):e.lineTo(a,s)}e.stroke(),e.shadowBlur=0}_drawPyramid(e,t,r,n,a,s,o){e.fillStyle="#180720",e.beginPath(),e.moveTo(t,r-a),e.lineTo(t-n*.5,r),e.lineTo(t+n*.5,r),e.closePath(),e.fill(),e.strokeStyle=s,e.lineWidth=2,e.shadowColor=s,e.shadowBlur=15,e.stroke(),e.shadowBlur=0}_drawSuspensionBridge(e,t,r,n,a){e.strokeStyle="rgba(0, 229, 255, 0.5)",e.lineWidth=1.5,e.beginPath(),e.moveTo(t+n*.3,r),e.lineTo(t+n*.3,r-a),e.moveTo(t+n*.7,r),e.lineTo(t+n*.7,r-a),e.moveTo(t,r),e.quadraticCurveTo(t+n*.3,r-a,t+n*.5,r-a*.3),e.quadraticCurveTo(t+n*.7,r-a,t+n,r),e.stroke()}}class Vo{constructor(e,t,r={}){this.rig=e,this.stat=t||{topSpeed:.9,accel:.9,handling:.9,nitro:.9},this.isPlayer=r.isPlayer??!1,this.trackCurve=r.trackCurve||null,this.trackWidth=r.trackWidth||20,this.position=new w,this.velocity=new w,this.heading=0,this.speed=0,this.lateralSpeed=0,this.steerInput=0,this.throttleInput=0,this.handbrake=!1,this.nitroActive=!1,this.nitro=1,this.driftFactor=0,this.driftAngle=0,this.driftScore=0,this.wheelSpin=0,this.maxSpeed=48+this.stat.topSpeed*44,this.accelRate=18+this.stat.accel*26,this.brakeRate=52,this.turnRate=2+this.stat.handling*1.5,this.grip=.88+this.stat.handling*.12,this.gear=1,this.rpm=900,this.lastSpeed=0,this.suspensionPitch=0,this.lap=1,this.nextCP=1,this.trackT=0,this.finished=!1,this.finishTimeMs=0,this.airborne=!1,this.verticalVelocity=0,this.groundY=0,this.justLanded=!1,this.collisionImpulse=new w}launch(e,t=0){this.airborne||(this.airborne=!0,this.verticalVelocity=e,this.speed+=t)}setStartTransform(e,t){this.position.copy(e),this.heading=t,this.rig.group.position.copy(e),this.rig.group.rotation.y=t}applyPlayerInput(e,t){this.throttleInput=e.gas?1:e.brake?-1:0,this.steerInput=e.steer||0,this.handbrake=!!e.handbrake,this.nitroActive=!!e.nitro&&this.nitro>.03}applyCollisionImpulse(e,t=.85){this.collisionImpulse.add(e),this.speed*=t}step(e){if(this.nitroActive)this.nitro=Math.max(0,this.nitro-e*.45);else{const _=this.driftFactor>.25?e*.28:0;this.nitro=Math.min(1,this.nitro+e*.08+_)}const t=this.nitroActive?1.48:1,r=this.maxSpeed*t,n=Math.abs(this.speed),a=bt.clamp(n/r,0,1);if(this.speed<-.5)this.gear="R",this.rpm=1200+bt.clamp(-this.speed/15,0,1)*4500;else{const _=[0,.15,.32,.52,.72,.88,1];for(let S=1;S<=6;S++)if(a<=_[S]||S===6){this.gear=S;const P=_[S-1],T=_[S],R=bt.clamp((a-P)/(T-P||.1),0,1);this.rpm=2500+R*5800+(this.nitroActive?600:0);break}}const s=this.gear===1?1.35:this.gear===2?1.2:this.gear===3?1.05:.95;this.throttleInput>0?this.speed+=this.accelRate*s*t*e*this.throttleInput:this.throttleInput<0?this.speed>.8?this.speed-=this.brakeRate*e:this.speed-=this.accelRate*.6*e:(this.speed-=Math.sign(this.speed)*7.5*e,Math.abs(this.speed)<.2&&(this.speed=0)),this.handbrake&&(this.speed-=Math.sign(this.speed)*22*e),this.speed=bt.clamp(this.speed,-this.maxSpeed*.35,r);const o=bt.clamp(n/8,0,1),l=bt.clamp(1-n/this.maxSpeed*.28,.7,1),c=this.steerInput*this.turnRate*o*l*e*(this.speed<-.2?-1:1);n>.05&&(this.heading+=c*(this.handbrake?1.45:1));const h=(this.handbrake||this.nitroActive&&Math.abs(this.steerInput)>.5)&&n>12?bt.clamp(Math.abs(this.steerInput)*.75+.2,.2,.95):0;this.driftFactor+=(h-this.driftFactor)*Math.min(1,e*7);const f=new w(Math.cos(this.heading),0,-Math.sin(this.heading)),u=new w(Math.sin(this.heading),0,Math.cos(this.heading)),d=this.driftFactor>.1?-this.steerInput*this.driftFactor*(this.speed*.42):0;this.lateralSpeed+=(d-this.lateralSpeed)*Math.min(1,e*6),this.position.addScaledVector(u,this.speed*e),this.position.addScaledVector(f,this.lateralSpeed*e),this.collisionImpulse.lengthSq()>.001&&(this.position.addScaledVector(this.collisionImpulse,e),this.collisionImpulse.multiplyScalar(Math.max(0,1-e*9))),this.justLanded=!1,this.airborne?(this.verticalVelocity-=52*e,this.position.y+=this.verticalVelocity*e,this.position.y<=this.groundY&&(this.position.y=this.groundY,this.airborne=!1,this.verticalVelocity=0,this.justLanded=!0)):this.position.y=this.groundY,this.wheelSpin+=this.speed/.36*e,this.rig.group.position.copy(this.position);const g=-this.steerInput*.055*bt.clamp(n/30,0,1);this.rig.group.rotation.z+=(g-this.rig.group.rotation.z)*Math.min(1,e*6);const v=this.heading+(this.driftFactor>.05?-this.steerInput*this.driftFactor*.48:0);this.rig.group.rotation.y=v;const p=e>0?(this.speed-this.lastSpeed)/e:0;this.lastSpeed=this.speed;const m=bt.clamp(-p*.0055,-.06,.06);this.suspensionPitch+=(m-this.suspensionPitch)*Math.min(1,e*6);const y=this.airborne?bt.clamp(this.verticalVelocity*.022,-.32,.22):this.suspensionPitch;if(this.rig.group.rotation.x+=(y-this.rig.group.rotation.x)*Math.min(1,e*5),this.rig.taillights&&this.rig.taillights[0]){const _=this.throttleInput<-.05||this.handbrake?5.2:2.5,S=this.rig.taillights[0].material;S.emissiveIntensity+=(_-S.emissiveIntensity)*Math.min(1,e*12)}if(this.rig.wheels){const _=this.steerInput*.52;[this.rig.wheels.fl,this.rig.wheels.fr].forEach(S=>{S&&(S.rotation.y=_)}),Object.values(this.rig.wheels).forEach(S=>{S&&S.children[0]&&(S.children[0].rotation.x=this.wheelSpin)})}this.rig.underGlow&&(this.rig.underGlow.intensity=this.nitroActive?1.8:.65)}get speedKmh(){return Math.abs(this.speed)*3.25}}class h0{constructor(e,t,r={}){this.controller=e,this.curve=t,this.t=r.tOffset||0,this.targetSpeedKmh=r.targetSpeedKmh||260,this.aggro=r.aggro||.85,this.laneOffset=(Math.random()-.5)*4}step(e){const t=bt.clamp(this.targetSpeedKmh/280,.7,1.35),r=.019*this.aggro*t;this.t=(this.t+r*e)%1;const n=this.curve.getPointAt(this.t),a=this.curve.getTangentAt(this.t),s=new w(-a.z,0,a.x).normalize(),o=n.clone().addScaledVector(s,this.laneOffset).clone().sub(this.controller.position);let l=Math.atan2(o.x,o.z)-this.controller.heading;l=Math.atan2(Math.sin(l),Math.cos(l));const c=o.length();this.controller.applyPlayerInput({gas:c>1.5?1:.5,brake:c<.5,steer:bt.clamp(l*1.6,-1,1),handbrake:Math.abs(l)>.85&&this.controller.speedKmh>100,nitro:Math.random()>.988},e)}}const Jl={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Bi{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const u0=new us(-1,1,1,-1,0,1);class d0 extends pt{constructor(){super(),this.setAttribute("position",new Ke([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ke([0,2,0,0,2,0],2))}}const p0=new d0;class ys{constructor(e){this._mesh=new W(p0,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,u0)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Zl extends Bi{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof St?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=en.clone(e.uniforms),this.material=new St({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new ys(this.material)}render(e,t,r){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=r.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Ho extends Bi{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,r){const n=e.getContext(),a=e.state;a.buffers.color.setMask(!1),a.buffers.depth.setMask(!1),a.buffers.color.setLocked(!0),a.buffers.depth.setLocked(!0);let s,o;this.inverse?(s=0,o=1):(s=1,o=0),a.buffers.stencil.setTest(!0),a.buffers.stencil.setOp(n.REPLACE,n.REPLACE,n.REPLACE),a.buffers.stencil.setFunc(n.ALWAYS,s,4294967295),a.buffers.stencil.setClear(o),a.buffers.stencil.setLocked(!0),e.setRenderTarget(r),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),a.buffers.color.setLocked(!1),a.buffers.depth.setLocked(!1),a.buffers.color.setMask(!0),a.buffers.depth.setMask(!0),a.buffers.stencil.setLocked(!1),a.buffers.stencil.setFunc(n.EQUAL,1,4294967295),a.buffers.stencil.setOp(n.KEEP,n.KEEP,n.KEEP),a.buffers.stencil.setLocked(!0)}}class f0 extends Bi{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class m0{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const r=e.getSize(new se);this._width=r.width,this._height=r.height,t=new ur(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Wn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Zl(Jl),this.copyPass.material.blending=cc,this.clock=new Tm}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let r=!1;for(let n=0,a=this.passes.length;n<a;n++){const s=this.passes[n];if(s.enabled!==!1){if(s.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(n),s.render(this.renderer,this.writeBuffer,this.readBuffer,e,r),s.needsSwap){if(r){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Ho!==void 0&&(s instanceof Ho?r=!0:s instanceof f0&&(r=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new se);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const r=this._width*this._pixelRatio,n=this._height*this._pixelRatio;this.renderTarget1.setSize(r,n),this.renderTarget2.setSize(r,n);for(let a=0;a<this.passes.length;a++)this.passes[a].setSize(r,n)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class g0 extends Bi{constructor(e,t,r=null,n=null,a=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=r,this.clearColor=n,this.clearAlpha=a,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new ve}render(e,t,r){const n=e.autoClear;e.autoClear=!1;let a,s;this.overrideMaterial!==null&&(s=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(a=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:r),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(a),this.overrideMaterial!==null&&(this.scene.overrideMaterial=s),e.autoClear=n}}const v0={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new ve(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Ii extends Bi{constructor(e,t,r,n){super(),this.strength=t!==void 0?t:1,this.radius=r,this.threshold=n,this.resolution=e!==void 0?new se(e.x,e.y):new se(256,256),this.clearColor=new ve(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let a=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);this.renderTargetBright=new ur(a,s,{type:Wn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let f=0;f<this.nMips;f++){const u=new ur(a,s,{type:Wn});u.texture.name="UnrealBloomPass.h"+f,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);const d=new ur(a,s,{type:Wn});d.texture.name="UnrealBloomPass.v"+f,d.texture.generateMipmaps=!1,this.renderTargetsVertical.push(d),a=Math.round(a/2),s=Math.round(s/2)}const o=v0;this.highPassUniforms=en.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=n,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new St({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];a=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);for(let f=0;f<this.nMips;f++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[f])),this.separableBlurMaterials[f].uniforms.invSize.value=new se(1/a,1/s),a=Math.round(a/2),s=Math.round(s/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new w(1,1,1),new w(1,1,1),new w(1,1,1),new w(1,1,1),new w(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const h=Jl;this.copyUniforms=en.clone(h.uniforms),this.blendMaterial=new St({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:Dr,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new ve,this.oldClearAlpha=1,this.basic=new ut,this.fsQuad=new ys(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let r=Math.round(e/2),n=Math.round(t/2);this.renderTargetBright.setSize(r,n);for(let a=0;a<this.nMips;a++)this.renderTargetsHorizontal[a].setSize(r,n),this.renderTargetsVertical[a].setSize(r,n),this.separableBlurMaterials[a].uniforms.invSize.value=new se(1/r,1/n),r=Math.round(r/2),n=Math.round(n/2)}render(e,t,r,n,a){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const s=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),a&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=r.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=Ii.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Ii.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this.fsQuad.render(e),o=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(r),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=s}getSeperableBlurMaterial(e){const t=[];for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(e*e))/e);return new St({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new se(.5,.5)},direction:{value:new se(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new St({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}Ii.BlurDirectionX=new se(1,0);Ii.BlurDirectionY=new se(0,1);const _0={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class x0 extends Bi{constructor(){super();const e=_0;this.uniforms=en.clone(e.uniforms),this.material=new Mm({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new ys(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,r){this.uniforms.tDiffuse.value=r.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},nt.getTransfer(this._outputColorSpace)===dt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===hc?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===uc?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===dc?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===ss?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===pc?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===fc&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const y0={uniforms:{tDiffuse:{value:null},uIntensity:{value:0},uAberration:{value:0}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float uIntensity;
    uniform float uAberration;
    varying vec2 vUv;
    void main() {
      if (uIntensity <= 0.001 && uAberration <= 0.001) {
        gl_FragColor = texture2D(tDiffuse, vUv);
        return;
      }
      vec2 center = vec2(0.5, 0.5);
      vec2 toCenter = center - vUv;
      vec4 color = vec4(0.0);
      const int SAMPLES = 10;
      for (int i = 0; i < SAMPLES; i++) {
        float t = float(i) / float(SAMPLES - 1) * uIntensity * 0.075;
        vec2 sampleUv = vUv + toCenter * t;
        float rOffset = uAberration * 0.012 * (float(i) / float(SAMPLES));
        float bOffset = -uAberration * 0.012 * (float(i) / float(SAMPLES));
        float r = texture2D(tDiffuse, sampleUv + toCenter * rOffset).r;
        float g = texture2D(tDiffuse, sampleUv).g;
        float b = texture2D(tDiffuse, sampleUv + toCenter * bOffset).b;
        float a = texture2D(tDiffuse, sampleUv).a;
        color += vec4(r, g, b, a);
      }
      gl_FragColor = color / float(SAMPLES);
    }
  `};function S0(i,e,t,r,n){const a=new m0(i);a.addPass(new g0(e,t));const s=new Ii(new se(r,n),.95,.45,.7);a.addPass(s);const o=new Zl(y0);return a.addPass(o),a.addPass(new x0),{composer:a,bloom:s,motionBlur:o}}class M0{constructor(e,t=140){this.scene=e,this.max=t;const r=this._smokeTexture();this.material=new zi({map:r,color:13421772,transparent:!0,opacity:.55,depthWrite:!1}),this.pool=[];for(let n=0;n<t;n++){const a=new cn(this.material.clone());a.visible=!1,a.scale.set(.1,.1,.1),e.add(a),this.pool.push({sprite:a,life:0,vel:new w})}this._cursor=0}_smokeTexture(){const e=document.createElement("canvas");e.width=e.height=64;const t=e.getContext("2d"),r=t.createRadialGradient(64/2,64/2,0,64/2,64/2,64/2);return r.addColorStop(0,"rgba(255,255,255,0.75)"),r.addColorStop(.5,"rgba(220,230,245,0.4)"),r.addColorStop(1,"rgba(200,210,230,0)"),t.fillStyle=r,t.fillRect(0,0,64,64),new Rt(e)}emit(e,t=1){const r=Math.min(4,Math.ceil(t*3));for(let n=0;n<r;n++){const a=this.pool[this._cursor];this._cursor=(this._cursor+1)%this.pool.length,a.sprite.position.copy(e),a.sprite.position.x+=(Math.random()-.5)*.35,a.sprite.position.y+=.1+Math.random()*.15,a.sprite.position.z+=(Math.random()-.5)*.35,a.sprite.visible=!0,a.sprite.scale.setScalar(.45+Math.random()*.4),a.sprite.material.opacity=.55,a.life=.65+Math.random()*.45,a.vel.set((Math.random()-.5)*.8,.8+Math.random()*.5,(Math.random()-.5)*.8)}}update(e){for(const t of this.pool)if(t.sprite.visible){if(t.life-=e,t.life<=0){t.sprite.visible=!1;continue}t.sprite.position.addScaledVector(t.vel,e),t.sprite.scale.multiplyScalar(1+e*1.1),t.sprite.material.opacity=Math.max(0,t.life)*.65}}}class w0{constructor(e,t=160){this.scene=e,this.max=t;const r=this._sprayTexture();this.material=new zi({map:r,color:13297919,transparent:!0,opacity:.6,depthWrite:!1,blending:Dr}),this.pool=[];for(let n=0;n<t;n++){const a=new cn(this.material.clone());a.visible=!1,a.scale.set(.1,.1,.1),e.add(a),this.pool.push({sprite:a,life:0,vel:new w})}this._cursor=0}_sprayTexture(){const e=document.createElement("canvas");e.width=e.height=32;const t=e.getContext("2d"),r=t.createRadialGradient(32/2,32/2,0,32/2,32/2,32/2);return r.addColorStop(0,"rgba(255,255,255,0.85)"),r.addColorStop(.4,"rgba(180,225,255,0.5)"),r.addColorStop(1,"rgba(140,200,255,0)"),t.fillStyle=r,t.fillRect(0,0,32,32),new Rt(e)}emit(e,t,r){if(r<30)return;const n=Math.min(3,Math.ceil(r/60));for(let a=0;a<n;a++){const s=this.pool[this._cursor];this._cursor=(this._cursor+1)%this.pool.length,s.sprite.position.copy(e),s.sprite.position.x+=(Math.random()-.5)*.2,s.sprite.position.y+=.05+Math.random()*.1,s.sprite.position.z+=(Math.random()-.5)*.2,s.sprite.visible=!0,s.sprite.scale.setScalar(.25+Math.random()*.25),s.sprite.material.opacity=.65,s.life=.25+Math.random()*.2;const o=r/150;s.vel.set((Math.random()-.5)*1.5,.6+Math.random()*.8,-t.z*(2+o*3)+(Math.random()-.5)*1.2)}}update(e){for(const t of this.pool)if(t.sprite.visible){if(t.life-=e,t.life<=0){t.sprite.visible=!1;continue}t.vel.y-=e*6,t.sprite.position.addScaledVector(t.vel,e),t.sprite.scale.multiplyScalar(1+e*1.8),t.sprite.material.opacity=Math.max(0,t.life)*1.8}}}class b0{constructor(e,t=120){this.scene=e;const r=this._sparkTexture();this.pool=[];for(let n=0;n<t;n++){const a=new zi({map:r,color:16757575,transparent:!0,opacity:0,depthWrite:!1,blending:Dr}),s=new cn(a);s.visible=!1,s.scale.set(.15,.15,.15),e.add(s),this.pool.push({sprite:s,life:0,vel:new w})}this._cursor=0}_sparkTexture(){const e=document.createElement("canvas");e.width=e.height=32;const t=e.getContext("2d"),r=t.createRadialGradient(32/2,32/2,0,32/2,32/2,32/2);return r.addColorStop(0,"rgba(255,255,255,1)"),r.addColorStop(.4,"rgba(255,180,70,0.95)"),r.addColorStop(1,"rgba(255,120,20,0)"),t.fillStyle=r,t.fillRect(0,0,32,32),new Rt(e)}emit(e,t=14){const r=[16777215,16765286,16733184,58879];for(let n=0;n<t;n++){const a=this.pool[this._cursor];this._cursor=(this._cursor+1)%this.pool.length,a.sprite.position.copy(e),a.sprite.position.y+=.25,a.sprite.visible=!0,a.sprite.material.color.setHex(r[n%r.length]),a.sprite.scale.setScalar(.12+Math.random()*.14),a.sprite.material.opacity=1,a.life=.35+Math.random()*.35;const s=Math.random()*Math.PI*2,o=3.5+Math.random()*5.5;a.vel.set(Math.cos(s)*o,2.5+Math.random()*4,Math.sin(s)*o)}}update(e){for(const t of this.pool)if(t.sprite.visible){if(t.life-=e,t.life<=0){t.sprite.visible=!1;continue}t.vel.y-=e*16,t.sprite.position.addScaledVector(t.vel,e),t.sprite.material.opacity=Math.max(0,t.life)*2.2}}}class E0{constructor(e){this.scene=e;const t=new Pi(.14,.9,12);t.rotateX(-Math.PI/2),t.translate(0,0,-.45);const r=new Pi(.07,.65,12);r.rotateX(-Math.PI/2),r.translate(0,0,-.32),this.flameMat=new ut({color:16711807,transparent:!0,opacity:.9,blending:Dr,depthWrite:!1}),this.innerMat=new ut({color:58879,transparent:!0,opacity:1,blending:Dr,depthWrite:!1}),this.flames=[];for(let n=0;n<2;n++){const a=new W(t,this.flameMat),s=new W(r,this.innerMat),o=new qe;o.add(a),o.add(s),o.visible=!1,e.add(o),this.flames.push(o)}}update(e,t,r,n){if(!r){this.flames.forEach(o=>{o.visible=!1});return}const a=[-.42,.42],s=performance.now()*.05;for(let o=0;o<2;o++){const l=this.flames[o];l.visible=!0;const c=.85+.3*Math.sin(s+o*2);l.scale.set(c,c,1.2+.4*Math.cos(s*1.5));const h=e.clone(),f=new w(Math.cos(t),0,-Math.sin(t)),u=new w(Math.sin(t),0,Math.cos(t));h.addScaledVector(f,a[o]),h.addScaledVector(u,-2.4),h.y+=.32,l.position.copy(h),l.rotation.y=t}}}function T0(){const i=document.createElement("canvas");i.width=512,i.height=256;const e=i.getContext("2d"),t=e.createLinearGradient(0,0,0,256);t.addColorStop(0,"#1a2035"),t.addColorStop(.5,"#0a0e1a"),t.addColorStop(1,"#141018"),e.fillStyle=t,e.fillRect(0,0,512,256),[{x:512*.28,y:256*.32,r:90,color:"rgba(235,245,255,0.95)"},{x:512*.7,y:256*.42,r:70,color:"rgba(0,229,255,0.85)"},{x:512*.5,y:256*.68,r:60,color:"rgba(255,23,111,0.6)"},{x:512*.85,y:256*.25,r:50,color:"rgba(124,77,255,0.55)"}].forEach(n=>{const a=e.createRadialGradient(n.x,n.y,0,n.x,n.y,n.r);a.addColorStop(0,n.color),a.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=a,e.beginPath(),e.arc(n.x,n.y,n.r,0,Math.PI*2),e.fill()});const r=new Rt(i);return r.mapping=os,r.colorSpace=qt,r}class Ql{constructor(e,{interactive:t=!1}={}){this.container=e,this.interactive=t,this.scene=new Bl,this.scene.environment=T0(),this.camera=new Yt(t?30:34,1,.1,100),t?this.camera.position.set(5,2.4,6.2):this.camera.position.set(5.8,2.35,7.2),this.camera.lookAt(0,.7,0),this.renderer=new Fl({antialias:!0,alpha:!0,preserveDrawingBuffer:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.setClearColor(0,0),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=gl,this.renderer.outputColorSpace=qt,this.renderer.toneMapping=ss,this.renderer.toneMappingExposure=1.15,this.container.appendChild(this.renderer.domElement);const r=new kr(16777215,2.8);r.position.set(5,7,6),r.castShadow=!0,r.shadow.mapSize.set(1024,1024),this.scene.add(r);const n=new Ut(58879,t?3:4.5,22);n.position.set(-5,2.8,3),this.scene.add(n);const a=new Ut(16717679,t?2.4:3.8,22);a.position.set(4,2.5,-5),this.scene.add(a);const s=new Ut(8146431,t?1.4:2.2,18);s.position.set(0,6,-1),this.scene.add(s);const o=new Tr(2371658,t?1.1:1.25);this.scene.add(o);const l=new we({color:329485,roughness:.28,metalness:.55,transparent:!0,opacity:t?.9:.58}),c=new W(new Fi(t?6:5.8,64),l);c.rotation.x=-Math.PI/2,c.position.y=-.04,c.receiveShadow=!0,this.scene.add(c),this.floor=c;const h=new W(new an(2.7,2.82,96),new ut({color:58879,transparent:!0,opacity:t?.55:.32,side:jn}));h.rotation.x=-Math.PI/2,h.position.y=.015,this.scene.add(h),this.ring=h;const f=new W(new an(3.15,3.2,96),new ut({color:16717679,transparent:!0,opacity:t?.22:.14,side:jn}));f.rotation.x=-Math.PI/2,f.position.y=.012,this.scene.add(f),this.ring2=f,this.carRig=null,this.dragging=!1,this.rotY=t?.35:.15,this.autoRotate=!0,this.rotationSpeed=t?.004:.0022,this.carYOffset=t?0:-.05,t&&(this.renderer.domElement.style.cursor="grab",this.renderer.domElement.style.touchAction="none",this.renderer.domElement.addEventListener("pointerdown",u=>{this.dragging=!0,this._lastX=u.clientX,this.autoRotate=!1,this.renderer.domElement.style.cursor="grabbing"}),window.addEventListener("pointerup",()=>{this.dragging&&(this.dragging=!1,this.autoRotate=!0,this.renderer.domElement&&(this.renderer.domElement.style.cursor="grab"))}),window.addEventListener("pointermove",u=>{if(!this.dragging)return;const d=u.clientX-this._lastX;this._lastX=u.clientX,this.rotY+=d*.008})),this._resize=this._resize.bind(this),window.addEventListener("resize",this._resize),this._resize(),this._raf=null,this._animate=this._animate.bind(this)}setCarByIndex(e,t){const r=mr[e]||mr[0],n=Zr[t]||Zr[0];this.carRig&&this.scene.remove(this.carRig.group),this.carRig=es(r,n.color),this.carRig.group.rotation.y=this.rotY,this.carRig.group.position.y=this.carYOffset;const a=this.interactive?1:1.12;return this.carRig.group.scale.setScalar(a),this.scene.add(this.carRig.group),{modelDef:r,livery:n}}renderOnce(){this.carRig&&(this.carRig.group.rotation.y=this.rotY),this.renderer.render(this.scene,this.camera)}start(){this._raf||(this._raf=requestAnimationFrame(this._animate))}stop(){this._raf&&cancelAnimationFrame(this._raf),this._raf=null}_animate(){this._raf=requestAnimationFrame(this._animate);const e=performance.now()*.001;this.carRig&&(this.autoRotate&&(this.rotY+=this.rotationSpeed),this.carRig.group.rotation.y=this.rotY,this.carRig.underGlow&&(this.carRig.underGlow.intensity=.9+Math.sin(e*2.2)*.22)),this.ring&&(this.ring.rotation.z=e*.12),this.ring2&&(this.ring2.rotation.z=-e*.075),this.renderer.render(this.scene,this.camera)}_resize(){const e=this.container.clientWidth||300,t=this.container.clientHeight||300;this.renderer.setSize(e,t,!1),this.camera.aspect=e/t,this.camera.updateProjectionMatrix()}dispose(){this.stop(),window.removeEventListener("resize",this._resize),this.renderer.dispose(),this.renderer.domElement&&this.renderer.domElement.remove()}}class A0{constructor(){this.ctx=null,this.enabled=!0,this.masterGain=null,this.engineSubOsc=null,this.engineMainOsc=null,this.engineHighOsc=null,this.engineGain=null,this.engineFilter=null,this.engineDistortion=null,this.turboOsc=null,this.turboGain=null,this.driftSource=null,this.driftGain=null,this.driftFilter=null,this.nitroSource=null,this.nitroGain=null,this.nitroFilter=null,this.hornOsc1=null,this.hornOsc2=null,this.hornGain=null,this.hornActive=!1,this.initialized=!1,this.lastGear=1,this.lastThrottle=0}init(){if(!this.initialized)try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;this.ctx=new e,this.masterGain=this.ctx.createGain(),this.masterGain.gain.value=.45,this.masterGain.connect(this.ctx.destination),this._setupEngine(),this._setupTurbo(),this._setupDrift(),this._setupNitro(),this._setupHorn(),this.initialized=!0}catch(e){console.warn("[RYDASH Sound] Web Audio init failed:",e)}}_ensureContext(){this.initialized||this.init(),this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume()}_makeDistortionCurve(e=20){const t=e,r=44100,n=new Float32Array(r),a=Math.PI/180;for(let s=0;s<r;++s){const o=s*2/r-1;n[s]=(3+t)*o*20*a/(Math.PI+t*Math.abs(o))}return n}_setupEngine(){this.ctx&&(this.engineSubOsc=this.ctx.createOscillator(),this.engineSubOsc.type="triangle",this.engineSubOsc.frequency.setValueAtTime(45,this.ctx.currentTime),this.engineMainOsc=this.ctx.createOscillator(),this.engineMainOsc.type="sawtooth",this.engineMainOsc.frequency.setValueAtTime(90,this.ctx.currentTime),this.engineHighOsc=this.ctx.createOscillator(),this.engineHighOsc.type="sawtooth",this.engineHighOsc.frequency.setValueAtTime(180,this.ctx.currentTime),this.engineDistortion=this.ctx.createWaveShaper(),this.engineDistortion.curve=this._makeDistortionCurve(18),this.engineDistortion.oversample="2x",this.engineFilter=this.ctx.createBiquadFilter(),this.engineFilter.type="lowpass",this.engineFilter.frequency.setValueAtTime(380,this.ctx.currentTime),this.engineFilter.Q.setValueAtTime(2.2,this.ctx.currentTime),this.engineGain=this.ctx.createGain(),this.engineGain.gain.setValueAtTime(0,this.ctx.currentTime),this.engineSubOsc.connect(this.engineFilter),this.engineMainOsc.connect(this.engineDistortion),this.engineHighOsc.connect(this.engineDistortion),this.engineDistortion.connect(this.engineFilter),this.engineFilter.connect(this.engineGain),this.engineGain.connect(this.masterGain),this.engineSubOsc.start(),this.engineMainOsc.start(),this.engineHighOsc.start())}_setupTurbo(){this.ctx&&(this.turboOsc=this.ctx.createOscillator(),this.turboOsc.type="sine",this.turboOsc.frequency.setValueAtTime(1200,this.ctx.currentTime),this.turboGain=this.ctx.createGain(),this.turboGain.gain.setValueAtTime(0,this.ctx.currentTime),this.turboOsc.connect(this.turboGain),this.turboGain.connect(this.masterGain),this.turboOsc.start())}_createNoiseBuffer(){if(!this.ctx)return null;const e=this.ctx.sampleRate*2,t=this.ctx.createBuffer(1,e,this.ctx.sampleRate),r=t.getChannelData(0);for(let n=0;n<e;n++)r[n]=Math.random()*2-1;return t}_setupDrift(){if(!this.ctx)return;const e=this._createNoiseBuffer();this.driftSource=this.ctx.createBufferSource(),this.driftSource.buffer=e,this.driftSource.loop=!0,this.driftFilter=this.ctx.createBiquadFilter(),this.driftFilter.type="bandpass",this.driftFilter.frequency.setValueAtTime(1500,this.ctx.currentTime),this.driftFilter.Q.setValueAtTime(3.8,this.ctx.currentTime),this.driftGain=this.ctx.createGain(),this.driftGain.gain.setValueAtTime(0,this.ctx.currentTime),this.driftSource.connect(this.driftFilter),this.driftFilter.connect(this.driftGain),this.driftGain.connect(this.masterGain),this.driftSource.start()}_setupNitro(){if(!this.ctx)return;const e=this._createNoiseBuffer();this.nitroSource=this.ctx.createBufferSource(),this.nitroSource.buffer=e,this.nitroSource.loop=!0,this.nitroFilter=this.ctx.createBiquadFilter(),this.nitroFilter.type="lowpass",this.nitroFilter.frequency.setValueAtTime(950,this.ctx.currentTime),this.nitroGain=this.ctx.createGain(),this.nitroGain.gain.setValueAtTime(0,this.ctx.currentTime),this.nitroSource.connect(this.nitroFilter),this.nitroFilter.connect(this.nitroGain),this.nitroGain.connect(this.masterGain),this.nitroSource.start()}_setupHorn(){if(!this.ctx)return;this.hornOsc1=this.ctx.createOscillator(),this.hornOsc1.type="sawtooth",this.hornOsc1.frequency.setValueAtTime(349.23,this.ctx.currentTime),this.hornOsc2=this.ctx.createOscillator(),this.hornOsc2.type="sawtooth",this.hornOsc2.frequency.setValueAtTime(440,this.ctx.currentTime);const e=this.ctx.createBiquadFilter();e.type="lowpass",e.frequency.setValueAtTime(2400,this.ctx.currentTime),this.hornGain=this.ctx.createGain(),this.hornGain.gain.setValueAtTime(0,this.ctx.currentTime),this.hornOsc1.connect(e),this.hornOsc2.connect(e),e.connect(this.hornGain),this.hornGain.connect(this.masterGain),this.hornOsc1.start(),this.hornOsc2.start()}startHorn(){if(!this.initialized||!this.enabled||!this.ctx||(this._ensureContext(),this.hornActive))return;this.hornActive=!0;const e=this.ctx.currentTime;this.hornGain.gain.cancelScheduledValues(e),this.hornGain.gain.setValueAtTime(this.hornGain.gain.value,e),this.hornGain.gain.linearRampToValueAtTime(.35,e+.04)}stopHorn(){if(!this.initialized||!this.ctx||!this.hornActive)return;this.hornActive=!1;const e=this.ctx.currentTime;this.hornGain.gain.cancelScheduledValues(e),this.hornGain.gain.setValueAtTime(this.hornGain.gain.value,e),this.hornGain.gain.linearRampToValueAtTime(1e-4,e+.08)}setEnabled(e){this.enabled=e,this.masterGain&&this.ctx&&this.masterGain.gain.setTargetAtTime(e?.45:0,this.ctx.currentTime,.05)}startEngine(){this._ensureContext(),this.engineGain&&this.ctx&&this.engineGain.gain.setTargetAtTime(.12,this.ctx.currentTime,.1)}updateEngine(e,t=3e3,r=1,n=!1){var a,s,o,l,c,h,f;if(!this.initialized||!this.enabled||!this.ctx)return;const u=this.ctx.currentTime,d=Math.max(.1,Math.min(1,t/8500)),g=35+d*85,v=70+d*220,p=140+d*440,m=320+d*1600+(n?600:0),y=.08+d*.16+(Math.abs(r)>.05?.06:0)+(n?.08:0);(a=this.engineSubOsc)==null||a.frequency.setTargetAtTime(g,u,.05),(s=this.engineMainOsc)==null||s.frequency.setTargetAtTime(v,u,.05),(o=this.engineHighOsc)==null||o.frequency.setTargetAtTime(p,u,.05),(l=this.engineFilter)==null||l.frequency.setTargetAtTime(m,u,.06),(c=this.engineGain)==null||c.gain.setTargetAtTime(y,u,.05);const _=r>.3?d*.09:0,S=1e3+d*2600;(h=this.turboOsc)==null||h.frequency.setTargetAtTime(S,u,.1),(f=this.turboGain)==null||f.gain.setTargetAtTime(_,u,.08),this.lastThrottle>.6&&r<.1&&t>4500&&this.playBlowOffValve(),this.lastThrottle=r}playGearShift(){if(!this.initialized||!this.enabled||!this.ctx)return;this._ensureContext();const e=this.ctx.currentTime,t=this._createNoiseBuffer();if(!t)return;const r=this.ctx.createBufferSource();r.buffer=t;const n=this.ctx.createBiquadFilter();n.type="bandpass",n.frequency.setValueAtTime(450,e),n.Q.setValueAtTime(2.5,e);const a=this.ctx.createGain();a.gain.setValueAtTime(.28,e),a.gain.exponentialRampToValueAtTime(.001,e+.14),r.connect(n),n.connect(a),a.connect(this.masterGain),r.start(e),r.stop(e+.15)}playBlowOffValve(){if(!this.initialized||!this.enabled||!this.ctx)return;this._ensureContext();const e=this.ctx.currentTime,t=this._createNoiseBuffer();if(!t)return;const r=this.ctx.createBufferSource();r.buffer=t;const n=this.ctx.createBiquadFilter();n.type="highpass",n.frequency.setValueAtTime(2200,e),n.frequency.exponentialRampToValueAtTime(800,e+.28);const a=this.ctx.createGain();a.gain.setValueAtTime(.18,e),a.gain.exponentialRampToValueAtTime(.001,e+.28),r.connect(n),n.connect(a),a.connect(this.masterGain),r.start(e),r.stop(e+.29)}stopEngine(){var e,t;!this.initialized||!this.ctx||((e=this.engineGain)==null||e.gain.setTargetAtTime(0,this.ctx.currentTime,.1),(t=this.turboGain)==null||t.gain.setTargetAtTime(0,this.ctx.currentTime,.1),this.stopHorn())}updateDrift(e){var t;if(!this.initialized||!this.enabled||!this.ctx)return;const r=e>.18?Math.min(.28,(e-.18)*.5):0;(t=this.driftGain)==null||t.gain.setTargetAtTime(r,this.ctx.currentTime,.04)}updateNitro(e){var t;if(!this.initialized||!this.enabled||!this.ctx)return;const r=e?.24:0;(t=this.nitroGain)==null||t.gain.setTargetAtTime(r,this.ctx.currentTime,.06)}playImpact(e=1){if(!this.initialized||!this.enabled||!this.ctx)return;this._ensureContext();const t=this.ctx.currentTime,r=this.ctx.createOscillator(),n=this.ctx.createGain();r.type="sawtooth",r.frequency.setValueAtTime(160,t),r.frequency.exponentialRampToValueAtTime(25,t+.28);const a=this.ctx.createBiquadFilter();a.type="lowpass",a.frequency.setValueAtTime(600,t),n.gain.setValueAtTime(Math.min(.55,.25*e),t),n.gain.exponentialRampToValueAtTime(.001,t+.28),r.connect(a),a.connect(n),n.connect(this.masterGain),r.start(t),r.stop(t+.29)}playPickup(){if(!this.initialized||!this.enabled||!this.ctx)return;this._ensureContext();const e=this.ctx.currentTime;[523.25,659.25,783.99,1046.5].forEach((t,r)=>{const n=this.ctx.createOscillator(),a=this.ctx.createGain();n.type="sine",n.frequency.setValueAtTime(t,e+r*.05),a.gain.setValueAtTime(.2,e+r*.05),a.gain.exponentialRampToValueAtTime(.001,e+r*.05+.22),n.connect(a),a.connect(this.masterGain),n.start(e+r*.05),n.stop(e+r*.05+.23)})}playCountdown(e=!1){if(!this.initialized||!this.enabled||!this.ctx)return;this._ensureContext();const t=this.ctx.currentTime,r=this.ctx.createOscillator(),n=this.ctx.createGain();r.type="triangle",r.frequency.setValueAtTime(e?987.77:493.88,t),n.gain.setValueAtTime(.28,t),n.gain.exponentialRampToValueAtTime(.001,t+(e?.7:.26)),r.connect(n),n.connect(this.masterGain),r.start(t),r.stop(t+(e?.72:.27))}}const it=new A0,C0=null;console.warn("[RYDASH] Supabase not configured — running in local/offline mode. See .env.example.");class ec{constructor(e,t){this.roomCode=e,this.local=t,this.channel=null,this.remotePlayers=new Map,this.onPlayerJoin=null,this.onPlayerLeave=null,this.onTransform=null,this.onRaceStart=null,this.onFinish=null,this._lastSend=0}static generateCode(){const e="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";let t="";for(let r=0;r<5;r++)t+=e[Math.floor(Math.random()*e.length)];return t}async connect(){throw new Error("Supabase is not configured — multiplayer needs a free Supabase project. See .env.example.")}sendTransform(e){var t;const r=performance.now();r-this._lastSend<55||(this._lastSend=r,(t=this.channel)==null||t.send({type:"broadcast",event:"transform",payload:{id:this.local.id,...e}}))}sendRaceStart(e){var t;(t=this.channel)==null||t.send({type:"broadcast",event:"race_start",payload:e})}sendFinish(e){var t;(t=this.channel)==null||t.send({type:"broadcast",event:"finish",payload:{id:this.local.id,...e}})}get playerCount(){return this.remotePlayers.size+1}async leave(){this.channel&&(await C0.removeChannel(this.channel),this.channel=null)}}const ts="rydash_local_scores",Wo="rydash_guest_id";function R0(){let i=localStorage.getItem(Wo);return i||(i=typeof crypto<"u"&&crypto.randomUUID?"guest_"+crypto.randomUUID().slice(0,8):"guest_"+Math.random().toString(36).slice(2,10),localStorage.setItem(Wo,i)),i}async function P0(){return null}async function I0(){const i=await P0();return(i==null?void 0:i.user)||null}async function L0(i,e){throw new Error("Supabase not configured.")}async function U0(i,e){throw new Error("Supabase not configured.")}async function N0({name:i,timeMs:e,car:t,livery:r}){const n=JSON.parse(localStorage.getItem(ts)||"[]");n.push({driver_name:i,time_ms:e,car:t,livery:r,created_at:new Date().toISOString()}),n.sort((a,s)=>a.time_ms-s.time_ms),localStorage.setItem(ts,JSON.stringify(n.slice(0,50)))}async function D0(i=20){return JSON.parse(localStorage.getItem(ts)||"[]").slice(0,i)}const zr={neon:{label:"Neon Rain City",build:qm},sunset:{label:"Sunset Highway",build:ig},desert:{label:"Neon Desert",build:dg},underground:{label:"Underground District (RAVEX)",build:xg},rooftop:{label:"Rooftop City Racing",build:Rg},storm:{label:"Electric Storm City",build:kg},coastal:{label:"Night Coastal Highway",build:Jg},vertical:{label:"Vertical Mega-City",build:l0}},ne={screen:"screen-loading",carIndex:0,liveryIndex:0,playerName:localStorage.getItem("rydash_name")||localStorage.getItem("vx_name")||"RACER",quality:localStorage.getItem("rydash_quality")||localStorage.getItem("vx_quality")||"high",cameraMode:localStorage.getItem("rydash_camera")||localStorage.getItem("vx_camera")||"chase",worldId:localStorage.getItem("rydash_world")||localStorage.getItem("vx_world")||"neon",soundOn:(localStorage.getItem("rydash_sound")??localStorage.getItem("vx_sound"))!=="false",showFps:(localStorage.getItem("rydash_fps")??localStorage.getItem("vx_fps"))==="true",totalLaps:Number(localStorage.getItem("rydash_laps"))||3,session:null,multiplayer:null,isMultiplayerRace:!1},q=i=>document.getElementById(i);let jt=null,$t=null,pr=null;function O0(){const i=q("homeAtmosphereCanvas");i&&!pr&&(pr=new c0(i),pr.setWorld(ne.worldId),pr.start())}function sn(){const i=mr[ne.carIndex]||mr[0],e=q("heroCarName");e&&(e.textContent=i.name);const t=q("heroCarRarity");if(t){const h=i.rarity||"legendary";t.textContent=h.toUpperCase(),t.className=`rarity-badge rarity-${h}`}const r=q("heroCarDriver");r&&(r.textContent=ne.playerName||"Guest");const n=Math.round(i.topSpeed*100),a=Math.round(i.handling*100),s=Math.round((i.drift||.8)*100),o=Math.round(i.nitro*100),l=Math.round(i.accel*100);q("heroStatSpeed")&&(q("heroStatSpeed").style.width=n+"%"),q("heroNumSpeed")&&(q("heroNumSpeed").textContent=n),q("heroStatHandling")&&(q("heroStatHandling").style.width=a+"%"),q("heroNumHandling")&&(q("heroNumHandling").textContent=a),q("heroStatDrift")&&(q("heroStatDrift").style.width=s+"%"),q("heroNumDrift")&&(q("heroNumDrift").textContent=s),q("heroStatNitro")&&(q("heroStatNitro").style.width=o+"%"),q("heroNumNitro")&&(q("heroNumNitro").textContent=o),q("heroStatAccel")&&(q("heroStatAccel").style.width=l+"%"),q("heroNumAccel")&&(q("heroNumAccel").textContent=l),document.querySelectorAll(".quick-car-btn").forEach(h=>{h.classList.toggle("active",Number(h.dataset.carIdx)===ne.carIndex)});const c=q("homeCurrentWorldLabel");c&&(c.textContent=(zr[ne.worldId]||zr.neon).label.toUpperCase())}function Ss(){jt&&jt.setCarByIndex(ne.carIndex,ne.liveryIndex),$t&&$t.setCarByIndex(ne.carIndex,ne.liveryIndex),sn()}function z0(){const i=q("homeHeroStage");i&&!jt?(jt=new Ql(i,{interactive:!1}),jt.setCarByIndex(ne.carIndex,ne.liveryIndex),jt.start()):jt&&(jt.setCarByIndex(ne.carIndex,ne.liveryIndex),jt.start()),sn()}function tc(){const i=q("garageStageWrap");i&&!$t?($t=new Ql(i,{interactive:!0}),$t.setCarByIndex(ne.carIndex,ne.liveryIndex),$t.start()):$t&&($t.setCarByIndex(ne.carIndex,ne.liveryIndex),$t.start())}function _t(i){document.querySelectorAll(".screen").forEach(t=>t.classList.remove("active"));const e=q(i);e&&(e.classList.add("active"),ne.screen=i),document.querySelectorAll("[data-back]").forEach(t=>{t.onclick=()=>_t(t.dataset.back)}),i==="screen-home"||i==="screen-worldmap"?(O0(),pr==null||pr.start()):pr==null||pr.stop(),i==="screen-home"?(z0(),jt==null||jt.start(),$t==null||$t.stop()):i==="screen-garage"?(tc(),$t==null||$t.start(),jt==null||jt.stop()):(jt==null||jt.stop(),$t==null||$t.stop())}function gr(i,e=2400){const t=q("toast");t&&(t.textContent=i,t.classList.remove("hidden"),clearTimeout(t._timer),t._timer=setTimeout(()=>t.classList.add("hidden"),e))}function rc(){const i=q("soundIcon")||q("navSoundIcon");i&&(i.textContent=ne.soundOn?"🔊":"🔇");const e=q("settingSound");e&&(e.checked=ne.soundOn),it.setEnabled(ne.soundOn)}const Xo=q("navSoundToggle");Xo&&Xo.addEventListener("click",()=>{it.init(),ne.soundOn=!ne.soundOn,localStorage.setItem("rydash_sound",ne.soundOn),rc(),gr(ne.soundOn?"Sound: Enabled":"Sound: Muted")});async function qo(){const i=q("authStatus")||q("navPlayerName");i&&(i.textContent=ne.playerName),rc();const e=q("navAuthBtn")||q("navLoginBtn");e&&(e.onclick=()=>_t("screen-auth"));const t=q("playBtn")||q("heroRaceBtn");t&&(t.onclick=()=>{it.init(),Ms(!1)});const r=q("multiplayerBtn")||q("heroMultiBtn");r&&(r.onclick=()=>{it.init(),_t("screen-lobby")});const n=q("garageBtn")||q("dockGarageBtn");n&&(n.onclick=()=>{_t("screen-garage"),F0(()=>_t("screen-home"))});const a=q("leaderboardBtn")||q("dockLeaderboardBtn");a&&(a.onclick=()=>{_t("screen-leaderboard"),ws()});const s=q("worldmapBtn")||q("dockWorldBtn");s&&(s.onclick=()=>{_t("screen-worldmap"),bs(ne.worldId),Es()});const o=q("settingsBtn")||q("dockSettingsBtn");o&&(o.onclick=()=>_t("screen-settings"));const l=q("howtoBtn")||q("dockHowToBtn");l&&(l.onclick=()=>_t("screen-howto")),document.querySelectorAll(".quick-car-btn").forEach(c=>{c.onclick=()=>{const h=Number(c.dataset.carIdx);isNaN(h)||(ne.carIndex=h,localStorage.setItem("rydash_car",h),Ss(),gr(`Selected: ${mr[h].name}`))}}),_t("screen-home"),sn(),I0().then(c=>{var h,f;c&&(ne.session=c,ne.playerName=((h=c.user_metadata)==null?void 0:h.driver_name)||((f=c.email)==null?void 0:f.split("@")[0])||ne.playerName,i&&(i.textContent=ne.playerName),e&&(e.textContent="👤 "+ne.playerName),sn())}).catch(()=>{})}const jo=q("authForm");jo&&jo.addEventListener("submit",async i=>{var e,t,r;i.preventDefault();const n=(e=q("authEmail"))==null?void 0:e.value.trim();(t=q("authPassword"))==null||t.value;const a=q("authMsg");a&&(a.textContent="Signing in…");const s=await U0();if(s.error)a&&(a.textContent=s.error.message||"Failed to sign in");else{a&&(a.textContent="Welcome back!"),ne.session=s.user,ne.playerName=((r=s.user.user_metadata)==null?void 0:r.driver_name)||n.split("@")[0];const o=q("authStatus")||q("navPlayerName");o&&(o.textContent=ne.playerName);const l=q("navAuthBtn")||q("navLoginBtn");l&&(l.textContent="👤 "+ne.playerName),setTimeout(()=>_t("screen-home"),600)}});const $o=q("authSignUpBtn");$o&&$o.addEventListener("click",async()=>{var i,e;const t=(i=q("authEmail"))==null?void 0:i.value.trim(),r=(e=q("authPassword"))==null?void 0:e.value,n=q("authMsg");if(!t||r.length<6){n&&(n.textContent="Enter email & 6+ char password");return}n&&(n.textContent="Creating account…");const a=await L0(t,r,{driver_name:t.split("@")[0]});a.error?n&&(n.textContent=a.error.message||"Sign up failed"):n&&(n.textContent="Account created! Check email or sign in.")});const Yo=q("authGuestBtn");Yo&&Yo.addEventListener("click",()=>{gr("Continuing in Guest Mode"),_t("screen-home")});let rs=null;function F0(i){rs=i,tc(),ic(),nc()}function ic(){const i=q("garageGrid");i&&(i.innerHTML="",mr.forEach((e,t)=>{const r=document.createElement("div"),n="rarity-"+(e.rarity||"rare");r.className=`car-card car-card-${t} ${n} ${t===ne.carIndex?"active selected":""}`;const a=String(t+1).padStart(2,"0"),s=Math.round(e.topSpeed*100),o=Math.round(e.handling*100),l=Math.round(e.accel*100),c=Math.round(e.nitro*100);r.innerHTML=`
      <div class="car-card-header">
        <span class="car-num">${a}</span>
        <span class="car-title">${e.name}</span>
        <span class="rarity-tag ${n}">${(e.rarity||"RARE").toUpperCase()}</span>
      </div>
      <div class="car-class">${(e.class||"EXOTIC GT").toUpperCase()}</div>
      <img src="./cars/car-${t}.jpg" alt="${e.name}" class="car-card-img" />
      <div class="car-stats">
        <div class="stat-row">
          <span class="stat-name">SPEED</span>
          <div class="stat-bar-track"><div class="stat-bar-fill fill-orange" style="width:${s}%"></div></div>
          <span class="stat-val">${s}</span>
        </div>
        <div class="stat-row">
          <span class="stat-name">HANDLING</span>
          <div class="stat-bar-track"><div class="stat-bar-fill fill-cyan" style="width:${o}%"></div></div>
          <span class="stat-val">${o}</span>
        </div>
        <div class="stat-row">
          <span class="stat-name">ACCELERATION</span>
          <div class="stat-bar-track"><div class="stat-bar-fill fill-purple" style="width:${l}%"></div></div>
          <span class="stat-val">${l}</span>
        </div>
        <div class="stat-row">
          <span class="stat-name">NITRO</span>
          <div class="stat-bar-track"><div class="stat-bar-fill fill-green" style="width:${c}%"></div></div>
          <span class="stat-val">${c}</span>
        </div>
      </div>
    `,r.onclick=()=>{ne.carIndex=t,localStorage.setItem("rydash_car",t),Ss(),ic(),gr(`Selected: ${e.name}`)},i.appendChild(r)}))}function nc(){const i=q("colorSwatches");i&&(i.innerHTML="",Zr.forEach((e,t)=>{const r="#"+e.color.toString(16).padStart(6,"0"),n=document.createElement("button");n.className="swatch"+(t===ne.liveryIndex?" active":""),n.style.background=r,n.style.color=r,n.title=e.name,n.onclick=()=>{ne.liveryIndex=t,localStorage.setItem("rydash_livery",t),Ss(),nc()},i.appendChild(n)}))}const Ko=q("selectCarBtn");Ko&&Ko.addEventListener("click",()=>{rs?rs():_t("screen-worldmap")});var Jo;(Jo=q("garageWorldBtn"))==null||Jo.addEventListener("click",()=>{_t("screen-worldmap"),bs(ne.worldId),Es()});var Zo;(Zo=q("garageLeadBtn"))==null||Zo.addEventListener("click",()=>{_t("screen-leaderboard"),ws()});var Qo;(Qo=q("garageMultiBtn"))==null||Qo.addEventListener("click",()=>{_t("screen-lobby")});var el;(el=q("garageSettingsBtn"))==null||el.addEventListener("click",()=>{_t("screen-settings")});var tl;(tl=q("garageHowtoBtn"))==null||tl.addEventListener("click",()=>{_t("screen-howto")});var rl;(rl=q("garageQuickRaceBtn"))==null||rl.addEventListener("click",()=>{it.init(),Ms(!1)});const il=q("createRoomBtn");il&&il.addEventListener("click",async()=>{const i=ec.generateCode();await ac(i,!0)});const nl=q("joinRoomBtn");nl&&nl.addEventListener("click",async()=>{var i;const e=(i=q("joinCodeInput"))==null?void 0:i.value.trim().toUpperCase();if(!e||e.length!==5){const t=q("lobbyMsg");t&&(t.textContent="Enter a valid 5-letter code.");return}await ac(e,!1)});async function ac(i,e){const t=q("lobbyMsg");t&&(t.textContent="Connecting to room…");try{const r={id:R0(),name:ne.playerName,carModel:mr[ne.carIndex].id,livery:Zr[ne.liveryIndex].id},n=new ec(i,r);n.onPlayerJoin=()=>qa(n),n.onPlayerLeave=()=>qa(n),n.onRaceStart=()=>{ne.isMultiplayerRace=!0,dn()},await n.connect(),ne.multiplayer=n;const a=q("roomCodeDisplay");a&&(a.textContent=i);const s=q("roomInfo");s&&s.classList.remove("hidden");const o=q("startRaceBtn");o&&o.classList.toggle("hidden",!e),t&&(t.textContent=e?"Room created — share this code!":"Joined room!"),qa(n)}catch(r){t&&(t.textContent=r.message||"Connection failed")}}function qa(i){const e=q("playerCount");e&&(e.textContent=`${i.playerCount} / 8 Racers`);const t=q("lobbyPlayerList");t&&(t.innerHTML=`<li>🏁 ${ne.playerName} (you)</li>`,i.remotePlayers.forEach(r=>{const n=document.createElement("li");n.textContent=`🚗 ${r.name||"Racer"}`,t.appendChild(n)}))}const al=q("startRaceBtn");al&&al.addEventListener("click",()=>{var i;(i=ne.multiplayer)==null||i.sendRaceStart({startedAt:Date.now()}),ne.isMultiplayerRace=!0,dn()});const sl=q("leaveRoomBtn");sl&&sl.addEventListener("click",()=>{var i,e,t;(e=(i=ne.multiplayer)==null?void 0:i.leave)==null||e.call(i),ne.multiplayer=null,(t=q("roomInfo"))==null||t.classList.add("hidden"),_t("screen-home")});let Ai=null;function Ms(i){ne.isMultiplayerRace=i,dn()}function dn(){_t("screen-race");const i=q("gameCanvas"),e=window.innerWidth,t=window.innerHeight,r=Math.min(window.devicePixelRatio,ne.quality==="high"?2:1.5),n=new Fl({canvas:i,antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:!0});n.setPixelRatio(r),n.setSize(e,t),n.shadowMap.enabled=ne.quality!=="low",n.shadowMap.type=gl,n.outputColorSpace=qt,n.toneMapping=ss,n.toneMappingExposure=1.15;const a=new Bl,s=new Yt(62,e/t,.1,1400),o=zr[ne.worldId]||zr.neon,{curve:l,trackWidth:c,update:h,ramps:f=[]}=o.build(a),u=10,d=l.getSpacedPoints(u).slice(0,u),g=q("minimapCanvas"),v=g?g.getContext("2d"):null;let p=null,m=null;if(v){const Y=l.getSpacedPoints(48).map(gt=>({x:gt.x,z:gt.z})),ee=Y.map(gt=>gt.x),Z=Y.map(gt=>gt.z),ye=Math.min(...ee),je=Math.max(...ee),ot=Math.min(...Z),tt=Math.max(...Z),ft=Math.max(je-ye,tt-ot)||1,Bt=18,Pt=g.width,Jt=(Pt-Bt*2)/ft,Ot=(ye+je)/2,rr=(ot+tt)/2;m=(gt,xr)=>({x:Pt/2+(gt-Ot)*Jt,y:Pt/2+(xr-rr)*Jt}),p=Y.map(gt=>m(gt.x,gt.z))}function y(){if(!v)return;const Y=g.width;v.clearRect(0,0,Y,Y),v.save(),v.beginPath(),v.arc(Y/2,Y/2,Y/2-1,0,Math.PI*2),v.clip(),v.beginPath(),p.forEach((Z,ye)=>ye===0?v.moveTo(Z.x,Z.y):v.lineTo(Z.x,Z.y)),v.closePath(),v.strokeStyle="rgba(0,229,255,.55)",v.lineWidth=3,v.stroke(),z.forEach(Z=>{const ye=m(Z.ctrl.position.x,Z.ctrl.position.z);v.fillStyle="#ff2e88",v.beginPath(),v.arc(ye.x,ye.y,2.6,0,Math.PI*2),v.fill()});const ee=m(B.position.x,B.position.z);v.fillStyle="#00e5ff",v.shadowColor="#00e5ff",v.shadowBlur=6,v.beginPath(),v.arc(ee.x,ee.y,4,0,Math.PI*2),v.fill(),v.shadowBlur=0,v.restore()}const _=[.12,.32,.5,.68,.85].map(Y=>{const ee=l.getPointAt(Y),Z=new qe,ye=new W(new _s(1.1,.14,10,24),new we({color:3800989,emissive:3800989,emissiveIntensity:2.2,metalness:.3,roughness:.3}));ye.rotation.x=Math.PI/2,ye.position.set(ee.x,1,ee.z),Z.add(ye);const je=new Ut(3800989,1.4,8,2);return je.position.copy(ye.position),Z.add(je),a.add(Z),{position:new w(ee.x,0,ee.z),group:Z,ring:ye,radius:2.4,cooldown:0}});function S(Y){_.forEach(ee=>{ee.cooldown>0&&(ee.cooldown-=Y,ee.group.visible=ee.cooldown<=0),ee.ring.rotation.z+=Y*1.2,ee.ring.position.y=1+Math.sin(performance.now()*.003+ee.position.x)*.15})}function P(Y){if(!(Y.nitro>=.98))for(const ee of _){if(ee.cooldown>0)continue;const Z=Y.position.x-ee.position.x,ye=Y.position.z-ee.position.z;if(Math.hypot(Z,ye)<ee.radius){Y.nitro=1,ee.cooldown=10,ee.group.visible=!1,V.emit(Y.rig.group.position,.8),Y===B&&(gr("Nitro refilled!"),it.playPickup());break}}}const T=mr[ne.carIndex],R=Zr[ne.liveryIndex],U=es(T,R.color);a.add(U.group),ne.quality!=="low"&&U.headlightSpots.forEach(Y=>{Y.intensity=3.2,Y.castShadow=ne.quality==="high",Y.castShadow&&(Y.shadow.mapSize.set(512,512),Y.shadow.bias=-.003)});const B=new Vo(U,T,{isPlayer:!0,trackCurve:l,trackWidth:c}),x=d[0],E=l.getTangentAt(0),F=Math.atan2(E.x,E.z);B.setStartTransform(new w(x.x-2,0,x.z),F),B.nextCP=1;const z=[];[{name:"NitroKing",modelIdx:0,liveryIdx:1},{name:"SpeedDemon",modelIdx:1,liveryIdx:2},{name:"DriftGhost",modelIdx:2,liveryIdx:0},{name:"PhantomX",modelIdx:3,liveryIdx:4},{name:"StreetLegend",modelIdx:4,liveryIdx:5},{name:"NightRider",modelIdx:5,liveryIdx:6},{name:"Redline",modelIdx:6,liveryIdx:7}].forEach((Y,ee)=>{const Z=mr[Y.modelIdx%mr.length],ye=Zr[Y.liveryIdx%Zr.length],je=es(Z,ye.color);a.add(je.group);const ot=new Vo(je,Z,{isPlayer:!1,trackCurve:l,trackWidth:c}),tt=Math.floor(ee/2),ft=ee%2,Bt=-(tt+1)*.012,Pt=l.getPointAt((Bt%1+1)%1),Jt=(ft===0?-1:1)*3;ot.setStartTransform(new w(Pt.x+Jt,0,Pt.z),F);const Ot=new h0(ot,l,{tOffset:(Bt%1+1)%1,targetSpeedKmh:Z.topSpeed*290,aggro:.82+ee*.03});z.push({ctrl:ot,ai:Ot,name:Y.name,nextCP:1,lap:1,finishTimeMs:null})});const V=new M0(a,140),Q=new b0(a,240),D=new w0(a,180),$=new E0(a),{composer:G,bloom:ue,motionBlur:de}=S0(n,a,s,e,t);ue.enabled=ne.quality!=="low",de.enabled=ne.quality!=="low";const Ie={gas:0,brake:0,steer:0,handbrake:0,nitro:!1,horn:!1},ke=new Set;function rt(Y){ke.add(Y.code),Y.code==="Escape"&&Re(),Y.code==="KeyC"&&re(),Y.code==="KeyH"&&it.startHorn()}function K(Y){ke.delete(Y.code),Y.code==="KeyH"&&it.stopHorn()}window.addEventListener("keydown",rt),window.addEventListener("keyup",K);const ce="ontouchstart"in window||navigator.maxTouchPoints>0,xe=q("touchControls");xe&&xe.classList.toggle("hidden",!ce);const pe={gas:!1,brake:!1,left:!1,right:!1,nitro:!1,horn:!1};function Fe(Y,ee){const Z=q(Y);if(!Z)return;const ye=je=>{pe[ee]=je,ee==="horn"&&(je?it.startHorn():it.stopHorn())};Z.addEventListener("touchstart",je=>{je.preventDefault(),ye(!0)},{passive:!1}),Z.addEventListener("touchend",je=>{je.preventDefault(),ye(!1)},{passive:!1}),Z.addEventListener("mousedown",()=>ye(!0)),Z.addEventListener("mouseup",()=>ye(!1))}Fe("touchGas","gas"),Fe("touchBrake","brake"),Fe("touchLeft","left"),Fe("touchRight","right"),Fe("touchNitro","nitro"),Fe("touchHorn","horn");function Ne(){it.init();const Y=ke.has("KeyW")||ke.has("ArrowUp")||pe.gas,ee=ke.has("KeyS")||ke.has("ArrowDown")||pe.brake,Z=ke.has("KeyA")||ke.has("ArrowLeft")||pe.left,ye=ke.has("KeyD")||ke.has("ArrowRight")||pe.right,je=ke.has("KeyH")||pe.horn;Ie.gas=Y?1:0,Ie.brake=ee?1:0,Ie.steer=(Z?-1:0)+(ye?1:0),Ie.handbrake=ke.has("Space")||pe.brake&&Y,Ie.nitro=ke.has("ShiftLeft")||ke.has("ShiftRight")||pe.nitro,Ie.horn=je}let Be=ne.cameraMode;function re(){Be=Be==="chase"?"hood":Be==="hood"?"orbit":"chase",gr(`Camera: ${Be}`)}const ie=new w;let C=0;function Le(Y){C=Math.min(1.6,C+Y),it.playImpact(Y)}let ae=0,be=!0;function fe(Y){const ee=B.rig.group.position,Z=B.heading,ye=new w(Math.sin(Z),0,Math.cos(Z));let je=0,ot=0;if(C>.001?(je=(Math.random()-.5)*C*.55,ot=(Math.random()-.5)*C*.35,C*=Math.max(0,1-Y*7)):C=0,be){const tt=Z+Math.PI*.8*(1-ae),ft=5.6-ae*.6,Bt=1.6+(1-ae)*1.2;s.position.set(ee.x-Math.sin(tt)*ft+je,ee.y+Bt+ot,ee.z-Math.cos(tt)*ft),s.lookAt(ee.x,ee.y+.9,ee.z),s.fov=62,s.updateProjectionMatrix();return}if(Be==="chase"){const tt=bt.clamp(B.speedKmh/300,0,1),ft=B.nitroActive?5.8:4.9+tt*.8,Bt=1.82+tt*.32;ie.set(-ye.x*ft,Bt,-ye.z*ft);const Pt=ee.clone().add(ie);s.position.lerp(Pt,Math.min(1,Y*8.5)),s.position.x+=je,s.position.y+=ot;const Jt=ee.clone().add(new w(ye.x*2.2,.95,ye.z*2.2));s.lookAt(Jt);const Ot=-B.steerInput*.045*bt.clamp(B.speedKmh/60,0,1);s.rotation.z=bt.lerp(s.rotation.z,Ot,Math.min(1,Y*6));const rr=62,gt=B.speedKmh/320*13,xr=B.nitroActive?6.5:0;s.fov=bt.lerp(s.fov,rr+gt+xr,Math.min(1,Y*6)),s.updateProjectionMatrix()}else if(Be==="hood"){const tt=ee.clone().add(new w(ye.x*1.35,1.12,ye.z*1.35));s.position.lerp(tt,Math.min(1,Y*12)),s.position.x+=je,s.position.y+=ot,s.lookAt(ee.x+ye.x*12,ee.y+.95,ee.z+ye.z*12)}else{const tt=performance.now()*3e-4;s.position.set(ee.x+Math.sin(tt)*11+je,4.5+ot,ee.z+Math.cos(tt)*11),s.lookAt(ee)}}let ze=!1,Ce=!1,A=0,M=performance.now(),O=0,j=null,oe=1;B0(()=>{ze=!0,be=!1,M=performance.now(),it.startEngine()});const J=q("hudTotalLaps");J&&(J.textContent=ne.totalLaps);const Pe=q("resumeBtn");Pe&&(Pe.onclick=Re);const me=q("restartBtn");me&&(me.onclick=()=>{is(),dn()});const Ee=q("quitBtn");Ee&&(Ee.onclick=()=>{is(),_t("screen-home")});const Je=q("pauseBtn");Je&&(Je.onclick=Re);let le=!1;function Re(){var Y;!ze||Ce||(le=!le,(Y=q("pauseOverlay"))==null||Y.classList.toggle("hidden",!le),le||(M=performance.now()))}function Ve(Y,ee){const Z=d[Y.nextCP];return ee.distanceTo(new w(Z.x,0,Z.z))<c&&(Y.nextCP++,Y.nextCP>=u)?(Y.nextCP=0,Y.lap=(Y.lap||1)+1,!0):!1}const We=2.15;function Te(Y,ee){const Z=[Y,...ee.map(ye=>ye.ctrl)];for(let ye=0;ye<Z.length;ye++)for(let je=ye+1;je<Z.length;je++){const ot=Z[ye],tt=Z[je],ft=ot.position.x-tt.position.x,Bt=ot.position.z-tt.position.z,Pt=Math.hypot(ft,Bt),Jt=We*2;if(Pt>1e-4&&Pt<Jt){const Ot=(Jt-Pt)/2,rr=ft/Pt,gt=Bt/Pt,xr=new w(rr,0,gt);ot.position.x+=rr*Ot,ot.position.z+=gt*Ot,tt.position.x-=rr*Ot,tt.position.z-=gt*Ot,ot.rig.group.position.copy(ot.position),tt.rig.group.position.copy(tt.position);const ii=Math.abs(ot.speed-tt.speed)+4,pn=Math.min(22,ii*1.2);ot.applyCollisionImpulse&&ot.applyCollisionImpulse(xr.clone().multiplyScalar(pn),.88),tt.applyCollisionImpulse&&tt.applyCollisionImpulse(xr.clone().multiplyScalar(-pn),.88);const fn=ot.rig.group.position.clone().lerp(tt.rig.group.position,.5);fn.y+=.45,Q.emit(fn,Math.min(20,Math.round(ii*1.5))),(ot===Y||tt===Y)&&Le(Math.min(1.2,ii/45))}}}function et(Y,ee,Z,ye,je,ot){const tt=je-Z,ft=ot-ye,Bt=Y-Z,Pt=ee-ye,Jt=tt*tt+ft*ft||1,Ot=bt.clamp((Bt*tt+Pt*ft)/Jt,0,1),rr=Z+tt*Ot,gt=ye+ft*Ot;return Math.hypot(Y-rr,ee-gt)}function Ye(Y,ee){const Z=d[(Y.nextCP-1+u)%u],ye=d[Y.nextCP];et(Y.position.x,Y.position.z,Z.x,Z.z,ye.x,ye.z)>c/2+1.6&&!Y.airborne?(Y.speed*=Math.max(.88,1-ee*1.6),Y.offRoad=!0):Y.offRoad=!1}function at(Y){if(!Y.airborne)for(const ee of f){const Z=Y.position.x-ee.position.x,ye=Y.position.z-ee.position.z;if(Math.hypot(Z,ye)<ee.radius&&Math.abs(Y.speed)>ee.minSpeed){Y.launch(ee.launchVy,ee.forwardBoost);break}}Y.justLanded&&(V.emit(Y.rig.group.position,1.6),Y===B&&Le(.8))}function I(){Ce=!0,it.stopEngine(),it.updateDrift(0),it.updateNitro(!1);const Y=Math.round(A);N0({name:ne.playerName,timeMs:Y,car:T.id,livery:R.id}),H0(Y,z)}let Me=0,X=0,te=performance.now();function Se(Y){Ai.rafId=requestAnimationFrame(Se);const ee=Math.min(.05,(Y-M)/1e3);if(M=Y,be){ae=Math.min(1,ae+ee*.35),fe(ee),G.render();return}if(ze&&!le&&!Ce){if(A+=ee*1e3,Ne(),B.applyPlayerInput(Ie,ee),B.step(ee),B.gear!==oe&&B.gear!=="R"&&(it.playGearShift(),oe=B.gear),it.updateEngine(B.speedKmh,B.rpm||3e3,Ie.gas,B.nitroActive),it.updateDrift(B.driftFactor),it.updateNitro(B.nitroActive),Ve(B,B.rig.group.position)){const Z=q("hudLap");Z&&(Z.textContent=Math.min(B.lap,ne.totalLaps));const ye=A-O;if(O=A,j===null||ye<j){j=ye;const je=q("hudBest");je&&(je.textContent=sc(j))}B.lap>ne.totalLaps&&I()}if(B.driftFactor>.12&&Math.abs(B.speed)>5){const Z=B.rig.wheels.rl.getWorldPosition(new w),ye=B.rig.wheels.rr.getWorldPosition(new w);V.emit(Z,B.driftFactor*1.5),V.emit(ye,B.driftFactor*1.5)}if((ne.worldId==="neon"||ne.worldId==="storm"||ne.worldId==="coastal")&&B.speedKmh>35){const Z=new w(Math.sin(B.heading),0,Math.cos(B.heading)),ye=B.rig.wheels.rl.getWorldPosition(new w),je=B.rig.wheels.rr.getWorldPosition(new w);D.emit(ye,Z,B.speedKmh),D.emit(je,Z,B.speedKmh)}if($.update(B.position,B.heading,B.nitroActive,ee),z.forEach(Z=>{Z.ai.step(ee),Z.ctrl.step(ee),Ve(Z.ctrl,Z.ctrl.rig.group.position)&&Z.ctrl.lap>ne.totalLaps&&!Z.finishTimeMs&&(Z.finishTimeMs=Math.round(A))}),Te(B,z),at(B),z.forEach(Z=>at(Z.ctrl)),Ye(B,ee),z.forEach(Z=>Ye(Z.ctrl,ee)),S(ee),P(B),z.forEach(Z=>P(Z.ctrl)),fe(ee),V0(B,z,A),y(),de.enabled){const Z=bt.clamp((B.speedKmh-120)/140,0,1),ye=B.nitroActive?1:Z*.7,je=B.nitroActive?1:B.speedKmh>240?.4:0;de.uniforms.uIntensity.value=bt.lerp(de.uniforms.uIntensity.value,ye,Math.min(1,ee*7)),de.uniforms.uAberration&&(de.uniforms.uAberration.value=bt.lerp(de.uniforms.uAberration.value,je,Math.min(1,ee*7)))}}if(V.update(ee),Q.update(ee),D.update(ee),h(ee),G.render(),ne.showFps&&(Me+=ee,X++,Y-te>500)){const Z=q("fpsCounter");Z&&(Z.textContent=`${Math.round(X/Me)} FPS`),Me=0,X=0,te=Y}}function ge(){const Y=window.innerWidth,ee=window.innerHeight;s.aspect=Y/ee,s.updateProjectionMatrix();const Z=Math.min(window.devicePixelRatio,ne.quality==="high"?2:1.5);n.setPixelRatio(Z),n.setSize(Y,ee),G.setSize(Y,ee)}window.addEventListener("resize",ge),Ai={rafId:null,teardown(){cancelAnimationFrame(this.rafId),it.stopEngine(),it.updateDrift(0),it.updateNitro(!1),window.removeEventListener("keydown",rt),window.removeEventListener("keyup",K),window.removeEventListener("resize",ge),n.dispose()}};const st=q("fpsCounter");st&&st.classList.toggle("hidden",!ne.showFps),Ai.rafId=requestAnimationFrame(Se)}function is(){var i;Ai&&(Ai.teardown(),Ai=null),it.stopEngine(),it.updateDrift(0),it.updateNitro(!1),(i=q("pauseOverlay"))==null||i.classList.add("hidden")}function B0(i){const e=q("countdownOverlay"),t=q("countdownNum");e&&e.classList.remove("hidden");let r=3;t&&(t.textContent=r),it.playCountdown(!1);const n=setInterval(()=>{r-=1,r>0?(t&&(t.textContent=r),it.playCountdown(!1)):r===0?(t&&(t.textContent="GO!"),it.playCountdown(!0)):(clearInterval(n),e&&e.classList.add("hidden"),i())},800)}function sc(i){const e=Math.floor(i/6e4),t=(i%6e4/1e3).toFixed(3);return`${e}:${t.padStart(6,"0")}`}const k0=320,G0=2*Math.PI*70;function V0(i,e,t){const r=q("hudSpeed");r&&(r.textContent=Math.round(i.speedKmh));const n=i.gear||(i.speed<-.2?"R":Math.min(6,Math.floor(i.speedKmh/45)+1)),a=q("hudGear");a&&(a.textContent=n);const s=q("hudRpm");s&&(s.textContent=`${Math.round(i.rpm||3e3).toLocaleString()} RPM`);const o=q("nitroFill");o&&(o.style.width=`${i.nitro*100}%`);const l=q("hudTimer");l&&(l.textContent=sc(t));const c=bt.clamp(i.speedKmh/k0,0,1),h=q("speedoFillRing");h&&(h.style.strokeDashoffset=G0*(1-c),h.style.stroke=c>.85?"#ff2e2e":c>.6?"#ff7a1a":"#00e5ff");const f=bt.clamp((i.speedKmh-110)/100,0,1),u=i.nitroActive?.85:f*.5,d=q("speedLines");d&&(d.style.opacity=u);const g=[{name:ne.playerName+" (you)",lap:i.lap||1,cp:i.nextCP||0,me:!0}].concat(e.map(y=>{var _,S;return{name:y.name,lap:((_=y.ctrl)==null?void 0:_.lap)||1,cp:((S=y.ctrl)==null?void 0:S.nextCP)||0,me:!1}}));g.sort((y,_)=>_.lap-y.lap||_.cp-y.cp);const v=g.findIndex(y=>y.me)+1,p=q("hudPos");p&&(p.textContent=String(v).padStart(2,"0"));const m=q("hudPosTotal");m&&(m.textContent=String(g.length).padStart(2,"0"))}function H0(i,e){is(),_t("screen-results");const t=Math.floor(i/6e4),r=(i%6e4/1e3).toFixed(3),n=[{name:ne.playerName+" (you)",time:i,me:!0}];(e||[]).forEach((l,c)=>{const h=i+(c+1)*1400+Math.round(Math.random()*800);n.push({name:l.name,time:h,me:!1})}),n.sort((l,c)=>l.time-c.time);const a=q("resultsList");a&&(a.innerHTML=n.map((l,c)=>{const h=Math.floor(l.time/6e4),f=(l.time%6e4/1e3).toFixed(3);return`<div class="res-row ${l.me?"me":""}"><span>${c+1}. ${ns(l.name)}</span><span>${h}:${f.padStart(6,"0")}</span></div>`}).join(""));const s=n.findIndex(l=>l.me)+1,o=q("resultsBest");o&&(o.textContent=`Rank: ${s}/${n.length} • Your time: ${t}:${r.padStart(6,"0")}`)}var ol;(ol=q("raceAgainBtn"))==null||ol.addEventListener("click",()=>dn());var ll;(ll=q("resultsMenuBtn"))==null||ll.addEventListener("click",()=>_t("screen-home"));async function ws(){const i=q("leaderboardBody");if(!i)return;i.innerHTML='<tr><td colspan="6" class="muted center">Loading records…</td></tr>';const e=await D0(25),t=[{rank:1,driver_name:"NitroKing",car:"SHADOW GT",time_ms:108753,races:168,wins:94},{rank:2,driver_name:"SpeedDemon",car:"APEX R9",time_ms:112664,races:152,wins:48},{rank:3,driver_name:"DriftGhost",car:"INFERNO X",time_ms:113921,races:140,wins:35},{rank:4,driver_name:"PhantomX",car:"CYBER VELOCE",time_ms:114102,races:128,wins:33},{rank:5,driver_name:"StreetLegend",car:"NIGHTHAWK",time_ms:114853,races:101,wins:21},{rank:6,driver_name:"NightRider",car:"VORTEX RS",time_ms:115231,races:96,wins:18}],r=e&&e.length?e:t;i.innerHTML=r.map((n,a)=>{const s=n.rank||a+1,o=Math.floor(n.time_ms/6e4),l=(n.time_ms%6e4/1e3).toFixed(3),c=n.races||120-a*8,h=n.wins||45-a*5;return`<tr>
      <td><b>#${s}</b></td>
      <td>${ns(n.driver_name)}</td>
      <td><span class="accent">${ns(n.car)}</span></td>
      <td><b>${o}:${l.padStart(6,"0")}</b></td>
      <td>${c}</td>
      <td>${h}</td>
    </tr>`}).join("")}function ns(i){return String(i).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}document.querySelectorAll(".lead-tab-btn").forEach(i=>{i.addEventListener("click",()=>{document.querySelectorAll(".lead-tab-btn").forEach(e=>e.classList.remove("active")),i.classList.add("active"),ws()})});document.querySelectorAll(".set-tab-btn").forEach(i=>{i.addEventListener("click",()=>{document.querySelectorAll(".set-tab-btn").forEach(e=>e.classList.remove("active")),i.classList.add("active")})});const Li=q("settingQuality");Li&&(Li.value=ne.quality);const Ui=q("settingSound");Ui&&(Ui.checked=ne.soundOn);const Ni=q("settingFps");Ni&&(Ni.checked=ne.showFps);it.setEnabled(ne.soundOn);const cl=q("resetSettingsBtn");cl&&cl.addEventListener("click",()=>{Li&&(Li.value="high"),Ui&&(Ui.checked=!0),Ni&&(Ni.checked=!1),gr("Settings reset to defaults")});const hl=q("applySettingsBtn");hl&&hl.addEventListener("click",()=>{Li&&(ne.quality=Li.value),Ui&&(ne.soundOn=Ui.checked),Ni&&(ne.showFps=Ni.checked),localStorage.setItem("rydash_quality",ne.quality),localStorage.setItem("rydash_sound",ne.soundOn),localStorage.setItem("rydash_fps",ne.showFps),it.setEnabled(ne.soundOn),gr("Settings applied successfully!"),_t("screen-home")});function bs(i){ne.worldId=i,localStorage.setItem("rydash_world",i),document.querySelectorAll(".world-node").forEach(r=>r.classList.toggle("active",r.dataset.world===i));const e=(zr[i]||zr.neon).label,t=q("worldMapSelected");t&&(t.textContent=`Selected: ${e}`),pr&&pr.setWorld(i),sn()}function Es(){document.querySelectorAll(".lap-pill").forEach(i=>{i.classList.toggle("active",Number(i.dataset.laps)===ne.totalLaps)})}document.querySelectorAll(".lap-pill").forEach(i=>{i.addEventListener("click",()=>{ne.totalLaps=Number(i.dataset.laps)||3,localStorage.setItem("rydash_laps",ne.totalLaps),Es(),gr(`Race Length: ${ne.totalLaps} ${ne.totalLaps===1?"Lap":"Laps"}`)})});document.querySelectorAll(".world-node").forEach(i=>{i.addEventListener("click",()=>bs(i.dataset.world))});const ul=q("worldSelectConfirmBtn");ul&&ul.addEventListener("click",()=>{gr(`Launching ${(zr[ne.worldId]||zr.neon).label}…`),Ms(!1)});var dl;(dl=q("settingQuality"))==null||dl.addEventListener("change",i=>{ne.quality=i.target.value,localStorage.setItem("rydash_quality",ne.quality)});var pl;(pl=q("settingSound"))==null||pl.addEventListener("change",i=>{ne.soundOn=i.target.checked,localStorage.setItem("rydash_sound",ne.soundOn),it.setEnabled(ne.soundOn)});const fl=localStorage.getItem("rydash_car")??localStorage.getItem("vx_car"),ml=localStorage.getItem("rydash_livery")??localStorage.getItem("vx_livery");fl!==null&&(ne.carIndex=Number(fl));ml!==null&&(ne.liveryIndex=Number(ml));document.readyState==="loading"?document.addEventListener("DOMContentLoaded",qo):qo();
