import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Controller, useController } from 'react-hook-form'
import tw from 'twrnc';

const Input = ({
    name,
    control,
    rules = {},
    placeholder,
    isPassword
}: { 
    name: string;
    control: any;
    rules: any;
    placeholder: string;
    isPassword?: boolean;
}) => {
  const { field } = useController({
    control,
    defaultValue: "",
    name,
  })
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <View
            style={[
              styles.container,
              {borderColor: error ? 'red' : '#f0fdfa'},
            ]}>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={tw`py-2 h-14 text-xl font-normal`}
              secureTextEntry={isPassword}
            />
          </View>
          {error && (
            <Text style={{color: 'red', alignSelf: 'stretch'}}>{error.message || 'Error'}</Text>
          )}
        </>
      )}
    />
  );
}

export default Input;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        borderColor: '#f0fdfa',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
      },
});
