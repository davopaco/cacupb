import CreateCitaModel from './model/CreateCitaModel';
import CreateCitaView from './view/CreateCitaView';
import CreateCitaController from './controller/CreateCitaController';

const controller = new CreateCitaController(new CreateCitaView(), new CreateCitaModel());
controller.start();
