async function searchItems(query) {
  try {
    const response = await fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, limit: 6 }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();
    console.log(data);
    displaySearchResults(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

function displaySearchResults(data) {
  const resultsContainer = document.getElementById("api-response-cards");
  resultsContainer.innerHTML = "";

  const hintsArray = data.results.hints;
  const limitedHintsArray = hintsArray.slice(0, 6);

  const row1 = document.createElement("div");
  row1.className = "row row-cols-1 row-cols-md-3 g-4";

  limitedHintsArray.forEach((item, index) => {
    const food = item.food;

    const col = document.createElement("div");
    col.className = "col-md-4";

    const card = document.createElement("div");
    card.className = "card";
    card.style.width = "100%";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const cardTitle = document.createElement("h5");
    cardTitle.id = food.foodId;
    cardTitle.className = "card-title";
    cardTitle.textContent = food.label;

    const cardImage = document.createElement("img");
    cardImage.className = "card-img-top";
    cardImage.src = food.image;

    const inputBox = document.createElement("div");
    inputBox.className = "row inputBox-margins"

    const addButton = document.createElement("button");
    addButton.className = "col btn btn-info btn-sm";
    addButton.textContent = "Add to List";
    addButton.addEventListener("click", (event) => {
      
      addToItemList(food.foodId, food.label);      
    });

    const quantityForm = document.createElement("input");
    quantityForm.className = "col form-control form-control-sm form-width-overwrite";
    quantityForm.type = "number";
    quantityForm.value = "1";

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardImage);
    inputBox.appendChild(addButton);
    inputBox.appendChild(quantityForm);
    cardBody.appendChild(inputBox);
    card.appendChild(cardBody);
    col.appendChild(card);
    row1.appendChild(col);
   
  });

  resultsContainer.appendChild(row1);  
}

async function addToItemList(foodId, foodLabel) {
  // console.log(foodLabel);
  try {
    const response = await fetch(`/api/products/`, {
      method: "POST",
      body: JSON.stringify({ foodId, foodLabel }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    // console.log(data);
    if (response.ok) {
      product_id = data.id;
      // console.log(foodId);
    } else if (data.name === "SequelizeUniqueConstraintError") {
      // console.log(3);
      const response = await fetch(`/api/products/${foodLabel}`);
      const res = await response.json();
      product_id = res[0].id;
      // console.log(res[0].id);
    }
    console.log(product_id);
    const createResponse = await fetch(`/api/listProducts/${product_id}`, {
      method: "POST",
      body: JSON.stringify({ list_id }),
      headers: { "Content-Type": "application/json" },
    });
    const createData = await createResponse.json();
    if (createData.ok) {
      document.location.replace("/");
    }
  } catch (err) {
    console.log(err);
  }
}
