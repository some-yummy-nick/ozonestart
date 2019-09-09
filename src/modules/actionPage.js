import filter from "./filter";

export default  function actionPage() {
	const cards = document.querySelectorAll(".goods .card");
	const discountCheckbox = document.getElementById("discount-checkbox");
	const min = document.getElementById("min");
	const max = document.getElementById("max");
	const search = document.querySelector(".search-wrapper_input");
	const searchBtn = document.querySelector(".search-btn");

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
