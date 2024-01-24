const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('Give Note As Arg')
    process.exit(1)
}

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

const note = new Note({
    content: content,
    important: Math.random() < 0.5,
})

note.save().then(result => {
    console.log(result)
    console.log('Note Saved!')
    mongoose.connection.close()
})