(async function () {
  let response = await fetch("./recipes.json");
  let recipes = await response.json();
  //console.log(recipes);
  // console.log(response);

  const inputElem = document.getElementById("searchInput");
  const btnElem = document.getElementById("searchBtn");
  // console.log(searchElem);
  const listElem = document.getElementById("recipe-list");
  //console.log(listElem);
  const detailsElem = document.getElementById("recipeDetailsContainer")

  // Load Details 
    function loadRecipesDetails(recipe){
        //console.log(recipe);
        detailsElem.innerHTML = `
        <h2 class="title">${recipe.title}</h2>
        <h3>Ingredients:</h3>
        <ul>${recipe.ingredients.map(function (ingredient) {
          return "<li>" + ingredient + "</li>"
        }).join("")}</ul>
        <h3>Instruction:</h3>
        <div>${recipe.instructions}</div>
    `;
    }

// display to Ui
function displaySearchResult (results) {
    listElem.innerHTML = "";
    results.forEach(function (recipe) {
      const li = document.createElement("li");
      const listItem = `
          <h2 class="title">${recipe.title}</h2>
          <div class="description">${recipe.description}</div>
      `;
      li.innerHTML = listItem;
      li.addEventListener("click", function () {
        loadRecipesDetails(recipe);
      });
      listElem.appendChild(li);
    })
  }

  // Search in JAVASCRIPT
  function search() {
    //console.log("Event Listen are req");
    const query = inputElem.value;
    //console.log(query);
    const results = recipes.filter(function (recipe) {
      return (
        recipe.title.toLowerCase().includes(query) ||
        recipe.ingredients.join(" ").toLowerCase().includes(query)
      );
    });
    //console.log(results);
    displaySearchResult(results);
  }

  btnElem.addEventListener("click", search);
})();
