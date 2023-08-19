const header = document.getElementById("header");
const projectsGrid = document.getElementById("projects-grid");
const description = document.getElementById("description");
const projectTitle = document.getElementById("projectTitle");
const projectDescription = document.getElementById("projectDescription");
const projectImg = document.getElementById("projectImg");
const blur = document.getElementById("blur");

// Transition on loading website
header.style.opacity = 1;

// Obscure email to hide from spam bots
const email = document.getElementById("email");
emailParts = ["mailto:", "aidancarey2004", "@", "protonmail", ".com"]
email.href = emailParts.join('')

const projects = {
    "Campground Reservation Website (Current Project)": {
        description: `While working at Jeff's Hideaway campground as a summer job, I worked a lot with their campground reservation software,
        Campground Master, and their website made using Wordpress. I noticed how these two programs worked with different databases, meaning that once someone booked a site we would have to copy it over to the other program. This inspired
        me to create my own reservation software.`,
        img: ""
    },
    "Wheelock Hall App": {
        description: `Being a student at Acadia, I use the online menu at Dine on Campus all the time to figure out what's on the menu,
        but I found it annoying to constantly go to the website to check so I decided to make my own frontend. The app was
        also designed to work perfectly with any other school that uses Dine on Campus for it's menu with minimal tweaking,
        only two strings.`,
        img: ""
    },
    "Graphing Calculator": {
        description: `A graphing calculator made with vanilla Javascript, HTML and CSS that can graph multiple different equations at once
        and show a point on a function. You can manipulate the shown domain and range by dragging and scrolling the graph.`,
        img: "Graphing-Calculator.png"
    },
    "Chatroom": {
        description: `A chatroom web app inspired by Discord, with the frontend in vanilla Javascript, HTML, and CSS and a backend server in
        NodeJS where multiple users and join and chat with each other. Any user that joins can see the chat history of the server,
        and can change their profile picture and username color, which will be reflected on the other users.`,
        img: "Chatroom.png"
    },
    "C++ Sorting Visualizations": {
        description: `A C++ and SFML program which showcases different sorting algorithms and the amount of steps it takes to do complete them.
        This includes alogrithms such as selection sort, insertion sort, quick sort, and also more impractical algorithms such as
        bogo sort and sleep sort. I've also implemented selection sort in Python with Pygame and C with SDL.`,
        img: ""
    }
};

// Make all of the projects clickable
for (let project of projectsGrid.children) {
    project.addEventListener("click", () => {
        projectTitle.textContent = project.children[0].textContent;

        const description = projects[projectTitle.textContent].description;
        const img = projects[projectTitle.textContent].img;

        // Get description based on title
        projectDescription.textContent = description;

        if (img !== "") {
            projectImg.src = `./imgs/${img}`
        } else {
            projectImg.src = ""
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
    } else {
        blur.style.opacity = 0;

        // Wait for animation to finish
        setTimeout(() => {
            blur.style.visibility = "hidden";
        }, 300);
    }
}