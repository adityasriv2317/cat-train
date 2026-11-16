import { JSX } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Colors } from "../styles/colors";

interface footerProps {
  reloadGame: () => void;
  pauseGame: () => void;
  children: JSX.Element;
  isPaused: boolean;
}

export default function Footer({
  reloadGame,
  pauseGame,
  children,
  isPaused,
}: footerProps): JSX.Element {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={reloadGame}>
        <Text style={{ color: "white" }}>Reload</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={pauseGame}>
        <Text style={{ color: "white" }}>Play/Pause</Text>
      </TouchableOpacity>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.05,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: Colors.primary,
    borderWidth: 12,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderBottomWidth: 0,
    padding: 15,
    backgroundColor: Colors.background,
  },
});
