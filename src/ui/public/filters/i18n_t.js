import { uiModules } from 'ui/modules';
const module = uiModules.get('kibana');

module.filter('i18nT', function ($translate) {
  let cache = new Map();
  return function (content, namespace = '', ...args) {
    if (!content) {
      return '';
    }

    let tContentWithNamespace = `${namespace}.${content}`;
    let tTranslateKey = cache.get(tContentWithNamespace);

    if (!tTranslateKey) {
      tTranslateKey = tContentWithNamespace.replace(/\s+/g, '').toUpperCase();
      cache.set(tContentWithNamespace, tTranslateKey);
    }

    let translatedContent = $translate.instant(tTranslateKey, ...args);

    if (translatedContent === tTranslateKey) {
      return content;
    }

    return translatedContent;
  }
});