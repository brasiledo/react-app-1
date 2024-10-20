import { Dimensions, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { Modals, Spacers, Texts, Wrappers } from '../../../components';
import { OnBoardings } from '../../../services/dummyData';
import { styles } from './styles';
import { colors, routes } from '../../../services';
import { totalSize } from 'react-native-dimension';
import { useSelector } from 'react-redux';
import { saveData } from '../../../services/utils/utility';
import Translate from '../../../services/languageStrings/translate';
const { width, height } = Dimensions.get('window');

const OnBoarding = props => {
  const ref = useRef();
  // Redux Data
  const reduxData = useSelector(state => state?.Auth?.user)

  //useStates
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState(reduxData ?? {});

  //All useEffects
  useEffect(() => {
    setUser(reduxData ?? {})
  }, [reduxData])

  // All Functions
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const updateDotIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  }

  const onEndReached = () => {
    setTimeout(() => {
      setModalVisible(!isModalVisible)
    }, 1000);
  }

  // onPressSkip
  const onPressSkip = () => {
    setModalVisible(false)
    setTimeout(() => {
      saveData('Users', user?.userId, { firstTimeLogin: false })
      props.navigation.replace(routes.app);
    }, 500);

  }

  // onPresssNext
  const onPresssNext = () => {
    // setModalVisible(false)
    // setTimeout(() => {
    //   props.navigation.replace(routes.toturials);
    // }, 500);

  }

  // flatlist render
  const renderOnBoardings = ({ item }) => {
    return (
      <Wrappers.Wrapper style={styles.flatlist}>
        <Spacers.DoubleBase />
        <Spacers.DoubleBase />
        <Spacers.DoubleBase />
        <Image source={item?.image} resizeMode="contain" style={styles.image} />
        <Spacers.DoubleBase />
        <Spacers.Base />
        <Texts.Medium style={styles.title}>{item?.title}</Texts.Medium>
        <Spacers.DoubleBase />
        <Texts.Medium style={styles.description}>
          {item?.description}
        </Texts.Medium>
      </Wrappers.Wrapper>
    );
  };

  // Dots
  const Dots = ({ isActive }) => {
    return (
      <Wrappers.Wrapper
        style={{
          width: totalSize(1.2),
          height: totalSize(1.2),
          borderRadius: totalSize(1),
          marginHorizontal: 5,
          backgroundColor: isActive ? colors.textColor : colors.gray,
        }}
      />
    );
  };

  return (
    <Wrappers.Wrapper style={styles.wrapper}>
      <FlatList
        ref={ref}
        data={OnBoardings}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        contentContainerStyle={{ zIndex: 100 }}
        showsHorizontalScrollIndicator={false}
        renderItem={renderOnBoardings}
        onMomentumScrollBegin={updateCurrentSlideIndex}
        onMomentumScrollEnd={updateDotIndex}
        onEndReached={() => onEndReached()}
      />

      <Wrappers.RowWrapperBasic style={styles.dots}>
        {OnBoardings.map((_, index) => (
          <Dots key={index} isActive={index == currentSlideIndex} />
        ))}
      </Wrappers.RowWrapperBasic>

      <Modals.OnBoardingModal
        isVisible={isModalVisible}
        toggleModal={() => setModalVisible(!isModalVisible)}
        Title={Translate('OnBoardingScreen.modalTitle')}
        onPressSkip={() => onPressSkip()}
        onPresssNext={() => onPresssNext()}
      />
    </Wrappers.Wrapper>
  );
};

export default OnBoarding;
