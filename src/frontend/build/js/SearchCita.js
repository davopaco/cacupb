import SearchCitaController from './controller/SearchCitaController.js';
import SearchCitaView from './view/SearchCitaView.js';
import SearchCitaModel from './model/SearchCitaModel.js';
const controller = new SearchCitaController(new SearchCitaView(), new SearchCitaModel());
controller.start();
