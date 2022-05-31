import { View,StyleSheet } from "react-native";

 const CharacterDivider = () => {
    return (
      <View
        style={styles.divider}
      />
    );
  }

  export default CharacterDivider


  const styles = StyleSheet.create({
      divider: {
        height: 1,
        width: "70%",
        backgroundColor: "#607D8B",
        borderBottomColor: 'gray',
        borderBottomWidth: 2, 
        marginBottom: '2%',
        alignSelf: 'center'
      }
  })


