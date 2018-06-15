const cardObject = {
    iconSetOne: [
        "<i class='fab fa-amazon' style='font-size: 3em;'></i>",
        "<i class='fab fa-android' style='font-size: 3em;'></i>",
        "<i class='fab fa-google-drive' style='font-size: 3em;'></i>",
        "<i class='fab fa-facebook' style='font-size: 3em;'></i>",
        "<i class='fab fa-firefox' style='font-size: 3em;'></i>",
        "<i class='fab fa-windows' style='font-size: 3em;'></i>",
        "<i class='fab fa-linux' style='font-size: 3em;'></i>",
        "<i class='fab fa-youtube' style='font-size: 3em;'></i>"   
    ],
    iconSetTwo: [
        "<i class='fab fa-python' style='font-size: 3em;'></i>",
        "<i class='fab fa-js' style='font-size: 3em;'></i>",
        "<i class='fab fa-java' style='font-size: 3em;'></i>",
        "<i class='fab fa-html5' style='font-size: 3em;'></i>",
        "<i class='fab fa-vuejs' style='font-size: 3em;'></i>",
        "<i class='fab fa-react' style='font-size: 3em;'></i>",
        "<i class='fab fa-angular' style='font-size: 3em;'></i>",
        "<i class='fab fa-php' style='font-size: 3em;'></i>"
    ]
}
// generate a unique id for each card div
let idCount = 0;
function genarateId() {
    idCount++;
    return 'card' + idCount.toString();
}

// generate card div with inner element
function createCards() {
    let iconList = [];
    const randomNum = Math.random();
    if (randomNum < .50) {
        iconList = cardObject.iconSetOne;
    } else {
        iconList = cardObject.iconSetTwo;
    }
    for(let i = 0; i < iconList.length; i++) {
        setTimeout(() =>{
            addHTML(iconList[i]);
        },10);
        setTimeout(() =>{
            addHTML(iconList[i]);
        },35)
        
    }
}

function addHTML(tag) {
    const container = document.getElementById('container');
    container.insertAdjacentHTML('beforeend', `<div class="card" id="${genarateId()}"><div class="card__face_down">${tag}</div></div>`);

}
// call createCards function on startup
createCards();

// click event to flip card up or down
function cardClick(event) {
    console.log(event.target.classList.value);
    if (event.target.classList.value === 'card__face_down') {
        // const cardSelected = event.target;
        // console.log(cardSelected.firstElementChild.className.baseVal);
        // console.log(cardSelected.parentElement.id);
        flipCardUp(event.target);
    } else if (event.target.classList.value === 'card__face_up') {
        flipCardDown(event.target);
    }
}

// count that amount of match cards
let cardMatchCount = 0;
function matchCounter() {
    cardMatchCount++;
    if (cardMatchCount === 8) {
        // todo: when all cards are matched need to either hide card game
        // or something, so i can display an congrat message
        console.log(cardMatchCount);
    }
}
// check is both cards selected are a match
let compareList = [];
function isCardMatch(node) {
    compareList.append(node);
    if (compareList.length === 2) {
        if (compareList[0] === compareList[1]) {
            
            matchCounter();
        }
    }
    // todo : when cards are a match need to add the "match" class.
    // this will provide user from being about to click card again
}

function flipCardDown(node) {
    node.className = 'card__face_down';
    node.firstElementChild.style.visibility = 'hidden';
}

function flipCardUp(node) {
    node.className = 'card__face_up';
    node.firstElementChild.style.visibility = 'visible';
}

function deactivateCard(cardId1, cardId2) {
    const card1 = document.getElementById(cardId1);
    const card2 = document.getElementById(cardId2);

    card1.className += ' match';
    card2.className += ' match';
}

const containerDiv = document.getElementById('container');

containerDiv.addEventListener('click', cardClick);
