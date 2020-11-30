import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components';
import { Header, HeaderLink } from '../../../components/HeaderItem';

//import TabIcon from '../components/FlatList';
import { View, StyleSheet, FlatList, TouchableOpacity, TouchableWithoutFeedback, Image} from 'react-native';
// const View = styled.View`
//   justify-content: center;
//   align-items: center;
//   flex: 1;
// `;

const Text = styled.Text``;

const style = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
   logo: {
    width: 66,
    height: 58,
  },
    itemView:{
        flexDirection:'row',
        borderWidth:0.6,
        borderRadius:4,
        padding:8,
        marginBottom:12,
    },
   itemImg:{
        width:120,
        height:100,
        resizeMode:'cover',
        marginRight:8,
    },
    itemName:{
        fontSize:24,
        fontWeight:'bold',
    },
    itemMsg:{
        fontSize:16,
        fontStyle:'italic',
    },
});



export default ({ navigation }) => {
  useEffect(() => {
    navigation.setParams({ area: '동작구' });
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
 <FlatList
           data={[
          {name:"고영욱", message:"널 좋아해",img: "https://dimg.donga.com/wps/NEWS/IMAGE/2013/01/14/52293938.2.jpg"},
          {name:"신정환", message:"역시 형이야",img:  "https://mblogthumb-phinf.pstatic.net/MjAxNzA0MjdfMjgx/MDAxNDkzMjYxNzQyMjU4.op0zQTfA81ih-qf3BEzr_6C2VXoclL_Cbs4aiJiObgkg.EZUQzZsblADVKBE1ZcbbleaRwcyd_KmsUJMwDPWU5GIg.JPEG.mki112112/%EC%8B%A0%EC%A0%95%ED%99%983.jpg?type=w800"},
            {name:"고영욱", message:"널 좋아해",img: "https://dimg.donga.com/wps/NEWS/IMAGE/2013/01/14/52293938.2.jpg"},
          {name:"신정환", message:"역시 형이야",img:  "https://mblogthumb-phinf.pstatic.net/MjAxNzA0MjdfMjgx/MDAxNDkzMjYxNzQyMjU4.op0zQTfA81ih-qf3BEzr_6C2VXoclL_Cbs4aiJiObgkg.EZUQzZsblADVKBE1ZcbbleaRwcyd_KmsUJMwDPWU5GIg.JPEG.mki112112/%EC%8B%A0%EC%A0%95%ED%99%983.jpg?type=w800"},
            {name:"고영욱", message:"널 좋아해",img: "https://dimg.donga.com/wps/NEWS/IMAGE/2013/01/14/52293938.2.jpg"},
          {name:"신정환", message:"역시 형이야",img:  "https://mblogthumb-phinf.pstatic.net/MjAxNzA0MjdfMjgx/MDAxNDkzMjYxNzQyMjU4.op0zQTfA81ih-qf3BEzr_6C2VXoclL_Cbs4aiJiObgkg.EZUQzZsblADVKBE1ZcbbleaRwcyd_KmsUJMwDPWU5GIg.JPEG.mki112112/%EC%8B%A0%EC%A0%95%ED%99%983.jpg?type=w800"},
            {name:"고영욱", message:"널 좋아해",img: "https://dimg.donga.com/wps/NEWS/IMAGE/2013/01/14/52293938.2.jpg"},
          {name:"신정환", message:"역시 형이야",img:  "https://mblogthumb-phinf.pstatic.net/MjAxNzA0MjdfMjgx/MDAxNDkzMjYxNzQyMjU4.op0zQTfA81ih-qf3BEzr_6C2VXoclL_Cbs4aiJiObgkg.EZUQzZsblADVKBE1ZcbbleaRwcyd_KmsUJMwDPWU5GIg.JPEG.mki112112/%EC%8B%A0%EC%A0%95%ED%99%983.jpg?type=w800"},
        ]}
          renderItem={({item}) =>  <TouchableOpacity style={style.itemView} onPress={()=>{ 
            navigation.navigate('PostDetail',   {otherParams: { id: item.name }} );
            //alert(item.name);
            }}>
                <Image source={{uri: item.img}} style={style.itemImg}></Image>
                <View style={{flexDirection:'column'}}>
                    <Text style={style.itemName}>{item.name}</Text>
                    <Text style={style.itemMsg}>{item.message}</Text>
                </View>
            </TouchableOpacity>}
                
     />
     </View>
  );
};






// import React, { useEffect, useLayoutEffect, useState } from 'react';
// import { ScrollView } from 'react-native';
// import styled from 'styled-components';
// import { Header, HeaderLink } from '../../../components/HeaderItem';

// //import TabIcon from '../components/FlatList';
// import { View, StyleSheet, FlatList, TouchableOpacity, TouchableWithoutFeedback, Image} from 'react-native';
// import { useQuery } from "@apollo/react-hooks";
// import { gql } from "apollo-boost";
// import {SEEALLPOST } from '../../../screens/Tabs/PostDetailQueries';

// const Text = styled.Text``;

// const style = StyleSheet.create({
//   container: {
//    flex: 1,
//    paddingTop: 22
//   },
//   item: {
//     padding: 10,
//     fontSize: 18,
//     height: 44,
//   },
//    logo: {
//     width: 66,
//     height: 58,
//   },
//     itemView:{
//         flexDirection:'row',
//         borderWidth:0.6,
//         borderRadius:4,
//         padding:8,
//         marginBottom:12,
//     },
//    itemImg:{
//         width:120,
//         height:100,
//         resizeMode:'cover',
//         marginRight:8,
//     },
//     itemName:{
//         fontSize:24,
//         fontWeight:'bold',
//     },
//     itemMsg:{
//         fontSize:16,
//         fontStyle:'italic',
//     },
// });



// export default ({ navigation }) => {
//   useEffect(() => {
//     navigation.setParams({ area: '동작구' });
//   }, []);

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerTitle: '동작구',
//       headerRight: () => {
//         return (
//           <Header>
//             <HeaderLink
//               str={'필터'}
//               onPress={() => navigation.navigate('Filter')}
//             />
//             <HeaderLink
//               str={'지도'}
//               onPress={() => navigation.navigate('Map')}
//             />
//           </Header>
//         );
//       },
//     });
//   }, [navigation]);
//   const { loading, data, refetch } = useQuery(SEEALLPOST, {});
//   const [refreshing, setRefreshing] = useState(false);

//   return (


//        <View>
//        {loading ? (
//         <View>
//           <Text>hi</Text>
//         </View>
//       ) : (  data &&
//         data.seeAllPost && (
//     <View>
    
//       <FlatList
//            data={[
//           {name:"고영욱", message:"널 좋아해",img: "https://dimg.donga.com/wps/NEWS/IMAGE/2013/01/14/52293938.2.jpg"},
//           {name:"신정환", message:"역시 형이야",img:  "https://mblogthumb-phinf.pstatic.net/MjAxNzA0MjdfMjgx/MDAxNDkzMjYxNzQyMjU4.op0zQTfA81ih-qf3BEzr_6C2VXoclL_Cbs4aiJiObgkg.EZUQzZsblADVKBE1ZcbbleaRwcyd_KmsUJMwDPWU5GIg.JPEG.mki112112/%EC%8B%A0%EC%A0%95%ED%99%983.jpg?type=w800"},
//             {name:"고영욱", message:"널 좋아해",img: "https://dimg.donga.com/wps/NEWS/IMAGE/2013/01/14/52293938.2.jpg"},
//           {name:"신정환", message:"역시 형이야",img:  "https://mblogthumb-phinf.pstatic.net/MjAxNzA0MjdfMjgx/MDAxNDkzMjYxNzQyMjU4.op0zQTfA81ih-qf3BEzr_6C2VXoclL_Cbs4aiJiObgkg.EZUQzZsblADVKBE1ZcbbleaRwcyd_KmsUJMwDPWU5GIg.JPEG.mki112112/%EC%8B%A0%EC%A0%95%ED%99%983.jpg?type=w800"},
//             {name:"고영욱", message:"널 좋아해",img: "https://dimg.donga.com/wps/NEWS/IMAGE/2013/01/14/52293938.2.jpg"},
//           {name:"신정환", message:"역시 형이야",img:  "https://mblogthumb-phinf.pstatic.net/MjAxNzA0MjdfMjgx/MDAxNDkzMjYxNzQyMjU4.op0zQTfA81ih-qf3BEzr_6C2VXoclL_Cbs4aiJiObgkg.EZUQzZsblADVKBE1ZcbbleaRwcyd_KmsUJMwDPWU5GIg.JPEG.mki112112/%EC%8B%A0%EC%A0%95%ED%99%983.jpg?type=w800"},
//             {name:"고영욱", message:"널 좋아해",img: "https://dimg.donga.com/wps/NEWS/IMAGE/2013/01/14/52293938.2.jpg"},
//           {name:"신정환", message:"역시 형이야",img:  "https://mblogthumb-phinf.pstatic.net/MjAxNzA0MjdfMjgx/MDAxNDkzMjYxNzQyMjU4.op0zQTfA81ih-qf3BEzr_6C2VXoclL_Cbs4aiJiObgkg.EZUQzZsblADVKBE1ZcbbleaRwcyd_KmsUJMwDPWU5GIg.JPEG.mki112112/%EC%8B%A0%EC%A0%95%ED%99%983.jpg?type=w800"},
//         ]}

//           renderItem={({item}) =>  <TouchableOpacity style={style.itemView} onPress={()=>{ 
//             navigation.navigate('PostDetail',   {otherParams: { id: data.seeAllPost.id }});
//             //alert(item.name);
//             }}>
//                 <Image source={{uri: item.img}} style={style.itemImg}></Image>
//                 <View style={{flexDirection:'column'}}>
//                     <Text style={style.itemName}>{item.name}</Text>
//                     <Text style={style.itemMsg}>{item.message}</Text>
//                 </View>
//             </TouchableOpacity>}
                
//      />
//      </View>
//         ))}
//       </View>
//   );
// };
