import CreateCitaModel from './model/CreateCitaModel.js';
import CreateCitaView from './view/CreateCitaView.js';
import CreateCitaController from './controller/CreateCitaController.js';
const controller = new CreateCitaController(new CreateCitaView(), new CreateCitaModel());
controller.start();
