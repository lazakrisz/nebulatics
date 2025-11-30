import { testing } from "nebulatics/server";
import { revalidatePath } from "next/cache";
import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} className="imgLight" src={srcLight} />
      <Image {...rest} className="imgDark" src={srcDark} />
    </>
  );
};

export default function Home() {
  testing();

  const revalidate = async () => {
    "use server";

    revalidatePath("/");
  };

  return (
    <div className="flex flex-col gap-4">
      <button
        className="cursor-pointer rounded-md bg-blue-500 p-2 text-white"
        onClick={revalidate}
        type="button"
      >
        Revalidate testing.
      </button>

      <Button appName="web">Click me</Button>
    </div>
  );
}
