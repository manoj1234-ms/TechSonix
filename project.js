document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.getElementById('addProjectBtn');
  const form = document.getElementById('projectForm');
  const container = document.getElementById('projectsContainer');

  // Load existing projects from localStorage
  const loadProjects = () => {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    container.innerHTML = '';
    projects.forEach((proj, index) => {
      addProjectToDOM(proj.name, proj.desc, proj.link, index);
    });
  };

  // Save projects to localStorage
  const saveProjects = (projects) => {
    localStorage.setItem('projects', JSON.stringify(projects));
  };

  // Add a project to the DOM
  const addProjectToDOM = (name, desc, link, index) => {
    const project = document.createElement('div');
    project.classList.add('project-item');
    project.innerHTML = `
      <h3>${name}</h3>
      <p>${desc}</p>
      <a href="${link}" target="_blank">GitHub Repository</a><br/>
      <button class="remove-btn" data-index="${index}">Remove</button>
    `;

    // Remove project from DOM and localStorage
    project.querySelector('.remove-btn').addEventListener('click', (e) => {
      const idx = e.target.getAttribute('data-index');
      const projects = JSON.parse(localStorage.getItem('projects')) || [];
      projects.splice(idx, 1);
      saveProjects(projects);
      loadProjects(); // Reload DOM
    });

    container.appendChild(project);
  };

  addBtn.addEventListener('click', () => {
    form.style.display = 'block';
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('projectName').value.trim();
    const desc = document.getElementById('projectDesc').value.trim();
    const link = document.getElementById('projectLink').value.trim();

    if (!name || !desc || !link) {
      alert('Please fill out all fields.');
      return;
    }

    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects.push({ name, desc, link });
    saveProjects(projects);

    form.reset();
    form.style.display = 'none';
    loadProjects(); // Update DOM
  });

  loadProjects(); // Initial load
});
