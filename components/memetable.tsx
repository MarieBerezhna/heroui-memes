import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
} from "@heroui/react";
import { Key, useCallback } from "react";

import { EditIcon } from "./icons";

import { Meme } from "@/types";
import { useMemes } from "@/hooks/useMemes";

export const columns = [
  { name: "ID", uid: "id" },
  { name: "NAME", uid: "name" },
  { name: "URL", uid: "imageUrl" },
  { name: "LIKES", uid: "likes" },
  { name: "ACTIONS", uid: "actions" },
];

export default function MemeTable() {
  const { memes, updateMeme } = useMemes();
  const renderCell = useCallback((meme: Meme, columnKey: Key) => {
    switch (columnKey) {
      case "id":
        return <span>{meme.id}</span>;
      case "name":
        return <span>{meme.name}</span>;
      case "imageUrl":
        return <a href={meme.imageUrl}>{meme.imageUrl}</a>;
      case "likes":
        return (
          <Chip className="capitalize" color="primary" size="sm" variant="flat">
            {meme.likes}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return "N/A";
    }
  }, []);

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={memes}>
        {(item: Meme) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
