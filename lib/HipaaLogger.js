/*
var hipaaEvent = {
  eventType: "",
  userId: "",
  userName: "",
  collectionName: "",
  recordId: "",
  patientId: "",
  patientName: "",
  message: ""
};
*/


HipaaLogger = {

  /**
  * @summary Detects if a specific environment variable was exposed from the server.
  * @locus Client
  * @memberOf HipaaLogger
  * @name logEvent
  * @param hipaaEvent.eventType
  * @param hipaaEvent.userId
  * @param hipaaEvent.userName
  * @param hipaaEvent.collectionName
  * @param hipaaEvent.recordId
  * @param hipaaEvent.patientId
  * @param hipaaEvent.patientName
  * @param hipaaEvent.message
  * @version 1.2.3
  * @example
  * ```js
  * var hipaaEvent = {
  *   eventType: "modified",
  *   userId: Meteor.userId(),
  *   userName: Meteor.user().profile.fullName,
  *   collectionName: "Medications",
  *   recordId: Random.id(),
  *   patientId: Session.get('currentPatientId'),
  *   patientName: Session.get('currentPatientName')
  * };
  * HipaaLogger.logEvent(hipaaEvent);
  * ```
  */
  logEvent: function(hipaaEvent, userId, userName, collectionName, recordId, patientId, patientName, message){
    //console.log('logEvent', eventType, userId, userName, collectionName, recordId, patientId, patientName, message);

    var newHipaaRecord = {};
    var hipaaRecordId = null;

    if( typeof hipaaEvent === 'object'){
      newHipaaRecord = hipaaEvent;
    }else{
      newHipaaRecord.eventType = hipaaEvent;
    }

    //if(Meteor.isServer){
      newHipaaRecord.timestamp = new Date();
    //}

    if(userId){
      newHipaaRecord.userId = userId;
    }
    if(userName){
      newHipaaRecord.userName = userName;
    }
    if(recordId){
      newHipaaRecord.recordId = recordId;
    }
    if(collectionName){
      newHipaaRecord.collectionName = collectionName;
    }
    if(message){
      newHipaaRecord.message = message;
    }
    if(patientId){
      newHipaaRecord.patientId = patientId;
    }
    if(patientName){
      newHipaaRecord.patientName = patientName;
    }

    return Meteor.call("logEvent", newHipaaRecord, function (error, result){
      if (error){
        console.log("error", error);
      }
      if (result){
         return result
      }
    });
  }
};
