import React, { Component, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
} from 'react-native';
import {
  Images,
  ScrollViews,
  TextInputs,
  Texts,
  Wrappers,
} from '../../../components';
import Headers from '../../Headers/header';
import { styles } from './styles';
import {
  appImages,
  colors,
  fontFamily,
  profileScreenOptions,
  routes,
  sizes,
} from '../../../services';
import { height, totalSize, width } from 'react-native-dimension';
import Animated, { Extrapolate } from 'react-native-reanimated';
import { useDrawerProgress } from '@react-navigation/drawer';

const User_Post = ({ navigation, style }) => {
  const mapRef = useRef(null);

  const [tabs, setTabs] = useState(false);

  return (

    <Wrappers.MainWrapper style={styles.mainwarp}>
      <Headers title="Home" />

      <Wrappers.Wrapper style={styles.selectcateMain}>
        <TouchableOpacity onPress={() => setTabs(false)}>
          <Wrappers.Wrapper
            style={{
              ...styles.selectcate1,
              backgroundColor: tabs == false ? colors.headercolor : colors.snow,
            }}>
            <Texts.SmallTitle
              style={{
                ...styles.text1,
                color: tabs == false ? colors.snow : colors.textcolor,
              }}>
              Friends
            </Texts.SmallTitle>
          </Wrappers.Wrapper>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setTabs(true)}>
          <Wrappers.Wrapper
            style={{
              ...styles.selectcate2,
              backgroundColor: tabs == true ? colors.headercolor : colors.snow,
            }}>
            <Texts.SmallTitle
              style={{
                ...styles.text2,
                color: tabs == true ? colors.snow : colors.textcolor,
              }}>
              All Members
            </Texts.SmallTitle>
          </Wrappers.Wrapper>
        </TouchableOpacity>
      </Wrappers.Wrapper>

      {tabs == false ? (
        <ScrollViews.KeyboardAvoiding>
          <Wrappers.Wrapper style={styles.Viewheading}>
            <Texts.SmallTitle style={styles.Viewtext1}>
              Acts of Kindness
            </Texts.SmallTitle>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('kindnessAct');
              }}>
              <Texts.SmallText style={styles.Viewtext2}>
                {' '}
                View More
              </Texts.SmallText>
            </TouchableOpacity>
          </Wrappers.Wrapper>

          <Wrappers.Wrapper style={styles.postview}>
            <Wrappers.Wrapper style={styles.profile}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('profile');
                }}>
                <Wrappers.Wrapper style={styles.profile}>
                  <Images.Round
                    source={require('../../../assets/images/Ellipse.png')}
                    style={styles.profileimg}
                  />

                  <Wrappers.Wrapper>
                    <Texts.SmallTitle style={styles.username}>
                      Dark_Emeralds
                    </Texts.SmallTitle>
                    <Wrappers.Wrapper style={styles.usercate}>
                      <Texts.SmallTitle style={styles.usercateText}>
                        Spontaneous
                      </Texts.SmallTitle>
                    </Wrappers.Wrapper>
                  </Wrappers.Wrapper>
                </Wrappers.Wrapper>
              </TouchableOpacity>

              <Wrappers.Wrapper style={styles.veiwmes}>
                <Image
                  source={require('../../../assets/images/messageicon.png')}
                  style={styles.messicon}
                  resizeMode={'contain'}
                />
                <Texts.SmallText style={styles.msgstatus}>47</Texts.SmallText>
              </Wrappers.Wrapper>
            </Wrappers.Wrapper>

            <Texts.SmallText style={styles.postdetail}>
              Lloyd was very helpful today by taking my mother food and snacks
              for the week.
            </Texts.SmallText>

            <Image
              source={require('../../../assets/images/video.png')}
              style={styles.videodisp}
              resizeMode={'contain'}
            />

            <Wrappers.Wrapper style={styles.viewstatus}>
              <Images.Round
                source={require('../../../assets/images/Ellipse.png')}
                style={styles.viewper}
              />
              <Texts.SmallText style={styles.videodetail}>
                Connie and 56 other likes it
              </Texts.SmallText>
            </Wrappers.Wrapper>

            <Wrappers.Wrapper style={styles.lastview}>
              <Wrappers.Wrapper style={styles.applaud}>
                <Image
                  source={require('../../../assets/images/appluad_icon.png')}
                  style={styles.selecticon}
                  resizeMode={'contain'}
                />

                <Texts.SmallText style={styles.selecttext}>
                  Applaud
                </Texts.SmallText>
              </Wrappers.Wrapper>

              <Wrappers.Wrapper style={styles.comment}>
                <Image
                  source={require('../../../assets/images/messageicon.png')}
                  style={styles.commentsty}
                  resizeMode={'contain'}
                />
                <Texts.SmallText style={styles.videodetail}>
                  Comments
                </Texts.SmallText>
              </Wrappers.Wrapper>

              <Wrappers.Wrapper style={styles.comment}>
                <Image
                  source={require('../../../assets/images/share.png')}
                  style={styles.commentsty}
                  resizeMode={'contain'}
                />
                <Texts.SmallText style={styles.videodetail}>Share</Texts.SmallText>
              </Wrappers.Wrapper>
            </Wrappers.Wrapper>
          </Wrappers.Wrapper>

          <Wrappers.Wrapper style={styles.Viewheading}>
            <Texts.SmallTitle style={styles.Viewtext1}>
              Top Givers
            </Texts.SmallTitle>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('topGivers');
              }}>
              <Texts.SmallText style={styles.Viewtext2}>
                {' '}
                View More
              </Texts.SmallText>
            </TouchableOpacity>
          </Wrappers.Wrapper>

          <Wrappers.Wrapper style={styles.postview}>
            <FlatList
              data={TopGivers}
              renderItem={renderItem}
              keyExtractor={item => item}
              numColumns={5}
            />
          </Wrappers.Wrapper>

          <Wrappers.Wrapper style={styles.Viewheading}>
            <Texts.SmallTitle style={styles.Viewtext1}>
              Top Badges
            </Texts.SmallTitle>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('topBadgers');
              }}>
              <Texts.SmallText style={styles.Viewtext2}>
                {' '}
                View More
              </Texts.SmallText>
            </TouchableOpacity>
          </Wrappers.Wrapper>

          <Wrappers.Wrapper style={styles.postview}>
            <FlatList
              data={TopBadgers}
              renderItem={renderItems}
              keyExtractor={item => item}
              numColumns={5}
            />
          </Wrappers.Wrapper>

          <Wrappers.Wrapper style={styles.Viewheading}>
            <Texts.SmallTitle style={styles.Viewtext1}>
              Opportunities to Give
            </Texts.SmallTitle>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate(routes.Oppertunities);
              }}>
              <Texts.SmallText style={styles.Viewtext2}>
                View More
              </Texts.SmallText>
            </TouchableOpacity>
          </Wrappers.Wrapper>

          <Wrappers.Wrapper style={styles.postview}>
            <Texts.SmallTitle style={styles.milesheading}>
              Feed Seniors
            </Texts.SmallTitle>

            <Wrappers.Wrapper>
              <Texts.SmallTitle style={styles.miles}>
                With Doorways for women and families
              </Texts.SmallTitle>
            </Wrappers.Wrapper>

            <Wrappers.Wrapper style={styles.veiwmes1}>
              <Texts.SmallText style={styles.milestatus}>
                4.7 Miles
              </Texts.SmallText>
            </Wrappers.Wrapper>
          </Wrappers.Wrapper>

          <Wrappers.Wrapper style={styles.bottommargin}>
            <Texts.SmallTitle style={styles.milesheading}>
              Feed Seniors
            </Texts.SmallTitle>

            <Wrappers.Wrapper>
              <Texts.SmallTitle style={styles.miles}>
                With Doorways for women and families
              </Texts.SmallTitle>
            </Wrappers.Wrapper>

            <Wrappers.Wrapper style={styles.veiwmes1}>
              <Texts.SmallText style={styles.milestatus}>
                4.7 Miles
              </Texts.SmallText>
            </Wrappers.Wrapper>
          </Wrappers.Wrapper>
        </ScrollViews.KeyboardAvoiding>
      ) : null}
    </Wrappers.MainWrapper>
    // </Animated.View >
  );
};

export default User_Post;