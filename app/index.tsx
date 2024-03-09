import { Text } from 'react-native'
import React, { useEffect } from 'react'
import tw from 'twrnc';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const Splash = () => {

  useEffect(() => {
    const wait = setTimeout(() => {

        router.replace({
            pathname: "/login"
        });

    }, 2000);

    return () => clearTimeout(wait);
  }, []);
  
  return (
    <SafeAreaView style={tw`flex-1 items-center justify-center`}>
      <Text style={tw`text-2xl font-bold`}>Random Journal</Text>
    </SafeAreaView>
  )
}

export default Splash;
