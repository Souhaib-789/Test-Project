import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import IMAGE_AVATAR from '../assets/user.png'
import TextComponent from '../components/TextComponent';
import { colors } from '../utilities/colors';


const UserCard = ({item, onPressFunction}) => {
    return (
        <TouchableOpacity onPress={onPressFunction} style={styles.card_container}>
            <Image source={item?.avatar_url ? { uri: item?.avatar_url } : IMAGE_AVATAR} style={styles.avatar} />
            <View style={{ gap: 3 }}>
                <TextComponent text={item?.login} style={styles.title} />
                <TextComponent text={item?.url} numberOfLines={1} style={styles.span} />
            </View>
        </TouchableOpacity>
    )
}

export default UserCard

const styles = StyleSheet.create({
    span: {
        color: colors?.GREY,
        fontSize: 12,
    },
    title: {
        color: colors?.BLACK,
        textTransform: 'capitalize',
        fontSize: 14,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    card_container: {
        shadowColor: colors.BLACK,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.17,
        shadowRadius: 2.54,

        marginVertical: 10,
        width: '99%',
        gap: 5,
        flexDirection: 'row',
        backgroundColor: colors?.WHITE,
        elevation: 2,
        margin: 2,
        padding: 12,
        gap: 10,
        borderRadius: 10,
    },


})  
