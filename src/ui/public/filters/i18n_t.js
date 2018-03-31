import { uiModules } from 'ui/modules';
const module = uiModules.get('kibana');

/**
 * 1. translate content with namespace in a freindly way.
 *    eg translateId is 'NS.HELLO' can be used in
 *      a. t('hello', 'ns')
 *      b. t('hello', { replaceVar: 'foo', ns: 'ns' })
 *      c. t('ns.hello', '') // it seems not so good
 * 
 * 2. if translated text equal to translateId,
 *    return input content 'hello' witch users may like, not 'NS.HELLO'
 * 
 * 3. for completely compatibility with old translate filter
 *    if u don't want to write uppercase letter without namespace
 *    u need to add a empty string as namespace arg
 *    eg: t('hello') === $translate.instant('hello')
 *        t('hello', '') === $translate.instant('HELLO')
 * 
 * @param {string} - translated string  
 */
module.filter('i18nT', function ($translate) {
  let cache = new Map();

  return function (key, data = {}, ...rest) {

    if (!key) {
      return '';
    }

    let translateId = key;
    // namespace would only be added if it exits...
    if (_.isString(data) || data.ns) {
      let ns = data.ns ? data.ns : data;
      translateId = `${ns}${ns ? '.' : ''}${key}`.replace(/\s+/g, '').toUpperCase();
      if (data.ns) {
        data = _.omit(data, 'ns');
      }
    }

    let translatedText = $translate.instant(tTranslateKey, data, ...rest);

    if (internals.devMode && translatedText === translateId) {
      console.warn('May Not Translated TranslateId: %s', translateId);
      return key;
    }
    return translatedText;
  };

});
