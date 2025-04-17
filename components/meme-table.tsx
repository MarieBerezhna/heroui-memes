import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Tooltip,
  Button,
  useDisclosure,
} from "@heroui/react";
import { Key, useCallback, useState } from "react";

import { EditIcon } from "./icons";
import MemeModal from "./meme-modal";
import LikesCountChip from "./likes-count-chip";

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
  const { onOpenChange } = useDisclosure();
  const [selected, setSelected] = useState<Meme | null>(null);

  const renderCell = useCallback((meme: Meme, columnKey: Key) => {
    switch (columnKey) {
      case "id":
        return <span>{meme.id}</span>;
      case "name":
        return <span>{meme.name}</span>;
      case "imageUrl":
        return <a href={meme.imageUrl}>{meme.imageUrl}</a>;
      case "likes":
        return <LikesCountChip count={meme.likes} />;
      case "actions":
        return (
          <div className="relative flex items-center gap-2 justify-center">
            <Tooltip content="Edit meme">
              <Button onPress={() => setSelected(meme)}>
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              </Button>
            </Tooltip>
          </div>
        );
      default:
        return "N/A";
    }
  }, []);

  return (
    <>
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
      {selected && (
        <MemeModal
          isOpen
          meme={selected}
          updateMeme={updateMeme}
          onClose={() => setSelected(null)}
          onOpenChange={onOpenChange}
        />
      )}
    </>
  );
}
