function ContributionCard({ stat, center }) {
  return (
    <div
      className={`w-[48%] p-2 rounded-lg bg-gray-100 shadow-md sm:w-[30%] sm:p-4 ${center === true ? "mx-auto" : "mx-0"}`}
    >
      <p className="text-xl font-bold text-center text-[#00C950]">
        {stat.value}
      </p>
      <h3 className="text-[14px] font-semibold text-center text-gray-600">
        {stat.title}
      </h3>
    </div>
  );
}

export default ContributionCard;
