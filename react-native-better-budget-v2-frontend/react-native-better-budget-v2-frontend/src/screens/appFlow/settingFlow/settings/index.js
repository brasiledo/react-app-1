import React, { useState } from 'react'
import { Headers, Modals, Wrappers } from '../../../../components'
import { SettingCard } from '../../../../components/staticComponents'
import { appIcons, appImages, routes, selectedCurrency, selectedLanguage, share } from '../../../../services'
import Share from 'react-native-share';
import { styles } from './styles'
import { logOut } from '../../../../services/utils/auth';
import { Currencies, Languages } from '../../../../services/dummyData';
import { height } from "react-native-dimension";
import Translate from '../../../../services/languageStrings/translate';

const Setting = ({ navigation }) => {
    // All useStates
    const [isModalLanguageVisible, setModalLanguageVisible] = useState(false);
    const [isModalCurrencyVisible, setModalCurrencyVisible] = useState(false);
    const [language, setLanguage] = useState('English');
    const [currency, setCurrency] = useState('US Dollar');

    //All Functions
    // log out function
    const onPressLogout = () => {
        logOut().then(() => {
            navigation.replace(routes.auth);
        });
    };

    // Tell a Friend 
    const title = 'Better Budget';
    const message = `Better Budget share this`;
    const url = 'https://google.com/';
    const icon = appImages.logo;
    const sharePost = () => {
        let options = share(message, title, url, icon);
        Share.open(options)
            .then(res => {
                console.log('res', res);
            })
            .catch(err => {
                console.log('error', err);
            });
    };

    return (
        <Wrappers.Wrapper style={styles.main}>
            <Headers.Main title={Translate('SettingScreen.Settings')} onBackPress={() => navigation.goBack()} />

            <SettingCard
                iconSource={appIcons.settingAccount}
                title={Translate('SettingScreen.Account')}
                userEmail={'user@betterbudget.com'}
                onPressCard={() => navigation.navigate(routes.profile)}
            />

            <SettingCard
                iconSource={appIcons.settingUpArrow}
                title={Translate('SettingScreen.Upgrade')}
                onPressCard={() => navigation.navigate(routes.upgrade)}
            />

            <SettingCard
                iconSource={appIcons.settingCurrency}
                title={Translate('Currency')}
                onPressCard={() => setModalCurrencyVisible(!isModalCurrencyVisible)}
                type={selectedCurrency(currency)}
            />
            <SettingCard
                iconSource={appIcons.settingLanguage}
                title={Translate('SettingScreen.Language')}
                type={selectedLanguage(language)}
                onPressCard={() => setModalLanguageVisible(!isModalLanguageVisible)}
            />
            <SettingCard
                iconSource={appIcons.settingFeedback}
                title={Translate('SettingScreen.giveFeedback')}
                onPressCard={() => navigation.navigate(routes.feedback)}
            />

            <SettingCard
                iconSource={appIcons.settingFriends}
                title={Translate('SettingScreen.tellFriend')}
                onPressCard={() => sharePost()}
            />

            <SettingCard
                iconName={'log-out'}
                title={Translate('SettingScreen.Logout')}
                onPressCard={() => onPressLogout()}
            />

            <Modals.BottomModal
                isVisible={isModalCurrencyVisible}
                toggleModal={() => setModalCurrencyVisible(!isModalCurrencyVisible)}
                OnSelectValue={() => setModalCurrencyVisible(!isModalCurrencyVisible)}
                Title={Translate('Currency')}
                Data={Currencies}
                setCurrency={setCurrency}
                currency={currency}
                modalHeight={{ top: height(20) }}
            />

            <Modals.BottomModal1
                isVisible={isModalLanguageVisible}
                toggleModal={() => setModalLanguageVisible(!isModalLanguageVisible)}
                OnSelectValue={() => setModalLanguageVisible(!isModalLanguageVisible)}
                Title={Translate('SettingScreen.Language')}
                Data={Languages}
                setFrequency={setLanguage}
                frequency={language}
            />

        </Wrappers.Wrapper>
    )
}

export default Setting;