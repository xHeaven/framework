(()=>{var e={n:t=>{var a=t&&t.__esModule?()=>t.default:()=>t;return e.d(a,{a}),a},d:(t,a)=>{for(var s in a)e.o(a,s)&&!e.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:a[s]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};(()=>{"use strict";e.r(t),e.d(t,{extend:()=>w});const a=flarum.reg.get("core","admin/app");var s=e.n(a);const r=flarum.reg.get("core","common/extenders");var n=e.n(r);const l=flarum.reg.get("core","common/Model");var o=e.n(l);const i=flarum.reg.get("core","common/utils/computed");var u=e.n(i);const c=flarum.reg.get("core","common/utils/string");class d extends(o()){number(){return o().attribute("number").call(this)}content(){return o().attribute("content").call(this)}contentHtml(){return o().attribute("contentHtml").call(this)}renderFailed(){return o().attribute("renderFailed").call(this)}contentPlain(){return u()("contentHtml",(e=>"string"==typeof e?(0,c.getPlainContent)(e):e)).call(this)}createdAt(){return o().attribute("createdAt",o().transformDate).call(this)}dialog(){return o().hasOne("dialog").call(this)}user(){return o().hasOne("user").call(this)}canDelete(){return o().attribute("canDelete").call(this)}}flarum.reg.add("flarum-messages","common/models/DialogMessage",d);const g=flarum.reg.get("core","common/app");var f=e.n(g);class b extends(o()){title(){return o().attribute("title").call(this)}type(){return o().attribute("type").call(this)}lastMessageAt(){return o().attribute("lastMessageAt",o().transformDate).call(this)}createdAt(){return o().attribute("createdAt",o().transformDate).call(this)}users(){return o().hasMany("users").call(this)}firstMessage(){return o().hasOne("firstMessage").call(this)}lastMessage(){return o().hasOne("lastMessage").call(this)}unreadCount(){return o().attribute("unreadCount").call(this)}lastReadMessageId(){return o().attribute("lastReadMessageId").call(this)}lastReadAt(){return o().attribute("lastReadAt",o().transformDate).call(this)}recipient(){let e=this.users();return e?e.find((e=>e&&e.id()!==f().session.user.id())):null}}flarum.reg.add("flarum-messages","common/models/Dialog",b);const p=flarum.reg.get("core","common/models/User");var _=e.n(p);const h=[(new(n().Store)).add("dialogs",b).add("dialog-messages",d),new(n().Model)(_()).attribute("canSendAnyMessage").attribute("canDeleteOwnMessage")],y=flarum.reg.get("core","admin/components/SettingDropdown");var v=e.n(y);const w=[...h,(new(n().Admin)).permission((()=>({icon:"fas fa-envelope-open-text",label:s().translator.trans("flarum-messages.admin.permissions.send_messages_label"),permission:"dialog.sendMessage",allowGuest:!1})),"start",95).permission((()=>({icon:"far fa-trash-alt",label:s().translator.trans("flarum-messages.admin.permissions.delete_own_messages_label"),id:"flarum-messages.allow_delete_own_messages",setting:()=>(parseInt(s().data.settings["flarum-messages.allow_delete_own_messages"],10),m(v(),{default:"0",key:"flarum-messages.allow_delete_own_messages",options:[{value:"-1",label:s().translator.trans("core.admin.permissions_controls.allow_indefinitely_button")},{value:"10",label:s().translator.trans("core.admin.permissions_controls.allow_ten_minutes_button")},{value:"reply",label:s().translator.trans("core.admin.permissions_controls.allow_until_reply_button")},{value:"0",label:s().translator.trans("core.admin.permissions_controls.allow_never_button")}]}))})),"reply",80)];s().initializers.add("flarum-messages",(()=>{}))})(),module.exports=t})();
//# sourceMappingURL=admin.js.map