import {
  UIManager,
  LayoutAnimation,
  Platform,
} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import Toast from 'react-native-root-toast';
import { appIcons, appImages } from '../utilities';
import { uploadGalleryImages } from '../utils/utility';
import { calculateTotalPayments } from '../functions';
export const handleAnimation = () => {
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
};
export const checkExpiry = () => {
  var d1 = Date.parse('2012-11-01');
  var d2 = Date.parse('2012-11-04');
  var expiryDate = Date.parse('2020-12-18');
  var currentDate = Date.now();
  if (expiryDate < currentDate) {
    return true;
  } else {
    return false;
  }
};
export const compareDate = () => {
  var date1 = new Date('December 25, 2017 01:30:00');
  var date2 = new Date('June 18, 2016 02:30:00');
  //best to use .getTime() to compare dates
  //if (date1.getTime() === date2.getTime()) {
  //same date
  //}

  if (date1.getTime() > date2.getTime()) {
    return true;
  } else {
    return false;
  }
};

// Searching
export const SearchMembers = (forSearch, searchText) => {
  let membersSearch = forSearch?.filter(function (item) {
    const item_data =
      ` ${item?.autherUser?.username} ${item?.description}`.toUpperCase();
    const text_data = searchText.toUpperCase();
    return item_data.indexOf(text_data) > -1;
  });
  return membersSearch;
};

// share
export const share = (message, title, url, icon) => {
  const options = Platform.select({
    ios: {
      activityItemSources: [
        {
          // For sharing url with custom title.
          placeholderItem: { type: 'url', content: url },
          item: {
            default: { type: 'url', content: url },
          },
          subject: {
            default: title,
          },
          linkMetadata: { originalUrl: url, url, title },
        },
        {
          // For sharing text.
          placeholderItem: { type: 'text', content: message },
          item: {
            default: { type: 'text', content: message },
            message: null, // Specify no text to share via Messages app.
          },
          linkMetadata: {
            // For showing app icon on share preview.
            title: message,
          },
        },
        {
          // For using custom icon instead of default text icon at share preview when sharing with message.
          placeholderItem: {
            type: 'url',
            content: icon,
          },
          item: {
            default: {
              type: 'text',
              content: `${message} ${url}`,
            },
          },
          linkMetadata: {
            title: message,
            icon: icon,
          },
        },
      ],
    },
    default: {
      title,
      subject: title,
      message: `${message} ${url}`,
    },
  });
  return options;
};

// select language
export const selectedLanguage = (item) => {
  let language = null;
  switch (item) {
    case 'English':
      language = 'ENG';
      break;
    case 'Español':
      language = 'SPA';
      break;
    case 'Français':
      language = 'FR';
      break;
    case 'Italiano':
      language = 'IT';
      break;
    case 'Português':
      language = 'PT';
      break;
    case 'Русский':
      language = 'RUS';
      break;
    case 'Deutsch':
      language = 'DE';
      break;
    case 'Dutch':
      language = 'DUT';
      break;
    case '國語':
      language = 'CHN';
      break;
  }
  return language
}

// select Currency
export const selectedCurrency = (item) => {
  let currency = null;
  switch (item) {
    case 'US Dollar':
      currency = 'USD';
      break;
    case 'British Pound Sterling':
      currency = 'GBP';
      break;
    case 'Brazilian Real':
      currency = 'BRL';
      break;
    case 'Russian Ruble':
      currency = 'RUB';
      break;
    case 'Nederlands':
      currency = 'Dutch';
      break;
    case 'Euro':
      currency = 'EUR';
      break;
    case 'Chinese Yuan Renminbi':
      currency = 'CNY';
      break;
    case 'Argentine Peso':
      currency = 'ARS';
      break;
    case 'Bolivian Boliviano':
      currency = 'BOB';
      break;
    case 'Chilean Peso':
      currency = 'CLP';
      break;
    case 'Colombian Peso':
      currency = 'COP';
      break;
    case 'Costa Rican Colon':
      currency = 'CRC';
      break;
    case 'Cuban Peso':
      currency = 'CUP';
      break;
    case 'Cuban Convertible Peso':
      currency = 'CUC';
      break;
    case 'Dominican Peso':
      currency = 'DOP';
      break;
    case 'Central African CFA Franc':
      currency = 'XAF';
      break;
    case 'Guatemalan Quetzal':
      currency = 'GTQ';
      break;
    case 'Honduran Lempira':
      currency = 'HNL';
      break;
    case 'Mexican Peso':
      currency = 'MXN';
      break;
    case 'Nicaraguan Cordoba':
      currency = 'NIO';
      break;
    case 'Panamanian Balboa':
      currency = 'PAB';
      break;
    case 'Paraguayan Guarani':
      currency = 'PYG';
      break;
    case 'Peruvian Sol':
      currency = 'PEN';
      break;
    case 'Uruguayan Peso':
      currency = 'UYU';
      break;
    case 'Venezuelan Bolivar Soberano':
      currency = 'VES';
      break;
  }
  return currency
}

// select Currency Symbol
export const selectedCurrencySymbol = (item) => {
  let currency = null;
  switch (item) {
    case 'US Dollar':
      currency = '$';
      break;
    case 'British Pound Sterling':
      currency = '£';
      break;
    case 'Brazilian Real':
      currency = 'R$';
      break;
    case 'Russian Ruble':
      currency = '₽';
      break;
    case 'Nederlands':
      currency = 'Dutch';
      break;
    case 'Euro':
      currency = '€';
      break;
    case 'Chinese Yuan Renminbi':
      currency = '¥';
      break;
    case 'Argentine Peso':
      currency = '$';
      break;
    case 'Bolivian Boliviano':
      currency = 'Bs.';
      break;
    case 'Chilean Peso':
      currency = '$';
      break;
    case 'Colombian Peso':
      currency = '$';
      break;
    case 'Costa Rican Colon':
      currency = '₡';
      break;
    case 'Cuban Peso':
      currency = '$';
      break;
    case 'Cuban Convertible Peso':
      currency = '$';
      break;
    case 'Dominican Peso':
      currency = '$';
      break;
    case 'Central African CFA Franc':
      currency = 'XAF';
      break;
    case 'Guatemalan Quetzal':
      currency = 'Q';
      break;
    case 'Honduran Lempira':
      currency = 'L';
      break;
    case 'Mexican Peso':
      currency = '$';
      break;
    case 'Nicaraguan Cordoba':
      currency = 'C$';
      break;
    case 'Panamanian Balboa':
      currency = ' B/.';
      break;
    case 'Paraguayan Guarani':
      currency = '₲';
      break;
    case 'Peruvian Sol':
      currency = 'S/';
      break;
    case 'Uruguayan Peso':
      currency = '$';
      break;
    case 'Venezuelan Bolivar Soberano':
      currency = 'Bs.S.';
      break;
  }
  return currency
}

// Image Picker
export const imagePicker = (setIsLoading_image, setimage_url) => {
  ImageCropPicker.openPicker({
    width: 300,
    height: 400,
    compressImageMaxHeight: 400,
    compressImageMaxWidth: 300,
    // cropping: true
  }).then(image => {
    setIsLoading_image(true);
    let filename = image.path.substring(image.path.lastIndexOf('/') + 1)
    setimage_url(image?.path)
    setIsLoading_image(false)
    // save_uri(image?.path, filename); //will be used later
  });
  // Function used in image picker
  const save_uri = (uri, name) => {
    uploadGalleryImages(uri, name, 'ProfilePictures')
      .then(url => {
        setimage_url(url);
        setIsLoading_image(false);
        Toast.show('Image selected');
        // save_btn_press(url ? url : profile);
      })
      .catch(err => alert(err));
  };
};

// Select expense image in expense category screen
export const expenseImage = item => {
  let source = null;
  switch (item) {
    case 'Housing':
      source = appImages.housing;
      break;
    case 'Groceries':
      source = appImages.groceries;
      break;
    case 'Transportation':
      source = appImages.transport;
      break;
    case 'TV/Internet':
      source = appImages.internet;
      break;
    case 'Personal Spending':
      source = appImages.personalSpending;
      break;
    case 'Medical & Health Care':
      source = appImages.medical;
      break;
    case 'Travel':
      source = appImages.travel;
      break;
    case 'Health & Fitness':
      source = appImages.fitness;
      break;
    case 'Vacation':
      source = appImages.vacation;
      break;
    case 'Utilities':
      source = appImages.utilities;
      break;
    case 'Loan Payment':
      source = appImages.loan;
      break;
    case 'Home Repairs':
      source = appImages.homeRepair;
      break;
    case 'Auto Service':
      source = appImages.service;
      break;
    case 'Dining Out':
      source = appImages.dining;
      break;
    case 'Home Supplies':
      source = appImages.supplies;
      break;
    case 'Charity':
      source = appImages.charity;
      break;
    case 'Education':
      source = appImages.education;
      break;
    case 'Pet Expense':
      source = appImages.petExpense;
      break;
    case 'Child Expense':
      source = appImages.childExpense;
      break;
    case 'Fuel':
      source = appImages.fuel;
      break;
    case 'Phone':
      source = appImages.phone;
      break;
    case 'Clothing':
      source = appImages.clothing;
      break;
    case 'Gift':
      source = appImages.gift;
      break;
    case 'Entertainment':
      source = appImages.entertainment;
      break;
    case 'Taxes':
      source = appImages.taxes;
      break;
    case 'Miscellaneous':
      source = appImages.miscellaneous;
      break;
    default:
      source = null;
      break;
  }
  return source;
};

function gaussian(mean, variance) {
  return {
    ppf: function (q) {
      return mean + Math.sqrt(2 * variance) * this.erfinv(2 * q - 1);
    },
    erfinv: function (x) {
      const a1 = 0.886226899;
      const a2 = 0.127410799;
      const a3 = 0.022235277;
      const a4 = 0.004773392;
      const a5 = 0.001660169;
      const a6 = 0.000260572;
      const a7 = 0.000023528;
      const sgn = (x < 0) ? -1 : 1;
      x = Math.abs(x);

      const t = 1.0 / (1.0 + a7 * x);
      const y =
        ((((((a6 * t + a5) * t + a4) * t + a3) * t + a2) * t + a1) * t) * t;

      return sgn * (1.0 - y * Math.exp(-x * x));
    }
  };
}

function weightedRandom(mean, variance) {
  var distribution = gaussian(mean, variance);
  // Take a random sample using inverse transform sampling method.
  return distribution.ppf(Math.random());
}

export function generateRandomGraphData(length) {
  return Array.from({ length }, (_, index) => ({
    date: new Date(new Date(2000, 0, 1).getTime() + 1000 * 60 * 60 * 24 * index),
    value: weightedRandom(10, Math.pow(index + 1, 2)),
  }));
}
