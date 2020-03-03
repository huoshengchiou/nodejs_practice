const express = require('express');
const router = express.Router();
const db = require(__dirname + '/../_connect_db');
const multer = require('multer');
const upLoads = multer({ dest: 'tmp_upLoads/' });
const moment = require('moment-timezone');




// // 拜訪login頁面
// router.get('/login-check', (req, res) => {

//     res.render('test.ejs', { name: 'Sheng' });


// })


router.use((req, res, next)=>{
    if(! req.session.loginEmail){
        // 當session不存在user資料且path為login時給過
        // 但/session會被擋
        // logout無所謂，因為必須登入才可以看到logout
        // 以下要放不需登入也可以看的到的頁面
        if(req.url==='/check'||req.url==='/register'){
            next();
        } else {
            res.send('<h2>您沒有權限</h2><a href="http://localhost:3000/tandem_login.html">回登入頁面</a>');
        }
    } else {
        next();
    }
});



// 使用者登入

router.post('/check', (req, res) => {
    console.log('loginAccount: ' + req.body.ctEmail);
    console.log('req.body:' + JSON.stringify(req.body));

    // 確認ctEmail和ctPwd存在後
    if (req.body.ctEmail && req.body.ctPwd) {

        const output = {
            success: false,
            error: '',
            msg: '登入完成',
            status: 0,
            body: req.body,
            result: {}
        };
        // 利用ctEmail和ctPwd對資料庫進行檢索
        const sql = `SELECT \* FROM \`mb_info\` WHERE \`mbEmail\`= ? AND \`mbPassword\` = ?`;

        db.queryAsync(sql, [
            req.body.ctEmail,
            req.body.ctPwd
        ])
            // RowDataPacket obj
            .then(r => {
                // 撥開RowDataPacket obj拿裡面的東西
                // 沒有比對成功的帳號
                console.log(r[0]);
                if (!r || !r.length) {
                    output.error = '帳號或密碼錯誤';
                    output.status = 400;
                    return res.json(output)
                }
                // 帳號比對成功
                // 紀錄id及Nick作為登入成功使用
                req.session.loginEmail = r[0].mbEmail;
                req.session.loginNick = r[0].mbNick || '不知名的旅人';
                // req.session.loginData = JSON.parse(JSON.stringify(r));
                req.session.loginData = r;

                // 編寫sever回覆狀態
                output.success = true;
                output.status = 200;

                console.log(req.session);
                console.log(req.session.loginData[0].mbInvoice);

                return res.json(output);
                // }

            })
            // .catch(e => {
            //     // sql查詢不到資料
            //     output.msg = '帳號或密碼錯誤'
            //     console.log('sql查詢資料發生錯誤');
            //     return res.json(output);
            // })

    } else {

        // output變數尚未定義，額外自訂回覆
        output.error = 'Client request error';
        output.status = 400;
        return res.json(output);

    }

    // 沒有做出任何的response，client端將會pending

})


// 會員註冊

router.post('/register', upLoads.none(), (req, res) => {
    console.log('reg-body:' + JSON.stringify(req.body));
    if (req.body.mbPassword && req.body.mbEmail) {
        // sever回覆狀態
        const output = {
            success: false,
            error: '',
            msg: '註冊成功',
            status: 0,
            body: req.body,
            result: {}
        };
        console.log(req.body);
        let email_pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        if (!req.body.mbEmail || !email_pattern.test(req.body.mbEmail)) {
            output.error = "Email格式不符";
            output.status = 410;
            console.log('Email格式不符');
            return res.json(output);
        }
        // 找尋是否有重複的帳號
        const s_sql = "SELECT * FROM mb_info WHERE mbEmail=?";
        db.queryAsync(s_sql, [req.body.mbEmail])
            .then(r => {
            // 搜尋結果看length，修改結果找affectedRows
                // 當資料不存在或者資料長度不存在時，才執行寫入資料庫的動作
                if (!r || !r.length) {
                    console.log(!r.length)
                    // 完成後寫入資料庫
                    const sql = `INSERT INTO \`mb_info\` (\`mbEmail\`,\`mbPassword\`) 
        VALUES(?, ?)`;
                    return db.queryAsync(sql, [
                        req.body.mbEmail,
                        req.body.mbPassword
                    ])
                        .then(r => {
                            
                            console.log(r);
                            console.log(!r.affectedRows);
                            console.log('second:'+r.length)
                            

                            if (r.affectedRows){
                                console.log('註冊成功')
                                output.success = true;
                                // output.result = r;
                                // 將資料寫入session
                                req.session.loginId = r.insertId;
                                req.session.loginEmail = req.body.mbEmail;
                                req.session.loginNick = '不知名的旅人';
                                console.log('session結束');
                                return res.json(output);
                                // return res.json(output);
                                
                            }else{
                                console.log('沒有寫入註冊資料');
                                output.error = '註冊失敗';
                                return res.json(output);
                            }

                        })
                        .catch(error => {
                            console.log('資料庫執行發生錯誤');
                            output.error = '資料庫執行發生錯誤';
                            output.result = error;
                            return res.json(output);
                        })

                }else{
                    output.error='此帳號已被註冊';
                    output.status=410;
                    return res.json(output);
                }
            })


    } else {
        return res.json({
            error: '註冊外層錯誤'
        })
    }
});


// 使用者登出

router.get('/logout',(req,res)=>{
    delete req.session.loginEmail;
    delete req.session.loginNick;
    // 將browser重新導向新的path
                //   拿到完整路徑，不受middleware更改影響
    res.redirect('http://localhost:3000/tandem_login.html');


})






// -------------------------------------------------------------會員管理畫面------------------------------------------------

// 顯示個人資料

router.get('/edit/:mbId', (req, res) => {
    const sql = "SELECT * FROM mb_info WHERE mbId=?";
    db.queryAsync(sql, [req.params.mbId])
        .then(r => {
            // console.log(!r);
            // console.log(r.length);
            if (!r || !r.length) {
                return res.json({
                    error:'找不到會員資料'
                })
                // res.redirect(req.baseUrl + '/list');
            } else {
                const df = "YYYY-MM-DD";
                r.forEach((row, index) => {
                    row.mbBd = moment(row.mbBd).format(df);
                });

                res.render('edit.ejs', { row: r[0] });

            }

        })
})
//修改個人資料
router.post('/edit/:mbId', upLoads.none(), (req, res) => {
    console.log('editupdate');
    console.log(req.body);
    //TODO確認輸入資料格式
    // 郵件於註冊時綁定，不可再寫
    const output = {
        success: false,
        error: '',
        msg: '修改成功',
        status: 0,
        body: req.body,
        result: {}
    };
    // return res.json(output);
    // if(!req.body.Bd || ! /^\d{4}-\d{1,2}-\d{1,2}/.test(req.body.Bd)){
    //     output.msg = '請填寫合法的生日';
    //     output.status = 430;
    //     return res.json(output);
    // }

    const sql = `UPDATE \`mb_info\` SET \`mbName\`=?, \`mbNick\`=?, \`mbGender\`=?, \`mbCountry\`=?,\`mbPh\`=?,\`mbInvoice\`=?,\`mbDes\`=? WHERE mbId=?`;
    db.queryAsync(sql, [
        req.body.mbName,
        req.body.mbNick,
        req.body.mbGender,
        req.body.mbCountry,
        req.body.mbPh,
        req.body.mbInvoice,
        req.body.mbDes,
        req.body.mbId
    ])
        .then(r => {
            console.log(r);
            console.log(r.length)
            if (r.changedRows) {
                output.success = true;
                output.msg = '新增修改';
                output.status = 200;
                return res.json(output);
            } else {
                output.msg = '沒有更動的項目';
                output.status = 200;
                return res.json(output);
            }

        })
    // .catch(error=>{
    //    output.msg = '資料庫運行發生錯誤'
    // return res.json(output);
    // })


    // 等待完成，整理更為一致的錯誤訊息

});




// 顯示會員清單
router.get('/list/:page?', (req, res) => {
    const perPage = 5;
    let totalRows, allPages;
    let page = req.params.page ? parseInt(req.params.page) : 1;

    const t_sql = "SELECT COUNT(1) num FROM `mb_info`";

    // 取得資料總數
    db.queryAsync(t_sql)
        .then(
            r => {
                totalRows = r[0].num; //總筆數
                allPages = Math.ceil(totalRows / perPage);//總頁數


                if (page < 1) page = 1;
                if (page > allPages) page = allPages;
                //裁切資料筆數
                const sql = `SELECT * FROM \`mb_info\` LIMIT  ${(page - 1) * perPage}, ${perPage}`;

                return db.queryAsync(sql);
            })
        .then(r => {
            const fm = "YYYY-MM-DD";

            r.forEach((row, idx) => {
                row.mbBd = moment(row.mbBd).format(fm);
            })
            res.render('list.ejs', {
                totalRows,
                allPages,
                page,
                rows: r
            });


        })

})


// 清除會員資料

router.post('/delete/:mbId', (req, res) => {

    const sql = "DELETE FROM `mb_info` WHERE `mbId`=?";

    db.queryAsync(sql, [req.params.mbId])
        .then(r => {
            console.log(r);
            if (r.affectedRows > 0) {
                console.log('刪除了' + req.params.mbId + '的資料')
            }
            res.json(r);

        })


})












router.get('/test', (req, res) => {


    res.render('../views/test.ejs', { name: 'test' });
})








// 當存入session後可以進行測試
router.get('/sess', (req, res) => {

    return res.json(req.session);

});

module.exports = router;

