import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./components/PaymentForm";

const stripePromise = loadStripe("your_publishable_key");

const App: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  return (
    <div className="App">
      <Elements stripe={stripePromise}>
        <PaymentForm amount={amount} setAmount={setAmount} />
      </Elements>
    </div>
  );
};

export default App;
