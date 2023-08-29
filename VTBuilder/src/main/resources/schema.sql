create table archive (
	id bigint not null,
	image varchar(255) not null,
	data varchar(255) not null,
	squares int not null,
	primary key (id)
);

create table users (
	id bigint not null,
	name varchar(255) not null, 
	lobby bigint not null,
	squares varchar(255) not null,
	primary key(id)
);