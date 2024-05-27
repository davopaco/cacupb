export default class CreateCitaView {

  // Método para obtener los datos del formulario
  public getFormData(): { [key: string]: any } {
    const form = document.querySelector('form');
    if (!form) {
      throw new Error('Form not found');
    }

    const formData = new FormData(form);
    const data: { [key: string]: any } = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });
    
    return data;
  }

  public bindSubmit(handler: () => void): void {
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