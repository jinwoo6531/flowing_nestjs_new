import { JwtPayload } from './jwt-payload.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { StoresRepository } from './stores.repository';
import { Store } from './entities/store.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(StoresRepository)
    private storesRepository: StoresRepository,
  ) {
    super({
      secretOrkey: 'topSecret51',
      jwtFromReuqest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<Store> {
    const { store_name } = payload;
    const store: Store = await this.storesRepository.findOne({ store_name });

    if (!store) {
      throw new UnauthorizedException();
    }

    return store;
  }
}
