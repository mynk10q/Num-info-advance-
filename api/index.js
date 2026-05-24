export default async function handler(req, res) {

  const { key, term, type } = req.query;

  // Your API Key
  if (key !== "mynkx") {
    return res.status(403).json({
      success: false,
      message: "Invalid Key",
      owner: "@mynk_mynk_mynk"
    });
  }

  // Check params
  if (!term || !type) {
    return res.status(400).json({
      success: false,
      message: "Missing term/type",
      owner: "@mynk_mynk_mynk"
    });
  }

  try {

    // Original API
    const api = `https://leakinfoapi.noobgamingv40.workers.dev/api?key=Xy8kL9mN2pQr5tUv&type=${encodeURIComponent(type)}&term=${encodeURIComponent(term)}`;

    const response = await fetch(api);

    const data = await response.json();

    // Add credit
    if (Array.isArray(data.result)) {
      data.result = data.result.map(v => ({
        ...v,
        credit: "@mynk_mynk_mynk"
      }));
    }

    data.owner = "@mynk_mynk_mynk";

    return res.status(200).json(data);

  } catch (err) {

    return res.status(500).json({
      error: "Backend API Error",
      details: err.message,
      owner: "@mynk_mynk_mynk"
    });

  }
}
