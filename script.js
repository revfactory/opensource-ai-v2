// ===== Navigation Toggle =====
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== Navbar Scroll Effect =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Intersection Observer for Animations =====
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');

            // Add stagger delay for children if specified
            const delay = entry.target.dataset.aosDelay;
            if (delay) {
                entry.target.style.transitionDelay = `${delay}ms`;
            }
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// ===== Active Navigation Link Highlight =====
const sections = document.querySelectorAll('section[id]');

const highlightNavLink = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
};

window.addEventListener('scroll', highlightNavLink);

// ===== Parallax Effect for Hero =====
const heroBg = document.querySelector('.hero-bg');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (heroBg && scrolled < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ===== Table Row Hover Effect =====
const tableRows = document.querySelectorAll('.comparison-table tbody tr');

tableRows.forEach(row => {
    row.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.01)';
    });

    row.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// ===== Card Tilt Effect =====
const cards = document.querySelectorAll('.model-card, .infra-card, .quant-card');

cards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== Code Block Copy Functionality =====
const codePreview = document.querySelector('.code-preview pre');
if (codePreview) {
    const copyBtn = document.createElement('button');
    copyBtn.textContent = 'Copy';
    copyBtn.className = 'copy-btn';
    copyBtn.style.cssText = `
        position: absolute;
        top: 60px;
        right: 16px;
        padding: 6px 12px;
        background: rgba(147, 197, 253, 0.2);
        border: 1px solid rgba(147, 197, 253, 0.3);
        border-radius: 6px;
        color: #93c5fd;
        font-size: 0.75rem;
        cursor: pointer;
        transition: all 0.3s ease;
    `;

    copyBtn.addEventListener('mouseenter', () => {
        copyBtn.style.background = 'rgba(147, 197, 253, 0.3)';
    });

    copyBtn.addEventListener('mouseleave', () => {
        copyBtn.style.background = 'rgba(147, 197, 253, 0.2)';
    });

    copyBtn.addEventListener('click', async () => {
        const code = codePreview.querySelector('code').textContent;
        try {
            await navigator.clipboard.writeText(code);
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyBtn.textContent = 'Copy';
            }, 2000);
        } catch (err) {
            copyBtn.textContent = 'Failed';
        }
    });

    codePreview.parentElement.style.position = 'relative';
    codePreview.parentElement.appendChild(copyBtn);
}

// ===== Counter Animation for Stats =====
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);

    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
};

// Observe stat values for animation
const statValues = document.querySelectorAll('.stat-value');
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const text = entry.target.textContent;
            const numMatch = text.match(/(\d+)/);
            if (numMatch) {
                const num = parseInt(numMatch[1]);
                const suffix = text.replace(numMatch[1], '');
                const prefix = text.split(numMatch[1])[0];

                entry.target.textContent = prefix + '0' + suffix;

                let current = 0;
                const increment = num / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= num) {
                        entry.target.textContent = text;
                        clearInterval(timer);
                    } else {
                        entry.target.textContent = prefix + Math.floor(current) + suffix;
                    }
                }, 30);
            }
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statValues.forEach(el => statObserver.observe(el));

// ===== Typing Effect for Code =====
const codeBlock = document.querySelector('.code-preview code');
if (codeBlock) {
    const originalHTML = codeBlock.innerHTML;
    let hasAnimated = false;

    const codeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                codeBlock.innerHTML = '';
                codeBlock.style.opacity = '1';

                let i = 0;
                const lines = originalHTML.split('\n');
                let currentLine = 0;

                const typeLine = () => {
                    if (currentLine < lines.length) {
                        codeBlock.innerHTML += lines[currentLine] + '\n';
                        currentLine++;
                        setTimeout(typeLine, 100);
                    }
                };

                typeLine();
            }
        });
    }, { threshold: 0.5 });

    codeObserver.observe(codeBlock);
}

// ===== Scroll Progress Indicator =====
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(135deg, #60a5fa 0%, #67e8f9 50%, #c4b5fd 100%);
    z-index: 1001;
    transition: width 0.1s ease;
    box-shadow: 0 0 10px rgba(103, 232, 249, 0.5);
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = (window.pageYOffset / scrollHeight) * 100;
    progressBar.style.width = `${scrollProgress}%`;
});

// ===== Add Active Style to Nav Links =====
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #93c5fd !important;
        background: rgba(147, 197, 253, 0.1);
    }
`;
document.head.appendChild(style);

// ===== Snowfall Effect =====
function createSnowflakes() {
    const snowContainer = document.createElement('div');
    snowContainer.className = 'snow-container';
    snowContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
        overflow: hidden;
    `;
    document.body.appendChild(snowContainer);

    function createSnowflake() {
        const snowflake = document.createElement('div');
        const size = Math.random() * 4 + 2;
        const startX = Math.random() * window.innerWidth;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;

        snowflake.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.1) 100%);
            border-radius: 50%;
            left: ${startX}px;
            top: -10px;
            opacity: ${Math.random() * 0.6 + 0.4};
            animation: snowfallAnim ${duration}s linear ${delay}s infinite;
            box-shadow: 0 0 ${size * 2}px rgba(255, 255, 255, 0.3);
        `;

        snowContainer.appendChild(snowflake);

        // Remove and recreate after animation
        setTimeout(() => {
            snowflake.remove();
        }, (duration + delay) * 1000);
    }

    // Create initial snowflakes
    for (let i = 0; i < 50; i++) {
        setTimeout(() => createSnowflake(), i * 200);
    }

    // Continue creating snowflakes
    setInterval(createSnowflake, 300);

    // Add keyframes for snowfall animation
    const snowStyle = document.createElement('style');
    snowStyle.textContent = `
        @keyframes snowfallAnim {
            0% {
                transform: translateY(0) translateX(0) rotate(0deg);
                opacity: 1;
            }
            25% {
                transform: translateY(25vh) translateX(20px) rotate(90deg);
            }
            50% {
                transform: translateY(50vh) translateX(-20px) rotate(180deg);
            }
            75% {
                transform: translateY(75vh) translateX(20px) rotate(270deg);
            }
            100% {
                transform: translateY(105vh) translateX(0) rotate(360deg);
                opacity: 0.3;
            }
        }
    `;
    document.head.appendChild(snowStyle);
}

// Initialize snowfall
createSnowflakes();

// ===== Initialize on DOM Load =====
document.addEventListener('DOMContentLoaded', () => {
    // Remove loading state if any
    document.body.classList.add('loaded');

    // Initial animation trigger for hero elements
    setTimeout(() => {
        document.querySelectorAll('.hero [data-aos]').forEach(el => {
            el.classList.add('aos-animate');
        });
    }, 100);
});

// ===== Preloader (Optional) =====
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});
