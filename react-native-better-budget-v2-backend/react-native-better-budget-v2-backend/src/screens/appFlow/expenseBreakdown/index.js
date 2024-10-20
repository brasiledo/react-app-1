import React, { useEffect, useState } from 'react';
import { FlatList, Image, LayoutAnimation, Pressable, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { Headers, Spacers, Texts, Wrappers } from '../../../components';
import { appIcons, appImages, expenseImage } from '../../../services';
import { styles } from './styles';
import Translate from '../../../services/languageStrings/translate';
import { useSelector } from 'react-redux';
import { categorizeExpenses } from '../../../services/functions';
import { convert_numbers } from '../../../services/utils/helperFunctions';

const ExpenseBreakdown = ({ navigation, route }) => {

    let redux_myBudget = useSelector(state => state?.App?.userBudget)
    const [selectedBudget, setSelectedBudget] = useState(redux_myBudget ?? {})
    const [categoryBreakdown, setCategoryBreakdown] = useState([])

    const { data } = route.params

    console.log('data', data)

    useEffect(() => {
        calculateExpenseBreakdown(data)
    }, [data])

    const calculateExpenseBreakdown = (data) => {
        const result = [];

        data.forEach(subarray => {
            if (subarray.length === 0) {
                return; // Skip empty subarrays
            }
        
            subarray.forEach(item => {
                const category = item.expenseName;
                let categoryObj = result.find(obj => obj.category === category);
        
                if (!categoryObj) {
                    categoryObj = { category, data: [], totalExpenseAmount: 0 };
                    result.push(categoryObj);
                }
        
                categoryObj.data.push(item);
                categoryObj.totalExpenseAmount += parseFloat(item.expenseAmount);
            });
        });
        
        setCategoryBreakdown(result)
        console.log(JSON.stringify(result, null, 2), result.length);
    }

    // Flatlist render items
    const renderItem = ({ item }) => {
        return (
            <Wrappers.RowBasic style={styles.innerItemView}>
                <Texts.SmallText style={styles.expenseName}>
                    {item.userExpenseName}
                </Texts.SmallText>
                <Texts.SmallText style={styles.expenseName}>
                    {`$ ${convert_numbers(item.expenseAmount)}`}
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
                {categoryBreakdown?.map((item, i) => {
                    return(
                        <Item
                            key={i}
                            i={i}
                            expenseCategory={item?.category}
                            expenseCategoryAmount={`$ ${convert_numbers(item?.totalExpenseAmount)}`}
                            active={active}
                            setActive={setActive}
                            expenses={item?.data}
                        />
                    )
                })}
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
                tooltipStatus={false}
            />

            <Wrappers.Wrapper style={styles.headingView}>
                <Texts.SmallText style={styles.headingText}>{Translate('ExpenseCategoryBreakdownScreen.expenseCategory')}</Texts.SmallText>
            </Wrappers.Wrapper>
            <CollapsibleHeader />

        </Wrappers.Wrapper>
    );
};

export default ExpenseBreakdown;
