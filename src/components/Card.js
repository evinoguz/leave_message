import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';

const Cards = (props) => {
  return (
    <TouchableOpacity>
      <Card>
        <CardImage
          source={{ uri: props.data.title }}
          title={props.data.title.slice(0, 25)}
        />
        <CardTitle

          subtitle={props.data.created_at}
        />
      </Card>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  listItem: {
    margin: 10,
    padding: 10,
    backgroundColor: "#FFF",
    width: "100%",
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 5
  },
});
export default Cards;