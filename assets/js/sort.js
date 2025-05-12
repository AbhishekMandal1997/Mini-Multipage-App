//Get our HTML elements
const buttons = {
  sort: document.getElementById('sortButton'),
  reset: document.getElementById('resetButton')
};
const cardContainer = document.getElementById('namesList');

//Setup our initial data
const sampleNames = [
  { name: 'Pawan Singh', submissionTime: '-' },
  { name: 'Pankaj Sudheer', submissionTime: '-' },
  { name: 'Nagarjun Bedade', submissionTime: '-' },
  { name: 'Mishti Shukla', submissionTime: '-' },
  { name: 'Shekhar Suman', submissionTime: '-' }
];

//Get saved names from storage or use empty array if none exist
const storedNames = JSON.parse(localStorage.getItem('sortableNames') || '[]');

//Combine sample and stored names
const allNames = [...sampleNames, ...storedNames];

//Create and show our cards
function showCards(nameList) {
  // Create HTML for each name
  const cards = nameList.map(person => `
      <div class="card">
          <span class="name">${person.name}</span>
          <span class="submission-time">${person.submissionTime}</span>
      </div>
  `);

  // Add all cards to the container
  cardContainer.innerHTML = cards.join('');
}

//Sort names A-Z
function sortNames() {
  // Make a copy and sort it
  const sortedList = [...allNames].sort((a, b) => {
    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
  });

  // Show sorted list
  showCards(sortedList);

  // Update buttons
  buttons.sort.disabled = true;
  buttons.reset.disabled = false;
}

//Reset to original order
function resetNames() {
  // Show original list
  showCards(allNames);

  // Update buttons
  buttons.sort.disabled = false;
  buttons.reset.disabled = true;
}

//Add simple animation
const cardAnimation = `
  .card {
      animation: slideIn 0.3s ease-out;
  }
  @keyframes slideIn {
      from { 
          opacity: 0;
          transform: translateY(-10px);
      }
      to {
          opacity: 1;
          transform: translateY(0);
      }
  }
`;

// Add animation to page
const styleTag = document.createElement('style');
styleTag.textContent = cardAnimation;
document.head.appendChild(styleTag);

//Setup everything when page loads
function startApp() {
  // Show initial list
  showCards(allNames);

  // Add button clicks
  buttons.sort.addEventListener('click', sortNames);
  buttons.reset.addEventListener('click', resetNames);

  // Reset button starts disabled
  buttons.reset.disabled = true;
}

// Start the app
startApp();