import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormField, Loader } from "../components";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    content: "",
    author: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.title && form.content && form.author && form.image) {
      setLoading(true);

      try {
        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("content", form.content);
        formData.append("author", form.author);
        formData.append("image", form.image);

        const response = await fetch("http://localhost:8080/api/v1/news", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          navigate("/");
        } else {
          console.error("Failed to create news post");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please fill out all fields and upload an image!");
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
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Создать новость</h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
          Создайте новую запись, чтобы поделиться ею с другими.
        </p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
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
            {loading ? "Сохраняется..." : "Сохранить"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;