import {CreateAddressDto, UpdateAddressDto} from '../dtos/addresses.dto';
import { AddressRepository } from '../repositories/addressRepository';
import { Address } from '../entities/Address';
import {AppError} from '../utils/appError';

export class AddressService{
  static async createAddress(createAddressDto: CreateAddressDto):Promise<Address>{
    const {user_id, address_line1, address_line2, city, state, postal_code, country} = createAddressDto;

    const addressData = {
      user_id,
      address_line1,
      address_line2,
      city,
      state,
      postal_code: Number(postal_code),
      country,
    }

    const address = await AddressRepository.create(addressData);
    return address;
  }

  static async getAllAddresses(): Promise<Address[]> {
    const address = await AddressRepository.findAll();
    if(address.length === 0){
      throw new AppError('No addresses found', 404);
    }
    return address;
  }
}