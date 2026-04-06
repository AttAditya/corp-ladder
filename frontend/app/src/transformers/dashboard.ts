import type {
  DashboardPerson,
  DashboardSnapshotResponse,
  DashboardSummary,
  RawUserRecord
} from "@/interfaces/dashboard";

function getInitials(user: RawUserRecord): string {
  const source = user.name?.trim() || `User ${user.id ?? "?"}`;
  return source
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((segment) => segment[0]?.toUpperCase() ?? "")
    .join("");
}

function toPerson(user: RawUserRecord, index: number): DashboardPerson {
  const fallbackId = `user-${index + 1}`;

  return {
    id: String(user.id ?? fallbackId),
    initials: getInitials(user),
    label: user.name?.trim() || `User ${index + 1}`
  };
}

export function toDashboardSummary(snapshot: DashboardSnapshotResponse): DashboardSummary {
  const people = snapshot.users.map(toPerson);

  return {
    count: snapshot.count,
    empty: people.length === 0,
    people
  };
}
