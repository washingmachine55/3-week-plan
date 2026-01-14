# Create new store and address
```json
{
	"store_info": {
		"name": "Al Teddy @ 5th Avenue",
		"timezone": "PKT",
		"opening_hours": "11:00:00",
		"closing_hours": "20:0:0"
	},
		"store_address": {
		"street_num": "1122",
		"street_name": "The monster 5423, 5th Left Avenue",
		"street_name_2": "dude regret person",
		"postal_zip": "69069",
		"city": "Lahore",
		"region": "Riyadh"
	}
}
```
# create new product (without price)

```json
{
	"product_info": {
		"sku": "SKU-42321",
		"name": "iPhone 14 Pro Max Ultra Airplane",
		"description": "the rich people thingies",
		"status": 1,
		"created_at": "NOW()",
		"archived_at": null
	}
}
```

# create new product (**WITH** price)

```json
{
	"product_info": {
		"sku": "S-4123",
		"name": "iPhone 14 Pro Max Ultra Airplane",
		"description": "the rich people thingies",
		"status": 1,
		"created_at": "NOW()",
		"archived_at": null
	},
	"products_price": {
		"cost_price": "827.53",
		"date_cost_price": "2024-05-28",
		"retail_price": "999.99",
		"date_retail_price": "NOW()"
	}
}
```
# create new role
```json
{
	"name": "ADMIN"
}
```

# create new permission(s)
```json
{
	"permissions": {
		"1": "CREATE SALES",
		"2": "READ SALES",
		"3": "UPDATE SALES",
		"4": "DELETE SALES"
	}
}
```