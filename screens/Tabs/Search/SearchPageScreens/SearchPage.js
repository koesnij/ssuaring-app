import { useQuery } from 'react-apollo-hooks';
import React, { useState } from 'react';
import { RefreshControl, ScrollView, FlatList } from 'react-native';
import styled from 'styled-components';
import { defaultimage } from '../../../../constants';
import { SEARCH } from '../SearchQueries';
import { Image } from 'react-native';
import Loader from '../../../../components/Loader';
import PostItem from '../../../../components/PostItem';

const View = styled.View`
  flex: 1;
  background-color: white;
`;
const TitleText = styled.Text`
  font-size: 24px;
  height: 25%;
`;
const Text = styled.Text`
  font-size: 12px;
  font-weight: 500;
  height: 25%;
`;
const LoadingText = styled.Text``;
const TextContainer = styled.TouchableOpacity`
  flex: 1;
  flex-direction: column;
`;
const Container = styled.TouchableOpacity`
  width: 100%;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.2);
  height: ${(props) => props.height || 100};
`;
export default ({ route, navigation }) => {
  const {
    otherParams: { term },
  } = route.params;
  const { loading, data, refetch } = useQuery(SEARCH, {
    skip: term === undefined,
    variables: {
      term: term,
    },
    fetchPolicy: 'network-only',
  });
  console.log('SEARCHPAGE', data);

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
        data.searchPost && (
          <FlatList
            data={data.searchPost}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({ item }) => <PostItem key={item.id} item={item} />}
          />
        )
      )}
    </View>

    //   <ScrollView>
    //     {loading ? (
    //       <Loader />
    //     ) : data && data.searchPost ? (
    //       data.searchPost.map((tomato) => (
    //         <Container>
    //           {tomato.files[0] ? (
    //             <Image
    //               style={{ width: 100, height: 100 }}
    //               source={{ uri: tomato.files[0].url }}
    //             />
    //           ) : (
    //             <Image
    //               style={{ width: 100, height: 100 }}
    //               source={{
    //                 uri: defaultimage,
    //               }}
    //             />
    //           )}
    //           <TextContainer>
    //             <Text>{tomato.title}</Text>
    //             <Text>{tomato.area}</Text>
    //             <Text>
    //               {tomato.period}기간당{tomato.price}원
    //             </Text>
    //             <Text>{tomato.caption}</Text>
    //           </TextContainer>
    //         </Container>
    //       ))
    //     ) : (
    //       <View>
    //         <Text>검색 결과를 찾을 수 없습니다.</Text>
    //       </View>
    //     )}
    //   </ScrollView>
  );
};
