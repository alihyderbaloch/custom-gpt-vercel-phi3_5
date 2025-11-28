const form = document.getElementById('inputForm');
const input = document.getElementById('messageInput');
const chat = document.getElementById('chat');


function appendMessage(text, who='bot'){
const el = document.createElement('div');
el.className = 'message ' + (who==='user' ? 'user' : 'bot');
el.textContent = text;
chat.appendChild(el);
chat.scrollTop = chat.scrollHeight;
}


form.addEventListener('submit', async (e)=>{
e.preventDefault();
const text = input.value.trim();
if(!text) return;
appendMessage(text,'user');
input.value = '';


// show temporary loading
const loading = document.createElement('div');
loading.className = 'message bot';
loading.textContent = '...';
chat.appendChild(loading);
chat.scrollTop = chat.scrollHeight;


try{
const res = await fetch('/api/chat',{
method:'POST',
headers:{'Content-Type':'application/json'},
body: JSON.stringify({message: text})
});
const json = await res.json();
loading.remove();
if(res.ok){
appendMessage(json.reply || JSON.stringify(json));
} else {
appendMessage('Error: ' + (json.error || res.statusText));
}
} catch(err){
loading.remove();
appendMessage('Network error: ' + err.message);
}
});