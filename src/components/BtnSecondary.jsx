function BtnSecondary({ icon, text }) {
  return (
    <button className="flex items-center gap-2 text-gray-700 font-bold text-[16px] cursor-pointer shadow-sm border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100">
      {icon}
      {text}
    </button>
  );
}

export default BtnSecondary;
