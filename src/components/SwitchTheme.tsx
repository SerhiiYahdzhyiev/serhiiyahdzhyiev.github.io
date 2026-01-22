import * as Switch from '@radix-ui/react-switch';

export default function() {
  const toggle = () => {
    const root = document.documentElement;
    const next =
      root.dataset.variant === 'dark' ? 'light' : 'dark';

    root.dataset.variant = next;
    localStorage.setItem('theme', next);
  };

  return (
    <Switch.Root
      aria-label="Toggle dark mode"
      onCheckedChange={toggle}
      className="
        relative inline-flex
        h-[1.25em] w-[2.25em]
        items-center
        rounded-full
        bg-[var(--clr-text-muted)]
        transition-colors
        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-offset-2
        focus-visible:outline-current
        data-[state=checked]:bg-[var(--clr-text-heading-1)]
      "
    >
      <Switch.Thumb
          className="
            relative inline-flex
            h-[1.25em] w-[2.25em]
            items-center
            rounded-full
            bg-[var(--clr-text-muted)]
            transition-colors
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-current
            data-[state=checked]:bg-[var(--clr-text-heading-1)]
          "
      />
    </Switch.Root>
  );
}
