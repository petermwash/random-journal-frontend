import { 
  Pressable,
  StyleSheet,
  Text,
  View,
 } from 'react-native'
 import {
  actions,
  RichEditor,
  RichToolbar,
  } from "react-native-pell-rich-editor";
import React, { useRef, useState } from 'react'
import tw from 'twrnc';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';

const Journal = () => {
  const richText = useRef<any>();

  const [descHTML, setDescHTML] = useState("");
  const [showDescError, setShowDescError] = useState(false);

  const richTextHandle = (descriptionText) => {
    if (descriptionText) {
      setShowDescError(false);
      setDescHTML(descriptionText);
    } else {
      setShowDescError(true);
      setDescHTML("");
    }
  };

  const submitContentHandle = () => {
    const replaceHTML = descHTML.replace(/<(.|\n)*?>/g, "").trim();
    const replaceWhiteSpace = replaceHTML.replace(/&nbsp;/g, "").trim();

    if (replaceWhiteSpace.length <= 0) {
      setShowDescError(true);
    } else {
      console.log("JOURNAL_DATA_HTML => ", descHTML)
      console.log("JOURNAL_DATA_PLAIN => ", replaceHTML)
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 items-center justify-center px-8`}>
      <View style={styles.container}>
        <Pressable onPress={() => {
            if (richText && richText.current) {
                richText.current?.dismissKeyboard()
            }
        }}>
        </Pressable>
        <View style={styles.richTextContainer}>
          <RichEditor
            ref={richText}
            onChange={richTextHandle}
            placeholder="Click to start typing your thoughts here :)"
            // androidHardwareAccelerationDisabled={true}
            style={styles.richTextEditorStyle}
            initialHeight={250}
          />
          <RichToolbar
            editor={richText}
            selectedIconTint="#873c1e"
            iconTint="#312921"
            actions={[
              actions.setBold,
              actions.setItalic,
              actions.insertBulletsList,
              actions.insertOrderedList,
              actions.insertLink,
              actions.setStrikethrough,
              actions.setUnderline,
            ]}
            style={styles.richTextToolbarStyle}
          />
        </View>
        {showDescError && (
          <Text style={styles.errorTextStyle}>
            Your journal shouldn't be empty 🤔
          </Text>
        )}

        <CustomButton
          text="Post Journal"
          onPress={submitContentHandle}
          bgColor="#115e59"
        />
      </View>
    </SafeAreaView>
  )
}

export default Journal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        width: "100%",
        alignItems: "center",
      },
    
      richTextContainer: {
        display: "flex",
        flexDirection: "column-reverse",
        width: "100%",
        marginBottom: 10,
      },
    
      richTextEditorStyle: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderWidth: 1,
        borderColor: "#f0fdfa",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        fontSize: 20,
      },
    
      richTextToolbarStyle: {
        backgroundColor: "#ccfbf1",
        borderColor: "#f0fdfa",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderWidth: 1,
      },
    
      errorTextStyle: {
        color: "#FF0000",
        marginBottom: 10,
      },
    
      saveButtonStyle: {
        backgroundColor: "#c6c3b3",
        borderWidth: 1,
        borderColor: "#c6c3b3",
        borderRadius: 10,
        padding: 10,
        width: "25%",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        fontSize: 20,
      },
    
      textButtonStyle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#312921",
      },
});
