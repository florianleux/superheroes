import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from '@/lang/en'
import fr from '@/lang/fr'

Vue.use(VueI18n);

export const fallBackLocale = "en";

//TODO Essyer de décomposer les json et les parser
let messages = {
  fr: fr,
  en: en
};

function getBrowserLocale() {
  
  const navigatorLocale =
    navigator.languages !== undefined
      ? navigator.languages[0]
      : navigator.language;
  
  if (!navigatorLocale) {
    return undefined;
  }
  
  const trimmedLocale = navigatorLocale.trim().split(/-|_/)[0];
  
  return trimmedLocale;
}

export default new VueI18n({
  locale: getBrowserLocale(),
  fallbackLocale: fallBackLocale,
  messages: messages // Associated language messages
});
