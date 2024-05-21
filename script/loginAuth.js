const submit = document.querySelector('.submit')

submit.addEventListener('click', async function formValidation(e) {
    const username = document.querySelector('.emailInput').value
    const password = document.querySelector('.passwordInput').value
    e.preventDefault()
    
    const tokenRequest = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa(username + ':' + password)
        }
      };

      await fetch('https://api.strateegia.digital/users/v1/auth/signin', tokenRequest)
        .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch token');
        }
        return response.json();
        })
        .then(data => {
        console.log('Token:', data);
        sessionStorage.setItem('access_token', data.access_token)
        sessionStorage.setItem('refresh_token', data.refresh_token)
        })
        .catch(error => {
        console.error('Error:', error);
        });
})