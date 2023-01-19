import * as mongoose from 'mongoose';

interface Task {
    name: string;
    description: string;
    taskowner: string;
    deadline: string;
    ffinished: string;
    status: string;
    sprint: string;
    project: string;    
    observations: string;
}


const taskschema = new mongoose.Schema({
    name: {type: String, require: true},
    description: {type: String, require: true},
    taskowner: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    deadline: {type: String, require: true},
    finished: {type: String},
    status: {type: String, require: true},
    sprint: {type: mongoose.Schema.Types.ObjectId, ref: "Sprint"},
    project: {type: mongoose.Schema.Types.ObjectId, ref: "Project"},
    observations: {type: String}
});

const TaskModel = mongoose.model<Task & mongoose.Document>("Task", taskschema);
export default TaskModel;
