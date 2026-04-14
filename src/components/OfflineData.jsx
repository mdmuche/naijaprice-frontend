function OfflineDataView() {
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-2xl flex items-center justify-between">
        <div>
          <p className="text-sm font-bold">Stored Data</p>
          <p className="text-xs text-gray-500">
            2.4 MB used for offline browsing
          </p>
        </div>
        <button className="text-xs font-bold text-red-500 hover:underline">
          Clear Cache
        </button>
      </div>
      <div className="space-y-3">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          Auto-Download
        </p>
        <div className="flex gap-2">
          <button className="flex-1 py-3 border-2 border-[#00C950] bg-green-50 text-[#00C950] rounded-xl text-xs font-bold">
            WiFi Only
          </button>
          <button className="flex-1 py-3 border-2 border-gray-100 text-gray-400 rounded-xl text-xs font-bold">
            Always
          </button>
        </div>
      </div>
    </div>
  );
}
export default OfflineDataView;
