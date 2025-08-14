module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'expo-router/babel',
      // ...outros plugins...
      'react-native-reanimated/plugin', // MANTER POR ÚLTIMO
    ],
  };
};