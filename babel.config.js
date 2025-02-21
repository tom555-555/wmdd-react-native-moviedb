module.exports = (api) => {
  api.cache(false);
  return {
    presets: [["babel-preset-expo", { jsxImportSource: "nativewind" }], "nativewind/babel"],
    plugins: [["module:react-native-dotenv"]],
  };
};
