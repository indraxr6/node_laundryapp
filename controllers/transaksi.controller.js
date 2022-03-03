const db = require("../db");

module.exports = {
    getData: (req,res) => {
        let sql = "select transaksi.*, member.nama from transaksi inner join member on member.id = transaksi.id_member";
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
    
    getDetails: (req,res) => {
        let id = req.params.id;
        let sql = "select transaksi.*, detil_transaksi.*, member.nama, transaksi.id from transaksi inner join member on member.id = transaksi.id_member inner join detil_transaksi on detil_transaksi.id where transaksi.id = ?";
        db.query(sql,id, (err,result) => {
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
    
                let total = req.body.qty * harga 
                let transaksi = {
                    id_member: req.body.id_member,
                    tgl: date,
                    batas_waktu: batas_waktu,
                    // tgl_bayar: req.body.tgl_pembayaran,
                    status: "baru",
                    dibayar: "belum_bayar",
                    id_user: req.body.id_user,
                    id_outlet: req.body.id_outlet,
                    total: total
        
                }
            }
        })
        let insert_transaksi = "select * from paket where id = ?";
        db.query(insert_transaksi, transaksi, (err,result) => { 
            if(err){
                throw err;
            }else{
                let sql_paket = "select * from paket where id = ?";
                db.query(sql_paket, transaksi, (err,result) => {
                    if(err){
                        throw err;
                    }else {
                        let detil_transaksi = {
                            id_transaksi: result[0].id,
                            id_paket: req.body.id_paket,
                            qty: req.body.qty,
                            jenis: req.body.jenis
                        }
                    let sql_detail = "insert into detil_transaksi set ?";
                    db.query(sql_detail, detil_transaksi, (err,result) => {
                        if(err){
                            throw err;
                        }else{
                            res.json({
                                message: "Success add transaction data."
                            })
                        }
                    })
                    }   
                })
            }
        })
    },

   
    delete: (req,res) => {
        let id_outlet = req.body.id_outlet;
        let sql = "delete from outlet where id_outlet = ?";
        db.query(sql,id_outlet, (err,result) => {
            if(err){
                throw err;
            }else{
                res.json({
                    message: `Successfully delete outlet where id = ${id_outlet}.`
                })
            }
        })        
    },
    update: (req,res) => {
        let id_outlet = req.body.id_outlet;
        let data = {
            nama_outlet: req.body.nama_outlet,
            alamat_outlet: req.body.alamat_outlet,
            telp_outlet: req.body.telp_outlet
        }
        let sql = "update outlet set ? where id_outlet = ?";
        db.query(sql,[data, id_outlet], (err,result) => {
            if(err){
                throw err;
            }else{
                res.json({
                    message: `Successfully update outlet where id = ${id_outlet}.`,
                    data
                })
            }
        })        
    }
}

 //     let data2 = {
    //         id_transaksi: transaksi.id_transaksi,
    //         id_paket: req.body.id_paket,
    //         qty: req.body.qty,
    //         total_harga: req.body.total_harga,
    //         keterangan: req.body.keterangan
    //     }
    //     let sql1 = "INSERT INTO transaksi SET ?";
    //     db.query(sql1,data1, (err,result) => {
    //         if(err){
    //             throw err;
    //         }else{
    //             transaksi = result;
    //         }
    //     })
    //     setTimeout(() => {
    //         let sql2 = "INSERT INTO detail_transaksi SET ?";
    //         db.query(sql2,data2, (err,result) => {
    //             if(err){
    //                 throw err;
    //             }else{
    //                 res.json({
    //                     message: "Data has been added.",
    //                     data: transaksi + result
    //                 })
    //             }
    //         })
    //     }, 1000);
    // },
