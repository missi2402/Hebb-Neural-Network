'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//Blocks with letters
var letters = document.getElementsByClassName('ck-button');
var letterForRecognition = document.getElementById('recognition');
// HTML-element with details
var descBlock = document.getElementById('description');
// Size of block for letter
var col = document.getElementById('col');
var row = document.getElementById('row');
// Values output
var initialOutput = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
var NUMBER_OF_INPUTS = void 0; // Columns * rows
var objectLetters = [];
var weight = void 0;
// Class storage input and output values

var Neuron = function Neuron(input, output) {
    _classCallCheck(this, Neuron);

    this.input = input;
    this.output = output;
};
/* The function to fill an two-dimensional array of zero */


var setZero = function setZero(array) {
    descBlock.innerHTML += "<h2>An array of weights: </h2>";
    for (var x = 0; x < array.length; x++) {
        for (var y = 0; y < array[x].length; y++) {
            array[x][y] = 0;
            descBlock.innerHTML += array[x][y];
        }
        descBlock.innerHTML += '<br>';
    }
    return array;
};
/* The function to create blocks with letters. Default values: an array of letters, the number of rows and columns. */
var constructLetters = function constructLetters() {
    var arrayElements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : letters;
    var elementCols = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : col.value;
    var elementRows = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : row.value;

    NUMBER_OF_INPUTS = col.value * row.value;
    weight = [new Array(NUMBER_OF_INPUTS), new Array(NUMBER_OF_INPUTS)];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = arrayElements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var arrayElement = _step.value;

            var _count = elementCols * elementRows;
            arrayElement.innerHTML = "";
            do {
                arrayElement.innerHTML += '<label><input type="checkbox""><div></div></label>';
                _count--;
                if (_count % elementCols == 0) arrayElement.innerHTML += '<br />';
            } while (_count);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    var count = elementCols * elementRows;
    letterForRecognition.innerHTML = "";
    do {
        letterForRecognition.innerHTML += '<label><input type="checkbox""><div></div></label>';
        count--;
        if (count % elementCols == 0) letterForRecognition.innerHTML += '<br />';
    } while (count);
};
/* The function to show blocks with letters. Default values: an array of letters. */
var showLetters = function showLetters() {
    var arrayElements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : letters;

    descBlock.innerHTML = "<h2>Input arrays: </h2>";
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = arrayElements[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var arrayElement = _step2.value;

            var checkbox = document.getElementById(arrayElement.id).getElementsByTagName('input');
            descBlock.innerHTML += getArrayFromLetter(arrayElement);
            descBlock.innerHTML += '<br>';
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }
};
/* The function returns an array with the values of the block inputs */
var getArrayFromLetter = function getArrayFromLetter(arrayElement) {
    var arrayResult = [];
    var checkbox = document.getElementById(arrayElement.id).getElementsByTagName('input');
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = checkbox[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var checkboxElement = _step3.value;

            var n = void 0;
            if (checkboxElement.checked) n = 1;else n = -1;
            arrayResult.push(n);
        }
    } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
            }
        } finally {
            if (_didIteratorError3) {
                throw _iteratorError3;
            }
        }
    }

    return arrayResult;
};
/* The function sets the blocks according to the input array*/
var setLetterFromArray = function setLetterFromArray(defaultLetters) {
    for (var i = 0; i < letters.length; i++) {
        var checkbox = document.getElementById(letters[i].id).getElementsByTagName('input');
        for (var j = 0; j < defaultLetters[i].length; j++) {
            if (defaultLetters[i][j] == 1) checkbox[j].checked = true;
        }
    }
};
/* Fuction for create array of objects Neuron */
var init = function init() {
    var arrayElements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : letters;

    showLetters();
    objectLetters = [];
    for (var i = 0; i < arrayElements.length; i++) {
        objectLetters.push(new Neuron(getArrayFromLetter(arrayElements[i]), initialOutput[i]));
    }
};
var countOutput = function countOutput(inputs, weights) {
    var count = 0;
    descBlock.innerHTML += 'Inputs: ' + inputs + '. Weights: ' + weights + ' <br />';
    for (var i = 0; i < inputs.length; i++) {
        count += inputs[i] * Number(weights[i]);
    }
    if (count > 0) return 1;else return -1;
};
/* Function for conversion of weights and training */
var trainee = function trainee() {
    var neurons = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : objectLetters;
    var numberOfLetters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : letters.length;

    setZero(weight);
    removeClass();
    var flag = void 0,
        count = 0;
    descBlock.innerHTML += "<h2>Training: </h2>";
    do {
        flag = true;
        count++;
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
            for (var _iterator4 = neurons[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var neuron = _step4.value;

                var trainingOutput = "" + neuron.output.join('');
                var realOutput = "" + countOutput(neuron.input, weight[0]) + countOutput(neuron.input, weight[1]);
                descBlock.innerHTML += 'Step: ' + count + '. Waiting for: ' + trainingOutput + ', get: ' + realOutput + '.<br />';
                if (trainingOutput !== realOutput) {
                    flag = false;
                    for (var i = 0; i < neuron.input.length; i++) {
                        weight[0][i] += neuron.input[i] * neuron.output[0];
                        weight[1][i] += neuron.input[i] * neuron.output[1];
                    }
                    descBlock.innerHTML += "Fix it.<br />";
                }
            }
        } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                    _iterator4.return();
                }
            } finally {
                if (_didIteratorError4) {
                    throw _iteratorError4;
                }
            }
        }

        if (count == 15) {
            descBlock.innerHTML += "<h2>Sorry, education isn't possible! Try again.</h2>";
            flag = true;
        }
    } while (!flag);
    if (count != 15) {
        descBlock.innerHTML += "<h2>Education was successful!</h2>";
        document.getElementById("recognitionButton").disabled = false;
    }
};
/* Function that recognizes the letter */
var recognition = function recognition() {
    removeClass();
    var letter = getArrayFromLetter(letterForRecognition);
    var realOutput = "" + countOutput(letter, weight[0]) + countOutput(letter, weight[1]);
    for (var i = 0; i < initialOutput.length; i++) {
        if ("" + initialOutput[i][0] + initialOutput[i][1] == realOutput) {
            letters[i].classList.add("image-found");
            descBlock.innerHTML += '<h2>Recognition was successful! Image at number: ' + (i + 1) + '.</h2>';
        }
    }
};
/* Function to set the values of the letters */
var setValue = function setValue() {
    col.value = 5;
    row.value = 5;
    removeClass();
    constructLetters();
    var letters = [[-1, -1, 1, -1, -1, -1, 1, -1, 1, -1, 1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, 1], [1, -1, -1, -1, 1, 1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, 1, 1, -1, -1, -1, 1], [1, 1, 1, 1, 1, -1, -1, 1, -1, -1, -1, -1, 1, -1, -1, -1, -1, 1, -1, -1, -1, -1, 1, -1, -1], [1, 1, 1, 1, 1, 1, -1, -1, -1, 1, 1, -1, -1, -1, 1, 1, -1, -1, -1, 1, 1, 1, 1, 1, 1]];
    setLetterFromArray(letters);
    document.getElementById("recognitionButton").disabled = true;
};
/* Function for remove shadow for letters*/
var removeClass = function removeClass() {
    var arrayElements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : letters;
    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
        for (var _iterator5 = arrayElements[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var letter = _step5.value;

            letter.classList.remove("image-found");
        }
    } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion5 && _iterator5.return) {
                _iterator5.return();
            }
        } finally {
            if (_didIteratorError5) {
                throw _iteratorError5;
            }
        }
    }
};
// Change the size of the field
col.onchange = function () {
    constructLetters();
};
row.onchange = function () {
    constructLetters();
};
// First call
constructLetters();