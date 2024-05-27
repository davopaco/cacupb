import ChangeCitaModel from './model/ChangeCitaModel';
import ChangeCitaView from './view/ChangeCitaView';
import ChangeCitaController from './controller/ChangeCitaController';

const controller = new ChangeCitaController(new ChangeCitaView(), new ChangeCitaModel());
controller.start();
