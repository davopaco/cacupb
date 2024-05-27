import CitaInterface from "./types/CitaInterface";

export default class ChangeCitaModel {
  constructor() {
    console.log('SearchCitaModel initialized');
  }

  public async updateAppt(data: { [key: string]: any }): Promise<CitaInterface> {

    const requestData = {
      identificacion: localStorage.getItem('id'),
      tipo_cita: data.tipo_cita,
      fecha_cita: data.fecha,
      hora_cita: data.hora + ':00',
      lugar_cita: data.lugar
    };

    try {
      const response = await fetch('http://localhost:1802/v1.0/appt/updateAppt/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la cita');
      }

      return await response.json();
    } catch (error) {
        throw new Error('Error al actualizar la cita: ' + (error as Error).message);
    }
  }
}
