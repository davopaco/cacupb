var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class CreateCitaModel {
    constructor() {
        console.log('IndexModel');
    }
    createAppt(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                const requestData = {
                    identificacion: data.identificacion,
                    tipo_cita: data.tipo_cita,
                    fecha_cita: data.fecha,
                    hora_cita: data.hora + ':00',
                    lugar_cita: data.lugar
                };
                fetch('http://localhost:1802/v1.0/appt/createAppt/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestData)
                })
                    .then(response => response.json())
                    .then(data => resolve(data))
                    .catch(error => reject(new Error(error)));
            });
        });
    }
    createCustomer(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                console.log('Data ANTES DE FETCH:', data);
                const requestData = {
                    identificacion: data.identificacion,
                    nombres: data.nombres,
                    apellidos: data.apellidos,
                    direccion: data.direccion
                };
                fetch('http://localhost:1802/v1.0/appt/createCustomer/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify(requestData)
                })
                    .then(response => response.json())
                    .then(data => resolve(data))
                    .catch(error => reject(new Error(error)));
            });
        });
    }
}
