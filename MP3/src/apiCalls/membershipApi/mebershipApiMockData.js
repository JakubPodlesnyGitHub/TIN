export const clientsList = [
    {
        "IdClient": 1,
        "FirstName": "Jakub",
        "LastName": "Matczak",
        "PostCode": "02-465",
        "Phone": "555222333",
        "clients": {
            "IdClient": 1,
            "FirstName": "Jakub",
            "LastName": "Matczak",
            "PostCode": "02-465",
            "PhoneNumber": "555222333"
        }
    },
    {
        "IdClient": 2,
        "FirstName": "Michał",
        "LastName": "Polak",
        "PostCode": "06-897",
        "Phone": "668455789",
        "clients": {
            "IdClient": 2,
            "FirstName": "Michał",
            "LastName": "Polak",
            "PostCode": "06-897",
            "PhoneNumber": "668455789"
        }
    },
    {
        "IdClient": 3,
        "FirstName": "Mateusz",
        "LastName": "Romaniuk",
        "PostCode": "03-968",
        "Phone": "654897235",
        "clients": {
            "IdClient": 3,
            "FirstName": "Mateusz",
            "LastName": "Romaniuk",
            "PostCode": "03-968",
            "PhoneNumber": "654897235"
        }
    }
]

export const clientsDetailsList = [
    {
        "IdClient": 1,
        "FirstName": "Jakub",
        "LastName": "Matczak",
        "PostCode": "02-465",
        "Phone": "555222333",
        "order": [
            {
                "IdOrder": 1,
                "OrderCode": '1111',
                "OrderDate": '2020-12-12',
                "DeliveryCost": '200.00'
            }
        ]
    },
    {
        "IdClient": 2,
        "FirstName": "Michał",
        "LastName": "Polak",
        "PostCode": "06-897",
        "Phone": "668455789",
        "order": [
            {
                "IdOrder": 2,
                "OrderCode": '2222',
                "OrderDate": '2020-06-12',
                "DeliveryCost": '50.00'
            }
        ]
    },
    {
        "IdClient": 3,
        "FirstName": "Mateusz",
        "LastName": "Romaniuk",
        "PostCode": "03-968",
        "Phone": "654897235",
        "order": [
            {
                "IdOrder": 3,
                "OrderCode": '3333',
                "OrderDate": '2020-11-10',
                "DeliveryCost": '100.00'
            }
        ]
    }
]