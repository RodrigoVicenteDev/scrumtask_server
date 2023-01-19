import * as mongoose from 'mongoose';

interface Client {
    name: string;
    email: string;
    telephone: string;
    observations: string;
}


const clientschema = new mongoose.Schema({
    name: {type: String, require: true},
    email: {type: String, require: true},
    telephone: {type: String, require: true},
    observations: {type: String},
});

const ClientModel = mongoose.model<Client & mongoose.Document>("Client", clientschema);
export default ClientModel;
