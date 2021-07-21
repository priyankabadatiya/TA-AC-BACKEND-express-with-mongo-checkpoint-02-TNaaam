var express = require('express');
var router = express.Router();
var Event = require('../models/event');
var Remark = require('../models/remark');
var { dateFormate } = require('../public')

router.get('/', (req, res, next) => {
    Event.find({}, (err, data) => {
        if (err) return next(err)
        console.log(data)

        res.render('AllEvents', { data, dateFormate })
    });

})

router.get('/new', (req, res, next) => {
    res.render('createEvent')
});

//create event
router.post('/new', (req, res, next) => {
    console.log(req.body)
    Event.create(req.body, (err, events) => {
        if (err) next(err);
        res.redirect('/events')
    })
});

router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    console.log(id)
    Event.findById(req.params.id)
    .populate("remarks")
    .exec((err, content) => {
        console.log(content)
      if (err) return next(err);
      res.render("detail", { data: content, public: dateFormate  });
    });

});


// get event edit
router.get('/:id/edit', (req, res, next) => {
    let id = req.params.id;
    Event.findById(id, (err, event) => {
        if (err) next(err);
        res.render('eventEditForm', { event: event })
    })
});


//update event
router.post('/:id/edit', (req, res, next) => {
    let id = req.params.id;
    req.body.categories = req.body.categories.trim().split(" ");
    Event.findByIdAndUpdate(id, req.body, (err, event) => {
        if (err) return next(err);
        res.redirect('/events/' + id);
    })
});

//delete event 
router.get('/:id/delete', (req, res, next) => {
    let id = req.params.id;
    Event.findByIdAndDelete(id, (err, event) => {
        if (err) return next(err);
        Remark.deleteMany({ eventId: id }, (err, remarks) => {
            if (err) return next(err);
            res.redirect('/events');
        })
    })
});

// increment

router.get('/:id/likes', (req, res, next) => {
    let id = req.params.id;
    console.log(req);
    Event.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, updatedEvent) => {
        res.redirect('/events/' + id);
    })
});

//decrement
router.get('/:id/dislikes', (req, res, next) => {
    let id = req.params.id;
    console.log(req);
    Event.findByIdAndUpdate(id, { $inc: { likes: -1 } }, (err, updatedEvent) => {
        res.redirect('/events/' + id);
    })
});

// create comment

router.post('/:id/remarks', (req, res, next)=> {
    req.body.events = req.params.id;
console.log(req.body)
    Remark.create(req.body, (err, comment)=> {
        if(err) return next(err)
        Event.findByIdAndUpdate(
            req.params.id,
            { $push: { remarks: comment._id } },
            (err, updateComment) => {
              if (err) return next(err);
              res.redirect("/events/" + req.params.id);
            }
        )
    })
})








module.exports = router;