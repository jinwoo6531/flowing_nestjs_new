import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';
import { Store } from './entities/store.entity';
import * as bcrypt from 'bcryptjs';

@EntityRepository(Store)
export class StoresRepository extends Repository<Store> {
  async crateStore(authCredentialsDto: AuthCredentialsDto): Promise<void> {
//     const store = new Store();
//     store.store_name = authCredentialsDto.store_name;
//     store.salt = await bcrypt.genSalt();
//     store.store_password = await this.hashPassword(
//       createStoreDto.store_password,
//       store.salt,
//     );
//     store.store_address = createStoreDto.store_address;
//     store.store_phone_number = createStoreDto.store_phone_number;
//     store.store_longitude = createStoreDto.store_longitude;
//     store.store_latitude = createStoreDto.store_latitude;
//     store.store_business_hour = createStoreDto.store_business_hour;
//     store.store_grade = createStoreDto.store_grade;
//     store.store_image = createStoreDto.store_image;
//     store.store_profile_image = createStoreDto.store_profile_image;
//     store.store_closed_day = createStoreDto.store_closed_day;

//     try {
//       await store.save();
//     } catch (error) {
//       if (error.code === '23505') {
//         throw new ConflictException('이미 존재하는 스토어명입니다.');
//       } else {
//         throw new InternalServerErrorException();
//       }
//     }
//   }
}
