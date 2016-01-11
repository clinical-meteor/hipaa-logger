

Meteor.methods({
  logEvent: function(payload){
    // console.log('payload', payload);
    return HipaaLog.insert(payload);
  },
  logHipaaEvent:function(hipaaEvent){
    // console.log('logEventObject', hipaaEvent);
    hipaaEvent.timestamp = new Date();

    var hipaaRecordId = HipaaLog.insert(hipaaEvent);
    if(process.env.DEBUG){
      console.log("hipaaRecordId", hipaaRecordId);
    }
    return hipaaRecordId;
  }
})
