document.addEventListener("DOMContentLoaded", function () {
    let form = document.querySelector("form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const formData = {
            name: document.getElementById("Name").value.trim(),
            dob: document.getElementById("DOB").value,
            field: document.getElementById("field").value,
            gender: document.getElementById("Gender").value,
            email: document.getElementById("Email Address").value.trim(),
            phone: document.getElementById("phone").value.trim()
        };

        try {
            const response = await fetch('http://localhost:3001/api/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            
            if (!response.ok) {
                if (data.error === 'Validation error') {
                    alert(data.details.join('\n'));
                } else {
                    alert(data.error || 'Error submitting job application. Please try again.');
                }
                return;
            }

            alert('Job application submitted successfully!');
            form.reset();
        } catch (error) {
            console.error('Error:', error);
            alert('Error submitting job application. Please try again.');
        }
    });
});