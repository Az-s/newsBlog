import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ViewPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`https://newsblog-hhn3.onrender.com/api/v1/posts/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data);
        } else {
          console.error("Ошибка при загрузке новости");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) return <p>Загрузка...</p>;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Кнопка назад */}
      <button
        onClick={() => navigate(-1)}
        className="text-blue-500 mb-6 font-medium hover:underline ml-8 mt-4 text-left"
      >
        ← Назад
      </button>

      {/* Карточка новости */}
      <div className="flex-grow bg-gray-50 py-8 lg:px-6">
        <div className="w-full mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          {/* Изображение на весь верхний блок */}
          <div className="w-full h-[40vh] md:h-[50vh] lg:h-[60vh] rounded-lg">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover border-b border-gray-300"
            />
          </div>
          {/* Тело карточки */}
          <div className="p-6">
            {/* Заголовок */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>

            {/* Текст */}
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              {post.content}
            </p>

            {/* Автор */}
            <div className="border-t pt-4">
              <p className="text-gray-500 text-sm">Автор: {post.author}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPost;

