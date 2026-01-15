-- SET session_replication_role = replica;

CREATE TABLE IF NOT EXISTS roles(
	id UUID PRIMARY KEY NOT NULL DEFAULT uuidv7(),
	name VARCHAR(35) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS permissions(
	id UUID PRIMARY KEY NOT NULL DEFAULT uuidv7(),
	name VARCHAR(35) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS roles_permissions(
	id UUID PRIMARY KEY NOT NULL DEFAULT uuidv7(),
	roles_id UUID,
	permissions_id UUID,
	FOREIGN KEY (roles_id) REFERENCES roles(id),
	FOREIGN KEY (permissions_id) REFERENCES permissions(id)
);

CREATE TABLE IF NOT EXISTS categories(
	id UUID PRIMARY KEY NOT NULL DEFAULT uuidv7(),
	name VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS categories_treepaths(
	ancestor_id UUID,
	descendant_id UUID,
	PRIMARY KEY (ancestor_id, descendant_id),
	FOREIGN KEY (ancestor_id) REFERENCES categories(id),
	FOREIGN KEY (descendant_id) REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS products(
	id UUID PRIMARY KEY NOT NULL DEFAULT uuidv7(),
	sku VARCHAR(12) UNIQUE NOT NULL,
	name VARCHAR(255) NOT NULL,
	description VARCHAR(1000) NULL,
	status SMALLINT NOT NULL,
	created_at DATE NOT NULL DEFAULT CURRENT_DATE,
	archived_at DATE NULL DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS products_categories(
	products_id UUID,
	categories_id UUID,
	PRIMARY KEY (products_id, categories_id),
	FOREIGN KEY (products_id) REFERENCES products(id),
	FOREIGN KEY (categories_id) REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS products_prices(
	id UUID PRIMARY KEY NOT NULL DEFAULT uuidv7(),
	products_id UUID,
	cost_price DECIMAL(10,2) NOT NULL,
	date_cost_price DATE NOT NULL,
	retail_price DECIMAL(10,2) NOT NULL,
	date_retail_price DATE NOT NULL,
	FOREIGN KEY (products_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS addresses(
	id UUID PRIMARY KEY NOT NULL DEFAULT uuidv7(),
	street_num VARCHAR(8) NOT NULL,
	street_name VARCHAR(80) NOT NULL,
	street_name_2 VARCHAR(80) NULL,
	postal_zip CHAR(5) NOT NULL,
	city VARCHAR(25) NOT NULL,
	region VARCHAR(35) NOT NULL
);

CREATE TABLE IF NOT EXISTS stores(
	id UUID PRIMARY KEY NOT NULL DEFAULT uuidv7(),
	name VARCHAR(55) NOT NULL,
	addresses_id UUID,
	timezone CHAR(3) NOT NULL DEFAULT 'PKT',
	opening_hours TIME NOT NULL DEFAULT make_time(9,0,0),
	closing_hours TIME NOT NULL DEFAULT make_time(17,0,0),
	FOREIGN KEY (addresses_id) REFERENCES addresses(id)
);

CREATE TABLE IF NOT EXISTS stores_renovations(
	id UUID PRIMARY KEY NOT NULL DEFAULT uuidv7(),
	stores_id UUID,
	date DATE NOT NULL,
	is_closed BOOLEAN NOT NULL,
	FOREIGN KEY (stores_id) REFERENCES stores(id)
);

CREATE TABLE IF NOT EXISTS employees(
	id UUID PRIMARY KEY NOT NULL DEFAULT uuidv7(),
	name VARCHAR(35) NOT NULL,
	date_hire DATE NOT NULL,
	date_termination DATE NULL
);

CREATE TABLE IF NOT EXISTS employees_roles(
	id UUID PRIMARY KEY NOT NULL DEFAULT uuidv7(),
	store_id UUID,
	employee_id UUID,
	role_id UUID,
	FOREIGN KEY (store_id) REFERENCES stores(id),
	FOREIGN KEY (employee_id) REFERENCES employees(id),
	FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE IF NOT EXISTS customers(
	id UUID PRIMARY KEY NOT NULL,
	first_name VARCHAR(35) NOT NULL,
	last_name VARCHAR(35) NULL,
	email VARCHAR(55) UNIQUE NOT NULL,
	date_membership_start DATE NULL,
	status SMALLINT NOT NULL
);

CREATE TABLE IF NOT EXISTS sales(
	id UUID PRIMARY KEY NOT NULL DEFAULT uuidv7(),
	stores_id UUID,
	employees_id UUID DEFAULT NULL,
	customers_id UUID DEFAULT NULL,
	FOREIGN KEY (stores_id) REFERENCES stores(id),
	FOREIGN KEY (employees_id) REFERENCES employees(id),
	FOREIGN KEY (customers_id) REFERENCES customers(id),
	total DECIMAL(10,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS products_sales(
	id UUID PRIMARY KEY NOT NULL DEFAULT uuidv7(),
	sales_id UUID,
	products_price_id UUID,
	FOREIGN KEY (sales_id) REFERENCES sales(id),
	FOREIGN KEY (products_price_id) REFERENCES products_prices(id)
);

CREATE TABLE IF NOT EXISTS returns(
	id UUID PRIMARY KEY NOT NULL DEFAULT uuidv7(),
	stores_id UUID,
	sales_id UUID,
	FOREIGN KEY (stores_id) REFERENCES stores(id),
	FOREIGN KEY (sales_id) REFERENCES sales(id)
);

CREATE TABLE IF NOT EXISTS returns_products(
	id UUID PRIMARY KEY NOT NULL DEFAULT uuidv7(),
	returns_id UUID,
	products_price_id UUID,
	FOREIGN KEY (returns_id) REFERENCES returns(id),
	FOREIGN KEY (products_price_id) REFERENCES products_prices(id)
);

CREATE TABLE IF NOT EXISTS inventories_transactions(
	id UUID PRIMARY KEY NOT NULL DEFAULT uuidv7(),
	stores_id UUID,
	products_id UUID,
	sales_id UUID DEFAULT NULL,
	returns_id UUID DEFAULT NULL,
	-- adjustments_id UUID,
	reason VARCHAR(510) DEFAULT NULL,
	timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	qty_change BOOLEAN NOT NULL,
	employees_id UUID DEFAULT NULL,
	customers_id UUID DEFAULT NULL,
	FOREIGN KEY (employees_id) REFERENCES employees(id),
	FOREIGN KEY (customers_id) REFERENCES customers(id),
	FOREIGN KEY (stores_id) REFERENCES stores(id),
	FOREIGN KEY (products_id) REFERENCES products(id),
	FOREIGN KEY (sales_id) REFERENCES sales(id),
	FOREIGN KEY (returns_id) REFERENCES returns(id)
	-- FOREIGN KEY (adjustments_id) REFERENCES products_adjustments(id)
);

-- SET session_replication_role = origin;