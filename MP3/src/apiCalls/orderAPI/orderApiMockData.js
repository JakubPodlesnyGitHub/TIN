export const ordersList = [
    {
        "IdOrder": 1,
        "OrderCode": 1111,
        "IdClient": 1,
        "OrderDate": "2020-12-12T00:00:00.000Z",
        "DeliveryCost": "200.00",
    },
    {
        "IdOrder": 2,
        "OrderCode": 2222,
        "IdClient": 2,
        "OrderDate": "2020-06-12T00:00:00.000Z",
        "DeliveryCost": "50.00",

    },
    {
        "IdOrder": 3,
        "OrderCode": 3333,
        "IdClient": 3,
        "OrderDate": "2020-11-10T00:00:00.000Z",
        "DeliveryCost": "100.00",
    }
]

export const orderDetailsList = [
    {
        "IdOrder": 1,
        "OrderCode": 1111,
        "IdClient": 1,
        "OrderDate": "2020-12-12T00:00:00.000Z",
        "DeliveryCost": "200.00",
        "Stores": [
            {
                "IdStore": 1,
                "IdOrder": 1,
                "IdMovie": 1,
                "Cost": "100.00",
                "Amount": 2,
                "Movies": {
                    "IdMovie": 1,
                    "Title": "Władca Pierścieni",
                    "MovieType": "Fantasy",
                    "Director": "Peter Jackson",
                    "Rate": 9,
                    "ReleaseDate": "2002-02-18T00:00:00.000Z",
                    "Oscar": true,
                    "Price": "50.00",
                    "MovieLength": 152,
                }
            }
        ],
        "clients": {
            "IdClient": 1,
            "FirstName": "Jakub",
            "LastName": "Matczak",
            "PostCode": "02-465",
            "PhoneNumber": "555222333"
        }
    },
    {
        "IdOrder": 2,
        "OrderCode": 2222,
        "IdClient": 2,
        "OrderDate": "2020-06-12T00:00:00.000Z",
        "DeliveryCost": "50.00",
        "Stores": [
            {
                "IdStore": 2,
                "IdOrder": 2,
                "IdMovie": 2,
                "Cost": "70.00",
                "Amount": 1,
                "Movies": {
                    "IdMovie": 2,
                    "Title": "Harry Potter",
                    "MovieType": "Fantasy",
                    "Director": "Chris Columbus",
                    "Rate": 8,
                    "ReleaseDate": "2001-01-17T00:00:00.000Z",
                    "Oscar": false,
                    "Price": "40.00",
                    "MovieLength": 116
                }
            },
            {
                "IdStore": 3,
                "IdOrder": 2,
                "IdMovie": 5,
                "Cost": "70.00",
                "Amount": 1,
                "Movies": {
                    "IdMovie": 5,
                    "Title": "Pewnego razu... w Hollywood",
                    "MovieType": "Komediodramat",
                    "Director": "Quentin Tarantino",
                    "Rate": 7,
                    "ReleaseDate": "2006-07-20T00:00:00.000Z",
                    "Oscar": true,
                    "Price": "70.00",
                    "MovieLength": 143
                }
            },
            {
                "IdStore": 4,
                "IdOrder": 2,
                "IdMovie": 4,
                "Cost": "70.00",
                "Amount": 1,
                "Movies": {
                    "IdMovie": 4,
                    "Title": "Piękny umysł",
                    "MovieType": "Biograficzny",
                    "Director": "Ron Howard",
                    "Rate": 7,
                    "ReleaseDate": "2006-04-16T00:00:00.000Z",
                    "Oscar": true,
                    "Price": "70.00",
                    "MovieLength": 152
                }
            },
            {
                "IdStore": 5,
                "IdOrder": 2,
                "IdMovie": 3,
                "Cost": "70.00",
                "Amount": 1,
                "Movies": {
                    "IdMovie": 3,
                    "Title": "Dwóch papieży",
                    "MovieType": "Fabularny",
                    "Director": "Fernando Meirelles",
                    "Rate": 7,
                    "ReleaseDate": "2019-06-24T00:00:00.000Z",
                    "Oscar": true,
                    "Price": "60.00",
                    "MovieLength": 112
                }
            }
        ],
        "clients": {
            "IdClient": 2,
            "FirstName": "Michał",
            "LastName": "Polak",
            "PostCode": "06-897",
            "PhoneNumber": "668455789"
        }
    }


]