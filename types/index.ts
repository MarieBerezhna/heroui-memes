import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface Meme {
  id: number;
  name: string;
  imageUrl: string;
  likes: number;
}
