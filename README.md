This is a [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Objective
- To create a project using React native.
- With two modules such as Authentication and Employee 
- In Authentication module, there will be a Login Component that has two input field, Username and Password. (Form Validation (Mandatory))
- In the employee module, there will be an employee list and add new employee, edit
employee functionalities.
- In add to new employee, there will be three tabs where
- - First tab contains employee basic information like First Name (required), Last Name,
Date of Birth (required, maximum date previous day), Phone (required, value must
be [0-9], minimum and maximum 11 char), Gender (required)
- - Second tab contains employee skill information like Skill Name (required),
Experience in Years (required), Skill Level (Beginner, Intermediate, Advanced)
(required)
- - Third tab contains preview of employee basic information and skill
- Useing Redux and RTK query for state management in overall
application.
- UseingReact native base elements for UI.


# Run Instructions

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.
