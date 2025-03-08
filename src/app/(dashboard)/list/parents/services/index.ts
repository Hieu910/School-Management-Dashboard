"use server"
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Prisma } from "@prisma/client";

export const getListParent = async (params: any) => {
  const {
    page,
    searchParams,
  }: { page: number; searchParams: { [key: string]: string | undefined } } =
    params;

  const p = page || 1;
  const query: Prisma.ParentWhereInput = {};

  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (value !== undefined) {
        switch (key) {
          
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

  return await prisma.$transaction([
    prisma.parent.findMany({
      where: query,
      include:{
        students:true
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.parent.count({
      where: query,
    }),
  ]);
};
