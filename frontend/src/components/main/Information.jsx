import information from "../../assets/information.jpeg";

const Information = () => {
  return (
    <div className="bg-gray-50 text-white p-10 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 py-6 text-center">
        Информация об Обществе Дружбы
      </h2>
      <img
        src={information}
        alt="Заявление"
        className="mx-auto border-2 border-gray-400 rounded-lg"
      />
    </div>
  );
};

export default Information;
