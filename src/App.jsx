import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Content from './components/Content';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Message from './pages/Message';
import Status from './pages/Status';
import Notification from './pages/Notification';
import Chat from './pages/Chat';


function App() {
  return (
    <BrowserRouter >
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Content />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/:id" element={<Profile />} />
            <Route path="/message" element={<Message />} />
            <Route path="/message/:idUser" element={<Chat />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/:id/status/:twitId" element={<Status />} />
          </Routes>
    </BrowserRouter>
  );
}

export default App;
