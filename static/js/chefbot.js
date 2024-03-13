// chefbot.js content
function toggleTextBox() {
    var textBox = document.getElementById("chefbot-textbox");
    textBox.style.display = (textBox.style.display == "block") ? "none" : "block";
}

function submitQuestion() {
    var question = document.getElementById("user-question").value;
    var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    fetch('/ask_openai/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
        },
        body: JSON.stringify({'question': question})
    })
    .then(response => response.json())
    .then(data => {
        if(data.answer !== undefined) {
            document.getElementById("user-question").value = data.answer;
        } else {
            document.getElementById("user-question").value = "Could not get an answer.";
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '='))
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
        }
    }
    return cookieValue;
}
