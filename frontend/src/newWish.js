// set variables for elements
const animalSelect = document.getElementById('animalSelect')
const toySelect = document.getElementById('toySelect')

// Add event listeners to new wish buttons
const createWishButton = document.getElementById('create-wish')
createWishButton.addEventListener('click', () => createNewWish())
// To open modal window
const newWishButton = document.getElementById('new-wish-button')
newWishButton.addEventListener('click', () => openNewWishDialog())
// To close modal window
const closeWishButton = document.getElementById('close-wish')
closeWishButton.addEventListener('click', () => closeNewWishDialog())


function addOptionsToSelect() {
    // grab list of animals and toys to add to select options
    fetch('http://localhost:3000/animals')
    .then(resp => resp.json())
    .then(data => {
        data.forEach(animal => {
            // append each as option to select element
            let option = document.createElement('option')
            option.value = animal.id
            option.text = animal.name
            animalSelect.add(option)
        })
    })

    fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(data => {
        data.forEach(toy => {
            // append each as option to select element
            let option = document.createElement('option')
            option.value = toy.id
            option.text = toy.name
            toySelect.add(option)
        })
    })
}

// callback function for listener on 'Add New Wish' button. Opens modal window
function openNewWishDialog() {
    console.log("New wish button clicked")
    
    let modal = document.getElementById('new-wish-modal')
    modal.style.display = "block"
}

function closeNewWishDialog() {
    let modal = document.getElementById('new-wish-modal')
    modal.style.display = "none"
}

const createNewWish = () => {
    // declare vars for input values (selection)
    // pass vars into post request
    let animalId = animalSelect.options[animalSelect.selectedIndex].value
    let toyId = toySelect.options[toySelect.selectedIndex].value

    // send post request to wishes controller
    fetch('http://localhost:3000/wishes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            wish: {
            animal_id: animalId,
            toy_id: toyId
            }
        })
    })
    .then(resp => {
        if (!resp.ok) {
        throw new Error('Something happened and the wish could not be created');
        }
        return resp.json()
    })
    .then(wish => {
        w = new Wish(wish)
        w.addWishToCard()
    })
    .catch((error) => {console.log(error)})
    closeNewWishDialog()
}
