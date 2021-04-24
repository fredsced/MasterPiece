-- DML author F DESCLOUX

USE `mycompliancepal_test`;
set autocommit = 0;

-- insert roles 
insert into `roles` (`code`,`default_role`) values
('ROLE_USER',true),
('ROLE_ADMIN',false);

-- insert countries
insert into `countries` (`iso`, `name`) values
('FRA', 'France'),
('GBR','United Kingdom'),
('USA', 'United States');
-- ('ITA', 'Italy'),
-- ('ESP', 'Spain');

-- insert organisation units
insert into `organisation_units` (`code`,`name`) values
('BSC','Business solution center'),
('GBIS', 'Global banking & investor solutions'),
('GTS','Global technical solution');

-- insert risks
insert into `risks` (`code`,`label`) values
('CORR', 'Corruption'),
('KYC','Know your client');
-- ('EMBA','Embargo'),
-- ('LAUN','Money laundering'),
-- ('DATA','Datas protection'),
-- ('MARK', 'Market integrity'),
-- ('CLIEN', 'Client protection');

-- insert levels
insert into `compliance_levels` (`code`, `label`) values
('LCO','local compliance officer'),
('CCO', 'chief compliance officer');

-- insert admin email admin@bg.com password Azertyui1
insert into `accounts` (`email`,`password`) values
('admin@bg.com','$2a$10$zKusYR640m34z4841fSVtOytAjg3PbOuZ8Y2/qnb5vTtu.Jt4EFim');
insert into `accounts_roles` (`account_id`,`role_id`) values
(
	(select a.id from `accounts` a where a.email like 'admin@bg.com'),
    (select r.id from `roles` r where r.code like 'ROLE_ADMIN')
    ),
    (
	(select a.id from `accounts` a where a.email like 'admin@bg.com'),
    (select r.id from `roles` r where r.code like 'ROLE_USER')
    );
-- insert user email  user@bg.com password Azertyu1
insert into `accounts` (`email`,`password`) values
('user@bg.com','$2a$10$ZX40YW4abiYUh6dbFjoKmeaZPggCfxRfbaEEM6.5RIkXF.IaXB/iK');
insert into `accounts_roles` (`account_id`,`role_id`) values
(
	(select a.id from `accounts` a where a.email like 'user@bg.com'),
    (select r.id from `roles` r where r.code like 'ROLE_USER')
    );

-- insert some LCOs

insert into `collaborators` (`lastname`, `firstname`, `sesame_id`,`country_id`, `organisation_unit_id`) values
-- FRA
	('Martin','André','a200001',
		(select `id` from countries cn where cn.iso like 'fra'),
		(select `id` from organisation_units ou where ou.code like 'bsc')
        ),
	('Perez','Eric','a200002',
		(select `id` from countries cn where cn.iso like 'fra'),
		(select `id` from organisation_units ou where ou.code like 'bsc')
        ),
	('Dupont','Chantal','a200003',
		(select `id` from countries cn where cn.iso like 'fra'),
		(select `id` from organisation_units ou where ou.code like 'gbis')
        ),
	('Margerie','Hervé','a200004',
		(select `id` from countries cn where cn.iso like 'fra'),
		(select `id` from organisation_units ou where ou.code like 'gbis')
        ),
	('Hizart','Muriel','a200005',
		(select `id` from countries cn where cn.iso like 'fra'),
		(select `id` from organisation_units ou where ou.code like 'gts')
        ),
	('Courtis','Hamed','a200006',
		(select `id` from countries cn where cn.iso like 'fra'),
		(select `id` from organisation_units ou where ou.code like 'gts')
        ),
	
	('Mathieu','Corinne','a200007',
		(select `id` from countries cn where cn.iso like 'fra'),
		(select `id` from organisation_units ou where ou.code like 'gbis')
        ),
-- USA 
	('Doug','Trevor','a200008',
		(select `id` from countries cn where cn.iso like 'usa'),
		(select `id` from organisation_units ou where ou.code like 'gts')
        ),
	('Prince','Carol','a200009',
		(select `id` from countries cn where cn.iso like 'usa'),
		(select `id` from organisation_units ou where ou.code like 'gts')
        ),
	('Mac','Steve','a200010',
		(select `id` from countries cn where cn.iso like 'usa'),
		(select `id` from organisation_units ou where ou.code like 'bsc')
        ),
	('Powell','Angela','a200011',
		(select `id` from countries cn where cn.iso like 'usa'),
		(select `id` from organisation_units ou where ou.code like 'bsc')
        ),
	('Coories','Mike','a200012',
		(select `id` from countries cn where cn.iso like 'usa'),
		(select `id` from organisation_units ou where ou.code like 'gbis')
        ),
	('Banell','Lucy','a200013',
		(select `id` from countries cn where cn.iso like 'usa'),
		(select `id` from organisation_units ou where ou.code like 'gbis')
        ),
-- GBR
	('Smith','John','a200014',
		(select `id` from countries cn where cn.iso like 'gbr'),
		(select `id` from organisation_units ou where ou.code like 'gts')
        ),
	('Garret','Helen','a200015',
		(select `id` from countries cn where cn.iso like 'gbr'),
		(select `id` from organisation_units ou where ou.code like 'gts')
        );

insert into `compliance_referents` (`collaborator_id`, `compliance_level_id`, `risk_id`, `email`, `phone`) values
-- LCO BSC FRA
	(
		(select `id` from collaborators c where c.lastname like 'Martin'),
		(select `id`from compliance_levels cl where cl.code like 'LCO'),
        (select `id` from risks r where r.code like 'CORR'),
        'martin.andre@bg.com',
        '33 633 91 40 66'
	),
    (
		(select `id` from collaborators c where c.lastname like 'Perez'),
		(select `id`from compliance_levels cl where cl.code like 'LCO'),
        (select `id` from risks r where r.code like 'KYC'),
        'perez.eric@bg.com',
        '33 637 84 45 45'
	),
-- LCO GBIS FRA
    (
		(select `id` from collaborators c where c.lastname like 'Dupont'),
		(select `id`from compliance_levels cl where cl.code like 'LCO'),
        (select `id` from risks r where r.code like 'CORR'),
		'dupond.chantal@bg.com',
        '33 637 84 45 48'
	),
    (
		(select `id` from collaborators c where c.lastname like 'Margerie'),
		(select `id`from compliance_levels cl where cl.code like 'LCO'),
        (select `id` from risks r where r.code like 'KYC'),
        'herve.margerie@bg.com',
        '33 637 84 45 12'
	),
     (
		(select `id` from collaborators c where c.lastname like 'Mathieu'),
		(select `id`from compliance_levels cl where cl.code like 'LCO'),
        (select `id` from risks r where r.code like 'KYC'),
        'corinne.mathieu@bg.com',
        '33 637 84 44 17'
	),
-- LCO GTS FRA
    (
		(select `id` from collaborators c where c.lastname like 'Hizart'),
		(select `id`from compliance_levels cl where cl.code like 'LCO'),
        (select `id` from risks r where r.code like 'KYC'),
        'muriel.hizart@bg.com',
        '33 637 84 32 12'
	),
    (
		(select `id` from collaborators c where c.lastname like 'Courtis'),
		(select `id`from compliance_levels cl where cl.code like 'LCO'),
        (select `id` from risks r where r.code like 'CORR'),
        'hamed.courtis@bg.com',
        '33 637 84 22 12'
	),
-- LCO GTS USA
    (
		(select `id` from collaborators c where c.lastname like 'Doug'),
		(select `id`from compliance_levels cl where cl.code like 'LCO'),
        (select `id` from risks r where r.code like 'KYC'),
        'trevor.doug@bg.com',
        '1 637 84 44 94'
	),
    (
		(select `id` from collaborators c where c.lastname like 'Prince'),
		(select `id`from compliance_levels cl where cl.code like 'LCO'),
        (select `id` from risks r where r.code like 'CORR'),
        'carol.prince@bg.com',
        '1 637 87 44 17'
	),
    (
		(select `id` from collaborators c where c.lastname like 'Mac'),
		(select `id`from compliance_levels cl where cl.code like 'LCO'),
        (select `id` from risks r where r.code like 'KYC'),
        'steve.mac@bg.com',
        '1 637 42 44 91'
	),
    (
		(select `id` from collaborators c where c.lastname like 'Powell'),
		(select `id`from compliance_levels cl where cl.code like 'LCO'),
        (select `id` from risks r where r.code like 'CORR'),
        'angela.powel@bg.com',
        '1 637 87 44 95'
	),
    (
		(select `id` from collaborators c where c.lastname like 'Coories'),
		(select `id`from compliance_levels cl where cl.code like 'LCO'),
        (select `id` from risks r where r.code like 'KYC'),
        'mike.coories@bg.com',
        '1 637 74 98 74'
	),
    (
		(select `id` from collaborators c where c.lastname like 'Banell'),
		(select `id`from compliance_levels cl where cl.code like 'LCO'),
        (select `id` from risks r where r.code like 'CORR'),
        'lucy.banell@bg.com',
        '1 637 37 24 17'
	)
    ;
commit;
set autocommit = 1;

