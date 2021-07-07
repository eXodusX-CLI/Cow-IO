let vultr = {"scheme":"mm_prod","servers":[
    {
        "ip":"2ee2eba39ad0700366ccb1dfe79d0643",
        "scheme":"mm_prod",
        "region":"vultr:12",
        "index":0,
        "games":[{
            "playerCount":0,
            "isPrivate":false
        }]
    },{
        "ip":"a25sq75d8fdq30pmf5ds4q2e14d30de4",
        "scheme":"mm_prod",
        "region":"vultr:12",
        "index":1,
        "games":[{
            "playerCount":0,
            "isPrivate":false
        }]
    }
]};
try {
    window.vultr = vultr
} catch {
    module.exports = { vultr }
}