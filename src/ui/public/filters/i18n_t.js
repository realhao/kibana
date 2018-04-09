import _ from 'lodash';
import { metadata } from 'ui/metadata';
import { uiModules } from 'ui/modules';
const module = uiModules.get('kibana');

/**
 * 1. translate content with namespace in a friendly way.
 *    eg translateId is 'NS.HELLO' can be used in
 *       {{ 'hello' | i18nT:'ns' }}
 * 
 * 2. if translated text equal to translateId,
 *    return input content 'hello' witch users may want, not 'NS.HELLO'
 * 
 * 3. a difference between i18nT and translate filter
 *    the second parameter in i18nT is taken as a namespace
 *    in translate is taken as interpolate params
 *    {{ 'hello' | i18nT::{abc:123} }} === {{ 'HELLO' | translate:{abc:123} }}
 * 
 * translate filter
 * https://github.com/angular-translate/angular-translate/blob/2.13.1/src/filter/translate.js
 * $translate.instant
 * https://github.com/angular-translate/angular-translate/blob/2.13.1/src/service/translate.js
 *
 * @param {string} - translated string  
 */
module.filter('i18nT', function ($translate) {
  return function (key, namespace = null, data = null, ...rest) {

    if (!key) {
      return '';
    }

    let translateId = key;
    // namespace would only be added if it exits...
    if (_.isString(key) && _.isString(namespace)) {
      translateId = `${namespace}${namespace ? '.' : ''}${key}`.replace(/\s+/g, '').toUpperCase();
    }

    let translatedText = $translate.instant(translateId, data, ...rest);

    if (metadata.devMode && translatedText === translateId) {
      console.warn('May Not Translated TranslateId: %s', translateId);
      return key;
    }
    return translatedText;
  };

});
