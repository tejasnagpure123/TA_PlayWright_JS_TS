//Mutiline
const getResult = (score) => {
    if (score > 70) return "Pass";
    return "fail";
}


console.log(getResult(78));

//Alcohol
const canDrink = (age) => {
    if (age > 18) return "Can Drink";
    return "Cannot Drink"
}
console.log(canDrink(13));
