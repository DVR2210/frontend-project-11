import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default { // опции конфигурации 

  entry: './src/index.js',//  прописываем абаслютный путь к папке где лежит индексный файл

  output: { 
    path: path.join(__dirname, "dist"), 
    filename: "main.js"
  }, 
  
  module: { // это подключаем модуль
    rules: [ // правила в квадратных скобках 
       {
          test: /\.css$/, // говрим что все файлы котоыре заканчиваються на сиэсес
          use: [
               "style-loader",
               "css-loader",  // сначало это 
               "sass-loader" // потом это 
          ]
       },

       {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
      },
      
    ]
  }

};