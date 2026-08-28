import { signOutAction } from "@/lib/auth-actions";

export function SignOutButton({
  className = "text-[12px] font-semibold text-yellow hover:text-white",
}: {
  className?: string;
}) {
  return (
    <form action={signOutAction}>
      <button type="submit" className={className}>
        Cerrar sesión
      </button>
    </form>
  );
}
