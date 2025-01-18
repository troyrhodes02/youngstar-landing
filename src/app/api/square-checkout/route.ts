import { NextResponse } from 'next/server';
import { Client, Environment } from 'square';

const client = new Client({
  environment: Environment.Production, 
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { itemId, size } = body;

    const catalogResponse = await client.catalogApi.retrieveCatalogObject(itemId, true);

    if (!catalogResponse.result.object || catalogResponse.result.object.type !== 'ITEM_VARIATION') {
      throw new Error('Item variation not found or is not a valid type.');
    }

    const itemVariation = catalogResponse.result.object;
    const itemVariationName = itemVariation.itemVariationData?.name || 'Variation';
    const itemPrice = itemVariation.itemVariationData?.priceMoney?.amount;

    if (!itemVariationName || !itemPrice) {
      throw new Error('Item variation details are missing.');
    }

    const parentItemId = itemVariation.itemVariationData?.itemId;
    let parentItemName = 'Product';
    if (parentItemId) {
      const parentItemResponse = await client.catalogApi.retrieveCatalogObject(parentItemId, true);
      parentItemName = parentItemResponse.result.object?.itemData?.name || parentItemName;
    }

    const fullItemName = `${parentItemName} - ${itemVariationName} - Size: ${size}`;

    const checkoutResponse = await client.checkoutApi.createPaymentLink({
      idempotencyKey: Date.now().toString(),
      order: {
        locationId: process.env.SQUARE_LOCATION_ID!,
        lineItems: [
          {
            name: fullItemName, 
            quantity: '1',
            basePriceMoney: {
              amount: BigInt(itemPrice), 
              currency: 'USD',
            },
          },
        ],
      },
    });

    if (!checkoutResponse.result.paymentLink || !checkoutResponse.result.paymentLink.url) {
      throw new Error('Payment link could not be created.');
    }

    return NextResponse.json({ checkoutUrl: checkoutResponse.result.paymentLink.url });
  } catch (error) {
    console.error('Square Checkout Error:', error);
    return NextResponse.json({ error: 'Failed to create checkout link' }, { status: 500 });
  }
}
