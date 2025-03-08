"use server";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Prisma } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

export const getListAnnouncement = async (params: any) => {
  const {
    page,
    searchParams,
  }: { page: number; searchParams: { [key: string]: string | undefined } } =
    params;

 const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const p = page || 1;
  const query: Prisma.AnnouncementWhereInput = {};

  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.title = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

  const roleConditions = {
    teacher: { lessons: { some: { teacherId: userId! } } },
    student: { students: { some: { id: userId! } } },
    parent: { students: { some: { parentId: userId! } } },
  };

  query.OR = [
    { classId: null },
    {
      class: roleConditions[role as keyof typeof roleConditions] || {},
    },
  ];

  return await prisma.$transaction([
    prisma.announcement.findMany({
      where: query,
      include: {
        class: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.announcement.count({ where: query }),
  ]);
};
