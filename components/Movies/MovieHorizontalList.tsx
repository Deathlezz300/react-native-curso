import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { IMovie } from '@/interface'
import MovieItem from './MovieItem'

interface props{
    movies:IMovie[],
    title:string
}

const MovieHorizontalList = ({ movies , title } : props ) => {
  return (
    <View className='w-full flex flex-col gap-4'>
      <Text className='text-3xl font-bold px-4'>{title}</Text>
      <FlatList
        horizontal
        data={movies}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <MovieItem
                id={item.id}
                poster={item.poster}
                smallPoster={true}
                className='px-2'
            />
            )}
      />
    </View>
  )
}

export default MovieHorizontalList