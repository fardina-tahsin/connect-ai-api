const RATES_PER_MILLION = {
  'gemini-3.5-flash': { input: 1.5, output: 9.0 },
  'gemini-3.5-flash-lite': { input: 0.3, output: 2.5 },
  'gemini-3.1-flash-lite': { input: 0.25, output: 1.5 },
  'gemini-3-flash-preview': { input: 0.5, output: 3.0 },
  'gemini-2.5-flash': { input: 0.3, output: 2.5 },
  'gemini-2.5-flash-lite': { input: 0.1, output: 0.4 },
};

const PROVIDER_DEFAULTS = {
  gemini: { input: 1.5, output: 9.0 },
};

function getRates(provider, model) {
  const key = String(model || '').toLowerCase();
  const match = Object.keys(RATES_PER_MILLION)
    .sort((a, b) => b.length - a.length)
    .find((name) => key === name || key.startsWith(name));

  return RATES_PER_MILLION[match] || PROVIDER_DEFAULTS[provider] || { input: 0, output: 0 };
}

function estimateCost(provider, model, usage) {
  const rates = getRates(provider, model);
  const inputTokens = usage?.inputTokens ?? 0;
  const outputTokens = usage?.outputTokens ?? 0;
  return (inputTokens / 1_000_000) * rates.input + (outputTokens / 1_000_000) * rates.output;
}

module.exports = { estimateCost, getRates };