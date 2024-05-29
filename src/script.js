// Aidan Carey, 2023-2024

const header = document.getElementById("header");
const projectsGrid = document.getElementById("projects-grid");
const description = document.getElementById("description");
const projectTitle = document.getElementById("projectTitle");
const projectLink = document.getElementById("projectLink");
const projectDescription = document.getElementById("projectDescription");
const projectImg = document.getElementById("projectImg");
const projectImg2 = document.getElementById("projectImg2");
const blur = document.getElementById("blur");
const closeDescription = document.getElementById("closeDescription");

closeDescription.addEventListener("click", toggleDescription)

// Transition on loading website
header.style.opacity = 1;

// Obscure email to hide from spam bots
const email = document.getElementById("email");
emailParts = ["mailto:", "aidancarey2004", "@", "protonmail", ".com"]
email.href = emailParts.join('')

// Load projects from json
let projects = undefined;
fetch('/src/projects.json')
    .then((response) => projects = response.json())
    .then((json) => projects = json);

// Make all of the projects clickable
for (let project of projectsGrid.children) {
    project.addEventListener("click", () => {
        projectTitle.textContent = project.children[0].textContent;

        const description = projects[projectTitle.textContent].description;
        const img = projects[projectTitle.textContent].img;
        const img2 = projects[projectTitle.textContent].img2;
        const link = projects[projectTitle.textContent].link;

        // Get description based on title
        projectDescription.textContent = description;
        projectLink.href = link;

        if (img !== "") {
            projectImg.src = `/src/imgs/${img}`;
        } else {
            projectImg.src = "";
        }

        if (img2) {
            projectImg2.src = `/src/imgs/${img2}`;
            // Scale down when there are multiple images
            projectImg.style.maxWidth = "50%"
        } else {
            projectImg2.src = "";
            projectImg.style.maxWidth = "100%"
        }

        toggleDescription();
    });
}

// Toggle blur when clicking away from description
blur.addEventListener("click", event => {
    // Only toggle if you click the blurred area
    if (event.target === blur)
        toggleDescription();
})

// "block" <=> "hidden"
function toggleDescription() {
    const visible = blur.style.visibility;

    if (visible !== "visible") {
        blur.style.opacity = 1;
        blur.style.visibility = "visible";

        disableScrolling();
    } else {
        blur.style.opacity = 0;

        // Wait for animation to finish
        setTimeout(() => {
            blur.style.visibility = "hidden";
        }, 300);

        enableScrolling();
    }
}

function disableScrolling () {
    document.body.style.overflow = "hidden";
    document.body.style.userSelect = "none";
}

function enableScrolling () {
    document.body.style.overflow = "auto";
    document.body.style.userSelect = "auto";
}