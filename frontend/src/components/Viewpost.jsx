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
<div className="max-w-6xl mx-auto py-8">
  {/* Кнопка назад */}
  <button
    onClick={() => navigate(-1)}
    className="text-blue-500 mb-6 font-medium hover:underline"
  >
    ← Назад
  </button>

  {/* Карточка новости */}
  <div className="border rounded-lg shadow-md overflow-hidden">
    {/* Изображение */}
    <div className="w-full">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-64 object-cover"
      />
    </div>

    {/* Тело карточки */}
    <div className="p-6">
      {/* Заголовок */}
      <h1 className="text-2xl font-bold text-gray-900">{post.title}</h1>

      {/* Текст */}
      <p className="mt-4 text-gray-700 text-lg leading-relaxed">
        {post.content}
      </p>

      {/* Автор */}
      <div className="mt-6 border-t pt-4">
        <p className="text-gray-500 text-sm">Автор: {post.author}</p>
      </div>
    </div>
  </div>
</div>

  );
};

export default ViewPost;
