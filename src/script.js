document.addEventListener("DOMContentLoaded", () => {

let opCount = 0;
const opList = [ "+", "-" ];

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
    })
});
operators.forEach(op => {
    op.addEventListener("click", () => {
        if (opCount <= 0) {
            ElemClicked(op, displayText);
            opCount = 1;
        }
    })
})

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
    displayElem.innerText = displayElem.innerText + String(val);
}

function Calculate (displayElem, opList) {
    // check if equation is complete
    let equation = displayElem.innerText;
    // get part lambda
    let partOne = "";
    let partTwo = "";
    let operator = "";
    let found = false;
    // i was here
    for (const c of equation) {
        if (!found) {
            opList.forEach(op => {
                if (c === op) {
                    operator = op;
                    found = true;
                }
            });
            partOne += c;
        } else {
            partTwo += c;
        }
    }
    partOne = partOne.slice(0, -1);
    switch (operator) {
        case '+':
            displayElem.innerText = Number(partOne) + Number(partTwo);
            break;
        case '-':
            displayElem.innerText = Number(partOne) - Number(partTwo);
            break;
        default:
            displayElem.innerText = "Math Error";
    }
}