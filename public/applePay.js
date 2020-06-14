/** --------------------- Apple Pay Functions -------------------------------------------*/

/** Check browser and device support */
const isApplePaySupported = () => {
  if (!window.ApplePaySession) {
    console.error('This device does not support Apple Pay')
    return false
  }
  
  else if (!ApplePaySession.canMakePayments()) {
    console.error('This device is not capable of making Apple Pay payments')
    return false
  }
  
  else return true
}



/** Create Apple Pay client */
const createApplePayClient = async (btClientInstance) => {
  try{
    const applePayInstance = await braintree.applePay.create({
      client: btClientInstance
    })
    console.log('Apple Pay client created is successfully.')
    return applePayInstance
  } catch(err){
   _throwError(err, 'Apple Pay client creation failed.') 
  }
}


/** Check whether active card available in user's Apple Pay wallet */
const isApplePayActive = async (applePayInstance) => {
  return await ApplePaySession.canMakePaymentsWithActiveCard(applePayInstance.merchantIdentifier)
}



/** Create Apple Pay session and setup event handler */
const createApplePaySession = (applePayInstance) => {
  // create payment data request
  const paymentRequest = applePayInstance.createPaymentRequest({
    total: {
      label: 'My Store',
      amount: '10.70'
    },
    countryCode: 'SG',
    currencyCode: 'USD'
  })
  // create payment session
  const session = new ApplePaySession(3, paymentRequest)
  console.log('Apple Pay session is created successfully.')

  // Setup merchant session validation event handler
  session.onvalidatemerchant = function(event){
    applePayInstance.performValidation({
      validationURL: event.validationURL,
      displayName: 'My Store'
    })
    .then( merchantSession => {
      session.completeMerchantValidation(merchantSession)
      console.log('apple pay merchant session is validated.')
    })
    .catch( err => {
      // You should show an error to the user, e.g. 'Apple Pay failed to load.'
      console.error('Error validating merchant:', err )
      session.abort()
    })
  }
  
  // Setup payment authorization event handler
  session.onpaymentauthorized = function(event) {
    applePayInstance.tokenize({
      token: event.payment.token
    }).then( payload => {
      // Send payload.nonce to your server to capture apple pay payment
      const message = '<p>Submit the nonce to capture apple pay payment:' + payload.nonce + '</p>'
      $("#auth-status").html(message)
      // If requested, address information is accessible in event.payment
      // and may also be sent to your server.
      console.log('billingPostalCode:', event.payment.billingContact.postalCode)
      // After you have transacted with the payload.nonce,
      // call `completePayment` to dismiss the Apple Pay sheet.
      session.completePayment(ApplePaySession.STATUS_SUCCESS)
    }).catch( err => {
      console.error('Error tokenizing Apple Pay:', err)
      session.completePayment(ApplePaySession.STATUS_FAILURE)
    })
  }
  
  return session
}
/** --------------------- End of Apple Pay Functions ------------------------------------*/
