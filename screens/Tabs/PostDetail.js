import React from 'react';
import styled from 'styled-components';
import {StyleSheet, Image, ScrollView,FlatList, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import { Divider, Icon } from 'react-native-elements';
import Button from '../../components/Button'
const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    padding: 5,
  },
   PostMain: {
     width:'100%',
     height: 200,
      //flex : 0.2,
      backgroundColor: '#faa9ff',
   },

   Footer: {
     //flex:0.2,
     //height:'20%',
      alignItems:'flex-start',
     height:100,
     width:'100%',
      backgroundColor: '#ffffff',
   },

  UserProfileBigView: {
      alignItems:'flex-start',
      flexDirection: 'row', 
      width:'100%',
      height:80,
      backgroundColor: '#5f9a9a',
   },
    PostMainView: {
      alignItems:'flex-start',
      flexDirection: 'row', 
      width:'100%', 
      height:400,
      backgroundColor: '#fffff0',
   },
   PostDetailView: {
      flexDirection: 'row', 
      flex : 2,
      width:'100%',
      height:'100%',
      backgroundColor: '#5ffa9a',
   },
   UserProfilePic: {
     // flex : 1,
      width:50,
      height:50,
      backgroundColor: '#5f9a9a',
   },
   UserNameLocal: {
      //flex : 2,
      alignItems:'flex-start',
      width:200,
      height:'100%',
      backgroundColor: '#5f9000',
   },
  UserName: {
    flex : 1,
    fontSize:35,
     width:'100%',
     height:'100%',
    color:'black',
    backgroundColor: '#9aa9ff',
  },
   UserName2: {
    flex : 1,
    fontSize:35,
     width:'50%',
     height:'50%',
    color:'black',
    backgroundColor: '#ff9a9a',
  },
   itemView:{
        flexDirection:'row',
        borderWidth:1,
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

export default () => (
  <View style={styles.container}>
   <Image
            style={{ height:270,width:"100%",resizeMode:"stretch"}}
            source={{uri: "https://dimg.donga.com/wps/NEWS/IMAGE/2013/01/14/52293938.2.jpg"}}/>

  <Divider style={{ height: 3,backgroundColor:'#e1e8ee' }} />
  <ScrollView style={styles.PostMain}>
  <View style={styles.UserProfileBigView}>
   <Image
        style={{ marginLeft: 5,borderRadius: 55,height:'100%',width:80,resizeMode:"stretch"}}
        source={{uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAhFBMVEX///8AAABwcHDExMTi4uI9PT35+fny8vL8/Pz19fXm5ubJycm5ubns7OyRkZGKiop+fn54eHivr6+goKDZ2dkTExMlJSVgYGDPz89JSUktLS3Nzc1sbGyFhYXb29uampoaGho2NjZWVlYhISG1tbVOTk6mpqYLCwtkZGQ6OjoXFxcwMDC5s1GBAAAI5klEQVR4nO2dZ2OjPAyALwPIIpMMMprRtGl7////vUnTXoskA8YyMnl5vt7VtYptDUvynz81NTU1NTU1NTU133TDzXS2H40nzfFuuH9t9bq+9JT4CKPZJG4g/m5H/Z703BiIXk9zLN0/vHG/Iz1FE9rD5xTpvtn2pedZEP9MLE0Fwwou13Cf5/P9+pAr6Rnr0R1piffJSyQ9aw32+vLdWFZlrbYWxQS8MqqCkgy3heW7sm5Jzz+TgYl8N5rSEqTjN00FbDQOT9JSpNB+NxfwylRaDiV9FvmujKUlUTDlEvCqN5w0Vofpk35f7qatzSqKolV/MNzGafZ4oxF3pcXBpFkxMeEnXX2qZcqPHAMJIdJQC7iYKU2V7uCk/LG1Y8pfuUSbGdZmMDyovqJTC/VVMctxDkvTnyqsvJP9eeempfh+OS1pf6b4ebuz1qBNzm+h4fEFb+QQe3tz1qK7pmY30htkQGoPR+IblDNx2eiOElLH6jy0MWFdzsTM4iLabEcMtGSfrj4hMa+CRwRl9r3yzrYIhGGyKzoWdSaLr1NijWqeMb8hRJRepz62SAp/wRuEiMJxDWyObs0GxGvir6gnFaD5eKZDYgtX1OUfo+mYHwwvcMgLw0SL0rOxaboXOKigxkA62uiU+QaFew4coxYigLbkgudQmEARByzDFgB5hUyGcheOK+YpemAibMoZmW9CQeIIzqPNNjT0+g3MJBPgOcPoksPbjzXf0DrYXErwekDk9nRlaxfegDtRZJlC84rVQoaK6MA5eF7AScpsW0GdKOAmQouNeR1twPACSh/aVtxnARh+wjx8DoBnyO4AgGV65B4/GxDDZf8bA5U4L/0uyj8mZ8DupkLnunSNCIOI/Mk+wHIr/agBdxUf/IsIpHUM2X9BBiAoZsG/ARZF6RdR4ELMMMJGAaJupcdNwV/Ygt0InLMX/t+QDnCdLASLwFl2LPteH8QRLZx0QMJF2df6wOTQvi7MBkh4KFvlg2tRCznMQTJuWrpRU7qEl7IlfPxV+vgnzeNrC/sa/yn5G0rX+I9vtQEH9QEtb+A9WTjppL2nx/eAHz+KATOF2NPrwUa/lB8SBtHEOff4wKQQiCbCiDD3JSYYXiAiDKP6zGcdvNk68w6fC3DUfPCODjN1JEoT4e0aaz5vF+TLsW/zPDz+DSm65eZLVMBpHjJ10HCrMKpEmIT5LJOfCJfp42Wb/Dna2omuZAxBH5Ftt/gwXy7mGVcflKbPlNiDslYl1L1iKiz7BWVfMhsTOuCCJ4aoIlT2jcbMfNDCoOJ0hsg0LuCQTGXHBTMWMtlly2ZwrZJhxAhXI6xl67oDlHZudtoQJf1iKdBfEPWxBp4iSsoViAQjUHmEQcY+1ZRBvmcNVSJbMORAVee5UChLlSmfiigNqqRfzF5LQHYN0LaVu2SHBfk1eiMgu3ppLi+64F36HP0GOYqfeBpR6gCVyXwi5RZiFH1bJnl34yvWqjfkFcUPqrYYuzxX02dFI5d3p5rU0KvsyjjjyAlnqt58a/Ea5yTqHmbxVN29paX+sbkbx+gv6M4Wd7w90cOzPT3R2++OcwISvmKS58l+2noKgyBsbwazHQyIAlxboncKdINU4TkpIGOzr5NTp+hvaNWvjTuKHhMSvpQ2rphqCgq2Lv3hxdEt+EP010hAB7q1ZGPwGU/Of8A7YcEen+/ut2f9R5Rm4Sg4TJ3VESRRWlNEgmd3m5Yq6e1U/QIxLxVan7/xB7kWq7fnzAAom+Cs9By/vt6syuJ9Eb2+kV7uJd63HGvhaUCwas0mb6c49rw4flk2h4ONgw5gTU1NTU1NTU2n4wdhm4cw8DvuOIvdXn822np6bx/l4dnbjmb9nmx//V5/dyJbXTOyOO2knmdbDY+WhfthvSu7s7ffZ3hQRpPmoDxXK9qlXYvZ4zIuJ2Vf48E4fmLrATl/n/56SgnsbS7WwPhWgoWhNQ0y+5CW7YvLzMpabZldufBi4X02lptBTrhv4VQPyUjCeRFHvq4hT8xmzRm/+GcNnmKaTkZc/pvD+vju8fB+XOe81ZkwHKphRm7P1fpfjqerJ2Y3J+g9rabjZeaDn+aZN6t0E3Q+Poc2W+P44Xmc/jkvhs0WUrfgcV9OXWBvlvpypFF2iuIxrRvPozLLHp+GKZ62QeWX2gyNB2W3bfJbapVVuGRB+SBeLPOW1kopY8EyHZWAntwT2pHKNy0komIPCidNDBT7scBCVaRSjqXfXfQVaazaf3i6wuPgwhvvEf0ZNf2pJ3KQpiOBaOoNOs1CJJ/05t1JWyINkQ+dAA51LJuaR6y0KYNVo6cDpSc8tx7o9amYQ26dQaVru/Sw6x0qoyxnOwCfuEey0BfRGMJvXeTbikSlzpvlyRaDEDFXrTyhCd0UkCzTyWEx+/iUcqMYlwKn6eZYp9goWksbamp8HGLJPE+J4nOXkwhDfFGUNV383R15V1kB1mwZeh//QOmdUTXBTl66d4A8THdPmW+QhZk6ZawpXN6Ed0IU70zbV+gTVqEMCbW0SalyR7vQ/TV6A61T9U5E9lo1KgXQk7ZKKxr9T/bmwJZAPr/q9EBuoVsuoRr0hLBKxUEBXVeFP6DgPP3foKoo/6mzwqAudnTgDRps1fmEeIOR/h56J70iFaufwMlfKH8IRuhcDFyogc4wtUyhMnQhvJ0f2OmN+D5d4NsLPTJcmCOYPvb14R/BhUZpOkCFgePX8DRy36lIAg0y/IWArqiGzf0b4BchV78D/gRVUoZ34CKE/w6v06p1kt6Arh/0i8CVb+lvgJkTAMsN3gWCMKlLzeDyAm6jYB8fsE+rtw3RRoRnJVjEVeziAH2j5L92M7ZpFYDh+qRVAy0aoUmaAWRIZi6ALzzftKrHBtxhJHeau4nOxUlmZaakWVaWZDSbsSOgMyQVYvnlhPZJ3ukX6FzlPEk3X7NvVSVI+k9uFsWYcfqfSZizLqZSJO+VHl/jo1uZByAp4AN+RFRK40YRMx9EvHeQWSdWIRZkMVSnNZw0H4HJsOVIyn1NTU1NTU1NTU1e/gOLLXwmT1BF0QAAAABJRU5ErkJggg=="}}
      />
   <View style={styles.UserNameLocal}>
 <Text style={{ marginLeft: 15,fontSize:22,alignItems:'center'}}>ID : 아이조아</Text>
 <Text style={{ marginLeft: 15,}}>지역 : 동작구 상도동</Text>
   </View>
   <Text>별점 : 4.5 / 5.0</Text>
  </View>
  
  <Divider style={{ height: 3,backgroundColor:'#e1e8ee' }} />
  <View style={styles.PostMainView}>
      <Text style={{  width:'100%',height:'20%',marginLeft: 10,marginTop: 10,fontSize:22,alignItems:'center'}}>캠핑 용품 빌려드립니다.(제목) </Text>
      
      {/* <FlatList
           data={[
          {name:"고영욱", message:"널 좋아해",img: "https://dimg.donga.com/wps/NEWS/IMAGE/2013/01/14/52293938.2.jpg"},
          {name:"신정환", message:"역시 형이야",img:  "https://mblogthumb-phinf.pstatic.net/MjAxNzA0MjdfMjgx/MDAxNDkzMjYxNzQyMjU4.op0zQTfA81ih-qf3BEzr_6C2VXoclL_Cbs4aiJiObgkg.EZUQzZsblADVKBE1ZcbbleaRwcyd_KmsUJMwDPWU5GIg.JPEG.mki112112/%EC%8B%A0%EC%A0%95%ED%99%983.jpg?type=w800"},
            {name:"고영욱", message:"널 좋아해",img: "https://dimg.donga.com/wps/NEWS/IMAGE/2013/01/14/52293938.2.jpg"},
          {name:"신정환", message:"역시 형이야",img:  "https://mblogthumb-phinf.pstatic.net/MjAxNzA0MjdfMjgx/MDAxNDkzMjYxNzQyMjU4.op0zQTfA81ih-qf3BEzr_6C2VXoclL_Cbs4aiJiObgkg.EZUQzZsblADVKBE1ZcbbleaRwcyd_KmsUJMwDPWU5GIg.JPEG.mki112112/%EC%8B%A0%EC%A0%95%ED%99%983.jpg?type=w800"},
        ]}
          renderItem={({item}) =>  <TouchableOpacity style={styles.itemView} onPress={()=>{ 
            navigation.navigate('PostDetail');
            //alert(item.name);
            }}>
                <Image source={{uri: item.img}} style={styles.itemImg}></Image>
                <View style={{flexDirection:'column'}}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemMsg}>{item.message}</Text>
                </View>
            </TouchableOpacity>} */}
{/*                 
     /> */}
      
       
   
    </View>


  </ScrollView>
  <Divider style={{ height: 3,backgroundColor:'#e1e8ee' }} />
  <View style={styles.Footer}>
  <View>   
  <Icon
  raised
  name='favorite'
  color='#ff0000'/>
   <Text style={{ marginLeft: 100,fontSize:22,}}>ZZimhagi</Text>
  </View>
    <Button style={{height:'100%', align:'center'}} text="인증문자 받기"/>
  </View>
  
   </View>
);
