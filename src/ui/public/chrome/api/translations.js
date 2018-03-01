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
   * @return {Object} - Translations
   */
  chrome.getTranslations = function () {
    console.log(internals.translations);
    return internals.translations || {};
  };

  chrome.getReactTranslateFun = function ($translate) {
    let translate = function (key, data) {
      if (!_.isFunction($translate)) {
        $translate = function (key, data) {
          return key;
        };
      }

      let translatedText = $translate(key, data);

      if (internals.devMode && translatedText === key) {
        console.warn('May Not Translate Key: %s', key);
      }
      return translatedText;
    };

    translate.wrappedInApply = true;

    return translate;
  };
}
