"use strict";
const db = require("../db");

module.exports = {
  getData: (req, res) => {
    let sql =
      "select transaksi.*, member.nama from transaksi inner join member on member.id = transaksi.id_member";
    db.query(sql, (err, result) => {
      if (err) {
        throw err;
      } else {
        res.json({
          data: result,
        });
      }
    });
  },

  getDetails: (req, res) => {
    let id = req.params.id;
    let sql =
      "select transaksi.*, detil_transaksi.*, member.nama, transaksi.id from transaksi inner join member on member.id = transaksi.id_member inner join detil_transaksi on detil_transaksi.id where transaksi.id = ?";
    db.query(sql, id, (err, result) => {
      if (err) {
        throw err;
      } else {
        if (result[0]) {
          res.json({
            data: result[0],
          });
        } else {
          res.json({
            message: "Data not found.",
          });
        }
      }
    });
  },

  //CRUD DATA
add: (req,res) => {

    let date = new Date();
    let y = date.getFullYear();
    let m = ("0" + (date.getMonth() + 1)).slice(-2);
    let d = ("0" + date.getDate()).slice(-2);
    let tgl = `${y}-${m}-${d}`;

    const datelimit = new Date();
    datelimit.setDate(datelimit.getDate() + 3);
    let y2 = datelimit.getFullYear();
    let m2 = ("0" + (datelimit.getMonth() + 1)).slice(-2);
    let d2 = ("0" + datelimit.getDate()).slice(-2);
    let batas_waktu = `${y2}-${m2}-${d2}`;

    
    let sql0 = "SELECT * from paket where id = ?";
    db.query(sql0, req.body.id_paket, (err, result) => {
              if (err) {
                throw err;
              } else {
                        let harga = result[0].harga;
                        let total = req.body.qty * harga;
                        let sql1 = "INSERT INTO transaksi SET ?";
                        let data1 = {
                                id_member: req.body.id_member,
                                tgl: tgl,
                                batas_waktu: batas_waktu,
                                status: "baru",
                                dibayar: "belum_dibayar",
                                id_user: req.body.id_user,
                                id_outlet: req.body.id_outlet,
                                total: total,
                        }
                        db.query(sql1,data1, (err,result) => {
                            if(err){
                                throw err;
                            }else{
                                        let sql4 = "SELECT * FROM transaksi WHERE id_member = ? and tgl = ? and batas_waktu = ? and id_outlet = ?";
                                        db.query(sql4, [data1.id_member, data1.tgl, data1.batas_waktu, data1.id_outlet ], (err,result) => {
                                            if(err){
                                                throw err;
                                            }else{
                                                let data2 = {
                                                    id_transaksi: result[0].id,
                                                    id_paket: req.body.id_paket,
                                                    qty: req.body.qty,
                                                    jenis: req.body.jenis,
                                                }
                                                let sql3 = "INSERT INTO detil_transaksi SET ?";
                                                db.query(sql3,data2, (err,result) => {
                                                    if(err){
                                                        throw err;
                                                    }else{
                                                        res.json({
                                                            message: "Data transaction inserted successfully."
                                                        })
                                                    }
                                                })
                                        }
                                })    
                            }
                        })
              }
    });                    
},

  delete: (req, res) => {
    let id_transaksi = req.params.id
    let sql = "delete from detil_transaksi where id = ?";
    
    db.query(sql, id_transaksi, (err, result) => {
      if (err) {
        throw err;
      } else {
        let sql2 = "delete from transaksi where id = ?";
        db.query(sql2, id_transaksi, (err, result) => {
          if (err) {
            throw err;
          } else {
            res.json({
              message: `Row deleted with id = ${id_transaksi}.`,
              data
            });
          }
        
        });
      }
    });
  },

  confirm: (req, res) => {
    let id_transaksi = req.params.id;
    let date = new Date();
    let y = date.getFullYear();
    let m = ("0" + (date.getMonth() + 1)).slice(-2);
    let d = ("0" + date.getDate()).slice(-2);
    let tgl = `${y}-${m}-${d}`;
    let data = {
      // id_member: req.body.id_member,
      // id_user: req.body.id_user,
      // id_outlet: req.body.id_outlet,
    };
    
        let sql2 = `update transaksi set tgl_bayar = '${tgl}', dibayar= 'dibayar', status= 'selesai'  where id = ?`;
        db.query(sql2, [id_transaksi], (err, result) => {
            if (err) {
              throw err;
            } else {
              res.json({
                message: `Row updated with id = ${id_transaksi}.`,
                data: result,
              });
            }
        });
  }
};
