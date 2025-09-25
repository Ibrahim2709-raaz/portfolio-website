// Typed.js effect
var typed = new Typed(".text", {
  strings: ["Developer", "Pianist", "Dreamer"],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true
});

const menuBtn = document.querySelector('.menu-btn');
    const sideNav = document.querySelector('.side-nav');

    // Toggle side nav
    menuBtn.addEventListener('click', () => {
      sideNav.classList.toggle('active');
    });

    // Close side nav when clicking a link
    sideNav.addEventListener('click', (e) => {
      if (e.target.classList.contains('nav-link')) {
        sideNav.classList.remove('active');
      }
    });

    // Close when pressing Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === "Escape") {
        sideNav.classList.remove('active');
      }
    });
