import React, { useEffect, useLayoutEffect, useState } from 'react';
import { RefreshControl, FlatList, ActivityIndicator } from 'react-native';
import styled from 'styled-components';
import { useQuery } from 'react-apollo-hooks';

import Loader from '../../../components/Loader';
import PostItem from '../../../components/PostItem';
import { SEEALLPOST, MYAREA } from '../../../screens/Tabs/PostDetailQueries';
import { Header, HeaderLink } from '../../../components/HeaderItem';

const View = styled.View`
  flex: 1;
  background-color: white;
`;

export default ({ navigation }) => {
  const { loading, data, refetch } = useQuery(SEEALLPOST, {
    fetchPolicy: 'network-only',
  });
  const myArea = useQuery(MYAREA, {
    fetchPolicy: 'network-only',
  });

  console.log('MYAREA', myArea);
  const [headerTitle, setHeaderTitle] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: myArea.loading ? (
        <ActivityIndicator />
      ) : (
        myArea.data && myArea.data.me && myArea.data.me.area
      ),
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
  }, [navigation, myArea]);

  /** REFRESH - REFETCH */
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <View>
      {loading ? (
        <Loader />
      ) : (
        data &&
        data.seeAllPost && (
          <FlatList
            data={data.seeAllPost}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({ item }) => <PostItem key={item.id} item={item} />}
          />
        )
      )}
    </View>
  );
};
