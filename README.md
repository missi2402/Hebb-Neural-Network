# Hebb-Neural-Network
Implementation of the Hebb neural network using HTML, CSS and JS (ES6)

https://en.wikipedia.org/wiki/Hebbian_theory

For simplicity, an interface with the ability to create letters has been created. You can change the size of the letter (columns and rows), you can also use "Set Default" (with letter 5x5).
For the program to work properly, you must enter all 4 different letters. Only after learning, the recognition button becomes visible. Before each training the weights are reset.
Details of training and recognition will be displayed on the page. After successful recognition, the block with the letter will be highlighted.
<h3>How it works</h3>
At start, an array with unique values for 4 images is initialized:
<pre>
// Values output
let initialOutput = [
    [-1, -1], // first letter
    [-1, 1], //second ...
    [1, -1],
    [1, 1]
];
</pre>
There is also a class for storing input and output data:
<pre>
  class Neuron {
    constructor(input, output) {
        this.input = input; // array with -1 and 1(if checked)
        this.output = output; // [-1, -1] - for first image
    }
}
</pre>
<b>When initializing:</b> determine the size of the letter, create a two-dimensional array with weights:
<pre>weight = [new Array (NUMBER_OF_INPUTS), new Array (NUMBER_OF_INPUTS)];</pre>
Array letters are filled in: <i>if (the checkbox is checked) = 1, else = -1</i>.
<b>When training:</b> zero weights, then for each object receive a training output using the function <pre>countOutput</pre>, if the expected result (-1-1) doesn't coincide with the received result (-11), then the weights are recalculated.
Only when all objects are successfully recognized the training will end. The maximum possible <b>15 repetitions</b>, otherwise these letters can not be recognized.
<b>When recognition:</b> On the input we get the fifth image, we consider its output, compare the output with the array <pre>initialOutput</pre> and highlight the letter.
<h3>Example of work</h3>
