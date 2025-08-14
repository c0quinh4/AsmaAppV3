import { View, Text, StyleSheet } from 'react-native';
export default function Insights() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Esta é a guia de insights</Text>
    </View>
  );
}
const styles = StyleSheet.create({ container:{flex:1,alignItems:'center',justifyContent:'center'}, text:{fontSize:18} });
