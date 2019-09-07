"use strict";

function toggleCheckbox() {
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
}

function toggleCart() {
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
}

function toggleCard() {
	const cards = document.querySelectorAll(".goods .card");
	const cartWrapper = document.querySelector(".cart-wrapper");
	const cartEmpty = document.getElementById("cart-empty");
	const cartCount = document.querySelector(".counter");

	Array.prototype.forEach.call(cards, function (card) {
		const btn = card.querySelector("button");

		btn.addEventListener("click", function () {
			const cardClone = card.cloneNode(true);
			cartWrapper.appendChild(cardClone);
			showData();
			const removeBtn = cardClone.querySelector(".btn");
			removeBtn.textContent = "Удалить из корзины";

			removeBtn.addEventListener("click", function () {
				cardClone.remove();
				showData();
			})
		})
	});

	function showData() {
		const cardsCart = cartWrapper.querySelectorAll(".card");
		const cardPrices = cartWrapper.querySelectorAll(".card-price");
		const cartTotal = document.querySelector(".cart-total span");

		let sum = 0;

		cartCount.textContent = cardsCart.length;
		Array.prototype.forEach.call(cardPrices, function (el) {
			const price = parseFloat(el.textContent);

			sum += price;
		});
		cartTotal.textContent = sum;
		cartEmpty.style.display = "";
		if (cardsCart.length) {
			cartEmpty.style.display = "none";
		}
	}

}

function actionPage() {
	const cards = document.querySelectorAll(".goods .card");
	const discountCheckbox = document.getElementById("discount-checkbox");
	const min = document.getElementById("min");
	const max = document.getElementById("max");
	const search = document.querySelector(".search-wrapper_input");
	const searchBtn = document.querySelector(".search-btn");

	function filter() {
		Array.prototype.forEach.call(cards, function (card) {
			const cardPrice = card.querySelector(".card-price");
			const price = parseFloat(cardPrice.textContent);
			const discount = card.querySelector(".card-sale");

			card.parentNode.style.display = "";
			if ((min.value && price <= min.value) || (max.value && price >= max.value)) {
				card.parentNode.style.display = "none";
			} else if (discountCheckbox.checked && !discount) {
				card.parentNode.style.display = "none";
			}
		});
	}

	discountCheckbox.addEventListener("change", filter)
	min.addEventListener("change", filter);
	max.addEventListener("change", filter);
	searchBtn.addEventListener("click", function () {
		const searchText = new RegExp(search.value.trim(), "i");

		Array.prototype.forEach.call(cards, function (card) {
			const title = card.querySelector(".card-title").textContent;

			card.parentNode.style.display = "";
			if (!searchText.test(title)) {
				card.parentNode.style.display = "none";
			}
		});
	})
}

toggleCheckbox()
toggleCart()
toggleCard()
actionPage()
