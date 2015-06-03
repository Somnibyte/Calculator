// Store calculator components
var $display = $(".output");
var operators = ["+","-","x","/"];
var previousCommand;
// This boolean is used in order to solve the dilemma in which -
// the user first enters a decimal, then follows it with a decimal, but -
// then tries to add another decimal
var decimalHasBeenFound = false;

// Calculator functions
// Function clears display when the 'CE' button is clicked on.
function clear(){
  $display.html("");
}

// Function returns an evaluated equation
function calculate(equation){
  return eval(equation);
}


// Events
$('button').click(function(){
  var buttonValue = $(this).text(); // Current buttons value
  var displayValue = $display.text(); // Current display value

  // Evaluate the current value of the button for processing.
  if(buttonValue === "CE"){
    // Clears the calculator's display when the CE button is pressed
    clear();
    // The display is clear, thus a decimal has not been implemented
    decimalHasBeenFound = false;

  }else if(buttonValue === "x" || buttonValue === "/" || buttonValue === "+" || buttonValue === "-"){

    // Stores previous character in the equation
    previousCommand = displayValue[displayValue.length - 1];

    // Allow first operator to be minus for negative numbers
    if(displayValue === "" && buttonValue === "-"){
      $display.append(buttonValue);
    }
    // If the display isn't blank and the previoius command is not an operator, add the value to the display.
    // Otherwise display nothing
    if(displayValue != "" && ($.inArray(previousCommand, operators) === -1)){
        $display.append(buttonValue);
    }

    //An operator has been implemented, but there are no signs of a decimal
    decimalHasBeenFound = false;

  }else if(buttonValue === "."){
    // If there are no signs of a decimal, you can add another
    if(!decimalHasBeenFound){
      $display.append(buttonValue);
      // Prevent the user from adding another decimal
      decimalHasBeenFound = true;
    }

  }else if(buttonValue === "="){
      var finalEquation = $display.text(); // Store the equation within the display

      var finalPreviousCommand = finalEquation[finalEquation.length - 1];
      // Replace any unknown operators --> "X turns into '*'" using Regex
      // The 'g' character is used to refer to a global replacement within the string
      finalEquation = finalEquation.replace(/x/g, '*');
      // Finally, we must make sure the user doesn't leave an operator or a decimal at the end of the equation
      if(($.inArray(finalPreviousCommand, operators) > -1) || finalPreviousCommand === "."){
          // Remove these faults from the end of our equation using Regex
          finalEquation = finalEquation.replace(/.$/, '');
      }

      // Finally, calculate the equation and display the value
      var sum = calculate(finalEquation);
      $display.html(sum);

      decimalHasBeenFound = false

  }else{
    $display.append(buttonValue);
  }
});
