
const money = v => '£' + v.toFixed(2);

function markedUp(price){ return price * 1.10; }

async function loadProducts(){
  const res = await fetch('assets/products.json');
  return await res.json();
}

function getCart(){
  try { return JSON.parse(localStorage.getItem('cart') || '[]'); }
  catch{ return []; }
}

function setCart(items){
  localStorage.setItem('cart', JSON.stringify(items));
  updateCartCount();
}

function updateCartCount(){
  const el = document.getElementById('cart_count');
  if(!el) return;
  const items = getCart();
  const count = items.reduce((a,b)=>a + b.qty, 0);
  el.textContent = count;
}

function addToCart(product, qty){
  const items = getCart();
  const idx = items.findIndex(i => i.id === product.id);
  if(idx > -1){
    items[idx].qty += qty;
  } else {
    items.push({ id: product.id, name: product.name, price: markedUp(product.basePrice), image: product.image, qty });
  }
  setCart(items);
  alert('Added to cart');
}

function removeFromCart(id){
  const items = getCart().filter(i => i.id !== id);
  setCart(items);
}

function cartTotal(){
  return getCart().reduce((sum, i)=> sum + i.price * i.qty, 0);
}

document.addEventListener('DOMContentLoaded', updateCartCount);
