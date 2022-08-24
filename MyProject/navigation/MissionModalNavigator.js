import React from 'react';
import { SurpriseMissionScreen, MissionAnalyzeScreen } from '../pages';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

const MissionModalNavigator = ({navigation}) => {
    return (
        <Stack.Navigator initialRouteName='Mission-Surprise' screenOptions={{headerShown: false, animation: 'none', animationEnabled: false}}>
            <Stack.Screen name="Mission-Surprise" children={() => <SurpriseMissionScreen navigation={navigation}/>}  />
            <Stack.Screen name="Analyze" component={MissionAnalyzeScreen} />
        </Stack.Navigator>
    );
};

export default MissionModalNavigator;
