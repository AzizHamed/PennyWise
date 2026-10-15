export class User {
    id!:string;
    name!:string;
    email!:string;
    budget!:number;

    constructor(id:string, name:string, email:string, budget:number){
        this.id = id;
        this.name = name;
        this.email = email;
        this.budget = budget;
    }
}