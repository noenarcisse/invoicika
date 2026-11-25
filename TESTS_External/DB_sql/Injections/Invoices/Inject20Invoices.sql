-- devin
BEGIN;

CREATE TEMP TABLE invoice_seed_specs ON COMMIT DROP AS
WITH customer_pool AS (
    SELECT
        "CustomerId",
        row_number() OVER (ORDER BY "Name", "CustomerId") AS customer_rank
    FROM "Customers"
),
item_pool AS (
    SELECT
        "ItemId",
        "SalePrice",
        row_number() OVER (ORDER BY "Name", "ItemId") AS item_rank
    FROM "Items"
),
vat_pool AS (
    SELECT
        "VatId",
        "Percentage",
        row_number() OVER (ORDER BY "Percentage", "VatId") AS vat_rank
    FROM "VATs"
),
admin_user AS (
    SELECT "UserId"
    FROM "Users"
    ORDER BY CASE WHEN "Username" = 'admin' THEN 0 ELSE 1 END, "Username"
    LIMIT 1
),
specs AS (
    SELECT
        invoice_index,
        md5('invoicika-seed-invoice-' || invoice_index)::uuid AS invoice_id,
        customer."CustomerId" AS customer_id,
        admin_user."UserId" AS user_id,
        vat."VatId" AS vat_id,
        vat."Percentage" AS vat_percentage,
        item1."ItemId" AS item1_id,
        item2."ItemId" AS item2_id,
        item1."SalePrice" AS item1_price,
        item2."SalePrice" AS item2_price,
        (1 + ((invoice_index - 1) % 3))::numeric AS item1_quantity,
        (1 + (invoice_index % 3))::numeric AS item2_quantity,
        ((1 + ((invoice_index - 1) % 3)) * item1."SalePrice"
            + (1 + (invoice_index % 3)) * item2."SalePrice") AS sub_total_amount,
        ((invoice_index - 1) % 3) AS invoice_status,
        (now() - ((invoice_index - 1) * 9) * INTERVAL '1 day') AS invoice_date
    FROM generate_series(1, 20) AS generated(invoice_index)
    JOIN customer_pool AS customer
        ON customer.customer_rank = ((invoice_index - 1) % 8) + 1
    JOIN item_pool AS item1
        ON item1.item_rank = ((invoice_index - 1) % 5) + 1
    JOIN item_pool AS item2
        ON item2.item_rank = (invoice_index % 5) + 1
    JOIN vat_pool AS vat
        ON vat.vat_rank = ((invoice_index - 1) % 3) + 1
    CROSS JOIN admin_user
)
SELECT * FROM specs;

INSERT INTO "CustomerInvoices" (
    "CustomerInvoiceId",
    "Customer_id",
    "User_id",
    "InvoiceDate",
    "CreationDate",
    "UpdateDate",
    "SubTotalAmount",
    "VatAmount",
    "TotalAmount",
    "Vat_id",
    "Status"
)
SELECT
    invoice_id,
    customer_id,
    user_id,
    invoice_date,
    now(),
    CASE WHEN invoice_status = 2 THEN invoice_date + INTERVAL '1 day' ELSE NULL END,
    sub_total_amount,
    ROUND(sub_total_amount * vat_percentage / 100, 2),
    sub_total_amount + ROUND(sub_total_amount * vat_percentage / 100, 2),
    vat_id,
    invoice_status
FROM invoice_seed_specs
ON CONFLICT ("CustomerInvoiceId") DO NOTHING;

INSERT INTO "CustomerInvoiceLines" (
    "InvoiceLineId",
    "CustomerInvoice_id",
    "Item_id",
    "Quantity",
    "Price"
)
SELECT
    md5('invoicika-seed-invoice-line-' || invoice_index || '-1')::uuid,
    invoice_id,
    item1_id,
    item1_quantity,
    item1_price
FROM invoice_seed_specs
ON CONFLICT ("InvoiceLineId") DO NOTHING;

INSERT INTO "CustomerInvoiceLines" (
    "InvoiceLineId",
    "CustomerInvoice_id",
    "Item_id",
    "Quantity",
    "Price"
)
SELECT
    md5('invoicika-seed-invoice-line-' || invoice_index || '-2')::uuid,
    invoice_id,
    item2_id,
    item2_quantity,
    item2_price
FROM invoice_seed_specs
ON CONFLICT ("InvoiceLineId") DO NOTHING;

COMMIT;
