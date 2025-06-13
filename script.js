// Mobile Navigation Toggle
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");

hamburger.addEventListener("click", () => {
  // Toggle hamburger animation
  const spans = hamburger.querySelectorAll("span");
  spans[0].classList.toggle("rotate-45");
  spans[0].classList.toggle("translate-y-2");
  spans[1].classList.toggle("opacity-0");
  spans[2].classList.toggle("-rotate-45");
  spans[2].classList.toggle("-translate-y-2");

  // Toggle mobile menu
  mobileMenu.classList.toggle("left-[-100%]");
  mobileMenu.classList.toggle("left-0");
});

// Close mobile menu when clicking on a link
document.querySelectorAll("#mobile-menu a").forEach((link) =>
  link.addEventListener("click", () => {
    const spans = hamburger.querySelectorAll("span");
    spans[0].classList.remove("rotate-45", "translate-y-2");
    spans[1].classList.remove("opacity-0");
    spans[2].classList.remove("-rotate-45", "-translate-y-2");

    mobileMenu.classList.add("left-[-100%]");
    mobileMenu.classList.remove("left-0");
  })
);

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 100) {
    navbar.classList.remove("bg-opacity-30");
    navbar.classList.add("bg-opacity-80");
    navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.3)";
  } else {
    navbar.classList.remove("bg-opacity-80");
    navbar.classList.add("bg-opacity-30");
    navbar.style.boxShadow = "none";
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
document
  .querySelectorAll(".service-card, .why-us-item, .portfolio-item, .stat-item")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

// Form submission
document
  .querySelector(".contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const company = this.querySelectorAll('input[type="text"]')[1].value;
    const message = this.querySelector("textarea").value;

    // Simple validation
    if (!name || !email || !message) {
      alert("Please fill in all required fields.");
      return;
    }

    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;
    submitBtn.classList.add("opacity-75", "cursor-not-allowed");

    setTimeout(() => {
      alert("Thank you for your message! We'll get back to you soon.");
      this.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      submitBtn.classList.remove("opacity-75", "cursor-not-allowed");
    }, 2000);
  });

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent =
        target +
        (element.textContent.includes("%")
          ? "%"
          : element.textContent.includes("+")
          ? "+"
          : "");
      clearInterval(timer);
    } else {
      element.textContent =
        Math.floor(start) +
        (element.textContent.includes("%")
          ? "%"
          : element.textContent.includes("+")
          ? "+"
          : "");
    }
  }, 16);
}

// Animate counters when they come into view
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target.querySelector("h3");
        const text = counter.textContent;
        const number = parseInt(text.replace(/\D/g, ""));

        if (number) {
          counter.textContent =
            "0" + (text.includes("%") ? "%" : text.includes("+") ? "+" : "");
          animateCounter(counter, number);
          statsObserver.unobserve(entry.target);
        }
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll(".stat-item").forEach((stat) => {
  statsObserver.observe(stat);
});

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize typing effect when page loads
document.addEventListener("DOMContentLoaded", () => {
  const heroTitle = document.querySelector("#home h1");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 50);
    }, 1000);
  }
});

// Add scroll progress indicator
function createScrollProgress() {
  const progressBar = document.createElement("div");
  progressBar.className =
    "fixed top-0 left-0 h-1 bg-gradient-to-r from-primary to-secondary z-50 transition-all duration-100";
  progressBar.style.width = "0%";
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", () => {
    const scrollPercent =
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
      100;
    progressBar.style.width = scrollPercent + "%";
  });
}

createScrollProgress();

// Add floating action button for contact
function createFloatingButton() {
  const fab = document.createElement("a");
  fab.href = "#contact";
  fab.innerHTML = '<i class="fas fa-comments"></i>';
  fab.className =
    "fixed bottom-8 right-8 w-15 h-15 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white text-2xl shadow-lg z-50 transition-all duration-300 opacity-0 translate-y-24 hover:scale-110";

  document.body.appendChild(fab);

  // Show/hide based on scroll position
  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      fab.classList.remove("opacity-0", "translate-y-24");
      fab.classList.add("opacity-100", "translate-y-0");
    } else {
      fab.classList.remove("opacity-100", "translate-y-0");
      fab.classList.add("opacity-0", "translate-y-24");
    }
  });
}

createFloatingButton();

// Add parallax effect to hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroSection = document.getElementById("home");
  const speed = scrolled * 0.5;

  if (heroSection && scrolled < heroSection.offsetHeight) {
    heroSection.style.transform = `translateY(${speed}px)`;
  }
});

// Add intersection observer for fade-in animations
const fadeInObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fade-in-up");
        fadeInObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }
);

// Observe all sections for fade-in animation
document.querySelectorAll("section").forEach((section) => {
  fadeInObserver.observe(section);
});

// Add hover effects for service cards
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    const icon = card.querySelector(".fas");
    if (icon) {
      icon.parentElement.classList.add("scale-110");
    }
  });

  card.addEventListener("mouseleave", () => {
    const icon = card.querySelector(".fas");
    if (icon) {
      icon.parentElement.classList.remove("scale-110");
    }
  });
});

// Add custom scrollbar styles
const style = document.createElement("style");
style.textContent = `
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: #f1f5f9;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #6366f1;
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #4f46e5;
  }
`;
document.head.appendChild(style);
