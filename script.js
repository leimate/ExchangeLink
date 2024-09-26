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
document.getElementById('job-posting-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Capture the form data
    const jobData = {
        posterName: document.getElementById('poster-name').value,
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        skills: document.getElementById('skills').value,
        company: document.getElementById('company').value,
        dealType: document.getElementById('deal-type').value,
        datePosted: new Date().toISOString(), // Capture the current date
        uniqueId: generateUniqueId(), // Generate a unique ID for each post
    };

    // Send the data to Make.com webhook
    fetch('https://hook.eu2.make.com/gh15bg69yv59ppljzyi4w92wn26a7r6v', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
    })
    .then(response => response.json())
    .then(data => {
        alert('Job posted successfully!');
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

// Function to generate a unique ID for each job post
function generateUniqueId() {
    return 'job_' + Math.random().toString(36).substr(2, 9);
}
