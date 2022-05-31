import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'


const Character = ( props ) => {

    return (
        <View style={styles.item}>
            <View style={styles.avatarContainer}>
                <Image source={props.image} style={styles.avatar} />
            </View>   
            <Text style={styles.name}>{props.name}</Text>   
            <Text style={styles.name}>{props.id}</Text>   
        </View>

    )
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 13,
        paddingHorizontal: 13,
    },
    avatarContainer: {
        backgroundColor: '#d9d9d9',
        borderRadius: 100,
        height: 100,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 100,
    },
    name: {
        fontWeight: '600',
        fontSize: 16,
        marginLeft: 13,
    },  
    
})
export default Character