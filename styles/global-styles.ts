import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const globalStyles=StyleSheet.create({
    background:{
        backgroundColor:Colors.background,
        flex:1
    },

    calculatorContainer:{
        flex:1,
        paddingBottom:20,
        justifyContent:'flex-end' 
    },

    mainResult:{
        color:Colors.textPrimary,
        fontSize:70,
        textAlign:'right',
        fontWeight:400,
        fontFamily:'SpaceMono'
    },

    subResult:{
        color:Colors.textSecondary,
        fontSize:40,
        textAlign:'right',
        fontFamily:'SpaceMono'
    },
    buttonCalculator:{
        color:"white",
        height:80,
        width:80,
        backgroundColor:Colors.darkGray,
        borderRadius:100,
        justifyContent:'center',
    },

    buttonText:{
        textAlign:'center',
        padding:10,
        fontSize:30,
        color:Colors.textPrimary,
        fontFamily:'SpaceMono',
        fontWeight:'300'
    }

})