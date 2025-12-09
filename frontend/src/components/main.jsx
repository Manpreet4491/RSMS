import FilterSection from "./main/FilterSection";
import Header from "./main/Header";
import StatSection from "./main/StatSection";
import Table from "./main/Table";

const Main = () => {
  return (
    <div className="flex-1 flex flex-col bg-whiteBG px-4 gap-4">
      {/* Header */}
      <Header />
      {/* Filters */}
      <FilterSection />
      {/* Stat Containers */}
      <StatSection />
      {/* Table */}
      <Table />
    </div>
  );
};

export default Main;
