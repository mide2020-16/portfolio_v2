import Image from "next/image";

export default function AvatarMark({ size = 40 }: { size?: number }) {
  return (
    <div className="relative group inline-flex items-center justify-center">
      {/* Glowing aura on hover */}
      <div className="absolute -inset-1.5 rounded-full bg-linear-to-r from-primary-accent/50 to-foreground/20 opacity-0 group-hover:opacity-100 blur-md transition-all duration-500" />

      {/* Avatar Container */}
      <div className="relative flex items-center justify-center p-1 rounded-full bg-background/80 backdrop-blur-xl border border-border/60 shadow-lg shadow-black/10 group-hover:border-primary-accent/80 transition-all duration-300">
        <Image
          src="/brand.png"
          alt="Ayomide Avatar"
          width={size}
          height={size}
          className="w-9 h-9 md:w-10 md:h-10 object-cover rounded-full mix-blend-multiply dark:mix-blend-screen dark:brightness-110 dark:contrast-125 filter drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
          priority
        />
      </div>
    </div>
  );
}