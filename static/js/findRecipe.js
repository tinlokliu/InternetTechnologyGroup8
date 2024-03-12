
function redirectToAboutPage() {
    const query = document.getElementById('search').value;
    sessionStorage.setItem('query', JSON.stringify(query));
    window.location.href = catalogueUrl;
}
document.getElementById('salad').addEventListener('click', function() {
    sessionStorage.setItem('query', JSON.stringify('salad'));
    window.location.href = catalogueUrl;
});
document.getElementById('italian').addEventListener('click', function() {
    sessionStorage.setItem('query', JSON.stringify('italian'));
    window.location.href = catalogueUrl;
});
document.getElementById('vegan').addEventListener('click', function() {
    sessionStorage.setItem('query', JSON.stringify('vegan'));
    window.location.href = catalogueUrl;
});
document.getElementById('asian').addEventListener('click', function() {
    sessionStorage.setItem('query', JSON.stringify('asian'));
    window.location.href = catalogueUrl;
});
document.getElementById('soups').addEventListener('click', function() {
    sessionStorage.setItem('query', JSON.stringify('soups'));
    window.location.href = catalogueUrl;
});
document.getElementById('mexican').addEventListener('click', function() {
    sessionStorage.setItem('query', JSON.stringify('mexican'));
    window.location.href = catalogueUrl;
});
document.getElementById('mediterranean').addEventListener('click', function() {
    sessionStorage.setItem('query', JSON.stringify('mediterranean'));
    window.location.href = catalogueUrl;
});
document.getElementById('vegetarian').addEventListener('click', function() {
    sessionStorage.setItem('query', JSON.stringify('vegetarian'));
    window.location.href = catalogueUrl;
});
document.getElementById('Breakfast,Brunch').addEventListener('click', function() {
    sessionStorage.setItem('query', JSON.stringify('Breakfast,Brunch'));
    window.location.href = catalogueUrl;
});

