// let args = process.argv.slice(2)

// args.forEach(function (val, index, array) {
//   console.log(index + ': ' + val* 3);
// });

// Get process.stdin as the standard input object.
// 
// process.stdin.on('data', data => {
//   console.log('your data ==>', data)
// })

const std_input = process.stdin;

// Set input character encoding.
std_input.setEncoding('utf-8');

// Prompt user to input data in console.
console.log("Please input text in command line.");

// // When user input data and click enter key.
std_input.on('data', function (data) {
  console.log(data)
  // User input exit.
  if (data === 'exit\n') {
    // Program exit.
    console.log("User input complete, program exit.");
    process.exit();
  } else {
    // Print user input in console.
    console.log('User Input Data : ' + data);
  }
});




