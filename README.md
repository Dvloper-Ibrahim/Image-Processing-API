# Image Proceessing API Project (Missions Recap)

## My Scripts as follows :-
1. For Prettier script : run in terminal the command
```
npm run pret
```
2. For eslint script : run in terminal the command
```
npm run lint
```
3. For build script : run in terminal the command
```
npm run build
```
4. For jasmine script : run in terminal the command
```
npm run jasmine
```
5. For building & testing script : run in terminal the command
```
npm run test
```
6. For formatting & starting the server script : run in terminal the command
```
npm run start
```

## Accessing to endpoint for testing :-
You can do that by accessing "/api/images" throught the route :
(http://localhost:3000/api/images?imagename=fjord.jpg&width=400&height=300)

as well as this link will appear as a "src" attribute for the 'img'
element in the page body.


## What I used for resizing images :-
1. The sharp module was used
2. You can install it in your project by running
```
npm i sharp && npm i --save-dev @types/sharp
```
3. it takes 3 pieces of information :
  - the source image path
  - the width & height
  - as well as the new path of the resied image
4. I intialized sharp in a separate module and imported it to my project
  so that I can use directly.

And it will do its work.


## Presented by :-

- *Ibrahim Ahmed*
