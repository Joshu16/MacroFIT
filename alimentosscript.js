const foodData = {
    "manzana": { calories: 52, protein: 0.3 },
    "banana": { calories: 89, protein: 1.1 },
    "naranja": { calories: 47, protein: 0.9 },
    "fresa": { calories: 32, protein: 0.7 },
    "kiwi": { calories: 61, protein: 1.1 },
    "cereza": { calories: 50, protein: 1 },
    "piña": { calories: 50, protein: 0.5 },
    "patata": { calories: 77, protein: 2 },
    "pollo": { calories: 239, protein: 27 },
    "huevo": { calories: 155, protein: 13 },
    "leche": { calories: 42, protein: 3.4 },
    "carne de res": { calories: 250, protein: 26 },
    "carne de cerdo": { calories: 263, protein: 25 },
    "pavo": { calories: 135, protein: 30 },
    "salchicha": { calories: 300, protein: 12 },
    "pescado": { calories: 206, protein: 22 },
    "atun": { calories: 132, protein: 28 },
    "salmón": { calories: 206, protein: 22 },
    "arroz": { calories: 130, protein: 2.7 },
    "pasta": { calories: 157, protein: 5.8 },
    "pan": { calories: 265, protein: 9 },
    "pizza": { calories: 285, protein: 12 },
    "verduras": { calories: 25, protein: 2 },
    "nuez": { calories: 654, protein: 15 },
    "almendra": { calories: 575, protein: 21 },
    "quinoa": { calories: 120, protein: 4.1 },
    "avena": { calories: 389, protein: 16.9 },
    "tomate": { calories: 18, protein: 0.9 },
    "zanahoria": { calories: 41, protein: 0.9 },
    "brócoli": { calories: 34, protein: 2.8 },
    "lechuga": { calories: 15, protein: 1.5 },
    "espinaca": { calories: 23, protein: 2.9 },
    "yogur": { calories: 59, protein: 3.5 },
    "queso": { calories: 402, protein: 25 },
    "mantequilla": { calories: 717, protein: 0.9 },
    "chocolate": { calories: 546, protein: 4.9 },
    "gaseosa": { calories: 39, protein: 0 },
    "frijoles": { calories: 127, protein: 8.7 },
    "lentejas": { calories: 116, protein: 9 },
    "miel": { calories: 304, protein: 0.3 },
    "gelatina": { calories: 60, protein: 1.3 },
    "aguacate": { calories: 160, protein: 2 },
    "cordero": { calories: 294, protein: 25 },
    "bacalao": { calories: 105, protein: 23 },
    "gambas": { calories: 99, protein: 24 },
    "hamburguesa": { calories: 250, protein: 18 },
    "pollo frito": { calories: 320, protein: 26 },
    "ternera": { calories: 250, protein: 26 },
    "churrasco": { calories: 300, protein: 25 },
    "pato": { calories: 337, protein: 19 },
    "pescado empanizado": { calories: 240, protein: 20 },
    "salchichón": { calories: 400, protein: 24 },
    "tofu": { calories: 76, protein: 8 },
    "tempeh": { calories: 193, protein: 20 },
    "langosta": { calories: 89, protein: 19 },
    "ostras": { calories: 81, protein: 9.5 },
    "pasta integral": { calories: 174, protein: 7.5 },
    "pan integral": { calories: 256, protein: 13 },
    "batata": { calories: 86, protein: 1.6 },
    "coco": { calories: 354, protein: 3.3 },
    "sirope de arce": { calories: 260, protein: 0.1 },
    "gelato": { calories: 200, protein: 4 },
    "manteca de cerdo": { calories: 898, protein: 0 },
    "nuez moscada": { calories: 525, protein: 5.8 },
    "chícharos": { calories: 81, protein: 5.4 },
    "pimiento": { calories: 31, protein: 1 },
    "pepino": { calories: 16, protein: 0.7 },
    "remolacha": { calories: 43, protein: 1.6 },
    "apio": { calories: 16, protein: 0.7 },
    "setas": { calories: 22, protein: 3.1 },
    "rúcula": { calories: 25, protein: 2.6 },
    "batido de proteínas": { calories: 120, protein: 24 },
    "barra de proteínas": { calories: 200, protein: 20 },
    "ensalada de garbanzos": { calories: 164, protein: 9 },
    "smoothie verde": { calories: 150, protein: 5 },
    "pudding de chía": { calories: 120, protein: 4.5 },
    "chía": { calories: 486, protein: 17 },
};

let totalCalories = 0;
let totalProtein = 0;
let selectedFoods = [];

document.getElementById('searchButton').addEventListener('click', searchFood);
document.getElementById('foodInput').addEventListener('input', showSuggestions);
document.getElementById('resetButton').addEventListener('click', resetTotals); // Botón para reiniciar

function searchFood() {
    const foodInput = document.getElementById('foodInput').value.toLowerCase();
    const quantityInput = document.getElementById('quantityInput').value;
    const resultDiv = document.getElementById('result');
    hideSuggestions();

    if (foodData[foodInput]) {
        const { calories, protein } = foodData[foodInput];
        const totalCaloriesForFood = (calories * quantityInput) / 100; // Asumiendo que los valores son por 100g
        const totalProteinForFood = (protein * quantityInput) / 100;

        resultDiv.innerHTML = `
            <h3>${foodInput.charAt(0).toUpperCase() + foodInput.slice(1)}</h3>
            <p>Calorías por ${quantityInput}g: ${totalCaloriesForFood.toFixed(1)}</p>
            <p>Proteínas por ${quantityInput}g: ${totalProteinForFood.toFixed(1)}g</p><br>
            <button onclick="addToSelected('${foodInput}', ${totalCaloriesForFood.toFixed(1)}, ${totalProteinForFood.toFixed(1)})">Agregar a Selección</button>`;
    } else {
        resultDiv.innerHTML = `<p>Alimento no encontrado.</p>`;
    }
}

function addToSelected(food, calories, protein) {
    totalCalories += calories;
    totalProtein += protein;

    selectedFoods.push({ food, calories, protein }); // Agregar a la lista de seleccionados

    const selectedFoodsDiv = document.getElementById('selectedFoods');
    updateSelectedFoodsDisplay(selectedFoodsDiv);

    updateTotals();
    saveToLocalStorage(); // Guardar totales
}

function updateSelectedFoodsDisplay(container) {
    container.innerHTML = ''; // Limpiar el contenedor
    selectedFoods.forEach((item, index) => {
        const foodItem = document.createElement('div');
        foodItem.textContent = `${item.food.charAt(0).toUpperCase() + item.food.slice(1)}: ${item.calories.toFixed(1)} cal, ${item.protein.toFixed(1)} g proteína`;
        
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Eliminar';
        removeButton.onclick = () => removeFromSelected(index); // Llamar a la función para eliminar
        foodItem.appendChild(removeButton);
        
        container.appendChild(foodItem);
    });
}

function removeFromSelected(index) {
    totalCalories -= selectedFoods[index].calories;
    totalProtein -= selectedFoods[index].protein;
    selectedFoods.splice(index, 1); // Eliminar el alimento de la lista

    const selectedFoodsDiv = document.getElementById('selectedFoods');
    updateSelectedFoodsDisplay(selectedFoodsDiv);

    updateTotals();
    saveToLocalStorage(); // Guardar totales
}

function updateTotals() {
    document.getElementById('totalCalories').textContent = totalCalories.toFixed(1);
    document.getElementById('totalProtein').textContent = totalProtein.toFixed(1);
}

function showSuggestions() {
    const input = document.getElementById('foodInput').value.toLowerCase();
    hideSuggestions();

    const suggestionsDiv = document.createElement('div');
    suggestionsDiv.classList.add('suggestions');

    const suggestions = Object.keys(foodData).filter(food => food.startsWith(input));

    suggestions.forEach(suggestion => {
        const item = document.createElement('div');
        item.classList.add('suggestion-item');
        item.textContent = suggestion;
        item.onclick = () => {
            document.getElementById('foodInput').value = suggestion;
            hideSuggestions();
            searchFood();
        };
        suggestionsDiv.appendChild(item);
    });

    if (suggestions.length > 0) {
        document.getElementById('result').appendChild(suggestionsDiv);
    }
}

function hideSuggestions() {
    const existingSuggestions = document.querySelector('.suggestions');
    if (existingSuggestions) {
        existingSuggestions.remove();
    }
}

function saveToLocalStorage() {
    localStorage.setItem('totalCalories', totalCalories);
    localStorage.setItem('totalProtein', totalProtein);
    localStorage.setItem('selectedFoods', JSON.stringify(selectedFoods)); // Guardar la lista de alimentos seleccionados
}

function loadFromLocalStorage() {
    totalCalories = parseFloat(localStorage.getItem('totalCalories')) || 0;
    totalProtein = parseFloat(localStorage.getItem('totalProtein')) || 0;
    selectedFoods = JSON.parse(localStorage.getItem('selectedFoods')) || []; // Cargar la lista de alimentos seleccionados
    updateSelectedFoodsDisplay(document.getElementById('selectedFoods')); // Mostrar alimentos seleccionados
    updateTotals(); // Actualiza los totales al cargar
}

document.addEventListener('DOMContentLoaded', loadFromLocalStorage);

// Nueva función para reiniciar calorías
function resetTotals() {
    totalCalories = 0;
    totalProtein = 0;
    selectedFoods = [];

    updateTotals();
    updateSelectedFoodsDisplay(document.getElementById('selectedFoods'));
    // Limpiar solo los datos de foods en localStorage
    localStorage.removeItem('totalCalories');
    localStorage.removeItem('totalProtein');
    localStorage.removeItem('selectedFoods');
}

document.getElementById('addToDailyCalories').addEventListener('click', addCaloriesToDaily);

function addCaloriesToDaily() {
    const dailyCalories = parseFloat(localStorage.getItem('calorias')) || 0;
    const updatedCalories = dailyCalories + totalCalories;

    localStorage.setItem('calorias', updatedCalories); // Actualizar en localStorage

    alert(`Se han añadido ${totalCalories} calorías a tus calorías diarias. Total: ${updatedCalories} calorías.`);
}
 
