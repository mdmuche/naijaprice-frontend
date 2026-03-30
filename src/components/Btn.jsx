function Btn({ btnText }) {
  return (
    <div className="flex items-center justify-center">
      <button className="text-[#00C950] font-bold text-[16px] cursor-pointer">
        {btnText}
      </button>
    </div>
  );
}

export default Btn;
