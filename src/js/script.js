"use strict";

function toggleCheckbox() {
	const checkboxes = document.querySelectorAll(".filter-check_checkbox");

	checkboxes.forEach(element => {
		element.addEventListener("change", () => {
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

	btnCart.addEventListener("click", () => {
		modalCart.style.display = "flex";
		document.body.style.overflow = "hidden";
	});

	closeBtn.addEventListener("click", () => {
		modalCart.style.display = "";
		document.body.style.overflow = "";

	});
}

function toggleCard() {
	const cards = document.querySelectorAll(".goods .card");
	const cartWrapper = document.querySelector(".cart-wrapper");
	const cartEmpty = document.getElementById("cart-empty");
	const cartCount = document.querySelector(".counter");

	cards.forEach( card => {
		const btn = card.querySelector("button");

		btn.addEventListener("click", () => {
			const cardClone = card.cloneNode(true);
			cartWrapper.appendChild(cardClone);
			showData();
			const removeBtn = cardClone.querySelector(".btn");
			removeBtn.textContent = "Удалить из корзины";

			removeBtn.addEventListener("click", () => {
				cardClone.remove();
				showData();
			});
		});
	});

	function showData() {
		const cardsCart = cartWrapper.querySelectorAll(".card");
		const cardPrices = cartWrapper.querySelectorAll(".card-price");
		const cartTotal = document.querySelector(".cart-total span");

		let sum = 0;

		cartCount.textContent = cardsCart.length;
		cardPrices.forEach( el => {
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
		cards.forEach(card => {
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

	discountCheckbox.addEventListener("change", filter);
	min.addEventListener("change", filter);
	max.addEventListener("change", filter);
	searchBtn.addEventListener("click", function () {
		const searchText = new RegExp(search.value.trim(), "i");

		cards.forEach(card => {
			const title = card.querySelector(".card-title").textContent;

			card.parentNode.style.display = "";
			if (!searchText.test(title)) {
				card.parentNode.style.display = "none";
			}
		});
	});
}

function getData() {
	const goods = document.querySelector(".goods");
	return fetch("../../db/db.json")
		.then(response => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error(`Данные не были получены. Ошибка: ${response.status}`);
			}
		})
		.then(data => {
			return data;
		})
		.catch(err => goods.textContent = err);
}

function renderCards(data) {
	const goods = document.querySelector(".goods");
	data.goods.forEach(item => {
		const card = document.createElement("div");
		card.className = "col-12 col-md-6 col-lg-4 col-xl-3";
		card.innerHTML = `<div class="card">
								${item.sale ? '<div class="card-sale">🔥Hot Sale🔥</div>' : ''} 
                                <div class="card-img-wrapper">
										<span class="card-img-top"
                                              style="background-image: url(${item.img})"></span>
                                </div>
                                <div class="card-body justify-content-between">
                                    <div class="card-price">${item.price} ₽</div>
                                    <h5 class="card-title">${item.title}</h5>
                                    <button class="btn btn-primary">В корзину</button>
                                </div>
                            </div>
`;
		goods.appendChild(card);
	});
}

getData().then(data => {
	renderCards(data);
	toggleCheckbox();
	toggleCart();
	toggleCard();
	actionPage();
});

