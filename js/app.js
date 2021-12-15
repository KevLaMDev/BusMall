'use strict';

const allProducts = [];
let counter = 25;
let container1 = document.querySelector('#image1>img');
let container2 = document.querySelector('#image2>img');
let container3 = document.querySelector('#image3>img');
let ctx = document.getElementById('chart').getContext('2d');
let button = document.querySelector('button');
let removedEventListeners = false;
let pastIndexes = []; 


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

const chartData = {
  type: 'bar',
  data: {
      labels: [],
      datasets: [{
          label: '# of Votes',
          data: [],
          backgroundColor: [
              'rgba(255, 99, 132)',
              'rgba(54, 162, 235)',
              'rgba(255, 206, 86)',
              'rgba(75, 192, 192)',
              'rgba(153, 102, 255)',
              'rgba(255, 159, 64)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
  },
  options: {
      scales: {
          y: {
              beginAtZero: true
          }
      }
  }
};

function generateRandomNum() {
  return Math.floor(Math.random() * allProducts.length); //The maximum is exclusive and the minimum is inclusive
}

function getRandomIndexes() {
  const indexes = [];
  while (indexes.length < 3) {
    let index = generateRandomNum();
    if (!indexes.includes(index) && !pastIndexes.includes(index)) {
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

function buttonEventHandler(event) {
  if (counter > 0) {
    let alert = document.querySelector('#button-spot>p');
    alert.textContent = 'You must finish voting before viewing the results.'
  } else {
    let productNames = [];
    let votes = [];
    for (let i = 0; i < allProducts.length; i++) {
      productNames.push(allProducts[i].name);
      votes.push(allProducts[i].selected);
    }
    chartData.data.labels = productNames;
    chartData.data.datasets[0].data = votes;
    console.log(`productNames = ${chartData.labels}, votes = ${chartData.data}`)
    new Chart(ctx, chartData);
    button.removeEventListener('click', buttonEventHandler);
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
    let indexes = getRandomIndexes();
    pastIndexes = indexes;
    let randomIndex0 = indexes[0];
    let randomIndex1 = indexes[1];
    let randomIndex2 = indexes[2];
    container1.src = allProducts[randomIndex0].src;
    container1.alt = allProducts[randomIndex0].name;
    allProducts[randomIndex0].views += 1;
    container2.src = allProducts[randomIndex1].src;
    container2.alt = allProducts[randomIndex1].name;
    allProducts[randomIndex1].views += 1;
    container3.src = allProducts[randomIndex2].src;
    container3.alt = allProducts[randomIndex2].name;
    allProducts[randomIndex2].views += 1;
  }
};

function voteEventHandler(event) {
  counter--;
  let productClicked = event.target.alt;
  for (let i = 0; i < allProducts.length; i++) {
    if (productClicked === allProducts[i].name) {
      allProducts[i].selected++;
    }
  }
  renderPage();
};

container1.addEventListener('click', voteEventHandler);
container2.addEventListener('click', voteEventHandler);
container3.addEventListener('click', voteEventHandler);
button.addEventListener('click', buttonEventHandler);

function persistObjs() {
  if (!allProducts[0]) {
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
  } else {
    let savedProducts = localStorage.getItem(products);
    let parsedSavedProdcuts = parse(savedProducts);
    for (let i = 0; i < parsedSavedProdcuts.length; i++) {
      allProducts.push(parsedSavedProdcuts[i]);
    }
  }
};
// func persistObjs: control flow for instantiating objs or retaining preexisting ones
// input: none
// output: if no obj instances exist in allProducts array, instantiate objs
// if (!allProducts[0]) instantiate objs
// else access local storage data
// let savedProducts = localStorage.getItem(products) <- this arg is a key to be named later when we are saving the data to begin with
// savedProductsParsed = parse(savedProducts);
// for loop to iterate thru savedProductsParsed
// push each obj instance into allProducts array

persistObjs();
renderPage();


renderPage();

 

