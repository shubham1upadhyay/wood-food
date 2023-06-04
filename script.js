// toggle
function toggleNavbar() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('responsive');
  }
  const toggleBtn = document.querySelector('.toggle-btn');
  toggleBtn.addEventListener('click', toggleNavbar);
  


async function fetchMenu() {
  let endpoint = `https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json`;
  try{
      let response = await fetch(endpoint);
      let result = await response.json();

      for(let i=0; i<result.length; i++){
        let video = result[i];
        if(video.length > 0)
        result.items[i] = video[0].name; 
    }
      console.log(result)

      showMenu(result);
    }
    catch(error){
        alert("Something Wrong");
    }      
}

// get menu function
function showMenu(items){
  const menuContainer = document.getElementById('menu-container');
  for(let i=0; i<items.length; i++){
    let menuItem = items[i]; 
    let imageUrl = menuItem.imgSrc;
    let menuElement = document.createElement("div");
   
   const menuChildren = `
   <img class="menu-img" src = "${imageUrl}" />
   <h4 class="item-name">
   <a href="#placeOrder">${menuItem.name}</a>
   </h4>
   <p class="item-price">$${menuItem.price}</>
   <hr class="hrLine">
   `;
   menuElement.innerHTML = menuChildren;
    menuContainer.append(menuElement);
}
}

// take order function
  function placeOrder() {
    return new Promise(resolve => {
      setTimeout(() => {
        const burgers = [
          { name: 'Cheeseburger', price: 8.99 },
          { name: 'Bacon Burger', price: 9.99 },
          { name: 'Mushroom Burger', price: 10.99 }
        ];
        const order = [];
        const orderDetails = document.getElementById("orderDetails");
        for(let i=0; i<burgers.length; i++){
          
          let items = burgers[i];
          let orderElement = document.createElement("ol");
          
          const orderChildren = `<li>${items.name} $${items.price}</li>`;
           orderElement.innerHTML = orderChildren;
          orderDetails.append(orderElement);
        }
        resolve(order);
      }, 2500);
    })
  }
  
  // order preparation function
  function orderPrep() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ orderDetails: "Confirmed", paid: "Not Done" });
      }, 1500);
    });
  }
  
  function payOrder() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ orderDetails: "Confirmed", paid: "Done" });
      }, 1000);
    });
  }
  
  function thankyou() {
      
  }
  
  async function takeOrder() {
    try {
      await placeOrder();
      const prepStatus = await orderPrep();
      const paymentStatus = document.getElementById('payment-status');
      // paymentStatus.textContent = `Order Status: ${prepStatus.orderDetails}, Paid: ${prepStatus.paid}`;
  
      const paymentBoard = `

      <h5 class="order-status">Order Status : <span>${prepStatus.orderDetails}</span></h5>
      <h3 class="payment-status">Payment Status : <span>${prepStatus.paid}</span></h3>
      `;
        
      paymentStatus.innerHTML = paymentBoard;


      // Enable the "Pay" button
      const payButton = document.getElementById('pay-button');
      payButton.disabled = false;
     
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  async function pay() {
    try {
      const payment = await payOrder();
      const paymentStatus = document.getElementById('payment-status');
      const orderComfirmationMOdal = document.getElementById("orderComfirmationMOdal");

      // paymentStatus.textContent = `Order Status: ${payment.orderDetails}, Paid: ${payment.paid}`;
  
      const paymentBoard = `

      <h4 class="order-status">Order Status : <span> ${payment.orderDetails}</span></h4>
      <h2 class="payment-status">Payment Status : <span>${payment.paid}</span></h2>
      `;
        
      paymentStatus.innerHTML = paymentBoard;

      if (payment.paid) {
        thankyou();
      }
  
      // Disable the "Pay" button
      const payButton = document.getElementById('pay-button');
      payButton.disabled = true;
    } catch (error) {
      console.error('Error:', error);
    }
  }



  // Fetch the menu on page load
  fetchMenu();