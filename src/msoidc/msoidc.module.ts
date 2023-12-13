import { Module } from '@nestjs/common';
import { MsoidcController } from './msoidc.controller';
import { MsoidcService } from './msoidc.service';
import { PassportModule } from '@nestjs/passport';
import { OidcStrategy, buildOpenIdClient } from './oidc.strategy';
import { SessionSerializer } from './session.serializer';

const OidcStrategyFactory = {
  provide: 'OidcStrategy',
  useFactory: async (authService: MsoidcService) => {
    const client = await buildOpenIdClient(); // secret sauce! build the dynamic client before injecting it into the strategy for use in the constructor super call.
    const strategy = new OidcStrategy(authService, client);
    return strategy;
  },
  inject: [MsoidcService]
};

@Module({
  imports: [
    PassportModule.register({ session: true, defaultStrategy: 'oidc' }),
  ],
  controllers: [MsoidcController],
  providers: [OidcStrategyFactory, SessionSerializer, MsoidcService]
})
export class MsoidcModule {}
