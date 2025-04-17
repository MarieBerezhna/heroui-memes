import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Chip,
} from "@heroui/react";
import { useState } from "react";

import { Meme } from "@/types";

type MemeModalProps = {
  isOpen?: boolean;
  onClose: () => void;
  onOpenChange?: (isOpen: boolean) => void;
  meme: Meme;
};
export default function MemeModal({
  isOpen = false,
  onClose,
  onOpenChange,
  meme,
}: MemeModalProps) {
  const [updated, setUpdated] = useState<Meme>(meme);
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    try {
      localStorage.setItem("memes", JSON.stringify(updated));
      setTimeout(() => {
        onClose();
      }, 5000);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      setError("Something went wrong, please try again");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      placement="top-center"
      size="xl"
      onClose={onClose}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Meme Info</ModalHeader>
            <ModalBody>
              <Chip
                className="capitalize"
                color="default"
                size="md"
                variant="flat"
              >
                MEME ID: &nbsp;{meme.id}
              </Chip>
              <Input
                label="Name"
                placeholder="Enter meme's name"
                type="text"
                value={updated.name}
                variant="bordered"
                onChange={(e) => setUpdated({ ...meme, name: e.target.value })}
              />
              <Input
                label="Url"
                placeholder="Enter full url"
                type="url"
                value={updated.imageUrl}
                variant="bordered"
                onChange={(e) =>
                  setUpdated({ ...meme, imageUrl: e.target.value })
                }
              />
              <Input
                label="Likes"
                placeholder="Enter number of likes"
                type="number"
                value={updated.likes.toString()}
                variant="bordered"
                onChange={(e) =>
                  setUpdated({ ...meme, likes: Number(e.target.value) })
                }
              />
              {error && <p className="text-red-500">{error}</p>}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={handleSave}>
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
