# Zainar test APP

This is the solution to the problem of Real-Time Dashboard with Advanced Features

## How to run the app

steps:
- clone the repo
- cd `zainar-test`
- run the command `npm install` to install all the dependencies
- run the command `npm run dev` to start the app

create the `.env` whit the next values

```js
  VITE_API_URL=https://jsonplaceholder.typicode.com/posts
  VITE_SOCKET_URL=wss://ws.postman-echo.com/raw
```

## Design process

To create this application, use the atomic design methodology to create design systems in react, why use this design? in react we have more than one way to create the folder architecture within an app, atomic design allows us to maintain a standardized structure and giving importance to the component hierarchy, that is, we can have from a button, to the container of that button, to the template from where that container will be used, as well as the page where that template will be used, all in an orderly manner following the same folder pattern and thus avoiding the inclusion of a new form of design and maintaining a methodology when working as a team.

## Libraries
- react
- vite
- redux
- tailwind

## Why this libraries?

### React

I chose React as a library to work on the FE because React has one of the best documentation and has a large number of libraries that allow you to adapt your app in a better way. I also personally consider React to be one of the best libraries to work on the UI because it has a very fast way of rendering components and has a clean and understandable methodology when creating web apps.

### Vite

Fast development: By combining React and Vite, you get a fast development environment that allows you to instantly visualize changes in the browser. This is especially useful during iterative development, as it eliminates the wait time between making a code change and seeing the result.

Better performance: Vite optimizes code compilation and execution, which can result in a better end-user experience due to faster loading times and lower resource usage.

TypeScript support: Both React and Vite have native TypeScript support. This is beneficial if you prefer to use TypeScript to add static typing to your code, which can help catch bugs earlier and improve code maintainability.

### Redux

Even though this test is not a large application, I consider Redux to be a more important state management library in terms of scalability and high performance, because it allows you to control and share states clearly and cleanly if you configure the store very well, it can make an application easier to share states between components. Also, in my opinion, Redux is an important tool for debugging, as it allows you to observe changes within the state tree. If you work with large applications, I consider Redux to be a library that easily adapts when dealing with large amounts of data.

### Tailwind

Tailwind, in my personal opinion, is one of the best libraries for working with CSS in a more personalized way and supported by the classes that exist within it. If you work with an application that requires the use of a default theme, Tailwind fits perfectly since it has a very clean and simple configuration that allows you to work correctly and with great documentation. Also consider that the use of classes within the components allows greater freedom when creating a custom component, since many times the designs you want to apply that need some validation can be better done with Tailwind since the event handling and responsiveness are implicit within the library.

## App Flow

I created this app based on the Twitter stream (now X) with the test tools I realized that I could make a real-time app just using the POST returned by the API and the POSTMAN socket to be able to create a WebSocket for sending messages and adapt those messages to what was created

The app consists of first listing all the POST returned by the API, I create a list of all the posts ordering them by ID and then in the Header of the app I have a link where if the user presses it a modal will open which requests two data the title and the body of the post once entered and sent to the WebSocket this information will be shown in an alert where it tells us that a new Post arrived in this part the twitter method is used where once a new POST arrives the user is notified so that he can see them, the app works in the same way and when seeing the notification the new posts are listed according to their arrival time to the APP or the order of the ID to be more exact

## Possible improvements

If we work with a larger scale app, one of the strategies that I would use for better performance is to use a library to show the list as an infinite scroll or a pagination so at the time of the first data load it would not get all the data but only a few and every time the user goes down it would show the oldest data, another would be the way in which the webSocket works for this example the session is maintained in the browser tab for a socket from the BE we would have to better manage the way it responds, that is, we could leave a message limit to start showing like 10 posts and show an alert and thus not show one by one to have a better optimization of the app

