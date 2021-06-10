import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { StoresRepository } from './stores.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(StoresRepository)
    private storesRepository: StoresRepository,
  ) {}
}
