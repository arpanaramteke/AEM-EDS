export default function decorate(block) {
  const text = block.textContent;
 
  // clear existing content
  block.textContent = '';
 
  // create elements
  const container = document.createElement('div');
  container.className = 'top-container';
 
  const left = document.createElement('div');
  left.className = 'left';
  left.textContent = text;
 
  const right = document.createElement('div');
  right.className = 'right';
  right.textContent = 'Open hours: 9am–6pm';
 
  // append elements
  container.appendChild(left);
  container.appendChild(right);
 
  block.appendChild(container);
}
 