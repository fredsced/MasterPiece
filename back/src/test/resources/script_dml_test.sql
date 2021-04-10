

use mycompliancepal_test;


-- insert roles
insert into `roles` (`code`,`default_role`) values
('ROLE_USER',true),
('ROLE_ADMIN',false);

-- insert some countries
insert into `countries` (`iso`, `name`) values
('FRA', 'France'),
('GBR','United Kingdom'),
('USA', 'United States');
-- ('ITA', 'Italy'),
-- ('ESP', 'Spain');

-- insert some ou
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

-- insert account
insert into `accounts` (`email`,`password`) values
('test1@bg.com','$2a$10$XS8GYqhFG5D8MuCAd3Cg3eidzF/nh9q8Irz5mvrvFZBp9oA9Tmrcm');

set @test1 = (select id from `accounts` where email like 'test1@bg.com');
set @user = (select id from `roles` where code like 'ROLE_USER');

insert into `accounts_roles`(`role_id`, `account_id`) values
(@user, @test1);

