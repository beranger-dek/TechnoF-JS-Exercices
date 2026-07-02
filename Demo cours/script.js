// console.log("Hello world!");
// let number = 1;
// console.log(typeof number);
// const person = {
//     name: "Khun",
//     work: "Developper",
//     age: 24
// }
// console.log(person.name)
// const h2 = document.getElementById("hey");
// console.log(h2);

const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");

const response = document.getElementById("response");
const button = document.getElementById("btn");

button.addEventListener('click', () => {
    const value1 = input1.valueAsNumber;
    const value2 = input2.valueAsNumber;
    response.textContent += (value1 + value2);
});

