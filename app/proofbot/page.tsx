export default function ProofBotPage() {
  return (
    <main className="flex-1 flex flex-col items-center p-8 bg-background">
      <div className="max-w-4xl w-full space-y-8">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-navy">ProofBot</h1>
          <p className="text-lg text-slate-600">
            Select a program to get an exact document checklist and auto-validate your uploads.
          </p>
        </header>

        {/* Program Selector Dropdown Shell */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-6">
          <div className="flex flex-col space-y-2">
            <label htmlFor="program-select" className="text-sm font-semibold text-navy uppercase tracking-wider">
              Select Assistance Program
            </label>
            <div className="relative">
              <select
                id="program-select"
                className="w-full appearance-none bg-slate-50 border border-slate-300 text-navy py-3 px-4 pr-8 rounded-xl leading-tight focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-colors"
                defaultValue=""
              >
                <option value="" disabled>Choose a program...</option>
                <option value="snap">SNAP (Food Stamps)</option>
                <option value="medicaid">Medicaid</option>
                <option value="section8">Section 8 Housing</option>
                <option value="liheap">LIHEAP (Utility Assistance)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
            <p className="text-sm text-slate-500 mt-2">
              We'll fetch the exact document requirements for the selected program.
            </p>
          </div>
          
          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button className="bg-navy text-white px-8 py-3 rounded-xl font-medium hover:bg-opacity-90 transition-opacity">
              Get Checklist
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
