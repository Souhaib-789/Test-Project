import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import TextComponent from '../components/TextComponent';
import { colors } from '../utilities/colors';
import UserCard from './UserCard';

const List = (props) => {


    const renderItem = ({ item, index }) => {
        return (
            <UserCard item={item} onPressFunction={()=> props?.onPressFunction(item)} />
        )
    }

    

    return (
        <View>
            <FlatList
                data={props?.data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.row}>
                        <TextComponent text={props?.emptyListText} style={styles.text} />
                    </View>
                }
                ListHeaderComponent={
                    <View style={styles.wide_row}>
                        <TextComponent text={props?.headerTitle} style={styles.heading} />
                    </View>
                }
            />
            
        </View >
    )
}

export default List

const styles = StyleSheet.create({
    text: {
        color: colors.BLACK,
        fontSize: 16,
    },
    row: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    wide_row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 15
    },
    heading: {
        color: colors.BLACK,
        fontSize: 16,
        fontWeight: 'bold',
    },


})  
