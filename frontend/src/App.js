
import {BrowserRouter,Route,Routes}from "react-router-dom"
import 

function App() {
  return (
<BrowserRouter>
  <Routes>
    <Route 
      path='/'
      element={<SignIn/>}
    />
  </Routes>
</BrowserRouter>
  );
}

export default App;
