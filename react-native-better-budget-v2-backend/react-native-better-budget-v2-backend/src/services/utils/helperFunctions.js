import i18n, { translate } from "i18n-js";
import moment from "moment";
import Translate from "../languageStrings/translate";

export const convert_numbers = x => {
  return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const remove_commas = x => {
  // return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, '');
  return x?.toString()?.replace(/[, ]+/g, "").trim()
};

// this function calls for semi-monthly dates in calendar
export const getDisabledDates = (year, month, lastDayOfMonth) => {
  const date = new Date(year, month, 1);
  const dates = [];
  while (date.getMonth() === month) {
    if (date.getDate() === 1 || date.getDate() === 15 || date.getDate() === 16 || date.getDate() === lastDayOfMonth) {
      date.setDate(date.getDate() + 1);
    }
    else {
      const date_string = new Date(date)
      const moment_date = moment(date_string).format('YYYY-MM-DD')
      dates.push(moment_date);
      date.setDate(date.getDate() + 1);
    }
  }
  return dates;
}

export const handleCheckPassword = value => {
  const isNonWhiteSpace = /^\S*$/;
  if (!isNonWhiteSpace.test(value)) {
    return Translate('SignUpScreen.passwordErrorSpace');
  }

  const isContainsUppercase = (/[A-Z]/)
  // const isContainsUppercase = /^(?=.[A-Z]).$/;
  if (!isContainsUppercase.test(value)) {
    return Translate('SignUpScreen.passwordErrorUppercase');
  }

  const isContainsLowercase = (/[a-z]/);
  // const isContainsLowercase = (/^(?=.[a-z]).$/);
  if (!isContainsLowercase.test(value)) {
    return Translate('SignUpScreen.passwordErrorLowercase');
  }

  const isContainsNumber = (/[0-9]/);
  // const isContainsNumber = /^(?=.[0-9]).$/;
  if (!isContainsNumber.test(value)) {
    return Translate('SignUpScreen.passwordErrorDigit');
  }

  return true;
};

const translationGetters = {
  en: () => require('../languageStrings/english.json'),
  es: () => require('../languageStrings/espanol.json'),
  fr: () => require('../languageStrings/francais.json'),
  it: () => require('../languageStrings/italiano.json'),
  pt: () => require('../languageStrings/portugues.json'),
  ru: () => require('../languageStrings/pусский.json'),
  de: () => require('../languageStrings/deutsch.json'),
  nl: () => require('../languageStrings/dutch.json'),
  zh: () => require('../languageStrings/國語.json'),
};

export const setI18nConfig = (lang) => {
  const fallback = { languageTag: lang };
  const { languageTag } = fallback
  // translate.cache.clear()
  i18n.translations = { [languageTag]: translationGetters[languageTag]() }
  i18n.locale = languageTag
}


export const setAppLanguage= (lang) => {
  switch (lang) {
    case 'English':
        setI18nConfig('en')
        break;
    case 'Español':
        setI18nConfig('es')
        break;
    case 'Français':
        setI18nConfig('fr')
        break;
    case 'Italiano':
        setI18nConfig('it')
        break;
    case 'Português':
        setI18nConfig('pt')
        break;
    case 'Русский':
        setI18nConfig('ru')
        break;
    case 'Deutsch':
        setI18nConfig('de')
        break;
    case 'Dutch':
        setI18nConfig('nl')
        break;
    case '國語':
        setI18nConfig('zh')
        break;

    default:
        break;
}
}