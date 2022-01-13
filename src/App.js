import {useEffect} from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from './Components/Login';
import Register from './Components/Register';
import Todo from './Components/Todo';

function App() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if(token){
      navigate("/Todo");
    }else{
      navigate("/");
    }

    return () => {
      
    }
  }, [])

  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Todo" element={<Todo />} />
      </Routes>
  );
}

export default App;
