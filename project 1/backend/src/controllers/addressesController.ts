import {Request, Response} from 'express';
import pool from '../database/connection';
import { AddressService } from '../services/addressService';
import { sendSuccess } from '../utils/response';
import { CreateAddressDto, UpdateAddressDto } from '../dtos/addresses.dto';

export class AddressesControler{
  static addAddress = async(req: Request, res: Response): Promise<void> => {
    const userId = Number(req.params.userId);
    if(!userId){
      
    }
  }
}