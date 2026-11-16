import * as React from "react";
import { LayoutChangeEvent, StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../styles/colors";
import { PanGestureHandler } from "react-native-gesture-handler";
import { Coordinate, Direction, GestureEventType } from "../types/type";
import Snake from "./snake";
import Food from "./food";
import { checkEating } from "../utils/checkEating";
import { randomPos } from "../utils/randomPos";
import Footer from "./footer";

const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }];
const FOOD_INITIAL_POSITION = { x: 5, y: 20 };
const GAME_BOUNDS = { xMin: 0, xMax: 35, yMin: 0, yMax: 63 };
const GRID_SIZE = 10;
const BOUNDARY_BORDER_WIDTH = 12;
const FOOD_SIZE = 30;
const MOVE_INTERVAL = 100;
const SCORE_INCREMENT = 10;

const getGameBounds = (width: number, height: number) => ({
  xMin: 0,
  xMax: Math.max(
    1,
    Math.floor(
      (width - BOUNDARY_BORDER_WIDTH * 2 - FOOD_SIZE) / GRID_SIZE,
    ),
  ),
  yMin: 0,
  yMax: Math.max(
    1,
    Math.floor(
      (height - BOUNDARY_BORDER_WIDTH * 2 - FOOD_SIZE) / GRID_SIZE,
    ),
  ),
});

const isOppositeDirection = (
  currentDirection: Direction,
  nextDirection: Direction,
): boolean => {
  return (
    (currentDirection === Direction.Up && nextDirection === Direction.Down) ||
    (currentDirection === Direction.Down && nextDirection === Direction.Up) ||
    (currentDirection === Direction.Left && nextDirection === Direction.Right) ||
    (currentDirection === Direction.Right && nextDirection === Direction.Left)
  );
};

export default function Game(): React.JSX.Element {
  const [direction, setDirection] = React.useState<Direction>(Direction.Right);
  const [snake, setSnake] = React.useState<Coordinate[]>(
    SNAKE_INITIAL_POSITION,
  );
  const [food, setFood] = React.useState<Coordinate>(FOOD_INITIAL_POSITION);
  const [gameBounds, setGameBounds] = React.useState(GAME_BOUNDS);
  const [isGamever, setGameover] = React.useState<boolean>(false);
  const [isPaused, setisPaused] = React.useState<boolean>(false);

  const [score, setScore] = React.useState<number>(0);

  React.useEffect(() => {
    if (!isGamever) {
      const interval = setInterval(() => {
        !isPaused && moveSnake();
      }, MOVE_INTERVAL);

      return () => clearInterval(interval);
    }
  }, [snake, isGamever, isPaused, gameBounds]);

  const moveSnake = () => {
    const snakeHead = snake[0];
    const newHead = { ...snakeHead };

    switch (direction) {
      case Direction.Up:
        newHead.y -= 1;
        break;
      case Direction.Down:
        newHead.y += 1;
        break;
      case Direction.Left:
        newHead.x -= 1;
        break;
      case Direction.Right:
        newHead.x += 1;
        break;
      default:
        break;
    }

    if (newHead.x > gameBounds.xMax) newHead.x = gameBounds.xMin;
    if (newHead.x < gameBounds.xMin) newHead.x = gameBounds.xMax;
    if (newHead.y > gameBounds.yMax) newHead.y = gameBounds.yMin;
    if (newHead.y < gameBounds.yMin) newHead.y = gameBounds.yMax;

    if (
      snake.some(
        (segment) => segment.x === newHead.x && segment.y === newHead.y,
      )
    ) {
      setGameover(true);
      return;
    }

    if (checkEating(newHead, food, 2)) {
      setSnake([newHead, ...snake]);

      setFood(randomPos(gameBounds.xMax, gameBounds.yMax));
      setScore(score + SCORE_INCREMENT);
    } else {
      setSnake([newHead, ...snake.slice(0, -1)]);
    }
  };

  const handleGesture = (e: GestureEventType) => {
    const { translationX, translationY } = e.nativeEvent;
    let nextDirection: Direction;

    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0) {
        nextDirection = Direction.Right;
      } else {
        nextDirection = Direction.Left;
      }
    } else {
      if (translationY > 0) {
        nextDirection = Direction.Down;
      } else {
        nextDirection = Direction.Up;
      }
    }

    if (!isOppositeDirection(direction, nextDirection)) {
      setDirection(nextDirection);
    }
  };

  const pauseGame = () => {
    setisPaused(!isPaused);
  };

  const reloadGame = () => {
    setSnake(SNAKE_INITIAL_POSITION);
    setFood(FOOD_INITIAL_POSITION);
    setGameover(false);
    setScore(0);
    setDirection(Direction.Right);
    setisPaused(false);
  };

  const handleBoundaryLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setGameBounds(getGameBounds(width, height));
  };

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <SafeAreaView style={styles.container}>
        <View onLayout={handleBoundaryLayout} style={styles.boundaries}>
          <Snake snake={snake} />
          <Food x={food.x} y={food.y} />
        </View>
        <Footer
          isPaused={isPaused}
          pauseGame={pauseGame}
          reloadGame={reloadGame}
        >
          <Text style={{ color: "white" }}>Score : {score}</Text>
        </Footer>
      </SafeAreaView>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
  },

  boundaries: {
    flex: 1,
    borderColor: Colors.primary,
    borderWidth: 12,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: Colors.background,
  },
});
