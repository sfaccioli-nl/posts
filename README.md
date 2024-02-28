# Temper challenge

## Project overview

This Vue 3 and Pinia project is an interactive web application that demonstrates advanced state management through a post manipulation interface. Users can reorder the first 5 posts fetched from JSONPlaceholder, with actions reflected in a dynamic "List of Actions Committed". It features intuitive UI controls for post reordering and a unique "Time Travel" function that allows users to revert changes, showcasing real-time state updates and user interaction tracking.

## Technologies Used

- Vue 3: The core framework, offering an approachable, performant, and versatile structure for building the user interface.

- Pinia: The official state management solution for Vue 3, providing an intuitive and modular store with excellent TypeScript support.

- TypeScript: A superset of JavaScript that adds static type definitions, enhancing code quality and maintainability through type safety.

- Tailwind CSS: A utility-first CSS framework for rapidly building custom designs without having to leave your HTML.

- Vite: A modern frontend build tool that significantly improves the development experience with fast cold starts and hot module replacement (HMR).

- Vitest: A Vite-native unit testing framework, offering a blazing-fast testing environment with built-in support for Vue components and TypeScript.

## Architectural Decisions

### State Management with Pinia

Despite the relatively small scale of this application, Pinia was selected for state management to leverage its straightforward and flexible API, excellent integration with Vue 3, and out-of-the-box TypeScript support. This choice was driven by several key considerations:

- Future Scalability: Pinia's scalable architecture easily accommodates growth, making it a prudent choice for potential future expansions.

- Developer Experience: Its cohesive integration with Vue 3's Composition API and modular state management approach enhances code maintainability and readability.

- TypeScript Compatibility: Offers type safety and autocompletion, improving development speed and reducing errors.

- Testing and Debugging: Simplifies these processes with Vue DevTools integration and a straightforward structure for unit testing.

### Snapshot approach for Time Travel implementation

Initially, the "Time Travel" feature was implemented using a loop to revert actions one by one. This approach is not memory-intensive but can become time-consuming as the list of actions grows, due to the linear time complexity involved in processing each action sequentially.

To optimize performance, a snapshot approach was adopted. This method involves storing a snapshot of the state at each action, trading a fixed amount of memory for significantly improved time efficiency. Given the application's requirement to only display five posts, the memory footprint of each snapshot is constant and manageable. This change allows for instant "Time Travel" by accessing the appropriate snapshot directly, making the operation time constant and enhancing the user experience.

## Project setup

### Step by step guide

```
git clone https://github.com/sfaccioli-nl/posts.git
```

```
cd posts
```

```
npm install
```

```
npm run serve
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Run the tests

```
npm run test
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
