import {Request, Response} from 'express';
import pool from '../database/connection';
import { AddressService } from '../services/addressService';
import { sendSuccess } from '../utils/response';
import { CreateAddressDto, UpdateAddressDto } from '../dtos/addresses.dto';

export class AddressesControler{
  static addAddress = async(req: Request, res: Response): Promise<void> => {
    const userId = Number(req.params.userId);
    if(!userId){
      throw new Error('Invalid user ID');
    }

    const {address_line1, address_line2, city, state, postal_code, country} = req.body;

    const newAddress: CreateAddressDto = {
      user_id: userId,
      address_line1,
      address_line2,
      city,
      state,
      postal_code,
      country,
    };

    const createdAddress = await AddressService.createAddress(newAddress);
    sendSuccess(res, createdAddress, 'Address added successfully');
  }
}