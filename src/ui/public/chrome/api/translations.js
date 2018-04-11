import i18nWithNamespace from 'ui/utils/i18n_with_namespace';

// eslint-disable-next-line @elastic/kibana-custom/no-default-export
export default function (chrome, internals) {
  /**
   * ui/chrome Translations API
   *
   *   Translations
   *     Returns the translations which have been loaded by the Kibana server instance
   */

  /**
   * @return {string} - local language tag
   */
  chrome.getLocalLanguage = function () {
    return internals.localLanguage || 'en';
  };

  /**
   * @return {Object} - Translations
   */
  chrome.getTranslations = function () {
    return internals.translations || {};
  };

  /**
   * 1. wrap custom translate function, can be used in react component
   * 2. use for translate content and with namespace
   *    eg translateId is 'NS.HELLO' can be
   *    t('hello', 'ns', { replaceVar: 'foo' })
   * 3. if translated text equal to translateId, return input content 'hello'
   *
   * @param {string} - translated string  
   */
  chrome.getReactTranslateFun = function (translateFun) {
    let translate = function (key, namespace, data, ...rest) {
      return i18nWithNamespace([key, namespace, data, ...rest], translateFun);
    };

    translate.wrappedInApply = true;
    return translate;
  };
}
