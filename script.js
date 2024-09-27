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


// Submit function to MAKE.com
// Submit function to MAKE.com
document.getElementById('jobForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Capture the form data
    const jobData = {
        posterName: document.getElementById('name').value,
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        skills: document.getElementById('skills').value,
        company: document.getElementById('company').value,
        dealType: document.getElementById('deal').value,
        datePosted: new Date().toISOString(), // Capture the current date
        uniqueId: generateUniqueId(), // Generate a unique ID for each post
        contactInfo: document.getElementById('contact').value, // Capture contact information
    };

    // Send the data to Make.com webhook
    fetch('https://hook.eu2.make.com/gh15bg69yv59ppljzyi4w92wn26a7r6v', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        alert('Job posted successfully!');
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('There was an error posting the job.');
    });
});

// Function to generate a unique ID for each job post
function generateUniqueId() {
    return 'job_' + Math.random().toString(36).substr(2, 9);
}
