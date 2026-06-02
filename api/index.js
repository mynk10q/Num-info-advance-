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

    const response = await fetch(api);
    const data = await response.json();

    // Remove all unwanted tags
    delete data.owner;
    delete data.tag;
    delete data.developer;
    delete data.creator;
    delete data.credit;

    // Remove tags from nested objects
    if (data.result?.data) {
      delete data.result.data.tag;
      delete data.result.data.owner;
      delete data.result.data.credit;
      delete data.result.data.creator;
      delete data.result.data.developer;
    }

    // Remove tags from records
    if (Array.isArray(data.result?.data?.records)) {
      data.result.data.records = data.result.data.records.map(v => {
        delete v.owner;
        delete v.tag;
        delete v.credit;
        delete v.creator;
        delete v.developer;
        return v;
      });
    }

    // Add your own owner
    data.owner = "@mynk_mynk_mynk";

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
