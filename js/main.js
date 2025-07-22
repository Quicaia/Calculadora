
//Selectores no DOM

const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");


class Calculator {
    constructor(previousOperationText, currentOperationText) {
        
        // 1º Atribui os elementos do DOM às propriedades da classe
        // para que possam ser acessados pelos métodos da classe

        this.previousOperationText = previousOperationText; // Texto da operação anterior
        this.currentOperationText = currentOperationText; // Texto da operação atual
        this.currentOperation = ""; // Texto da operação que está sendo digitada
        //this.previousOperation = "";
        //this.operationType = undefined;



    }
    // 2º Métodos da classe para manipular as operações
    addDigit(digit) { //Metodo para adicionar dígitos à operação atual


         // 1º Verifica se o dígito já está presente na operação atual

        if(digit === "." && this.currentOperation.includes(".")) {
            return; // Se já estiver, não adiciona novamente
        }



       this.currentOperation = digit; 
       this.updateScreen(); // Atualiza a tela com o dígito adicionado
    }

    // Processar todas operações da calculadora
    processOperation(operation) { // Método para processar a operação atual
        //Chec
      
        //Buscar operação atual e anterior

        let operationValue; // Variável para armazenar o valor da operação
        const previous = +this.previousOperationText.innerText.split(" ")[0]; // Obtém o valor da operação anterior
        const current = +this.currentOperationText.innerText.split(" ")[0]; // Obtém o valor da operação atual


        switch(operation) { // Verifica qual operação foi selecionada
            case "+":
                operationValue = previous + current; // Soma
                this.updateScreen(operationValue, operation, current, previous); // Atualiza a tela com o resultado da operação
                break;
            case "-":
                operationValue = previous - current; // Subtração
                this.updateScreen(operationValue, operation, current, previous); 
                break;
            case "*":
                operationValue = previous * current; // Multiplicação
               this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current; // Divisão
               this.updateScreen(operationValue, operation, current, previous);
                break;
            default:
                return; // Se a operação não for reconhecida, não faz nada
        }

    }

    
    // Método para atualizar a tela com a operação atual
    updateScreen(
        operationValue = null, 
        operation = null, 
        current = null, 
        previous = null) { 
            console.log(operationValue, operation, current, previous); // Exibe os valores no console para depuração
       if(operationValue === null) { // Se não houver valor da operação, atualiza apenas a operação atual
            this.currentOperationText.innerText += this.currentOperation; // Adiciona o dígito atual à tela
        }
         else { // Se houver valor da operação, atualiza a tela com o resultado
            // 1º Verifica se a operação é uma divisão por zero   
            if(previous === 0) {
                operationValue = current; // Se for, define o valor da operação como o atual
            }

            //Atualiza o texto da operação anterior com o resultado e o operador
            this.previousOperationText.innerText = `${operationValue} ${operation}`; 
            this.currentOperationText.innerText = ""; // Limpa a operação atual
        }

  }

}

                                                        
                //fim class Calculator

// 1º Cria uma instância da classe Calculator passando os elementos do DOM
// que serão atualizados com os resultados das operações
   const calc = new Calculator(previousOperationText, currentOperationText); // Instancia a classe Calcultor



//1º Eventos de click em cada botão
 buttons.forEach((btn) =>{
    // 2º Adiciona um evento de clique a cada botão
    // e exibe o texto do botão no console  
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText; // 3º contate que recebi o valor dos botões..
        
        // 4º verificar se o valor é um número ou um operador
        if (!isNaN(value) || value === ".") {
            calc.addDigit(value); // 5º Se for um número, chama o método addDigit da classe Calcultor
           
        } else {
            // 6º Se for um operador, exibe no console
            calc.processOperation(value); // Chama o método processOperation da classe Calcultor
        }


    });
});