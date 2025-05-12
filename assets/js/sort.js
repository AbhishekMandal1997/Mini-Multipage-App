// DOM elements
const sortButton = document.getElementById('sortButton');
const resetButton = document.getElementById('resetButton');
const namesList = document.getElementById('namesList');

// Default and saved names
const defaultNames = [
  { name: 'Emma Johnson', submissionTime: '-' },
  { name: 'James Smith', submissionTime: '-' },
  { name: 'Olivia Williams', submissionTime: '-' },
  { name: 'Noah Brown', submissionTime: '-' },
  { name: 'Sophia Jones', submissionTime: '-' }
];
const savedNames = JSON.parse(localStorage.getItem('sortableNames') || '[]');
const originalNames = [...defaultNames, ...savedNames];

// Render the list
function renderList(names) {
  namesList.innerHTML = names
    .map(nameData => `
      <li>
        <span class="name">${nameData.name}</span>
        <span class="submission-time">${nameData.submissionTime}</span>
      </li>
    `)
    .join('');
}

// Sort the list alphabetically
function sortAlphabetically() {
  const sortedNames = [...originalNames].sort((a, b) => a.name.localeCompare(b.name));
  renderList(sortedNames);
  toggleButtons(true);
}

// Reset the list to its original order
function resetList() {
  renderList(originalNames);
  toggleButtons(false);
}

// Toggle button states
function toggleButtons(isSorted) {
  sortButton.disabled = isSorted;
  resetButton.disabled = !isSorted;
}

// Initialize the list and event listeners
function initialize() {
  renderList(originalNames);
  sortButton.addEventListener('click', sortAlphabetically);
  resetButton.addEventListener('click', resetList);
  toggleButtons(false);
}

// Add fade-in animation
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  li { animation: fadeIn 0.3s ease-out; }
`;
document.head.appendChild(style);

// Initialize on page load
initialize();