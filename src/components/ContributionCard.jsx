function ContributionCard({ stat }) {
  return (
    <div className="w-[30%] rounded-lg bg-gray-100 shadow-md p-4">
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
