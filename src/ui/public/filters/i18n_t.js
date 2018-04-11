import i18nWithNamespace from 'ui/utils/i18n_with_namespace';
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
 *    > {{ 'HELLO' | translate:{abc:123} }}
 *    > {{ 'hello' | i18nT:'':{abc:123} }}
 *    > {{ 'HELLO' | translate:{num:warnings.length}:'messageformat' }}
 *    > {{ 'hello' | i18nT:'':{num:warnings.length}:'messageformat' }}
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
    return i18nWithNamespace([key, namespace, data, ...rest], $translate.instant, $translate);
  };
});
