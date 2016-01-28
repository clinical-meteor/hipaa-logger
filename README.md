clinical:hipaa-logger
====================================================

Write HIPAA events to a logging collection.  No UI provided.

====================================================
#### Installation

````
meteor add clinical:hipaa-logger
````


====================================================
#### Architecture

The ``clinical:hipaa-logger`` package is responsible for creating the ``HipaaLog`` collection, and writing entries to it. If you wish to display contents of the audit log, use the [``clinical:hipaa-audit-log``](https://github.com/clinical-meteor/clinical-hipaa-audit-log) package, and either add the ``{{> hipaaAuditLog}}`` template to your app, or connect a secondary app to the HipaaLog collection.  


![HipaaLog Architecture](https://raw.githubusercontent.com/clinical-meteor/hipaa-logger/master/docs/HIPAA%20Audit%20Log%20-%20Utility%20Configuration%20-%20Page%204.png)


====================================================
#### Basic Example

The HipaaLogger object accepts a HipaaEvent object
````js
var hipaaEvent = {
  eventType: "modify",
  userId: Meteor.userId(),
  userName: Meteor.user().profile.fullName,
  collectionName: "Medications",
  recordId: Random.id(),
  patientId: Session.get('currentPatientId'),
  patientName: Session.get('currentPatientName')
};
HipaaLogger.logEvent(hipaaEvent);
````

====================================================
#### HipaaLog.HipaaEvent.EventType

The following event types are recognized:

````
init
access
create
modify
clone
delete
denied
viewed
publish
unpublish
````

====================================================
#### Callback Example

In typical situations, HIPAA events will occur as parts of other functions, usually related to adding, viewing, or removing data.  Attaching the HipaaLoger to callbacks and hooks is a best practice.

````js
Template.samplePage.events({
  'click #saveButton': function (evt, tmpl) {
    var self = this;

    Vitals.update({_id: this._id},{$set:{
      stared: true
    }}, function(error, result){
      if(error){
        HipaaLogger.logEvent("error", Meteor.userId(), Meteor.user().profile.fullName, "Vitals", null, null, null, error);
      }
      if(result){
        HipaaLogger.logEvent("create", Meteor.userId(), Meteor.user().profile.fullName, "Vitals", null, null, null, null);
      }
    });
  }
});
````




===========================
#### Licensing  

![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)
