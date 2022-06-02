import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Pressable,
  ScrollView,
  Button,
} from "react-native";

import { SafeAreaProvider } from "react-native-safe-area-context";
import PressableButton from "./Components/PressableButton";

//Components
import Header from "./Components/Header";
import Character from "./Components/Character";

const background = {
  uri: "https://images.alphacoders.com/876/thumb-1920-876589.jpg",
};

export default function App() {
  const [newName, setNewName] = useState("");
  const [data, setData] = useState([]);
  const [likedCharacters, setLikedCharacters] = useState([]);
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

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
    );
  };

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
    <SafeAreaProvider style={styles.container}>
      <StatusBar style="auto" />
      <Header />
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <TextInput
          style={styles.input}
          placeholder="Search for a character..."
          value={newName}
          onChangeText={(name) => getCharacters(name)}
        />
      </View>
      <Button
        title="Clear"
        onPress={() => {
          setNewName(""), setData([]);
        }}
      />
      <ScrollView>
        <View style={styles.tasksWrapper}>
          <View style={{ borderBottomColor: "black", borderBottomWidth: 1 }}>
            <View style={styles.listHeader}>
              <Text style={styles.listHeadline}>All Characters</Text>
            </View>

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
                  <PressableButton
                    title="Like"
                    onPress={() => LikeCharacter(index, item)}
                  />
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
                  <PressableButton
                    title="Favorite"
                    onPress={() => FavoriteButton(index, item)}
                  />
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
                  <PressableButton
                    title="Delete"
                    onPress={() => DeleteButton(index, item)}
                  />
                </>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
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
  listHeader: {
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  listHeadline: {
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#C0C0C0",
    width: 400,
    fontSize: 19,
    fontWeight: "bold",
    placeholderTextColor: 'black'
  },
});
