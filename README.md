# 📍Trip Tracker 🚐

A single page dashboard that simulates a shared trip experience and displays some stats about the trip when it completes.

## Table of Contents

- [📍Trip Tracker 🚐](#%f0%9f%93%8dtrip-tracker-%f0%9f%9a%90)
  - [Table of Contents](#table-of-contents)
  - [Deployment](#deployment)
  - [Preview](#preview)
  - [Libraries & Tools Used](#libraries--tools-used)
    - [Core](#core)
    - [State Management](#state-management)
    - [Immutability](#immutability)
    - [Styling](#styling)
    - [Charts](#charts)
    - [Maps](#maps)
    - [Testing](#testing)
    - [Tooling](#tooling)
  - [Features](#features)
    - [User Can](#user-can)
    - [Other Features](#other-features)
  - [Future Improvements](#future-improvements)
  - [Running locally](#running-locally)

## Deployment

https://swvltaskrm.netlify.com/

## Preview

![mobile dark](/readme/mobile-dark.jpg)
![mobile light](/readme/mobile-light.jpg)

![desktop dark](/readme/desktop-dark.jpg)
![desktop light](/readme/desktop-light.jpg)

![reset](/readme/reset.jpg)

![trip progress](/readme/trip-progress.jpg)
![stats2](/readme/stats2.jpg)
![stats](/readme/stats.jpg)

## Libraries & Tools Used

### Core

1. [react](https://reactjs.org/)

### State Management

1. [redux](https://redux-saga.js.org/)
2. [redux-saga](https://redux-saga.js.org/)
3. [redux-persist](https://github.com/rt2zz/redux-persist/)

### Immutability

1. [immer](https://immerjs.github.io/immer/docs/introduction/)

### Styling

1. [emotion](https://emotion.sh/docs/introduction/)
2. [xstyled](https://xstyled.dev/)
3. [polished](https://polished.js.org/)

### Charts

1. [nivo](https://nivo.rocks/)

### Maps

1. [mapbox](https://www.mapbox.com/)

### Testing

1. [jest](https://jestjs.io/en/)
2. [jest-emotion](https://emotion.sh/docs/jest-emotion/)
3. [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/)
4. [react-test-renderer](https://reactjs.org/docs/test-renderer.html)

### Tooling

1. [create-react-app](https://create-react-app.dev/)
2. [prettier](https://prettier.io/)
3. [eslint](https://eslint.org/)
4. [webpack](https://webpack.js.org/)

## Features

### User Can

1. View trip route on map with station points and vehicle location highlighted
2. View trip information with driver name and vehicle information
3. Add booking with specified pickup and drop-off station and payment method with some error prevention measures in place to prevent selecting invalid pickup/drop-off stations
4. View number of add bookings
5. View added bookings information
6. Start the trip to begin the simulation and view the vehicle location updates on the map
7. View current or next station name in trip information
8. View booking status update as the trip is running
9. View 3 charts that summarizes some of the trip stats

### Other Features

1. Responsive design to fit different screen sizes and orientations
2. User/driver names and avatars are loaded randomly
3. Switch page color mode between dark and light mode
4. Trip state is persisted across refreshes and revisits; the trip carries one from where it was left
5. Upon completing a trip, a **Reset** button allows the user to start fresh

Note: If there's a need to clear the set data mid-trip (before it ends) the site data should be cleared from the browser.

## Future Improvements

1. Enhance select boxes styling
2. Add reset button at all times; not just after the trip ends
3. Customize fav icon
4. Add icons to trip info items in place of placeholders

## Running locally

Run:

```
yarn
yarn start
```

To run tests:

```
yarn test
```
