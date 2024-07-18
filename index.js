#! /usr/bin/env node
import inquirer from "inquirer";
// /MAKING UNIQUE IDS FRO STUDENTS
//we want to give 5 digit unique student id 
//har bar jo new student aee usko new id mile unique
const randomNumber = Math.floor(10000 + Math.random() * 90000); //add 10000 bcz we need 5 digits or num change hta rhe toh *90000 7 remove after point values  so user floor
//console.log(randomNumber);
//balance of stuudent
let myBalance = 0;
//taking input from user for it DETAILS
let ansswe = await inquirer.prompt([
    {
        name: "student",
        type: "input",
        message: "ENTER STUDENT NAME",
        //AGR KOI USER EMPTY DE TOH ERROR DE DEGA
        validate: function (value) {
            if (value.trim() !== "") { // USER NE JO INPUT DIYA WO TRIM MEANS WHITE SPACE REMOVE KRNE KE BAD BH EQUAL TO NH HOTA EMPTY STRING KE TO MTLB KCVH LIKHA HUA AHI USME SO IT RETURNS TRUE MEANS STUDENT N KCH DIYA HAI 
                return true;
            }
            return "PLEASE ENTER A NON-EMPTY VALUE";
        }
    },
    //OBJECT FRO COURSES 
    {
        name: "courses",
        type: "list",
        message: "PEASE SELECT THE COURSE TO ENROLL",
        choices: ["MS OFFICE", "HJTML", "AI", "CYBEER SECURITY", "JS"]
    },
]);
//FESS OF COURSES 
//STATIC OBJECTS BEC WE HAVE 2 TYPES OF DATA
//it is TS FEAUTURE  IN WHICH WE ARE DEFINIG AN OBJECT IN WHICH KEYS ARE IN STRIG TYPE  ANFD ITS VALUES ARE IN NUMBER
const tuotionFess = {
    "MS OFFICE": 5000,
    "HJTML": 7000,
    "AI": 10000,
    "CYBEER SECURITY": 7000000,
    "JS": 3000,
};
console.log(`\n TUTIO FEES :${tuotionFess[ansswe.courses]}\n`); //student fees btao with courses jo answer  ke adr courses hen wo bht sare hen is liye array me liya hai 
//SHOWING BALANCE befre student takle ocurse
console.log(`BALANCE : ${myBalance}\n`);
//ADDING PAYMENT METHOD
let payment = await inquirer.prompt([
    {
        name: 'PaymentMethod',
        type: "list",
        message: "SELECT PAYMENT METHID",
        choices: ["BANK TRANSFER", "EASYPAISA", "JAZZ CASH"]
    },
    //AMOUNT TO PAY  :OBJECT
    {
        name: "amount",
        type: "input",
        message: "TRANSFER MONEY",
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return "PLEASE ENTER AMOUNT TO TRANSFER";
        }
    },
]);
console.log(`\n YOU SELECTED PAYMENT METHOD ${payment.PaymentMethod}`);
//COURSES TUIOION FEE PAY
//ANSWER K EUNDR JO BH COURSE GHA USKI FEES DIKHA DENGEN WO IS VARAIBLE ME STORE KRWA RHEN HEN WO PAY KRN HA
const tutionFee = tuotionFess[ansswe.courses]; // jo couorse sleect hoga uski tyution fee ajaeegi 
const paymentAmount = parseFloat(payment.amount); //parse float aik string ko parse krke floating number me convert krta hai .explanation at end]
if (tutionFee === paymentAmount) {
    console.log(`CONGRATULATIONS YOU ARE ENROLLED SUCCESSFULLY IN ${ansswe.courses}\n`);
    //if student was enrolled then shoukld save its status
    let ans = await inquirer.prompt([
        {
            name: "salected",
            type: "list",
            message: " WHAT WOULD YOU LIKE TO DO NEXT",
            choices: ["View Status", "EXIT"]
        }
    ]);
    //CONDITIONs : CHOOSE VIEW STATUS
    if (ans.salected === "View Status") {
        console.log("\n*************STATUS********\n");
        console.log(`STUDENT NAME ${ansswe.student}`);
        console.log(`STUDENT ID IS : ${randomNumber}`);
        console.log(`YOUR COURSE IS : ${ansswe.courses}`);
        console.log(`TUTION FEES PAID IS : ${paymentAmount}`);
        console.log(`BALANCE IS : ${myBalance += paymentAmount}`); //jjo fees pay krdi balance uske equal hojaee      
    }
    //CHOOSE  EXIT
    else {
        console.log("\nEXITING STUDENT MANAGEMENT SYSTEM");
    }
}
else {
    console.log("INVALUD AMOUNT DUE TO COURSE \n");
}
// The line const paymentAmount = parseFloat(payment.amount) is converting the user's input (which is a string) into a floating-point number. Here's a breakdown of why and how it's used:
// Context
// In your code, you are using the inquirer library to take user input. When you prompt the user to enter an amount to pay, the input is taken as a string by default. For any mathematical operations, such as comparing, adding, or subtracting the amount, it is necessary to convert this string input into a number.
// Explanation of parseFloat
// Purpose: parseFloat is a JavaScript function that parses a string and returns a floating-point number. It reads through the string from left to right, and once it encounters a character that is not part of a floating-point number, it stops parsing.
// Usage: It is used when you expect the string to represent a decimal number (floating-point).
// Why use parseFloat
// String to Number Conversion: User inputs are usually strings. To perform arithmetic operations, you need numbers. parseFloat converts the string input to a number.
// Handling Decimal Points: If the input can be a decimal (e.g., 100.50), parseFloat will handle it correctly.
// Example in Your Code
// Here's the specific part of your code:
// typescript
// Copy code
// const paymentAmount = parseFloat(payment.amount);  // Convert the string input to a floating-point number
// Detailed Explanation
// Input as String:
// payment.amount is the input from the user, which is taken as a string. For example, if the user inputs "100.50", payment.amount will be "100.50".
// Conversion:
// parseFloat("100.50") converts the string "100.50" into the number 100.50.
// Usage:
// After conversion, paymentAmount holds the value 100.50 as a number. Now, you can perform arithmetic operations, such as subtracting this amount from a balance, adding it to a total, etc.
