import StyleLintPlugin from "stylelint-webpack-plugin";
module.exports = {
  plugins: [
    new StyleLintPlugin({
      files: ["**/*.{vue,htm,html,css,sss,less,scss,sass}"],
    }),
  ],
};
