// This is an example of client-side code that runs in the browser
// Header

const header = document.querySelector('header');
const sections = document.querySelectorAll('section');
const navlinks = document.querySelectorAll('a[href^="#"]');

window.addEventListener('scroll', () => {
  // Sticky header
  header.classList.toggle('sticky', window.scrollY > 10);

  // Update active link
  let currentSection = '';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;

    // Check if the current section scroll position is within this section
    if (
      window.scrollY >= sectionTop &&
      window.scrollY < section.offsetTop + section.offsetHeight
    ) {
      currentSection = section.getAttribute('id');
    }
  });

  navlinks.forEach((link) => {
    link.classList.remove('active');

    // Add active class if the link corresponds to the current section
    if (link.getAttribute('href').includes(currentSection)) {
      link.classList.add('active');
    }
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 90;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      // Smooth scroll to the target position
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      // Remove active class from all links and add it to the clicked one
      document
        .querySelectorAll('a[href^="#"]')
        .forEach((el) => el.classList.remove('active'));
      this.classList.add('active');
    }
  });
});

// -- Main
// -- Section-Hero

document
  .getElementById('subscription-form')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const subscribeButton = document.getElementById('subscribe-button');
    const message = document.getElementById('thanks');

    subscribeButton.classList.add('fly-away');
    message.classList.add('show-message');

    document.getElementById('email').value = '';

    setTimeout(function () {
      subscribeButton.classList.remove('fly-away');
      message.classList.remove('show-message');
    }, 2000);
  });

// -- Section-Stats

function countUp(element, duration) {
  const target = parseInt(element.getAttribute('data-target'));
  const increment = Math.ceil(target / (duration / 100));

  let count = 0;

  const timer = setInterval(() => {
    count += increment;
    element.textContent = count;

    if (count >= target) {
      clearInterval(timer);
      element.textContent = target;
    }
  }, 50);
}

function handleCountUp() {
  const counts = document.querySelectorAll('.count');
  counts.forEach((count) => {
    countUp(count, 2000);
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      handleCountUp();
      observer.unobserve(entry.target);
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const statsSection = document.querySelector('.section-stats');
  observer.observe(statsSection);
});

// -- Section-Portfolio

const filterContainer = document.querySelector('.portfolio-filters');
const masonryItems = document.querySelectorAll('.masonry-items');

// Show or hide masonry items based on filter
function filterItems(filterValue) {
  masonryItems.forEach((item) => {
    if (item.classList.contains(filterValue) || filterValue === 'all') {
      item.classList.remove('hide');
      item.classList.add('show');
    } else {
      item.classList.remove('show');
      item.classList.add('hide');
    }
  });
}

filterContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('filter-item')) {
    // Deactivate existing active 'filter-item'
    const activeItem = filterContainer.querySelector('.active');
    if (activeItem) {
      activeItem.classList.remove('active');
    }

    // Activate new 'filter-item'
    event.target.classList.add('active');
    const filterValue = event.target.getAttribute('data-filter');
    filterItems(filterValue);
  }
});

// Ensure that all items are visible when the page loads
document.addEventListener('DOMContentLoaded', () => {
  // Set the "All" filter as active
  const defaultFilter = filterContainer.querySelector('[data-filter="all"]');
  if (defaultFilter) {
    defaultFilter.classList.add('active');
  }
  // Show all items by applying the 'all' filter
  filterItems('all');
});

// -- Section-Pricing

const toggleSwitch = document.querySelector('.toggle-switch');

toggleSwitch.addEventListener('change', () => {
  if (toggleSwitch.checked) {
    document.querySelector('.pricing-accordion').classList.add('active');
  } else {
    document.querySelector('.pricing-accordion').classList.remove('active');
  }
});

// -- Section-Faqs

const faqs = document.querySelectorAll('.faq-block');

faqs.forEach((faq) => {
  faq.addEventListener('click', () => {
    faq.classList.toggle('active');
  });
});

// -- Section-Testimonials

const slides = document.querySelectorAll('.panel-item');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let slideInterval;

// Show the initial slide
showSlide(currentSlide);
startSlideInterval();

// Update slides without skipping in-between slides
function showSlideWithTransition(targetIndex) {
  clearInterval(slideInterval);

  const steps =
    targetIndex > currentSlide
      ? Array.from(
          { length: targetIndex - currentSlide },
          (_, i) => currentSlide + i + 1
        )
      : Array.from(
          { length: currentSlide - targetIndex },
          (_, i) => currentSlide - i - 1
        );

  steps.forEach((step, i) => {
    setTimeout(() => {
      showSlide(step);
    }, i * 200); // Set faster transition speed
  });

  // Restart auto-slide after transition
  setTimeout(startSlideInterval, steps.length * 200);
}

function showSlide(index) {
  currentSlide = index;

  slides.forEach((slide, i) => {
    slide.classList.remove('active', 'previous', 'next');
    slide.style.transform =
      'transform 0.5s ease-in-out, opacity 0.5s ease-in-out';

    if (i === currentSlide) {
      slide.classList.add('active');
      slide.style.transform = 'translateX(0)';
      slide.style.opacity = 1;
    } else {
      slide.style.opacity = '0';
      slide.style.transform =
        i < currentSlide ? 'translateX(-100%)' : 'translateX(100%)';
    }

    dots[i].classList.toggle('active', i === currentSlide);
  });
}

function nextSlide() {
  showSlide((currentSlide + 1) % slides.length);
}

function prevSlide() {
  showSlide((currentSlide - 1 + slides.length) % slides.length);
}

// Automatic sliding
function startSlideInterval() {
  slideInterval = setInterval(nextSlide, 3000);
}

// Handle dot clicks with multi-slide transition effect
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    if (i !== currentSlide) showSlideWithTransition(i);
  });
});

// -- Section-Contact

// DOMContentLoaded Event
document.addEventListener('DOMContentLoaded', () => {
  // Select the Form and Add Event Listener
  const form = document.querySelector('.messageForm');

  form.addEventListener('submit', async (event) => {
    // Prevent Default Form Submission
    event.preventDefault();

    // Collect Form Data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Send Form Data Using Fetch API
    try {
      const response = await fetch('/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      // Handle the Response
      const result = await response.json();
      
      if (result.success) {
        showSuccessMessage(result.message);
      } else {
        showErrorMessage(result.message);
      }
      // Error Handling
    } catch (error) {
      showErrorMessage(
        'There was an error submitting the form. Please try again.'
      );
    }
  });

  // Show Success or Error Messages
  const showSuccessMessage = (message) => {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = message;
    document.querySelector('.right-panel').appendChild(successMessage);
    setTimeout(() => successMessage.remove(), 3000);
  };

  const showErrorMessage = (message) => {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    document.querySelector('.right-panel').appendChild(errorMessage);
    setTimeout(() => errorMessage.remove(), 3000);
  };
});

// -- @Media Section

const bars = document.getElementById('bars');
const menu = document.querySelector('.bars-menu');
const icon = bars.querySelector('i');
const links = document.querySelectorAll('.link');
const logoAppend = document.querySelectorAll('.logo');

bars.addEventListener('click', () => {
  menu.classList.toggle('active');
  icon.classList.toggle('fa-ba');
  icon.classList.toggle('fa-times');

  if (menu.classList.contains('active')) {
    links.forEach((link) => {
      link.style.pointerEvents = 'none';
      link.style.opacity = '0.5';
    });
  } else {
    links.forEach((link) => {
      link.style.pointerEvents = 'auto';
      link.style.opacity = '1';
    });
  }

  if (menu.classList.contains('active')) {
    logoAppend.forEach((logo) => {
      logo.style.pointerEvents = 'none';
      logo.style.opacity = '0.5';
    });
  } else {
    logoAppend.forEach((logo) => {
      logo.style.pointerEvents = 'auto';
      logo.style.opacity = '1';
    });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const dropdowns = document.querySelectorAll('.next-dropdown');

  dropdowns.forEach((dropdown) => {
    const chevron = dropdown.querySelector('i');
    const submenuText = dropdown.querySelector('a');
    const submenu = dropdown.querySelector('.next-sub-menu');

    chevron.addEventListener('click', function (e) {
      e.preventDefault();

      if (chevron.style.transform === 'rotate(180deg)') {
        chevron.style.transform = 'rotate(0)';
        submenuText.classList.remove('active');
        submenu.classList.remove('open');
        chevron.classList.remove('active');
      } else {
        chevron.style.transform = 'rotate(180deg)';
        submenuText.classList.add('active');
        submenu.classList.add('open');
        chevron.classList.add('active');
      }

      const deepDropdown = dropdown.querySelector('.next-deepdropdown');

      if (deepDropdown) {
        const deepChevron = deepDropdown.querySelector('i');
        const deepSubmenuText = deepDropdown.querySelector('a');
        const deepSubmenu = deepDropdown.querySelector('.next-inline-submenu');

        deepChevron.addEventListener('click', function (e) {
          e.preventDefault();

          if (deepChevron.style.transform === 'rotate(180deg)') {
            deepChevron.style.transform = 'rotate(0)';
            deepSubmenuText.classList.remove('active');
            deepSubmenu.classList.remove('open');
            deepChevron.classList.remove('active');
          } else {
            deepChevron.style.transform = 'rotate(180deg)';
            deepSubmenuText.classList.add('active');
            deepSubmenu.classList.add('open');
            deepChevron.classList.add('active');
          }
        });
      }
    });
  });
});

//  -- Scroll-To-Top-Btn

const scrollToTopBtn = document.getElementById('scrollToTopBtn');

window.onscroll = function () {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollToTopBtn.style.display = 'block';
  } else {
    scrollToTopBtn.style.display = 'none';
  }
};

scrollToTopBtn.addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
