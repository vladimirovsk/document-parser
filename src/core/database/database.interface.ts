export interface IDatabaseConfigAttributes {
  dialect?: string;
  host?: string;
  port?: number;
  username?: string;
  password?: string;
  database?: string;
}

export interface IDatabaseConfig {
  documents: IDatabaseConfigAttributes;
}