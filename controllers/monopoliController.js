const { response } = require('express')
const supabase = require('../helpers/database')
const { newPromise } = require('../helpers/promise')
require('dotenv').config()
// pubnub config
const { v4: uuidv4 } = require('uuid')
const PubNub = require('pubnub')
const pubnub = new PubNub({
    subscribeKey: process.env.PUBNUB_SUBSCRIBE_KEY,
    publishKey: process.env.PUBNUB_PUBLISH_KEY,
    userId: uuidv4()
})

class Monopoli {
    getAllData(req, res) {
        if(supabase == null)
            return res.send('cannot connect to database')
        const selectAllDataFromDB = async () => {
            // ambil semua data dari supabase
            const {data, error} = await supabase.from('test').select()
            if(error) {
                return res.status(500).json({
                    status: 500,
                    message: 'failed',
                    data: error
                })
            }
            return {data: data, error: error}
        }
        newPromise(selectAllDataFromDB)
        .then(data => {
            return res.status(200).json({
                status: 200,
                message: 'success',
                data: data
            })
        }).catch(err => {
            return res.status(500).json({
                status: 500,
                message: 'failed',
                data: err
            })
        })
    }

    realtimeTrigger(req, res) {
        pubnub.publish({
            channel: 'test_channel',
            message: "hello world"
        }, function (status, response) {
            // console.log(status);
            // console.log(response);
        })
        pubnub.subscribe({
            channels: ['test_channel']
        })
        res.status(200).json({
            status: 200,
            message: 'success'
        })
    }
}

module.exports = Monopoli