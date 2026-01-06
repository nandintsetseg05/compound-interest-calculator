"use client";

import { useState } from "react";

// Format numbers as $1,234,567.89
function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}


export default function Home() {
  // Inputs
  const [principal, setPrincipal] = useState<number>(1000);
  const [monthly, setMonthly] = useState<number>(100);
  const [rate, setRate] = useState<number>(7);
  const [years, setYears] = useState<number>(10);

  // Calculation
  const months = years * 12;
  const monthlyRate = rate / 100 / 12;

  let futureValue = principal;
  let totalContributions = principal;

  for (let i = 0; i < months; i++) {
    futureValue = futureValue * (1 + monthlyRate) + monthly;
    totalContributions += monthly;
  }

  const interestEarned = futureValue - totalContributions;

  return (
    <main className="flex min-h-screen items-center justify-center px-4 bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl">
      

        <h1 className="text-2xl font-bold mb-6 text-center">Compound Interest Calculator</h1>

        {/* Inputs */}
        <div className="space-y-4">
          <Input label="Initial Investment ($)" value={principal} onChange={setPrincipal} />
          <Input label="Monthly Contribution ($)" value={monthly} onChange={setMonthly} />
          <Input label="Annual Interest Rate (%)" value={rate} onChange={setRate} />
          <Input label="Years" value={years} onChange={setYears} />
        </div>

        {/* Results */}
        <div className="mt-6 border-t border-white/20 pt-4 space-y-2 text-sm">
          <Result label="Final Balance" value={futureValue} />
          <Result label="Total Contributions" value={totalContributions} />
          <Result label="Interest Earned" value={interestEarned} />
        </div>
      </div>
    </main>
  );
}

// Input component
function Input({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-lg bg-black/30 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
      />
    </div>
  );
}

// Result component
function Result({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span className="font-semibold">{formatCurrency(value)}</span>
    </div>
  );
}
