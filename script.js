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


document.getElementById('jobForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission
    
    const formData = new FormData(this);
    const data = {};
    
    formData.forEach((value, key) => data[key] = value);
    
    fetch('https://hook.integromat.com/your-webhook-url', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            alert("Job Posted Successfully!");
        } else {
            alert("Error Posting Job.");
        }
    });
});
