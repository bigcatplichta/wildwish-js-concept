// to do when DOM loads
window.onload = () => {
    // fetchActiveWishes()
}

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
    // create animal and toy objects
    let animal = new Animal(wish.animal)
    let toy = new Toy(wish.toy)
    
    // create card element
    function wishCard() {
        let card = document.createElement('div').setAttribute('class', 'card mb-3')
        this.header = card.appendChild(document.createElement('h3').setAttribute('class', 'card-header'))
        this.body1 = card.appendChild(document.createElement('div').setAttribute('class', 'card-body'))
        this.title = body1.appendChild(document.createElement('h5'))
        this.subtitle = body1.appendChild(document.createElement('h6'))
        this.body2 = card.appendChild(document.createElement('div').setAttribute('class', 'card-body'))
        this.para1 = body2.appendChild(document.createElement('p'))
        this.para2 = body2.appendChild(document.createElement('p').setAttribute('class', 'card-text'))
        this.progress = body2.appendChild(document.createElement('div').setAttribute('class', 'progress'))
        this.progress_bar = progress.appendChild(document.createElement('div').setAttribute('class', 'progress-bar'))
        this.progress_text = progress.appendChild(document.createElement('p').setAttribute('class', 'card-text'))
        this.button = card.appendChild(document.createElement('button').setAttribute('class', 'btn btn-primary'))
        this.footer = card.appendChild(document.createElement('div').setAttribute('class', 'card-footer text-muted'))
        this.link = footer.appendChild(document.createElement('a').setAttribute('class', 'card-link'))
    }
    // add all properties to card
    
}


// wishes and animals as objects

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
    fetch('http://localhost:3000/wishes/active')
    .then(resp => resp.json())
    .then(wishes => {
        wishes.forEach(wish => {
            addWishToCard(wish)
        })
    })
}


