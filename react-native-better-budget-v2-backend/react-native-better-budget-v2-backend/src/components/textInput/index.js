import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native'
import { Icon } from 'react-native-elements';
import { height, totalSize, width } from 'react-native-dimension';
import { colors, appStyles, sizes, fontFamily, fontSize } from '../../services';
import { Icons, Spacers, TextInputs, Texts, Wrappers } from '..';
import { longPressGestureHandlerProps } from 'react-native-gesture-handler/lib/typescript/handlers/LongPressGestureHandler';
import { color_spacer } from '../spacers';
import Ionicons from 'react-native-vector-icons/Ionicons'

const Colored = ({ iconName, iconType, placeholder, onFocus, onBlur, onChangeText, secureTextEntry, value, containerStyle }) => {
    return (
        <View style={[appStyles.inputContainerColored, {
            borderRadius: sizes.inputRadius,
            backgroundColor: colors.appBgColor2
        }, appStyles.shadow, containerStyle]}>
            {
                iconName ?
                    <View style={{ marginLeft: sizes.marginHorizontal / 2 }}>
                        <Icon name={iconName} type={iconType} size={totalSize(2.5)} color={colors.appTextColor5} iconStyle={{}} />
                    </View>
                    :
                    null
            }

            <View style={{ flex: 1 }}>
                <TextInput
                    onChangeText={onChangeText}
                    value={value}
                    placeholder={placeholder}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    secureTextEntry={secureTextEntry}
                    style={[appStyles.inputField, { width: null, height: height(7), paddingHorizontal: sizes.marginHorizontal / 2 }]}
                />
            </View>
        </View>
    );
}
const Bordered = ({ iconName, iconType, placeholder, placeholderTextColor, onFocus, onChangeText, secureTextEntry, value, containerStyle, inputStyle }) => {
    return (
        <View style={[appStyles.inputContainerBorderd, {
            borderRadius: sizes.inputRadius,
            borderWidth: 1,
            borderColor: colors.appColor1
        }, containerStyle]}>
            {
                iconName ?
                    <View style={{ marginLeft: sizes.marginHorizontal / 2 }}>
                        <Icon name={iconName} type={iconType} size={totalSize(2.5)} color={colors.appColor1} iconStyle={{}} />
                    </View>
                    :
                    null
            }
            <View style={{ flex: 1 }}>
                <TextInput
                    onChangeText={onChangeText}
                    value={value}
                    placeholder={placeholder}
                    onFocus={onFocus}
                    placeholderTextColor={placeholderTextColor}
                    secureTextEntry={secureTextEntry}
                    style={[appStyles.inputField, { width: null, height: height(7), paddingHorizontal: sizes.marginHorizontal / 2 }, inputStyle]}
                />
            </View>
        </View>
    );
}

const TextInputNoBorder = ({ image, left, inputContainerStyle, onChangeText, autoFocus, isButton, value, required, error, placeholder, editable, titleStyle, keyboardType, title, multiline, onFocus, onBlur, secureTextEntry, inputStyle, right, iconName, iconType, onPressIcon, iconStyle, iconSize, iconColor }) => {
    return (
        <Wrappers.Wrapper>
            {
                title ?
                    <Wrappers.ComponentWrapper style={{
                        marginHorizontal: sizes.marginHorizontal / 2,
                        marginVertical: sizes.marginVertical / -1.3
                    }}>
                        <Spacers.Spacer height={sizes.smallMargin} />
                        <Spacers.Spacer height={sizes.smallMargin} />
                        <Texts.InputTitle style={[{ marginLeft: width(2.5), fontSize: totalSize(1.5), color: colors.textcolor, },]}>
                            {title}
                            {
                                required ?
                                    <RegularText style={{ color: colors.error }}> *</RegularText>
                                    :
                                    null
                            }

                            {
                                image ?
                                    <View style={{ marginLeft: sizes.marginHorizontal / 2 }}>
                                        <Image name={image} size={totalSize(2.5)} color={colors.appColor1} />
                                    </View>
                                    :
                                    null
                            }
                        </Texts.InputTitle>

                    </Wrappers.ComponentWrapper>
                    :
                    null
            }


            <Wrappers.RowWrapperBasic style={[{
                borderRadius: sizes.inputRadius,
                borderWidth: 0,
                borderColor: colors.appTextColor5
            }, inputContainerStyle]}>
                {
                    left ? left : null
                }
                <View style={{ flex: 8 }}>
                    {
                        isButton ?
                            content ?
                                content
                                :
                                <Wrappers.ComponentWrapper style={[{ paddingVertical: sizes.baseMargin }, buttonContentStyle]}>
                                    <RegularText style={value ? null : appStyles.textGray}>{value ? value : placeholder}</RegularText>
                                </Wrappers.ComponentWrapper>
                            :
                            <TextInput
                                onChangeText={onChangeText}
                                value={value}
                                placeholder={placeholder}
                                editable={editable}
                                keyboardType={keyboardType}
                                multiline={multiline}
                                placeholderTextColor={'#21212180'}
                                onFocus={onFocus}
                                onBlur={onBlur}
                                autoFocus={autoFocus}
                                secureTextEntry={secureTextEntry}
                                style={[appStyles.inputField, { width: null, height: height(6), marginHorizontal: sizes.marginHorizontal }, inputStyle]}
                            />
                    }
                </View>

                {
                    right ?
                        right
                        :
                        iconName ?
                            <View style={{ flex: 2, alignItems: 'center' }}>
                                <Icon name={iconName} type={iconType} size={iconSize ? iconSize : sizes.icons.medium} color={iconColor ? iconColor : colors.appTextColor5} iconStyle={iconStyle} onPress={onPressIcon} />
                            </View>
                            :
                            null
                }
            </Wrappers.RowWrapperBasic>



            {
                error ?
                    <Wrappers.ComponentWrapper style={{ marginLeft: width(7.5) }} animation="shake">
                        <Spacers.Spacer height={sizes.TinyMargin} />
                        <Icons.IconWithText
                            iconName="alert-circle-outline"
                            //title="New"
                            text={error}
                            tintColor={colors.error}
                            iconSize={sizes.icons.small}
                            textStyle={[{ fontSize: fontSize.small }]}
                        />
                    </Wrappers.ComponentWrapper>
                    :
                    null
            }
        </Wrappers.Wrapper>
    )
}

const TextInputLowerBorder = ({ widthError, keyboardAppearance, Currency, placeholderColor, image, left, inputContainerStyle, onChangeText, autoFocus, isButton, value, required, error, placeholder, editable, titleStyle, keyboardType, title, multiline, onFocus, onBlur, secureTextEntry, inputStyle, right, iconName, iconType, onPressIcon, iconStyle, iconSize, iconColor }) => {
    return (
        <Wrappers.Wrapper style={{zIndex:-1}} pointerEvents={editable == false? 'none' : undefined}>
            {
                title ?
                    <Wrappers.ComponentWrapper style={{
                        marginHorizontal: sizes.marginHorizontal / 4,
                    }}>
                        <Spacers.Spacer height={sizes.smallMargin} />
                        <Texts.InputTitle style={[{ fontSize: totalSize(1.2), fontFamily: fontFamily.appTextBold, color: colors.textColor },]}>
                            {title}
                            {
                                required ?
                                    <Text style={{ color: colors.error }}> *</Text>
                                    :
                                    null
                            }

                            {
                                image ?
                                    <View style={{ marginLeft: sizes.marginHorizontal / 2 }}>
                                        <Image name={image} size={totalSize(2.5)} color={colors.appColor1} />
                                    </View>
                                    :
                                    null
                            }
                        </Texts.InputTitle>

                    </Wrappers.ComponentWrapper>
                    :
                    null
            }


            <Wrappers.RowWrapperBasic style={[{
                borderBottomWidth: 1,
                borderWidth: 0,
                borderColor: colors.appTextColor5
            }, inputContainerStyle]}>
                {
                    left ? left : null
                }
                <View style={{ flex: 8 }}>
                    {
                        isButton ?
                            content ?
                                content
                                :
                                <Wrappers.ComponentWrapper style={[{ paddingVertical: sizes.baseMargin }, buttonContentStyle]}>
                                    <Text style={value ? colors.placeholderColor : colors.placeholderColor}>{value ? value : placeholder}</Text>
                                </Wrappers.ComponentWrapper>
                            :
                            <Wrappers.RowWrapperBasic styles={{ height: height(5), flexDirection: 'space-between' }}>
                                {Currency &&
                                    <Texts.SmallTitle style={{ borderWidth: 0, marginTop: '-0.2%', textAlignVertical: 'top' }}>{Currency} </Texts.SmallTitle>
                                }
                                <TextInput
                                    onChangeText={onChangeText}
                                    value={value}
                                    placeholder={placeholder}
                                    editable={editable}
                                    keyboardType={keyboardType}
                                    keyboardAppearance={keyboardAppearance}
                                    multiline={multiline}
                                    returnKeyType='done'
                                    placeholderTextColor={placeholderColor ? placeholderColor : colors.disableText}
                                    onFocus={onFocus}
                                    onBlur={onBlur}
                                    autoFocus={autoFocus}
                                    secureTextEntry={secureTextEntry}
                                    style={[appStyles.inputField, { width: width(80), height: height(5) }, inputStyle]}
                                />
                            </Wrappers.RowWrapperBasic>
                    }
                </View>

                {
                    right ?
                        right
                        :
                        iconName ?
                            <View style={{ flex: 2, alignItems: 'center' }}>
                                <Icon name={iconName} type={iconType} size={iconSize ? iconSize : sizes.icons.medium} color={iconColor ? iconColor : colors.appTextColor5} iconStyle={iconStyle} onPress={onPressIcon} />
                            </View>
                            :
                            null
                }
            </Wrappers.RowWrapperBasic>



            {
                error ?
                    <Wrappers.Wrapper style={widthError} animation="shake">
                        <Spacers.Spacer height={sizes.TinyMargin} />
                        <Icons.IconWithText
                            iconName="alert-circle-outline"
                            //title="New"
                            text={error}
                            tintColor={colors.error}
                            iconSize={sizes.icons.small}
                            textStyle={[{ fontSize: fontSize.small }]}
                        />
                    </Wrappers.Wrapper>
                    :
                    null
            }
        </Wrappers.Wrapper>
    )
}


const TextInputLowerBordered = ({ mainWrapperStyle, expenseImage, left, inputContainerStyle, onChangeText, autoFocus, isButton, value, required, error,
    placeholder, editable, titleStyle, keyboardType, title, multiline, onFocus, onBlur, secureTextEntry, inputStyle, right, iconName, iconType, onPressIcon,
    iconStyle, iconSize, iconColor, insideIconName, onPressMenuIcon, errorShow }) => {
    return (
        <Wrappers.Wrapper>
            {
                title ?
                    <Wrappers.ComponentWrapper style={[{ marginHorizontal: sizes.marginHorizontal }, mainWrapperStyle]}>
                        <Spacers.Spacer height={sizes.smallMargin} />
                        <Texts.InputTitle style={titleStyle}>
                            {title}
                            {
                                required ?
                                    <RegularText style={{ color: colors.error }}> *</RegularText>
                                    :
                                    null
                            }
                        </Texts.InputTitle>

                    </Wrappers.ComponentWrapper>
                    :
                    null
            }


            <Wrappers.RowWrapperBasic style={[{
                borderRadius: sizes.inputRadius,
                borderWidth: 0,
                borderColor: colors.appTextColor5
            }, inputContainerStyle]}>
                {
                    left ? left : null
                }
                <Wrappers.Wrapper style={{ flex: 8 }}>
                    {
                        isButton ?
                            content ?
                                content
                                :
                                <Wrappers.ComponentWrapper style={buttonContentStyle}>
                                    <RegularText style={value ? null : appStyles.textGray}>{value ? value : placeholder}</RegularText>
                                </Wrappers.ComponentWrapper>
                            :
                            <Wrappers.RowWrapperBasic style={{}} >

                                {insideIconName &&
                                    <TouchableOpacity activeOpacity={0.5} onPress={onPressMenuIcon}>
                                        <Wrappers.Wrapper style={{ height: height(5), width: width(6), borderBottomColor: colors.graySilver, borderBottomWidth: 1, justifyContent: 'center', alignSelf: 'center' }}>
                                            <Ionicons
                                                name={insideIconName}
                                                color={colors.textColor}
                                                size={22}
                                            />
                                        </Wrappers.Wrapper>
                                    </TouchableOpacity>
                                }

                                {expenseImage &&
                                    <TouchableOpacity activeOpacity={0.5} onPress={onPressMenuIcon}>
                                        <Wrappers.Wrapper style={{ height: height(5), width: width(6), borderBottomColor: colors.graySilver, borderBottomWidth: 1, justifyContent: 'center', alignSelf: 'center' }}>
                                            <Image
                                                source={expenseImage}
                                                resizeMode={'contain'}
                                                style={{ width: width(5), height: width(5) }}
                                            />
                                        </Wrappers.Wrapper>
                                    </TouchableOpacity>
                                }

                                <TextInput
                                    onChangeText={onChangeText}
                                    value={value}
                                    placeholder={placeholder}
                                    editable={editable}
                                    keyboardType={keyboardType}
                                    // multiline={multiline}
                                    placeholderTextColor={colors.graySilver}
                                    onFocus={onFocus}
                                    onBlur={onBlur}
                                    autoFocus={autoFocus}
                                    secureTextEntry={secureTextEntry}
                                    style={[appStyles.inputField, { width: null, borderBottomWidth: 1, height: height(5), width: width(94), borderBottomColor: colors.graySilver, }, inputStyle]}
                                />
                            </Wrappers.RowWrapperBasic>
                    }
                </Wrappers.Wrapper>

                {
                    right ?
                        right
                        :
                        iconName ?
                            <Wrappers.Wrapper style={{ flex: 2, alignItems: 'center' }}>
                                <Icon name={iconName} type={iconType} size={iconSize ? iconSize : sizes.icons.medium} color={iconColor ? iconColor : colors.appTextColor5} iconStyle={iconStyle} onPress={onPressIcon} />
                            </Wrappers.Wrapper>
                            :
                            null
                }
            </Wrappers.RowWrapperBasic>



            {
                error ?
                    <Wrappers.ComponentWrapper style={{ marginLeft: width(7.5) }} animation="shake">
                        <Spacers.Spacer height={sizes.TinyMargin} />
                        <Icons.IconWithText
                            iconName="alert-circle-outline"
                            //title="New"
                            text={error}
                            tintColor={colors.error}
                            iconSize={sizes.icons.small}
                            textStyle={[{ fontSize: fontSize.small }]}
                        />
                    </Wrappers.ComponentWrapper>
                    :
                    null
            }
            {
                errorShow ?
                    <Wrappers.Wrapper animation="shake">
                        <Spacers.Spacer height={sizes.TinyMargin} />
                        <Icons.IconWithText
                            iconName="alert-circle-outline"
                            //title="New"
                            text={errorShow}
                            tintColor={colors.error}
                            iconSize={sizes.icons.small}
                            textStyle={[{ fontSize: fontSize.small }]}
                        />
                    </Wrappers.Wrapper>
                    :
                    null
            }

        </Wrappers.Wrapper>
    )
}


const TextInputSearchBordered = ({ placeholder, placeholderTextColor, onChangeText, value, onPressSearch, animation, iconColor, containerStyle }) => {

    return (
        <TextInputBordered_placeholder
            placeholder={placeholder ? placeholder : "Search"}
            placeholderTextColor={placeholderTextColor}
            onChangeText={onChangeText}
            value={value}
            style={[{ marginHorizontal: sizes.marginHorizontal, borderRadius: 50 }, containerStyle]}
            left={
                <Icons.SearchIcon
                    style={{ marginLeft: sizes.marginHorizontal }}
                    onPress={onPressSearch}
                    iconColor={iconColor}
                />
            }
        />
    )
}


const TextInputSearchBorderedWithoutIcon = ({ placeholder, borderColor, placeholderTextColor, onChangeText, value, onPressSearch, animation, containerStyle }) => {
    return (
        <TextInputBordered
            placeholder={placeholder ? placeholder : "Search"}
            placeholderTextColor={placeholderTextColor}
            onChangeText={onChangeText}
            value={value}
            style={[{ marginHorizontal: sizes.marginHorizontal, color: colors.snow, borderRadius: 50, }, containerStyle]}

        />
    )
}

const TextInputBordered = ({ iconName, placeholderTextColor, error, iconType, required, left, onPress, content, keyboardType, title, isButton, titleStyle, placeholder, editable, animation, multiline, onFocus, buttonContentStyle, onBlur, onChangeText, secureTextEntry, value, iconColor, iconSize, containerStyle, inputContainerStyle, onPressIcon, inputStyle, right, iconStyle }) => {
    var focused = false
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}

        >
            <Wrappers.Wrapper animation={animation ? animation : 'fadeInUp'} style={[styles.textInputBorderedContainer, containerStyle]}>

                <Wrappers.RowWrapperBasic style={[{
                    borderRadius: sizes.inputRadius,
                    borderWidth: 1,
                    borderColor: colors.border_color,
                }, inputContainerStyle]}>
                    {
                        left ? left : null
                    }
                    <Wrappers.Wrapper style={{ flex: 8 }}>
                        {
                            title ?
                                <Wrappers.ComponentWrapper style={{ marginHorizontal: sizes.marginHorizontal / 2 }}>
                                    <Spacers.Spacer height={sizes.smallMargin} />
                                    <Texts.InputTitle style={[{ marginLeft: width(0.1), fontSize: totalSize(1.7), color: colors.textcolor }, titleStyle]}>
                                        {title}
                                        {
                                            required ?
                                                <RegularText style={{ color: colors.error, }}> *</RegularText>
                                                :
                                                null
                                        }
                                    </Texts.InputTitle>

                                </Wrappers.ComponentWrapper>
                                :
                                null
                        }
                        {
                            isButton ?
                                content ?
                                    content
                                    :
                                    <Wrappers.ComponentWrapper style={[{ paddingVertical: sizes.baseMargin }, buttonContentStyle]}>
                                        <Texts.Regular style={value ? null : appStyles.textGray}>{value ? value : placeholder}</Texts.Regular>
                                    </Wrappers.ComponentWrapper>
                                :
                                <TextInput
                                    onChangeText={onChangeText}
                                    value={value}
                                    placeholder={placeholder}
                                    editable={editable}
                                    keyboardType={keyboardType}
                                    multiline={multiline}
                                    placeholderTextColor={placeholderTextColor}
                                    // onFocus={() => focused = true, onFocus}
                                    // onBlur={() => focused = false, onBlur}
                                    secureTextEntry={secureTextEntry}
                                    style={[appStyles.inputField, { width: null, color: colors.txtinput, height: height(5.5), paddingHorizontal: width(2.5) }, inputStyle]}
                                />
                        }
                    </Wrappers.Wrapper>
                    {
                        right ?
                            right
                            :
                            iconName ?
                                <View style={{ flex: 2, alignItems: 'center' }}>
                                    <Icon name={iconName} type={iconType} size={iconSize ? iconSize : sizes.icons.medium} color={iconColor ? iconColor : colors.appTextColor5} iconStyle={iconStyle} onPress={onPressIcon} />
                                </View>
                                :
                                null
                    }

                </Wrappers.RowWrapperBasic>
            </Wrappers.Wrapper>
            {
                error ?
                    <Wrappers.ComponentWrapper style={{ marginLeft: width(7.5) }} animation="shake">
                        <Spacers.Spacer height={sizes.TinyMargin} />
                        <Icons.IconWithText
                            iconName="alert-circle-outline"
                            //title="New"
                            text={error}
                            tintColor={colors.error}
                            iconSize={sizes.icons.small}
                            textStyle={[{ fontSize: fontSize.small }]}
                        />
                    </Wrappers.ComponentWrapper>
                    :
                    null
            }
        </TouchableOpacity>
    );
}



const TextInputBordered_placeholder = ({ iconName, placeholderTextColor, error, iconType, required, left, onPress, content, keyboardType, title, isButton, titleStyle, placeholder, editable, animation, multiline, onFocus, buttonContentStyle, onBlur, onChangeText, secureTextEntry, value, iconColor, iconSize, containerStyle, inputContainerStyle, onPressIcon, inputStyle, right, iconStyle }) => {
    var focused = false
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}

        >
            <Wrappers.Wrapper animation={animation ? animation : 'fadeInUp'} style={[styles.textInputBorderedContainer, containerStyle]}>

                <Wrappers.RowWrapperBasic style={[{
                    borderRadius: sizes.inputRadius,
                    borderWidth: 1,
                    borderColor: colors.snow,
                }, inputContainerStyle]}>
                    {
                        left ? left : null
                    }
                    <Wrappers.Wrapper style={{ flex: 8 }}>
                        {
                            title ?
                                <Wrappers.ComponentWrapper style={{ marginHorizontal: sizes.marginHorizontal / 2 }}>
                                    <Spacers.Spacer height={sizes.smallMargin} />
                                    <Texts.InputTitle style={[{ marginLeft: width(0.1), fontSize: totalSize(1.7), color: colors.textcolor }, titleStyle]}>
                                        {title}
                                        {
                                            required ?
                                                <RegularText style={{ color: colors.error, }}> *</RegularText>
                                                :
                                                null
                                        }
                                    </Texts.InputTitle>

                                </Wrappers.ComponentWrapper>
                                :
                                null
                        }
                        {
                            isButton ?
                                content ?
                                    content
                                    :
                                    <Wrappers.ComponentWrapper style={[{ paddingVertical: sizes.baseMargin }, buttonContentStyle]}>
                                        <Texts.Regular style={value ? null : appStyles.textGray}>{value ? value : placeholder}</Texts.Regular>
                                    </Wrappers.ComponentWrapper>
                                :
                                <TextInput
                                    onChangeText={onChangeText}
                                    value={value}
                                    placeholder={placeholder}
                                    editable={editable}
                                    keyboardType={keyboardType}
                                    multiline={multiline}
                                    placeholderTextColor={placeholderTextColor}
                                    secureTextEntry={secureTextEntry}
                                    style={[appStyles.inputField, { width: null, color: colors.snow, height: height(5.5), paddingHorizontal: width(2.5) }, inputStyle]}
                                />
                        }
                    </Wrappers.Wrapper>
                    {
                        right ?
                            right
                            :
                            iconName ?
                                <View style={{ flex: 2, alignItems: 'center' }}>
                                    <Icon name={iconName} type={iconType} size={iconSize ? iconSize : sizes.icons.medium} color={iconColor ? iconColor : colors.appTextColor5} iconStyle={iconStyle} onPress={onPressIcon} />
                                </View>
                                :
                                null
                    }

                </Wrappers.RowWrapperBasic>
            </Wrappers.Wrapper>
            {
                error ?
                    <Wrappers.ComponentWrapper style={{ marginLeft: width(7.5) }} animation="shake">
                        <Spacers.Spacer height={sizes.TinyMargin} />
                        <Icons.IconWithText
                            iconName="alert-circle-outline"
                            //title="New"
                            text={error}
                            tintColor={colors.error}
                            iconSize={sizes.icons.small}
                            iconColor={colors.snow}
                            textStyle={[{ fontSize: fontSize.small }]}
                        />
                    </Wrappers.ComponentWrapper>
                    :
                    null
            }
        </TouchableOpacity>
    );
}


const TextInputBordered_simple = ({ iconName, placeholderTextColor, error, iconType, required, left, onPress, content, keyboardType, title, isButton, titleStyle, placeholder, editable, animation, multiline, onFocus, buttonContentStyle, onBlur, onChangeText, secureTextEntry, value, iconColor, iconSize, containerStyle, inputContainerStyle, onPressIcon, inputStyle, right, iconStyle }) => {
    var focused = false
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}

        >
            <Wrappers.Wrapper animation={animation ? animation : 'fadeInUp'} style={[styles.textInputBorderedContainer, containerStyle]}>

                <Wrappers.RowWrapperBasic style={[{
                    borderRadius: sizes.inputRadius,
                    borderWidth: 1,
                    marginTop: totalSize(1),
                    height: height(7),
                    borderColor: colors.appTextColor5,
                }, inputContainerStyle]}>
                    {
                        left ? left : null
                    }
                    <Wrappers.Wrapper style={{ flex: 8 }}>
                        {
                            title ?
                                <Wrappers.ComponentWrapper style={{ marginHorizontal: sizes.marginHorizontal / 2 }}>
                                    <Spacers.Spacer height={sizes.smallMargin} />
                                    <Texts.InputTitle style={[{ marginLeft: totalSize(1), fontSize: totalSize(1.7), marginLeft: totalSize(1), color: colors.textcolor }, titleStyle]}>
                                        {title}
                                        {
                                            required ?
                                                <RegularText style={{ color: colors.error, }}> *</RegularText>
                                                :
                                                null
                                        }
                                    </Texts.InputTitle>

                                </Wrappers.ComponentWrapper>
                                :
                                null
                        }
                        {
                            isButton ?
                                content ?
                                    content
                                    :
                                    <Wrappers.ComponentWrapper style={[{ paddingVertical: sizes.baseMargin }, buttonContentStyle]}>
                                        <Texts.Regular style={value ? null : appStyles.textGray}>{value ? value : placeholder}</Texts.Regular>
                                    </Wrappers.ComponentWrapper>
                                :
                                <TextInput
                                    onChangeText={onChangeText}
                                    value={value}
                                    placeholder={placeholder}
                                    editable={editable}
                                    keyboardType={keyboardType}
                                    multiline={multiline}
                                    placeholderTextColor={placeholderTextColor}
                                    // onFocus={() => focused = true, onFocus}
                                    // onBlur={() => focused = false, onBlur}
                                    secureTextEntry={secureTextEntry}
                                    style={[appStyles.inputField, { width: null, color: colors.txtinput, height: height(5.5), paddingHorizontal: width(2.5), marginLeft: totalSize(1), }, inputStyle]}
                                />
                        }
                    </Wrappers.Wrapper>
                    {
                        right ?
                            right
                            :
                            iconName ?
                                <View style={{ flex: 2, alignItems: 'center' }}>
                                    <Icon name={iconName} type={iconType} size={iconSize ? iconSize : sizes.icons.medium} color={iconColor ? iconColor : colors.appTextColor5} iconStyle={iconStyle} onPress={onPressIcon} />
                                </View>
                                :
                                null
                    }

                </Wrappers.RowWrapperBasic>
            </Wrappers.Wrapper>
            {
                error ?
                    <Wrappers.ComponentWrapper style={{ marginLeft: width(7.5) }} animation="shake">
                        <Spacers.Spacer height={sizes.TinyMargin} />
                        <Icons.IconWithText
                            iconName="alert-circle-outline"
                            //title="New"
                            text={error}
                            tintColor={colors.error}
                            iconSize={sizes.icons.small}
                            textStyle={[{ fontSize: fontSize.small }]}
                        />
                    </Wrappers.ComponentWrapper>
                    :
                    null
            }
        </TouchableOpacity>
    );
}


const TextInputBordered_NoTitle = ({ iconName, placeholderTextColor, error, iconType, required, left, onPress, content, keyboardType, title, isButton, titleStyle, placeholder, editable, animation, multiline, onFocus, buttonContentStyle, onBlur, onChangeText, secureTextEntry, value, iconColor, iconSize, containerStyle, inputContainerStyle, onPressIcon, inputStyle, right, iconStyle }) => {
    var focused = false
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}

        >
            <Wrappers.Wrapper animation={animation ? animation : 'fadeInUp'} style={[styles.textInputBorderedContainer, containerStyle]}>

                <Wrappers.RowWrapperBasic style={[{
                    borderRadius: sizes.inputRadius,
                    borderWidth: 1,
                    marginTop: totalSize(1),
                    height: height(6),
                    borderColor: colors.appTextColor5,
                }, inputContainerStyle]}>
                    {
                        left ? left : null
                    }
                    <Wrappers.Wrapper style={{ flex: 8 }}>
                        {
                            title ?
                                <Wrappers.ComponentWrapper style={{ marginHorizontal: sizes.marginHorizontal / 2 }}>
                                    <Spacers.Spacer height={sizes.smallMargin} />
                                    <Texts.InputTitle style={[{ marginLeft: totalSize(1), fontSize: totalSize(1.7), marginLeft: totalSize(1), color: colors.textcolor }, titleStyle]}>
                                        {title}
                                        {
                                            required ?
                                                <RegularText style={{ color: colors.error, }}> *</RegularText>
                                                :
                                                null
                                        }
                                    </Texts.InputTitle>

                                </Wrappers.ComponentWrapper>
                                :
                                null
                        }
                        {
                            isButton ?
                                content ?
                                    content
                                    :
                                    <Wrappers.ComponentWrapper style={[{ paddingVertical: sizes.baseMargin }, buttonContentStyle]}>
                                        <Texts.Regular style={value ? null : appStyles.textGray}>{value ? value : placeholder}</Texts.Regular>
                                    </Wrappers.ComponentWrapper>
                                :
                                <TextInput
                                    onChangeText={onChangeText}
                                    value={value}
                                    placeholder={placeholder}
                                    editable={editable}
                                    keyboardType={keyboardType}
                                    multiline={multiline}
                                    placeholderTextColor={placeholderTextColor}
                                    // onFocus={() => focused = true, onFocus}
                                    // onBlur={() => focused = false, onBlur}
                                    secureTextEntry={secureTextEntry}
                                    style={[appStyles.inputFieldss, { width: null, color: colors.textcolor, height: height(5.5), paddingHorizontal: width(2.5), marginLeft: totalSize(1), }, inputStyle]}
                                />
                        }
                    </Wrappers.Wrapper>
                    {
                        right ?
                            right
                            :
                            iconName ?
                                <View style={{ flex: 2, alignItems: 'center' }}>
                                    <Icon name={iconName} type={iconType} size={iconSize ? iconSize : sizes.icons.medium} color={iconColor ? iconColor : colors.appTextColor5} iconStyle={iconStyle} onPress={onPressIcon} />
                                </View>
                                :
                                null
                    }

                </Wrappers.RowWrapperBasic>
            </Wrappers.Wrapper>
            {
                error ?
                    <Wrappers.ComponentWrapper style={{ marginLeft: width(7.5) }} animation="shake">
                        <Spacers.Spacer height={sizes.TinyMargin} />
                        <Icons.IconWithText
                            iconName="alert-circle-outline"
                            //title="New"
                            text={error}
                            tintColor={colors.error}
                            iconSize={sizes.icons.small}
                            textStyle={[{ fontSize: fontSize.small }]}
                        />
                    </Wrappers.ComponentWrapper>
                    :
                    null
            }
        </TouchableOpacity>
    );
}


const TextInputBordered_Multiline = ({ iconName, placeholderTextColor, error, iconType, required, left, onPress, content, keyboardType, title, isButton, titleStyle, placeholder, editable, animation, multiline, onFocus, buttonContentStyle, onBlur, onChangeText, secureTextEntry, value, iconColor, iconSize, containerStyle, inputContainerStyle, onPressIcon, inputStyle, right, iconStyle }) => {
    var focused = false
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}

        >
            <Wrappers.Wrapper animation={animation ? animation : 'fadeInUp'} style={[styles.textInputBorderedContainer1, containerStyle]}>

                <Wrappers.RowWrapperBasic style={[{
                    borderRadius: sizes.multiRadius,
                    borderWidth: 1,
                    borderColor: colors.appTextColor5,
                }, inputContainerStyle]}>
                    {
                        left ? left : null
                    }
                    <Wrappers.Wrapper style={{ flex: 8 }}>
                        {
                            title ?
                                <Wrappers.ComponentWrapper style={{ marginHorizontal: sizes.marginHorizontal / 2 }}>
                                    <Spacers.Spacer height={sizes.smallMargin} />
                                    <Texts.InputTitle style={[{ marginLeft: width(0.1), fontSize: totalSize(1.7), color: colors.textColor }, titleStyle]}>
                                        {title}
                                        {
                                            required ?
                                                <RegularText style={{ color: colors.error, }}> *</RegularText>
                                                :
                                                null
                                        }
                                    </Texts.InputTitle>

                                </Wrappers.ComponentWrapper>
                                :
                                null
                        }
                        {
                            isButton ?
                                content ?
                                    content
                                    :
                                    <Wrappers.ComponentWrapper style={[{ paddingVertical: sizes.baseMargin }, buttonContentStyle]}>
                                        <Texts.Regular style={value ? null : appStyles.textGray}>{value ? value : placeholder}</Texts.Regular>
                                    </Wrappers.ComponentWrapper>
                                :
                                <TextInput
                                    onChangeText={onChangeText}
                                    value={value}
                                    placeholder={placeholder}
                                    editable={editable}
                                    keyboardType={keyboardType}
                                    multiline={multiline}
                                    placeholderTextColor={placeholderTextColor}
                                    // onFocus={() => focused = true, onFocus}
                                    // onBlur={() => focused = false, onBlur}
                                    secureTextEntry={secureTextEntry}
                                    style={[appStyles.inputFields, { width: null, color: colors.textColor, height: height(35), paddingHorizontal: width(2), textAlignVertical: 'top' }, inputStyle]}
                                />
                        }
                    </Wrappers.Wrapper>
                    {
                        right ?
                            right
                            :
                            iconName ?
                                <View style={{ flex: 2, alignItems: 'center' }}>
                                    <Icon name={iconName} type={iconType} size={iconSize ? iconSize : sizes.icons.medium} color={iconColor ? iconColor : colors.appTextColor5} iconStyle={iconStyle} onPress={onPressIcon} />
                                </View>
                                :
                                null
                    }

                </Wrappers.RowWrapperBasic>
            </Wrappers.Wrapper>
            {
                error ?
                    <Wrappers.ComponentWrapper animation="shake">
                        <Spacers.Spacer height={sizes.TinyMargin} />
                        <Icons.IconWithText
                            iconName="alert-circle-outline"
                            //title="New"   
                            text={error}
                            tintColor={colors.error}
                            iconSize={sizes.icons.small}
                            textStyle={[{ fontSize: fontSize.small }]}
                        />
                    </Wrappers.ComponentWrapper>
                    :
                    null
            }
        </TouchableOpacity>
    );
}


const TextInputBordered_Multiline_Setting = ({ iconName, placeholderTextColor, error, iconType, required, left, onPress, content, keyboardType, title, isButton, titleStyle, placeholder, editable, animation, multiline, onFocus, buttonContentStyle, onBlur, onChangeText, secureTextEntry, value, iconColor, iconSize, containerStyle, inputContainerStyle, onPressIcon, inputStyle, right, iconStyle }) => {
    var focused = false
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={onPress}

        >
            <Wrappers.Wrapper animation={animation ? animation : 'fadeInUp'} style={[styles.textInputBorderedContainer2, containerStyle]}>

                <Wrappers.RowWrapperBasic style={[{
                    borderRadius: sizes.multiRadius,
                    borderWidth: 0.2,
                    borderColor: colors.appTextColor5,
                }, inputContainerStyle]}>
                    {
                        left ? left : null
                    }
                    <Wrappers.Wrapper style={{ flex: 8 }}>
                        {
                            title ?
                                <Wrappers.ComponentWrapper style={{ marginHorizontal: sizes.marginHorizontal / 2 }}>
                                    <Spacers.Spacer height={sizes.smallMargin} />
                                    <Texts.InputTitle style={[{ marginLeft: width(0.1), fontSize: totalSize(1.7), color: colors.textcolor }, titleStyle]}>
                                        {title}
                                        {
                                            required ?
                                                <RegularText style={{ color: colors.error, }}> *</RegularText>
                                                :
                                                null
                                        }
                                    </Texts.InputTitle>

                                </Wrappers.ComponentWrapper>
                                :
                                null
                        }
                        {
                            isButton ?
                                content ?
                                    content
                                    :
                                    <Wrappers.ComponentWrapper style={[{ paddingVertical: sizes.baseMargin }, buttonContentStyle]}>
                                        <Texts.Regular style={value ? null : appStyles.textGray}>{value ? value : placeholder}</Texts.Regular>
                                    </Wrappers.ComponentWrapper>
                                :
                                <TextInput
                                    onChangeText={onChangeText}
                                    value={value}
                                    placeholder={placeholder}
                                    editable={editable}
                                    keyboardType={keyboardType}
                                    multiline={multiline}
                                    placeholderTextColor={placeholderTextColor}
                                    // onFocus={() => focused = true, onFocus}
                                    // onBlur={() => focused = false, onBlur}
                                    secureTextEntry={secureTextEntry}
                                    style={[appStyles.inputFields, { width: null, color: colors.txtinput, height: height(15), paddingHorizontal: width(3), textAlignVertical: 'top' }, inputStyle]}
                                />
                        }
                    </Wrappers.Wrapper>
                    {
                        right ?
                            right
                            :
                            iconName ?
                                <View style={{ flex: 1, }}>
                                    <Icon name={iconName} type={iconType} size={iconSize ? iconSize : sizes.icons.medium} color={iconColor ? iconColor : colors.appTextColor5} iconStyle={iconStyle} onPress={onPressIcon} />
                                </View>
                                :
                                null
                    }

                </Wrappers.RowWrapperBasic>
            </Wrappers.Wrapper>
            {
                error ?
                    <Wrappers.ComponentWrapper style={{ marginLeft: width(7.5) }} animation="shake">
                        <Spacers.Spacer height={sizes.TinyMargin} />
                        <Icons.IconWithText
                            iconName="alert-circle-outline"
                            //title="New"   
                            text={error}
                            tintColor={colors.error}
                            iconSize={sizes.icons.small}
                            textStyle={[{ fontSize: fontSize.small }]}
                        />
                    </Wrappers.ComponentWrapper>
                    :
                    null
            }
        </TouchableOpacity>
    );
}



export { TextInputLowerBordered, Colored, Bordered, TextInputNoBorder, TextInputSearchBordered, TextInputBordered, TextInputSearchBorderedWithoutIcon, TextInputBordered_Multiline, TextInputBordered_simple, TextInputBordered_NoTitle, TextInputBordered_placeholder, TextInputBordered_Multiline_Setting, TextInputLowerBorder }


const styles = StyleSheet.create({
    //TextInputBorderd
    textInputBorderedContainer: {
        borderRadius: sizes.inputRadius,
        borderWidth: 1,
        borderColor: colors.appTextColor5,
        marginHorizontal: sizes.marginHorizontal,
    },
    textInputBorderedContainer1: {
        borderRadius: sizes.multiRadius,
        borderWidth: 1,
        borderColor: colors.appTextColor5,
        marginHorizontal: sizes.marginHorizontal,
    },
    textInputBorderedContainer2: {
        borderRadius: sizes.multiRadius,
        borderWidth: 0,
        borderColor: colors.appTextColor5,
        marginHorizontal: sizes.marginHorizontal,
    },

})