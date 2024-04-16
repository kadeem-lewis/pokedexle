import { IconName } from "@/types/Icons";

type IconProps = React.HTMLAttributes<SVGElement> & { name: IconName };

export function Icon({ name, className, ...props }: IconProps) {
  return (
    <svg className={`"inline self-center" ${className}`} {...props}>
      <use href={`./icons/spritesheet.svg#${name}`} />
    </svg>
  );
}
