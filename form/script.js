// Custom popup functions
function showPopup(title, message) {
  document.getElementById('popup-title').textContent = title;
  document.getElementById('popup-message').textContent = message;
  document.getElementById('popup-template').classList.remove('hidden');
}

function hidePopup() {
  document.getElementById('popup-template').classList.add('hidden');
}

// Toggle password visibility
function togglePasswordVisibility(fieldId) {
  const input = document.getElementById(fieldId);
  const icon = input.nextElementSibling.querySelector('i');
  
  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.replace('fa-eye', 'fa-eye-slash');
  } else {
    input.type = 'password';
    icon.classList.replace('fa-eye-slash', 'fa-eye');
  }
}

// Name field validation
function filterAndValidateName(input) {
  // Store cursor position
  const start = input.selectionStart;
  const end = input.selectionEnd;
  
  // Filter out invalid characters
  const originalValue = input.value;
  const filtered = originalValue.replace(/[^A-Za-z\s]/g, '');
  
  // Check if invalid characters were removed
  const hadInvalidChars = filtered.length !== originalValue.length;
  
  // Only update if value changed (to prevent cursor jumping)
  if (hadInvalidChars) {
    input.value = filtered;
    // Restore cursor position
    input.setSelectionRange(start > filtered.length ? filtered.length : start, 
                          end > filtered.length ? filtered.length : end);
    
    // Show error message since invalid characters were attempted
    document.getElementById('name-error').style.display = 'block';
  }
  
  // Validate the current input and update error visibility
  const isValid = /^[A-Za-z\s]+$/.test(input.value);
  document.getElementById('name-error').style.display = isValid ? 'none' : 'block';
}

// Phone number validation
function handleNumberInput(input) {
  // Filter out non-numeric characters
  const originalValue = input.value;
  const filtered = originalValue.replace(/\D/g, '');
  
  // Check if any non-digits were removed
  if (filtered !== originalValue) {
    input.value = filtered;
    // Show error since invalid characters were attempted
    document.getElementById('number-error').style.display = 'block';
  }
  
  // Validate the current input
  validateNumber();
}

function onlyNumbers(event) {
  const charCode = event.which ? event.which : event.keyCode;
  if (charCode >= 48 && charCode <= 57) {
    return true;
  }
  // Show error when non-number key is pressed
  document.getElementById('number-error').style.display = 'block';
  return false;
}

function validateNumber(onBlur = false) {
  const number = document.getElementById("number").value;
  const errorElement = document.getElementById('number-error');
  
  if (!onBlur && number === '') {
    errorElement.style.display = 'none';
    return false;
  }
  
  const isValid = /^[0-9]{10}$/.test(number);
  errorElement.style.display = isValid ? 'none' : 'block';
  return isValid;
}

// Field validations
function validateName(onBlur = false) {
  const name = document.getElementById("name").value;
  const errorElement = document.getElementById('name-error');
  
  if (!onBlur && name === '') {
    errorElement.style.display = 'none';
    return false;
  }
  
  const isValid = /^[A-Za-z\s]+$/.test(name);
  errorElement.style.display = isValid ? 'none' : 'block';
  return isValid;
}

function validateEmail(onBlur = false) {
  const email = document.getElementById("email").value;
  const errorElement = document.getElementById('email-error');
  
  if (!onBlur && email === '') {
    errorElement.style.display = 'none';
    return false;
  }
  
  const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) && 
                 !email.endsWith('.') && 
                 !email.includes('..') &&
                 email.split('@')[1].indexOf('.') > 0 &&
                 email === email.trim() &&
                 !email.match(/\.[a-zA-Z]{2,}\./);
  
  errorElement.style.display = isValid ? 'none' : 'block';
  return isValid;
}

function validateDob(onBlur = false) {
  const dob = document.getElementById("dob").value;
  const errorElement = document.getElementById('dob-error');
  
  if (!onBlur && dob === '') {
    errorElement.style.display = 'none';
    return false;
  }
  
  const isValid = dob !== '';
  errorElement.style.display = isValid ? 'none' : 'block';
  return isValid;
}

function validatePassword(onBlur = false) {
  const password = document.getElementById("password").value;
  const errorElement = document.getElementById('password-error');
  
  if (!onBlur && password === '') {
    errorElement.style.display = 'none';
    return false;
  }
  
  const isValid = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{8,16}$/.test(password);
  errorElement.style.display = isValid ? 'none' : 'block';
  
  validateConfirmPassword();
  return isValid;
}

function validateConfirmPassword(onBlur = false) {
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const errorElement = document.getElementById('confirmPassword-error');
  
  if (!onBlur && confirmPassword === '') {
    errorElement.style.display = 'none';
    return false;
  }
  
  const isValid = password === confirmPassword;
  errorElement.style.display = isValid ? 'none' : 'block';
  return isValid;
}

function validateLoginField(onBlur = false) {
  const field = document.getElementById("loginField").value;
  const errorElement = document.getElementById('loginField-error');
  
  if (!onBlur && field === '') {
    errorElement.style.display = 'none';
    return false;
  }
  
  const isEmail = field.includes('@');
  const isValid = isEmail ? 
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(field) : 
    /^[0-9]{10}$/.test(field.replace(/\D/g, ''));
  
  errorElement.style.display = isValid ? 'none' : 'block';
  return isValid;
}

function validateLoginPassword(onBlur = false) {
  const password = document.getElementById("loginPassword").value;
  const errorElement = document.getElementById('loginPassword-error');
  
  if (!onBlur && password === '') {
    errorElement.style.display = 'none';
    return false;
  }
  
  const isValid = password !== '';
  errorElement.style.display = isValid ? 'none' : 'block';
  return isValid;
}

// Check if all required fields are filled
function checkAllSignupFieldsFilled() {
  const requiredFields = ["name", "email", "number", "dob", "password", "confirmPassword"];
  const errorMessage = document.getElementById("form-error-message");
  let allFilled = true;

  for (let fieldId of requiredFields) {
    const input = document.getElementById(fieldId);
    if (!input.value.trim()) {
      allFilled = false;
      break;
    }
  }

  if (allFilled) {
    errorMessage.style.display = 'none';
    // Remove highlight from all fields
    document.querySelectorAll('#signupForm input').forEach(input => {
      input.classList.remove('highlight');
    });
  }
}

function checkAllLoginFieldsFilled() {
  const loginField = document.getElementById("loginField").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const errorMessage = document.getElementById("form-error-message-login");
  
  if (loginField && password) {
    errorMessage.style.display = 'none';
    // Remove highlight from all fields
    document.querySelectorAll('#loginForm input').forEach(input => {
      input.classList.remove('highlight');
    });
  }
}

// Form submission
function handleSignup(e) {
  e.preventDefault();
  const requiredFields = ["name", "email", "number", "dob", "password", "confirmPassword"];
  const errorMessage = document.getElementById("form-error-message");
  let allFilled = true;

  // First check if all fields are filled
  for (let fieldId of requiredFields) {
    const input = document.getElementById(fieldId);
    if (!input.value.trim()) {
      input.classList.add("highlight");
      allFilled = false;
    } else {
      input.classList.remove("highlight");
    }
  }

  if (!allFilled) {
    errorMessage.textContent = "Please fill out all the required fields.";
    errorMessage.style.display = 'block';
    return false;
  }

  // Then validate each field
  if (!validateName(true)) return false;
  if (!validateEmail(true)) return false;
  if (!validateNumber(true)) return false;
  if (!validateDob(true)) return false;
  if (!validatePassword(true)) return false;
  if (!validateConfirmPassword(true)) return false;

  errorMessage.style.display = 'none';

  const countryCode = document.getElementById('countryCode').value || '+91';
  const user = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    number: countryCode + " " + document.getElementById("number").value,
    dob: document.getElementById("dob").value,
    password: document.getElementById("password").value
  };

  localStorage.setItem("userData", JSON.stringify(user));
  showPage("loginPage");
  showPopup("Success", "Registration successful! Please login.");
}

function handleLogin(e) {
  e.preventDefault();
  const errorMessage = document.getElementById("form-error-message-login");
  errorMessage.textContent = "";
  
  const loginField = document.getElementById("loginField").value.trim();
  const password = document.getElementById("loginPassword").value;
  
  if (!loginField || !password) {
    errorMessage.textContent = "Please fill out all the required fields.";
    errorMessage.style.display = 'block';
    
    if (!loginField) {
      document.getElementById('loginField').classList.add('highlight');
    }
    if (!password) {
      document.getElementById('loginPassword').classList.add('highlight');
    }
    return false;
  }

  if (!validateLoginField(true)) return false;
  if (!validateLoginPassword(true)) return false;

  const user = JSON.parse(localStorage.getItem("userData"));

  if (!user) {
    errorMessage.textContent = "Account not found. Please sign up first.";
    errorMessage.style.display = 'block';
    showPopup("Error", "Account not found. Please sign up first.");
    return false;
  }

  let isValid = false;
  if (loginField.includes('@')) {
    isValid = user.email === loginField && user.password === password;
  } else {
    const phoneDigits = loginField.replace(/\D/g, '');
    const fullPhone = user.number.split(' ')[0] + ' ' + phoneDigits;
    isValid = user.number === fullPhone && user.password === password;
  }

  if (!isValid) {
    errorMessage.textContent = "Invalid credentials. Please try again.";
    errorMessage.style.display = 'block';
    showPopup("Error", "Invalid credentials. Please try again.");
    return false;
  }

  errorMessage.textContent = "";
  document.getElementById('loginField-error').style.display = 'none';
  document.getElementById('loginPassword-error').style.display = 'none';

  document.getElementById("displayName").textContent = user.name;
  document.getElementById("displayEmail").textContent = user.email;
  document.getElementById("displayNumber").textContent = user.number;
  document.getElementById("displayDob").textContent = user.dob;

  showPage("dashboardPage");
  showPopup("Success", "Login successful! Welcome back.");
}

// Other functions
async function fetchCountryCodes() {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const countries = await response.json();
    
    const countryList = countries.map(country => {
      let callingCode = '';
      if (country.idd && country.idd.root) {
        callingCode = country.idd.root;
        if (country.idd.suffixes && country.idd.suffixes.length === 1) {
          callingCode += country.idd.suffixes[0];
        }
      }
      return {
        name: country.name.common,
        code: country.cca2,
        callingCode: callingCode
      };
    }).filter(country => country.callingCode);
    
    countryList.sort((a, b) => a.name.localeCompare(b.name));
    
    const selector = document.getElementById('country-selector');
    selector.innerHTML = `
      <select id="countryDropdown" onchange="updateCountryCode()">
        <option value="">Select your country</option>
        ${countryList.map(country => 
          `<option value="${country.callingCode}" ${country.callingCode === '+91' ? 'selected' : ''}>
            ${country.name} (${country.callingCode})
          </option>`
        ).join('')}
      </select>
    `;
    
    updateCountryCode();
    
  } catch (error) {
    console.error("Error fetching country codes:", error);
    document.getElementById('country-selector').innerHTML = `
      <p class="error-message">Could not load country codes. Defaulting to +91</p>
    `;
    document.getElementById('countryCode').value = '+91';
  }
}

function updateCountryCode() {
  const dropdown = document.getElementById('countryDropdown');
  const codeInput = document.getElementById('countryCode');
  if (dropdown && dropdown.value) {
    codeInput.value = dropdown.value;
  }
}

function showPage(pageId) {
  document.getElementById("signupPage").classList.add("hidden");
  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("dashboardPage").classList.add("hidden");
  document.getElementById(pageId).classList.remove("hidden");
  
  // Clear all error messages when switching pages
  document.getElementById("form-error-message").style.display = 'none';
  document.getElementById("form-error-message-login").style.display = 'none';
  
  // Clear highlight from all fields
  document.querySelectorAll('.highlight').forEach(el => {
    el.classList.remove('highlight');
  });
}

function logout() {
  showPage("loginPage");
  showPopup("Logged Out", "You have been successfully logged out.");
}

window.onload = () => {
  showPage("signupPage");
  fetchCountryCodes();
};