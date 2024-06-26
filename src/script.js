// Aidan Carey, 2023-2024

const projectsGrid = document.getElementById("projectsGrid");
const description = document.getElementById("description");
const projectTitle = document.getElementById("projectTitle");
const projectLink = document.getElementById("projectLink");
const projectDescription = document.getElementById("projectDescription");
const projectImg = document.getElementById("projectImg");
const projectImg2 = document.getElementById("projectImg2");
const blur = document.getElementById("blur");
const closeDescription = document.getElementById("closeDescription");

closeDescription.addEventListener("click", toggleDescription)

// Header opacity transitions on loading website
// headerImage.style.opacity = 1;

// Obscure email to hide from spam bots
const email = document.getElementById("email");
emailParts = [".com", "protonmail", "@", "aidancarey2004", "mailto:"]
email.href = emailParts.reverse().join('')

// Projects JSON
const github = "https://github.com/aidanc2004/";

let projects = [
    {
        "name": "Student Information System (WIP)",
        "shortDesc": "Full-stack student information system in Java, Spring Boot, Bootstrap, and more.",
        "thumb": "",
        "description": `Inspired by picking my courses at Acadia University, I decided to write my own student information system. For the tech stack I chose Java with
            Spring Boot, Angular, Hibernate with PostgreSQL, and Bootstrap for CSS. Students can pick courses and manage their schedule, professors can add and remove students from
            a course and assign themselves to their course, and admins can add and remove users and courses.`,
        "link": `${github}student-information-system`,
        "img": "",
        "lang": "Java",
        "not_ready": true
    },
    {
        "name": "Blog (WIP)",
        "shortDesc": "A simple blog written with Java and Spring Boot.",
        "thumb": "",
        "description": `A simple blogging website where a user can login to their account, create, edit, and delete blog posts. Created using Spring Boot, Thymeleaf,
            and PostgreSQL.`,
        "link": `${github}blog`,
        "img": "",
        "lang": "Java",
        "not_ready": true
    },
    {
        "name": "Print Nova Scotia Fire Ban",
        "shortDesc": "Python script at Orchard Queen RV Park for Windows to automatically print out the current fire ban",
        "thumb": "",
        "description": `While working at Orchard Queen Motel and RV Park during the summer, we needed to print out the current fire ban for Annapolis County, Nova Scotia
            for the campers. My manager, Matthew, asked me if I would be able to write a program that could automatically print out the page everyday at 2pm. I wrote the
            script using Python with the win32 API.`,
        "link": `${github}print-ns-fire-ban`,
        "img": "",
        "lang": "Python"
    },
    {
        "name": "Game of Life",
        "shortDesc": "Implementation of Conway's Game of Life in C with Raylib.",
        "thumb": "Game-Of-Life.png",
        "description": `A graphical implmentation of John Conway's Game of Life, a cellular automata simulation where cells live if they have 2-3 neighbours,
            die if they have >3 or <2 neighbours, and a dead cell becomes alive with 3 neighbours. It's in C with the Raylib graphics library I wrote while learning
            cellular automata. It takes the number of rows and columns as command line arguments and clicking will add or remove a cell.`,
        "link": `${github}game-of-life`,
        "img": "Game-Of-Life.gif",
        "lang": "C"
    },
    {
        "name": "acorn-downloader",
        "shortDesc": "A web scraper to download resources from Acadia University's Moodle (Acorn) written in Perl.",
        "description": `I always make sure to download all of the course materials from all of my classes, but it can be time consuming to scan through all of my
            courses for anything that I've missed or haven't downloaded. To make this easier, I made a web scraper using Perl with WWW::Mechanize to automatically login
            and download all resources from all of my in-progress courses into seperate directories. I decided to use Perl for this project because it's excellent at
            text processing and using Regex`,
        "link": `${github}acorn-downloader`,
        "img": "Acorn-Downloader.png",
        "lang": "Perl"
    },
    {
        "name": "Campground Reservation Website",
        "shortDesc": "A Ruby on Rails web application where customers can book reservations for a campsite.",
        "description": "While working at Jeff's Hideaway campground as a summer job, I worked a lot with their campground reservation software,\n        Campground Master, and their website made using Wordpress. I noticed how these two programs worked with different databases, meaning that once\n        someone booked a site we would have to copy it over to the other program. This inspired me to create my own reservation software.",
        "link": `${github}Campground-Website`,
        "img": "Campground.png",
        "lang": "Ruby"
    },
    {
        "name": "Wheelock Hall",
        "shortDesc": "An iOS and macOS app for Acadia University's dining hall.",
        "thumb": "Wheelock-Hall.png",
        "description": "Being a student at Acadia, I use the online menu at Dine on Campus all the time to figure out what's on the menu,\n        but I found it annoying to constantly need go to the website to check so I decided to make my own frontend. The app was\n        also designed to work with any other school that uses Dine on Campus for it's menu with minimal tweaking.",
        "link": `${github}Wheelock-Hall-App`,
        "img": "Wheelock-1.png",
        "img2": "Wheelock-2.png",
        "lang": "Swift"
    },
    {
        "name": "Graphing Calculator",
        "shortDesc": "A graphing calculator made with JavaScript and HTML canvas.",
        "description": "A graphing calculator made with HTML, CSS and vanilla Javascript that can graph multiple different equations at once\n        and show a clicked point on a function. You can manipulate the shown domain and range by dragging and scrolling the graph. There are\n        also example equations in the help menu in the bottom left.",
        "thumb": "Graphing-Calculator-Thumb.png",
        "link": "/src/graphing-calculator",
        "linkName": "Page",
        "img": "Graphing-Calculator.png",
        "lang": "JS"
    },
    {
        "name": "C++ Sorting Visualizations",
        "shortDesc": "A sorting algorithm visualizations written in C++ with SFML.",
        "description": "A C++ and SFML program which showcases different sorting algorithms and the amount of steps it takes to do complete them.\n        This includes alogrithms such as selection sort, insertion sort, quick sort, and also more impractical algorithms such as\n        bogo sort and sleep sort.",
        "link": "https://github.com/aidanc2004/Cpp-Sorting-Visualization",
        "img": "Sorting.png",
        "lang": "C++"
    }
];

// Generate project thumbnails from the array of projects
for (let i = 0; i < projects.length; i++) {
    let project = projects[i];

    const divTailwind =
        `shadow-2xl rounded-lg m-2 p-4 hover:shadow-[0_0_0_0_#FFF5EE]
        cursor-pointer transition-[box_shadow] duration-150 ease-in-out flex flex-col justify-around`;

    let projectDiv = document.createElement("div");
    projectDiv.className = divTailwind;

    // Project Title
    let projectName = document.createElement("h2");
    projectName.textContent = project.name;
    projectName.className = "text-coral font-normal";

    // If the project is still work in progress, show the title in red italics
    if (project.not_ready) {
        projectName.style = "color:red; font-style:italic;"
    }

    // Thumbnail description
    let projectShortDesc = document.createElement("p");
    projectShortDesc.textContent = project.shortDesc;

    // If it doesn't have a thumbnail then use the regular image
    if (project.thumb == undefined) project.thumb = project.img;

    let projectThumbContainer = document.createElement("div");
    projectThumbContainer.className = "flex justify-center align-center";

    let projectThumb = document.createElement("img");
    projectThumb.src = "/src/imgs/projects/" + project.thumb;
    projectThumb.alt = project.name;
    projectThumb.className = "mt-4 rounded-md w-[80%]";

    projectThumbContainer.appendChild(projectThumb);

    // Language tag
    let language = project.lang;
    let languageLower = language.toLowerCase();
    if (language == "C++") {
        languageLower = "cpp"
    };
 
    // Add space after the image to push the language tag to the bottom
    let flexGrowTen = document.createElement("div");
    flexGrowTen.style = "margin: auto;";

    // Create a GitHub-like language tag for the project
    let languageTagDiv = document.createElement("div");
    languageTagDiv.className = `flex w-fit mt-2 px-2 items-center rounded-full border-2 ${languageLower}-border`;
    
    let languageTagDot = document.createElement("div");
    languageTagDot.className = `h-2 w-2 ${languageLower}-bg rounded-full mr-1 inline-block`;

    let languageTagName = document.createElement("p");
    languageTagName.className = "text-sm";
    languageTagName.textContent = project.lang;

    languageTagDiv.appendChild(languageTagDot);
    languageTagDiv.appendChild(languageTagName);

    projectDiv.appendChild(projectName);
    projectDiv.appendChild(projectShortDesc);
    projectDiv.appendChild(projectThumbContainer);
    projectDiv.appendChild(flexGrowTen);
    projectDiv.appendChild(languageTagDiv)

    projectsGrid.appendChild(projectDiv);
}

// For each project, create the description popup on click
for (let projectDiv of projectsGrid.children) {
    projectDiv.addEventListener("click", () => {
        projectTitle.textContent = projectDiv.children[0].textContent;

        let project = projects.find(project => project.name == projectTitle.textContent);

        const description = project.description;
        const img = project.img;
        const img2 = project.img2;
        const link = project.link;
        const linkName = project.linkName;

        // Get description based on title
        projectDescription.textContent = description;
        projectLink.href = link;

        // Set the img src if a filepath exists
        if (img !== "") {
            projectImg.src = `/src/imgs/projects/${img}`;
        } else {
            projectImg.src = "";
        }

        // If theres a second image, show both at half width
        if (img2) {
            projectImg2.src = `/src/imgs/projects/${img2}`;
            // Scale down when there are multiple images
            projectImg.style.maxWidth = "50%"
        } else {
            projectImg2.src = "";
            projectImg.style.maxWidth = "100%"
        }

        // Change the link text if it's not GitHub
        if (linkName) {
            projectLink.textContent = linkName;
        } else {
            projectLink.textContent = "GitHub";
        }

        // Show description popup
        toggleDescription();
    });
}

// Toggle main content blur when clicking away from description
blur.addEventListener("click", event => {
    // Only toggle if you click the blurred area
    if (event.target === blur) toggleDescription();
})

// Toggle the description popup. "visible" <=> "hidden"
function toggleDescription() {
    const visible = blur.style.visibility;

    // Show
    if (visible !== "visible") {
        // Reset popup scroll
        description.scroll({top: 0, behavior: "instant"});

        blur.style.opacity = 1;
        blur.style.visibility = "visible";

        // Disable scrolling the main content
        disableScrolling();
    // Hide
    } else {
        blur.style.opacity = 0;

        // Wait for animation to finish
        setTimeout(() => {
            blur.style.visibility = "hidden";
        }, 300);

        // Enable scrolling the main content
        enableScrolling();
    }
}

// Disable scrolling the main content
function disableScrolling () {
    document.body.style.overflow = "hidden";
    document.body.style.userSelect = "none";
}

// Enable scrolling the main content
function enableScrolling () {
    document.body.style.overflow = "auto";
    document.body.style.userSelect = "auto";
}
