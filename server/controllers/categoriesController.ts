import { CategoryBL } from "../BL/categoryBL";
import {Request, Response} from "express";
export class CategoriesController {
    /**
     *
     */
    constructor(private readonly categoriesBL = new CategoryBL()) {

    }

    public async getCategoriesList(req : Request, res : Response) {
        try {
            const list = await this.categoriesBL.getCategoriesList();
            res.status(200).json(list);
        }
        catch(ex) {
            
            res.status(500).json(ex)

        }
        
    }
}