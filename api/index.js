export default async function handler(req, res) {
  const { key, term, type } = req.query;

  // API Key Check
  if (key !== "mynkx") {
    return res.status(403).json({
      success: false,
      message: "Invalid Key",
      owner: "@mynk_mynk_mynk"
    });
  }

  // Params Check
  if (!term || !type) {
    return res.status(400).json({
      success: false,
      message: "Missing term/type",
      owner: "@mynk_mynk_mynk"
    });
  }

  try {
    // Backend API
    const api = `https://usersxinfo-admin.onrender.com/api?key=lljeliye&type=${encodeURIComponent(type)}&term=${encodeURIComponent(term)}`;

    const response = await fetch(api, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const data = await response.json();

    // Remove unwanted fields from root
    delete data.owner;
    delete data.tag;
    delete data.developer;
    delete data.creator;
    delete data.credit;

    // Remove unwanted fields from nested data
    if (data.result?.data) {
      delete data.result.data.owner;
      delete data.result.data.tag;
      delete data.result.data.developer;
      delete data.result.data.creator;
      delete data.result.data.credit;
    }

    // Remove unwanted fields from records array
    if (Array.isArray(data.result?.data?.records)) {
      data.result.data.records = data.result.data.records.map(record => {
        delete record.owner;
        delete record.tag;
        delete record.developer;
        delete record.creator;
        delete record.credit;
        return record;
      });
    }

    // Add your owner tag
    data.owner = "@mynk_mynk_mynk";

    // Cache headers
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");

    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Backend API Error",
      details: err.message,
      owner: "@mynk_mynk_mynk"
    });
  }
}
