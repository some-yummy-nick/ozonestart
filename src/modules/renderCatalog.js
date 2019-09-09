import filter from "./filter";

export default function renderCatalog() {
	const cards = document.querySelectorAll(".goods .card");
	const categories = new Set();
	const catalog = document.querySelector(".catalog");
	const catalogList = document.querySelector(".catalog-list");
	const catalogBtn = document.querySelector(".catalog-button");
	const filterTitle = document.querySelector(".filter-title h5");

	cards.forEach(card => {
		categories.add(card.dataset.category);
	});

	categories.forEach(category => {
		const li = document.createElement("li");

		li.textContent = category;
		catalogList.appendChild(li);
	});

	catalogBtn.addEventListener("click", (event) => {
		if (catalog.style.display) {
			catalog.style.display = "";
		} else {
			catalog.style.display = "block";
		}

		if (event.target.tagName === "LI") {
			cards.forEach(card => {
				const category = card.dataset.category;

				if (event.target.textContent !== category) {
					card.parentNode.style.display = "none";
				} else {
					card.parentNode.style.display = "block";
					event.target.classList.add("active");
					filterTitle.textContent = category;
				}
			});
			filter();
		}
	})
}
