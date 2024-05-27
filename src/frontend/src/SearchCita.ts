import SearchCitaController from './controller/SearchCitaController';
import SearchCitaView from './view/SearchCitaView';
import SearchCitaModel from './model/SearchCitaModel';

const controller = new SearchCitaController(new SearchCitaView(), new SearchCitaModel());
controller.start();