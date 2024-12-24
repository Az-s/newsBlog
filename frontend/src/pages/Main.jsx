import Carousel from "../components/main/Carousel";
import Goals from "../components/main/Goals";
import History from "../components/main/History";
import Information from "../components/main/Information";
import Intro from "../components/main/Intro";
import Mission from "../components/main/Mission";

const Main = () => {
  return (
    <main  className="container mx-auto space-y-6">
      <Carousel />
      <Information />
      <History />
      <Intro />
      <Mission />
      <Goals />
    </main>
  );
};

export default Main;
