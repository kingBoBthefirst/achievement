
  // Get all navbar links
  const navbarLinks = document.querySelectorAll('.nav-item a');

  // Function to remove 'active' class from all links
  function removeActiveClasses() {
      navbarLinks.forEach(link => link.classList.remove('active'));
  }

  // Function to add 'active' class to the current link
  function addActiveClass(link) {
      removeActiveClasses();
      link.classList.add('active');
  }

  // Intersection Observer setup
  const sections = document.querySelectorAll('section');
  const observerOptions = {
      root: null, // relative to viewport
      threshold: 0.6 // 60% of the section is in view
  };

  const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const activeLink = document.querySelector(`.nav-item a[href="#${entry.target.id}"]`);
              addActiveClass(activeLink);
          }
      });
  }, observerOptions);

  sections.forEach(section => {
      observer.observe(section);
  });

