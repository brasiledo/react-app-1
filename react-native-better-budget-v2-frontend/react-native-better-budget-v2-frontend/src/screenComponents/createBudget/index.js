// import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { totalSize, width } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import { Spacers, Texts, Wrappers } from '../../components';
import { fontFamily } from '../../services';

export const MultipleView = ({
  Title,
  Value1,
  Value2,
  viewColor,
  textColor,
  viewColor1,
  textColor1,
  onPress,
  onPressIcon,
  disabled
}) => {
  return (
    <Wrappers.RowBasic style={styles.rowWrapper}>
      <Wrappers.Wrapper>
        {Title && <Texts.SmallText>{Title}</Texts.SmallText>}

        <Spacers.Small />
        <Wrappers.RowWrapperBasic>
          <TouchableOpacity activeOpacity={0.5} onPress={() => onPress(Value1)} disabled={disabled}>
            <Wrappers.Wrapper
              style={{
                ...styles.textView,
                backgroundColor: viewColor,
              }}>
              <Texts.SmallTitle
                style={{
                  ...styles.text,
                  color: textColor,
                }}>
                {Value1}
              </Texts.SmallTitle>
            </Wrappers.Wrapper>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.5} onPress={() => onPress(Value2)} disabled={disabled}>
            <Wrappers.Wrapper
              style={{
                ...styles.textView,
                backgroundColor: viewColor1,
              }}>
              <Texts.SmallTitle
                style={{
                  ...styles.text,
                  color: textColor1,
                }}>
                {Value2}
              </Texts.SmallTitle>
            </Wrappers.Wrapper>
          </TouchableOpacity>
        </Wrappers.RowWrapperBasic>
      </Wrappers.Wrapper>

      {onPressIcon && (
        <Wrappers.Wrapper>
          <Icon
            name={'info'}
            type="feather"
            size={24}
            activeOpacity={0.5}
            onPress={onPressIcon}
            disabled={disabled}
          />
        </Wrappers.Wrapper>
      )}
    </Wrappers.RowBasic>
  );
};

const styles = StyleSheet.create({
  rowWrapper: {
    alignItems: 'center',
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
});
