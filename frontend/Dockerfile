FROM node:18-alpine AS build_image

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build


# multi stage build , one in npm, and then we are using the dist
# it also won't expose any of the code in teh container 
# as we only copy the build output from first stage hehe

FROM node:18-alpine

WORKDIR /app


# copying the dist, that is pehla stage's output bruh 
# got to know that they name stages too, woohooo
COPY --from=build_image /app/dist/ /app/dist/


COPY package*.json .

COPY vite.config.js .

RUN npm install vite

EXPOSE 5173

CMD [ "npm", "run", "preview" ]



