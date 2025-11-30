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
  return (
    <div>
      <Button appName="web">Click me</Button>
    </div>
  );
}
