const { Client } = require('pg')
const express=require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
//Конфигурируем БД
client = new Client({
    host: '127.0.0.1',
    username: 'postgres',
    password: 'postgres',
    database: 'testdb',
    port:'5432',
});

const app=express()
const port=3002//http порт 
client.connect();


const TableName='testtable'//Имя таблицы

const InsertUser='INSERT INTO ' + TableName + ' VALUES ($1,$2) RETURNING *'
const UserInfo='SELECT * FROM ' + TableName +' WHERE username=$1'
const ShowTable='SELECT * FROM '+ TableName
const UserCheck='SELECT * FROM ' + TableName +' WHERE username=$1'
const DeleteUser='DELETE FROM ' + TableName + ' WHERE username=$1'
const PlusMoney='UPDATE '+TableName+' SET amount=amount + $2::money WHERE username=$1 RETURNING *'
const MinusMoney='UPDATE '+TableName+' SET amount=amount - $2::money WHERE username=$1 RETURNING *'

app.use(cors())
//получаем данные всех пользователей
app.get('/users', (req,res)=>
{
//Строки чтоб работал React с BackEnd'ом

//
    client.query(ShowTable).then(result=>{
        /* res.set('Access-Control-Allow-Origin','*')
        res.set('Access-Control-Allow-Methods','GET','OPTIONS')
        res.set('Access-Control-Allow-Headers','Content-Type') */
        res.send(result.rows)})
})

//Получаем данные о пользователе
app.use(bodyParser.json())
app.post('/users/', (req,res)=>{

    //Должно быть
    let username=req.body.username;
    console.log(username)
    //let amount=req.body.amount;
    client.query(UserInfo,[username],function(err,result)
        {
        if (result.rows[0])
        res.send(result.rows[0])
        else 
        res.send("User doesn't exist") 
        })        
}
)

//Обновляем данные пользователя
app.use(bodyParser.json())
app.put('/users',(req,res)=>{


let username=req.body.username
let UpdateUser;
if (req.body.amount>0){
    UpdateUser=PlusMoney
    amount=req.body.amount
    }
else{
    UpdateUser=MinusMoney
    amount=req.body.amount*(-1)
}
    client.query(UpdateUser,[username,amount],function(err,result)
            {
                if(!err){
                res.send(result.rows[0])
                }
            })
    }
)
//Создаем нового пользователя
app.use(bodyParser.json())
app.put('/users/add',(req,res)=>{

    let username=req.body.username;
    let amount=req.body.amount;
    client.query(UserCheck, [username], (err,resOfChecking)=>{
        if(resOfChecking.rows[0]==null){    
            if (amount==null) //Костыль
                amount=0
            client.query(InsertUser,[username,amount],(err,result)=>
            {
                if(!err){
                res.send(result.rows[0])
                }
                else {
                console.log('Некорректно введены данные)')
                res.send('Error')
                }
            })
        }
        else {
            res.send('User already created')
        }
    })
})
//Удаляем пользователя
app.use(bodyParser.json())
app.delete('/users',(req,res)=>{


    let username=req.body.username
    client.query(DeleteUser,[username],(err,result)=>{
        res.send('Deleted')
    })
})

app.listen(port)