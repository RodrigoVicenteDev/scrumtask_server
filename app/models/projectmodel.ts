import * as mongoose from "mongoose";

interface Project {
    name: string;   
    time: string[];
    start: string;
    end: string;
    client: string; 
    backlog: string[]
    sprint: string[]    
    done: string[]  

}

const projectschema = new mongoose.Schema({
    name: {type: String, require: true},
    time: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    start: {type: String, require: true},
    end: {type: String, require: true},
    client: {type: mongoose.Schema.Types.ObjectId, ref: "Client"},
    backlog: [{type: String  }],
    sprint: [{type: mongoose.Schema.Types.ObjectId, ref: "Sprint"}],
    done: [{type:String}],  
});

const ProjectModel = mongoose.model<Project & mongoose.Document>("Project", projectschema);
export default ProjectModel;

