import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  Modal,
} from 'react-native';
import { getAPI } from '../api';
import ScreenContainer from '../components/ScreenContainer';
import StyleText from '../components/StyleText';
import MissionModalComponent from './Quest/SurpriseQuiz/MissionModalComponent';
import { useIsFocused } from '@react-navigation/native';

const Mission = ({navigation}) => {
  const [missions, setMissions] = useState([]);
  const [surpriseQuizModalVisible, setSurpriseQuizModalVisible] = useState(false);
  const {colors} = useTheme();

  useEffect(() => {
    const getMissions = async () => {
      setMissions([]);
      await getAPI(
          {},
          `/missions`,
          "",
      )
      .then(({ data, status}) => {
        console.log(data, status);
        if(data.length > 0) {
          setMissions([
            {
              id: data[0].id,
              image: {uri: data[0].images[0]},
              originImage: {uri: data[0].images[0]}
            }
          ]);
        }
      })
      .catch((e) => {
          console.log(e);
      });
  };
  getMissions();
    // setMissions([
    //   {
    //     id: 1,
    //     image: require('../assets/images/wuga/characters-wuga.png'),
    //     originImage: require('../assets/images/wuga/maincharacter-wuga.png'),
    //   }, {
    //     id: 2,
    //     image: require('../assets/images/wuga/characters-wuga.png'),
    //     originImage: require('../assets/images/wuga/maincharacter-wuga.png'),
    //   }, {
    //     id: 3,
    //     image: require('../assets/images/wuga/characters-wuga.png'),
    //     originImage: require('../assets/images/wuga/maincharacter-wuga.png'),
    //   }, {
    //     id: 4,
    //     image: require('../assets/images/wuga/characters-wuga.png'),
    //     originImage: require('../assets/images/wuga/maincharacter-wuga.png'),
    //   }, {
    //     id: 5,
    //     image: require('../assets/images/wuga/characters-wuga.png'),
    //     originImage: require('../assets/images/wuga/maincharacter-wuga.png'),
    //   }, {
    //     id: 6,
    //     image: require('../assets/images/wuga/characters-wuga.png'),
    //     originImage: require('../assets/images/wuga/maincharacter-wuga.png'),
    //   }, {
    //     id: 7,
    //     image: require('../assets/images/wuga/characters-wuga.png'),
    //     originImage: require('../assets/images/wuga/maincharacter-wuga.png'),
    //   }, {
    //     id: 8,
    //     image: require('../assets/images/wuga/characters-wuga.png'),
    //     originImage: require('../assets/images/wuga/maincharacter-wuga.png'),
    //   }, {
    //     id: 9,
    //     image: require('../assets/images/wuga/characters-wuga.png'),
    //     originImage: require('../assets/images/wuga/maincharacter-wuga.png'),
    //   }, {
    //     id: 10,
    //     image: require('../assets/images/wuga/characters-wuga.png'),
    //     originImage: require('../assets/images/wuga/maincharacter-wuga.png'),
    //   }, {
    //     id: 11,
    //     image: require('../assets/images/wuga/characters-wuga.png'),
    //     originImage: require('../assets/images/wuga/maincharacter-wuga.png'),
    //   }, {
    //     id: 12,
    //     image: require('../assets/images/wuga/characters-wuga.png'),
    //     originImage: require('../assets/images/wuga/maincharacter-wuga.png'),
    //   },
    // ])
  }, [useIsFocused()]);

  const missionGrid = ({ item, index }) => {
    return (
      <Pressable
        onPress={()=>navigation.navigate('Detail', { idx: missions.length-index, originImg: item.originImage, curImg: item.image })}
        style={{ width: '30%', margin: 5, alignSelf: 'center', borderWidth: 0.5, borderColor: colors.brown[4], }}
      >
        <Image
          style={{ width: '100%', height: 150, resizeMode: 'contain' }}
          source={item.image} />
          
        <View style={{ paddingHorizontal: 15, position: 'absolute' }}>
          <StyleText style={{ textAlign: 'left', marginTop: 10, color: colors.defaultDarkColor, fontWeight: '800', fontSize: 14 }}>#{item.id}</StyleText>
        </View>
      </Pressable>
    )
  };

  return (
    <ScreenContainer>
      <View style={{ flexDirection: 'row', marginBottom: 45, justifyContent: 'center' }}>
        <Pressable
          onPress={()=>setSurpriseQuizModalVisible(true)}
          style={{ position: 'absolute', right: 15 }}
        >
          <Image
            source={require('../assets/images/icon/help.png')}
            style={{ width: 25, height: 25, tintColor: colors.defaultDarkColor }}
          /> 
        </Pressable>
      </View>
      <SafeAreaView flex={1} style={{ justifyContent: 'center', alignItems: 'center'}}>
        {
          missions.length > 0 ?
          <FlatList
            data={missions.slice(0).reverse()}
            renderItem={missionGrid}
            keyExtractor={item => item.id}
            numColumns={3}
            showsVerticalScrollIndicator={false}
          /> :
          <View style={{ justifyContent: 'center', alignItems: 'center'}}>
            <StyleText style={{ fontSize: 24, textAlign: 'center' }}>아직 미션이 없습니다!</StyleText>
          </View>
        }
      </SafeAreaView>

      {
        surpriseQuizModalVisible &&
        <MissionModalComponent
          modalVisible={surpriseQuizModalVisible}
          setModalVisible={setSurpriseQuizModalVisible}
          navigation={navigation}
        />
      }
    </ScreenContainer>
  );
};

export default Mission;