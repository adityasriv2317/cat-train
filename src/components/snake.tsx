import { Fragment, JSX } from "react";
import { Coordinate } from "../types/type";
import { Image, View, StyleSheet } from "react-native";

import { Colors } from "../styles/colors";

interface snakeProps {
  snake: Coordinate[];
}

const colors: string[] = [Colors.color1, Colors.color2];

export default function Snake({ snake }: snakeProps): JSX.Element {
  return (
    <Fragment>
      {snake.map((s: Coordinate, i: number) => {
        const s_Style = {
          left: s.x * 10,
          top: s.y * 10,
          backgroundColor: colors[i % 2],
        };
        return i === 0 ? (
          <Image
            key={i}
            source={require("../../assets/a.png")}
            style={[styles.snake, s_Style]}
          />
        ) : (
          <View key={i} style={[styles.snake, s_Style]} />
        );
      })}
    </Fragment>
  );
}

const styles = StyleSheet.create({
  snake: {
    width: 25,
    height: 25,
    // backgroundColor: Colors.primary,
    position: "absolute",
  },
});
