function getSkills() {
    const skills = localStorage.getItem('skills');
    return skills ? JSON.parse(skills) : [];
}

function saveSkills(skills) {
    localStorage.setItem('skills', JSON.stringify(skills));
}

function renderSkills() {
    const skillsContainer = document.getElementById('skillsContainer');
    skillsContainer.innerHTML = '';
    const skills = getSkills();
    skills.forEach((skill, index) => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skillItem';
        skillItem.textContent = skill;
        skillItem.title = 'Click to remove';
        skillItem.style.cursor = 'pointer';
        skillItem.addEventListener('click', () => {
            removeSkill(index);
        });
        skillsContainer.appendChild(skillItem);
    });
}

function removeSkill(index) {
    const skills = getSkills();
    skills.splice(index, 1);
    saveSkills(skills);
    renderSkills();
}

document.getElementById('addSkillBtn').addEventListener('click', function() {
    const skill = prompt('Enter a skill:');
    if (skill && skill.trim() !== '') {
        const skills = getSkills();
        skills.push(skill.trim());
        saveSkills(skills);
        renderSkills();
    }
});

window.addEventListener('DOMContentLoaded', () => {
    renderSkills();
});
