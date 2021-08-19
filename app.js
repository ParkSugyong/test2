const express = require("express");
const bcrypt = require('bcrypt')
const app = express();
// common setting
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// データベース
const user = [
  {
    email: 'park@loop-fitb.com', 
    password: bcrypt.hash('123456789', 10), 
    name: 'Sugyong Park'
  },
  {
    email: 'jimbo@loop-fitb.com', 
    password: bcrypt.hash('asdfgh', 10), 
    name: 'Shin Jimbo'
  },  
  {
    email: 'fan@loop-fitb.com', 
    password: bcrypt.hash('12345dfsdf', 10), 
    name: 'Wei Fan'
  },
];
const productdb = [
  {productID: '1', productName: 'T-Shirt', price: 4800},
  {productID: '2', productName: 'Jacket', price: 19800},
  {productID: '3', productName: 'Pants', price: 9800},
  {productID: '4', productName: 'Jacket', price: 20000},
  {productID: '5', productName: 'Pants', price: 10000},
  {productID: '6', productName: 'Pants', price: 1000},  
];
///API
app.get('/api/cart', (req, res) => {
  //リクエストから商品IDと個数を受け取る
  console.log(req.query)
  const productID = req.query.productID
  const amount = req.query.amount
  //商品IDに対応した商品を調べる

  //リクエストproductIDに対した商品IDを調べる
  const found = productdb.find(product => { return product.productID === req.query.productID;})
  //foundには該当商品IDがある場合はObjectが、ない場合はUndefinedが入っている。 {productID: '1', productName: 'T-Shirt', price: 4800}
  if(found){
    //返却する商品データを作成
    const product = {
      productName: found.productName,
      productID: productID,
      amount: amount,
      subtotal: found.price*amount
    }
    return res.status(200).send(product);
  }else{
    return res.status(404).send('Sorry, we cannot find that!');
  }
});
app.post('/login', async　(req, res) => {
  //ポストリクエスト　email,ユーザーIDを受け取る
  
  console.log(req.body);
  console.log('req.body', req.body)
  res.send("Received POST Data!");
  const email = req.body.email;
  const password = req.body.password;
  const hashed = await bcrypt.hash(password, 10)
  console.log(hashed)
  bcrypt.compare(hashed.password , user.password  , (error , isEqual) => {
    if (isEqual) {

      console.log("ログイン出来ました")
    } else {
      console.log("ログイン失敗しました")
    }
  });

  
})
module.exports = app;
