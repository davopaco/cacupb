import CitaInterface from "./types/CitaInterface";

export default class CancelCitaModel {
  constructor() {
    console.log('SearchCitaModel initialized');
  }

  public async deleteCita(): Promise<CitaInterface> {
    const requestData = {
      identificacion: localStorage.getItem('id') as string,
    };

    try {
      const response = await fetch('http://localhost:1802/v1.0/appt/deleteAppt/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la cita');
      }

      return await response.json();
    } catch (error) {
        throw new Error('Error al eliminar la cita: ' + (error as Error).message);
    }
  }
}
