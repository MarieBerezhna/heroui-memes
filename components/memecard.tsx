import {
  Card,
  CardFooter,
  Image,
  Button,
  Chip,
  CardHeader,
  CardBody,
} from "@heroui/react";

import { HeartIcon } from "./icons";

import { Meme } from "@/types";

export default function MemeCard({ meme }: { meme: Meme }) {
  return (
    <a href={meme.imageUrl} rel="noreferrer" target="_blank">
      <Card
        isFooterBlurred
        className="border-none"
        radius="lg"
        title={meme.name}
      >
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <h4 className="font-bold text-large">{meme.name}</h4>
        </CardHeader>
        <CardBody className="overflow-hidden p-0">
          <Image
            alt="Woman listing to music"
            className="object-cover"
            height={300}
            src={meme.imageUrl}
            width={300}
          />
        </CardBody>

        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <Chip
            className="capitalize"
            color="default"
            radius="sm"
            size="sm"
            variant="solid"
          >
            <div className="flex align-center gap-1">
              <HeartIcon />
              <span>{meme.likes}</span>
            </div>
          </Chip>
          <Button
            className="text-tiny text-white"
            color="secondary"
            radius="sm"
            size="sm"
            style={{ width: "70%" }}
            variant="shadow"
          >
            VIEW
          </Button>
        </CardFooter>
      </Card>
    </a>
  );
}
