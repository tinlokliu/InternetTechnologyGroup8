// Function to redirect the user to the catalogue page after saving their search query
function redirectToAboutPage() {
    // Retrieve the value from the search input field
    const query = document.getElementById('search').value;
    // Save the search query to session storage
    sessionStorage.setItem('query', JSON.stringify(query));
    // Redirect the user to the catalogue page
    window.location.href = catalogueUrl;
}

// Add click event listeners to various elements. 
// When clicked, these will save a specific query to session storage and then redirect the user to the catalogue page.

// Add event listener for clicking on the 'salad' option
document.getElementById('salad').addEventListener('click', function() {
    sessionStorage.setItem('query', JSON.stringify('salad'));
    window.location.href = catalogueUrl;
});

// Add event listener for clicking on the 'italian' option
document.getElementById('italian').addEventListener('click', function() {
    sessionStorage.setItem('query', JSON.stringify('italian'));
    window.location.href = catalogueUrl;
});

// Add event listener for clicking on the 'vegan' option
document.getElementById('vegan').addEventListener('click', function() {
    sessionStorage.setItem('query', JSON.stringify('vegan'));
    window.location.href = catalogueUrl;
});

// Add event listener for clicking on the 'asian' option
document.getElementById('asian').addEventListener('click', function() {
    sessionStorage.setItem('query', JSON.stringify('asian'));
    window.location.href = catalogueUrl;
});

// Add event listener for clicking on the 'soups' option
document.getElementById('soups').addEventListener('click', function() {
    sessionStorage.setItem('query', JSON.stringify('soups'));
    window.location.href = catalogueUrl;
});

// Add event listener for clicking on the 'mexican' option
document.getElementById('mexican').addEventListener('click', function() {
    sessionStorage.setItem('query', JSON.stringify('mexican'));
    window.location.href = catalogueUrl;
});

// Add event listener for clicking on the 'mediterranean' option
document.getElementById('mediterranean').addEventListener('click', function() {
    sessionStorage.setItem('query', JSON.stringify('mediterranean'));
    window.location.href = catalogueUrl;
});

// Add event listener for clicking on the 'vegetarian' option
document.getElementById('vegetarian').addEventListener('click', function() {
    sessionStorage.setItem('query', JSON.stringify('vegetarian'));
    window.location.href = catalogueUrl;
});

// Add event listener for clicking on the 'Breakfast,Brunch' option
document.getElementById('Breakfast,Brunch').addEventListener('click', function() {
    sessionStorage.setItem('query', JSON.stringify('Breakfast,Brunch'));
    window.location.href = catalogueUrl;
});
