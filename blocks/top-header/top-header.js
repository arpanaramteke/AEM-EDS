import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const navItems= 
  block.querySelectorAll('li');
  navItems.forEach(item=>{
    item.classList.add('nav-item')
  });
}
