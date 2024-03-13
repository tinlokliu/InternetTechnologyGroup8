// Wait for the document to fully load before running the script
document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the saved search query from session storage
    const savedQuery = sessionStorage.getItem('query');
    console.log(savedQuery);

    // Check if there was a saved query
    if (savedQuery !== null) {
        // Use the saved query to fetch recipes and then process the data
        getRecipes(savedQuery).then(recipes => {
            // Select all elements with the class 'card-title' to update their text content
            const titles = document.querySelectorAll('.card-title');
            titles.forEach((titleElement, index) => {
                // Check if there is a corresponding recipe for the title element
                if (recipes[index]) {
                    titleElement.textContent = recipes[index].title;
                }
            });

            // Select all elements with the class 'card-img-top' to update their source and alt text
            const images = document.querySelectorAll('.card-img-top');
            images.forEach((imageElement, index) => {
                // Check if there is a corresponding recipe for the image element
                if (recipes[index]) {
                    imageElement.src = recipes[index].image;
                    imageElement.alt = recipes[index].title;
                }
            });

            // Select all elements with the class 'show-detail' to set their data attribute and click event listener
            const button = document.querySelectorAll('.show-detail');
            button.forEach((button, index) => {
                if (recipes[index]) {
                    // Set the data-recipe-id attribute to the recipe's ID
                    button.setAttribute('data-recipe-id', recipes[index].id);
                    // Add a click event listener to save the recipe ID into session storage
                    button.addEventListener('click', function() {
                        const recipeId = this.getAttribute('data-recipe-id');
                        sessionStorage.setItem('recipeId', JSON.stringify(recipeId));
                        console.log('Recipe ID saved to cookie:', recipeId);
                    });
                }
            });
        });

    } else {
        // Log a message if no saved query was found
        console.log('No saved query to fetch.');
    }
});

// Define an asynchronous function to fetch recipes based on a query
async function getRecipes(q) {
    // Define the API key and the query URL
    const apiKey = '4b90bda2e14846efb68086d1be36fe12';
    const query = q;
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}&number=16`;

    try {
        // Attempt to fetch the data from the API
        const response = await fetch(url);
        const data = await response.json();
        // Return the results array from the fetched data
        return data.results;
    } catch (error) {
        // Log an error message if the fetch operation fails
        console.error('Error fetching recipe details:', error);
        return [];
    }
}
