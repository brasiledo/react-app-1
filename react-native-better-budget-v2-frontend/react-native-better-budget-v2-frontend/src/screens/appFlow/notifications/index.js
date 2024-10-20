import React, { useState, useEffect } from 'react';
import { Headers, Modals, StaticComponents, Wrappers } from '../../../components';
import { FlatList } from 'react-native';
import { SwipableListButtonNotifications } from '../../../screenComponents/notifications';
import { dummyNotifications } from '../../../services/dummyData';
import { styles } from './styles';
import { routes } from '../../../services';
import { useSelector } from 'react-redux';
import Translate from '../../../services/languageStrings/translate';

const Notifications = ({ navigation }) => {

  // All useStates
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [allNotifications, setAllNotifications] = useState(dummyNotifications ?? []);
  const [notificationDetail, setNotificationDetail] = useState('');
  const [editNotification, setEditNotification] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [currentlyOpenIndex, setCurrentlyOpenIndex] = useState('')
  const [showNotiticationModal, setShowNotificationModal] = useState(false);

  //All Functoions
  // when press on 'edit' or 'done' text
  const onPressHeaderLeftText = () => {
    setSelectedNotifications([])
    setEditNotification(!editNotification)
  }

  // selected expenses list
  const onClickNotifications = id => {
    if (selectedNotifications.includes(id) === true) {
      const updatedArr = selectedNotifications.filter(e => e !== id);
      setSelectedNotifications(updatedArr);
    } else {
      var array1 = [...selectedNotifications, id];
      setSelectedNotifications(array1);
    }
  };

  // Expenses delete Function
  const onPressDelete = (item) => {
    if (item) {
      const filteredExpenses = allNotifications?.filter(
        (i, index) => i?.id !== item?.id);
      setAllNotifications(filteredExpenses);
      setSelectedNotifications([])
    } else {
      const filteredExpenses = allNotifications?.filter(
        (item, index) => !selectedNotifications.includes(index),
      );
      setAllNotifications(filteredExpenses);
      setSelectedNotifications([])
    }
  }

  // When user press on notification to see details
  const onPressNotification = (item) => {
    setNotificationDetail(item?.notificationText)
    setShowNotificationModal(!showNotiticationModal)
  }

  // render flatlist for expenses
  const showNotifications = ({ item, index }) => {
    return (
      <SwipableListButtonNotifications
        index={editNotification ? '' : index}
        currentlyOpenIndex={currentlyOpenIndex}
        setCurrentlyOpenIndex={() => setCurrentlyOpenIndex(editNotification ? '' : index)}
        NotificationText={index !== 1 ? item?.notificationText + ` ${Translate('NotificationScreen.showMore')}` : item?.notificationText}
        NotificationTime={item?.notificationTime}
        editNotification={editNotification}
        onPressNotification={() => {
          index !== 1 ?
            onPressNotification(item)
            : {}
        }}
        checked={selectedNotifications.includes(index) === true ? true : false}
        onValueChange={() => onClickNotifications(index)}
        onPress={() => {
          setEditNotification(!editNotification)
          onPressDelete(item)
        }}
      />
    )
  }

  return (
    <Wrappers.Wrapper style={styles.main}>
      {allNotifications.length > 0 ?
        <Headers.Main
          title={Translate('Notifications')}
          leftTitle={editNotification ? Translate('Done') : Translate('Edit')}
          rightTitle={editNotification ? Translate('Delete') : '         '}
          onPressLeftText={() => onPressHeaderLeftText()}
          onPressRightText={() => setDeleteModal(!deleteModal)}
        />
        :
        <Headers.EmptyViewHeader
          title={Translate('Notifications')}
          onPressProfileIcon={() => navigation.navigate(routes.setting)}
        />
      }

      <FlatList
        data={allNotifications}
        ListEmptyComponent={() => {
          return (
            <StaticComponents.EmptyView LottieView Text={Translate('NotificationScreen.emptyViewText')} />
          )
        }}
        renderItem={showNotifications}
        keyExtractor={item => item.id}
      />

      <Modals.DeleteModal
        isVisible={deleteModal}
        toggleModal={() => setDeleteModal(!deleteModal)}
        onChangeVisibility={() => setDeleteModal(!deleteModal)}
        Title={Translate('deleteModalTitle')}
        onPresssDelete={() => {
          onPressDelete()
          setDeleteModal(!deleteModal)
          setEditNotification(!editNotification)
        }}
        onPressCancel={() => setDeleteModal(!deleteModal)}
      />

      <Modals.ShowNotificationModal
        isVisible={showNotiticationModal}
        toggleModal={() => setShowNotificationModal(!showNotiticationModal)}
        onChangeVisibility={() => setShowNotificationModal(!showNotiticationModal)}
        Title={notificationDetail}
      />

    </Wrappers.Wrapper >
  );
};

export default Notifications;
