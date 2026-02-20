"use client";

import { OPTION_CATEGORIES } from "./optionData";
import { useState, useEffect } from "react";

interface Props {
  name?: string;
}

export function OptionSelector({ name = "options" }: Props) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleOption = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  // 🔥 선택 배열 확인용 콘솔
  useEffect(() => {
    console.log("현재 선택된 옵션:", selected);
  }, [selected]);

  return (
    <div className="space-y-8">
      {/* 선택 개수 표시 */}
      <div className="text-sm text-neutral-600">
        선택된 옵션: <span className="font-semibold">{selected.length}</span>개
      </div>

      {OPTION_CATEGORIES.map((category) => (
        <div key={category.label}>
          <h3 className="mb-4 text-base font-semibold text-neutral-900">{category.label}</h3>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {category.items.map((item) => {
              const checked = selected.includes(item);

              return (
                <label
                  key={item}
                  className={`flex cursor-pointer items-center justify-center rounded-lg border px-3 py-2 text-sm font-medium transition ${
                    checked
                      ? "border-main bg-blue-600 text-white"
                      : "border-neutral-200 bg-white text-neutral-700"
                  }`}
                >
                  <input
                    type="checkbox"
                    name={name}
                    value={item}
                    checked={checked}
                    onChange={() => toggleOption(item)}
                    className="hidden"
                  />
                  {item}
                </label>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
