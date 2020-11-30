import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Alert } from 'react-native';
import Postcode from 'react-native-daum-postcode';

import constants from '../../../../constants';
import { ME } from '../MyPageQueries';

const EDIT_AREA = gql`
  mutation editArea($area: String!) {
    editArea(area: $area)
  }
`;

export default ({ navigation }) => {
  const [editAreaMutation] = useMutation(EDIT_AREA, {
    refetchQueries: () => [{ query: ME }],
  });

  const handler = (data) => {
    const { sido, sigungu } = data;
    Alert.alert(`${sido} ${sigungu}`, '지역을 변경하시겠습니까?', [
      {
        text: '취소',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: '승인',
        onPress: async () => {
          try {
            await editAreaMutation({
              variables: { area: `${sido} ${sigungu}` },
            });
            navigation.navigate('MyArea');
          } catch (error) {
            console.log(error);
          }
        },
      },
    ]);
  };

  return (
    <Postcode
      style={{ width: constants.width, height: constants.height }}
      jsOptions={{ animated: true }}
      onSelected={handler}
    />
  );
};
