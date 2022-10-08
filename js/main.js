//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch)
document.querySelector('#random').addEventListener('click', getFetch2)

function getFetch(){
  const choice1 = document.querySelector('input').value
  
  const choice2 = Math.floor(Math.random() * 899)
  
  const url1 = 'https://pokeapi.co/api/v2/pokemon/'+choice1
  const url2 = 'https://pokeapi.co/api/v2/pokemon/'+choice2

  fetch(url1)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        //console.log(data)
        document.querySelector('#frontSprite').src = data.sprites.front_default
        document.querySelector('#backSprite').src = data.sprites.back_default
        document.querySelector('#frontSpriteShiny').src = data.sprites.front_shiny
        document.querySelector('#backSpriteShiny').src = data.sprites.back_shiny
        document.querySelector('h2').innerText = data.name
      })
      .catch(err => {
          console.log(`error ${err}`)
      });



  }

function getFetch2(){

    const choice2 = Math.floor(Math.random() * 899)
    
    const url2 = 'https://pokeapi.co/api/v2/pokemon/'+choice2
  fetch(url2)
  .then(res => res.json()) // parse response as JSON
  .then(data => {
    //console.log(data)
    document.querySelector('#frontSprite').src = data.sprites.front_default
    document.querySelector('#backSprite').src = data.sprites.back_default
    document.querySelector('#frontSpriteShiny').src = data.sprites.front_shiny
    document.querySelector('#backSpriteShiny').src = data.sprites.back_shiny
    document.querySelector('h2').innerText = data.name
})
.catch(err => {
    console.log(`error ${err}`)
});
}