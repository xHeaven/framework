"use strict";(self.webpackChunkflarum_core=self.webpackChunkflarum_core||[]).push([[505],{2828:(e,s,t)=>{t.r(s),t.d(s,{default:()=>w});var o=t(7905),a=t(6789),r=t(3390),n=t(4041),i=t(2473),l=t(1268),c=t(1552),u=t(2190),d=t(8329),h=t(7202),k=t(9841),Z=t(7465);class g extends u.Z{view(e){return m("div",{className:"LabelValue"},m("div",{className:"LabelValue-label"},Z.Z.translator.trans("core.lib.data_segment.label",{label:this.attrs.label})),m("div",{className:"LabelValue-value"},this.attrs.value))}}flarum.reg.add("core","common/components/LabelValue",g);var f=t(3344),v=t(6439);class T extends u.Z{constructor(){super(...arguments),(0,o.Z)(this,"loading",{}),(0,o.Z)(this,"showingTokens",{})}view(e){return m("div",{className:"AccessTokensList"},this.attrs.tokens.length?this.attrs.tokens.map(this.tokenView.bind(this)):m("div",{className:"AccessTokensList--empty"},a.Z.translator.trans("core.forum.security.empty_text")))}tokenView(e){return m("div",{className:(0,f.Z)("AccessTokensList-item",{"AccessTokensList-item--active":e.isCurrent()}),key:e.id()},this.tokenViewItems(e).toArray())}tokenViewItems(e){const s=new n.Z;return s.add("icon",m("div",{className:"AccessTokensList-item-icon"},(0,d.Z)(this.attrs.icon||"fas fa-key")),50),s.add("info",m("div",{className:"AccessTokensList-item-info"},this.tokenInfoItems(e).toArray()),40),s.add("actions",m("div",{className:"AccessTokensList-item-actions"},this.tokenActionItems(e).toArray()),30),s}tokenInfoItems(e){const s=new n.Z;return"session"===this.attrs.type?s.add("title",m("div",{className:"AccessTokensList-item-title"},m("span",{className:"AccessTokensList-item-title-main"},e.device()),e.isCurrent()&&[" — ",m("span",{className:"AccessTokensList-item-title-sub"},a.Z.translator.trans("core.forum.security.current_active_session"))])):s.add("title",m("div",{className:"AccessTokensList-item-title"},m("span",{className:"AccessTokensList-item-title-main"},this.generateTokenTitle(e)))),s.add("createdAt",m("div",{className:"AccessTokensList-item-createdAt"},m(g,{label:a.Z.translator.trans("core.forum.security.created"),value:(0,k.Z)(e.createdAt())}))),s.add("lastActivityAt",m("div",{className:"AccessTokensList-item-lastActivityAt"},m(g,{label:a.Z.translator.trans("core.forum.security.last_activity"),value:e.lastActivityAt()?m("[",null,(0,k.Z)(e.lastActivityAt()),e.lastIpAddress()&&" — ".concat(e.lastIpAddress()),"developer_token"===this.attrs.type&&e.device()&&m("[",null," ","— ",m("span",{className:"AccessTokensList-item-title-sub"},e.device()))):a.Z.translator.trans("core.forum.security.never")}))),s}tokenActionItems(e){const s=new n.Z,t={session:"terminate_session",developer_token:"revoke_access_token"}[this.attrs.type];if("developer_token"===this.attrs.type){const t=!this.showingTokens[e.id()],o=t?"show_access_token":"hide_access_token";s.add("toggleDisplay",m(h.Z,{className:"Button Button--inverted",icon:t?"fas fa-eye":"fas fa-eye-slash",onclick:()=>{this.showingTokens[e.id()]=t,m.redraw()}},a.Z.translator.trans("core.forum.security.".concat(o))))}let o=m(h.Z,{className:"Button Button--danger",disabled:e.isCurrent(),loading:!!this.loading[e.id()],onclick:()=>this.revoke(e)},a.Z.translator.trans("core.forum.security.".concat(t)));return e.isCurrent()&&(o=m(v.Z,{text:a.Z.translator.trans("core.forum.security.cannot_terminate_current_session")},m("div",{tabindex:"0"},o))),s.add("revoke",o),s}async revoke(e){var s,t;if(!confirm((0,c.Z)(a.Z.translator.trans("core.forum.security.revoke_access_token_confirmation"))))return;this.loading[e.id()]=!0,await e.delete(),this.loading[e.id()]=!1,null==(s=(t=this.attrs).ondelete)||s.call(t,e);const o="session"===this.attrs.type?"session_terminated":"token_revoked";a.Z.alerts.show({type:"success"},a.Z.translator.trans("core.forum.security.".concat(o),{count:1})),m.redraw()}generateTokenTitle(e){const s=e.title()||a.Z.translator.trans("core.forum.security.token_title_placeholder"),t=this.tokenValueDisplay(e);return a.Z.translator.trans("core.forum.security.token_item_title",{title:s,token:t})}tokenValueDisplay(e){const s=Array(12).fill("*").join(""),t=this.showingTokens[e.id()]?e.token():s;return m("code",{className:"AccessTokensList-item-token"},t)}}flarum.reg.add("core","forum/components/AccessTokensList",T);var y=t(5226),p=t(7108),_=t(6458);class b extends p.Z{constructor(){super(...arguments),(0,o.Z)(this,"titleInput",(0,_.Z)(""))}className(){return"Modal--small NewAccessTokenModal"}title(){return a.Z.translator.trans("core.forum.security.new_access_token_modal.title")}content(){const e=a.Z.translator.trans("core.forum.security.new_access_token_modal.title_placeholder");return m("div",{className:"Modal-body"},m("div",{className:"Form Form--centered"},m("div",{className:"Form-group"},m("input",{type:"text",className:"FormControl",bidi:this.titleInput,placeholder:e,"aria-label":e})),m("div",{className:"Form-group"},m(h.Z,{className:"Button Button--primary Button--block",type:"submit",loading:this.loading},a.Z.translator.trans("core.forum.security.new_access_token_modal.submit_button")))))}submitData(){return{title:this.titleInput()}}onsubmit(e){super.onsubmit(e),e.preventDefault(),this.loading=!0,a.Z.store.createRecord("access-tokens").save(this.submitData()).then((e=>{this.attrs.onsuccess(e),a.Z.modal.close()})).finally(this.loaded.bind(this))}}flarum.reg.add("core","forum/components/NewAccessTokenModal",b);class A{constructor(){(0,o.Z)(this,"tokens",null),(0,o.Z)(this,"loadingTerminateSessions",!1),(0,o.Z)(this,"loadingGlobalLogout",!1)}hasLoadedTokens(){return null!==this.tokens}getTokens(){return this.tokens}setTokens(e){this.tokens=e}pushToken(e){var s;null==(s=this.tokens)||s.push(e)}removeToken(e){this.tokens=this.tokens.filter((s=>s!==e))}getSessionTokens(){var e;return(null==(e=this.tokens)?void 0:e.filter((e=>e.isSessionToken())).sort(((e,s)=>s.isCurrent()?1:-1)))||[]}getDeveloperTokens(){var e;return(null==(e=this.tokens)?void 0:e.filter((e=>!e.isSessionToken())))||null}getOtherSessionTokens(){var e;return(null==(e=this.tokens)?void 0:e.filter((e=>e.isSessionToken()&&!e.isCurrent())))||[]}hasOtherActiveSessions(){return(this.getOtherSessionTokens()||[]).length>0}removeOtherSessionTokens(){this.tokens=this.tokens.filter((e=>!e.isSessionToken()||e.isCurrent()))}}flarum.reg.add("core","forum/states/UserSecurityPageState",A);class w extends r.Z{constructor(){super(...arguments),(0,o.Z)(this,"state",new A)}oninit(e){var s;super.oninit(e);const t=m.route.param("username");t===(null==(s=a.Z.session.user)?void 0:s.slug())||a.Z.forum.attribute("canModerateAccessTokens")||m.route.set("/"),this.loadUser(t),a.Z.setTitle((0,c.Z)(a.Z.translator.trans("core.forum.security.title"))),this.loadTokens()}content(){return m("div",{className:"UserSecurityPage"},m("ul",null,(0,l.Z)(this.settingsItems().toArray())))}settingsItems(){var e;const s=new n.Z;return a.Z.forum.attribute("canCreateAccessToken")||a.Z.forum.attribute("canModerateAccessTokens")||this.state.hasLoadedTokens()&&null!=(e=this.state.getDeveloperTokens())&&e.length?s.add("developerTokens",m(i.Z,{className:"UserSecurityPage-developerTokens",label:a.Z.translator.trans("core.forum.security.developer_tokens_heading")},this.developerTokensItems().toArray())):this.state.hasLoadedTokens()||s.add("developerTokens",m(y.Z,null)),s.add("sessions",m(i.Z,{className:"UserSecurityPage-sessions",label:a.Z.translator.trans("core.forum.security.sessions_heading")},this.sessionsItems().toArray())),this.user.id()===a.Z.session.user.id()&&s.add("globalLogout",m(i.Z,{className:"UserSecurityPage-globalLogout",label:a.Z.translator.trans("core.forum.security.global_logout.heading")},m("span",{className:"helpText"},a.Z.translator.trans("core.forum.security.global_logout.help_text")),m(h.Z,{className:"Button",icon:"fas fa-sign-out-alt",onclick:this.globalLogout.bind(this),loading:this.state.loadingGlobalLogout,disabled:this.state.loadingTerminateSessions},a.Z.translator.trans("core.forum.security.global_logout.log_out_button")))),s}developerTokensItems(){const e=new n.Z;return e.add("accessTokenList",this.state.hasLoadedTokens()?m(T,{type:"developer_token",ondelete:e=>{this.state.removeToken(e),m.redraw()},tokens:this.state.getDeveloperTokens(),icon:"fas fa-key",hideTokens:!1}):m(y.Z,null)),this.user.id()===a.Z.session.user.id()&&e.add("newAccessToken",m(h.Z,{className:"Button",disabled:!a.Z.forum.attribute("canCreateAccessToken"),onclick:()=>a.Z.modal.show(b,{onsuccess:e=>{this.state.pushToken(e),m.redraw()}})},a.Z.translator.trans("core.forum.security.new_access_token_button"))),e}sessionsItems(){const e=new n.Z;if(e.add("sessionsList",this.state.hasLoadedTokens()?m(T,{type:"session",ondelete:e=>{this.state.removeToken(e),m.redraw()},tokens:this.state.getSessionTokens(),icon:"fas fa-laptop",hideTokens:!0}):m(y.Z,null)),this.user.id()===a.Z.session.user.id()){const s=!this.state.hasOtherActiveSessions();let t=m(h.Z,{className:"Button",onclick:this.terminateAllOtherSessions.bind(this),loading:this.state.loadingTerminateSessions,disabled:this.state.loadingGlobalLogout||s},a.Z.translator.trans("core.forum.security.terminate_all_other_sessions"));s&&(t=m(v.Z,{text:a.Z.translator.trans("core.forum.security.cannot_terminate_current_session")},m("span",{tabindex:"0"},t))),e.add("terminateAllOtherSessions",t)}return e}loadTokens(){return a.Z.store.find("access-tokens",{filter:{user:this.user.id()}}).then((e=>{this.state.setTokens(e),m.redraw()}))}terminateAllOtherSessions(){if(confirm((0,c.Z)(a.Z.translator.trans("core.forum.security.terminate_all_other_sessions_confirmation"))))return this.state.loadingTerminateSessions=!0,a.Z.request({method:"DELETE",url:a.Z.forum.attribute("apiUrl")+"/sessions"}).then((()=>{const e=this.state.getOtherSessionTokens().length;this.state.removeOtherSessionTokens(),a.Z.alerts.show({type:"success"},a.Z.translator.trans("core.forum.security.session_terminated",{count:e}))})).catch((()=>{a.Z.alerts.show({type:"error"},a.Z.translator.trans("core.forum.security.session_termination_failed"))})).finally((()=>{this.state.loadingTerminateSessions=!1,m.redraw()}))}globalLogout(){return this.state.loadingGlobalLogout=!0,a.Z.request({method:"POST",url:a.Z.forum.attribute("baseUrl")+"/global-logout"}).then((()=>window.location.reload())).finally((()=>{this.state.loadingGlobalLogout=!1,m.redraw()}))}}flarum.reg.add("core","forum/components/UserSecurityPage",w)}}]);
//# sourceMappingURL=UserSecurityPage.js.map