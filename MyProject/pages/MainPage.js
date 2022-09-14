import { useIsFocused, useTheme } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    Pressable,
    ImageBackground,
  } from 'react-native';
import { getAPI } from '../api';
import ScreenContainer from '../components/ScreenContainer';
import StyleText from '../components/StyleText';
import { Context } from '../context';

const MainPage = ({ navigation }) => {
  const [familyInfo, setFamilyInfo] = useState([]);
  const [todayQuest, setTodayQuest] = useState({
    id: 0,
    question: '',
  });
  const {colors} = useTheme();

  const {
      state: {
          userInfo,
      }
  } = useContext(Context);

  useEffect(() => {
    const getTodayQuestion = async () => {
        await getAPI(
            {},
            '/question/1',
            "",
        )
        .then(({ data, status }) => {
            setTodayQuest({
              ...todayQuest,
              ...data,
            });
        })
        .catch((e) => {
          console.log(e);
          setTodayQuest({
            id: -1,
            question: '오늘의 질문이 아직 없습니다.',
          });
        });
    };
    getTodayQuestion();

    const getFamilyInfo = async () => {
      await getAPI(
        {},
        `/family/${userInfo.id}`,
        "",
      )
      .then(({ data, status }) => {
          // console.log(data);
          if(status === 200 || status === 201 || status === 204) {
            setFamilyInfo(data);
          }
      })
      .catch((e) => {
          console.log(e, userInfo);
      });
    };
    
    getFamilyInfo();
  }, []);

  const style = {
    fontColor: { color: colors.defaultDarkColor }
  };

  const setRandomImage = (member) => {
    if (member === 'father') {
      return require('../assets/images/wuga/characters/dino.png');
    } else if (member === 'mother') {
      return require('../assets/images/wuga/characters/ele.png');
    } else if(member === 'son') {
      return require('../assets/images/wuga/characters/icebunny.png');
    } else if(member === 'daughter') {
      return require('../assets/images/wuga/characters/bunny.png');
    } else {
      return require('../assets/images/wuga/characters-wuga.png');
    }
  };

  const setMemberNaming = (member) => {
    if(member === 'father') return '아빠';
    else if(member === 'mother') return '엄마';
    else if(member === 'son') return '아들';
    else if(member === 'daughter') return '딸';
    else if(member === 'other') return '친척';
    else return '';
  };
  
  return (
    <>
      <ScreenContainer>
        <View
            nativeID='topInfo'
            style={{ justifyContent: 'space-between', flexDirection: 'row' }}
          >
            <Image
              source={require('../assets/images/wuga/logo-wuga.png')}
              style={{ width: 125, height: 50, justifyContent: 'flex-start', resizeMode: 'contain' }}
            />
        </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%', alignItems: 'center', marginTop: 30, justifyContent: 'space-between' }}>
          {
            familyInfo.length > 0 ?
              familyInfo.map((info, idx) => {
                return (
                  <View key={idx} style={{flexDirection: 'row', width: '45%', marginVertical: 5, alignItems: 'center'}}>
                    <Image
                      source={setRandomImage(info.member)}
                      style={{width: 30, height: 45, borderRadius: 50, resizeMode: 'contain', marginRight: 10}}
                    ></Image>
                    <View>
                      <StyleText style={{...style.fontColor}}>{info.name ? info.name : ''}</StyleText>
                      <StyleText style={{...style.fontColor, marginTop: 5}}>{setMemberNaming(info.member)}</StyleText>
                    </View>
                  </View>
                )
              }) :
              <></>
          }
          </View>

          <Image
            source={require('../assets/images/wuga/maincharacter-wuga.png')}
            style={{ width: '90%', height: 350, resizeMode: 'contain', alignSelf: 'center' }}
          ></Image>

          <Pressable
            nativeID='questionBtn'
            style={{ position: 'absolute', bottom: 30, alignSelf: 'center', width: '100%' }}
            onPress={() => {
              navigation.navigate('QuestComponent', { questInfo: todayQuest });
            }}
            disabled={todayQuest.id === -1 ? true : false}
          >
            <ImageBackground
              source={require('../assets/images/wuga/questbg-wuga.png')}
              resizeMode={"contain"}
              style={{width: '100%', height: 100, alignItems: 'center', justifyContent: 'center'}}
            >
              <StyleText style={{ fontSize: 16, padding: 15, color: colors.brown[1], textAlign: 'center'}}>{todayQuest.question}</StyleText>
            </ImageBackground>
          </Pressable>
      </ScreenContainer>
    </>
  );
};

export default MainPage;