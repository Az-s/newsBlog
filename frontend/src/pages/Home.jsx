import { useState, useEffect } from "react";
import { Card, Loader, FormField } from "../components";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }

  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const [textSearch, setTextSearch] = useState("");
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeOut, setSearchTimeOut] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/v1/posts");
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
                />
              ) : (
                <RenderCards data={allPosts} title="Нет новостей" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;