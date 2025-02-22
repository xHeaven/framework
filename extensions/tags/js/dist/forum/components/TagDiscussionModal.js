"use strict";(self.webpackChunkmodule_exports=self.webpackChunkmodule_exports||[]).push([[371],{2440:(t,e,s)=>{s.r(e),s.d(e,{default:()=>L});var i=s(488),a=s.n(i),n=s(1137),r=s.n(n),l=s(8443),o=s.n(l),c=s(5233),d=s.n(c),h=s(3838),u=s(8805),g=s(954),p=s.n(g),f=s(5336),y=s.n(f),T=s(8607),b=s.n(T),x=s(9280),w=s.n(x),I=s(6661),v=s.n(I),N=s(3015),_=s.n(N),S=s(1821),C=s.n(S),A=s(1618),k=s(339),q=s(8968),M=s(4950),P=s.n(M);class R extends(P()){view(t){const{className:e,isToggled:s,...i}=this.attrs,a=s?"far fa-check-circle":"far fa-circle";return m(y(),Object.assign({},i,{icon:a,className:o()([e,s&&"Button--toggled"])}),t.children)}}flarum.reg.add("flarum-tags","forum/components/ToggleButton",R);class F extends(_()){constructor(){super(...arguments),(0,u.A)(this,"loading",!0),(0,u.A)(this,"tags",void 0),(0,u.A)(this,"selected",[]),(0,u.A)(this,"bypassReqs",!1),(0,u.A)(this,"filter",C()("")),(0,u.A)(this,"focused",!1),(0,u.A)(this,"navigator",new(w())),(0,u.A)(this,"indexTag",void 0)}static initAttrs(t){super.initAttrs(t),t.title||=d()(p().translator.trans("flarum-tags.lib.tag_selection_modal.title")),t.canSelect||=()=>!0,t.allowResetting??=!0,t.limits={min:{total:t.limits?.min?.total??-1/0,primary:t.limits?.min?.primary??-1/0,secondary:t.limits?.min?.secondary??-1/0},max:{total:t.limits?.max?.total??1/0,primary:t.limits?.max?.primary??1/0,secondary:t.limits?.max?.secondary??1/0}},function(t){if(t.min.primary>t.max.primary)throw new Error("The minimum number of primary tags allowed cannot be more than the maximum number of primary tags allowed.");if(t.min.secondary>t.max.secondary)throw new Error("The minimum number of secondary tags allowed cannot be more than the maximum number of secondary tags allowed.");if(t.min.total>t.max.primary+t.max.secondary)throw new Error("The minimum number of tags allowed cannot be more than the maximum number of primary and secondary tags allowed together.");if(t.max.total<t.min.primary+t.min.secondary)throw new Error("The maximum number of tags allowed cannot be less than the minimum number of primary and secondary tags allowed together.");if(t.min.total>t.max.total)throw new Error("The minimum number of tags allowed cannot be more than the maximum number of tags allowed.")}(t.limits)}oninit(t){super.oninit(t),this.navigator.onUp((()=>this.setIndex(this.getCurrentNumericIndex()-1,!0))).onDown((()=>this.setIndex(this.getCurrentNumericIndex()+1,!0))).onSelect(this.select.bind(this)).onRemove((()=>this.selected.splice(this.selected.length-1,1))),p().tagList.load(["parent"]).then((t=>{this.loading=!1,this.attrs.selectableTags&&(t=this.attrs.selectableTags(t)),this.tags=(0,A.A)(t),this.attrs.selectedTags&&this.attrs.selectedTags.map(this.addTag.bind(this)),this.indexTag=t[0],m.redraw()}))}className(){return o()("TagSelectionModal Modal--simple",this.attrs.className)}title(){return this.attrs.title}lengthWithCJK(t){let e=0;for(const s of t)e+=/[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF]/.test(s)?2:1;return e}content(){if(this.loading||!this.tags)return m(v(),null);const t=this.filter().toLowerCase(),e=this.primaryCount(),s=this.secondaryCount(),i=this.getFilteredTags(),a=Math.max(this.lengthWithCJK(d()(this.getInstruction(e,s))),this.lengthWithCJK(this.filter()));return[m("div",{className:"Modal-body"},m("div",{className:"TagSelectionModal-form"},m("div",{className:"TagSelectionModal-form-input"},m("div",{className:"TagsInput FormControl "+(this.focused?"focus":""),onclick:()=>this.$(".TagsInput input").focus()},m("span",{className:"TagsInput-selected"},this.selected.map((t=>m("span",{className:"TagsInput-tag",onclick:()=>{this.removeTag(t),this.onready()}},(0,k.A)(t))))),m("input",{className:"FormControl",placeholder:d()(this.getInstruction(e,s)),bidi:this.filter,style:{width:a+"ch"},onkeydown:this.navigator.navigate.bind(this.navigator),onfocus:()=>this.focused=!0,onblur:()=>this.focused=!1}))),m("div",{className:"TagSelectionModal-form-submit App-primaryControl"},m(y(),{type:"submit",className:"Button Button--primary",disabled:!this.meetsRequirements(e,s),icon:"fas fa-check"},p().translator.trans("flarum-tags.lib.tag_selection_modal.submit_button"))))),m("div",{className:"Modal-footer"},m("ul",{className:"TagSelectionModal-list SelectTagList"},i.map((e=>m("li",{"data-index":e.id(),className:o()("SelectTagListItem",{pinned:null!==e.position(),child:!!e.parent(),colored:!!e.color(),selected:this.selected.includes(e),active:this.indexTag===e}),style:{color:e.color()},onmouseover:()=>this.indexTag=e,onclick:this.toggleTag.bind(this,e)},m("i",{className:"SelectTagListItem-icon"},(0,q.A)(e,{className:"SelectTagListItem-tagIcon"}),m("i",{className:"icon TagIcon fas fa-check SelectTagListItem-checkIcon"})),m("span",{className:"SelectTagListItem-name"},b()(e.name(),t)),e.description()?m("span",{className:"SelectTagListItem-description"},e.description()):"")))),this.attrs.limits.allowBypassing&&m("div",{className:"TagSelectionModal-controls"},m(R,{className:"Button",onclick:()=>this.bypassReqs=!this.bypassReqs,isToggled:this.bypassReqs},p().translator.trans("flarum-tags.lib.tag_selection_modal.bypass_requirements"))))]}getFilteredTags(){const t=this.filter().toLowerCase(),e=this.primaryCount(),s=this.secondaryCount();let i=this.tags;return this.attrs.requireParentTag&&(i=i.filter((t=>{const e=t.parent();return null!==e&&(!1===e||this.selected.includes(e))}))),this.bypassReqs||(this.selected.length>=this.attrs.limits.max.total?i=i.filter((t=>this.selected.includes(t))):(e>=this.attrs.limits.max.primary&&(i=i.filter((t=>!t.isPrimaryParent()||this.selected.includes(t)))),s>=this.attrs.limits.max.secondary&&(i=i.filter((t=>t.isPrimaryParent()||this.selected.includes(t)))))),t&&(i=i.filter((e=>e.name().toLowerCase().includes(t)))),this.indexTag&&i.includes(this.indexTag)||(this.indexTag=i[0]),i}primaryCount(){return this.selected.filter((t=>t.isPrimaryParent())).length}secondaryCount(){return this.selected.filter((t=>!t.isPrimaryParent())).length}meetsRequirements(t,e){return!!(this.bypassReqs||this.attrs.allowResetting&&0===this.selected.length)||!(this.selected.length<this.attrs.limits.min.total)&&t>=this.attrs.limits.min.primary&&e>=this.attrs.limits.min.secondary}addTag(t){if(t&&this.attrs.canSelect(t)){if(this.attrs.onSelect&&this.attrs.onSelect(t,this.selected),this.attrs.requireParentTag){const e=t.parent();e&&!this.selected.includes(e)&&this.selected.push(e)}this.selected.includes(t)||this.selected.push(t)}}removeTag(t){const e=this.selected.indexOf(t);-1!==e&&(this.selected.splice(e,1),this.attrs.requireParentTag&&this.selected.filter((e=>e.parent()===t)).forEach(this.removeTag.bind(this)),this.attrs.onDeselect&&this.attrs.onDeselect(t,this.selected))}toggleTag(t){this.tags&&(this.selected.includes(t)?this.removeTag(t):this.addTag(t),this.filter()&&(this.filter(""),this.indexTag=this.tags[0]),this.onready())}getInstruction(t,e){if(this.bypassReqs)return"";if(t<this.attrs.limits.min.primary){const e=this.attrs.limits.min.primary-t;return d()(p().translator.trans("flarum-tags.lib.tag_selection_modal.choose_primary_placeholder",{count:e}))}if(e<this.attrs.limits.min.secondary){const t=this.attrs.limits.min.secondary-e;return d()(p().translator.trans("flarum-tags.lib.tag_selection_modal.choose_secondary_placeholder",{count:t}))}if(this.selected.length<this.attrs.limits.min.total){const t=this.attrs.limits.min.total-this.selected.length;return d()(p().translator.trans("flarum-tags.lib.tag_selection_modal.choose_tags_placeholder",{count:t}))}return""}onsubmit(t){t.preventDefault(),this.attrs.onsubmit&&this.attrs.onsubmit(this.selected),this.hide()}select(t){t.metaKey||t.ctrlKey||this.indexTag&&this.selected.includes(this.indexTag)?this.selected.length&&this.$('button[type="submit"]').click():this.indexTag&&this.getItem(this.indexTag)[0].dispatchEvent(new Event("click"))}selectableItems(){return this.$(".TagSelectionModal-list > li")}getCurrentNumericIndex(){return this.indexTag?this.selectableItems().index(this.getItem(this.indexTag)):-1}getItem(t){return this.selectableItems().filter(`[data-index="${t.id()}"]`)}setIndex(t,e){const s=this.selectableItems(),i=s.parent();t<0?t=s.length-1:t>=s.length&&(t=0);const a=s.eq(t);if(this.indexTag=p().store.getById("tags",a.attr("data-index")),m.redraw(),e&&this.indexTag){const t=i.scrollTop(),e=i.offset().top,s=e+i.outerHeight(),n=a.offset().top,r=n+a.outerHeight();let l;n<e?l=t-e+n-parseInt(i.css("padding-top"),10):r>s&&(l=t-s+r+parseInt(i.css("padding-bottom"),10)),void 0!==l&&i.stop(!0).animate({scrollTop:l},100)}}}flarum.reg.add("flarum-tags","common/components/TagSelectionModal",F);class L extends F{static initAttrs(t){super.initAttrs(t);const e=t.discussion?a().translator.trans("flarum-tags.forum.choose_tags.edit_title",{title:m("em",null,t.discussion.title())}):a().translator.trans("flarum-tags.forum.choose_tags.title");t.className=o()(t.className,"TagDiscussionModal"),t.title=d()(e),t.allowResetting=!!a().forum.attribute("canBypassTagCounts"),t.limits={allowBypassing:t.allowResetting,max:{primary:a().forum.attribute("maxPrimaryTags"),secondary:a().forum.attribute("maxSecondaryTags")},min:{primary:a().forum.attribute("minPrimaryTags"),secondary:a().forum.attribute("minSecondaryTags")}},t.requireParentTag=!0,t.selectableTags=()=>(0,h.A)(t.discussion),t.selectedTags??=t.discussion?.tags()||[],t.canSelect=t=>t.canStartDiscussion();const s=t.onsubmit||null;t.onsubmit=function(e){const i=t.discussion;i&&i.save({relationships:{tags:e}}).then((()=>{a().current.matches(r())&&a().current.get("stream").update(),m.redraw()})),s&&s(e)}}}flarum.reg.add("flarum-tags","forum/components/TagDiscussionModal",L)}}]);
//# sourceMappingURL=TagDiscussionModal.js.map