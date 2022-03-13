import './App.css';
import RouterComponent from './Router/Routes';
// import instance from './Utils/Api/config';
// import { FlawLessUI } from 'flawless-ui'

function App() {
  return (
    // <FlawLessUI axiosInstance={instance}>

      <div className="App">
        <RouterComponent />
      </div>
    // </FlawLessUI>
  );
}

export default App;
