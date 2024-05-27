import CancelCitaController from './controller/CancelCitaController';
import CancelCitaView from './view/CancelCitaView';
import CancelCitaModel from './model/CancelCitaModel';

const controller = new CancelCitaController(new CancelCitaView(), new CancelCitaModel());
controller.start();