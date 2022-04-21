# Vinyl Documentation

## Endpoints:

list of available endpoint :

- `POST users/register`
- `POST users/login`
- `GET albums/`
- `GET albums/mycart`
- `PATCH albums/mycart`
- `GET albums/:id`
- `POST albums/:id`

## 1. POST users/register

description: registering an account and role will be admin automatically.

-body: `x-www-form-urlencoded`
`body`
```json
{
    "name": "string",
    "email": "email@email",
    "password": "secret",
}
```

condition when you success registering your account :

_Respone (201 - Created)_

```json
{
    "id": 1,
    "email": "testing@mail.com"
}
```

condition when body is empty :

_Response (400 - Bad Request)_

```json
    {

        "error": "Name is required"
    }
```

&nbsp;

## 2. POST users/login

description: logging in an account you has been made from register.

-body: `x-www-form-urlencoded`
`body`

```json
    {
        "email": "email@email.com",
        "password": "secret"
    }
```

condition when you success loggin in an account: 

_Respone (200 - ok)_

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0aW5nQG1haWwuY29tIiwiaWF0IjoxNjUwNDg5OTcyfQ.obQFvhlZIX__MnxFDRzNzNfkuvV-yr0SY0IZmpu9XNM",
    "id": 1,
    "email": "testing@mail.com"
}
```

_Respone (401 - Unauthorized)_

condition if email or password incorrect:

```json
{
    "statusCode": 401,
    "message": "ERROR Invalid email or password"
}
```

&nbsp;

## 3. GET albums/

description: get all albums from database.

_Respone (200 - ok)_

```json
[
    {
        "id": 1,
        "name": "Continuum",
        "artist": "John Mayer",
        "price": 100000,
        "SpotifyUUID": "1Xsprdt1q9rOzTic7b9zYM",
        "ImageUrl": "https://i.scdn.co/image/ab67616d0000b2737af5fdc5ef048a68db62b85f",
        "genre": "Pop"
    },
    {
        "id": 2,
        "name": "Everything Will Be Alright In The End",
        "artist": "Weezer",
        "price": 80000,
        "SpotifyUUID": "5bwoCpDhski3iIxwsdgPTM",
        "ImageUrl": "https://i.scdn.co/image/ab67616d0000b273e7d13eb0e3c1032e4f8dfc93",
        "genre": "Alternative"
    },
.....
]
```