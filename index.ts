// Import stylesheets
import './style.css';
import { Colours, ColoursHelper } from './models/colours.enum';
import { BodyParts, BodyPartsHelper } from './models/bodyParts.enum';
import { SpinRecord } from './models/spin';

// used to make the spinner spin
let spinnerCounter = 0;



// container for the spinner 
let spinnerCycle;

// used to keep track of how many spins have been requested
let spinCount = 0;

// used to keep track of the results of the spin
let selectedColour: string;
let selectedBodyPart: string;

// use to store the results of spins
let spinHistoryArray: Array<SpinRecord> = [];



const colourDiv = document.getElementById('colourResult');

// sets up an array of strings to represent the colours from the enum
let coloursArray: Array<string> = [];
for (let colour in Colours) {
  if (isNaN(Number(colour))) {
    coloursArray.push(colour);
  }
}

const bodyPartP = document.getElementById('bodyPartText');

//  see above and create an array of strings to store the bodypart strings from the enum
let bodyPartsArray: Array<string> = [];
for (let part in BodyParts) {
  if (isNaN(Number(part))) {
    bodyPartsArray.push(part);
  }
}

// TODO add eventlistners to buttons
const spinBtn = <HTMLButtonElement> document.getElementById('spin-btn');
spinBtn.addEventListener('click', () => spinBtnHandler(2000, 100)); 
const colourHistorySelect = <HTMLSelectElement> document.getElementById('colourSelect')
const bodyHistorySelect = <HTMLSelectElement> document.getElementById('bodyPartSelect')
colourHistorySelect.addEventListener('change', ()=> statsBtnHandler(colourHistorySelect.value, bodyHistorySelect.value))
bodyHistorySelect.addEventListener('change', ()=> statsBtnHandler(colourHistorySelect.value, bodyHistorySelect.value))
const statBtn = <HTMLButtonElement> document.getElementById('statsBtn');
statBtn.addEventListener('click',()=> statsBtnHandler(colourHistorySelect.value, bodyHistorySelect.value))

// TODO handles the spin button click
// time in ms, interval in ms
function spinBtnHandler(time: number, interval: number) {
  
  // start spinner rotating through colours
  spinnerCycle = setInterval(() => spinSpinners(), interval);

  // TODO randomly select colour from array
  let colourIndex: number =Math.floor(Math.random() * 3);
  selectedColour = coloursArray[colourIndex];

  //  randomly select bodyPart from array
  let bodyPartIndex: number  = Math.floor(Math.random() * 3);
  selectedBodyPart = bodyPartsArray[bodyPartIndex];


  spinBtn.disabled = true;
  spinCount++
  // set timer to stop the spinners rotating
  setTimeout(() => stopSpinners(), time);
}

// rotates between the colours in Colours.enum.  
function spinSpinners() {
  spinnerCounter++;

  colourDiv.style.backgroundColor = coloursArray[spinnerCounter%coloursArray.length];

  bodyPartP.innerHTML = bodyPartsArray[spinnerCounter%bodyPartsArray.length];
}

// stops spinner after time parameter, time in ms
function stopSpinners() {
  clearInterval(spinnerCycle)
  colourDiv.style.backgroundColor = selectedColour;

  bodyPartP.innerHTML = selectedBodyPart;

  spinBtn.disabled = false;
  addToHistory();
}
const historyTable = document.getElementById('historyTableBody');
let spinHistoryTable = Array<string>(5)
// add the newly spun result to the history table
function addToHistory() {
  spinHistoryTable.push(`<thead> <tr> <th>${spinCount}</th> <th>${selectedColour}</th> <th>${selectedBodyPart}</th></tr></thead>`)
  if(spinHistoryTable.length >5 ){
    spinHistoryTable.shift()
  }
  historyTable.innerHTML=''
  for(let spin in spinHistoryTable){
    historyTable.innerHTML+=spinHistoryTable[spin]
  }
  var spin = new SpinRecord(spinCount,ColoursHelper.get(selectedColour), BodyPartsHelper.get(selectedBodyPart))
  spinHistoryArray.push(spin)
}

function statsBtnHandler(colour, bodyPart) {
  const statsTable= document.getElementById('statsResults')
  statsTable.innerHTML = `<div>${bodyPart}${colour} Rolled: ${getAmount(colour,bodyPart)} times, Last roll ${getLastSpun(colour,bodyPart)}`
  // set the statsResults div innerHTML to the amount and last spun number that the user has chosen
  // eg. Red LeftHand spun 10 times
  //     Red LeftHand last spun at num 23
}

// returns the amount of times the combination of selected of colour and body part have been spun
function getAmount(colour, BodyPart): number {
  let count = 0
  for(let s in spinHistoryArray){
    console.log(spinHistoryArray[s].colour)
    if(spinHistoryArray[s].colour == ColoursHelper.get(colour) && spinHistoryArray[s].bodyPart == BodyPartsHelper.get(BodyPart)){
        count++

    }
  }
  return count;
}

// return the last num which the combination of selected of colour and body part have been spun
function getLastSpun(colour, BodyPart): number {
let count = 0
for(let s in spinHistoryArray){
  if(spinHistoryArray[s].colour == ColoursHelper.get(colour) && spinHistoryArray[s].bodyPart == BodyPartsHelper.get(BodyPart)){
  count= spinHistoryArray[s].num
  }
}
if(count == 0){
  return "never";
}
  return count;
}