module.exports = function(app){
    app.get('/index',(req,res)=>{
        res.send('Whaterver!');
    })
}