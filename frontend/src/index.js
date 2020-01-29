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
    // create animal from wish property
    let animal = new Animal(wish.animal)
    
    // create toy from wish property
    let toy = new Toy(wish.toy)

    // add all properties to card
    debugger
}


// wishes and animals as objects
class Toy {
    constructor(toy) {
        toy.id,
        toy.name,
        toy.description,
        toy.cost
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


