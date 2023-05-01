const supabase = require('../helpers/database')
const { newPromise } = require('../helpers/promise')
const Pusher = require("pusher");
require('dotenv').config()

const pusher = new Pusher({
    appId: process.env.PUSHER_APPID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: "ap1",
    useTLS: true
});

class Monopoli {
    getAllData(req, res) {
        if(supabase == null)
            return res.send('cannot connect to database')
        const selectAllDataFromDB = async () => {
            // ambil semua data dari supabase
            const {data, error} = await supabase.from('test').select()
            if(error)
                return console.log(error);
            return {data: data, error: error}
        }
        newPromise(req, res, selectAllDataFromDB)
    }

    pusherTrigger(req, res) {
        pusher.trigger("monopoli-back", "monopoli-front", {
            message: req.body.message
        });
        return res.status(200).json({
            status: 200,
            message: 'success'
        })
    }
}

module.exports = Monopoli