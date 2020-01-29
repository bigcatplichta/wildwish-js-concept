// to do when DOM loads


/* wish example object
{
    "id": 421,
    "animal_id": 84,
    "toy_id": 1,
    "status": "active",
    "image_url": null,
    "zoo_id": null,
    "animal": {
        "id": 84,
        "name": "Tinkles",
        "species": "Baboon",
        "bio": null,
        "keeper_id": 15,
        "created_at": "2020-01-28T19:38:39.344Z",
        "updated_at": "2020-01-28T19:38:39.344Z"
    }
}*/



function addWishToCard(wish) {
    // create some objects to work with
    let animal = new Animal(wish.animal)
    let toy = new Toy(wish.toy)
    
    let carousel = document.getElementById('card-carousel')
    carousel.appendChild(renderWishCard())
    debugger
    // add all properties to card
    
}


// objects to use
function renderWishCard() {
        // TODO: abstract all this repeated code
        let card = document.createElement('div')
        card.setAttribute('class', 'card mb-3')
        
        let header = card.appendChild(document.createElement('h3'))
        header.setAttribute('class', 'card-header')
        let image = card.appendChild(document.createElement('img'))
        image.setAttribute('style', 'height: 200px; width: 100%; display: block;')
       
        let body1 = card.appendChild(document.createElement('div'))
        body1.setAttribute('class', 'card-body')
        body1.appendChild(document.createElement('h5'))
        body1.appendChild(document.createElement('h6'))

        let body2 = card.appendChild(document.createElement('div'))
        body2.setAttribute('class', 'card-body')
        body2.appendChild(document.createElement('p'))

        let para2 = body2.appendChild(document.createElement('p'))
        para2.setAttribute('class', 'card-text')

        let progress = body2.appendChild(document.createElement('div'))
        progress.setAttribute('class', 'progress')

        let progress_bar = progress.appendChild(document.createElement('div'))
        progress_bar.setAttribute('class', 'progress-bar')

        let progress_text = progress.appendChild(document.createElement('p'))
        progress_text.setAttribute('class', 'card-text')

        let button = card.appendChild(document.createElement('button'))
        button.setAttribute('class', 'btn btn-primary')
        button.innerHTML = 'Donate'

        let footer = card.appendChild(document.createElement('div'))
        footer.setAttribute('class', 'card-footer text-muted')

        let link = footer.appendChild(document.createElement('a'))
        link.setAttribute('class', 'card-link')

        return card
}
class Toy {
    constructor(toy) {
        this.id = toy.id,
        this.name = toy.name,
        this.description = toy.description,
        this.cost = toy.cost
    }
}

class Animal {
    constructor(animal) {
        this.id = animal.id
        this.name = animal.name,
        this.species = animal.species
    }
}

// create cards and add object properties

// add cards to carousel

// add event listeners for clicking on Donate buttons

// functions for donating to wish

// fetch functions
function fetchActiveWishes() {
    return fetch('http://localhost:3000/wishes/active')
    .then(resp => resp.json())
    .then(wishes => {
      
        wishes.forEach(wish => {
            addWishToCard(wish)
        })
    })
}

document.addEventListener('DOMContentLoaded', function() {
    fetchActiveWishes()
})
