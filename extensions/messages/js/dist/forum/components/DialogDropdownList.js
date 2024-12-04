"use strict";(self.webpackChunkmodule_exports=self.webpackChunkmodule_exports||[]).push([[619],{331:(t,s,a)=>{a.r(s),a.d(s,{default:()=>N});var e=a(488),i=a.n(e),o=a(950),r=a.n(o),n=a(47),l=a.n(n),u=a(684),d=a(104),c=a.n(d),g=a(906),f=a.n(g),h=a(547),p=a.n(h),_=a(336),v=a.n(_);class N extends(r()){oninit(t){super.oninit(t)}view(){const t=this.attrs.state;return m(l(),{className:"DialogDropdownList",title:i().translator.trans("flarum-messages.forum.dialog_list.title"),controls:this.controlItems(),hasItems:t.hasItems(),loading:t.isLoading(),emptyText:i().translator.trans("flarum-messages.forum.messages_page.empty_text"),loadMore:()=>t.hasNext()&&!t.isLoadingNext()&&t.loadNext(),footer:()=>m("h4",null,m(c(),{href:i().route("messages"),className:"Button Button--link",icon:"fas fa-inbox"},i().translator.trans("flarum-messages.forum.dialog_list.view_all")))},m("div",{className:"HeaderListGroup-content"},this.content()))}controlItems(){const t=new(f()),s=this.attrs.state;return i().session.user.attribute("messageCount")>0&&t.add("mark_all_as_read",m(p(),{text:i().translator.trans("flarum-messages.forum.messages_page.mark_all_as_read_tooltip")},m(v(),{className:"Button Button--link","data-container":".DialogDropdownList",icon:"fas fa-check",title:i().translator.trans("flarum-messages.forum.messages_page.mark_all_as_read_tooltip"),onclick:s.markAllAsRead.bind(s)})),70),t}content(){return m(u.A,{state:this.attrs.state,hideMore:!0,itemActions:!0})}}flarum.reg.add("flarum-messages","forum/components/DialogDropdownList",N)},684:(t,s,a)=>{a.d(s,{A:()=>I});var e=a(488),i=a.n(e),o=a(950),r=a.n(o),n=a(336),l=a.n(n),u=a(443),d=a.n(u),c=a(88),g=a.n(c),f=a(917),h=a.n(f),p=a(521),_=a.n(p),v=a(167),N=a.n(v),D=a(906),L=a.n(D);class k extends(r()){view(t){const s=this.attrs.dialog,a=s.recipient(),e=s.lastMessage();return m("li",{className:d()("DialogListItem",{"DialogListItem--unread":s.unreadCount(),active:this.attrs.active})},m(g(),{href:i().route.dialog(s),className:d()("DialogListItem-button",{active:this.attrs.active})},m("div",{className:"DialogListItem-avatar"},m(h(),{user:a}),!!s.unreadCount()&&m("div",{className:"Bubble Bubble--primary"},s.unreadCount())),m("div",{className:"DialogListItem-content"},m("div",{className:"DialogListItem-title"},_()(a),N()(s.lastMessageAt()),this.attrs.actions&&m("div",{className:"DialogListItem-actions"},this.actionItems().toArray())),m("div",{className:"DialogListItem-lastMessage"},e?e.contentPlain()?.slice(0,80):""))))}actionItems(){const t=new(L());return t.add("markAsRead",m(l(),{className:"Notification-action Button Button--link",icon:"fas fa-check","aria-label":i().translator.trans("flarum-messages.forum.dialog_list.mark_as_read_tooltip"),onclick:t=>{t.preventDefault(),t.stopPropagation(),this.attrs.dialog.save({lastReadMessageId:(this.attrs.dialog.data.relationships?.lastMessage.data).id}).finally((()=>{0===this.attrs.dialog.unreadCount()&&i().session.user.pushAttributes({messageCount:(i().session.user.attribute("messageCount")??1)-1}),m.redraw()}))}}),100),t}}flarum.reg.add("flarum-messages","forum/components/DialogListItem",k);class I extends(r()){oninit(t){super.oninit(t)}oncreate(t){super.oncreate(t)}onupdate(t){super.onupdate(t)}view(){return m("div",{className:"DialogList"},m("ul",{className:"DialogList-list"},this.attrs.state.getAllItems().map((t=>m(k,{dialog:t,active:this.attrs.activeDialog?.id()===t.id(),actions:this.attrs.itemActions})))),this.attrs.state.hasNext()&&!this.attrs.hideMore&&m("div",{className:"DialogList-loadMore"},m(l(),{className:"Button",onclick:this.attrs.state.loadNext.bind(this.attrs.state)},i().translator.trans("flarum-messages.forum.dialog_list.load_more_button"))))}}flarum.reg.add("flarum-messages","forum/components/DialogList",I)}}]);
//# sourceMappingURL=DialogDropdownList.js.map