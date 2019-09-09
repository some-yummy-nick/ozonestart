export default function toggleCheckbox() {
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
