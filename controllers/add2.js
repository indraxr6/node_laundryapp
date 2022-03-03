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
                                        outlet_id: req.body.outlet_id,
                                        id_pelanggan: req.body.id_pelanggan,
                                        id_user: req.body.id_user,
                                        kode_invoice: kode_invoice,
                                        tgl: tgl,
                                        batas_waktu: batas_waktu,
                                        diskon: req.body.diskon,
                                        biaya_tambahan: req.body.biaya_tambahan,
                                        pajak: req.body.pajak,
                                        status: "baru",
                                        status_bayar: "belum"
                                    }
                              db.query(sql1,data1, (err,result) => {
                                  if(err){
                                      throw err;
                                  }else{
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
                                                          total: total,
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
          });                    
      }