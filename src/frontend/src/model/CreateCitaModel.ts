import CitaInterface from "./types/CitaInterface";
import ClienteInterface from "./types/ClienteInterface";

export default class CreateCitaModel {
  constructor() {
    console.log('IndexModel');
  }

  public async createAppt(data: { [key: string]: any }): Promise<CitaInterface> {
    return await new Promise((resolve, reject) => {

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
  }

  public async createCustomer(data: { [key: string]: any }): Promise<ClienteInterface> {
    return await new Promise((resolve, reject) => {
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
  }
}
