// constants
const DEFAULT_IMAGE = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22318%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20318%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_158bd1d28ef%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A16pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_158bd1d28ef%22%3E%3Crect%20width%3D%22318%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22129.359375%22%20y%3D%2297.35%22%3EImage%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'

window.onload = () => {
    renderActiveWishes()
}

function createActiveWishCard(wish) {
    // TODO: abstract all this repeated code or just put this whole function somewhere else
    let card = document.createElement('div')
    card.setAttribute('class', 'card mb-3')
    card.setAttribute('id', `${wish.id}`)

    let header = card.appendChild(document.createElement('h3'))
    header.setAttribute('class', 'card-header')
    let image = card.appendChild(document.createElement('img'))
    image.setAttribute('style', 'height: 200px; width: 100%; display: block;')
    image.setAttribute('src', DEFAULT_IMAGE) 

    let body1 = card.appendChild(document.createElement('div'))
    body1.setAttribute('class', 'card-body')
    body1.appendChild(document.createElement('h5'))
    body1.appendChild(document.createElement('h6'))

    let body2 = card.appendChild(document.createElement('div'))
    body2.setAttribute('class', 'card-body')

    let para2 = body2.appendChild(document.createElement('p'))
    para2.setAttribute('class', 'card-text')

    let progress = body2.appendChild(document.createElement('div'))
    progress.setAttribute('class', 'progress')

    let progress_bar = progress.appendChild(document.createElement('div'))
    progress_bar.setAttribute('class', 'progress-bar')
    progress_bar.setAttribute('role', 'progressbar')

    let progress_text = progress.appendChild(document.createElement('p'))
    progress_text.setAttribute('class', 'card-text')

    let button = card.appendChild(document.createElement('button'))
    button.setAttribute('class', 'btn btn-primary')
    button.innerHTML = 'Donate'
    button.addEventListener('click', function() {createDonation(wish)})

    // let footer = card.appendChild(document.createElement('div'))
    // footer.setAttribute('class', 'card-footer text-muted')
    // let link = footer.appendChild(document.createElement('a'))
    // link.setAttribute('class', 'card-link')

    return card
}

function renderActiveWishes() {
    fetch('http://localhost:3000/wishes/active')
    .then(resp => resp.json())
    .then(wishes => {
      
        wishes.forEach(wish => {
            addWishToCard(wish)
        })
    })
}

// function to create donation
// Parameters: {"donation"=>{"wish_id"=>421, donor_attributes: [:id, :first_name, :last_name, :email]}}
function createDonation(wish, donation_amount = 5) {
    // send POST request to server to create donation
    fetch('http://localhost:3000/donations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            donation: {
                wish_id: wish.id,
                amount: 5.00,
                donor_attributes: {id: 1, first_name: "John", last_name: "Doe", email: "test@test.com"} // set donor_id to 1 for concept test
            }
        })
    })
    .then(resp => resp.json())
    .then(donation => console.log(`Made donation for ${donation.amount}.`))
    
    // render display of progress bar
    wish.current_funding += donation_amount
    wish.updateWishProgress()
}

function updateWishes() {
    // first remove ALL wishes from DOM 
    let cards = document.querySelectorAll('div.card.mb-3')
    cards.forEach(card => {card.remove()})

    // then render DOM with updated wishes
    renderActiveWishes()

}
// TODO: add this function to wish class
function addWishToCard(w) {
    let wish = new Wish(w)
    let carousel = document.getElementById('card-carousel')
    carousel.appendChild(createActiveWishCard(wish))
    
    let card = document.getElementById(`${wish.id}`)
    card.querySelector('h3').innerHTML = wish.animal.name
    card.querySelector('h5').innerHTML = wish.animal.species
    card.querySelector('h6').innerHTML = "TODO: Insert Location Info"
    card.querySelector('div.card-body > p').innerHTML = `<b>Enrichment:</b> ${wish.toy.name}`

    wish.updateWishProgress()
}

class Wish {
    constructor(wish) {
        this.id = wish.id,
        this.animal = wish.animal,
        this.toy = wish.toy,
        this.current_funding = wish.current_funding,
        this.total_to_fund = wish.total_to_fund
    }

    progressPercent() {
        return Math.floor((this.current_funding / this.total_to_fund) * 100)
    }

    updateWishProgress() {
        // select progress bar in card of wish
        // find card by wishId
        let percent = this.progressPercent().toString() + "%"
        
        let card = document.getElementById(`${this.id}`)
        let progressBar = card.querySelector('.progress-bar')

        // update progress bar percent
        progressBar.style.width = percent
    }

    
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


