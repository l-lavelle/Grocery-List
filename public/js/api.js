async function searchItems(query) {
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, limit: 6 }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
  
      const data = await response.json();
      console.log(data);
      displaySearchResults(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  function displaySearchResults(data) {
    const resultsContainer = document.getElementById('api-response-cards');
    resultsContainer.innerHTML = ''; 

    const hintsArray = data.results.hints;
    const limitedHintsArray = hintsArray.slice(0, 6);

    const row1 = document.createElement('div');
    row1.className = 'row';

    const row2 = document.createElement('div');
    row2.className = 'row';

    limitedHintsArray.forEach((item, index) => {
        const food = item.food;
        
        const col = document.createElement('div');
        col.className = 'col-md-4';

        const card = document.createElement('div');
        card.className = 'card';
        card.style.width = '100%';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title';
        cardTitle.textContent = food.label; 

        const cardImage = document.createElement('img');
        cardImage.className = 'card-img-top';
        cardImage.src = food.image; 

        const addButton = document.createElement('button');
        addButton.className = 'btn btn-primary';
        addButton.textContent = 'Add to List';
        addButton.addEventListener('click', () => {
            addToItemList(food.foodId, food.label);
        });

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardImage);
        cardBody.appendChild(addButton);
        card.appendChild(cardBody);
        col.appendChild(card);

        if (index < 3) {
            row1.appendChild(col);
        } else {
            row2.appendChild(col);
        }
    });

    resultsContainer.appendChild(row1);
    resultsContainer.appendChild(row2);
}
  
  function addToItemList(foodId, foodLabel) {
    // TODO: Add item to list
    console.log('Added to list:', { foodId, foodLabel });
  }