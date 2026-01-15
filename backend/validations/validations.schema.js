import { z } from "zod";

/* =========================
	Core / Utility
========================= */

export const UUID = z.uuidv7().nullable().optional();
export const Money = z.number();

/* =========================
	Roles & Permissions
========================= */

export const RoleSchema = z.object({
	id: UUID,
	name: z.string().min(4).max(35),
});

export const PermissionSchema = z.object({
	id: UUID,
	name: z.string().min(4).max(35),
});

export const RolePermissionSchema = z.object({
	id: UUID,
	roles_id: UUID,
	permissions_id: UUID,
});

/* =========================
	Categories
========================= */

export const CategorySchema = z.object({
	id: UUID,
	name: z.string().max(20),
});

export const CategoryTreePathSchema = z.object({
	ancestor_id: UUID,
	descendant_id: UUID,
});

/* =========================
	Products
========================= */

export const ProductSchema = z.object({
	id: UUID,
	sku: z.string().max(12),
	name: z.string().max(255),
	description: z.string().max(1000).nullable().optional(),
	status: z.number().int(),
	created_at: z.iso.date(),
	archived_at: z.iso.date().nullable().optional(),
});

export const ProductCategorySchema = z.object({
	products_id: UUID,
	categories_id: UUID,
});

export const ProductPriceSchema = z.object({
	id: UUID,
	products_id: UUID,
	cost_price: Money,
	date_cost_price: z.iso.date(),
	retail_price: Money,
	date_retail_price: z.iso.date(),
});

/* =========================
	Addresses & Stores
========================= */

export const AddressSchema = z.object({
	id: UUID,
	street_num: z.string().max(8),
	street_name: z.string().max(80),
	street_name_2: z.string().max(80).nullable().optional(),
	postal_zip: z.string().length(5),
	city: z.string().max(25),
	region: z.string().max(35),
});

export const StoreSchema = z.object({
	id: UUID,
	name: z.string().min(4).max(55),
	addresses_id: UUID,
	timezone: z.string().length(3),
	opening_hours: z.iso.time(), // TIME → keep as string (HH:mm:ss)
	closing_hours: z.iso.time(),
});

export const StoreRenovationSchema = z.object({
	id: UUID,
	stores_id: UUID,
	date: z.iso.date(),
	is_closed: z.stringbool(),
});

/* =========================
	Employees
========================= */

export const EmployeeSchema = z.object({
	id: UUID,
	name: z.string().min(6).max(25),
	date_hire: z.iso.date(),
	date_termination: z.iso.date().nullable().optional(),
});

export const EmployeeRoleSchema = z.object({
	id: UUID,
	store_id: UUID,
	employee_id: UUID,
	role_id: UUID,
});

/* =========================
	Customers
========================= */

export const CustomerSchema = z.object({
	id: UUID,
	first_name: z.string().max(35),
	last_name: z.string().max(35).nullable().optional(),
	email: z.email().max(55),
	date_membership_start: z.iso.date().nullable().optional(),
	status: z.number().int(),
});

/* =========================
	Sales
========================= */

export const SaleSchema = z.object({
	id: UUID,
	stores_id: UUID,
	employees_id: UUID.nullable().optional(),
	customers_id: UUID.nullable().optional(),
	total: Money,
});

export const ProductSaleSchema = z.object({
	id: UUID,
	sales_id: UUID,
	products_price_id: UUID,
});

/* =========================
	Returns
========================= */

export const ReturnSchema = z.object({
	id: UUID,
	stores_id: UUID,
	sales_id: UUID,
});

export const ReturnProductSchema = z.object({
	id: UUID,
	returns_id: UUID,
	products_price_id: UUID,
});

/* =========================
	Inventory Transactions
========================= */

export const InventoryTransactionSchema = z.object({
	id: UUID,
	stores_id: UUID,
	products_id: UUID,
	sales_id: UUID.nullable().optional(),
	returns_id: UUID.nullable().optional(),
	reason: z.string().max(510).nullable().optional(),
	timestamp: z.iso.datetime(),
	qty_change: z.stringbool(),
	employees_id: UUID.nullable().optional(),
	customers_id: UUID.nullable().optional(),
});
