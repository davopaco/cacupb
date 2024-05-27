import CreateCitaModel from '../model/CreateCitaModel'
import CreateCitaView from '../view/CreateCitaView'

export default class CreateCitaController {
  constructor (
    private readonly view: CreateCitaView,
    private readonly model: CreateCitaModel) {
    console.log(this.model);
  }

  public start(): void {
    this.view.bindSubmit(this.handleFormSubmit.bind(this));
  }

  private async handleFormSubmit(): Promise<void> {
    const formData = this.view.getFormData();
    console.log('Form data:', formData);

    try {
      await this.model.createCustomer(formData);
      await this.model.createAppt(formData);
      alert('Cita creada exitosamente');
      window.location.href = '/build/index.html';
    } catch (error) {
      console.error('Error al crear la cita:', error);
      alert('Hubo un error al crear la cita. Por favor, inténtelo de nuevo.');
    }
  }
}