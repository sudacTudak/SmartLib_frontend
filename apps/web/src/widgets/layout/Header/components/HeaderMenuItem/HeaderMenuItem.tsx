import { HeaderMenuItemType } from './enums';
import { LinkMenuItem } from './LinkMenuItem';
import { SubmenuMenuItem } from './SubmenuMenuItem';
import { THeaderMenuItemProps } from './types';

export function HeaderMenuItem(props: THeaderMenuItemProps) {
  switch (props.itemType) {
    case HeaderMenuItemType.Link:
      return <LinkMenuItem {...props} />;
    case HeaderMenuItemType.Submenu:
      return <SubmenuMenuItem {...props} />;
    default:
      return null;
  }
}
