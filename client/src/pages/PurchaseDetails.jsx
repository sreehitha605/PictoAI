import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext"; // Import your AppContext

const PurchaseDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedPlan } = location.state || {}; // Access the selected plan from the passed state

  const { credit, setCredit } = useContext(AppContext); // Access context to update credits

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    saveCard: false,
  });

  // Handle payment submission
  const handleSubmit = () => {
    if (!selectedPlan) {
      alert("No plan selected.");
      return;
    }

    // Simulate payment success
    alert("Payment Successful");

    // Update credits in context
    setCredit(credit + selectedPlan.credits);

    // Redirect to home page
    navigate("/");
  };

  if (!selectedPlan) {
    return <p>Plan not found.</p>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
        <p className="mb-4">Selected Plan: {selectedPlan.id}</p>
        <p className="mb-6">Price: ₹ {selectedPlan.price}</p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Card Number"
            className="w-full p-2 border rounded-md"
            value={paymentDetails.cardNumber}
            onChange={(e) =>
              setPaymentDetails({
                ...paymentDetails,
                cardNumber: e.target.value,
              })
            }
          />
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="MM/YY"
              className="w-1/2 p-2 border rounded-md"
              value={paymentDetails.expiryDate}
              onChange={(e) =>
                setPaymentDetails({
                  ...paymentDetails,
                  expiryDate: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="CVV"
              className="w-1/2 p-2 border rounded-md"
              value={paymentDetails.cvv}
              onChange={(e) =>
                setPaymentDetails({ ...paymentDetails, cvv: e.target.value })
              }
            />
          </div>
          <input
            type="text"
            placeholder="Name on Card"
            className="w-full p-2 border rounded-md"
            value={paymentDetails.cardName}
            onChange={(e) =>
              setPaymentDetails({ ...paymentDetails, cardName: e.target.value })
            }
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={paymentDetails.saveCard}
              onChange={(e) =>
                setPaymentDetails({
                  ...paymentDetails,
                  saveCard: e.target.checked,
                })
              }
            />
            <label htmlFor="saveCard" className="text-sm">
              Save this card as per RBI guidelines
            </label>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 text-white mt-4 p-2 rounded-md"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseDetails;
