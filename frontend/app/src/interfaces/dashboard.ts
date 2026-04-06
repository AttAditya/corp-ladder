export interface RawUserRecord {
  id?: number;
  name?: string;
}

export interface DashboardSnapshotResponse {
  count: number;
  users: RawUserRecord[];
}

export interface DashboardPerson {
  id: string;
  initials: string;
  label: string;
}

export interface DashboardSummary {
  count: number;
  empty: boolean;
  people: DashboardPerson[];
}
