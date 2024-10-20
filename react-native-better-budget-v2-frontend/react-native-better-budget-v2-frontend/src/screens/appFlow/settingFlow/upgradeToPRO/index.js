import React from 'react'
import { Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { Headers, ScrollViews, Spacers, Texts, Wrappers } from '../../../../components';
import { UpgradedView } from '../../../../components/staticComponents';
import { appImages } from '../../../../services';
import { styles } from './styles';
import Translate from '../../../../services/languageStrings/translate';

const Upgrade = ({ navigation }) => {

    return (
        <Wrappers.Wrapper style={styles.main}>
            <Headers.Main title={Translate('SettingScreen.Upgrade')} onBackPress={() => navigation.goBack()} />
            <Spacers.Base />

            <ScrollViews.KeyboardAvoiding>
                <Wrappers.Component>
                    <Image
                        source={appImages.upgradeImg}
                        resizeMode="contain"
                        style={styles.mainImg}
                    />

                    <Texts.SmallText style={styles.title}>{Translate('UpgradeScreen.Title')}</Texts.SmallText>
                    <Spacers.Base />

                    {[Translate('UpgradeScreen.upgradepoint1'), Translate('UpgradeScreen.upgradepoint2'), Translate('UpgradeScreen.upgradepoint3'), Translate('UpgradeScreen.upgradepoint4')]?.map(item => {
                        return (
                            <Wrappers.Wrapper>
                                <Wrappers.RowWrapperBasic>
                                    <Icon
                                        name='check-circle'
                                        type='feather'
                                        size={22}
                                    />
                                    <Texts.SmallText style={styles.pointsText}>{item}</Texts.SmallText>
                                </Wrappers.RowWrapperBasic>
                                <Spacers.Small />
                                <Spacers.Tiny />
                            </Wrappers.Wrapper>
                        )
                    })}

                    <Spacers.Small />
                    <UpgradedView amountUpgraded={`$4.99 / ${Translate('UpgradeScreen.Month')}`} detailUpgraded={Translate('UpgradeScreen.freeTrial')} />
                    <Spacers.Base />
                    <UpgradedView tagImage amountUpgraded={`$49.99 / ${Translate('UpgradeScreen.Year')}`} detailUpgraded={Translate('UpgradeScreen.freeTrial')} />
                </Wrappers.Component>
            </ScrollViews.KeyboardAvoiding>
        </Wrappers.Wrapper>
    )
}

export default Upgrade;