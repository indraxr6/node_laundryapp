'use strict'
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = '#@$%^&*()_+';
const db = require("../db");
const md5 = require("md5");

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

//GET endpoints

module.exports = {
    getData: (req,res) => {
        let sql = "select * from user";
        db.query(sql, (err,result) => {
            if(err){
                throw err;
            }else{
                res.json({
                    data: result
                })
            }
        })
    },
    selectData: (req,res) => {
        let id = req.params.id;
        let sql = "select * from user where id = ?";
        db.query(sql, id, (err,result) => {
            if(err){
                throw err;
            }else{
                if(result[0]){
                    res.json({
                        data: result[0]
                    })
                }else{
                    res.json({
                        message: "Data not found."
                    })
                }
            }
        })        
    },

    //CRUD data

    add: (req,res) => {
        const { nama, username, password, tlp,  id_role, id_outlet } = req.body;
        if(!nama || !username || !password || !tlp || !id_role || !id_outlet) {
            res.status(402).json({
                message: "Please fill all the required fields."
            })
        }else{
            return db.query('insert into user set ?', { nama, username, password: hashPassword(password), tlp, id_role, id_outlet}, (err, result) => {
                if(err){
                    return res.status(500).json({err})
                }else{
                    return res.json({
                        message: "Data added",
                        data: result
                    })
                }
            })
        }
    },
    delete: (req,res) => {
        let id = req.params.id;
        let sql = "delete from user where id = ?";
        db.query(sql,id, (err,result) => {
            if(err){
                throw err;
            }else{
                res.json({
                    message: `Row deleted with id = ${id}.`
                })
            }
        })        
    },
    update: (req,res) => {
        let id = req.params.id;
        let data = {
            nama: req.body.nama,
            username: req.body.username,
            password: hashPassword(req.body.password),
            tlp: req.body.tlp,
            id_role: req.body.id_role,
            id_outlet: req.body.id_outlet
        }
        let sql = "update user set ? where id = ?";
        db.query(sql,[data, id], (err,result) => {
            if(err){
                throw err;
            }else{
                res.json({
                    message: `Row updated with id = ${id}.`,
                    data
                })
            }
        })        
    }
}