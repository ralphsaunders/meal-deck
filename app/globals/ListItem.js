import { Text, View, StyleSheet } from "react-native";

export default function ListItem({ item }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{item}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
  },
  title: {
    fontSize: 24,
  },
});
