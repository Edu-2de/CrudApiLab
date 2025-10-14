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

  static async getByIdAddress(addressId: number): Promise<Address>{
    const address = await AddressRepository.findById(addressId);
    if (!address) {
      throw new AppError('Address not found', 404);
    }
    return address;
  }

  static async getByUserIdAddress(userId: number): Promise<Address>{
    const address = await AddressRepository.findByUserId(userId);
    if(!address){
      throw new AppError('Address not found', 404);
    }
    return address;
  }

  static async updateByIdAddress(addressId: number, updateDto: UpdateAddressDto): Promise<Address>{
    const address = await AddressRepository.findById(addressId);
    if (!address){
      throw new AppError('Address not found', 404);
    }

    const {fields, values} = this.buildUpdateQuery(updateDto);
    if(fields.length === 0) {
      throw new AppError('No fields to update', 400);
    }

    const updatedAddress = await AddressRepository.update(addressId, fields, values);
    return updatedAddress;
  }

  static async deleteByIdAddress(addressId: number): Promise<Address>{
    const address = await AddressRepository.findById(addressId);
    if(!address){
      throw new AppError('Address not found', 404);
    }
    const deletedAddress = await AddressRepository.delete(addressId);
    return deletedAddress;
  }


  private static buildUpdateQuery(updateData: any) {
    const fields: string[] = [];
    const values: any[] = [];
    let idx = 1;

    Object.entries(updateData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        fields.push(`${key} = $${idx++}`);
        values.push(value);
      }
    });

    fields.push('updated_at = CURRENT_TIMESTAMP');
    return { fields, values };
  }
}