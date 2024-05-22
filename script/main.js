import { getJornadas } from "./jornadasFetch.js";
import { getMapas } from "./mapasFetch.js";
import { getPontos } from "./pontosFetch.js";
import { getResumo } from "./resumoFetch.js";

const filtrarJornadas = document.querySelector('#filter')
const jornadasList = document.querySelector('.jornadasItens')
const mapasList = document.querySelector('.mapaItens')
const pontosList = document.querySelector('.pontoItens')
const resumoArray = []

function loadJornadas(size, sort) {
    mapasList.innerHTML = ''
    pontosList.innerHTML = ''
    getJornadas(0, size, sort)
        .then(data => {
            data.content.forEach((e)=>{
                jornadasList.innerHTML += `
                    <div class="jornadaItem">
                        <div class="colorCode ${e.color.toLowerCase()}"></div>
                        <div class="jornadaData">
                            <h2 class="jornadaTitle">${e.title}</h2>
                            <div class="jornadaInfo">
                                <h2 class="jornadaDesc">${(e.description === null) ? '' : e.description.length > 110 ? e.description.substring(0, 110) + "..." : e.description}</h2>
                                <p class="jornadaMembers">Membros: ${e.member_count}</p>
                            </div>
                            <p class="jornadaID">${e.id}</p>
                        </div>
                    </div>
                `
            })
        })
}

function loadMapas(id) {
    mapasList.innerHTML = ''
    pontosList.innerHTML = ''
    getMapas(id)
        .then(data => {
            data.maps.forEach((e)=>{
                mapasList.innerHTML += `
                <div class="mapaItem">
                    <h2 class="mapaTitle">${e.title.length > 11 ? e.title.substring(0, 11) + "..." : e.title}</h2>
                    <p class="mapaID">${e.id}</p>
                 </div>
                `
            })
        })
}

function loadPontos(id) {
    pontosList.innerHTML = ''
    getPontos(id)
        .then(data =>{ 
            data.content.forEach((e)=>{
                console.log(e)
                pontosList.innerHTML += `
                    <div class="pontoItem">
                        <div class="colorCode ${e.tool.color.toLowerCase()}"></div>
                        <div class="jornadaData">
                            <h1 class="jornadaTitle">${e.tool.title}</h1>
                            <div class="jornadaInfo">
                                <h2 class="jornadaDesc">${(e.tool.description === null) ? '' : e.tool.description.length > 110 ? e.tool.description.substring(0, 110) + "..." : e.tool.description}</h2>
                                <p class="jornadaMembers">Questões: ${e.tool.questions.length}</p>
                            </div>
                            <p class="pontoID">${e.id}</p>
                        </div>
                    </div>
                `
            })
        })
}

loadJornadas(0, 'ASC')

filtrarJornadas.addEventListener('click', ()=>{
    jornadasList.innerHTML = ''
    const size = document.querySelector('#size').value
    const sort = document.querySelector('#sort').value
    loadJornadas(size, sort)
})

document.addEventListener('click', (e)=>{
    const jornada = e.target.closest('.jornadaItem')
    const mapa = e.target.closest('.mapaItem')
    const ponto = e.target.closest('.pontoItem')

    if(jornada){
        const mapID = jornada.querySelector('.jornadaID').innerText
        loadMapas(mapID)
    }
    if(mapa){
        const pointID = mapa.querySelector('.mapaID').innerText
        loadPontos(pointID)
    }
    if(ponto){
        getPontos(ponto.id)
            .then((data)=>{
                const idDoPonto = ponto.querySelector('.pontoID').innerText
                data.content.forEach((pontoSelecionado)=>{
                    if(idDoPonto == pontoSelecionado.id){
                        pontoSelecionado.tool.questions.forEach((questaoSelecionada)=>{
                            getResumo(pontoSelecionado.id, questaoSelecionada.id)
                                .then((data)=>{
                                    console.log('ok')
                                })
                        })
                    }
                })
            }
        )
    }
})

