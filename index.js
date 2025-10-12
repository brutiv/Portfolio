window.addEventListener('load', () => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
        const sections = document.querySelectorAll('main section');
        sections.forEach((sec, i) => {
            sec.classList.add('reveal');
            const children = sec.querySelectorAll('.project-card, .stat-card, .feature-card, .about-line');
            children.forEach((c, j) => {
                c.style.animationDelay = `${(i * 80 + j * 40)}ms`;
                c.classList.add('stagger-child');
            });
        });
    } else {
        document.querySelectorAll('.reveal, .stagger-child').forEach(el => {
            el.style.opacity = 1;
        });
    }
});