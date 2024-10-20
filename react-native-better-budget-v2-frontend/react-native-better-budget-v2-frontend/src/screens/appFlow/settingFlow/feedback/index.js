import React, { useState } from 'react'
import { Buttons, Headers, Spacers, TextInputs, Texts, Wrappers } from '../../../../components'
import { colors } from '../../../../services'
import { styles } from './styles'
import Translate from '../../../../services/languageStrings/translate'

const Feedback = ({ navigation }) => {
    // All useStates
    const [feedback, setFeedback] = useState('')
    const [loading, setLoading] = useState(false)

    // All Functions
    // submit click
    const onPressSubmit = () => {
        setLoading(true)
        navigation.goBack()
        setLoading(false)
    }

    return (
        <Wrappers.Wrapper style={styles.main}>
            <Headers.Main title={Translate('FeedbackScreen.Title')} onBackPress={() => navigation.goBack()} />
            <Spacers.Base />

            <Wrappers.Component>
                <Texts.SmallText style={styles.title}>{Translate('FeedbackScreen.inputTitle')}</Texts.SmallText>
                <Spacers.Small />

                <TextInputs.TextInputBordered_Multiline
                    placeholder={Translate('FeedbackScreen.inputPlaceholder')}
                    multiline={true}
                    placeholderTextColor={colors.graySilver}
                    value={feedback}
                    onChangeText={fb => setFeedback(fb)}
                    containerStyle={{
                        backgroundColor: colors.snow,
                        borderWidth: 0,
                        color: colors.textColor,
                    }}
                />

                <Spacers.Base />
                <Wrappers.Component>
                    <Buttons.ButtonColored
                        text={Translate('Submit')}
                        buttonColor={feedback ? colors.textColor : colors.disableText}
                        tintColor={colors.white}
                        onPress={() => onPressSubmit()}
                        isLoading={loading}
                        disabled={feedback ? false : true}
                    />
                </Wrappers.Component>

            </Wrappers.Component>
        </Wrappers.Wrapper>
    )
}

export default Feedback;