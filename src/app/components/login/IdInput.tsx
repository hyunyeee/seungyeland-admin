import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function IdInput({ error }: { error?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="id">아이디</Label>
      <Input id="id" name="승계랜드_id" placeholder="아이디 입력" required />
      {error}
    </div>
  );
}
