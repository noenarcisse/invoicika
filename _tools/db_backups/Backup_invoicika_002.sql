-- added drop to cleanup the previous data
DROP TABLE IF EXISTS public."CustomerInvoiceGroupItemLines" CASCADE;
DROP TABLE IF EXISTS public."CustomerInvoiceGroupLines" CASCADE;
DROP TABLE IF EXISTS public."CustomerInvoiceLines" CASCADE;
DROP TABLE IF EXISTS public."CustomerInvoices" CASCADE;
DROP TABLE IF EXISTS public."ItemGroupItems" CASCADE;
DROP TABLE IF EXISTS public."ItemGroups" CASCADE;
DROP TABLE IF EXISTS public."Items" CASCADE;
DROP TABLE IF EXISTS public."Customers" CASCADE;
DROP TABLE IF EXISTS public."Users" CASCADE;
DROP TABLE IF EXISTS public."Roles" CASCADE;
DROP TABLE IF EXISTS public."VATs" CASCADE;
DROP TABLE IF EXISTS public."__EFMigrationsHistory" CASCADE;


--
-- PostgreSQL database dump
--

\restrict dEyAH5J81Vfbw01TdUdihWx6nSaiarDPJrI2xIetQ9K2DRtOXDZEj4M1HvdieJR

-- Dumped from database version 16.15 (Debian 16.15-1.pgdg13+2)
-- Dumped by pg_dump version 18.6

-- Started on 2026-09-12 20:20:00

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 18363)
-- Name: CustomerInvoiceGroupItemLines; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CustomerInvoiceGroupItemLines" (
    "GroupItemLineId" uuid NOT NULL,
    "CustomerInvoiceGroupLine_id" uuid NOT NULL,
    "Item_id" uuid NOT NULL,
    "Quantity" numeric(10,2) NOT NULL,
    "Price" numeric(10,2) NOT NULL
);


ALTER TABLE public."CustomerInvoiceGroupItemLines" OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 18366)
-- Name: CustomerInvoiceGroupLines; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CustomerInvoiceGroupLines" (
    "InvoiceGroupLineId" uuid NOT NULL,
    "CustomerInvoice_id" uuid NOT NULL,
    "Title" character varying(256) NOT NULL,
    "Description" character varying(1024),
    "SubTotalAmount" numeric(10,2) NOT NULL,
    "VatAmount" numeric(10,2) NOT NULL,
    "TotalAmount" numeric(10,2) NOT NULL
);


ALTER TABLE public."CustomerInvoiceGroupLines" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 18371)
-- Name: CustomerInvoiceLines; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CustomerInvoiceLines" (
    "InvoiceLineId" uuid NOT NULL,
    "CustomerInvoice_id" uuid NOT NULL,
    "Item_id" uuid NOT NULL,
    "Quantity" numeric(10,2) NOT NULL,
    "Price" numeric(10,2) NOT NULL
);


ALTER TABLE public."CustomerInvoiceLines" OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 18374)
-- Name: CustomerInvoices; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CustomerInvoices" (
    "CustomerInvoiceId" uuid NOT NULL,
    "Customer_id" uuid NOT NULL,
    "User_id" uuid NOT NULL,
    "InvoiceDate" timestamp with time zone NOT NULL,
    "CreationDate" timestamp with time zone NOT NULL,
    "UpdateDate" timestamp with time zone,
    "SubTotalAmount" numeric(10,2) NOT NULL,
    "VatAmount" numeric(10,2) NOT NULL,
    "TotalAmount" numeric(10,2) NOT NULL,
    "Vat_id" uuid NOT NULL,
    "Status" integer DEFAULT 0 NOT NULL
);


ALTER TABLE public."CustomerInvoices" OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 18378)
-- Name: Customers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Customers" (
    "CustomerId" uuid NOT NULL,
    "Name" character varying(256) NOT NULL,
    "Address" character varying(512),
    "PhoneNumber" character varying(50),
    "Email" character varying(256),
    "CreationDate" timestamp with time zone NOT NULL,
    "UpdateDate" timestamp with time zone
);


ALTER TABLE public."Customers" OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 18383)
-- Name: ItemGroupItems; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ItemGroupItems" (
    "ItemGroupItemId" uuid NOT NULL,
    "ItemGroup_id" uuid NOT NULL,
    "Item_id" uuid NOT NULL
);


ALTER TABLE public."ItemGroupItems" OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 18386)
-- Name: ItemGroups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ItemGroups" (
    "ItemGroupId" uuid NOT NULL,
    "Title" character varying(256) NOT NULL,
    "Description" character varying(1024),
    "User_id" uuid NOT NULL
);


ALTER TABLE public."ItemGroups" OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 18391)
-- Name: Items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Items" (
    "ItemId" uuid NOT NULL,
    "Name" character varying(256) NOT NULL,
    "Description" character varying(1024),
    "PurchasePrice" numeric(10,2) NOT NULL,
    "SalePrice" numeric(10,2) NOT NULL,
    "Quantity" integer NOT NULL,
    "User_id" uuid NOT NULL,
    "CreationDate" timestamp with time zone NOT NULL,
    "UpdateDate" timestamp with time zone
);


ALTER TABLE public."Items" OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 18396)
-- Name: Roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Roles" (
    "RoleId" uuid NOT NULL,
    "RoleName" character varying(100) NOT NULL,
    "CreationDate" timestamp with time zone NOT NULL,
    "UpdateDate" timestamp with time zone
);


ALTER TABLE public."Roles" OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 18399)
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    "UserId" uuid NOT NULL,
    "Username" character varying(256) NOT NULL,
    "EmailAddress" character varying(256) NOT NULL,
    "PhotoUrl" character varying(2048),
    "PasswordHash" text NOT NULL,
    "Role_id" uuid NOT NULL,
    "CreationDate" timestamp with time zone NOT NULL,
    "UpdateDate" timestamp with time zone
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 18404)
-- Name: VATs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."VATs" (
    "VatId" uuid NOT NULL,
    "Percentage" numeric(4,2) NOT NULL,
    "CreationDate" timestamp with time zone NOT NULL
);


ALTER TABLE public."VATs" OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 18407)
-- Name: __EFMigrationsHistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL
);


ALTER TABLE public."__EFMigrationsHistory" OWNER TO postgres;

--
-- TOC entry 3504 (class 0 OID 18363)
-- Dependencies: 215
-- Data for Name: CustomerInvoiceGroupItemLines; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CustomerInvoiceGroupItemLines" ("GroupItemLineId", "CustomerInvoiceGroupLine_id", "Item_id", "Quantity", "Price") FROM stdin;
\.


--
-- TOC entry 3505 (class 0 OID 18366)
-- Dependencies: 216
-- Data for Name: CustomerInvoiceGroupLines; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CustomerInvoiceGroupLines" ("InvoiceGroupLineId", "CustomerInvoice_id", "Title", "Description", "SubTotalAmount", "VatAmount", "TotalAmount") FROM stdin;
\.


--
-- TOC entry 3506 (class 0 OID 18371)
-- Dependencies: 217
-- Data for Name: CustomerInvoiceLines; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CustomerInvoiceLines" ("InvoiceLineId", "CustomerInvoice_id", "Item_id", "Quantity", "Price") FROM stdin;
\.


--
-- TOC entry 3507 (class 0 OID 18374)
-- Dependencies: 218
-- Data for Name: CustomerInvoices; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CustomerInvoices" ("CustomerInvoiceId", "Customer_id", "User_id", "InvoiceDate", "CreationDate", "UpdateDate", "SubTotalAmount", "VatAmount", "TotalAmount", "Vat_id", "Status") FROM stdin;
\.


--
-- TOC entry 3508 (class 0 OID 18378)
-- Dependencies: 219
-- Data for Name: Customers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Customers" ("CustomerId", "Name", "Address", "PhoneNumber", "Email", "CreationDate", "UpdateDate") FROM stdin;
4e06c2bc-494a-4123-9913-5227a9225cf6	Jotaro Kujo	123 Morioh Street, Sendai, Japan	+81-90-1234-5678	jotaro.kujo@spw-foundation.org	0001-01-01 00:00:00+00	0001-01-01 00:00:00+00
9701986e-558f-4926-860b-a5a4284289e9	Joseph Joestar	742 Evergreen Terrace, New York, USA	+1-555-0199	joseph.joestar@realestate.com	0001-01-01 00:00:00+00	0001-01-01 00:00:00+00
f4916411-0725-4fcb-a1cc-2536b542a117	Dio Brando	Cairo Citadel, Cairo, Egypt	+20-2-2345-6789	dio.brando@vampire-world.com	0001-01-01 00:00:00+00	0001-01-01 00:00:00+00
9846c4f3-13a3-4f22-9811-3b005ab8df07	Giorno Giovanna	Piazza del Plebiscito, Naples, Italy	+39-081-555-0123	giorno.giovanna@passione.it	0001-01-01 00:00:00+00	0001-01-01 00:00:00+00
aa2c8b1c-9cd7-4145-8434-ba0bf5bbfc91	Josuke Higashikata	45 Morioh Grand Hotel, Sendai, Japan	+81-90-9876-5432	josuke.higashikata@crazy-d.jp	0001-01-01 00:00:00+00	0001-01-01 00:00:00+00
ded8dd07-18b7-4dde-bbf3-e783e4b783d5	Walter White	308 Negra Arroyo Lane, Albuquerque, NM, USA	+1-505-555-0156	heisenberg@savewalterwhite.com	0001-01-01 00:00:00+00	0001-01-01 00:00:00+00
9ee25e15-420b-4b13-9bc4-717dcb9e3813	Michael Scott	1725 Slough Avenue, Scranton, PA, USA	+1-570-555-0133	m.scott@dundermifflin.com	0001-01-01 00:00:00+00	0001-01-01 00:00:00+00
cc2b12cc-94ed-4e05-80e8-da9c473ab0b6	Tony Soprano	14 Aspen Drive, North Caldwell, NJ, USA	+1-973-555-0144	anthony.soprano@bada-bing.com	0001-01-01 00:00:00+00	0001-01-01 00:00:00+00
\.


--
-- TOC entry 3509 (class 0 OID 18383)
-- Dependencies: 220
-- Data for Name: ItemGroupItems; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ItemGroupItems" ("ItemGroupItemId", "ItemGroup_id", "Item_id") FROM stdin;
\.


--
-- TOC entry 3510 (class 0 OID 18386)
-- Dependencies: 221
-- Data for Name: ItemGroups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ItemGroups" ("ItemGroupId", "Title", "Description", "User_id") FROM stdin;
\.


--
-- TOC entry 3511 (class 0 OID 18391)
-- Dependencies: 222
-- Data for Name: Items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Items" ("ItemId", "Name", "Description", "PurchasePrice", "SalePrice", "Quantity", "User_id", "CreationDate", "UpdateDate") FROM stdin;
1cccd04d-c123-4f96-9311-f1e46a3ad4d6	Photo Booth	Includes props and unlimited prints	350.00	450.00	94	44530a26-dc16-4704-9688-7bd262720d95	2026-09-11 10:00:00.00922+00	\N
27f86f5a-38e3-438d-9ff6-b24dbeb50eb6	Bridesmaid Dresses	Matching dresses for the bridal party	200.00	300.00	41	44530a26-dc16-4704-9688-7bd262720d95	2026-09-11 10:00:00.009234+00	\N
34ef11d0-e897-4b61-882b-9654cb77c577	Lighting Setup	LED uplighting and fairy lights for ambiance	300.00	400.00	12	44530a26-dc16-4704-9688-7bd262720d95	2026-09-11 10:00:00.009215+00	\N
35f4d80e-997c-4627-9543-c11cdd40633e	Wedding Favors	Small gifts for guests as a thank you	100.00	150.00	10	44530a26-dc16-4704-9688-7bd262720d95	2026-09-11 10:00:00.009248+00	\N
37cb42f6-cb06-4836-84b4-20c9fe32f7a1	DJ Service	Professional DJ with music selection and equipment	600.00	800.00	63	44530a26-dc16-4704-9688-7bd262720d95	2026-09-11 10:00:00.009218+00	\N
4905c537-a8a6-4470-b328-b668bb7c3c46	Dance Floor	Portable dance floor for the reception	500.00	600.00	53	44530a26-dc16-4704-9688-7bd262720d95	2026-09-11 10:00:00.00923+00	\N
4ce1cc16-9c94-47a6-9f6c-3d31ffdecc63	Photography Package	Full-day coverage with edited photos	1000.00	1200.00	33	44530a26-dc16-4704-9688-7bd262720d95	2026-09-11 10:00:00.009222+00	\N
4da8144b-cadf-4196-a0c0-dd4fded87d86	Table Settings	Complete set including plates, cutlery, and glassware	200.00	250.00	1	44530a26-dc16-4704-9688-7bd262720d95	2026-09-11 10:00:00.009211+00	\N
7a21c424-ed61-4b3e-b6bf-4dc1cd8809df	Wedding Planner	Professional planning services and coordination	1500.00	2000.00	48	44530a26-dc16-4704-9688-7bd262720d95	2026-09-11 10:00:00.009225+00	\N
7f92d29e-fa00-4b36-8149-33c75bc91e47	Groom's Men Suits	Suits for the groomsmen with matching accessories	300.00	400.00	48	44530a26-dc16-4704-9688-7bd262720d95	2026-09-11 10:00:00.009236+00	\N
80a1e687-e06a-47e3-81a1-e92069b9dafc	Cake Cutting Service	Includes the cutting and serving of the cake	100.00	150.00	14	44530a26-dc16-4704-9688-7bd262720d95	2026-09-11 10:00:00.009237+00	\N
82ddf989-1929-489b-92aa-1e7e552ac415	Videography Package	Full-day coverage with edited video	1200.00	1500.00	39	44530a26-dc16-4704-9688-7bd262720d95	2026-09-11 10:00:00.009224+00	\N
93e2da5a-62d2-4e88-b5c0-422c89192608	Guest Book	Custom guest book for signatures and messages	50.00	75.00	75	44530a26-dc16-4704-9688-7bd262720d95	2026-09-11 10:00:00.009239+00	\N
94dc1ba2-68e1-48bf-9375-0ac0d32c29a8	Ceremony Arch	Decorated arch for the wedding ceremony	300.00	400.00	38	44530a26-dc16-4704-9688-7bd262720d95	2026-09-11 10:00:00.009229+00	\N
9fa195ce-a8de-426f-af12-f455f79d87ab	Catering Service	Full catering for the wedding reception	2000.00	2500.00	33	44530a26-dc16-4704-9688-7bd262720d95	2026-09-11 10:00:00.009244+00	\N
af5b7477-1759-42b4-af19-4ef066e65b91	Wedding Cake	Three-tier vanilla cake with fondant decoration	250.00	300.00	45	44530a26-dc16-4704-9688-7bd262720d95	2026-09-11 10:00:00.009207+00	\N
af5eb92f-d782-47df-af3b-1099e9a8e5e3	Chairs and Linens	Chairs with white linens and sashes	150.00	200.00	88	44530a26-dc16-4704-9688-7bd262720d95	2026-09-11 10:00:00.009213+00	\N
b9fb1106-2249-4c3d-aa75-382da3064ff7	Champagne Toast	Champagne service for the toast	200.00	250.00	46	44530a26-dc16-4704-9688-7bd262720d95	2026-09-11 10:00:00.009242+00	\N
c15757ac-25e5-4eda-903f-a7122750d0cf	Reception Decor	Decorations including banners and table runners	250.00	350.00	16	44530a26-dc16-4704-9688-7bd262720d95	2026-09-11 10:00:00.009227+00	\N
d5f73ce4-d32a-4e73-bbeb-694a580b1d39	Bridal Gown	Elegant bridal gown with lace details	800.00	1200.00	27	44530a26-dc16-4704-9688-7bd262720d95	2026-09-11 10:00:00.009173+00	\N
e1e737e9-9f5a-4171-b031-8475a3913e7b	Sound System	PA system with microphones and speakers	400.00	500.00	59	44530a26-dc16-4704-9688-7bd262720d95	2026-09-11 10:00:00.009217+00	\N
e82aa301-3d14-4b14-aa77-d824dc37b463	Floral Arrangements	Bouquets and centerpieces for the ceremony	500.00	700.00	22	44530a26-dc16-4704-9688-7bd262720d95	2026-09-11 10:00:00.009209+00	\N
eea677e7-4121-4538-a66b-087ed87ad8f0	Groom's Tuxedo	Classic black tuxedo with bow tie	400.00	600.00	82	44530a26-dc16-4704-9688-7bd262720d95	2026-09-11 10:00:00.009205+00	\N
f0cbd483-62c6-432f-8646-c8a2079f9877	Transportation Service	Luxury transportation for the bride and groom	500.00	700.00	44	44530a26-dc16-4704-9688-7bd262720d95	2026-09-11 10:00:00.009241+00	\N
f2502a10-1c19-43ea-90b3-e9ba73c1a48e	Wedding Invitations	Custom designed and printed invitations	150.00	200.00	70	44530a26-dc16-4704-9688-7bd262720d95	2026-09-11 10:00:00.009232+00	\N
\.


--
-- TOC entry 3512 (class 0 OID 18396)
-- Dependencies: 223
-- Data for Name: Roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Roles" ("RoleId", "RoleName", "CreationDate", "UpdateDate") FROM stdin;
3c128167-8201-43c1-a841-003c2258589e	Employee	2026-09-11 09:59:59.877923+00	\N
a95e8d13-c513-4b8f-95f0-4266b87bbe6d	Admin	2026-09-11 09:59:59.877893+00	\N
\.


--
-- TOC entry 3513 (class 0 OID 18399)
-- Dependencies: 224
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users" ("UserId", "Username", "EmailAddress", "PhotoUrl", "PasswordHash", "Role_id", "CreationDate", "UpdateDate") FROM stdin;
035adea2-8c74-4c5f-8e8a-cbe87a02ac93	employee1	employee1@example.com	/uploads/employee1.jpg	Ns387EfSbpNPOwwLnKdhu+Cfrm03WBqy5LtKUrZmI6s=	3c128167-8201-43c1-a841-003c2258589e	2026-09-11 09:59:59.964794+00	\N
44530a26-dc16-4704-9688-7bd262720d95	admin1	admin1@example.com	/uploads/admin1.png	JfQ7FIatlaE5jj7rPYO8QBABX8yb7bNbQy4AKY1QIfc=	a95e8d13-c513-4b8f-95f0-4266b87bbe6d	2026-09-11 09:59:59.964713+00	\N
819ea963-bb7f-44fc-9b04-6bd03b4375c7	employee2	employee2@example.com	\N	5dwSf58KHCzj1h5jIWcGApMfHVDEOr+5sARZS9KD2Hg=	3c128167-8201-43c1-a841-003c2258589e	2026-09-11 09:59:59.964798+00	\N
ba3928da-cbae-462e-a0c2-13c6c7d6950f	admin2	admin2@example.com	/uploads/admin2.png	HBQrLQGqNOmja95IBkWlf9aeFBVdrPq1o/kle3f9yNg=	a95e8d13-c513-4b8f-95f0-4266b87bbe6d	2026-09-11 09:59:59.964789+00	\N
\.


--
-- TOC entry 3514 (class 0 OID 18404)
-- Dependencies: 225
-- Data for Name: VATs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."VATs" ("VatId", "Percentage", "CreationDate") FROM stdin;
a31845c1-2311-4244-b0e6-db823d3f38da	0.00	2026-09-11 10:00:00.056412+00
c4cc20e2-aab3-41e0-8b81-6134da9795f0	10.00	2026-09-11 10:00:00.056447+00
e816b291-c5c2-4b85-96e6-b59c825d17dc	5.00	2026-09-11 10:00:00.056445+00
\.


--
-- TOC entry 3515 (class 0 OID 18407)
-- Dependencies: 226
-- Data for Name: __EFMigrationsHistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."__EFMigrationsHistory" ("MigrationId", "ProductVersion") FROM stdin;
20251223191043_Initial	10.0.0
20251225205236_item-groups	10.0.0
20251228233312_introduce-invoice-status	10.0.0
\.


--
-- TOC entry 3314 (class 2606 OID 18411)
-- Name: CustomerInvoiceGroupItemLines PK_CustomerInvoiceGroupItemLines; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CustomerInvoiceGroupItemLines"
    ADD CONSTRAINT "PK_CustomerInvoiceGroupItemLines" PRIMARY KEY ("GroupItemLineId");


--
-- TOC entry 3317 (class 2606 OID 18413)
-- Name: CustomerInvoiceGroupLines PK_CustomerInvoiceGroupLines; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CustomerInvoiceGroupLines"
    ADD CONSTRAINT "PK_CustomerInvoiceGroupLines" PRIMARY KEY ("InvoiceGroupLineId");


--
-- TOC entry 3321 (class 2606 OID 18415)
-- Name: CustomerInvoiceLines PK_CustomerInvoiceLines; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CustomerInvoiceLines"
    ADD CONSTRAINT "PK_CustomerInvoiceLines" PRIMARY KEY ("InvoiceLineId");


--
-- TOC entry 3326 (class 2606 OID 18417)
-- Name: CustomerInvoices PK_CustomerInvoices; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CustomerInvoices"
    ADD CONSTRAINT "PK_CustomerInvoices" PRIMARY KEY ("CustomerInvoiceId");


--
-- TOC entry 3328 (class 2606 OID 18419)
-- Name: Customers PK_Customers; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Customers"
    ADD CONSTRAINT "PK_Customers" PRIMARY KEY ("CustomerId");


--
-- TOC entry 3332 (class 2606 OID 18421)
-- Name: ItemGroupItems PK_ItemGroupItems; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ItemGroupItems"
    ADD CONSTRAINT "PK_ItemGroupItems" PRIMARY KEY ("ItemGroupItemId");


--
-- TOC entry 3335 (class 2606 OID 18423)
-- Name: ItemGroups PK_ItemGroups; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ItemGroups"
    ADD CONSTRAINT "PK_ItemGroups" PRIMARY KEY ("ItemGroupId");


--
-- TOC entry 3338 (class 2606 OID 18425)
-- Name: Items PK_Items; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Items"
    ADD CONSTRAINT "PK_Items" PRIMARY KEY ("ItemId");


--
-- TOC entry 3340 (class 2606 OID 18427)
-- Name: Roles PK_Roles; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "PK_Roles" PRIMARY KEY ("RoleId");


--
-- TOC entry 3343 (class 2606 OID 18429)
-- Name: Users PK_Users; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "PK_Users" PRIMARY KEY ("UserId");


--
-- TOC entry 3345 (class 2606 OID 18431)
-- Name: VATs PK_VATs; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VATs"
    ADD CONSTRAINT "PK_VATs" PRIMARY KEY ("VatId");


--
-- TOC entry 3347 (class 2606 OID 18433)
-- Name: __EFMigrationsHistory PK___EFMigrationsHistory; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."__EFMigrationsHistory"
    ADD CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId");


--
-- TOC entry 3311 (class 1259 OID 18434)
-- Name: IX_CustomerInvoiceGroupItemLines_CustomerInvoiceGroupLine_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_CustomerInvoiceGroupItemLines_CustomerInvoiceGroupLine_id" ON public."CustomerInvoiceGroupItemLines" USING btree ("CustomerInvoiceGroupLine_id");


--
-- TOC entry 3312 (class 1259 OID 18435)
-- Name: IX_CustomerInvoiceGroupItemLines_Item_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_CustomerInvoiceGroupItemLines_Item_id" ON public."CustomerInvoiceGroupItemLines" USING btree ("Item_id");


--
-- TOC entry 3315 (class 1259 OID 18436)
-- Name: IX_CustomerInvoiceGroupLines_CustomerInvoice_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_CustomerInvoiceGroupLines_CustomerInvoice_id" ON public."CustomerInvoiceGroupLines" USING btree ("CustomerInvoice_id");


--
-- TOC entry 3318 (class 1259 OID 18437)
-- Name: IX_CustomerInvoiceLines_CustomerInvoice_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_CustomerInvoiceLines_CustomerInvoice_id" ON public."CustomerInvoiceLines" USING btree ("CustomerInvoice_id");


--
-- TOC entry 3319 (class 1259 OID 18438)
-- Name: IX_CustomerInvoiceLines_Item_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_CustomerInvoiceLines_Item_id" ON public."CustomerInvoiceLines" USING btree ("Item_id");


--
-- TOC entry 3322 (class 1259 OID 18439)
-- Name: IX_CustomerInvoices_Customer_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_CustomerInvoices_Customer_id" ON public."CustomerInvoices" USING btree ("Customer_id");


--
-- TOC entry 3323 (class 1259 OID 18440)
-- Name: IX_CustomerInvoices_User_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_CustomerInvoices_User_id" ON public."CustomerInvoices" USING btree ("User_id");


--
-- TOC entry 3324 (class 1259 OID 18441)
-- Name: IX_CustomerInvoices_Vat_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_CustomerInvoices_Vat_id" ON public."CustomerInvoices" USING btree ("Vat_id");


--
-- TOC entry 3329 (class 1259 OID 18442)
-- Name: IX_ItemGroupItems_ItemGroup_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_ItemGroupItems_ItemGroup_id" ON public."ItemGroupItems" USING btree ("ItemGroup_id");


--
-- TOC entry 3330 (class 1259 OID 18443)
-- Name: IX_ItemGroupItems_Item_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_ItemGroupItems_Item_id" ON public."ItemGroupItems" USING btree ("Item_id");


--
-- TOC entry 3333 (class 1259 OID 18444)
-- Name: IX_ItemGroups_User_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_ItemGroups_User_id" ON public."ItemGroups" USING btree ("User_id");


--
-- TOC entry 3336 (class 1259 OID 18445)
-- Name: IX_Items_User_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Items_User_id" ON public."Items" USING btree ("User_id");


--
-- TOC entry 3341 (class 1259 OID 18446)
-- Name: IX_Users_Role_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Users_Role_id" ON public."Users" USING btree ("Role_id");


--
-- TOC entry 3348 (class 2606 OID 18447)
-- Name: CustomerInvoiceGroupItemLines FK_CustomerInvoiceGroupItemLines_CustomerInvoiceGroupLines_Cus~; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CustomerInvoiceGroupItemLines"
    ADD CONSTRAINT "FK_CustomerInvoiceGroupItemLines_CustomerInvoiceGroupLines_Cus~" FOREIGN KEY ("CustomerInvoiceGroupLine_id") REFERENCES public."CustomerInvoiceGroupLines"("InvoiceGroupLineId") ON DELETE CASCADE;


--
-- TOC entry 3349 (class 2606 OID 18452)
-- Name: CustomerInvoiceGroupItemLines FK_CustomerInvoiceGroupItemLines_Items_Item_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CustomerInvoiceGroupItemLines"
    ADD CONSTRAINT "FK_CustomerInvoiceGroupItemLines_Items_Item_id" FOREIGN KEY ("Item_id") REFERENCES public."Items"("ItemId") ON DELETE CASCADE;


--
-- TOC entry 3350 (class 2606 OID 18457)
-- Name: CustomerInvoiceGroupLines FK_CustomerInvoiceGroupLines_CustomerInvoices_CustomerInvoice_~; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CustomerInvoiceGroupLines"
    ADD CONSTRAINT "FK_CustomerInvoiceGroupLines_CustomerInvoices_CustomerInvoice_~" FOREIGN KEY ("CustomerInvoice_id") REFERENCES public."CustomerInvoices"("CustomerInvoiceId") ON DELETE CASCADE;


--
-- TOC entry 3351 (class 2606 OID 18462)
-- Name: CustomerInvoiceLines FK_CustomerInvoiceLines_CustomerInvoices_CustomerInvoice_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CustomerInvoiceLines"
    ADD CONSTRAINT "FK_CustomerInvoiceLines_CustomerInvoices_CustomerInvoice_id" FOREIGN KEY ("CustomerInvoice_id") REFERENCES public."CustomerInvoices"("CustomerInvoiceId") ON DELETE CASCADE;


--
-- TOC entry 3352 (class 2606 OID 18467)
-- Name: CustomerInvoiceLines FK_CustomerInvoiceLines_Items_Item_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CustomerInvoiceLines"
    ADD CONSTRAINT "FK_CustomerInvoiceLines_Items_Item_id" FOREIGN KEY ("Item_id") REFERENCES public."Items"("ItemId") ON DELETE RESTRICT;


--
-- TOC entry 3353 (class 2606 OID 18472)
-- Name: CustomerInvoices FK_CustomerInvoices_Customers_Customer_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CustomerInvoices"
    ADD CONSTRAINT "FK_CustomerInvoices_Customers_Customer_id" FOREIGN KEY ("Customer_id") REFERENCES public."Customers"("CustomerId") ON DELETE CASCADE;


--
-- TOC entry 3354 (class 2606 OID 18477)
-- Name: CustomerInvoices FK_CustomerInvoices_Users_User_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CustomerInvoices"
    ADD CONSTRAINT "FK_CustomerInvoices_Users_User_id" FOREIGN KEY ("User_id") REFERENCES public."Users"("UserId") ON DELETE CASCADE;


--
-- TOC entry 3355 (class 2606 OID 18482)
-- Name: CustomerInvoices FK_CustomerInvoices_VATs_Vat_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CustomerInvoices"
    ADD CONSTRAINT "FK_CustomerInvoices_VATs_Vat_id" FOREIGN KEY ("Vat_id") REFERENCES public."VATs"("VatId") ON DELETE CASCADE;


--
-- TOC entry 3356 (class 2606 OID 18487)
-- Name: ItemGroupItems FK_ItemGroupItems_ItemGroups_ItemGroup_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ItemGroupItems"
    ADD CONSTRAINT "FK_ItemGroupItems_ItemGroups_ItemGroup_id" FOREIGN KEY ("ItemGroup_id") REFERENCES public."ItemGroups"("ItemGroupId") ON DELETE CASCADE;


--
-- TOC entry 3357 (class 2606 OID 18492)
-- Name: ItemGroupItems FK_ItemGroupItems_Items_Item_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ItemGroupItems"
    ADD CONSTRAINT "FK_ItemGroupItems_Items_Item_id" FOREIGN KEY ("Item_id") REFERENCES public."Items"("ItemId") ON DELETE CASCADE;


--
-- TOC entry 3358 (class 2606 OID 18497)
-- Name: ItemGroups FK_ItemGroups_Users_User_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ItemGroups"
    ADD CONSTRAINT "FK_ItemGroups_Users_User_id" FOREIGN KEY ("User_id") REFERENCES public."Users"("UserId") ON DELETE CASCADE;


--
-- TOC entry 3359 (class 2606 OID 18502)
-- Name: Items FK_Items_Users_User_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Items"
    ADD CONSTRAINT "FK_Items_Users_User_id" FOREIGN KEY ("User_id") REFERENCES public."Users"("UserId") ON DELETE CASCADE;


--
-- TOC entry 3360 (class 2606 OID 18507)
-- Name: Users FK_Users_Roles_Role_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "FK_Users_Roles_Role_id" FOREIGN KEY ("Role_id") REFERENCES public."Roles"("RoleId") ON DELETE CASCADE;


-- Completed on 2026-09-12 20:20:00

--
-- PostgreSQL database dump complete
--

\unrestrict dEyAH5J81Vfbw01TdUdihWx6nSaiarDPJrI2xIetQ9K2DRtOXDZEj4M1HvdieJR

