import moment from 'moment';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { LineChart, Tooltip } from 'react-native-chart-kit';
import { totalSize, width, height } from 'react-native-dimension';
import { Spacers, Texts, Wrappers } from '../../components';
import { colors, fontFamily } from '../../services';
import Translate from '../../services/languageStrings/translate';
import { formatNumberAbbreviated } from '../../services/functions';
import { convert_numbers } from '../../services/utils/helperFunctions';

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

export const NoDebtsChart = ({ data, subData, backgroundColor, showing, setShowing }) => {

    const mainDataGraph = data?.map((i) => i?.savingAmount)
    const subDataGraph = subData?.map((i) => i?.savingAmount)
    return (
        <>
            <LineChart
                data={{
                    datasets: [
                        {
                            data: mainDataGraph
                        },
                        {
                            data: subDataGraph
                        }
                    ]
                }}
                style={{ paddingLeft: 0, paddingRight: 0 }}
                width={width(100)}
                height={height(15)}
                yAxisLabel="$"
                yAxisSuffix="k"
                // withDots={false}
                withInnerLines={false}
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

                onDataPointClick={({ index }) => setShowing(index)}
                renderDotContent={({ x, y, index }) => (
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            left: x - 20, // Adjust the X position of the dot
                            top: y - 40, // Adjust the Y position of the dot
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'transparent',
                            zIndex: 2, // Ensure touchables are above the chart dots
                        }}
                        onPress={() => setShowing(index)}
                    >
                        {index === showing &&
                            <Wrappers.Primary animation={'fadeIn'} style={{}}>
                                <Texts.Medium>
                                    {`$ ${convert_numbers(parseFloat(data[index]?.savingAmount ?? 0))}`}
                                </Texts.Medium>
                                <Texts.Medium>
                                    {data[index]?.payDate}
                                </Texts.Medium>
                            </Wrappers.Primary>
                        }

                    </TouchableOpacity>
                )}
                bezier
            />

        </>
    );
};

export const DebtsChart = ({ data, backgroundColor }) => {
    const [showing, setShowing] = useState(0)
    const mainDataGraph = data?.map((i) => i?.debtAmount)

    return (
        <>
            <LineChart
                data={{
                    // labels: data?.map((i) => i?.payDate),
                    datasets: [
                        {
                            data: mainDataGraph
                        },
                    ]
                }}
                style={{ paddingLeft: 0, paddingRight: 0 }}
                width={width(100)}
                height={height(15)}
                yAxisLabel="$"
                yAxisSuffix="k"
                // withDots={false}
                withInnerLines={false}
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

                onDataPointClick={({ index }) => setShowing(index)}
                renderDotContent={({ x, y, index }) => (
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            left: x - 10, // Adjust the X position of the dot
                            top: y - 30, // Adjust the Y position of the dot
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'transparent',
                            zIndex: 2, // Ensure touchables are above the chart dots
                        }}
                        onPress={() => setShowing(index)}
                    >
                        {index === showing &&
                            <Wrappers.Primary animation={'fadeIn'}>
                                <Texts.SmallText>
                                    {formatNumberAbbreviated(parseFloat(data[index]?.debtAmount ?? 0))}
                                </Texts.SmallText>
                                <Texts.SmallText>
                                    {data[index]?.payDate}
                                </Texts.SmallText>
                            </Wrappers.Primary>
                        }

                    </TouchableOpacity>
                )}
                bezier
            />

        </>
    );
};

export const ChartDate = ({ startAmount, endAmount, startDate, lastDate }) => {
    return (
        <Wrappers.Wrapper>
            <Wrappers.RowBasic>
                <Texts.Medium style={styles.chartTextDate}>{convert_numbers(startAmount)}</Texts.Medium>
                <Texts.Medium style={styles.chartTextDate}>{convert_numbers(endAmount)}</Texts.Medium>
            </Wrappers.RowBasic>

            {/* <Wrappers.RowBasic>
                <Texts.Medium style={styles.chartTextDate}>{Translate('InsightsScreen.currentDate')}</Texts.Medium>
                <Texts.Medium style={styles.chartTextDate}>{Translate('InsightsScreen.projectedDate')}</Texts.Medium>
            </Wrappers.RowBasic> */}

            <Wrappers.RowBasic>
                <Texts.Medium style={styles.chartTextDate}>{moment(startDate, 'MM/DD/YYYY').format('ll')}</Texts.Medium>
                <Texts.Medium style={styles.chartTextDate}>{moment(lastDate, 'MM/DD/YYYY').format('ll')}</Texts.Medium>
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
        fontSize: totalSize(1.5),
        fontFamily: fontFamily.appTextBold,
        color: colors.placeholderColor,
    },
    chartText: {
        fontSize: totalSize(1.1),
        fontFamily: fontFamily.appTextRegular,
        color: colors.placeholderColor,
    },
});
