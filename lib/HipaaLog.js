
HipaaLog = new Mongo.Collection("HipaaLog");

HipaaLog.allow({
  insert: function (userId, doc) {
    // we can only write to the audit log if we're logged in
    if (userId) {
      return true;
    } else {
      return false;
    }
  },
  update: function (userId, doc, fields, modifier) {
    // the audit log is write-only
    return false;
  },
  remove: function (userId, doc) {
    // the audit log is write-only
    return false;
  }
  // fetch: function(userId){
  //   return true;
  // }
});

