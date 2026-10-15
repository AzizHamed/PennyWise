    export class Expense {
        id!:string;
        amount!:number;
        title!:string;
        date!:Date;
        category!:string;

        constructor(id:string, amount:number, title:string, date:Date, category:string){
            this.id = id;
            this.amount = amount;
            this.title = title;
            this.date = date;
            this.category = category;
        }
    }