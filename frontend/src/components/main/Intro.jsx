import application from "../../assets/application.jpeg";

const Intro = () => {
  return (
    <div id="section4" className="bg-gray-50 text-white p-10 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 py-6 text-center">
        Заявление о вступлении в Общество Дружбы
      </h2>
      <img
        src={application}
        alt="Заявление"
        className="mx-auto border-2 border-gray-400 rounded-lg"
      />
    </div>
  );
};

export default Intro;
