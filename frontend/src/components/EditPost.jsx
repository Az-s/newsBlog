import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormField, Loader } from "../components";

const EditPost = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Получаем id новости из URL
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
    author: "",
    image: null,
    currentImage: "", // Храним URL текущего изображения
  });

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://newsblog-hhn3.onrender.com/api/v1/posts/${id}`);
        const data = await response.json();
        setForm({
          title: data.title,
          content: data.content,
          author: data.author,
          image: null, // Сбрасываем значение изображения
          currentImage: data.image || "", // Сохраняем ссылку на изображение
        });
      } catch (error) {
        console.error("Ошибка загрузки поста:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  console.log({id})

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.title && form.content && form.author) {
      setLoading(true);

      try {
        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("content", form.content);
        formData.append("author", form.author);

        if (form.image) {
          formData.append("image", form.image);
        }

        const response = await fetch(`https://newsblog-hhn3.onrender.com/api/v1/posts/${id}`, {
          method: "PUT",
          body: formData,
        });

        if (response.ok) {
          navigate(`/post/${id}`);
        } else {
          console.error("Не удалось обновить новость");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Пожалуйста, заполните все поля!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div className="flex flex-col justify-center w-full">
        <h1 className="font-extrabold text-[#222328] text-[32px]">Редактировать новость</h1>
        <p className="mt-2 text-[#666e75] text-[16px]">
          Обновите информацию о новости.
        </p>
      </div>

      <form className="mt-16 w-full" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Заголовок"
            type="text"
            name="title"
            placeholder="Введите заголовок новости"
            value={form.title}
            handleChange={handleChange}
          />
          <FormField
            labelName="Содержание"
            type="textarea"
            name="content"
            placeholder="Введите содержание новости"
            value={form.content}
            handleChange={handleChange}
          />
          <FormField
            labelName="Автор"
            type="text"
            name="author"
            placeholder="Ваше имя"
            value={form.author}
            handleChange={handleChange}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700">Изображение</label>
            {form.currentImage && (
              <div className="mb-2">
                <img
                  src={form.currentImage}
                  alt="Текущее изображение"
                  className="w-full max-w-[300px] rounded-lg"
                />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-10">
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? "Сохраняется..." : "Сохранить изменения"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditPost;
