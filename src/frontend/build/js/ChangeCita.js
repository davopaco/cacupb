import ChangeCitaModel from './model/ChangeCitaModel.js';
import ChangeCitaView from './view/ChangeCitaView.js';
import ChangeCitaController from './controller/ChangeCitaController.js';
const controller = new ChangeCitaController(new ChangeCitaView(), new ChangeCitaModel());
controller.start();
