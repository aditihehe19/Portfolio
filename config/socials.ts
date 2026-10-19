import { Icons } from "@/components/common/icons";

interface SocialInterface {
  name: string;
  username: string;
  icon: any;
  link: string;
}

export const SocialLinks: SocialInterface[] = [
  {
    name: "Github",
    username: "@aditihehe19",
    icon: Icons.gitHub,
    link: "https://github.com/aditihehe19",
  },
  {
    name: "LinkedIn",
    username: "Aditi Kotnala",
    icon: Icons.linkedin,
    link: "https://www.linkedin.com/in/aditi-kotnala-263353335",
  },
  {
    name: "LeetCode",
    username: "Aditi Kotnala",
    icon: Icons.leetcode,
    link: "https://leetcode.com",
  },
  {
    name: "Email",
    username: "aditi.k2442@gmail.com",
    icon: Icons.gmail,
    link: "mailto:aditi.k2442@gmail.com",
  },
];
