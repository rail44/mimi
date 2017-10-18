use std::env;

use r2d2;
use r2d2_diesel::ConnectionManager;
use diesel::prelude::*;

use schema::*;

#[derive(Debug, Identifiable, Queryable, Associations, Serialize)]
#[belongs_to(Intance)]
pub struct Account {
    pub id: i32,
    pub instance_id: i32,
    pub user_name: String,
    pub display_name: String,
}

#[table_name="accounts"]
#[derive(Debug, Insertable)]
pub struct NewAccount {
    pub user_name: String,
    pub display_name: String,
    pub instance_id: i32,
}

#[derive(Debug, Identifiable, Queryable, Serialize)]
pub struct Instance {
    pub id: i32,
    pub domain: String,
    pub is_myself: bool,
}

#[derive(Debug, Insertable)]
#[table_name="instances"]
pub struct NewInstance {
    pub domain: String,
    pub is_myself: bool,
}

#[derive(Debug, Identifiable, Queryable, Associations)]
#[belongs_to(Account)]
pub struct User {
    pub id: i32,
    pub account_id: i32,
    pub password_hash: String,
}

pub fn establish_connection() -> SqliteConnection {
    let database_url = env::var("DATABASE_URL")
        .expect("DATABASE_URL must be set");
    SqliteConnection::establish(&database_url)
        .expect(&format!("Error connecting to {}", database_url))
}

pub type Pool = r2d2::Pool<ConnectionManager<SqliteConnection>>;

pub fn establish_connection_pool() -> r2d2::Pool<ConnectionManager<SqliteConnection>> {
    let database_url = env::var("DATABASE_URL")
        .expect("DATABASE_URL must be set");
    let config = r2d2::Config::default();
    let manager = ConnectionManager::<SqliteConnection>::new(database_url);
    r2d2::Pool::new(config, manager).expect("Failed to create pool.")
}
