import Navigation from "../components/Navigation";

function Alerts() {
  return (
    <div className="flex h-screen">
      <Navigation />
      <div className="flex flex-col gap-4 p-4">
        <h1>Alerts</h1>
        <p>This is the Alerts page.</p>
      </div>
    </div>
  );
}

export default Alerts;
