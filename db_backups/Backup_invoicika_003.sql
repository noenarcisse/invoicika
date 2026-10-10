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

\restrict 0IX0lVGPvSKXLvdsfhS5opvCENn0CUaiPGXFboLQotM0eO5Ak4p7MgUmPa1tcdS

-- Dumped from database version 16.15 (Debian 16.15-1.pgdg13+2)
-- Dumped by pg_dump version 18.6

-- Started on 2026-10-10 10:42:48

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

--
-- TOC entry 5 (class 2615 OID 16385)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 3521 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 16539)
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
-- TOC entry 216 (class 1259 OID 16542)
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
-- TOC entry 217 (class 1259 OID 16547)
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
-- TOC entry 218 (class 1259 OID 16550)
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
-- TOC entry 219 (class 1259 OID 16554)
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
-- TOC entry 220 (class 1259 OID 16559)
-- Name: ItemGroupItems; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ItemGroupItems" (
    "ItemGroupItemId" uuid NOT NULL,
    "ItemGroup_id" uuid NOT NULL,
    "Item_id" uuid NOT NULL
);


ALTER TABLE public."ItemGroupItems" OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16562)
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
-- TOC entry 222 (class 1259 OID 16567)
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
-- TOC entry 223 (class 1259 OID 16572)
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
-- TOC entry 224 (class 1259 OID 16575)
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
-- TOC entry 225 (class 1259 OID 16580)
-- Name: VATs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."VATs" (
    "VatId" uuid NOT NULL,
    "Percentage" numeric(4,2) NOT NULL,
    "CreationDate" timestamp with time zone NOT NULL
);


ALTER TABLE public."VATs" OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16583)
-- Name: __EFMigrationsHistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL
);


ALTER TABLE public."__EFMigrationsHistory" OWNER TO postgres;

--
-- TOC entry 3504 (class 0 OID 16539)
-- Dependencies: 215
-- Data for Name: CustomerInvoiceGroupItemLines; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CustomerInvoiceGroupItemLines" ("GroupItemLineId", "CustomerInvoiceGroupLine_id", "Item_id", "Quantity", "Price") FROM stdin;
\.


--
-- TOC entry 3505 (class 0 OID 16542)
-- Dependencies: 216
-- Data for Name: CustomerInvoiceGroupLines; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CustomerInvoiceGroupLines" ("InvoiceGroupLineId", "CustomerInvoice_id", "Title", "Description", "SubTotalAmount", "VatAmount", "TotalAmount") FROM stdin;
\.


--
-- TOC entry 3506 (class 0 OID 16547)
-- Dependencies: 217
-- Data for Name: CustomerInvoiceLines; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CustomerInvoiceLines" ("InvoiceLineId", "CustomerInvoice_id", "Item_id", "Quantity", "Price") FROM stdin;
\.


--
-- TOC entry 3507 (class 0 OID 16550)
-- Dependencies: 218
-- Data for Name: CustomerInvoices; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CustomerInvoices" ("CustomerInvoiceId", "Customer_id", "User_id", "InvoiceDate", "CreationDate", "UpdateDate", "SubTotalAmount", "VatAmount", "TotalAmount", "Vat_id", "Status") FROM stdin;
\.


--
-- TOC entry 3508 (class 0 OID 16554)
-- Dependencies: 219
-- Data for Name: Customers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Customers" ("CustomerId", "Name", "Address", "PhoneNumber", "Email", "CreationDate", "UpdateDate") FROM stdin;
266e30f9-1346-4ce6-8cef-4598e32e31b5	Jotaro Kujo	123 Morioh Street, Sendai, Japan	+81-90-1234-5678	jotaro.kujo@spw-foundation.org	0001-01-01 00:00:00+00	0001-01-01 00:00:00+00
b1669613-e3de-48e9-9921-71ea74f60d14	Joseph Joestar	742 Evergreen Terrace, New York, USA	+1-555-0199	joseph.joestar@realestate.com	0001-01-01 00:00:00+00	0001-01-01 00:00:00+00
b9480dc9-126c-4f36-b659-4f73727ca0d7	Dio Brando	Cairo Citadel, Cairo, Egypt	+20-2-2345-6789	dio.brando@vampire-world.com	0001-01-01 00:00:00+00	0001-01-01 00:00:00+00
9ac7156b-70a5-4d1c-93bd-4fbc8559a050	Giorno Giovanna	Piazza del Plebiscito, Naples, Italy	+39-081-555-0123	giorno.giovanna@passione.it	0001-01-01 00:00:00+00	0001-01-01 00:00:00+00
10c8e013-3cc0-451b-b9ee-ea9ca57f9683	Josuke Higashikata	45 Morioh Grand Hotel, Sendai, Japan	+81-90-9876-5432	josuke.higashikata@crazy-d.jp	0001-01-01 00:00:00+00	0001-01-01 00:00:00+00
79b4327c-f0bc-4fd9-8b21-4550289e17f3	Walter White	308 Negra Arroyo Lane, Albuquerque, NM, USA	+1-505-555-0156	heisenberg@savewalterwhite.com	0001-01-01 00:00:00+00	0001-01-01 00:00:00+00
bd48bfcc-5fd6-4390-a298-3b548589a9d8	Michael Scott	1725 Slough Avenue, Scranton, PA, USA	+1-570-555-0133	m.scott@dundermifflin.com	0001-01-01 00:00:00+00	0001-01-01 00:00:00+00
e0d85513-d268-4495-8281-e17da2d7dee9	Tony Soprano	14 Aspen Drive, North Caldwell, NJ, USA	+1-973-555-0144	anthony.soprano@bada-bing.com	0001-01-01 00:00:00+00	0001-01-01 00:00:00+00
\.


--
-- TOC entry 3509 (class 0 OID 16559)
-- Dependencies: 220
-- Data for Name: ItemGroupItems; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ItemGroupItems" ("ItemGroupItemId", "ItemGroup_id", "Item_id") FROM stdin;
\.


--
-- TOC entry 3510 (class 0 OID 16562)
-- Dependencies: 221
-- Data for Name: ItemGroups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ItemGroups" ("ItemGroupId", "Title", "Description", "User_id") FROM stdin;
\.


--
-- TOC entry 3511 (class 0 OID 16567)
-- Dependencies: 222
-- Data for Name: Items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Items" ("ItemId", "Name", "Description", "PurchasePrice", "SalePrice", "Quantity", "User_id", "CreationDate", "UpdateDate") FROM stdin;
8bcaa591-ab0e-44e4-a099-8a7005a02788	Armoire Billy	Une armoire suédoise particulièrement solide et montrant aux autres votre bon goût	19.00	25.00	6	1f8ea226-8f90-4de8-ad67-2211a9849196	2026-10-10 08:40:25.201092+00	\N
ce0cc21f-fcf6-44e3-8661-ce88c6037ce1	Pokemon bleu	Attrapez les tous	100.00	370.00	3	1f8ea226-8f90-4de8-ad67-2211a9849196	2026-10-10 08:40:25.201092+00	\N
22c7934b-858b-4720-b40d-966d63b9f660	Harry Potter et la chambre des secrets	Le second ouvrage de la célèbre saga Harry Potter	40.00	42.00	37	1f8ea226-8f90-4de8-ad67-2211a9849196	2026-10-10 08:40:25.201092+00	\N
322bd65d-0e50-430c-8647-2a0975d9d7f4	Dark souls : Prepare to die edition	You died	39.00	49.00	9	1f8ea226-8f90-4de8-ad67-2211a9849196	2026-10-10 08:40:25.201092+00	\N
3925877b-a19e-4fef-8530-df54ea4fbe78	Demie paire de bottes Shein	Ce ne sont que des bottes gauches. Merci de ne pas en commander plusieurs en espérant avoir la droite	2.00	1.00	12	1f8ea226-8f90-4de8-ad67-2211a9849196	2026-10-10 08:40:25.201092+00	\N
\.


--
-- TOC entry 3512 (class 0 OID 16572)
-- Dependencies: 223
-- Data for Name: Roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Roles" ("RoleId", "RoleName", "CreationDate", "UpdateDate") FROM stdin;
3c128167-8201-43c1-a841-003c2258589e	Employee	2026-09-11 09:59:59.877923+00	\N
a95e8d13-c513-4b8f-95f0-4266b87bbe6d	Admin	2026-09-11 09:59:59.877893+00	\N
\.


--
-- TOC entry 3513 (class 0 OID 16575)
-- Dependencies: 224
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users" ("UserId", "Username", "EmailAddress", "PhotoUrl", "PasswordHash", "Role_id", "CreationDate", "UpdateDate") FROM stdin;
f0e075b0-3e59-4fb1-8e5d-6e540341b87f	admin	admin@admin.com	/uploads/invoicika.png	jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=	a95e8d13-c513-4b8f-95f0-4266b87bbe6d	2026-10-10 08:40:21.962679+00	\N
1f8ea226-8f90-4de8-ad67-2211a9849196	Jacques Houille	jchouille@montmirail.fr	/uploads/invoicika.png	/GV6U4SOdknVz6OkYmpl+XltOqL3+f0ryFPj201gm8Q=	3c128167-8201-43c1-a841-003c2258589e	2026-10-10 08:40:21.962679+00	\N
7d9ac886-5d80-4731-ba1d-7704bd91f233	Godefroy De Montmirail	gdm@montmirail.fr	/uploads/invoicika.png	ZAMYIF6+SjuTRLSYpVjXy9qTQJ4O/g2MluY1UvMyxRI=	3c128167-8201-43c1-a841-003c2258589e	2026-10-10 08:40:21.962679+00	\N
\.


--
-- TOC entry 3514 (class 0 OID 16580)
-- Dependencies: 225
-- Data for Name: VATs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."VATs" ("VatId", "Percentage", "CreationDate") FROM stdin;
a31845c1-2311-4244-b0e6-db823d3f38da	0.00	2026-09-11 10:00:00.056412+00
c4cc20e2-aab3-41e0-8b81-6134da9795f0	10.00	2026-09-11 10:00:00.056447+00
e816b291-c5c2-4b85-96e6-b59c825d17dc	5.00	2026-09-11 10:00:00.056445+00
\.


--
-- TOC entry 3515 (class 0 OID 16583)
-- Dependencies: 226
-- Data for Name: __EFMigrationsHistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."__EFMigrationsHistory" ("MigrationId", "ProductVersion") FROM stdin;
20251223191043_Initial	10.0.0
20251225205236_item-groups	10.0.0
20251228233312_introduce-invoice-status	10.0.0
\.


--
-- TOC entry 3314 (class 2606 OID 16587)
-- Name: CustomerInvoiceGroupItemLines PK_CustomerInvoiceGroupItemLines; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CustomerInvoiceGroupItemLines"
    ADD CONSTRAINT "PK_CustomerInvoiceGroupItemLines" PRIMARY KEY ("GroupItemLineId");


--
-- TOC entry 3317 (class 2606 OID 16589)
-- Name: CustomerInvoiceGroupLines PK_CustomerInvoiceGroupLines; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CustomerInvoiceGroupLines"
    ADD CONSTRAINT "PK_CustomerInvoiceGroupLines" PRIMARY KEY ("InvoiceGroupLineId");


--
-- TOC entry 3321 (class 2606 OID 16591)
-- Name: CustomerInvoiceLines PK_CustomerInvoiceLines; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CustomerInvoiceLines"
    ADD CONSTRAINT "PK_CustomerInvoiceLines" PRIMARY KEY ("InvoiceLineId");


--
-- TOC entry 3326 (class 2606 OID 16593)
-- Name: CustomerInvoices PK_CustomerInvoices; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CustomerInvoices"
    ADD CONSTRAINT "PK_CustomerInvoices" PRIMARY KEY ("CustomerInvoiceId");


--
-- TOC entry 3328 (class 2606 OID 16595)
-- Name: Customers PK_Customers; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Customers"
    ADD CONSTRAINT "PK_Customers" PRIMARY KEY ("CustomerId");


--
-- TOC entry 3332 (class 2606 OID 16597)
-- Name: ItemGroupItems PK_ItemGroupItems; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ItemGroupItems"
    ADD CONSTRAINT "PK_ItemGroupItems" PRIMARY KEY ("ItemGroupItemId");


--
-- TOC entry 3335 (class 2606 OID 16599)
-- Name: ItemGroups PK_ItemGroups; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ItemGroups"
    ADD CONSTRAINT "PK_ItemGroups" PRIMARY KEY ("ItemGroupId");


--
-- TOC entry 3338 (class 2606 OID 16601)
-- Name: Items PK_Items; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Items"
    ADD CONSTRAINT "PK_Items" PRIMARY KEY ("ItemId");


--
-- TOC entry 3340 (class 2606 OID 16603)
-- Name: Roles PK_Roles; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "PK_Roles" PRIMARY KEY ("RoleId");


--
-- TOC entry 3343 (class 2606 OID 16605)
-- Name: Users PK_Users; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "PK_Users" PRIMARY KEY ("UserId");


--
-- TOC entry 3345 (class 2606 OID 16607)
-- Name: VATs PK_VATs; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VATs"
    ADD CONSTRAINT "PK_VATs" PRIMARY KEY ("VatId");


--
-- TOC entry 3347 (class 2606 OID 16609)
-- Name: __EFMigrationsHistory PK___EFMigrationsHistory; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."__EFMigrationsHistory"
    ADD CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId");


--
-- TOC entry 3311 (class 1259 OID 16610)
-- Name: IX_CustomerInvoiceGroupItemLines_CustomerInvoiceGroupLine_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_CustomerInvoiceGroupItemLines_CustomerInvoiceGroupLine_id" ON public."CustomerInvoiceGroupItemLines" USING btree ("CustomerInvoiceGroupLine_id");


--
-- TOC entry 3312 (class 1259 OID 16611)
-- Name: IX_CustomerInvoiceGroupItemLines_Item_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_CustomerInvoiceGroupItemLines_Item_id" ON public."CustomerInvoiceGroupItemLines" USING btree ("Item_id");


--
-- TOC entry 3315 (class 1259 OID 16612)
-- Name: IX_CustomerInvoiceGroupLines_CustomerInvoice_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_CustomerInvoiceGroupLines_CustomerInvoice_id" ON public."CustomerInvoiceGroupLines" USING btree ("CustomerInvoice_id");


--
-- TOC entry 3318 (class 1259 OID 16613)
-- Name: IX_CustomerInvoiceLines_CustomerInvoice_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_CustomerInvoiceLines_CustomerInvoice_id" ON public."CustomerInvoiceLines" USING btree ("CustomerInvoice_id");


--
-- TOC entry 3319 (class 1259 OID 16614)
-- Name: IX_CustomerInvoiceLines_Item_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_CustomerInvoiceLines_Item_id" ON public."CustomerInvoiceLines" USING btree ("Item_id");


--
-- TOC entry 3322 (class 1259 OID 16615)
-- Name: IX_CustomerInvoices_Customer_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_CustomerInvoices_Customer_id" ON public."CustomerInvoices" USING btree ("Customer_id");


--
-- TOC entry 3323 (class 1259 OID 16616)
-- Name: IX_CustomerInvoices_User_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_CustomerInvoices_User_id" ON public."CustomerInvoices" USING btree ("User_id");


--
-- TOC entry 3324 (class 1259 OID 16617)
-- Name: IX_CustomerInvoices_Vat_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_CustomerInvoices_Vat_id" ON public."CustomerInvoices" USING btree ("Vat_id");


--
-- TOC entry 3329 (class 1259 OID 16618)
-- Name: IX_ItemGroupItems_ItemGroup_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_ItemGroupItems_ItemGroup_id" ON public."ItemGroupItems" USING btree ("ItemGroup_id");


--
-- TOC entry 3330 (class 1259 OID 16619)
-- Name: IX_ItemGroupItems_Item_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_ItemGroupItems_Item_id" ON public."ItemGroupItems" USING btree ("Item_id");


--
-- TOC entry 3333 (class 1259 OID 16620)
-- Name: IX_ItemGroups_User_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_ItemGroups_User_id" ON public."ItemGroups" USING btree ("User_id");


--
-- TOC entry 3336 (class 1259 OID 16621)
-- Name: IX_Items_User_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Items_User_id" ON public."Items" USING btree ("User_id");


--
-- TOC entry 3341 (class 1259 OID 16622)
-- Name: IX_Users_Role_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Users_Role_id" ON public."Users" USING btree ("Role_id");


--
-- TOC entry 3348 (class 2606 OID 16623)
-- Name: CustomerInvoiceGroupItemLines FK_CustomerInvoiceGroupItemLines_CustomerInvoiceGroupLines_Cus~; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CustomerInvoiceGroupItemLines"
    ADD CONSTRAINT "FK_CustomerInvoiceGroupItemLines_CustomerInvoiceGroupLines_Cus~" FOREIGN KEY ("CustomerInvoiceGroupLine_id") REFERENCES public."CustomerInvoiceGroupLines"("InvoiceGroupLineId") ON DELETE CASCADE;


--
-- TOC entry 3349 (class 2606 OID 16628)
-- Name: CustomerInvoiceGroupItemLines FK_CustomerInvoiceGroupItemLines_Items_Item_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CustomerInvoiceGroupItemLines"
    ADD CONSTRAINT "FK_CustomerInvoiceGroupItemLines_Items_Item_id" FOREIGN KEY ("Item_id") REFERENCES public."Items"("ItemId") ON DELETE CASCADE;


--
-- TOC entry 3350 (class 2606 OID 16633)
-- Name: CustomerInvoiceGroupLines FK_CustomerInvoiceGroupLines_CustomerInvoices_CustomerInvoice_~; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CustomerInvoiceGroupLines"
    ADD CONSTRAINT "FK_CustomerInvoiceGroupLines_CustomerInvoices_CustomerInvoice_~" FOREIGN KEY ("CustomerInvoice_id") REFERENCES public."CustomerInvoices"("CustomerInvoiceId") ON DELETE CASCADE;


--
-- TOC entry 3351 (class 2606 OID 16638)
-- Name: CustomerInvoiceLines FK_CustomerInvoiceLines_CustomerInvoices_CustomerInvoice_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CustomerInvoiceLines"
    ADD CONSTRAINT "FK_CustomerInvoiceLines_CustomerInvoices_CustomerInvoice_id" FOREIGN KEY ("CustomerInvoice_id") REFERENCES public."CustomerInvoices"("CustomerInvoiceId") ON DELETE CASCADE;


--
-- TOC entry 3352 (class 2606 OID 16643)
-- Name: CustomerInvoiceLines FK_CustomerInvoiceLines_Items_Item_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CustomerInvoiceLines"
    ADD CONSTRAINT "FK_CustomerInvoiceLines_Items_Item_id" FOREIGN KEY ("Item_id") REFERENCES public."Items"("ItemId") ON DELETE RESTRICT;


--
-- TOC entry 3353 (class 2606 OID 16648)
-- Name: CustomerInvoices FK_CustomerInvoices_Customers_Customer_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CustomerInvoices"
    ADD CONSTRAINT "FK_CustomerInvoices_Customers_Customer_id" FOREIGN KEY ("Customer_id") REFERENCES public."Customers"("CustomerId") ON DELETE CASCADE;


--
-- TOC entry 3354 (class 2606 OID 16653)
-- Name: CustomerInvoices FK_CustomerInvoices_Users_User_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CustomerInvoices"
    ADD CONSTRAINT "FK_CustomerInvoices_Users_User_id" FOREIGN KEY ("User_id") REFERENCES public."Users"("UserId") ON DELETE CASCADE;


--
-- TOC entry 3355 (class 2606 OID 16658)
-- Name: CustomerInvoices FK_CustomerInvoices_VATs_Vat_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CustomerInvoices"
    ADD CONSTRAINT "FK_CustomerInvoices_VATs_Vat_id" FOREIGN KEY ("Vat_id") REFERENCES public."VATs"("VatId") ON DELETE CASCADE;


--
-- TOC entry 3356 (class 2606 OID 16663)
-- Name: ItemGroupItems FK_ItemGroupItems_ItemGroups_ItemGroup_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ItemGroupItems"
    ADD CONSTRAINT "FK_ItemGroupItems_ItemGroups_ItemGroup_id" FOREIGN KEY ("ItemGroup_id") REFERENCES public."ItemGroups"("ItemGroupId") ON DELETE CASCADE;


--
-- TOC entry 3357 (class 2606 OID 16668)
-- Name: ItemGroupItems FK_ItemGroupItems_Items_Item_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ItemGroupItems"
    ADD CONSTRAINT "FK_ItemGroupItems_Items_Item_id" FOREIGN KEY ("Item_id") REFERENCES public."Items"("ItemId") ON DELETE CASCADE;


--
-- TOC entry 3358 (class 2606 OID 16673)
-- Name: ItemGroups FK_ItemGroups_Users_User_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ItemGroups"
    ADD CONSTRAINT "FK_ItemGroups_Users_User_id" FOREIGN KEY ("User_id") REFERENCES public."Users"("UserId") ON DELETE CASCADE;


--
-- TOC entry 3359 (class 2606 OID 16678)
-- Name: Items FK_Items_Users_User_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Items"
    ADD CONSTRAINT "FK_Items_Users_User_id" FOREIGN KEY ("User_id") REFERENCES public."Users"("UserId") ON DELETE CASCADE;


--
-- TOC entry 3360 (class 2606 OID 16683)
-- Name: Users FK_Users_Roles_Role_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "FK_Users_Roles_Role_id" FOREIGN KEY ("Role_id") REFERENCES public."Roles"("RoleId") ON DELETE CASCADE;


--
-- TOC entry 3522 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2026-10-10 10:42:48

--
-- PostgreSQL database dump complete
--

\unrestrict 0IX0lVGPvSKXLvdsfhS5opvCENn0CUaiPGXFboLQotM0eO5Ak4p7MgUmPa1tcdS

