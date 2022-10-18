const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the dashboard page
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};
  
const signupFormHandler = async (event) => {
  event.preventDefault();

  const user_name = document.getElementById('username-signup').value.trim();
  const password = document.getElementById('password-signup').value.trim();
  const confirm = document.getElementById('password-confirm').value.trim();

  if (user_name && password && password === confirm) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ user_name, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  } alert('password do not match');
};
  
document
  .getElementById('login-button')
  .addEventListener('click', loginFormHandler);

document
  .getElementById('signup-button')
  .addEventListener('click', signupFormHandler);    