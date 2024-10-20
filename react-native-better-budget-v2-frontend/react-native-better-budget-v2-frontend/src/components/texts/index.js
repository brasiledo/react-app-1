import {source} from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import { onPress } from 'deprecated-react-native-prop-types/DeprecatedTextPropTypes';
import React from 'react';
import {StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {height, totalSize, width} from 'react-native-dimension';
import {Images, Spacers, Texts, Wrappers} from '..';
import {appStyles, colors, sizes, appIcons, fontFamily} from '../../services';

// Title Texts
export const XXLTitle = ({style, children, ...props}) => {
  return (
    <Text style={[styles.xxlTitleStyle, style]} {...props}>
      {children}
    </Text>
  );
};

export const ButtonTextMedium = props => {
  return (
    <Text style={[styles.ButtonTextMediumStyle, props.style]}>
      {props.children}
    </Text>
  );
};

export const InputTitle = props => {
  return (
    <Text style={[styles.inputTitleStyle, props.style]}>{props.children}</Text>
  );
};

export const LargeText = props => {
  return (
    <Text style={[styles.largeTextStyle, props.style]} onPress={props.onPress}>
      {props.children}
    </Text>
  );
};

export const SmallText = props => {
  return (
    <Text
      style={[styles.smallTextStyle, props.style]}
      onPress={props.onPress}
      numberOfLines={props.numberOfLines}>
      {props.children}
    </Text>
  );
};
export const XLTitle = ({style, children, ...props}) => {
  return (
    <Text style={[styles.xlTitleStyle, style]} {...props}>
      {children}
    </Text>
  );
};
export const LargeTitle = ({style, children, ...props}) => {
  return (
    <Text style={[styles.largeTitleStyle, style]} {...props}>
      {children}
    </Text>
  );
};
export const MediumTitle = ({style, children, ...props}) => {
  return (
    <Text style={[styles.mediumTitleStyle, style]} {...props}>
      {children}
    </Text>
  );
};
export const SmallTitle = ({style, children, ...props}) => {
  return (
    <Text style={[styles.smallTitleStyle, style]} {...props}>
      {children}
    </Text>
  );
};
export const TinyTitle = ({style, children, ...props}) => {
  return (
    <Text style={[styles.tinyTitleStyle, style]} {...props}>
      {children}
    </Text>
  );
};
// Normal Texts
export const Large = ({style, children, ...props}) => {
  return (
    <Text style={[styles.largeTextStyle, style]} {...props}>
      {children}
    </Text>
  );
};
export const Medium = ({style, children, ...props}) => {
  return (
    <Text style={[styles.mediumTextStyle, style]} {...props}>
      {children}
    </Text>
  );
};
export const Regular = ({style, children, ...props}) => {
  return (
    <Text style={[styles.regularTextStyle, style]} {...props}>
      {children}
    </Text>
  );
};
export const Small = ({style, children, ...props}) => {
  return (
    <Text style={[styles.smallTextStyle, style]} {...props}>
      {children}
    </Text>
  );
};
export const Tiny = ({style, children, ...props}) => {
  return (
    <Text style={[styles.tinyTextStyle, style]} {...props}>
      {children}
    </Text>
  );
};
export const Input = ({style, children, ...props}) => {
  return (
    <Text style={[styles.inputTitleStyle, style]} {...props}>
      {children}
    </Text>
  );
};

export const ButtonRegular = ({style, children, ...props}) => {
  return (
    <Text style={[styles.ButtonTextRegularStyle, style]} {...props}>
      {children}
    </Text>
  );
};
export const ButtonMedium = ({style, children, ...props}) => {
  return (
    <Text style={[styles.ButtonTextMediumStyle, style]} {...props}>
      {children}
    </Text>
  );
};

export const profile = ({title, source, onPress}) => {
  return (
    <>
    <Spacers.Small />
    <TouchableOpacity onPress={onPress}>
      <Wrappers.Component style={styles.main_view}>
        <Wrappers.Wrapper>
          <Texts.SmallTitle style={styles.username}>{title}</Texts.SmallTitle>
        </Wrappers.Wrapper>

        <Wrappers.Wrapper>
          <Image
            source={source}
            style={styles.icon_style}
            resizeMode="contain"
          />
        </Wrappers.Wrapper>
      </Wrappers.Component>
      </TouchableOpacity>
      <Spacers.Small />
      <Spacers.colorline />
    </>
  );
};

const styles = StyleSheet.create({
  xxlTitleStyle: {
    ...appStyles.h1,
  },
  xlTitleStyle: {
    ...appStyles.h2,
  },
  largeTitleStyle: {
    ...appStyles.h3,
  },
  mediumTitleStyle: {
    ...appStyles.h4,
  },
  smallTitleStyle: {
    ...appStyles.h5,
  },
  tinyTitleStyle: {
    ...appStyles.h6,
  },
  largeTextStyle: {
    ...appStyles.textLarge,
  },
  mediumTextStyle: {
    ...appStyles.textMedium,
  },
  regularTextStyle: {
    ...appStyles.textRegular,
  },
  smallTextStyle: {
    ...appStyles.textSmall,
  },
  tinyTextStyle: {
    ...appStyles.textTiny,
  },
  inputTitleStyle: {
    ...appStyles.textTiny,
  },
  ButtonTextRegularStyle: {
    ...appStyles.ButtonRegular,
  },
  ButtonTextMediumStyle: {
    ...appStyles.ButtonMedium,
  },
  main_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon_style: {
    width: width(3),
    height: height(2),
    marginVertical: height(1.5),
  },
  username: {
    fontSize: totalSize(2),
    fontFamily: fontFamily.appTextBold,
    // fontWeight: 'bold',
    marginVertical: height(0.5),
  },
});
