import SearchCitaModel from '../model/SearchCitaModel';
import SearchCitaView from '../view/SearchCitaView';

export default class SearchCitaController {
    constructor(
        private readonly view: SearchCitaView,
        private readonly model: SearchCitaModel
    ) { }

    public start(): void {
        this.view.bindSubmit(this.handleFormSubmit.bind(this));
    }

    private async handleFormSubmit(data: { identificacion: string }): Promise<void> {
        try {
            const cita = await this.model.searchCita(data.identificacion);
            console.log('Cita encontrada:', cita);
            this.view.showCita(cita);
        } catch (error) {
            console.error('Error al buscar la cita:', error);
            this.view.showError();
        }
    }
}
