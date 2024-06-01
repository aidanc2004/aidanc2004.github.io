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

// Load projects
let projects = {
    "Game of Life": {
        "description": `A graphical implmentation of John Conway's Game of Life, a cellular automata simulation where cells live if they have 2-3 neighbours,
        die if they have >3 or <2 neighbours, and a dead cell becomes alive with 3 neighbours. It's in C with the Raylib graphics library I wrote while learning
        cellular automata. It takes the number of rows and columns as command line arguments and clicking will add or remove a cell.`,
        "link": "https://github.com/aidanc2004/game-of-life",
        "img": "Game-Of-Life.gif"
    },
    "acorn-downloader": {
        "description": `I always make sure to download all of the course materials from all of my classes, which can help a lot if Acorn (Acadia's Moodle) is down,
        I'm away from internet, or I want to look back at it after I finish the course, but it can be time consuming to scan through all of my courses for anything
        that I've missed or haven't downloaded. To make this easier, I made a web scraper using Perl with WWW::Mechanize to automatically login and download
        all resources from all of my in-progress courses into seperate directories.`,
        "link": "https://github.com/aidanc2004/acorn-downloader",
        "img": "Acorn-Downloader.png"
    },
    "wheelock-perl": {
        "description": `I spend a lot of time working in the terminal, so I decided to quickly reimplement my Swift frontend for Acadia University's dining hall as
        a command line app using Perl. You can choose a period to view (breakfast, lunch, dinner), view the menu at a specific date, and filter by categories.`,
        "link": "https://github.com/aidanc2004/wheelock-perl",
        "img": "Wheelock-Perl.png"
    },
    "Campground Reservation Website": {
        "description": "While working at Jeff's Hideaway campground as a summer job, I worked a lot with their campground reservation software,\n        Campground Master, and their website made using Wordpress. I noticed how these two programs worked with different databases, meaning that once\n        someone booked a site we would have to copy it over to the other program. This inspired me to create my own reservation software.",
        "link": "https://github.com/aidanc2004/Campground-Website",
        "img": "Campground-WIP.png"
    },
    "Wheelock Hall": {
        "description": "Being a student at Acadia, I use the online menu at Dine on Campus all the time to figure out what's on the menu,\n        but I found it annoying to constantly need go to the website to check so I decided to make my own frontend. The app was\n        also designed to work with any other school that uses Dine on Campus for it's menu with minimal tweaking.",
        "link": "https://github.com/aidanc2004/Wheelock-Hall-App",
        "img": "Wheelock-1.png",
        "img2": "Wheelock-2.png"
    },
    "Graphing Calculator": {
        "description": "A graphing calculator made with HTML, CSS and vanilla Javascript that can graph multiple different equations at once\n        and show a clicked point on a function. You can manipulate the shown domain and range by dragging and scrolling the graph. There are\n        also example equations in the help menu in the bottom left.",
        "link": "/src/graphing-calculator",
        "img": "Graphing-Calculator.png",
        "linkName": "Page"
    },
    "NodeJS Chatroom": {
        "description": "A very simple proof of concept chatroom web app inspired by Discord, with the frontend in vanilla Javascript, HTML, and CSS and\n        a backend server in NodeJS where multiple users and join and chat with each other. Any user that joins can see the chat history of the server,\n        and can change their profile picture and username color, which will be reflected on the other users.",
        "link": "https://github.com/aidanc2004/chatroom",
        "img": "Chatroom.png"
    },
    "C++ Sorting Visualizations": {
        "description": "A C++ and SFML program which showcases different sorting algorithms and the amount of steps it takes to do complete them.\n        This includes alogrithms such as selection sort, insertion sort, quick sort, and also more impractical algorithms such as\n        bogo sort and sleep sort.",
        "link": "https://github.com/aidanc2004/Cpp-Sorting-Visualization",
        "img": "Sorting.png"
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
        const linkName = projects[projectTitle.textContent].linkName;

        // Get description based on title
        projectDescription.textContent = description;
        projectLink.href = link;

        if (img !== "") {
            projectImg.src = `/src/imgs/${img}`;
        } else {
            projectImg.src = "";
        }

        if (linkName) {
            projectLink.textContent = linkName;
        } else {
            projectLink.textContent = "GitHub";
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