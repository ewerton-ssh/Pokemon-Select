//função de preloader do app
function loading(){
    document.getElementsByClassName('box-load')[0].style.display ="none";          
}

//listagem pokemons
const buscarPokemon = () => {
    const linkAPI = id => `https://pokeapi.co/api/v2/pokemon/${id}`

    const requestPokemon = []

    for (let poke = 1; poke <= 151; poke++) {
        requestPokemon.push(fetch(linkAPI(poke)).then(retorno => retorno.json()))
    }

    Promise.all(requestPokemon)
    .then(pokemons => {
        const listaPokemons = pokemons.reduce((acumulador, pokemon) => {
        const tipo = pokemon.types.map(tipoInfo => tipoInfo.type.name)
            acumulador += 
            `<ul class="personagem">
                <h2 class="pokedex" id="numeroPersonagem" data-name="${pokemon.name}" tipo="${tipo.join(' | ')}" numero="${pokemon.id}">${pokemon.id}
                <img class="lista-de-personagens"  src="https://raw.githubusercontent.com/monikode/pokedex/master/assets/pokemon/${pokemon.id}.png" />
                <img id="gifs" src="https://projectpokemon.org/images/normal-sprite/${pokemon.name}.gif"
                </h2>   
             </ul>`
            return acumulador
        }, '')
        
        const ul = document.querySelector('[id="lista-de-personagens"]');

        ul.innerHTML = listaPokemons
        
        //interação de troca de animações, nome e tipo dos personagems
        const personagens = document.querySelectorAll('.pokedex')
        
        const imagemGrande = document.getElementById('personagem_grande');
        imagemGrande.src = `https://professorlotus.com/Sprites/Bulbasaur.gif`

        personagens.forEach((personagem) => {
            personagem.addEventListener('mouseover', () => {
        
                const dataNumero = personagem.getAttribute('data-name')

                const nomePoke= personagem.getAttribute('data-name');
                const h2Nome = document.getElementById('nomePoke');
                h2Nome.innerHTML = nomePoke

                const tipoPoke = document.getElementById('tipoPoke');
                const h3Tipo = personagem.getAttribute('tipo');
                tipoPoke.innerHTML =  h3Tipo
                
                imagemGrande.src = `https://professorlotus.com/Sprites/${dataNumero}.gif`
                

            })
        })
    })    
}

buscarPokemon()
