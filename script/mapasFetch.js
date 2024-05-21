function getMapas(id) {
    const apiUrl = `https://api.strateegia.digital/projects/v1/project/${id}`;
    const token = sessionStorage.getItem('access_token');
    fetch(apiUrl, {
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
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

export { getMapas }