import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Chip,
  Spinner,
} from "@heroui/react";
import { useState } from "react";

import { Meme } from "@/types";

type MemeModalProps = {
  isOpen?: boolean;
  onClose: () => void;
  onOpenChange?: (isOpen: boolean) => void;
  updateMeme: (meme: Meme) => void;
  meme: Meme;
};
export default function MemeModal({
  isOpen = false,
  onClose,
  onOpenChange,
  updateMeme,
  meme,
}: MemeModalProps) {
  const [updated, setUpdated] = useState<Meme>(meme);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSave = () => {
    try {
      setError(null);
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
      }, 1500);

      updateMeme(updated);
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      setError("Something went wrong, please try again");
      setLoading(false);
    }
  };

  const modalInner = (
    <>
      <ModalBody>
        <Chip className="capitalize" color="default" size="md" variant="flat">
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
          onChange={(e) => setUpdated({ ...meme, imageUrl: e.target.value })}
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
  );

  return (
    <Modal
      isOpen={isOpen}
      placement="top-center"
      size="xl"
      onClose={onClose}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Meme Info</ModalHeader>
        {!loading && modalInner}
        {loading && (
          <ModalBody>
            <div className="flex flex-col items-center justify-center p-8">
              <Spinner
                classNames={{ label: "text-foreground mt-4" }}
                variant="wave"
              />
            </div>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
}
