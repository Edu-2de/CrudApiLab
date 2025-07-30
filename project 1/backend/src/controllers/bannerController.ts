import { Request, Response } from 'express';
import pool from '../database/connection';

const JWT_SECRET = process.env.JWT_SECRET || '';

export class BannerController{
  static add = async(req:Request, res:Response): Promise<void> => {
    try{
      const {title, image_url, link_url} = req.body
      if(!title || !image_url || !link_url){
        res.status(400).json({message: 'Any of arguments of the banner is missing'})
        return;
      }
    }catch(error){

    }
  }
}