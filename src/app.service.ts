import { Injectable, Response } from '@nestjs/common';

@Injectable()
export class AppService {

  async getMSALToken(code: string){
    const axios = require('axios');
    const FormData = require('form-data');
    let data = new FormData();
    data.append('code', code);
    data.append('client_id', process.env.MS_LOGIN_CLIENT_ID);
    data.append('scope', process.env.MS_LOGIN_SCOPE);
    data.append('redirect_uri', process.env.MS_LOGIN_REDIRECT_URL);
    data.append('grant_type', 'authorization_code');
    data.append('client_secret', process.env.MS_LOGIN_CLIENT_SECRET);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://login.microsoftonline.com/' + process.env.MS_LOGIN_CLIENT + '/oauth2/v2.0/token',
      headers: { 
        'Cookie': 'buid=0.AS4A8TdnRvFNFUaQrxIC3Iu8nPTeL_EKy6VAsYvgKZk0Miy5AAA.AQABAAEAAAAmoFfGtYxvRrNriQdPKIZ-Y6C096WDo8vE_zuOS0dhtQKCjWX5dNrI1Tc8i-eJCWGvvul6Sc1cABlMBoXPE-rfnxw5Vi2y0b_rKa_JgDqmkG9EscbnjlUfi_TSpi1BNK4gAA; fpc=At4Vm-zqO1hAg77Nu0vWteQN3A90AgAAAKecC90OAAAA; stsservicecookie=estsfd; x-ms-gateway-slice=estsfd', 
        ...data.getHeaders()
      },
      data : data
    };

    axios.request(config)
    .then((response) => {
      return JSON.stringify(response.data);
    })
    .catch((error) => {
      console.log(error);
    });


    return 'null';
  }
}
