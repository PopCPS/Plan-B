async function getJornadas(page, size, sort, title, color, visibility, projectRoles) {
    let apiUrl = `https://api.strateegia.digital/projects/v1/project/summary?`;

    if (title != '') {
        apiUrl += `title=${title}&`;
    }
    if (color != '') {
        apiUrl += `color=${color}&`;
    }
    if (visibility != '') {
        apiUrl += `visibility=${visibility}&`;
    }
    if (projectRoles != '') {
        apiUrl += `projectRoles=${projectRoles}&`;
    }

    apiUrl += `page=${page}&size=${size}&sort=${sort}`;
    
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