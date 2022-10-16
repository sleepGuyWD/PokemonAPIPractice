//Example fetch using pokemonapi.co
document.querySelector('#getNumber').addEventListener('click', getFetch)
document.querySelector('#random').addEventListener('click', getFetch2)
document.querySelector('#housePetButton').addEventListener('click', getFetch3)

function getFetch(){
  const choice1 = document.querySelector('#spriteInput').value.toLowerCase()
  const url1 = 'https://pokeapi.co/api/v2/pokemon/'+choice1

  fetch(url1)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        //console.log(data)
        document.querySelector('#frontSprite').src = data.sprites.front_default
        document.querySelector('#backSprite').src = data.sprites.back_default
        document.querySelector('#frontSpriteShiny').src = data.sprites.front_shiny
        document.querySelector('#backSpriteShiny').src = data.sprites.back_shiny
        document.querySelector('#spriteName').innerText = data.name
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
    document.querySelector('#spriteName').innerText = data.name
})
.catch(err => {
    console.log(`error ${err}`)
});
}

function getFetch3() {
  const choice3 = document.querySelector('#housePetInput').value.toLowerCase()
  const url3 = 'https://pokeapi.co/api/v2/pokemon/'+choice3

  fetch(url3)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      const potentialPet = new Poke (data.name, data.height, data.weight, data.types, data.sprites.other['official-artwork'].front_default)

      potentialPet.getTypes()
      potentialPet.isItHousePet()

      let decision = ''

      if (potentialPet.housepet) {
        decision = 'This Pokemon is small enough, light enough, and safe enough to be a good pet'
      } else {
        decision = `This pokemon would not be a good pet because ${potentialPet.reason.join(' and ')}.`
      }
      document.querySelector('#housePetDesc').innerText = decision
      document.querySelector('#housePetImg').src = potentialPet.image
      document.querySelector('#pokeName').innerText = potentialPet.name
    })
    .catch(err => {
      console.log(`error ${err}`)
    })
}

class Poke {
  constructor(name, height, weight, types, image) {
    this.name = name
    this.height = height
    this.weight = weight 
    this.types = types
    this.image = image
    this.housepet = true
    this.reason = []
    this.typeList = []
  }
  getTypes() {
    for (const property of this.types) {
      this.typeList.push(property.type.name)
    }
    
  }

  weightToPounds(weight) {
    return Math.round((weight/4.536)*100)/100
  }

  heightToFeet(height) {
    return Math.round((height/3.048)*100)/100
  }

  isItHousePet () {
    let badTypes = ['fire', 'electric', 'fighting', 'poison', 'ghost'] //check height, weight, and types
    if (this.weightToPounds(this.weight) > 400) {
      this.reason.push(`It is too heavy at ${this.weightToPounds(this.weight)} pounds`)
      this.housepet = false
    }
    if (this.heightToFeet(this.height) > 7) {
      this.reason.push(`It is too tall at ${this.heightToFeet(this.height)} feet`)
      this.housepet = false
    }
    if (badTypes.some(r => this.typeList.indexOf(r) >= 0)) {
      this.reason.push("It's type is too dangerous")
      this.housepet = false
    }
  }
  
}