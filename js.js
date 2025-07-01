const toggleSidebar = () => {
  const taskbar = document.getElementById("taskbar");
  taskbar.classList.toggle("open");
};

const confirmOrder = () => {
  total = 0;
  document.getElementById("totalAmount").innerText = total;

  const listContainer = document.getElementById("listContainer");
  listContainer.innerHTML = '';

  alert("Thank you for shopping with us! Your order has been confirmed and is being processed. We look forward to serving you again soon!");
};

const resetTotal = () => {
  total = 0;
  document.getElementById("totalAmount").innerText = total;
  
  const listContainer = document.getElementById("listContainer");
  listContainer.innerHTML = '';
};

let total = 0;
const add = (item, price) => {
  const listContainer = document.getElementById("listContainer");

  const newItem = document.createElement("div");
  newItem.textContent = item;
  listContainer.appendChild(newItem);

  total += price;
  document.getElementById("totalAmount").innerText = `${total.toFixed(2)}`;
};

document.addEventListener("DOMContentLoaded", () => {

  const stars = document.querySelectorAll(".rating span");
  const feedback = document.getElementById("feedback");
  const submitButton = document.getElementById("submit-rating");
  const responseMessage = document.getElementById("response-message");

  let selectedRating = 0;

  stars.forEach(star => {
    star.addEventListener("click", () => {
      selectedRating = +star.dataset.value;

      stars.forEach(s => s.classList.remove("selected"));
      star.classList.add("selected");
    });
  });

  submitButton.addEventListener("click", () => {
    if (selectedRating === 0) {
      responseMessage.textContent = "Please select a rating.";
    } else if (feedback.value.trim() === "") {
      responseMessage.textContent = "Please provide feedback.";
    } else {
      responseMessage.textContent = `Thank you! You rated us ${selectedRating} stars.`;
      feedback.value = "";
      stars.forEach(s => s.classList.remove("selected"));
      selectedRating = 0;
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.getElementById("submitButton");
  const feedback = document.getElementById("feedback");
  const responseMessage = document.getElementById("responseMessage");
  const stars = document.querySelectorAll(".star");

  let selectedRating = 0;

  submitButton.addEventListener("click", () => {
    if (selectedRating === 0) {
      responseMessage.textContent = "Please select a rating.";
    } else if (feedback.value.trim() === "") {
      responseMessage.textContent = "Please provide feedback.";
    } else {
      responseMessage.textContent = `Thank you for your feedback! You rated us ${selectedRating} stars.`;
      feedback.value = "";
      stars.forEach(star => star.classList.remove("selected"));
      selectedRating = 0;
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
  let currentIndex = 0;
  const slides = document.querySelectorAll(".slide");

  const showNextSlide = () => {
    slides[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add("active");
  };

  setInterval(showNextSlide, 3000);
});

const getRandomRecipe = () => {
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(response => response.json())
    .then(({ meals: [meal] }) => {
      const { 
        strMeal, 
        strCategory, 
        strArea, 
        strInstructions, 
        strMealThumb 
      } = meal;

      const title = document.getElementById("meal-title");
      const img = document.getElementById("meal-image");
      const category = document.getElementById("meal-category");
      const origin = document.getElementById("meal-origin");
      const instructions = document.getElementById("meal-instructions");

      title.textContent = strMeal;
      category.textContent = strCategory;
      origin.textContent = strArea;
      instructions.textContent = `${strInstructions.slice(0, 300)}...`;

      const tempImg = new Image();
      tempImg.src = strMealThumb;

      img.classList.remove("loaded");
      img.classList.add("loading");

      tempImg.onload = () => {
        img.src = strMealThumb;
        img.classList.remove("loading");
        img.classList.add("loaded");
      };
    })
    .catch(error => {
      document.getElementById("mealContainer").innerHTML = "<p>Erreur lors du chargement de la recette.</p>";
      console.error(error);
    });
};

window.addEventListener("load", getRandomRecipe);

let errorDiv = null;

const nextStep = (current) => {
  if (current === 1) {
    const email = document.getElementById('email').value;
    if (!validateEmail(email)) {
      showError("Please enter a valid email.");
      return;
    }
  }

  clearError();
  document.getElementById(`step${current}`).classList.remove('active');
  document.getElementById(`step${current + 1}`).classList.add('active');
};

const prevStep = (current) => {
  clearError();
  document.getElementById(`step${current}`).classList.remove('active');
  document.getElementById(`step${current - 1}`).classList.add('active');
};

const form = document.getElementById('multiStepForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;

  if (!validateEmail(email)) {
    showError("Veuillez entrer un email valide.");
    document.getElementById('step3').classList.remove('active');
    document.getElementById('step1').classList.add('active');
    return;
  }

  clearError();
  window.location.href = "home.html";
});

const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

const showError = (message) => {
  if (!errorDiv) {
    errorDiv = document.createElement('div');
    errorDiv.style.color = 'red';
    errorDiv.style.marginTop = '15px';
    form.appendChild(errorDiv);
  }
  errorDiv.textContent = message;
};

const clearError = () => {
  if (errorDiv) {
    errorDiv.textContent = '';
  }
};

window.nextStep = nextStep;
window.prevStep = prevStep;

/*
  Multi-step Form Logic
  This script handles a multi-step form using plain JavaScript, without any framework.

  How it works:
     The form is divided into separate "steps" (step1, step2, step3), each shown one at a time.
     Only the current step has the .active class, making it visible. 
     The others are hidden with CSS.

  Navigation:
     The nextStep(current) and prevStep(current) functions handle moving forward or backward 
      by switching which step is active.
     When moving from step1, the script validates the email format. If it's invalid it shows
      an error message and stops.

  Submission:
     On form submit, it checks again that the email is valid.
     If the check fails, an error message appears and the form resets to step1.
     If everything is valid the user is redirected to home.html.

  Utility functions:
    - validateEmail uses a simple regex to check the email format.
    - showError displays a message below the form in red.
    - clearError clears any existing error message.

  This approach avoids any frameworks keeps the code lightweight and easy to maintain
  and allows smooth step-by-step progression for the user
*/
