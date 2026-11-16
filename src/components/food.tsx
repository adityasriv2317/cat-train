import { StyleSheet, Text, View } from "react-native";
import { Coordinate } from "../types/type";
import { JSX, useMemo } from "react";

function getRandomFood() {
  const fruitEmojis = ["🍦", "🍉", "🍿"];
  const randomIndex = Math.floor(Math.random() * fruitEmojis.length);
  return fruitEmojis[randomIndex];
}

export default function Food({ x, y }: Coordinate): JSX.Element {
  const foodEmoji = useMemo(() => getRandomFood(), [x, y]);

  return (
    <Text style={[{ top: y * 10, left: x * 10 }, styles.food]}>
      {foodEmoji}
    </Text>
  );
}

const styles = StyleSheet.create({
  food: {
    width: 30,
    height: 30,
    fontSize: 28,
    borderRadius: 7,
    position: "absolute",
  },
});
