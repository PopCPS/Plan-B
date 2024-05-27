async function getResumo(divergenceID, questionID) {
    const apiUrl = `https://api.strateegia.digital/projects/v1/divergence-point/${divergenceID}/question/${questionID}/gptsummary`;
    const token = sessionStorage.getItem('access_token');
    
    const requestBody = JSON.stringify({
        "language": "PT_BR"
    });

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: requestBody
        });

        if (!response.ok) {
            if (response.status === 404) {
                console.log('Questões do ponto selecionado não possuem respostas.');
            }
            if(response.status === 403) {
                console.log('Você não tem permissão para gerar resumo deste ponto.')
            }
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export { getResumo };