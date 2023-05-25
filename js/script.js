//*******************************
//         Hide NAVBAR          *
//*******************************
// Get the navigation bar element
const navBar = document.querySelector('.bottom-navbar');
let isScrolling;
// Function to add the 'show' class to the navigation bar
function showNavBar() {
navBar.classList.add('show');
}
// Function to remove the 'show' class from the navigation bar
function hideNavBar() {
navBar.classList.remove('show');
}
// Function to handle scroll events
function handleScroll() {
// Clear the timeout to debounce the scroll event
window.clearTimeout(isScrolling);
// Show the navigation bar
showNavBar();
// Set a timeout to hide the navigation bar after scrolling stops
isScrolling = setTimeout(function() {
    hideNavBar();
}, 200); // Adjust the timeout duration as needed
}
// Add an event listener to handle scroll events
window.addEventListener('scroll', handleScroll);
