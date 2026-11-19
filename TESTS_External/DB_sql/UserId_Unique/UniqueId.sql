INSERT INTO "Users" VALUES(
	'8bd65ecd-2ecd-403a-8e68-cb488ae68787',
	'admin',
	'admin@admin.com',
	NULL,
	'9PJj5DnPQJJeakEjh6lHKmdzwlgCEqT7UNIk06gX3hc=',
	'3c128167-8201-43c1-a841-003c2258589e',
	'2026-10-13 20:23:06.24264+00',
	NULL
	);

-- this one will throw :
-- ERROR:  duplicate KEY value violates UNIQUE CONSTRAINT "PK_Users"
-- Key ("UserId")=(8bd65ecd-2ecd-403a-8e68-cb488ae68787) already exists. 
INSERT INTO "Users" VALUES(
	'8bd65ecd-2ecd-403a-8e68-cb488ae68787',
	'admin',
	'admin@admin.com',
	NULL,
	'9PJj5DnPQJJeakEjh6lHKmdzwlgCEqT7UNIk06gX3hc=',
	'3c128167-8201-43c1-a841-003c2258589e',
	'2026-10-13 20:23:06.24264+00',
	NULL
	);
