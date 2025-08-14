import { View, Text, StyleSheet } from 'react-native';
export default function Configuracoes() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Esta é a guia de configurações</Text>
    </View>
  );
}
const styles = StyleSheet.create({ container:{flex:1,alignItems:'center',justifyContent:'center'}, text:{fontSize:18} });
