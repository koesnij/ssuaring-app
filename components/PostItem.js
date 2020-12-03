import React from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components';
import styles from '../styles';

const Touchable = styled.TouchableOpacity`
  flex-direction: row;
  padding: 8px;
  /* background-color: red; */
  border-bottom-width: 1px;
  border-bottom-color: ${styles.lightGreyColor};
`;

const Column = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  /* background-color: green; */
  padding: 7px 12px;
`;

const Title = styled.Text`
  font-size: 17;
  font-weight: 400;
  color: ${styles.blackColor};
`;

const Location = styled.Text`
  padding-top: 8px;
  font-size: 12;
  font-weight: 600;
  color: ${styles.darkGreyColor};
`;

const Price = styled.Text`
  padding-top: 30;
  font-size: 14;
  color: ${styles.blackColor};
  font-weight: 600;
`;

const PostItem = ({
  item: { id, files, title, price, period_string, area },
  size = 110,
}) => {
  const navigation = useNavigation();
  console.log(id, files, title);
  return (
    <Touchable
      onPress={() =>
        navigation.push('PostDetail', {
          otherParams: { id, files, title, price, period_string, area },
        })
      }
    >
      <Image
        source={{ uri: files[0].url }}
        style={{
          width: 110,
          height: 110,
          resizeMode: 'cover',
          borderWidth: 0.5,
          borderRadius: 10,
          borderColor: styles.lightGreyColor,
          backgroundColor: styles.lightGreyColor,
        }}
      />
      <Column>
        <Title>{title}</Title>
        <Location>{area}</Location>
        <Price>{`${period_string} 당 ${price}원`}</Price>
      </Column>
    </Touchable>
  );
};

export default PostItem;
