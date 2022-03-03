'use strict'
const db = require("../db");

//GET endpoints

module.exports = {
    getData: (req,res) => {
        let sql = "select * from outlet";
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
        let sql = "select * from outlet where id = ?";
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
        const { nama, alamat, tlp } = req.body;
        if(!nama || !alamat || !tlp ) {

            res.status(402).json({
                message: "Please fill all the required fields."
            })
        }else{
            return db.query('insert into outlet set ?', { nama, alamat, tlp }, (err, result) => {
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
        let sql = "delete from outlet where id = ?";
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
            alamat: req.body.alamat,
            tlp: req.body.tlp,
          
        }
        let sql = "update outlet set ? where id = ?";
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