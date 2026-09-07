'use strict';
let currentModal=null,returnFocus=null;
function openModal(id){
 const panel=document.getElementById('modal-'+id);if(!panel)return;
 if(currentModal)closeModal(true);returnFocus=document.activeElement;
 document.body.style.overflow='hidden';document.getElementById('modalOverlay').classList.add('open');
 panel.classList.add('open');panel.setAttribute('aria-hidden','false');currentModal=panel;
 document.querySelectorAll('body > section, body > nav, .back-top').forEach(e=>e.inert=true);
 panel.querySelector('.modal-content').scrollTop=0;panel.querySelector('.modal-close').focus();
}
function closeModal(switching=false){
 if(!currentModal)return;currentModal.querySelectorAll('video').forEach(v=>v.pause());
 currentModal.classList.remove('open');currentModal.setAttribute('aria-hidden','true');currentModal=null;
 document.getElementById('modalOverlay').classList.remove('open');document.body.style.overflow='';
 document.querySelectorAll('[inert]').forEach(e=>e.inert=false);
 if(!switching&&returnFocus)returnFocus.focus({preventScroll:true});
}
function toggleWorkLinks(id){document.getElementById(id)?.classList.toggle('open')}
function toggleTweet(el){el.classList.toggle('open')}
document.addEventListener('keydown',e=>{
 if(e.key==='Escape')closeModal();
 if(currentModal&&e.key==='Tab'){
  const nodes=[...currentModal.querySelectorAll('button,a[href],video,[tabindex="0"]')].filter(n=>n.getClientRects().length);
  const first=nodes[0],last=nodes[nodes.length-1];
  if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus()}
  else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus()}
 }
});
document.querySelectorAll('.project-card[onclick]').forEach(c=>c.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();c.click()}}));
if('IntersectionObserver'in window){
 document.body.classList.add('motion-ready');
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.05});
 document.querySelectorAll('.reveal').forEach(e=>observer.observe(e));
 const navObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){document.querySelectorAll('.nav-links a').forEach(a=>{const active=a.hash==='#'+e.target.id;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})}}),{rootMargin:'-15% 0px -60% 0px'});
 document.querySelectorAll('body > section').forEach(e=>navObserver.observe(e));
}
document.querySelectorAll('.modal-images img').forEach(img=>{img.style.cursor='zoom-in';img.addEventListener('click',()=>window.open(img.src,'_blank','noopener'))});
document.querySelector('.copy-wechat').addEventListener('click',async()=>{
 const toast=document.getElementById('toast');
 try{await navigator.clipboard.writeText('13135969644');toast.textContent='微信号已复制'}catch{toast.textContent='微信：13135969644（请长按或选择复制）'}
 toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),3500);
});
