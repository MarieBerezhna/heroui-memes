import { Chip } from "@heroui/react";

import { HeartIcon } from "./icons";

export default function LikesCountChip({ count }: { count: number }) {
  return (
    <Chip
      className="capitalize"
      color="default"
      radius="sm"
      size="sm"
      variant="solid"
    >
      <div className="flex align-center gap-1">
        <HeartIcon />
        <span>{count}</span>
      </div>
    </Chip>
  );
}
