export default function filter() {
	const cards = document.querySelectorAll(".goods .card");
	const discountCheckbox = document.getElementById("discount-checkbox");
	const min = document.getElementById("min");
	const max = document.getElementById("max");
	const activeCategory = document.querySelector(".catalog-list li.active");

	cards.forEach(card => {
		const cardPrice = card.querySelector(".card-price");
		const price = parseFloat(cardPrice.textContent);
		const discount = card.querySelector(".card-sale");
		const category = card.dataset.category;

		card.parentNode.style.display = "";
		if ((min.value && price <= min.value) || (max.value && price >= max.value)) {
			card.parentNode.style.display = "none";
		} else if (discountCheckbox.checked && !discount) {
			card.parentNode.style.display = "none";
		} else if (activeCategory && activeCategory.textContent !== category) {
			card.parentNode.style.display = "none";
		}
	});
}
