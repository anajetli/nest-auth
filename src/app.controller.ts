import { Controller, Get, Query, Request, Res, Response } from '@nestjs/common';
import { AppService } from './app.service';
import * as express from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /*
  @Get()
  getHello(@Request() req): string {
    if (req.user) {
      return 'Hello, ' + req.user.userinfo.name + '! <a href="/logout">Logout</a>';
    } else {
      return this.appService.getHello() + ' <a href="/login">Login</a>';
    }
    return this.appService.getHello();
  }
  */

  @Get()
  loginMSAL(@Response() response: express.Response){
    var url = `${process.env.MS_LOGIN_URL}/${process.env.MS_LOGIN_CLIENT}/oauth2/v2.0/authorize`;
    url += `?client_id=${process.env.MS_LOGIN_CLIENT_ID}&response_type=${process.env.MS_LOGIN_RESPONSE_TYPE}`;
    url += `&redirect_uri=${process.env.MS_LOGIN_REDIRECT_URL}&response_mode=${process.env.MS_LOGIN_RESPONSE_MODE}`;
    url += `&scope=${process.env.MS_LOGIN_SCOPE}&state=${process.env.MS_LOGIN_STATE}/`;

    return response.redirect(303, url);
  }
  
  @Get('/callback')
  async getCallback(@Query() query) : Promise<any>{
    const code = query.code;
    const state = query.state;
    const session_state = query.session_state;

    const msal = await this.appService.getMSALToken(code);
    return msal;
  }
}
