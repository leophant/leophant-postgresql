'use strict';

const postgresql = require('pg');

class PostgreSQLConnector {
  constructor(clientConfig) {
    this.client = null;
    this.clientConfig = clientConfig;
    this._pg = new postgresql.Pool(this.clientConfig);
  }

  async connect() {
    this.client = await this._pg.connect();
    this.client.release();

    return this.client;
  }

  async disconnect() {
    if (this._pg) {
      await this._pg.end();
      this._pg = null;
    }
  }
}

module.exports = PostgreSQLConnector;
