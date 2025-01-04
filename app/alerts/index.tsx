import ThemedButton from '@/presentation/shared/ThemedButton';
import ThemedView from '@/presentation/shared/ThemedView';
import { View, Text, Alert } from 'react-native';

const AlertsScreen = () => {

  const onCreateAlert=()=>{
    Alert.alert(
      "Alert title test",
      "Alert message test",
      [{
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      {
        text: "OK",
        onPress: () => console.log("OK Pressed")
      }]
    )
  }



  return (
    <ThemedView className='px-2 flex flex-1 justify-center items-center'>
      <ThemedButton
        text='Show Alert'
        onPress={() => {
          onCreateAlert();
        }}
      />
    </ThemedView>
  );
};
export default AlertsScreen;
