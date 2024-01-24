const mongoose = require('mongoose')

const content = process.argv[2]
const credentials = "C:\\Users\\luker\\certs\\X509-cert-1792333537585229907.pem"
const url = 'mongodb+srv://cluster0.fleq8v1.mongodb.net/noteApp?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority';

mongoose.connect(url, {
  tls: true,
  tlsCertificateKeyFile: credentials,
  authMechanism: 'MONGODB-X509',
  authSource: '$external',
});

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

Note.find({ }).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close() 
})