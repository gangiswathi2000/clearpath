export default function AppealBotPage() {
  return (
    <main className="flex-1 flex flex-col items-center p-8 bg-background">
      <div className="max-w-4xl w-full space-y-8">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-navy">AppealBot</h1>
          <p className="text-lg text-slate-600">
            Upload your denial letter, and let AI draft a formal appeal for you.
          </p>
        </header>

        {/* File Upload UI Shell */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
          <div className="border-2 border-dashed border-slate-300 rounded-xl p-12 flex flex-col items-center justify-center space-y-4 bg-slate-50 transition-colors hover:bg-slate-100 cursor-pointer">
            <svg
              className="w-12 h-12 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <div>
              <p className="text-lg font-medium text-navy">
                Drag & drop your denial letter here
              </p>
              <p className="text-sm text-slate-500">
                Supports PDF, PNG, JPG (Max 10MB)
              </p>
            </div>
            <button className="mt-4 bg-navy text-white px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-opacity">
              Browse Files
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
