import {Request, Response, NextFunction} from 'express';
import pool from '../database/connection';
import { AddressService } from '../services/addressService';
import { sendSuccess } from '../utils/response';
import { CreateAddressDto, UpdateAddressDto } from '../dtos/addresses.dto';

export class AddressesController {
  static addAddress = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
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
    } catch (err) {
      next(err);
    }
  }

  static getAllAddresses = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const addresses = await AddressService.getAllAddresses();
      sendSuccess(res, { addresses }, 'Addresses retrieved successfully');
    } catch (err) {
      next(err);
    }
  }

  static getAddressById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const addressId = Number(req.params.addressId);
      if(!addressId){
        throw new Error('Invalid address ID');
      }

      const address = await AddressService.getByIdAddress(addressId);
      sendSuccess(res, { address }, 'Address retrieved successfully');
    } catch (err) {
      next(err);
    }
  }

  static getAddressByUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.userId);
      if(!userId){
        throw new Error('Invalid user ID');
      }

      const addresses = await AddressService.getByUserIdAddress(userId);
      sendSuccess(res, { addresses }, 'Addresses retrieved successfully');
    } catch (err) {
      next(err);
    }
  }

  static updateAddress = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const addressId = Number(req.params.addressId);
      if(!addressId){
        throw new Error('Invalid address ID');
      }

      const { address_line1, address_line2, city, state, postal_code, country } = req.body;

      const updatedAddress: UpdateAddressDto = {
        address_line1,
        address_line2,
        city,
        state,
        postal_code,
        country,
      };

      const result = await AddressService.updateByIdAddress(addressId, updatedAddress);
      sendSuccess(res, result, 'Address updated successfully');
    } catch (err) {
      next(err);
    }
  }
}
