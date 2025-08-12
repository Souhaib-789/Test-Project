import { ScrollView, Image, StyleSheet, View, ActivityIndicator, TouchableOpacity, Linking } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import TextComponent from '../../components/TextComponent';
import { colors } from '../../utilities/colors';
import { useDispatch, useSelector } from 'react-redux';
import { RefreshControl } from 'react-native-gesture-handler';
import { getAllUsers } from '../../redux/Actions/GeneralActions';
import List from '../../components/List';
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import Icon, { IconTypes } from '../../components/Icon';
import Button from '../../components/Button';
// import { MY_GITHUB_TOKEN } from '../../utilities/env';


const Home = () => {

  const dispatch = useDispatch()
  const [userLoading, setUserLoading] = useState(false)
  const DATA = useSelector(state => state.GeneralReducer.usersList)
  const GITHUB_TOKEN = 'Add_token_here';
  const timeRef = useRef(null);

  const [currUser, setCurrUser] = useState(null);
  const [search, setSearch] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setUserLoading(true);
    try {
      const res = await fetch('https://api.github.com/users', {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`
        }
      });
      const data = await res.json();
      dispatch(getAllUsers(data));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
    finally {
      setUserLoading(false);
    }
  };

  const onPressViewDetails = (item) => {
    setCurrUser(item);
    setShowDetailModal(true);
  }

  const onPressSearch = (val) => {
    setSearch(val);
    clearTimeout(timeRef.current);
    if (val.trim() == '') {
      fetchData();
    }
    else {
      setUserLoading(true);
      timeRef.current = setTimeout(async () => {
        try {
          const res = await fetch(`https://api.github.com/search/users?q=${val}`);
          const new_data = await res.json();
          dispatch(getAllUsers(new_data.items));
        } catch (error) {
          console.error('Error searching users:', error);
        }
        setUserLoading(false);
      }, 1000);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={fetchData}
          />
        }
      >

        <View style={styles.upper_sub_view}>
          <Image source={require('../../assets/user.png')} style={styles.upper_view_image} resizeMode='cover' />
          <View>
            <TextComponent text={'Welcome Back,'} style={styles.upper_view_span} />
            <TextComponent text={'Mr. User'} style={styles.upper_view_text} />
          </View>
        </View>

        <View>
          <Input
            value={search}
            placeholder={'Search ...'}
            style={{ marginBottom: 20 }}
            leftIcon={
              <Icon type={IconTypes.MaterialIcons} name={'search'} color={colors.GREY} />
            }
            leftIconStyle={styles.filter_icon}
            onChangeText={(val) => onPressSearch(val)}
          />
          {
            userLoading ?
              <ActivityIndicator size={'large'} color={colors.PRIMARY} style={{ marginTop: 20 }} />
              :
              <List
                data={DATA}
                headerTitle={'Explore Users'}
                emptyListText={'No users found'}
                onPressFunction={onPressViewDetails}
              />
          }
        </View>
      </ScrollView>

      <Modal
        visible={showDetailModal}
        title={'User Details'}
        onCancel={() => setShowDetailModal(false)}
        onClose={() => { setShowDetailModal(false), setCurrUser(null) }}
        cross
      >
        <View style={{ padding: 20, gap: 8 }}>
          <Image source={currUser?.avatar_url ? { uri: currUser?.avatar_url } : require('../../assets/user.png')} style={{
            width: 100,
            height: 100,
            borderRadius: 100,
            alignSelf: 'center',
          }} resizeMode='cover' />
          <TextComponent text={`Username: ${currUser?.login}`} style={styles.text} />
          <TouchableOpacity onPress={() => {
            if (currUser?.html_url) {
              Linking.openURL(currUser?.html_url);
            }
          }
          }>
            <TextComponent text={currUser?.html_url} style={styles.link} />
          </TouchableOpacity>
          <TextComponent text={`ID: ${currUser?.id}`} style={styles.text} />
          <TextComponent text={`Node ID: ${currUser?.node_id}`} style={styles.text} />
          <TextComponent text={`Type: ${currUser?.type}`} style={styles.text} />
          <TextComponent text={`Site Admin: ${currUser?.site_admin ? 'Yes' : 'No'}`} style={styles.text} />

        </View>
        <Button title={'Close'} onPress={() => setShowDetailModal(false)} style={{ backgroundColor: colors.PRIMARY, width: '70%', alignSelf: 'center' }} />
      </Modal>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  filter_icon: {
    width: 15,
    height: 15,
  },
  upper_view_text: {
    color: colors.BLACK,
    fontSize: 16,
  },
  upper_view_span: {
    color: colors.GREY,
    fontSize: 11,
  },
  upper_view_image: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  upper_sub_view: {
    marginTop: 30,
    marginBottom: 20,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },


  link: {
    color: colors.PRIMARY,
    textDecorationLine: 'underline',
    fontSize: 13,
  },
  wide_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center'
  },

  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    padding: 15,

  },
  text: {
    color: colors.BLACK,
    fontSize: 14,
  }

})  
