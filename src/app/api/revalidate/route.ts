import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  const authHeader = request.headers.get("authorization");

  if (!secret || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { _type?: string };
    revalidateTag("products", "max");
    revalidatePath("/");
    revalidatePath("/shop");
    revalidatePath("/sitemap.xml");

    if (body._type === "product") {
      revalidatePath("/product/[slug]", "page");
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch {
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
