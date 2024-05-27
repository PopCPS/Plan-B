async function getPontos(id) {
    const apiUrl = `https://api.strateegia.digital/projects/v1/map/${id}/divergence-point?page=0&size=999&sort=string`;
    const token = sessionStorage.getItem('access_token');
    return fetch(apiUrl, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        
        return response.json();
    })
    .catch(error => {
        console.error('Error:', error);
        throw error;
    });
}

export { getPontos }