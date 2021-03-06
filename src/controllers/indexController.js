const mercadopago=require("mercadopago");

mercadopago.configure({
    access_token : 'APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398',
    integrator_id : 'dev_24c65fb163bf11ea96500242ac130004'
});

module.exports = {
    home: (req, res) => {
        return res.render("index");
    },
    detail: (req, res) => {
        return res.render("detail", { ...req.query });
    },
    callback : (req, res) => {
        console.log(req.query)

        if(req.query.status.includes('success')) {
            return res.render('success')
        }

        if(req.query.status.includes('pending')) {
            return res.render('pending')
        }

        if(req.query.status.includes('failure')) {
            return res.render('failure')
        }
        //res.render()
        return res.status(400).end()
    },
    notifications : (req, res) => {
        console.log(req.body)

        res.status(200).end('Ok')
    },
    comprar : (req, res) => {
        const url = 'http://localhost:3000/';
        const url = host + 'callback?status=';
        /*let item = {
            id : 1,
            title : '',
            price : '',
            description: '',
            unit_price: ''
        }*/

        let preference = {
            back_urls : {
                success : url + 'success',
                pending : url + 'pending',
                failure : url + 'failure'
            },
            notification_url : host + 'notifications',
            auto_return : 'approved',
            payer : {
                name : 'Ryan',
                surname : 'Dahl',
                email : 'test_user_63274575@testuser.com',
                phone : {
                    aea_code : '11',
                    number : 55556666,
                },
                address : {
                    zip_code : '1234',
                    street_name : 'Monroe',
                    street_number : 860
                }

            },
            payment_methods : {
                excluded_payment_methods : [{
                    id : 'visa',
                }],
                excluded_payment_types : [{
                    id : 'atm',
                }],
                installments : 12
            },
            items : [
                {
                    id : 1234,
                    //picture_url : '',
                    title : 'Nombre del producto',
                    //price : '',
                    description: 'Dispositivo móvil de Tienda e-commerce',
                    unit_price: 999,
                    quantity: 1
                }
            ] ,

            external_reference : 'info@alezvi.com.ar',
        }

        mercadopago.preferences.create(preference).then(response => {
            global.init_point = response.body.init_point;
            //global.id = response.body.id
            res.render('confirm');
            //console.log(response)
            //res.send('ok')
        }).catch(error => {
            console.log(error);
            res.send('error');
        })

        //res.send('ok')
    }
}