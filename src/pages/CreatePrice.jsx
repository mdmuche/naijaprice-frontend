import Navigation from "../components/Navigation";

function CreatePrice() {
  return (
    <div className="flex h-screen">
      <Navigation />
      <div className="flex flex-col gap-4 p-4">
        <h1>Create Price</h1>
        <p>This is the Create Price page.</p>
      </div>
    </div>
  );
}

export default CreatePrice;
