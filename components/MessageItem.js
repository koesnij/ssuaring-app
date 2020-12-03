import React from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components';
import styles from '../styles';

const Container = styled.View`
  flex-direction: row;
  justify-content: ${(props) => (!props.me ? 'flex-end' : 'flex-start')};
  align-items: center;
  padding: 6px;
`;

const Column = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: ${(props) => (!props.me ? 'flex-end' : 'flex-start')};
  padding-left: 10px;
  /* background-color: green; */
`;

const Row = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

const Nick = styled.Text`
  font-size: 12;
  font-weight: bold;
  color: ${styles.blackColor};
`;

const TextContainer = styled.View`
  margin-top: 2px;
  padding: 8px 10px;
  border-radius: 6px;
  background-color: ${styles.lightGreyColor};
  align-items: center;
`;
const Text = styled.Text`
  font-size: 15;
  font-weight: 400;
  color: ${styles.blackColor};
`;

const TimeText = styled.Text`
  padding: 0px 5px;
  font-size: 10;
`;

export default ({ me, from, text, createdAt }) => {
  const { nickname, avatar } = from;
  const time = createdAt.match(/\d\d:\d\d/)[0];
  return (
    <Container me={me}>
      {me && (
        <Image
          source={{ uri: avatar }}
          style={{
            width: 40,
            height: 40,
            resizeMode: 'cover',
            borderWidth: 0.5,
            borderRadius: 25,
            borderColor: styles.lightGreyColor,
          }}
        />
      )}
      <Column me={me}>
        <Nick>{nickname}</Nick>
        <Row>
          {me ? (
            <>
              <TextContainer>
                <Text>{text}</Text>
              </TextContainer>
              <TimeText>{time}</TimeText>
            </>
          ) : (
            <>
              <TimeText>{time}</TimeText>
              <TextContainer>
                <Text>{text}</Text>
              </TextContainer>
            </>
          )}
        </Row>
      </Column>
    </Container>
  );
};
