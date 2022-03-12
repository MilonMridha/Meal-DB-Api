const searchBtn = document.getElementById("search-btn");
const inputField = document.getElementById("input-field");

inputField.addEventListener("keypress", function(event) {
    // event.preventDefault();
    if (event.keyCode == 13){
      searchBtn.click();
    }
        
});

const loadMeals = () => {
  const inputField = document.getElementById("input-field");
  const singleDiv = document.getElementById("see-detail");
  singleDiv.innerHTML = "";
  const inputFieldText = inputField.value;
  inputField.value = "";
  if (inputFieldText == "" || !isNaN(inputFieldText)) {
    alert("Enter Name Spelling");
  } else {
    toggleSpinner("block");
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputFieldText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayMeals(data.meals));
  }
};
// toggle Spinner Adding Method------------->
const toggleSpinner = (displayStyle) => {
  document.getElementById("spinner").style.display = displayStyle;
};
// Display loaded Data--------------->
const displayMeals = (meals) => {
  if (!meals) {
    alert("Result Not Found");
    toggleSpinner("none");
  } else {
    const main = document.getElementById("main");
    main.innerHTML = "";
    meals.forEach((meal) => {
      const div = document.createElement("div");
      div.classList.add("col-lg-4");
      div.classList.add("mt-3");
      div.innerHTML = `<div class="card" style="width: 18rem;">
      <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">${meal.strInstructions?.slice(0, 120)}.........</p>
        <a href="#" class="btn btn-primary" onclick="seeDetailsMeal('${
          meal.idMeal
        }')">See details</a>
      </div>
      </div>
      `;
      main.appendChild(div);
      toggleSpinner("none");
    });
  }
};
// Load See details Data---------------->
const seeDetailsMeal = (mealId) => {
  toggleSpinner("block");
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displaySingleMeal(data.meals[0]));
};
//Display Single meal Data-------------->
const displaySingleMeal = (singleMeal) => {
  const singleDiv = document.getElementById("see-detail");
  singleDiv.innerHTML = "";
  const createDiv = document.createElement("div");
  createDiv.classList.add("mb-3");
  createDiv.innerHTML = `<div class="card" style="width: 18rem;">
  <img src="${singleMeal.strMealThumb}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${singleMeal.strMeal}</h5>
    <p class="card-text">${singleMeal.strInstructions}</p>
    
  </div>
</div>
  `;
  singleDiv.appendChild(createDiv);
  toggleSpinner("none");
};
