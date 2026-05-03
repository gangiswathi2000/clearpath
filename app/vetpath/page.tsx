export default function VetPathPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-[#0F172A]">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold mb-4 text-[#0F172A]">🎖️ VetPath</h1>
          <p className="text-xl text-gray-600">Navigate your veteran benefits with clarity.</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-4">Service History Intake</h2>
          <p className="text-gray-500 italic mb-6">Multi-step form (Branch, Years, Discharge, Conditions) will go here in Phase 2.</p>
          <div className="h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 bg-gray-50">
            IntakeStepForm Component Placeholder
          </div>
        </div>
      </main>
    </div>
  );
}
