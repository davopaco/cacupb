var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class CancelCitaModel {
    constructor() {
        console.log('SearchCitaModel initialized');
    }
    deleteCita() {
        return __awaiter(this, void 0, void 0, function* () {
            const requestData = {
                identificacion: localStorage.getItem('id'),
            };
            try {
                const response = yield fetch('http://localhost:1802/v1.0/appt/deleteAppt/', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestData)
                });
                if (!response.ok) {
                    throw new Error('Error al eliminar la cita');
                }
                return yield response.json();
            }
            catch (error) {
                throw new Error('Error al eliminar la cita: ' + error.message);
            }
        });
    }
}
