import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "glass";
}

export function Card({ children, className, variant = "default" }: CardProps) {
  const variants: Record<string, string> = {
    default: "bg-medix-surface border border-slate-700/50",
    glass: "bg-white/5 backdrop-blur-xl border border-white/10",
  };

  return (
    <div className={cn("rounded-xl p-4", variants[variant], className)}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export function CardHeader({ title, subtitle, className }: CardHeaderProps) {
  return (
    <div className={cn("mb-3", className)}>
      {title && <h3 className="text-sm font-semibold text-white">{title}</h3>}
      {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
    </div>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={cn(className)}>{children}</div>;
}
