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
  Alert,
} from "@heroui/react";
import { useState } from "react";

import { Meme } from "@/types";
import {
  isValidImageUrl,
  isValidLikes,
  isValidName,
} from "@/utils/input-validation";

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
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [inputErrors, setInputErrors] = useState({
    name: false,
    imageUrl: false,
    likes: false,
  });
  const handleSave = () => {
    try {
      setError(null);
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
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

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isValid = isValidName(e.target.value);

    if (!isValid) {
      setInputErrors({ ...inputErrors, name: true });
      setError("Name must be between 3 and 100 characters");

      return;
    }
    setUpdated({ ...updated, name: e.target.value });
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    const isValid = isValidImageUrl(url);

    if (!isValid) {
      setInputErrors({ ...inputErrors, imageUrl: true });
      setError("Invalid URL. Please enter a full external JPG URL.");

      return;
    }

    setUpdated({ ...updated, imageUrl: url });
  };

  const handleLikesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isValid = isValidLikes(Number(value));

    if (!isValid) {
      setInputErrors({ ...inputErrors, likes: true });
      setError("Likes must be a number greater than 0 and less than 100");

      return;
    }
    setUpdated({ ...updated, likes: Number(value) });
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
          onChange={handleNameChange}
        />
        <Input
          label="Url"
          placeholder="Enter full url"
          type="url"
          value={updated.imageUrl}
          variant="bordered"
          onChange={handleUrlChange}
        />
        <Input
          label="Likes"
          placeholder="Enter number of likes"
          type="number"
          value={updated.likes.toString()}
          variant="bordered"
          onChange={handleLikesChange}
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
        {success && (
          <ModalBody>
            <div key="success" className="w-full flex items-center my-3">
              <Alert
                color="success"
                title="Well done! All changes were saved :)"
              />
            </div>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
}
