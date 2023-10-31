document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    if (username === 'admin' && password === 'admin') {
      // Correct login, redirect to the annotation page
      window.location.href = 'annotation_tool.html'; // Replace with the actual URL of your annotation page
    } else {
      // Incorrect login, show alert
      alert('Login information is invalid. Please try again.');
    }
  });
  