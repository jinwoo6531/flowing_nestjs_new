import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';
import { Store } from './entities/store.entity';
import * as bcrypt from 'bcryptjs';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(Store)
export class StoresRepository extends Repository<Store> {
  async crateStore(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const {
      store_name,
      store_password,
      store_address,
      store_phone_number,
      store_longitude,
      store_latitude,
      store_business_hour,
      store_grade,
      store_profile_image,
      store_closed_day,
    } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(store_password, salt);

    const store = this.create({
      store_name,
      store_password: hashedPassword,
      store_address,
      store_phone_number,
      store_longitude,
      store_latitude,
      store_business_hour,
      store_grade,
      store_profile_image,
      store_closed_day,
    });

    try {
      await this.save(store);
    } catch (error) {
      console.log(error);

      if (error.code === '23505') {
        throw new ConflictException('이미 존재하는 스토어입니다.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
