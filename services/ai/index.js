const { createError } = require('./errors');
const { createGeminiProvider } = require('./providers/gemini');

const PROVIDERS = {
  gemini: createGeminiProvider,
};

function createProvider() {
  const name = (process.env.AI_PROVIDER || 'gemini').trim().toLowerCase();
  const factory = PROVIDERS[name];

  if (!factory) {
    throw createError(
      `Unsupported AI_PROVIDER "${name}". Use one of: ${Object.keys(PROVIDERS).join(', ')}`,
      500
    );
  }

  return factory();
}

const provider = createProvider();

async function generate({ prompt, json = false }) {
  return provider.generate({ prompt, json });
}

module.exports = { generate };