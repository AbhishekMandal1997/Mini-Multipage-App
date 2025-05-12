// DOM elements
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const confirmation = document.getElementById('confirmation');
const submissionTime = document.getElementById('submissionTime');
const closeConfirmationBtn = document.getElementById('closeConfirmation');
const counterElement = document.getElementById('counter');

let startTime = null;

// Start timing on form interaction
[nameInput, emailInput, messageInput].forEach(input => {
  input.addEventListener('focus', () => {
    if (!startTime) startTime = new Date();
  });
});

// Validation functions
const validateField = (input, errorElement, regex, errorMessage) => {
  if (!input.value.trim()) {
    errorElement.textContent = `${input.name} is required`;
    return false;
  } else if (!regex.test(input.value)) {
    errorElement.textContent = errorMessage;
    return false;
  }
  errorElement.textContent = '';
  return true;
};

// Save name and time to localStorage
const saveNameToList = (name, timeMessage) => {
  const savedNames = JSON.parse(localStorage.getItem('sortableNames') || '[]');
  savedNames.push({ name, submissionTime: timeMessage });
  localStorage.setItem('sortableNames', JSON.stringify(savedNames));
};

// Form submission
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const isNameValid = validateField(nameInput, nameError, /^[A-Za-z\s]+$/, 'Only letters and spaces allowed');
  const isEmailValid = validateField(emailInput, emailError, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address');
  const isMessageValid = validateField(messageInput, messageError, /.+/, 'Message cannot be empty');

  if (isNameValid && isEmailValid && isMessageValid) {
    const timeTaken = Math.floor((new Date() - startTime) / 1000);
    const timeMessage = `${Math.floor(timeTaken / 60)}m ${timeTaken % 60}s`;

    saveNameToList(nameInput.value, timeMessage);

    submissionTime.textContent = `It took you ${timeMessage} to complete the form.`;
    confirmation.classList.add('visible');
    contactForm.reset();
    startTime = null;
  }
});

// Close confirmation
closeConfirmationBtn.addEventListener('click', () => {
  confirmation.classList.remove('visible');
});

// Counter functionality
const setupCounter = (element) => {
  let counter = 0;
  element.textContent = `count is ${counter}`;
  element.addEventListener('click', () => {
    element.textContent = `count is ${++counter}`;
  });
};

// Initialize counter
if (counterElement) setupCounter(counterElement);