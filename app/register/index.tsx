import { View, Text, TextInput, Button, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import Input from '../../components/Input';
import { useForm } from 'react-hook-form';
import CustomButton from '../../components/CustomButton';
import { EMAIL_REGEX } from '../../constants';
import { register } from '../../services/auth';
import useLogedInUser from '../../hooks/useLogedInUser';
import { addUser } from '../../services/user';

const Register = () => {
  const logedInUser = useLogedInUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { 
    control, 
    handleSubmit, 
    formState: {errors} 
} = useForm();

  const onSubmit = async (
    data: { email: string, password: string }
    ) => {
    setIsLoading(true);

    try {
      const user = await register(data.email, data.password)
      logedInUser.onUpdateUser({email: user.email, id: user.uid})
      addUser(user.email, user.uid)
        .then(() => {
          router.replace("/journal")
          setIsLoading(false);
        })
        .catch((error) => console.log("ADDING_USER_ERROR => ", error))

    } catch (error) {
      setIsLoading(false);
      if (error.code === 'auth/email-already-in-use') {
        alert("That email address is already in use!")
      }
  
      if (error.code === 'auth/invalid-email') {
        alert("That email address is invalid!")
      }
      alert("Register error: " + error.message)
    }
  }

  if (isLoading) {
    return <ActivityIndicator size="large" />
  }

  return (
    <SafeAreaView style={tw`flex-1 items-center justify-center px-8`}>
          <Text style={tw`text-4xl font-medium text-teal-800 text-center my-2`}>
            Journaling Made Fun and Simple
          </Text>
          <Text style={tw`text-xl font-light my-2 mb-10`}>Join us today</Text>
          <Input
            name='email'
            control={control}
            rules={{
                required: 'Email is required',
                pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
              }}
            placeholder="you@email.com"
          />
          <Input
            name='password'
            control={control}
            rules={{
                required: 'Password is required',
                minLength: {
                  value: 4,
                  message: 'Password should be minimum 4 characters long',
                },
              }}
            placeholder="your-password"
            isPassword
          />
          <CustomButton
            text="Register"
            onPress={handleSubmit(onSubmit)}
            bgColor="#115e59"
          />
          <TouchableOpacity
            style={tw`p-8 m-2 rounded-lg `}
            onPress={() => router.replace("/login")}
          >
            <Text style={tw`text-lg font-normal underline text-teal-700`}>
              Login Here
            </Text>
          </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Register;
