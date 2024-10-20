import React, { useEffect, useState } from 'react';
import { appIcons, appImages, colors, fontFamily } from '../../services';
import { Wrappers, Texts, Icons, Images } from '..';
import { ActivityIndicator, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { totalSize, width, height } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import { CopilotStep, useCopilot, walkthroughable } from 'react-native-copilot';
import { ToolTiopsText } from '../../services/dummyData';

export const Primary = ({ onBackPress, title, logoSource, onPressLeftIcon, onPressProfileIcon, onPressTitle, toolTipStatus, user }) => {

  // tooltips
  const CopilotView = walkthroughable(View);
  const { start, goToNth, currentStep } = useCopilot()
  const [tooltipVisible, setTooltipVisible] = useState(0)

  // timeout for tooltip visible
  useEffect(() => {
    if (toolTipStatus != undefined) {
      setTimeout(() => {
        setTooltipVisible(1)
      }, 1000);
    }
  }, [toolTipStatus])

  // for start tooltip
  useEffect(() => {
    if (toolTipStatus != undefined && user?.firstTimeLogin == true) {
      void start()
      void goToNth(11)
    }
  }, [tooltipVisible])

  return (
    <Wrappers.Wrapper style={[styles.main, { alignItems: onPressProfileIcon ? null : 'center' }]}>
      <Wrappers.Component>
        <Wrappers.RowBasic>
          <Wrappers.Wrapper style={{ alignSelf: 'center', justifyContent: 'center' }}>
            {onPressLeftIcon ? (
              <CopilotStep text={ToolTiopsText.text27} order={26} name="insightDots">
                <CopilotView>
                  <Wrappers.Wrapper>
                    <Icon
                      name='dots-three-horizontal'
                      type='entypo'
                      size={18}
                      style={styles.imageView}
                      onPress={onPressLeftIcon}
                    />
                  </Wrappers.Wrapper>
                </CopilotView>
              </CopilotStep>
            ) : onBackPress ? (
              <Icons.Back onPress={onBackPress} />
            ) : null}
          </Wrappers.Wrapper>

          <Wrappers.Wrapper style={styles.imageView}>
            {title ? (
              <TouchableOpacity onPress={onPressTitle}>
                <Texts.Medium style={styles.text}>{title}</Texts.Medium>
              </TouchableOpacity>
            ) : null}

            {logoSource ? (
              <Wrappers.Wrapper style={styles.imageView}>
                <Image
                  source={appImages.logo1}
                  resizeMode="contain"
                  style={styles.logo}
                />
              </Wrappers.Wrapper>
            ) : null}
          </Wrappers.Wrapper>
          {onPressProfileIcon ? (
            <Wrappers.Wrapper style={styles.imageView}>
              <TouchableOpacity onPress={onPressProfileIcon}>
                <Images.Round
                  source={user?.photo ? { uri: user?.photo } : appIcons.noUser}
                  resizeMode="contain"
                  style={styles.userProfile}
                />
              </TouchableOpacity>
            </Wrappers.Wrapper>
          ) : null}
        </Wrappers.RowBasic>
      </Wrappers.Component>
    </Wrappers.Wrapper >
  );
};

export const Back = ({ left, onBackPress }) => {
  return (
    <Wrappers.Row>
      <Icons.Back onPress={onBackPress} />
    </Wrappers.Row>
  );
};

export const EditBudgetHeader = ({ title, onBackPress, leftTitle, onPressLeftText, rightTitle, onPressRightText, color, headerStyle, isLoading, disabled }) => {

  return (
    <Wrappers.Wrapper style={[styles.main1, headerStyle]}>
      <Wrappers.RowWrapperBasic>
        {leftTitle ?
          <Wrappers.Wrapper>
            <TouchableOpacity activeOpacity={1} onPress={onPressLeftText}>
              <Texts.SmallText style={styles.leftText}>{leftTitle}</Texts.SmallText>
            </TouchableOpacity>
          </Wrappers.Wrapper>
          :
          <Icons.Back onPress={onBackPress} />
        }
        <Wrappers.Wrapper style={{ ...styles.headerTextView, marginRight: !rightTitle ? totalSize(3) : 0 }}>
          {title ? (
            <Texts.Medium style={styles.textMain}>{title}</Texts.Medium>
          ) : null}
        </Wrappers.Wrapper>

        {rightTitle &&
          <>
            {isLoading ?
              <ActivityIndicator
                color={colors.disableText}
                style={{ marginRight: width(6) }}
                size={"small"}
              />
              :
              <TouchableOpacity disabled={disabled} onPress={onPressRightText}>
                <Texts.SmallText style={{ ...styles.rightText1, color: color ?? colors.red }}>{rightTitle}</Texts.SmallText>
              </TouchableOpacity>
            }
          </>
        }
      </Wrappers.RowWrapperBasic>
    </Wrappers.Wrapper>
  );
};

export const Main = ({ title, onBackPress, leftTitle, onPressLeftText, rightTitle, onPressRightText, color, headerStyle, tooltipStatus, user, loading, showLeftOptions, onPressLeftIcon }) => {

  // tooltips
  const CopilotView = walkthroughable(View);
  const { start } = useCopilot()
  const [tooltipVisible, setTooltipVisible] = useState(0)

  // timeout for tooltip visible
  useEffect(() => {
    setTimeout(() => {
      setTooltipVisible(1)
    }, 1000);
  }, [])

  // for start tooltip
  useEffect(() => {
    if (tooltipStatus == true && user?.firstTimeLogin == true) {
      void start()
    }
  }, [tooltipVisible])

  return (
    <CopilotStep text={ToolTiopsText.text13} order={12} name="budgetDetailEdit">
      <CopilotView>
        <Wrappers.Wrapper style={[styles.main1, headerStyle]}>
          <Wrappers.RowWrapperBasic>
            {showLeftOptions ? (
              <Icon
                name='dots-three-horizontal'
                type='entypo'
                size={18}
                style={[styles.imageView,{marginLeft:totalSize(1.3)}]}
                onPress={onPressLeftIcon}
              />
            ) : (

              leftTitle ?
                <Wrappers.Wrapper >
                  <TouchableOpacity activeOpacity={1} onPress={onPressLeftText}>
                    <Texts.SmallText style={styles.leftText}>{leftTitle}</Texts.SmallText>
                  </TouchableOpacity>
                </Wrappers.Wrapper>
                :
                <Icons.Back onPress={onBackPress} />

            )}

            <Wrappers.Wrapper style={{ ...styles.headerTextView, marginRight: !rightTitle ? totalSize(3) : 0 }}>
              {title ? (
                <Texts.Medium style={styles.textMain}>{title}</Texts.Medium>
              ) : null}
            </Wrappers.Wrapper>

            {rightTitle &&
              <TouchableOpacity onPress={onPressRightText} disabled={loading} >
                {loading ? <ActivityIndicator style={{ ...styles.rightText1, color: color ?? colors.red }} /> : <Texts.SmallText style={{ ...styles.rightText1, color: color ?? colors.red }}>{rightTitle}</Texts.SmallText>}
              </TouchableOpacity>
            }
          </Wrappers.RowWrapperBasic>
        </Wrappers.Wrapper>
      </CopilotView >
    </CopilotStep >
  );
};

export const ExpenseHeader = ({ title, onBackPress, leftTitle, onPressLeftText, rightTitle, onPressRightText, rightTitleStyles, headerStyle, tooltipStatus, user }) => {

  // tooltips
  const CopilotView = walkthroughable(View);
  const { start, goToNth, currentStep } = useCopilot()
  const [tooltipVisible, setTooltipVisible] = useState(0)
  const [tooltipValue, setTooltipValue] = useState(0)

  // timeout for tooltip visible
  setTimeout(() => {
    setTooltipVisible(1)
  }, 1000);



  // for start tooltip
  useEffect(() => {
    if (tooltipStatus == true && user?.firstTimeLogin == true) {
      void start()
      void goToNth(11)
    }
  }, [tooltipVisible])


  // for tooltip first index
  useEffect(() => {
    if (currentStep?.order == 15 && tooltipValue == 0) {
      void goToNth(11)
      setTimeout(() => {
        setTooltipValue(1)
      }, 1000);
    }
  }, [currentStep])


  return (
    <CopilotStep text={ToolTiopsText.text13} order={12} name="budgetDetailEdit">
      <CopilotView>
        <Wrappers.Wrapper style={[styles.main1, headerStyle]}>
          <Wrappers.RowWrapperBasic>
            {leftTitle ?
              <Wrappers.Wrapper>
                <TouchableOpacity activeOpacity={1} onPress={onPressLeftText}>
                  <Texts.SmallText style={styles.leftText}>{leftTitle}</Texts.SmallText>
                </TouchableOpacity>
              </Wrappers.Wrapper>
              :
              <Icons.Back onPress={onBackPress} />
            }
            <Wrappers.Wrapper style={{ ...styles.headerTextView, marginRight: !rightTitle ? totalSize(3) : 0 }}>
              {title ? (
                <Texts.Medium style={styles.textMain}>{title}</Texts.Medium>
              ) : null}
            </Wrappers.Wrapper>

            {rightTitle &&
              <TouchableOpacity onPress={onPressRightText}>
                <Texts.SmallText style={[styles.rightText, rightTitleStyles]}>{rightTitle}</Texts.SmallText>
              </TouchableOpacity>
            }
          </Wrappers.RowWrapperBasic>
        </Wrappers.Wrapper>
      </CopilotView>
    </CopilotStep>
  );
};

export const EmptyViewHeader = ({ title, onPressProfileIcon, headerStyle, tooltipValue, user }) => {
  return (
    <Wrappers.Wrapper style={[styles.main, { alignItems: onPressProfileIcon ? null : 'center' }, headerStyle]}>
      <Wrappers.Component>
        <Wrappers.RowBasic>
          {tooltipValue &&
            <Wrappers.Wrapper style={{ alignSelf: 'center', justifyContent: 'center', marginRight: -width(30) }}>
              <TouchableOpacity activeOpacity={1} style={tooltipValue}>
                <Icon
                  name='dots-three-horizontal'
                  type='entypo'
                  size={18}
                  style={{ alignSelf: 'center', justifyContent: 'center' }}
                />
              </TouchableOpacity>
            </Wrappers.Wrapper>
          }
          <Wrappers.Wrapper>
            <Texts.Medium style={styles.text}> </Texts.Medium>
          </Wrappers.Wrapper>
          <Wrappers.Wrapper style={styles.imageView}>
            {title ? (
              <Texts.Medium style={styles.text}>{title}</Texts.Medium>
            ) : null}

          </Wrappers.Wrapper>
          {onPressProfileIcon ? (
            <Wrappers.Wrapper style={styles.imageView}>
              <TouchableOpacity onPress={onPressProfileIcon}>
                <Images.Round
                  source={user?.photo ? { uri: user?.photo } : appIcons.noUser}
                  resizeMode="contain"
                  style={styles.userProfile}
                />
              </TouchableOpacity>
            </Wrappers.Wrapper>
          ) : null}
        </Wrappers.RowBasic>
      </Wrappers.Component>
    </Wrappers.Wrapper >
  );
};

export const MyBudgetHeader = ({ title, onPressLeftIcon, onPressBudget, onPressPlusIcon, onPressProfileIcon, headerStyle, toolTips, user }) => {

  // tooltips
  const CopilotView = walkthroughable(View);
  const { start } = useCopilot()
  const [tooltipVisible, setTooltipVisible] = useState(0)

  // timeout for tooltip visible
  useEffect(() => {
    setTimeout(() => {
      setTooltipVisible(1)
    }, 1000);
  }, [])

  // for start tooltip
  useEffect(() => {
    if (user?.firstTimeLogin == true) {
      void start()
    }
  }, [tooltipVisible])

  return (
    <Wrappers.Wrapper style={[styles.main, { alignItems: onPressProfileIcon ? null : 'center' }, headerStyle]}>
      <Wrappers.Component style={{}}>
        <Wrappers.RowBasic>
          <Wrappers.Wrapper style={{ alignSelf: 'center', justifyContent: 'center', paddingVertical: 10, width: width(10), marginRight: width(10) }}>
            <CopilotStep text={ToolTiopsText.text17} order={16} name="homeDots">
              <CopilotView>
                <Icon
                  name='dots-three-horizontal'
                  type='entypo'
                  size={18}
                  style={[{ ...styles.imageView, marginRight: width(5) }]}
                  onPress={onPressLeftIcon}
                />
              </CopilotView>
            </CopilotStep>
          </Wrappers.Wrapper>

          <TouchableOpacity activeOpacity={0.5} onPress={onPressBudget}  >
            <CopilotStep text={ToolTiopsText.text18} order={17} name="homebudget">
              <CopilotView>
                <Wrappers.RowBasic style={{ ...styles.imageView, width: width(54) }}>
                  <Texts.Medium style={styles.text}>{title}</Texts.Medium>
                  <Icon
                    name='triangle-down'
                    type='entypo'
                    size={15}
                    style={{ ...styles.imageView, marginLeft: width(1) }}
                  />
                </Wrappers.RowBasic>
              </CopilotView>
            </CopilotStep>
          </TouchableOpacity>

          <Wrappers.RowBasic style={{ ...styles.imageView, width: width(20) }}>
            <CopilotStep text={ToolTiopsText.text19} order={18} name="homePlus">
              <CopilotView>
                <TouchableOpacity activeOpacity={0.5} onPress={onPressPlusIcon}>
                  <Icon
                    name='plus'
                    type='feather'
                    size={25}
                    style={{ ...styles.imageView, marginRight: width(3) }}
                  />
                </TouchableOpacity>
              </CopilotView>
            </CopilotStep>

            <CopilotStep text={ToolTiopsText.text20} order={19} name="homeUser">
              <CopilotView>
                <TouchableOpacity activeOpacity={0.5} onPress={onPressProfileIcon}>
                  <Images.Round
                    source={user?.photo ? { uri: user?.photo } : appIcons.noUser}
                    resizeMode="contain"
                    style={styles.userProfile}
                  />
                </TouchableOpacity>
              </CopilotView>
            </CopilotStep>
          </Wrappers.RowBasic>

        </Wrappers.RowBasic>
      </Wrappers.Component>
    </Wrappers.Wrapper>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightRed,
    justifyContent: 'center',
    // alignItems:'center'
    // borderWidth: 1,
    // borderColor: colors.lightRed,
  },
  imageView: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  logo: {
    width: totalSize(10),
    height: totalSize(6),
  },
  userProfile: {
    width: totalSize(4.5),
    height: totalSize(4.5),
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text: {
    fontSize: totalSize(1.8),
    fontFamily: fontFamily.appTextBold,
    marginVertical: totalSize(1.9),
  },
  // Main
  main1: {
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightRed,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTextView: {
    borderWidth: 0,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  textMain: {
    fontSize: totalSize(1.8),
    fontFamily: fontFamily.appTextBold,
    marginVertical: totalSize(1.9),
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
  },
  leftText: {
    fontSize: totalSize(1.3),
    color: colors.lightGreen,
    textAlign: 'center',
    fontFamily: fontFamily.appTextBold,
    marginLeft: width(5)
  },
  rightText: {
    fontSize: totalSize(1.3),
    color: colors.red,
    textAlign: 'center',
    fontFamily: fontFamily.appTextBold,
    marginRight: width(5)
  },
  rightText1: {
    fontSize: totalSize(1.5),
    textAlign: 'center',
    fontFamily: fontFamily.appTextBold,
    marginRight: width(5)
  },
  // tool tips
  popupEdit: {
    backgroundColor: colors.lightGreen,
    borderRadius: 5,
    width: width(50)
  },
  containerStyleEdit: {
    padding: 0,
    margin: 0,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.white,
    marginTop: totalSize(4),
  },
  popupPointEdit: {
    right: 0,
    left: totalSize(1),
    top: -totalSize(1),
    bottom: 0,
    width: totalSize(4),
    height: totalSize(4),
  },
  popupBudgetDots: {
    backgroundColor: colors.lightGreen,
    borderRadius: 5,
  },
  containerStyleBudgetDots: {
    padding: 0,
    margin: 0,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.white,
    marginTop: totalSize(4),
  },
  popupPointBudgetDots: {
    right: 0,
    left: -totalSize(1),
    top: -totalSize(1),
    bottom: 0,
    width: totalSize(4),
    height: totalSize(4),
  },
  popupPointBudgetDotss: {
    padding: 10
  },
  popupBudgetName: {
    backgroundColor: colors.lightGreen,
    borderRadius: 5,
  },
  containerStyleBudgetName: {
    padding: 0,
    margin: 0,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.white,
    marginTop: totalSize(10),
  },
  popupPointBudgetName: {
    right: 0,
    left: width(10),
    top: -totalSize(4),
    bottom: 0,
    width: totalSize(14),
    height: totalSize(14),
  },
  popupBudgetPlusIcon: {
    backgroundColor: colors.lightGreen,
    borderRadius: 5,
  },
  containerStyleBudgetPlusIcon: {
    padding: 0,
    margin: 0,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.white,
    marginTop: totalSize(4),
  },
  popupPointBudgetPlusIcon: {
    right: width(6),
    left: 0,
    top: -totalSize(0.25),
    bottom: 0,
    width: totalSize(3),
    height: totalSize(3),
  },
  popupBudgetImage: {
    backgroundColor: colors.lightGreen,
    borderRadius: 5,
  },
  containerStyleBudgetImage: {
    padding: 0,
    margin: 0,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.white,
    marginTop: totalSize(5),
  },
  popupPointBudgetImage: {
    right: 0,
    left: 0,
    top: -totalSize(0.5),
    bottom: 0,
    width: totalSize(5),
    height: totalSize(5),
  },
});
