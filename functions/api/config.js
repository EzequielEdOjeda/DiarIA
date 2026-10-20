export async function onRequest(context) {
  return new Response(JSON.stringify({
    SHEET_CSV_URL:    context.env.SHEET_CSV_URL    || '',
    FIREBASE_URL:     context.env.FIREBASE_URL     || ''
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store'
    }
  });
}