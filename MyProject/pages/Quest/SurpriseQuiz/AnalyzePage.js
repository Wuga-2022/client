import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, Image, View, ActivityIndicator, Pressable } from 'react-native';
import { poseAPI } from '../../../api';
import BackBtn from '../../../components/BackBtn';
import ScreenContainer from '../../../components/ScreenContainer';

const QuestAnalyze = ({ route, navigation }) => {
    const {colors} = useTheme();
    const { image } = route.params;
    const [analyzeRes, setAnalyzeRes] = useState('실패!');
    const [isAnalyzeFinished, setIsAnalyzeFinished] = useState(false);

    useEffect(() => {
        compareImages();
    }, []);

    const compareImages = async () => {
        await poseAPI(
            image
        )
        .then(({ data, status }) => {
            console.log(data, status);
            if(status === 200) setAnalyzeRes('성공!');
            setTimeout(() => {
                setIsAnalyzeFinished(true)
            }, 3000);
        })
        .catch((e) => {
            console.log(e);
            setTimeout(() => {
                setIsAnalyzeFinished(true)
            }, 3000);
        });
    };

    return (
        <ScreenContainer>
            <View style={{ justifyContent: 'center', alignItems: 'center', height: '50%' }}>
                { isAnalyzeFinished ?
                    <></> :
                    <Text style={{ fontSize: 16, color: colors.defaultDarkColor, fontWeight: '700' }}>
                        미션 분석 중...
                    </Text>
                }
                <Image
                    nativeID='dataImage'
                    source={{ uri: image }}
                    style={styles.images}
                />
                { !isAnalyzeFinished && <ActivityIndicator size={"large"} color={colors.green[3]} /> }
            </View>
            
            { isAnalyzeFinished
                && 
                <View style={{ justifyContent: 'center', alignItems: 'center'  }}>
                    <Text style={{...styles.analyzeRes, color: colors.green[2]}}>{ analyzeRes }</Text>
                </View>
            }
            <BackBtn navigation={navigation}/>
        </ScreenContainer>
    );
};

export default QuestAnalyze;

const styles = StyleSheet.create({
    images: {
      width: 200,
      height: 200,
      marginVertical: 20,
      resizeMode: 'contain'
    },
    analyzeRes: {
        fontSize: 32,
        fontWeight: '900',
        marginTop: 30
    },
  });