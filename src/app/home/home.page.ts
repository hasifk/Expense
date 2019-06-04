import { Component } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  database:any;
  users:any=[];
  constructor(private sqlite: SQLite) {
  	this.database=this.sqlite.create({name: 'expense.db',location: 'default'});
    this.database.then((db: SQLiteObject) => {
    db.executeSql('create table IF NOT EXISTS users(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name TEXT,user_role INT,password TEXT,mobile INTEGER,email VARCHAR(200),address TEXT)', [])
      .then(() => console.log('created users table'))
      .catch(e => console.log(e));

    db.executeSql('create table IF NOT EXISTS products(product_id INTEGER PRIMARY KEY AUTOINCREMENT, product_name TEXT, product_description TEXT, total_stock INT, current_stock INT,price INT,added_date DATE)', [])
      .then(() => console.log('created products table'))
      .catch(e => console.log(e));
    
    db.executeSql('create table IF NOT EXISTS orders(order_id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, product_id INTEGER,order_description TEXT,quantity INT, order_date DATE, delivery_date DATE,user_id INT)', [])
      .then(() => console.log('created orders table'))
      .catch(e => console.log(e));
  })
  .catch(e => console.log(e));
  this.dataExistsCheck();
  this.display();
  }

public insert() {
	this.database.then((db: SQLiteObject) => {
    db.executeSql("INSERT INTO users (user_name,user_role,password,mobile,email,address) VALUES (?,?,?,?,?,?)", ["nazer554",1,"nazer554","8547905554","hasifkoonari@gmail.com","thennala"])
    .then(() => console.log('I row inserted into users table'))
    .catch(e => console.log(e));
    }).catch(e => console.log(e));
}
public display() {
	this.database.then((db: SQLiteObject) => {
    db.executeSql('SELECT * FROM users', [])
      .then(res => {
       this.users = [];
        for(var i=0; i<res.rows.length; i++) {
          this.users.push(res.rows.item(i));
        }
        console.log(this.users);
      })

    }).catch(e => console.log(e));

}
dataExistsCheck()
   {

   	this.database.then((db: SQLiteObject) => {
    db.executeSql('SELECT count(*) AS numRows FROM users', [])
      .then(res => {
       var numRows = res.rows.item(0).numRows;
        console.log(numRows);
        if(numRows==0){
           this.insert();
        }
      })

    }).catch(e => console.log(e));
   }

}
