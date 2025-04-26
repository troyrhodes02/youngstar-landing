import { NextResponse } from "next/server";
import { Client, Environment } from "square";

const client = new Client({
  environment: Environment.Production,
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, customer } = body;

    console.log("Received checkout request:", { items, customer });

    if (!items || !items.length) {
      throw new Error("No items provided for checkout");
    }

    // Create a Square order with line items
    const locationId = process.env.SQUARE_LOCATION_ID!;
    const idempotencyKey = Date.now().toString();

    // Create checkout link with line items
    const response = await client.checkoutApi.createPaymentLink({
      idempotencyKey,
      order: {
        locationId,
        lineItems: items.map((item: { catalogObjectId: string; quantity: string }) => ({
          catalogObjectId: item.catalogObjectId,
          quantity: item.quantity
        })),
        // Add customer details if provided
        ...(customer && {
          fulfillments: [
            {
              type: 'SHIPMENT',
              shipmentDetails: {
                recipient: {
                  displayName: `${customer.givenName} ${customer.familyName}`,
                  emailAddress: customer.email || undefined,
                  phoneNumber: customer.phone || undefined,
                  address: {
                    addressLine1: customer.address.addressLine1,
                    locality: customer.address.locality,
                    administrativeDistrictLevel1: customer.address.administrativeDistrictLevel1,
                    postalCode: customer.address.postalCode,
                    country: customer.address.country
                  }
                }
              }
            }
          ]
        })
      },
      checkoutOptions: {
        askForShippingAddress: !customer,
        merchantSupportEmail: "support@youngstarpresence.com"
      },
    });

    if (!response.result.paymentLink || !response.result.paymentLink.url) {
      throw new Error("Payment link could not be created.");
    }

    console.log("Checkout URL created:", response.result.paymentLink.url);

    return NextResponse.json({
      checkoutUrl: response.result.paymentLink.url,
    });
  } catch (error) {
    console.error("Square Checkout Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create checkout link" },
      { status: 500 }
    );
  }
}
