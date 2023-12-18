// Aidan Carey, 2023

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

const projects = {
    "Campground Reservation Website (Work in Progress)": {
        description: `While working at Jeff's Hideaway campground as a summer job, I worked a lot with their campground reservation software,
        Campground Master, and their website made using Wordpress. I noticed how these two programs worked with different databases, meaning that once someone booked a site we would have to copy it over to the other program. This inspired
        me to create my own reservation software.`,
        link: "https://github.com/aidanc2004/Campground-Website",
        img: "Campground-WIP.png"
    },
    "Wheelock Hall": {
        description: `Being a student at Acadia, I use the online menu at Dine on Campus all the time to figure out what's on the menu,
        but I found it annoying to constantly go to the website to check so I decided to make my own frontend. The app was
        also designed to work perfectly with any other school that uses Dine on Campus for it's menu with minimal tweaking,
        only two strings.`,
        link: "https://github.com/aidanc2004/Wheelock-Hall-App",
        img: "Wheelock-1.png",
        img2: "Wheelock-2.png"
    },
    "Graphing Calculator": {
        description: `A graphing calculator made with vanilla Javascript, HTML and CSS that can graph multiple different equations at once
        and show a point on a function. You can manipulate the shown domain and range by dragging and scrolling the graph.`,
        link: "src/graphing-calculator/index.html",
        img: "Graphing-Calculator.png"
    },
    "Chatroom": {
        description: `A chatroom web app inspired by Discord, with the frontend in vanilla Javascript, HTML, and CSS and a backend server in
        NodeJS where multiple users and join and chat with each other. Any user that joins can see the chat history of the server,
        and can change their profile picture and username color, which will be reflected on the other users.`,
        link: "https://github.com/aidanc2004/chatroom",
        img: "Chatroom.png"
    },
    "C++ Sorting Visualizations": {
        description: `A C++ and SFML program which showcases different sorting algorithms and the amount of steps it takes to do complete them.
        This includes alogrithms such as selection sort, insertion sort, quick sort, and also more impractical algorithms such as
        bogo sort and sleep sort.`,
        link: "https://github.com/aidanc2004/Cpp-Sorting-Visualization",
        img: "Sorting.png"
    }
};

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