import React, { Component } from "react";
import { View, Text } from "react-native";

export default class GameStep extends Component {
  render() {
    const { step } = this.props;
    return (
      <View style={styles.Gamestep_container}>
        <Text style={styles.step}>{step}</Text>
      </View>
    );
  }
}

const styles = {
  Gamestep_container: {
    flex: 1,
    alignItems: "center"
  },
  step: {
    fontSize: 20,
    fontWeight: "bold"
  }
};
