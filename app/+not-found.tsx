import { Link, Stack } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Página não encontrada' }} />
      <View style={styles.container}>
        <Text style={styles.title}>404</Text>
        <Text style={styles.msg}>Tela não encontrada.</Text>
        <Link href="/painel" style={styles.link}>Ir para o Painel</Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, alignItems:'center', justifyContent:'center', padding:24 },
  title:{ fontSize:32, fontWeight:'600', marginBottom:8 },
  msg:{ fontSize:16, marginBottom:16 },
  link:{ fontSize:16, textDecorationLine:'underline' }
});