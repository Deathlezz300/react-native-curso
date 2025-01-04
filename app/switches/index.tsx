import { Colors } from '@/constants/Colors';
import ThemedCard from '@/presentation/shared/ThemedCard';
import ThemedSwitch from '@/presentation/shared/ThemedSwitch';
import ThemedView from '@/presentation/shared/ThemedView';
import { useState } from 'react';

const Switches = () => {


  const [state,setState]=useState({
    isActive:false,
    isHungry:false,
    isHappy:false
  })


  return (
    <ThemedView className='px-2'>
      <ThemedCard>
        <ThemedSwitch
          isActive={state.isActive}
          onChangeValue={(value) => setState({...state,isActive:value})}
          text='Is Active'
        />

        <ThemedSwitch
          isActive={state.isHungry}
          onChangeValue={(value) => setState({...state,isHungry:value})}
          text='Is Hungry'
        />

        <ThemedSwitch
          isActive={state.isHappy}
          onChangeValue={(value) => setState({...state,isHappy:value})}
          text='Is Happy'
        />


      </ThemedCard>
    </ThemedView>
  );
};
export default Switches;
