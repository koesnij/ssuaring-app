import React, { useEffect, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { Image, ScrollView, ToastAndroid, RefreshControl } from 'react-native';
import Button from '../../components/Button';

import { useMutation, useQuery } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import { SEEFULLPOST } from './PostDetailQueries';
import Loader from '../../components/Loader';
import constants from '../../constants';
import styles from '../../styles';
import TabIcon from '../../components/TabIcon';
import PostItem from '../../components/PostItem';
import { HeaderLink } from '../../components/HeaderItem';

const View = styled.View`
  background-color: white;
  flex: 1;
`;

const UserArea = styled.TouchableOpacity`
  flex-direction: row;
  padding: 10px;
  align-items: center;
  border-top-width: 1px;
  border-top-color: ${styles.lightGreyColor};
  border-bottom-width: 1px;
  border-bottom-color: ${styles.lightGreyColor};
`;

const Column = styled.View`
  justify-content: center;
  padding: 0px 10px;
`;

const Nick = styled.Text`
  font-size: 16px;
  font-weight: 500;
`;
const Area = styled.Text`
  padding-top: 5px;
  font-size: 14px;
  font-weight: 400;
`;
const Rating = styled.Text``;

const PostMainArea = styled.View`
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${styles.lightGreyColor};
`;
const PostMeta = styled.View`
  padding: 12px 0px;
  flex-direction: row;
`;
const PostMetaText = styled.Text`
  font-size: 12;
  font-weight: 600;
  color: ${styles.darkGreyColor};
`;
const PostTitle = styled.Text`
  font-size: 22;
  font-weight: bold;
`;
const PostCaption = styled.Text`
  padding: 10px 0px;
  font-size: 16;
`;

const ReviewArea = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${styles.lightGreyColor};
`;

const OtherPostsArea = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${styles.lightGreyColor};
`;

const Footer = styled.View`
  border-top-width: 1px;
  border-top-color: ${styles.lightGreyColor};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 85px;
  padding-bottom: 20px;
`;

const Like = styled.TouchableOpacity`
  padding-left: 12px;
  padding-right: 18px;
  /* background-color: green; */
`;
const Price = styled.View`
  width: 70px;
  max-width: 70px;
`;
const PriceText = styled.Text`
  padding-bottom: 1px;
  font-size: 13;
  font-weight: 500;
  color: ${styles.blackColor};
`;

const SubTitle = styled.Text`
  font-size: 20;
  font-weight: bold;
  padding: 10px;
`;

const Text = styled.Text`
  font-size: 16;
  font-weight: 400;
  padding: 20px;
  padding-top: 10px;
`;

const ReviewItem = styled.View`
  flex-direction: row;
  padding: 10px;
  align-items: center;
  /* border-bottom-width: 1px; */
  border-bottom-color: ${styles.lightGreyColor};
`;

const ReviewText = styled.Text`
  padding-top: 5px;
  font-size: 14px;
  font-weight: 400;
`;

const TOGGLE_LIKE = gql`
  mutation toggleLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;

export default ({ route, navigation }) => {
  const {
    otherParams: { id, files, area, title },
  } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderLink
            str={'🚨'}
            onPress={() =>
              navigation.navigate('Report', { type: 'post', post: id })
            }
          />
        );
      },
    });
  }, [navigation]);

  const { loading, data, refetch } = useQuery(SEEFULLPOST, {
    variables: { id },
    fetchPolicy: 'network-only',
  });
  console.log('datadata', data);
  if (data && data.seeFullPost && data.seeFullPost.reservations) {
    console.log('DATA!!', data.seeFullPost.reservations[0].review.length);
  }
  /** 찜 관련 */
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: { postId: id },
  });
  const toggleLike = async () => {
    if (isLiked === true) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked((l) => !l);
    try {
      // try-catch로 감싸주기 & await 키워드
      await toggleLikeMutation();
    } catch (e) {}
  };

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

  useEffect(() => {
    if (!loading) {
      if (data && data.seeFullPost) {
        setIsLiked(data.seeFullPost.isLiked);
        setLikeCount(data.seeFullPost.likeCount);
      }
    }
  }, [loading, data]);

  return (
    <View>
      {loading ? (
        <Loader />
      ) : (
        data &&
        data.seeFullPost && (
          <>
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              <Image
                style={{
                  height: constants.width,
                  width: '100%',
                  resizeMode: 'cover',
                  backgroundColor: styles.lightGreyColor,
                }}
                source={{ uri: files[0].url }}
              />
              <UserArea
                onPress={() =>
                  navigation.navigate('UserProfile', {
                    otherParams: { user: data.seeFullPost.user },
                  })
                }
              >
                <Image
                  style={{
                    borderRadius: 25,
                    height: 50,
                    width: 50,
                    resizeMode: 'cover',
                  }}
                  source={{ uri: data.seeFullPost.user.avatar }}
                />
                <Column>
                  <Nick>{data.seeFullPost.user.nickname}</Nick>
                  <Area>{area}</Area>
                </Column>
                <Column>
                  <Rating></Rating>
                </Column>
              </UserArea>
              <PostMainArea>
                <PostTitle>{title}</PostTitle>
                <PostMeta>
                  <PostMetaText>
                    {data.seeFullPost.category_string}
                  </PostMetaText>
                  <PostMetaText> ・ </PostMetaText>
                  <PostMetaText>{data.seeFullPost.updatedAt}</PostMetaText>
                </PostMeta>
                <PostCaption>{data.seeFullPost.caption}</PostCaption>
                <PostMeta>
                  <PostMetaText>{likeCount} 찜</PostMetaText>
                  <PostMetaText> ・ </PostMetaText>
                  <PostMetaText>
                    {data.seeFullPost.reservationCount} 대여
                  </PostMetaText>
                </PostMeta>
              </PostMainArea>
              <ReviewArea>
                <SubTitle>대여 후기</SubTitle>
                {data.seeFullPost.reservations.length === 0 ? (
                  <Text>아직 후기가 없습니다.</Text>
                ) : (
                  <ReviewItem>
                    <Image
                      style={{
                        borderRadius: 25,
                        height: 50,
                        width: 50,
                        resizeMode: 'cover',
                      }}
                      source={{ uri: data.seeFullPost.user.avatar }}
                    />
                    <Column>
                      <Nick>juunzzi</Nick>
                      <ReviewText>정말 친절해요 !</ReviewText>
                    </Column>
                    {/* {reservation.review[0].borrower.avatar}{' '} */}
                    {/* {reservation.review[0].borrower.nickname} */}
                  </ReviewItem>
                  // data.seeFullPost.reservations.map((reservation) => {
                  //   console.log('reviewlen', reservation.review.length > 0);
                  //   reservation.review.length > 0 ? (
                  // <ReviewItem>
                  //   <Image
                  //     style={{
                  //       borderRadius: 25,
                  //       height: 50,
                  //       width: 50,
                  //       resizeMode: 'cover',
                  //     }}
                  //     source={{ uri: data.seeFullPost.user.avatar }}
                  //   />
                  //   <Column>
                  //     <Nick>aaa</Nick>
                  //     <ReviewText>리뷰있음</ReviewText>
                  //   </Column>
                  //   {/* {reservation.review[0].borrower.avatar}{' '} */}
                  //   {/* {reservation.review[0].borrower.nickname} */}
                  // </ReviewItem>
                  //   ) : (
                  //     <ReviewItem>
                  //       <Image
                  //         style={{
                  //           borderRadius: 25,
                  //           height: 50,
                  //           width: 50,
                  //           resizeMode: 'cover',
                  //         }}
                  //         source={{ uri: data.seeFullPost.user.avatar }}
                  //       />
                  //       <Column>
                  //         <Nick>aaa</Nick>
                  //         <ReviewText>리뷰있음</ReviewText>
                  //       </Column>
                  //       {/* {reservation.review[0].borrower.avatar}{' '} */}
                  //       {/* {reservation.review[0].borrower.nickname} */}
                  //     </ReviewItem>
                  //   );
                  // })
                )}
              </ReviewArea>
              <OtherPostsArea>
                <SubTitle>
                  {data.seeFullPost.user.nickname}의 다른 물품
                </SubTitle>
                {data.seeFullPost.user.posts.map((item) => (
                  <PostItem key={item.id} item={item} />
                ))}
              </OtherPostsArea>
            </ScrollView>
            <Footer>
              {data.seeFullPost.isMine ? (
                <Button
                  text="수정하기"
                  size={340}
                  onPress={() =>
                    navigation.navigate('EditPostTest', {
                      otherParams: {
                        id: data.seeFullPost.id,
                        title: data.seeFullPost.title,
                        price: data.seeFullPost.price,
                        period: data.seeFullPost.period,
                        category: data.seeFullPost.category,
                        caption: data.seeFullPost.caption,
                      },
                    })
                  }
                />
              ) : (
                <>
                  <Like onPress={toggleLike}>
                    <TabIcon name={isLiked ? 'heart' : 'heart-empty'} />
                  </Like>
                  <Price>
                    <PriceText>{data.seeFullPost.period_string} 당</PriceText>
                    <PriceText>{data.seeFullPost.price}원</PriceText>
                  </Price>
                  <Button
                    text="예약 하기"
                    size={220}
                    onPress={() =>
                      navigation.navigate('ReservationReq', {
                        otherParams: data.seeFullPost,
                      })
                    }
                  />
                </>
              )}
            </Footer>
          </>
        )
      )}
    </View>
  );
};
