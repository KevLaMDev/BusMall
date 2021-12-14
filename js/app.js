'use strict';

const allProducts = [];
let counter = 25;
let container1 = document.querySelector('#image1>img');
let container2 = document.querySelector('#image2>img');
let container3 = document.querySelector('#image3>img');
let list = document.querySelector('#list>ul')
let button = document.querySelector('button');
let removedEventListeners = false;

function CreateProduct(source) {
  this.name = source.slice(4, source.length - 4);
  this.src = source;
  this.views = 0;
  this.selected = 0;
  allProducts.push(this);
};

new CreateProduct('img/bag.jpg');
new CreateProduct('img/banana.jpg');
new CreateProduct('img/bathroom.jpg');
new CreateProduct('img/boots.jpg');
new CreateProduct('img/breakfast.jpg');
new CreateProduct('img/bubblegum.jpg');
new CreateProduct('img/chair.jpg');
new CreateProduct('img/cthulhu.jpg');
new CreateProduct('img/dog-duck.jpg');
new CreateProduct('img/dragon.jpg');
new CreateProduct('img/pen.jpg');
new CreateProduct('img/scissors.jpg');
new CreateProduct('img/shark.jpg');
new CreateProduct('img/sweep.png');
new CreateProduct('img/tauntaun.jpg');
new CreateProduct('img/unicorn.jpg');
new CreateProduct('img/water-can.jpg');
new CreateProduct('img/wine-glass.jpg');
new CreateProduct('img/pet-sweep.jpg');

function generateRandomNum() {
  return Math.floor(Math.random() * allProducts.length); //The maximum is exclusive and the minimum is inclusive
}

function getRandomIndexes() {
  const indexes = [];
  while (indexes.length < 3) {
    let index = generateRandomNum();
    if (!indexes.includes(index)) {
      indexes.push(index);
    };
  }
  return indexes;
};


function removeEventListeners() {
  container1.removeEventListener('click', voteEventHandler);
  container2.removeEventListener('click', voteEventHandler);
  container3.removeEventListener('click', voteEventHandler);
}

function eventHandler2(event) {
  if (counter > 0) {
    let alert = document.querySelector('#button-spot>p');
    alert.textContent = 'You must finish voting before viewing the results.'
  } else {
    for (let i = 0; i < allProducts.length; i++) {
      let li = document.createElement('li');
      li.textContent = (`${allProducts[i].name} had ${allProducts[i].selected} vote(s) and was shown ${allProducts[i].views} time(s).`);
      list.appendChild(li);
    };
    button.removeEventListener('click', eventHandler2);
  }
}


function renderPage() {
  if (counter === 0) {
    if (removedEventListeners === false) {
      removeEventListeners();
      removedEventListeners = true;
    }
    let alert = document.querySelector('div>p:first-child');
    alert.textContent = 'Voting Complete! Check your results down below';
  } else {
    const indexes = getRandomIndexes();
    container1.src = allProducts[indexes[0]].src;
    container1.alt = allProducts[indexes[0]].name;
    allProducts[indexes[0]].views += 1;
    container2.src = allProducts[indexes[1]].src;
    container2.alt = allProducts[indexes[1]].name;
    allProducts[indexes[1]].views += 1;
    container3.src = allProducts[indexes[2]].src;
    container3.alt = allProducts[indexes[2]].name;
    allProducts[indexes[2]].views += 1;
  }
};

function voteEventHandler(event) {
  counter--;
  let productClicked = event.target.alt;
  for (let i = 0; i < allProducts.length; i++) {
    if (productClicked === allProducts[i].name) {
      allProducts[i].selected++;
      console.log(`${allProducts[i].name} selection incremented`)
    }
  }
  renderPage();
};

container1.addEventListener('click', voteEventHandler);
container2.addEventListener('click', voteEventHandler);
container3.addEventListener('click', voteEventHandler);
button.addEventListener('click', eventHandler2);

renderPage();




