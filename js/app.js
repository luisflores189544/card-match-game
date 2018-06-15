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
    if (compareList.length < 2) {
        if (event.target.classList.value === 'card__face_down') {
            flipCardUp(event.target);
            isCardMatch(event.target);
            deactivateCard(event.target);
        } else if (event.target.classList.value === 'card__face_up') {
            flipCardDown(event.target);
            isCardMatch(event.target);
        }
    }
}

// count that amount of match cards
let cardMatchCount = 0;
function matchCounter() {
    cardMatchCount++;
    if (cardMatchCount === 8) {
        const finish = document.getElementById('completed');
        const game = document.getElementById('container');
        game.classList.add('hide');
        finish.classList.remove('hide');
    }
    updateMatchCount();
}
// check is both cards selected are a match
let compareList = [];
let delayTime = 0;
function isCardMatch(node) {
    compareList.push(node);
    if (compareList.length === 2) {
        const card1ImgClassName = compareList[0].firstElementChild.className.baseVal;
        const card2ImgClassName = compareList[1].firstElementChild.className.baseVal;
        
        if (card1ImgClassName === card2ImgClassName) {
            matchCounter();
            setTimeout(() => {
                validMatch(compareList[0]);
                validMatch(compareList[1]);
            }, 300);
            delayTime = 301;
            
        } else {
            setTimeout(() => {
                invalidMatch(compareList[0]);
                invalidMatch(compareList[1]);
            }, 300);
            
            setTimeout(() => {
                flipCardDown(compareList[0]);
                flipCardDown(compareList[1]);
                activateCard(compareList[0]);
                activateCard(compareList[1]);
            }, 1000);
            delayTime = 1001;
            
        }
        setTimeout(() => {
            compareList = [];
        },delayTime);
    }
}

function invalidMatch(node) {
    node.className += ' card__invalid_match';
}

function validMatch(node) {
    node.className += ' card__valid_match';
}

function flipCardDown(node) {
    node.className = 'card__face_down';
    node.firstElementChild.style.visibility = 'hidden';
}

function flipCardUp(node) {
    node.className = 'card__face_up';
    node.firstElementChild.style.visibility = 'visible';
}

function deactivateCard(node) {
    node.parentElement.classList.add('deactiveCard');
}

function activateCard(node) {
    node.parentElement.classList.remove('deactiveCard');
}

function updateMatchCount() {
    document.getElementById('counter').innerText = cardMatchCount;

}

const containerDiv = document.getElementById('container');

containerDiv.addEventListener('click', cardClick);


// refresh game
const btnReplay = document.getElementById('replay');

btnReplay.addEventListener('click', () => {
    location.reload();
})