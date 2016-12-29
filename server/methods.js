

Meteor.methods({
  logEvent: function(payload){
    check(payload, Object);

    return HipaaLog.insert(payload, function(error, result){
      if (error) {
        console.log("error", error);        
      }
    });
  },
  logHipaaEvent:function(hipaaEvent){
    check(hipaaEvent, Object);

    hipaaEvent.timestamp = new Date();

    var hipaaRecordId = HipaaLog.insert(hipaaEvent);
    if(process.env.DEBUG){
      console.log("hipaaRecordId", hipaaRecordId);
    }
    return hipaaRecordId;
  }
})
