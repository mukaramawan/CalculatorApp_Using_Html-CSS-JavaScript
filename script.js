const inputs=document.getElementById("inputs");
const expressionDiv=document.getElementById("expression");
const resultDiv=document.getElementById("result");
//----------------------------------------------------------
let expression="";
let result="";
//----------------------------------------------------------
inputs.addEventListener('click',buttonClick);

function buttonClick(event){
    const target=event.target;
    const action=target.dataset.action;
    const value=target.dataset.value;

    switch(action){
        case 'number':
            addValue(value);
            break;
        case 'clear':
            clear();
            break;
        case 'backspace':
            backSpace();
            break;
        case 'addition':
        case 'subtraction':
        case 'multiplication':
        case 'division':
            if(expression==='' && result!==''){
                startFromResult();
            }
            else if(expression!=='' && !isLastCharOp()){
                addValue(value);
            }
            break;
        case 'submit':
            submit();
            break;
        case 'negate':
            negate();
            break;
        case 'mod':
            Mod();
            break;
        case 'decimal':
            decimal(value);
            break;
    }

    updateDisplay(expression,result);
}

function updateDisplay(exp,res){
    expressionDiv.textContent=exp;
    resultDiv.textContent=res;
}

function addValue(value) {
    if (value === '.') {
      // Find the index of the last operator in the expression
      const lastOperatorIndex = expression.search(/[+\-*/]/);
      // Find the index of the last decimal in the expression
      const lastDecimalIndex = expression.lastIndexOf('.');
      // Find the index of the last number in the expression
      const lastNumberIndex = Math.max(
        expression.lastIndexOf('+'),
        expression.lastIndexOf('-'),
        expression.lastIndexOf('*'),
        expression.lastIndexOf('/')
      );
      // Check if this is the first decimal in the current number or if the expression is empty
      if (
        (lastDecimalIndex < lastOperatorIndex ||
          lastDecimalIndex < lastNumberIndex ||
          lastDecimalIndex === -1) &&
        (expression === '' ||
          expression.slice(lastNumberIndex + 1).indexOf('-') === -1)
      ) {
        expression += value;
      }
    } else {
      expression += value;
    }
  }

function clear(){
    expression='';
    result='';
}

function backSpace(){
    expression=expression.slice(0,-1);
}

function startFromResult(){
    expression += result + value;
}

function isLastCharOp(){
    return isNaN(parseInt(expression.slice(-1)));
}

function submit(){
    result=evaluation();
    expression='';
}

function evaluation(){
    const evlResult=eval(expression);
    return isNaN(evlResult) || !isFinite(evlResult) 
    ? '' 
    : evlResult < 1 
    ? parseFloat(evlResult.toFixed(10)) 
    : parseFloat(evlResult.toFixed(2));
}

function negate(){
    if(expression==='' && result!=='')
        result='-' + result;
    else if(expression!=='' && !expression.startsWith('-'))
        expression='-' + expression;
    else if(expression.startsWith('-'))
        expression=expression.slice(1);
}

function Mod(){
    if(expression!=''){
        result=evaluation();
        expression='';
        if(!isNaN(result) && isFinite(result))
            result=result/100;
        else 
        result='';
    }
    else if(result!==''){
        result=parseFloat(result) / 100;
    }
}

function decimal(value){
    if (!expression.endsWith('.') && !isNaN(expression.slice(-1))) {
        addValue(value);
    }
}