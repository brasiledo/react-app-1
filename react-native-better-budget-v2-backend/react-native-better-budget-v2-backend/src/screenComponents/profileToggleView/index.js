import React from 'react';
import { Switch, Image, StyleSheet } from 'react-native';
import { totalSize, width, height } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import { Spacers, Texts, Wrappers } from '../../components';
import { appIcons, colors, fontFamily } from '../../services';

export const ProfileToggleView = ({
  onPressIcon,
  value,
  onValueChange,
  topLine,
  Title,
  iconName,
  imageName
}) => {
  return (
    <Wrappers.RowBasic style={{ ...styles.rowWrapper, borderTopWidth: topLine ? 1 : 0 }}>
      <Wrappers.RowBasic style={{ marginHorizontal: width(3) }}>
        {iconName &&
          <Icon
            name={iconName}
            type="feather"
            size={20}
            activeOpacity={0.5}
            style={{ marginRight: width(2) }}
            onPress={onPressIcon}
          />
        }

        {imageName &&
          <Image
            source={imageName}
            resizeMode="contain"
            style={styles.btnIcon}
          />
        }

        <Texts.SmallText style={styles.planText}>{Title}</Texts.SmallText>
      </Wrappers.RowBasic>

      <Wrappers.Component style={{ ...styles.toggleView, borderColor: value ? colors.textColor : colors.grayToggle }}>
        <Switch
          value={value}
          thumbColor={value ? colors.textColor : colors.grayToggle}
          trackColor={{
            false: colors.white,
            true: colors.white,
          }}
          ios_backgroundColor="#3e3e3e"
          onValueChange={onValueChange}
        />
      </Wrappers.Component>
    </Wrappers.RowBasic>
  );
};

const styles = StyleSheet.create({
  rowWrapper: {
    alignItems: 'center',
    height: height(7),
    borderBottomWidth: 1,
    borderBottomColor: colors.grayToggle,
    borderTopColor: colors.grayToggle
  },
  textView: {
    borderRadius: 100,
    marginRight: width(3),
  },
  text: {
    fontSize: totalSize(1.5),
    marginHorizontal: totalSize(1.5),
    marginVertical: totalSize(1),
    fontFamily: fontFamily.appTextRegular,
  },
  toggleView: {
    borderWidth: 1,
    borderRadius: 100,
    backgroundColor: colors.white,
  },
  btnIcon: {
    width: totalSize(2),
    height: totalSize(2),
    marginRight: width(2)
  },
});
