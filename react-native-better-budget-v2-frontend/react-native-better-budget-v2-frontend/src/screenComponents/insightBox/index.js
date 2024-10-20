import moment from 'moment';
import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { totalSize, width, height } from 'react-native-dimension';
import { Spacers, Texts, Wrappers } from '../../components';
import { colors, fontFamily } from '../../services';
import Translate from '../../services/languageStrings/translate';

export const BudgetDetailBox = ({ budgetAmount, budgetDetail, backgroundColor }) => {
    return (
        <Wrappers.Wrapper style={{ ...styles.main, backgroundColor: backgroundColor ?? colors.black }}>
            <Spacers.Small />
            <Texts.SmallText style={styles.amount}>{budgetAmount}</Texts.SmallText>
            <Spacers.Small />
            <Texts.SmallText style={styles.amountDetail}>{budgetDetail}</Texts.SmallText>
            <Spacers.Small />
        </Wrappers.Wrapper>
    );
};

export const NoDebtsChart = ({ data, backgroundColor }) => {
    return (
        <LineChart
            data={{
                datasets: [
                    {
                        data: data,
                    },
                ],
            }}
            style={{ paddingLeft: 0, paddingRight: 0 }}
            width={Dimensions.get('window').width * 1.88}
            height={height(10)}
            withHorizontalLabels={false}
            withHorizontalLines={false}
            withDots={false}
            hideLegend={false}
            withInnerLines={false}
            withOuterLines={false}
            chartConfig={{
                backgroundColor: '#e26a00',
                backgroundGradientFrom: colors.white,
                backgroundGradientTo: colors.white,
                backgroundGradientFromOpacity: backgroundColor ? 0 : 1,
                backgroundGradientToOpacity: backgroundColor ? 0 : 1,
                fillShadowGradientTo: `rgba(251, 174, 0, 1)`,
                fillShadowGradientFrom: `rgba(251, 174, 0, 1)`,
                fillShadowGradientFromOpacity: 0.6,
                color: () => `rgba(251, 174, 0, 1)`,
            }}
        />
    );
};

export const DebtsChart = ({ data, backgroundColor }) => {
    return (
        <LineChart
            data={{
                datasets: [
                    {
                        data: data,
                    },
                ],
            }}
            style={{ paddingLeft: 0, paddingRight: 0 }}
            width={Dimensions.get('window').width * 1.88}
            height={height(10)}
            withHorizontalLabels={false}
            withDots={false}
            withInnerLines={false}
            withOuterLines={false}
            chartConfig={{
                backgroundGradientFrom: colors.white,
                backgroundGradientTo: colors.white,
                backgroundGradientFromOpacity: backgroundColor ? 0 : 1,
                backgroundGradientToOpacity: backgroundColor ? 0 : 1,
                fillShadowGradientTo: `rgba(255, 0, 0, 1)`,
                fillShadowGradientFrom: `rgba(255, 0, 0, 1)`,
                fillShadowGradientFromOpacity: 0.6,
                color: () => `rgba(255, 0, 0, 1)`,
            }}
        />
    );
};

export const ChartDate = ({ data }) => {
    return (
        <Wrappers.Wrapper>
            <Wrappers.RowBasic>
                <Texts.SmallText style={styles.chartTextDate}>{moment().format('ll')}</Texts.SmallText>
                <Texts.SmallText style={styles.chartTextDate}>{moment().format('ll')}</Texts.SmallText>
            </Wrappers.RowBasic>

            <Wrappers.RowBasic>
                <Texts.SmallText style={styles.chartText}>{Translate('InsightsScreen.currentDate')}</Texts.SmallText>
                <Texts.SmallText style={styles.chartText}>{Translate('InsightsScreen.projectedDate')}</Texts.SmallText>
            </Wrappers.RowBasic>
        </Wrappers.Wrapper>
    );
};

const styles = StyleSheet.create({
    main: {
        borderRadius: 10,
        alignItems: 'center',
        width: width(25),
        marginHorizontal: width(2.5)
    },
    amount: {
        fontSize: totalSize(1.9),
        color: colors.white,
        fontFamily: fontFamily.appTextBold,
    },
    amountDetail: {
        fontSize: totalSize(1.3),
        color: colors.white,
        fontFamily: fontFamily.appTextRegular,
    },
    //ChartDate
    chartTextDate: {
        fontSize: totalSize(1.3),
        fontFamily: fontFamily.appTextBold,
        color: colors.placeholderColor,
    },
    chartText: {
        fontSize: totalSize(1.1),
        fontFamily: fontFamily.appTextRegular,
        color: colors.placeholderColor,
    },
});
