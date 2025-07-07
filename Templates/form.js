const form1 = document.querySelector(".page"); // Selects the form element by its class
const username = document.getElementById("username"); 
const email = document.getElementById("email");
const password = document.getElementById("pass");
const cpassword = document.getElementById("cpass");


// Get password fields and toggle buttons
const togglePass = document.getElementById("togglePass");
const pass = document.getElementById("pass");

const toggleCpass = document.getElementById("toggleCpass");
const cpass = document.getElementById("cpass");

// Function to toggle password visibility
function togglePasswordVisibility(inputField, toggleButton) {
    toggleButton.addEventListener("click", function () {
        const type = inputField.getAttribute("type") === "password" ? "text" : "password";
        inputField.setAttribute("type", type);

        // Change the icon
        const icon = toggleButton.querySelector("i");
        icon.classList.toggle("fa-eye");
        icon.classList.toggle("fa-eye-slash");
    });
}

// Apply the function to both password fields
togglePasswordVisibility(pass, togglePass);
togglePasswordVisibility(cpass, toggleCpass);



// Attach the event listener
form1.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the default form submission
    console.log("Form submission prevented!");
    valinput();
});

// Validation logic
const valinput = () => {
    const usernameval = username.value.trim();
    const emailval = email.value.trim();
    const passval = password.value.trim();
    const cpassval = cpassword.value.trim();

    if (usernameval === "") {
        seterror(username, "Username is required");
    } else {
        setsuccess(username);
    }

    if (emailval === "") {
        seterror(email, "Email is required");
    } else if (!validateEmail(emailval)) {
        seterror(email, "Please enter a valid email");
    } else {
        setsuccess(email);
    }

    if (passval === "") {
        seterror(password, "Password is required");
    } else {
        setsuccess(password);
    }

    if (cpassval === "") {
        seterror(cpassword, "Please confirm your password");
    } else if (cpassval !== passval) {
        seterror(cpassword, "Passwords do not match");
    } else {
        setsuccess(cpassword);
    }
};

// Function to set error
const seterror = (element, message) => {
    const inputControl = element.closest('.Formcontrol'); // Use closest to find the parent div with class 'Formcontrol'
    if (!inputControl) {
        console.error("Parent .Formcontrol not found for", element);
        return; // Stop execution if no parent element is found
    }
    const errordisplay = inputControl.querySelector('.error');
    if (!errordisplay) {
        console.error("Error span not found inside", inputControl);
        return; // Stop execution if no error span is found
    }
    errordisplay.innerText = message; // Set the error message
    errordisplay.style.color = "red"; // Optional: set the color of the error message
};

// Function to set success
const setsuccess = (element) => {
    const inputControl = element.closest('.Formcontrol'); // Use closest to find the parent div with class 'Formcontrol'
    if (!inputControl) {
        console.error("Parent .Formcontrol not found for", element);
        return; // Stop execution if no parent element is found
    }
    const errordisplay = inputControl.querySelector('.error');
    if (errordisplay) {
        errordisplay.innerText = ""; // Clear the error message
    }
};

// Email validation helper function
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};



const backButton = document.getElementById("backButton");

// Navigate to the previous page or a specific URL
backButton.addEventListener("click", function () {
    // Navigate to the previous page
    window.history.back();

    // Or navigate to a specific URL (uncomment this line if needed)
    // window.location.href = "index.html";
});
