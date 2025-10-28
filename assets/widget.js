(function(){
  function ready(cb){ if (document.readyState !== 'loading') cb(); else document.addEventListener('DOMContentLoaded', cb); }
  ready(function(){
    var btn = document.createElement('button');
    btn.className = 'chat-bubble'; btn.setAttribute('aria-label','Chat öffnen'); btn.textContent = 'Chat';
    document.body.appendChild(btn);
    var frame = document.createElement('iframe');
    frame.src = '/chat/index.html'; frame.title='Droniq Chat'; frame.className='iframe-panel';
    document.body.appendChild(frame);
    btn.onclick = function(){ frame.style.display = (frame.style.display==='none'||frame.style.display==='')?'block':'none'; };
  });
})();