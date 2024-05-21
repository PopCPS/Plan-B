import { getJornadas } from "./jornadasFetch.js";

const filtrarJornadas = document.querySelector('#filter')
const jornadasList = document.querySelector('.jornadasItens')

filtrarJornadas.addEventListener('click', ()=>{
    const size = document.querySelector('.size').value
    const sort = document.querySelector('#sort').value
    getJornadas(0, size, sort)
        .then(data => {
            data.content.forEach((e)=>{
                console.log(e)
                jornadasList.innerHTML += `
                    <div class="jornadaItem">
                        <h1 class="jornadaTitle">${e.title}</h1>
                        <h2 class="jornadaDesc">${e.description}</h2>
                        <p class="jornadaMembers">${e.member_count}</p>
                        <p class="jornadaID">${e.   id}</p>
                    </div>
                `
            })
        })
    })



