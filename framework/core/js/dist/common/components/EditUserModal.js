"use strict";(self.webpackChunkflarum_core=self.webpackChunkflarum_core||[]).push([[841],{4292:(s,i,t)=>{t.r(i),t.d(i,{default:()=>c});var e=t(7905),r=t(7465),a=t(7108),n=t(7202),o=t(6697),d=t(7645),l=t(1552),u=t(4041),h=t(6458);class c extends a.Z{constructor(){super(...arguments),(0,e.Z)(this,"username",void 0),(0,e.Z)(this,"email",void 0),(0,e.Z)(this,"isEmailConfirmed",void 0),(0,e.Z)(this,"setPassword",void 0),(0,e.Z)(this,"password",void 0),(0,e.Z)(this,"groups",{})}oninit(s){super.oninit(s);const i=this.attrs.user;this.username=(0,h.Z)(i.username()||""),this.email=(0,h.Z)(i.email()||""),this.isEmailConfirmed=(0,h.Z)(i.isEmailConfirmed()||!1),this.setPassword=(0,h.Z)(!1),this.password=(0,h.Z)(i.password()||"");const t=i.groups()||[];r.Z.store.all("groups").filter((s=>![d.Z.GUEST_ID,d.Z.MEMBER_ID].includes(s.id()))).forEach((s=>this.groups[s.id()]=(0,h.Z)(t.includes(s))))}className(){return"EditUserModal Modal--small"}title(){return r.Z.translator.trans("core.lib.edit_user.title")}content(){const s=this.fields().toArray();return m("div",{className:"Modal-body"},s.length>1?m("div",{className:"Form"},this.fields().toArray()):r.Z.translator.trans("core.lib.edit_user.nothing_available"))}fields(){const s=new u.Z;return this.attrs.user.canEditCredentials()&&(s.add("username",m("div",{className:"Form-group"},m("label",null,r.Z.translator.trans("core.lib.edit_user.username_heading")),m("input",{className:"FormControl",placeholder:(0,l.Z)(r.Z.translator.trans("core.lib.edit_user.username_label")),bidi:this.username,disabled:this.nonAdminEditingAdmin()})),40),r.Z.session.user!==this.attrs.user&&(s.add("email",m("div",{className:"Form-group"},m("label",null,r.Z.translator.trans("core.lib.edit_user.email_heading")),m("div",null,m("input",{className:"FormControl",placeholder:(0,l.Z)(r.Z.translator.trans("core.lib.edit_user.email_label")),bidi:this.email,disabled:this.nonAdminEditingAdmin()})),!this.isEmailConfirmed()&&this.userIsAdmin(r.Z.session.user)&&m("div",null,m(n.Z,{className:"Button Button--block",loading:this.loading,onclick:this.activate.bind(this)},r.Z.translator.trans("core.lib.edit_user.activate_button")))),30),s.add("password",m("div",{className:"Form-group"},m("label",null,r.Z.translator.trans("core.lib.edit_user.password_heading")),m("div",null,m("label",{className:"checkbox"},m("input",{type:"checkbox",onchange:s=>{const i=s.target;this.setPassword(i.checked),m.redraw.sync(),i.checked&&this.$("[name=password]").select(),s.redraw=!1},disabled:this.nonAdminEditingAdmin()}),r.Z.translator.trans("core.lib.edit_user.set_password_label")),this.setPassword()&&m("input",{className:"FormControl",type:"password",name:"password",placeholder:(0,l.Z)(r.Z.translator.trans("core.lib.edit_user.password_label")),bidi:this.password,disabled:this.nonAdminEditingAdmin()}))),20))),this.attrs.user.canEditGroups()&&s.add("groups",m("div",{className:"Form-group EditUserModal-groups"},m("label",null,r.Z.translator.trans("core.lib.edit_user.groups_heading")),m("div",null,Object.keys(this.groups).map((s=>r.Z.store.getById("groups",s))).filter(Boolean).map((s=>s&&m("label",{className:"checkbox"},m("input",{type:"checkbox",bidi:this.groups[s.id()],disabled:s.id()===d.Z.ADMINISTRATOR_ID&&(this.attrs.user===r.Z.session.user||!this.userIsAdmin(r.Z.session.user))}),m(o.Z,{group:s,label:null})," ",s.nameSingular()))))),10),s.add("submit",m("div",{className:"Form-group"},m(n.Z,{className:"Button Button--primary",type:"submit",loading:this.loading},r.Z.translator.trans("core.lib.edit_user.submit_button"))),-10),s}activate(){this.loading=!0;const s={username:this.username(),isEmailConfirmed:!0};this.attrs.user.save(s,{errorHandler:this.onerror.bind(this)}).then((()=>{this.isEmailConfirmed(!0),this.loading=!1,m.redraw()})).catch((()=>{this.loading=!1,m.redraw()}))}data(){const s={},i={};return this.attrs.user.canEditCredentials()&&!this.nonAdminEditingAdmin()&&(s.username=this.username(),r.Z.session.user!==this.attrs.user&&(s.email=this.email()),this.setPassword()&&(s.password=this.password())),this.attrs.user.canEditGroups()&&(i.groups=Object.keys(this.groups).filter((s=>this.groups[s]())).map((s=>r.Z.store.getById("groups",s))).filter((s=>s instanceof d.Z))),s.relationships=i,s}onsubmit(s){s.preventDefault(),this.loading=!0,this.attrs.user.save(this.data(),{errorHandler:this.onerror.bind(this)}).then(this.hide.bind(this)).catch((()=>{this.loading=!1,m.redraw()}))}nonAdminEditingAdmin(){return this.userIsAdmin(this.attrs.user)&&!this.userIsAdmin(r.Z.session.user)}userIsAdmin(s){return!!((null==s?void 0:s.groups())||[]).some((s=>(null==s?void 0:s.id())===d.Z.ADMINISTRATOR_ID))}}flarum.reg.add("core","common/components/EditUserModal",c)}}]);
//# sourceMappingURL=EditUserModal.js.map