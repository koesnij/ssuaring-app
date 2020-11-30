import * as Location from 'expo-location';

export const getLocation = async () => {
  try {
    /* 1.허가 요청 */
    const response = await Location.requestPermissionsAsync();
    console.log(response);
    /* 2.사용자 위치청보 가져오기 */
    const location = await Location.getCurrentPositionAsync();
    console.log(location);

    return location;
  } catch (e) {
    console.log(e);
    Alert.alert('ERROR');
  }
};
