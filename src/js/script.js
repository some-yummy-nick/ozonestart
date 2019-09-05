"use strict";

// start checkbox
const checkboxes = document.querySelectorAll(".filter-check_checkbox");

Array.prototype.forEach.call(checkboxes, function (element) {
    element.addEventListener("change", function () {
        if (element.checked) {
            element.nextElementSibling.classList.add("checked");
        } else {
            element.nextElementSibling.classList.remove("checked");
        }

    });
});

// end checkbox


//start basket
const btnCart = document.getElementById("cart");
const modalCart = document.querySelector(".cart");
const closeBtn = document.querySelector(".cart-close");

btnCart.addEventListener("click", function () {
    modalCart.style.display = "flex";
    document.body.style.overflow = "hidden";
})

closeBtn.addEventListener("click", function () {
    modalCart.style.display = "";
    document.body.style.overflow = "";

})
//end basket

// start work with items
const cards = document.querySelectorAll(".goods .card");
const cartWrapper = document.querySelector(".cart-wrapper");
const cartEmpty = document.getElementById("cart-empty");
const cartCount = document.querySelector(".counter");

Array.prototype.forEach.call(cards, function (card) {
    const btn = card.querySelector("button");

    btn.addEventListener("click", function () {
        const cardClone = card.cloneNode(true);
        cartWrapper.appendChild(cardClone);
        cartEmpty.remove();
        showData();
    })
});

function showData() {
    const cardsCart = cartWrapper.querySelectorAll(".card");
     cartCount.textContent = cardsCart.length;
}

// end work with items

