import { GestureHandlerRootView } from "react-native-gesture-handler";
import Game from "./src/components/game";
import { StatusBar } from "react-native";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <Game />
    </GestureHandlerRootView>
  );
}
