// ===== SCROLLY TELLING - INTERSECTION OBSERVER ===== //

// Create Intersection Observer for scroll-triggered animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Trigger animation by adding 'show' class
      entry.target.classList.add('show');
      
      // Stop observing once animated
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all elements with scroll animation classes
document.addEventListener('DOMContentLoaded', () => {
  // Observe elements for scroll animations
  const scrollElements = document.querySelectorAll(
    '.scroll-slide-in, .scroll-pop-in, .scroll-fade-in, .scroll-reveal'
  );
  
  scrollElements.forEach(el => {
    observer.observe(el);
  });

  // Handle parallax scrolling for quote section
  handleParallaxScroll();
});

// ===== PARALLAX SCROLLING ===== //
function handleParallaxScroll() {
  window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.scroll-parallax');
    
    parallaxElements.forEach(element => {
      const scrollPosition = window.pageYOffset;
      const elementOffset = element.offsetTop;
      const distance = scrollPosition - elementOffset;
      
      // Apply parallax effect
      if (distance > -window.innerHeight && distance < window.innerHeight) {
        element.style.backgroundPosition = `0px ${distance * 0.5}px`;
      }
    });
  });
}

// ===== SMOOTH SCROLL FOR NAVIGATION ===== //
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Update active nav link
      updateActiveNavLink(this.getAttribute('href'));
    }
  });
});

// ===== UPDATE ACTIVE NAV LINK ===== //
function updateActiveNavLink(sectionId) {
  document.querySelectorAll('.nav-rooms a').forEach(link => {
    link.style.color = '#aaa';
  });
  
  const activeLink = document.querySelector(`.nav-rooms a[href="${sectionId}"]`);
  if (activeLink) {
    activeLink.style.color = '#C9A84C';
  }
}

// Update nav link as user scrolls
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-rooms a');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.pageYOffset >= sectionTop - 200) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.style.color = '#aaa';
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.style.color = '#C9A84C';
    }
  });
});

// ===== STAGGER ANIMATIONS ===== //
const staggerElements = document.querySelectorAll('[class*="scroll-up-delay"]');
staggerElements.forEach((el, index) => {
  const delay = index * 0.15;
  el.style.animation = `slideUp 0.8s ease-out ${0.2 + delay}s forwards`;
});

// ===== SCROLL PROGRESS INDICATOR ===== //
window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  
  // Update navbar color based on scroll position
  const navbar = document.querySelector('.navbar');
  if (scrolled > 5) {
    navbar.style.borderBottomColor = '#C9A84C';
  } else {
    navbar.style.borderBottomColor = '#C9A84C';
  }
});

// ===== CONTENT PAGE NAVIGATION ===== //
// Create detail pages when links are clicked
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('panel-link')) {
    const href = e.target.getAttribute('href');
    
    // Check if it's an internal detail page
    if (href && href.startsWith('details/')) {
      e.preventDefault();
      
      // For now, create a simple modal or navigate conceptually
      // In a full implementation, you'd have these pages ready
      const pageName = href.replace('details/', '').replace('.html', '');
      
      // Create a modal showing the expanded content
      showDetailModal(pageName, e.target.closest('.panel'));
    }
  }
});

// ===== DETAIL PAGE MODAL ===== //
function showDetailModal(pageName, sourcePanel) {
  // Create modal if not exists
  let modal = document.getElementById('detail-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'detail-modal';
    modal.className = 'detail-modal';
    document.body.appendChild(modal);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .detail-modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 2000;
        overflow-y: auto;
        animation: fadeIn 0.4s ease-out;
      }
      
      .detail-modal.show {
        display: block;
      }
      
      .detail-content {
        max-width: 800px;
        margin: 60px auto;
        padding: 40px;
        background: rgba(10, 10, 24, 0.95);
        border: 1px solid #C9A84C;
        border-top: 3px solid #C9A84C;
        border-radius: 4px;
        animation: popIn 0.5s ease-out;
      }
      
      .detail-close {
        position: absolute;
        top: 30px;
        right: 30px;
        font-size: 2rem;
        color: #C9A84C;
        cursor: pointer;
        transition: 0.3s ease;
        z-index: 2001;
      }
      
      .detail-close:hover {
        color: #FFD700;
      }
      
      .detail-content h2 {
        color: #C9A84C;
        font-size: 2.5rem;
        margin-top: 0;
      }
      
      .detail-content p {
        color: #ccc;
        line-height: 1.8;
        margin: 20px 0;
      }
      
      .detail-nav {
        margin-top: 40px;
        padding-top: 20px;
        border-top: 1px solid #444;
        text-align: center;
      }
      
      .detail-nav a {
        color: #C9A84C;
        margin: 0 15px;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Populate modal with content based on pageName
  const contentMap = {
    'origins': {
      title: 'The Series Origins',
      content: `<p>Batman: The Animated Series premiered on September 5, 1992, on Fox Kids. The show was commissioned to capitalize on the success of Tim Burton's Batman films, but creators Paul Dini, Bruce Timm, and the production team had a different vision.</p>
                <p>Rather than creating a typical action cartoon, they crafted a sophisticated animated program that would be taken seriously. The show hired experienced screenwriters, drew from noir traditions, and treated its young audience with respect and intelligence.</p>
                <p>The series ran for 109 episodes across five seasons (1992-1995) and became a cultural phenomenon, influencing everything from subsequent Batman media to animation standards worldwide.</p>
                <p>Key achievements:</p>
                <ul style="color: #ccc; margin: 20px 0;">
                  <li>Created characters that remain iconic (Harley Quinn)</li>
                  <li>Set the definitive tone for Batman adaptation</li>
                  <li>Won multiple Emmy Awards</li>
                  <li>Influenced DC Animated Universe</li>
                </ul>`
    },
    'animation': {
      title: 'Animation & Visual Style',
      content: `<p>The animation technique used in Batman: TAS was groundbreaking. The production team pioneered a process of painting backgrounds on black paper instead of the traditional white paper approach.</p>
                <p>This innovation allowed animators to create the "Dark Deco" aesthetic - a fusion of art deco architecture with film noir visual language. The dark backgrounds meant that lighting and shadows could be used dramatically, making Gotham feel like a complete, living world.</p>
                <p>The color palette was restricted and deliberate, using muted tones punctuated by strategic use of brighter colors (like the Joker's purple suit or Batman's cape). This approach created visual impact on a limited animation budget.</p>
                <p>Bruce Timm's character designs became legendary, influencing character design in animation for decades. The simplified, expressive style paired perfectly with the sophisticated storytelling.</p>`
    },
    'cast': {
      title: 'Legendary Voice Cast',
      content: `<p>Batman: The Animated Series featured one of the greatest voice acting ensembles in animation history.</p>
                <p><strong>Kevin Conroy as Batman/Bruce Wayne</strong> - Provided a dual-voice performance that became the gold standard for Batman depictions. His Batman is authoritative and dangerous, while his Bruce Wayne is vulnerable and tragic.</p>
                <p><strong>Mark Hamill as The Joker</strong> - Created an iconic interpretation that balances menace with theatrical humor. His Joker laugh became legendary and inimitable.</p>
                <p><strong>Arleen Sorkin as Harley Quinn</strong> - Brought to life a character created specifically for the series who would become a DC Universe mainstay.</p>
                <p><strong>Paul Dini</strong> - The head writer and creator brought sophisticated storytelling, including the now-canonical "Heart of Ice" episode that reinvented Mr. Freeze.</p>
                <p>Other notable voice actors included Loren Lester (Robin), Andreas Katsulas (Killer Croc), and many other professional voice actors and character actors.</p>`
    },
    'villains': {
      title: 'Rogues Gallery: Complex Antagonists',
      content: `<p>One of Batman: TAS's greatest achievements was elevating the show's villains from caricatures to complex, tragic figures. Each villain had depth, motivation, and humanity.</p>
                <p><strong>Mr. Freeze</strong> - The episode "Heart of Ice" transformed Mr. Freeze from a cold pun-maker into a tragic figure driven by loss and desperation to save his wife Nora. This reinvention became canonical for all future Batman media.</p>
                <p><strong>Harley Quinn</strong> - Created for the series, Harley became the Joker's accomplice while maintaining her own personality and, over time, developing moral complexity.</p>
                <p><strong>The Joker</strong> - Mark Hamill's definitive voice performance created a psychotic but theatrical villain, balancing danger with dark humor.</p>
                <p><strong>Two-Face</strong> - Explored the psychological split of Harvey Dent, treating dissociative identity with seriousness and tragedy.</p>
                <p><strong>Poison Ivy</strong> - Presented environmental themes through a villain motivated by love for nature and her plants.</p>
                <p>The series proved that animated shows could tackle complex villain psychology and moral ambiguity.</p>`
    },
    'awards': {
      title: 'Awards & Recognition',
      content: `<p>Batman: The Animated Series received critical acclaim and numerous prestigious awards during and after its run.</p>
                <p><strong>Emmy Awards:</strong> The series won multiple Daytime Emmy Awards for Outstanding Animated Series and other categories.</p>
                <p><strong>Industry Recognition:</strong> The show became a benchmark for quality animation and storytelling, referenced and studied in animation schools worldwide.</p>
                <p><strong>Cultural Impact:</strong> Praised by critics, educators, and child development experts for its sophisticated approach to children's animation.</p>
                <p><strong>Fan Awards:</strong> Consistently ranks at the top of fan polls for greatest superhero animated series of all time.</p>
                <p><strong>DC Canon:</strong> Episodes and characters from the series became canon in DC Comics lore - a rare achievement for an animated adaptation to influence its source material.</p>
                <p>The series' influence extends across decades, with modern superhero animation measured against BTAS standards.</p>`
    }
  };
  
  const pageContent = contentMap[pageName] || {
    title: 'Batman: The Animated Series',
    content: '<p>Explore the legacy of one of animation\'s greatest achievements.</p>'
  };
  
  modal.innerHTML = `
    <div class="detail-close" onclick="closeDetailModal()">×</div>
    <div class="detail-content">
      <h2>${pageContent.title}</h2>
      ${pageContent.content}
      <div class="detail-nav">
        <a href="#origins">← Back to Exhibition</a>
      </div>
    </div>
  `;
  
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

// Close detail modal
function closeDetailModal() {
  const modal = document.getElementById('detail-modal');
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
  }
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
  const modal = document.getElementById('detail-modal');
  if (modal && e.target === modal) {
    closeDetailModal();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeDetailModal();
  }
});

// ===== PERFORMANCE OPTIMIZATION ===== //
// Throttle scroll events for better performance
let scrollTimeout;
window.addEventListener('scroll', () => {
  if (scrollTimeout) {
    window.cancelAnimationFrame(scrollTimeout);
  }
  
  scrollTimeout = window.requestAnimationFrame(() => {
    // Scroll event handlers run here with throttling
  });
}, { passive: true });
