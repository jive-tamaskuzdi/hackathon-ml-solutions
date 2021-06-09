
var express = require('express');
var router = express.Router();
var { stats } = require('./statistics');

router.get('/:meetingid', function (req, res, next) {
  const meeting = stats.meetings[req.params.meetingid];
  const { from, to } = req.query;
  const fromDate = from && Date.parse(from);
  const toDate = to && Date.parse(to);

  if (!meeting) {
    res.sendStatus(404);
    return;
  }

  const result = Object.keys(meeting).reduce((a,participantId)=>{
    const changes = meeting[participantId].filter((emotion) => {
      const emotionDate = Date.parse(emotion.timestamp);
      return (!fromDate || fromDate <= emotionDate) &&
        (!toDate || emotionDate <= toDate);
    });

    if (changes.length > 0) {
      a.push({
        participantId,
        changes,
      });
    }

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

router.delete('/:meetingid', function (req, res, next) {
  const { meetingid } = req.params;
  
  if (stats.meetings[meetingid]) {
    delete stats.meetings[meetingid];
  }
  
  res.status(200);
  res.send();
});


module.exports = router;
