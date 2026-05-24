export default async function handler(req, res) {
  const { key, term, type } = req.query;

  if (key !== "mynkx") {
    return res.status(403).json({
      success: false,
      message: "Invalid Key",
      credit: "@mynk_mynk_mynk"
    });
  }

  if (!term) {
    return res.status(400).json({
      success: false,
      message: "Enter term",
      credit: "@mynk_mynk_mynk"
    });
  }

  try {

    // External API Hit
    const r = await fetch(
      `https://leakinfoapi.noobgamingv40.workers.dev/api?key=Xy8kL9mN2pQr5tUv&type=${type}&term=${term}`
    );

    const data = await r.json();

    // Credit Add
    if (Array.isArray(data.result)) {
      data.result = data.result.map(x => ({
        ...x,
        credit: "@mynk_mynk_mynk"
      }));
    }

    data.owner = "@mynk_mynk_mynk";

    res.status(200).json(data);

  } catch (e) {
    res.status(500).json({
      success: false,
      error: "API Error",
      credit: "@mynk_mynk_mynk"
    });
  }
}
