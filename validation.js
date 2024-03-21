export function resetValidation(nameElement, textElement) {
    nameElement.classList.remove("error");
    textElement.classList.remove("error");
}

export function highlightEmptyFields(nameElement, textElement) {
    if (!nameElement.value.trim()) {
        nameElement.classList.add("error");
    } else {
        nameElement.classList.remove("error");
    }
    if (!textElement.value.trim()) {
        textElement.classList.add("error");
    } else {
        textElement.classList.remove("error");
    }
}