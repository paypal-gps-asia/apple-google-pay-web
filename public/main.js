// helper function - throw error with a customized message
const _throwError = (err, message) => {
  throw new Error(message);
  console.error(err);
  return false;
};

/** Implement your own clien token fetching handler here */
const getClientToken = async () => {
  try {
    const clientToken = await fetch(
      "https://1k8m2p12z7.execute-api.ap-southeast-1.amazonaws.com/sandbox/clienttoken"
    );
    const clientTokenJson = await clientToken.json();
    return clientTokenJson;
  } catch (err) {
    throw new Error(err);
    return null;
  }
};

/** Create Braintree client instance */
const createBTClient = async (clientToken) => {
  try {
    const btClientInstance = await braintree.client.create({
      authorization: clientToken,
    });
    console.log("Braintree client is created succesfully.");
    return btClientInstance;
  } catch (err) {
    _throwError(err, "BT client creation failed.");
  }
};

// main function here to run the apple and google pay demo app
(async () => {
  // generate client token on server and fetch it
  const clientToken = await getClientToken();
  // setup braintree client instance
  const btClientInstance = await createBTClient(clientToken);

  // setup google pay
  const { googlePayClient, googlePaymentInstance } = await createGooglePay(
    btClientInstance
  );
  // setup google pay button to handle payment request on click event
  const googlePayRequestHandler = async () => {
    const response = await requestGooglePay(
      googlePayClient,
      googlePaymentInstance
    );
    const message =
      "<p>Submit the nonce value to your server to capture the payment: " +
      response.nonce +
      "</p>";
    $("#auth-status").html(message);
  };
  const googlePayBtn = googlePayClient.createButton({
    onClick: googlePayRequestHandler,
    buttonType: "short", // omit "Buy with"
    buttonColor: "white", // differentiate from Apple Pay's default black color
  });
  document.getElementById("google-pay-container").appendChild(googlePayBtn);

  // setup apple pay
  if (isApplePaySupported()) {
    console.log("apple pay is supported");
    // setup apple pay button
    const applePayBtn = $("#apple-pay-container");
    // make apple pay button visible with class names
    applePayBtn.addClass("apple-pay-button apple-pay-button-black");
    const applePayInstance = await createApplePayClient(btClientInstance);
    applePayBtn.on("click", function () {
      console.log("Setting up Apple Pay session after user clicks button.");
      const applePaySession = createApplePaySession(applePayInstance);
      applePaySession.begin();
    });
  }
})();
