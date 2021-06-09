
var express = require('express');
var router = express.Router();
var { stats } = require('./statistics');

router.get('/:meetingid', function (req, res, next) {
  const meeting = stats.meetings[req.params.meetingid];

  const result = Object.keys(meeting).reduce((a,participantId)=>{
    a.push({
      participantId,
      changes: meeting[participantId]
    });
    return a;
  }, []);

  res.send(result);
});

router.post('/:meetingid/emotion', function (req, res, next) {
  const { meetingid } = req.params;
  const { participantId, emotion, timestamp } = req.body;

  if(!stats.meetings[meetingid]){
    stats.meetings[meetingid] = {}
  }

  if(!stats.meetings[meetingid][participantId]){
    stats.meetings[meetingid][participantId] = []
  }
  stats.meetings[meetingid][participantId].push({
    emotion,
    timestamp
  });

  res.status(201);
  res.send();
});


module.exports = router;
