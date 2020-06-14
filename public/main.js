// generate client token from server-side with BT SDK - for client authentication
const clientToken = 'eyJ2ZXJzaW9uIjoyLCJlbnZpcm9ubWVudCI6InNhbmRib3giLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpGVXpJMU5pSXNJbXRwWkNJNklqSXdNVGd3TkRJMk1UWXRjMkZ1WkdKdmVDSXNJbWx6Y3lJNklrRjFkR2g1SW4wLmV5SmxlSEFpT2pFMU9USXhNemswTWpZc0ltcDBhU0k2SWpkbU5qQTFNamd3TFdNMFlqZ3RORFEzTnkwNE4yTmpMV1JrTURBMk1HVTNPVEJpTWlJc0luTjFZaUk2SW5BNGRHNXpkRGxqZG1NMWVHcHVkalVpTENKcGMzTWlPaUpCZFhSb2VTSXNJbTFsY21Ob1lXNTBJanA3SW5CMVlteHBZMTlwWkNJNkluQTRkRzV6ZERsamRtTTFlR3B1ZGpVaUxDSjJaWEpwWm5sZlkyRnlaRjlpZVY5a1pXWmhkV3gwSWpwbVlXeHpaWDBzSW5KcFoyaDBjeUk2V3lKdFlXNWhaMlZmZG1GMWJIUWlYU3dpYjNCMGFXOXVjeUk2ZXlKdFpYSmphR0Z1ZEY5aFkyTnZkVzUwWDJsa0lqb2lSR1Z0YjBGalkyOTFiblJUUjBRaWZYMC4ydmI1dno2bGVTZWc1cUE4dWZ1UTNZOVRkc1h3Sk92ZlRnMDBzcm9PdnQyMUhsaXdWWjFfUU1hMW9ndXRYVnljdjhNWVAwMXVrZjhaNDFNQjY5T3BBZyIsImNvbmZpZ1VybCI6Imh0dHBzOi8vYXBpLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb206NDQzL21lcmNoYW50cy9wOHRuc3Q5Y3ZjNXhqbnY1L2NsaWVudF9hcGkvdjEvY29uZmlndXJhdGlvbiIsImdyYXBoUUwiOnsidXJsIjoiaHR0cHM6Ly9wYXltZW50cy5zYW5kYm94LmJyYWludHJlZS1hcGkuY29tL2dyYXBocWwiLCJkYXRlIjoiMjAxOC0wNS0wOCJ9LCJjaGFsbGVuZ2VzIjpbImN2diJdLCJjbGllbnRBcGlVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvcDh0bnN0OWN2YzV4am52NS9jbGllbnRfYXBpIiwiYXNzZXRzVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhdXRoVXJsIjoiaHR0cHM6Ly9hdXRoLnZlbm1vLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhbmFseXRpY3MiOnsidXJsIjoiaHR0cHM6Ly9vcmlnaW4tYW5hbHl0aWNzLXNhbmQuc2FuZGJveC5icmFpbnRyZWUtYXBpLmNvbS9wOHRuc3Q5Y3ZjNXhqbnY1In0sInRocmVlRFNlY3VyZUVuYWJsZWQiOnRydWUsInBheXBhbEVuYWJsZWQiOnRydWUsInBheXBhbCI6eyJkaXNwbGF5TmFtZSI6IkJvamllX0JUX0RlbW9fTWVyY2hhbnQiLCJjbGllbnRJZCI6IkFTMzVkenZqT2lYVi1wSkF2dm1wVzBXTHY3SmpZTTlMdFJkQnR5cVlCelZWUTBOWXZkX2JUelZZR0drOHVVVGQxMVVpNHQ3VjFjLV9YQVZ0IiwicHJpdmFjeVVybCI6Imh0dHBzOi8vZGVtby1idC5zZyIsInVzZXJBZ3JlZW1lbnRVcmwiOiJodHRwczovL2RlbW8tYnQuc2cvdGVybXMiLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJhbGxvd0h0dHAiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjpmYWxzZSwiZW52aXJvbm1lbnQiOiJvZmZsaW5lIiwidW52ZXR0ZWRNZXJjaGFudCI6ZmFsc2UsImJyYWludHJlZUNsaWVudElkIjoibWFzdGVyY2xpZW50MyIsImJpbGxpbmdBZ3JlZW1lbnRzRW5hYmxlZCI6dHJ1ZSwibWVyY2hhbnRBY2NvdW50SWQiOiJEZW1vQWNjb3VudFNHRCIsImN1cnJlbmN5SXNvQ29kZSI6IlNHRCJ9LCJtZXJjaGFudElkIjoicDh0bnN0OWN2YzV4am52NSIsInZlbm1vIjoib2ZmIiwiYXBwbGVQYXkiOnsic3RhdHVzIjoibW9jayIsImNvdW50cnlDb2RlIjoiVVMiLCJjdXJyZW5jeUNvZGUiOiJTR0QiLCJtZXJjaGFudElkZW50aWZpZXIiOiJtZXJjaGFudC5jb20uYnJhaW50cmVlLmFwcGxlcGF5LnNhbmRib3giLCJzdXBwb3J0ZWROZXR3b3JrcyI6WyJ2aXNhIiwibWFzdGVyY2FyZCIsImFtZXgiLCJkaXNjb3ZlciJdfSwibWVyY2hhbnRBY2NvdW50SWQiOiJEZW1vQWNjb3VudFNHRCJ9'

// helper function - throw error with a customized message
const _throwError = (err, message) => {
  throw new Error(message)
  console.error(err)
  return false
}


/** Create Braintree client instance */
const createBTClient = async (clientToken) => {
	try{
  	const btClientInstance = await braintree.client.create({
			authorization: clientToken
		})
    console.log("Braintree client is created succesfully.")
    return btClientInstance
  } catch( err ){
  	_throwError(err, 'BT client creation failed.')
  }
}


// main function here to run the apple and google pay demo app
( async() => {
  // setup braintree client instance
	const btClientInstance = await createBTClient(clientToken)
  
  // setup google pay
  const { googlePayClient, googlePaymentInstance } = await createGooglePay(btClientInstance)
  // setup google pay button to handle payment request on click event
  const googlePayRequestHandler = async ()=>{
    const response = await requestGooglePay(googlePayClient, googlePaymentInstance)
    const message ='<p>Submit the nonce value to your server to capture the payment: ' + response.nonce + '</p>'
    $("#auth-status").html(message)
  }
  const googlePayBtn = googlePayClient.createButton({ 
    onClick: googlePayRequestHandler,
    buttonType: 'short',  // omit "Buy with"
    buttonColor: 'white'  // differentiate from Apple Pay's default black color
  })
  document.getElementById('google-pay-container').appendChild(googlePayBtn)

  // setup apple pay
  if( isApplePaySupported() ) {
    console.log('apple pay is supported')
    // setup apple pay button
    const applePayBtn = $('#apple-pay-container')
    // make apple pay button visible with class names
    applePayBtn.addClass("apple-pay-button apple-pay-button-black")
    const applePayInstance = await createApplePayClient(btClientInstance)
    applePayBtn.on("click", function(){
      console.log('Setting up Apple Pay session after user clicks button.')
      const applePaySession = createApplePaySession(applePayInstance)
      applePaySession.begin()
    })
  }
  
})()


