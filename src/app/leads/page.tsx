import LeadsTable from "@/components/leads/LeadsTable";

export default function ManagementPage() {
  return (
    <div className="p-6">
      <h1 className="mb-4 text-xl font-semibold">문의 관리</h1>
      <LeadsTable />
    </div>
  );
}
