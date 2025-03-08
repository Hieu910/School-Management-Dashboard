"use server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Class, Student } from "@prisma/client";

export const getStudentList = async (params: any) => {
  const {
    page,
    searchParams,
  }: {
    page: number;
    searchParams: {
      [key: string]: string | undefined;
    };
  } = params;

  const p = page || 1;
  const query: Prisma.StudentWhereInput = {};

  if (searchParams) {
    console.log(searchParams);
    for (const [key, value] of Object.entries(searchParams)) {
      if (value !== undefined) {
        switch (key) {
          case "teacherId":
            query.class = {
              lessons: {
                some: {
                  teacherId: value,
                },
              },
            };
            break;
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
    prisma.student.findMany({
      where: query,
      include: {
        class: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.student.count({
      where: query,
    }),
  ]);
};

export const getStudent = async (params: any) => {
  const { id } = params;
  const student:
    | (Student & {
        class: Class & { _count: { lessons: number } };
      })
    | null = await prisma.student.findUnique({
    where: { id },
    include: {
      class: { include: { _count: { select: { lessons: true } } } },
    },
  });

  return student
};
