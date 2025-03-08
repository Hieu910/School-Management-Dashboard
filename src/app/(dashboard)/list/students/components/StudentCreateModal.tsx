"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "@/components/InputField";
import Image from "next/image";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" }),
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  phone: z.string().min(1, { message: "Phone is required!" }),
  address: z.string().min(1, { message: "Address is required!" }),
  bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  birthday: z.date({ message: "Birthday is required!" }),
  sex: z.enum(["male", "female"], { message: "Sex is required!" }),
  img: z.instanceof(File, { message: "Image is required" }),
});

type Inputs = z.infer<typeof schema>;

const StudentCreateModal = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <dialog id="modal_create_student" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-lg">Create a new student</h3>
        <form className="flex flex-col gap-4">
          <span className="text-xs text-gray-400 font-medium">
            Authentication Information
          </span>
          <div className="flex justify-between flex-wrap gap-4">
            <InputField
              label="Username"
              name="username"
              defaultValue=""
              register={register}
              error={errors?.username}
            />
            <InputField
              label="Email"
              name="email"
              defaultValue=""
              register={register}
              error={errors?.email}
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              defaultValue=""
              register={register}
              error={errors?.password}
            />
          </div>
          <span className="text-xs text-gray-400 font-medium">
            Personal Information
          </span>
          <div className="flex justify-between flex-wrap gap-4">
            <InputField
              label="First Name"
              name="firstName"
              defaultValue=""
              register={register}
              error={errors.firstName}
            />
            <InputField
              label="Last Name"
              name="lastName"
              defaultValue=""
              register={register}
              error={errors.lastName}
            />
            <InputField
              label="Phone"
              name="phone"
              defaultValue=""
              register={register}
              error={errors.phone}
            />
            <InputField
              label="Address"
              name="address"
              defaultValue=""
              register={register}
              error={errors.address}
            />
            <InputField
              label="Blood Type"
              name="bloodType"
              defaultValue=""
              register={register}
              error={errors.bloodType}
            />
            <InputField
              label="Birthday"
              name="birthday"
              defaultValue=""
              register={register}
              error={errors.birthday}
              type="date"
            />
            <div className="flex flex-col gap-2 w-full md:w-1/4">
              <label className="text-xs text-gray-500">Sex</label>
              <select
                className="select select-bordered w-full max-w-xs text-sm"
                {...register("sex")}
                defaultValue=""
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.sex?.message && (
                <p className="text-xs text-red-400">
                  {errors.sex.message.toString()}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
              <label
                className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
                htmlFor="img"
              >
                <Image src="/upload.png" alt="" width={28} height={28} />
                <span>Upload a photo</span>
              </label>
              <input
                type="file"
                id="img"
                {...register("img")}
                className="hidden"
              />
              {errors.img?.message && (
                <p className="text-xs text-red-400">
                  {errors.img.message.toString()}
                </p>
              )}
            </div>
          </div>
        </form>
        <div className="modal-action">
          <form method="dialog">
            <button
              className="bg-blue-400 btn hover:bg-blue-500 text-white mr-2 border-0"
              onClick={onSubmit}
            >
              Create
            </button>
            {/* if there is a button in form, it will close the modal */}
            <button className="btn" onClick={() => reset()}>
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default StudentCreateModal;
