module.exports = {
  presets: ['module:metro-react-native-babel-preset'],

  plugins: [
    [
      'babel-plugin-root-import',
      {
        paths: [
          {
            rootPathPrefix: '_',
            rootPathSuffix: 'src',
          },
          {
            rootPathPrefix: '_screens',
            rootPathSuffix: 'src/screens/index',
          },
          {
            rootPathPrefix: '_components',
            rootPathSuffix: 'src/components',
          },
          {
            rootPathPrefix: '_MyAccount',
            rootPathSuffix: 'src/screens/Main/MyAccount',
          },
        ],
      },
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: 'react-native-dotenv',
        path: '.env',
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: true,
      },
    ],
  ],
};
