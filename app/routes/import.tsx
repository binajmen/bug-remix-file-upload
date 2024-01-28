import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import {
  unstable_createFileUploadHandler,
  unstable_parseMultipartFormData,
  type ActionFunctionArgs,
  unstable_createMemoryUploadHandler,
} from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import clsx from "clsx";

export async function action({ request }: ActionFunctionArgs) {
  console.log("1");
  const uploadHandler = unstable_createFileUploadHandler({
    maxPartSize: 3_000_000,
  });
  // const uploadHandler = unstable_createMemoryUploadHandler({
  //   maxPartSize: 3_000_000,
  // });
  console.log("2");
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler,
  );
  console.log("3");
  const file = formData.get("file") as File;
  console.log("4");
  console.log(file.name);
  console.log(file.size);

  return null;
}

export default function AdminMaterialsImport() {
  const success = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="space-y-5">
      <h1>Import materials from Excel</h1>
      <Form
        method="post"
        encType="multipart/form-data"
        className="flex flex-col gap-4"
      >
        <input type="file" name="file" />
        <button
          type="submit"
          disabled={isSubmitting}
          className={clsx("button blue self-start", isSubmitting && "disabled")}
        >
          <ArrowUpTrayIcon />
          {isSubmitting ? "Importing..." : "Import"}
        </button>
        {success && <span className="font-bold text-green-700">Done ✔️</span>}
      </Form>
    </div>
  );
}
