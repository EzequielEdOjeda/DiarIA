export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/config") {
      return Response.json({
        SHEET_CSV_URL: env.SHEET_CSV_URL || "",
        FIREBASE_URL: env.FIREBASE_URL || "",
        NEWSDATA_API_KEY: env.NEWSDATA_API_KEY || ""
      });
    }

    return env.ASSETS.fetch(request);
  }
};