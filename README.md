## Cloudflare worker for fetching country boundries [geojson] using Alpha 2 country codes 


## Reference

#### Get country boundry

```http
  GET /api?country={country_code}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `country_code` | `string` | **Required**. Alpha2 Country Code based on [this list](https://www.iban.com/country-codes) |




## Successfull Response

```http
  GET /api?country=IN
```

```json
{
  "type":"Feature",
  "properties":
    {
      "name":"India"
    },
  "geometry":
    {
      "type":"Polygon",
      "coordinates": []
    },
  "id":"IN"
}
```

