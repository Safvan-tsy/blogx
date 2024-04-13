export async function POST(req: Request) {
  const data = await req.json();

  return Response.json({ status: 'success', data });
}
