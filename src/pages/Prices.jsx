import Navigation from "../components/Navigation";

function Prices() {
  return (
    <div className="flex h-screen">
      <Navigation />
      <div className="flex flex-col gap-4 p-4">
        <h1>Prices</h1>
        <p>This is the Prices page.</p>
      </div>
    </div>
  );
}

export default Prices;
