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

    console.log("Submitting job data:", jobData); // Debugging

    // Send the data to Make.com webhook
    fetch('https://hook.eu2.make.com/gh15bg69yv59ppljzyi4w92wn26a7r6v', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
    })
    .then(response => {
        console.log("Response status:", response.status); // Debugging response status

        // If the response is plain text (e.g., "Accepted"), return it as text
        return response.text(); // Treat response as plain text
    })
    .then(data => {
        console.log("Success data:", data); // Debugging success data
        alert('Job posted successfully!'); // Show success message
    })
    .catch((error) => {
        console.error('Error:', error); // Log the error
        alert('There was an error posting the job.');
    });
});

// Function to generate a unique ID for each job post
function generateUniqueId() {
    return 'job_' + Math.random().toString(36).substr(2, 9);
}
