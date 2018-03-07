require('jquery');
require('../node_modules/angular/angular');
require('../node_modules/angular-translate');
require('../node_modules/angular-translate/dist/angular-translate-interpolation-messageformat/angular-translate-interpolation-messageformat');
module.exports = window.angular;

require('../node_modules/angular-elastic/elastic');

require('ui/modules').get('kibana', ['monospaced.elastic', 'pascalprecht.translate']);
