import { AuditEventSchema } from 'meteor/clinical:hl7-resource-audit-event'

Meteor.methods({
  logEvent: function(payload){
    check(payload, Object);

    process.env.DEBUG && console.log('HipaaLogger.logEvent()', payload)
    return Meteor.call('logHipaaEvent', payload)
  },
  logHipaaEvent:function(hipaaEvent){
    check(hipaaEvent, Object);

    if(process.env.DEBUG){
      console.log("Received an event to log: ", hipaaEvent);
    }

    // let auditEventValidator = AuditEventSchema.newContext();
    // auditEventValidator.validate(hipaaEvent)

    // is the official FHIR compliant infrastructure installed?
    // if(auditEventValidator.isValid() === false){
      var newAuditEvent = { 
        "resourceType" : "AuditEvent",
        "type" : { 
          'code': hipaaEvent.collectionName,
          'display': hipaaEvent.collectionName
         }, 
        "action" : "System Initialization", 
        "recorded" : new Date(), 
        "outcome" : "Success", 
        "outcomeDesc" : "System Initialized", 
        "agent" : [{ 
          "altId" : hipaaEvent.userId, 
          "name" : hipaaEvent.userName, 
          "requestor" : false
        }],
        "source" : { 
          "site" : hipaaEvent.collectionName,
          "identifier": {
            "value": Meteor.absoluteUrl(),

          }
        },
        "entity": [{
          "reference": {
            "reference": hipaaEvent.recordId
          }
        }]
      }
    // } 

    if(hipaaEvent.eventType){
      newAuditEvent.action = hipaaEvent.eventType;
    }
    if(hipaaEvent.outcome){
      newAuditEvent.outcome = hipaaEvent.outcome;
    }
    if(hipaaEvent.outcomeDesc){
      newAuditEvent.outcomeDesc = hipaaEvent.outcomeDesc;
    }

    // console.log('IsValid: ', auditEventValidator.isValid())
    // console.log('ValidationErrors: ', auditEventValidator.validationErrors());

    let newAuditId = false;
    newAuditId = Meteor.call('logAuditEvent', newAuditEvent)

    if(process.env.DEBUG){
      console.log("Just logged an event: ", newAuditId);
    }
    return newAuditId;
  },
  logAuditEvent:function(fhirAuditEvent){
    check(fhirAuditEvent, Object);

    if(process.env.DEBUG){
      console.log("Logging a FHIR Audit Event: ", fhirAuditEvent);
    }

    let newAuditId = false;

    let auditEventValidator = AuditEventSchema.newContext();
    auditEventValidator.validate(fhirAuditEvent)

    console.log('IsValid: ', auditEventValidator.isValid())
    console.log('ValidationErrors: ', auditEventValidator.validationErrors());

    if(auditEventValidator.isValid()){
      newAuditId = AuditEvents.insert(fhirAuditEvent, function(error, result){
        if (error) {
          console.log("error", error);        
        }
      });  
    }

    return newAuditId;
  }  
})
