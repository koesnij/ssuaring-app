import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components';
import { Header, HeaderLink } from '../../../components/HeaderItem';
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

export default ({ navigation }) => {
  useEffect(() => {
    navigation.setParams({ area: '동작구' });
    console.log('filter:', navigation);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '동작구',
      headerRight: () => {
        return (
          <Header>
            <HeaderLink
              str={'필터'}
              onPress={() => navigation.navigate('Filter')}
            />
            <HeaderLink
              str={'지도'}
              onPress={() => navigation.navigate('Map')}
            />
          </Header>
        );
      },
    });
  }, [navigation]);

  return (
    <View>
      <Text>Home Bitches!</Text>
    </View>
  );
};
