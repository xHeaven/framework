(()=>{var t,e,s={974:(t,e,s)=>{"use strict";s.d(e,{Z:()=>o});var r=s(836),a=s.n(r);function o(t,e,s){void 0===e&&(e={}),void 0===s&&(s={});const r=t&&t.icon(),{useColor:o=!0}=s;return e.className=a()([e.className,"icon",r?t.icon():"TagIcon"]),t&&o?(e.style=e.style||{},e.style["--color"]=t.color(),r&&(e.style.color=t.color())):t||(e.className+=" untagged"),r?m("i",e):m("span",e)}flarum.reg.add("flarum-tags","common/helpers/tagIcon",o)},924:(t,e,s)=>{"use strict";s.d(e,{Z:()=>g});var r=s(780),a=s.n(r),o=s(678),n=s.n(o),i=s(836),l=s.n(i),c=s(679),u=s.n(c),d=s(974);function g(t,e){void 0===e&&(e={}),e.style=e.style||{},e.className="TagLabel "+(e.className||"");const s=a()(e,"link"),r=t?t.name():app.translator.trans("flarum-tags.lib.deleted_tag_text");if(t){const r=t.color();r&&(e.style["--tag-bg"]=r,e.className=l()(e.className,"colored",u()(r))),s&&(e.title=t.description()||"",e.href=app.route("tag",{tags:t.slug()})),t.isChild()&&(e.className+=" TagLabel--child")}else e.className+=" untagged";return m(s?n():"span",e,m("span",{className:"TagLabel-text"},t&&t.icon()&&(0,d.Z)(t,{className:"TagLabel-icon"},{useColor:!1}),m("span",{className:"TagLabel-name"},r)))}flarum.reg.add("flarum-tags","common/helpers/tagLabel",g)},270:()=>{},648:(t,e,s)=>{"use strict";function r(t){return t.slice(0).sort(((t,e)=>{const s=t.position(),r=e.position();if(null===s&&null===r)return e.discussionCount()-t.discussionCount();if(null===r)return-1;if(null===s)return 1;const a=t.parent(),o=e.parent();return a===o?s-r:a&&o?a.position()-o.position():a?a===e?1:a.position()-r:o?o===t?-1:s-o.position():0}))}s.d(e,{Z:()=>r}),flarum.reg.add("flarum-tags","common/utils/sortTags",r)},689:(t,e,s)=>{"use strict";s.d(e,{l:()=>pt});var r=s(892),a=s.n(r),o=s(905),n=s(351),i=s.n(n);class l{constructor(){(0,o.Z)(this,"loadedIncludes",void 0)}async load(t){if(void 0===t&&(t=[]),!this.loadedIncludes)return this.query(t);const e=t.filter((t=>!this.loadedIncludes.has(t)));return 0===e.length?Promise.resolve(i().store.all("tags")):this.query(e)}async query(t){return void 0===t&&(t=[]),null!=this.loadedIncludes||(this.loadedIncludes=new Set),i().store.find("tags",{include:t.join(",")}).then((e=>(t.forEach((t=>this.loadedIncludes.add(t))),e)))}}flarum.reg.add("flarum-tags","common/states/TagListState",l);const c=flarum.reg.get("core","common/extend"),u=flarum.reg.get("core","forum/components/IndexPage");var d=s.n(u);const g=flarum.reg.get("core","common/components/Separator");var p=s.n(g);const f=flarum.reg.get("core","common/components/LinkButton");var h=s.n(f),v=s(678),b=s.n(v),T=s(836),y=s.n(T),x=s(974);class w extends(h()){view(t){const e=this.attrs.model,s=e&&e.description(),r=y()("TagLinkButton hasIcon",{child:e.isChild()},this.attrs.className);return m(b(),{className:r,href:this.attrs.route,style:e?{"--color":e.color()}:void 0,title:s||void 0},(0,x.Z)(e,{className:"Button-icon"}),m("span",{className:"Button-label"},e?e.name():app.translator.trans("flarum-tags.forum.index.untagged_link")))}static initAttrs(t){super.initAttrs(t);const e=t.model;t.params.tags=e?e.slug():"untagged",t.route=app.route("tag",t.params)}}flarum.reg.add("flarum-tags","forum/components/TagLinkButton",w);const N=flarum.reg.get("core","common/components/Page");var k=s.n(N),C=s(149),_=s.n(C);const P=flarum.reg.get("core","common/helpers/listItems");var D=s.n(P);const S=flarum.reg.get("core","common/utils/ItemList");var A=s.n(S);const I=flarum.reg.get("core","common/helpers/humanTime");var L=s.n(I),Z=s(679),M=s.n(Z),j=s(924),E=s(648);class B extends(k()){oninit(t){super.oninit(t),app.history.push("tags",app.translator.trans("flarum-tags.forum.header.back_to_tags_tooltip")),this.tags=[];const e=app.preloadedApiDocument();e?this.tags=(0,E.Z)(e.filter((t=>!t.isChild()))):(this.loading=!0,app.tagList.load(["children","lastPostedDiscussion","parent"]).then((()=>{this.tags=(0,E.Z)(app.store.all("tags").filter((t=>!t.isChild()))),this.loading=!1,m.redraw()})))}oncreate(t){super.oncreate(t),app.setTitle(app.translator.trans("flarum-tags.forum.all_tags.meta_title_text")),app.setTitleCount(0)}view(){return m("div",{className:"TagsPage"},this.pageContent().toArray())}pageContent(){const t=new(A());return t.add("hero",this.hero(),100),t.add("main",m("div",{className:"container"},this.mainContent().toArray()),10),t}mainContent(){const t=new(A());return t.add("sidebar",this.sidebar(),100),t.add("content",this.content(),10),t}content(){return m("div",{className:"TagsPage-content sideNavOffset"},this.contentItems().toArray())}contentItems(){const t=new(A());if(this.loading)t.add("loading",m(_(),null));else{const e=this.tags.filter((t=>null!==t.position())),s=this.tags.filter((t=>null===t.position()));t.add("tagTiles",this.tagTileListView(e),100),s.length&&t.add("cloud",this.cloudView(s),10)}return t}hero(){return d().prototype.hero()}sidebar(){return m("nav",{className:"TagsPage-nav IndexPage-nav sideNav"},m("ul",null,D()(this.sidebarItems().toArray())))}sidebarItems(){return d().prototype.sidebarItems()}tagTileListView(t){return m("ul",{className:"TagTiles"},t.map(this.tagTileView.bind(this)))}tagTileView(t){const e=t.lastPostedDiscussion(),s=(0,E.Z)(t.children()||[]);return m("li",{className:y()("TagTile",{colored:t.color()},M()(t.color())),style:{"--tag-bg":t.color()}},m(b(),{className:"TagTile-info",href:app.route.tag(t)},t.icon()&&(0,x.Z)(t,{},{useColor:!1}),m("h3",{className:"TagTile-name"},t.name()),m("p",{className:"TagTile-description"},t.description()),!!s&&m("div",{className:"TagTile-children"},s.map((t=>[m(b(),{href:app.route.tag(t)},t.name())," "])))),e?m(b(),{className:"TagTile-lastPostedDiscussion",href:app.route.discussion(e,e.lastPostNumber())},m("span",{className:"TagTile-lastPostedDiscussion-title"},e.title()),L()(e.lastPostedAt())):m("span",{className:"TagTile-lastPostedDiscussion"}))}cloudView(t){return m("div",{className:"TagCloud"},t.map((t=>[(0,j.Z)(t,{link:!0})," "])))}}flarum.reg.add("flarum-tags","forum/components/TagsPage",B);const O=flarum.reg.get("core","forum/states/DiscussionListState");var H=s.n(O);const R=flarum.reg.get("core","forum/states/GlobalSearchState");var q=s.n(R),V=s(433),$=s.n(V);class K extends($()){view(){const t=this.attrs.model,e=t.color();return m("header",{className:y()("Hero","TagHero",{"TagHero--colored":e,[M()(e)]:e}),style:e?{"--hero-bg":e}:void 0},m("div",{className:"container"},m("div",{className:"containerNarrow"},m("h1",{className:"Hero-title"},t.icon()&&(0,x.Z)(t,{},{useColor:!1})," ",t.name()),m("div",{className:"Hero-subtitle"},t.description()))))}}flarum.reg.add("flarum-tags","forum/components/TagHero",K);const U=t=>a().store.all("tags").find((e=>0===e.slug().localeCompare(t,void 0,{sensitivity:"base"}))),z=flarum.reg.get("core","forum/components/DiscussionListItem");var F=s.n(z);const G=flarum.reg.get("core","forum/components/DiscussionHero");var J=s.n(G);function Q(t,e){void 0===e&&(e={});const s=[],{link:r,...a}=e;return a.className=y()("TagsLabel",a.className),t?(0,E.Z)(t).forEach((e=>{(e||1===t.length)&&s.push((0,j.Z)(e,{link:r}))})):s.push((0,j.Z)()),m("span",a,s)}s(780),flarum.reg.add("flarum-tags","common/helpers/tagsLabel",Q);const W=flarum.reg.get("core","forum/utils/DiscussionControls");var X=s.n(W),Y=s(645),tt=s.n(Y);flarum.reg.addChunkModule("642","884","flarum-tags","forum/components/TagDiscussionModal"),flarum.reg.addChunkModule("642","884","flarum-tags","/home/runner/work/framework/framework/extensions/tags/js/src/forum/components/TagDiscussionModal.tsx"),flarum.reg.addChunkModule("642","884","flarum-tags","/home/runner/work/framework/framework/extensions/tags/js/src/common/components/TagSelectionModal.tsx"),flarum.reg.addChunkModule("642","884","flarum-tags","/home/runner/work/framework/framework/extensions/tags/js/src/forum/components/ToggleButton.js");var et=s(490);const st=flarum.reg.get("core","common/extenders");var rt=s.n(st);const at=flarum.reg.get("core","common/models/Discussion");var ot=s.n(at);const nt=flarum.reg.get("core","forum/components/EventPost");var it=s.n(nt);class lt extends(it()){static initAttrs(t){super.initAttrs(t);const e=t.post.content()[0],s=t.post.content()[1];function r(t,e){return t.filter((t=>-1===e.indexOf(t))).map((t=>app.store.getById("tags",t)))}t.tagsAdded=r(s,e),t.tagsRemoved=r(e,s)}icon(){return"fas fa-tag"}descriptionKey(){return this.attrs.tagsAdded.length?this.attrs.tagsRemoved.length?"flarum-tags.forum.post_stream.added_and_removed_tags_text":"flarum-tags.forum.post_stream.added_tags_text":"flarum-tags.forum.post_stream.removed_tags_text"}descriptionData(){const t={};return this.attrs.tagsAdded.length&&(t.tagsAdded=app.translator.trans("flarum-tags.forum.post_stream.tags_text",{tags:Q(this.attrs.tagsAdded,{link:!0}),count:this.attrs.tagsAdded.length})),this.attrs.tagsRemoved.length&&(t.tagsRemoved=app.translator.trans("flarum-tags.forum.post_stream.tags_text",{tags:Q(this.attrs.tagsRemoved,{link:!0}),count:this.attrs.tagsRemoved.length})),t}}flarum.reg.add("flarum-tags","forum/components/DiscussionTaggedPost",lt);const ct=flarum.reg.get("core","common/utils/computed");var ut=s.n(ct);const mt=flarum.reg.get("core","common/Model");var dt=s.n(mt);class gt extends(dt()){name(){return dt().attribute("name").call(this)}slug(){return dt().attribute("slug").call(this)}description(){return dt().attribute("description").call(this)}color(){return dt().attribute("color").call(this)}backgroundUrl(){return dt().attribute("backgroundUrl").call(this)}backgroundMode(){return dt().attribute("backgroundMode").call(this)}icon(){return dt().attribute("icon").call(this)}position(){return dt().attribute("position").call(this)}parent(){return dt().hasOne("parent").call(this)}children(){return dt().hasMany("children").call(this)}defaultSort(){return dt().attribute("defaultSort").call(this)}isChild(){return dt().attribute("isChild").call(this)}isHidden(){return dt().attribute("isHidden").call(this)}discussionCount(){return dt().attribute("discussionCount").call(this)}lastPostedAt(){return dt().attribute("lastPostedAt",dt().transformDate).call(this)}lastPostedDiscussion(){return dt().hasOne("lastPostedDiscussion").call(this)}isRestricted(){return dt().attribute("isRestricted").call(this)}canStartDiscussion(){return dt().attribute("canStartDiscussion").call(this)}canAddToDiscussion(){return dt().attribute("canAddToDiscussion").call(this)}isPrimary(){return ut()("position","parent",((t,e)=>null!==t&&!1===e)).call(this)}}flarum.reg.add("flarum-tags","common/models/Tag",gt);const pt=[(new(rt().Store)).add("tags",gt),(new(rt().Routes)).add("tags","/tags",B).add("tag","/t/:tags",d()).helper("tag",(t=>a().route("tag",{tags:t.slug()}))),(new(rt().PostTypes)).add("discussionTagged",lt),new(rt().Model)(ot()).hasMany("tags").attribute("canTag")];a().initializers.add("flarum-tags",(function(){a().tagList=new l,(0,c.extend)(d().prototype,"navItems",(function(t){if(t.add("tags",m(h(),{icon:"fas fa-th-large",href:a().route("tags")},a().translator.trans("flarum-tags.forum.index.tags_link")),-10),a().current.matches(B))return;t.add("separator",m(p(),null),-12);const e=a().search.stickyParams(),s=a().store.all("tags"),r=this.currentTag(),o=s=>{let a=r===s;!a&&r&&(a=r.parent()===s),t.add("tag"+s.id(),m(w,{model:s,params:e,active:a},null==s?void 0:s.name()),-14)};(0,E.Z)(s).filter((t=>null!==t.position()&&(!t.isChild()||r&&(t.parent()===r||t.parent()===r.parent())))).forEach(o);const n=s.filter((t=>null===t.position())).sort(((t,e)=>e.discussionCount()-t.discussionCount()));n.splice(0,3).forEach(o),n.length&&t.add("moreTags",m(h(),{href:a().route("tags")},a().translator.trans("flarum-tags.forum.index.more_link")),-16)})),d().prototype.currentTag=function(){if(this.currentActiveTag)return this.currentActiveTag;const t=a().search.params().tags;let e=null;if(t&&(e=U(t)),t&&!e||e&&!e.isChild()&&!e.children()){if(this.currentTagLoading)return;this.currentTagLoading=!0,a().store.find("tags",t,{include:"children,children.parent,parent,state"}).then((()=>{this.currentActiveTag=U(t),m.redraw()})).finally((()=>{this.currentTagLoading=!1}))}return e?(this.currentActiveTag=e,this.currentActiveTag):void 0},(0,c.override)(d().prototype,"hero",(function(t){const e=this.currentTag();return e?m(K,{model:e}):t()})),(0,c.extend)(d().prototype,"view",(function(t){const e=this.currentTag();e&&(t.attrs.className+=" IndexPage--tag"+e.id())})),(0,c.extend)(d().prototype,"setTitle",(function(){const t=this.currentTag();t&&a().setTitle(t.name())})),(0,c.extend)(d().prototype,"sidebarItems",(function(t){const e=this.currentTag();if(e){const s=e.color(),r=e.canStartDiscussion()||!a().session.user,o=t.get("newDiscussion");s&&(o.attrs.className=y()([o.attrs.className,"Button--tagColored",M()(s)]),o.attrs.style={"--color":s}),o.attrs.disabled=!r,o.children=a().translator.trans(r?"core.forum.index.start_discussion_button":"core.forum.index.cannot_start_discussion_button")}})),(0,c.extend)(q().prototype,"params",(function(t){t.tags=m.route.param("tags")})),(0,c.extend)(H().prototype,"requestParams",(function(t){var e;if("string"==typeof t.include?t.include=[t.include]:null==(e=t.include)||e.push("tags","tags.parent"),this.params.tags){var s;const e=null!=(s=t.filter)?s:{};e.tag=this.params.tags;const r=e.q;r&&(e.q="".concat(r," tag:").concat(this.params.tags)),t.filter=e}})),(0,c.extend)(F().prototype,"infoItems",(function(t){const e=this.attrs.discussion.tags();e&&e.length&&t.add("tags",Q(e),10)})),(0,c.extend)(J().prototype,"view",(function(t){const e=(0,E.Z)(this.attrs.discussion.tags());if(e&&e.length){const s=e[0].color();s&&(t.attrs.style={"--hero-bg":s},t.attrs.className=y()(t.attrs.className,"DiscussionHero--colored",M()(s)))}})),(0,c.extend)(J().prototype,"items",(function(t){const e=this.attrs.discussion.tags();e&&e.length&&t.add("tags",Q(e,{link:!0}),5)})),(0,c.extend)(X(),"moderationControls",(function(t,e){e.canTag()&&t.add("tags",m(tt(),{icon:"fas fa-tag",onclick:()=>app.modal.show((()=>s.e(642).then(s.bind(s,884))),{discussion:e})},app.translator.trans("flarum-tags.forum.discussion_controls.edit_tags_button")))})),(0,c.extend)(d().prototype,"newDiscussionAction",(function(t){const e=this.currentTag();if(e){const s=e.parent(),r=s?[s,e]:[e];t.then((t=>t.fields.tags=r))}else app.composer.fields.tags=[]})),(0,c.extend)("flarum/forum/components/DiscussionComposer","oninit",(function(){app.tagList.load(["parent"]).then((()=>m.redraw())),this.constructor.prototype.chooseTags=function(){(0,et.Z)().length&&app.modal.show((()=>s.e(642).then(s.bind(s,884))),{selectedTags:(this.composer.fields.tags||[]).slice(0),onsubmit:t=>{this.composer.fields.tags=t,this.$("textarea").focus()}})}})),(0,c.extend)("flarum/forum/components/DiscussionComposer","headerItems",(function(t){const e=this.composer.fields.tags||[],s=(0,et.Z)();t.add("tags",m("a",{className:y()(["DiscussionComposer-changeTags",!s.length&&"disabled"]),onclick:this.chooseTags.bind(this)},e.length?Q(e):m("span",{className:"TagLabel untagged"},app.translator.trans("flarum-tags.forum.composer_discussion.choose_tags_link"))),10)})),(0,c.override)("flarum/forum/components/DiscussionComposer","onsubmit",(function(t){const e=this.composer.fields.tags||[],r=e.filter((t=>null!==t.position()&&!t.isChild())),a=e.filter((t=>null===t.position())),o=(0,et.Z)(),n=parseInt(app.forum.attribute("minPrimaryTags")),i=parseInt(app.forum.attribute("minSecondaryTags")),l=parseInt(app.forum.attribute("maxPrimaryTags")),c=parseInt(app.forum.attribute("maxSecondaryTags"));(!e.length&&0!==l&&0!==c||r.length<n||a.length<i)&&o.length?app.modal.show((()=>s.e(642).then(s.bind(s,884))),{selectedTags:e,onsubmit:e=>{this.composer.fields.tags=e,t()}}):t()})),(0,c.extend)("flarum/forum/components/DiscussionComposer","data",(function(t){t.relationships=t.relationships||{},t.relationships.tags=this.composer.fields.tags}))}))},490:(t,e,s)=>{"use strict";function r(t){let e=app.store.all("tags");if(t){const s=t.tags()||[];e=e.filter((t=>t.canAddToDiscussion()||s.includes(t)))}else e=e.filter((t=>t.canStartDiscussion()));return e}s.d(e,{Z:()=>r}),flarum.reg.add("flarum-tags","forum/utils/getSelectableTags",r)},433:t=>{"use strict";t.exports=flarum.reg.get("core","common/Component")},351:t=>{"use strict";t.exports=flarum.reg.get("core","common/app")},645:t=>{"use strict";t.exports=flarum.reg.get("core","common/components/Button")},678:t=>{"use strict";t.exports=flarum.reg.get("core","common/components/Link")},149:t=>{"use strict";t.exports=flarum.reg.get("core","common/components/LoadingIndicator")},686:t=>{"use strict";t.exports=flarum.reg.get("core","common/components/Modal")},291:t=>{"use strict";t.exports=flarum.reg.get("core","common/helpers/highlight")},679:t=>{"use strict";t.exports=flarum.reg.get("core","common/helpers/textContrastClass")},657:t=>{"use strict";t.exports=flarum.reg.get("core","common/utils/KeyboardNavigatable")},636:t=>{"use strict";t.exports=flarum.reg.get("core","common/utils/Stream")},836:t=>{"use strict";t.exports=flarum.reg.get("core","common/utils/classList")},780:t=>{"use strict";t.exports=flarum.reg.get("core","common/utils/extract")},596:t=>{"use strict";t.exports=flarum.reg.get("core","common/utils/extractText")},892:t=>{"use strict";t.exports=flarum.reg.get("core","forum/app")},232:t=>{"use strict";t.exports=flarum.reg.get("core","forum/components/DiscussionPage")},905:(t,e,s)=>{"use strict";function r(t){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(t)}function a(t,e,s){return(e=function(t){var e=function(t,e){if("object"!==r(t)||null===t)return t;var s=t[Symbol.toPrimitive];if(void 0!==s){var a=s.call(t,e);if("object"!==r(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t,"string");return"symbol"===r(e)?e:String(e)}(e))in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}s.d(e,{Z:()=>a})}},r={};function a(t){var e=r[t];if(void 0!==e)return e.exports;var o=r[t]={exports:{}};return s[t](o,o.exports,a),o.exports}a.m=s,a.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return a.d(e,{a:e}),e},a.d=(t,e)=>{for(var s in e)a.o(e,s)&&!a.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},a.f={},a.e=t=>Promise.all(Object.keys(a.f).reduce(((e,s)=>(a.f[s](t,e),e)),[])),a.u=t=>"forum/components/TagDiscussionModal.js",a.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),a.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),t={},e="module.exports:",a.l=(s,r,o,n)=>{if(t[s])t[s].push(r);else{var i,l;if(void 0!==o)for(var c=document.getElementsByTagName("script"),u=0;u<c.length;u++){var m=c[u];if(m.getAttribute("src")==s||m.getAttribute("data-webpack")==e+o){i=m;break}}i||(l=!0,(i=document.createElement("script")).charset="utf-8",i.timeout=120,a.nc&&i.setAttribute("nonce",a.nc),i.setAttribute("data-webpack",e+o),i.src=s),t[s]=[r];var d=(e,r)=>{i.onerror=i.onload=null,clearTimeout(g);var a=t[s];if(delete t[s],i.parentNode&&i.parentNode.removeChild(i),a&&a.forEach((t=>t(r))),e)return e(r)},g=setTimeout(d.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=d.bind(null,i.onerror),i.onload=d.bind(null,i.onload),l&&document.head.appendChild(i)}},a.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},(()=>{var t;a.g.importScripts&&(t=a.g.location+"");var e=a.g.document;if(!t&&e&&(e.currentScript&&(t=e.currentScript.src),!t)){var s=e.getElementsByTagName("script");s.length&&(t=s[s.length-1].src)}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),a.p=t})(),a.f.compat=(t,e)=>{const s=a.l;a.l=flarum.reg.loadChunk.bind(flarum.reg,s)},(()=>{var t={315:0};a.f.j=(e,s)=>{var r=a.o(t,e)?t[e]:void 0;if(0!==r)if(r)s.push(r[2]);else{var o=new Promise(((s,a)=>r=t[e]=[s,a]));s.push(r[2]=o);var n=a.p+a.u(e),i=new Error;a.l(n,(s=>{if(a.o(t,e)&&(0!==(r=t[e])&&(t[e]=void 0),r)){var o=s&&("load"===s.type?"missing":s.type),n=s&&s.target&&s.target.src;i.message="Loading chunk "+e+" failed.\n("+o+": "+n+")",i.name="ChunkLoadError",i.type=o,i.request=n,r[1](i)}}),"chunk-"+e,e)}};var e=(e,s)=>{var r,o,[n,i,l]=s,c=0;if(n.some((e=>0!==t[e]))){for(r in i)a.o(i,r)&&(a.m[r]=i[r]);l&&l(a)}for(e&&e(s);c<n.length;c++)o=n[c],a.o(t,o)&&t[o]&&t[o][0](),t[o]=0},s=self.webpackChunkmodule_exports=self.webpackChunkmodule_exports||[];s.forEach(e.bind(null,0)),s.push=e.bind(null,s.push.bind(s))})();var o={};(()=>{"use strict";a.r(o),a.d(o,{extend:()=>s.l});var t=a(270),e={};for(const s in t)"default"!==s&&(e[s]=()=>t[s]);a.d(o,e);var s=a(689)})(),module.exports=o})();
//# sourceMappingURL=forum.js.map