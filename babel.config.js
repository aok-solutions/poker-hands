module.exports = function (api) {
  api.cache(true)
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          extensions: [".js", ".jsx", ".json", ".ts", ".tsx", ".png"],
        }
      ],
      "react-native-reanimated/plugin"
    ]
  }
}
