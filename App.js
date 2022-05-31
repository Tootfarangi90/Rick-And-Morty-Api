import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Pressable,
  ScrollView,
} from "react-native";

import Character from "./Components/Character";

const background = {
  uri: "https://images.alphacoders.com/876/thumb-1920-876589.jpg",
};


export default function App() {
  const [newName, setNewName] = useState("");
  const [data, setData] = useState([]);
  const [likedCharacters, setLikedCharacters] = useState([]);
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);

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

  const markTodoComplete = (todoId) => {
    const newTodos = todos.map((item) => {
      if (item.id == todoId) {
        return { ...item, completed: true };
      }
      return item;
    });

    const klart = newTodos.filter((item) => item.completed == true);
    const newTodos1 = todos.filter((item) => item.id != todoId);
    setTodos(newTodos1);

    setDoneTodo(klart);

    console.log(doneTodo);
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
    <SafeAreaView style={styles.container}>
      <View style={styles.tasksWrapper}>
        <ScrollView>
          <View>
            <Text style={styles.listHeadline}> ALL Characters</Text>
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
                </>
              );
            })}
          </View>

          <View>
            <Text style={styles.listHeadline}>Liked</Text>
            {likedCharacters.map((item, index) => {
              return (
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
              );
            })}
          </View>

          <View>
            <Text style={styles.listHeadline}>Favorite</Text>
            {favoriteCharacters.map((item, index) => {
              return (
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
              );
            })}
          </View>
        </ScrollView>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder="Search for a character..."
          placeholderTextColor="hsl(234, 11%, 52%)"
          value={newName}
          onChangeText={(name) => getCharacters(name)}
        />
      </KeyboardAvoidingView>
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
