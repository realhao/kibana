import _ from 'lodash';
import { metadata } from 'ui/metadata';

export default function i18nWithNamespace(args, translateFun) {

    let [key, namespace, interpolateParams, ...rest] = args;

    if (!key) {
      return '';
    }

    if (!_.isFunction(translateFun)) {
      translateFun = function (key) {
        return key;
      };
    }

    let translateId = key;
    // namespace would only be added if it exits...
    if (_.isString(key) && _.isString(namespace)) {
      translateId = `${namespace}${namespace ? '.' : ''}${key}`.replace(/\s+/g, '').toUpperCase();
    }

    // translateFun === $translate.instant
    let translatedText = translateFun(translateId, interpolateParams, ...rest);

    if (metadata.devMode && translatedText === translateId) {
      console.warn('May Not Translated TranslateId: %s', translateId);
      return key;
    }
    return translatedText;

}
