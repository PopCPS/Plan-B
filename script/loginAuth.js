const submit = document.querySelector('.submit')
const errorMessage = document.querySelector('#errorMessage')

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
            errorMessage.classList.remove('hidden')
            throw new Error('Failed to fetch token');
        }
        console.log(response)
        return response.json();
        })
        .then(data => {
        console.log('Token:', data);
          window.sessionStorage.setItem('access_token', data.access_token)
          window.sessionStorage.setItem('refresh_token', data.refresh_token)
          window.location.href = '../main.html'
        })
        .catch(error => {
        console.error('Error:', error);
        })
})