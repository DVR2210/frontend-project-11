import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {

  entry: './src/index.js',

  output: { 
    path: path.join(__dirname, "dist"), 
    filename: "main.js"
  }, 
  
  module: { 
    rules: [ 
       {
          test: /\.css$/, 
          use: ["style-loader", "css-loader","sass-loader"]
       },

       {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
      },
      
    ]
  }

};