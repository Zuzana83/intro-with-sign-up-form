const form = document.getElementById("form");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const password = document.getElementById("password");

// Show error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = "form-control error";
    const errorMsg = formControl.querySelector(".error-text");
    errorMsg.textContent = message;
}

function hideError(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control";
}

function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!re.test(input.value.trim())) {
        showError(input, "Looks like this is not an email")
    }
    if(input.value.trim() === "") {
        showError(input, "Email address cannot be empty")
    }
}

function getFieldName(input) {
    return input.placeholder.charAt(0).toUpperCase() + input.placeholder.slice(1);
}

// check required fields
function checkRequired(inputArray) {
    inputArray.forEach(function(input) {
        if(input.value.trim() === "") {
            showError(input, `${getFieldName(input)} cannot be empty`);
        } else {
            hideError(input);
        }
    });
}

function checkLength(input, min, max) {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`)
    } else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} cannot be longer than ${max} characters`);
    }
}

function clearInput(inputArray) {
    inputArray.forEach(function(input) {
        input.value = "";
    })
}

// Event listeners
form.addEventListener("submit", function(e) {
    e.preventDefault();

    checkRequired([firstName, lastName, email, password]);
    checkLength(password, 6, 24);
    checkEmail(email);

    // clearInput([firstName, lastName, email, password]);
});