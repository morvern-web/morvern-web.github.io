import{_ as m,M as d,c as i,F as l,r as _,o as s,a,t as o,b as r}from"./index-76iC3nWt.js";const h={name:"HomeView",mixins:[d],computed:{newsItems(){return this.newsData.filter(t=>this.$date(t.date)<=this.$date())}},methods:{itemClick(t,c=!1){if(c){window.open(t,"_blank");return}this.$emit("routeChange",t)}}},u={class:"news-container"},g={class:"news-item"},p={class:"news-item-date"},k={class:"news-item-title"},M=["innerHTML"],f=["innerHTML"],y={key:1,class:"news-item-image-container"},C=["src","onClick"];function $(t,c,b,v,T,n){return s(),i("main",u,[(s(!0),i(l,null,_(n.newsItems,e=>(s(),i("div",{key:e.date,class:"news-item-container"},[a("div",g,[a("h6",p,o(t.$date(e.date).format("DD MMMM YYYY")),1),a("h2",k,o(e.title.toUpperCase()),1),a("h6",{innerHTML:e.text,class:"news-item-text"},null,8,M),e.body?(s(),i("div",{key:0,class:"news-item-body",innerHTML:e.body},null,8,f)):r("",!0),e.image?(s(),i("div",y,[a("img",{src:t.getImgSrc(e.image,e.imgType),class:"news-item-image",onClick:w=>e.imgUrl?n.itemClick(e.imgUrl,!0):n.itemClick({name:`${e.imgType}item`,item:e.imgItem})},null,8,C)])):r("",!0)])]))),128))])}const H=m(h,[["render",$],["__scopeId","data-v-2c21400b"]]);export{H as default};