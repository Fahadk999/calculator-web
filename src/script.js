document.addEventListener("DOMContentLoaded", () => {

let opCount = 0;
const opList = [ "+", "-", "/", "*"];

// text elems
const displayText = document.getElementsByClassName("display-text")[0];

// buttons
const btnAC = document.querySelector(".AC");
const btnDEL = document.querySelector(".DEL");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const solve = document.querySelector(".solve");

numbers.forEach(number => {
    number.addEventListener("click", () => {
        ElemClicked(number, displayText); 
    });
});
operators.forEach(op => {
    op.addEventListener("click", () => {
        if (opCount <= 0 && displayText.innerText !== "0") {
            ElemClicked(op, displayText);
            opCount = 1;
        }
    });
});

btnAC.addEventListener("click", () => { displayText.innerText = "0"; opCount = 0; });
btnDEL.addEventListener("click", () => { 
    opList.forEach(op => {
        if (displayText.innerText.at(-1) == op) {
            opCount = 0;
        }
    });
    Del(displayText); 
});

solve.addEventListener("click", () => {
    Calculate(displayText, opList);
    opCount = 0;
});

});


function Del (textElem) {
    textElem.innerText = textElem.innerText.slice(0, -1);
    if (textElem.innerText.length < 1) {
        textElem.innerText = "0";
    }
}

function ElemClicked (elem, displayElem) {
    let val = elem.value;
    if (displayElem.innerText == "0") {
        displayElem.innerText = String(val);
    } else {
        displayElem.innerText = displayElem.innerText + String(val);
    }
}

function Calculate (displayElem, opList) {
    let equation = displayElem.innerText;

    let partOne = "";
    let partTwo = "";
    let operator = "";
    let found = false;
    for (const c of equation) {
        if (!found) {
            if (opList.includes(c)) {
                    operator = c;
                    found = true;
            } else {
                partOne += c;
            }
        } else {
            partTwo += c;
        }
    }
    //checks if eauation is complete
    if (partTwo.length === 0 || operator.length === 0) {
        displayElem.innerText = partOne;
        return;
    }
    switch (operator) {
        case '+':
            displayElem.innerText = Number(partOne) + Number(partTwo);
            break;
        case '-':
            displayElem.innerText = Number(partOne) - Number(partTwo);
            break;
        case '*':
            displayElem.innerText = Number(partOne) * Number(partTwo);
            break;
        case '/':
            if (partTwo !== "0") {
                displayElem.innerText = Number(partOne) / Number(partTwo);
            } else {
                displayElem.innerText = "Division by zero Error";
            }
            break;
        default:
            displayElem.innerText = "Math Error";
    }
}