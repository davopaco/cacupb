import CancelCitaController from './controller/CancelCitaController.js';
import CancelCitaView from './view/CancelCitaView.js';
import CancelCitaModel from './model/CancelCitaModel.js';
const controller = new CancelCitaController(new CancelCitaView(), new CancelCitaModel());
controller.start();
