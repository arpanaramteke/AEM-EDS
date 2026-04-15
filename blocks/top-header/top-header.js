export default function decorate(block) {
  const text = block.textContent;
 
  block.innerHTML = `
    <div class="top-container">
      <div class="left">${text}</div>
      <div class="right">Open hours: 9am–6pm</div>
    </div>
  `;
}