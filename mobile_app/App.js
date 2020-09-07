import React from 'react';
import Main from './src/components/Main';
import { ViroARSceneNavigator } from 'react-viro';
const App = () => {
  return <ViroARSceneNavigator initialScene={{ scene: Main }} />;
};

export default App;
