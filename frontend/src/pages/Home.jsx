import { useState, useEffect } from "react";
import { Loader, FormField } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const RenderCards = ({ data, title, onDelete }) => {
  if (data?.length > 0) {
    return data.map((post) => (
      <div
        key={post._id}
        className="border rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
        onClick={() => (window.location.href = `/post/${post._id}`)}
      >
        {/* Заголовок */}
        <div className="p-4 border-b">
          <h3 className="font-bold text-lg text-gray-800">{post.title}</h3>
        </div>

        {/* Изображение */}
        <div className="p-4">
          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-40 object-cover rounded-md"
            />
          )}
        </div>

        {/* Автор и кнопка "Редактировать" */}
        <div className="p-4 flex justify-between items-center border-t">
          <span className="text-sm text-gray-600">Автор: {post.author}</span>
          <Link
            to={`/edit-post/${post._id}`}
            className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
            onClick={(e) => e.stopPropagation()} 
          >
            <CiEdit />
          </Link>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(post._id); }}
            className="font-inter font-medium bg-red-500 text-white px-4 py-2 rounded-md"
          >
            <MdDelete />
          </button>
        </div>
      </div>
    ));
  }

  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const [textSearch, setTextSearch] = useState("");
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeOut, setSearchTimeOut] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://newsblog-hhn3.onrender.com/api/v1/posts"
        );
        const data = await response.json();
        setAllPosts(data);
      } catch (error) {
        console.error("Ошибка загрузки постов:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeOut);
    setTextSearch(e.target.value);

    setSearchTimeOut(
      setTimeout(() => {
        const searchResults = allPosts.filter(
          (item) =>
            item.title.toLowerCase().includes(textSearch.toLowerCase()) ||
            item.author.toLowerCase().includes(textSearch.toLowerCase())
        );
        setSearchedResults(searchResults);
      }, 500)
    );
  };

  const handleDelete = async (id) => {
    if (window.confirm("Вы уверены, что хотите удалить эту новость?")) {
      try {
        const response = await fetch(
          `https://newsblog-hhn3.onrender.com/api/v1/posts/${id}`,
          {
            method: "DELETE",
          }
        );
  
        if (response.ok) {
          // setAllPosts(allPosts.filter((post) => post._id !== id));
          setAllPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
          navigate(`/`); 
        } else {
          console.error("Ошибка удаления новости");
        }
      } catch (error) {
        console.error("Ошибка при удалении:", error);
      }
    }
  };
  

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          Кыргызстан-Кытай Достук Коому
        </h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
          Коомдук Бирикмеси
        </p>
      </div>
      <div className="mt-16">
        <FormField
          labelName="Поиск новостей"
          type="text"
          name="textSearch"
          placeholder="Введите текст для поиска"
          value={textSearch}
          handleChange={handleSearchChange}
        />
      </div>
      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {textSearch && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Результаты поиска для{" "}
                <span className="text-[#222328]">"{textSearch}"</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {textSearch ? (
                <RenderCards
                  data={searchedResults}
                  title="Результаты не найдены"
                  onDelete={handleDelete}
                />
              ) : (
                <RenderCards data={allPosts} title="Нет новостей" onDelete={handleDelete} />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
