var Typed = new Typed(".text", {
     strings: ["Developer", "Pianist", "Dreamer"], 
     typeSpeed: 100, 
     backSpeed: 100, 
     backDelay: 1000, 
     loop: true }); 
var tablinks = document.getElementsByClassName("tab-links"); 
var tabcontents = document.getElementsByClassName("tab-contents"); 
function opentab(tabname) 
{   for (tablink of tablinks) 
    {
        tablink.classList.remove("active-link"); 
       
    } 
    for (tabcontent of tabcontents) 
    { 
        tabcontent.classList.remove("active-tab"); 
    } 
    event.currentTarget.classList.add("active-link"); 
    document.getElementById(tabname).classList.add("active-tab"); 
}

const menuBtn = document.querySelector('.menu-btn');
const sideNav = document.querySelector('.side-nav');

menuBtn.addEventListener('click', (e) => {
  e.preventDefault();
  sideNav.style.display = sideNav.style.display === "flex" ? "none" : "flex";
});
