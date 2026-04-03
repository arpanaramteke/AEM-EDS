
function openCity(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the link that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

/*export default function decorate(block) {
  const tabContainer = document.createElement('div');
  tabContainer.className = 'tab';

  const contentContainer = document.createElement('div');

  [...block.children].forEach((row, index) => {
    const labelDiv = row.children[0]; 
    const contentDiv = row.children[1]; 

    const button = document.createElement('button');
    button.className = 'tablinks';
    button.textContent = labelDiv.textContent;

    const tabContent = document.createElement('div');
    tabContent.className = 'tabcontent';
    tabContent.append(...contentDiv.childNodes);
    tabContent.style.display = 'none'; 

    button.addEventListener('mouseover', (e) => {

      contentContainer.querySelectorAll('.tabcontent').forEach((c) => c.style.display = 'none');

      tabContainer.querySelectorAll('.tablinks').forEach((b) => b.classList.remove('active'));

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
}*/