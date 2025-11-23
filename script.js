// ========================================
// AWAKENING YATRA - IMMERSIVE INTERACTIONS
// Apple-level scroll animations with GSAP
// ========================================

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initCustomCursor();
    initGSAPAnimations();
    initInteractiveElements();
});

// === SMOOTH SCROLL WITH LENIS ===
function initSmoothScroll() {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        smoothTouch: false
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Connect Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
}

// === CUSTOM CURSOR ===
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        // Smooth cursor movement
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;

        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        follower.style.transform = `translate(${followerX}px, ${followerY}px)`;

        requestAnimationFrame(animate);
    }

    animate();

    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .waypoint, .symbol-interactive');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform += ' scale(1.5)';
            follower.style.transform += ' scale(1.5)';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
            follower.style.transform = follower.style.transform.replace(' scale(1.5)', '');
        });
    });
}

// === GSAP ANIMATIONS ===
function initGSAPAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Animations
    initHeroAnimations();

    // Day 0 - Night Journey
    initDay0Animations();

    // Day 1 - Parallax
    initDay1Parallax();

    // Day 2 - Color Morph
    initDay2ColorMorph();

    // Day 3 - Zen
    initDay3Animations();

    // Day 4 - Waterfall
    initDay4Parallax();

    // Day 5 - Divine Light
    initDay5LightReveal();

    // Day 6 - Krishna
    initDay6Animations();

    // Timeline Path Drawing
    initTimelineAnimation();

    // Symbols Interactive
    initSymbolsAnimation();
}

// === HERO ANIMATIONS ===
function initHeroAnimations() {
    // Canvas setup for image sequence (placeholder - would need actual frames)
    const canvas = document.getElementById('hero-canvas');
    const context = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create gradient background as placeholder
    const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1A1F3A');
    gradient.addColorStop(0.5, '#F97316');
    gradient.addColorStop(1, '#FBBF24');
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Animate canvas opacity
    gsap.to(canvas, {
        opacity: 0.7,
        scrollTrigger: {
            trigger: '.hero-immersive',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });

    // Hero text animations
    const titleLines = document.querySelectorAll('.title-line');

    gsap.timeline()
        .from(titleLines, {
            y: 100,
            opacity: 0,
            stagger: 0.2,
            duration: 1,
            ease: 'power3.out'
        })
        .from('.hero-subtitle', {
            y: 50,
            opacity: 0,
            duration: 0.8
        }, '-=0.4')
        .from('.hero-symbols .symbol-float', {
            scale: 0,
            opacity: 0,
            stagger: 0.1,
            duration: 0.6
        }, '-=0.6');
}

// === DAY 0 - NIGHT JOURNEY ===
function initDay0Animations() {
    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.day-0',
            start: 'top top',
            end: '+=200%',
            scrub: 1,
            pin: true
        }
    });

    timeline
        .from('.day-0 .layer-1', {
            opacity: 0,
            y: 50,
            duration: 0.5
        })
        .to('.day-0 .layer-1', {
            opacity: 0,
            y: -50,
            duration: 0.5
        }, '+=0.5')
        .from('.day-0 .layer-2', {
            opacity: 0,
            scale: 0.8,
            duration: 0.5
        }, '-=0.2')
        .to('.day-0 .layer-2', {
            opacity: 0,
            scale: 1.2,
            duration: 0.5
        }, '+=0.5')
        .from('.day-0 .layer-3', {
            opacity: 0,
            x: -100,
            duration: 0.5
        }, '-=0.2');

    // Animate bus movement
    gsap.to('.bus', {
        x: 300,
        scrollTrigger: {
            trigger: '.day-0',
            start: 'top top',
            end: '+=200%',
            scrub: 1
        }
    });

    // Counter animation
    ScrollTrigger.create({
        trigger: '.day-0 .layer-2',
        start: 'top center',
        onEnter: () => animateCounters()
    });
}

function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(counter => {
        const target = parseInt(counter.dataset.count);
        gsap.to(counter, {
            innerText: target,
            duration: 2,
            snap: { innerText: 1 },
            ease: 'power1.out'
        });
    });
}

// === DAY 1 - PARALLAX ===
function initDay1Parallax() {
    gsap.utils.toArray('.day-1 .parallax-layer').forEach((layer, index) => {
        const depth = parseFloat(layer.dataset.depth);
        const movement = -(layer.offsetHeight * depth * 0.5);

        gsap.to(layer, {
            y: movement,
            ease: 'none',
            scrollTrigger: {
                trigger: '.day-1',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });
    });

    // Boat floating animation
    gsap.to('.boat-float', {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
}

// === DAY 2 - COLOR MORPH ===
function initDay2ColorMorph() {
    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.day-2',
            start: 'top top',
            end: '+=300%',
            scrub: 1,
            pin: true
        }
    });

    timeline
        // Sunrise animation
        .from('.sun-element', {
            y: 200,
            scale: 0.5,
            opacity: 0,
            duration: 0.5
        })
        // Text layers
        .from('.day-2 .layer-1', {
            opacity: 0,
            y: 50,
            duration: 0.3
        })
        .to('.day-2 .layer-1', {
            opacity: 0,
            y: -50,
            duration: 0.3
        }, '+=0.3')
        .from('.day-2 .layer-2', {
            opacity: 0,
            scale: 0.9,
            duration: 0.3
        }, '-=0.1')
        .to('.day-2 .layer-2', {
            opacity: 0,
            scale: 1.1,
            duration: 0.3
        }, '+=0.3')
        .from('.day-2 .layer-3', {
            opacity: 0,
            y: 50,
            duration: 0.3
        }, '-=0.1');

    // Experience cards stagger
    gsap.from('.exp-card', {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.day-2 .layer-3',
            start: 'top center',
            end: 'bottom center'
        }
    });
}

// === DAY 3 - ZEN ===
function initDay3Animations() {
    gsap.from('.stupa-img', {
        scale: 0.8,
        opacity: 0,
        rotation: -10,
        scrollTrigger: {
            trigger: '.day-3',
            start: 'top 60%',
            end: 'top 20%',
            scrub: 1
        }
    });

    gsap.from('.zen-content > *', {
        opacity: 0,
        x: -50,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.zen-content',
            start: 'top 70%',
            end: 'top 30%',
            scrub: 1
        }
    });
}

// === DAY 4 - WATERFALL PARALLAX ===
function initDay4Parallax() {
    gsap.to('.waterfall-layer.layer-back', {
        y: -100,
        scrollTrigger: {
            trigger: '.day-4',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        }
    });

    gsap.to('.waterfall-layer.layer-mid', {
        y: -200,
        scrollTrigger: {
            trigger: '.day-4',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        }
    });

    // Create water droplets
    createWaterDroplets();
}

function createWaterDroplets() {
    const container = document.querySelector('.water-particles');
    if (!container) return;

    for (let i = 0; i < 20; i++) {
        const droplet = document.createElement('div');
        droplet.style.cssText = `
            position: absolute;
            width: 4px;
            height: 10px;
            background: rgba(139, 92, 246, 0.5);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
        `;
        container.appendChild(droplet);

        gsap.to(droplet, {
            y: 500,
            opacity: 0,
            duration: 2 + Math.random() * 2,
            repeat: -1,
            delay: Math.random() * 2
        });
    }
}

// === DAY 5 - DIVINE LIGHT ===
function initDay5LightReveal() {
    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.day-5',
            start: 'top top',
            end: '+=250%',
            scrub: 1,
            pin: true
        }
    });

    timeline
        // Light beam reveal
        .to('.divine-light', {
            opacity: 0.8,
            duration: 0.5
        })
        // Temple fade in
        .from('.temple-silhouette', {
            opacity: 0,
            scale: 0.9,
            duration: 0.5
        }, '-=0.2')
        // Text layers
        .from('.day-5 .layer-1', {
            opacity: 0,
            y: 50,
            duration: 0.3
        })
        .to('.day-5 .layer-1', {
            opacity: 0,
            y: -50,
            duration: 0.3
        }, '+=0.3')
        .from('.day-5 .layer-2', {
            opacity: 0,
            scale: 0.9,
            duration: 0.3
        }, '-=0.1')
        .from('.day-5 .layer-3', {
            opacity: 0,
            y: 30,
            duration: 0.3
        }, '-=0.1');
}

// === DAY 6 - KRISHNA ===
function initDay6Animations() {
    gsap.from('.peacock-img', {
        scale: 0.8,
        rotation: -20,
        opacity: 0,
        scrollTrigger: {
            trigger: '.day-6',
            start: 'top 60%',
            end: 'top 20%',
            scrub: 1
        }
    });

    gsap.from('.krishna-content > *', {
        opacity: 0,
        x: 50,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.krishna-content',
            start: 'top 70%',
            end: 'top 30%',
            scrub: 1
        }
    });
}

// === TIMELINE PATH ANIMATION ===
function initTimelineAnimation() {
    const path = document.querySelector('#journey-path');
    if (!path) return;

    const pathLength = path.getTotalLength();

    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;

    gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
            trigger: '.timeline-interactive',
            start: 'top center',
            end: 'bottom center',
            scrub: 1
        }
    });

    // Waypoint animations
    gsap.from('.waypoint', {
        scale: 0,
        opacity: 0,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.timeline-waypoints',
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1
        }
    });
}

// === SYMBOLS ANIMATION ===
function initSymbolsAnimation() {
    gsap.from('.symbol-interactive', {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.symbols-grid',
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1
        }
    });
}

// === INTERACTIVE ELEMENTS ===
function initInteractiveElements() {
    // Navigation smooth scroll
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Waypoint clicks
    document.querySelectorAll('.waypoint').forEach(waypoint => {
        waypoint.addEventListener('click', () => {
            const day = waypoint.dataset.day;
            const section = document.querySelector(`.day-${day}`);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Symbol interactions
    document.querySelectorAll('.symbol-interactive').forEach(symbol => {
        symbol.addEventListener('mouseenter', () => {
            gsap.to(symbol.querySelector('.symbol-icon'), {
                scale: 1.2,
                rotation: 360,
                duration: 0.5,
                ease: 'back.out(1.7)'
            });
        });

        symbol.addEventListener('mouseleave', () => {
            gsap.to(symbol.querySelector('.symbol-icon'), {
                scale: 1,
                rotation: 0,
                duration: 0.3
            });
        });
    });

    // Register button
    const registerBtn = document.querySelector('.btn-register');
    if (registerBtn) {
        registerBtn.addEventListener('click', () => {
            alert('Registration form would open here!\n\nContact: info@awakeningyatra.com');
        });
    }
}

// === PERFORMANCE OPTIMIZATIONS ===

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Resize handler
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});

// === CONSOLE MESSAGE ===
console.log(
    '%c🕉️ Awakening Yatra',
    'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #8B5CF6, #EC4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent;'
);
console.log(
    '%cImmersive spiritual journey experience',
    'font-size: 14px; color: #F59E0B;'
);
console.log(
    '%cBuilt with GSAP ScrollTrigger & Lenis',
    'font-size: 12px; color: #9CA3AF;'
);
