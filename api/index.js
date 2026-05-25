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

    // NEW BACKEND API
    const api = `https://usersxinfo-admin.onrender.com/api?key=UsersXinfofreeuersaa&type=${encodeURIComponent(type)}&term=${encodeURIComponent(term)}`;

    const response = await fetch(api);

    const data = await response.json();

    // Remove backend owner/tag
    delete data.owner;
    delete data.developer;
    delete data.creator;
    delete data.credit;

    // Add your own credit
    if (Array.isArray(data.result)) {
      data.result = data.result.map(v => {
        delete v.owner;
        delete v.developer;
        delete v.creator;
        delete v.credit;

        return {
          ...v,
          credit: "@mynk_mynk_mynk"
        };
      });
    }

    // Your owner tag
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
