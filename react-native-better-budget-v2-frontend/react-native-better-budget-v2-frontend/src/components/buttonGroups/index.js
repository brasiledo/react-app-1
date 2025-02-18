
import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, ViewPropTypes } from 'react-native'
import { Icon, ButtonGroup } from 'react-native-elements';
import { styles } from './styles';
import { appStyles } from '../../services';

export const ButtonGroupPrimary = ({ buttons, selectedIndex,onPress, selectedButtonStyle, buttonStyle }) => {

    return (
        <ButtonGroup
            buttons={buttons}
            selectedIndex={selectedIndex}
            onPress={onPress}
            containerStyle={[styles.topTabContainer]}
            innerBorderStyle={{ width: 0 }}
            selectedButtonStyle={[styles.selectedTopTab, selectedButtonStyle]}
            selectedTextStyle={[styles.tabText, appStyles.textRegular]}
            textStyle={[styles.tabText, appStyles.textRegular, appStyles.textLightGray]}
            buttonStyle={[styles.unselectedTopTab, buttonStyle]}
        />
    );
}

