import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ViewPost from "./components/Viewpost";
import EditPost from "./components/EditPost";
import CreatePost from "./pages/createPost";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      {/* <header className="w-full flex justify-between shadow-md items-center bg-gray-100 sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4] ">
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link>
        <Link
          to="/create-post"
          className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
        >
          Создать
        </Link>
      </header> */}
      <Navbar />
      <main className="sm:p-8 px-4 py-8 w-full bg=[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/post/:id" element={<ViewPost />} />
          <Route path="/edit-post/:id" element={<EditPost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
