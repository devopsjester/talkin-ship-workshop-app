// hooks/useErrorHandling.ts

/*****************************************************************************************
 * If you're going to try the flag trigger code, you need to replace everything
 * below with the code from 
 * "Handling API Migrations Like a Pro - Immediate Resolution With Flag Triggers", Step 3.
 *****************************************************************************************/
import { useState } from 'react';
import { useShoppingCart } from 'use-shopping-cart';

const useErrorHandling = () => {
  const [errorState, setErrorState] = useState(false);

  const { clearCart } = useShoppingCart();

  const Trigger = async () => {
    try {
      const response = await fetch(
        'https://app.launchdarkly.com/webhook/triggers/64d458e27e6c3313740452ca/07c4329c-3774-4427-a629-4bf208768e9c', // put your flag trigger URL in here using this format: 'http://your-flag-trigger.com', (needs both the comma and quotes)   
        {
          method: "POST",
          body: JSON.stringify({
            eventName: "There was an error with the API",
          }),
        }
      );
      return response.status;
    } catch (error) {
      console.log("the fetch did not work");
    }
  };

  const errorTesting = async () => {
    try {
      const response = await fetch("/api/checkout", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const jsonData = await response.json();
      if (jsonData == "the API is unreachable") {
        setErrorState(true);
         clearCart()
         Trigger()
        return 502;
      } else {
        setErrorState(false);
      }
    } catch (e) {
      console.log("is it running?");
      console.log(e)
    }
  };

  return { errorState, setErrorState, errorTesting };
};

export default useErrorHandling;
