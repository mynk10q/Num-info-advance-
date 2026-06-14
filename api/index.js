export default async function handler(req, res) {
  const { key, term, type } = req.query;

  // API Key Check
  if (key !== "mynkpapabolo") {
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
    const api = `https://usersxinfo-admin.onrender.com/api?key=lljeliye&type=${encodeURIComponent(type)}&term=${encodeURIComponent(term)}`;

    const response = await fetch(api, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const data = await response.json();

    // Agar backend error ya limit exceed ho
    if (
      !data.success ||
      (data.error && data.error.includes("Limit exceeded"))
    ) {
      return res.status(200).json({
        success: false,
        error: "Server Busy",
        owner: "@mynk_mynk_mynk"
      });
    }

    // Root fields remove
    delete data.owner;
    delete data.tag;
    delete data.developer;
    delete data.creator;
    delete data.credit;

    // Nested data fields remove
    if (data.result?.data) {
      delete data.result.data.owner;
      delete data.result.data.tag;
      delete data.result.data.developer;
      delete data.result.data.creator;
      delete data.result.data.credit;
    }

    // Records array fields remove
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

    // Apna owner add
    data.owner = "@mynk_mynk_mynk";

    // Cache headers
    res.setHeader(
      "Cache-Control",
      "s-maxage=60, stale-while-revalidate"
    );

    return res.status(200).json(data);

  } catch (err) {
    return res.status(200).json({
      success: false,
      error: "Server Busy",
      owner: "@mynk_mynk_mynk"
    });
  }
}
