import { Check } from "lucide-react";
import { useState } from "react";

function LanguagesView() {
  const [selectedLang, setSelectedLang] = useState("en");

  const languages = [
    { id: "en", name: "English", sub: "Standard (UK/US)", flag: "🇳🇬" },
    { id: "pg", name: "Pidgin", sub: "Local Slang & Dialect", flag: "🇳🇬" },
    { id: "yo", name: "Yoruba", sub: "Èdè Yorùbá", flag: "🇳🇬" },
    { id: "ha", name: "Hausa", sub: "Harshen Hausa", flag: "🇳🇬" },
    { id: "ig", name: "Igbo", sub: "Asụsụ Igbo", flag: "🇳🇬" },
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="mb-2">
        <p className="text-xs font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest">
          Select Application Language
        </p>
      </div>

      <div className="grid gap-3">
        {languages.map((lang) => (
          <button
            key={lang.id}
            onClick={() => setSelectedLang(lang.id)}
            className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-200 ${
              selectedLang === lang.id
                ? "border-[#00C950] bg-[#00C950]/5 dark:bg-[#00C950]/10 shadow-sm"
                : "border-gray-100 dark:border-zinc-800 hover:border-gray-200 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900/50"
            }`}
          >
            <div className="flex items-center gap-4 text-start">
              <span className="text-2xl">{lang.flag}</span>
              <div>
                <p
                  className={`font-bold text-sm ${
                    selectedLang === lang.id
                      ? "text-[#00C950]"
                      : "text-gray-900 dark:text-zinc-100" // Added dark mode text
                  }`}
                >
                  {lang.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-zinc-400 font-medium">
                  {lang.sub}
                </p>
              </div>
            </div>

            {selectedLang === lang.id && (
              <div className="bg-[#00C950] p-1 rounded-full text-white">
                <Check size={14} strokeWidth={3} />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Info Box - Fully themed for Light/Dark */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/30">
        <p className="text-[11px] text-blue-600 dark:text-blue-400 font-medium leading-relaxed">
          Note: Selecting a local language will only translate the interface.
          Commodity names and market data will remain in English to ensure
          accuracy across all regions.
        </p>
      </div>
    </div>
  );
}

export default LanguagesView;
