const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/* 웹팩 설정 */
const WEBPACK_SETTING = () => ({
  mode: 'development', // development | production - 개발 모드 설정
  module: {
    rules: [
      {
        test: /\.j(sx|s)?$/, // - babel-loader로 읽을 파일 확장자 정규표현식
        exclude: '/node_modules', // - 제외할 파일 경로
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
            '@babel/preset-typescript',
          ], // babel-loader에서 사용할 옵션
        },
      },
      {
        test: /\.(sc|c)ss$/, // scss나 css인 확장자 파일
        use: [
          'cache-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ], // 위 확장자의 파일을 읽을 loader들
      },
      {
        test: /\.t(sx|s)?$/,
        exclude: '/node_modules',
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },
  devtool: 'eval', // - 소스맵 관련 설정
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  }, // - webpack으로 읽어들일 확장자 목록
  entry: {
    bundle: ['./src/index'],
  }, // - webpack이 읽기 시작할 파일
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  }, // - webpack이 출력하는 파일
  plugins: [
    new CleanWebpackPlugin(), // - 기존 빌드 파일 삭제
    new MiniCssExtractPlugin(), // - CSS를 읽어올 수 있도록 번들
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }), // - webpack이 함께 읽어들일 html 파일
  ],
  devServer: {
    open: true, // dev-server로 실행시 브라우저로 바로 열리도록 하는 설정
  },
});

module.exports = WEBPACK_SETTING;
