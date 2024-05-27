import CitaInterface from "../model/types/CitaInterface";

export default class SearchCitaView {

    // Método para obtener los datos del formulario
    public getFormData(): { identificacion: string } {
        const input = document.querySelector('#identificacion') as HTMLInputElement;
        if (!input) {
            throw new Error('Input field not found');
        }
        const identificacion = input.value.trim();
        return { identificacion };
    }

    public bindSubmit(handler: (data: { identificacion: string }) => void): void {
        const form = document.querySelector('form');
        if (!form) {
            throw new Error('Form not found');
        }

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = this.getFormData();
            localStorage.clear();
            localStorage.setItem('id', formData.identificacion);
            handler(formData);
        });
    }

    // Método para mostrar la cita en la vista
    public showCita(cita: CitaInterface): void {
        const citaContainer = document.querySelector('.dynamic-cita');
        if (!citaContainer) {
            throw new Error('Cita container not found');
        }
        citaContainer.innerHTML = ""
        cita.appt.forEach((element: CitaInterface) => {
            const fecha = new Date(element.fecha);
            const dia = fecha.getDate();
            const mes = fecha.getMonth() + 1;
            const anio = fecha.getFullYear();

            localStorage.setItem('dia', dia.toString());
            localStorage.setItem('mes', mes.toString());
            localStorage.setItem('anio', anio.toString());
            localStorage.setItem('hora', element.hora);

            citaContainer.innerHTML += `
          <p class="section-description">Cita encontrada el día ${dia}/${mes}/${anio} a las ${element.hora}</p>

          <div class="button-group">
              <a href="cambiar.html"><button type="submit" class="button">Cambiar</button></a>
              <a href="cancelar.html"><button type="submit" class="button">Cancelar</button></a>
          </div>
        `;
        })
    }

    // Método para mostrar un mensaje de error en la vista
    public showError(): void {
        const citaContainer = document.querySelector('#dynamic-cita');
        if (!citaContainer) {
            throw new Error('Cita container not found');
        }
        citaContainer.innerHTML = ""
        citaContainer.innerHTML += `
          <p class="section-description">No se ha encontrado una cita para el documento ingresado.</p>
        `;
    }

}
