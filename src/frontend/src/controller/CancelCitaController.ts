import CancelCitaModel from '../model/CancelCitaModel';
import CancelCitaView from '../view/CancelCitaView';

export default class CancelCitaController {
    constructor(
        private readonly view: CancelCitaView,
        private readonly model: CancelCitaModel
    ) { }

    public start(): void {
        this.view.bindSubmit(this.handleFormSubmit.bind(this));
    }

    private async handleFormSubmit(): Promise<void> {
        try {
            await this.model.deleteCita();
            this.view.showConfirmation();
            localStorage.clear();
        } catch (error) {
            console.error('Error al eliminar la cita:', error);

        }
    }
}
