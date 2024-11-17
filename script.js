// Get references to HTML elements
let submitButton = document.querySelector("#submit-btn");
let inputField = document.querySelector("#user-guess");
let feedbackElement = document.querySelector("#feedback");
let playAgainButton = document.querySelector("#play-again");

let secretNumber = generateRandomNumber(); // Initial secret number
let guessCount = 0;
let maxGuesses = 5;

// Function to generate a random number between 0 and 10
function generateRandomNumber() {
    return Math.floor(Math.random() * 11); // Random number between 0 and 10
}

// Function to handle user guess
function handleGuess() {
    let userInput = inputField.value;
    guessCount++;

    // Validate input
    if (userInput === "") {
        alert("Please Enter a number");
        feedbackElement.textContent = "Please enter a number.";
        feedbackElement.className = "feedback wrong";
        return;
    } else if (isNaN(userInput) || userInput < 0 || userInput > 10) {
        feedbackElement.textContent = "Please enter a number between 0 and 10.";
        feedbackElement.className = "feedback wrong";
        return;
    }

    // Check the guess against the secret number
    let guess = parseInt(userInput);
    if (guess === secretNumber) {
        feedbackElement.textContent = "Congratulations! You guessed the correct number!";
        feedbackElement.className = "feedback correct";
        endGame();
    } else if (guess < secretNumber) {
        feedbackElement.textContent = "Too low! Try again.";
        feedbackElement.className = "feedback too-low";
    } else {
        feedbackElement.textContent = "Too high! Try again.";
        feedbackElement.className = "feedback too-high";
    }

    // If max guesses reached, end the game
    if (guessCount >= maxGuesses && guess !== secretNumber) {
        feedbackElement.textContent = `Game over! The number was ${secretNumber}.`;
        feedbackElement.className = "feedback wrong";
        endGame();
    }

    // Clear input field after each guess
    inputField.value = "";
}

// Function to end the game and show the "Play Again" button
function endGame() {
    submitButton.disabled = true;
    playAgainButton.style.display = "inline-block"; // Show "Play Again" button
}

// Function to restart the game
function restartGame() {
    secretNumber = generateRandomNumber(); // Generate a new secret number
    guessCount = 0;
    submitButton.disabled = false;
    feedbackElement.textContent = "";
    playAgainButton.style.display = "none"; // Hide "Play Again" button
    inputField.value = ""; // Clear input field
}

// Event listeners
submitButton.addEventListener('click', handleGuess);
playAgainButton.addEventListener('click', restartGame);
