interface ImageSpaceInterface {
  desc?: string;
  width?: number;
  height?: number;
  className?: string;
}

export function ImageSpace({ desc, width, height, className }: ImageSpaceInterface) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center rounded-2xl bg-neutral-300 ${className}`}
      style={{ width, height }}
    >
      <p className="text-lg font-bold">{desc}</p>
    </div>
  );
}
