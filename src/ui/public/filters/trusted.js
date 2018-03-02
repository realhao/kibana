import { uiModules } from 'ui/modules';
uiModules
  .get('kibana')
  .filter('trusted', ['$sce', function ($sce) {
    const div = document.createElement('div');
    return function (text) {
      div.innerHTML = text;
      return $sce.trustAsHtml(div.textContent);
    };
  }]);
