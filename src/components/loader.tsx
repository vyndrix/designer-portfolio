import { Spinner } from "./ui/spinner";

export function Loader() {
  return (
    <div className="bg-primary/50 absolute w-full h-full">
      <div className="flex flex-1 h-full">
        <Spinner className="flex-1 self-center size-12" />
      </div>
    </div>
  );
}
