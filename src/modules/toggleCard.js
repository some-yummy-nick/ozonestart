export default function toggleCard() {
	const cards = document.querySelectorAll(".goods .card");
	const cartWrapper = document.querySelector(".cart-wrapper");
	const cartEmpty = document.getElementById("cart-empty");
	const cartCount = document.querySelector(".counter");

	cards.forEach(card => {
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
		cardPrices.forEach(el => {
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
