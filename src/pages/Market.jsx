import Navigation from "../components/Navigation";

function Market() {
  return (
    <div className="flex h-screen">
      <Navigation />
      <div className="flex flex-col gap-4 p-4">
        <h1>Markets</h1>
        <p>This is the Markets page.</p>
      </div>
    </div>
  );
}

export default Market;
