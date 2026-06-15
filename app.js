const BASE_URL = 
"https://open.er-api.com/v6/latest";



const dropdowns = document.querySelectorAll(".dropdown select");

const btn = document.querySelector("button");

const fromCurr = document.querySelector(".from select");

const toCurr = document.querySelector(".to select");

const msg = document.querySelector(".msg");




// Add currency options

for(let select of dropdowns){


    for(let currCode in countryList){


        let option = document.createElement("option");


        option.innerText = currCode;

        option.value = currCode;



        if(select.name === "from" && currCode === "USD"){

            option.selected = true;

        }



        if(select.name === "to" && currCode === "INR"){

            option.selected = true;

        }



        select.append(option);


    }



    select.addEventListener("change",(event)=>{

        updateFlag(event.target);

    });


}





// Update Flag

function updateFlag(element){


    let currCode = element.value;


    let countryCode = countryList[currCode];


    let img = element
    .parentElement
    .querySelector("img");



    img.src = 
    `https://flagsapi.com/${countryCode}/flat/64.png`;


}






// Currency Converter

async function updateExchangeRate(){


    let amountInput = document.querySelector(".amount input");


    let amount = amountInput.value;



    if(amount === "" || amount < 1){

        amount = 1;

        amountInput.value = 1;

    }



    try{


        let url = 
        `${BASE_URL}/${fromCurr.value}`;



        let response = await fetch(url);



        let data = await response.json();



        let rate = 
        data.rates[toCurr.value];



        let result = amount * rate;



        msg.innerText =
        `${amount} ${fromCurr.value} = ${result.toFixed(2)} ${toCurr.value}`;



    }


    catch(error){


        console.log(error);


        msg.innerText =
        "Unable to get exchange rate";


    }


}





btn.addEventListener("click",(event)=>{


    event.preventDefault();


    updateExchangeRate();


});






window.addEventListener("load",()=>{


    updateExchangeRate();


});