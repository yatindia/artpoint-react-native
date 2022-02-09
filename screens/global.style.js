import {StyleSheet, Dimensions} from "react-native"


export const GStyle = StyleSheet.create({

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'red',
      },

      button_text: {
        fontSize: Dimensions.get("screen").width/100*2.5,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
        textTransform: "uppercase"
      },
})