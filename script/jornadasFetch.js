async function getJornadas(page, size, sort) {
    const apiUrl = `https://api.strateegia.digital/projects/v1/project/summary?page=${page}&size=${size}&sort=${sort}`;
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

export { getJornadas }