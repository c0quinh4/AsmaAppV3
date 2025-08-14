import { View, Text, StyleSheet } from 'react-native';
export default function Sensores() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Esta é a guia de sensores</Text>
    </View>
  );
}
const styles = StyleSheet.create({ container:{flex:1,alignItems:'center',justifyContent:'center'}, text:{fontSize:18} });
