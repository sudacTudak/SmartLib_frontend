import { ReactNode } from "react";
import { HeaderMenuItemType, HeaderSubmenuItemType } from "./enums";

interface IHeaderSubmenuItemCommon {
    key: string;
    title: string;
    itemType: HeaderSubmenuItemType;
}

export interface IHeaderSubmenuItemAction extends IHeaderSubmenuItemCommon {
    itemType: HeaderSubmenuItemType.Action
    onClick: (key: string) => void;
}

export interface IHeaderSubmenuItemLink extends IHeaderSubmenuItemCommon {
    itemType: HeaderSubmenuItemType.Link
    href: string;
}

export type THeaderSubmenuItem = IHeaderSubmenuItemAction | IHeaderSubmenuItemLink;

interface IHeaderMenuItemCommonProps {
    icon: ReactNode;
    title: string;
    itemType: HeaderMenuItemType;
    className?: string;
}

export interface ILinkHeaderMenuItemProps extends IHeaderMenuItemCommonProps {
    itemType: HeaderMenuItemType.Link;
    href: string;
}

export interface ISubmenuHeaderMenuItemProps extends IHeaderMenuItemCommonProps {
    itemType: HeaderMenuItemType.Submenu;
    menuTitle?: string;
    items: THeaderSubmenuItem[];
}

export type THeaderMenuItemProps = ILinkHeaderMenuItemProps | ISubmenuHeaderMenuItemProps