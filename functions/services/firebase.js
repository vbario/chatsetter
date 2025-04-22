const admin = require('firebase-admin')
admin.initializeApp()
let db = admin.database()

exports.db = db
