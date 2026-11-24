const products=[
{id:1,name:'Verified Heavy Tee',type:'excellent / heavyweight cotton',price:48,category:'tops',color:'#f2cfc7'},
{id:2,name:'Archive Trouser',type:'very good / relaxed twill',price:98,category:'bottoms',color:'#28483f'},
{id:3,name:'Utility Overshirt',type:'excellent / brushed canvas',price:128,category:'outerwear',color:'#b4a188'},
{id:4,name:'Essential Rib Tank',type:'like new / organic cotton',price:38,category:'tops',color:'#20201d'},
{id:5,name:'Washed Poplin Short',type:'good / washed poplin',price:68,category:'bottoms',color:'#587b9d'},
{id:6,name:'Merino Archive Knit',type:'excellent / merino blend',price:112,category:'tops',color:'#ee5b36'},
{id:7,name:'Certified Field Jacket',type:'very good / cotton shell',price:168,category:'outerwear',color:'#a9bb36'},
{id:8,name:'Resale Pro Pant',type:'like new / stretch cotton',price:88,category:'bottoms',color:'#675a74'}];
let cart=JSON.parse(localStorage.getItem('resale-pro-cart')||'[]');
const productEl=document.querySelector('#products');
const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(n);
function renderProducts(filter='all'){productEl.innerHTML=products.filter(p=>filter==='all'||p.category===filter).map((p,i)=>`<article class="product" data-category="${p.category}"><span class="product-index">${String(i+1).padStart(2,'0')}</span><div class="product-swatch" style="--color:${p.color}"></div><div><h3>${p.name}</h3><span class="product-meta">${p.type}</span></div><span class="product-price">${money(p.price)}</span><button class="add" data-id="${p.id}" aria-label="Add ${p.name} to bag">+</button></article>`).join('')}
function save(){localStorage.setItem('resale-pro-cart',JSON.stringify(cart));renderCart()}
function renderCart(){const items=document.querySelector('#cartItems');document.querySelector('#cartCount').textContent=cart.reduce((s,x)=>s+x.qty,0);items.innerHTML=cart.length?cart.map(x=>`<div class="cart-item"><div class="mini" style="--color:${x.color}"></div><div><h3>${x.name}</h3><p>${x.qty} × ${money(x.price)}</p><button class="remove" data-remove="${x.id}">remove</button></div><strong>${money(x.qty*x.price)}</strong></div>`).join(''):'<p class="empty">Your bag is ready for a second life.</p>';document.querySelector('#subtotal').textContent=money(cart.reduce((s,x)=>s+x.price*x.qty,0))}
function toggleCart(open){document.querySelector('#cart').classList.toggle('open',open);document.querySelector('#cart').setAttribute('aria-hidden',!open);document.querySelector('#overlay').classList.toggle('show',open)}
renderProducts();renderCart();document.querySelector('#year').textContent=new Date().getFullYear();
document.querySelector('.filters').addEventListener('click',e=>{if(!e.target.dataset.filter)return;document.querySelectorAll('.filters button').forEach(b=>b.classList.remove('active'));e.target.classList.add('active');renderProducts(e.target.dataset.filter)});
productEl.addEventListener('click',e=>{const id=Number(e.target.dataset.id);if(!id)return;const found=cart.find(x=>x.id===id);found?found.qty++:cart.push({...products.find(p=>p.id===id),qty:1});save();toggleCart(true)});
document.querySelector('#cartItems').addEventListener('click',e=>{const id=Number(e.target.dataset.remove);if(!id)return;cart=cart.filter(x=>x.id!==id);save()});
document.querySelector('#cartBtn').onclick=()=>toggleCart(true);document.querySelector('#closeCart').onclick=()=>toggleCart(false);document.querySelector('#overlay').onclick=()=>toggleCart(false);document.querySelector('.menu').onclick=()=>document.querySelector('nav').classList.toggle('open');
document.querySelector('#checkout').onclick=()=>alert(cart.length?'Demo checkout: connect a payment provider and backend to accept live orders.':'Your bag is empty.');
document.querySelector('#newsletterForm').onsubmit=e=>{e.preventDefault();document.querySelector('#formMsg').textContent='You are on the list.';e.target.reset()};