import * as mongoose from 'mongoose';

interface Sprint {
    number: number;
    start: string;  
    end : string;
    tasks: string[];
    backlog: string[];

}


const sprintschema = new mongoose.Schema({  
    number: {type: Number, require: true},
    start: {type: String, require: true},
    end: {type: String, require: true},
    tasks: [{type: mongoose.Schema.Types.ObjectId, ref: "Task"}],
    backlog: [{type: String}],
});

const SprintModel = mongoose.model<Sprint & mongoose.Document>("Sprint", sprintschema);
export default SprintModel;
