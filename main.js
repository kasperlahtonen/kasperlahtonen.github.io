// Mouse ball animation variables
let mouseX = 0, mouseY = 0;
let ballX = 0, ballY = 0;

const ball = document.querySelector('.mouse-ball');
const speed = 0.14;

// Update the mouse position on move
document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

// Function to smoothly move the ball towards the cursor
function animateBall() {
    ballX += (mouseX - ballX) * speed;
    ballY += (mouseY - ballY) * speed;

    // Update ball position
    ball.style.transform = `translate(${ballX - 12.5}px, ${ballY - 12.5}px) scale(1)`;

    // Continuously update position using requestAnimationFrame
    requestAnimationFrame(animateBall);
}

// Start the animation loop
animateBall();

// Handle navigation links hover effect
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        navLinks.forEach(otherLink => {
            if (otherLink !== link) {
                otherLink.style.color = 'rgba(33, 29, 33, 0.5)'; // Gray out the other links
            }
        });
    });

    link.addEventListener('mouseleave', () => {
        navLinks.forEach(otherLink => {
            otherLink.style.color = 'var(--rich-black)'; // Reset the color to off-black
        });
    });
});

// Project descriptions based on project item IDs
const projectDescriptions = {
    'project-1': `
        <p>Developed a custom allocation model to accurately distribute emissions from ice breakers to the vessels they assist.
        This approach provides a new method for fair attribution of environmental impact, enabling more precise tracking
        of emissions in complex maritime operations.</p>
        <div class="chapter-break-date"></div>
    `,
    'project-2': `
        <p>Developed a machine learning model to predict vessel Fuel Consumption (FOC) with limited data,
        integrating vessel characteristics and real-time weather data for enhanced prediction accuracy.
        Achieved 10% prediction accuracy.</p>
        <div class="chapter-break-date"></div>
    `,
    'project-3': `
        <p>Developed a Python-based calculator to determine optimal fuel mixes compliant with FuelEU Maritime regulations,
        implementing complex mathematical formulas to calculate greenhouse gas (GHG) intensity of maritime vessels.</p>
        <div class="chapter-break-date"></div>
    `,
    // 'project-4': `
    //     <p>Developed a model to standardize ship emission calculations across years with varying 'own' and 'spot' ship usage.
    //     Implemented a weighted average approach using historical ton-mile data to ensure accurate year-on-year emission comparisons.</p>
    //     <div class="chapter-break-date"></div>
    // `,
    'project-4': `
        <p>Built an optimization model to determine optimal order quantities for emergency room supplies. The solution ensures
        critical item availability while minimizing costs, integrating historical data and demand forecasting to reduce
        stockout risks. Also, built an interface that allowed easy use of the tool.</p>
        <div class="chapter-break-date"></div>
    `,
    'project-6': `
        <p>Developed an optimization model to minimize costs and time for transporting cars from Germany to Finland. 
        We also created an interactive dashboard, allowing the end user to visualize model results and explore scenarios directly. 
        The tool is now used daily, playing a critical role in the company's operations.</p>
        <div class="chapter-break-date"></div>
    `,
};

// Function to toggle project details
function toggleProjectDetails(event) {
    const projectItem = event.currentTarget;
    const projectId = projectItem.id;

    // Check if the clicked project already has its description open
    let descriptionSection = projectItem.nextElementSibling;
    if (descriptionSection && descriptionSection.classList.contains('project-description')) {
        // If the description is already open for this project, close it
        descriptionSection.remove();
        return; // Exit the function early
    }

    // Close any existing open description section for other projects
    const openDescription = document.querySelector('.project-description');
    if (openDescription) {
        openDescription.remove();
    }

    // Create a new description section based on the project ID
    descriptionSection = document.createElement('div');
    descriptionSection.classList.add('project-description');
    descriptionSection.innerHTML = projectDescriptions[projectId];

    // Insert the description section after the project item
    projectItem.insertAdjacentElement('afterend', descriptionSection);
}

// Attach click event listeners to all project items
document.querySelectorAll('.project-item').forEach(item => {
    item.addEventListener('click', toggleProjectDetails);
});

// Function to dim other project items when one is hovered
function handleHover(event) {
    const hoveredItem = event.currentTarget;

    // Dim all other project items
    document.querySelectorAll('.project-item').forEach(item => {
        if (item !== hoveredItem) {
            item.classList.add('dimmed');
        }
    });
}

// Function to remove the dim effect when hover ends
function handleHoverEnd() {
    // Remove the dimmed effect from all project items
    document.querySelectorAll('.project-item').forEach(item => {
        item.classList.remove('dimmed');
    });
}

// Attach hover event listeners to all project items
document.querySelectorAll('.project-item').forEach(item => {
    item.addEventListener('mouseenter', handleHover);
    item.addEventListener('mouseleave', handleHoverEnd);
    item.addEventListener('click', toggleProjectDetails);
});





// Navigation bar mobile
const menuToggle = document.querySelector('.menu-toggle');
const header = document.querySelector('header');

// Toggle the mobile menu on click
menuToggle.addEventListener('click', () => {
    header.classList.toggle('show-nav');
    menuToggle.classList.toggle('active');
});

// Close the navigation when a link is clicked
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            header.classList.remove('show-nav');  // Hide the nav
            menuToggle.classList.remove('active');  // Deactivate hamburger menu
        });
    });
});










const elyriaLink = document.querySelector('.elyria-link');
const letters = elyriaLink.querySelectorAll('span');

// Define the sequence of letters to highlight
const highlightSequence = [
    [0, 4],    // E and I (for N)
    [4, 1],    // I and L (for U)
    [5, 1],    // A and L (for M)
    [5, 3],    // A and R (for S)
    // No space needed as per your request
    [3],       // R (for R)
    [0],       // E (for E)
    [1, 4, 5], // L, I, and A (for V)
    [0],       // E (for E)
    [5],       // A (for A)
    [1],       // L (for L)
    // No space
    [5],       // A (for A)
    // No space
    [3],       // R (for R)
    [0],       // E (for E)
    [5],       // A (for A)
    [1],       // L (for L)
    // No space
    [1],       // L (for L)
    [4],       // I (for I)
    [0],       // E (for E)
];

// Initialize a counter to track the current step in the sequence
let currentStep = 0;

// Function to highlight letters based on the current step
function highlightLetters() {
    // Remove any existing highlights
    letters.forEach(letter => letter.classList.remove('highlighted'));

    // Get the indices of letters to highlight at the current step
    const indices = highlightSequence[currentStep];

    // Highlight the letters for the current step
    indices.forEach(index => {
        letters[index].classList.add('highlighted');
    });

    // Increment the step counter
    currentStep++;

    // Reset the counter if we've reached the end of the sequence
    if (currentStep >= highlightSequence.length) {
        currentStep = 0;
    }
}

// Event listeners to trigger the highlight on hover
elyriaLink.addEventListener('mouseenter', highlightLetters);
elyriaLink.addEventListener('mouseleave', () => {
    // Remove highlights when not hovering
    letters.forEach(letter => letter.classList.remove('highlighted'));
});