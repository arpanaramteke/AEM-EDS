export default function decorate(block) {
  const rows = [...block.children];
 
  const nav = document.createElement('div');
  nav.className = 'side-tabs-nav';
 
  const content = document.createElement('div');
  content.className = 'side-tabs-content';
 
  rows.forEach((row, index) => {
    const cols = [...row.children];
 
    const tabButton = document.createElement('button');
    tabButton.textContent = cols[0].textContent;
 
    const tabContent = document.createElement('div');
    tabContent.innerHTML = cols[1].innerHTML;
    tabContent.classList.add('tab-panel');
 
    if (index === 0) {
      tabButton.classList.add('active');
      tabContent.classList.add('active');
    }
 
    tabButton.addEventListener('click', () => {
      block.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
      block.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
 
      tabButton.classList.add('active');
      tabContent.classList.add('active');
    });
 
    nav.appendChild(tabButton);
    content.appendChild(tabContent);
  });
 
  block.innerHTML = '';
  block.append(nav, content);
}