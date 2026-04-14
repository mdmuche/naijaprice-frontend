function AboutView() {
  return (
    <div className="text-center space-y-4">
      <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center text-white text-2xl font-black">
        <img src="./images/logo.svg" alt="logo" />
      </div>
      <div>
        <h3 className="font-bold text-lg">NaijaPrice</h3>
        <p className="text-sm text-gray-500 px-4">
          The most reliable real-time commodity price tracker in Nigeria.
          Helping traders and consumers make better decisions.
        </p>
      </div>
      <div className="pt-4 space-y-2">
        <button className="w-full py-3 text-sm font-semibold text-gray-700 bg-gray-50 rounded-xl">
          Terms of Service
        </button>
        <button className="w-full py-3 text-sm font-semibold text-gray-700 bg-gray-50 rounded-xl">
          Privacy Policy
        </button>
      </div>
    </div>
  );
}
export default AboutView;
