/*
 * Accordion Block
 * Recreate an accordion
 * https://www.hlx.live/developer/block-collection/accordion
 */

export default function decorate(block) {
  const tabContainer = document.createElement('div');
  tabContainer.className = 'tab';

  const contentContainer = document.createElement('div');

  [...block.children].forEach((row, index) => {
    const labelDiv = row.children[0]; // first div = label
    const contentDiv = row.children[1]; // second div = body

    // create tab button
    const button = document.createElement('button');
    button.className = 'tablinks';
    button.textContent = labelDiv.textContent;

    // create tab content
    const tabContent = document.createElement('div');
    tabContent.className = 'tabcontent';
    tabContent.append(...contentDiv.childNodes);
    tabContent.style.display = 'none'; // hide initially

    // hover effect (show content)
    button.addEventListener('mouseover', (e) => {
      // hide all tab contents
      contentContainer.querySelectorAll('.tabcontent').forEach((c) => c.style.display = 'none');
      // remove active class from all buttons
      tabContainer.querySelectorAll('.tablinks').forEach((b) => b.classList.remove('active'));
      // show current
      tabContent.style.display = 'block';
      e.currentTarget.classList.add('active');
    });

    tabContainer.appendChild(button);
    contentContainer.appendChild(tabContent);
    row.remove();
  });

  const firstButton = tabContainer.querySelector('.tablinks');
  const firstContent = contentContainer.querySelector('.tabcontent');
  if (firstButton && firstContent) {
    firstButton.classList.add('active');
    firstContent.style.display = 'block';
  }

  // add new structure to block
  block.append(tabContainer, contentContainer);

  // clearfix for CSS layout
  const clearfix = document.createElement('div');
  clearfix.className = 'clearfix';
  block.appendChild(clearfix);
}