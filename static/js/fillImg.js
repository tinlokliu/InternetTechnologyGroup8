document.addEventListener('DOMContentLoaded', function() {

    const savedQuery = sessionStorage.getItem('query');  
    console.log(savedQuery);

    if (savedQuery !== null) {

        getRecipes(savedQuery).then(recipes => {
            const titles = document.querySelectorAll('.card-title');
            titles.forEach((titleElement, index) => {
                if (recipes[index]) {
                    titleElement.textContent = recipes[index].title;  
                }
            });

            const images = document.querySelectorAll('.card-img-top');
            images.forEach((imageElement, index) => {
                if (recipes[index]) {
                    imageElement.src = recipes[index].image;  
                    imageElement.alt = recipes[index].title;  
                }
            });

            const button = document.querySelectorAll('.show-detail');
            button.forEach((button, index) => {
            if (recipes[index]) {
                button.setAttribute('data-recipe-id', recipes[index].id);
                button.addEventListener('click', function() {
                    const recipeId = this.getAttribute('data-recipe-id');
                    sessionStorage.setItem('recipeId', JSON.stringify(recipeId));
                    console.log('Recipe ID saved to cookie:', recipeId);
                    });
                }
            });
        });


    } else {
        console.log('No saved query to fetch.');
    }
});

async function getRecipes(q) {

    const apiKey = '4b90bda2e14846efb68086d1be36fe12';
    const query = q;
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}&number=16`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results;  

    } catch (error) {
        console.error('Error fetching recipe details:', error);
        return [];  
    }
}
