export default class ChangeCitaView {
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
        const sectionTitle = document.querySelector('.section-title');
        if (!sectionTitle) {
            throw new Error('Section title not found');
        }
        const dia = localStorage.getItem('dia');
        const mes = localStorage.getItem('mes');
        const anio = localStorage.getItem('anio');
        const hora = localStorage.getItem('hora');
        sectionTitle.innerHTML += `
        <h2 class="section-heading">Cambia los detalles de tu cita</h2>
        <p class="section-description">Su cita actualmente está agendada el día ${dia}/${mes}/${anio} a las ${hora}</p>
          `;
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
