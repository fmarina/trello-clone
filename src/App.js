import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.scss';
import NavBar from './features/commons/components/NavBar';
import Sidebar from './features/commons/components/Sidebar';
import Board from './features/board';
import BoardDetail from "./features/board/components/BoardDetail";

function App() {
  return (
    <div className="App">
      <Router>
        <header>
          <NavBar />
        </header>
        <Sidebar />

        <Routes>
          <Route exact path="/" element={<Board />} />
          <Route exact path="/:id" element={<BoardDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
