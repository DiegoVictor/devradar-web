# [Web] DevRadar
[![AppVeyor](https://img.shields.io/appveyor/build/diegovictor/devradar-web?logo=appveyor&style=flat-square)](https://ci.appveyor.com/project/DiegoVictor/devradar-web)
[![react](https://img.shields.io/badge/reactjs-18.2.0-61dafb?style=flat-square&logo=react)](https://reactjs.org/)
[![styled-components](https://img.shields.io/badge/styled_components-6.0.7-db7b86?style=flat-square&logo=styled-components)](https://styled-components.com/)
[![eslint](https://img.shields.io/badge/eslint-8.46.0-4b32c3?style=flat-square&logo=eslint)](https://eslint.org/)
[![airbnb-style](https://flat.badgen.net/badge/style-guide/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)
[![jest](https://img.shields.io/badge/jest-29.6.2-brightgreen?style=flat-square&logo=jest)](https://jestjs.io/)
[![coverage](https://img.shields.io/codecov/c/gh/DiegoVictor/devradar-web?logo=codecov&style=flat-square)](https://codecov.io/gh/DiegoVictor/devradar-web)
[![MIT License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](https://raw.githubusercontent.com/DiegoVictor/devradar-web/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

This web version allows users to register yourself, look for another users by technologies and see their GitHub profile information. All the resources used by this application comes from its [`API`](https://github.com/DiegoVictor/devradar-api).

## Table of Contents
* [Screenshots](#screenshots)
* [Installing](#installing)
  * [Configuring](#configuring)
    * [.env](#env)
    * [API](#api)
* [Usage](#usage)
  * [localStorage](#localstorage)
* [Running the tests](#running-the-tests)
  * [Coverage Report](#coverage-report)

# Screenshots
Click to expand.<br>
<img src="https://raw.githubusercontent.com/DiegoVictor/devradar-web/main/screenshots/animation.gif" width="98.4%"/>
<img src="https://raw.githubusercontent.com/DiegoVictor/devradar-web/main/screenshots/search.png" width="49%"/>
<img src="https://raw.githubusercontent.com/DiegoVictor/devradar-web/main/screenshots/signup.png" width="49%"/>
<img src="https://raw.githubusercontent.com/DiegoVictor/devradar-web/main/screenshots/processing.png" width="49%"/>
<img src="https://raw.githubusercontent.com/DiegoVictor/devradar-web/main/screenshots/signed.png" width="49%"/>
<img src="https://raw.githubusercontent.com/DiegoVictor/devradar-web/main/screenshots/search-signed.png" width="49%"/>
<img src="https://raw.githubusercontent.com/DiegoVictor/devradar-web/main/screenshots/edit.png" width="49%"/>

# Installing
Easy peasy lemon squeezy:
```
$ yarn
```
Or:
```
$ npm install
```
> Was installed and configured the [`eslint`](https://eslint.org/) and [`prettier`](https://prettier.io/) to keep the code clean and patterned.

## Configuring
Configure your environment variables and remember to start the [API](https://github.com/DiegoVictor/devradar-api) before to start this app.

### .env
In this file you may configure the API's url. Rename the `.env.example` in the root directory to `.env` then just update with your settings.

key|description|default
---|---|---
REACT_APP_URL|Utilized to created the redirect url to GitHub OAuth process|`http://localhost:3000`
REACT_APP_API_URL|API's url with version (v1)|`http://localhost:3333/v1`
REACT_APP_SOCKET_URL|API's socket url|`http://localhost:3333`
REACT_APP_MAP_LAT and REACT_APP_MAP_LNG|Where the map will center by default| -
REACT_APP_GOOGLEMAP_API_KEY|API Key to allow Google Maps to be rendered (See [Get an API Key](https://developers.google.com/maps/documentation/javascript/get-api-key))| -
REACT_APP_GITHUB_CLIENT_ID|GitHub App Client ID (the same utilized in the [API](https://github.com/DiegoVictor/devradar-api))| -

### API
Start the [API](https://github.com/DiegoVictor/devradar-api) (see its README for more information). In case of any change in the API's `port` or `host` remember to update the [`.env`](#env) too.

# Usage
To start the app run:
```
$ yarn start
```
Or:
```
npm run start
```

## localStorage
The project saves user's data and token into a [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) key: `devradar`. Before use this data you need parse the data to a JavaScript object with [`JSON.parse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) function. Below you can see fictitious data:
```json
{
  "_id": "60062bebde7800844cc23a26",
  "avatar_url": "https://avatars3.githubusercontent.com/u/15165349?v=4",
  "techs": "Node.js, React, ReactNative",
  "latitude": -22.424944399999973,
  "longitude": -46.979399400000005,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMDYyYmViZGU3ODAwODQ0Y2MyM2EyNiIsImlhdCI6MTYxMTAxODc4NywiZXhwIjoxNjExNjIzNTg3fQ.Ut25eM4tyFvBkhFf_Ox9qLhjLsKSyEjNYAKiReF-eBU"
}
```

# Running the tests
[Jest](https://jestjs.io) was the choice to test the app, to run:
```
$ yarn test
```
Or:
```
$ npm run test
```

## Coverage report
You can see the coverage report inside `tests/coverage`. They are automatically created after the tests run.
