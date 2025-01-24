const paypal = require('paypal-rest-sdk');

paypal.configure({
    mode: 'sandbox', //sandbox or live
    client_id: "AXl4EDKfKOsiDIaEuMZAvSwLn6Wjkz4VcvGZLbz-rDB587K1RWhpIvt-DAtZSmeGEGPM2MDrAyXs9PK6",
    client_secret: "EJYvubwx2JAyUFEX3ZZrH4JsB-09HGn55V_67TCGlrgTiqwwINazlsGH3oZmiNSx3F0JwqVeTLSrAJZw"

})

module.exports = paypal;