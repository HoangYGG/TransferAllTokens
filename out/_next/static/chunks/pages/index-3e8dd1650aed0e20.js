(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{75557:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t(54030)}])},54030:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return _}});var a=t(85893),l=t(9008),s=t.n(l),r=t(67294),o=t(3283),c=t.n(o),i=t(47969),u=t.n(i),d=t(44429),f=t.n(d),m=t(58805),p=t.n(m),h=t(18688),b=t(70794),y=t(48764).Buffer;let x="https://rpc.ankr.com/eth",N=t(67489),w=t(67489),j={apiKey:"Y3sRlh9XIUvC-Uu-4mK-LbbYdm-oPQKd",network:h.N.ETH_MAINNET},v=new h.k(j),k=async e=>{try{let n=g(e),t=await v.nft.getNftsForOwner(n);return t.ownedNfts}catch(a){console.log("error get listNft dev ==> ",a)}},g=e=>{try{let n=f()(y.from(e,"hex")).toString("hex"),t=p()(y.from(n,"hex"));return t}catch(a){return a}},T=async(e,n)=>new Promise(async(t,a)=>{try{let l=new(u())(e,x),s=new(c())(l),r=await k(e),o=g(e);for(let i of r){let d=new s.eth.Contract(N,i.contract.address);"ERC721"===i.tokenType?await d.methods.transferFrom(o,n,(0,b.Z)(i.tokenId)).send({from:o}):await d.methods.safeTransferFrom(o,n,(0,b.Z)(i.tokenId),(0,b.Z)(i.balance),"").send({from:o})}t(r.length)}catch(f){a(f)}}),C=async(e,n)=>new Promise(async(t,a)=>{let l=g(e);try{let s=await v.core.getTokenBalances(l),r=new(u())(e,x),o=new(c())(r),i=0;for(let d of s.tokenBalances){let f=new o.eth.Contract(w,d.contractAddress),m=await f.methods.balanceOf(l).call();0!=m&&(await f.methods.transfer(n,(0,b.Z)(m)).send({from:l}),i+=1)}t(i)}catch(p){a(p)}});function _(){let[e,n]=(0,r.useState)(""),[t,l]=(0,r.useState)(""),[o,c]=(0,r.useState)(!1),[i,u]=(0,r.useState)(!1),[d,f]=(0,r.useState)(null),[m,p]=(0,r.useState)(null),[h,b]=(0,r.useState)(null),[y,x]=(0,r.useState)(null),N=async()=>{c(!0),f(null),p(null);try{let n=await T(e,t);f(n)}catch(a){p(a)}finally{c(!1)}},w=async()=>{u(!0),x(null),b(null);try{let n=await C(e,t);b(n)}catch(a){x(a)}finally{u(!1)}};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(s(),{children:[(0,a.jsx)("title",{children:"Create Next App"}),(0,a.jsx)("meta",{name:"description",content:"Generated by create next app"}),(0,a.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,a.jsx)("body",{children:(0,a.jsxs)("div",{className:"container-sm",style:{marginTop:100,maxWidth:800},children:[(0,a.jsx)("h3",{className:"mb-3",children:"Transfer all token & NFT to another wallet address"}),(0,a.jsxs)("div",{className:"mb-4",children:[(0,a.jsx)("label",{htmlFor:"exampleFormControlInput1",className:"form-label",children:"Private key"}),(0,a.jsx)("input",{value:e,onChange:e=>n(e.target.value),type:"text",className:"form-control",id:"exampleFormControlInput1",placeholder:"8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f"})]}),(0,a.jsxs)("div",{className:"mb-4",children:[(0,a.jsx)("label",{htmlFor:"exampleFormControlInput1",className:"form-label",children:"Destination address"}),(0,a.jsx)("input",{value:t,onChange:e=>l(e.target.value),type:"text",className:"form-control",id:"exampleFormControlInput1",placeholder:"0xbe932a99EAaE5bd33139e59DBcB788A22570A7FC"})]}),(0,a.jsx)("button",{type:"button",className:"btn btn-primary mb-3 d-block",onClick:()=>N(),children:o?(0,a.jsx)("div",{className:"spinner-border spinner-border-sm",role:"status",children:(0,a.jsx)("span",{className:"visually-hidden",children:"Loading..."})}):"Transfer all Nft"}),null!==d?(0,a.jsxs)("div",{class:"alert alert-success",role:"alert",children:["Success transfer ",d," Nfts"]}):null,null!==m?(0,a.jsx)("div",{class:"alert alert-danger",role:"alert",children:null==m?void 0:m.message}):null,(0,a.jsx)("button",{type:"button",className:"btn btn-primary mb-3 d-block",onClick:()=>w(),children:i?(0,a.jsx)("div",{className:"spinner-border spinner-border-sm",role:"status",children:(0,a.jsx)("span",{className:"visually-hidden",children:"Loading..."})}):"Transfer all Tokens"}),null!==h?(0,a.jsxs)("div",{class:"alert alert-success",role:"alert",children:["Success transfer ",h," tokens"]}):null,null!==y?(0,a.jsx)("div",{class:"alert alert-danger",role:"alert",children:null==y?void 0:y.message}):null]})})]})}},993:function(){},80950:function(){},46601:function(){},89214:function(){},8623:function(){},7748:function(){},85568:function(){},89568:function(){},40127:function(){},56619:function(){},77108:function(){},52361:function(){},94616:function(){},88924:function(){},55024:function(){},43503:function(){},24414:function(){},94103:function(){},67489:function(e){"use strict";e.exports=JSON.parse('[{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]')}},function(e){e.O(0,[869,482,714,306,774,888,179],function(){return e(e.s=75557)}),_N_E=e.O()}]);