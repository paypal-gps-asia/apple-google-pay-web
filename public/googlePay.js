/** --------------------- Google Pay Functions -------------------------------------------*/

/** Create 
  * 1) Google Pay client, and 
  * 2) Google Pay payment instance
  */
 const createGooglePay = async ( btClientInstance ) => {
	// Create google pay client with BT client instnace - TEST or PRODUCTION
  const googlePayClient = new google.payments.api.PaymentsClient({ environment: 'TEST' })
  try{
  	const googlePaymentInstance = await braintree.googlePayment.create({
      client: btClientInstance,
      googlePayVersion: 2,
      // googleMerchantId: 'merchant-id-from-google' // required for PRODUCTION
    })
    console.log("Google Pay instance created successfully")
    
    // Check whether Google Pay is supported and ready
    const isReadyToPay = await googlePayClient.isReadyToPay({
      // see https://developers.google.com/pay/api/web/reference/object#IsReadyToPayRequest for all options
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: googlePaymentInstance.createPaymentDataRequest().allowedPaymentMethods,
      existingPaymentMethodRequired: true
    })
    if(isReadyToPay.result){
      console.log('Google Pay is set-up and ready now.')
      return { googlePayClient, googlePaymentInstance }
    } else {
      console.log('Google Pay is NOT supported on this device or browser.') 
      return false
    }
    
  } catch(err){
  	_throwError(err, 'Google Pay set-up failed.')
  }  
}


/** Set up Google Pay payment request and return the payment auth result */
const requestGooglePay = async (googlePayClient, googlePaymentInstance) => {
  const paymentDataRequest = googlePaymentInstance.createPaymentDataRequest({
    transactionInfo: {
      currencyCode: 'USD',
      totalPriceStatus: 'FINAL',
      totalPrice: '10.70' // Your amount
    }
  })
  
  // We recommend collecting billing address information, at minimum
  // billing postal code, and passing that billing postal code with all
  // Google Pay card transactions as a best practice.
  // See all available options at https://developers.google.com/pay/api/web/reference/object
  const cardPaymentMethod = paymentDataRequest.allowedPaymentMethods[0];
  cardPaymentMethod.parameters.billingAddressRequired = true;
  cardPaymentMethod.parameters.billingAddressParameters = {
    format: 'FULL',
    phoneNumberRequired: true
  }
  
  try{
    const paymentData = await googlePayClient.loadPaymentData(paymentDataRequest) 
    const response = googlePaymentInstance.parseResponse(paymentData)
    // Send response.nonce to your server
    // response.type may be either "AndroidPayCard" or "PayPalAccount", and
    // paymentData will contain the billingAddress for card payments
    return response
  } catch(err){
    _throwError(err, 'google pay request failed.') 
  }
}

/** --------------------- End of Google Pay Functions ------------------------------------*/
