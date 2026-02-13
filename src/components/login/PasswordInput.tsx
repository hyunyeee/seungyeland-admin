import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export function PasswordInput({ error }: { error?: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="password">비밀번호</Label>
      <div className="relative">
        <Input
          id="password"
          name="승계랜드_password"
          placeholder="비밀번호 입력"
          type={isVisible ? "text" : "password"}
          required
          className="w-full pr-10"
        />
        <button
          type="button"
          className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer rounded-lg p-1 transition hover:bg-gray-100"
          aria-label={isVisible ? "비밀번호 숨기기" : "비밀번호 보이기"}
          onClick={() => setIsVisible((prev) => !prev)}
        >
          {isVisible ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
        </button>
      </div>
      {error}
    </div>
  );
}
