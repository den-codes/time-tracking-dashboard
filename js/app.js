let timeframe = 'weekly';
const container = document.querySelector('.grid-container');
let regularCards;

const menu = document.querySelectorAll('.menu-link');

menu.forEach(element => {
    element.addEventListener('click', menuOnClick);
});

function menuOnClick(event){
    menu.forEach(element => {
        element.classList.remove('menu-active');
    });
    event.target.classList.add('menu-active');
    timeframe = event.target.innerText.toLowerCase();

    updateCards(timeframe);
}

//Get JSON Data & Create Cards
let data = {};

fetch('./js/data.json')
    .then(resp => resp.json())
    .then(jsonData => {

        //Create Cards
        jsonData.forEach(element => {
            container.insertAdjacentHTML('beforeend', 
                createRegularCard(element, timeframe));
        });

        // Convert array to dict
        jsonData.forEach(element => {
            data[element.title] = element.timeframes;
        });

        //I want to have reference to created cards
        regularCards = document.querySelectorAll('#card');
    });

function updateCards(timeframe){
        regularCards.forEach(card => {
            updateCard(card, timeframe);
        });
}

function updateCard(card, timeframe) {
        const title = card.querySelector('.title').innerText;
        const current = data[title][timeframe]['current'];
        const previous = data[title][timeframe]['previous'];
    
        const timeframeMsg = {
            'daily': 'Yesterday',
            'weekly': 'Last Week',
            'monthly': 'Last Month'
        };
    
        const hoursElement = card.querySelector('.hours');
        hoursElement.innerText = `${current}hrs`;
        const msgElement = card.querySelector('.description');
        msgElement.innerText = `${timeframeMsg[timeframe]} - ${previous}hrs`;
}

function createRegularCard(element, timeframe) {
        let title = element['title'];
        let current = element['timeframes'][timeframe]['current'];
        let previous = element['timeframes'][timeframe]['previous'];
    
        const timeframeMsg = {
            'daily': 'Yesterday',
            'weekly': 'Last Week',
            'monthly': 'Last Month'
        };
    
        return `
        <section class="${title.toLowerCase().replace(/\s/g, '')}" id="card">
            <div class="sub-card">
                <h3 class="title">${title}</h3>
                <img src="/images/icon-ellipsis.svg">
                    <div class="text-2"  id="current">
                    <h1 class="hours">${current}hrs</h1>
                    <h3 class="description">${timeframeMsg[timeframe]} - ${previous}hrs</h3>
                    </div> 
            </div>
        </section>
    `
    
}