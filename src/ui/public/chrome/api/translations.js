import _ from 'lodash';
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
   * 1. wrap custom translate function, can be used for react component
   * 2. use for translate content and with namespace
   *    eg translateId is 'NS.HELLO' can be
   *    a. t('hello', 'ns')
   *    b. t('hello', { replaceVar: 'foo', ns: 'ns' })
   *    c. t('ns.hello', '')
   * 3. if translated text equal to translateId, return input content 'hello'
   * @param {string} - translated string  
   */
  chrome.getReactTranslateFun = function ($translate) {
    let translate = function (key, data = {}, ...rest) {

      if (!key) {
        return '';
      }

      if (!_.isFunction($translate)) {
        $translate = function (key) {
          return key;
        };
      }

      let translateId = key;
      if (_.isString(data) || data.ns) {
        let ns = data.ns ? data.ns : data;
        translateId = `${ns}${ns ? '.' : ''}${key}`.replace(/\s+/g, '').toUpperCase();
        if (data.ns) {
          data = _.omit(data, 'ns');
        }
      }

      let translatedText = $translate(translateId, data, ...rest);

      if (internals.devMode && translatedText === translateId) {
        console.warn('May Not Translated TranslateId: %s', translateId);
        return key;
      }
      return translatedText;
    };

    translate.wrappedInApply = true;

    return translate;
  };
}
