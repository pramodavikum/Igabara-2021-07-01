const router = require('express').Router();
let Feedback = require('../models/feedback.model');


router.route('/').get((req,res)=>{
    Feedback.find()
    .then(feedbacks=> res.json(feedbacks))
    .catch(err=>res.status(400).json('Error:'+err));

});

router.route('/add').post((req,res)=>{
    const guest=req.body.guest;
    const igabara=req.body.igabara;
    const packagename = req.body.packagename;
    const packagerate = req.body.packagerate;
    const food=req.body.food;
    const message=req.body.message;
    


    const newPackage=new Feedback({
        guest,
        igabara,
        packagename,
        packagerate,
        food,
        message,
    });

    newPackage.save()
    .then(()=>res.json('Package added!'))
    .catch(err=>res.status(400).json('Error:'+err));
});


    router.route('/:id').get((req,res)=>{
        Feedback.findById(req.params.id)
        .then(Package=>res.json(Package))
        .catch(err=>res.status(400).json('Error: '+err));
    });

    router.route('/:id').delete((req,res)=>{
        Feedback.findByIdAndDelete(req.params.id)
        .then(()=>res.json('Package deleted'))
        .catch(err=>res.status(400).json('Error: '+err));
    });


    
// Defined get data(index or listing) route
router.get('/getall', (req, res) => {
    Feedback.find({ igabara: 1 }, function (err, feedbacks) {
      if (err) {
        console.log(err);
      }
      else {
        res.json(feedbacks);
      }
    })
  });
  

  
module.exports = router;
