import{_ as c,M as m,c as t,a as o,F as d,r as u,b as i,w as _,T as v,o as a,d as p,e as f}from"./index-ChhdwvPk.js";const b={name:"MusicView",mixins:[m],computed:{albums(){return this.musicData.filter(e=>!e.hidden)}},beforeRouteLeave(){this.selectedItem=null}},k={class:"music-container"},h={class:"music-grid"},C=["src","onClick"],M={key:0,class:"album-overlay-container"};function I(e,n,g,w,y,r){const l=f("MorvAlbum");return a(),t("main",k,[o("div",h,[(a(!0),t(d,null,u(r.albums,s=>(a(),t("div",{key:s.title,class:"album-entry"},[o("img",{src:e.getImgSrc(s.title),class:"album-artwork",onClick:V=>e.itemClick(s)},null,8,C)]))),128))]),i(v,{name:"fade-in"},{default:_(()=>[e.selectedItem?(a(),t("div",M,[i(l,{album:e.selectedItem,onCloseOverlay:n[0]||(n[0]=s=>e.selectedItem=null)},null,8,["album"])])):p("",!0)]),_:1})])}const B=c(b,[["render",I],["__scopeId","data-v-6c12a582"]]);export{B as default};
