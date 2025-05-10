function hamburg(){
    const navbar = document.querySelector('.dropdown');
    navbar.style.transform = 'translateY(0px)'; 
}

function cancel(){
    const navbar = document.querySelector('.dropdown');
    navbar.style.transform = 'translateY(-500px)'; 
}

const texts = [
    "Web Developer",
    "Data -Analyst",
    "Machine-Learning Engineer",
    "AI Engineer",
]

const speed = 100; // typing speed in milliseconds
const textElement  = document.querySelector('.typewriter-text'); // clear the text before starting

if (textElement) {
    let textIndex = 0; // current text index
    let charIndex = 0; // current character index

    function typewriter() {
        if(charIndex < texts[textIndex].length) {
            textElement.textContent += texts[textIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typewriter, speed);
        }
        else{
            setTimeout(eraseText,1000);
        }
    }

    function eraseText() {
        if(textElement.innerHTML.length > 0) {
            textElement.innerHTML = textElement.innerHTML.slice(0,-1);
            setTimeout(eraseText, 50);
        }
        else{
            textIndex = (textIndex + 1) % texts.length; // move to the next text
            charIndex = 0; // reset character index
            setTimeout(typewriter, 500); // wait before starting to type the next text
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        typewriter();
    });
}

function eraseText() {
    if(textElement.innerHTML.length > 0) {
        textElement.innerHTML = textElement.innerHTML.slice(0,-1);
        setTimeout(eraseText, 50);
    }
    else{
        textIndex = (textIndex + 1) % texts.length; // move to the next text
        charIndex = 0; // reset character index
        setTimeout(typewriter, 500); // wait before starting to type the next text
    }
}

document.addEventListener('DOMContentLoaded', function() {
    typewriter();

    const addProjectBtn = document.getElementById('addProjectBtn');
    const projectForm = document.getElementById('projectForm');
    const projectsContainer = document.getElementById('projectsContainer');
    const confirmationMessage = document.getElementById('confirmationMessage');

    // Show form on add button click
    addProjectBtn.addEventListener('click', () => {
        projectForm.style.display = 'block';
        confirmationMessage.style.display = 'none';
    });

    // Handle form submission
    projectForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const projectName = document.getElementById('projectName').value.trim();
        const projectDir = document.getElementById('projectDir').value.trim();
        const projectDesc = document.getElementById('projectDesc').value.trim();

        if (projectName && projectDir && projectDesc) {
            // Create new project item
            const projectItem = document.createElement('div');
            projectItem.classList.add('project-item');

            const h2 = document.createElement('h2');
            h2.textContent = projectName;

            const pDesc = document.createElement('p');
            pDesc.textContent = projectDesc;

            const pDir = document.createElement('p');
            pDir.textContent = `Directory: ${projectDir}`;

            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.classList.add('remove-btn');
            removeBtn.addEventListener('click', () => {
                projectsContainer.removeChild(projectItem);
            });

            projectItem.appendChild(h2);
            projectItem.appendChild(pDesc);
            projectItem.appendChild(pDir);
            projectItem.appendChild(removeBtn);

            projectsContainer.appendChild(projectItem);

            // Clear form and hide it
            projectForm.reset();
            projectForm.style.display = 'none';

            // Show confirmation message
            confirmationMessage.textContent = 'Project added successfully!';
            confirmationMessage.style.display = 'block';
        }
    });

    // Add remove functionality to existing remove buttons
    const existingRemoveBtns = document.querySelectorAll('.remove-btn');
    existingRemoveBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const projectItem = e.target.closest('.project-item');
            if (projectItem) {
                projectsContainer.removeChild(projectItem);
            }
        });
    });
});

