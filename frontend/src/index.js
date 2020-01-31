// constants
const DEFAULT_IMAGE = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22318%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20318%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_158bd1d28ef%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A16pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_158bd1d28ef%22%3E%3Crect%20width%3D%22318%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22129.359375%22%20y%3D%2297.35%22%3EImage%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'

function createActiveWishCard(wish) {
    // TODO: abstract all this repeated code or just put this whole function somewhere else
    // I hate this function and should probably comment it more to know what each element is for

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
    body2.setAttribute('class', 'card-body toy-info')
    body2.appendChild(document.createElement('p'))
    
    let para2 = body2.appendChild(document.createElement('p'))
    para2.setAttribute('class', 'card-text')
    para2.style.textAlign = "right"

    let progress = body2.appendChild(document.createElement('div'))
    progress.setAttribute('class', 'progress')

    let progress_bar = progress.appendChild(document.createElement('div'))
    progress_bar.setAttribute('class', 'progress-bar')
    progress_bar.setAttribute('role', 'progressbar')

    let button = card.appendChild(document.createElement('button'))
    button.setAttribute('class', 'btn btn-primary')
    button.innerHTML = 'DONATE $5'
    button.addEventListener('click', function() {openDonateDialog(wish)})

    let footer = card.appendChild(document.createElement('div'))
    footer.setAttribute('class', 'card-footer text-muted')
    
    let reset_button = footer.appendChild(document.createElement('button'))
    reset_button.setAttribute('class', 'btn btn-link')
    reset_button.innerHTML = 'Reset'
    reset_button.addEventListener('click', function() {wish.reset_donations()})
    
    return card
}

function renderActiveWishes() {
    fetch('http://localhost:3000/wishes/active')
    .then(resp => resp.json())
    .then(wishes => {
      
        wishes.forEach(wish => {
            w = new Wish(wish),
            w.addWishToCard()
        })
    })
}

function updateWishes() {
    // first remove ALL wishes from DOM 
    let cards = document.querySelectorAll('div.card.mb-3')
    cards.forEach(card => {card.remove()})

    // then render DOM with updated wishes
    renderActiveWishes()

}

function resetAllWishes() {
    fetch('http://localhost:3000/wishes/reset_active_wishes')
    updateWishes()
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
        let progressText = card.querySelector('div.toy-info > p:nth-of-type(2)')
        // update progress bar percent
        progressBar.style.width = percent
        if (this.current_funding < this.toy.cost) {
            progressText.innerHTML = `$${(this.toy.cost - this.current_funding)} left!`
        } else {
            progressText.innerHTML = "Fully funded!"
        }
    }

    addWishToCard() {
        
        let carousel = document.getElementById('card-carousel')
        carousel.appendChild(createActiveWishCard(this))
        
        let card = document.getElementById(`${this.id}`)
        card.querySelector('h3').innerHTML = this.animal.name
        card.querySelector('h5').innerHTML = this.animal.species
        card.querySelector('h6').innerHTML = this.animal.location
        card.querySelector('div.toy-info > p:nth-of-type(1)').innerHTML = `<b>Enrichment:</b> ${this.toy.name}`

        this.updateWishProgress()
    }

    reset_donations() {
        // for display rendering
        this.current_funding = 0
        this.updateWishProgress()
        
        // make server request to reset donations
        fetch(`http://localhost:3000/wishes/${this.id}/reset_donations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                wish: {id: this.id}
            })
        })
        .then(resp => resp.json())
        .then(wish => console.log(`Reset donations for Wish ${wish.id}`))
    }
}

function openDonateDialog(wish) {
    console.log("Donate button clicked")
    let modal = new Modal(wish)
    modal.main.style.display = "block"
}
class Modal {
    constructor(wish) {
        // declare properties
        let self = this
        this.main = document.getElementById('donate-modal')
        this.title = this.main.querySelector('.modal-title')
        this.body = this.main.querySelector('.modal-body')
        
        // set properties dynamically to wish properties
        this.setTitle(wish)
        this.setBody(wish)

        // create event listeners for buttons
        this.donateButton = this.main.querySelector('.btn.btn-primary').addEventListener(
            'click', function() {self.createDonation(wish)})
        this.closeButton = this.main.querySelector('.btn.btn-secondary').addEventListener(
            'click', function() {self.close()})
        this.closeSpan = this.main.querySelector('.close').addEventListener(
            'click', function() {self.close()})

        // clicking anywhere other than the modal window will close the modal (do I want this?)
        window.onclick = function(event) {
            if (event.target == self.main) {
                self.main.style.display = "none";
            }
        }
    }

    setTitle(wish) {
        this.title.innerHTML = `Donate to ${wish.animal.name}`
    }

    setBody(wish) {
        this.body.innerHTML = `${wish.animal.name} is getting a ${wish.toy.name}. ` + wish.toy.description
    }

    createDonation(wish, donation_amount = 5) {
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
                    amount: donation_amount,
                    donor_attributes: {id: 1, first_name: "John", last_name: "Doe", email: "test@test.com"}
                }
            })
        })
        .then(resp => resp.json())
        .then(donation => console.log(`Made donation for $${donation.amount}.`))
        
        // render display of progress bar
        wish.current_funding += donation_amount
        wish.updateWishProgress()
    }
    

    close() {
        this.main.style.display = "none"
    }
}

const RESET = document.getElementById('reset-active-wishes')
RESET.addEventListener('click', function() {resetAllWishes()})

window.onload = () => {
    renderActiveWishes()
}
