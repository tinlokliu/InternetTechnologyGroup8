// Function to handle submission of user question
function submitQuestion() {
    var userQuestion = document.getElementById("user-question").value;
    fetch('/api/chatgpt/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRFToken': getCookie('csrftoken')  // Get the CSRF token from cookies
        },
        body: 'user_input=' + encodeURIComponent(userQuestion),
    })
    .then(response => response.json())
    .then(data => {
        // Display the response from ChatGPT
        console.log('Response:', data.response);
        // Update the UI with the response
        document.getElementById("chatgpt-response").innerText = data.response;
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle errors here
    });
    // Clear the textarea after submission
    document.getElementById("user-question").value = "";
}