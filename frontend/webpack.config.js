//module.exports = {
//  devServer: {
//    allowedHosts: 'all',
//  },
//};

import { resolve as _resolve } from 'path';

export const entry = './src/index.tsx';
export const output = {
  path: _resolve(__dirname, 'dist'),
  filename: 'bundle.js'
};
export const resolve = {
  extensions: ['.tsx', '.ts', '.js']
};
export const module = {
  rules: [
    {
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }
  ]
};
export const devServer = {
  allowedHosts: 'all'
};
