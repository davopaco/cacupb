export default class CreateCitaView {
    // Método para obtener los datos del formulario
    getFormData() {
        const form = document.querySelector('form');
        if (!form) {
            throw new Error('Form not found');
        }
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        return data;
    }
    bindSubmit(handler) {
        const button = document.querySelector('.button-container button');
        if (!button) {
            throw new Error('Submit button not found');
        }
        button.addEventListener('click', (event) => {
            event.preventDefault();
            handler();
        });
    }
}
