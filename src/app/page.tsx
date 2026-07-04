import HeroSkeleton from "@/components/HeroSkeleton";

export default function Home() {
  return (
    <div
      className="flex flex-col flex-1 items-center justify-center py-16 px-4"
      style={{
        background:
          "radial-gradient(ellipse 500px 650px at 50% 47%, rgb(14, 15, 16) 0%, rgb(6, 72, 69) 100%)",
      }}
    >
      <HeroSkeleton />
    </div>
  );
}
