import Navigation from "../components/Navigation";

function Home() {
  return (
    <div className="flex h-screen">
      <Navigation />
      <div className="flex flex-col gap-4 p-4">
        <h1>Home</h1>
        <p>This is the Home page.</p>
      </div>
    </div>
  );
}

export default Home;
