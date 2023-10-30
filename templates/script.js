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

// JavaScript function to check referrer and redirect if not authorized
/*
function checkReferrerAndRedirect() {
	const referrer = document.referrer;
	// Check if the referrer is empty or not the authorized URL
	if (referrer === '' || referrer !== 'https://legalcomp.netlify.app/') {
		// Redirect to not authorized page or take other actions
		window.location.href = 'https://legalcomp.netlify.app/';
	}
}

// Check referrer when the page loads
window.onload = checkReferrerAndRedirect;*/