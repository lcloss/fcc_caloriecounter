const calorieCounter = document.getElementById('calorie-counter');
const budgetNumberInput = document.getElementById('budget');
const entryDropdown = document.getElementById('entry-dropdown');
const addEntryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');
const output = document.getElementById('output');

let isError = false;

function cleanInputString(str) {
    const regex = /[+-\s]/g;
    return str.replace(regex, '');
}
function isInvalidInput(str) {
    const regex = /\d+e\d+/i;
    return str.match(regex);
}
function addEntry() {
    const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);
    const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
    const HTMLString = `
  <label for="${entryDropdown.value}-${entryNumber}-name">Item ${entryNumber}: Nome</label>
  <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Nome" />
  <label for="${entryDropdown.value}-${entryNumber}-calories">Item ${entryNumber}: Calorias</label>
  <input type="number" id="${entryDropdown.value}-${entryNumber}-calories" placeholder="Calorias" value="0" min="0" />`;
  targetInputContainer.insertAdjacentHTML("beforeend", HTMLString);
}
function getCaloriesFromInputs(list) {
    let calories = 0;
  
    for (let i = 0; i < list.length; i++) {
      const currVal = cleanInputString(list[i].value);
      const invalidInputMatch = isInvalidInput(currVal);
  
      if (invalidInputMatch) {
        alert(`Invalid Input: ${invalidInputMatch[0]}`);
        isError = true;
        return null;
      }
      calories += Number(currVal);
    }
    return calories;
}
function calculateCalories(e) {
    e.preventDefault();
    isError = false;
  
    const breakfastNumberInputs = document.querySelectorAll('#breakfast input[type=number]');
    const lunchNumberInputs = document.querySelectorAll('#lunch input[type=number]');
    const dinnerNumberInputs = document.querySelectorAll('#dinner input[type=number]');
    const snacksNumberInputs = document.querySelectorAll('#snacks input[type=number]');
    const exerciseNumberInputs = document.querySelectorAll('#exercise input[type=number]');
  
    const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
    const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
    const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
    const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
    const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
    const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);  

    if (isError) {
        return;
    }
    
    const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
    const remainingCalories = budgetCalories - consumedCalories + exerciseCalories;
    const surplusOrDeficit = remainingCalories >= 0 ? 'excedentes' : 'deficitárias';
    const surplusOrDeficitClass = remainingCalories >= 0 ? 'surplus' : 'deficit';
    output.innerHTML = `
    <span class="${surplusOrDeficitClass.toLowerCase()}">${Math.abs(remainingCalories)} Calorias ${surplusOrDeficit}</span>
    <hr>
    <p>${budgetCalories} Calorias no Orçamento</p>
    <p>${consumedCalories} Calorias Consumidas</p>
    <p>${exerciseCalories} Calorias Queimadas</p>
    `;

    output.classList.remove('hide');
}
function clearForm() {
    const inputContainers = Array.from(document.querySelectorAll('.input-container'));
    for (let i = 0; i < inputContainers.length; i++) {
      inputContainers[i].innerHTML = '';
    }

    budgetNumberInput.value = '';
    output.innerText = '';
    output.classList.add('hide');
  
}
addEntryButton.addEventListener('click', addEntry);
calorieCounter.addEventListener('submit', calculateCalories);
clearButton.addEventListener("click", clearForm);