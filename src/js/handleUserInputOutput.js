document.addEventListener('keyup', function (event) {
  if (event.code === 'Enter') {
    intakeInput();
  }
});

intakeInput();

function intakeInput() {
  outputToScreen(updateStorage(getUserInput(), 'USER'));
}

function welcomeScreen() {
  var intro = ['Welcome to the TCL: Type CLEAR to clear storage'];
  outputToScreen(updateStorage(intro, 'AI'));
}

function outputToScreen(results) {
  var output = document.getElementById('results');

  var compiled = '';
  results.forEach(result => {
    compiled += '<li><p> ' + result.author + ' > ' + result.text + ' </p></li>';
  });

  output.innerHTML = compiled;

  output.lastChild.scrollIntoView();
}

// Author: Alex Smyntyna Jul/14/2022
// intakes userInput from the index.html

function getUserInput() {
  var input = document.getElementById('userInput').value;
  var i = document.getElementById('userInput');
  i.value = ''; // and resets the input
  return input;
}

// Author: Alex Smyntyna Jul/14/2022
// Used to update the Local Storage with both User and ai Inputs
// Takes in two params which are both what is to be displayed and
// which party whishes to display it

function updateStorage(input, author) {
  if (input != '') {
    var results = JSON.parse(localStorage.getItem('results'));

    if (results == null) results = [];
    var line = {
      author: author,
      text: input,
    };
    localStorage.setItem('line', JSON.stringify(line));
    results.push(line);
    localStorage.setItem('results', JSON.stringify(results));
    //runs excecuteFunction if input is from USER
    if (author == 'USER') {
      executeFunction(input);
    }
  }
  var results = JSON.parse(localStorage.getItem('results'));

  return results;
}
// Author: Alex Smyntyna Jul/14/2022
// Goes through Switch statement with all input cases
// (this is the outmost one) it handles the most basic functions
//
function executeFunction(input) {
  var input = input.toLowerCase();
  input = input.split(' ');
  console.log(input);
  switch (input[0]) {
    case 'clear':
      localStorage.clear();
      window.location.reload(); //reloads page on clear (to remove old)
      break;
    case 'cypher':
      value(input);
      break;
    default:
      outputToScreen(updateStorage('INVALID INPUT', 'AI'));
      break;
  }
}

function value(input) {
  outputToScreen(updateStorage(input[1], 'AI'));
}
