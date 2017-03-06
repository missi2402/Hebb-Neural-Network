//Blocks with letters
let letters = document.getElementsByClassName('ck-button');
let letterForRecognition = document.getElementById('recognition');
// HTML-element with details
let descBlock = document.getElementById('description');
// Size of block for letter
let col = document.getElementById('col');
let row = document.getElementById('row');
// Values output
let initialOutput = [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1]
];
let NUMBER_OF_INPUTS; // Columns * rows
let objectLetters = [];
let weight;
// Class storage input and output values
class Neuron {
    constructor(input, output) {
        this.input = input;
        this.output = output;
    }
}
/* The function to fill an two-dimensional array of zero */
let setZero = array => {
    descBlock.innerHTML += "<h2>An array of weights: </h2>";
    for (let x = 0; x < array.length; x++) {
        for (let y = 0; y < array[x].length; y++) {
            array[x][y] = 0;
            descBlock.innerHTML += array[x][y];
        }
        descBlock.innerHTML += '<br>';
    }
    return array;
}
/* The function to create blocks with letters. Default values: an array of letters, the number of rows and columns. */
let constructLetters = (arrayElements = letters, elementCols = col.value, elementRows = row.value) => {
    NUMBER_OF_INPUTS = col.value * row.value;
        weight = [new Array(NUMBER_OF_INPUTS), new Array(NUMBER_OF_INPUTS)]
        for (let arrayElement of arrayElements) {
            let count = elementCols * elementRows;
            arrayElement.innerHTML = "";
            do {
                arrayElement.innerHTML += '<label><input type="checkbox""><div></div></label>';
                count--;
                if (count % elementCols == 0) arrayElement.innerHTML += '<br />';
            } while (count);
        }
        let count = elementCols * elementRows;
        letterForRecognition.innerHTML = "";
        do {
            letterForRecognition.innerHTML += '<label><input type="checkbox""><div></div></label>';
            count--;
            if (count % elementCols == 0) letterForRecognition.innerHTML += '<br />';
        } while (count);
    }
    /* The function to show blocks with letters. Default values: an array of letters. */
let showLetters = (arrayElements = letters) => {
        descBlock.innerHTML = "<h2>Input arrays: </h2>";
        for (let arrayElement of arrayElements) {
            let checkbox = document.getElementById(arrayElement.id).getElementsByTagName('input');
            descBlock.innerHTML += getArrayFromLetter(arrayElement);
            descBlock.innerHTML += '<br>';
        }
    }
    /* The function returns an array with the values of the block inputs */
let getArrayFromLetter = (arrayElement) => {
        let arrayResult = [];
        let checkbox = document.getElementById(arrayElement.id).getElementsByTagName('input');
        for (let checkboxElement of checkbox) {
            let n;
            if (checkboxElement.checked) n = 1
            else n = -1;
            arrayResult.push(n);
        }
        return arrayResult;
    }
/* The function sets the blocks according to the input array*/
let setLetterFromArray = (defaultLetters) => {
    for (let i = 0; i < letters.length; i++) {
        let checkbox = document.getElementById(letters[i].id).getElementsByTagName('input');
        for (let j = 0; j < defaultLetters[i].length; j++) {
            if (defaultLetters[i][j] == 1) checkbox[j].checked = true;
        }
    }
}
/* Fuction for create array of objects Neuron */
let init = (arrayElements = letters) => {
    showLetters();
    objectLetters = [];
    for (let i = 0; i < arrayElements.length; i++) {
        objectLetters.push(new Neuron(getArrayFromLetter(arrayElements[i]), initialOutput[i]));
    }
}
let countOutput = (inputs, weights) => {
    let count = 0;
    descBlock.innerHTML += `Inputs: ${inputs}. Weights: ${weights} <br />`;
    for (var i = 0; i < inputs.length; i++) {
        count += inputs[i] * Number(weights[i]);
    }
    if (count > 0) return 1
    else return -1
}
/* Function for conversion of weights and training */
let trainee = (neurons = objectLetters, numberOfLetters = letters.length) => {
        setZero(weight);
        removeClass();
        let flag, count = 0;
        descBlock.innerHTML += "<h2>Training: </h2>";
        do {
            flag = true;            
            count++;
            for (let neuron of neurons) {
                let trainingOutput = "" + neuron.output.join('');
                let realOutput = "" + countOutput(neuron.input, weight[0]) + countOutput(neuron.input, weight[1]);
                descBlock.innerHTML += `Step: ${count}. Waiting for: ${trainingOutput}, get: ${realOutput}.<br />`;
                if (trainingOutput !== realOutput) {
                    flag = false;
                    for (let i = 0; i < neuron.input.length; i++) {
                        weight[0][i] += neuron.input[i] * neuron.output[0];
                        weight[1][i] += neuron.input[i] * neuron.output[1];
                    }
                    descBlock.innerHTML +="Fix it.<br />";
                }
            }
            if (count == 15) { 
                descBlock.innerHTML +="<h2>Sorry, education isn't possible! Try again.</h2>"; 
                flag = true;
            }
        }
        while (!flag);
        if(count != 15) {
            descBlock.innerHTML += "<h2>Education was successful!</h2>";
            document.getElementById("recognitionButton").disabled = false;
        }
    }
/* Function that recognizes the letter */
let recognition = () => {
    removeClass();
    let letter = getArrayFromLetter(letterForRecognition);
    let realOutput = "" + countOutput(letter, weight[0]) + countOutput(letter, weight[1]);
    for (let i = 0; i < initialOutput.length; i++) {
        if (("" + initialOutput[i][0] + initialOutput[i][1]) == realOutput) {
            letters[i].classList.add("image-found");
            descBlock.innerHTML += `<h2>Recognition was successful! Image at number: ${i+1}.</h2>`;
        }
    }
}
/* Function to set the values of the letters */
let setValue = () => {
        col.value = 5;
        row.value = 5;
        removeClass();
        constructLetters();
        let letters = [
            [-1, -1, 1, -1, -1, -1, 1, -1, 1, -1, 1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, 1],
            [1, -1, -1, -1, 1, 1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, 1, 1, -1, -1, -1, 1],
            [1, 1, 1, 1, 1, -1, -1, 1, -1, -1, -1, -1, 1, -1, -1, -1, -1, 1, -1, -1, -1, -1, 1, -1, -1],
            [1, 1, 1, 1, 1, 1, -1, -1, -1, 1, 1, -1, -1, -1, 1, 1, -1, -1, -1, 1, 1, 1, 1, 1, 1]
        ];
        setLetterFromArray(letters);
        document.getElementById("recognitionButton").disabled = true;
    }
/* Function for remove shadow for letters*/
let removeClass = (arrayElements = letters) => {
    for (let letter of arrayElements) {
        letter.classList.remove("image-found");
    }
}
// Change the size of the field
col.onchange = function() { constructLetters(); };
row.onchange = function() { constructLetters(); };   
// First call
constructLetters();