function getResumo(divergenceID, questionID) {
    const apiUrl = `https://api.strateegia.digital/projects/v1/divergence-point/${divergenceID}/question/${questionID}/gptsummary?page=0&size=1`;
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

export { getResumo }