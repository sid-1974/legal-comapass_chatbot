from flask import Flask, request, render_template, redirect, url_for
import openai

# Initialize the Flask app
app = Flask(__name__)

# Set your OpenAI API key here
api_key = "api_token_key"

# Initialize token count
total_tokens_available = 850  # Adjust based on your OpenAI subscription
total_tokens_used = 0

# Function to generate a response from OpenAI API
def generate_response(prompt):
    openai.api_key = api_key
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=prompt,
        max_tokens=100,  # Adjust based on your requirements
        stop=None,  # You can specify stop words to end the response
        temperature=0.7,  # Adjust the temperature for randomness
    )
    return response.choices[0].text.strip(), response['usage']['total_tokens']

@app.route("/", methods=["GET", "POST"])
def chatbot():
    global total_tokens_used
    chat_response = ""  # Initialize chat_response

    if request.method == "POST":
        user_input = request.form["user_input"]

        if user_input:
            # Generate a response from OpenAI and track token usage
            response, tokens_used = generate_response(f"You: {user_input}\n")
            total_tokens_used += tokens_used

            # Set chat_response to the response from OpenAI
            chat_response = response

    # Calculate the last available tokens
    last_available_tokens = total_tokens_available - total_tokens_used

    # Check if tokens are less than 100 and redirect to exc.html
    if last_available_tokens < 100:
        return redirect(url_for('token_limit_exceeded'))

    return render_template(
        "index.html",
        
        chat_response=chat_response,
        total_tokens_available=total_tokens_available,
        last_available_tokens=last_available_tokens,
    )

# Redirect to 'exc.html' if token limit is exceeded
@app.route("/exceed.html")
def token_limit_exceeded():
    return render_template("exceed.html")

# ... (Your existing code)

if __name__ == "__main__":
    app.run(debug=True)
