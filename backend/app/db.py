from __future__ import annotations

import json
import os
from copy import deepcopy
from typing import Any

import redis
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


DEFAULT_TABLES = ("companies", "employees", "roles", "tokens")


class DataBaseTable:
    def __init__(self, database: "DataBase", name: str):
        self._database = database
        self.name = name

    def UPSERT(self, key: str, value: dict[str, Any]) -> dict[str, Any]:
        payload = deepcopy(value)
        payload["id"] = key
        return self._database._upsert(self.name, key, payload)

    def READ(self, key: str | None = None) -> dict[str, Any] | list[dict[str, Any]] | None:
        return self._database._read(self.name, key)

    def DELETE(self, key: str) -> dict[str, Any] | None:
        return self._database._delete(self.name, key)

    def keys(self) -> list[str]:
        pattern = f"{self.name}:*"
        prefix = f"{self.name}:"
        return [k[len(prefix):] for k in self._database.client.keys(pattern)]


class DataBase:
    def __init__(self, redis_url: str | None = None, tables: tuple[str, ...] = DEFAULT_TABLES):
        url = redis_url or os.getenv("UPSTASH_REDIS_URL", "redis://localhost:6379")
        self.client = redis.from_url(url, decode_responses=True)
        self._tables = set(tables)

    def table(self, name: str) -> DataBaseTable:
        self._tables.add(name)
        return DataBaseTable(self, name)

    def _upsert(self, table: str, key: str, value: dict[str, Any]) -> dict[str, Any]:
        payload = deepcopy(value)
        redis_key = f"{table}:{key}"
        self.client.set(redis_key, json.dumps(payload))
        return payload

    def _read(self, table: str, key: str | None = None) -> dict[str, Any] | list[dict[str, Any]] | None:
        if key is None:
            pattern = f"{table}:*"
            keys = self.client.keys(pattern)
            records = []
            for redis_key in keys:
                value = self.client.get(redis_key)
                if value:
                    records.append(json.loads(value))
            return records

        redis_key = f"{table}:{key}"
        value = self.client.get(redis_key)
        if value is None:
            return None
        return json.loads(value)

    def _delete(self, table: str, key: str) -> dict[str, Any] | None:
        redis_key = f"{table}:{key}"
        value = self.client.get(redis_key)
        if value is None:
            return None
        self.client.delete(redis_key)
        return json.loads(value)


database = DataBase()
