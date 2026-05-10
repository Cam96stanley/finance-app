import { SpinnerIcon } from "@phosphor-icons/react/dist/ssr";

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center text-preset-1 gap-2">
      <SpinnerIcon size={64} className="animate-spin" />
    </div>
  );
}
