import Main from "../components/main";
import Sidebar from "../components/Sidebar";

const HomeScreen = () => {
  return (
    <section className="flex flex-row h-screen py-2 px-2">
      <Sidebar />
      <Main />
    </section>
  );
};

export default HomeScreen;
