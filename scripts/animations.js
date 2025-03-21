// Scroll-based animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.animate-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => observer.observe(section));

    // Animate skills list items
    const skills = document.querySelectorAll('.skills-list li');
    skills.forEach((skill, index) => {
        skill.style.animationDelay = `${index * 0.2}s`;
    });
});