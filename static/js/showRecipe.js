// Scrolls to the comment form smoothly when this function is called.
function scrollToCommentForm() {
    var commentForm = document.getElementById('comment_form');
    commentForm.style.display = 'block';
    commentForm.scrollIntoView({ behavior: 'smooth' });
}

// Validates the comment input to ensure it's not empty before submission.
function validateComment() {
    var commentContent = document.getElementById('comment_content').value;
    if (commentContent.trim() === '') {
        alert('The content cannot be empty. Please enter the content.');
        return false;
    }
    return true;
}

// Once the DOM is fully loaded, this code block executes.
document.addEventListener('DOMContentLoaded', function() {
    // Retrieves the saved recipe ID from sessionStorage, removes quotes, and parses it as an integer.
    const savedIDString = sessionStorage.getItem('recipeId').replace(/"/g, '');
    const savedID = parseInt(savedIDString.trim(), 10);
    console.log(savedID);

    // Fetches recipe details based on the saved ID and displays them.
    getRecipeDetails(savedID);
    async function getRecipeDetails(ID) {
        const apiKey = '4b90bda2e14846efb68086d1be36fe12'; // Your API key.
        const apiUrl = `https://api.spoonacular.com/recipes/${ID}/information?apiKey=${apiKey}`;
        console.log('finding');
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            displayRecipeDetails(data);
        } catch (error) {
            console.error('Error fetching recipe details:', error);
        }
    }

    // Displays the recipe details on the webpage.
    function displayRecipeDetails(recipe) {
        // Updates all elements with class 'recipe-img' with the recipe's image.
        const img = document.querySelectorAll('.recipe-img');
        img.forEach((imageElement) => {
            console.log('img load');
            imageElement.src = recipe.image;  
        });

        // Sets the recipe title.
        var nameElement = document.querySelector('.boxnamezi');
        nameElement.innerHTML = '<strong>' + recipe.title + '</strong>';

        // Sets the recipe source name.
        var authorElement = document.querySelector('.boxdizi');
        authorElement.innerHTML = recipe.sourceName;

        // Sets the cooking time.
        var cookElement = document.querySelector('.cook-time');
        cookElement.innerHTML = recipe.readyInMinutes + '    Minutes';

        // Displays the health score and servings.
        const scoreDiv = document.querySelector('.score');
        scoreDiv.innerHTML = `<li> Health score: ${recipe.healthScore}</li>
                              <li> For people: ${recipe.servings}</li>`;

        // Clears and sets the ingredients and instructions sections.
        const ingredientsDiv = document.querySelector('.zhuti1');
        const methodDiv = document.querySelector('.zhuti2');

        ingredientsDiv.innerHTML = '';
        methodDiv.innerHTML = '';

        // Constructs the ingredients list HTML.
        let ingredientsHtml = '<h3>INGREDIENTS:</h3><ul>';
        recipe.extendedIngredients.forEach(ingredient => {
            ingredientsHtml += `<li>${ingredient.original}</li>`;
        });
        ingredientsHtml += '</ul>';

        // Constructs the instructions HTML.
        let instructionsHtml = recipe.instructions ? `<h3>Method:</h3><p>${recipe.instructions}</p>` : '';

        // Updates the DOM with ingredients and instructions.
        ingredientsDiv.innerHTML = ingredientsHtml;
        methodDiv.innerHTML = instructionsHtml;
    }
})
