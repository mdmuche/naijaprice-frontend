import Navigation from "../components/Navigation";

function Profile() {
  return (
    <div className="flex h-screen">
      <Navigation />
      <div className="flex flex-col gap-4 p-4">
        <h1>Profile</h1>
        <p>This is the Profile page.</p>
      </div>
    </div>
  );
}

export default Profile;
