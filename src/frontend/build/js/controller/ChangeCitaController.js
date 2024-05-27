var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class ChangeCitaController {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }
    start() {
        this.view.bindSubmit(this.handleFormSubmit.bind(this));
    }
    handleFormSubmit() {
        return __awaiter(this, void 0, void 0, function* () {
            const formData = this.view.getFormData();
            console.log('Form data:', formData);
            try {
                yield this.model.updateAppt(formData);
                alert('Cita modificada exitosamente');
                localStorage.clear();
                window.location.href = '/build/index.html';
            }
            catch (error) {
                console.error('Error al buscar la cita:', error);
            }
        });
    }
}
