import { NextResponse } from "next/server";
import { Client, Environment } from "square";

const client = new Client({
  environment: Environment.Production,
  accessToken: process.env.SQUARE_ACCESS_TOKEN!,
});

export async function POST(request: Request) {
  const { itemId } = await request.json();

  try {
    const { result } = await client.catalogApi.retrieveCatalogObject(itemId, true);

    if (!result.object) {
      throw new Error("Item not found");
    }

    const item = result.object.itemData!;
    const imageIds = item.imageIds || [];

    const images = await Promise.all(
      imageIds.map(async (imageId) => {
        const imageResponse = await client.catalogApi.retrieveCatalogObject(imageId);
        return imageResponse.result.object?.imageData?.url || null; 
      })
    );

    const validImages = images.filter((url) => url !== null);
    const price = item.variations?.[0]?.itemVariationData?.priceMoney?.amount
      ? Number(item.variations[0].itemVariationData.priceMoney.amount)
      : null;
    const name = item.name;

    return NextResponse.json({ images: validImages, price, name });
  } catch (error) {
    console.error("Error fetching product details:", error);
    return NextResponse.json({ error: "Failed to fetch product details" }, { status: 500 });
  }
}
