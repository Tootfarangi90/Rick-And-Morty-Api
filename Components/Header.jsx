import { View, ImageBackground, StyleSheet } from "react-native"


const Header = () => {
    return(
        <View style={styles.header}>
        <ImageBackground
          source={require("../assets/header.png")}
          resizeMode="contain"
          style={styles.image}
        ></ImageBackground>
      </View>
    )
}

const styles = StyleSheet.create({
    image: {
      height: 160,
      paddingHorizontal: 25,
    },
    header: {
      alignSelf: "center",
      width: "100%",
      backgroundColor: 'black'
    },
  });

  export default Header
  