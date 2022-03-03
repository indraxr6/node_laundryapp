add: (req,res) => {
    let harga;
    let total;
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

          
  
    let transaksi = {
          id_member: req.body.id_member,
          tgl: tgl,
          batas_waktu: batas_waktu,
          // tgl_bayar: req.body.tgl_pembayaran,
          status: "baru",
          dibayar: "belum_bayar",
          id_user: req.body.id_user,
          id_outlet: req.body.id_outlet,
          total: total,
        }
          let sql_transaksi = "INSERT INTO transaksi SET ?";
          db.query(sql_transaksi, transaksi, (err,result) => {
              if(err){
                  throw err;
              }else{
                  let sql2 = "SELECT * FROM paket_cuci WHERE id_paket = ?";
                  db.query(sql2,req.body.id_paket, (err,result) => {
                      if(err){
                          throw err;
                      }else{
                          let harga = result[0].harga;
                          let sql4 = "SELECT * FROM transaksi WHERE kode_invoice = ?";
                          db.query(sql4,kode_invoice, (err,result) => {
                              if(err){
                                  throw err;
                              }else{
                                  let total_harga = harga * req.body.qty;
                                  let data2 = {
                                      id_transaksi: result[0].id_transaksi,
                                      id_paket: req.body.id_paket,
                                      qty: req.body.qty,
                                      total_harga: total_harga,
                                      keterangan: req.body.keterangan
                                  }
                                  let sql3 = "INSERT INTO detail_transaksi SET ?";
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
          })
      }