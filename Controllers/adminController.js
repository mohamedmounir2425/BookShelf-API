const AuthModel = require('../Models/AuthModel');
const BookModel=require("../Models/BookModel")
let getAllUser = async (req, res) => {
	let users = await AuthModel.find({});
   
	if (users) {
		res.status(200).json({ message: "success", length: users.length, data: users });
	} else {
		res.status(404).json({ message: 'fail' });
	}
};
let getAllBooks = async (req, res) => {
	let books = await BookModel.find({});
	if (books) {
		res.status(200).json({ message: "success", length: books.length, data: books });
	} else {
		res.status(404).json({ message: 'fail' });
	}
};
let getPurchases=async()=>{
    let users=await AuthModel.find({});
    let purchased=[];
    for(let i =0;i<users.length;i++){
        if(users[i].purchased.length!=0)
        purchased = purchased.concat(users[i].purchased);
    }
    return purchased
}
let getAllPurchased=async(req,res)=>{
    let users=await AuthModel.find({});
    let purchased=[];
    for(let i =0;i<users.length;i++){
        if(users[i].purchased.length!=0)
        purchased = purchased.concat(users[i].purchased);
    }
    
    if (users) {
		res.status(200).json({ message: "success", length: purchased.length, data: purchased });
        
	} else {
		res.status(404).json({ message: 'fail' });
	}
    
}
let getDatesAndPrices=async (req,res)=>{
    try{

        const purchasedArr = await getPurchases();
          const monthTotals = new Map();
          purchasedArr.forEach((item) => {
          const timestamp = new Date(item.date);
          const monthYear = timestamp.toLocaleString('en-US', { month: 'short', year: 'numeric' });
          const totalPrice = item.book.price*item.quantity;
          if (monthTotals.has(monthYear)) {
            monthTotals.set(monthYear, monthTotals.get(monthYear) + totalPrice);
          } else {
            monthTotals.set(monthYear, totalPrice);
          }
        });
    
        const Months = Array.from(monthTotals.keys());
        const Prices= Array.from(monthTotals.values());
        
            res.status(200).json({ message: "success", months: Months, prices: Prices });
            
    }
	 catch(err){

         res.status(404).json({ message: err });
     } 
	
}
let purchasedBooks=async(req,res)=>{
   try{
    let books = await BookModel.find({});
    const purchasedArr = await getPurchases();
    let totalQuantity=0;
    let totalPurchased=0
    for(let i=0;i<books.length;i++){
        totalQuantity+=books[i].quantity
    }

    purchasedArr.map((item)=>{
        totalPurchased+=item.quantity;
    })
    
    res.status(200).json({ message: "success", totalQuantity: totalQuantity, totalPurchased: totalPurchased });
   }
   catch(err){
    res.status(404).json({ message: err });

   }

  

}

module.exports = {
    getAllBooks,
    getAllUser,
    getAllPurchased,
    getDatesAndPrices,
    purchasedBooks
}

