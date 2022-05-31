import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Pressable,
  ScrollView,
  ImageBackground,
  Switch,
  Animated,
  
} from "react-native";
import PressableButton from "./Components/PressableButton";

import Character from "./Components/Character";

const background = {
  uri: "https://images.alphacoders.com/876/thumb-1920-876589.jpg",
};

export default function App() {
  const [newName, setNewName] = useState("");
  const [data, setData] = useState([]);
  const [likedCharacters, setLikedCharacters] = useState([]);
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);
  const [isVisible, setIsVisible] = useState(true)

  const LikeCharacter = (index, item) => {
    setLikedCharacters([...likedCharacters, item]);
    setData((data) => data.filter((element) => element.id !== item.id));
  };

  const FavoriteButton = (index, item) => {
    setFavoriteCharacters([...favoriteCharacters, item]);
    setLikedCharacters((likedCharacters) =>
      likedCharacters.filter((element) => element.id !== item.id)
    );
  };

  const DeleteButton = (index, item) => {
    setFavoriteCharacters((favoriteCharacters) => 
      favoriteCharacters.filter((element) => element.id !== item.id)
    )
  }

  const getCharacters = async (name) => {
    setNewName(name);
    try {
      const apiResponse = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${newName}`
      );
      const json = await apiResponse.json();
      setData(json.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ImageBackground
          source={require("./assets/header.png")}
          resizeMode="contain"
          style={styles.image}
        ></ImageBackground>
        <TextInput
          style={styles.input}
          placeholder="Search for a character..."
          placeholderTextColor="hsl(234, 11%, 52%)"
          value={newName}
          onChangeText={(name) => getCharacters(name)}
        />
      </View>
      <View style={styles.tasksWrapper}>
        <ScrollView>
          
          <View style={{ borderBottomColor: "black", borderBottomWidth: 1 }}>
            <View style={styles.listHeader}>
              <Text style={styles.listHeadline}>All Characters</Text>
            </View>
              <TouchableOpacity><Text>Hide</Text></TouchableOpacity>
            {data.map((item, index) => {
              return (
                <>
                  <Pressable
                    key={index}
                    onPress={() => LikeCharacter(index, item)}
                  >
                    <Character
                      name={item.name}
                      id={item.id}
                      image={{ uri: item.image }}
                      index={index}
                    />
                  </Pressable>
                  <PressableButton title='Like' onPress={() => LikeCharacter(index, item)} />
                </>
              );
            })}
          </View>

          <View style={{ borderBottomColor: "black", borderBottomWidth: 1 }}>
            <View style={styles.listHeader}>
              <Text style={styles.listHeadline}>Liked</Text>
            </View>
            {likedCharacters.map((item, index) => {
              return (
                <>
                <TouchableOpacity
                  key={index}
                  onPress={() => FavoriteButton(index, item)}
                  >
                  <Character
                    name={item.name}
                    id={item.id}
                    image={{ uri: item.image }}
                    index={index}
                    />
                </TouchableOpacity>
                <PressableButton title='Favorite' onPress={() => FavoriteButton(index, item)} />
                    </>
              );
            })}
          </View>

          <View style={{ borderBottomColor: "black", borderBottomWidth: 1 }}>
            <View style={styles.listHeader}>
              <Text style={styles.listHeadline}>Favorite</Text>
            </View>
            {favoriteCharacters.map((item, index) => {
              return (
                <>
                <TouchableOpacity
                  key={index}
                  onPress={() => FavoriteButton(index, item)}
                  >
                  <Character
                    name={item.name}
                    id={item.id}
                    image={{ uri: item.image }}
                    index={index}
                    />
                </TouchableOpacity>
                <PressableButton title='Delete' onPress={() => DeleteButton(index, item)} />
                </>
              );
            })}
          </View>
        </ScrollView>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    height: 160,
    paddingHorizontal: 25,
  },
  background: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 20,
  },
  header: {
    alignSelf: "center",
    width: "100%",
  },

  listHeader: {
    height: 55,
    alignItems: "center",
    justifyContent: "center",
  },
  listHeadline: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,

    justifyContent: "space-between",
    flexDirection: "column",
  },
  item: {
    margin: 30,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#C0C0C0",
    width: 400,
    fontSize: 19,
    fontWeight: "bold",
  },
});
