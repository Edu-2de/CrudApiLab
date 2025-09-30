import {Request, Response} from 'express';
import pool from '../database/connection';


export class AddressesControler{
  static addAddress = async(req: Request, res: Response): Promise<void> => {
    const userId = Number(req.params.userId);
    if(!userId){
      
    }
  }
}