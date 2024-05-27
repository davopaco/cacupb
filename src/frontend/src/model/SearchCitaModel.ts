import CitaInterface from "./types/CitaInterface";

export default class SearchCitaModel {
  constructor() {
    console.log('SearchCitaModel initialized');
  }

  public async searchCita(identificacion: string): Promise<CitaInterface> {
    const requestData = {
      id: identificacion,
    };

    try {
      const response = await fetch('http://localhost:1802/v1.0/appt/getAppt/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error('Error al buscar la cita');
      }

      return await response.json();
    } catch (error) {
        throw new Error('Error al buscar la cita: ' + (error as Error).message);
    }
  }
}
