import React, { useEffect, useState } from 'react'
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Buttons, Headers, Images, Modals, ScrollViews, Spacers, TextInputs, Texts, Wrappers } from '../../../../components';
import { ProfileToggleView } from '../../../../screenComponents/profileToggleView';
import { appIcons, colors, imagePicker, routes, Validations } from '../../../../services';
import { ProfileScreenData } from '../../../../services/dummyData';
import { styles } from './styles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import Translate from '../../../../services/languageStrings/translate';
import { useDispatch, useSelector } from 'react-redux';
import { saveData, uploadGalleryImages } from '../../../../services/utils/utility';
import { Users } from '../../../../Redux/actions/Auth';

const Profile = ({ navigation }) => {
    const dispatch = useDispatch()

    // Redux Data
    const user_redux = useSelector(state => state?.Auth?.user)

    //useStates
    const [user, setUser] = useState(user_redux ?? {});
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    // const [isSwitchOn, setIsSwitchOn] = useState([]);
    const [passcodeToggle, setPasscodeToggle] = useState(true);
    const [faceIdToggle, setFaceIdToggle] = useState(false);
    const [reminderToggle, setReminderToggle] = useState(true);
    const [reminderTime, setReminderTime] = useState('');
    const [loadingImage, setLoadingImage] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    //loaders
    const [loading, setLoading] = useState(false)

    //All useEffects
    useEffect(() => {
        setUser(user_redux ?? {})
        setFirstName(user_redux?.firstName)
        setLastName(user_redux?.lastName)
        setEmail(user_redux?.email)
        setImageUrl(user_redux?.photo)
    }, [user_redux])

    //All Functions
    // new budget reminder time
    const handleConfirmReminderTime = time => {
        setReminderTime(moment(time).format('hh:mm A'));
        setTimePickerVisibility(!isTimePickerVisible)
    };

    // Header save button validations
    const saveBtnValidation = () => {
        if (user?.firstName == firstName &&
            user?.lastName == lastName && user?.photo === imageUrl
        ) {
            return true
        } else {
            return false
        }
    }

    // when user press save button
    const onPressSaveBtn = async () => {
        setLoading(true)
        if (!imageUrl.includes('firebasestorage')) {
            const filename = imageUrl.substring(imageUrl.lastIndexOf('/') + 1)
            let photo = await uploadGalleryImages(imageUrl, filename)
            user.photo = photo
        }

        user.firstName = firstName
        user.lastName = lastName
        // user.email = email
        dispatch(Users(user))
        await saveData('Users', user.userId, user)
        setLoading(false)
        navigation.navigate(routes.setting)
    }

    return (
        <Wrappers.Wrapper style={styles.main}>
            <Headers.Main
                title={Translate('ProfileScreen.Profile')}
                rightTitle={Translate('MyBudgetScreen.Save')}
                color={saveBtnValidation() ? colors.disableText : colors.dodgerBlue}
                onPressRightText={() => onPressSaveBtn()}
                onBackPress={() => navigation.goBack()}
                tooltipStatus={false} 
                loading={loading}
                />
                
            <Spacers.Base />

            <ScrollViews.KeyboardAvoiding>
                <Spacers.Base />
                <Wrappers.Wrapper>
                    <Wrappers.Component>
                        {loadingImage ?
                            <Wrappers.Wrapper style={{ ...styles.userProfile, borderWidth: 1, borderRadius: 100, borderColor: colors.grayToggle }}>
                                <ActivityIndicator
                                    color={colors.headercolor}
                                    size={'small'}
                                    style={styles.loadingIcon}
                                />
                            </Wrappers.Wrapper>
                            :
                            <Images.Round
                                source={imageUrl ? { uri: imageUrl } : appIcons.noUser}
                                resizeMode="contain"
                                style={styles.userProfile}
                            />
                        }
                        <Spacers.Base />
                        <Wrappers.RowBasic style={styles.planView}>
                            <Texts.SmallText style={styles.planText}>{Translate('ProfileScreen.planTitle')}</Texts.SmallText>
                            <Texts.SmallText style={styles.planText}>{Translate('ProfileScreen.Upgrade')}</Texts.SmallText>
                        </Wrappers.RowBasic>
                        <Spacers.Base />

                        <Wrappers.RowBasic>
                            <TextInputs.TextInputLowerBorder
                                title={Translate('SignUpScreen.firstName')}
                                placeholder={Translate('SignUpScreen.firstName')}
                                value={firstName}
                                onChangeText={fn => setFirstName(fn)}
                                inputContainerStyle={styles.username}
                                widthError={styles.rowInput}
                            />

                            <TextInputs.TextInputLowerBorder
                                title={Translate('SignUpScreen.lastName')}
                                placeholder={Translate('SignUpScreen.lastName')}
                                value={lastName}
                                onChangeText={ln => setLastName(ln)}
                                inputContainerStyle={styles.username}
                                widthError={styles.rowInput}
                            />
                        </Wrappers.RowBasic>

                        <Spacers.Base />
                        <TextInputs.TextInputLowerBorder
                            // inputStyle={{ color: colors.disableText }}
                            title={Translate('Email')}
                            // editable={false}
                            placeholder={Translate('emailPlaceholder')}
                            placeholderColor={colors.graySilver}
                            value={email}
                            onChangeText={e => setEmail(e)}
                        />

                    </Wrappers.Component>

                    <Spacers.Small />

                    {/* <ProfileToggleView
                        value={passcodeToggle}
                        onValueChange={() => {
                            setPasscodeToggle(!passcodeToggle)
                            setFaceIdToggle(!faceIdToggle)
                        }}
                        topLine={true}
                        Title={Translate('ProfileScreen.Passcode')}
                        iconName={'lock'}
                    /> */}
                    {/* <ProfileToggleView
                        value={faceIdToggle}
                        onValueChange={() => {
                            setFaceIdToggle(!faceIdToggle)
                            setPasscodeToggle(!passcodeToggle)
                        }}
                        topLine={false}
                        Title={Translate('ProfileScreen.faceId')}
                        imageName={appIcons.faceId}
                    /> */}
                    {/* <ProfileToggleView
                        value={reminderToggle}
                        onValueChange={() => setReminderToggle(!reminderToggle)}
                        topLine={false}
                        Title={Translate('ProfileScreen.Reminders')}
                        imageName={appIcons.notifications}
                    /> */}


                    <Wrappers.Component>
                        {/* <Spacers.Base /> */}
                        {/* <TextInputs.TextInputLowerBorder
                            title={Translate('ProfileScreen.reminderTitle')}
                            placeholder="05:00 AM"
                            placeholderColor={colors.graySilver}
                            value={reminderTime}
                            editable={false}
                            right={
                                <TouchableOpacity onPress={() => setTimePickerVisibility(!isTimePickerVisible)}>
                                    <Icon
                                        name='clock'
                                        type='feather'
                                        size={20}
                                    />
                                </TouchableOpacity>
                            }
                        /> */}

                        <Spacers.DoubleBase />
                        <Buttons.SimpleButton
                            text={Translate('ProfileScreen.btnTitle')}
                            buttonColor={colors.lightRed}
                            tintColor={colors.redColor}
                            onPress={() => setDeleteModal(!deleteModal)}
                            right={
                                <Icon
                                    name='delete-outline'
                                    type='MaterialCommunityIcons'
                                    size={20}
                                    color={colors.redColor}
                                    style={{ marginRight: '2%' }}
                                />
                            }
                        />

                    </Wrappers.Component>
                </Wrappers.Wrapper>

                <Wrappers.Wrapper style={styles.editProfile}>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => imagePicker(setLoadingImage, setImageUrl)}>
                        <Icon
                            name='edit'
                            type='feather'
                            size={12}
                            color={colors.white}
                        />
                    </TouchableOpacity>
                </Wrappers.Wrapper>

                <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode="time"
                    onConfirm={handleConfirmReminderTime}
                    onCancel={() => setTimePickerVisibility(!isTimePickerVisible)}
                />

                <Modals.DeleteModal
                    isVisible={deleteModal}
                    toggleModal={() => setDeleteModal(!deleteModal)}
                    onChangeVisibility={() => setDeleteModal(!deleteModal)}
                    Title={Translate('ProfileScreen.deleteModalTitle')}
                    onPresssDelete={() => {
                        setDeleteModal(!deleteModal)
                    }}
                    onPressCancel={() => setDeleteModal(!deleteModal)}
                />
            </ScrollViews.KeyboardAvoiding>

        </Wrappers.Wrapper>
    )
}

export default Profile;