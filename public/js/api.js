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
      displaySearchResults(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  function displaySearchResults(data) {
    const resultsContainer = document.getElementById('api-response-cards');
    resultsContainer.innerHTML = ''; 
  
    data.results.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';
      card.style.width = '18rem';
  
      const cardBody = document.createElement('div');
      cardBody.className = 'card-body';
  
      const cardTitle = document.createElement('h5');
      cardTitle.className = 'card-title';
      cardTitle.textContent = item.name;
  
      const cardText = document.createElement('p');
      cardText.className = 'card-text';
      cardText.textContent = item.description;
  
      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardText);
      card.appendChild(cardBody);
      resultsContainer.appendChild(card);
    });
  }