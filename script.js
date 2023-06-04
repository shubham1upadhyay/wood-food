// toggle
function toggleNavbar() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('responsive');
  }
  const toggleBtn = document.querySelector('.toggle-btn');
  toggleBtn.addEventListener('click', toggleNavbar);
  



function getMenu() {
    fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json')
      .then(response => response.json())
      .then(data => {
        const menuDiv = document.getElementById('menu');
        let menuHtml = '<h2 class="menu-title">Menu</h2>';
        menuHtml += '<ol>';
        data.forEach(item => {
          menuHtml += `<li class="item-name">${item.name}<span class="item-price">Rs.${item.price}</span></li>`;
        });
        menuHtml += '</ol>';
        menuDiv.innerHTML = menuHtml;
      })
      .catch(error => {
        alert('something went wrong !!!')
      });
  }
  
  