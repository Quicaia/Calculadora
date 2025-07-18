
//Selectores no DOM

const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");


class calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText =  currentOperationText;
        this.currentOperation = "";
      
    }
    // add digit to  calcultor screen
    addDigit(digit){
        // check if current operation already has dot
        if(digit ==="." && this.currentOperationText.innerText.includes(".")) {
           return; 
        }
        this.currentOperation = digit; //recebe o valor digito
        this.updateScreen()
    }

    //Process all the calculator operations
    processOperation(operation){
       
        //Get current and previus value
        let operationValue 
        const previous = (+this.previousOperationText.innerText.split(" ")[0]);
        const current = +this.currentOperation.innerText;


        switch(operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break
            default:
            return;
        }
    }

    //Mostrar o valor na tela da calculadora
    updateScreen(operationValue = null, 
        operation = null, 
        current = null, 
        previous = null) {
        
       // console.log(operationValue, operation, current, previous);
       
        if(operationValue === null){
               this.currentOperationText.innerText += this.currentOperation;
        } else {
           // check if value is zero, if is just add current value
           if(previous === 0 ) {
                operationValue === current;
           }

           // add current value to previous
           this.previousOperationText.innerText = `${operationValue} ${operation}`;
           this.currentOperationText.innerText = "";
        }
     
    }
}

const calc = new calculator(previousOperationText, currentOperationText);

buttons.forEach( (btn) => {
    btn.addEventListener("click", (e) =>{ // Funçao que recebi o valor que esto nos buttons ou nos elementos
        const value = e.target.innerText;

        //Condiçao para criar as operaçoes 

        if(+value >= 0 || value === ".") {
           calc.addDigit(value);
        } else {
            calc.processOperation(value)
        }
    })
})