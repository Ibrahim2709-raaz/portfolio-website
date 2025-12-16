// Typed.js effect
var Typed = new Typed(".text", {
  strings: ["Developer", "Pianist", "Dreamer", "Poet"],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true
});

// Tab switching
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
  for (tablink of tablinks) {
    tablink.classList.remove("active-link");
  }
  for (tabcontent of tabcontents) {
    tabcontent.classList.remove("active-tab");
  }
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}

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

// Close with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === "Escape") {
    sideNav.classList.remove('active');
  }
});
