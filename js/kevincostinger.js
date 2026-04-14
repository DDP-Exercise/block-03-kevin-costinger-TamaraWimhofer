"use strict";
/*******************************************************
 *     kevincostinger.js - 100p.
 *
 *     This is Kevin. Kevin keeps track of your expenses
 *     and costs. To add an expense, pick a date, declare
 *     the amount and add a short description.
 *
 *     When you submit the form, all fields are validated.
 *     If Kevin is not happy with your inputs, the least
 *     he will do is, bring you back to the field where
 *     you made a mistake. But who knows? Maybe he can
 *     even provide some excellent User experience?
 *     (+5 Bonus points available)
 *
 *     These are the rules for the form validation:
 *      - Date is valid, if it's not empty.
 *      - Amount is valid, if it's at least 0.01.
 *      - Text is valid, if it's at least 3 letters long.
 *
 *     If everything is okay, Kevin adds a new table row,
 *     containing the expense. The table row also contains
 *     a button, which deletes the expense, once you click
 *     it. After adding a table row, the form is reset and
 *     ready for the next input.
 *
 *     At the bottom of the expense tracker, you can see
 *     a small number. It represents the sum of all expenses,
 *     which are currently tracked. It is always accurate!
 *
 *     Have a look at the pictures provided. They demonstrate
 *     how the software looks like. Notice the details, like
 *     the perfectly formatted currency! Isn't that great?
 *
 *     By the way...
 *     Kevin is a clean guy. He is free of code duplications.
 *     Kevin defines his quality by using functions and
 *     events, to keep his sourcecode clean af. He understands
 *     the scope of his variables and of course, makes use of
 *     event delegation, to keep his event listeners tidied up!
 *
 *     Tamara Wimhofer - 2026-04-14
 *******************************************************/
let sumExpenses = 0; //Use this variable to keep the sum up to date.

const form = document.querySelector("form");
const dateInput = document.getElementById("date");
const amountInput = document.getElementById("amount");
const textInput = document.getElementById("expense");
const table = document.getElementById("expenses");
const tableBody = table.querySelector("tbody");
const sumDisplay= document.getElementById("expenseSum")

/** @param {Number} value **/

function updateSum(value){
    sumExpenses += value;
    if(sumExpenses < 0) sumExpenses = 0;
    sumDisplay.textContent = formatEuro(sumExpenses);
}

function submitForm(e){
    //done: Prevent the default behavior of the submit button.
    e.preventDefault();

    const date = dateInput.value;
    const amount = parseFloat(amountInput.value);
    const text = textInput.value.trim();

    if (isEmpty(date)){
        dateInput.focus();
        return;
    }
    if (isNaN(amount)||amount <0.01){
        amountInput.focus();
        return;
    }
    if (text.length < 3){
        textInput.focus();
        return;
    }
    addExpenseRow(date, amount, text);

    updateSum(amount);
    form.reset();
}
    //done: Validate the form. If everything is fine, add the expense to the tracker and reset the form.

function addExpenseRow(date, amount, text){
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${date}</td>
        <td>${formatEuro(amount)}</td>
        <td>${text}</td>
        <td><button class="delete-btn">X</button></td>
    `;
    tableBody.appendChild(row);
}


table.addEventListener("click", function(e) {
    if (e.target.classList.contains("delete-btn")) {
        const row = e.target.closest("tr");
        const amountString = row.cells[1].textContent;
        const amount = parseFloat(amountString.replace(/[^\d,-]/g, '').replace(',', '.'));

        updateSum(-amount);
        row.remove();
    }
});

form.addEventListener("submit", submitForm);


/*****************************
 * DO NOT CHANGE CODE BELOW.
 * USE IT.
 ****************************/


/*******************************************************
 *     Checks if variable is empty
 *     @param {any} variable - Variable which you want to check.
 *     @return {Boolean} Empty or not.
 ******************************************************/
let isEmpty = function(variable) {
    if(Array.isArray(variable))
        return (variable.length === 0);
    else if(typeof variable === "object")
        return (Object.entries(variable).length === 0);
    else
        return (typeof variable === "undefined" || variable == null || variable === "");
};

/*******************************************************
 *     Converts number into currency string.
 *     @param {Number} number - Any numeric value.
 *     @return {String} Well formatted currency string.
 ******************************************************/
function formatEuro(number) {
    return number.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
}