require('angular');
require('ui/angular-bootstrap');
var uiModules = require('ui/modules').uiModules;
var chrome = require('ui/chrome');

const configI18n = $translateProvider => {
  $translateProvider.translations('default', chrome.getTranslations());
  $translateProvider.preferredLanguage('default');
  // $translateProvider.useMessageFormatInterpolation();
  // Enable escaping of HTML
  // issue in https://angular-translate.github.io/docs/#/guide/19_security
  $translateProvider.useSanitizeValueStrategy('escape');
};

uiModules
  .get('react', ['pascalprecht.translate'])
  .config(configI18n);

var kibana = uiModules.get('kibana', ['ui.bootstrap', 'pascalprecht.translate']);
// console.log('ui-bootstrap')
module.exports = kibana.config(function ($tooltipProvider) {
  $tooltipProvider.setTriggers({ 'mouseenter': 'mouseleave click' });
})
  .config(configI18n);
