import { Sequelize } from "sequelize";

import User from '../app/models/User';
import File from '../app/models/File';
import Account from "../app/models/Account";
import RcCategory from "../app/models/RcCategory";
import DpCategory from "../app/models/DpCategory";
import CardCredit from "../app/models/CardCredit";
import Tags from '../app/models/Tags';
import Releases from '../app/models/Releases';
import CardCreditReleases from '../app/models/CardCreditReleases';

import  databaseConfig from '../config/database';

const models = [
    User, 
    File, 
    Account, 
    RcCategory, 
    DpCategory, 
    CardCredit, 
    Tags, 
    Releases,   
    CardCreditReleases          
];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);
        models
            .map(model => model.init(this.connection))
            .map(model => model.associate && model.associate(this.connection.models));
    }
}

export default new Database();