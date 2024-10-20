import React, { useEffect, useState } from 'react'
import { Headers, Modals, Wrappers } from '../../../../components'
import { SettingCard } from '../../../../components/staticComponents'
import { appIcons, appImages, routes, selectedLanguage, share } from '../../../../services'
import Share from 'react-native-share';
import { styles } from './styles'
import { logOut } from '../../../../services/utils/auth';
import { Currencies, Languages } from '../../../../services/dummyData';
import { height } from "react-native-dimension";
import Translate from '../../../../services/languageStrings/translate';
import { useDispatch, useSelector } from 'react-redux';
import { Users } from '../../../../Redux/actions/Auth';
import { saveData } from '../../../../services/utils/utility';
import { setAppLanguage } from '../../../../services/utils/helperFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DevSettings } from 'react-native';
import Toast from 'react-native-root-toast';

const Setting = ({ navigation }) => {
    const dispatch = useDispatch()
    // Redux Data
    const user_redux = useSelector(state => state?.Auth?.user)

    // All useStates
    const [isModalLanguageVisible, setModalLanguageVisible] = useState(false);
    const [isModalCurrencyVisible, setModalCurrencyVisible] = useState(false);
    const [language, setLanguage] = useState('English');
    const [currency, setCurrency] = useState('US Dollar');
    const [user, setUser] = useState(user_redux ?? {});

    //All Functions
    // log out function
    const onPressLogout = () => {
        user.firstTimeLogin = false
        dispatch(Users(user))
        saveData('Users', user?.userId, { firstTimeLogin: false })

        logOut().then(() => {
            navigation.replace(routes.auth);
        });
    };

    // Tell a Friend 
    const title = 'Check out this amazing budgeting app!';
    const message = 'I found a great budgeting app that can help you manage your finances effectively. Give it a try!';
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

    // onSelectLanguage
    const onSelectLanguage = async(lang)=> {
        try {
            setAppLanguage(lang)
            await AsyncStorage.setItem('LANGUAGE', lang)
            setModalLanguageVisible(!isModalLanguageVisible)
            DevSettings.reload()
        } catch (error) {
            Toast.show(error?.message)
        }
        
    }

    // getAppLanguage
    const getAppLanguage = async () => {
        let appLang = await AsyncStorage.getItem('LANGUAGE')
        setLanguage(appLang?? 'English')
    }

    //All useEffects
    useEffect(() => {
        setUser(user_redux ?? {})
        getAppLanguage()
    }, [user_redux])

    return (
        <Wrappers.Wrapper style={styles.main}>
            <Headers.Main title={Translate('SettingScreen.Settings')} onBackPress={() => navigation.goBack()} tooltipStatus={false} />

            <SettingCard
                iconSource={appIcons.settingAccount}
                title={Translate('SettingScreen.Account')}
                userEmail={user?.email}
                onPressCard={() => navigation.navigate(routes.profile)}
            />

            <SettingCard
                iconSource={appIcons.settingUpArrow}
                title={Translate('SettingScreen.Upgrade')}
                onPressCard={() => navigation.navigate(routes.upgrade)}
            />

            {/* <SettingCard
                iconSource={appIcons.settingCurrency}
                title={Translate('Currency')}
                onPressCard={() => setModalCurrencyVisible(!isModalCurrencyVisible)}
                type={selectedCurrency(currency)}
            /> */}
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
                OnSelectValue={(v) => onSelectLanguage(v)}
                Title={Translate('SettingScreen.Language')}
                Data={Languages}
                setFrequency={setLanguage}
                frequency={language}
            />

        </Wrappers.Wrapper>
    )
}

export default Setting;