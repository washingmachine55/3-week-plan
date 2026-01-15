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

# create new category
```json
{
	"name": "Foldable"
}
```

# create new sale and add its product prices 
```json
{
	"sale_info": {
		"stores_id": "019bbcee-a96c-7b4f-a0f9-e83e9003b244",
		"total": "2499.59"
	},
	"sale_details": [
		{
			"products_price_id": "019bbcee-2bd3-7879-9bd3-fe0a9bae64b9"
		},
		{
			"products_price_id": "019bbcf2-d528-7050-af09-3ffac0224a21"
		}
	]
}
```

# create new employee
```json
{
	"employee_info": {
		"name": "mama"
	}
}
```

# create new inventory transaction
```json
{
	"inventories_info": {
		"stores_id": "019bbe9e-3377-7aba-9060-2f136e50b1aa",
		"products_id": "019bbcf2-d501-7a4a-9da7-094048ccd325",
		"sales_id": null,
		"returns_id": null,
		"reason": 13,
		"timestamp": "2025-01-15T06:15:00.123456Z",
		"qty_change": "Y",
		"employees_id": null,
		"customers_id": null
	}
}
```