import { View, Text, StyleSheet } from 'react-native';
export default function AssistenteIA() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Esta é a guia do assistente IA</Text>
    </View>
  );
}
const styles = StyleSheet.create({ container:{flex:1,alignItems:'center',justifyContent:'center'}, text:{fontSize:18} });
