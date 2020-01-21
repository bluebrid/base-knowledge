const redis = require('redis')
const CONF = { db: 0 }
var pub, sub
//.: Activate "notify-keyspace-events" for expired type events
pub = redis.createClient(CONF)
pub.send_command('config', ['set', 'notify-keyspace-events', 'KEx$ls'], SubscribeExpired)
//.: Subscribe to the "notify-keyspace-events" channel used for expired type events
function SubscribeExpired(e, r) {
    sub = redis.createClient(CONF)
    const expired_subKey = '__keyevent@' + CONF.db + '__:expired' // expired, set, hash
    const set_subKey = '__keyevent@' + CONF.db + '__:set' // expired, set, hash
    sub.subscribe(expired_subKey, function () {
        console.log(' [i] Subscribed to "' + expired_subKey + '" event channel : ' + r)
        sub.on('message', function (chan, msg) { 
            console.log(`[${chan}]`, msg)
         })
        TestKey()
    })

    sub.subscribe(set_subKey, function () {
        console.log(' [i] Subscribed to "' + set_subKey + '" event channel : ' + r)
        sub.on('message', function (chan, msg) { 
            console.log(`[${chan}]`, msg)
         })
        TestKey()
    })
}
//.: For example (create a key & set to expire in 10 seconds)
function TestKey() {
    pub.set('testing', 'redis notify-keyspace-events : expired')
    pub.expire('testing', 10)
}