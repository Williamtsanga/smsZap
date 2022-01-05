export const sendSMS = () => {
    const apilogin="f16187da70b6";
    const apikey="b6901d40-f211-930a-8e0c-1cdad7a64f99";
   const  requestOptions = {
        method: 'POST',
        headers: {
            Authorization:'Basic '+ btoa(apilogin + ":" + apikey),
            'Content-Type': 'application/json',
            'Accept': 'application/json',
       },
     body: JSON.stringify({ phoneNumber: '698228738',message:'123456789' })
    };
    fetch('http://proxysms.mufoca.com/api/v0/shortMessages', requestOptions)
    .then(response => response.json())
    .then(data => {console.log(data)

    })
    .catch((err) => {
      console.log(err)
    })}