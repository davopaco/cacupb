export default class CancelCitaView {

    public bindSubmit(handler: () => void): void {
        const confirmation = document.querySelector('.button-group');
        if (!confirmation) {
            throw new Error('confirmation button not found');
        }

        const button = confirmation.querySelector('button');
        if (!button) {
            throw new Error('button not found');
        }

        button.addEventListener('click', (event) => {
            event.preventDefault();
            handler();
        });
    }

    // Método para mostrar la cita en la vista
    public showConfirmation(): void {
        const citaContainer = document.querySelector('.dynamic-cita');
        if (!citaContainer) {
            throw new Error('Cita container not found');
        }

        citaContainer.innerHTML = ""

        const dia = localStorage.getItem('dia');
        const mes = localStorage.getItem('mes');
        const anio = localStorage.getItem('anio');
        const hora = localStorage.getItem('hora');

        citaContainer.innerHTML += `
            <p class="section-description">Cita eliminada correctamente para el ${dia}/${mes}/${anio} a las ${hora}</p>

            <div class="button-group">
                <a href="index.html"><button type="submit" class="button">Menú Principal</button></a>
            </div>
        `;

    }
}
