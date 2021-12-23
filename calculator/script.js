var input=0;
var queue=[];
var display2 = $('#result2');
var display = $('#result');
$(document).ready(function(){
  
    $('.numberBtn').on('click',function(){
        var value1=$(this).val();
        insertValues(value1);  
    });
    $('.numberBtnOperator').on('click',function(){
        var value1=$(this).val();
        insertValues(value1);
    });

    $('#equals').on('click',function(){
        calculateTotal();    
    });
    $('#clear').on('click',function(){
        display.val('') ;
    });

    $('.calCbtn').click(function(){
        var buttonValue = $(this).val();
        handleNumbers(buttonValue);
    })
    $('.calcBtnOperator').click(function(){
        var buttonValue = $(this).val();
        handleOperators(buttonValue);
    })
    $('.calcBtn').on('click',function(){
        var buttonValue = $(this).val();
      if(buttonValue =='C'){
          clearAll();
        } else {
            handleNumbers(buttonValue)
        }
    });
    $('.calcResultOperator').click(function(){
        calculateSum(queue);
    })
 
});
    let insertValues = (value) =>{
        var currentvalue = display.val();
        var length = currentvalue.length;
        var flag = false;
        if(value == '+' || value == '-' || value == '*' || value == '/') {
            flag =true;
        }
        if(length == 0 && flag) {
            return; // we don't wanna dd any operators if there is no operands
        }
        var newFlag = false;
        var lastCharacter=currentvalue[length-1];
        if(lastCharacter == '+' || lastCharacter == '-' || lastCharacter == '*' || lastCharacter == '/') {
            newFlag = true;
        }
        if(flag && newFlag) {
            // if there is 2 operators after the operand, we simply remove the previous one and add the new one
            //eg: if we add 1 +*, we change it as 1 *
            display.val(currentvalue.substring(0,length-1) + value);
        
        } else {
            var currentDisplay = display.val();
            display.val(currentDisplay+value);
        }
    }

    let calculateTotal= () =>{
        var currentvalue = display.val();
        var length = currentvalue.length;
        var flag = false;
        var lastCharacter=currentvalue[length-1];
        if(lastCharacter == '+' || lastCharacter == '-' || lastCharacter == '*' || lastCharacter == '/') {
            flag =true;
        }
        if(flag) {
            display.val('ERROR');
        } else {
            display.val(eval(display.val()));
        }

    }
    let clearAll=() => {
        input=0;
        queue=[];
        display2.val('0') ;
    }
    let handleNumbers = (arg) => {
        input+=arg;
        var currentvalue = display2.val();
        display2.val(currentvalue+arg);
    }
    let handleOperators =(arg) =>{
        if(input!=0) {
            input = parseFloat(input);
            addQueue(input); //addinng the first value to the array
            addQueue(arg); // adding operator to the arrau as second value
            var currentvalue = display2.val();
            display2.val(currentvalue+arg);
            input=0;
        }
    }
    let addQueue=(input)=>{
        queue.push(input);
    }
    let calculateSum=(value)=>{
        if (input !==0) {
            input = parseFloat(input);
            addQueue(input); // adding the thirst value to the arra ie:the value comes after operator
        }  
        var answer = value[0];
        var dividedByZero = 0;
        for (var i = 2; i < value.length; i = i + 2) {
            switch (queue[i - 1]) {
            case "+":
                answer += value[i];
                break;
            case "-":
                answer -= value[i];
                break;
            case "/":
                if (value[i] === 0) dividedByZero = 1;
                else answer = answer / value[i];

                break;
            case "*":
                answer = answer * value[i];
                break;
            }
        }

        if (dividedByZero === 1) {
            clearAll();
            display2.val("ERROR");
        } else {
            display2.val(answer);
            input = answer;
            queue = [];
        }
    }


