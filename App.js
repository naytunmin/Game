/**
 * React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from "react";
import { View, FlatList, Alert,TouchableOpacity,Text } from "react-native";
import FontAwesome from 'react-native-vector-icons/MaterialCommunityIcons';
import Step from "./app/components/GameStep";
import Cards from "../Game/app/components/Card";
import randomCardArray from "./app/config/RandomCardArray";
import cards_data from "./app/data/cards";

export default class App extends Component {

  state = {
    current_selection: [],
    selected_pairs: [],
    score: 0,
    step:0
  };

  constructor(props) {
    super(props);
    let sources = {
      fontawesome: FontAwesome
    };

    let clone = JSON.parse(JSON.stringify(cards_data));
    this.cards = cards_data.concat(clone);
    this.cards.map(obj => {
      let id = Math.random()
        .toString(36)
        .substring(7);
      obj.id = id;
      obj.src = sources[obj.src];
      obj.is_open = false;
    });
    this.cards = randomCardArray(this.cards);
  }

  componentDidMount() {
    this.setState({
      cards: this.cards
    });
  }

  render() {
    let contents = this.state.cards;
    return (
      <View style={styles.container}>
          <View style={styles.scoreContent}>
   
            <TouchableOpacity
                onPress={() => this.resetCards()}
                style={[
                  styles.button
                ]}
              >
                <Text
                  style={[
                    styles.buttonLabel
                  ]}
                >
                Reset Game
                </Text>
            </TouchableOpacity>
            <Step step={this.state.step}/>
          </View>

          <View style={styles.body}>
            <FlatList
              data={contents}
              renderItem={this.renderCard}
              numColumns={3}
              keyExtractor={item => item.id}
              columnWrapperStyle={styles.flatlistRow}
            />
          </View>   
      </View>
    );
  }

  renderCard = ({ item }) => {
    return (
      <Cards
        key={item.id}
        src={item.src}
        name={item.name}
        color={item.color}
        is_open={item.is_open}
        clickCard={this.clickCard.bind(this, item.id)}
      />
    );
  };

  clickCard = id => {
    let selected_pairs = [...this.state.selected_pairs];
    let current_selection = this.state.current_selection;
    let score = this.state.score;
    let step = this.state.step;

    let index = this.state.cards.findIndex(card => {
      return card.id == id;
    });

    let cards = [...this.state.cards];

    if (
      cards[index].is_open == false &&
      selected_pairs.indexOf(cards[index].name) === -1
    ) {
      cards[index].is_open = true;

      current_selection.push({
        index: index,
        name: cards[index].name
      });
      step += 1;
      if (current_selection.length == 2) {
        if (current_selection[0].name == current_selection[1].name) {
          score += 1;
          selected_pairs.push(cards[index].name);
          if (score == 6) {
            Alert.alert("Congratulation!", "You win this game by " + step + " step!");
            step = 0;
            score = 0;          
            this.resetCards();
          }
        } else {
          cards[current_selection[0].index].is_open = false;
          setTimeout(() => {
            cards[index].is_open = false;
            this.setState({
              cards: cards
            });
          }, 500);
        }
        current_selection = [];
      }

      this.setState({
        score: score,
        cards: cards,
        current_selection: current_selection,
        step:step
      });
    }
  };

  resetCards = () => {
    let cards = this.cards.map(obj => {
      obj.is_open = false;
      return obj;
    });

    cards = randomCardArray(cards);

    this.setState({
      current_selection: [],
      selected_pairs: [],
      cards: cards,
      score: 0,
      step:0,
    });
  };
}

const styles = {
  container: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: "#fff"
  },
  body: {
    marginTop: 50,
    backgroundColor: "aliceblue"
  },
  scoreContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop:50
  },
  flatlistRow: {
    flex: 1,
    padding: 10
  },
  button: {
    flex: 1,
    alignItems: "center"

  },
  buttonLabel: {
    fontSize: 20,
    fontWeight: "bold"
  }
};
