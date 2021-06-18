
let prev = null // Setup placeholders for our next and prev links.
let next = null

let current = document.getElementById('currentBtn');
let nextButton = document.getElementById('nextBtn');
let prevButton = document.getElementById('prevBtn');
let firstButton = document.getElementById('firstBtn');
let lastButton = document.getElementById('lastBtn');

let page = 1;

function setCurrent() {
    if(page <= 1) {
        prevButton.setAttribute('disabled', true);
        firstButton.setAttribute('disabled', true);
    }
    else if(page !== 1) {
        prevButton.removeAttribute('disabled');
        firstButton.removeAttribute('disabled');
    }

    if(page >= 1117) {
        nextButton.setAttribute('disabled', true);
        lastButton.setAttribute('disabled', true);
    }
    else if(page !== 1117) {
        nextButton.removeAttribute('disabled');
        lastButton.removeAttribute('disabled');
    }
    
    current.innerHTML = page;
}

const pokeList = document.getElementById('pokeList') // Grab the appropriate html element

const getData = async (url = '') => {
    const response = await fetch(url, {
        // Await the response.
        method: 'GET'
    })
    return response.json() // Wrap in a promise using JSON formatting.
}

const populateList = url => {
    const data = getData(url) // Make the request.
    clearList()

    // .then is used to access the response's promise
    data.then(json => {
        for (const i in json.results) {
            pokeList.innerHTML += `<li>${json.results[i].name}</li>`
            next = json.next
            prev = json.previous
        }
        setCurrent()
    })
}

const clearList = () => {
    pokeList.innerHTML = '' // Clear list to prevent more than ten items listed.
}

const populateNext = () => {
    if (next !== null) {
        populateList(next)
        page ++;
    } else {
        return
    }
}

const populatePrev = () => {
    if (prev !== null) {
        populateList(prev)
        page --;
    } else {
        return
    }
}

const populateFirst = () => {
    page = 1;
    populateList('https://pokeapi.co/api/v2/pokemon?offset=0&limit=10')
}


const populateLast = () => {
    page = 1117;
    populateList('https://pokeapi.co/api/v2/pokemon?offset=1117&limit=10')
}

populateList('https://pokeapi.co/api/v2/pokemon?offset=0&limit=10')

document.getElementById('nextBtn').addEventListener('click', populateNext)
document.getElementById('prevBtn').addEventListener('click', populatePrev)
document.getElementById('firstBtn').addEventListener('click', populateFirst)
document.getElementById('lastBtn').addEventListener('click', populateLast)