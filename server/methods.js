import { AuditEventSchema } from 'meteor/clinical:hl7-resource-audit-event'

Meteor.methods({
  logEvent: function(payload){
    check(payload, Object);

    var newAuditId;

    if(Package['clinical:hl7-resource-audit-event']){
      newAuditId = AuditEvents.insert(payload, function(error, result){
        if (error) {
          console.log("error", error);        
        }
      });
    } else {
      newAuditId = HipaaLog.insert(payload, function(error, result){
        if (error) {
          console.log("error", error);        
        }
      });  
    }

    if(process.env.DEBUG){
      console.log("Just logged an event: ", newAuditId);
    }
    return newAuditId;
  },
  logHipaaEvent:function(hipaaEvent){
    check(hipaaEvent, Object);

    if(process.env.TRACE){
      console.log("Received an event to log: ", hipaaEvent);
      console.log('Is valid AuditEvent:  ', AuditEventSchema.validate(hipaaEvent))      
    }

    var newAuditId;
    // is the official FHIR compliant infrastructure installed?
    if(AuditEventSchema.validate(hipaaEvent)){

      newAuditId = AuditEvents.insert(hipaaEvent, function(error, result){
        if (error) {
          console.log("error", error);        
        }
      });
    } else {
      hipaaEvent.timestamp = new Date();
      newAuditId = HipaaLog.insert(hipaaEvent, function(error, result){
        if (error) {
          console.log("error", error);        
        }
      });  
    }

    if(process.env.DEBUG){
      console.log("Just logged an event: ", newAuditId);
    }
    return newAuditId;
  }
})
