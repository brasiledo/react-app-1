import React, { useState } from 'react';
import { FlatList, Image, LayoutAnimation, Pressable, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { Headers, Spacers, Texts, Wrappers } from '../../../components';
import { appIcons, appImages, expenseImage } from '../../../services';
import { styles } from './styles';
import Translate from '../../../services/languageStrings/translate';

const ExpenseBreakdown = ({ navigation }) => {
    // All useStates
    const [expenses, setExpenses] = useState([
        { expenseCategory: 'Housing', expenseCategoryAmount: '$ 2,000', expenses: [{ expenseName: 'Mortage/Rent', ExpenseAmount: '$ 2,000' }, { expenseName: 'Mortage/Rent', ExpenseAmount: '$ 2,000' }] },
        { expenseCategory: 'Transportation', expenseCategoryAmount: '$ 2,000', expenses: [{ expenseName: 'Mortage/Rent', ExpenseAmount: '$ 2,000' }, { expenseName: 'Mortage/Rent', ExpenseAmount: '$ 2,000' }] },
        { expenseCategory: 'Groceries', expenseCategoryAmount: '$ 2,000', expenses: [{ expenseName: 'Mortage/Rent', ExpenseAmount: '$ 2,000' }, { expenseName: 'Mortage/Rent', ExpenseAmount: '$ 2,000' }] },
    ]);

    // Flatlist render items
    const renderItem = ({ item }) => {
        return (
            <Wrappers.RowBasic style={styles.innerItemView}>
                <Texts.SmallText style={styles.expenseName}>
                    {item.expenseName}
                </Texts.SmallText>
                <Texts.SmallText style={styles.expenseName}>
                    {item.ExpenseAmount}
                </Texts.SmallText>
            </Wrappers.RowBasic>
        );
    };

    // All Functions
    //Component for collaps data
    function CollapsibleHeader() {
        const [active, setActive] = useState(null);
        return (
            <ScrollView>
                {expenses.map((item, i) => (
                    <Item
                        key={i}
                        i={i}
                        expenseCategory={item.expenseCategory}
                        expenseCategoryAmount={item?.expenseCategoryAmount}
                        active={active}
                        setActive={setActive}
                        expenses={item?.expenses}
                    />
                ))}
            </ScrollView>
        );
    }

    // use in collaps data component
    const Item = ({
        i,
        expenseCategory,
        expenseCategoryAmount,
        active,
        setActive,
        expenses,
    }) => {
        const onPress = () => {
            LayoutAnimation.easeInEaseOut();
            setActive(i == active ? null : i);
        };
        const open = active == i;
        return (
            <Wrappers.Wrapper>
                <Pressable onPress={onPress}>
                    <Wrappers.RowBasic style={{ ...styles.expenseView, borderBottomWidth: open ? 0 : 1 }}>
                        <Wrappers.RowWrapperBasic>
                            <Wrappers.Component>
                                <Image
                                    source={expenseImage(expenseCategory)}
                                    style={styles.imageStyle}
                                    resizeMode="contain"
                                />
                            </Wrappers.Component>

                            <Wrappers.Wrapper style={styles.categoryView}>
                                <Texts.SmallTitle style={styles.categoryName}>{expenseCategory}</Texts.SmallTitle>
                                <Spacers.Tiny />
                                <Texts.SmallText style={styles.categoryAmount}>{expenseCategoryAmount}</Texts.SmallText>
                            </Wrappers.Wrapper>
                        </Wrappers.RowWrapperBasic>

                        <Wrappers.Wrapper style={styles.iconStyle} >
                            <Icon name={open ? 'triangle-up' : 'triangle-down'} type='entypo' size={13} />
                        </Wrappers.Wrapper>
                    </Wrappers.RowBasic>

                </Pressable>

                {open && (
                    <FlatList
                        data={expenses}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                )}
            </Wrappers.Wrapper>
        );
    };


    return (
        <Wrappers.Wrapper style={styles.main}>
            <Headers.Main
                title={Translate('ExpenseCategoryBreakdownScreen.expenseCategoryBreakdown')}
                onBackPress={() => navigation.goBack()}
            />

            <Wrappers.Wrapper style={styles.headingView}>
                <Texts.SmallText style={styles.headingText}>{Translate('ExpenseCategoryBreakdownScreen.expenseCategory')}</Texts.SmallText>
            </Wrappers.Wrapper>
            <CollapsibleHeader />

        </Wrappers.Wrapper>
    );
};

export default ExpenseBreakdown;
