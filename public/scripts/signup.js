const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const user_name = document.getElementById('username-signup').value.trim();
    const password = document.getElementById('password-signup').value.trim();
  
    if (user_name && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ user_name, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        console.log('success');
        document.location.replace('/dashboard');
      } else {
        alert("Password must be at least 8 characters long");
      }
    }
  };

document
  .getElementById('signup-button')
  .addEventListener('click', signupFormHandler);  