import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Main from "./pages/Main";
import Home from "./pages/Home";
import ViewPost from "./components/Viewpost";
import EditPost from "./components/EditPost";
import CreatePost from "./pages/createPost";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="sm:p-8 px-4 py-8 w-full bg=[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/press/news" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/post/:id" element={<ViewPost />} />
          <Route path="/edit-post/:id" element={<EditPost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
