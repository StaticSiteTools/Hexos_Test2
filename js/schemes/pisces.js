var Affix={init:function(element,options){this.element=element,this.offset=options||0,this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition(),window.addEventListener("scroll",this.checkPosition.bind(this)),window.addEventListener("click",this.checkPositionWithEventLoop.bind(this)),window.matchMedia("(min-width: 992px)").addListener(event=>{event.matches&&(this.offset=NexT.utils.getAffixParam(),this.checkPosition())})},getState:function(scrollHeight,height,offsetTop,offsetBottom){let scrollTop=window.scrollY,targetHeight=window.innerHeight;if(null!=offsetTop&&"top"===this.affixed)return document.querySelector(".content-wrap").offsetHeight<offsetTop?"top":scrollTop<offsetTop&&"top";if("bottom"===this.affixed)return null!=offsetTop?!(this.unpin<=this.element.getBoundingClientRect().top)&&"bottom":!(scrollTop+targetHeight<=scrollHeight-offsetBottom)&&"bottom";let initializing=null===this.affixed,colliderTop=initializing?scrollTop:this.element.getBoundingClientRect().top+scrollTop;return null!=offsetTop&&scrollTop<=offsetTop?"top":null!=offsetBottom&&colliderTop+(initializing?targetHeight:height)>=scrollHeight-offsetBottom&&"bottom"},getPinnedOffset:function(){return this.pinnedOffset?this.pinnedOffset:(this.element.classList.remove("affix-top","affix-bottom"),this.element.classList.add("affix"),this.pinnedOffset=this.element.getBoundingClientRect().top)},checkPositionWithEventLoop(){setTimeout(this.checkPosition.bind(this),1)},checkPosition:function(){if("none"===window.getComputedStyle(this.element).display)return;let height=this.element.offsetHeight,{offset:offset}=this,offsetTop=offset.top,offsetBottom=offset.bottom,{scrollHeight:scrollHeight}=document.body,affix=this.getState(scrollHeight,height,offsetTop,offsetBottom);if(this.affixed!==affix){null!=this.unpin&&(this.element.style.top="");let affixType="affix"+(affix?"-"+affix:"");this.affixed=affix,this.unpin="bottom"===affix?this.getPinnedOffset():null,this.element.classList.remove("affix","affix-top","affix-bottom"),this.element.classList.add(affixType)}"bottom"===affix&&(this.element.style.top=scrollHeight-height-offsetBottom+"px")}};NexT.utils.getAffixParam=function(){const sidebarOffset=CONFIG.sidebar.offset||12;let headerOffset=document.querySelector(".header-inner").offsetHeight,footerOffset=document.querySelector(".footer").offsetHeight;return document.querySelector(".sidebar").style.marginTop=headerOffset+sidebarOffset+"px",{top:headerOffset,bottom:footerOffset}},window.addEventListener("DOMContentLoaded",()=>{Affix.init(document.querySelector(".sidebar-inner"),NexT.utils.getAffixParam())});