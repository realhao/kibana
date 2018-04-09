require('angular');
require('ui/angular-bootstrap');
var uiModules = require('ui/modules').uiModules;
var chrome = require('ui/chrome');

const configI18n = function($translateProvider) {
  var localLanguage = chrome.getLocalLanguage();
  $translateProvider
    .addInterpolation('$translateMessageFormatInterpolation')
    .translations(localLanguage, chrome.getTranslations())
    .preferredLanguage(localLanguage)
    // Enable escapes HTML in the values of the interpolation parameters
    // issue in https://angular-translate.github.io/docs/#/guide/19_security
    .useSanitizeValueStrategy('escapeParameters');
};

uiModules
  .get('react', ['pascalprecht.translate'])
  .config(configI18n);

var kibana = uiModules.get('kibana', ['ui.bootstrap', 'pascalprecht.translate']);
module.exports = kibana.config(function ($tooltipProvider) {
  $tooltipProvider.setTriggers({ 'mouseenter': 'mouseleave click' });
})
  .config(configI18n);
