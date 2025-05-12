const form = document.getElementById('contactForm');
const name = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');
const nameErr = document.getElementById('nameError');
const emailErr = document.getElementById('emailError');
const msgErr = document.getElementById('messageError');
const confirmBox = document.getElementById('confirmation');
const timeText = document.getElementById('submissionTime');
const closeBtn = document.getElementById('closeConfirmation');
const counter = document.getElementById('counter');

let startedAt = null;

// Start timer on first focus
[name, email, message].forEach(input => {
  input.addEventListener('focus', () => {
    if (!startedAt) startedAt = new Date();
  });
});

// Check input
function check(input, errorBox, pattern, msg) {
  let val = input.value.trim();
  if (!val) {
    errorBox.textContent = `${input.name} is required`;
    return false;
  }
  if (!pattern.test(val)) {
    errorBox.textContent = msg;
    return false;
  }
  errorBox.textContent = '';
  return true;
}

// Save name and time
function save(name, time) {
  let list = JSON.parse(localStorage.getItem('sortableNames') || '[]');
  list.push({ name, submissionTime: time });
  localStorage.setItem('sortableNames', JSON.stringify(list));
}

// On form submit
form.addEventListener('submit', (e) => {
  e.preventDefault();

  let validName = check(name, nameErr, /^[A-Za-z\s]+$/, 'Only letters & spaces');
  let validEmail = check(email, emailErr, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email');
  let validMsg = check(message, msgErr, /.+/, 'Message required');

  if (validName && validEmail && validMsg) {
    let seconds = Math.floor((new Date() - startedAt) / 1000);
    let timeStr = `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
    timeText.textContent = `It took you ${timeStr} to complete the form.`;
    confirmBox.classList.add('visible');
    save(name.value, timeStr);
    form.reset();
    startedAt = null;
  }
});

// Close confirmation
closeBtn.addEventListener('click', () => confirmBox.classList.remove('visible'));

// Simple counter
if (counter) {
  let count = 0;
  counter.textContent = `count is ${count}`;
  counter.addEventListener('click', () => {
    counter.textContent = `count is ${++count}`;
  });
}
