import{r as C,s as we,g as G,c as ve,v as ge,a as K,t as J,f as ye,i as ke,d as E,e as Ce,b as P,h as l,n as M,F as Q,j as Se,k as Fe,p as L,l as T,o as N,m as $e,q as X,w as Ue,T as Ne,u as Ae,x as Y,y as Z,z as Pe,A as Me,S as Ie,B as Ee,C as Le}from"./vendor.887b8704.js";const Te=function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function r(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerpolicy&&(n.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?n.credentials="include":t.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(t){if(t.ep)return;t.ep=!0;const n=r(t);fetch(t.href,n)}};Te();const O=C(),S=we(new Map),ee=C(!1),ne=C(!1),te=Promise.allSettled([G("notebook-files").then(e=>{if(e)for(const s of e.entries())S.set(s[0],s[1])})]).then(e=>(ee.value=!0,e));function oe(){async function e(t){if(await te,t.handle){for(const o of S.values())if(o.fileHandle.handle&&t.handle.isSameEntry(o.fileHandle.handle))return o.id}const n=ge();return S.set(n,{id:n,name:t.name,fileHandle:t}),await K("notebook-files",J(S)),n}async function s(t){await te;const n=S.get(t);if(!n)return;const o={id:n.id,name:n.name,content:await n.fileHandle.text()};O.value=o}async function r(t){var f;const n=t.id?S.get(t.id):void 0,o=/\.nb|\.sb/.test(t.name);await ye(new Blob([t.content],{type:"text/plain"}),{fileName:o?t.name:t.name+".sb",extensions:[".sb",".nb"]},(f=n==null?void 0:n.fileHandle)==null?void 0:f.handle)}async function i(){try{const t=O.value;t&&(ne.value=!1,await r(t))}catch(t){if(t.name==="AbortError")return;throw t}}return{isLoaded:ee,addFile:e,showFile:s,saveFile:r,saveShownFile:i,shownNotebook:O,files:ve(()=>Array.from(S.values()).map(t=>({id:t.id,name:t.name}))),hasUnsavedChanges:ne}}/*!
License for brotli-wasm
@license
                                 Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/

   TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

   1. Definitions.

      "License" shall mean the terms and conditions for use, reproduction,
      and distribution as defined by Sections 1 through 9 of this document.

      "Licensor" shall mean the copyright owner or entity authorized by
      the copyright owner that is granting the License.

      "Legal Entity" shall mean the union of the acting entity and all
      other entities that control, are controlled by, or are under common
      control with that entity. For the purposes of this definition,
      "control" means (i) the power, direct or indirect, to cause the
      direction or management of such entity, whether by contract or
      otherwise, or (ii) ownership of fifty percent (50%) or more of the
      outstanding shares, or (iii) beneficial ownership of such entity.

      "You" (or "Your") shall mean an individual or Legal Entity
      exercising permissions granted by this License.

      "Source" form shall mean the preferred form for making modifications,
      including but not limited to software source code, documentation
      source, and configuration files.

      "Object" form shall mean any form resulting from mechanical
      transformation or translation of a Source form, including but
      not limited to compiled object code, generated documentation,
      and conversions to other media types.

      "Work" shall mean the work of authorship, whether in Source or
      Object form, made available under the License, as indicated by a
      copyright notice that is included in or attached to the work
      (an example is provided in the Appendix below).

      "Derivative Works" shall mean any work, whether in Source or Object
      form, that is based on (or derived from) the Work and for which the
      editorial revisions, annotations, elaborations, or other modifications
      represent, as a whole, an original work of authorship. For the purposes
      of this License, Derivative Works shall not include works that remain
      separable from, or merely link (or bind by name) to the interfaces of,
      the Work and Derivative Works thereof.

      "Contribution" shall mean any work of authorship, including
      the original version of the Work and any modifications or additions
      to that Work or Derivative Works thereof, that is intentionally
      submitted to Licensor for inclusion in the Work by the copyright owner
      or by an individual or Legal Entity authorized to submit on behalf of
      the copyright owner. For the purposes of this definition, "submitted"
      means any form of electronic, verbal, or written communication sent
      to the Licensor or its representatives, including but not limited to
      communication on electronic mailing lists, source code control systems,
      and issue tracking systems that are managed by, or on behalf of, the
      Licensor for the purpose of discussing and improving the Work, but
      excluding communication that is conspicuously marked or otherwise
      designated in writing by the copyright owner as "Not a Contribution."

      "Contributor" shall mean Licensor and any individual or Legal Entity
      on behalf of whom a Contribution has been received by Licensor and
      subsequently incorporated within the Work.

   2. Grant of Copyright License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      copyright license to reproduce, prepare Derivative Works of,
      publicly display, publicly perform, sublicense, and distribute the
      Work and such Derivative Works in Source or Object form.

   3. Grant of Patent License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      (except as stated in this section) patent license to make, have made,
      use, offer to sell, sell, import, and otherwise transfer the Work,
      where such license applies only to those patent claims licensable
      by such Contributor that are necessarily infringed by their
      Contribution(s) alone or by combination of their Contribution(s)
      with the Work to which such Contribution(s) was submitted. If You
      institute patent litigation against any entity (including a
      cross-claim or counterclaim in a lawsuit) alleging that the Work
      or a Contribution incorporated within the Work constitutes direct
      or contributory patent infringement, then any patent licenses
      granted to You under this License for that Work shall terminate
      as of the date such litigation is filed.

   4. Redistribution. You may reproduce and distribute copies of the
      Work or Derivative Works thereof in any medium, with or without
      modifications, and in Source or Object form, provided that You
      meet the following conditions:

      (a) You must give any other recipients of the Work or
          Derivative Works a copy of this License; and

      (b) You must cause any modified files to carry prominent notices
          stating that You changed the files; and

      (c) You must retain, in the Source form of any Derivative Works
          that You distribute, all copyright, patent, trademark, and
          attribution notices from the Source form of the Work,
          excluding those notices that do not pertain to any part of
          the Derivative Works; and

      (d) If the Work includes a "NOTICE" text file as part of its
          distribution, then any Derivative Works that You distribute must
          include a readable copy of the attribution notices contained
          within such NOTICE file, excluding those notices that do not
          pertain to any part of the Derivative Works, in at least one
          of the following places: within a NOTICE text file distributed
          as part of the Derivative Works; within the Source form or
          documentation, if provided along with the Derivative Works; or,
          within a display generated by the Derivative Works, if and
          wherever such third-party notices normally appear. The contents
          of the NOTICE file are for informational purposes only and
          do not modify the License. You may add Your own attribution
          notices within Derivative Works that You distribute, alongside
          or as an addendum to the NOTICE text from the Work, provided
          that such additional attribution notices cannot be construed
          as modifying the License.

      You may add Your own copyright statement to Your modifications and
      may provide additional or different license terms and conditions
      for use, reproduction, or distribution of Your modifications, or
      for any such Derivative Works as a whole, provided Your use,
      reproduction, and distribution of the Work otherwise complies with
      the conditions stated in this License.

   5. Submission of Contributions. Unless You explicitly state otherwise,
      any Contribution intentionally submitted for inclusion in the Work
      by You to the Licensor shall be under the terms and conditions of
      this License, without any additional terms or conditions.
      Notwithstanding the above, nothing herein shall supersede or modify
      the terms of any separate license agreement you may have executed
      with Licensor regarding such Contributions.

   6. Trademarks. This License does not grant permission to use the trade
      names, trademarks, service marks, or product names of the Licensor,
      except as required for reasonable and customary use in describing the
      origin of the Work and reproducing the content of the NOTICE file.

   7. Disclaimer of Warranty. Unless required by applicable law or
      agreed to in writing, Licensor provides the Work (and each
      Contributor provides its Contributions) on an "AS IS" BASIS,
      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
      implied, including, without limitation, any warranties or conditions
      of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
      PARTICULAR PURPOSE. You are solely responsible for determining the
      appropriateness of using or redistributing the Work and assume any
      risks associated with Your exercise of permissions under this License.

   8. Limitation of Liability. In no event and under no legal theory,
      whether in tort (including negligence), contract, or otherwise,
      unless required by applicable law (such as deliberate and grossly
      negligent acts) or agreed to in writing, shall any Contributor be
      liable to You for damages, including any direct, indirect, special,
      incidental, or consequential damages of any character arising as a
      result of this License or out of the use or inability to use the
      Work (including but not limited to damages for loss of goodwill,
      work stoppage, computer failure or malfunction, or any and all
      other commercial damages or losses), even if such Contributor
      has been advised of the possibility of such damages.

   9. Accepting Warranty or Additional Liability. While redistributing
      the Work or Derivative Works thereof, You may choose to offer,
      and charge a fee for, acceptance of support, warranty, indemnity,
      or other liability obligations and/or rights consistent with this
      License. However, in accepting such obligations, You may act only
      on Your own behalf and on Your sole responsibility, not on behalf
      of any other Contributor, and only if You agree to indemnify,
      defend, and hold each Contributor harmless for any liability
      incurred by, or claims asserted against, such Contributor by reason
      of your accepting any such warranty or additional liability.

   END OF TERMS AND CONDITIONS

   APPENDIX: How to apply the Apache License to your work.

      To apply the Apache License to your work, attach the following
      boilerplate notice, with the fields enclosed by brackets "[]"
      replaced with your own identifying information. (Don't include
      the brackets!)  The text should be enclosed in the appropriate
      comment syntax for the file format. We also recommend that a
      file or class name and description of purpose be included on the
      same "printed page" as the copyright notice for easier
      identification within third-party archives.

   Copyright [yyyy] [name of copyright owner]

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

*/async function se(){const e=await ke({"./brotli_wasm_bg.js":{__wbindgen_string_new:de,__wbg_new_59cb74e423758ede:ue,__wbg_stack_558ba5917b466edd:fe,__wbg_error_4bb6c2a97407129a:he,__wbindgen_object_drop_ref:me,__wbindgen_rethrow:be}});let s=new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0}),r=null;function i(){return(r===null||r.buffer!==e.memory.buffer)&&(r=new Uint8Array(e.memory.buffer)),r}function t(a,d){return s.decode(i().subarray(a,a+d))}const n=new Array(32).fill(void 0);n.push(void 0,null,!0,!1);let o=n.length;function f(a){o===n.length&&n.push(n.length+1);const d=o;return o=n[d],n[d]=a,d}function h(a){return n[a]}function g(a){a<36||(n[a]=o,o=a)}function c(a){const d=h(a);return g(a),d}let m=0;function u(a,d){const p=d(a.length*1);return i().set(a,p/1),m=a.length,p}let v=null;function $(){return(v===null||v.buffer!==e.memory.buffer)&&(v=new Int32Array(e.memory.buffer)),v}function R(a,d){return i().subarray(a/1,a/1+d)}function H(a){try{const b=e.__wbindgen_add_to_stack_pointer(-16);var d=u(a,e.__wbindgen_malloc),p=m;e.compress(b,d,p);var _=$()[b/4+0],w=$()[b/4+1],U=R(_,w).slice();return e.__wbindgen_free(_,w*1),U}finally{e.__wbindgen_add_to_stack_pointer(16)}}function W(a){try{const b=e.__wbindgen_add_to_stack_pointer(-16);var d=u(a,e.__wbindgen_malloc),p=m;e.decompress(b,d,p);var _=$()[b/4+0],w=$()[b/4+1],U=R(_,w).slice();return e.__wbindgen_free(_,w*1),U}finally{e.__wbindgen_add_to_stack_pointer(16)}}let V=new TextEncoder;const le=V.encodeInto;function ce(a,d,p){var q;if(p===void 0){const y=V.encode(a),A=d(y.length);return i().subarray(A,A+y.length).set(y),m=y.length,A}let _=a.length,w=d(_);const U=i();let b=0;for(;b<_;b++){const y=a.charCodeAt(b);if(y>127)break;U[w+b]=y}if(b!==_){b!==0&&(a=a.slice(b)),w=p(w,_,_=b+a.length*3);const y=i().subarray(w+b,w+_);b+=(q=le(a,y).written)!=null?q:0}return m=b,w}function de(a,d){var p=t(a,d);return f(p)}function ue(){var a=new Error;return f(a)}function fe(a,d){var p=h(d).stack,_=ce(p,e.__wbindgen_malloc,e.__wbindgen_realloc),w=m;$()[a/4+1]=w,$()[a/4+0]=_}function he(a,d){try{console.error(t(a,d))}finally{e.__wbindgen_free(a,d)}}function me(a){c(a)}function be(a){throw c(a)}const z=Oe(),I="bw1";function pe(a){const d=new TextEncoder,p=H(d.encode(a));return I+"@"+z.encode(p)}function _e(a){const d=a.indexOf("@");if(d==-1)return"";const p=a.substring(0,d),_=a.substring(d+1);if(p===I){const w=W(z.decode(_));return new TextDecoder("utf-8").decode(w)}else return""}return{name:I,compress:H,decompress:W,compressForUrl:pe,decompressFromUrl:_e}}function Oe(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.-",s="_",r=new Uint8Array(256);for(let n=0;n<e.length;n++)r[e.charCodeAt(n)]=n;function i(n){let o="";for(let f=0;f<n.length;f+=3){const h=n[f+0],g=n[f+1],c=n[f+2];o+=e.charAt(h>>>2),o+=e.charAt((h&3)<<4|g>>>4),o+=e.charAt((g&15)<<2|c>>>6),o+=e.charAt(c&63)}return n.length%3==2?o=o.substring(0,o.length-1)+s:n.length%3==1&&(o=o.substring(0,o.length-2)+s),o}function t(n){let o=n.length*3>>>2;n.charCodeAt(n.length-1)===s.charCodeAt(0)&&o--,n.charCodeAt(n.length-2)===s.charCodeAt(0)&&o--;const f=new Uint8Array(o);for(let h=0,g=0;h<n.length;h+=4){const c=r[n.charCodeAt(h+0)],m=r[n.charCodeAt(h+1)],u=r[n.charCodeAt(h+2)],v=r[n.charCodeAt(h+3)];if(c===void 0||m===void 0||u===void 0||v===void 0)throw new Error("Non-base64 character");f[g++]=c<<2|m>>4,f[g++]=(m&15)<<4|u>>2,f[g++]=(u&3)<<6|v&63}return f}return{encode:i,decode:t}}const B=C(!1);let F=null,D=null;function ae(){function e(i){if(B.value=!1,i==="ok"&&F)F(i);else if(i==="discard"&&F)F(i);else if(i==="cancel"&&F)F(i);else if(D)D("Unknown status "+i);else throw new Error("Something went wrong with the unsaved changes modal")}function s(){return new Promise((i,t)=>{F=i,D=t,B.value=!0})}async function r(i){if(i.hasUnsavedChanges.value){const t=await s();if(t==="ok")await i.saveShownFile();else if(t!=="discard"){if(t==="cancel")return!1}}return!0}return{isShowing:B,closeCallback:e,showModal:s,showIfUnsavedChanges:r}}var x=(e,s)=>{for(const[r,i]of s)e[r]=i;return e};const Be=E({components:{},setup(e,s){Ce||console.log("Native Filesystem API not supported, please nicely ask your local browser vendor");const r=oe(),i=ae();let t=null;const n=C(!1);async function o(){if(!!await i.showIfUnsavedChanges(r))try{const c=await Fe({extensions:[".md",".sb",".nb"],multiple:!0}),m=await Promise.allSettled(c.map(v=>r.addFile(v))),u=m.find(v=>v.status==="fulfilled");(u==null?void 0:u.status)==="fulfilled"?await r.showFile(u.value):console.warn(m)}catch(c){if(c.name!=="AbortError")return console.error(c);console.warn(c)}}function f(){return r.saveShownFile()}async function h(c){!await i.showIfUnsavedChanges(r)||await r.showFile(c)}async function g(){const c=r.shownNotebook.value;if(t===null&&(t=await se()),c){const m=t.compressForUrl(c.content);let u=new URLSearchParams(window.location.search);u.set("notebook",m),u.set("c","true"),u.set("name",c.name);const v=location.protocol+"//"+location.host+location.pathname+"?"+u+location.hash;navigator.clipboard.writeText(v).then(function(){n.value=!0,setTimeout(()=>{n.value&&(n.value=!1)},1e3)},function(){})}}return{openFile:o,saveShownFile:f,files:r.files,showFile:h,shareNotebook:g,showSharePopup:n}}}),re=e=>(L("data-v-d2fd87be"),e=e(),T(),e),De={class:"menu sidebar"},xe=re(()=>l("p",{class:"menu-label"},"General",-1)),je={class:"menu-list"},Re=re(()=>l("p",{class:"menu-label"},"Files",-1)),He={class:"menu-list"},We=["onClick"];function Ve(e,s,r,i,t,n){return N(),P("div",null,[l("aside",De,[xe,l("ul",je,[l("li",null,[l("button",{class:"button is-small is-fullwidth",onClick:s[0]||(s[0]=(...o)=>e.openFile&&e.openFile(...o))}," Open File ")]),l("li",null,[l("button",{class:"button is-small is-fullwidth",onClick:s[1]||(s[1]=(...o)=>e.saveShownFile&&e.saveShownFile(...o))}," Save File ")]),l("li",null,[l("button",{class:M(["button is-small is-fullwidth",{"share-popup":e.showSharePopup}]),onClick:s[2]||(s[2]=(...o)=>e.shareNotebook&&e.shareNotebook(...o))}," Share Notebook ",2)])]),Re,l("ul",He,[(N(!0),P(Q,null,Se(e.files,o=>(N(),P("li",{key:o.id},[l("a",{onClick:f=>e.showFile(o.id)},$e(o.name),9,We)]))),128))])])])}var ze=x(Be,[["render",Ve],["__scopeId","data-v-d2fd87be"]]);const qe=E({components:{},emits:{close:e=>!0},setup(e,s){return{emit:s.emit}}}),j=e=>(L("data-v-063995ba"),e=e(),T(),e),Ge={class:"modal is-active"},Ke={class:"modal-card"},Je=j(()=>l("header",{class:"modal-card-head"},[l("p",{class:"modal-card-title"},"Unsaved Changes")],-1)),Qe=j(()=>l("section",{class:"modal-card-body"}," Do you want to save the changes to this notebook? ",-1)),Xe={class:"modal-card-foot"},Ye=j(()=>l("div",{style:{"flex-grow":"1"}},null,-1));function Ze(e,s,r,i,t,n){return N(),X(Ne,{to:"#modal"},[l("div",Ge,[l("div",{class:"modal-background",onClick:s[0]||(s[0]=Ue(o=>e.emit("close","cancel"),["self"]))}),l("div",Ke,[Je,Qe,l("footer",Xe,[l("button",{class:"button is-success",onClick:s[1]||(s[1]=o=>e.emit("close","ok"))}," Save "),l("button",{class:"button is-danger",onClick:s[2]||(s[2]=o=>e.emit("close","discard"))}," Discard "),Ye,l("button",{class:"button",onClick:s[3]||(s[3]=o=>e.emit("close","cancel"))}," Cancel ")])])])])}var en=x(qe,[["render",Ze],["__scopeId","data-v-063995ba"]]);function nn(){function e(r){return new URLSearchParams(window.location.search).get(r)}function s(r,i){let t=new URLSearchParams(window.location.search);i?t.set(r,i):t.delete(r),history.pushState(void 0,"",location.protocol+"//"+location.host+location.pathname+"?"+t+location.hash)}return{getParam:e,setParam:s}}let ie=!1;function tn(e){ie&&(e.preventDefault(),e.returnValue="Unsaved Changes")}window.addEventListener("beforeunload",tn);async function on(e){var i,t,n;const s=e.getParam("c");let r={name:(i=e.getParam("name"))!=null?i:"Untitled",content:""};if(s){const o=await se();r.content=o.decompressFromUrl((t=e.getParam("notebook"))!=null?t:"")}else r.content=(n=e.getParam("notebook"))!=null?n:"";if(!r.content){const o=await G("last-notebook");o&&o.name&&o.content&&(r.name=o.name+"",r.content=o.content+"")}return r}const sn=E({components:{SideBar:ze,UnsavedChangesModal:en},setup(){const e=C(),s=C(!0),r=ae(),i=nn();let t=on(i);const n=oe();t.then(c=>{n.shownNotebook.value=c}),Ae(()=>ie=n.hasUnsavedChanges.value);function o(c,m){!c||(c.innerHTML="",c.appendChild(new Ie({notebookContent:m,autoResize:!1,onSaveMessage:u=>{n.shownNotebook.value&&u.content&&(n.shownNotebook.value.content=u.content),n.saveShownFile()},onContentUpdateMessage:u=>{n.hasUnsavedChanges.value=!0,i.setParam("notebook",void 0),i.setParam("c",void 0),i.setParam("name",void 0),n.shownNotebook.value&&u.content&&(n.shownNotebook.value.content=u.content)},src:"https://unpkg.com/starboard-notebook@0.14.1/dist/index.html"})))}Y([e,n.shownNotebook],([c,m])=>{var u;o(c,(u=m==null?void 0:m.content)!=null?u:"")},{immediate:!0});const f=Ee(c=>{K("last-notebook",J(c))},500,{middle:!1});Y(n.shownNotebook,c=>{f(c)},{immediate:!0,deep:!0});async function h(){!await r.showIfUnsavedChanges(n)||(n.shownNotebook.value={name:"Untitled",content:""},n.hasUnsavedChanges.value=!1)}function g(){return n.saveShownFile()}return{starboardWrapContainer:e,showSidebar:s,newFile:h,unsavedChangesModal:r,saveShownFile:g}}}),k=e=>(L("data-v-570f9c24"),e=e(),T(),e),an={class:"navbar is-transparent"},rn=k(()=>l("span",{"aria-hidden":"true"},null,-1)),ln=k(()=>l("span",{"aria-hidden":"true"},null,-1)),cn=k(()=>l("span",{"aria-hidden":"true"},null,-1)),dn=[rn,ln,cn],un={class:"navbar-item has-dropdown is-hoverable"},fn=k(()=>l("a",{class:"navbar-link"}," File ",-1)),hn={class:"navbar-dropdown is-boxed"},mn=k(()=>l("a",{class:"navbar-item"}," Open File ",-1)),bn=k(()=>l("hr",{class:"navbar-divider"},null,-1)),pn=k(()=>l("a",{class:"navbar-item"}," Share ",-1)),_n=k(()=>l("hr",{class:"navbar-divider"},null,-1)),wn=k(()=>l("a",{class:"navbar-item"}," Export Markdown ",-1)),vn={class:"columns is-gapless full-height"},gn={ref:"starboardWrapContainer",class:"starboard-container column"};function yn(e,s,r,i,t,n){const o=Z("side-bar"),f=Z("unsaved-changes-modal");return N(),P(Q,null,[l("nav",an,[l("a",{role:"button",class:M(["navbar-burger menu-burger",{"is-active":e.showSidebar}]),onClick:s[0]||(s[0]=h=>e.showSidebar=!e.showSidebar),"aria-label":"menu","aria-expanded":"false"},dn,2),l("div",un,[fn,l("div",hn,[l("a",{class:"navbar-item",onClick:s[1]||(s[1]=h=>e.newFile())}," New File "),mn,bn,l("a",{class:"navbar-item",onClick:s[2]||(s[2]=(...h)=>e.saveShownFile&&e.saveShownFile(...h))}," Save "),pn,_n,wn])])]),l("div",vn,[Pe(o,{class:M(["column is-one-fifth side-bar",{"show-sidebar":e.showSidebar}])},null,8,["class"]),l("div",gn,null,512),l("div",{class:M(["column is-one-fifth",{"is-hidden":!e.showSidebar}])},null,2)]),e.unsavedChangesModal.isShowing.value?(N(),X(f,{key:0,onClose:s[3]||(s[3]=h=>e.unsavedChangesModal.closeCallback(h))})):Me("",!0)],64)}var kn=x(sn,[["render",yn],["__scopeId","data-v-570f9c24"]]);const Cn="starboard-editor",Sn="0.0.6";console.log(`${Cn} - ${Sn}`);Le(kn).mount("#app");
