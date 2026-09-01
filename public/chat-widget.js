(function(){'use strict';
var C={tenantId:'keystarter',wsEndpoint:'wss://keys-starter.com/ws/',tokenUrl:'/api/token',botName:'Assistant',color:'#1a1a2e'};
// Read data attributes from script tag
var s=document.currentScript||document.querySelector('script[src*="chat-widget"]');
if(s){var a=s.dataset;if(a.tenant)C.tenantId=a.tenant;if(a.endpoint)C.wsEndpoint=a.endpoint;if(a.name)C.botName=a.name;if(a.color)C.color=a.color;}
var S={open:true,connected:false,msgs:[],msgId:0,ws:null,token:null};
var E={};function byId(id){return document.getElementById(id);}
// === Styles ===
var css='#_cw{position:fixed;bottom:0;right:0;z-index:99999;font-family:-apple-system,system-ui,sans-serif}#_cw button{cursor:pointer}#_bubble{position:fixed;bottom:16px;right:16px;width:48px;height:48px;border-radius:50%;background:'+C.color+';color:#fff;border:none;font-size:20px;box-shadow:0 4px 16px rgba(0,0,0,.2);z-index:99999;display:flex;align-items:center;justify-content:center;transition:transform .15s}#_bubble:hover{transform:scale(1.08)}#_panel{position:fixed;bottom:70px;right:16px;width:340px;height:460px;border-radius:12px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,.18);background:#fff;z-index:99999;display:flex;flex-direction:column}#_hdr{background:'+C.color+';color:#fff;padding:12px 14px;display:flex;align-items:center;gap:8px;flex-shrink:0}#_av{width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,.15);display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0}#_nm{font-size:13px;font-weight:600}#_st{font-size:10px;opacity:.7}#_body{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;background:#f5f5f7}#_empty{text-align:center;color:#999;font-size:12px;margin-top:20px}.mu{max-width:88%;padding:8px 12px;border-radius:10px;font-size:12px;line-height:1.5;word-break:break-word;align-self:flex-end;background:'+C.color+';color:#fff;border-bottom-right-radius:3px}.mb{max-width:88%;padding:8px 12px;border-radius:10px;font-size:12px;line-height:1.5;word-break:break-word;align-self:flex-start;background:#fff;color:#1d1d1f;border:1px solid #e8e8ed;border-bottom-left-radius:3px}.mt{font-size:9px;color:#888;margin-top:3px;opacity:.7}#_sug{display:flex;gap:4px;padding:6px 10px;border-top:1px solid #f0f0f2;flex-wrap:wrap;background:#fafafa;flex-shrink:0}.sb{font-size:10px;padding:4px 10px;border-radius:12px;border:1px solid #ddd;background:#fff;cursor:pointer;color:#555}.sb:hover{background:#e8e8f0}#_inp{display:flex;gap:6px;padding:8px 10px;border-top:1px solid #e8e8ed;background:#fff;flex-shrink:0}#_inp input{flex:1;border:1px solid #e0e0e0;border-radius:20px;padding:8px 12px;font-size:12px;outline:0}#_inp button{background:'+C.color+';color:#fff;border:none;border-radius:20px;padding:7px 16px;font-size:12px;font-weight:600}#_inp button:disabled{opacity:.4;cursor:default}';
function addCss(){var e=document.createElement('style');e.textContent=css;document.head.appendChild(e);}
// === Render ===
function render(){
  var r=byId('_cw')||function(){var d=document.createElement('div');d.id='_cw';document.body.appendChild(d);return d;}();
  r.innerHTML='<button id=_bubble onclick=KSChatToggle()>'+(S.open?'X':'?')+'</button>'+(S.open?'<div id=_panel><div id=_hdr><div id=_av>AI</div><div><div id=_nm>'+C.botName+'</div><div id=_st>Connecting...</div></div></div><div id=_body></div><div id=_sug><button class=sb onclick=KSChatSendT("How much?")>How much?</button><button class=sb onclick=KSChatSendT("Is this real?")>Is this real?</button><button class=sb onclick=KSChatSendT("Which is better?")>Which is better?</button><button class=sb onclick=KSChatSendT("I want to buy")>I want to buy</button></div><div id=_inp><input id=_inpi placeholder="Ask anything..." onkeydown=if(event.key==="Enter")KSChatSend()><button id=_inpb onclick=KSChatSend()>Send</button></div></div>':'');
  if(S.open)renderMsgs();
}
function toggle(){S.open=!S.open;render();if(S.open&&!S.ws)connect();}
// === WebSocket ===
function connect(){
  var st=byId('_st');if(st)st.textContent='Getting token...';
  fetch(C.tokenUrl+'?tenant='+C.tenantId).then(function(r){return r.json();}).then(function(d){
    S.token=d.token;
    var st2=byId('_st');if(st2)st2.textContent='Connecting...';
    var ws=new WebSocket(C.wsEndpoint);S.ws=ws;
    ws.onopen=function(){ws.send(JSON.stringify({type:'auth',token:S.token}));};
    ws.onmessage=function(e){
      try{var d=JSON.parse(e.data);
        if(d.type==='auth_ok'){S.connected=true;var s=byId('_st');if(s)s.textContent='Online';s.style.color='#34c759';}
        if(d.type==='message'){addMsg(d.text,'bot');}
      }catch(e){}
    };
    ws.onerror=function(){var s=byId('_st');if(s){s.textContent='Offline';s.style.color='#ff3b30';}};
    ws.onclose=function(){S.connected=false;S.ws=null;var s=byId('_st');if(s){s.textContent='Offline';s.style.color='#999';}};
  }).catch(function(){var s=byId('_st');if(s)s.textContent='Auth failed';});
}
function sendT(t){var i=byId('_inpi');if(i){i.value=t;send();}}
function send(){
  var i=byId('_inpi');if(!i||!i.value.trim()||!S.ws||S.ws.readyState!==1)return;
  var t=i.value.trim();i.value='';
  addMsg(t,'user');
  S.ws.send(JSON.stringify({type:'message',text:t}));
}
function addMsg(text,role){
  var id=S.msgId++;S.msgs.push({id:id,role:role,text:text});renderMsgs();
}
function renderMsgs(){
  var b=byId('_body');if(!b)return;
  var h='';
  if(S.msgs.length===0)h+='<div id=_empty>Hi! How can I help you today?</div>';
  for(var i=0;i<S.msgs.length;i++){
    var m=S.msgs[i];
    h+='<div class="'+(m.role==='user'?'mu':'mb')+'">'+esc(m.text)+'</div>';
  }
  b.innerHTML=h;b.scrollTop=b.scrollHeight;
}
function esc(t){return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
// === Init ===
addCss();render();
window.KSChatToggle = toggle;
window.KSChatSend = send;
window.KSChatSendT = sendT;
})();
