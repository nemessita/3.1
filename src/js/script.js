
let btn1 = document.getElementById('btn1');
let btn2 = document.getElementById('btn2');
let btn3 = document.getElementById('btn3');
let sliderimg1 = document.getElementById('sliderimg1');
let sliderimg2 = document.getElementById('sliderimg2');
let sliderimg3 = document.getElementById('sliderimg3');
let sliderimg4 = document.getElementById('sliderimg4');

let currentSlide = 1;

function showSlide(slideNumber) {

    for (let i = 1; i <= 3; i++) {
        document.getElementById(`slide${i}`).style.display = 'none';
    }
    document.getElementById(`slide${slideNumber}`).style.display = 'block';

    // Update the variables to the current slide's image elements
    let currentSliderImg;
    let currentSliderImg2;
    let currentSliderImg3;
    let currentSliderImg4;

    if (slideNumber === 1) {
        currentSliderImg = sliderimg1;
        currentSliderImg2 = sliderimg2;
    } else if (slideNumber === 2) {
        currentSliderImg3 = sliderimg3;
    } else if (slideNumber === 3) {
        currentSliderImg4 = sliderimg4;
    }

    setTimeout(function () { // Apply transformations to the current slide's images
        if (currentSliderImg) {
            currentSliderImg.style.transform = 'translate(0, 0)';
            currentSliderImg2.style.transform = 'translate(0, 0)';
        }
        if (currentSliderImg3) {
            currentSliderImg3.style.transform = 'translate(0, 0)';
        }
        if (currentSliderImg4) {
            currentSliderImg4.style.transform = 'translate(0, 0)';
        }
        sliding = false;
    }, 1000);
}


function nextSlide() {
    currentSlide = currentSlide === 3 ? 1 : currentSlide + 1;
    showSlide(currentSlide);
}


function previousSlide() {
    currentSlide = currentSlide === 1 ? 3 : currentSlide - 1;
    showSlide(currentSlide);
}


showSlide(currentSlide);


btn1.addEventListener('click', function () {
    showSlide(1);
});

btn2.addEventListener('click', function () {
    showSlide(2);
});

btn3.addEventListener('click', function () {
    showSlide(3);
});


const interval = 3000;
let autoSlide = setInterval(nextSlide, interval);


fetch('db.json').then(function (response) {
    return response.json();
}).then(function (productsData) {
    const limitedData = productsData.products.slice(0, 8);

    var productList = document.querySelector(".productsitem");
    limitedData.forEach(function (product) {
        var col = document.createElement("div");
        col.className = "prd";
        col.innerHTML = `
                <img src="src/image/${
            product.primary_photo
        }" alt="Foto" style="max-width:100%;">
                <div class="prinfo">
                    <h2 class="prtitle">${
            product.name
        }</h2>
                    <p class="price">$${
            product.price
        }</p>
                    <a  class="addtocart" data-id="${
            product.id
        }" data-title="${
            product.name
        }" data-price="${
            product.price
        }" data-image="${
            product.primary_photo
        }"  >ADD TO CART</a>
                </div>
            `;

        productList.appendChild(col);

        const basket = JSON.parse(localStorage.getItem('basket'));
        const total= JSON.parse(localStorage.getItem('total'));
        if (! basket) {

            localStorage.setItem('basket', JSON.stringify([]));


        }


        col.addEventListener("mouseenter", function () {
            var priceElement = col.querySelector(".price");
            var addToCartElement = col.querySelector(".addtocart");

            priceElement.style.transform = "translateX(50px)";
            priceElement.style.opacity = 0;

            addToCartElement.style.transform = "translateX(0px)";
            addToCartElement.style.opacity = 1;

        });

        col.addEventListener("mouseleave", function () {
            var priceElement = col.querySelector(".price");
            var addToCartElement = col.querySelector(".addtocart");

            priceElement.style.transform = "translateX(0px)";
            priceElement.style.opacity = 1;

            addToCartElement.style.transform = "translateX(-50px)";
            addToCartElement.style.opacity = 0;
        });
    });

    const btnCardButtons = document.querySelectorAll('.addtocart');

    btnCardButtons.forEach((buttons) => {
        buttons.addEventListener('click', (event) => {
            const id = buttons.getAttribute('data-id');
            const title = buttons.getAttribute('data-title');
            const price = buttons.getAttribute('data-price');
            const image = buttons.getAttribute('data-image');
            const quantity= document.querySelector('#quantity');
            let basket = JSON.parse(localStorage.getItem('basket'));


            let _id = basket.find(item => item.id === id);

if (_id === undefined) {
    let item = {
        id,
        count: 1,
        image,
        title,
        price
    };
    basket.push(item);
} else {
    _id.count++;
}

// Calculate subtotal for the specific item with the provided id
let sub = 0;
let total =0



  basket.forEach(element=>{
   
   
        sub= +element.price*+element.count;
    total+=sub;
    quantity.innerHTML=`($ ${total})`;
  
     

   
  })
  quantity.innerHTML=`($ ${total})`;
 
  



            localStorage.setItem('basket', JSON.stringify(basket));


        });
    });
}).catch(function (error) {
    console.error("Datalarda Xeta var:", error);
});


document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById("sidebar");
    const sidebox = document.getElementById("sidebox");
    const sidebarclose = document.getElementById("sidebarclose");

    const searchIcon = document.getElementById("searchIcon");
    const searchBox = document.getElementById("searchlink");
    const basketCard= ()=>{
        const basket = JSON.stringify(localStorage.getItem('basket'));
       
         
         if(Array.isArray(basket))
        basket.forEach(element=>{
        
            if(basket!=0){
               
            }
            else if (basket==0){
                let template=``
            }
        })
        }
        basketCard();
    function toggleSearchBox() {
        if (searchBox.style.opacity === '1') {
            searchBox.style.opacity = '0';
        } else {
            searchBox.style.opacity = '1';
        }
    }


    sidebar.addEventListener('click', function () {
        sidebox.style.left = '0';
    });
    sidebarclose.addEventListener('click', function () {
        sidebox.style.left = '100%';
    });

    searchIcon.addEventListener('click', toggleSearchBox);
});



