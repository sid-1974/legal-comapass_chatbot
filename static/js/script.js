const chatDiv = document.getElementById('chat');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

if (!document.cookie.includes('alertDisplayed=true')) {
    alert("This AI response may take a few seconds. Please wait and don't refresh the page after your submit.");
    document.cookie = 'alertDisplayed=true; expires=Thu, 31 Dec 2099 12:00:00 UTC; path=/';
}

sendButton.addEventListener('click', async () => {
    const userMessage = userInput.value;
    if (!userMessage) return;

    chatDiv.innerHTML += `<div class="message user-message"><span class="message-label">User:</span> ${userMessage}</div>`;

    const response = await fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();

    chatDiv.innerHTML += `<div class="message ai-message"><span class="message-label">AI:</span> ${data.message}</div>`;

    userInput.value = '';

    chatDiv.scrollTop = chatDiv.scrollHeight;
});
function disableBackButton() {
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', function () {
                history.pushState(null, null, document.URL);
            });
        }

        // Add a click event to the "Sign Out" link to call the function
        document.getElementById('sign-out-link').onclick = function () {
            // Perform your logout actions here
            // For example, you can redirect the user to the logout page
            window.location.href = 'logout.html';

            // Disable the back button
            disableBackButton();
        };

