"use strict";(self.webpackChunkmodule_exports=self.webpackChunkmodule_exports||[]).push([[301],{684:(e,s,t)=>{t.d(s,{A:()=>A});var a=t(488),r=t.n(a),o=t(950),i=t.n(o),n=t(336),l=t.n(n),d=t(443),c=t.n(d),u=t(88),g=t.n(u),h=t(917),f=t.n(h),p=t(521),v=t.n(p),b=t(167),_=t.n(b),N=t(906),M=t.n(N);class y extends(i()){view(e){const s=this.attrs.dialog,t=s.recipient(),a=s.lastMessage();return m("li",{className:c()("DialogListItem",{"DialogListItem--unread":s.unreadCount(),active:this.attrs.active})},m(g(),{href:r().route.dialog(s),className:c()("DialogListItem-button",{active:this.attrs.active})},m("div",{className:"DialogListItem-avatar"},m(f(),{user:t}),!!s.unreadCount()&&m("div",{className:"Bubble Bubble--primary"},s.unreadCount())),m("div",{className:"DialogListItem-content"},m("div",{className:"DialogListItem-title"},v()(t),_()(s.lastMessageAt()),this.attrs.actions&&m("div",{className:"DialogListItem-actions"},this.actionItems().toArray())),m("div",{className:"DialogListItem-lastMessage"},a?a.contentPlain()?.slice(0,80):""))))}actionItems(){const e=new(M());return e.add("markAsRead",m(l(),{className:"Notification-action Button Button--link",icon:"fas fa-check","aria-label":r().translator.trans("flarum-messages.forum.dialog_list.mark_as_read_tooltip"),onclick:e=>{e.preventDefault(),e.stopPropagation(),this.attrs.dialog.save({lastReadMessageId:(this.attrs.dialog.data.relationships?.lastMessage.data).id}).finally((()=>{0===this.attrs.dialog.unreadCount()&&r().session.user.pushAttributes({messageCount:(r().session.user.attribute("messageCount")??1)-1}),m.redraw()}))}}),100),e}}flarum.reg.add("flarum-messages","forum/components/DialogListItem",y);class A extends(i()){oninit(e){super.oninit(e)}oncreate(e){super.oncreate(e)}onupdate(e){super.onupdate(e)}view(){return m("div",{className:"DialogList"},m("ul",{className:"DialogList-list"},this.attrs.state.getAllItems().map((e=>m(y,{dialog:e,active:this.attrs.activeDialog?.id()===e.id(),actions:this.attrs.itemActions})))),this.attrs.state.hasNext()&&!this.attrs.hideMore&&m("div",{className:"DialogList-loadMore"},m(l(),{className:"Button",onclick:this.attrs.state.loadNext.bind(this.attrs.state)},r().translator.trans("flarum-messages.forum.dialog_list.load_more_button"))))}}flarum.reg.add("flarum-messages","forum/components/DialogList",A)},666:(e,s,t)=>{t.r(s),t.d(s,{default:()=>fe});var a=t(805),r=t(488),o=t.n(r),i=t(859),n=t.n(i),l=t(314),d=t.n(l),c=t(801),u=t.n(c),g=t(684),h=t(661),f=t.n(h),p=t(821),v=t.n(p),b=t(500),_=t.n(b),N=t(402),M=t.n(N),y=t(336),A=t.n(y);class k extends(M()){static initAttrs(e){e.className="MessagesPage-nav"}items(){const e=super.items();return e.remove("newDiscussion"),e.add("newMessage",m(A(),{icon:"fas fa-edit",className:"Button Button--primary IndexPage-newDiscussion MessagesPage-newMessage",itemClassName:"App-primaryControl",onclick:()=>this.newMessageAction(),disabled:!o().session.user.canSendAnyMessage()},o().session.user.canSendAnyMessage()?o().translator.trans("flarum-messages.forum.messages_page.send_message_button"):o().translator.trans("flarum-messages.forum.messages_page.cannot_send_message_button")),10),e}newMessageAction(){return flarum.reg.asyncModuleImport("flarum/forum/components/ComposerBody").then((()=>(o().composer.load((()=>t.e(451).then(t.bind(t,761))),{user:o().session.user,onsubmit:()=>{o().dialogs.refresh()}}).then((()=>o().composer.show())),o().composer)))}}flarum.reg.add("flarum-messages","forum/components/MessagesSidebar",k),flarum.reg.addChunkModule("451","761","flarum-messages","forum/components/MessageComposer");var I=t(950),D=t.n(I),w=t(476),S=t.n(w),P=t(906),C=t.n(P),B=t(154),x=t.n(B),T=t(917),L=t.n(T),R=t(3),H=t.n(R),q=t(651),j=t.n(q),O=t(301),E=t.n(O),G=t(443),F=t.n(G),V=t(215),z=t.n(V),J=t(233),K=t.n(J);const Q={controls(e,s){const t=new(C());return Object.entries(this.sections()).forEach((a=>{let[r,o]=a;const i=o.call(this,e,s).toArray();i.length&&(i.forEach((e=>t.add(e.itemName,e))),t.add(r+"Separator",m(z(),null)))})),t},sections(){return{user:this.userControls,moderation:this.moderationControls,destructive:this.destructiveControls}},userControls:(e,s)=>new(C()),moderationControls:(e,s)=>new(C()),destructiveControls(e,s){const t=new(C());return e.canDelete()&&t.add("delete",m(A(),{icon:"far fa-trash-alt",onclick:()=>this.deleteAction(e,s)},o().translator.trans("flarum-messages.forum.message_controls.delete_button"))),t},deleteAction(e,s){if(confirm(K()(o().translator.trans("flarum-messages.forum.message_controls.delete_confirmation"))))return e.delete().then((()=>{s.attrs.state.remove(e),m.redraw()}))}},U=Q;flarum.reg.add("flarum-messages","forum/utils/MessageControls",Q);class W extends(x()){oninit(e){super.oninit(e)}user(){return this.attrs.message.user()}controls(){return U.controls(this.attrs.message,this).toArray()}freshness(){return this.attrs.message.freshness}createdByStarter(){return!1}onbeforeupdate(e){return super.onbeforeupdate(e)}onupdate(e){super.onupdate(e)}elementAttrs(){const e=this.attrs.message,s=super.elementAttrs();return s.className=F()(s.className||null,"Message",{"Post--renderFailed":e.renderFailed(),revealContent:!1,editing:!1}),s}header(){return super.header()}content(){return super.content().concat([m(H(),{headerItems:this.headerItems(),cardVisible:!1,isEditing:!1,isHidden:!1,contentHtml:this.attrs.message.contentHtml(),user:this.attrs.message.user()})])}classes(e){return super.classes(e)}actionItems(){return super.actionItems()}footerItems(){return super.footerItems()}sideItems(){return super.sideItems()}avatar(){return this.attrs.message.user()?m(L(),{user:this.attrs.message.user(),className:"Post-avatar"}):""}headerItems(){const e=new(C()),s=this.attrs.message;return e.add("user",m(j(),{post:s}),100),e.add("meta",m(E(),{post:s,permalink:()=>{const e=s.dialog();return e?o().forum.attribute("baseOrigin")+o().route.dialog(e,s.number()):null}})),e}}flarum.reg.add("flarum-messages","forum/components/Message",W);class X extends(D()){constructor(){super(...arguments),(0,a.A)(this,"replyPlaceholderComponent",v()(null)),(0,a.A)(this,"loadingPostComponent",v()(null)),(0,a.A)(this,"scrollListener",void 0),(0,a.A)(this,"initialToBottomScroll",!1),(0,a.A)(this,"lastTime",null),(0,a.A)(this,"checkedRead",!1),(0,a.A)(this,"markingAsRead",!1)}oninit(e){super.oninit(e),Promise.all([flarum.reg.asyncModuleImport("flarum/forum/components/ReplyPlaceholder"),flarum.reg.asyncModuleImport("flarum/forum/components/LoadingPost")]).then((e=>{let[s,t]=e;this.replyPlaceholderComponent(s.default),this.loadingPostComponent(t.default)}))}oncreate(e){super.oncreate(e),this.scrollListener=new(S())(this.onscroll.bind(this),this.element),setTimeout((()=>{this.scrollListener.start(),this.element.addEventListener("scrollend",this.markAsRead.bind(this))}))}onupdate(e){super.onupdate(e),this.initialToBottomScroll||this.attrs.state.isLoading()||(this.scrollToBottom(),this.initialToBottomScroll=!0),this.initialToBottomScroll&&!this.checkedRead&&(this.markAsRead(),this.checkedRead=!0)}onremove(e){super.onremove(e),this.scrollListener.stop()}view(){return m("div",{className:"MessageStream"},this.attrs.state.isLoading()?m(f(),null):this.content())}content(){const e=[],s=Array.from(new Map(this.attrs.state.getAllItems().map((e=>[e.id(),e]))).values()).sort(((e,s)=>e.number()-s.number())),a=this.replyPlaceholderComponent(),r=this.loadingPostComponent();return s[0].id()!==(this.attrs.dialog.data.relationships?.firstMessage.data).id&&(e.push(m("div",{className:"MessageStream-item",key:"loadNext"},m(A(),{onclick:()=>this.whileMaintainingScroll((()=>this.attrs.state.loadNext())),type:"button",className:"Button Button--block MessageStream-loadNext"},o().translator.trans("flarum-messages.forum.messages_page.stream.load_previous_button")))),r&&e.push(m("div",{className:"MessageStream-item",key:"loading-next"},m(r,null)))),s.forEach(((s,t)=>e.push(this.messageItem(s,t)))),s[s.length-1].id()!==(this.attrs.dialog.data.relationships?.lastMessage.data).id&&(r&&e.push(m("div",{className:"MessageStream-item",key:"loading-prev"},m(r,null))),e.push(m("div",{className:"MessageStream-item",key:"loadPrev"},m(A(),{onclick:()=>this.whileMaintainingScroll((()=>this.attrs.state.loadPrev())),type:"button",className:"Button Button--block MessageStream-loadPrev"},o().translator.trans("flarum-messages.forum.messages_page.stream.load_next_button"))))),o().session.user.canSendAnyMessage()&&a&&e.push(m("div",{className:"MessageStream-item",key:"reply"},m(a,{discussion:this.attrs.dialog,onclick:()=>{flarum.reg.asyncModuleImport("flarum/forum/components/ComposerBody").then((()=>{o().composer.load((()=>t.e(451).then(t.bind(t,761))),{user:o().session.user,replyingTo:this.attrs.dialog,onsubmit:()=>{this.attrs.state.refresh().then((()=>setTimeout((()=>this.scrollToBottom()),50)))}}).then((()=>o().composer.show()))}))},composingReply:()=>o().composer.composingMessageTo(this.attrs.dialog)}))),e}messageItem(e,s){return m("div",{className:"MessageStream-item",key:s,"data-id":e.id(),"data-number":e.number()},this.timeGap(e),m(W,{message:e,state:this.attrs.state}))}timeGap(e){if(e.id()===(this.attrs.dialog.data.relationships?.firstMessage.data).id)return this.lastTime=e.createdAt(),m("div",{class:"PostStream-timeGap"},m("span",null,o().translator.trans("flarum-messages.forum.messages_page.stream.start_of_the_conversation")));const s=this.lastTime,t=e.createdAt().getTime()-(s?.getTime()||0);return this.lastTime=e.createdAt(),s&&t>3456e5?m("div",{className:"PostStream-timeGap"},m("span",null,o().translator.trans("flarum-messages.forum.messages_page.stream.time_lapsed_text",{period:dayjs().add(t,"ms").fromNow(!0)}))):null}onscroll(){this.whileMaintainingScroll((()=>this.element.scrollTop<=80&&this.attrs.state.hasNext()?this.attrs.state.loadNext():this.element.scrollTop+this.element.clientHeight>=this.element.scrollHeight&&this.attrs.state.hasPrev()?this.attrs.state.loadPrev():null))}scrollToBottom(){const e=m.route.param("near");if(e){const s=this.element.querySelector(`.MessageStream-item[data-number="${e}"]`);s?(this.element.scrollTop=s.getBoundingClientRect().top-this.element.getBoundingClientRect().top,s.classList.add("flash"),window.history.replaceState(null,"",o().route.dialog(this.attrs.dialog))):this.element.scrollTop=this.element.scrollHeight}else this.element.scrollTop=this.element.scrollHeight}whileMaintainingScroll(e){const s=this.element.scrollTop,t=this.element.scrollHeight,a=s>(t-this.element.clientHeight)/2,r=e();r instanceof Promise&&!a&&r.then((()=>{requestAnimationFrame((()=>{this.element.scrollTop=this.element.scrollHeight-t+s}))}))}markAsRead(){const e=Number(this.$(".MessageStream-item[data-id]").filter(((e,s)=>this.element.scrollHeight<=this.element.clientHeight||this.$().offset().top+this.element.clientHeight>$(s).offset().top)).last().data("id"));e&&o().session.user&&e>(this.attrs.dialog.lastReadMessageId()||0)&&!this.markingAsRead&&(this.markingAsRead=!0,this.attrs.dialog.save({lastReadMessageId:e}).finally((()=>{this.markingAsRead=!1,0===this.attrs.dialog.unreadCount()&&o().session.user.pushAttributes({messageCount:(o().session.user.attribute("messageCount")??1)-1}),m.redraw()})))}}flarum.reg.add("flarum-messages","forum/components/MessageStream",X);var Y=t(521),Z=t.n(Y),ee=t(662),se=t.n(ee);class te extends(se()){constructor(e,s){void 0===s&&(s=1),super(e,s,null)}get type(){return"dialog-messages"}getAllItems(){return super.getAllItems()}}flarum.reg.add("flarum-messages","forum/states/MessageStreamState",te);var ae=t(88),re=t.n(ae),oe=t(741),ie=t.n(oe),ne=t(533),le=t.n(ne),me=t(653),de=t.n(me),ce=t(819),ue=t.n(ce);class ge extends(le()){className(){return"Modal--small Modal--flat DetailsModal"}title(){return o().translator.trans("flarum-messages.forum.dialog_section.details_modal.title")}content(){let e=(this.attrs.dialog.users()||[]).filter(Boolean);return m("div",{className:"Modal-body DetailsModal-infoGroups"},m("div",{className:"DetailsModal-recipients DetailsModal-info"},m("div",{className:"DetailsModal-info-title"},o().translator.trans("flarum-messages.forum.dialog_section.details_modal.recipients")),m("div",{className:"DetailsModal-recipients-list"},e?.map((e=>m("div",{className:"DetailsModal-recipient"},m(L(),{user:e}),m(re(),{href:o().route("user",{username:e.slug()})},m("span",{className:"DetailsModal-recipient-username"},Z()(e))),m("div",{className:"badges"},ue()(e.badges().toArray()))))))),this.infoItems().toArray())}infoItems(){const e=new(C());return e.add("created",m("div",{className:"DetailsModal-createdAt DetailsModal-info"},m("div",{className:"DetailsModal-info-title"},o().translator.trans("flarum-messages.forum.dialog_section.details_modal.created_at")),m("div",{className:"DetailsModal-info-content"},de()(this.attrs.dialog.createdAt())))),e}}flarum.reg.add("flarum-messages","forum/components/DetailsModal",ge);class he extends(D()){constructor(){super(...arguments),(0,a.A)(this,"loading",!1),(0,a.A)(this,"messages",void 0)}oninit(e){super.oninit(e),this.messages=new te(this.requestParams()),this.messages.refresh()}requestParams(e){void 0===e&&(e=!1);const s={filter:{dialog:this.attrs.dialog.id()},sort:"-number"},t=m.route.param("near");return t&&!e&&(s.page=s.page||{},s.page.near=parseInt(t)),s}view(){const e=this.attrs.dialog.recipient();return m("div",{className:"DialogSection"},m("div",{className:"DialogSection-header"},m(L(),{user:e}),m("div",{className:"DialogSection-header-info"},m("h2",{className:"DialogSection-header-info-title"},e&&m(re(),{href:o().route.user(e)},Z()(e))||Z()(e),e&&e.canSendAnyMessage()?null:m("span",{className:"DialogSection-header-info-helperText"},o().translator.trans("flarum-messages.forum.dialog_section.cannot_reply_text"))),m("div",{className:"badges"},ue()(e?.badges().toArray()||[]))),m("div",{className:"DialogSection-header-actions"},this.actionItems().toArray())),m(X,{dialog:this.attrs.dialog,state:this.messages}))}actionItems(){const e=new(C());return e.add("back",m(A(),{className:"Button Button--icon DialogSection-back",icon:"fas fa-arrow-left",onclick:this.attrs.onback},o().translator.trans("flarum-messages.forum.dialog_section.back_label"))),e.add("details",m(ie(),{icon:"fas fa-ellipsis-h",className:"DialogSection-controls",buttonClassName:"Button Button--icon",accessibleToggleLabel:o().translator.trans("flarum-messages.forum.dialog_section.controls_toggle_label"),label:o().translator.trans("flarum-messages.forum.dialog_section.controls_toggle_label")},this.controlItems().toArray())),e}controlItems(){const e=new(C());return e.add("details",m(A(),{icon:"fas fa-info-circle",onclick:()=>o().modal.show(ge,{dialog:this.attrs.dialog})},o().translator.trans("flarum-messages.forum.dialog_section.controls.details_button"))),e}}flarum.reg.add("flarum-messages","forum/components/DialogSection",he);class fe extends(n()){constructor(){super(...arguments),(0,a.A)(this,"selectedDialog",v()(null)),(0,a.A)(this,"currentDialogId",null)}oninit(e){super.oninit(e),o().session.user?(o().current.set("noTagsList",!0),o().dialogs.hasItems()?this.initDialog():o().dialogs.refresh().then((async()=>{o().dialogs.hasItems()&&await this.initDialog()}))):m.route.set(o().route("index"))}dialogRequestParams(){return{include:"users.groups"}}async initDialog(){const e=m.route.param("id");this.currentDialogId=e;const s=o().translator.trans("flarum-messages.forum.messages_page.title",{},!0);let t;t=e?o().store.getById("dialogs",e)||await o().store.find("dialogs",e,this.dialogRequestParams()):o().dialogs.getAllItems()[0],this.selectedDialog(t),t?(o().setTitle(t.title()),o().history.push("dialog",t.title())):(o().setTitle(s),o().history.push("messages",s)),m.redraw()}onupdate(e){super.onupdate(e);const s=this.element.querySelector(".DialogListItem.active"),t=this.element.querySelector(".DialogList");s&&$(t).offset().top+t.clientHeight<=$(s).offset().top&&s.scrollIntoView()}view(){return m(d(),{className:"MessagesPage Page--vertical",loading:!1,hero:this.hero.bind(this),sidebar:()=>m(k,null)},o().dialogs.isLoading()?m(f(),null):o().dialogs.hasItems()?m("div",{className:F()("MessagesPage-content",{"MessagesPage-content--onDialog":this.currentDialogId})},m("div",{className:"MessagesPage-sidebar",key:"sidebar"},m("div",{className:"IndexPage-toolbar",key:"toolbar"},m("ul",{className:"IndexPage-toolbar-view"},ue()(this.viewItems().toArray())),m("ul",{className:"IndexPage-toolbar-action"},ue()(this.actionItems().toArray()))),m(g.A,{key:"list",state:o().dialogs,activeDialog:this.selectedDialog()})),this.selectedDialog()?m(he,{key:"dialog",dialog:this.selectedDialog(),onback:()=>{this.currentDialogId=null}}):m(f(),{key:"loading",display:"block"})):m(_(),{icon:"far fa-envelope-open"},o().translator.trans("flarum-messages.forum.messages_page.empty_text")))}hero(){return m("header",{className:"Hero MessagesPageHero"},m("div",{className:"container"},m("div",{className:"containerNarrow"},m("h1",{className:"Hero-title"},m(u(),{name:"fas fa-envelope"})," ",o().translator.trans("flarum-messages.forum.messages_page.hero.title")),m("div",{className:"Hero-subtitle"},o().translator.trans("flarum-messages.forum.messages_page.hero.subtitle")))))}viewItems(){const e=new(C()),s=o().dialogs.sortMap(),t=Object.keys(s).reduce(((e,t)=>{const a=s[t];return e[t]="string"!=typeof a?a.label:o().translator.trans(`flarum-messages.forum.index_sort.${t}_button`),e}),{});return e.add("sort",m(ie(),{buttonClassName:"Button",label:t[o().dialogs.getParams()?.sort||0]||Object.values(t)[0],accessibleToggleLabel:o().translator.trans("core.forum.index_sort.toggle_dropdown_accessible_label")},Object.keys(t).map((e=>{const a=t[e],r=(o().dialogs.getParams().sort||Object.keys(s)[0])===e;return m(A(),{icon:!r||"fas fa-check",onclick:()=>o().dialogs.changeSort(e),active:r},a)})))),e}actionItems(){const e=new(C());return e.add("refresh",m(A(),{title:o().translator.trans("flarum-messages.forum.messages_page.refresh_tooltip"),"aria-label":o().translator.trans("flarum-messages.forum.messages_page.refresh_tooltip"),icon:"fas fa-sync",className:"Button Button--icon",onclick:()=>{o().dialogs.refresh()}})),o().session.user&&e.add("markAllAsRead",m(A(),{title:o().translator.trans("flarum-messages.forum.messages_page.mark_all_as_read_tooltip"),"aria-label":o().translator.trans("flarum-messages.forum.messages_page.mark_all_as_read_tooltip"),icon:"fas fa-check",className:"Button Button--icon",onclick:()=>o().dialogs.markAllAsRead()})),e}}flarum.reg.add("flarum-messages","forum/components/MessagesPage",fe)}}]);
//# sourceMappingURL=MessagesPage.js.map