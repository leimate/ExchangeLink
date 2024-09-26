// Function to include external HTML into div placeholders
function includeHTML() {
    const header = document.getElementById('header-container');
    const footer = document.getElementById('footer-container');

    // Load header.html
    fetch('header.html')
        .then(response => response.text())
        .then(data => header.innerHTML = data)
        .catch(err => console.log('Error loading header:', err));

    // Load footer.html
    fetch('footer.html')
        .then(response => response.text())
        .then(data => footer.innerHTML = data)
        .catch(err => console.log('Error loading footer:', err));
    
}

// Call function to include the header and footer
window.onload = includeHTML;