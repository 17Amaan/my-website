document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        
        
        let name = document.querySelector("input[name='name']").value.trim();
        let email = document.querySelector("input[name='email']").value.trim();
        let message = document.querySelector("textarea[name='message']").value.trim();

        let contactinfo=document.createElement("div");
        contactinfo.classList.add("contactinfo");
        form.append(contactinfo);

    // creating name
    let names=document.createElement("h3");
 names.classList.add("names");
 names.innerText=`NAME : ${name}`;
 contactinfo.append(names);

 //creating email
 let emails=document.createElement("h3");
 emails.classList.add("names");
 emails.innerText=`EMAIL : ${email}`;
 names.appendChild(emails);

 //creating message
 let messages=document.createElement("h3");
 messages.classList.add("names");
 messages.innerText=`MESSAGE : ${message}`;
 emails.appendChild(messages);
        
        if (name === "" || email === "" || message === "") {
            alert("Please fill out all fields before submitting.");
            return;
        }
        
        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }
        
        alert("Your message has been sent successfully! We will get back to you soon.");
        form.reset();
    });
    
    function validateEmail(email) {
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
});

