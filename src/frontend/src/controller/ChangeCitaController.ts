import ChangeCitaModel from '../model/ChangeCitaModel';
import ChangeCitaView from '../view/ChangeCitaView';

export default class ChangeCitaController {
    constructor(
        private readonly view: ChangeCitaView,
        private readonly model: ChangeCitaModel
    ) { }

    public start(): void {
        this.view.bindSubmit(this.handleFormSubmit.bind(this));
    }

    private async handleFormSubmit(): Promise<void> {
        const formData = this.view.getFormData();
        console.log('Form data:', formData);
        try {
            await this.model.updateAppt(formData);
            alert('Cita modificada exitosamente');
            localStorage.clear();
            window.location.href = '/build/index.html';
        } catch (error) {
            console.error('Error al buscar la cita:', error);
        }
    }
}