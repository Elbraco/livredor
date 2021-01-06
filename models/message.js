let connection = require('../config/db')
let moment = require('../config/moment')
class Message {

    constructor(row) {
        this.row = row
    }

    get content() {
        return this.row.content
    }

    get created_at() {
        return moment(this.row.created_at)
    }

    static create(content, callback) {

        connection.query('INSERT INTO messages SET content = ?, created_at = ?', [content, new Date()], (err, result) => {
            if (err)  throw err

            callback(result)
        })
    }

    static all(callback) {
        connection.query('SELECT * FROM messages', (err, rows) => {
            if(err) throw err

            callback(rows.map((row) => new Message(row)))
        })
    }
}

module.exports = Message