import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const PaymentForm = ({
  amount,
  setAmount,
}: {
  amount: number;
  setAmount: (value: number) => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)!,
    });

    if (error) {
      console.error(error);
    } else if (paymentMethod) {
      const response = await fetch("https://localhost:3000/payments/confirm-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentMethodId: paymentMethod.id, amount }),
      });
      const success = await response.json();
      if (success) {
        // Payment successful, handle accordingly
      } else {
        // Payment failed, handle accordingly
      }
    }

    setLoading(false);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(event.target.value));
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        width: "400px",
        height: "500px",
        backgroundColor: "white",
      }}
    >
      <CardElement />
      <input type="number" value={amount} onChange={handleAmountChange} />
      <button type="submit" disabled={!stripe || loading}>
        Pay ${amount}
      </button>
    </form>
  );
};

export default PaymentForm;
