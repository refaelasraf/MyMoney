import { adminBL } from "../BL/adminBL";
export class adminController {

    constructor(private readonly _adminBL = new adminBL()) {
        
    }
}