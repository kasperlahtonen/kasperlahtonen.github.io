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
        <p><strong>Tech Stack:</strong> R, Python, NumPy, Pandas, Tableau.</p>
    `,
    'project-2': `
        <p>Developed a machine learning model to predict vessel Fuel Consumption (FOC) with limited data,
        integrating vessel characteristics and real-time weather data for enhanced prediction accuracy.
        Achieved 10% prediction accuracy.</p>
        <div class="chapter-break-date"></div>
        <p><strong>Tech Stack:</strong> Python, NumPy, Pandas, Scikit-learn, SciPy, SQL, Git, Docker, Google Compute Engine</p>
    `,
    'project-3': `
        <p>Developed a Python-based calculator to determine optimal fuel mixes compliant with FuelEU Maritime regulations,
        implementing complex mathematical formulas to calculate greenhouse gas (GHG) intensity of maritime vessels.</p>
        <div class="chapter-break-date"></div>
        <p><strong>Tech Stack:</strong> Python, NumPy, Pandas, Pyomo</p>
    `,
    'project-4': `
        <p>Developed a model to standardize ship emission calculations across years with varying 'own' and 'spot' ship usage.
        Implemented a weighted average approach using historical ton-mile data to ensure accurate year-on-year emission comparisons.</p>
        <div class="chapter-break-date"></div>
        <p><strong>Tech Stack:</strong> Python, NumPy, Pandas, Excel, Data Analysis, Mathematical Modeling</p>
    `,
    'project-5': `
        <p>Built an optimization model to determine optimal order quantities for emergency room supplies. The solution ensures
        critical item availability while minimizing costs, integrating historical data and demand forecasting to reduce
        stockout risks. Also, built an interface that allowed easy use of the tool.</p>
        <div class="chapter-break-date"></div>
        <p><strong>Tech Stack:</strong> Python, NumPy, Pandas, Pyomo, Excel</p>
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

