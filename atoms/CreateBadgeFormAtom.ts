import { atom } from "jotai";

interface BadgeFormData {
  badgeName?: string;
  image?: string;
  description?:string;
  presignedUrl?:string;
}

export const badgeFormAtom = atom<BadgeFormData>({});
