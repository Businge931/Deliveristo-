FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install   
COPY . . 
<<<<<<< HEAD
CMD ["npm","run","start"]  
=======
CMD ["npm","run","dev"]  
>>>>>>> 03c7018c1ee756ec492c5a9ce65f2f454f614b26
