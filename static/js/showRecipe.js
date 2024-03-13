function scrollToCommentForm() {
    var commentForm = document.getElementById('comment_form');
    commentForm.style.display = 'block';
    commentForm.scrollIntoView({ behavior: 'smooth' });
}

function validateComment() {
    var commentContent = document.getElementById('comment_content').value;
    if (commentContent.trim() === '') {
        alert('The content cannot be empty. Please enter the content.');
        return false;
    }
    return true;
}

document.addEventListener('DOMContentLoaded', function() {

    const savedIDString = sessionStorage.getItem('recipeId').replace(/"/g, '');
    const savedID = parseInt(savedIDString.trim(), 10);
    console.log(savedID);

    getRecipeDetails(savedID)
    async function getRecipeDetails(ID) {
        const apiKey = '4b90bda2e14846efb68086d1be36fe12'; 
        const apiUrl = `https://api.spoonacular.com/recipes/${ID}/information?apiKey=${apiKey}`;
        console.log('finding')
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            displayRecipeDetails(data);
        } catch (error) {
            console.error('Error fetching recipe details:', error);
        }
    }

    function displayRecipeDetails(recipe) {

        const img = document.querySelectorAll('.recipe-img');
        img.forEach((imageElement) => {
            console.log('img load');
            imageElement.src = recipe.image;  
                });
        
        var nameElement = document.querySelector('.boxnamezi');
        nameElement.innerHTML = '<strong>' + recipe.title + '</strong>';;
        
        var authorElement = document.querySelector('.boxdizi');
        authorElement.innerHTML = recipe.sourceName;;

        var cookElement = document.querySelector('.cook-time');
        cookElement.innerHTML = recipe.readyInMinutes + '    Minutes';;
        
        const scoreDiv = document.querySelector('.score');
        scoreDiv.innerHTML = `<li> Health score: ${recipe.healthScore}</li>
                            <li> For people: ${recipe.servings}</li>`;

        const ingredientsDiv = document.querySelector('.zhuti1');
        const methodDiv = document.querySelector('.zhuti2');
        
        ingredientsDiv.innerHTML = '';
        methodDiv.innerHTML = '';

        let ingredientsHtml = '<h3>INGREDIENTS:</h3><ul>';
        recipe.extendedIngredients.forEach(ingredient => {
            ingredientsHtml += `<li>${ingredient.original}</li>`;
        });
        ingredientsHtml += '</ul>';

        let instructionsHtml = recipe.instructions ? `<h3>Method:</h3><p>${recipe.instructions}</p>` : '';
        
        ingredientsDiv.innerHTML = ingredientsHtml;
        methodDiv.innerHTML = instructionsHtml;

    }
})