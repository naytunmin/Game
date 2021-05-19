import React,{Component} from "react";
import { StyleSheet, View, TouchableHighlight } from "react-native";
import FontAwesome from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Card extends Component {
  render() {
    let CardSource = FontAwesome;
    let icon_name = "account-question";
    let icon_color = "#393939";
    let icon_size = 100;

    if (this.props.is_open) {
      CardSource = this.props.src;
      icon_name = this.props.name;
      icon_color = this.props.color;
      icon_size = 100;
    }

    return (
      <View style={styles.cardcontainer}>
        <TouchableHighlight
          onPress={this.props.clickCard}
          activeOpacity={0.75}
          underlayColor={"#f1f1f1"}
        >
          <CardSource name={icon_name} size={icon_size} color={icon_color} />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardcontainer: {
    flex: 1,
    alignItems: "center",
    borderWidth: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  }
})
