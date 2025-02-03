// app/api/mercury-payment/route.js
export async function POST(request) {
    try {
      const body = await request.json();
      const { amount } = body;
      const parsedAmount = Number(amount);
  
      if (isNaN(parsedAmount)) {
        return new Response(JSON.stringify({ error: "Invalid amount" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
  
      // Se l'importo supera 5000, richiedi step-up authentication
      if (parsedAmount > 5000) {
        return new Response(
          JSON.stringify({ error: "High risk transaction. Step-up authentication required." }),
          { status: 403, headers: { "Content-Type": "application/json" } }
        );
      } else {
        return new Response(
          JSON.stringify({ success: true, message: `Payment of $${parsedAmount} processed successfully.` }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      }
    } catch (error) {
      return new Response(
        JSON.stringify({ error: "An error occurred." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }
  