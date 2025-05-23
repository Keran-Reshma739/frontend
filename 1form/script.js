function clearHighlightsAndErrors(fieldId) {
  const input = document.getElementById(fieldId);
  const errorElement = document.getElementById(`${fieldId}-error`);
  
  if (input.value.trim()) {
    input.classList.remove("highlight");
    if (errorElement && fieldId !== 'confirmPassword') {
      errorElement.style.display = 'none';
    }
    
    if (fieldId !== 'loginField' && fieldId !== 'loginPassword') {
      document.getElementById("form-error-message").style.display = 'none';
    } else {
      document.getElementById("form-error-message-login").style.display = 'none';
    }
  }
}

function validateEmail() {
  const email = document.getElementById("email").value;
  const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) && 
                 !email.endsWith('.') && 
                 !email.includes('..') &&
                 email.split('@')[1].indexOf('.') > 0 &&
                 email === email.trim();
  
  document.getElementById('email-error').style.display = isValid || email === '' ? 'none' : 'block';
  return isValid;
}

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

function validateDob() {
  const dobInput = document.getElementById("dob");
  const dobError = document.getElementById("dob-error");
  if (!dobInput.value) {
    dobInput.classList.add("highlight");
    dobError.style.display = 'block';
    return false;
  } else {
    dobInput.classList.remove("highlight");
    dobError.style.display = 'none';
    return true;
  }
}

function onlyLetters(event) {
  const charCode = event.which ? event.which : event.keyCode;
  if (charCode === 32) return true;
  if (charCode >= 48 && charCode <= 57) {
    document.getElementById('name-error').style.display = 'block';
    return false;
  }
  document.getElementById('name-error').style.display = 'none';
  if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
    return true;
  }
  return false;
}

function onlyNumbers(event) {
  const charCode = event.which ? event.which : event.keyCode;
  if (charCode >= 48 && charCode <= 57) {
    document.getElementById('number-error').style.display = 'none';
    return true;
  }
  document.getElementById('number-error').style.display = 'block';
  return false;
}

function validateName() {
  const name = document.getElementById("name").value;
  const isValid = /^[A-Za-z\s]+$/.test(name);
  document.getElementById('name-error').style.display = isValid ? 'none' : 'block';
  return isValid;
}

function validateNumber() {
  const number = document.getElementById("number").value;
  const isValid = /^[0-9]{10}$/.test(number);
  document.getElementById('number-error').style.display = isValid || number === '' ? 'none' : 'block';
  return isValid;
}

function validatePassword() {
  const password = document.getElementById("password").value;
  const isValid = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{8,16}$/.test(password);
  document.getElementById('password-error').style.display = isValid || password === '' ? 'none' : 'block';
  return isValid;
}

function validateConfirmPassword() {
  const pwd = document.getElementById("password").value;
  const confirmPwd = document.getElementById("confirmPassword").value;
  const errorElement = document.getElementById('confirmPassword-error');
  
  if (confirmPwd && pwd !== confirmPwd) {
    errorElement.style.display = 'block';
    return false;
  }
  
  if (pwd === confirmPwd || !confirmPwd) {
    errorElement.style.display = 'none';
    return true;
  }
}

function highlightEmptyFields(fields) {
  let allFilled = true;
  for (let fieldId of fields) {
    const input = document.getElementById(fieldId);
    const errorElement = document.getElementById(`${fieldId}-error`);
    
    if (!input.value.trim()) {
      input.classList.add("highlight");
      if (errorElement) {
        errorElement.style.display = 'none';
      }
      allFilled = false;
    } else {
      input.classList.remove("highlight");
      if (errorElement) {
        errorElement.style.display = 'none';
      }
    }
  }
  return allFilled;
}

function showPage(pageId) {
  document.getElementById("signupPage").classList.add("hidden");
  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("dashboardPage").classList.add("hidden");
  document.getElementById(pageId).classList.remove("hidden");
  
  document.getElementById("form-error-message").style.display = 'none';
  document.getElementById("form-error-message-login").style.display = 'none';
}

function handleSignup(e) {
  e.preventDefault();
  const requiredFields = ["name", "email", "number", "dob", "password", "confirmPassword"];
  const allFilled = highlightEmptyFields(requiredFields);
  const errorMessage = document.getElementById("form-error-message");

  if (!allFilled) {
    errorMessage.textContent = "Please fill out all the required fields.";
    errorMessage.style.display = 'block';
    return false;
  }

  requiredFields.forEach(field => {
    document.getElementById(field).classList.remove("highlight");
  });

  if (!validateName()) {
    errorMessage.textContent = "Please correct the errors in the form.";
    document.getElementById('name-error').style.display = 'block';
    return false;
  }

  if (!validateEmail()) {
    errorMessage.textContent = "Please correct the errors in the form.";
    document.getElementById('email-error').style.display = 'block';
    return false;
  }

  if (!validateNumber()) {
    errorMessage.textContent = "Please correct the errors in the form.";
    document.getElementById('number-error').style.display = 'block';
    return false;
  }

  if (!validateDob()) {
    errorMessage.textContent = "Please correct the errors in the form.";
    document.getElementById('dob-error').style.display = 'block';
    return false;
  }

  if (!validatePassword()) {
    errorMessage.textContent = "Please correct the errors in the form.";
    document.getElementById('password-error').style.display = 'block';
    return false;
  }

  if (!validateConfirmPassword()) {
    errorMessage.textContent = "Please correct the errors in the form.";
    document.getElementById('confirmPassword-error').style.display = 'block';
    return false;
  }

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
  alert("Registration successful! Please login.");
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

  const user = JSON.parse(localStorage.getItem("userData"));

  if (!user) {
    errorMessage.textContent = "Account not found. Please sign up first.";
    errorMessage.style.display = 'block';
    return false;
  }

  let isValid = false;
  if (loginField.includes('@')) {
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(loginField)) {
      document.getElementById('loginField-error').textContent = "Please enter a valid email";
      document.getElementById('loginField-error').style.display = 'block';
      return false;
    }
    isValid = user.email === loginField && user.password === password;
  } else {
    const phoneDigits = loginField.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
      document.getElementById('loginField-error').textContent = "Phone number must be 10 digits";
      document.getElementById('loginField-error').style.display = 'block';
      return false;
    }
    const fullPhone = user.number.split(' ')[0] + ' ' + phoneDigits;
    isValid = user.number === fullPhone && user.password === password;
  }

  if (!isValid) {
    errorMessage.textContent = "Invalid credentials. Please try again.";
    errorMessage.style.display = 'block';
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
  alert("Login successful! Welcome back.");
}

function logout() {
  showPage("loginPage");
  alert("Logged out successfully!");
}

window.onload = () => {
  showPage("signupPage");
  fetchCountryCodes();
};