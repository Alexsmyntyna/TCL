document.addEventListener('keyup', function (event) {
  if (event.code === 'Enter') {
    intakeInput();
  }
});

function executeFunction(input) {
  input = input.toLowerCase();
  console.log(input);
  switch (input) {
    case 'clear':
      localStorage.clear();
      break;
    case 'value':
      outputToScreen(updateStorage('Value', 'AI'));
      break;
    default:
      outputToScreen(updateStorage('INVALID INPUT', 'AI'));
      break;
  }
}

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

function getUserInput() {
  var input = document.getElementById('userInput').value;
  var i = document.getElementById('userInput');
  i.value = '';
  return input;
}

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
    if (author == 'USER') {
      executeFunction(input);
    }
  }
  var results = JSON.parse(localStorage.getItem('results'));

  return results;
}
