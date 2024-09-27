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
document.addEventListener('DOMContentLoaded', function() {
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
            location: document.getElementById('location').value,
            duration: document.getElementById('duration').value,
            compensation: document.getElementById('compensation').value,
            deadline: document.getElementById('deadline').value,
            contact: document.getElementById('contact').value,
            datePosted: getLocalDateTime(), // Capture the local date and tim
            uniqueId: generateUniqueId(), // Generate a unique ID for each post
        };

        // Send the data to Make.com webhook
        fetch('https://hook.eu2.make.com/2brlbaz7km9sstx2smz58uglgm870zke', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jobData),
        })
        .then(response => {
            if (response.ok) {
                return response.text(); // Parse response as plain text if not JSON
            }
            throw new Error('Error in posting job');
        })
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
    // Function to get local date and time in a formatted string
    function getLocalDateTime() {
        return new Date().toLocaleString('en-PH', { timeZone: 'Asia/Manila' });
    }


    
});

    //Update Job Listings job-listing.html

// Function to display job postings
function displayJobPostings(data) {
    const jobPostsContainer = document.getElementById('job-posts');
    jobPostsContainer.innerHTML = ''; // Clear previous postings

    data.forEach(job => {
        const jobElement = document.createElement('div');
        jobElement.classList.add('job-post');

        jobElement.innerHTML = `
            <h3>${job.title}</h3>
            <p><strong>Posted by:</strong> ${job.posterName}</p>
            <p><strong>Description:</strong> ${job.description}</p>
            <p><strong>Skills:</strong> ${job.skills}</p>
            <p><strong>Company:</strong> ${job.company || 'N/A'}</p>
            <p><strong>Deal Type:</strong> ${job.dealType}</p>
            <p><strong>Location:</strong> ${job.location || 'N/A'}</p>
            <p><strong>Duration:</strong> ${job.duration || 'N/A'}</p>
            <p><strong>Compensation:</strong> ${job.compensation || 'N/A'}</p>
            <p><strong>Application Deadline:</strong> ${job.deadline || 'N/A'}</p>
            <p><strong>Contact:</strong> ${job.contact}</p>
            <p><strong>Date Posted:</strong> ${job.datePosted}</p>
        `;

        jobPostsContainer.appendChild(jobElement);
    });
}

// Fetch job postings on page load
window.onload = () => {
    includeHTML();
    fetchJobPostings();
};
