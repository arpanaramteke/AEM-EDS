export default function decorate(block) {
  const items = block.textContent.split('|').map(i => i.trim());
 
  const logo = items[0];
  const menuItems = items.slice(1, -1);
  const button = items[items.length - 1];
 
  // clear existing content
  block.textContent = '';
 
  // create nav container
  const nav = document.createElement('div');
  nav.className = 'nav';
 
  // logo
  const logoDiv = document.createElement('div');
  logoDiv.className = 'logo';
  logoDiv.textContent = logo;
 
  // menu container
  const menuDiv = document.createElement('div');
  menuDiv.className = 'menu';
 
  // menu items
  menuItems.forEach(item => {
    const span = document.createElement('span');
    span.textContent = item;
    menuDiv.appendChild(span);
  });
 
  // button
  const btn = document.createElement('span');
  btn.className = 'btn';
  btn.textContent = button;
 
  menuDiv.appendChild(btn);
 
  // append everything
  nav.appendChild(logoDiv);
  nav.appendChild(menuDiv);
 
  block.appendChild(nav);
}
 